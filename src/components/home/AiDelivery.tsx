"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Wrench, ShieldCheck, Zap, CheckCircle2, ArrowRight, Lock, Gauge } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { aiStats, aiPipeline } from "@/content/ai";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export function AiDelivery() {
  const [selectedTrack, setSelectedTrack] = useState<"ai" | "handcrafted">("ai");

  return (
    <Section className="relative overflow-hidden bg-navy text-white" data-nav-surface="dark">
      {/* Ambient background glows */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-accent-2/10 blur-[150px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-accent-purple/15 blur-[140px]"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        {/* Section Header with Track Toggle */}
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-semibold tracking-wider text-accent-2 uppercase backdrop-blur-md">
              <Sparkles size={14} />
              Dual-Track Delivery Engine
            </div>
            <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
              Two Ways to Ship. <br />
              Zero Compromise on Quality.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              Pick speed with senior review, or a fully hand-written track when policy forbids LLMs.
            </p>
          </div>

          {/* Interactive Track Toggle */}
          <div className="flex rounded-full border border-white/15 bg-white/5 p-1.5 backdrop-blur-xl">
            <button
              type="button"
              aria-pressed={selectedTrack === "ai"}
              onClick={() => setSelectedTrack("ai")}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                selectedTrack === "ai"
                  ? "bg-accent-2 text-navy shadow-lg shadow-accent-2/20"
                  : "text-white/85 hover:text-white"
              }`}
            >
              <Zap size={15} />
              AI-Driven (Speed &amp; Value)
            </button>
            <button
              type="button"
              aria-pressed={selectedTrack === "handcrafted"}
              onClick={() => setSelectedTrack("handcrafted")}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                selectedTrack === "handcrafted"
                  ? "bg-white text-navy shadow-lg"
                  : "text-white/85 hover:text-white"
              }`}
            >
              <ShieldCheck size={15} />
              100% Hand-Crafted (Enterprise)
            </button>
          </div>
        </div>

        {/* Selected Track Deep-Dive Card */}
        <div className="mt-10 rounded-[32px] border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6 backdrop-blur-2xl sm:p-8">
          {selectedTrack === "ai" ? (
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-accent-2/20 px-3 py-1 text-xs font-semibold text-accent-2">
                  <Zap size={13} /> Recommended for Startups &amp; Fast Growth
                </div>
                <h3 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                  AI-Driven Development Pod
                </h3>
                <p className="mt-3 text-base leading-relaxed text-white/85">
                  AI drafts. Senior architects review every line. You ship faster without giving up ownership.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-accent-2 shrink-0 mt-0.5" />
                    <span>2x to 3x Sprint Velocity</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-accent-2 shrink-0 mt-0.5" />
                    <span>Automated Unit &amp; E2E Testing</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-accent-2 shrink-0 mt-0.5" />
                    <span>100% Senior Human Code Review</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-accent-2 shrink-0 mt-0.5" />
                    <span>Full IP Ownership from Day 1</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/pricing"
                    className="inline-flex items-center gap-2 rounded-full bg-accent-2 px-6 py-3 text-sm font-bold text-navy shadow-lg shadow-accent-2/20 transition hover:bg-emerald-300"
                  >
                    View AI Pod Pricing
                    <ArrowRight size={15} />
                  </Link>
                  <span className="text-xs text-white/60">Tiers from $1,800/sprint</span>
                </div>
              </div>

              {/* Stats Highlights for AI Track */}
              <div className="grid gap-3 sm:grid-cols-2">
                {aiStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm"
                  >
                    <div className="text-3xl font-extrabold text-accent-2">{stat.value}</div>
                    <div className="mt-2 text-sm font-medium leading-snug text-white/80">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
                  <Lock size={13} /> Strict Enterprise Compliance &amp; IP Isolation
                </div>
                <h3 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                  Hand-Crafted Engineering Pod
                </h3>
                <p className="mt-3 text-base leading-relaxed text-white/85">
                  No generated code. Written by named engineers. Built for regulated healthcare and finance.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-white shrink-0 mt-0.5" />
                    <span>Zero AI LLM Assistance</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-white shrink-0 mt-0.5" />
                    <span>Strict IP &amp; NDA Isolation</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-white shrink-0 mt-0.5" />
                    <span>HIPAA &amp; SOC-2 Type II Ready</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-white shrink-0 mt-0.5" />
                    <span>Formal Verification Architecture</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/pricing"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-navy shadow-lg transition hover:bg-gray-100"
                  >
                    View Enterprise Pricing
                    <ArrowRight size={15} />
                  </Link>
                  <span className="text-xs text-white/60">Tiers from $2,400/sprint</span>
                </div>
              </div>

              {/* Enterprise Guarantee Badges */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="text-3xl font-extrabold text-white">100%</div>
                  <div className="mt-2 text-xs font-medium text-white/70">Human-Authored Clean Code</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="text-3xl font-extrabold text-white">0</div>
                  <div className="mt-2 text-xs font-medium text-white/70">External AI Model Data Leakage</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="text-3xl font-extrabold text-white">ISO/IEC</div>
                  <div className="mt-2 text-xs font-medium text-white/70">Rigorous Quality &amp; Security</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="text-3xl font-extrabold text-white">Dedicated</div>
                  <div className="mt-2 text-xs font-medium text-white/70">Senior Engineers in Lahore</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quality Gates Pipeline */}
        <div className="mt-14">
          <h4 className="text-center text-xs font-semibold tracking-widest text-white/70 uppercase">
            Our Automated Quality Gates
          </h4>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {aiPipeline.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-accent-2/40 hover:bg-white/[0.06]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-accent-2">{step.number}</span>
                  <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-medium text-white/80">
                    Gate: {step.gate}
                  </span>
                </div>
                <h5 className="mt-4 text-lg font-bold text-white">{step.title}</h5>
                <p className="mt-2 text-sm leading-relaxed text-white/80">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
