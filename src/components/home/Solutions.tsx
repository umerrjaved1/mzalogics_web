"use client";

import Link from "next/link";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { services } from "@/content/services";

export function Solutions() {
  return (
    <Section>
      <Container>
        <Eyebrow>What We Do</Eyebrow>
        <h2 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight text-navy sm:text-5xl">
          End-to-end software development services
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          Launch faster. Scale smarter. Grow continuously. Mobile, web, design, MVP, DevOps, and CMS — one team from concept to launch.
        </p>
        <div className="hide-scroll mt-12 flex gap-5 overflow-x-auto pb-2 snap-x">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/solutions/${service.slug}`}
              className="relative min-h-[420px] min-w-[300px] snap-start overflow-hidden rounded-[32px] bg-navy p-7 text-white sm:min-w-[340px]"
            >
              <div className="absolute -right-6 top-10 flex -space-x-6">
                {service.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="grid h-24 w-24 rotate-6 place-items-center rounded-[28px] border border-white/10 bg-white/5 text-center text-[11px] font-medium text-white/70 backdrop-blur"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="relative mt-40 text-3xl font-bold">{service.title}</h3>
              <p className="relative mt-4 text-sm leading-6 text-white/70">{service.summary}</p>
            </Link>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted">Swipe to explore →</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={`${service.slug}-grid`}
              href={`/solutions/${service.slug}`}
              className="rounded-[28px] border border-black/8 bg-white p-6 transition hover:shadow-[0_12px_40px_rgba(14,9,38,0.06)]"
            >
              <p className="text-xs font-semibold text-navy/40">{service.number}</p>
              <h3 className="mt-2 text-lg font-bold text-navy">{service.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{service.summary}</p>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
