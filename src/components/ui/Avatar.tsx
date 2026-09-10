import { cn } from "@/lib/cn";

/**
 * Initials stand in for photographs until real headshots exist. The tone comes
 * from the member record so a person keeps the same colour across the site.
 */
export function Avatar({
  initials,
  tone,
  className,
  size = "md",
}: {
  initials: string;
  tone: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center rounded-2xl font-extrabold tracking-tight text-navy",
        size === "sm" && "h-11 w-11 text-sm",
        size === "md" && "h-16 w-16 text-xl",
        size === "lg" && "h-24 w-24 rounded-3xl text-3xl",
        tone,
        className,
      )}
    >
      {initials}
    </span>
  );
}
