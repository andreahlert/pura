// <pura-hover-underline> — animated link underline: a bar that grows from the
// left, center or right (or rises from the baseline) on hover and keyboard
// focus, for links and nav items. The Hover.css "Underline From Left/Center/
// Right" and "Underline Reveal" moves, done as a pure CSS transition on a real
// shadow element (so it is themeable via ::part), zero per-frame JS.
//
// Attributes:
//   from     — "left" (default) | "center" | "right": where the grow variant
//              starts from (and shrinks back to).
//   variant  — "grow" (default) | "reveal": grow scales the bar along the x
//              axis; reveal rises it from the baseline (scaleY from bottom).
//   duration — transition time in ms (default 240).
//   active   — boolean; keeps the underline shown (current nav item). This is
//              also the SSR-presentable persistent state.
//
// Tokens: --pura-hover-underline-color (default currentColor),
//   --pura-hover-underline-thickness (default 2px),
//   --pura-hover-underline-offset (gap below the text, default 0.15em),
//   --pura-hover-underline-radius (default 1px),
//   --pura-hover-underline-ease (default cubic-bezier(0.65, 0, 0.35, 1)).
//
// Keyboard: :host(:focus-within) draws the underline for focused slotted
//   links, so keyboard users get the same affordance as hover.
// SSR / pre-JS: text renders normally; the underline is hidden unless the
//   element is marked active (the final static state, no transition needed).
// Reduced motion: the underline appears and disappears instantly.
//
// Agent-native layer: each instance registers in window.__puraHoverUnderlines
//   by data-pura-id with { from, variant, show, hide, el }; data-pura-hu-from /
//   data-pura-hu-variant mirror config and data-pura-hu-show mirrors a forced
//   show() state.
import { PuraElement, define } from "../base.js";
import meta from "./hover-underline.meta.js";
import {
  hoverUnderlineTemplate,
  underlineFrom,
  underlineVariant,
} from "./hover-underline.template.js";

let uid = 0;

function registry() {
  return (window.__puraHoverUnderlines ||= new Map());
}

class PuraHoverUnderline extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-hover-underline-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = hoverUnderlineTemplate(this);
    this.render(html, css);

    this.setAttribute("data-pura-hu-from", this.from);
    this.setAttribute("data-pura-hu-variant", this.variant);

    registry().set(this._id, {
      id: this._id,
      from: this.from,
      variant: this.variant,
      show: () => this.show(),
      hide: () => this.hide(),
      el: this,
    });
  }

  disconnectedCallback() {
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get from() {
    return underlineFrom(this);
  }
  get variant() {
    return underlineVariant(this);
  }

  // ---- public API -----------------------------------------------------------
  // Force the underline in (same transition as hover); for agents and demos.
  show() {
    this.setAttribute("data-pura-hu-show", "");
  }

  // Release a forced show; hover/focus/active states still apply.
  hide() {
    this.removeAttribute("data-pura-hu-show");
  }
}

define("pura-hover-underline", PuraHoverUnderline, meta);
export { PuraHoverUnderline };
