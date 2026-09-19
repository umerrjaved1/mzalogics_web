/**
 * The single place the running offer is defined.
 *
 * Before this existed the "45% off … through 31 Dec 2026" claim was hard-coded
 * in 12 files, so letting it lapse meant 44 edits — and forgetting meant the
 * site advertised a dead offer. Now every promo surface reads from here and
 * hides itself once `endsAt` passes.
 *
 * To end the offer early: set `endsAt` to a past date, or `enabled: false`.
 * To run a new one: change the copy and push `endsAt` out.
 */
export const promo = {
  id: "q4-2026",
  enabled: true,
  /** ISO 8601 with offset. Studio time is PKT (UTC+5). */
  endsAt: "2026-12-31T23:59:59+05:00",

  discountLabel: "45% off",
  navLabel: "Q4 · 45% off",
  eyebrow: "Q4 close-the-deal offer",
  title: "45% off studio rates through 31 Dec 2026",
  body: "Same engineers and the same review gates. Book this quarter and lock the reduced starting rate on any plan.",
  endsLabel: "Ends 31 Dec 2026",
  cta: "Lock this rate",
  dockLine: "Q4 deal · 45% off through 31 Dec",
  extras: [
    "Free 30-minute discovery call",
    "Extra 30 days of fixes on Launch and Growth",
    "No lock-in after the first milestone",
  ],
} as const;

/**
 * Whether the offer should be shown.
 *
 * Note: on statically prerendered pages this is evaluated when the page is
 * built, so an expired promo disappears on the next build or ISR revalidation
 * (see `revalidate` in the promo-bearing pages) rather than at the exact
 * second. Client components re-check on load.
 */
export function isPromoActive(now: Date = new Date()): boolean {
  if (!promo.enabled) return false;
  const ends = new Date(promo.endsAt).getTime();
  return Number.isFinite(ends) && now.getTime() <= ends;
}

/**
 * Deal price while the promo runs; the standard rate once it ends.
 * `compareAt` is the undiscounted price, so it becomes the real price after.
 */
export function effectivePrice(price: string, compareAt?: string) {
  if (isPromoActive()) return { price, compareAt, discounted: true as const };
  return { price: compareAt ?? price, compareAt: undefined, discounted: false as const };
}

/** Strips a leading "Q4 deal · " style prefix once the offer has ended. */
export function promoNote(note: string): string {
  if (isPromoActive()) return note;
  return note.replace(/^Q4 deal\s*·\s*/i, "").replace(/^Q4 deal\s*/i, "");
}
