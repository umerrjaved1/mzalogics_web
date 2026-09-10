import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { Avatar } from "@/components/ui/Avatar";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { TeamCard } from "@/components/TeamGrid";
import { getTeamMember, team } from "@/content/team";
import { breadcrumbJsonLd, personJsonLd } from "@/lib/jsonld";

export function generateStaticParams() {
  return team.map((member) => ({ slug: member.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = getTeamMember(slug);
  if (!member) return {};
  return {
    title: `${member.name} — ${member.role}`,
    description: `${member.name} is ${member.role} at MZA Logics. ${member.focus}.`,
  };
}

export default async function TeamMemberPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = getTeamMember(slug);
  if (!member) notFound();

  const colleagues = team.filter((item) => item.department === member.department && item.slug !== member.slug);
  const links = Object.entries(member.links ?? {}).filter(([, href]) => href && href !== "#");

  return (
    <>
      <JsonLd data={personJsonLd(member)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Team", path: "/team" },
          { name: member.name, path: `/team/${member.slug}` },
        ])}
      />

      <Section className="pb-10">
        <Container>
          <Link href="/team" className="text-sm text-muted hover:text-navy">
            ← Back to team
          </Link>
          <div className="mt-6 grid gap-8 lg:grid-cols-[auto_1fr] lg:items-start">
            <Avatar initials={member.initials} tone={member.tone} size="lg" />
            <div>
              <Eyebrow>{member.department}</Eyebrow>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-navy sm:text-5xl">{member.name}</h1>
              <p className="mt-2 text-lg text-muted">{member.role}</p>
              <p className="mt-6 max-w-2xl leading-8 text-muted">{member.bio}</p>

              <dl className="mt-8 grid gap-4 sm:grid-cols-3">
                <Fact label="Experience" value={member.experience} />
                <Fact label="Based" value={member.location} />
                <Fact
                  label="Delivery track"
                  value={
                    member.track === "both"
                      ? "AI-driven or manual"
                      : member.track === "ai"
                        ? "AI-driven"
                        : "Hand-crafted"
                  }
                />
              </dl>

              <div className="mt-8 flex flex-wrap gap-2">
                {member.skills.map((skill) => (
                  <span key={skill} className="rounded-full border border-line bg-white px-3 py-1 text-xs text-muted">
                    {skill}
                  </span>
                ))}
              </div>

              {links.length > 0 ? (
                <div className="mt-6 flex flex-wrap gap-4 text-sm">
                  {links.map(([label, href]) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-navy hover:underline"
                    >
                      {label[0].toUpperCase() + label.slice(1)}
                      <ArrowUpRight size={14} />
                    </a>
                  ))}
                </div>
              ) : null}

              <Button href="/contact" className="mt-8 px-5 py-2.5 pr-5">
                Request {member.name.split(" ")[0]} on your project
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <Eyebrow>Portfolio</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">Selected work</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {member.projects.map((project) => (
              <article key={project.title} className="flex flex-col rounded-[28px] border border-black/8 bg-white p-7">
                <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-navy/40">
                  <span>{project.year}</span>
                  <span>{project.role}</span>
                </div>
                <h3 className="mt-4 text-xl font-bold leading-7 text-navy">{project.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-muted">{project.summary}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.stack.map((item) => (
                    <span key={item} className="rounded-full bg-paper px-2.5 py-1 text-[11px] text-muted">
                      {item}
                    </span>
                  ))}
                </div>
                <p className="mt-6 text-lg font-bold text-navy">{project.metric}</p>
                {project.caseStudy ? (
                  <Link
                    href={`/work/${project.caseStudy}`}
                    className="mt-3 text-sm font-medium text-navy hover:underline"
                  >
                    Read the case study →
                  </Link>
                ) : null}
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {colleagues.length > 0 ? (
        <Section className="pt-0">
          <Container>
            <h2 className="text-2xl font-bold text-navy">Also in {member.department}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {colleagues.map((colleague) => (
                <TeamCard key={colleague.slug} member={colleague} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <CtaBand />
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-4">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="mt-1 font-semibold text-navy">{value}</dd>
    </div>
  );
}
