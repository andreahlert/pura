import { test } from "node:test";
import assert from "node:assert/strict";
import { sha256 } from "../src/hash.mjs";

test("sha256 matches build-registry format", () => {
  assert.match(sha256("hello"), /^sha256-[a-f0-9]{64}$/);
  assert.equal(sha256("hello"), sha256("hello"));
  assert.notEqual(sha256("hello"), sha256("hello!"));
});
