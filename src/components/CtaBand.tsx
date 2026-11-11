import Link from "next/link";
import { ArrowDisc } from "@/components/ui/Button";
import { TrustPoints } from "@/components/conversion/TrustPoints";
import { Container } from "@/components/ui/Container";
import { bookingHref } from "@/lib/booking";
import { site, whatsappHref } from "@/lib/site";

/**
 * The close on every inner page.
 *
 * A dark panel rather than more text on the page grid: by the time a reader
 * gets here they have scrolled through a full page of light cards, and the
 * ask needs to look like a different kind of thing from the content above it.
 */
export function CtaBand({
  title = "Tell us what you want to build",
  body = "Book a 20-minute call or send a short brief. You get a written scope and a fixed price — we reply within one business day.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="night-panel overflow-hidden rounded-[32px] px-6 py-14 text-center text-white shadow-[0_30px_80px_rgba(9,6,26,0.25)] sm:px-12 sm:py-20">
          <h2 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">{body}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={bookingHref}
              aria-label="Book a 20-minute discovery call"
              className="inline-flex items-center gap-2 rounded-full bg-accent-2 py-1.5 pl-5 pr-1.5 text-[15px] font-semibold text-navy shadow-[0_0_40px_-8px_rgba(0,245,160,0.6)] transition hover:bg-emerald-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Book a 20-minute call
              <ArrowDisc />
            </Link>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-white/20 px-5 py-2.5 text-[15px] font-medium text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              WhatsApp {site.phoneDisplay}
            </a>
          </div>
          <TrustPoints tone="dark" className="mt-8" />
        </div>
      </Container>
    </section>
  );
}
