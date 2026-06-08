import { test } from "node:test";
import assert from "node:assert/strict";

class El {
  constructor() { this._attrs = {}; this.innerHTML = ""; this._shadow = null; }
  hasAttribute(n) { return n in this._attrs; }
  setAttribute(n, v) { this._attrs[n] = String(v); }
  getAttribute(n) { return this._attrs[n] ?? null; }
  attachShadow() { this._shadow = { innerHTML: "" }; return this._shadow; }
  get shadowRoot() { return this._shadow; }
}
globalThis.HTMLElement = El;
globalThis.customElements = { get: () => undefined, define: () => {} };

const { PuraElement } = await import("../registry/base.js");

test("renderLight writes to light DOM, not shadow", () => {
  class Foo extends PuraElement {}
  const el = new Foo();
  el.renderLight(`<button class="pura-foo__btn">x</button>`, ".pura-foo__btn{color:red}");
  assert.match(el.innerHTML, /pura-foo__btn/);
  assert.match(el.innerHTML, /<style/);
});
