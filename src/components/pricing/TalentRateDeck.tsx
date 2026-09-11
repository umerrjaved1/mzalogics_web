"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ArrowRight,
  ShieldCheck,
  Clock,
  Zap,
  Award,
  Sparkles,
  Users,
  ExternalLink,
} from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/Container";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Avatar } from "@/components/ui/Avatar";
import { team, TeamMember } from "@/content/team";
import { cn } from "@/lib/cn";

export function TalentRateDeck() {
  const [billingPeriod, setBillingPeriod] = useState<"hourly" | "monthly">("hourly");

  // Representative team members for each tier
  const seniors = team.filter((m) => m.seniority === "Senior / Lead").slice(0, 2);
  const mids = team.filter((m) => m.seniority === "Mid-Level").slice(0, 2);
  const juniors = team.filter((m) => m.seniority === "Junior / Associate").slice(0, 2);

  const tiers = [
    {
      id: "senior",
      name: "Senior / Lead",
      badge: "Flagship Talent",
      roleHighlight: "Architects & Technical Leads",
      seniorityParam: "Senior / Lead",
      hourlyPrice: "$50 – $70",
      hourlyPeriod: "/ hour",
      monthlyPrice: "$4,800 – $6,200",
      monthlyPeriod: "/ month (Full-Time)",
      accentBorder: "border-accent-2/40 hover:border-accent-2",
      badgeClass: "bg-accent-2/15 text-accent-2 border-accent-2/30",
      spotlightColor: "rgba(0, 245, 160, 0.15)",
      experience: "6–10+ Years Pedigree",
      summary:
        "Senior architects and principal leads who own system design, enforce strict code review gates, and mentor your existing team.",
      specialists: seniors,
      features: [
        "Architectural autonomy & high-stakes decisions",
        "Mobile leads (Flutter/iOS), Next.js 16, AI/LLMs",
        "Direct daily strategic syncs & sprint governance",
        "100% code review & pull request gatekeeping",
      ],
      popular: true,
    },
    {
      id: "mid",
      name: "Mid-Level Specialist",
      badge: "High Velocity",
      roleHighlight: "Full-Stack & DevOps Engineers",
      seniorityParam: "Mid-Level",
      hourlyPrice: "$35 – $48",
      hourlyPeriod: "/ hour",
      monthlyPrice: "$3,400 – $4,200",
      monthlyPeriod: "/ month (Full-Time)",
      accentBorder: "border-accent-cyan/40 hover:border-accent-cyan",
      badgeClass: "bg-accent-cyan/15 text-accent-cyan border-accent-cyan/30",
      spotlightColor: "rgba(34, 211, 238, 0.15)",
      experience: "3–5 Years Experience",
      summary:
        "Independent, autonomous engineers who hit the ground running on day one, shipping polished features in reliable 2-week sprints.",
      specialists: mids,
      features: [
        "Autonomous feature shipping & API integrations",
        "Full-stack Next.js, Node.js, Cloud CI/CD",
        "UI component systems & pixel-perfect execution",
        "Daily standups, Slack rituals & Jira velocity",
      ],
      popular: false,
    },
    {
      id: "junior",
      name: "Junior / Associate",
      badge: "Cost-Efficient Builder",
      roleHighlight: "Frontend & QA Specialists",
      seniorityParam: "Junior / Associate",
      hourlyPrice: "$20 – $28",
      hourlyPeriod: "/ hour",
      monthlyPrice: "$2,200 – $2,800",
      monthlyPeriod: "/ month (Full-Time)",
      accentBorder: "border-emerald-400/40 hover:border-emerald-400",
      badgeClass: "bg-emerald-400/15 text-emerald-400 border-emerald-400/30",
      spotlightColor: "rgba(52, 211, 153, 0.15)",
      experience: "1–2 Years Experience",
      summary:
        "High-aptitude university graduates vetted and supervised by our senior technical leads. Unbeatable ROI for styling, QA, and rapid bug triage.",
      specialists: juniors,
      features: [
        "Directly supervised by Senior Technical Lead",
        "Rapid UI styling, Tailwind CSS & bug triage",
        "QA test suite creation & automated regression",
        "Maximum cost efficiency for scaling engineering",
      ],
      popular: false,
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-[#0c0824] via-[#09051d] to-[#120a32] p-6 text-white shadow-[0_30px_90px_rgba(9,5,29,0.35)] sm:p-10 lg:p-12">
      {/* Ambient glowing orbs */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-accent-2/10 blur-[100px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-accent-purple/15 blur-[120px]"
        aria-hidden="true"
      />

      {/* Header section with title and billing toggle */}
      <div className="relative z-10 flex flex-col items-start justify-between gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-accent-cyan backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-2 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-2" />
            </span>
            <span>People-Powered Delivery • Direct Talent Hire</span>
          </div>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Pick &amp; Hire Specialists{" "}
            <span className="bg-gradient-to-r from-accent-2 via-accent-cyan to-white bg-clip-text text-transparent">
              by Seniority
            </span>
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
            Prefer embedding individual engineers into your existing rituals instead of a managed pod? Pick vetted talent directly with transparent, seniority-based pricing.
          </p>
        </div>

        {/* Interactive Billing Toggle */}
        <div className="flex flex-col items-start gap-2 sm:items-end">
          <span className="text-xs font-medium text-white/60">Choose Billing Mode</span>
          <div className="inline-flex items-center rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur-md">
            <button
              onClick={() => setBillingPeriod("hourly")}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-semibold transition-all",
                billingPeriod === "hourly"
                  ? "bg-white text-navy shadow-md"
                  : "text-white/75 hover:text-white"
              )}
            >
              Hourly Rate ($/hr)
            </button>
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all",
                billingPeriod === "monthly"
                  ? "bg-gradient-to-r from-accent-2 to-accent-cyan text-navy font-bold shadow-md"
                  : "text-white/75 hover:text-white"
              )}
            >
              <span>Monthly Dedicated</span>
              <span className="rounded-full bg-navy/20 px-1.5 py-0.5 text-[10px] font-extrabold text-navy">
                Save 15%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Tier Cards */}
      <div className="relative z-10 mt-8 grid gap-6 lg:grid-cols-3">
        {tiers.map((tier) => (
          <SpotlightCard
            key={tier.id}
            dark={true}
            spotlightColor={tier.spotlightColor}
            className={cn(
              "flex flex-col justify-between border-2 bg-white/[0.04] p-6 backdrop-blur-xl transition-all duration-300 sm:p-8",
              tier.accentBorder,
              tier.popular ? "shadow-[0_0_30px_rgba(0,245,160,0.1)] ring-1 ring-accent-2/30" : ""
            )}
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between gap-3">
                <span
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider",
                    tier.badgeClass
                  )}
                >
                  {tier.badge}
                </span>
                <span className="text-xs font-medium text-white/70">{tier.experience}</span>
              </div>

              <h3 className="mt-4 text-2xl font-bold text-white">{tier.name}</h3>
              <p className="text-xs font-medium text-white/60">{tier.roleHighlight}</p>

              {/* Price Tag with dynamic animation */}
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold tracking-tight text-white">
                    {billingPeriod === "hourly" ? tier.hourlyPrice : tier.monthlyPrice}
                  </span>
                  <span className="text-xs font-semibold text-white/60">
                    {billingPeriod === "hourly" ? tier.hourlyPeriod : tier.monthlyPeriod}
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-white/40">
                  {billingPeriod === "hourly"
                    ? "Flexible hours • Billed weekly against logged sprint tickets"
                    : "160 hours / month • Dedicated exclusive allocation"}
                </p>
              </div>

              {/* Summary */}
              <p className="mt-4 text-xs leading-relaxed text-white/70">{tier.summary}</p>

              {/* Featured Specialists Avatars & Names */}
              <div className="mt-6 border-t border-white/10 pt-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-white/70">
                  Available in this Tier
                </span>
                <div className="mt-3 space-y-2.5">
                  {tier.specialists.map((member) => (
                    <Link
                      key={member.slug}
                      href={`/team/${member.slug}`}
                      className="group flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] p-2 transition hover:border-white/20 hover:bg-white/[0.08]"
                    >
                      <div className="flex items-center gap-2.5">
                        <Avatar
                          initials={member.initials}
                          tone={member.tone}
                          image={member.image}
                          alt={member.name}
                          size="sm"
                          showStatus={true}
                        />
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-accent-cyan transition">
                            {member.name}
                          </div>
                          <div className="text-[10px] text-white/70">{member.role}</div>
                        </div>
                      </div>
                      <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-accent-2 opacity-80 group-hover:opacity-100">
                        View Hero →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Features List */}
              <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-4 text-xs text-white/80">
                {tier.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2">
                    <Check size={14} className="mt-0.5 shrink-0 text-accent-2" strokeWidth={3} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action CTA Button */}
            <div className="mt-8 border-t border-white/10 pt-4">
              <Link
                href={`/contact?seniority=${encodeURIComponent(tier.seniorityParam)}`}
                className={cn(
                  "flex w-full items-center justify-center gap-2 rounded-full py-3 text-center text-xs font-bold transition duration-200 shadow-md",
                  tier.popular
                    ? "bg-gradient-to-r from-accent-2 to-accent-cyan text-navy hover:opacity-95 hover:shadow-[0_0_20px_rgba(0,245,160,0.3)]"
                    : "border border-white/20 bg-white/10 text-white hover:bg-white hover:text-navy"
                )}
              >
                <span>Hire {tier.name} Directly</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* Footer Trust Bar & Directory Link */}
      <div className="relative z-10 mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-center sm:flex-row sm:text-left">
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-white/60 sm:justify-start">
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-accent-cyan" />
            <span>48-Hour Matching SLA</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-accent-2" />
            <span>100% Replacement Guarantee</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Award size={14} className="text-amber-400" />
            <span>100% Client IP Ownership</span>
          </div>
        </div>

        <Link
          href="/team"
          className="inline-flex items-center gap-2 text-xs font-bold text-accent-2 hover:underline"
        >
          <span>Browse All {team.length} Team Members &amp; Shipped Portfolios</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
