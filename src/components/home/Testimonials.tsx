import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { testimonials } from "@/content/testimonials";

export function Testimonials() {
  return (
    <Section>
      <Container>
        <Eyebrow>Testimonials</Eyebrow>
        <h2 className="mt-3 text-4xl font-bold tracking-tight text-navy sm:text-5xl">
          What Our Clients Say
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          We take pride in systems that look considered and deliver real results. Don&apos;t just take our word for it.
        </p>
        <div className="hide-scroll mt-12 flex gap-5 overflow-x-auto pb-2">
          {testimonials.map((item) => (
            <figure
              key={item.name}
              className="min-w-[300px] rounded-[28px] border border-black/8 bg-white p-7 sm:min-w-[340px]"
            >
              <blockquote className="text-[15px] leading-7 text-navy">“{item.quote}”</blockquote>
              <figcaption className="mt-8 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-navy text-xs font-bold text-white">
                  {item.name
                    .split(" ")
                    .slice(0, 2)
                    .map((part) => part[0])
                    .join("")}
                </span>
                <span>
                  <p className="text-sm font-semibold text-navy">{item.name}</p>
                  <p className="text-xs text-muted">{item.role}</p>
                </span>
              </figcaption>
              {item.note ? <p className="mt-4 text-[11px] text-muted">{item.note}</p> : null}
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}
