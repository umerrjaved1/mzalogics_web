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
import { TeamStrip } from "@/components/home/TeamStrip";
import { FounderNote } from "@/components/home/FounderNote";
import { team } from "@/content/team";
import { testimonialPhotos } from "@/lib/media";
import { site } from "@/lib/site";

/** The person a homepage enquiry actually lands with. */
const founder = team.find((member) => member.slug === "umer-javed") ?? team[0];

export const metadata: Metadata = {
  title: "MZA Logics | Mobile Apps, Web Platforms & AI Studio",
  description:
    "Senior Lahore studio building mobile apps, web platforms, and AI features for teams worldwide. Fixed written scope, weekly demos, your code and IP from day one.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MZA Logics | Mobile Apps, Web Platforms & AI Studio",
    description:
      "A senior software studio in Lahore building mobile apps, web platforms, and AI features — fixed written scope, your code and IP from day one.",
    url: site.url,
    siteName: site.name,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "MZA Logics — mobile apps, web platforms, and AI features",
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
      {site.showTeam && <TeamStrip />}
      <Testimonials
        photos={testimonialPhotos(
          testimonials.flatMap((item) => (item.attributed ? [item.attributed.slug] : [])),
        )}
      />
      <DealStrip />
      {/* Who the enquiry lands with, then the form. They used to share one
          section, which shrank the founder to a thumbnail beside the form. */}
      <FounderNote founder={founder} />
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
