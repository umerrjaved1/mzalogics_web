import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { services } from "@/content/services";
import { engagementModels, engagementNote } from "@/content/engagement";
import { servicesJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "End-to-end software development — mobile, web, UI/UX, MVP, DevOps, and CMS. Launch faster. Scale smarter.",
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
          <p className="mt-4 max-w-2xl text-muted">
            Launch faster. Scale smarter. Grow continuously. Explore what we build — or pick a plan that fits this stage.
          </p>
        </Container>
      </Section>
      <Section className="pt-0">
        <Container>
          <div className="grid gap-4 lg:grid-cols-3">
            {engagementModels.map((model) => (
              <article key={model.title} className="rounded-3xl border border-line p-6">
                <h2 className="text-lg font-semibold text-navy">{model.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{model.body}</p>
                <ul className="mt-4 space-y-1 text-sm text-navy">
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
                className="rounded-3xl border border-line p-6 hover:border-navy"
              >
                <p className="text-xs text-accent">{service.number}</p>
                <h2 className="mt-2 text-xl font-semibold text-navy">{service.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{service.summary}</p>
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
