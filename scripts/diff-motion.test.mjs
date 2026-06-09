import { test } from "node:test";
import assert from "node:assert/strict";

// ---- minimal DOM shim ------------------------------------------------------
class FakeShadow {
  constructor() { this.innerHTML = ""; this.childNodes = [{}]; }
  querySelector() { return null; }
  querySelectorAll() { return []; }
}
class Child {
  constructor(key, sig) { this._attrs = key != null ? { "data-key": key } : {}; this.textContent = sig ?? ""; this.id = ""; }
  getAttribute(n) { return this._attrs[n] ?? null; }
  setAttribute(n, v) { this._attrs[n] = String(v); }
  removeAttribute(n) { delete this._attrs[n]; }
}
class El {
  constructor() { this._attrs = {}; this.dataset = {}; this._listeners = {}; this._style = {}; this._children = []; }
  hasAttribute(n) { return n in this._attrs; }
  setAttribute(n, v) { this._attrs[n] = String(v); }
  getAttribute(n) { return this._attrs[n] ?? null; }
  removeAttribute(n) { delete this._attrs[n]; }
  attachShadow() { this._shadow = new FakeShadow(); return this._shadow; }
  get shadowRoot() { return this._shadow; }
  get children() { return this._children; }
  addEventListener(t, h) { (this._listeners[t] ||= []).push(h); }
  dispatchEvent(e) { (this._listeners[e.type] || []).forEach((h) => h(e)); return true; }
  get style() { return this._style; }
  get tagName() { return "PURA-DIFF-MOTION"; }
}
globalThis.HTMLElement = El;
globalThis.CustomEvent = class { constructor(type, init) { this.type = type; this.detail = init?.detail; this.bubbles = init?.bubbles; } };
globalThis.window = globalThis.window || { addEventListener() {}, removeEventListener() {} };
globalThis.document = globalThis.document || {};
// no MutationObserver -> _observe is a no-op; we drive _onMutate manually
const reg = new Map();
globalThis.customElements = { get: (t) => reg.get(t), define: (t, c) => reg.set(t, c) };

const { PuraDiffMotion, diffSnapshots } = await import("../registry/components/diff-motion.js");

test("diffSnapshots classifies add / remove / change / move", () => {
  const prev = [{ key: "a", sig: "A" }, { key: "b", sig: "B" }, { key: "c", sig: "C" }];
  // remove c, add d, change b's sig, and move (a,b -> b,a order among survivors)
  const next = [{ key: "b", sig: "B2" }, { key: "a", sig: "A" }, { key: "d", sig: "D" }];
  const d = diffSnapshots(prev, next);
  assert.deepEqual(d.added, ["d"]);
  assert.deepEqual(d.removed, ["c"]);
  assert.deepEqual(d.changed, ["b"]);
  // survivors order changed: b now before a
  assert.deepEqual(d.moved.sort(), ["a", "b"]);
});

test("diffSnapshots: no change yields empty lists", () => {
  const snap = [{ key: "a", sig: "A" }, { key: "b", sig: "B" }];
  const d = diffSnapshots(snap, snap);
  assert.deepEqual(d, { added: [], removed: [], moved: [], changed: [] });
});

test("snapshot reads data-key + textContent signature from children", () => {
  const el = new PuraDiffMotion();
  el._children = [new Child("a", "Apple"), new Child("b", "Banana")];
  el.connectedCallback();
  assert.deepEqual(el.snapshot(), [{ key: "a", sig: "Apple" }, { key: "b", sig: "Banana" }]);
});

test("_onMutate emits diffmotion + mirrors counts in data-*", () => {
  const el = new PuraDiffMotion();
  el._children = [new Child("a", "Apple"), new Child("b", "Banana")];
  el.connectedCallback();

  let detail = null;
  el.addEventListener("diffmotion", (e) => { detail = e.detail; });

  // mutate: add c, change a
  el._children = [new Child("a", "Apricot"), new Child("b", "Banana"), new Child("c", "Cherry")];
  el._onMutate();

  assert.ok(detail, "event fired");
  assert.deepEqual(detail.added, ["c"]);
  assert.deepEqual(detail.changed, ["a"]);
  assert.equal(el.getAttribute("data-pura-diff-added"), "1");
  assert.equal(el.getAttribute("data-pura-diff-changed"), "1");
  // child stamped with its diff role
  assert.equal(el._children[2].getAttribute("data-pura-diff"), "added");
  assert.equal(el._children[0].getAttribute("data-pura-diff"), "changed");
});

test("_onMutate with no semantic change does not emit", () => {
  const el = new PuraDiffMotion();
  el._children = [new Child("a", "Apple")];
  el.connectedCallback();
  let fired = false;
  el.addEventListener("diffmotion", () => { fired = true; });
  el._onMutate(); // identical snapshot
  assert.equal(fired, false);
});
