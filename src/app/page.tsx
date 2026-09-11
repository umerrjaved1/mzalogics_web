import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { LogoMarquee } from "@/components/home/LogoMarquee";
import { Process } from "@/components/home/Process";
import { Solutions } from "@/components/home/Solutions";
import { AiDelivery } from "@/components/home/AiDelivery";
import { Comparison } from "@/components/home/Comparison";
import { PricingTables } from "@/components/PricingTables";
import { Industries } from "@/components/home/Industries";
import { TeamSection } from "@/components/home/TeamSection";
import { Testimonials } from "@/components/home/Testimonials";
import { LeadForm } from "@/components/LeadForm";
import { Faq } from "@/components/Faq";
import { CtaBand } from "@/components/CtaBand";
import { TeamGallery } from "@/components/home/TeamGallery";
import { JsonLd } from "@/components/JsonLd";
import { faqJsonLd, localBusinessJsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { homeFaqs } from "@/content/faqs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "MZA Logics | Custom Software, Mobile Apps & AI Engineering Studio",
  description:
    "Top-tier software engineering house in Lahore building high-velocity mobile apps (Flutter, iOS, Android), custom web platforms (Next.js), and AI systems. Choose AI-accelerated or 100% hand-crafted engineering tracks.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MZA Logics | Custom Software, Mobile Apps & AI Engineering Studio",
    description:
      "A Lahore software engineering studio building high-velocity mobile apps, web platforms, and AI systems with dedicated engineering pods.",
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
      <JsonLd data={faqJsonLd()} />
      <Hero />
      <LogoMarquee />
      <Process />
      <Solutions />
      <AiDelivery />
      <Comparison />
      <PricingTables compact />
      <Industries />
      <TeamSection />
      <Testimonials />
      <LeadForm
        kind="contact"
        title="Get a free quote"
        intro="Tell us about the product and whether you want the AI-driven or hand-crafted track. WhatsApp 0300 3600188 or email Mzalogics@gmail.com — we reply within one business day."
        submitLabel="Contact us"
      />
      <Faq items={homeFaqs} />
      <CtaBand />
      <TeamGallery />
    </>
  );
}
