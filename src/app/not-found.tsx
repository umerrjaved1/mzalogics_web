import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="text-sm font-semibold text-accent">404</p>
      <h1 className="mt-3 text-3xl font-semibold text-navy">Page not found</h1>
      <p className="mt-3 text-muted">That route does not exist yet.</p>
      <Button href="/" className="mt-8">
        Back home
      </Button>
    </Container>
  );
}
