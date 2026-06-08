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
import meta from "./fab.meta.js";
import { fabTemplate } from "./fab.template.js";

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

    const { html, css } = fabTemplate(this);
    this.render(html, css);

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


define("pura-fab", PuraFab, meta);
export { PuraFab };
