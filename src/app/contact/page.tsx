import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";
import { BookingPanel } from "@/components/conversion/BookingPanel";
import { TrustPoints } from "@/components/conversion/TrustPoints";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Discovery Call",
  description:
    "Book a free 20-minute call, message us on WhatsApp, or send a short brief. NDA before project details; reply within one business day.",
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
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Book a discovery call
          </h1>
          <p className="mt-4 max-w-xl text-muted">
            Pick a slot below, message us on WhatsApp {site.phoneDisplay}, or send a brief with the
            form. You talk to an engineer, and we reply within one business day.
          </p>
          <TrustPoints className="mt-6 justify-start" />
          <p className="mt-6 text-sm text-muted">
            {site.locations[0].address}, {site.locations[0].detail}
          </p>
        </Container>
      </Section>
      <BookingPanel />
      <LeadForm
        kind="contact"
        title="Prefer to send a brief?"
        intro="A short note is enough. We will read it and come back with a written scope."
        submitLabel="Send the brief"
        eyebrow="Send a brief"
      />
    </>
  );
}
