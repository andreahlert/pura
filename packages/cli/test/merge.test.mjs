import { test } from "node:test";
import assert from "node:assert/strict";
import { threeWayMerge } from "../src/merge.mjs";

test("non-overlapping edits merge cleanly", () => {
  const base = "a\nb\nc\n";
  const yours = "a\nb-EDIT\nc\n";
  const theirs = "a-NEW\nb\nc\n";
  const r = threeWayMerge({ base, yours, theirs });
  assert.equal(r.conflict, false);
  assert.equal(r.result, "a-NEW\nb-EDIT\nc\n");
});

test("overlapping edits produce git-style conflict markers", () => {
  const base = "a\nb\nc\n";
  const yours = "a\nMINE\nc\n";
  const theirs = "a\nTHEIRS\nc\n";
  const r = threeWayMerge({ base, yours, theirs });
  assert.equal(r.conflict, true);
  assert.match(r.result, /<<<<<<< yours/);
  assert.match(r.result, /=======/);
  assert.match(r.result, />>>>>>> upstream/);
});

test("identical local and upstream is a clean no-op", () => {
  const s = "x\ny\n";
  const r = threeWayMerge({ base: s, yours: s, theirs: s });
  assert.equal(r.conflict, false);
  assert.equal(r.result, s);
});
