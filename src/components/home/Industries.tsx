import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { industries } from "@/content/industries";
import { MediaImg } from "@/components/ui/MediaImg";
import { resolveLocal } from "@/lib/media";

export function Industries() {
  return (
    <Section className="pt-10 pb-10 sm:pt-12 sm:pb-12">
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
              {resolveLocal(industry.local) ? (
                <MediaImg local={industry.local} fallback={industry.local} alt="" className="h-44 w-full" />
              ) : (
                <div className="grid h-44 place-items-center bg-navy text-sm font-semibold text-white/80">{industry.title}</div>
              )}
              <h3 className="px-4 py-4 text-base font-bold text-navy">{industry.title}</h3>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
