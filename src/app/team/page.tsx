import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

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
  title: "Team: Android, AI & Design Specialists",
  description:
    "Meet the MZA Logics team in Lahore: Android and AI engineers and a designer. See each person's skills, background and published apps.",
  alternates: {
    canonical: "/team",
  },
  openGraph: {
    title: "The MZA Logics Team",
    description: "Meet the people who scope, build and ship your product.",
    url: `${site.url}/team`,
  },
};

export default function TeamPage() {
  if (!site.showTeam) notFound();
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
          <Eyebrow>The team</Eyebrow>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight text-navy sm:text-6xl">
            A small senior team. <br />
            <span className="bg-gradient-to-r from-navy via-navy-light to-accent-cyan bg-clip-text text-transparent">
              You work with us directly.
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">
            Engineers and a designer in Lahore. The people on this page are the ones who scope, build
            and ship your product, with no account managers in between.
          </p>
          <p className="mt-4 text-sm text-muted">
            Rates are on the{" "}
            <Link href="/pricing" className="font-semibold text-navy underline">
              pricing page
            </Link>
            .
          </p>
        </Container>
      </Section>

      {/* Main Team Talent Directory with Interactive Filters */}
      <Section className="pt-0 sm:pt-0 pb-8 sm:pb-10">
        <Container>
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-navy sm:text-3xl">The team</h2>
              <p className="text-xs text-muted mt-1">
                Open a profile for skills, background and published apps.
              </p>
            </div>
          </div>

          <TeamGrid members={team} photos={teamPhotos(team.map((member) => member.slug))} />
        </Container>
      </Section>

      {/* Shipped team portfolio: hidden until there is MZA client work to credit. */}
      {portfolio.length > 0 && (
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

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 reveal-kids">
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
                    {project.member.seniority && (
                      <span className="text-muted font-normal">({project.member.seniority.split(" ")[0]})</span>
                    )}
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
      )}

      <CtaBand
        title="Ready to start?"
        body="Tell us what you want to build. We reply within one business day with next steps."
      />
    </>
  );
}
