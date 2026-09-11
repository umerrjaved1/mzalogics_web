import { Button, ArrowDisc } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function CtaBand({
  title = "Let's build software that fits your business",
  body = "Software built around you — not the other way around. Enterprise experience, startup agility, and personal focus. Reach out to kick off your discovery call.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="py-20">
      <Container className="text-center">
        <h2 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted">{body}</p>
        <div className="mt-8 flex justify-center">
          <Button href="/contact">
            Contact us
            <ArrowDisc />
          </Button>
        </div>
      </Container>
    </section>
  );
}
