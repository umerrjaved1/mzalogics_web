import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "dark";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  type = "button",
  onClick,
  disabled,
}: ButtonProps) {
  const styles = cn(
    "inline-flex items-center justify-center gap-2 rounded-full text-[15px] font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy",
    variant === "primary" && "bg-navy py-1.5 pl-4 pr-1.5 text-white hover:bg-navy-2",
    variant === "dark" && "bg-navy px-5 py-2.5 text-white hover:bg-navy-2",
    variant === "secondary" && "border border-black/10 bg-transparent px-5 py-2.5 text-navy hover:bg-white",
    variant === "ghost" && "px-4 py-2 text-navy hover:bg-white/60",
    disabled && "pointer-events-none opacity-60",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={styles}>
      {children}
    </button>
  );
}

export function ArrowDisc() {
  return (
    <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-navy">
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
