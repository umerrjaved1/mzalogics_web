import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a discovery call with MZA Logics. We reply within 24 hours.",
};

export default function ContactPage() {
  return (
    <>
      <Section className="dot-grid pb-0">
        <Container>
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-navy sm:text-5xl">
            Contact us
          </h1>
          <p className="mt-4 max-w-xl text-muted">
            Email {site.email}, WhatsApp {site.phoneDisplay}, or use the form. We typically reply within 24 hours.
          </p>
          <p className="mt-4 text-sm text-muted">
            {site.locations[0].address}, {site.locations[0].detail}
          </p>
        </Container>
      </Section>
      <LeadForm
        kind="contact"
        title="Tell us about the system"
        intro="A short note is enough. We will propose a 30-minute scoping call."
        submitLabel="Request a call"
      />
    </>
  );
}
