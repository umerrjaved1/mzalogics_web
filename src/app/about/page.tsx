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

export const metadata: Metadata = {
  title: "About Us | Software Engineering Studio & Team in Lahore",
  description:
    "Learn how MZA Logics builds scalable software for 50+ global clients. 25+ software engineers, designers, and delivery leads in DHA Lahore, Pakistan.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About MZA Logics | Software Engineering Studio in Lahore",
    description:
      "25+ engineers, mobile architects, and AI specialists building market-leading products since 2021.",
    url: `${site.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <>
      <Section className="pb-8">
        <Container>
          <Eyebrow>Our Story &amp; Vision</Eyebrow>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-navy sm:text-5xl lg:text-6xl">
            Software Built Around You — <span className="bg-gradient-to-r from-navy to-accent-2 bg-clip-text text-transparent">Not the Other Way Around</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted leading-relaxed">
            Founded in 2021 by senior engineers in Lahore with a shared conviction: growing businesses deserve software made specifically for how they operate, not forced into cookie-cutter templates.
          </p>
          <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
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
      <Section className="pt-0">
        <Container>
          <div className="rounded-[32px] border border-black/8 bg-gradient-to-br from-white via-paper to-white p-8 sm:p-12 shadow-sm">
            <Eyebrow>Our Guiding Pillars</Eyebrow>
            <h2 className="mt-3 text-3xl font-extrabold text-navy sm:text-4xl">
              The Four Foundations of How We Build
            </h2>
            <p className="mt-3 max-w-2xl text-muted">
              Every system architecture, pod sprint, and technical decision is measured against these four principles.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-black/8 bg-white p-6 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-widest text-accent-2">Pillar 01</div>
                <h3 className="mt-2 font-bold text-navy text-lg">Accessibility First</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Enterprise-grade software shouldn&apos;t be a luxury reserved for Fortune 500s. We bridge the gap so ambitious, growing companies can access elite engineering at transparent rates.
                </p>
              </div>

              <div className="rounded-2xl border border-black/8 bg-white p-6 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-widest text-accent-cyan">Pillar 02</div>
                <h3 className="mt-2 font-bold text-navy text-lg">Craftsmanship &amp; Trust</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Founded by senior engineers with 10+ years of battle-tested enterprise experience. No hype, no junior-only blind spots—just clean code, rigorous review gates, and zero compromise.
                </p>
              </div>

              <div className="rounded-2xl border border-black/8 bg-white p-6 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-widest text-accent-purple">Pillar 03</div>
                <h3 className="mt-2 font-bold text-navy text-lg">People-Powered Delivery</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Our deep industry network lets you scale flexibly—from principal architects to mid-level specialists and junior builders, each with clear rate cards and vetted portfolios.
                </p>
              </div>

              <div className="rounded-2xl border border-black/8 bg-white p-6 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-widest text-emerald-700">Pillar 04</div>
                <h3 className="mt-2 font-bold text-navy text-lg">Tailored, Not Templated</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Every business operates uniquely. We reject off-the-shelf one-size-fits-all clones and celebrate software sculpted precisely around your users, workflows, and growth targets.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container className="max-w-3xl">
          <h2 className="text-2xl font-bold text-navy">Our Foundation &amp; Belief</h2>
          <p className="mt-3 text-sm leading-7 text-muted">{foundation}</p>
          <h2 className="mt-12 text-2xl font-bold text-navy">Our Philosophy</h2>
          <p className="mt-3 text-sm leading-7 text-muted">{philosophy}</p>
          <h2 className="mt-12 text-2xl font-bold text-navy">Our Core Expertise</h2>
          <ul className="mt-4 grid gap-2 text-sm text-navy sm:grid-cols-2">
            {expertise.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">
            We are technology-agnostic and pick the right stack that best fits your product needs.
          </p>
        </Container>
      </Section>
      <Section className="pt-0">
        <Container>
          <h2 className="text-2xl font-bold text-navy">Our values</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <article key={value.title} className="rounded-3xl border border-line bg-white p-6">
                <h3 className="font-semibold text-navy">{value.title}</h3>
                <p className="mt-2 text-sm text-muted">{value.body}</p>
              </article>
            ))}
          </div>
          <h2 className="mt-14 text-2xl font-bold text-navy">Why choose MZA Logics?</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            We are not just a software company — we are your technology growth partner.
          </p>
          <ul className="mt-4 max-w-2xl space-y-2 text-sm text-navy">
            {whyChoose.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
          <h2 className="mt-14 text-2xl font-bold text-navy">Leadership</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {leadership.map((person) => (
              <article key={person.role} className="rounded-3xl border border-line p-6">
                <h3 className="font-semibold text-navy">{person.name}</h3>
                <p className="text-sm text-muted">{person.role}</p>
                <p className="mt-3 text-sm text-muted">“{person.bio}”</p>
              </article>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-2xl font-bold text-navy">The team</h2>
            <Link href="/team" className="text-sm font-medium text-navy hover:underline">
              See all {team.length} profiles and their portfolios →
            </Link>
          </div>
          <div className="mt-6">
            <TeamGrid members={team.slice(0, 6)} />
          </div>
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
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {techStack.map((group) => (
              <article key={group.group} className="rounded-3xl border border-line bg-white p-6">
                <h3 className="text-sm font-semibold text-navy">{group.group}</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span key={item} className="rounded-full bg-paper px-2.5 py-1 text-[11px] text-muted">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <h2 className="mt-14 text-2xl font-bold text-navy">Working with us</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {trustSignals.map((item) => (
              <article key={item.title} className="rounded-3xl border border-line bg-white p-6">
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
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {site.locations.map((location) => (
              <article key={location.label} className="rounded-3xl border border-line p-6">
                <h3 className="font-semibold text-navy">{location.label}</h3>
                <p className="mt-2 text-sm text-muted">{location.address}</p>
                <p className="text-sm text-muted">{location.detail}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
