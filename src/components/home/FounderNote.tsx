import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { ArrowDisc, Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import type { TeamMember } from "@/content/team";
import { resolveLocal } from "@/lib/media";

/**
 * The person an enquiry lands with, given its own section just before the
 * form. It used to be a small card squeezed into the form's left column,
 * where a 96px face competed with the WhatsApp box and the trust list.
 * Buyers of a small studio are buying the founder's judgement: show him
 * properly, then hand straight over to the form.
 */
export function FounderNote({ founder }: { founder: TeamMember }) {
  const portrait = resolveLocal(`/media/team/${founder.slug}-portrait.jpg`);
  const firstName = founder.name.split(" ")[0];

  const facts = [
    { value: founder.experience ?? "8+ years", label: "Android engineering" },
    { value: "2024", label: "Building AI products on Claude & GPT" },
    { value: "2021", label: "Founded MZA Logics in Lahore" },
  ];

  return (
    <Section id="founder" className="pt-14 pb-6 sm:pt-20 sm:pb-8">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-16">
          <Reveal className="mx-auto w-full max-w-sm lg:max-w-none">
            <figure className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-black/8 shadow-[0_24px_60px_rgba(9,6,26,0.12)]">
              {portrait ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={portrait}
                  alt={`${founder.name}, ${founder.role}`}
                  className="h-full w-full object-cover object-top"
                  loading="lazy"
                />
              ) : (
                <span
                  aria-hidden
                  className={`grid h-full w-full place-items-center text-6xl font-extrabold text-navy ${founder.tone}`}
                >
                  {founder.initials}
                </span>
              )}
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#09061a]/90 via-[#09061a]/50 to-transparent px-6 pb-5 pt-16 text-white">
                <div className="text-lg font-bold">{founder.name}</div>
                <div className="text-sm text-white/80">{founder.role}</div>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.08}>
            <Eyebrow>Who reads your enquiry</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              You talk to the engineer who scopes it — not a salesperson.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              Every enquiry lands with {founder.name}, founder of MZA Logics. {firstName} joins
              the first call and writes your technical scope himself. After that, the engineers
              building your project are the people you hear from every week.
            </p>

            <dl className="mt-8 grid gap-4 border-t border-black/8 pt-6 sm:grid-cols-3">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-2xl font-bold tracking-tight text-navy">{fact.value}</dt>
                  <dd className="mt-1 text-sm leading-snug text-muted">{fact.label}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="#book">
                Write to {firstName}
                <ArrowDisc />
              </Button>
              {founder.links?.linkedin && (
                <Button href={founder.links.linkedin} variant="secondary">
                  LinkedIn profile
                </Button>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
