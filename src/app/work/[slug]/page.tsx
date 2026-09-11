import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { CtaBand } from "@/components/CtaBand";
import { caseStudies, getCaseStudy } from "@/content/case-studies";

import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: `${study.title} | Case Study`,
    description: study.challenge,
    alternates: {
      canonical: `/work/${slug}`,
    },
    openGraph: {
      title: `${study.title} | MZA Logics Case Study`,
      description: study.challenge,
      url: `${site.url}/work/${slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: study.title, path: `/work/${study.slug}` },
        ])}
      />
      <Section className="pb-8">
        <Container className="max-w-4xl">
          <Eyebrow>{study.industry}</Eyebrow>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-navy sm:text-5xl">{study.title}</h1>
          <p className="mt-3 text-base text-muted">{study.client}</p>
          <div className="relative mt-8 overflow-hidden rounded-[28px] border border-black/8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={study.heroImage}
              alt={`${study.title} product view`}
              className="h-[280px] w-full object-cover sm:h-[380px]"
            />
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {study.metrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-line p-4">
                <p className="text-lg font-semibold text-navy">{metric.value}</p>
                <p className="text-sm text-muted">{metric.label}</p>
              </div>
            ))}
          </div>
          <h2 className="mt-10 text-lg font-semibold text-navy">Challenge</h2>
          <p className="mt-2 text-base leading-relaxed text-muted">{study.challenge}</p>
          <h2 className="mt-8 text-lg font-semibold text-navy">Approach</h2>
          <p className="mt-2 text-base leading-relaxed text-muted">{study.approach}</p>
          <h2 className="mt-8 text-lg font-semibold text-navy">Outcome</h2>
          <p className="mt-2 text-base leading-relaxed text-muted">{study.outcome}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {study.stack.map((item) => (
              <span key={item} className="rounded-full bg-paper px-3 py-1 text-xs text-muted">
                {item}
              </span>
            ))}
          </div>
          <Button href="/contact" className="mt-10">
            Discuss a similar system
          </Button>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
