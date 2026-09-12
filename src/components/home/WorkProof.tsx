import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { CaseStudyCover } from "@/components/ui/CaseStudyCover";
import { caseStudies } from "@/content/case-studies";
import { resolveLocal } from "@/lib/media";

export function WorkProof() {
  const featured = caseStudies.slice(0, 4);

  return (
    <Section id="work" className="pb-8 sm:pb-10">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <Eyebrow>Proof, not pitch decks</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-5xl">
              Products you can see
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Outcomes from recent mobile, web, and operations products. Covers are diagrams unless a client has released a still.
            </p>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-2.5 text-base font-semibold text-navy shadow-sm"
          >
            All case studies
            <ArrowUpRight size={16} aria-hidden />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {featured.map((study) => (
            <Link
              key={study.slug}
              href={`/work/${study.slug}`}
              className="group overflow-hidden rounded-[28px] border border-black/8 bg-white shadow-sm transition hover:border-navy/30 hover:shadow-lg"
            >
              <CaseStudyCover
                industry={study.industry}
                title={study.title}
                local={resolveLocal(`/media/work/${study.slug}.jpg`)}
                compact
                className="h-52 sm:h-60"
              />
              <div className="p-6">
                <h3 className="text-lg font-bold text-navy">{study.title}</h3>
                <p className="mt-2 text-base text-muted">
                  <span className="font-semibold text-navy">{study.metrics[0]?.value}</span>{" "}
                  {study.metrics[0]?.label}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
