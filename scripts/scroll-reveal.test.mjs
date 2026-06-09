import { test } from "node:test";
import assert from "node:assert/strict";

// ---- minimal DOM shim ------------------------------------------------------
class FakeNode {
  constructor() {
    this.style = { setProperty() {}, removeProperty() {} };
    this._attrs = {};
    this.textContent = "";
  }
  setAttribute(n, v) { this._attrs[n] = String(v); }
  getAttribute(n) { return this._attrs[n] ?? null; }
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
  constructor() {
    this._attrs = {};
    this.dataset = {};
    this.isConnected = true;
    this._props = {};
    this._style = { setProperty: (k, v) => { this._props[k] = v; }, removeProperty: (k) => { delete this._props[k]; } };
  }
  hasAttribute(n) { return n in this._attrs; }
  setAttribute(n, v) { this._attrs[n] = String(v); }
  getAttribute(n) { return this._attrs[n] ?? null; }
  removeAttribute(n) { delete this._attrs[n]; }
  attachShadow() { this._shadow = new FakeShadow(); return this._shadow; }
  get shadowRoot() { return this._shadow; }
  get style() { return this._style; }
  get tagName() { return "PURA-SCROLL-REVEAL"; }
}
globalThis.HTMLElement = El;
globalThis.window = globalThis.window || { addEventListener() {}, removeEventListener() {} };
globalThis.document = globalThis.document || { documentElement: { setAttribute() {} } };
globalThis.CSS = { supports: () => true };
const reg = new Map();
globalThis.customElements = { get: (t) => reg.get(t), define: (t, c) => reg.set(t, c) };

const { PuraScrollReveal, resolveRange } = await import("../registry/components/scroll-reveal.js");
const { scrollRevealTemplate, SCROLL_REVEAL_CSS } = await import("../registry/components/scroll-reveal.template.js");

test("template is pure, deterministic, and uses the native view() timeline", () => {
  const a = scrollRevealTemplate();
  const b = scrollRevealTemplate();
  assert.equal(a.html, b.html);
  assert.match(a.html, /part="content"/);
  assert.ok(a.css.includes("animation-timeline: view()"), "drives the native scroll timeline");
  assert.ok(a.css.includes("@supports (animation-timeline: view())"), "feature-gated so it degrades to visible");
  assert.ok(a.css.includes("prefers-reduced-motion: no-preference"), "respects reduced motion");
  // no IntersectionObserver anywhere: this is the delta vs <pura-reveal>
  assert.ok(!SCROLL_REVEAL_CSS.includes("IntersectionObserver"));
});

test("resolveRange maps presets, passes through raw CSS, defaults to enter", () => {
  assert.equal(resolveRange("enter"), "entry 0% cover 38%");
  assert.equal(resolveRange("cover"), "cover 0% cover 100%");
  assert.equal(resolveRange("early"), "entry 0% entry 100%");
  assert.equal(resolveRange("entry 0% exit 0%"), "entry 0% exit 0%");
  assert.equal(resolveRange(""), "entry 0% cover 38%");
  assert.equal(resolveRange(null), "entry 0% cover 38%");
});

test("invalid animation falls back to fade; distance clamps to a number", () => {
  const el = new PuraScrollReveal();
  el.setAttribute("animation", "bogus");
  el.setAttribute("distance", "-5");
  el.connectedCallback();
  assert.equal(el.animation, "fade");
  assert.equal(el.distance, 28);
});

test("_sync drives CSS vars and mirrors config in data-* attrs", () => {
  const el = new PuraScrollReveal();
  el.setAttribute("animation", "blur");
  el.setAttribute("range", "cover");
  el.setAttribute("distance", "40");
  el.connectedCallback();

  assert.equal(el._props["--pura-sr-anim"], "pura-sr-blur");
  assert.equal(el._props["--pura-sr-distance"], "40px");
  assert.equal(el._props["--pura-sr-range"], "cover 0% cover 100%");

  assert.equal(el.getAttribute("data-pura-reveal-animation"), "blur");
  assert.equal(el.getAttribute("data-pura-reveal-range"), "cover 0% cover 100%");
  assert.equal(el.getAttribute("data-pura-reveal-native"), "true");
});

test("native flag is false when scroll timelines are unsupported", () => {
  const prev = globalThis.CSS.supports;
  globalThis.CSS.supports = () => false;
  const el = new PuraScrollReveal();
  el.connectedCallback();
  assert.equal(el.native, false);
  assert.equal(el.getAttribute("data-pura-reveal-native"), "false");
  globalThis.CSS.supports = prev;
});
