import { test } from "node:test";
import assert from "node:assert/strict";

// ---- minimal DOM shim ------------------------------------------------------
function fakeEl(tag = "div") {
  return {
    tagName: (tag || "div").toUpperCase(),
    _attrs: {},
    className: "",
    innerHTML: "",
    _children: [],
    style: {},
    textContent: "",
    _listeners: {},
    setAttribute(n, v) { this._attrs[n] = String(v); },
    getAttribute(n) { return this._attrs[n] ?? null; },
    removeAttribute(n) { delete this._attrs[n]; },
    get children() { return this._children; },
    appendChild(c) { this._children.push(c); return c; },
    addEventListener(t, h) { (this._listeners[t] ||= []).push(h); },
    removeEventListener() {},
    getBoundingClientRect() { return { left: 0, width: 200 }; },
    setPointerCapture() {},
  };
}

class FakeShadow {
  constructor() { this.innerHTML = ""; this.childNodes = [{}]; this._byClass = {}; }
  querySelector(sel) {
    const key = sel.replace(/^\./, "");
    return (this._byClass[key] ||= fakeEl());
  }
  querySelectorAll() { return []; }
}

class El {
  constructor() { this._attrs = {}; this.dataset = {}; this._listeners = {}; this._props = {}; this._children = []; this._style = { setProperty: (k, v) => { this._props[k] = v; }, removeProperty: (k) => { delete this._props[k]; } }; }
  hasAttribute(n) { return n in this._attrs; }
  setAttribute(n, v) { this._attrs[n] = String(v); }
  getAttribute(n) { return this._attrs[n] ?? null; }
  removeAttribute(n) { delete this._attrs[n]; }
  attachShadow() { this._shadow = new FakeShadow(); return this._shadow; }
  get shadowRoot() { return this._shadow; }
  $(sel) { return this._shadow.querySelector(sel); }
  get children() { return this._children; }
  addEventListener(t, h) { (this._listeners[t] ||= []).push(h); }
  dispatchEvent(e) { (this._listeners[e.type] || []).forEach((h) => h(e)); return true; }
  get style() { return this._style; }
  get tagName() { return "PURA-TIME-SCRUB"; }
}

globalThis.HTMLElement = El;
globalThis.CustomEvent = class { constructor(type, init) { this.type = type; this.detail = init?.detail; this.bubbles = init?.bubbles; } };
globalThis.window = globalThis.window || { addEventListener() {}, removeEventListener() {} };
globalThis.document = globalThis.document || { createElement: (t) => fakeEl(t) };
const reg = new Map();
globalThis.customElements = { get: (t) => reg.get(t), define: (t, c) => reg.set(t, c) };

const { PuraTimeScrub, seekTimeline, indexToPosition } =
  await import("../registry/components/time-scrub.js");

// ---- pure timeline model ---------------------------------------------------

test("seekTimeline degrades safely for 0 or 1 keyframe", () => {
  assert.deepEqual(seekTimeline(0, 0.5), { total: 0, position: 0, index: 0, fraction: 0, snapped: 0 });
  assert.deepEqual(seekTimeline(1, 0.5), { total: 1, position: 0, index: 0, fraction: 0, snapped: 0 });
});

test("seekTimeline maps position to segment, fraction, and snapped index", () => {
  assert.deepEqual(seekTimeline(5, 0), { total: 5, position: 0, index: 0, fraction: 0, snapped: 0 });
  // p=1 → scaled 4 → index clamped to n-2=3, fraction 1, snapped 4
  assert.deepEqual(seekTimeline(5, 1), { total: 5, position: 1, index: 3, fraction: 1, snapped: 4 });
  // p=0.5 → scaled 2 → exact keyframe 2
  assert.deepEqual(seekTimeline(5, 0.5), { total: 5, position: 0.5, index: 2, fraction: 0, snapped: 2 });
  // p=0.6 → scaled 2.4 → between 2 and 3
  const m = seekTimeline(5, 0.6);
  assert.equal(m.index, 2);
  assert.ok(Math.abs(m.fraction - 0.4) < 1e-9);
  assert.equal(m.snapped, 2);
});

test("seekTimeline clamps out-of-range positions", () => {
  assert.equal(seekTimeline(5, 9).position, 1);
  assert.equal(seekTimeline(5, -9).position, 0);
  assert.equal(seekTimeline(5, 9).snapped, 4);
});

test("indexToPosition is the inverse and clamps", () => {
  assert.equal(indexToPosition(0, 5), 0);
  assert.equal(indexToPosition(2, 5), 0.5);
  assert.equal(indexToPosition(4, 5), 1);
  assert.equal(indexToPosition(99, 5), 1);
  assert.equal(indexToPosition(-1, 5), 0);
  assert.equal(indexToPosition(0, 1), 0);
});

// ---- element behavior ------------------------------------------------------

function withSteps(n) {
  const el = new PuraTimeScrub();
  for (let i = 0; i < n; i++) {
    el._children.push({
      _attrs: {},
      textContent: `Step ${i}`,
      setAttribute(k, v) { this._attrs[k] = String(v); },
      getAttribute(k) { return this._attrs[k] ?? null; },
    });
  }
  return el;
}

test("connect publishes total, playhead 0, and stamps step states", () => {
  const el = withSteps(5);
  el._children[0].setAttribute("data-label", "Draft");
  el.connectedCallback();

  assert.equal(el.total, 5);
  assert.equal(el.index, 0);
  assert.equal(el._props["--pura-scrub"], "0");
  assert.equal(el._props["--pura-scrub-total"], "5");
  assert.equal(el.getAttribute("data-pura-scrub-total"), "5");
  assert.equal(el.getAttribute("data-pura-scrub-index"), "0");
  // first child current, rest future
  assert.equal(el._children[0].getAttribute("data-pura-scrub-state"), "current");
  assert.equal(el._children[4].getAttribute("data-pura-scrub-state"), "future");
  // rail aria reflects a 0..total-1 slider
  assert.equal(el._rail.getAttribute("role"), "slider");
  assert.equal(el._rail.getAttribute("aria-valuemax"), "4");
  assert.equal(el._rail.getAttribute("aria-valuenow"), "0");
});

test("seek to end emits scrub with snapped index and label, stamps past/current", () => {
  const el = withSteps(5);
  el._children[4].setAttribute("data-label", "Published");
  el.connectedCallback();

  let detail = null;
  el.addEventListener("scrub", (e) => { detail = e.detail; });
  el.seek(1);

  assert.equal(el.index, 4);
  assert.equal(el._props["--pura-scrub"], "1");
  assert.equal(detail.index, 4);
  assert.equal(detail.total, 5);
  assert.equal(detail.label, "Published");
  assert.equal(el._children[0].getAttribute("data-pura-scrub-state"), "past");
  assert.equal(el._children[4].getAttribute("data-pura-scrub-state"), "current");
  assert.equal(el._rail.getAttribute("aria-valuenow"), "4");
});

test("step and toIndex navigate the snapped index (undo/redo by position)", () => {
  const el = withSteps(5);
  el.connectedCallback();

  el.toIndex(2);
  assert.equal(el.index, 2);
  assert.equal(el._props["--pura-scrub"], "0.5");

  el.step(1);
  assert.equal(el.index, 3);
  el.step(-2);
  assert.equal(el.index, 1);
  // clamps at the ends
  el.step(-99);
  assert.equal(el.index, 0);
  el.step(99);
  assert.equal(el.index, 4);
});
