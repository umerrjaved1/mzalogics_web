import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description: `Terms of use placeholder for ${site.name}.`,
};

export default function TermsPage() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-navy">Terms</h1>
        <p className="mt-4 text-sm text-muted">Placeholder terms. Replace with counsel-reviewed text before production.</p>
        <p className="mt-6 text-sm leading-7 text-muted">
          The {site.name} website is provided for information. Case studies, metrics, and testimonials on this site may include
          anonymized or placeholder content. Engagements are governed by a signed statement of work and master services
          agreement, not by this page.
        </p>
      </Container>
    </Section>
  );
}
