"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Sparkles, Wrench } from "lucide-react";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { Button, ArrowDisc } from "@/components/ui/Button";
import { pricingTracks, type TrackId } from "@/content/pricing";
import { cn } from "@/lib/cn";

/**
 * The two delivery tracks share one price table with a toggle, so a client can
 * see the cost of choosing AI or ruling it out without leaving the page.
 *
 * `compact` renders the home-page teaser: tiers only, no add-ons or footnotes.
 */
export function PricingTables({
  compact = false,
  initialTrack = "ai",
}: {
  compact?: boolean;
  initialTrack?: TrackId;
}) {
  const [trackId, setTrackId] = useState<TrackId>(initialTrack);
  const track = pricingTracks.find((item) => item.id === trackId) ?? pricingTracks[0];

  return (
    <Section id="plans" className={compact ? "" : "pt-0"}>
      <Container>
        {compact ? (
          <div className="max-w-2xl">
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-navy sm:text-5xl">
              Two ways to build. You pick.
            </h2>
            <p className="mt-4 text-muted">
              Same engineers, same standards, same review gates. The difference is whether AI does the
              repetitive work — and what that saves you in time and budget.
            </p>
          </div>
        ) : null}

        <div className={cn("flex flex-col gap-6", compact ? "mt-10" : "")}>
          <TrackToggle trackId={trackId} onChange={setTrackId} />

          <div className="grid gap-6 rounded-[28px] border border-black/8 bg-white p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-navy px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                {track.badge}
              </span>
              <h3 className="mt-4 text-2xl font-bold text-navy">{track.label}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{track.blurb}</p>
            </div>
            <ul className="grid gap-3 self-center sm:grid-cols-2">
              {track.points.map((point) => (
                <li key={point} className="flex gap-2.5 rounded-2xl bg-paper p-4 text-sm text-navy">
                  <Check size={16} className="mt-0.5 shrink-0 text-accent-2" strokeWidth={3} />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 grid items-start gap-5 lg:grid-cols-3">
          {track.tiers.map((tier) => (
            <article
              key={tier.slug}
              className={cn(
                "flex h-full flex-col rounded-[28px] border p-7",
                tier.featured
                  ? "border-transparent bg-navy text-white shadow-[0_20px_60px_rgba(14,9,38,0.18)]"
                  : "border-black/8 bg-white",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className={cn("text-xl font-bold", tier.featured ? "text-white" : "text-navy")}>
                  {tier.name}
                </h3>
                {tier.featured ? (
                  <span className="rounded-full bg-accent-2 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-navy">
                    Most chosen
                  </span>
                ) : null}
              </div>
              <p className={cn("mt-1.5 text-sm", tier.featured ? "text-white/70" : "text-muted")}>
                {tier.tagline}
              </p>

              <p className={cn("mt-6 text-4xl font-extrabold tracking-tight", tier.featured ? "text-white" : "text-navy")}>
                {tier.price}
              </p>
              <p className={cn("mt-1 text-xs", tier.featured ? "text-white/55" : "text-muted")}>
                {tier.priceNote}
              </p>

              <dl className={cn("mt-6 space-y-2 border-y py-4 text-sm", tier.featured ? "border-white/15" : "border-line")}>
                <div className="flex justify-between gap-4">
                  <dt className={tier.featured ? "text-white/55" : "text-muted"}>Timeline</dt>
                  <dd className={cn("text-right font-medium", tier.featured ? "text-white" : "text-navy")}>
                    {tier.timeline}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className={tier.featured ? "text-white/55" : "text-muted"}>Team</dt>
                  <dd className={cn("text-right font-medium", tier.featured ? "text-white" : "text-navy")}>
                    {tier.team}
                  </dd>
                </div>
              </dl>

              <ul className={cn("mt-5 flex-1 space-y-3 text-sm", tier.featured ? "text-white/85" : "text-muted")}>
                {tier.includes.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check
                      size={16}
                      strokeWidth={3}
                      className={cn("mt-0.5 shrink-0", tier.featured ? "text-accent-2" : "text-navy/45")}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <p className={cn("mt-6 text-xs", tier.featured ? "text-white/55" : "text-muted")}>
                Best for: {tier.bestFor}
              </p>

              <Link
                href={`/contact?plan=${tier.slug}`}
                className={cn(
                  "mt-5 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-[15px] font-medium transition",
                  tier.featured
                    ? "bg-white text-navy hover:bg-accent-2"
                    : "bg-navy text-white hover:bg-navy-2",
                )}
              >
                Get a fixed quote
              </Link>
            </article>
          ))}
        </div>

        {compact ? (
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/pricing">
              See full pricing
              <ArrowDisc />
            </Button>
            <Button href="/contact" variant="secondary">
              Talk through your scope
            </Button>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}

function TrackToggle({ trackId, onChange }: { trackId: TrackId; onChange: (id: TrackId) => void }) {
  return (
    <div
      role="tablist"
      aria-label="Delivery track"
      className="inline-flex w-full max-w-md self-start rounded-full border border-black/8 bg-white p-1"
    >
      {pricingTracks.map((track) => {
        const active = track.id === trackId;
        const Icon = track.id === "ai" ? Sparkles : Wrench;
        return (
          <button
            key={track.id}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange(track.id)}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition",
              active ? "bg-navy text-white" : "text-navy/60 hover:text-navy",
            )}
          >
            <Icon size={15} />
            {track.short}
          </button>
        );
      })}
    </div>
  );
}
