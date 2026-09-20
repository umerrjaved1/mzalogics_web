import Link from "next/link";
import { ArrowRight, CheckCircle2, Lock, Sparkles, Zap } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { aiStats } from "@/content/ai";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";

/**
 * Homepage version of the delivery story — roughly one screen.
 *
 * The full toggle, the per-track detail, and the six quality gates live on
 * /solutions#how-we-build. On the homepage a buyer only needs to learn that
 * there are two tracks and that both are reviewed by a human.
 */

const tracks = [
  {
    id: "ai",
    icon: Zap,
    badge: "Fastest to launch",
    title: "AI-driven",
    body: "AI drafts the repetitive work. A senior engineer reviews every line before it merges.",
    points: ["2-3x sprint velocity", "Full IP ownership from day one"],
    accent: true,
  },
  {
    id: "manual",
    icon: Lock,
    badge: "Maximum control",
    title: "Hand-crafted",
    body: "No generated code anywhere in the pipeline. For procurement, licensing, or policy rules that forbid it.",
    points: ["Zero LLM assistance", "Written human-authorship attestation"],
    accent: false,
  },
] as const;

export function AiDeliveryTeaser() {
  return (
    <Section
      className="relative overflow-hidden bg-navy pt-14 pb-14 text-white sm:pt-16 sm:pb-16"
      data-nav-surface="dark"
    >
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-accent-2/10 blur-[150px]"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <Reveal className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-accent-2 backdrop-blur-md">
            <Sparkles size={14} aria-hidden />
            Dual-track delivery
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Two ways to ship. One standard.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">
            Choose speed with senior review, or a fully hand-written track when policy forbids LLMs.
            Either way a named engineer signs off on every merge.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {tracks.map((track, index) => (
            <Reveal
              key={track.id}
              delay={index * 0.08}
              className="rounded-[28px] border border-white/15 bg-white/[0.05] p-6 backdrop-blur-xl transition-colors duration-300 hover:border-white/25 sm:p-7"
            >
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                  track.accent ? "bg-accent-2/20 text-accent-2" : "bg-white/15 text-white"
                }`}
              >
                <track.icon size={13} aria-hidden />
                {track.badge}
              </span>
              <h3 className="mt-4 text-2xl font-bold">{track.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/80">{track.body}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {track.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <CheckCircle2
                      size={16}
                      className={`mt-0.5 shrink-0 ${track.accent ? "text-accent-2" : "text-white"}`}
                      aria-hidden
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-8 lg:grid-cols-4">
          {aiStats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.06}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <Counter
                  value={stat.value}
                  className="block text-3xl font-extrabold tabular-nums text-accent-2"
                />
                <span className="mt-1 block text-sm leading-snug text-white/75">{stat.label}</span>
              </dd>
            </Reveal>
          ))}
        </dl>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Link
            href="/solutions#how-we-build"
            className="inline-flex items-center gap-2 rounded-full bg-accent-2 px-6 py-3 text-sm font-bold text-navy shadow-lg shadow-accent-2/20 transition hover:bg-emerald-300"
          >
            See how we build
            <ArrowRight size={15} aria-hidden />
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Compare both tracks
          </Link>
        </div>
      </Container>
    </Section>
  );
}
