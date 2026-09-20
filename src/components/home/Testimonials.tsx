import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { testimonials } from "@/content/testimonials";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Client quotes.
 *
 * There used to be filter tabs here — All clients / AI track / Hand-crafted —
 * asking a visitor to sort four anonymous quotes by our internal delivery
 * methodology. Nobody filters testimonials, least of all by something they
 * have not read about yet.
 */
export function Testimonials({
  photos,
}: {
  /** slug → /media path, resolved on the server. Missing = fall back to initials. */
  photos?: Record<string, string | undefined>;
} = {}) {
  const anyAttributed = testimonials.some((item) => item.attributed);

  return (
    <Section id="testimonials" className="pt-10 pb-10 sm:pt-12 sm:pb-12">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>Client stories</Eyebrow>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            People who shipped with us
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            {anyAttributed
              ? "Named where the client agreed to go on the record."
              : "Anonymized notes from confidential engagements."}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 3).map((item, index) => (
            <Reveal
              key={`${item.name}-${item.role}`}
              delay={Math.min(index * 0.06, 0.24)}
              className="h-full"
            >
              <SpotlightCard className="flex h-full flex-col justify-between p-7 sm:p-8">
                <blockquote className="text-base leading-relaxed text-navy">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <Attribution
                  item={item}
                  photo={item.attributed ? photos?.[item.attributed.slug] : undefined}
                />
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/**
 * Anonymous by default. An attributed quote shows the person's real name and
 * company, plus a headshot when one is on disk — never a stock face.
 */
function Attribution({
  item,
  photo,
}: {
  item: (typeof testimonials)[number];
  photo?: string;
}) {
  const attributed = item.attributed;
  const displayName = attributed?.fullName ?? item.name;
  const displayOrg = attributed ? `${item.role} · ${attributed.company}` : item.role;

  return (
    <div className="mt-8 flex items-center gap-3 border-t border-black/5 pt-5">
      {photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo}
          alt={displayName}
          loading="lazy"
          className="h-12 w-12 shrink-0 rounded-full border border-black/10 object-cover object-center"
        />
      ) : (
        <span
          aria-hidden
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-paper text-sm font-bold text-navy"
        >
          {item.initials}
        </span>
      )}
      <div className="min-w-0">
        <div className="truncate text-base font-bold text-navy">{displayName}</div>
        <div className="truncate text-sm text-muted">{displayOrg}</div>
      </div>
      {attributed?.href ? (
        <a
          href={attributed.href}
          target="_blank"
          rel="noreferrer"
          className="ml-auto shrink-0 text-xs font-semibold text-navy underline underline-offset-2"
        >
          Visit
        </a>
      ) : null}
    </div>
  );
}
