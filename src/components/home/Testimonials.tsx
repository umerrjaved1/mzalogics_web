"use client";

import React, { useState } from "react";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { testimonials } from "@/content/testimonials";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

type FilterType = "all" | "ai" | "handcrafted";

const filters: { id: FilterType; label: string }[] = [
  { id: "all", label: "All clients" },
  { id: "ai", label: "AI track" },
  { id: "handcrafted", label: "Hand-crafted" },
];

export function Testimonials({
  photos,
}: {
  /** slug → /media path, resolved on the server. Missing = fall back to initials. */
  photos?: Record<string, string | undefined>;
} = {}) {
  const [filter, setFilter] = useState<FilterType>("all");
  const anyAttributed = testimonials.some((item) => item.attributed);

  const filteredItems = testimonials.filter((item) => {
    if (filter === "all") return true;
    if (filter === "ai") return item.note.toLowerCase().includes("ai");
    if (filter === "handcrafted") return item.note.toLowerCase().includes("hand-crafted");
    return true;
  });

  return (
    <Section id="testimonials" className="pt-10 pb-10 sm:pt-12 sm:pb-12">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Eyebrow>Client stories</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-5xl">
              People who shipped with us
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              {anyAttributed
                ? "Named where the client agreed to go on the record; anonymized where the engagement is confidential."
                : "Anonymized notes from confidential engagements. Names stay off the record unless a client asks to be listed."}
            </p>
          </div>

          <div role="tablist" aria-label="Filter testimonials" className="flex rounded-full bg-paper p-1 text-sm font-semibold text-navy">
            {filters.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={filter === item.id}
                onClick={() => setFilter(item.id)}
                className={`rounded-full px-4 py-2 ${
                  filter === item.id ? "bg-navy text-white shadow-sm" : "text-navy/80 hover:text-navy"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <p className="mt-10 rounded-2xl border border-black/8 bg-white px-6 py-10 text-center text-base text-muted">
            No quotes on this track yet. Try All clients.
          </p>
        ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.slice(0, 6).map((item) => (
            <SpotlightCard key={`${item.name}-${item.role}`} className="flex flex-col justify-between p-7 sm:p-8">
              <div>
                <blockquote className="text-base leading-relaxed text-navy">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
              </div>

              <Attribution item={item} photo={item.attributed ? photos?.[item.attributed.slug] : undefined} />
            </SpotlightCard>
          ))}
        </div>
        )}
      </Container>
    </Section>
  );
}

/**
 * Anonymous by default. An attributed quote shows the person's real name and
 * company, plus a headshot when one is on disk — never a stock face.
 */
function Attribution({
  item,
  photo,
}: {
  item: (typeof testimonials)[number];
  photo?: string;
}) {
  const attributed = item.attributed;
  const displayName = attributed?.fullName ?? item.name;
  const displayOrg = attributed ? `${item.role} · ${attributed.company}` : item.role;

  return (
    <div className="mt-8 flex items-center gap-3 border-t border-black/5 pt-5">
      {photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo}
          alt={displayName}
          loading="lazy"
          className="h-12 w-12 shrink-0 rounded-full border border-black/10 object-cover object-center"
        />
      ) : (
        <span
          aria-hidden
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-paper text-sm font-bold text-navy"
        >
          {item.initials}
        </span>
      )}
      <div className="min-w-0">
        <div className="truncate text-base font-bold text-navy">{displayName}</div>
        <div className="truncate text-sm text-muted">{displayOrg}</div>
      </div>
      {attributed?.href ? (
        <a
          href={attributed.href}
          target="_blank"
          rel="noreferrer"
          className="ml-auto shrink-0 text-xs font-semibold text-navy underline underline-offset-2"
        >
          Visit
        </a>
      ) : null}
    </div>
  );
}
