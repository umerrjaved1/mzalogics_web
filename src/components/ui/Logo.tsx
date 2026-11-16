"use client";

import { useId } from "react";
import { brand, MARK_PATHS } from "@/lib/brand";

/**
 * MZA Logics brand mark: two folded ribbons forming an "M", mint teal at the
 * top fading to signal blue at the bottom. Redrawn from the office sign so
 * the website, the office and social profiles carry the same logo.
 *
 * The gradient id comes from useId: a fixed id shared by the header and the
 * footer breaks in some browsers when the first copy sits in a hidden subtree.
 */
export function Mark({ className = "h-8 w-[38px]" }: { className?: string }) {
  const id = `mza-mark-${useId().replace(/:/g, "")}`;

  return (
    <svg viewBox="0 0 100 84" className={className} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={brand.markTop} />
          <stop offset="1" stopColor={brand.markBottom} />
        </linearGradient>
      </defs>
      <g fill="none" stroke={`url(#${id})`} strokeWidth="14" strokeLinejoin="round">
        {MARK_PATHS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </svg>
  );
}

/**
 * Horizontal lockup (variation A): mark, then "MZA Logics" on one line.
 * `invert` switches the wordmark to white for dark grounds (variation B).
 */
export function Logo({
  compact = false,
  invert = false,
  className = "",
}: {
  compact?: boolean;
  invert?: boolean;
  className?: string;
}) {
  // Below 360px (iPhone SE and similar) the full-size lockup pushes the
  // header's menu button off screen, so the logo steps down a size there.
  return (
    <span
      className={`inline-flex items-center gap-1.5 min-[360px]:gap-2.5 ${invert ? "text-white" : "text-navy"} ${className}`}
    >
      <Mark className="h-[22px] w-[26px] min-[360px]:h-8 min-[360px]:w-[38px]" />
      {!compact && (
        <span className="whitespace-nowrap text-[15px] leading-none tracking-[-0.03em] min-[360px]:text-[20px]">
          <span className="font-extrabold">MZA</span> <span className="font-medium">Logics</span>
        </span>
      )}
    </span>
  );
}

/** Same lockup, slightly smaller — for decks and tight rows. */
export function LogoInline({ invert = false }: { invert?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 ${invert ? "text-white" : "text-navy"}`}>
      <Mark className="h-7 w-[33px]" />
      <span className="whitespace-nowrap text-[18px] leading-none tracking-[-0.03em]">
        <span className="font-extrabold">MZA</span> <span className="font-medium">Logics</span>
      </span>
    </span>
  );
}
