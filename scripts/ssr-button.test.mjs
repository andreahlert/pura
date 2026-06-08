import { test } from "node:test";
import assert from "node:assert/strict";
import { buttonTemplate } from "../registry/components/button.template.js";
import { renderDSD } from "../registry/base.js";

test("buttonTemplate returns html+css for given attrs", () => {
  const { html, css } = buttonTemplate({ variant: "primary" });
  assert.match(html, /<button/);
  assert.match(css, /:host/);
});

test("renderDSD wraps template in a declarative shadow root", () => {
  const dsd = renderDSD("pura-button", buttonTemplate({}), {});
  assert.match(dsd, /<pura-button[^>]*>/);
  assert.match(dsd, /<template shadowrootmode="open">/);
  assert.match(dsd, /<\/pura-button>/);
});
