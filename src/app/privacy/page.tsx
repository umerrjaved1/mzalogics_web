import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `Privacy policy placeholder for ${site.name}.`,
};

export default function PrivacyPage() {
  return (
    <Section>
      <Container className="prose-like max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-navy">Privacy</h1>
        <p className="mt-4 text-sm text-muted">Placeholder policy. Replace with counsel-reviewed text before production.</p>
        <p className="mt-6 text-sm leading-7 text-muted">
          {site.name} collects the information you submit through forms (name, email, company, message) solely to respond to
          inquiries. We do not sell personal data. Form submissions may be emailed to {site.email}. Do not send secrets or
          production credentials through the public forms.
        </p>
      </Container>
    </Section>
  );
}
