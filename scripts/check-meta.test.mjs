import { test } from "node:test";
import assert from "node:assert/strict";
import { findMetaGaps } from "./check-meta.mjs";

test("findMetaGaps flags components without a meta file", () => {
  assert.deepEqual(findMetaGaps(["button", "knob"], ["button"]), { missingMeta: ["knob"], orphanMeta: [] });
});

test("findMetaGaps flags orphan meta files", () => {
  assert.deepEqual(findMetaGaps(["button"], ["button", "ghost"]), { missingMeta: [], orphanMeta: ["ghost"] });
});

test("findMetaGaps clean when 1:1", () => {
  assert.deepEqual(findMetaGaps(["a", "b"], ["a", "b"]), { missingMeta: [], orphanMeta: [] });
});
