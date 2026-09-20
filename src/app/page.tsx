import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Solutions } from "@/components/home/Solutions";
import { IndustryStrip } from "@/components/home/IndustryStrip";
import { WorkProof } from "@/components/home/WorkProof";
import { Testimonials } from "@/components/home/Testimonials";
import { LeadForm } from "@/components/LeadForm";
import { DealStrip } from "@/components/conversion/DealStrip";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessJsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { testimonials } from "@/content/testimonials";
import { testimonialPhotos } from "@/lib/media";
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
      {/* What we do → who we do it for → proof → what others say → book.
          How we build lives on /solutions#how-we-build: it is a procurement
          detail, not a homepage message. */}
      <Hero />
      <Solutions />
      <IndustryStrip />
      <WorkProof />
      <Testimonials
        photos={testimonialPhotos(
          testimonials.flatMap((item) => (item.attributed ? [item.attributed.slug] : [])),
        )}
      />
      <DealStrip />
      {/* The form is the only close. CtaBand used to follow it asking the same
          thing in different words, so the page ended three times. */}
      <LeadForm
        kind="contact"
        title="Get a written scope"
        intro={`Tell us what you want to build. WhatsApp ${site.phoneDisplay} if it is quicker — we reply within one business day.`}
        submitLabel="Send enquiry"
      />
    </>
  );
}
