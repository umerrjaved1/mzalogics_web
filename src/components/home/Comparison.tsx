import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { comparison, difference } from "@/content/comparison";

export function Comparison() {
  return (
    <Section>
      <Container>
        <Eyebrow>{difference.tag}</Eyebrow>
        <h2 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-navy sm:text-5xl">
          {difference.headline}
        </h2>
        <p className="mt-3 max-w-2xl text-muted">{difference.sub}</p>
        <div className="mt-8">
          <Button href="/about" className="px-5 py-2.5 pr-5">Meet our team</Button>
        </div>
        <div className="mt-12 grid overflow-hidden rounded-[32px] border border-black/8 bg-white lg:grid-cols-2">
          <div className="p-8 sm:p-10">
            <h3 className="text-2xl font-bold text-navy/35">Others</h3>
            <ul className="mt-8 space-y-5 text-[15px] text-muted">
              {comparison.others.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-black/5 text-[11px]">
                    ×
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-navy p-8 text-white sm:p-10">
            <h3 className="text-2xl font-bold">Why choose MZA Logics</h3>
            <ul className="mt-8 space-y-5 text-[15px] text-white/85">
              {comparison.ours.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-2 text-[11px] text-navy">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
