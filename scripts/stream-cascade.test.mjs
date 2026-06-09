import { test } from "node:test";
import assert from "node:assert/strict";

// ---- minimal DOM shim ------------------------------------------------------
class FakeShadow {
  constructor() { this.innerHTML = ""; this.childNodes = [{}]; }
  querySelector() { return null; }
  querySelectorAll() { return []; }
}
class El {
  constructor() { this._attrs = {}; this.dataset = {}; this._listeners = {}; this._props = {}; this._children = []; this._style = { setProperty: (k, v) => { this._props[k] = v; } }; }
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
  get tagName() { return "PURA-STREAM-CASCADE"; }
}
globalThis.HTMLElement = El;
globalThis.CustomEvent = class { constructor(type, init) { this.type = type; this.detail = init?.detail; this.bubbles = init?.bubbles; } };
globalThis.window = globalThis.window || { addEventListener() {}, removeEventListener() {} };
const reg = new Map();
globalThis.customElements = { get: (t) => reg.get(t), define: (t, c) => reg.set(t, c) };

const { PuraStreamCascade } = await import("../registry/components/stream-cascade.js");
const { streamCascadeTemplate, buildCascadeDelays, CASCADE_STOPS } =
  await import("../registry/components/stream-cascade.template.js");

test("template emits parse-time nth-child stagger that multiplies --pura-motion", () => {
  const a = streamCascadeTemplate();
  const b = streamCascadeTemplate();
  assert.equal(a.css, b.css, "deterministic");
  assert.match(a.html, /<slot>/);
  assert.ok(a.css.includes("::slotted(:nth-child(1))"));
  assert.ok(a.css.includes(`::slotted(:nth-child(${CASCADE_STOPS}))`));
  assert.ok(a.css.includes("var(--pura-cascade-step"));
  assert.ok(a.css.includes("var(--pura-motion"));
  // it is parse-time CSS, not a JS scheduler
  assert.ok(!a.css.includes("setTimeout"));
});

test("buildCascadeDelays emits one rule per stop with an increasing multiplier", () => {
  const css = buildCascadeDelays(3);
  assert.match(css, /nth-child\(1\)\) \{ animation-delay: calc\(0 \*/);
  assert.match(css, /nth-child\(2\)\) \{ animation-delay: calc\(1 \*/);
  assert.match(css, /nth-child\(3\)\) \{ animation-delay: calc\(2 \*/);
  assert.equal(css.match(/nth-child/g).length, 3);
});

test("config getters validate, _sync drives vars + data-* mirror", () => {
  const el = new PuraStreamCascade();
  el.setAttribute("animation", "nope");
  el.setAttribute("step", "-3");
  el.connectedCallback();
  assert.equal(el.animation, "fade");
  assert.equal(el.step, 60);

  el.setAttribute("animation", "zoom");
  el.setAttribute("step", "120");
  el._sync();
  assert.equal(el._props["--pura-cascade-anim"], "pura-cascade-zoom");
  assert.equal(el._props["--pura-cascade-step"], "120ms");
  assert.equal(el.getAttribute("data-pura-cascade-animation"), "zoom");
  assert.equal(el.getAttribute("data-pura-cascade-step"), "120");
});

test("live-appended child animates immediately and fires cascadeitem", () => {
  // Stub MutationObserver so connectedCallback wires the REAL observer body,
  // then drive it with a synthetic addedNodes record.
  let captured = null;
  globalThis.MutationObserver = class {
    constructor(cb) { captured = cb; }
    observe() {} disconnect() {}
  };

  const el = new PuraStreamCascade();
  el.connectedCallback();
  assert.equal(typeof captured, "function", "observer was wired");

  let detail = null;
  el.addEventListener("cascadeitem", (e) => { detail = e.detail; });

  const existing = { nodeType: 1 };
  const node = { nodeType: 1, style: {} };
  el._children = [existing, node];

  // the component's real observer callback runs against this record:
  captured([{ addedNodes: [node, { nodeType: 3 /* text node, ignored */ }] }]);

  assert.equal(node.style.animationDelay, "0ms", "newcomer animates immediately");
  assert.deepEqual(detail, { index: 1, total: 2 });

  delete globalThis.MutationObserver;
});
