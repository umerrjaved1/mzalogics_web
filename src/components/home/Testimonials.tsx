"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { testimonials } from "@/content/testimonials";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

type FilterType = "all" | "ai" | "handcrafted";

const filters: { id: FilterType; label: string }[] = [
  { id: "all", label: "All clients" },
  { id: "ai", label: "AI track" },
  { id: "handcrafted", label: "Hand-crafted" },
];

export function Testimonials() {
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredItems = testimonials.filter((item) => {
    if (filter === "all") return true;
    if (filter === "ai") return item.note.toLowerCase().includes("ai");
    if (filter === "handcrafted") return item.note.toLowerCase().includes("hand-crafted");
    return true;
  });

  return (
    <Section id="testimonials">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Eyebrow>Client stories</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-5xl">
              People who shipped with us
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              What founders and operators say after we ship with them.
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

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.slice(0, 6).map((item) => (
            <SpotlightCard key={item.name} className="flex flex-col justify-between p-7 sm:p-8">
              <div>
                <div className="flex text-amber-500" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" aria-hidden />
                  ))}
                </div>
                <blockquote className="mt-5 text-base leading-relaxed text-navy">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
              </div>

              <div className="mt-8 flex items-center gap-3 border-t border-black/5 pt-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt=""
                  className="h-12 w-12 shrink-0 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <div className="truncate text-base font-bold text-navy">{item.name}</div>
                  <div className="truncate text-sm text-muted">{item.role}</div>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </Container>
    </Section>
  );
}
