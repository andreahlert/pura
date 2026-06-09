import { test } from "node:test";
import assert from "node:assert/strict";
import { scanBlocks, computeRelations } from "./relations.mjs";

const slugs = new Set(["button", "card", "calendar", "date-picker"]);
const titles = new Map([["button", "Button"], ["card", "Card"], ["calendar", "Calendar"], ["date-picker", "Date Picker"]]);
// button is ubiquitous (in all 4); calendar+date-picker co-occur once but are rare.
const blocks = [
  { slug: "a", title: "A", html: "<pura-button></pura-button><pura-card>" },
  { slug: "b", title: "B", html: "<pura-button/><pura-card>" },
  { slug: "c", title: "C", html: "<pura-button> <pura-calendar><pura-date-picker>" },
  { slug: "d", title: "D", html: "<pura-button>" },
];

test("scanBlocks counts presence per component", () => {
  const p = scanBlocks(blocks, slugs);
  assert.equal(p.get("button").size, 4);
  assert.equal(p.get("calendar").size, 1);
  assert.equal(p.get("card").size, 2);
});

test("word-boundary: pura-card does not match pura-card-x", () => {
  const p = scanBlocks([{ slug: "z", title: "Z", html: "<pura-card-x>" }], new Set(["card"]));
  assert.equal(p.get("card").size, 0);
});

test("rare partner outranks ubiquitous partner", () => {
  const { relatedComponents } = computeRelations(blocks, slugs, titles);
  const calRel = relatedComponents.get("calendar").map((r) => r.slug);
  // date-picker (rare, co-occurs) must rank above button (ubiquitous).
  assert.ok(calRel.indexOf("date-picker") < calRel.indexOf("button"), calRel.join(","));
});

test("zero-block component has empty related", () => {
  const sl = new Set([...slugs, "ghost"]);
  const ti = new Map([...titles, ["ghost", "Ghost"]]);
  const { relatedComponents, relatedBlocks } = computeRelations(blocks, sl, ti);
  assert.deepEqual(relatedComponents.get("ghost"), []);
  assert.deepEqual(relatedBlocks.get("ghost"), []);
});
