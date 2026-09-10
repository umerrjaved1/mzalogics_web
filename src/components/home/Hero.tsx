import { Button, ArrowDisc } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Mark } from "@/components/ui/Logo";
import { site } from "@/lib/site";

const avatars = ["AM", "SK", "RL", "JT"];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 lg:pt-10">
      <Container className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative z-10 pb-10">
          <p className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white/80 py-1 pl-1 pr-3 text-[13px] font-medium text-navy shadow-sm">
            <span className="flex -space-x-2">
              {avatars.map((initials) => (
                <span
                  key={initials}
                  className="grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-navy text-[9px] font-bold text-white"
                >
                  {initials}
                </span>
              ))}
            </span>
            Trusted by 50+ customers across the globe
          </p>
          <h1 className="mt-7 max-w-xl text-[42px] font-bold leading-[1.05] tracking-[-0.04em] text-navy sm:text-6xl lg:text-[72px]">
            Apps That{" "}
            <span className="inline-flex translate-y-1 items-center align-middle">
              <Mark className="h-10 w-10 sm:h-12 sm:w-12" />
            </span>{" "}
            Drive the Future
          </h1>
          <p className="mt-5 max-w-lg text-lg text-muted">{site.description}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/contact">
              Contact us
              <ArrowDisc />
            </Button>
            <Button href="/solutions" variant="secondary" className="pr-1.5">
              Explore all services
              <span className="grid h-8 w-8 place-items-center rounded-full border border-black/10">
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              </span>
            </Button>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[520px] lg:max-w-none">
          <Mascot />
        </div>
      </Container>
    </section>
  );
}

function Mascot() {
  return (
    <svg viewBox="0 0 560 620" className="h-auto w-full drop-shadow-sm" role="img" aria-label="MZA Logics character">
      <ellipse cx="280" cy="560" rx="150" ry="18" fill="#0E0926" opacity="0.08" />
      <g transform="translate(110 40)">
        <rect x="70" y="70" width="220" height="280" rx="110" fill="#F4F5F7" stroke="#0E0926" strokeWidth="8" />
        <rect x="88" y="108" width="184" height="150" rx="80" fill="#0E0926" />
        <circle cx="148" cy="172" r="28" fill="#5EEAD4" />
        <circle cx="212" cy="172" r="28" fill="#5EEAD4" />
        <circle cx="156" cy="164" r="8" fill="#0E0926" />
        <circle cx="220" cy="164" r="8" fill="#0E0926" />
        <path d="M148 214c16 16 48 16 64 0" stroke="#5EEAD4" strokeWidth="6" fill="none" strokeLinecap="round" />
        <circle cx="180" cy="268" r="18" fill="#0E0926" />
        <path d="M172 268h16v38h-16z" fill="#0E0926" />
        <path d="M156 300h48c6 0 10 8 6 12H152c-4-4 0-12 4-12z" fill="#0E0926" />
        <rect x="118" y="318" width="124" height="22" rx="8" fill="#0E0926" />
        <circle cx="180" cy="268" r="10" fill="#5EEAD4" />
        <ellipse cx="40" cy="210" rx="28" ry="46" fill="#F4F5F7" stroke="#0E0926" strokeWidth="8" />
        <ellipse cx="320" cy="210" rx="28" ry="46" fill="#F4F5F7" stroke="#0E0926" strokeWidth="8" />
        <path d="M40 210c-40 8-62 70-28 118" stroke="#0E0926" strokeWidth="8" fill="none" strokeLinecap="round" />
        <circle cx="18" cy="338" r="18" fill="#F4F5F7" stroke="#0E0926" strokeWidth="8" />
      </g>
    </svg>
  );
}
