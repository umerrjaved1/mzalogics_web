"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="py-24 text-center">
      <p className="text-sm font-semibold text-navy/50">Something went wrong</p>
      <h1 className="mt-3 text-3xl font-bold text-navy">We could not load this page</h1>
      <p className="mt-3 text-muted">Try again, or go back home and start from there.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Button type="button" onClick={reset} className="px-5 py-2.5 pr-5">
          Try again
        </Button>
        <Button href="/" variant="secondary">
          Home
        </Button>
      </div>
    </Container>
  );
}
