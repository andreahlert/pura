import { test } from "node:test";
import assert from "node:assert/strict";

// ---- minimal DOM shim ------------------------------------------------------
class FakeNode {
  constructor() {
    this.style = { setProperty() {}, removeProperty() {} };
    this._attrs = {};
    this.textContent = "";
    this._listeners = {};
    this.disabled = false;
    this.classList = { add() {}, remove() {}, toggle() {} };
  }
  setAttribute(n, v) { this._attrs[n] = String(v); }
  getAttribute(n) { return this._attrs[n] ?? null; }
  removeAttribute(n) { delete this._attrs[n]; }
  hasAttribute(n) { return n in this._attrs; }
  addEventListener(t, h) { (this._listeners[t] ||= []).push(h); }
  click() { (this._listeners.click || []).forEach((h) => h({})); }
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
  toggleAttribute(n, force) {
    const has = n in this._attrs;
    const want = force === undefined ? !has : force;
    if (want) this._attrs[n] = ""; else delete this._attrs[n];
    return want;
  }
  attachShadow() { this._shadow = new FakeShadow(); return this._shadow; }
  get shadowRoot() { return this._shadow; }
  addEventListener(t, h) { (this._listeners[t] ||= []).push(h); }
  dispatchEvent(e) { (this._listeners[e.type] || []).forEach((h) => h(e)); return true; }
  get tagName() { return (this._tag || "pura-disclosure").toUpperCase(); }
  get style() { return this._style; }
}
globalThis.HTMLElement = El;
globalThis.CustomEvent = class { constructor(type, init) { this.type = type; this.detail = init?.detail; this.bubbles = init?.bubbles; } };
globalThis.window = globalThis.window || { addEventListener() {}, removeEventListener() {} };
globalThis.document = globalThis.document || { documentElement: { setAttribute() {} } };
const reg = new Map();
globalThis.customElements = { get: (t) => reg.get(t), define: (t, c) => reg.set(t, c) };

const { PuraDisclosure } = await import("../registry/components/disclosure.js");
const { disclosureTemplate } = await import("../registry/components/disclosure.template.js");

test("template is pure + deterministic and animates height to auto natively", () => {
  const a = disclosureTemplate();
  const b = disclosureTemplate();
  assert.equal(a.html, b.html);
  assert.match(a.html, /part="trigger"/);
  assert.match(a.html, /part="content"/);
  assert.ok(a.css.includes("interpolate-size: allow-keywords"), "uses native keyword sizing");
  assert.match(a.css, /transition:[\s\S]*?height var/, "transitions height (not a grid hack)");
  assert.ok(!a.css.includes("grid-template-rows"), "no grid-row hack");
  assert.ok(a.css.includes("height: auto"), "open state expands to auto");
});

test("open / close / toggle drive [open] + aria-expanded + data mirror", () => {
  const el = new PuraDisclosure();
  el._tag = "pura-disclosure";
  el.connectedCallback();
  const trigger = el.shadowRoot.querySelector(".trigger");

  assert.equal(el.hasAttribute("open"), false);
  assert.equal(trigger.getAttribute("aria-expanded"), "false");
  assert.equal(el.getAttribute("data-pura-open"), "false");

  el.open();
  el._sync();
  assert.equal(el.hasAttribute("open"), true);
  assert.equal(trigger.getAttribute("aria-expanded"), "true");
  assert.equal(el.getAttribute("data-pura-open"), "true");

  el.close();
  el._sync();
  assert.equal(el.hasAttribute("open"), false);

  el.toggle();
  el._sync();
  assert.equal(el.hasAttribute("open"), true);
});

test("collapsed content is inert; open content is not", () => {
  const el = new PuraDisclosure();
  el._tag = "pura-disclosure";
  el.connectedCallback();
  const content = el.shadowRoot.querySelector(".content");

  // collapsed by default: focusable children leave the tab order
  assert.equal(content.hasAttribute("inert"), true);
  assert.equal(content.getAttribute("aria-hidden"), "true");

  el.open();
  el._sync();
  assert.equal(content.hasAttribute("inert"), false);
  assert.equal(content.getAttribute("aria-hidden"), "false");
});

test("disabled blocks toggle", () => {
  const el = new PuraDisclosure();
  el._tag = "pura-disclosure";
  el.setAttribute("disabled", "");
  el.connectedCallback();
  el.toggle();
  assert.equal(el.hasAttribute("open"), false);
});

test("attribute change emits disclosuretoggle { open }", () => {
  const el = new PuraDisclosure();
  el._tag = "pura-disclosure";
  el.connectedCallback();
  let got = null;
  el.addEventListener("disclosuretoggle", (e) => { got = e.detail; });
  // simulate the platform calling attributeChangedCallback after [open] is set
  el.setAttribute("open", "");
  el.attributeChangedCallback("open", null, "");
  assert.ok(got);
  assert.equal(got.open, true);
});

test("trigger click toggles open", () => {
  const el = new PuraDisclosure();
  el._tag = "pura-disclosure";
  el.connectedCallback();
  const trigger = el.shadowRoot.querySelector(".trigger");
  trigger.click();
  assert.equal(el.hasAttribute("open"), true);
});
