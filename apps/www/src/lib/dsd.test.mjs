import { test } from "node:test";
import assert from "node:assert/strict";
import { ssrButton } from "./dsd.js";

test("ssrButton emits declarative shadow DOM markup", () => {
  const html = ssrButton({ variant: "primary" });
  assert.match(html, /<pura-button variant="primary">/);
  assert.match(html, /shadowrootmode="open"/);
});
