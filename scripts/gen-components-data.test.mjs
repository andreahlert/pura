import { test } from "node:test";
import assert from "node:assert/strict";
import { renderComponentsModule } from "./gen-components-data.mjs";

test("renderComponentsModule emits an auto-generated module", () => {
  const out = renderComponentsModule([{ name: "button", tag: "pura-button", title: "Button",
    category: "Form", summary: "Action.", attributes: [], events: [], slots: ["default"] }]);
  assert.match(out, /AUTO-GENERATED/);
  assert.match(out, /"slug": "button"/);
  assert.match(out, /export const components/);
});
