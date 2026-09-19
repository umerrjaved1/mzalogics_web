import { Button, ArrowDisc } from "@/components/ui/Button";
import { BookCallButton } from "@/components/conversion/BookCallButton";
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
          <BookCallButton aria-label="Book a discovery call">
            Book a discovery call
            <ArrowDisc />
          </BookCallButton>
          <Button href={whatsappHref()} variant="secondary">
            WhatsApp {site.phoneDisplay}
          </Button>
        </div>
      </Container>
    </section>
  );
}
