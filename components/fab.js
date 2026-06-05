// <pura-fab> — floating action button fixed to a viewport corner. Round and
// elevated (shadow-lg), primary color, with an icon slot. The `extended`
// variant reveals a text label alongside the icon (pill shape).
// Attributes:
//   position  — corner the button is pinned to:
//               bottom-right (default) | bottom-left | top-right | top-left
//   extended  — show the slotted label too (pill shape instead of a circle)
//   label     — accessible name for the icon-only button (default "Action").
//               When `extended` and a label slot has text, the visible text is
//               the accessible name and this attribute is ignored.
//   disabled  — non-interactive
//   hidden     — standard; the host is removed from layout (base reset)
// Slots:
//   (default) — the visible label text (shown only when `extended`)
//   icon      — the icon (an inline SVG / glyph); always visible
// Events:
//   pura-fab-click { id } — fired on activation (click / Enter / Space) unless
//               disabled. Bubbles + composed so it crosses the shadow boundary.
// Agent-native layer: stable data-pura-fab-* attributes mirror live state and
//   each instance registers in window.__puraFabs keyed by its data-pura-id, so
//   agents can enumerate every FAB on the page, read its state, and drive it
//   via .click() without touching the Shadow DOM.
import { PuraElement, define } from "../base.js";

let uid = 0;

const POSITIONS = ["bottom-right", "bottom-left", "top-right", "top-left"];

// Lazily-created global registry: id -> element. Lets agents discover and drive
// every FAB on the page without piercing the Shadow DOM.
function registry() {
  return (window.__puraFabs ||= new Map());
}

class PuraFab extends PuraElement {
  static observedAttributes = ["position", "extended", "label", "disabled"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-fab-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    this.render(
      `<button part="button" type="button">
         <span class="icon" part="icon" aria-hidden="true"><slot name="icon">${DEFAULT_ICON}</slot></span>
         <span class="label" part="label"><slot></slot></span>
       </button>`,
      CSS
    );

    this._btn = this.$("button");
    this._labelSlot = this.$(".label slot");

    this._onClick = (e) => {
      if (this.disabled) {
        e.stopImmediatePropagation();
        e.preventDefault();
        return;
      }
      this.dispatchEvent(
        new CustomEvent("pura-fab-click", {
          detail: { id: this._id },
          bubbles: true,
          composed: true,
        })
      );
    };
    this._btn.addEventListener("click", this._onClick);

    this._onSlotChange = () => this._sync();
    if (this._labelSlot) this._labelSlot.addEventListener("slotchange", this._onSlotChange);

    this._sync();
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (this._btn) this._sync();
  }

  // ---- config getters -----------------------------------------------------
  get disabled() {
    return this.hasAttribute("disabled");
  }

  get extended() {
    return this.hasAttribute("extended");
  }

  get position() {
    const p = this.getAttribute("position");
    return POSITIONS.includes(p) ? p : "bottom-right";
  }

  // ---- public API ---------------------------------------------------------
  // Programmatic activation: agents drive the FAB through this.
  click() {
    if (this.disabled) return;
    if (this._btn) this._btn.click();
    else super.click();
  }

  focus(opts) {
    if (this._btn) this._btn.focus(opts);
    else super.focus(opts);
  }

  // ---- sync DOM + ARIA + agent mirror -------------------------------------
  _sync() {
    if (!this._btn) return;
    const hasLabelText = this._labelSlot && this._labelSlot.assignedNodes().length > 0;
    const labelled = this.extended && hasLabelText;
    const label = this.getAttribute("label") || "Action";

    this._btn.disabled = this.disabled;

    // Labelled (extended + visible text) derives its accessible name from the
    // slotted text. Otherwise it is icon-only and needs an explicit aria-label.
    if (labelled) this._btn.removeAttribute("aria-label");
    else this._btn.setAttribute("aria-label", label);

    this._reflectAgentState(labelled, label);
  }

  // Stable machine-readable mirror of state on the host element.
  _reflectAgentState(labelled, label) {
    this.setAttribute("data-pura-fab", this.extended ? "extended" : "compact");
    this.setAttribute("data-pura-fab-position", this.position);
    this.setAttribute("data-pura-fab-disabled", this.disabled ? "true" : "false");
    this.setAttribute("data-pura-fab-label", labelled ? "slot" : label);
  }
}

// Inline default icon (a plus), reused via currentColor; no external assets.
const DEFAULT_ICON =
  `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false">` +
  `<path d="M12 5v14M5 12h14"/>` +
  `</svg>`;

const CSS = `
  :host {
    position: fixed; z-index: 50;
    display: inline-flex;
  }

  /* corner placement — uses safe-area insets where available */
  :host(:not([position])),
  :host([position="bottom-right"]) {
    bottom: calc(var(--pura-space-5) + env(safe-area-inset-bottom, 0px));
    right: calc(var(--pura-space-5) + env(safe-area-inset-right, 0px));
  }
  :host([position="bottom-left"]) {
    bottom: calc(var(--pura-space-5) + env(safe-area-inset-bottom, 0px));
    left: calc(var(--pura-space-5) + env(safe-area-inset-left, 0px));
  }
  :host([position="top-right"]) {
    top: calc(var(--pura-space-5) + env(safe-area-inset-top, 0px));
    right: calc(var(--pura-space-5) + env(safe-area-inset-right, 0px));
  }
  :host([position="top-left"]) {
    top: calc(var(--pura-space-5) + env(safe-area-inset-top, 0px));
    left: calc(var(--pura-space-5) + env(safe-area-inset-left, 0px));
  }

  button {
    display: inline-flex; align-items: center; justify-content: center;
    gap: var(--pura-space-2);
    width: 3.5rem; height: 3.5rem; padding: 0;
    font: inherit; font-size: var(--pura-text-base); font-weight: 600;
    line-height: 1; white-space: nowrap; cursor: pointer;
    border: 1px solid transparent; border-radius: var(--pura-radius-full);
    background: var(--pura-primary); color: var(--pura-primary-fg);
    box-shadow: var(--pura-shadow-lg);
    transition: background var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease),
      transform var(--pura-dur) var(--pura-ease);
  }
  button:hover { background: var(--pura-primary-hover); }
  button:active { transform: translateY(0.5px) scale(0.98); }
  button:focus-visible { outline: none; box-shadow: var(--pura-shadow-lg), 0 0 0 3px var(--pura-ring); }
  button:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }

  .icon {
    display: inline-flex; align-items: center; justify-content: center;
    font-size: var(--pura-text-xl);
  }
  .icon ::slotted(svg), .icon svg { display: block; }

  /* label hidden by default (compact circle); shown only when extended */
  .label { display: none; }
  :host([extended]) button {
    width: auto; min-width: 3.5rem;
    padding: 0 var(--pura-space-5);
  }
  :host([extended]) .label {
    display: inline; font-size: var(--pura-text-sm);
  }
`;

define("pura-fab", PuraFab);
export { PuraFab };
