"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  Users,
  Compass,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Layers,
  HeartHandshake,
  Zap,
} from "lucide-react";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

const pillars = [
  {
    id: "accessibility",
    icon: <Compass size={22} />,
    tag: "Pillar 01",
    title: "Accessibility First",
    headline: "Enterprise-Grade Power, Within Your Reach",
    body: "Custom software isn't a luxury reserved for Fortune 500 giants — it is a strategic advantage every ambitious business can afford. We bridge enterprise engineering pedigree with flexible sprint pricing so growing companies can compete and win.",
    highlight: "Q4 deal · Launch from $2,150",
    accent: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-cyan-400",
  },
  {
    id: "craftsmanship",
    icon: <ShieldCheck size={22} />,
    tag: "Pillar 02",
    title: "Craftsmanship & Trust",
    headline: "Built by Senior Minds. Delivered by Trusted Hands.",
    body: "Founded in 2021 by senior engineers who chose to build something meaningful. We back our work with verifiable experience, zero hype, and named engineers who review every pull request. No bait-and-switch between pitch and delivery.",
    highlight: "100% Client Code Ownership",
    accent: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-400",
  },
  {
    id: "people",
    icon: <Users size={22} />,
    tag: "Pillar 03",
    title: "People-Powered Delivery",
    headline: "Scale Teams Instantly with Vetted Lahore Talent",
    body: "Our deep engineering network is your unfair advantage. Pick exactly the talent your project needs — from veteran solutions architects to productive mid-level engineers and cost-effective junior developers — all vetted, aligned, and ready in 48 hours.",
    highlight: "Transparent Rates: Junior to Lead",
    accent: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
  },
  {
    id: "tailored",
    icon: <Sparkles size={22} />,
    tag: "Pillar 04",
    title: "Tailored, Not Templated",
    headline: "Software Designed for How You Actually Operate",
    body: "Every business has unique operational gravity. We reject one-size-fits-all templates and off-the-shelf compromises. We build software that molds around your workflows, your team, and your customers — never the other way around.",
    highlight: "100% Bespoke Architecture",
    accent: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-400",
  },
];

const sideBySideComparison = [
  {
    criteria: "Design & Architecture",
    mza: "Bespoke systems modeled around your specific workflow, team habits, and business logic.",
    others: "Generic cookie-cutter templates or off-the-shelf themes forced onto your business.",
  },
  {
    criteria: "Talent Transparency",
    mza: "Client picks individual engineers (Junior, Mid, Senior) with transparent hourly & monthly rates.",
    others: "Senior partners pitch you; unvetted junior developers build your codebase behind closed doors.",
  },
  {
    criteria: "Intellectual Property",
    mza: "100% client code ownership from Day 1 with direct GitHub repo access and full IP indemnification.",
    others: "Proprietary vendor lock-in or source code held hostage until the final retainer invoice.",
  },
  {
    criteria: "Speed to Market",
    mza: "14-day rapid MVP sprint pilot with optional AI-accelerated delivery track for 2x velocity.",
    others: "3 to 6 months of bloated scoping meetings before you see a single testable prototype.",
  },
  {
    criteria: "Collaboration & Sync",
    mza: "Direct communication via dedicated Slack/WhatsApp with your named engineers and daily standups.",
    others: "Layers of account managers filtering messages with 48-hour email turnaround times.",
  },
];

export function Comparison() {
  const [activePillar, setActivePillar] = useState(pillars[0].id);
  const selectedPillar = pillars.find((p) => p.id === activePillar) ?? pillars[0];

  return (
    <Section id="why-us" className="relative overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Eyebrow>Why MZA Logics</Eyebrow>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-5xl">
            Software Built Around You — <br />
            <span className="bg-gradient-to-r from-navy via-navy-light to-accent-cyan bg-clip-text text-transparent">
              Not the Other Way Around.
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            Enterprise experience. Startup agility. Personal focus. We combine senior engineering craftsmanship with transparent, flexible talent so your software fits the way you work.
          </p>
        </div>

        {/* Vision Pillars Interactive Showcase */}
        <div className="mt-14 grid gap-6 lg:grid-cols-[340px_1fr] items-start">
          {/* Pillar Selector Buttons */}
          <div className="flex flex-col gap-2.5">
            {pillars.map((pillar) => (
              <button
                key={pillar.id}
                type="button"
                onClick={() => setActivePillar(pillar.id)}
                className={`flex items-center gap-3.5 rounded-2xl p-4 text-left transition-all duration-200 ${
                  activePillar === pillar.id
                    ? "bg-navy text-white shadow-lg shadow-navy/20 scale-[1.02]"
                    : "bg-white border border-black/8 text-navy hover:bg-paper hover:border-black/15"
                }`}
              >
                <span
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                    activePillar === pillar.id ? "bg-white/10 text-accent-2" : "bg-black/5 text-navy/70"
                  }`}
                >
                  {pillar.icon}
                </span>
                <div className="overflow-hidden">
                  <div className={`text-[10px] font-bold uppercase tracking-wider ${
                    activePillar === pillar.id ? "text-accent-2" : "text-muted"
                  }`}>
                    {pillar.tag}
                  </div>
                  <div className="text-sm font-bold truncate">{pillar.title}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Active Pillar Detailed Card */}
          <SpotlightCard className="p-8 sm:p-10 border border-black/10 bg-white">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="rounded-full bg-navy/5 px-3 py-1 text-xs font-bold text-navy uppercase tracking-wider">
                {selectedPillar.tag} &middot; {selectedPillar.title}
              </span>
              <span className="rounded-full bg-accent-2/20 border border-accent-2/40 px-3 py-1 text-xs font-bold text-navy">
                {selectedPillar.highlight}
              </span>
            </div>

            <h3 className="mt-5 text-2xl font-extrabold text-navy sm:text-3xl leading-snug">
              {selectedPillar.headline}
            </h3>

            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              {selectedPillar.body}
            </p>

            <div className="mt-8 pt-6 border-t border-black/8 grid gap-4 sm:grid-cols-2 text-xs">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={18} className="text-emerald-700 shrink-0 mt-0.5" />
                <span className="text-navy/80 font-medium">
                  Direct partnership with vetted technical architects in Lahore.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={18} className="text-emerald-700 shrink-0 mt-0.5" />
                <span className="text-navy/80 font-medium">
                  No forced vendor lock-in; complete code handover on every sprint.
                </span>
              </div>
            </div>
          </SpotlightCard>
        </div>

        {/* Side-by-Side Model Comparison Matrix */}
        <div className="mt-16">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-xl font-bold text-navy sm:text-2xl">
              How We Compare to Traditional Agency Overhead
            </h3>
            <p className="mt-2 text-xs text-muted sm:text-sm">
              See why modern founders switch from template shops to MZA Logics.
            </p>
          </div>

          <div className="overflow-hidden rounded-[32px] border border-black/8 bg-white shadow-[0_12px_40px_rgba(9,6,26,0.04)]">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-black/8">
              {/* Column 1: MZA Logics (Vision Aligned) */}
              <div className="p-7 sm:p-9 bg-navy/[0.02]">
                <div className="flex items-center justify-between pb-4 border-b border-black/8">
                  <div className="flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-navy text-accent-2">
                      <Sparkles size={15} />
                    </span>
                    <span className="text-lg font-bold text-navy">The MZA Logics Model</span>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                    Client-First
                  </span>
                </div>

                <div className="mt-6 space-y-6">
                  {sideBySideComparison.map((item) => (
                    <div key={item.criteria}>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-muted">
                        {item.criteria}
                      </div>
                      <div className="mt-1 flex items-start gap-2 text-xs sm:text-sm font-semibold text-navy leading-relaxed">
                        <CheckCircle2 size={16} className="text-emerald-700 shrink-0 mt-0.5" />
                        <span>{item.mza}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Traditional Agency Approach */}
              <div className="p-7 sm:p-9 bg-paper/50">
                <div className="flex items-center justify-between pb-4 border-b border-black/8">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-muted">Traditional Agencies &amp; Template Shops</span>
                  </div>
                  <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-[10px] font-bold text-rose-700">
                    Legacy Agency
                  </span>
                </div>

                <div className="mt-6 space-y-6">
                  {sideBySideComparison.map((item) => (
                    <div key={item.criteria}>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-muted">
                        {item.criteria}
                      </div>
                      <div className="mt-1 flex items-start gap-2 text-xs sm:text-sm text-muted leading-relaxed">
                        <XCircle size={16} className="text-rose-400 shrink-0 mt-0.5" />
                        <span>{item.others}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-12 rounded-[28px] bg-gradient-to-r from-navy via-navy to-navy-2 p-8 text-white text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-6 shadow-xl">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-accent-2">
              Ready for Software Made for You?
            </span>
            <h4 className="mt-1 text-xl font-bold text-white sm:text-2xl">
              Let&apos;s build software that fits your business — not the other way around.
            </h4>
          </div>
          <Link
            href="/contact"
            className="mt-5 sm:mt-0 inline-flex items-center gap-2 rounded-full bg-accent-2 px-6 py-3 text-xs font-bold text-navy shadow-lg shadow-accent-2/20 transition hover:bg-emerald-300 shrink-0"
          >
            Schedule Discovery Call
            <ArrowRight size={15} />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
