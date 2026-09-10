"use client";

import { useRef } from "react";
import { Play } from "lucide-react";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { processSteps } from "@/content/process";

export function Process() {
  const scroller = useRef<HTMLDivElement>(null);

  return (
    <Section>
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Eyebrow>Process</Eyebrow>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-navy sm:text-5xl">
              End-to-end software development
            </h2>
            <p className="mt-3 max-w-md text-muted">
              Launch faster. Scale smarter. Grow continuously.
            </p>
            <div className="relative mt-8 overflow-hidden rounded-[28px] bg-navy aspect-[16/11]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#5eead433,transparent_50%)]" />
              <button
                type="button"
                className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-navy"
                aria-label="Play delivery overview"
              >
                <Play size={22} fill="currentColor" />
              </button>
              <p className="absolute bottom-4 left-5 text-sm font-medium text-white/80">Watch how a pod ships</p>
            </div>
          </div>
          <div
            ref={scroller}
            className="hide-scroll flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory"
          >
            {processSteps.map((step) => (
              <article
                key={step.title}
                className="min-w-[260px] snap-start rounded-[28px] border border-black/8 bg-white p-7 shadow-[0_8px_30px_rgba(14,9,38,0.04)]"
              >
                <p className="text-sm font-semibold text-navy/40">{step.number}</p>
                <h3 className="mt-8 text-2xl font-bold text-navy">{step.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
