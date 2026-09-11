import type { Metadata } from "next";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { LeadForm } from "@/components/LeadForm";
import { Faq } from "@/components/Faq";
import { CtaBand } from "@/components/CtaBand";
import { homeFaqs } from "@/content/faqs";

import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hire Dedicated Developers & Engineering Pods | Staff Augmentation",
  description:
    "Hire vetted senior software engineers, mobile app developers (Flutter, iOS, Android), and Next.js architects from Lahore. Dedicated pods matched in 48 hours.",
  alternates: {
    canonical: "/talent",
  },
  openGraph: {
    title: "Hire Dedicated Developers & Engineering Pods | MZA Logics",
    description:
      "Scale your engineering team with vetted senior software developers in Lahore. 48-hour matching.",
    url: `${site.url}/talent`,
  },
};

import Link from "next/link";
import { ArrowRight, Check, Sparkles, Shield, Clock } from "lucide-react";
import { TeamGrid } from "@/components/TeamGrid";
import { team } from "@/content/team";

const steps = [
  {
    title: "Review & Pick Talent",
    body: "Filter by seniority or stack, review verified shipped portfolios, rates, and pick the exact developers you want.",
  },
  {
    title: "Technical Discovery Call",
    body: "Meet your shortlisted engineers in 48 hours to confirm stack alignment, culture fit, and workflow velocity.",
  },
  {
    title: "Transparent SLA & Scope",
    body: "Transparent rates by seniority (Junior, Mid-Level, Senior/Lead). Clear sprint milestones, IP protection, and no lock-in.",
  },
  {
    title: "Immediate Repo Onboarding",
    body: "Engineers join your Slack/Teams and git repos on Day 1. Full productivity with replacement guarantees at any time.",
  },
];

export default function TalentPage() {
  return (
    <>
      <Section className="dot-grid pb-8">
        <Container>
          <Eyebrow>People-Powered Delivery</Eyebrow>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-navy sm:text-5xl lg:text-6xl">
            Hire Dedicated Specialists &amp; Engineering Pods
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted leading-relaxed">
            <strong className="text-navy font-semibold">Software built around you.</strong> Scale your engineering team with vetted senior architects, mid-level specialists, and high-aptitude junior builders from Lahore. Matched in 48 hours with 100% replacement guarantee.
          </p>

          {/* Quick Rate Overview Pill Cards */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-black/8 bg-white p-4 shadow-sm">
              <div className="text-xs font-bold text-accent-2 uppercase tracking-wider">Senior / Lead</div>
              <div className="mt-1 text-2xl font-extrabold text-navy">$50 – $70 <span className="text-xs font-medium text-muted">/ hr</span></div>
              <p className="mt-1 text-xs text-muted">Architects, Tech Leads, Mobile Leads</p>
            </div>
            <div className="rounded-2xl border border-black/8 bg-white p-4 shadow-sm">
              <div className="text-xs font-bold text-accent-cyan uppercase tracking-wider">Mid-Level</div>
              <div className="mt-1 text-2xl font-extrabold text-navy">$35 – $48 <span className="text-xs font-medium text-muted">/ hr</span></div>
              <p className="mt-1 text-xs text-muted">Full-Stack, DevOps, Cloud, UI/UX</p>
            </div>
            <div className="rounded-2xl border border-black/8 bg-white p-4 shadow-sm">
              <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Junior / Associate</div>
              <div className="mt-1 text-2xl font-extrabold text-navy">$20 – $28 <span className="text-xs font-medium text-muted">/ hr</span></div>
              <p className="mt-1 text-xs text-muted">Frontend, QA Automation, Styling</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Onboarding Steps */}
      <Section className="pt-0">
        <Container>
          <Eyebrow>Time-to-Ship</Eyebrow>
          <h2 className="mt-2 text-2xl font-bold text-navy sm:text-3xl">How Picking &amp; Onboarding Works</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <article key={step.title} className="rounded-3xl border border-black/8 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold tracking-widest uppercase text-accent-2">Step 0{index + 1}</p>
                <h3 className="mt-3 font-bold text-navy text-lg">{step.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{step.body}</p>
              </article>
            ))}
          </div>

          {/* Vetted Talent Directory */}
          <div className="mt-16 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Available Specialists</Eyebrow>
              <h2 className="mt-2 text-3xl font-extrabold text-navy sm:text-4xl">
                Pick Your Specialist Directly
              </h2>
              <p className="mt-1 text-sm text-muted max-w-xl">
                Select a team member below to view their interactive portfolio, shipped metrics, and book them directly into your sprint.
              </p>
            </div>
            <Link
              href="/team"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-navy hover:underline"
            >
              View Full Team Directory ({team.length} specialists) <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-8">
            <TeamGrid members={team} />
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
