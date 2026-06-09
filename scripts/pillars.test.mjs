import { test } from "node:test";
import assert from "node:assert/strict";
import { PILLARS, pillarOf } from "../apps/www/src/data/pillars.js";

const ALL_CATEGORIES = ["Primitives", "Form", "Display", "Date", "Navigation",
  "Overlay", "Disclosure", "Feedback", "Layout", "Marketing", "Agent", "Utility"];

test("every category maps to exactly one pillar", () => {
  for (const cat of ALL_CATEGORIES) assert.ok(pillarOf(cat), `no pillar for ${cat}`);
  const seen = PILLARS.flatMap((p) => p.categories);
  assert.equal(seen.length, new Set(seen).size, "a category appears in two pillars");
  assert.equal(seen.length, ALL_CATEGORIES.length, "pillars cover all categories");
});
