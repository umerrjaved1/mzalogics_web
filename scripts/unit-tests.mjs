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

/* ------------------------------------------------------------------ */
/*  Attachment validation — the route must not trust the browser.      */
/* ------------------------------------------------------------------ */

const { checkUpload, safeFilename, MAX_UPLOAD_BYTES } = await import(
  pathToFileURL(join(root, "src/lib/uploads.ts")).href
);

test("accepts an ordinary PDF brief", () => {
  assert.equal(checkUpload("brief.pdf", 900_000, "application/pdf").ok, true);
});

test("rejects a file over the size limit", () => {
  const result = checkUpload("huge.pdf", MAX_UPLOAD_BYTES + 1, "application/pdf");
  assert.equal(result.ok, false);
  assert.match(result.error, /limit/i);
});

test("rejects an executable however it is labelled", () => {
  assert.equal(checkUpload("payload.exe", 1000, "application/pdf").ok, false);
  assert.equal(checkUpload("payload.sh", 1000, "text/plain").ok, false);
});

test("rejects a mime type that contradicts the extension", () => {
  assert.equal(checkUpload("brief.pdf", 1000, "application/x-msdownload").ok, false);
});

test("tolerates an empty mime type, which some platforms send", () => {
  assert.equal(checkUpload("notes.md", 1000, "").ok, true);
});

test("rejects an empty file", () => {
  assert.equal(checkUpload("empty.pdf", 0, "application/pdf").ok, false);
});

test("safeFilename strips directory traversal and odd characters", () => {
  assert.equal(safeFilename("../../etc/passwd"), "passwd");
  assert.equal(safeFilename("C:\\temp\\brief.pdf"), "brief.pdf");
  assert.equal(safeFilename("re;port<>.pdf"), "re_port_.pdf");
  assert.equal(safeFilename(""), "attachment");
});

test("contact route validates the upload server-side", () => {
  const src = readFileSync(join(root, "src/app/api/contact/route.ts"), "utf8");
  assert.match(src, /checkUpload\(/, "a client-reported type and size cannot be trusted");
  assert.match(src, /safeFilename\(/, "filenames reach an email, so sanitise them");
});

test("estimate capture is an accepted lead kind", () => {
  const src = readFileSync(join(root, "src/lib/forms.ts"), "utf8");
  assert.match(src, /"estimate"/);
});

/* ------------------------------------------------------------------ */
/*  Stat counters must never misreport a number.                       */
/* ------------------------------------------------------------------ */

const { parseStat, formatStat } = await import(
  pathToFileURL(join(root, "src/lib/stat-format.ts")).href
);

test("parses the decorated stats actually used on the site", () => {
  const cases = [
    ["50+", "", 50, "+"],
    ["2 tracks", "", 2, " tracks"],
    ["<24h", "<", 24, "h"],
    ["~35%", "~", 35, "%"],
    ["100%", "", 100, "%"],
    ["12 wks", "", 12, " wks"],
  ];
  for (const [input, prefix, value, suffix] of cases) {
    const parsed = parseStat(input);
    assert.ok(parsed, `${input} should parse`);
    assert.equal(parsed.prefix, prefix, input);
    assert.equal(parsed.value, value, input);
    assert.equal(parsed.suffix, suffix, input);
  }
});

test("a decimal tail survives the count", () => {
  const parsed = parseStat("99.5%");
  assert.equal(parsed.value, 99);
  assert.equal(formatStat(parsed, 99), "99.5%", "must land on the real figure");
});

test("a unicode minus stays a prefix, not a negative to count from", () => {
  const parsed = parseStat("−38%");
  assert.equal(parsed.value, 38);
  assert.equal(formatStat(parsed, 38), "−38%");
});

test("thousands separators are preserved while counting", () => {
  const parsed = parseStat("From $15,400");
  assert.equal(parsed.grouped, true);
  assert.equal(formatStat(parsed, 15400), "From $15,400");
  assert.equal(formatStat(parsed, 1200), "From $1,200");
});

test("a stat with no number renders untouched", () => {
  assert.equal(parseStat("SSO"), null);
  assert.equal(parseStat("Dedicated"), null);
});

test("every stat formats back to its exact source string", () => {
  for (const input of ["50+", "2 tracks", "<24h", "~35%", "100%", "0", "99.5%", "−38%", "From $15,400"]) {
    const parsed = parseStat(input);
    if (!parsed) continue;
    assert.equal(formatStat(parsed, parsed.value), input, `${input} must round-trip`);
  }
});

test("counters keep their real value when never scrolled into view", () => {
  const src = readFileSync(join(root, "src/components/ui/Counter.tsx"), "utf8");
  assert.match(src, /\{value\}/, "the real value is the server-rendered output");
  assert.match(src, /if \(!animatable \|\| !parsed \|\| !inView \|\| !node\) return;/);
});

test("Reveal animates transform only, never opacity", () => {
  const src = readFileSync(join(root, "src/components/ui/Reveal.tsx"), "utf8");
  // Ignore comments: the file explains *why* it avoids opacity.
  const code = src.split(String.fromCharCode(10)).filter((l) => { const t = l.trim(); return t.indexOf("*") !== 0 && t.indexOf("//") !== 0; }).join(String.fromCharCode(10));
  assert.ok(code.indexOf("opacity") === -1, "content hidden by JS is content a client may never see");
});
