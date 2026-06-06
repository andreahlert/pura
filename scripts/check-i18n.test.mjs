import { test } from "node:test";
import assert from "node:assert/strict";
import { findI18nGaps, LOCALES } from "./check-i18n.mjs";

test("LOCALES is the five supported locales", () => {
  assert.deepEqual(LOCALES, ["en", "pt-BR", "fr", "de", "it"]);
});

test("findI18nGaps flags a key missing a locale", () => {
  const tables = [{ file: "a.js", messages: { "a.x": { en: "X", "pt-BR": "X", fr: "X", de: "X" } } }];
  const gaps = findI18nGaps(tables);
  assert.deepEqual(gaps, [{ file: "a.js", key: "a.x", missing: ["it"] }]);
});

test("findI18nGaps returns [] when complete", () => {
  const full = Object.fromEntries(LOCALES.map((l) => [l, "v"]));
  assert.deepEqual(findI18nGaps([{ file: "a.js", messages: { "a.x": full } }]), []);
});
