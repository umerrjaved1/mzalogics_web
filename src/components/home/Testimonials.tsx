"use client";

import React, { useState } from "react";
import { Star, Quote, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { testimonials } from "@/content/testimonials";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

type FilterType = "all" | "ai" | "handcrafted";

export function Testimonials() {
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredItems = testimonials.filter((item) => {
    if (filter === "all") return true;
    if (filter === "ai") return item.note.toLowerCase().includes("ai");
    if (filter === "handcrafted") return item.note.toLowerCase().includes("hand-crafted");
    return true;
  });

  return (
    <Section id="testimonials" className="relative">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Eyebrow>Client Stories &amp; Social Proof</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-5xl">
              Trusted by 50+ Modern Founders and Engineering Leaders
            </h2>
            <p className="mt-4 text-base text-muted sm:text-lg">
              Here is what founders, COOs, and product managers say about shipping software with MZA Logics.
            </p>
          </div>

          {/* Track Filter Pills */}
          <div className="flex rounded-full bg-paper p-1 text-xs font-semibold text-navy">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`rounded-full px-4 py-2 transition ${
                filter === "all" ? "bg-navy text-white shadow-sm" : "text-navy/70 hover:text-navy"
              }`}
            >
              All Clients
            </button>
            <button
              type="button"
              onClick={() => setFilter("ai")}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 transition ${
                filter === "ai" ? "bg-navy text-white shadow-sm" : "text-navy/70 hover:text-navy"
              }`}
            >
              <Sparkles size={12} className={filter === "ai" ? "text-accent-2" : ""} />
              AI Track
            </button>
            <button
              type="button"
              onClick={() => setFilter("handcrafted")}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 transition ${
                filter === "handcrafted" ? "bg-navy text-white shadow-sm" : "text-navy/70 hover:text-navy"
              }`}
            >
              <ShieldCheck size={12} />
              Hand-Crafted
            </button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.slice(0, 6).map((item) => (
            <SpotlightCard key={item.name} className="p-7 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Rating & Track Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>

                  {item.note ? (
                    <span className="rounded-full bg-navy/5 px-2.5 py-0.5 text-[10px] font-bold text-navy uppercase tracking-wider">
                      {item.note}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                      <CheckCircle2 size={12} /> Verified Client
                    </span>
                  )}
                </div>

                <blockquote className="mt-6 text-sm leading-relaxed text-navy font-medium sm:text-[15px]">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
              </div>

              <div className="mt-8 pt-5 border-t border-black/5 flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-navy to-navy-light text-xs font-bold text-white shadow-sm">
                  {item.name
                    .split(" ")
                    .slice(0, 2)
                    .map((part) => part[0])
                    .join("")}
                </span>
                <div className="overflow-hidden">
                  <div className="text-sm font-bold text-navy truncate">{item.name}</div>
                  <div className="text-xs text-muted truncate">{item.role}</div>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* Aggregate Ratings Banner */}
        <div className="mt-12 rounded-2xl border border-black/8 bg-paper p-6 text-center sm:flex sm:items-center sm:justify-around">
          <div className="py-2">
            <div className="text-2xl font-extrabold text-navy">4.9 / 5.0</div>
            <div className="text-xs text-muted">Clutch &amp; GoodFirms Verified</div>
          </div>
          <div className="hidden h-8 w-px bg-black/10 sm:block" />
          <div className="py-2">
            <div className="text-2xl font-extrabold text-navy">100%</div>
            <div className="text-xs text-muted">On-Time Sprint Milestones</div>
          </div>
          <div className="hidden h-8 w-px bg-black/10 sm:block" />
          <div className="py-2">
            <div className="text-2xl font-extrabold text-navy">92%</div>
            <div className="text-xs text-muted">Client Retention &amp; Extension Rate</div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
