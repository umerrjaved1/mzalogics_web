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
  title: "About",
  description: site.description,
};

export default function AboutPage() {
  return (
    <>
      <Section className="pb-8">
        <Container>
          <Eyebrow>Who we are</Eyebrow>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            We build software that drives your business forward
          </h1>
          <p className="mt-4 max-w-2xl text-muted">{site.tagline}</p>
          <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {metrics.map((item) => (
              <div key={item.label} className="rounded-2xl border border-line bg-white p-4">
                <dt className="text-xs text-muted">{item.label}</dt>
                <dd className="mt-1 font-semibold text-navy">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>
      <Section className="pt-0">
        <Container className="max-w-3xl">
          <h2 className="text-2xl font-bold text-navy">Our foundation</h2>
          <p className="mt-3 text-sm leading-7 text-muted">{foundation}</p>
          <h2 className="mt-12 text-2xl font-bold text-navy">Our philosophy</h2>
          <p className="mt-3 text-sm leading-7 text-muted">{philosophy}</p>
          <h2 className="mt-12 text-2xl font-bold text-navy">Our expertise</h2>
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
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy/45">{entry.year}</p>
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
