import { test } from "node:test";
import assert from "node:assert/strict";

// ---- minimal DOM shim so the component class can run under node --test ------
class FakeNode {
  constructor() {
    this.style = {};
    this._attrs = {};
    this.textContent = "";
    this.classList = { add() {}, remove() {}, toggle() {} };
  }
  setAttribute(n, v) { this._attrs[n] = String(v); }
  getAttribute(n) { return this._attrs[n] ?? null; }
  removeAttribute(n) { delete this._attrs[n]; }
}
class FakeShadow {
  constructor() { this.innerHTML = ""; this._q = new Map(); }
  querySelector(sel) {
    if (!this._q.has(sel)) this._q.set(sel, new FakeNode());
    return this._q.get(sel);
  }
  querySelectorAll() { return []; }
}
class El {
  constructor() { this._attrs = {}; this.dataset = {}; this._listeners = {}; this._style = { setProperty() {}, removeProperty() {} }; }
  hasAttribute(n) { return n in this._attrs; }
  setAttribute(n, v) { this._attrs[n] = String(v); }
  getAttribute(n) { return this._attrs[n] ?? null; }
  removeAttribute(n) { delete this._attrs[n]; }
  attachShadow() { this._shadow = new FakeShadow(); return this._shadow; }
  get shadowRoot() { return this._shadow; }
  addEventListener(t, h) { (this._listeners[t] ||= []).push(h); }
  dispatchEvent(e) { (this._listeners[e.type] || []).forEach((h) => h(e)); return true; }
  get tagName() { return (this._tag || "pura-confidence-meter").toUpperCase(); }
  get style() { return this._style; }
}
globalThis.HTMLElement = El;
globalThis.CustomEvent = class { constructor(type, init) { this.type = type; this.detail = init?.detail; this.bubbles = init?.bubbles; } };
globalThis.window = globalThis.window || { addEventListener() {}, removeEventListener() {} };
globalThis.document = globalThis.document || { documentElement: { setAttribute() {} } };
const reg = new Map();
globalThis.customElements = { get: (t) => reg.get(t), define: (t, c) => reg.set(t, c) };

const mod = await import("../registry/components/confidence-meter.js");
const { PuraConfidenceMeter, resolveValue, levelFor } = mod;
const { confidenceMeterTemplate } = await import("../registry/components/confidence-meter.template.js");

test("template is pure + deterministic and exposes bar parts", () => {
  const a = confidenceMeterTemplate();
  const b = confidenceMeterTemplate();
  assert.equal(a.html, b.html, "no-arg template must be deterministic");
  assert.match(a.html, /part="track"/);
  assert.match(a.html, /part="fill"/);
  assert.match(a.html, /part="shimmer"/);
  assert.ok(a.css.includes("@keyframes"), "ships a keyframe sweep");
  // No Math.random / Date — SSR-safe.
  assert.doesNotMatch(a.css + a.html, /Math\.random|Date\./);
});

test("resolveValue parses, treats >1 as percent, clamps to 0..1", () => {
  const v = (val) => resolveValue({ getAttribute: () => val });
  assert.equal(v("0.5"), 0.5);
  assert.equal(v("0"), 0);
  assert.equal(v("1"), 1);
  assert.equal(v("75"), 0.75);   // percentage form
  assert.equal(v("150"), 1);     // clamped
  assert.equal(v("-3"), 0);      // clamped
  assert.equal(v(null), 0);      // missing -> 0
  assert.equal(v("abc"), 0);     // garbage -> 0
});

test("levelFor buckets into low/medium/high", () => {
  assert.equal(levelFor(0.2), "low");
  assert.equal(levelFor(0.5), "medium");
  assert.equal(levelFor(0.9), "high");
  assert.equal(levelFor(0.34), "medium");
  assert.equal(levelFor(0.67), "high");
});

test("connected meter mirrors ARIA + agent state on the host", () => {
  const el = new PuraConfidenceMeter();
  el._tag = "pura-confidence-meter";
  el.setAttribute("value", "0.9");
  el.connectedCallback();
  assert.equal(el.getAttribute("role"), "meter");
  assert.equal(el.getAttribute("aria-valuemin"), "0");
  assert.equal(el.getAttribute("aria-valuemax"), "1");
  assert.equal(el.getAttribute("aria-valuenow"), "0.9");
  assert.equal(el.getAttribute("data-pura-confidence-level"), "high");
  assert.equal(el.getAttribute("data-pura-confidence-value"), "0.9");
  assert.equal(el.value, 0.9);
  assert.equal(el.level, "high");
});

test("setValue fires confidencechange with value+level+state", () => {
  const el = new PuraConfidenceMeter();
  el._tag = "pura-confidence-meter";
  el.setAttribute("value", "0.2");
  el.setAttribute("state", "verifying");
  el.connectedCallback();

  let got = null;
  el.addEventListener("confidencechange", (e) => { got = e.detail; });
  el.setValue(0.85);

  assert.ok(got, "event fired");
  assert.equal(got.value, 0.85);
  assert.equal(got.level, "high");
  assert.equal(got.state, "verifying");
  assert.equal(el.getAttribute("aria-valuenow"), "0.85");
  assert.equal(el.getAttribute("data-pura-confidence-level"), "high");
});

test("no event when value is unchanged", () => {
  const el = new PuraConfidenceMeter();
  el._tag = "pura-confidence-meter";
  el.setAttribute("value", "0.5");
  el.connectedCallback();
  let fired = 0;
  el.addEventListener("confidencechange", () => { fired++; });
  el.setValue(0.5);
  assert.equal(fired, 0);
});
