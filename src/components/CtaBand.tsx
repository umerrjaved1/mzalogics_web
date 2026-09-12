import { Button, ArrowDisc } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site, whatsappHref } from "@/lib/site";

export function CtaBand({
  title = "Let's build software that fits your business",
  body = "Tell us what you need to ship. We reply within one business day.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="py-12 sm:py-16">
      <Container className="text-center">
        <h2 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted">{body}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/contact" aria-label="Contact us">
            Contact us
            <ArrowDisc />
          </Button>
          {site.calendarUrl ? (
            <Button href={site.calendarUrl} variant="secondary">
              Book 20 minutes
            </Button>
          ) : (
            <Button href={whatsappHref()} variant="secondary">
              WhatsApp {site.phoneDisplay}
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
