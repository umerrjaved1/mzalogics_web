import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Zap, Sparkles, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { TeamGrid } from "@/components/TeamGrid";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { team, teamPortfolio } from "@/content/team";
import { breadcrumbJsonLd, personJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";
import { teamPhotos } from "@/lib/media";

export const metadata: Metadata = {
  title: "Hire Vetted Developers & Engineers | Transparent Rates in Lahore",
  description:
    "Choose your engineers from MZA Logics in Lahore. Q4 deal rates: Senior/Lead ($26-$39/hr), Mid-Level ($18-$26/hr), or Junior ($11-$15/hr). Vetted, trusted, and ready in 48 hours.",
  alternates: {
    canonical: "/team",
  },
  openGraph: {
    title: "Hire Vetted Developers & Engineers | MZA Logics",
    description:
      "Pick your developers directly: transparent hourly and monthly rates, verified portfolio builds, and 100% IP ownership.",
    url: `${site.url}/team`,
  },
};

export default function TeamPage() {
  const portfolio = teamPortfolio();

  return (
    <>
      <JsonLd data={team.map(personJsonLd)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Team", path: "/team" },
        ])}
      />

      {/* Hero Section */}
      <Section className="pb-8 sm:pb-10">
        <Container>
          <Eyebrow>People-Powered Delivery</Eyebrow>
          <h1 className="mt-3 max-w-4xl text-4xl font-extrabold tracking-tight text-navy sm:text-6xl">
            Pick Your Team. Set Your Scope. <br />
            <span className="bg-gradient-to-r from-navy via-navy-light to-accent-cyan bg-clip-text text-transparent">
              Software Built Around You.
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">
            Every business operates differently. Scale your pod with senior architects, mid-level problem solvers, or high-energy junior developers — all vetted, transparently priced, and ready to deploy in 48 hours.
          </p>

          {/* Rate Tier Summary Cards */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-black/8 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-accent-cyan bg-navy px-2 py-0.5 rounded-md">
                  Senior &amp; Leads
                </span>
                <span className="text-xs font-mono font-bold text-navy">$26–$39/hr</span>
              </div>
              <p className="mt-3 text-xs text-muted leading-relaxed">
                Veteran architects with 7–14 years experience. Best for technical discovery, high-scale system design, and security audits.
              </p>
            </div>

            <div className="rounded-2xl border border-black/8 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-navy bg-paper px-2 py-0.5 rounded-md border border-black/10">
                  Mid-Level Developers
                </span>
                <span className="text-xs font-mono font-bold text-navy">$18–$26/hr</span>
              </div>
              <p className="mt-3 text-xs text-muted leading-relaxed">
                Independent engineers with 4–6 years experience. Best for core feature velocity, API integrations, and mobile screens.
              </p>
            </div>

            <div className="rounded-2xl border border-black/8 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                  Junior / Associates
                </span>
                <span className="text-xs font-mono font-bold text-navy">$11–$15/hr</span>
              </div>
              <p className="mt-3 text-xs text-muted leading-relaxed">
                Fast, cost-effective developers with 2+ years experience. Best for responsive layouts, test automation, and rapid UI builds.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Main Team Talent Directory with Interactive Filters */}
      <Section className="pt-0 sm:pt-0 pb-8 sm:pb-10">
        <Container>
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-navy sm:text-3xl">Available Engineers</h2>
              <p className="text-xs text-muted mt-1">
                Filter by seniority tier or department. Click on any profile for complete portfolio and code history.
              </p>
            </div>
          </div>

          <TeamGrid members={team} photos={teamPhotos(team.map((member) => member.slug))} />
        </Container>
      </Section>

      {/* Shipped Team Portfolio Grid */}
      <Section className="pt-0 sm:pt-0 pb-8 sm:pb-10">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
            <div>
              <Eyebrow>Verified Track Record</Eyebrow>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-navy sm:text-3xl">
                Recent Projects Shipped by This Team
              </h2>
            </div>
            <span className="text-xs text-muted font-medium">
              NDA protected client names; public code outcomes
            </span>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {portfolio.map((project) => (
              <SpotlightCard
                key={`${project.member.slug}-${project.title}`}
                className="p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-muted">
                    <span className="font-mono">{project.year}</span>
                    <span className="rounded-full bg-paper px-2.5 py-0.5 text-[10px] text-navy">
                      {project.role}
                    </span>
                  </div>

                  <h3 className="mt-4 text-base font-bold leading-snug text-navy">{project.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted">{project.summary}</p>

                  <div className="mt-4 rounded-xl bg-paper p-3 border border-black/5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted block">
                      Outcome:
                    </span>
                    <span className="text-xs font-extrabold text-emerald-700 font-mono mt-0.5 block">
                      {project.metric}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-md bg-white border border-black/5 px-2 py-0.5 text-[10px] text-muted"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between text-xs">
                  <Link
                    href={`/team/${project.member.slug}`}
                    className="font-bold text-navy hover:text-navy-light flex items-center gap-1"
                  >
                    <span>{project.member.name}</span>
                    <span className="text-muted font-normal">({project.member.seniority.split(" ")[0]})</span>
                  </Link>

                  {project.caseStudy && (
                    <Link
                      href={`/work/${project.caseStudy}`}
                      className="text-accent-2 bg-navy px-2.5 py-1 rounded-md text-[11px] font-semibold hover:bg-navy-light"
                    >
                      Case Study →
                    </Link>
                  )}
                </div>
              </SpotlightCard>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Ready to assemble your custom pod?"
        body="Tell us what you want to build and your target velocity. We will match the exact blend of senior leads and mid/junior developers within 48 hours."
      />
    </>
  );
}
