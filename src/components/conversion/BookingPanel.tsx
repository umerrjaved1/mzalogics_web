import { Clock, Mail, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { BOOKING_ANCHOR, bookingEnabled, calendarUrl } from "@/lib/booking";
import { site, whatsappHref } from "@/lib/site";

const CALL_MESSAGE = "Hi MZA Logics — I'd like to book a 20-minute discovery call.";

/**
 * The top of the contact page: pick a slot, or reach a human right now.
 * When no scheduler is configured the calendar is replaced by the direct
 * channels rather than a button that leads nowhere.
 */
export function BookingPanel() {
  return (
    <Section id={BOOKING_ANCHOR} className="scroll-mt-28 pt-8 pb-8 sm:pt-10 sm:pb-10">
      <Container>
        <div className="grid items-start gap-8 lg:grid-cols-[1.25fr_1fr]">
          <div className="overflow-hidden rounded-[32px] border border-black/8 bg-white shadow-[0_16px_50px_rgba(9,6,26,0.04)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/8 px-6 py-5 sm:px-8">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-navy sm:text-2xl">
                  Book a 20-minute discovery call
                </h2>
                <p className="mt-1 text-sm text-muted">
                  Straight to an engineer. No sales deck, no obligation.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800">
                <Clock size={13} aria-hidden />
                20 min
              </span>
            </div>

            {bookingEnabled ? (
              <iframe
                src={calendarUrl}
                title="Book a discovery call with MZA Logics"
                loading="lazy"
                className="h-[680px] w-full border-0"
              />
            ) : (
              <div className="px-6 py-8 sm:px-8">
                <p className="text-base leading-relaxed text-navy">
                  Pick whichever is fastest for you — we answer WhatsApp during studio hours and
                  reply to everything else within one business day.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <DirectChannel
                    href={whatsappHref(CALL_MESSAGE)}
                    external
                    icon={<MessageCircle size={18} />}
                    label="WhatsApp"
                    value={site.phoneDisplay}
                    accent
                  />
                  <DirectChannel
                    href={`tel:${site.phoneHref}`}
                    icon={<Phone size={18} />}
                    label="Call the studio"
                    value={site.phoneDisplay}
                  />
                  <DirectChannel
                    href={`mailto:${site.email}?subject=${encodeURIComponent("Discovery call request")}`}
                    icon={<Mail size={18} />}
                    label="Email"
                    value={site.email}
                  />
                  <DirectChannel
                    href="#book"
                    icon={<ShieldCheck size={18} />}
                    label="Send a brief"
                    value="Use the form below"
                  />
                </div>
                <p className="mt-6 text-xs text-muted">{site.hours}</p>
              </div>
            )}
          </div>

          <aside className="rounded-[32px] border border-black/8 bg-paper p-6 sm:p-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-navy">What happens on the call</h3>
            <ol className="mt-5 space-y-5">
              {[
                {
                  title: "You talk, we listen",
                  body: "Ten minutes on the problem, who uses it, and what breaking looks like.",
                },
                {
                  title: "We react honestly",
                  body: "Rough shape, rough range, and whether AI-accelerated delivery saves you money here.",
                },
                {
                  title: "You get it in writing",
                  body: "A written scope and fixed quote within two business days. No obligation.",
                },
              ].map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-navy text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-navy">{step.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8 space-y-3 border-t border-black/8 pt-6 text-xs text-navy/70">
              <p className="flex items-center gap-2">
                <ShieldCheck size={15} className="shrink-0 text-emerald-700" aria-hidden />
                NDA signed before detailed architecture talk
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck size={15} className="shrink-0 text-emerald-700" aria-hidden />
                You keep full IP from day one
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  );
}

function DirectChannel({
  href,
  icon,
  label,
  value,
  external,
  accent,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  external?: boolean;
  accent?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`flex items-center gap-3 rounded-2xl border p-4 transition ${
        accent
          ? "border-emerald-200 bg-emerald-50/60 hover:bg-emerald-50"
          : "border-black/8 bg-white hover:bg-paper"
      }`}
    >
      <span
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
          accent ? "bg-emerald-700 text-white" : "bg-navy/5 text-navy"
        }`}
        aria-hidden
      >
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-bold text-navy">{label}</span>
        <span className="block truncate text-xs text-muted">{value}</span>
      </span>
    </a>
  );
}
