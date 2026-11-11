import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  Star,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { Avatar } from "@/components/ui/Avatar";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { TeamCard } from "@/components/TeamGrid";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { getTeamMember, hireHref, team } from "@/content/team";
import { resolveLocal } from "@/lib/media";
import { breadcrumbJsonLd, personJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";

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
  if (!member || !site.showTeam) return {};
  return {
    title: `${member.name} — ${member.role} | Engineering Team`,
    description: `${member.name} is ${member.role} at MZA Logics. ${member.whyHire}`,
    alternates: {
      canonical: `/team/${slug}`,
    },
    openGraph: {
      title: `${member.name} — ${member.role} | MZA Logics`,
      description: member.whyHire,
      url: `${site.url}/team/${slug}`,
    },
  };
}

export default async function TeamMemberPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = getTeamMember(slug);
  if (!member || !site.showTeam) notFound();

  // A small roster rarely has two people in one department, so show everyone else.
  const colleagues = team.filter((item) => item.slug !== member.slug);
  const apps = member.apps ?? [];
  const firstName = member.name.split(" ")[0];
  const linkLabels: Record<string, string> = {
    linkedin: "LinkedIn",
    github: "GitHub",
    dribbble: "Dribbble",
    portfolio: "Design portfolio",
    showreel: "Video editing portfolio",
  };
  const links = Object.entries(member.links ?? {}).filter(([, href]) => href && href !== "#");

  const isSenior = member.seniority === "Senior / Lead";
  const isJunior = member.seniority === "Junior / Associate";

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

      {/* Team Member Hero Section */}
      <Section className="relative overflow-hidden pt-6 pb-12">
        <Container>
          <Link
            href="/team"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-navy transition mb-8"
          >
            <ArrowLeft size={14} /> Back to the team
          </Link>

          <div className="overflow-hidden rounded-[28px] border border-black/8 bg-white p-6 shadow-[0_16px_50px_rgba(9,6,26,0.04)] sm:p-10 lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[auto_1fr_320px] lg:items-start">
              {/* Photo & Availability */}
              <div className="flex flex-col items-center sm:items-start">
                <Avatar
                  initials={member.initials}
                  tone={member.tone}
                  local={resolveLocal(`/media/team/${member.slug}.jpg`)}
                  alt={member.name}
                  size="xl"
                  showStatus
                  className="shadow-md"
                />
                {member.availability && (
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-navy">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{member.availability}</span>
                  </div>
                )}
                {member.rating !== undefined && (
                  <div className="mt-1 flex items-center gap-1 text-xs text-amber-500 font-bold">
                    <Star size={13} fill="currentColor" />
                    <span>{member.rating} / 5.0 Rating</span>
                  </div>
                )}
              </div>

              {/* Central Details: Name, Role, Bio & Why Hire */}
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  {member.seniority && (
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                      isSenior
                        ? "bg-navy text-accent-2"
                        : isJunior
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "bg-paper text-navy/80 border border-black/8"
                    }`}
                  >
                    {member.seniority}
                  </span>
                  )}
                  <span className="rounded-full bg-paper px-3 py-1 text-xs font-medium text-muted">
                    {member.department}
                  </span>
                  {member.location && (
                    <span className="rounded-full bg-paper px-3 py-1 text-xs font-medium text-muted">
                      {member.location}
                    </span>
                  )}
                </div>

                <h1 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-5xl">
                  {member.name}
                </h1>
                <p className="mt-1 text-lg font-semibold text-accent-cyan/90 bg-navy text-white px-3 py-1 rounded-lg inline-block">
                  {member.role}
                </p>

                {/* Why Client Should Hire This Specialist */}
                <div className="mt-6 rounded-2xl border border-accent-2/30 bg-accent-2/[0.06] p-5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy">
                    <ShieldCheck size={16} className="text-emerald-700" />
                    Why work with {firstName}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-navy/90 font-medium">
                    {member.whyHire}
                  </p>
                </div>

                <p className="mt-6 text-base leading-relaxed text-muted">{member.bio}</p>

                {member.previously && member.previously.length > 0 && (
                  <p className="mt-4 text-sm text-muted">
                    <span className="font-semibold text-navy">Previously at</span>{" "}
                    {member.previously.join(", ")}
                  </p>
                )}

                {/* Quick Facts Grid */}
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 text-xs">
                  {member.experience && (
                    <div className="rounded-xl bg-paper p-3 border border-black/5">
                      <span className="text-muted text-[10px] uppercase font-bold block">Experience</span>
                      <span className="text-sm font-bold text-navy mt-0.5 block">{member.experience}</span>
                    </div>
                  )}
                  <div className="rounded-xl bg-paper p-3 border border-black/5">
                    <span className="text-muted text-[10px] uppercase font-bold block">Delivery Track</span>
                    <span className="text-sm font-bold text-navy mt-0.5 block capitalize">
                      {member.track === "both" ? "AI & Hand-Crafted" : `${member.track} track`}
                    </span>
                  </div>
                  {apps.length > 0 && (
                    <div className="col-span-2 sm:col-span-1 rounded-xl bg-paper p-3 border border-black/5">
                      <span className="text-muted text-[10px] uppercase font-bold block">Published apps</span>
                      <span className="text-sm font-bold text-navy mt-0.5 block">{apps.length} on Google Play</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Rate Card & Direct Hire Box */}
              <div className="rounded-2xl border border-black/10 bg-paper p-6 flex flex-col justify-between">
                <div>
                  {member.hourlyRate ? (
                    <>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-muted block">
                        Transparent Rate Card
                      </span>
                      <div className="mt-3 flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold text-navy font-mono">{member.hourlyRate}</span>
                        <span className="text-xs text-muted">hourly</span>
                      </div>
                      {member.monthlyRate && (
                        <div className="mt-1 text-xs font-semibold text-navy/70">
                          Dedicated: <span className="font-mono font-bold text-navy">{member.monthlyRate}</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-muted block">
                        Work with {firstName}
                      </span>
                      <p className="mt-3 text-sm leading-relaxed text-navy">
                        Tell us what you are building and we will scope it with {firstName} on the pod.
                      </p>
                      <Link href="/pricing" className="mt-2 inline-block text-xs font-semibold text-navy underline">
                        See pricing
                      </Link>
                    </>
                  )}

                  <div className="mt-4 space-y-2 border-t border-black/8 pt-4 text-[11px] text-muted">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 size={13} className="text-emerald-700 shrink-0" />
                      <span>Direct Slack / WhatsApp channel</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 size={13} className="text-emerald-700 shrink-0" />
                      <span>Daily standup participation</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 size={13} className="text-emerald-700 shrink-0" />
                      <span>100% IP ownership on code written</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-black/8">
                  <Button
                    href={hireHref(member)}
                    className="w-full justify-center text-xs font-bold py-3 shadow-md"
                  >
                    Start a project with {firstName}
                    <ArrowUpRight size={14} />
                  </Button>
                  {links.length > 0 && (
                    <ul className="mt-4 space-y-2 border-t border-black/8 pt-4">
                      {links.map(([key, href]) => (
                        <li key={key}>
                          <a
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy hover:underline"
                          >
                            <ExternalLink size={13} aria-hidden />
                            {linkLabels[key] ?? key}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Skills & Tech Stack Section */}
      <Section className="pt-0 sm:pt-0 pb-8 sm:pb-10">
        <Container>
          <Eyebrow>Skillset &amp; Technical Arsenal</Eyebrow>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            Core Competencies &amp; Technologies
          </h2>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {member.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-xl border border-black/8 bg-white px-4 py-2 text-sm font-semibold text-navy shadow-sm transition hover:border-black/20 hover:shadow"
              >
                {skill}
              </span>
            ))}
          </div>
        </Container>
      </Section>

      {/* Apps from other roles. Personal history, not MZA Logics client work. */}
      {apps.length > 0 && (
        <Section className="pt-0 sm:pt-0 pb-8 sm:pb-10">
          <Container>
            <Eyebrow>Published apps</Eyebrow>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              Apps {firstName} has worked on
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              Personal engineering history from {firstName}&rsquo;s other roles. These apps belong to
              their publishers and are not MZA Logics client projects.
            </p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 reveal-kids">
              {apps.map((app) => (
                <li key={app.name}>
                  <SpotlightCard className="flex h-full flex-col justify-between p-6">
                    <div>
                      <h3 className="text-base font-bold leading-snug text-navy">{app.name}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{app.note}</p>
                    </div>
                    {app.url && (
                      <a
                        href={app.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group mt-5 inline-flex items-center gap-1.5 border-t border-black/5 pt-4 text-xs font-bold text-navy hover:text-navy-light"
                      >
                        View on Google Play
                        <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                      </a>
                    )}
                  </SpotlightCard>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {/* Colleagues in Same Department */}
      {colleagues.length > 0 && (
        <Section className="pt-0 sm:pt-0 pb-8 sm:pb-10">
          <Container>
            <Eyebrow>The team</Eyebrow>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              Who else you will work with
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 reveal-kids">
              {colleagues.slice(0, 3).map((colleague) => (
                <TeamCard
                  key={colleague.slug}
                  member={colleague}
                  photo={resolveLocal(`/media/team/${colleague.slug}.jpg`)}
                />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <CtaBand />
    </>
  );
}
