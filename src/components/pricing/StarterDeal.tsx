import { Check, Tag } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ArrowDisc, Button } from "@/components/ui/Button";
import { firstMilestonePromise, starterSprint } from "@/content/pricing";

/**
 * The entry offer, shown as a deal at the top of /pricing. It used to sit
 * under the plan cards, where most visitors had already decided the plans
 * were too big a step and left before reaching it.
 */
export function StarterDeal() {
  const points = [
    `Written scope and a clickable prototype in ${starterSprint.duration}`,
    `${starterSprint.price} credited in full to your build if you go ahead`,
    firstMilestonePromise,
  ];

  return (
    <section id="starter" className="py-6 sm:py-8">
      <Container>
        <div className="relative overflow-hidden rounded-[28px] border-2 border-emerald-600/30 bg-gradient-to-br from-emerald-50 via-white to-cyan-50 p-6 shadow-[0_20px_50px_rgba(4,120,87,0.12)] sm:p-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-700 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  <Tag size={13} aria-hidden />
                  Starter deal
                </span>
                <span className="text-sm font-semibold text-emerald-800">Not ready to commit to a full build?</span>
              </div>

              <h2 className="mt-4 text-2xl font-bold tracking-tight text-navy sm:text-3xl">
                Start with a {starterSprint.durationLabel} {starterSprint.title.toLowerCase()}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted">{starterSprint.body}</p>

              <ul className="mt-5 space-y-2.5">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm font-medium text-navy">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-700 text-white">
                      <Check size={12} strokeWidth={3} aria-hidden />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex shrink-0 flex-col items-start gap-4 rounded-2xl border border-emerald-700/15 bg-white/80 p-6 lg:min-w-[260px] lg:items-center lg:text-center">
              <div>
                <p className="text-5xl font-extrabold tracking-tight text-navy">{starterSprint.price}</p>
                <p className="mt-1 text-sm font-semibold text-muted">for {starterSprint.duration}</p>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                100% credited to your build
              </span>
              <Button href={starterSprint.href} className="h-12 w-full justify-between pl-6 font-semibold lg:justify-center">
                Book the sprint
                <ArrowDisc />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
