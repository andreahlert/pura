// <pura-stage> — a viewport-tall, internally-scrollable box of full-height
// sections. With `snap`, scrolling lands one section at a time (the fullpage /
// one-screen-at-a-time feel), using native CSS scroll snapping, no per-frame JS.
// Because the box is its own scroll container, scrub children inside a section
// that use timeline="scroll" bind to the stage's progress.
//
// Attributes:
//   snap   — "" / "mandatory" | "proximity" | absent. Enables scroll snapping.
//   height — section + box height (default 100vh).
//   axis   — "y" (default) | "x".
//
// Public API (also handy for agents and keyboard nav):
//   sections           — slotted section elements.
//   index              — nearest section to the current scroll position.
//   scrollToSection(i)  / next() / prev() — programmatic navigation.
//   Fires `stage-change` { index } when the settled section changes.
//
// Agent-native layer: each instance registers in window.__puraStages by
//   data-pura-id with { sections, index, next, prev, scrollToSection, el }.
import { PuraElement, define } from "../base.js";
import meta from "./stage.meta.js";
import { stageTemplate } from "./stage.template.js";

let uid = 0;

function registry() {
  return (window.__puraStages ||= new Map());
}

class PuraStage extends PuraElement {
  static get observedAttributes() {
    return ["snap", "height", "axis"];
  }

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-stage-${uid++}`;
    this.dataset.puraId = this._id;
    this._index = 0;

    this._draw();

    this._onScroll = () => this._trackIndex();
    this.addEventListener("scroll", this._onScroll, { passive: true });
    this._register();
  }

  attributeChangedCallback() {
    if (this.isConnected) this._draw();
  }

  disconnectedCallback() {
    this.removeEventListener("scroll", this._onScroll);
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  // ---- config / state -------------------------------------------------------
  get horizontal() {
    return this.getAttribute("axis") === "x";
  }
  get sections() {
    return Array.from(this.children);
  }
  get index() {
    return this._index;
  }

  // ---- public API -----------------------------------------------------------
  scrollToSection(i) {
    const els = this.sections;
    const n = Math.max(0, Math.min(i, els.length - 1));
    const target = els[n];
    if (!target) return;
    const reduce =
      typeof matchMedia === "function" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start", inline: "start" });
  }
  next() { this.scrollToSection(this._index + 1); }
  prev() { this.scrollToSection(this._index - 1); }

  // ---- internals ------------------------------------------------------------
  _draw() {
    const { html, css } = stageTemplate(this);
    this.render(html, css);
  }

  _trackIndex() {
    const els = this.sections;
    if (!els.length) return;
    const horiz = this.horizontal;
    const pos = horiz ? this.scrollLeft : this.scrollTop;
    const size = horiz ? this.clientWidth : this.clientHeight;
    const idx = Math.round(pos / Math.max(1, size));
    const clamped = Math.max(0, Math.min(idx, els.length - 1));
    if (clamped !== this._index) {
      this._index = clamped;
      this._register();
      this.dispatchEvent(new CustomEvent("stage-change", { detail: { index: clamped }, bubbles: true }));
    }
  }

  _register() {
    registry().set(this._id, {
      id: this._id,
      sections: this.sections.length,
      index: this._index,
      next: () => this.next(),
      prev: () => this.prev(),
      scrollToSection: (i) => this.scrollToSection(i),
      el: this,
    });
    this.setAttribute("data-pura-stage-index", String(this._index));
  }
}

define("pura-stage", PuraStage, meta);
export { PuraStage };
