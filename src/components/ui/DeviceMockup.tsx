"use client";

import React, { useId } from "react";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ */
/*  Shared tiny SVG charts — crisp, lightweight, no external assets    */
/* ------------------------------------------------------------------ */

function Sparkline({ className, stroke = "currentColor" }: { className?: string; stroke?: string }) {
  const uid = useId();
  const fillId = `${uid}-spark-fill`;
  return (
    <svg viewBox="0 0 120 40" className={className} fill="none" preserveAspectRatio="none" aria-hidden="true">
      <path
        d="M0 32 L18 28 L34 30 L52 18 L68 22 L86 10 L104 14 L120 4"
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0 32 L18 28 L34 30 L52 18 L68 22 L86 10 L104 14 L120 4 L120 40 L0 40 Z"
        fill={`url(#${fillId})`}
        opacity="0.18"
      />
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function BarChart({ className }: { className?: string }) {
  const uid = useId();
  const fillId = `${uid}-bar-grad`;
  const bars = [38, 52, 44, 64, 58, 76, 70, 88, 82, 96];
  return (
    <svg viewBox="0 0 200 90" className={className} fill="none" aria-hidden="true">
      {bars.map((h, i) => (
        <rect
          key={i}
          x={i * 20 + 2}
          y={90 - h}
          width="12"
          height={h}
          rx="3"
          fill={`url(#${fillId})`}
        />
      ))}
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00f5a0" />
          <stop offset="100%" stopColor="#00d2ff" stopOpacity="0.55" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function Donut({ className }: { className?: string }) {
  const uid = useId();
  const fillId = `${uid}-donut-grad`;
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <circle cx="60" cy="60" r="48" stroke="rgba(255,255,255,0.08)" strokeWidth="12" />
      <circle
        cx="60"
        cy="60"
        r="48"
        stroke={`url(#${fillId})`}
        strokeWidth="12"
        strokeLinecap="round"
        strokeDasharray="226 301"
        transform="rotate(-90 60 60)"
      />
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00f5a0" />
          <stop offset="100%" stopColor="#00d2ff" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Frames                                                              */
/* ------------------------------------------------------------------ */

export function PhoneFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative mx-auto w-full max-w-[280px]", className)}>
      {/* Glow */}
      <div
        className="pointer-events-none absolute -inset-6 rounded-[44px] bg-gradient-to-tr from-accent-2/25 via-accent-cyan/15 to-transparent blur-2xl"
        aria-hidden="true"
      />
      <div className="relative rounded-[40px] border border-white/15 bg-[#0b0820] p-2 shadow-[0_30px_60px_-20px_rgba(9,6,26,0.7)]">
        <div className="relative overflow-hidden rounded-[32px] bg-navy">
          {/* Notch */}
          <div className="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-black/80" />
          <div className="aspect-[9/19] w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function BrowserFrame({
  children,
  className,
  url = "app.mzalogics.com",
}: {
  children: React.ReactNode;
  className?: string;
  url?: string;
}) {
  return (
    <div className={cn("relative w-full overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_24px_50px_-20px_rgba(9,6,26,0.35)]", className)}>
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-black/8 bg-paper px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-rose-400" />
        <span className="h-3 w-3 rounded-full bg-amber-400" />
        <span className="h-3 w-3 rounded-full bg-emerald-400" />
        <div className="ml-3 flex-1 truncate rounded-md bg-white px-3 py-1 text-xs font-medium text-muted">
          {url}
        </div>
      </div>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Abstract app screens                                               */
/* ------------------------------------------------------------------ */

/** A fintech-style mobile app screen */
export function FinTechAppScreen() {
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-navy via-navy to-navy-2 p-4 text-white">
      {/* Status row */}
      <div className="flex items-center justify-between pt-1 text-[11px] font-medium text-white/70">
        <span>9:41</span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-accent-2" />
          <span>5G</span>
        </span>
      </div>

      {/* Balance card */}
      <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm">
        <div className="text-[11px] font-medium text-white/60">Total Balance</div>
        <div className="mt-1 text-2xl font-extrabold tracking-tight">$24,890.50</div>
        <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-accent-2">
          <span>↑ 12.4%</span>
          <span className="text-white/40">this month</span>
        </div>
        <div className="mt-3">
          <Sparkline className="h-10 w-full" stroke="#00f5a0" />
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-4 grid grid-cols-4 gap-2">
        {["Send", "Request", "Top up", "More"].map((a) => (
          <div key={a} className="flex flex-col items-center gap-1.5 rounded-xl bg-white/[0.05] py-2.5">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-accent-2/15 text-accent-2">
              <span className="h-2 w-2 rounded-full bg-accent-2" />
            </span>
            <span className="text-[10px] font-medium text-white/80">{a}</span>
          </div>
        ))}
      </div>

      {/* Transactions */}
      <div className="mt-4 flex-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-white/70">Recent activity</span>
          <span className="text-[10px] font-medium text-accent-2">See all</span>
        </div>
        <div className="mt-2 space-y-2">
          {[
            { n: "Acme Corp", s: "Inbound", v: "+$1,200", t: "text-accent-2" },
            { n: "Cloud Services", s: "Subscription", v: "−$48", t: "text-white/70" },
            { n: "Studio Retainer", s: "Inbound", v: "+$3,400", t: "text-accent-2" },
          ].map((row) => (
            <div key={row.n} className="flex items-center gap-3 rounded-xl bg-white/[0.04] p-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-[11px] font-bold">
                {row.n[0]}
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[11px] font-semibold">{row.n}</div>
                <div className="text-[10px] text-white/50">{row.s}</div>
              </div>
              <span className={cn("text-[11px] font-bold", row.t)}>{row.v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom nav */}
      <div className="mt-3 flex items-center justify-around rounded-2xl bg-white/[0.06] py-2.5">
        {["Home", "Cards", "Stats", "You"].map((n, i) => (
          <span
            key={n}
            className={cn(
              "text-[10px] font-semibold",
              i === 0 ? "text-accent-2" : "text-white/50"
            )}
          >
            {n}
          </span>
        ))}
      </div>
    </div>
  );
}

/** An analytics dashboard screen for the browser frame */
export function DashboardScreen() {
  return (
    <div className="flex h-full min-h-[280px] bg-paper">
      {/* Sidebar */}
      <aside className="hidden w-14 flex-col items-center gap-4 border-r border-black/8 bg-white py-4 sm:flex">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-navy text-xs font-extrabold text-accent-2">M</span>
        {["◐", "▤", "◑", "◷", "⚙"].map((g, i) => (
          <span
            key={i}
            className={cn(
              "grid h-8 w-8 place-items-center rounded-lg text-sm",
              i === 0 ? "bg-accent-2/15 text-navy" : "text-muted"
            )}
          >
            {g}
          </span>
        ))}
      </aside>

      {/* Main */}
      <div className="flex-1 p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-medium text-muted">Operations console</div>
            <div className="text-sm font-bold text-navy">Live exception queue</div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            Operational
          </span>
        </div>

        {/* Stat cards */}
        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {[
            { l: "On-time", v: "99.5%", c: "text-emerald-700" },
            { l: "Exceptions", v: "12", c: "text-navy" },
            { l: "Avg handle", v: "−38%", c: "text-emerald-700" },
          ].map((s) => (
            <div key={s.l} className="rounded-xl border border-black/8 bg-white p-3">
              <div className="text-[11px] text-muted">{s.l}</div>
              <div className={cn("mt-0.5 text-lg font-extrabold", s.c)}>{s.v}</div>
            </div>
          ))}
        </div>

        {/* Chart row */}
        <div className="mt-3 grid grid-cols-3 gap-2.5">
          <div className="col-span-2 rounded-xl border border-black/8 bg-white p-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-navy">Throughput</span>
              <span className="text-[11px] text-muted">last 10 days</span>
            </div>
            <BarChart className="mt-2 h-16 w-full" />
          </div>
          <div className="relative grid place-items-center rounded-xl border border-black/8 bg-white p-3">
            <Donut className="h-16 w-16" />
            <div className="absolute text-center">
              <div className="text-sm font-extrabold text-navy">75%</div>
              <div className="text-[10px] text-muted">SLA</div>
            </div>
          </div>
        </div>

        {/* Queue rows */}
        <div className="mt-3 space-y-1.5">
          {[
            { i: "EXP-2041", s: "Carrier delay", t: "2m" },
            { i: "EXP-2038", s: "Rerouted", t: "6m" },
          ].map((r) => (
            <div key={r.i} className="flex items-center justify-between rounded-lg border border-black/8 bg-white px-3 py-2">
              <span className="font-mono text-[11px] font-semibold text-navy">{r.i}</span>
              <span className="text-[11px] text-muted">{r.s}</span>
              <span className="text-[11px] font-semibold text-emerald-700">{r.t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Compact AI assistant overlay for solution scenes */
export function AiAgentScreen() {
  return (
    <div className="flex h-full min-h-[220px] flex-col bg-navy p-4 text-white">
      <div className="text-xs font-semibold text-white/80">Claims assistant</div>
      <div className="mt-3 space-y-2">
        <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-white/10 px-3 py-2 text-sm leading-relaxed text-white/90">
          What is the waiting period on policy NF-2041?
        </div>
        <div className="ml-auto max-w-[90%] rounded-2xl rounded-tr-sm bg-emerald-500/20 px-3 py-2 text-sm leading-relaxed text-white">
          14 days after issue. Cited from §3.2 of the policy pack.
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between rounded-xl bg-white/5 px-3 py-2 text-xs text-white/80">
        <span>Human review on low confidence</span>
        <span className="font-semibold text-emerald-300">Cited</span>
      </div>
    </div>
  );
}

/** Simple multi-region status map */
export function CloudMapScreen() {
  return (
    <div className="flex h-full min-h-[220px] flex-col bg-gradient-to-br from-navy to-navy-2 p-4 text-white">
      <div className="text-xs font-semibold text-white/80">Global cluster</div>
      <div className="mt-4 grid flex-1 grid-cols-3 gap-2">
        {[
          { r: "Virginia", ms: "18ms" },
          { r: "Frankfurt", ms: "24ms" },
          { r: "Dubai", ms: "32ms" },
        ].map((n) => (
          <div key={n.r} className="rounded-xl border border-white/10 bg-white/5 p-3">
            <span className="mb-2 block h-2 w-2 rounded-full bg-emerald-400" />
            <div className="text-sm font-bold">{n.r}</div>
            <div className="text-xs text-emerald-300">{n.ms}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 text-sm font-semibold text-emerald-300">99.99% uptime</div>
    </div>
  );
}

export function MvpStoryboard() {
  const days = [
    { d: "Day 1", l: "Spec" },
    { d: "Day 7", l: "Build" },
    { d: "Day 14", l: "Launch" },
  ];
  return (
    <div className="grid h-full min-h-[160px] grid-cols-3 gap-2 bg-paper p-3">
      {days.map((step) => (
        <div key={step.d} className="flex flex-col rounded-xl border border-black/8 bg-white p-3">
          <span className="text-xs font-semibold text-muted">{step.d}</span>
          <span className="mt-auto text-base font-bold text-navy">{step.l}</span>
          <span className="mt-2 h-1.5 rounded-full bg-navy/80" />
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Composite hero visual: phone + browser, staggered                  */
/* ------------------------------------------------------------------ */

export function HeroDeviceVisual({ className }: { className?: string }) {
  return (
    <div className={cn("relative mx-auto w-full max-w-[520px] overflow-hidden pb-4", className)}>
      <div className="absolute right-3 top-4 z-20 hidden rounded-2xl border border-black/8 bg-white/95 px-3 py-1.5 text-xs font-semibold text-navy shadow-lg sm:flex sm:items-center sm:gap-2">
        <span className="grid h-6 w-6 place-items-center rounded-lg bg-emerald-100 text-emerald-700">✓</span>
        <span>99.5% Uptime SLA</span>
      </div>

      <div className="relative z-10 ml-[28%] pt-6">
        <BrowserFrame url="app.mzalogics.com/console" className="w-full">
          <DashboardScreen />
        </BrowserFrame>
      </div>

      <div className="absolute bottom-2 left-0 z-20 w-[42%] max-w-[180px]">
        <PhoneFrame className="max-w-none">
          <FinTechAppScreen />
        </PhoneFrame>
      </div>
    </div>
  );
}
