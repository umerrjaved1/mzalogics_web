import Link from "next/link";
import { Sparkles, Wrench } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { aiIntro, aiPipeline, aiStats } from "@/content/ai";
import { pricingTracks } from "@/content/pricing";

export function AiDelivery() {
  return (
    <Section className="bg-navy text-white" data-nav-surface="dark">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-accent-2">
              <Sparkles size={13} />
              {aiIntro.eyebrow}
            </p>
            <h2 className="mt-5 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
              {aiIntro.headline}
            </h2>
          </div>
          <p className="text-white/70">{aiIntro.sub}</p>
        </div>

        <dl className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {aiStats.map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <dt className="text-3xl font-extrabold tracking-tight text-accent-2">{stat.value}</dt>
              <dd className="mt-2 text-sm text-white/65">{stat.label}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {aiPipeline.map((step) => (
            <article key={step.number} className="rounded-3xl border border-white/10 p-6">
              <p className="text-sm font-semibold text-white/35">{step.number}</p>
              <h3 className="mt-6 text-lg font-bold">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/65">{step.body}</p>
              <p className="mt-5 inline-flex rounded-full bg-white/8 px-3 py-1 text-[11px] font-medium text-accent-2">
                Gate: {step.gate}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {pricingTracks.map((track) => (
            <div key={track.id} className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
              <p className="flex items-center gap-2 text-sm font-semibold text-accent-2">
                {track.id === "ai" ? <Sparkles size={15} /> : <Wrench size={15} />}
                {track.short}
              </p>
              <h3 className="mt-3 text-xl font-bold">{track.label}</h3>
              <p className="mt-3 text-sm leading-7 text-white/65">{track.blurb}</p>
              <p className="mt-5 text-sm text-white/50">
                From <span className="font-semibold text-white">{track.tiers[0].price}</span> ·{" "}
                {track.tiers[0].timeline}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/solutions/ai-development"
            className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-[15px] font-medium text-navy transition hover:bg-accent-2"
          >
            How our AI practice works
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center rounded-full border border-white/20 px-5 py-2.5 text-[15px] font-medium text-white transition hover:bg-white/10"
          >
            Compare both tracks
          </Link>
        </div>
      </Container>
    </Section>
  );
}
