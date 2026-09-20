import { Container } from "@/components/ui/Container";
import { industries } from "@/content/industries";

/**
 * A quiet line qualifying who we build for.
 *
 * This was a dark auto-scrolling marquee, which put a moving stripe between
 * two light sections and interrupted the page instead of dividing it. The
 * information is worth keeping — a buyer wants to see their own sector — but
 * it is supporting detail, so it reads as one calm row.
 */
export function IndustryStrip() {
  return (
    <section className="border-y border-line bg-paper py-5">
      <Container className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center">
        <span className="text-sm font-semibold text-navy">Industries we ship in:</span>
        {industries.map((industry, index) => (
          <span key={industry.title} className="text-sm text-muted">
            {industry.title}
            {index < industries.length - 1 ? <span className="ml-3 text-line">·</span> : null}
          </span>
        ))}
      </Container>
    </section>
  );
}
