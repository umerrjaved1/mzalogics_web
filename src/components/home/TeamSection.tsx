import Link from "next/link";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { Button, ArrowDisc } from "@/components/ui/Button";
import { TeamCard } from "@/components/TeamGrid";
import { team, teamPortfolio } from "@/content/team";
import { site } from "@/lib/site";

export function TeamSection() {
  const featured = team.slice(0, 6);
  const portfolio = teamPortfolio().slice(0, 4);

  return (
    <Section>
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Eyebrow>The team</Eyebrow>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-navy sm:text-5xl">
              The people who will actually build it
            </h2>
            <p className="mt-4 text-muted">
              {site.teamSize} engineers, designers, and delivery leads in Lahore — no bait-and-switch between
              the pitch and the pod. Every profile lists the work they shipped and the outcome it produced.
            </p>
          </div>
          <Button href="/team">
            Meet the whole team
            <ArrowDisc />
          </Button>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((member) => (
            <TeamCard key={member.slug} member={member} />
          ))}
        </div>

        <h3 className="mt-16 text-xl font-bold text-navy">Recent work from the team</h3>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {portfolio.map((project) => (
            <Link
              key={`${project.member.slug}-${project.title}`}
              href={project.caseStudy ? `/work/${project.caseStudy}` : `/team/${project.member.slug}`}
              className="flex flex-col rounded-[28px] border border-black/8 bg-white p-6 transition hover:shadow-[0_12px_40px_rgba(14,9,38,0.06)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-navy/40">{project.year}</p>
              <h4 className="mt-3 text-base font-bold leading-6 text-navy">{project.title}</h4>
              <p className="mt-2 flex-1 text-sm leading-6 text-muted">{project.summary}</p>
              <p className="mt-4 text-sm font-semibold text-navy">{project.metric}</p>
              <p className="mt-1 text-xs text-muted">
                {project.member.name} · {project.role}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
