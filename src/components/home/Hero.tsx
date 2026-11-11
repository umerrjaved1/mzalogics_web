import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ArrowDisc } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { HeroFeatureGraphics, type HeroShot } from "@/components/ui/DeviceMockup";
import { Counter } from "@/components/ui/Counter";
import { Parallax } from "@/components/ui/Parallax";
import { BookCallButton } from "@/components/conversion/BookCallButton";
import { site } from "@/lib/site";
import { resolveLocal } from "@/lib/media";

/* Real project graphics. Ordered back-to-front, so the last card sits on top. */
const heroApps = [
  {
    slug: "flight-tracker",
    title: "Flight Tracker — Android app by MZA Logics",
    eyebrow: "Android",
  },
  {
    slug: "ecommerce-data-aggregator",
    title: "E-commerce data aggregator — web platform by MZA Logics",
    eyebrow: "Web platform",
  },
  {
    slug: "picsgen-ai-art-photo-editor",
    title: "PicsGen AI photo editor — Android app by MZA Logics",
    eyebrow: "AI app",
  },
];

function heroShots(): HeroShot[] {
  return heroApps.flatMap((app) => {
    const src = resolveLocal(`/media/work/${app.slug}.jpg`);
    return src ? [{ src, alt: app.title, href: `/work/${app.slug}`, eyebrow: app.eyebrow }] : [];
  });
}

export function Hero() {
  return (
    <section className="home-hero relative overflow-hidden pt-10 pb-16 lg:pt-14 lg:pb-24">
      <Parallax
        distance={70}
        direction={-1}
        className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[800px] -translate-x-1/2"
      >
        <div className="h-full w-full rounded-full bg-accent-2/10 blur-[120px]" aria-hidden="true" />
      </Parallax>

      <Container className="relative z-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-12">
        <div className="relative z-20 flex flex-col items-start">
          <p className="rise-in inline-flex items-center gap-2 rounded-full border border-black/8 bg-white/90 py-1.5 pl-2.5 pr-3.5 text-[13px] font-semibold text-navy shadow-sm">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {site.availability}
          </p>

          <h1 className="rise-in mt-6 max-w-3xl text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-navy sm:text-5xl lg:text-[52px] lg:leading-[1.06] xl:text-[60px]">
            Ship your app, web platform, or AI feature{" "}
            <span className="hero-accent">
              in weeks
              <svg viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden>
                <path d="M3 8 C 45 2, 95 2, 197 6" pathLength={1} vectorEffect="non-scaling-stroke" />
              </svg>
            </span>
          </h1>

          <p className="rise-in rise-in-1 mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            MZA Logics is a software development agency building mobile apps, web applications,
            and AI-powered solutions — with defined scopes, transparent delivery, and code
            ownership from day one.
          </p>

          <div className="rise-in rise-in-2 mt-8 flex flex-wrap items-center gap-4">
            <MagneticButton>
              <BookCallButton
                className="h-12 px-6 text-base font-semibold shadow-lg shadow-navy/15"
                aria-label="Book a discovery call"
              >
                Book a discovery call
                <ArrowDisc />
              </BookCallButton>
            </MagneticButton>
            <Link
              href="/work"
              aria-label="See the work"
              className="group inline-flex h-12 items-center gap-2 rounded-full border border-black/10 bg-white px-5 text-base font-semibold text-navy shadow-sm"
            >
              See the work
              <span className="grid h-7 w-7 place-items-center rounded-full bg-black/5 transition-transform group-hover:translate-x-1">
                <ArrowRight size={14} aria-hidden />
              </span>
            </Link>
          </div>

          {/* An open row, not boxed cards: the numbers carry it. The year is
              static on purpose — a founding year counting up from zero reads
              as a gimmick. */}
          <dl className="rise-in rise-in-3 mt-10 grid w-full max-w-lg grid-cols-3 divide-x divide-black/10 border-t border-black/10 pt-6">
            {[
              { label: "Products shipped", value: site.customers, count: true },
              { label: "Building since", value: site.founded, count: false },
              { label: "Reply within", value: "24h", count: false },
            ].map((stat, i) => (
              <div key={stat.label} className={i === 0 ? "pr-4" : "px-4 sm:px-6"}>
                <dd className="text-2xl font-bold tracking-tight tabular-nums text-navy sm:text-3xl">
                  {stat.count ? <Counter value={stat.value} /> : stat.value}
                </dd>
                <dt className="mt-1 text-xs font-medium text-muted sm:text-[13px]">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <Parallax distance={28} className="rise-in rise-in-2 relative z-10 w-full min-w-0 overflow-hidden">
          <HeroFeatureGraphics shots={heroShots()} />
        </Parallax>
      </Container>
    </section>
  );
}
