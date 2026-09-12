import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, and retains information submitted through this website.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-navy">Privacy Policy</h1>
        <p className="mt-3 text-sm text-muted">Last updated 12 September 2026. This page covers the public website only.</p>

        <div className="mt-8 space-y-6 text-sm leading-7 text-muted">
          <section>
            <h2 className="text-lg font-semibold text-navy">Who we are</h2>
            <p className="mt-2">
              {site.name} ({site.locations[0].address}, {site.locations[0].city}) operates this site. Contact{" "}
              <a className="font-medium text-navy underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>{" "}
              or WhatsApp {site.phoneDisplay}.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">What we collect</h2>
            <p className="mt-2">When you use a form we receive the fields you submit: name, email, phone, company, message, and any role, stack, plan, or track you choose. We also receive standard server logs (IP address, user agent, time) used to prevent abuse.</p>
            <p className="mt-2">Do not send passwords, production credentials, or personal data about other people through public forms.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">How we use it</h2>
            <p className="mt-2">We use enquiry data only to reply, scope work, and keep a record of the conversation. We do not sell personal data. We do not use form contents to train public AI models.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">Where it goes</h2>
            <p className="mt-2">
              Form submissions are emailed to {site.email} through our email provider (Resend) when that service is configured. Hosting and DNS providers process connection data as needed to serve the site. If analytics is enabled, page views are collected by Plausible without cookies or personal advertising profiles.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">Retention</h2>
            <p className="mt-2">Enquiry email is kept for as long as we need it to deliver or follow up on a conversation, then deleted from active inboxes in the ordinary course of business. You can ask us to delete an unused enquiry by emailing {site.email}.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">Your rights</h2>
            <p className="mt-2">You may request a copy of the enquiry we hold about you, or ask us to correct or delete it, by writing to {site.email}. Client work is governed by the contract for that engagement, not this page.</p>
          </section>
        </div>
      </Container>
    </Section>
  );
}
