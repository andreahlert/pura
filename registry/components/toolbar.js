// <pura-toolbar> — horizontal (or vertical) toolbar container. Lays out slotted
// controls (pura-button, pura-toggle, pura-separator, links, inputs, etc.) with
// consistent gaps and arrow-key ROVING FOCUS: only one item is in the tab order;
// Arrow keys move focus within the toolbar, Home/End jump to the ends.
// Attributes:
//   orientation — horizontal (default) | vertical. Sets layout + which arrow
//                 keys roam (Left/Right vs Up/Down) and ARIA aria-orientation.
// Slots: default — the toolbar items. Separators (role=separator, or
//   <pura-separator>, or elements with no focusable target) are skipped by
//   roving focus automatically.
// Agent-native layer: role="toolbar" + aria-orientation on the internal wrapper;
//   the host mirrors live state via data-pura-toolbar-* attributes and registers
//   in window.__puraToolbars keyed by its data-pura-id, so agents can enumerate
//   and read every toolbar without touching the shadow DOM.
import { PuraElement, define } from "../base.js";
import meta from "./toolbar.meta.js";

let uid = 0;

// Lazily-created global registry: data-pura-id -> element.
function registry() {
  return (window.__puraToolbars ||= new Map());
}

// Elements that are natively focusable / interactive targets.
const FOCUSABLE = 'button, a[href], input, select, textarea, [tabindex]';

class PuraToolbar extends PuraElement {
  static observedAttributes = ["orientation"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-toolbar-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    this.render(
      `<div part="toolbar" role="toolbar"
            aria-orientation="${this._orientation()}">
         <slot></slot>
       </div>`,
      CSS
    );
    this._wrap = this.$("[part=toolbar]");
    this._slot = this.$("slot");

    this.addEventListener("keydown", this._onKeydown);
    this._slot.addEventListener("slotchange", this._onSlotChange);

    this._sync();
  }

  disconnectedCallback() {
    this.removeEventListener("keydown", this._onKeydown);
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback(name) {
    if (!this._wrap) return;
    if (name === "orientation") {
      this._wrap.setAttribute("aria-orientation", this._orientation());
      this._reflectAgentState();
    }
  }

  _orientation() {
    return this.getAttribute("orientation") === "vertical" ? "vertical" : "horizontal";
  }

  // Top-level slotted element nodes (text nodes ignored).
  get items() {
    return this._slot
      ? this._slot.assignedElements()
      : [...this.children];
  }

  // Resolve the actual focusable target for an item: itself if natively
  // focusable, else the first focusable inside its shadow root (covers
  // pura-button / pura-toggle uniformly), else null (separators drop out).
  _targetOf(item) {
    if (!item || item.hasAttribute?.("hidden")) return null;
    if (item.matches?.(FOCUSABLE)) return item;
    if (item.shadowRoot) {
      const inner = item.shadowRoot.querySelector(FOCUSABLE);
      if (inner) return inner;
    }
    return null;
  }

  // Focusable targets, excluding disabled ones.
  _targets() {
    const out = [];
    for (const item of this.items) {
      const t = this._targetOf(item);
      if (!t) continue;
      if (t.disabled || t.getAttribute("aria-disabled") === "true") continue;
      if (item.hasAttribute?.("disabled") || item.getAttribute?.("aria-disabled") === "true") continue;
      out.push(t);
    }
    return out;
  }

  // Establish roving tabindex: the first enabled target is tabbable, the rest -1.
  _sync() {
    const targets = this._targets();
    targets.forEach((t, i) => (t.tabIndex = i === 0 ? 0 : -1));
    this._reflectAgentState();
  }

  _onSlotChange = () => this._sync();

  // Deepest active element across shadow boundaries.
  _deepActive() {
    let a = document.activeElement;
    while (a?.shadowRoot?.activeElement) a = a.shadowRoot.activeElement;
    return a;
  }

  _onKeydown = (e) => {
    const horizontal = this._orientation() !== "vertical";
    const next = horizontal ? "ArrowRight" : "ArrowDown";
    const prev = horizontal ? "ArrowLeft" : "ArrowUp";

    if (![next, prev, "Home", "End"].includes(e.key)) return;

    const targets = this._targets();
    if (!targets.length) return;

    const active = this._deepActive();
    const current = targets.indexOf(active);

    let i = current;
    if (e.key === next) i = current < 0 ? 0 : (current + 1) % targets.length;
    else if (e.key === prev) i = current < 0 ? targets.length - 1 : (current - 1 + targets.length) % targets.length;
    else if (e.key === "Home") i = 0;
    else if (e.key === "End") i = targets.length - 1;

    e.preventDefault();
    targets.forEach((t, j) => (t.tabIndex = j === i ? 0 : -1));
    targets[i].focus();
  };

  // Stable machine-readable mirror of state on the host element.
  _reflectAgentState() {
    this.setAttribute("data-pura-toolbar-orientation", this._orientation());
    this.setAttribute("data-pura-toolbar-items", String(this._targets().length));
  }
}

const CSS = `
  :host { display: block; }
  :host([orientation="vertical"]) { display: inline-block; }

  [part="toolbar"] {
    display: flex; flex-direction: row; align-items: center;
    flex-wrap: wrap; gap: var(--pura-space-2);
    padding: var(--pura-space-2);
    background: var(--pura-bg);
    border: 1px solid var(--pura-border);
    border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-sm);
  }
  :host([orientation="vertical"]) [part="toolbar"] {
    flex-direction: column; flex-wrap: nowrap; align-items: stretch;
    width: max-content;
  }

  /* Let slotted separators stretch across the cross axis. */
  ::slotted(pura-separator) { align-self: stretch; }
  :host(:not([orientation="vertical"])) ::slotted(pura-separator) {
    height: 1.5rem; align-self: center;
  }
`;

define("pura-toolbar", PuraToolbar, meta);
export { PuraToolbar };
