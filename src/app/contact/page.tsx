import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";
import { BookingPanel } from "@/components/conversion/BookingPanel";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us & Book a Discovery Call | Lahore Software Studio",
  description:
    "Get in touch with MZA Logics. Direct WhatsApp chat (+92 300 3600188), email, or book a free technical architecture discovery call with our Lahore leadership.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact MZA Logics | Software Engineering Studio",
    description:
      "Schedule a discovery call with our technical leadership. We reply within one business day.",
    url: `${site.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      <Section className="dot-grid pb-0 sm:pb-0">
        <Container>
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-navy sm:text-5xl">
            Contact us
          </h1>
          <p className="mt-4 max-w-xl text-muted">
            Pick a slot below, message us on WhatsApp {site.phoneDisplay}, or send a brief with the
            form. We reply within one business day.
          </p>
          <p className="mt-4 text-sm text-muted">
            {site.locations[0].address}, {site.locations[0].detail}
          </p>
        </Container>
      </Section>
      <BookingPanel />
      <LeadForm
        kind="contact"
        title="Prefer to send a brief?"
        intro="A short note is enough. We will read it and come back with a written scope."
        submitLabel="Request a call"
        eyebrow="Send a brief"
      />
    </>
  );
}
