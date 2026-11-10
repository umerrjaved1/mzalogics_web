import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { CtaBand } from "@/components/CtaBand";
import { TrustPoints } from "@/components/conversion/TrustPoints";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { CaseStudyCover } from "@/components/ui/CaseStudyCover";
import { resolveLocal } from "@/lib/media";

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
    title: study.title,
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

  // More work of the same kind, so the visitor keeps browsing proof.
  const related = caseStudies
    .filter((item) => item.slug !== study.slug && Boolean(item.storeUrl) === Boolean(study.storeUrl))
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: study.title, path: `/work/${study.slug}` },
        ])}
      />
      <Section className="pb-8 sm:pb-10">
        <Container className="max-w-4xl">
          <Eyebrow>{study.industry}</Eyebrow>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-navy sm:text-5xl">{study.title}</h1>
          <p className="mt-3 text-base text-muted">
            {study.namedClient ? (
              study.namedClient.href ? (
                <a
                  href={study.namedClient.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-navy underline underline-offset-2"
                >
                  {study.namedClient.name}
                </a>
              ) : (
                <span className="font-semibold text-navy">{study.namedClient.name}</span>
              )
            ) : (
              study.client
            )}
          </p>
          <div className="relative mt-8 overflow-hidden rounded-[28px] border border-black/8">
            <CaseStudyCover
              industry={study.industry}
              title={study.title}
              local={resolveLocal(`/media/work/${study.slug}-hero.jpg`) ?? resolveLocal(`/media/work/${study.slug}.jpg`)}
              className="aspect-video w-full"
            />
          </div>
          {study.metrics.length > 0 ? (
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {study.metrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-line p-4">
                  <p className="text-lg font-semibold text-navy">{metric.value}</p>
                  <p className="text-sm text-muted">{metric.label}</p>
                </div>
              ))}
            </div>
          ) : null}
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
          <div className="mt-10 flex flex-wrap gap-3">
            {study.storeUrl ? (
              <Button href={study.storeUrl}>View on Google Play</Button>
            ) : null}
            {study.siteUrl ? (
              <Button href={study.siteUrl}>Visit the site</Button>
            ) : null}
            <Button href="/contact">Discuss a similar project</Button>
          </div>
          <TrustPoints className="mt-6 justify-start" />
          {related.length > 0 ? (
            <div className="mt-12 border-t border-line pt-8">
              <h2 className="text-lg font-semibold text-navy">More {study.storeUrl ? "apps on Google Play" : "client sites"}</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/work/${item.slug}`}
                      className="block rounded-2xl border border-black/8 bg-white p-4 transition hover:border-navy/30 hover:shadow-sm"
                    >
                      <span className="text-xs font-bold uppercase tracking-wider text-muted">{item.industry}</span>
                      <span className="mt-1 block text-sm font-bold text-navy">{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
