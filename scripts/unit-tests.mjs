import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import test from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

test("accepts a normal work email", () => {
  assert.equal(isValidEmail("umer@mzalogics.com"), true);
});

test("rejects an incomplete email", () => {
  assert.equal(isValidEmail("not-an-email"), false);
});

test("organization schema does not claim fake reviews", () => {
  const src = readFileSync(join(root, "src/lib/jsonld.ts"), "utf8");
  assert.equal(src.includes("aggregateRating"), false);
  assert.equal(src.includes("SearchAction"), false);
});

test("published team size is not the old 25+ claim", () => {
  const src = readFileSync(join(root, "src/lib/site.ts"), "utf8");
  assert.equal(src.includes('teamSize: "25+"'), false);
  assert.match(src, /teamSize: "16"/);
});

/* ------------------------------------------------------------------ */
/*  Promo expiry — the offer must not outlive its own end date.        */
/* ------------------------------------------------------------------ */

const { promo, isPromoActive, effectivePrice, promoNote } = await import(
  pathToFileURL(join(root, "src/content/promo.ts")).href
);

test("promo is active before its end date and dead after", () => {
  const ends = new Date(promo.endsAt);
  const dayBefore = new Date(ends.getTime() - 24 * 60 * 60 * 1000);
  const dayAfter = new Date(ends.getTime() + 24 * 60 * 60 * 1000);

  assert.equal(isPromoActive(dayBefore), true, "should be live the day before");
  assert.equal(isPromoActive(dayAfter), false, "must expire on its own");
});

test("promo endsAt is a real date", () => {
  assert.equal(Number.isFinite(new Date(promo.endsAt).getTime()), true);
});

test("expired promo falls back to the undiscounted rate", () => {
  // effectivePrice reads the live clock, so assert the shape both ways.
  const result = effectivePrice("$2,150", "$3,900");
  if (isPromoActive()) {
    assert.equal(result.price, "$2,150");
    assert.equal(result.compareAt, "$3,900");
    assert.equal(result.discounted, true);
  } else {
    assert.equal(result.price, "$3,900", "standard rate becomes the price");
    assert.equal(result.compareAt, undefined, "nothing left to strike through");
    assert.equal(result.discounted, false);
  }
});

test("effectivePrice never loses a price when compareAt is absent", () => {
  assert.equal(effectivePrice("$990").price, "$990");
});

test("promoNote keeps text intact and only strips the deal prefix", () => {
  const note = promoNote("Q4 deal · dedicated-pod starting point.");
  assert.match(note, /dedicated-pod starting point\./);
  if (!isPromoActive()) assert.equal(note.includes("Q4 deal"), false);
});

test("promo copy is not hard-coded back into the components", () => {
  const files = [
    "src/components/layout/Header.tsx",
    "src/components/conversion/LeadDock.tsx",
    "src/content/pricing.ts",
  ];
  for (const file of files) {
    const src = readFileSync(join(root, file), "utf8");
    assert.equal(
      /45% off/.test(src),
      false,
      `${file} should read the discount from content/promo.ts, not inline it`,
    );
  }
});

/* ------------------------------------------------------------------ */
/*  A lead must never be silently dropped.                             */
/* ------------------------------------------------------------------ */

test("contact route records the lead even when email fails", () => {
  const src = readFileSync(join(root, "src/app/api/contact/route.ts"), "utf8");
  assert.match(src, /logLead\(/, "every lead is written to the log");
  assert.match(src, /forwardToWebhook\(/, "a webhook backup is attempted");
  assert.match(src, /log-only/, "delivery channel is recorded");
});

test("CSP allows the booking calendar to be framed", () => {
  const src = readFileSync(join(root, "next.config.ts"), "utf8");
  assert.match(src, /frame-src/, "without frame-src the scheduler is blocked by default-src");
});
