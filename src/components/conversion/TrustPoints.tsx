import { FileText, ShieldCheck, KeyRound, Clock } from "lucide-react";
import { cn } from "@/lib/cn";

const points = [
  { icon: FileText, label: "Fixed written scope and price" },
  { icon: ShieldCheck, label: "NDA before project details" },
  { icon: KeyRound, label: "You own the code and IP" },
  { icon: Clock, label: "Reply within one business day" },
] as const;

/**
 * The four answers a buyer looks for next to every call to action. Rendered
 * wherever a CTA asks for contact details, so the reassurance sits beside the
 * ask instead of buried in the FAQ.
 */
export function TrustPoints({
  tone = "light",
  className,
}: {
  /** "dark" for navy bands such as CtaBand variants and the deal strip. */
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-semibold",
        tone === "dark" ? "text-white/80" : "text-navy/70",
        className,
      )}
    >
      {points.map(({ icon: Icon, label }) => (
        <li key={label} className="inline-flex items-center gap-1.5">
          <Icon
            size={14}
            aria-hidden
            className={tone === "dark" ? "text-accent-2" : "text-emerald-700"}
          />
          {label}
        </li>
      ))}
    </ul>
  );
}
