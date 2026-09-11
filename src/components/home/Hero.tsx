"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Terminal,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Zap,
  Globe2,
  Code2,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button, ArrowDisc } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { site } from "@/lib/site";

const avatars = [
  { initials: "AM", name: "Apex Media", bg: "bg-blue-600" },
  { initials: "SK", name: "SaaS Kit", bg: "bg-emerald-700" },
  { initials: "RL", name: "Remit Logic", bg: "bg-purple-600" },
  { initials: "JT", name: "Jupiter Tech", bg: "bg-amber-700" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-24">
      {/* Ambient background glow orbs */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-accent-2/15 via-accent-cyan/10 to-transparent blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-40 right-[-100px] h-[400px] w-[400px] rounded-full bg-accent-purple/10 blur-[100px]"
        aria-hidden="true"
      />

      <Container className="relative z-10 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* Left Column: Headline, Value Proposition & Actions */}
        <div className="flex flex-col items-start">
          {/* Live Availability & Social Proof Pill */}
          <motion.div
            initial={{ y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex flex-wrap items-center gap-3 rounded-full border border-black/8 bg-white/90 py-1.5 pl-2 pr-4 shadow-[0_4px_20px_rgba(9,6,26,0.04)] backdrop-blur-md"
          >
            <div className="flex -space-x-2">
              {avatars.map((av) => (
                <span
                  key={av.initials}
                  title={av.name}
                  className={`grid h-7 w-7 place-items-center rounded-full border-2 border-white ${av.bg} text-[10px] font-bold text-white shadow-sm`}
                >
                  {av.initials}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-navy">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>Available for Q2/Q3 Pods</span>
              <span className="text-muted">·</span>
              <span className="text-muted font-normal">50+ Global Clients</span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="mt-6 text-4xl font-extrabold tracking-[-0.04em] text-navy sm:text-6xl lg:text-[68px] lg:leading-[1.08]"
          >
            Custom Software, Built for the{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-navy via-navy-light to-navy-2 bg-clip-text text-transparent">
                Way You Work
              </span>
              <span
                className="absolute -bottom-1 left-0 h-[6px] w-full rounded-full bg-gradient-to-r from-accent-2 to-accent-cyan/80 opacity-70"
                aria-hidden="true"
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
          >
            <strong className="font-semibold text-navy">Software built around you — not the other way around.</strong> Founded by senior engineers in Lahore, we bridge enterprise-grade architecture with startup agility. Build tailored mobile apps, custom web platforms, and AI systems designed for how your business actually operates.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <MagneticButton>
              <Button href="/contact" className="h-12 px-6 text-base font-semibold shadow-lg shadow-navy/15 transition-transform hover:scale-[1.02]">
                Book a Discovery Call
                <ArrowDisc />
              </Button>
            </MagneticButton>

            <Link
              href="/solutions"
              className="group inline-flex h-12 items-center gap-2 rounded-full border border-black/10 bg-white/80 px-5 text-sm font-semibold text-navy shadow-sm backdrop-blur-sm transition-all hover:border-black/20 hover:bg-white hover:shadow-md"
            >
              Explore Solutions
              <span className="grid h-7 w-7 place-items-center rounded-full bg-black/5 transition-transform group-hover:translate-x-1">
                <ArrowRight size={14} />
              </span>
            </Link>
          </motion.div>

          {/* Metric Highlights */}
          <motion.div
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 grid grid-cols-3 gap-6 border-t border-black/8 pt-6 sm:gap-10"
          >
            <div>
              <div className="text-2xl font-extrabold text-navy sm:text-3xl">50+</div>
              <div className="text-xs font-medium text-muted mt-0.5">Shipped Worldwide</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-navy sm:text-3xl">2x</div>
              <div className="text-xs font-medium text-muted mt-0.5">Sprint Velocity</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-navy sm:text-3xl">&lt; 24h</div>
              <div className="text-xs font-medium text-muted mt-0.5">Response SLA</div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: 3D Interactive Agency Tech Console */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="relative w-full"
        >
          <InteractiveTechConsole />
        </motion.div>
      </Container>
    </section>
  );
}

function InteractiveTechConsole() {
  const [activeTab, setActiveTab] = useState<"ai" | "mobile" | "cloud">("ai");
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt Physics using Framer Motion
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-150, 150], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-150, 150], [-8, 8]), { stiffness: 200, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative mx-auto w-full max-w-[560px] perspective-[1200px]"
    >
      {/* Floating Orbital Badges */}
      <motion.div
        animate={{ y: [-4, 6, -4] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute -top-5 -left-4 z-20 hidden rounded-2xl border border-white/20 bg-navy/90 px-3.5 py-2 text-xs font-semibold text-white shadow-xl backdrop-blur-xl sm:flex sm:items-center sm:gap-2"
      >
        <span className="grid h-6 w-6 place-items-center rounded-lg bg-accent-2/20 text-accent-2">
          <Zap size={14} />
        </span>
        <span>AI Sprint Velocity: +240%</span>
      </motion.div>

      <motion.div
        animate={{ y: [6, -5, 6] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
        className="absolute -bottom-5 -right-3 z-20 hidden rounded-2xl border border-black/8 bg-white/95 px-3.5 py-2 text-xs font-semibold text-navy shadow-xl backdrop-blur-xl sm:flex sm:items-center sm:gap-2"
      >
        <span className="grid h-6 w-6 place-items-center rounded-lg bg-emerald-100 text-emerald-700">
          <ShieldCheck size={14} />
        </span>
        <span>Enterprise IP Guarantee: 100%</span>
      </motion.div>

      {/* Main 3D Glassmorphic Console Card */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="overflow-hidden rounded-[32px] border border-white/40 bg-gradient-to-b from-navy via-navy to-navy-2 p-1 shadow-[0_25px_60px_-15px_rgba(9,6,26,0.5)]"
      >
        <div className="rounded-[30px] bg-navy/95 p-5 text-white sm:p-6">
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-500/80" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-mono text-[11px] text-white/70">mza-pod-controller v2.4</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-accent-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-2 animate-pulse" />
              Pod Active
            </div>
          </div>

          {/* Tab Selector */}
          <div className="mt-4 flex rounded-xl bg-white/5 p-1 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab("ai")}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 font-medium transition-all ${
                activeTab === "ai"
                  ? "bg-white text-navy shadow-sm"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <Sparkles size={13} className={activeTab === "ai" ? "text-navy" : "text-accent-2"} />
              AI Pod
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("mobile")}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 font-medium transition-all ${
                activeTab === "mobile"
                  ? "bg-white text-navy shadow-sm"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <Smartphone size={13} className={activeTab === "mobile" ? "text-navy" : "text-accent-cyan"} />
              Mobile App
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("cloud")}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 font-medium transition-all ${
                activeTab === "cloud"
                  ? "bg-white text-navy shadow-sm"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <Globe2 size={13} className={activeTab === "cloud" ? "text-navy" : "text-purple-300"} />
              Global Cloud
            </button>
          </div>

          {/* Tab Content 1: AI Pod Simulation */}
          {activeTab === "ai" && (
            <motion.div
              initial={{ y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-4 space-y-3 font-mono text-xs"
            >
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                <div className="flex items-center justify-between text-white/70 text-[11px] pb-2 border-b border-white/5">
                  <span className="flex items-center gap-1.5">
                    <Terminal size={12} className="text-accent-2" />
                    sprint-synthesis.ts
                  </span>
                  <span className="text-accent-2 font-semibold">99.8% Test Pass</span>
                </div>
                <div className="mt-3 space-y-1 text-white/80">
                  <p className="text-white/40">// Auto-synthesizing GraphQL + Next.js App Router</p>
                  <p>
                    <span className="text-accent-cyan">const</span> pod = <span className="text-amber-300">createDeliveryPod</span>({`{`}
                  </p>
                  <p className="pl-4">
                    track: <span className="text-accent-2">&quot;ai-accelerated&quot;</span>,
                  </p>
                  <p className="pl-4">
                    leadArchitect: <span className="text-emerald-300">&quot;Senior Staff Engineer&quot;</span>,
                  </p>
                  <p className="pl-4">
                    securityAudit: <span className="text-accent-2">true</span>,
                  </p>
                  <p>{`}`});</p>
                  <p className="pt-2 text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 size={12} /> Ready for Production Deploy (0 Vulnerabilities)
                  </p>
                </div>
              </div>

              {/* Status metrics grid */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="text-[11px] text-white/70">Sprint Cycle</div>
                  <div className="mt-1 text-sm font-bold text-accent-2 flex items-center gap-1">
                    <Zap size={13} /> 14-Day Delivery
                  </div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="text-[11px] text-white/70">Human Review</div>
                  <div className="mt-1 text-sm font-bold text-white flex items-center gap-1">
                    <ShieldCheck size={13} className="text-emerald-400" /> Senior Architect
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tab Content 2: Mobile App Simulation */}
          {activeTab === "mobile" && (
            <motion.div
              initial={{ y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-4 space-y-3"
            >
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-black/30 to-black/50 p-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-lg bg-accent-cyan/20 grid place-items-center text-accent-cyan">
                      <Smartphone size={15} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">FinTech Core App</div>
                      <div className="text-[10px] text-white/70">Flutter &middot; iOS &amp; Android</div>
                    </div>
                  </div>
                  <span className="rounded-full bg-accent-cyan/20 px-2 py-0.5 text-[10px] font-semibold text-accent-cyan">
                    Live Build
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="rounded-xl bg-black/40 p-2.5">
                    <div className="text-[10px] text-white/70">Biometric Auth</div>
                    <div className="text-xs font-bold text-white mt-0.5">FaceID / TouchID</div>
                  </div>
                  <div className="rounded-xl bg-black/40 p-2.5">
                    <div className="text-[10px] text-white/70">Transactions/sec</div>
                    <div className="text-xs font-bold text-accent-2 mt-0.5">4,800 TPS</div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between rounded-xl bg-white/5 p-2.5 text-xs text-white/80">
                  <span>Cross-Platform Sync</span>
                  <span className="text-accent-2 font-mono text-[11px]">100% Shared Logic</span>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-xs text-white/70">
                <span className="flex items-center gap-2">
                  <Code2 size={13} className="text-accent-cyan" /> Native Performance
                </span>
                <span className="font-semibold text-white">60 FPS Smooth UI</span>
              </div>
            </motion.div>
          )}

          {/* Tab Content 3: Global Cloud Simulation */}
          {activeTab === "cloud" && (
            <motion.div
              initial={{ y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-4 space-y-2.5 font-mono text-xs"
            >
              <div className="rounded-2xl border border-white/10 bg-black/40 p-3.5 space-y-2.5">
                <div className="flex items-center justify-between text-white/60 text-[11px] pb-2 border-b border-white/5 font-sans">
                  <span>Multi-Region Edge Topology</span>
                  <span className="text-emerald-400 font-semibold">99.99% Uptime SLA</span>
                </div>

                <div className="space-y-1.5 font-mono text-[11px]">
                  <div className="flex items-center justify-between rounded-lg bg-white/5 px-2.5 py-1.5">
                    <span className="flex items-center gap-1.5 text-white/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      us-east-1 (N. Virginia)
                    </span>
                    <span className="text-accent-2">18ms</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-white/5 px-2.5 py-1.5">
                    <span className="flex items-center gap-1.5 text-white/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      eu-central-1 (Frankfurt)
                    </span>
                    <span className="text-accent-2">24ms</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-white/5 px-2.5 py-1.5">
                    <span className="flex items-center gap-1.5 text-white/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      me-central-1 (UAE/Dubai)
                    </span>
                    <span className="text-accent-2">32ms</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs text-white/80">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-accent-2" /> SOC-2 Type II &amp; HIPAA Compliant
                </span>
                <span className="text-accent-2 font-semibold">Verified</span>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
