import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileSignature,
  LifeBuoy,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { CtaBand } from "@/components/CtaBand";
import { expertise, foundation, leadership, philosophy, values, whyChoose } from "@/content/leadership";
import { site, metrics, whatsappHref } from "@/lib/site";
import { TeamGrid } from "@/components/TeamGrid";
import { team } from "@/content/team";
import { techStack, timeline, trustSignals } from "@/content/tech";
import { Button, ArrowDisc } from "@/components/ui/Button";
import { BookCallButton } from "@/components/conversion/BookCallButton";
import { MediaImg } from "@/components/ui/MediaImg";
import { aboutHero, studioPhotos } from "@/content/visuals";
import { caseStudies } from "@/content/case-studies";
import { Avatar } from "@/components/ui/Avatar";
import { hasPublicFile, teamPhotos } from "@/lib/media";
import { StudioBoard } from "@/components/about/StudioBoard";

export const metadata: Metadata = {
  title: "About: A Software Development Studio in Lahore",
  description:
    "A software development studio in Lahore, building digital products for businesses worldwide since 2021 — mobile apps, web platforms and AI features, with a written scope and your IP.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About MZA Logics | Software Development Studio in Lahore",
    description:
      "A software development studio in Lahore, building digital products for businesses worldwide.",
    url: `${site.url}/about`,
  },
};

const commitments = [
  {
    title: "Senior engineers only",
    body: "The person who scopes your project writes code. No juniors learning on your budget, no salespeople relaying messages.",
  },
  {
    title: "Transparent by default",
    body: "Published rates, a written scope before work starts, and a demo every week. You always know what you are paying for.",
  },
  {
    title: "You own everything",
    body: "Your repository, your cloud accounts, your IP from day one. Walking away from us costs you nothing.",
  },
  {
    title: "Built around your workflow",
    body: "We design around how your business already operates — and say so when an off-the-shelf tool would serve you better.",
  },
] as const;

/** Icons for the procurement answers, in the order they appear in @/content/tech. */
const trustIcons = [FileSignature, ShieldCheck, Lock, LifeBuoy] as const;

export default function AboutPage() {
  // Only REAL studio photographs are used here — never the "SAMPLE IMAGE"
  // stand-ins, which made the page look finished locally and empty live.
  // Until real ones exist the hero shows a board built from shipped work.
  const heroPhoto = hasPublicFile(aboutHero.local) ? aboutHero.local : undefined;
  const studioTiles = studioPhotos
    .slice(1)
    .flatMap((tile) => (hasPublicFile(tile.local) ? [{ ...tile, src: tile.local }] : []));
  // Counted from the published listings, so the number cannot drift.
  const storeApps = caseStudies.filter((study) => study.storeUrl).length;
  const founder = team.find((member) => member.department === "Leadership");

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <Section className="pb-8 sm:pb-10">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <Eyebrow>About</Eyebrow>
              <h1 className="mt-3 text-4xl font-bold leading-[1.08] tracking-tight text-navy sm:text-5xl lg:text-[50px]">
                A software development studio in Lahore, building digital products for businesses worldwide.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
                We build mobile apps, web platforms, and AI features for growing businesses — designed
                around how your company already operates, not forced into a template. You work with the
                engineers directly, and you own everything we make.
              </p>
              <div className="rise-in rise-in-2 mt-8 flex flex-wrap items-center gap-3">
                <BookCallButton className="h-12 pl-5 text-base font-semibold" aria-label="Book a discovery call">
                  Book a discovery call
                  <ArrowDisc />
                </BookCallButton>
                <Link
                  href="/work"
                  className="group inline-flex h-12 items-center gap-2 rounded-full border border-black/10 bg-white px-5 text-base font-semibold text-navy shadow-sm"
                >
                  See the work
                  <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
            {heroPhoto ? (
              <div className="overflow-hidden rounded-[28px] border border-black/8 bg-navy shadow-lg">
                <MediaImg
                  local={heroPhoto}
                  fallback={heroPhoto}
                  alt="MZA Logics studio in DHA Lahore"
                  className="h-64 w-full sm:h-80"
                />
              </div>
            ) : (
              <StudioBoard />
            )}
          </div>
          {studioTiles.length > 0 && (
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {studioTiles.map((tile) => (
                <figure key={tile.title} className="overflow-hidden rounded-2xl border border-black/8 bg-paper">
                  <MediaImg local={tile.src} fallback={tile.src} alt={tile.alt} className="h-28 w-full sm:h-32" />
                  <figcaption className="bg-navy px-3 py-2 text-sm font-semibold text-white">{tile.title}</figcaption>
                </figure>
              ))}
            </div>
          )}

          {/* Numbers as one open band, not four boxes. */}
          <dl className="mt-12 grid grid-cols-2 gap-y-6 rounded-[28px] border border-black/8 bg-white py-6 shadow-sm sm:grid-cols-4 sm:divide-x sm:divide-black/8">
            {[...metrics, { value: String(storeApps), label: "Apps on Google Play" }].map((item) => (
              <div key={item.label} className="flex flex-col-reverse px-6">
                <dt className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted">{item.label}</dt>
                <dd className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* ─── Story ────────────────────────────────────────────────────── */}
      <Section className="pb-8 sm:pb-12">
        <Container className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <Eyebrow>Our story</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">Why we exist</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{foundation}</p>
            <h3 className="mt-10 text-xl font-bold text-navy">How we decide</h3>
            <p className="mt-3 text-base leading-relaxed text-muted">{philosophy}</p>
          </div>
          <aside className="self-start rounded-[28px] border border-black/8 bg-white p-7 shadow-sm sm:p-8">
            <h3 className="text-lg font-bold text-navy">What we build</h3>
            <ul className="mt-5 space-y-3">
              {expertise.map((item) => (
                <li key={item} className="flex gap-3 text-base text-navy">
                  <CheckCircle2 size={18} aria-hidden className="mt-0.5 shrink-0 text-emerald-600" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-black/8 pt-5 text-sm leading-relaxed text-muted">
              We pick the stack that fits your product and your team&apos;s skills — never the other way around.
            </p>
          </aside>
        </Container>
      </Section>

      {/* ─── Commitments ──────────────────────────────────────────────── */}
      {/* Editorial, not a card grid: a heading that holds its column while the
          four terms read as a ruled 2×2 — closer to a contract than a feature
          list, which is the point. */}
      <Section className="section-tint pt-16 pb-16 sm:pt-24 sm:pb-24">
        <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>How we work</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight text-navy sm:text-[42px]">
              Four commitments every project runs on
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
              These are written into every scope we sign — not aspirations, but terms you can hold us to.
            </p>
            <Link
              href="/solutions#how-we-build"
              className="group mt-8 inline-flex items-center gap-2 border-b border-navy/30 pb-1 text-sm font-semibold text-navy transition hover:border-navy"
            >
              See how a project runs, week by week
              <ArrowRight size={15} aria-hidden className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <ol className="grid border-t border-navy/15 sm:grid-cols-2">
            {commitments.map(({ title, body }, index) => (
              <li
                key={title}
                className="group border-b border-navy/15 py-8 sm:px-8 sm:py-10 sm:odd:border-r sm:odd:pl-0 sm:even:pr-0"
              >
                <span className="block text-[44px] font-light leading-none tracking-tight text-navy/20 tabular-nums transition-colors duration-500 group-hover:text-emerald-600">
                  0{index + 1}
                </span>
                <h3 className="mt-6 text-xl font-bold tracking-tight text-navy">{title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted">{body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ─── Promises: the page's one dark moment ─────────────────────── */}
      <Section className="pt-12 pb-8 sm:pt-16 sm:pb-12">
        <Container>
          <div
            className="night-panel overflow-hidden rounded-[32px] px-6 py-10 text-white shadow-[0_30px_80px_rgba(9,6,26,0.25)] sm:px-12 sm:py-14"
            data-nav-surface="dark"
          >
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-2">Why teams choose us</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  The reasons buyers give us when they sign
                </h2>
                <ul className="mt-8 space-y-4">
                  {whyChoose.map((item) => (
                    <li key={item} className="flex gap-3 text-base leading-relaxed text-white/85">
                      <CheckCircle2 size={19} aria-hidden className="mt-0.5 shrink-0 text-accent-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">What you can hold us to</p>
                <ol className="mt-5 divide-y divide-white/10 border-y border-white/10">
                  {values.map((value, index) => (
                    <li key={value.title} className="grid grid-cols-[2.5rem_1fr] gap-x-3 py-5">
                      <span className="text-sm font-bold text-accent-2">0{index + 1}</span>
                      <div>
                        <h3 className="font-bold text-white">{value.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-white/65">{value.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── People ───────────────────────────────────────────────────── */}
      <Section className="pb-8 sm:pb-12">
        <Container>
          <Eyebrow>Leadership</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">Who you talk to first</h2>
          {/* One founder, so one full-width card with the facts from the
              roster rather than a lone card beside an empty column. */}
          <div className="mt-8 space-y-4">
            {leadership.map((person) => (
              <article
                key={person.role}
                className="grid gap-6 rounded-[28px] border border-line bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-[auto_1fr_auto] lg:items-start"
              >
                {founder ? (
                  <Avatar
                    initials={founder.initials}
                    tone={founder.tone}
                    local={teamPhotos([founder.slug])[founder.slug]}
                    alt={founder.name}
                    size="lg"
                  />
                ) : null}
                <div className="min-w-0">
                  <h3 className="text-xl font-bold text-navy">{person.name}</h3>
                  <p className="text-sm font-medium text-muted">{founder?.role ?? person.role}</p>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{person.bio}</p>
                  {founder ? (
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {founder.skills.slice(0, 8).map((skill) => (
                        <span key={skill} className="rounded-full bg-paper px-2.5 py-1 text-xs text-muted">
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
                {founder ? (
                  <dl className="grid grid-cols-2 gap-4 text-sm lg:w-56 lg:grid-cols-1">
                    {founder.experience ? (
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Experience</dt>
                        <dd className="mt-1 font-bold text-navy">{founder.experience}</dd>
                      </div>
                    ) : null}
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Focus</dt>
                      <dd className="mt-1 font-semibold text-navy">{founder.focus}</dd>
                    </div>
                    {founder.links?.linkedin ? (
                      <div>
                        <dt className="sr-only">Profile</dt>
                        <dd>
                          <a
                            href={founder.links.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="font-semibold text-navy underline underline-offset-4 hover:text-emerald-700"
                          >
                            LinkedIn ↗
                          </a>
                        </dd>
                      </div>
                    ) : null}
                  </dl>
                ) : null}
              </article>
            ))}
          </div>

          {site.showTeam && (
            <>
              <div className="mt-14 flex flex-wrap items-end justify-between gap-4">
                <h2 className="text-2xl font-bold text-navy">The team</h2>
                <Link href="/team" className="text-sm font-medium text-navy hover:underline">
                  See the full team →
                </Link>
              </div>
              <div className="mt-6">
                <TeamGrid members={team.slice(0, 6)} photos={teamPhotos(team.map((member) => member.slug))} />
              </div>
            </>
          )}
        </Container>
      </Section>

      {/* ─── Timeline ─────────────────────────────────────────────────── */}
      <Section className="pb-8 sm:pb-12">
        <Container>
          <Eyebrow>Since {site.founded}</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">How we got here</h2>
          {/* Vertical on phones, a left-to-right track from lg up. */}
          <ol className="relative mt-10 grid gap-8 border-l border-line pl-6 lg:grid-cols-5 lg:gap-5 lg:border-l-0 lg:pl-0 reveal-kids">
            <span
              aria-hidden
              className="absolute left-0 right-0 top-[7px] hidden h-px bg-gradient-to-r from-accent-2 via-accent-cyan to-accent-purple lg:block"
            />
            {timeline.map((entry) => (
              <li key={entry.year} className="relative">
                <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-[3px] border-paper bg-accent-2 shadow-[0_0_0_1px_rgba(9,6,26,0.1)] lg:static lg:block" />
                <p className="text-sm font-extrabold tracking-wide text-emerald-700 lg:mt-5">{entry.year}</p>
                <h3 className="mt-1 font-bold text-navy">{entry.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{entry.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ─── Stack ────────────────────────────────────────────────────── */}
      <Section className="pb-8 sm:pb-12">
        <Container>
          {/* The intro sits in the grid's first cell: 1 + 7 groups = two full rows of four. */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 reveal-kids">
            <div className="flex flex-col justify-center p-2 sm:col-span-2 lg:col-span-1">
              <Eyebrow>Stack</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy">Technologies we work in</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                We are technology-agnostic and pick the stack that fits the product — this is what is
                already in the building.
              </p>
            </div>
            {techStack.map((group) => (
              <article key={group.group} className="card-lift rounded-[24px] border border-line bg-white p-6">
                <h3 className="text-sm font-bold text-navy">{group.group}</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span key={item} className="rounded-full bg-paper px-2.5 py-1 text-xs font-medium text-muted">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── Procurement ──────────────────────────────────────────────── */}
      <Section className="pb-8 sm:pb-12">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Working with us</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                What procurement asks, answered
              </h2>
            </div>
            <Button href="/pricing">
              See plans and pricing
              <ArrowDisc />
            </Button>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 reveal-kids">
            {trustSignals.map((item, index) => {
              const Icon = trustIcons[index] ?? ShieldCheck;
              return (
                <article key={item.title} className="card-lift rounded-[24px] border border-line bg-white p-6">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                    <Icon size={19} aria-hidden />
                  </span>
                  <h3 className="mt-4 font-bold text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ─── Studio ───────────────────────────────────────────────────── */}
      <Section className="pb-4 sm:pb-6">
        <Container>
          <Eyebrow>Visit</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">The studio</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 reveal-kids">
            {site.locations.map((location) => (
              <article key={location.label} className="rounded-[24px] border border-line bg-white p-6">
                <h3 className="font-bold text-navy">{location.label}</h3>
                <p className="mt-2 text-base text-muted">{location.address}</p>
                <p className="text-base text-muted">{location.detail}</p>
              </article>
            ))}
            <article className="rounded-[24px] border border-line bg-white p-6">
              <h3 className="font-bold text-navy">Hours &amp; contact</h3>
              <p className="mt-2 text-base text-muted">{site.hours}</p>
              <ul className="mt-3 space-y-1 text-base">
                <li>
                  <a href={`mailto:${site.email}`} className="text-navy hover:text-emerald-700">
                    {site.email}
                  </a>
                </li>
                <li>
                  <a href={whatsappHref()} target="_blank" rel="noreferrer" className="text-navy hover:text-emerald-700">
                    WhatsApp {site.phoneDisplay}
                  </a>
                </li>
              </ul>
            </article>
          </div>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
