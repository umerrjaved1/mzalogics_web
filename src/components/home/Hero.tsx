import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ArrowDisc } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { HeroDeviceVisual } from "@/components/ui/DeviceMockup";
import { BookCallButton } from "@/components/conversion/BookCallButton";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-24">
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-accent-2/15 blur-[120px]"
        aria-hidden="true"
      />

      <Container className="relative z-10 grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12">
        <div className="relative z-20 flex flex-col items-start">
          <p className="rise-in text-sm font-semibold text-navy">
            <span className="mr-2 inline-flex h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
            {site.availability} · {site.customers} products shipped
          </p>

          <h1 className="rise-in mt-5 text-4xl font-extrabold tracking-[-0.04em] text-navy sm:text-6xl lg:text-[64px] lg:leading-[1.08]">
            Apps your team will actually use
          </h1>

          <p className="rise-in rise-in-1 mt-5 max-w-lg text-lg leading-relaxed text-muted sm:text-xl">
            Mobile, web, and AI systems built around how you already work — for teams worldwide.
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

          <dl className="rise-in rise-in-3 mt-10 grid w-full max-w-md grid-cols-3 gap-6 border-t border-black/8 pt-6">
            <div>
              <dt className="text-sm text-muted">Shipped</dt>
              <dd className="text-2xl font-extrabold text-navy sm:text-3xl">{site.customers}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Delivery</dt>
              <dd className="text-2xl font-extrabold text-navy sm:text-3xl">2 tracks</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Reply SLA</dt>
              <dd className="text-2xl font-extrabold text-navy sm:text-3xl">&lt;24h</dd>
            </div>
          </dl>
        </div>

        <div className="rise-in rise-in-2 relative z-10 w-full min-w-0 overflow-hidden">
          <HeroDeviceVisual />
        </div>
      </Container>
    </section>
  );
}
