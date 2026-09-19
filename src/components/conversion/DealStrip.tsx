import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button, ArrowDisc } from "@/components/ui/Button";
import { activeDeal } from "@/content/pricing";
import { isPromoActive } from "@/content/promo";
import { cn } from "@/lib/cn";

export function DealStrip({ className }: { className?: string } = {}) {
  // The whole strip disappears once the offer lapses.
  if (!isPromoActive()) return null;

  return (
    <section className={cn("py-6 sm:py-8", className)}>
      <Container>
        <div className="overflow-hidden rounded-[28px] border border-emerald-700/20 bg-navy px-6 py-7 text-white sm:px-10 sm:py-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-2">{activeDeal.eyebrow}</p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">{activeDeal.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">{activeDeal.body}</p>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/90">
                {activeDeal.extras.map((extra) => (
                  <li key={extra} className="inline-flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="shrink-0 text-accent-2" />
                    {extra}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex shrink-0 flex-col items-start gap-3 lg:items-end">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent-2">{activeDeal.endsLabel}</p>
              <div className="flex flex-wrap gap-2">
                <Button href={activeDeal.href}>
                  {activeDeal.cta}
                  <ArrowDisc />
                </Button>
                <Link
                  href="/pricing"
                  className="inline-flex h-11 items-center rounded-full border border-white/20 px-5 text-sm font-semibold text-white"
                >
                  See the plans
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
