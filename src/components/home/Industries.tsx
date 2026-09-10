import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { industries } from "@/content/industries";

export function Industries() {
  return (
    <Section>
      <Container>
        <Eyebrow>Industries</Eyebrow>
        <h2 className="mt-3 text-4xl font-bold tracking-tight text-navy sm:text-5xl">
          Industries we serve
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          Domain fluency matters. We ship into operations that already have an ERP, a security team, and a Monday morning.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {industries.map((industry) => (
            <Reveal key={industry.title}>
              <article className="rounded-3xl border border-line bg-white p-6">
                <h3 className="text-lg font-semibold text-navy">{industry.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{industry.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
