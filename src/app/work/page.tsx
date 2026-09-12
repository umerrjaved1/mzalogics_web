import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { CtaBand } from "@/components/CtaBand";
import { CaseStudyCover } from "@/components/ui/CaseStudyCover";
import { caseStudies } from "@/content/case-studies";
import { site } from "@/lib/site";
import { resolveLocal } from "@/lib/media";

export const metadata: Metadata = {
  title: "Case Studies & Client Outcomes | Mobile & Web Platforms Shipped",
  description:
    "Explore proven results and case studies from MZA Logics: healthtech apps, fintech portals, retail platforms, and SaaS products shipped with verifiable metrics.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Case Studies & Client Outcomes | MZA Logics",
    description:
      "Proven outcomes in mobile, web, and AI development for global startups and established enterprises.",
    url: `${site.url}/work`,
  },
};

export default function WorkPage() {
  return (
    <>
      <Section className="pb-8 sm:pb-8">
        <Container>
          <Eyebrow>Work</Eyebrow>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-navy sm:text-5xl">
            Case studies you can see
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Selected engagements. Clients stay confidential. Covers are diagrams unless we have an approved product still.
          </p>
        </Container>
      </Section>
      <Section className="pt-0 sm:pt-0 pb-8 sm:pb-10">
        <Container className="grid gap-5 md:grid-cols-2">
          {caseStudies.map((study) => (
            <Link
              key={study.slug}
              href={`/work/${study.slug}`}
              className="overflow-hidden rounded-[28px] border border-black/8 bg-white shadow-sm transition hover:border-navy/30 hover:shadow-lg"
            >
              <CaseStudyCover
                industry={study.industry}
                title={study.title}
                local={resolveLocal(`/media/work/${study.slug}.jpg`)}
                compact
                className="h-56"
              />
              <div className="p-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-navy">{study.industry}</p>
                <h2 className="mt-2 text-xl font-semibold text-navy">{study.title}</h2>
                <div className="mt-4 flex flex-wrap gap-4 text-base">
                  {study.metrics.slice(0, 2).map((metric) => (
                    <span key={metric.label}>
                      <strong className="text-navy">{metric.value}</strong>
                      <span className="ml-1 text-muted">{metric.label}</span>
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
