/**
 * Splits a display stat into the parts a counter needs.
 *
 * Stats on this site are not plain numbers — "50+", "<24h", "2 tracks",
 * "~35%", "−38%", "From $15,400". Only the numeric run is animated; whatever
 * sits either side of it is carried through untouched, so a decimal tail like
 * the ".5" in "99.5%" survives and a Unicode minus is never mistaken for a
 * negative to count from.
 */
export type ParsedStat = {
  prefix: string;
  value: number;
  suffix: string;
  /** Whether the source used thousands separators, e.g. "15,400". */
  grouped: boolean;
};

const PATTERN = /^([^\d]*)(\d[\d,]*)([\s\S]*)$/;

/** Returns null when there is no number to animate; render the string as-is. */
export function parseStat(input: string): ParsedStat | null {
  const match = input.match(PATTERN);
  if (!match) return null;
  const digits = match[2];
  const value = Number(digits.replace(/,/g, ""));
  if (!Number.isFinite(value)) return null;
  return { prefix: match[1], value, suffix: match[3], grouped: digits.includes(",") };
}

/** Rebuilds the display string for a given step of the count. */
export function formatStat(parsed: ParsedStat, n: number): string {
  const number = parsed.grouped ? n.toLocaleString("en-US") : String(n);
  return `${parsed.prefix}${number}${parsed.suffix}`;
}
