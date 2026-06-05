// <pura-image-compare> — before/after image comparison slider. Two slotted
// images are stacked; a draggable vertical handle clips the "after" layer to
// reveal more or less of it as it moves left/right.
// Slots:
//   before — the baseline image (slot name="before"); sits in normal flow and
//            establishes the component's intrinsic height.
//   after  — the comparison image (slot name="after"); absolutely overlaid and
//            clipped according to value.
// Attributes:
//   value  — handle position, 0–100 (default 50). 0 shows only "before",
//            100 shows only "after". Mirrored back to the host attribute.
//   label  — accessible label for the slider (default "Before/after comparison").
// Events:
//   input  { value } — fires on every drag/keyboard step.
//   change { value } — fires on commit (pointer release / keyboard step).
// Parts: root, before, after, divider, handle.
// Keyboard (handle is role=slider, tabindex=0): Arrow Left/Down −1,
//   Arrow Right/Up +1, PageUp/PageDown ±10, Home=0, End=100.
// Agent-native layer: stable data-pura-* attributes mirror live state and the
//   instance registers in window.__puraImageCompares keyed by its data-pura-id.
import { PuraElement, define } from "../base.js";

let uid = 0;

// Lazily-created global registry so agents can enumerate / read / drive every
// comparison on the page without touching the DOM. Maps data-pura-id -> element.
function registry() {
  return (window.__puraImageCompares ||= new Map());
}

function clamp(n) {
  if (!Number.isFinite(n)) return 50;
  return Math.min(100, Math.max(0, n));
}

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}

class PuraImageCompare extends PuraElement {
  static observedAttributes = ["value", "label"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-image-compare-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    this._value = clamp(Number(this.getAttribute("value")));

    this.render(
      `<div class="root" part="root">
         <div class="layer before" part="before"><slot name="before"></slot></div>
         <div class="layer after" part="after"><slot name="after"></slot></div>
         <div class="divider" part="divider" aria-hidden="true">
           <button class="handle" part="handle" type="button"
             role="slider" tabindex="0"
             aria-label="${esc(this.getAttribute("label") || "Before/after comparison")}"
             aria-valuemin="0" aria-valuemax="100">
             <svg viewBox="0 0 24 24" aria-hidden="true">
               <path d="M10 7l-4 5 4 5M14 7l4 5-4 5" fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
             </svg>
           </button>
         </div>
       </div>`,
      CSS
    );

    this._root = this.$(".root");
    this._handle = this.$(".handle");

    this._onPointerDown = (e) => this._onDown(e);
    this._onPointerMove = (e) => this._onMove(e);
    this._onPointerUp = (e) => this._onUp(e);
    this._onKeydown = (e) => this._onKey(e);

    this._root.addEventListener("pointerdown", this._onPointerDown);
    this._root.addEventListener("pointermove", this._onPointerMove);
    this._root.addEventListener("pointerup", this._onPointerUp);
    this._root.addEventListener("pointercancel", this._onPointerUp);
    this._handle.addEventListener("keydown", this._onKeydown);

    this._paint();
    this._mirror();
    // Settle the host attribute on first paint without re-entering the loop.
    if (String(this._value) !== this.getAttribute("value")) {
      this.setAttribute("value", String(this._value));
    }
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback(name, _old, val) {
    if (!this._root) return;
    if (name === "label") {
      this._handle.setAttribute("aria-label", val || "Before/after comparison");
    } else if (name === "value") {
      const next = clamp(Number(val));
      if (next !== this._value) {
        this._value = next;
        this._paint();
        this._mirror();
      }
    }
  }

  // ----- pointer -----
  _onDown(e) {
    if (e.button != null && e.button !== 0) return;
    this._dragging = true;
    try { this._root.setPointerCapture(e.pointerId); } catch {}
    this._setFromClientX(e.clientX, true);
    e.preventDefault();
  }

  _onMove(e) {
    if (!this._dragging) return;
    this._setFromClientX(e.clientX, true);
  }

  _onUp(e) {
    if (!this._dragging) return;
    this._dragging = false;
    try { this._root.releasePointerCapture(e.pointerId); } catch {}
    this._emit("change");
  }

  _setFromClientX(clientX, emitInput) {
    const rect = this._root.getBoundingClientRect();
    if (!rect.width) return;
    const pct = clamp(((clientX - rect.left) / rect.width) * 100);
    this._commit(pct, emitInput);
  }

  // ----- keyboard -----
  _onKey(e) {
    let next = this._value;
    switch (e.key) {
      case "ArrowRight":
      case "ArrowUp": next += 1; break;
      case "ArrowLeft":
      case "ArrowDown": next -= 1; break;
      case "PageUp": next += 10; break;
      case "PageDown": next -= 10; break;
      case "Home": next = 0; break;
      case "End": next = 100; break;
      default: return;
    }
    e.preventDefault();
    this._commit(clamp(next), true);
    this._emit("change");
  }

  _commit(pct, emitInput) {
    const next = clamp(pct);
    if (next === this._value) return;
    this._value = next;
    this._paint();
    this._mirror();
    if (String(next) !== this.getAttribute("value")) {
      this.setAttribute("value", String(next));
    }
    if (emitInput) this._emit("input");
  }

  // Position the divider/handle and clip the after layer.
  _paint() {
    this.style.setProperty("--pura-ic-pos", `${this._value}%`);
  }

  // Reflect live state for ARIA + the agent-native data layer.
  _mirror() {
    const v = this._value;
    this._handle.setAttribute("aria-valuenow", String(v));
    this._handle.setAttribute("aria-valuetext", `${Math.round(v)}% revealed`);
    this.setAttribute("data-pura-value", String(v));
    this.setAttribute("data-pura-min", "0");
    this.setAttribute("data-pura-max", "100");
  }

  _emit(type) {
    this.dispatchEvent(new CustomEvent(type, { detail: { value: this._value }, bubbles: true }));
  }

  get value() { return this._value ?? clamp(Number(this.getAttribute("value"))); }
  set value(v) {
    const next = clamp(Number(v));
    this.setAttribute("value", String(next));
  }
}

const CSS = `
  :host {
    display: block; position: relative;
    --pura-ic-pos: 50%;
    border-radius: var(--pura-radius);
    overflow: hidden;
    touch-action: none;
    user-select: none;
  }

  .root {
    position: relative; display: block; width: 100%;
    line-height: 0; cursor: ew-resize;
  }

  /* before layer in normal flow establishes intrinsic height */
  .layer.before { position: relative; }
  .layer.after {
    position: absolute; inset: 0;
    /* reveal from the left up to the handle position */
    clip-path: inset(0 calc(100% - var(--pura-ic-pos)) 0 0);
  }

  /* slotted images fill width, block layout, and never hijack the drag */
  ::slotted(img), ::slotted([slot]) {
    display: block; width: 100%; height: 100%; object-fit: cover;
    pointer-events: none; user-select: none; -webkit-user-drag: none;
  }

  .divider {
    position: absolute; top: 0; bottom: 0;
    left: var(--pura-ic-pos);
    width: 2px; margin-left: -1px;
    background: var(--pura-bg); box-shadow: var(--pura-shadow);
    pointer-events: none;
  }

  .handle {
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    display: grid; place-items: center;
    width: 2.25rem; height: 2.25rem;
    padding: 0; border-radius: var(--pura-radius-full);
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border-strong);
    box-shadow: var(--pura-shadow);
    cursor: ew-resize; pointer-events: auto;
    transition: border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  .handle svg { width: 1.1rem; height: 1.1rem; }
  .handle:hover { border-color: var(--pura-fg); }
  .handle:focus-visible {
    outline: none; border-color: var(--pura-accent);
    box-shadow: 0 0 0 3px var(--pura-ring);
  }
`;

define("pura-image-compare", PuraImageCompare);
export { PuraImageCompare };
