import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Website terms for ${site.name}. Paid work is governed by a signed statement of work.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-navy">Terms of Use</h1>
        <p className="mt-3 text-sm text-muted">Last updated 12 September 2026.</p>

        <div className="mt-8 space-y-6 text-sm leading-7 text-muted">
          <section>
            <h2 className="text-lg font-semibold text-navy">The website</h2>
            <p className="mt-2">
              This site is provided by {site.name} for information. Content may change without notice. Case studies may be anonymized. Metrics describe that engagement and are not a guarantee of the same result on your project.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">Pricing on this site</h2>
            <p className="mt-2">
              Published prices are indicative starting points in USD. A binding price exists only in a signed statement of work after discovery. Third-party licences, cloud spend, and taxes are extra unless the statement of work says otherwise.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">Enquiries</h2>
            <p className="mt-2">
              Sending a form or WhatsApp message is not a contract. We will reply using the contact details you provide. Do not send confidential production systems through the public form until we have agreed an NDA or engagement letter.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">Engagements</h2>
            <p className="mt-2">
              Delivery, IP, confidentiality, and payment are governed by a master services agreement and statement of work — not by these website terms. If those documents conflict with this page, the signed documents win.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">Acceptable use</h2>
            <p className="mt-2">Do not abuse the forms, scrape the site in a way that degrades service, or misrepresent your identity when requesting a quote.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">Contact</h2>
            <p className="mt-2">
              Questions:{" "}
              <a className="font-medium text-navy underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              .
            </p>
          </section>
        </div>
      </Container>
    </Section>
  );
}
