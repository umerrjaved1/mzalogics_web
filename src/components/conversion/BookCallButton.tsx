import { Button } from "@/components/ui/Button";
import { bookingHref } from "@/lib/booking";

/**
 * The primary "book a call" control. Always resolves to the one place on the
 * site where a call can actually be booked.
 */
export function BookCallButton({
  children,
  className,
  variant,
  "aria-label": ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "dark";
  "aria-label"?: string;
}) {
  return (
    <Button href={bookingHref} className={className} variant={variant} aria-label={ariaLabel}>
      {children}
    </Button>
  );
}
