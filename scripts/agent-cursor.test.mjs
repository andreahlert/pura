import { test } from "node:test";
import assert from "node:assert/strict";

// ---- minimal DOM shim ------------------------------------------------------
class FakeNode {
  constructor() {
    this.style = { setProperty() {}, removeProperty() {} };
    this._attrs = {};
    this.textContent = "";
    this._cls = new Set();
    this.classList = {
      add: (c) => this._cls.add(c),
      remove: (c) => this._cls.delete(c),
      contains: (c) => this._cls.has(c),
      toggle: (c, f) => (f ?? !this._cls.has(c)) ? this._cls.add(c) : this._cls.delete(c),
    };
  }
  setAttribute(n, v) { this._attrs[n] = String(v); }
  getAttribute(n) { return this._attrs[n] ?? null; }
  removeAttribute(n) { delete this._attrs[n]; }
  hasAttribute(n) { return n in this._attrs; }
  getBoundingClientRect() { return { left: 0, top: 0, width: 10, height: 10 }; }
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
  querySelector() { return null; } // no light-DOM targets in these tests
  getBoundingClientRect() { return { left: 0, top: 0, width: 200, height: 100 }; }
  addEventListener(t, h) { (this._listeners[t] ||= []).push(h); }
  dispatchEvent(e) { (this._listeners[e.type] || []).forEach((h) => h(e)); return true; }
  get tagName() { return (this._tag || "pura-agent-cursor").toUpperCase(); }
  get style() { return this._style; }
}
globalThis.HTMLElement = El;
globalThis.CustomEvent = class { constructor(type, init) { this.type = type; this.detail = init?.detail; this.bubbles = init?.bubbles; } };
globalThis.window = globalThis.window || { addEventListener() {}, removeEventListener() {} };
globalThis.document = globalThis.document || { documentElement: { setAttribute() {} } };
globalThis.requestAnimationFrame = () => 0; // never fires: keeps play() loop-free in tests
globalThis.cancelAnimationFrame = () => {};
const reg = new Map();
globalThis.customElements = { get: (t) => reg.get(t), define: (t, c) => reg.set(t, c) };

const mod = await import("../registry/components/agent-cursor.js");
const { PuraAgentCursor, parseTrace, samplePath } = mod;
const { agentCursorTemplate } = await import("../registry/components/agent-cursor.template.js");

test("template is pure, deterministic, exposes cursor/label/ripple parts", () => {
  const a = agentCursorTemplate();
  const b = agentCursorTemplate();
  assert.equal(a.html, b.html);
  assert.match(a.html, /part="cursor"/);
  assert.match(a.html, /part="ripple"/);
  assert.match(a.html, /part="label"/);
  assert.match(a.html, /aria-hidden="true"/);
  assert.ok(a.css.includes("@keyframes"), "ships the ripple keyframe");
  assert.doesNotMatch(a.css + a.html, /Math\.random|Date\./);
});

test("parseTrace accepts string or object, defaults action, sorts by t", () => {
  const obj = { version: 1, steps: [
    { x: 5, y: 5, t: 200, action: "click" },
    { x: 0, y: 0, t: 0 },
  ] };
  const fromObj = parseTrace(obj);
  const fromStr = parseTrace(JSON.stringify(obj));
  assert.deepEqual(fromObj, fromStr);
  assert.equal(fromObj.version, 1);
  assert.equal(fromObj.steps[0].t, 0, "sorted ascending by t");
  assert.equal(fromObj.steps[0].action, "move", "missing action -> move");
  assert.equal(fromObj.steps[1].action, "click");
  assert.equal(fromObj.duration, 200);
});

test("parseTrace tolerates junk and missing steps", () => {
  assert.deepEqual(parseTrace(null).steps, []);
  assert.deepEqual(parseTrace({}).steps, []);
  assert.equal(parseTrace("not json").steps.length, 0);
});

test("samplePath clamps ends and interpolates the middle", () => {
  const pts = [{ t: 0, x: 0, y: 0 }, { t: 100, x: 100, y: 50 }];
  assert.equal(samplePath([], 0), null);
  assert.deepEqual(samplePath(pts, -10), { x: 0, y: 0, index: 0 });
  assert.deepEqual(samplePath(pts, 50), { x: 50, y: 25, index: 0 });
  assert.deepEqual(samplePath(pts, 100), { x: 100, y: 50, index: 1 });
  assert.deepEqual(samplePath(pts, 999), { x: 100, y: 50, index: 1 });
});

test("setting .trace + seek positions cursor and fires cursorstep on entry", () => {
  const el = new PuraAgentCursor();
  el._tag = "pura-agent-cursor";
  el.connectedCallback();
  const steps = [];
  el.addEventListener("cursorstep", (e) => steps.push(e.detail));

  el.trace = { version: 1, steps: [
    { x: 0, y: 0, t: 0, action: "move", label: "start" },
    { x: 100, y: 50, t: 100, action: "click", target: "#go", label: "submit" },
  ] };

  el.seek(0);
  el.seek(100);

  assert.equal(steps.length, 2, "entered both steps");
  assert.equal(steps[0].action, "move");
  assert.equal(steps[1].action, "click");
  assert.equal(steps[1].label, "submit");
  assert.equal(el.getAttribute("data-pura-cursor-step"), "1");
});

test("click step triggers the ripple animation", () => {
  const el = new PuraAgentCursor();
  el._tag = "pura-agent-cursor";
  el.connectedCallback();
  el.trace = { version: 1, steps: [{ x: 10, y: 10, t: 0, action: "click" }] };
  el.seek(0);
  const ripple = el.shadowRoot.querySelector(".ripple");
  assert.ok(ripple._cls.has("go"), "ripple got the .go animation class");
});

test("play / pause toggle agent-visible playing state + events", () => {
  const el = new PuraAgentCursor();
  el._tag = "pura-agent-cursor";
  el.connectedCallback();
  el.trace = { version: 1, steps: [{ x: 0, y: 0, t: 0 }, { x: 9, y: 9, t: 50 }] };

  let played = 0, paused = 0;
  el.addEventListener("cursorplay", () => played++);
  el.addEventListener("cursorpause", () => paused++);

  el.play();
  assert.equal(el.getAttribute("data-pura-cursor-playing"), "true");
  assert.equal(played, 1);

  el.pause();
  assert.equal(el.getAttribute("data-pura-cursor-playing"), "false");
  assert.equal(paused, 1);
});
