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

test("multi-hunk: two separated edits both apply cleanly", () => {
  const base = "1\n2\n3\n4\n5\n6\n7\n";
  const yours = "1\n2-Y\n3\n4\n5\n6\n7\n";
  const theirs = "1\n2\n3\n4\n5\n6-T\n7\n";
  const r = threeWayMerge({ base, yours, theirs });
  assert.equal(r.conflict, false);
  assert.equal(r.result, "1\n2-Y\n3\n4\n5\n6-T\n7\n");
});

test("insertion on one side plus far edit on the other merges cleanly", () => {
  const base = "l1\nl2\nl3\nl4\n";
  const yours = "l1\nl2\nl3\nl4-EDIT\n";
  const theirs = "l1\nNEW\nl2\nl3\nl4\n";
  const r = threeWayMerge({ base, yours, theirs });
  assert.equal(r.conflict, false);
  assert.equal(r.result, "l1\nNEW\nl2\nl3\nl4-EDIT\n");
});

test("files without a trailing newline keep that property (no-op)", () => {
  const s = "a\nb";
  const r = threeWayMerge({ base: s, yours: s, theirs: s });
  assert.equal(r.conflict, false);
  assert.equal(r.result, "a\nb");
});

test("clean merge preserves missing trailing newline", () => {
  const r = threeWayMerge({ base: "a\nb\nc", yours: "a\nb-EDIT\nc", theirs: "a-NEW\nb\nc" });
  assert.equal(r.conflict, false);
  assert.equal(r.result, "a-NEW\nb-EDIT\nc");
});

test("asymmetric overlapping replacement conflicts without losing data", () => {
  const r = threeWayMerge({ base: "a\nb\nc\nd\n", yours: "a\nX\nc\nd\n", theirs: "a\nY\nZ\nd\n" });
  assert.equal(r.conflict, true);
  assert.match(r.result, /X/);
  assert.match(r.result, /Y/);
  assert.match(r.result, /Z/);
  assert.match(r.result, /d/);
});
