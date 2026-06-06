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

// define() stores meta for agents (puraMeta/describe/data-pura) but must NOT
// stamp `role` on the host: each component authors its own ARIA on the element
// that actually carries the semantics (often an inner shadow node), so a host
// role would duplicate it and break a11y (e.g. role=button over an inner
// <button> trips nested-interactive). The role stays available via describe().
test("define stores meta and tags host with data-pura, never role", () => {
  let connected = false;
  class Foo extends PuraElement { connectedCallback() { connected = true; } }
  const meta = { name: "foo", role: "button" };
  define("pura-foo", Foo, meta);
  assert.equal(Foo.puraMeta, meta);

  const el = new Foo(); el._tag = "pura-foo";
  el.connectedCallback();
  assert.equal(el.getAttribute("role"), null);
  assert.equal(el.getAttribute("data-pura"), "foo");
  assert.equal(connected, true);
  assert.equal(el.describe(), meta);
});
