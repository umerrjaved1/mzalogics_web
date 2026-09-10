import Link from "next/link";
import { Check, Minus, ShieldCheck } from "lucide-react";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { aiCapabilities, aiGuardrails, aiPipeline, aiWhenNot } from "@/content/ai";
import { trackComparison } from "@/content/pricing";
import { team } from "@/content/team";
import { Avatar } from "@/components/ui/Avatar";

/** Deep detail for /solutions/ai-development — the page clients send to their CTO. */
export function AiPractice() {
  const aiTeam = team.filter((member) => member.track === "ai" || member.department === "AI engineering");

  return (
    <>
      <Section className="pt-0">
        <Container>
          <Eyebrow>How we build with AI</Eyebrow>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Six stages, each with a human gate
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {aiPipeline.map((step) => (
              <article key={step.number} className="rounded-[28px] border border-black/8 bg-white p-6">
                <p className="text-sm font-semibold text-navy/35">{step.number}</p>
                <h3 className="mt-6 text-lg font-bold text-navy">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{step.body}</p>
                <p className="mt-5 inline-flex rounded-full bg-paper px-3 py-1 text-[11px] font-medium text-navy/70">
                  Gate: {step.gate}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <Eyebrow>Guardrails</Eyebrow>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            What we commit to in writing
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {aiGuardrails.map((item) => (
              <article key={item.title} className="rounded-[28px] border border-black/8 bg-white p-6">
                <ShieldCheck size={20} className="text-navy" />
                <h3 className="mt-4 font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <Eyebrow>AI in your product</Eyebrow>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Capabilities we build for clients
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {aiCapabilities.map((item) => (
              <article key={item.title} className="rounded-[28px] border border-black/8 bg-white p-6">
                <h3 className="font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{item.body}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-paper px-2.5 py-1 text-[11px] text-muted">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <Eyebrow>With AI or without</Eyebrow>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            The same team, two delivery tracks
          </h2>
          <TrackComparisonTable />
          <div className="mt-6">
            <Link
              href="/pricing"
              className="inline-flex items-center rounded-full bg-navy px-5 py-2.5 text-[15px] font-medium text-white transition hover:bg-navy-2"
            >
              See what each track costs
            </Link>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Eyebrow>When we say no</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              AI is not always the answer
            </h2>
            <p className="mt-4 text-muted">
              We would rather lose the line item than ship a model where plain code belongs. These are the
              cases where we will tell you so on the first call.
            </p>
          </div>
          <ul className="space-y-3 self-center">
            {aiWhenNot.map((item) => (
              <li key={item} className="flex gap-3 rounded-2xl border border-black/8 bg-white p-5 text-sm text-navy">
                <Minus size={16} className="mt-0.5 shrink-0 text-navy/35" />
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {aiTeam.length > 0 ? (
        <Section className="pt-0">
          <Container>
            <Eyebrow>Who you work with</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">The AI practice</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {aiTeam.map((member) => (
                <Link
                  key={member.slug}
                  href={`/team/${member.slug}`}
                  className="flex items-center gap-4 rounded-[28px] border border-black/8 bg-white p-5 transition hover:shadow-[0_12px_40px_rgba(14,9,38,0.06)]"
                >
                  <Avatar initials={member.initials} tone={member.tone} size="sm" />
                  <span>
                    <span className="block font-semibold text-navy">{member.name}</span>
                    <span className="block text-sm text-muted">{member.role}</span>
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}
    </>
  );
}

export function TrackComparisonTable() {
  return (
    <div className="mt-8 overflow-x-auto rounded-[28px] border border-black/8 bg-white">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line">
            <th scope="col" className="px-6 py-4 font-semibold text-navy/45">
              &nbsp;
            </th>
            <th scope="col" className="px-6 py-4 font-bold text-navy">
              <span className="flex items-center gap-2">
                <Check size={15} className="text-accent-2" strokeWidth={3} />
                With AI
              </span>
            </th>
            <th scope="col" className="px-6 py-4 font-bold text-navy">
              Without AI
            </th>
          </tr>
        </thead>
        <tbody>
          {trackComparison.map((row) => (
            <tr key={row.dimension} className="border-b border-line last:border-0">
              <th scope="row" className="px-6 py-4 align-top font-medium text-navy">
                {row.dimension}
              </th>
              <td className="px-6 py-4 align-top text-muted">{row.ai}</td>
              <td className="px-6 py-4 align-top text-muted">{row.manual}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
