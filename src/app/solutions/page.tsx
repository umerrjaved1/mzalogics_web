import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { services } from "@/content/services";
import { engagementModels, engagementNote } from "@/content/engagement";
import { servicesJsonLd } from "@/lib/jsonld";

import { site } from "@/lib/site";

const serviceCovers: Record<string, string> = {
  "ai-development": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900&h=560&fit=crop",
  "app-development": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&h=560&fit=crop",
  "web-platforms": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=560&fit=crop",
  "product-design": "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&h=560&fit=crop",
  "mvp-prototyping": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&h=560&fit=crop",
  cloud: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&h=560&fit=crop",
  cms: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=900&h=560&fit=crop",
};

export const metadata: Metadata = {
  title: "Software Engineering Solutions & Practices | Mobile, Web & AI",
  description:
    "Explore MZA Logics engineering capabilities: native & cross-platform mobile apps (Flutter, React Native), scalable web platforms (Next.js), AI/LLM integration, MVP prototyping, and cloud DevOps.",
  alternates: {
    canonical: "/solutions",
  },
  openGraph: {
    title: "Software Engineering Solutions & Practices | MZA Logics",
    description:
      "End-to-end software development services from concept to scale. Dual delivery tracks: AI-accelerated or 100% hand-crafted.",
    url: `${site.url}/solutions`,
  },
};

export default function SolutionsPage() {
  return (
    <>
      <JsonLd data={servicesJsonLd()} />
      <Section className="dot-grid pb-8">
        <Container>
          <Eyebrow>Solutions</Eyebrow>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-navy sm:text-5xl">
            End-to-end software development services
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Pick a practice — mobile, web, AI, design, MVP, cloud, or CMS.
          </p>
        </Container>
      </Section>
      <Section className="pt-0">
        <Container>
          <div className="grid gap-4 lg:grid-cols-3">
            {engagementModels.map((model) => (
              <article key={model.title} className="rounded-3xl border border-line p-6">
                <h2 className="text-lg font-semibold text-navy">{model.title}</h2>
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
            <Link href="/pricing" className="text-sm font-medium text-navy hover:underline">
              See full pricing for both tracks →
            </Link>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/solutions/${service.slug}`}
                className="overflow-hidden rounded-3xl border border-line bg-white hover:border-navy"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={serviceCovers[service.slug] ?? serviceCovers["web-platforms"]}
                  alt=""
                  className="h-40 w-full object-cover"
                />
                <div className="p-6">
                  <p className="text-sm font-semibold text-navy">{service.number}</p>
                  <h2 className="mt-2 text-xl font-semibold text-navy">{service.title}</h2>
                  <p className="mt-2 text-base leading-relaxed text-muted">{service.summary}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10">
            <Button href="/contact" className="px-5 py-2.5 pr-5">
              Contact us
            </Button>
          </div>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
