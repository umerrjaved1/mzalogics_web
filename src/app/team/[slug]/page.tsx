import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Star,
  Zap,
  Calendar,
  DollarSign,
  MessageSquare,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { Avatar } from "@/components/ui/Avatar";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { TeamCard } from "@/components/TeamGrid";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { getTeamMember, team } from "@/content/team";
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
  if (!member) return {};
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
  if (!member) notFound();

  const colleagues = team.filter(
    (item) => item.department === member.department && item.slug !== member.slug
  );
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
            <ArrowLeft size={14} /> Back to all engineers
          </Link>

          <div className="overflow-hidden rounded-[32px] border border-black/8 bg-white p-6 shadow-[0_16px_50px_rgba(9,6,26,0.04)] sm:p-10 lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[auto_1fr_320px] lg:items-start">
              {/* Photo & Availability */}
              <div className="flex flex-col items-center sm:items-start">
                <Avatar
                  initials={member.initials}
                  tone={member.tone}
                  image={member.image}
                  alt={member.name}
                  size="xl"
                  showStatus
                  className="shadow-md"
                />
                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-navy">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{member.availability}</span>
                </div>
                <div className="mt-1 flex items-center gap-1 text-xs text-amber-500 font-bold">
                  <Star size={13} fill="currentColor" />
                  <span>{member.rating} / 5.0 Rating</span>
                </div>
              </div>

              {/* Central Details: Name, Role, Bio & Why Hire */}
              <div>
                <div className="flex flex-wrap items-center gap-2">
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
                  <span className="rounded-full bg-paper px-3 py-1 text-xs font-medium text-muted">
                    {member.department}
                  </span>
                  <span className="rounded-full bg-paper px-3 py-1 text-xs font-medium text-muted">
                    {member.location}
                  </span>
                </div>

                <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-navy sm:text-5xl">
                  {member.name}
                </h1>
                <p className="mt-1 text-lg font-semibold text-accent-cyan/90 bg-navy text-white px-3 py-1 rounded-lg inline-block">
                  {member.role}
                </p>

                {/* Why Client Should Hire This Specialist */}
                <div className="mt-6 rounded-2xl border border-accent-2/30 bg-accent-2/[0.06] p-5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy">
                    <ShieldCheck size={16} className="text-emerald-700" />
                    Why Hire {member.name.split(" ")[0]} for Your Pod
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-navy/90 font-medium">
                    {member.whyHire}
                  </p>
                </div>

                <p className="mt-6 text-base leading-relaxed text-muted">{member.bio}</p>

                {/* Quick Facts Grid */}
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 text-xs">
                  <div className="rounded-xl bg-paper p-3 border border-black/5">
                    <span className="text-muted text-[10px] uppercase font-bold block">Experience</span>
                    <span className="text-sm font-bold text-navy mt-0.5 block">{member.experience}</span>
                  </div>
                  <div className="rounded-xl bg-paper p-3 border border-black/5">
                    <span className="text-muted text-[10px] uppercase font-bold block">Delivery Track</span>
                    <span className="text-sm font-bold text-navy mt-0.5 block capitalize">
                      {member.track === "both" ? "AI & Hand-Crafted" : `${member.track} track`}
                    </span>
                  </div>
                  <div className="col-span-2 sm:col-span-1 rounded-xl bg-paper p-3 border border-black/5">
                    <span className="text-muted text-[10px] uppercase font-bold block">Shipped Projects</span>
                    <span className="text-sm font-bold text-navy mt-0.5 block">{member.projects.length} Verified Builds</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Rate Card & Direct Hire Box */}
              <div className="rounded-2xl border border-black/10 bg-paper p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted block">
                    Transparent Rate Card
                  </span>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-navy font-mono">{member.hourlyRate}</span>
                    <span className="text-xs text-muted">hourly</span>
                  </div>
                  <div className="mt-1 text-xs font-semibold text-navy/70">
                    Dedicated: <span className="font-mono font-bold text-navy">{member.monthlyRate}</span>
                  </div>

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
                    href={`/contact?engineer=${member.slug}&seniority=${encodeURIComponent(member.seniority)}`}
                    className="w-full justify-center text-xs font-bold py-3 shadow-md"
                  >
                    Hire {member.name.split(" ")[0]} for Pod
                    <ArrowUpRight size={14} />
                  </Button>
                  <p className="mt-2 text-center text-[10px] text-muted">
                    Zero lock-in &middot; 14-day trial period
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Skills & Tech Stack Section */}
      <Section className="pt-0">
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

      {/* Interactive Portfolio & Shipped Projects */}
      <Section className="pt-0">
        <Container>
          <div className="flex items-center justify-between">
            <div>
              <Eyebrow>Shipped Work</Eyebrow>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-navy sm:text-3xl">
                Recent Projects Shipped by {member.name.split(" ")[0]}
              </h2>
            </div>
            <span className="hidden sm:inline-block text-xs font-semibold text-muted">
              {member.projects.length} Case Studies
            </span>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {member.projects.map((project) => (
              <SpotlightCard key={project.title} className="p-7 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-xs font-semibold text-muted">{project.year}</span>
                    <span className="rounded-full bg-navy/5 px-3 py-1 text-[11px] font-semibold text-navy">
                      {project.role}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-navy leading-snug">{project.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{project.summary}</p>

                  <div className="mt-6 rounded-xl bg-paper p-3.5 border border-black/5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted block">
                      Measured Outcome:
                    </span>
                    <span className="text-sm font-extrabold text-navy mt-0.5 block">
                      {project.metric}
                    </span>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-md bg-white border border-black/5 px-2 py-0.5 text-[10px] font-medium text-navy/80"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {project.caseStudy && (
                  <div className="mt-6 pt-4 border-t border-black/5">
                    <Link
                      href={`/work/${project.caseStudy}`}
                      className="group inline-flex items-center gap-1.5 text-xs font-bold text-navy hover:text-navy-light"
                    >
                      Read full case study write-up
                      <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                )}
              </SpotlightCard>
            ))}
          </div>
        </Container>
      </Section>

      {/* Colleagues in Same Department */}
      {colleagues.length > 0 && (
        <Section className="pt-0">
          <Container>
            <Eyebrow>Related Pod Members</Eyebrow>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              Other Specialists in {member.department}
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {colleagues.slice(0, 3).map((colleague) => (
                <TeamCard key={colleague.slug} member={colleague} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <CtaBand />
    </>
  );
}
