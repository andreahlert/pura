import { test } from "node:test";
import assert from "node:assert/strict";

// Minimal DOM shim so base.js's define()/describe() can be unit-tested in Node.
class El {
  constructor() { this._attrs = {}; }
  hasAttribute(n) { return n in this._attrs; }
  setAttribute(n, v) { this._attrs[n] = String(v); }
  getAttribute(n) { return this._attrs[n] ?? null; }
  attachShadow() { return { innerHTML: "" }; }
  get tagName() { return this._tag.toUpperCase(); }
}
globalThis.HTMLElement = El;
const registry = new Map();
globalThis.customElements = { get: (t) => registry.get(t), define: (t, c) => registry.set(t, c) };

const { PuraElement, define } = await import("../registry/base.js");

test("define stores meta and injects role + data-pura on connect", () => {
  let connected = false;
  class Foo extends PuraElement { connectedCallback() { connected = true; } }
  const meta = { name: "foo", role: "button" };
  define("pura-foo", Foo, meta);
  assert.equal(Foo.puraMeta, meta);

  const el = new Foo(); el._tag = "pura-foo";
  el.connectedCallback();
  assert.equal(el.getAttribute("role"), "button");
  assert.equal(el.getAttribute("data-pura"), "foo");
  assert.equal(connected, true);
  assert.equal(el.describe(), meta);
});
