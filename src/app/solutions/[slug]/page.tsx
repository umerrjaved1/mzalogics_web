import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { AiPractice } from "@/components/AiPractice";
import { Faq } from "@/components/Faq";
import { aiFaqs } from "@/content/faqs";
import { getService, services } from "@/content/services";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";
import { serviceCovers } from "@/content/visuals";
import { MediaImg } from "@/components/ui/MediaImg";
import { ServiceScene } from "@/components/ui/DeviceMockup";
import { TrustPoints } from "@/components/conversion/TrustPoints";
import { caseStudies, type CaseStudy } from "@/content/case-studies";
import { resolveLocal } from "@/lib/media";

/** Which published work best proves each practice. Numbers come from the
 *  case-studies content itself, so the claim never drifts from the data. */
const proofFilter: Record<string, (study: CaseStudy) => boolean> = {
  "app-development": (study) => Boolean(study.storeUrl),
  "ai-development": (study) => study.industry === "AI & photo",
  "web-platforms": (study) => Boolean(study.siteUrl) || study.stack.includes("WordPress"),
  cms: (study) => study.stack.includes("WordPress"),
  "mvp-prototyping": (study) => Boolean(study.storeUrl),
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.title} — fixed scope & price`,
    description: service.summary,
    alternates: {
      canonical: `/solutions/${slug}`,
    },
    openGraph: {
      title: `${service.title} | ${site.name}`,
      description: service.summary,
      url: `${site.url}/solutions/${slug}`,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const isAi = service.slug === "ai-development";

  const filter = proofFilter[service.slug];
  const matches = filter ? caseStudies.filter(filter) : [];
  const proof = matches.slice(0, 3);
  const proofTotal = matches.length;

  return (
    <>
      <JsonLd data={serviceJsonLd(service)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
          { name: service.title, path: `/solutions/${service.slug}` },
        ])}
      />
      <Section className="dot-grid">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <Eyebrow>
                {service.number} · Solutions
              </Eyebrow>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-navy sm:text-5xl">{service.title}</h1>
              <p className="mt-4 text-lg leading-relaxed text-muted">{service.description}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-line px-3 py-1 text-sm text-muted">
                    {tag}
                  </span>
                ))}
              </div>
              <ul className="mt-8 space-y-2 text-base text-navy">
                {service.outcomes.map((outcome) => (
                  <li key={outcome}>• {outcome}</li>
                ))}
              </ul>
              <Button href="/contact" className="mt-8">
                Get a written scope
              </Button>
              <TrustPoints className="mt-6 justify-start" />
            </div>
            <div className="overflow-hidden rounded-[28px] border border-black/8 bg-paper shadow-lg">
              {resolveLocal((serviceCovers[service.slug] ?? serviceCovers["web-platforms"]).local) ? (
                <MediaImg
                  local={resolveLocal((serviceCovers[service.slug] ?? serviceCovers["web-platforms"]).local) ?? (serviceCovers[service.slug] ?? serviceCovers["web-platforms"]).local}
                  fallback={resolveLocal((serviceCovers[service.slug] ?? serviceCovers["web-platforms"]).local) ?? (serviceCovers[service.slug] ?? serviceCovers["web-platforms"]).local}
                  alt=""
                  fit="contain"
                  className="h-64 w-full sm:h-[360px]"
                />
              ) : (
                <div className="h-64 sm:h-[360px]">
                  <ServiceScene slug={service.slug} />
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>
      {proof.length > 0 ? (
        <Section className="pt-0 sm:pt-0 pb-8 sm:pb-10">
          <Container>
            <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              Proof from published work
            </h2>
            <p className="mt-3 max-w-2xl text-base text-muted">
              {service.slug === "app-development"
                ? `${proofTotal} of our apps are live on Google Play. A few of them:`
                : "Live projects you can open right now:"}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {proof.map((study) => (
                <Link
                  key={study.slug}
                  href={`/work/${study.slug}`}
                  className="rounded-[28px] border border-black/8 bg-white p-5 shadow-sm transition hover:border-navy/30 hover:shadow-md"
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-muted">{study.industry}</p>
                  <h3 className="mt-1.5 font-bold text-navy">{study.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{study.summary}</p>
                  <p className="mt-3 text-sm font-semibold text-navy">
                    {study.storeUrl ? "On Google Play" : study.siteUrl ? "Live site" : "Case study"} →
                  </p>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}
      {isAi ? (
        <>
          <AiPractice />
          <Faq items={aiFaqs} />
        </>
      ) : null}
      <CtaBand />
    </>
  );
}
