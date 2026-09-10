import type { Metadata } from "next";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { LeadForm } from "@/components/LeadForm";
import { Faq } from "@/components/Faq";
import { CtaBand } from "@/components/CtaBand";
import { rescueFaqs } from "@/content/faqs";

export const metadata: Metadata = {
  title: "Rescue & modernize",
  description:
    "Audit vibe-coded products and legacy systems. Security, architecture, documentation, then a quoted execution plan.",
};

const coverage = [
  { title: "Security vulnerabilities", body: "Auth, injection, secrets, exposed endpoints, missing rate limits." },
  { title: "Logic and edge cases", body: "Paths tests never hit. Race conditions, null crashes, off-by-one." },
  { title: "Unexpected behavior", body: "Works in dev, fails in prod. State leaks and inconsistent responses." },
  { title: "Scalability", body: "N+1 queries, missing indexes, unbounded loops, blocking I/O." },
  { title: "Data integrity", body: "PII exposure, missing validation, residency and access-review gaps." },
  { title: "Missing documentation", body: "Undocumented APIs and logic that only an old AI session knows." },
];

export default function RescuePage() {
  return (
    <>
      <Section className="dot-grid pb-8">
        <Container className="max-w-3xl">
          <Eyebrow>Rescue & modernize</Eyebrow>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-navy sm:text-5xl">
            Built in a hurry. Ship with a plan.
          </h1>
          <p className="mt-4 text-muted">
            We turn vibe-coded prototypes and brittle legacy systems into production software — with an audit, a written action plan, and an optional execution quote. We do not take one-off bug tickets on unknown code.
          </p>
        </Container>
      </Section>
      <Section className="pt-0">
        <Container className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-3xl border border-line p-6">
            <p className="text-xs font-semibold text-accent">Most used</p>
            <h2 className="mt-2 text-xl font-semibold text-navy">App audit</h2>
            <p className="mt-2 text-sm text-muted">
              Security, logic, architecture, and documentation. You get a written plan you can act on immediately.
            </p>
            <ul className="mt-4 space-y-1 text-sm text-navy">
              <li>• Vulnerability review</li>
              <li>• Architecture assessment</li>
              <li>• Written action plan</li>
            </ul>
          </article>
          <article className="rounded-3xl bg-navy p-6 text-white">
            <h2 className="text-xl font-semibold">Audit + execution</h2>
            <p className="mt-2 text-sm text-white/70">
              Same audit, then a scoped quote to implement. You know the blast radius before anyone touches production.
            </p>
            <ul className="mt-4 space-y-1 text-sm text-white/80">
              <li>• Prioritized roadmap</li>
              <li>• Accurate quote from the code</li>
              <li>• Optional: we execute the plan</li>
            </ul>
          </article>
        </Container>
      </Section>
      <Section className="bg-paper">
        <Container>
          <h2 className="text-2xl font-semibold text-navy">Nothing escapes the audit</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {coverage.map((item) => (
              <article key={item.title} className="rounded-3xl border border-line bg-white p-5">
                <h3 className="font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <LeadForm
        kind="rescue"
        eyebrow="Request an audit"
        title="Let us look at the system"
        intro="Back to you within 24 hours. No commitment. NDA first if you need it."
        submitLabel="Request my audit"
        extraFields="rescue"
      />
      <Faq items={rescueFaqs} />
      <CtaBand />
    </>
  );
}
