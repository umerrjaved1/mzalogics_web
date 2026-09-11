import type { Metadata } from "next";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { allFaqs, faqGroups } from "@/content/faqs";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ) | Pricing, Delivery & IP Ownership",
  description:
    "Common questions about working with MZA Logics: AI-accelerated vs hand-crafted delivery, IP ownership, sprint pricing, contract terms, security, and post-launch maintenance.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "Frequently Asked Questions (FAQ) | MZA Logics",
    description:
      "Answers on pricing, IP ownership, sprint timelines, and delivery tracks at MZA Logics.",
    url: `${site.url}/faq`,
  },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(allFaqs)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ])}
      />

      <Section className="pb-10">
        <Container>
          <Eyebrow>FAQ</Eyebrow>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Questions clients ask before signing
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            If yours is not here, email{" "}
            <a href={`mailto:${site.email}`} className="font-medium text-navy hover:underline">
              {site.email}
            </a>{" "}
            or WhatsApp {site.phoneDisplay}. {site.responseTime}
          </p>
        </Container>
      </Section>

      {faqGroups.map((group) => (
        <Section key={group.title} className="pt-0">
          <Container className="grid gap-8 lg:grid-cols-[0.6fr_1.4fr]">
            <h2 className="text-2xl font-bold text-navy">{group.title}</h2>
            <dl className="divide-y divide-line border-y border-line">
              {group.items.map((item) => (
                <div key={item.question} className="py-6">
                  <dt className="text-[15px] font-semibold text-navy">{item.question}</dt>
                  <dd className="mt-3 text-sm leading-7 text-muted">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </Section>
      ))}

      <CtaBand />
    </>
  );
}
