"use client";

import React, { useId } from "react";
import Link from "next/link";
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
      <div className="mt-3 text-sm font-semibold text-white/80">Regions live. Rollback ready.</div>
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

/** A Figma-style design-system board for the product-design practice */
export function DesignSystemScreen() {
  return (
    <div className="flex h-full min-h-[220px] gap-3 bg-paper p-4">
      {/* Swatches + type */}
      <div className="flex w-2/5 flex-col gap-2.5">
        <div className="rounded-xl border border-black/8 bg-white p-3">
          <div className="text-[11px] font-semibold text-navy">Palette</div>
          <div className="mt-2 flex gap-1.5">
            {["#09061a", "#00f5a0", "#00d2ff", "#8a2be2", "#f8f9fc"].map((c) => (
              <span key={c} className="h-6 w-6 rounded-md border border-black/10" style={{ background: c }} />
            ))}
          </div>
        </div>
        <div className="flex-1 rounded-xl border border-black/8 bg-white p-3">
          <div className="text-[11px] font-semibold text-navy">Type scale</div>
          <div className="mt-1.5 text-lg font-extrabold leading-tight text-navy">Aa</div>
          <div className="text-xs font-semibold text-navy/80">Aa</div>
          <div className="text-[10px] text-muted">Aa</div>
        </div>
      </div>
      {/* Components */}
      <div className="flex flex-1 flex-col gap-2.5">
        <div className="rounded-xl border border-black/8 bg-white p-3">
          <div className="text-[11px] font-semibold text-navy">Components</div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-navy px-3 py-1.5 text-[10px] font-bold text-white">Button</span>
            <span className="rounded-full border border-black/15 px-3 py-1.5 text-[10px] font-bold text-navy">Ghost</span>
            <span className="inline-flex h-4 w-7 items-center rounded-full bg-emerald-500 px-0.5">
              <span className="ml-auto h-3 w-3 rounded-full bg-white" />
            </span>
          </div>
        </div>
        <div className="flex-1 rounded-xl border border-black/8 bg-white p-3">
          <div className="text-[11px] font-semibold text-navy">Input states</div>
          <div className="mt-2 rounded-lg border border-black/15 px-2.5 py-1.5 text-[10px] text-muted">Placeholder</div>
          <div className="mt-1.5 rounded-lg border-2 border-navy px-2.5 py-1.5 text-[10px] text-navy">Focused</div>
        </div>
      </div>
    </div>
  );
}

/** A CMS editor for the CMS practice */
export function CmsEditorScreen() {
  return (
    <div className="flex h-full min-h-[220px] bg-paper">
      {/* Sidebar */}
      <aside className="hidden w-28 shrink-0 flex-col gap-1.5 border-r border-black/8 bg-white p-3 sm:flex">
        {["Posts", "Pages", "Media", "Users"].map((item, i) => (
          <span
            key={item}
            className={cn(
              "rounded-lg px-2.5 py-1.5 text-[11px] font-semibold",
              i === 0 ? "bg-navy text-white" : "text-muted",
            )}
          >
            {item}
          </span>
        ))}
      </aside>
      {/* Editor */}
      <div className="flex-1 p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted">Editing · Blog post</span>
          <span className="rounded-full bg-navy px-3 py-1 text-[11px] font-bold text-white">Publish</span>
        </div>
        <div className="mt-3 rounded-xl border border-black/8 bg-white p-3">
          <div className="text-sm font-bold text-navy">Launch notes: version 2.0</div>
          <div className="mt-2 space-y-1.5">
            <div className="h-2 w-full rounded bg-black/8" />
            <div className="h-2 w-11/12 rounded bg-black/8" />
            <div className="h-2 w-4/5 rounded bg-black/8" />
          </div>
        </div>
        <div className="mt-2.5 flex gap-2">
          <span className="rounded-full bg-accent-2/20 px-2.5 py-1 text-[10px] font-semibold text-navy">Draft saved</span>
          <span className="rounded-full bg-black/5 px-2.5 py-1 text-[10px] font-semibold text-muted">Role: Editor</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Website mock screens for client-web covers without a real shot     */
/* ------------------------------------------------------------------ */

/** A Shopify-style storefront: header, hero banner, product grid. */
export function StorefrontScreen() {
  return (
    <div className="flex h-full flex-col bg-white">
      {/* Store header */}
      <div className="flex items-center gap-3 border-b border-black/8 px-4 py-2.5">
        <span className="h-5 w-5 rounded-md bg-gradient-to-br from-accent to-accent-2" />
        <span className="h-2 w-16 rounded-full bg-navy/70" />
        <span className="ml-auto hidden gap-3 sm:flex">
          {[36, 28, 32].map((w, i) => (
            <span key={i} className="h-1.5 rounded-full bg-navy/25" style={{ width: w }} />
          ))}
        </span>
        <span className="ml-auto grid h-6 w-6 place-items-center rounded-full bg-navy/5 sm:ml-0">
          <span className="h-2.5 w-2.5 rounded-sm border-[1.5px] border-navy/50" />
        </span>
      </div>
      {/* Hero banner */}
      <div className="mx-4 mt-3 flex items-center justify-between rounded-xl bg-gradient-to-r from-navy to-navy-2 px-4 py-3">
        <div>
          <span className="block h-2 w-24 rounded-full bg-white/85" />
          <span className="mt-1.5 block h-1.5 w-16 rounded-full bg-white/40" />
          <span className="mt-2 block h-4 w-14 rounded-full bg-accent" />
        </div>
        <span className="h-12 w-12 rounded-lg bg-white/10 ring-1 ring-white/20" />
      </div>
      {/* Product grid */}
      <div className="mt-3 grid flex-1 grid-cols-4 gap-2.5 px-4 pb-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col rounded-lg border border-black/6 bg-paper p-1.5">
            <span className="block aspect-square rounded-md bg-gradient-to-br from-[#e8ebf3] to-[#dbe0ec]" />
            <span className="mt-1.5 block h-1.5 w-4/5 rounded-full bg-navy/40" />
            <span className="mt-1 block h-1.5 w-2/5 rounded-full bg-accent-2/70" />
          </div>
        ))}
      </div>
    </div>
  );
}

/** A WordPress-style corporate site: nav, hero, service cards. */
export function CorporateSiteScreen() {
  return (
    <div className="flex h-full flex-col bg-white">
      {/* Nav */}
      <div className="flex items-center gap-3 border-b border-black/8 px-4 py-2.5">
        <span className="h-5 w-5 rounded-full bg-navy" />
        <span className="ml-auto flex gap-3">
          {[30, 26, 34, 24].map((w, i) => (
            <span key={i} className="h-1.5 rounded-full bg-navy/25" style={{ width: w }} />
          ))}
        </span>
        <span className="h-5 w-14 rounded-full bg-accent-2/80" />
      </div>
      {/* Hero */}
      <div className="flex items-center gap-4 px-4 py-3">
        <div className="flex-1">
          <span className="block h-2.5 w-4/5 rounded-full bg-navy/80" />
          <span className="mt-1.5 block h-2.5 w-3/5 rounded-full bg-navy/80" />
          <span className="mt-2 block h-1.5 w-3/4 rounded-full bg-navy/30" />
          <span className="mt-1 block h-1.5 w-1/2 rounded-full bg-navy/30" />
          <span className="mt-2.5 block h-5 w-16 rounded-md bg-navy" />
        </div>
        <span className="h-20 w-28 rounded-xl bg-gradient-to-br from-[#e8ebf3] to-[#d4dbe9] ring-1 ring-black/5" />
      </div>
      {/* Service cards */}
      <div className="mt-auto grid grid-cols-3 gap-2.5 px-4 pb-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-lg border border-black/6 bg-paper p-2">
            <span className="block h-4 w-4 rounded-md bg-accent/30" />
            <span className="mt-1.5 block h-1.5 w-4/5 rounded-full bg-navy/40" />
            <span className="mt-1 block h-1 w-full rounded-full bg-navy/20" />
            <span className="mt-1 block h-1 w-3/5 rounded-full bg-navy/20" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Cover art for client websites that have no real screenshot on disk: a
 * browser frame with a storefront or corporate-site mock. Honest illustration
 * in the brand palette — never presented as a screenshot.
 */
export function WebsiteScene({ industry, className }: { industry: string; className?: string }) {
  const isStore = industry === "Shopify";
  return (
    <div
      className={cn("flex h-full w-full items-center bg-gradient-to-br from-paper to-[#e9edf4] p-3 sm:p-4", className)}
      role="img"
      aria-label={isStore ? "Illustration of an online storefront" : "Illustration of a company website"}
    >
      <BrowserFrame url={isStore ? "store.client.com" : "www.client.com"} className="w-full">
        <div className="aspect-[16/8]">{isStore ? <StorefrontScreen /> : <CorporateSiteScreen />}</div>
      </BrowserFrame>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Composite hero visual: phone + browser, staggered                  */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  Per-service scene: one coded visual that matches its subject       */
/* ------------------------------------------------------------------ */

const serviceSceneLabel: Record<string, string> = {
  "app-development": "Illustration of a mobile banking app on a phone",
  "web-platforms": "Illustration of a web operations dashboard",
  "ai-development": "Illustration of an AI assistant answering with citations",
  "product-design": "Illustration of a design system board with palette, type scale, and components",
  "mvp-prototyping": "Illustration of a two-week MVP plan: spec, build, launch",
  cloud: "Illustration of a multi-region cloud status view",
  cms: "Illustration of a CMS editor with a publish button",
};

function SceneFrame({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="flex h-full items-center bg-gradient-to-br from-paper to-[#eceef5] p-3 sm:p-4">
      <BrowserFrame url={url} className="w-full">
        {children}
      </BrowserFrame>
    </div>
  );
}

/**
 * The visual for a practice when no cover photo exists on disk. Pure code in
 * the brand palette — it can never 404 and never pretends to be a screenshot.
 */
export function ServiceScene({ slug, className }: { slug: string; className?: string }) {
  return (
    <div
      className={cn("h-full w-full", className)}
      role="img"
      aria-label={serviceSceneLabel[slug] ?? "Illustration of a software product interface"}
    >
      {slug === "app-development" ? (
        <div className="flex h-full items-start justify-center overflow-hidden bg-gradient-to-b from-[#eef0f6] to-paper px-4 pt-5">
          <PhoneFrame className="max-w-[190px]">
            <FinTechAppScreen />
          </PhoneFrame>
        </div>
      ) : slug === "ai-development" ? (
        <SceneFrame url="assistant.yourproduct.com">
          <AiAgentScreen />
        </SceneFrame>
      ) : slug === "product-design" ? (
        <SceneFrame url="figma.com/design-system">
          <DesignSystemScreen />
        </SceneFrame>
      ) : slug === "mvp-prototyping" ? (
        <SceneFrame url="pilot.yourproduct.com">
          <MvpStoryboard />
        </SceneFrame>
      ) : slug === "cloud" ? (
        <SceneFrame url="status.yourproduct.com">
          <CloudMapScreen />
        </SceneFrame>
      ) : slug === "cms" ? (
        <SceneFrame url="cms.yoursite.com">
          <CmsEditorScreen />
        </SceneFrame>
      ) : (
        <SceneFrame url="dashboard.yourproduct.com">
          <DashboardScreen />
        </SceneFrame>
      )}
    </div>
  );
}

/**
 * What we build, in one glance: a web dashboard with a phone app in front.
 * Pure code — no stock imagery, no missing assets, readable at 375px.
 */
export function HeroProductVisual({ className }: { className?: string }) {
  return (
    <div
      className={cn("relative w-full px-2 pb-10 pt-2 sm:pb-12", className)}
      role="img"
      aria-label="Illustration of the two kinds of product MZA Logics builds: a web operations dashboard and a mobile banking app"
    >
      <BrowserFrame url="dashboard.yourproduct.com" className="w-[86%]">
        <DashboardScreen />
      </BrowserFrame>
      <div className="absolute bottom-0 right-0 w-[34%] min-w-[118px]">
        <PhoneFrame className="max-w-none">
          <FinTechAppScreen />
        </PhoneFrame>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero: real Google Play feature graphics from our published apps,   */
/*  fanned as a deck of store cards. Rendered only when the real files */
/*  exist in public/media/work; otherwise the coded visual above runs. */
/* ------------------------------------------------------------------ */

export type HeroShot = { src: string; alt: string; href: string; eyebrow?: string };

export function HeroFeatureGraphics({ shots, className }: { shots: HeroShot[]; className?: string }) {
  if (shots.length === 0) return <HeroProductVisual className={className} />;
  const deck = shots.slice(0, 3);
  const poses = [
    "left-5 top-20 z-10 w-[56%] -rotate-6",
    "right-5 top-10 z-20 w-[60%] rotate-[4deg]",
    "left-1/2 bottom-12 z-30 w-[66%] -translate-x-1/2 -rotate-1",
  ];
  return (
    <div className={cn("relative w-full px-1 pb-6 pt-2 sm:px-3", className)}>
      <div className="relative mx-auto min-h-[340px] w-full max-w-[640px] overflow-hidden rounded-[32px] border border-white/50 bg-navy p-4 shadow-[0_30px_80px_-35px_rgba(9,6,26,0.55)] sm:min-h-[500px] sm:rounded-[40px]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="pointer-events-none absolute -right-28 -top-32 h-80 w-80 rounded-full bg-accent-2/35 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-accent-cyan/25 blur-3xl" />
        <div className="absolute left-5 top-5 z-40 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-navy shadow-sm">
          Published Work
        </div>
        <div className="absolute right-5 top-5 z-40 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur">
          Apps · Web · AI
        </div>

        {deck.map((shot, i) => (
          <Link
            key={shot.src}
            href={shot.href}
            aria-label={`${shot.alt} — see the case study`}
            className={cn(
              "group absolute block overflow-hidden rounded-[26px] border border-white/70 bg-white p-1.5 shadow-[0_24px_60px_-22px_rgba(0,0,0,0.65)] transition-transform duration-300 hover:z-40 hover:scale-[1.03] hover:rotate-0",
              poses[i],
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={shot.src}
              alt={shot.alt}
              loading={i === deck.length - 1 ? "eager" : "lazy"}
              className="aspect-[16/9] w-full rounded-[20px] object-cover"
            />
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-navy shadow-sm">
              {shot.eyebrow ?? "Project"}
            </span>
          </Link>
        ))}

        <div className="absolute inset-x-5 bottom-5 z-40 hidden gap-2 rounded-[26px] border border-white/15 bg-white/10 p-3 text-white shadow-2xl backdrop-blur-md sm:grid sm:grid-cols-3">
          {["Fixed scope", "Weekly demos", "Your code + IP"].map((item) => (
            <div key={item} className="rounded-2xl bg-white/10 px-3 py-2 text-center text-xs font-semibold">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
