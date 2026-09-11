import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { industries } from "@/content/industries";

export function Industries() {
  return (
    <Section>
      <Container>
        <Eyebrow>Industries</Eyebrow>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-5xl">
          Where we ship
        </h2>
        <p className="mt-3 max-w-xl text-base text-muted sm:text-lg">
          Production work in clinics, retail, SaaS, and learning products.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry) => (
            <article key={industry.title} className="overflow-hidden rounded-3xl border border-black/8 bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={industry.image}
                alt=""
                className="h-44 w-full object-cover"
              />
              <h3 className="px-4 py-4 text-base font-bold text-navy">{industry.title}</h3>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
