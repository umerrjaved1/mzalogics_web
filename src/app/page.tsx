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
