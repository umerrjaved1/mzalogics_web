import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
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
