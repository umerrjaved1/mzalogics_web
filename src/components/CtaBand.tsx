import { Button, ArrowDisc } from "@/components/ui/Button";
import { BookCallButton } from "@/components/conversion/BookCallButton";
import { TrustPoints } from "@/components/conversion/TrustPoints";
import { Container } from "@/components/ui/Container";
import { site, whatsappHref } from "@/lib/site";

export function CtaBand({
  title = "Tell us what you want to build",
  body = "Book a 20-minute call or send a short brief. You get a written scope and a fixed price — we reply within one business day.",
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
          <BookCallButton aria-label="Book a 20-minute discovery call">
            Book a 20-minute call
            <ArrowDisc />
          </BookCallButton>
          <Button href={whatsappHref()} variant="secondary">
            WhatsApp {site.phoneDisplay}
          </Button>
        </div>
        <TrustPoints className="mt-7" />
      </Container>
    </section>
  );
}
