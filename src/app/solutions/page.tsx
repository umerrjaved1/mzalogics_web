import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { CtaBand } from "@/components/CtaBand";
import { AiDelivery } from "@/components/home/AiDelivery";
import { JsonLd } from "@/components/JsonLd";
import { services } from "@/content/services";
import { engagementModels, engagementNote } from "@/content/engagement";
import { servicesJsonLd } from "@/lib/jsonld";

import { site } from "@/lib/site";
import { serviceCovers } from "@/content/visuals";
import { MediaImg } from "@/components/ui/MediaImg";
import { ServiceScene } from "@/components/ui/DeviceMockup";
import { resolveLocal } from "@/lib/media";

export const metadata: Metadata = {
  title: "Solutions: Mobile Apps, Web Platforms & AI",
  description:
    "Mobile apps, web platforms, AI features, MVPs, and cloud — each scoped in writing and built by senior engineers. See what every practice delivers.",
  alternates: {
    canonical: "/solutions",
  },
  openGraph: {
    title: "Solutions: Mobile Apps, Web Platforms & AI | MZA Logics",
    description:
      "Mobile apps, web platforms, AI features, MVPs, and cloud — each scoped in writing and built by senior engineers.",
    url: `${site.url}/solutions`,
  },
};

export default function SolutionsPage() {
  return (
    <>
      <JsonLd data={servicesJsonLd()} />
      <Section className="dot-grid pb-8 sm:pb-8">
        <Container>
          <Eyebrow>Solutions</Eyebrow>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Tell us what you&apos;re building — we ship it
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Mobile apps, web platforms, AI features, MVPs, and the cloud they run on. Every
            engagement starts with a written scope and a fixed price.
          </p>
        </Container>
      </Section>
      <Section className="pt-0 sm:pt-0 pb-8 sm:pb-10">
        <Container>
          <div className="grid gap-4 lg:grid-cols-3 reveal-kids">
            {engagementModels.map((model) => (
              <article key={model.title} className="card-lift rounded-[28px] border border-line bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-navy">{model.title}</h2>
                <p className="mt-2 text-base leading-relaxed text-muted">{model.body}</p>
                <ul className="mt-4 space-y-1 text-base text-navy">
                  {model.points.map((point) => (
                    <li key={point}>• {point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <p className="max-w-2xl text-sm text-muted">{engagementNote}</p>
            <Link href="/pricing" className="inline-flex min-h-11 items-center text-sm font-medium text-navy hover:underline">
              See full pricing for both tracks →
            </Link>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 reveal-kids">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/solutions/${service.slug}`}
                className="card-lift overflow-hidden rounded-[28px] border border-line bg-white"
              >
                {resolveLocal((serviceCovers[service.slug] ?? serviceCovers["web-platforms"]).local) ? (
                  <MediaImg
                    local={resolveLocal((serviceCovers[service.slug] ?? serviceCovers["web-platforms"]).local) ?? (serviceCovers[service.slug] ?? serviceCovers["web-platforms"]).local}
                    fallback={resolveLocal((serviceCovers[service.slug] ?? serviceCovers["web-platforms"]).local) ?? (serviceCovers[service.slug] ?? serviceCovers["web-platforms"]).local}
                    alt=""
                    className="h-40 w-full"
                  />
                ) : (
                  <div className="h-40 overflow-hidden">
                    <ServiceScene slug={service.slug} />
                  </div>
                )}
                <div className="p-6">
                  <p className="text-sm font-semibold text-navy">{service.number}</p>
                  <h2 className="mt-2 text-xl font-bold text-navy">{service.title}</h2>
                  <p className="mt-2 text-base leading-relaxed text-muted">{service.summary}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10">
            <Button href="/contact" className="px-5 py-2.5 pr-5">
              Get a written scope
            </Button>
          </div>
        </Container>
      </Section>
      <AiDelivery />
      <CtaBand />
    </>
  );
}
