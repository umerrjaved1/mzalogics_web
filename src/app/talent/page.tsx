import type { Metadata } from "next";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { LeadForm } from "@/components/LeadForm";
import { Faq } from "@/components/Faq";
import { CtaBand } from "@/components/CtaBand";
import { homeFaqs } from "@/content/faqs";

export const metadata: Metadata = {
  title: "Talent",
  description: "Dedicated engineering pods and staff augmentation. Match senior talent in 48 hours.",
};

const steps = [
  {
    title: "Sending CVs",
    body: "We assess the stack and constraints, then send a shortlist of senior CVs within 24 hours.",
  },
  {
    title: "Interviews",
    body: "You pick who to meet. Interviews and paperwork typically complete in two days.",
  },
  {
    title: "SLA",
    body: "We write the service scope: hours, replacement terms, tools, and identity access.",
  },
  {
    title: "Start working",
    body: "Engineers land in your repos and rituals. No communication gap; replacement anytime under the SLA.",
  },
];

const profiles = [
  { name: "Senior Next.js engineer", tags: ["Next.js", "TypeScript"], years: "6 years" },
  { name: "Platform engineer", tags: ["AWS", "Terraform"], years: "5 years" },
  { name: "Mobile engineer", tags: ["React Native", "Flutter"], years: "4 years" },
];

export default function TalentPage() {
  return (
    <>
      <Section className="dot-grid pb-8">
        <Container>
          <Eyebrow>Talent</Eyebrow>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-navy sm:text-5xl">
            Staffing & dedicated engineering pods
          </h1>
          <p className="mt-4 max-w-2xl text-muted">
            Senior talent that embeds into your team — or a full pod with a delivery lead. Matched in 48 hours. Replace anytime.
          </p>
        </Container>
      </Section>
      <Section className="pt-0">
        <Container>
          <h2 className="text-2xl font-semibold text-navy">Least time-to-onboard</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <article key={step.title} className="rounded-3xl border border-line p-5">
                <p className="text-xs text-accent">0{index + 1}</p>
                <h3 className="mt-2 font-semibold text-navy">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.body}</p>
              </article>
            ))}
          </div>
          <h2 className="mt-14 text-2xl font-semibold text-navy">Sample profiles</h2>
          <p className="mt-2 text-sm text-muted">Placeholder skills — not real resumes.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {profiles.map((profile) => (
              <article key={profile.name} className="rounded-3xl border border-line p-5">
                <h3 className="font-semibold text-navy">{profile.name}</h3>
                <p className="mt-1 text-sm text-muted">{profile.years}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {profile.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-paper px-2 py-1 text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <LeadForm
        kind="talent"
        eyebrow="Get matched"
        title="Find the next hire in 48 hours"
        intro="Drop the stack, budget, and timezone. We only reach out about this request."
        submitLabel="Get matched"
        extraFields="talent"
      />
      <Faq items={homeFaqs} />
      <CtaBand />
    </>
  );
}
