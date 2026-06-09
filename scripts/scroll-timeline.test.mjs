import { test } from "node:test";
import assert from "node:assert/strict";

// ---- minimal DOM shim ------------------------------------------------------
class FakeShadow {
  constructor() { this.innerHTML = ""; this.childNodes = [{}]; this._el = null; }
  querySelector() {
    return (this._el ||= {
      _attrs: {},
      setAttribute(n, v) { this._attrs[n] = String(v); },
      getAttribute(n) { return this._attrs[n] ?? null; },
      removeAttribute(n) { delete this._attrs[n]; },
    });
  }
  querySelectorAll() { return []; }
}
class El {
  constructor() { this._attrs = {}; this.dataset = {}; this._listeners = {}; this._props = {}; this._style = { setProperty: (k, v) => { this._props[k] = v; }, removeProperty: (k) => { delete this._props[k]; } }; this._rect = { top: 0, height: 0 }; }
  hasAttribute(n) { return n in this._attrs; }
  setAttribute(n, v) { this._attrs[n] = String(v); }
  getAttribute(n) { return this._attrs[n] ?? null; }
  removeAttribute(n) { delete this._attrs[n]; }
  attachShadow() { this._shadow = new FakeShadow(); return this._shadow; }
  get shadowRoot() { return this._shadow; }
  $(sel) { return this._shadow.querySelector(sel); }
  addEventListener(t, h) { (this._listeners[t] ||= []).push(h); }
  removeEventListener() {}
  dispatchEvent(e) { (this._listeners[e.type] || []).forEach((h) => h(e)); return true; }
  getBoundingClientRect() { return this._rect; }
  get style() { return this._style; }
  get tagName() { return "PURA-SCROLL-TIMELINE"; }
}
globalThis.HTMLElement = El;
globalThis.CustomEvent = class { constructor(type, init) { this.type = type; this.detail = init?.detail; this.bubbles = init?.bubbles; } };
globalThis.window = { innerHeight: 1000, addEventListener() {}, removeEventListener() {} };
globalThis.document = { documentElement: { clientHeight: 1000 } };
globalThis.requestAnimationFrame = (cb) => cb();
globalThis.cancelAnimationFrame = () => {};
const reg = new Map();
globalThis.customElements = { get: (t) => reg.get(t), define: (t, c) => reg.set(t, c) };

const { PuraScrollTimeline, computeViewProgress, timelineState } =
  await import("../registry/components/scroll-timeline.js");

// ---- pure model ------------------------------------------------------------

test("computeViewProgress spans entry to exit, 0..1", () => {
  const vh = 1000;
  // top at viewport bottom → just entering → 0
  assert.equal(computeViewProgress({ top: 1000, height: 200 }, vh), 0);
  // bottom past the top (top = -height) → fully gone → 1
  assert.equal(computeViewProgress({ top: -200, height: 200 }, vh), 1);
  // centered: top such that (vh - top)/(vh+height) = 0.5
  const half = computeViewProgress({ top: 400, height: 200 }, vh);
  assert.ok(Math.abs(half - 0.5) < 1e-9);
});

test("computeViewProgress clamps and never NaNs", () => {
  assert.equal(computeViewProgress({ top: 5000, height: 100 }, 1000), 0);
  assert.equal(computeViewProgress({ top: -5000, height: 100 }, 1000), 1);
  assert.equal(computeViewProgress({ top: 0, height: 0 }, 0), 0);
});

test("timelineState holds progress and reports paused when engaged", () => {
  assert.deepEqual(timelineState(0.5, false), { progress: 0.5, paused: false, play: "running" });
  assert.deepEqual(timelineState(0.5, true), { progress: 0.5, paused: true, play: "paused" });
  // clamps
  assert.equal(timelineState(9, false).progress, 1);
  assert.equal(timelineState(-9, false).progress, 0);
});

// ---- element behavior ------------------------------------------------------

test("connect drives progress vars and aria from viewport geometry", () => {
  const el = new PuraScrollTimeline();
  el._rect = { top: 400, height: 200 }; // → 0.5 → 50%
  el.connectedCallback();
  assert.equal(el.progress, 50);
  assert.equal(el._props["--pura-timeline-progress"], "0.5");
  assert.equal(el.getAttribute("data-pura-timeline-progress"), "50");
  assert.equal(el._bar.getAttribute("role"), "progressbar");
  assert.equal(el._bar.getAttribute("aria-valuenow"), "50");
});

test("intent freezes progress: scroll while engaged holds the held value", () => {
  const el = new PuraScrollTimeline();
  el._rect = { top: 400, height: 200 }; // 50%
  el.connectedCallback();
  assert.equal(el.progress, 50);

  let intentDetail = null;
  el.addEventListener("intent", (e) => { intentDetail = e.detail; });

  // pointer enters → engaged, frozen
  el.dispatchEvent({ type: "pointerenter" });
  assert.equal(el.engaged, true);
  assert.equal(el.getAttribute("data-pura-intent"), "engaged");
  assert.deepEqual(intentDetail, { engaged: true, progress: 50 });

  // scroll moves the section, but engaged holds 50
  el._rect = { top: 100, height: 200 }; // would be 75%
  el._update(false);
  assert.equal(el.progress, 50, "held while engaged");

  // leave → resumes, recomputes to live 75%
  el.dispatchEvent({ type: "pointerleave" });
  assert.equal(el.engaged, false);
  assert.equal(el.progress, 75, "resumed to live position");
  assert.equal(el.getAttribute("data-pura-intent"), "idle");
});

test("intent mode gates which gesture freezes", () => {
  const el = new PuraScrollTimeline();
  el.setAttribute("intent", "focus");
  el._rect = { top: 400, height: 200 };
  el.connectedCallback();

  // hover ignored in focus mode
  el.dispatchEvent({ type: "pointerenter" });
  assert.equal(el.engaged, false);
  // focus honored
  el.dispatchEvent({ type: "focusin" });
  assert.equal(el.engaged, true);

  // none disables both
  const off = new PuraScrollTimeline();
  off.setAttribute("intent", "none");
  off._rect = { top: 400, height: 200 };
  off.connectedCallback();
  off.dispatchEvent({ type: "pointerenter" });
  off.dispatchEvent({ type: "focusin" });
  assert.equal(off.engaged, false);
});
