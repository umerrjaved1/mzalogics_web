"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, ShieldCheck, UserCheck, Users, Sparkles, Zap } from "lucide-react";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { Button, ArrowDisc } from "@/components/ui/Button";
import { TeamCard } from "@/components/TeamGrid";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { team, teamPortfolio, seniorityLevels } from "@/content/team";
import type { SeniorityLevel } from "@/content/team";
import { site } from "@/lib/site";

export function TeamSection() {
  const [selectedSeniority, setSelectedSeniority] = useState<string>("all");

  const filteredTeam = team.filter((m) => {
    if (selectedSeniority === "all") return true;
    return m.seniority === selectedSeniority;
  });

  const portfolio = teamPortfolio().slice(0, 4);

  return (
    <Section id="team" className="relative">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Eyebrow>People-Powered Delivery</Eyebrow>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-5xl">
              Meet Your Dedicated Engineering Pod
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              {site.teamSize} vetted engineers, architects, designers, and QA specialists in Lahore. No bait-and-switch between pitch and delivery. Pick the exact seniority and rate card that fits your budget.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button href="/team" className="shadow-sm">
              Explore All Specialists
              <ArrowDisc />
            </Button>
          </div>
        </div>

        {/* Talent Choice / Seniority Filter Pills */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-black/8 bg-white p-3.5 shadow-sm">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted mr-1 hidden sm:inline">
              Choose by Seniority:
            </span>
            <button
              type="button"
              aria-pressed={selectedSeniority === "all"}
              onClick={() => setSelectedSeniority("all")}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                selectedSeniority === "all"
                  ? "bg-navy text-white shadow-sm"
                  : "bg-paper text-navy/70 hover:text-navy"
              }`}
            >
              All Tiers ({team.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedSeniority("Senior / Lead")}
              aria-pressed={selectedSeniority === "Senior / Lead"}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition ${
                selectedSeniority === "Senior / Lead"
                  ? "bg-navy text-emerald-300 shadow-sm"
                  : "bg-paper text-navy/70 hover:text-navy"
              }`}
            >
              <ShieldCheck size={13} />
              Senior &amp; Leads ($48–$70/hr)
            </button>
            <button
              type="button"
              onClick={() => setSelectedSeniority("Mid-Level")}
              aria-pressed={selectedSeniority === "Mid-Level"}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition ${
                selectedSeniority === "Mid-Level"
                  ? "bg-navy text-white shadow-sm"
                  : "bg-paper text-navy/70 hover:text-navy"
              }`}
            >
              <Zap size={13} />
              Mid-Level ($32–$38/hr)
            </button>
            <button
              type="button"
              onClick={() => setSelectedSeniority("Junior / Associate")}
              aria-pressed={selectedSeniority === "Junior / Associate"}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition ${
                selectedSeniority === "Junior / Associate"
                  ? "bg-navy text-white shadow-sm"
                  : "bg-paper text-navy/70 hover:text-navy"
              }`}
            >
              <Sparkles size={13} />
              Junior ($20–$24/hr)
            </button>
          </div>

          <div className="text-xs text-muted font-medium">
            Direct Hire &middot; 48h Pod Match
          </div>
        </div>

        {/* Team Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTeam.slice(0, 6).map((member) => (
            <TeamCard key={member.slug} member={member} />
          ))}
        </div>

        {/* Shipped Work Portfolio Strip */}
        <div className="mt-16 pt-12 border-t border-black/8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-muted">
                Track Record &amp; Proof
              </span>
              <h3 className="mt-1 text-2xl font-bold text-navy">
                Recent Projects Shipped by This Team
              </h3>
            </div>
            <Link
              href="/work"
              className="group inline-flex min-h-[24px] items-center gap-1.5 text-xs font-bold text-navy hover:text-navy-light"
            >
              View all verified case studies
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {portfolio.map((project) => (
              <SpotlightCard
                key={`${project.member.slug}-${project.title}`}
                className="p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-muted">
                    <span>{project.year}</span>
                    <span className="rounded-md bg-paper px-2 py-0.5 text-[10px] text-navy">
                      {project.role}
                    </span>
                  </div>

                  <h4 className="mt-3 text-base font-bold leading-snug text-navy line-clamp-2">
                    {project.title}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-muted line-clamp-3">
                    {project.summary}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-black/5">
                  <div className="text-xs font-bold text-emerald-700 font-mono">
                    {project.metric}
                  </div>
                  <div className="mt-1 text-[11px] text-muted font-medium truncate">
                    Lead: {project.member.name}
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
