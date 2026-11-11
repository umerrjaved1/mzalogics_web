import type { Metadata } from "next";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { CtaBand } from "@/components/CtaBand";
import { expertise, foundation, leadership, philosophy, values, whyChoose } from "@/content/leadership";
import { site, metrics } from "@/lib/site";
import { TeamGrid } from "@/components/TeamGrid";
import { team } from "@/content/team";
import { techStack, timeline, trustSignals } from "@/content/tech";
import { Button, ArrowDisc } from "@/components/ui/Button";
import Link from "next/link";
import { MediaImg } from "@/components/ui/MediaImg";
import { aboutHero, studioPhotos } from "@/content/visuals";
import { resolveLocal, teamPhotos } from "@/lib/media";

export const metadata: Metadata = {
  title: "About: A Senior Software Studio in Lahore",
  description:
    "Founded 2021 in Lahore. Senior engineers building mobile apps, web platforms, and AI features for clients worldwide — written scope, your IP.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About MZA Logics | Software Engineering Studio in Lahore",
    description:
      "A small senior team in Lahore, building products since 2021.",
    url: `${site.url}/about`,
  },
};

export default function AboutPage() {
  // Photographs are optional. Without them the hero is text only and the
  // strip is omitted; a visitor never sees an empty frame or a note to us.
  const heroPhoto = resolveLocal(aboutHero.local);
  const studioTiles = studioPhotos
    .slice(1)
    .flatMap((tile) => {
      const src = resolveLocal(tile.local);
      return src ? [{ ...tile, src }] : [];
    });

  return (
    <>
      <Section className="pb-8 sm:pb-8">
        <Container>
          <div className={heroPhoto ? "grid items-center gap-10 lg:grid-cols-2" : "max-w-4xl"}>
            <div>
              <Eyebrow>About</Eyebrow>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:text-6xl">
                A senior software studio in Lahore, shipping worldwide since 2021
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-muted leading-relaxed">
                We build mobile apps, web platforms, and AI features for growing businesses — designed
                around how your company already operates, not forced into a template. You work with the
                engineers directly, and you own everything we make.
              </p>
            </div>
            {heroPhoto && (
              <div className="overflow-hidden rounded-[28px] border border-black/8 bg-navy shadow-lg">
                <MediaImg
                  local={heroPhoto}
                  fallback={heroPhoto}
                  alt="MZA Logics studio in DHA Lahore"
                  className="h-64 w-full sm:h-80"
                />
              </div>
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
          <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 reveal-kids">
            {metrics.map((item) => (
              <div key={item.label} className="rounded-2xl border border-black/8 bg-white p-5 shadow-sm">
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted">{item.label}</dt>
                <dd className="mt-1.5 text-2xl font-extrabold text-navy">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* 4 Core Vision Pillars */}
      <Section className="pt-0 sm:pt-0 pb-8 sm:pb-10">
        <Container>
          <div className="rounded-[28px] border border-black/8 bg-gradient-to-br from-white via-paper to-white p-8 sm:p-12 shadow-sm">
            <Eyebrow>How we work</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold text-navy sm:text-4xl">
              Four commitments every project runs on
            </h2>
            <p className="mt-3 max-w-2xl text-muted">
              These are written into every scope we sign — not aspirations, but terms you can hold us to.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 reveal-kids">
              <div className="rounded-2xl border border-black/8 bg-white p-6 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-widest text-emerald-700">01</div>
                <h3 className="mt-2 font-bold text-navy text-lg">Senior engineers only</h3>
                <p className="mt-2 text-base text-muted leading-relaxed">
                  The person who scopes your project writes code. No juniors learning on your budget, no salespeople relaying messages.
                </p>
              </div>

              <div className="rounded-2xl border border-black/8 bg-white p-6 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-widest text-accent-cyan">02</div>
                <h3 className="mt-2 font-bold text-navy text-lg">Transparent by default</h3>
                <p className="mt-2 text-base text-muted leading-relaxed">
                  Published rates, a written scope before work starts, and a demo every week. You always know what you are paying for.
                </p>
              </div>

              <div className="rounded-2xl border border-black/8 bg-white p-6 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-widest text-accent-purple">03</div>
                <h3 className="mt-2 font-bold text-navy text-lg">You own everything</h3>
                <p className="mt-2 text-base text-muted leading-relaxed">
                  Your repository, your cloud accounts, your IP from day one. Walking away from us costs you nothing.
                </p>
              </div>

              <div className="rounded-2xl border border-black/8 bg-white p-6 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-widest text-emerald-700">04</div>
                <h3 className="mt-2 font-bold text-navy text-lg">Built around your workflow</h3>
                <p className="mt-2 text-base text-muted leading-relaxed">
                  We design around how your business already operates — and say so when an off-the-shelf tool would serve you better.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 pb-8 sm:pb-10">
        <Container className="max-w-3xl">
          <h2 className="text-2xl font-bold text-navy">Why we exist</h2>
          <p className="mt-3 text-sm leading-7 text-muted">{foundation}</p>
          <h2 className="mt-12 text-2xl font-bold text-navy">How we decide</h2>
          <p className="mt-3 text-sm leading-7 text-muted">{philosophy}</p>
          <h2 className="mt-12 text-2xl font-bold text-navy">What we build with</h2>
          <ul className="mt-4 grid gap-2 text-sm text-navy sm:grid-cols-2">
            {expertise.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">
            We pick the stack that fits your product and your team&apos;s skills — never the other way around.
          </p>
        </Container>
      </Section>
      <Section className="pt-0 sm:pt-0 pb-8 sm:pb-10">
        <Container>
          <h2 className="text-2xl font-bold text-navy">What you can hold us to</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 reveal-kids">
            {values.map((value) => (
              <article key={value.title} className="rounded-[28px] border border-line bg-white p-6">
                <h3 className="font-semibold text-navy">{value.title}</h3>
                <p className="mt-2 text-sm text-muted">{value.body}</p>
              </article>
            ))}
          </div>
          <h2 className="mt-14 text-2xl font-bold text-navy">Why teams choose MZA Logics</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            The practical reasons buyers give us when they sign:
          </p>
          <ul className="mt-4 max-w-2xl space-y-2 text-sm text-navy">
            {whyChoose.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
          <h2 className="mt-14 text-2xl font-bold text-navy">Leadership</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 reveal-kids">
            {leadership.map((person) => (
              <article key={person.role} className="rounded-[28px] border border-line p-6">
                <h3 className="font-semibold text-navy">{person.name}</h3>
                <p className="text-sm text-muted">{person.role}</p>
                <p className="mt-3 text-sm text-muted">“{person.bio}”</p>
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
          <h2 className="mt-14 text-2xl font-bold text-navy">How we got here</h2>
          <ol className="mt-6 space-y-4 border-l border-line pl-6">
            {timeline.map((entry) => (
              <li key={entry.year} className="relative">
                <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent-2 ring-4 ring-paper" />
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">{entry.year}</p>
                <h3 className="mt-1 font-semibold text-navy">{entry.title}</h3>
                <p className="mt-1 text-sm leading-7 text-muted">{entry.body}</p>
              </li>
            ))}
          </ol>

          <h2 className="mt-14 text-2xl font-bold text-navy">Technologies we work in</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            We are technology-agnostic and pick the stack that fits the product — this is what is already in
            the building.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 reveal-kids">
            {techStack.map((group) => (
              <article key={group.group} className="rounded-[28px] border border-line bg-white p-6">
                <h3 className="text-sm font-semibold text-navy">{group.group}</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span key={item} className="rounded-full bg-paper px-2.5 py-1 text-xs text-muted">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <h2 className="mt-14 text-2xl font-bold text-navy">Working with us</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 reveal-kids">
            {trustSignals.map((item) => (
              <article key={item.title} className="rounded-[28px] border border-line bg-white p-6">
                <h3 className="font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{item.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-8">
            <Button href="/pricing">
              See plans and pricing
              <ArrowDisc />
            </Button>
          </div>

          <h2 className="mt-14 text-2xl font-bold text-navy">Studio</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 reveal-kids">
            {site.locations.map((location) => (
              <article key={location.label} className="rounded-[28px] border border-line p-6">
                <h3 className="font-semibold text-navy">{location.label}</h3>
                <p className="mt-2 text-base text-muted">{location.address}</p>
                <p className="text-base text-muted">{location.detail}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
