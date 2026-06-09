import { test } from "node:test";
import assert from "node:assert/strict";

// ---- minimal DOM shim ------------------------------------------------------
const rootStyle = {
  _p: {},
  setProperty(k, v) { this._p[k] = String(v); },
  removeProperty(k) { delete this._p[k]; },
  getPropertyValue(k) { return this._p[k] ?? ""; },
};
const rootEl = {
  _attrs: {},
  style: rootStyle,
  setAttribute(n, v) { this._attrs[n] = String(v); },
  getAttribute(n) { return this._attrs[n] ?? null; },
  removeAttribute(n) { delete this._attrs[n]; },
  hasAttribute(n) { return n in this._attrs; },
};
let mqMatches = false;
class El {
  constructor() { this._attrs = {}; this.dataset = {}; this._listeners = {}; this.isConnected = true; this._style = {}; }
  hasAttribute(n) { return n in this._attrs; }
  setAttribute(n, v) { this._attrs[n] = String(v); }
  getAttribute(n) { return this._attrs[n] ?? null; }
  removeAttribute(n) { delete this._attrs[n]; }
  addEventListener(t, h) { (this._listeners[t] ||= []).push(h); }
  dispatchEvent(e) { (this._listeners[e.type] || []).forEach((h) => h(e)); return true; }
  attachShadow() { this._shadow = { innerHTML: "", querySelector: () => null, querySelectorAll: () => [] }; return this._shadow; }
  get shadowRoot() { return this._shadow; }
  get style() { return this._style; }
  get tagName() { return "PURA-MOTION-BUDGET"; }
}
globalThis.HTMLElement = El;
globalThis.CustomEvent = class { constructor(type, init) { this.type = type; this.detail = init?.detail; this.bubbles = init?.bubbles; } };
globalThis.document = { documentElement: rootEl };
globalThis.window = {
  matchMedia: () => ({ matches: mqMatches, addEventListener() {}, removeEventListener() {} }),
  addEventListener() {}, removeEventListener() {},
};
const reg = new Map();
globalThis.customElements = { get: (t) => reg.get(t), define: (t, c) => reg.set(t, c) };

const { PuraMotionBudget, resolveMotion } = await import("../registry/components/motion-budget.js");

test("resolveMotion: mode defaults, off pins 0, scale override, system force-off", () => {
  assert.deepEqual(resolveMotion({ mode: "normal" }), { mode: "normal", motion: 1, override: false });
  assert.deepEqual(resolveMotion({ mode: "calm" }), { mode: "calm", motion: 0.5, override: true });
  assert.deepEqual(resolveMotion({ mode: "off" }), { mode: "off", motion: 0, override: true });
  // bogus mode -> normal
  assert.equal(resolveMotion({ mode: "zoom" }).mode, "normal");
  // explicit scale wins in normal and forces override
  assert.deepEqual(resolveMotion({ mode: "normal", scale: "0.3" }), { mode: "normal", motion: 0.3, override: true });
  // off ignores scale, always 0
  assert.equal(resolveMotion({ mode: "off", scale: "0.9" }).motion, 0);
  // scale clamps
  assert.equal(resolveMotion({ mode: "calm", scale: "5" }).motion, 1);
  // respect-system + reduced -> off
  assert.deepEqual(
    resolveMotion({ mode: "normal", systemReduced: true, respectSystem: true }),
    { mode: "off", motion: 0, override: true },
  );
  // reduced but not respecting -> stays normal
  assert.equal(resolveMotion({ mode: "normal", systemReduced: true, respectSystem: false }).mode, "normal");
});

test("calm/off drive --pura-motion + data-pura-motion on <html>", () => {
  const el = new PuraMotionBudget();
  el.setAttribute("mode", "calm");
  el.connectedCallback();
  assert.equal(rootStyle.getPropertyValue("--pura-motion"), "0.5");
  assert.equal(rootEl.getAttribute("data-pura-motion"), "calm");
  assert.equal(el.effectiveMode, "calm");
  assert.equal(el.motion, 0.5);

  el.setMode("off");
  el.attributeChangedCallback();
  assert.equal(rootStyle.getPropertyValue("--pura-motion"), "0");
  assert.equal(rootEl.getAttribute("data-pura-motion"), "off");
});

test("normal mode steps aside: token released so the system preference wins", () => {
  rootStyle.setProperty("--pura-motion", "0.5");
  rootEl.setAttribute("data-pura-motion", "calm");
  const el = new PuraMotionBudget();
  el.setAttribute("mode", "normal");
  el.connectedCallback();
  assert.equal(rootStyle.getPropertyValue("--pura-motion"), "");
  assert.equal(rootEl.getAttribute("data-pura-motion"), null);
});

test("motionchange fires with the resolved detail", () => {
  const el = new PuraMotionBudget();
  el.setAttribute("mode", "off");
  let detail = null;
  el.addEventListener("motionchange", (e) => { detail = e.detail; });
  el.connectedCallback();
  assert.deepEqual(detail, { mode: "off", motion: 0 });
});

test("disconnect releases the token when the last governor leaves", () => {
  rootStyle._p = {}; rootEl._attrs = {};
  globalThis.window.__puraMotionBudgets?.clear(); // isolate: this is the only governor
  const el = new PuraMotionBudget();
  el.setAttribute("mode", "off");
  el.connectedCallback();
  assert.equal(rootEl.getAttribute("data-pura-motion"), "off");
  el.disconnectedCallback();
  assert.equal(rootStyle.getPropertyValue("--pura-motion"), "");
  assert.equal(rootEl.getAttribute("data-pura-motion"), null);
});

test("respect-system forces off when the system prefers reduced motion", () => {
  rootStyle._p = {}; rootEl._attrs = {};
  mqMatches = true;
  const el = new PuraMotionBudget();
  el.setAttribute("mode", "normal");
  el.setAttribute("respect-system", "");
  el.connectedCallback();
  assert.equal(el.effectiveMode, "off");
  assert.equal(rootStyle.getPropertyValue("--pura-motion"), "0");
  mqMatches = false;
});
