import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { TeamGrid } from "@/components/TeamGrid";
import { team, teamByDepartment, teamPortfolio } from "@/content/team";
import { breadcrumbJsonLd, personJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the engineers, designers, QA, and delivery leads at MZA Logics — with the projects each of them shipped and the outcomes those projects produced.",
};

export default function TeamPage() {
  const groups = teamByDepartment();
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

      <Section className="pb-10">
        <Container>
          <Eyebrow>Our team</Eyebrow>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            The people on your project, named up front
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            {site.teamSize} specialists across engineering, AI, design, quality, and delivery. You meet the pod
            in discovery and keep the same pod through launch.
          </p>
          <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat value={String(team.length)} label="Profiles listed" />
            <Stat value={String(portfolio.length)} label="Projects in the portfolio" />
            <Stat value={String(groups.length)} label="Disciplines" />
            <Stat value={site.founded} label="Studio founded" />
          </dl>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container className="space-y-14">
          {groups.map((group) => (
            <div key={group.department}>
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-2xl font-bold text-navy">{group.department}</h2>
                <span className="text-sm text-muted">
                  {group.members.length} {group.members.length === 1 ? "person" : "people"}
                </span>
              </div>
              <div className="mt-6">
                <TeamGrid members={group.members} />
              </div>
            </div>
          ))}
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <Eyebrow>Team portfolio</Eyebrow>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Everything this team has shipped
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            Client names are withheld under NDA; the work, the stack, and the numbers are not.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {portfolio.map((project) => (
              <article
                key={`${project.member.slug}-${project.title}`}
                className="flex flex-col rounded-[28px] border border-black/8 bg-white p-6"
              >
                <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-navy/40">
                  <span>{project.year}</span>
                  <span>{project.role}</span>
                </div>
                <h3 className="mt-4 text-lg font-bold leading-7 text-navy">{project.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-7 text-muted">{project.summary}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.stack.map((item) => (
                    <span key={item} className="rounded-full bg-paper px-2.5 py-1 text-[11px] text-muted">
                      {item}
                    </span>
                  ))}
                </div>
                <p className="mt-5 text-sm font-semibold text-navy">{project.metric}</p>
                <div className="mt-4 flex flex-wrap gap-4 border-t border-line pt-4 text-sm">
                  <Link href={`/team/${project.member.slug}`} className="font-medium text-navy hover:underline">
                    {project.member.name}
                  </Link>
                  {project.caseStudy ? (
                    <Link href={`/work/${project.caseStudy}`} className="text-muted hover:text-navy">
                      Read the case study →
                    </Link>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Want this team on your product?"
        body="Hire a full pod, embed one of our engineers in your team, or start with a fixed-scope project. Tell us the goal and we will propose the shape."
      />
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-4">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="mt-1 text-lg font-bold text-navy">{value}</dd>
    </div>
  );
}
