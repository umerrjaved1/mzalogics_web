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
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-24">
      <Parallax
        distance={70}
        direction={-1}
        className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[800px] -translate-x-1/2"
      >
        <div className="h-full w-full rounded-full bg-accent-2/15 blur-[120px]" aria-hidden="true" />
      </Parallax>

      <Container className="relative z-10 grid items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-12">
        <div className="relative z-20 flex flex-col items-start">
          <p className="rise-in text-sm font-semibold text-navy">
            <span className="mr-2 inline-flex h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
            {site.availability} · {site.customers} products shipped
          </p>

          <h1 className="rise-in mt-5 max-w-3xl text-4xl font-extrabold tracking-[-0.045em] text-navy sm:text-6xl lg:text-[68px] lg:leading-[1.02]">
            Ship your app, web platform, or AI feature in weeks
          </h1>

          <p className="rise-in rise-in-1 mt-5 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            MZA Logics is a software development agency building high-quality mobile apps, web
            applications, and AI-powered solutions for businesses worldwide — with clearly defined
            scopes, transparent delivery, and code ownership in your repository from day one.
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

          <div className="rise-in rise-in-3 mt-5 flex flex-wrap gap-2 text-sm font-semibold text-navy">
            {["Fixed written scope", "NDA before details", "You own the code and IP", "Reply within one business day"].map((item) => (
              <span key={item} className="rounded-full border border-black/8 bg-white px-3 py-1.5 shadow-sm">
                {item}
              </span>
            ))}
          </div>

          <dl className="rise-in rise-in-3 mt-8 grid w-full max-w-xl grid-cols-3 gap-3 rounded-[28px] border border-black/8 bg-white/80 p-3 shadow-sm backdrop-blur">
            {[
              { label: "Products shipped", value: site.customers },
              { label: "Building since", value: site.founded },
              { label: "Reply within", value: "24h" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-paper px-4 py-3">
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{stat.label}</dt>
                <dd>
                  <Counter
                    value={stat.value}
                    className="block text-2xl font-extrabold tabular-nums text-navy sm:text-3xl"
                  />
                </dd>
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
