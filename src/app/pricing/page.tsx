import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { PricingTables } from "@/components/PricingTables";
import { TalentRateDeck } from "@/components/pricing/TalentRateDeck";
import { TrackComparisonTable } from "@/components/AiPractice";
import { addOns, everyEngagementIncludes, pricingNotes } from "@/content/pricing";
import { pricingFaqs } from "@/content/faqs";
import { breadcrumbJsonLd, faqJsonLd, pricingJsonLd } from "@/lib/jsonld";

import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing & Sprint Plans | AI-Driven vs Hand-Crafted Pods",
  description:
    "Predictable, transparent software engineering pricing. AI-accelerated delivery from $3,900/sprint, 100% hand-crafted engineering from $5,900, and dedicated full-time developers at $4,200/mo.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Software Engineering Pricing & Pod Plans | MZA Logics",
    description:
      "Transparent sprint pricing for AI-driven and hand-crafted tracks. No hidden fees, no lock-in, 100% IP ownership.",
    url: `${site.url}/pricing`,
  },
};

export default function PricingPage() {
  return (
    <>
      <JsonLd data={pricingJsonLd()} />
      <JsonLd data={faqJsonLd(pricingFaqs)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
        ])}
      />

      <Section className="pb-10">
        <Container>
          <Eyebrow>Pricing</Eyebrow>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Choose how your software gets built
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Every engagement runs on the same team and the same review gates. The only decision is whether AI
            handles the repetitive work — which changes the timeline and the hours, not the standard.
          </p>
          <p className="mt-4 max-w-2xl text-sm text-muted">
            Prices below are indicative starting points. You get a fixed quote against a written scope after a
            free discovery call.
          </p>
        </Container>
      </Section>

      <PricingTables />

      {/* Direct Specialist Talent Rate Deck by Seniority */}
      <Section className="pt-0">
        <Container>
          <TalentRateDeck />
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <Eyebrow>Included on both tracks</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Never a line item, always in the box
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {everyEngagementIncludes.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-2xl border border-black/8 bg-white p-5 text-sm text-navy"
              >
                <Check size={16} strokeWidth={3} className="mt-0.5 shrink-0 text-accent-2" />
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <Eyebrow>Track comparison</Eyebrow>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            With AI or without, line by line
          </h2>
          <TrackComparisonTable />
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <Eyebrow>Add-ons & retainers</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Ongoing capacity, priced monthly
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {addOns.map((item) => (
              <article key={item.title} className="rounded-[28px] border border-black/8 bg-white p-6">
                <h3 className="font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-2xl font-extrabold tracking-tight text-navy">{item.price}</p>
                <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
              </article>
            ))}
          </div>
          <ul className="mt-8 max-w-3xl space-y-2 text-sm text-muted">
            {pricingNotes.map((note) => (
              <li key={note}>• {note}</li>
            ))}
          </ul>
        </Container>
      </Section>

      <Faq items={pricingFaqs} />
      <CtaBand
        title="Not sure which track fits?"
        body="Send us the scope. We will tell you honestly whether AI saves you money on this particular project — and quote both ways if it is close."
      />
    </>
  );
}
