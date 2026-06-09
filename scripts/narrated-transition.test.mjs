import { test } from "node:test";
import assert from "node:assert/strict";

// ---- minimal DOM shim ------------------------------------------------------
class FakeNode {
  constructor() { this.textContent = ""; this._attrs = {}; }
  setAttribute(n, v) { this._attrs[n] = String(v); }
  getAttribute(n) { return this._attrs[n] ?? null; }
}
class FakeShadow {
  constructor() { this.innerHTML = ""; this._q = new Map(); this.childNodes = [{}]; }
  querySelector(sel) {
    if (!this._q.has(sel)) this._q.set(sel, new FakeNode());
    return this._q.get(sel);
  }
  querySelectorAll() { return []; }
}
class El {
  constructor() { this._attrs = {}; this.dataset = {}; this._listeners = {}; this._style = {}; }
  hasAttribute(n) { return n in this._attrs; }
  setAttribute(n, v) { this._attrs[n] = String(v); }
  getAttribute(n) { return this._attrs[n] ?? null; }
  removeAttribute(n) { delete this._attrs[n]; }
  attachShadow() { this._shadow = new FakeShadow(); return this._shadow; }
  get shadowRoot() { return this._shadow; }
  addEventListener(t, h) { (this._listeners[t] ||= []).push(h); }
  dispatchEvent(e) { (this._listeners[e.type] || []).forEach((h) => h(e)); return true; }
  get style() { return this._style; }
  get tagName() { return "PURA-NARRATED-TRANSITION"; }
}
globalThis.HTMLElement = El;
globalThis.CustomEvent = class { constructor(type, init) { this.type = type; this.detail = init?.detail; this.bubbles = init?.bubbles; } };
globalThis.window = globalThis.window || { addEventListener() {}, removeEventListener() {} };
// no document.startViewTransition + reducedMotion path -> viewTransition runs update synchronously
globalThis.document = globalThis.document || {};
const reg = new Map();
globalThis.customElements = { get: (t) => reg.get(t), define: (t, c) => reg.set(t, c) };

const { PuraNarratedTransition, buildNarration, describeNarration } =
  await import("../registry/components/narrated-transition.js");

test("buildNarration diffs two snapshots, tolerant of null", () => {
  const n = buildNarration({ status: "idle", count: 0 }, { status: "done", count: 0 }, "placed");
  assert.equal(n.reason, "placed");
  assert.deepEqual(n.changed, [{ key: "status", from: "idle", to: "done" }]);
  assert.deepEqual(n.from, { status: "idle", count: 0 });

  const empty = buildNarration(null, null, null);
  assert.deepEqual(empty.changed, []);
  assert.equal(empty.reason, null);

  // new + removed keys both count as changes
  const n2 = buildNarration({ a: 1 }, { b: 2 }, null);
  assert.deepEqual(n2.changed.map((c) => c.key).sort(), ["a", "b"]);
});

test("describeNarration prefers reason + keys, then falls back", () => {
  assert.equal(describeNarration({ reason: "placed", changed: [{ key: "status" }] }), "placed (status)");
  assert.equal(describeNarration({ reason: "placed", changed: [] }), "placed");
  assert.equal(describeNarration({ reason: null, changed: [{ key: "x" }, { key: "y" }] }), "Changed x, y");
  assert.equal(describeNarration({ reason: null, changed: [] }), "No change");
});

test("seeds state from the JSON state attribute", () => {
  const el = new PuraNarratedTransition();
  el.setAttribute("state", '{"status":"idle","count":3}');
  el.connectedCallback();
  assert.deepEqual(el.state, { status: "idle", count: 3 });
});

test("transition merges `to`, runs updateFn, emits narration + mirrors data-*", async () => {
  const el = new PuraNarratedTransition();
  el.setAttribute("state", '{"status":"idle","count":0}');
  el.connectedCallback();

  let detail = null;
  el.addEventListener("transitionnarrate", (e) => { detail = e.detail; });

  let ran = false;
  const result = await el.transition(
    { to: { status: "done", count: 1 }, reason: "order placed" },
    () => { ran = true; },
  );

  assert.equal(ran, true, "updateFn ran");
  assert.deepEqual(el.state, { status: "done", count: 1 });
  assert.equal(detail.reason, "order placed");
  assert.deepEqual(
    detail.changed.sort((a, b) => a.key.localeCompare(b.key)),
    [{ key: "count", from: 0, to: 1 }, { key: "status", from: "idle", to: "done" }],
  );
  assert.equal(el.getAttribute("data-pura-narration-reason"), "order placed");
  assert.match(el.getAttribute("data-pura-narration-changed"), /status/);
  // resolved value is the narration
  assert.equal(result.reason, "order placed");
  // live region was written
  assert.match(el.shadowRoot.querySelector(".sr").textContent, /order placed/);
});

test("narrate() updates state + emits without needing a morph", () => {
  const el = new PuraNarratedTransition();
  el.connectedCallback();
  let detail = null;
  el.addEventListener("transitionnarrate", (e) => { detail = e.detail; });
  const n = el.narrate({ open: true }, "user expanded");
  assert.equal(n.reason, "user expanded");
  assert.deepEqual(el.state, { open: true });
  assert.equal(detail.changed[0].key, "open");
});
