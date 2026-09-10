/**
 * MZA Logics brand mark.
 *
 * The mark is an angular "M" drawn as a single folded signal path inside a
 * rounded tile. The left stroke is neutral, the right stroke rises in accent
 * teal — an M that reads as an upward path. The joint between them is the
 * "logic node" the wordmark is named for.
 */
export function Mark({
  className = "h-8 w-8",
  invert = false,
}: {
  className?: string;
  invert?: boolean;
}) {
  const tile = invert ? "#FFFFFF" : "#0E0926";
  const stroke = invert ? "#0E0926" : "#FFFFFF";
  const accent = invert ? "#0FB39B" : "#5EEAD4";

  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <rect x="0" y="0" width="40" height="40" rx="12" fill={tile} />
      <g fill="none" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 29V14.5l10 10" stroke={stroke} />
        <path d="M20 24.5 30 14.5V29" stroke={accent} />
      </g>
      <circle cx="20" cy="24.5" r="2.1" fill={accent} />
    </svg>
  );
}

export function Logo({
  compact = false,
  invert = false,
  className = "",
}: {
  compact?: boolean;
  invert?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 ${invert ? "text-white" : "text-navy"} ${className}`}
    >
      <Mark className="h-9 w-9" invert={invert} />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="text-[19px] font-extrabold tracking-[-0.03em]">MZA</span>
          <span className="mt-[3px] text-[9px] font-semibold uppercase tracking-[0.34em] opacity-60">
            Logics
          </span>
        </span>
      )}
    </span>
  );
}

/** Wordmark on one line — for footers, decks, and wide lockups. */
export function LogoInline({ invert = false }: { invert?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${invert ? "text-white" : "text-navy"}`}>
      <Mark className="h-8 w-8" invert={invert} />
      <span className="text-[18px] font-extrabold tracking-[-0.02em]">
        MZA <span className="font-semibold opacity-55">Logics</span>
      </span>
    </span>
  );
}
