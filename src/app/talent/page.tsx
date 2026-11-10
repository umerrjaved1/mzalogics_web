import type { Metadata } from "next";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { LeadForm } from "@/components/LeadForm";
import { Faq } from "@/components/Faq";
import { CtaBand } from "@/components/CtaBand";
import { homeFaqs } from "@/content/faqs";

import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hire Dedicated Engineers & Pods",
  description:
    "Add our Android, AI, and design specialists to your team. Published rates by level, direct access to the engineers, full IP ownership.",
  alternates: {
    canonical: "/talent",
  },
  openGraph: {
    title: "Hire Dedicated Developers & Engineering Pods | MZA Logics",
    description:
      "Work directly with a small senior team in Lahore. Transparent rates and no lock-in.",
    url: `${site.url}/talent`,
  },
};

import Link from "next/link";
import { ArrowRight, Check, Sparkles, Shield, Clock } from "lucide-react";
import { TeamGrid } from "@/components/TeamGrid";
import { team } from "@/content/team";
import { teamPhotos } from "@/lib/media";
import { isPromoActive, promo } from "@/content/promo";

const steps = [
  {
    title: "Tell us who you need",
    body: "Send the stack, the level and the hours you need. We reply within one business day.",
  },
  {
    title: "Discovery call",
    body: "Talk to the engineers who would do the work, and confirm the stack and working style.",
  },
  {
    title: "Clear scope and rate",
    body: "Rates by level, sprint milestones in writing, IP protection, and no lock-in.",
  },
  {
    title: "Onboarding",
    body: "Engineers join your Slack or Teams and your repositories from day one.",
  },
];

export default function TalentPage() {
  // Rate cards only advertise the discount while the offer is live.
  const promoSuffix = isPromoActive() ? ` · ${promo.discountLabel}` : "";

  return (
    <>
      <Section className="dot-grid pb-8 sm:pb-8">
        <Container>
          <Eyebrow>Dedicated engineers</Eyebrow>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-navy sm:text-5xl lg:text-6xl">
            Hire Dedicated Specialists &amp; Engineering Pods
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted leading-relaxed">
            Add our Android, AI, and design specialists to your team. You talk to the engineers
            directly — on the first call, not after signing — with published rates and full IP
            ownership.
          </p>

          {/* Quick Rate Overview Pill Cards */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-black/8 bg-white p-4 shadow-sm">
              <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Senior / Lead</div>
              <p className="mt-1 text-xs text-muted line-through">$50 – $70</p>
              <div className="text-2xl font-extrabold text-navy">$26 – $39 <span className="text-xs font-medium text-muted">/ hr{promoSuffix}</span></div>
              <p className="mt-1 text-xs text-muted">Architects, Tech Leads, Mobile Leads</p>
            </div>
            <div className="rounded-2xl border border-black/8 bg-white p-4 shadow-sm">
              <div className="text-xs font-bold text-accent-cyan uppercase tracking-wider">Mid-Level</div>
              <p className="mt-1 text-xs text-muted line-through">$35 – $48</p>
              <div className="text-2xl font-extrabold text-navy">$18 – $26 <span className="text-xs font-medium text-muted">/ hr{promoSuffix}</span></div>
              <p className="mt-1 text-xs text-muted">Full-Stack, DevOps, Cloud, UI/UX</p>
            </div>
            <div className="rounded-2xl border border-black/8 bg-white p-4 shadow-sm">
              <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Junior / Associate</div>
              <p className="mt-1 text-xs text-muted line-through">$20 – $28</p>
              <div className="text-2xl font-extrabold text-navy">$11 – $15 <span className="text-xs font-medium text-muted">/ hr{promoSuffix}</span></div>
              <p className="mt-1 text-xs text-muted">Frontend, QA Automation, Styling</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Onboarding Steps */}
      <Section className="pt-0 sm:pt-0 pb-8 sm:pb-10">
        <Container>
          <Eyebrow>Time-to-Ship</Eyebrow>
          <h2 className="mt-2 text-2xl font-bold text-navy sm:text-3xl">How working with us starts</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <article key={step.title} className="rounded-[28px] border border-black/8 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold tracking-widest uppercase text-emerald-700">
                  Step {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-bold text-navy text-lg">{step.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{step.body}</p>
              </article>
            ))}
          </div>

          {/* The team */}
          {site.showTeam && (
          <>
          <div className="mt-16 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>The team</Eyebrow>
              <h2 className="mt-2 text-3xl font-extrabold text-navy sm:text-4xl">
                Who you would work with
              </h2>
              <p className="mt-1 text-sm text-muted max-w-xl">
                Open a profile to see skills, background and published apps.
              </p>
            </div>
            <Link
              href="/team"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-navy hover:underline"
            >
              View the team page <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-8">
            <TeamGrid members={team} photos={teamPhotos(team.map((member) => member.slug))} />
          </div>
          </>
          )}
        </Container>
      </Section>
      <LeadForm
        kind="talent"
        eyebrow="Hire our engineers"
        title="Tell us who you need"
        intro="Drop the stack, budget, and timezone. An engineer replies within one business day — and only about this request."
        submitLabel="Request rates and availability"
        extraFields="talent"
      />
      <Faq items={homeFaqs} />
      <CtaBand />
    </>
  );
}
