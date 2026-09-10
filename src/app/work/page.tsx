import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { CtaBand } from "@/components/CtaBand";
import { caseStudies } from "@/content/case-studies";

export const metadata: Metadata = {
  title: "Work",
  description: "Anonymized case studies: challenge, stack, and outcomes for enterprise software engagements.",
};

export default function WorkPage() {
  return (
    <>
      <Section className="dot-grid pb-8">
        <Container>
          <Eyebrow>Work</Eyebrow>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-navy sm:text-5xl">
            Case studies with outcomes
          </h1>
          <p className="mt-4 max-w-2xl text-muted">
            Selected engagements across healthcare, retail, SaaS, and operations. Get in touch to talk through yours.
          </p>
        </Container>
      </Section>
      <Section className="pt-0">
        <Container className="grid gap-4 md:grid-cols-2">
          {caseStudies.map((study) => (
            <Link key={study.slug} href={`/work/${study.slug}`} className="rounded-3xl border border-line p-6 hover:border-navy">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">{study.industry}</p>
              <h2 className="mt-2 text-xl font-semibold text-navy">{study.title}</h2>
              <p className="mt-2 text-sm text-muted">{study.challenge}</p>
              <div className="mt-5 flex flex-wrap gap-4 text-sm">
                {study.metrics.map((metric) => (
                  <span key={metric.label}>
                    <strong className="text-navy">{metric.value}</strong>
                    <span className="ml-1 text-muted">{metric.label}</span>
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
