import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1240px] px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
  ...rest
}: ComponentPropsWithoutRef<"section">) {
  return (
    <section
      id={id}
      className={cn("pt-12 pb-12 sm:pt-16 sm:pb-16", className)}
      {...rest}
    >
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
      {children}
    </p>
  );
}
