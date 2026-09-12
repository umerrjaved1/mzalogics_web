import type { Metadata } from "next";
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
import { resolveLocal } from "@/lib/media";

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
    title: `${service.title} | Software Engineering Practice`,
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
                Scope this work
              </Button>
            </div>
            <div className="overflow-hidden rounded-[28px] border border-black/8 bg-navy shadow-lg">
              {resolveLocal((serviceCovers[service.slug] ?? serviceCovers["web-platforms"]).local) ? (
                <MediaImg
                  local={(serviceCovers[service.slug] ?? serviceCovers["web-platforms"]).local}
                  fallback={(serviceCovers[service.slug] ?? serviceCovers["web-platforms"]).local}
                  alt=""
                  className="h-64 w-full sm:h-[360px]"
                />
              ) : (
                <div className="grid h-64 place-items-center px-6 text-center text-sm font-semibold text-white/80 sm:h-[360px]">
                  {service.title}
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>
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
