import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { WorkProof } from "@/components/home/WorkProof";
import { AiDelivery } from "@/components/home/AiDelivery";
import { Testimonials } from "@/components/home/Testimonials";
import { LeadForm } from "@/components/LeadForm";
import { CtaBand } from "@/components/CtaBand";
import { DealStrip } from "@/components/conversion/DealStrip";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessJsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "MZA Logics | Custom Software, Mobile Apps & AI Engineering Studio",
  description:
    "Senior-led software studio in Lahore building mobile apps, custom web platforms, and AI systems. AI-accelerated or fully hand-crafted delivery — same review gates.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MZA Logics | Custom Software, Mobile Apps & AI Engineering Studio",
    description:
      "A Lahore software engineering studio building mobile apps, web platforms, and AI systems with dedicated engineering pods.",
    url: site.url,
    siteName: site.name,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "MZA Logics - Engineering Apps & AI That Drive the Future",
      },
    ],
    type: "website",
    locale: "en_US",
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={localBusinessJsonLd()} />
      <Hero />
      <WorkProof />
      <AiDelivery />
      <Testimonials />
      <DealStrip />
      <LeadForm
        kind="contact"
        title="Get a written scope"
        intro={`Tell us about the product and the track you want. WhatsApp ${site.phoneDisplay} — we reply within one business day.`}
        submitLabel="Send enquiry"
      />
      <CtaBand />
    </>
  );
}
