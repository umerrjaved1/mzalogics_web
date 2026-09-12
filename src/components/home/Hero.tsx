"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button, ArrowDisc } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { HeroDeviceVisual } from "@/components/ui/DeviceMockup";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { site } from "@/lib/site";

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-24">
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-accent-2/15 blur-[120px]"
        aria-hidden="true"
      />

      <Container className="relative z-10 grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12">
        <div className="relative z-20 flex flex-col items-start">
          <motion.p
            initial={reduced ? false : { y: 12, opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.4 }}
            className="text-sm font-semibold text-navy"
          >
            <span className="mr-2 inline-flex h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
            {site.availability} · {site.customers} products shipped
          </motion.p>

          <motion.h1
            initial={reduced ? false : { y: 16, opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.05 }}
            className="mt-5 text-4xl font-extrabold tracking-[-0.04em] text-navy sm:text-6xl lg:text-[64px] lg:leading-[1.08]"
          >
            Apps your team will actually use
          </motion.h1>

          <motion.p
            initial={reduced ? false : { y: 16, opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.1 }}
            className="mt-5 max-w-lg text-lg leading-relaxed text-muted sm:text-xl"
          >
            Mobile, web, and AI systems built around how you already work — for teams worldwide.
          </motion.p>

          <motion.div
            initial={reduced ? false : { y: 16, opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.15 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <MagneticButton>
              <Button
                href="/contact"
                aria-label="Book a discovery call"
                className="h-12 px-6 text-base font-semibold shadow-lg shadow-navy/15"
              >
                Book a discovery call
                <ArrowDisc />
              </Button>
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
          </motion.div>

          <dl className="mt-10 grid w-full max-w-md grid-cols-3 gap-6 border-t border-black/8 pt-6">
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

        <motion.div
          initial={reduced ? false : { scale: 0.97, opacity: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.12 }}
          className="relative z-10 w-full min-w-0 overflow-hidden"
        >
          <HeroDeviceVisual />
        </motion.div>
      </Container>
    </section>
  );
}
