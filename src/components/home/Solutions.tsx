"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Smartphone,
  Globe,
  Sparkles,
  Palette,
  Rocket,
  Shield,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Layers,
  Terminal,
} from "lucide-react";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export function Solutions() {
  const [activePlatform, setActivePlatform] = useState<"flutter" | "nextjs" | "native">("flutter");
  const [promptQuery, setPromptQuery] = useState("Generate HIPAA-compliant auth pod");

  return (
    <Section id="solutions" className="relative">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Eyebrow>Capabilities &amp; Solutions</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-5xl">
              Engineered for Speed. <br className="hidden sm:inline" />
              Built for Scale.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              From high-velocity MVP launches to enterprise-grade AI architectures, our dedicated engineering pods handle the complete software lifecycle.
            </p>
          </div>

          <Link
            href="/solutions"
            className="group inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-semibold text-navy shadow-sm transition hover:border-black/20 hover:shadow-md"
          >
            Browse All 7 Practices
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: Mobile & Web Engineering (Large / Spans 2 cols on LG) */}
          <SpotlightCard className="lg:col-span-2 p-7 sm:p-9">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-navy text-accent-2 shadow-md">
                  <Smartphone size={22} />
                </span>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted">Core Engineering</span>
                  <h3 className="text-2xl font-bold text-navy">Mobile &amp; Web Platform Engineering</h3>
                </div>
              </div>

              {/* Platform Switcher */}
              <div className="flex rounded-full bg-paper p-1 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setActivePlatform("flutter")}
                  className={`rounded-full px-3 py-1.5 transition ${
                    activePlatform === "flutter" ? "bg-navy text-white shadow-sm" : "text-navy/70 hover:text-navy"
                  }`}
                >
                  Flutter
                </button>
                <button
                  type="button"
                  onClick={() => setActivePlatform("nextjs")}
                  className={`rounded-full px-3 py-1.5 transition ${
                    activePlatform === "nextjs" ? "bg-navy text-white shadow-sm" : "text-navy/70 hover:text-navy"
                  }`}
                >
                  Next.js 16
                </button>
                <button
                  type="button"
                  onClick={() => setActivePlatform("native")}
                  className={`rounded-full px-3 py-1.5 transition ${
                    activePlatform === "native" ? "bg-navy text-white shadow-sm" : "text-navy/70 hover:text-navy"
                  }`}
                >
                  React Native
                </button>
              </div>
            </div>

            <p className="mt-4 max-w-[65ch] text-sm leading-relaxed text-muted">
              Native-speed cross-platform apps and lightning-fast server-rendered web applications built on clean architectural patterns with 99%+ test coverage.
            </p>

            {/* Interactive Platform Preview */}
            <div className="mt-6 rounded-2xl border border-black/8 bg-paper/80 p-5">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-white p-3.5 shadow-sm border border-black/5">
                  <div className="text-xs text-muted">Code Sharing</div>
                  <div className="mt-1 text-lg font-bold text-navy">
                    {activePlatform === "flutter" ? "98% iOS & Android" : activePlatform === "nextjs" ? "100% Full-Stack" : "90% Cross-Platform"}
                  </div>
                  <div className="text-[11px] text-emerald-700 mt-0.5">Zero Duplication</div>
                </div>

                <div className="rounded-xl bg-white p-3.5 shadow-sm border border-black/5">
                  <div className="text-xs text-muted">Frame Rate / Performance</div>
                  <div className="mt-1 text-lg font-bold text-navy">
                    {activePlatform === "nextjs" ? "< 100ms LCP" : "60–120 FPS"}
                  </div>
                  <div className="text-[11px] text-emerald-700 mt-0.5">Smooth Transitions</div>
                </div>

                <div className="rounded-xl bg-white p-3.5 shadow-sm border border-black/5">
                  <div className="text-xs text-muted">Architecture</div>
                  <div className="mt-1 text-lg font-bold text-navy">
                    {activePlatform === "flutter" ? "BLoC / Clean" : activePlatform === "nextjs" ? "App Router + RSC" : "Redux / Zustand"}
                  </div>
                  <div className="text-[11px] text-navy/60 mt-0.5">Enterprise Ready</div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-black/5">
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="rounded-md bg-navy/5 px-2.5 py-1 text-navy font-medium">iOS &amp; Android</span>
                <span className="rounded-md bg-navy/5 px-2.5 py-1 text-navy font-medium">Web Portals</span>
                <span className="rounded-md bg-navy/5 px-2.5 py-1 text-navy font-medium">Offline Sync</span>
              </div>
              <Link
                href="/solutions/app-development"
                className="group inline-flex min-h-[24px] items-center gap-1.5 text-xs font-bold text-navy hover:text-navy-light"
              >
                Deep-dive into Mobile Apps
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </SpotlightCard>

          {/* Card 2: AI Practice & LLM Engineering */}
          <SpotlightCard dark className="p-7 sm:p-9 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-accent-2 shadow-inner">
                  <Sparkles size={22} />
                </span>
                <span className="rounded-full bg-accent-2/20 px-3 py-1 text-[11px] font-semibold text-accent-2">
                  High Demand
                </span>
              </div>

              <span className="mt-5 block text-xs font-semibold uppercase tracking-wider text-white/70">Next-Gen AI</span>
              <h3 className="mt-1 text-2xl font-bold text-white">AI Agents &amp; LLM Systems</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Custom RAG pipelines, fine-tuned domain models, and autonomous AI agents integrated directly into your product stack.
              </p>

              {/* Interactive Prompt Simulation Box */}
              <div className="mt-5 rounded-2xl border border-white/10 bg-black/40 p-4 font-mono text-xs">
                <div className="flex items-center gap-1.5 text-accent-2 text-[11px] mb-2">
                  <Terminal size={12} /> AI Pipeline Execution
                </div>
                <div className="rounded-lg bg-white/5 p-2 text-white/80 text-[11px] overflow-hidden truncate">
                  &gt; {promptQuery}
                </div>
                <div className="mt-2.5 flex items-center justify-between text-[10px] text-white/70">
                  <span>Audit: Senior Human Review</span>
                  <span className="text-emerald-400 font-sans font-semibold">Ready</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-accent-2 font-medium">PyTorch &middot; LangChain &middot; OpenAI</span>
              <Link
                href="/solutions/ai-development"
                className="group inline-flex min-h-[24px] items-center gap-1 text-xs font-bold text-white hover:text-accent-2"
              >
                AI Practice
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </SpotlightCard>

          {/* Card 3: Rapid MVP Prototyping */}
          <SpotlightCard className="p-7 sm:p-9 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-200">
                  <Rocket size={22} />
                </span>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted">Venture Speed</span>
                  <h3 className="text-xl font-bold text-navy">Rapid MVP in 14 Days</h3>
                </div>
              </div>

              <p className="mt-4 max-w-[65ch] text-sm leading-relaxed text-muted">
                Transform startup concepts into production-ready software in 2 weeks. Validated by investors, loved by early adopters.
              </p>

              {/* 14 Day Timeline Pill */}
              <div className="mt-6 space-y-2 rounded-2xl bg-paper p-4 text-xs">
                <div className="flex justify-between font-semibold text-navy">
                  <span>Sprint Progress</span>
                  <span className="text-accent-2 font-bold text-navy">Day 14 Launch</span>
                </div>
                <div className="h-2 w-full rounded-full bg-black/10 overflow-hidden">
                  <div className="h-full w-full rounded-full bg-gradient-to-r from-navy via-navy-light to-accent-2" />
                </div>
                <div className="flex justify-between text-[11px] text-muted pt-1">
                  <span>Spec &amp; Wireframe</span>
                  <span>Pod Build</span>
                  <span>Deploy</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between">
              <span className="text-xs font-medium text-navy/60">Fixed Scope &amp; Budget</span>
              <Link
                href="/solutions/mvp-prototyping"
                className="group inline-flex items-center gap-1 text-xs font-bold text-navy hover:text-navy-light"
              >
                Explore MVP
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </SpotlightCard>

          {/* Card 4: UI/UX & Design Systems */}
          <SpotlightCard className="p-7 sm:p-9 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-purple-50 text-purple-600 border border-purple-200">
                  <Palette size={22} />
                </span>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted">User Experience</span>
                  <h3 className="text-xl font-bold text-navy">Product Design &amp; UI/UX</h3>
                </div>
              </div>

              <p className="mt-4 max-w-[65ch] text-sm leading-relaxed text-muted">
                Obsessive attention to micro-interactions, typography, and cohesive design systems that delight users and drive conversion.
              </p>

              {/* Design Tokens Mock */}
              <div className="mt-6 grid grid-cols-4 gap-2 rounded-2xl bg-paper p-3.5 text-center">
                <div className="h-10 rounded-xl bg-navy grid place-items-center text-[10px] text-white font-bold">#09061A</div>
                <div className="h-10 rounded-xl bg-[#00F5A0] grid place-items-center text-[10px] text-navy font-bold">#00F5A0</div>
                <div className="h-10 rounded-xl bg-[#8A2BE2] grid place-items-center text-[10px] text-white font-bold">#8A2BE2</div>
                <div className="h-10 rounded-xl bg-white border border-black/10 grid place-items-center text-[10px] text-navy font-bold">#FFFFFF</div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between">
              <span className="text-xs font-medium text-navy/60">Figma &middot; Design Systems</span>
              <Link
                href="/solutions/product-design"
                className="group inline-flex items-center gap-1 text-xs font-bold text-navy hover:text-navy-light"
              >
                Design Practice
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </SpotlightCard>

          {/* Card 5: Enterprise Cloud & DevOps */}
          <SpotlightCard className="p-7 sm:p-9 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-200">
                  <Shield size={22} />
                </span>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted">Infrastructure</span>
                  <h3 className="text-xl font-bold text-navy">Cloud, DevOps &amp; SLA</h3>
                </div>
              </div>

              <p className="mt-4 max-w-[65ch] text-sm leading-relaxed text-muted">
                Continuous CI/CD automation, Kubernetes clusters, auto-scaling, and 24/7 reliability monitoring with guaranteed SLAs.
              </p>

              {/* Telemetry Mock */}
              <div className="mt-6 rounded-2xl bg-paper p-4 text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-muted">Global Cluster Status</span>
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> 100% Operational
                  </span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-black/5 text-[11px]">
                  <span className="text-muted">Automated Rollback</span>
                  <span className="text-navy font-medium">Zero Downtime</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between">
              <span className="text-xs font-medium text-navy/60">AWS &middot; Docker &middot; K8s</span>
              <Link
                href="/solutions/cloud"
                className="group inline-flex items-center gap-1 text-xs font-bold text-navy hover:text-navy-light"
              >
                DevOps Practice
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </SpotlightCard>
        </div>
      </Container>
    </Section>
  );
}
