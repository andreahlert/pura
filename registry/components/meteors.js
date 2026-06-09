// <pura-meteors> — a field of diagonal shooting-star streaks behind its content,
// in the style of Magic UI's Meteors. The meteors are deterministically scattered
// in the pure template (no Math.random), so the server and client paint the same
// field and the effect works with no client JS. Each meteor is a CSS @keyframes
// fall; there is no animation runtime.
//
// Attributes:
//   count — number of meteors (default 14, capped at 80).
//
// Theming: --pura-meteor-color (streak + tail color), --pura-meteor-glow (halo).
//
// Slots: default — content layered above the meteor field.
//
// Reduced motion: base.js RESET collapses animation-duration, so the meteors
//   hold still with no separate guard.
//
// Agent-native layer: each instance registers in window.__puraMeteors keyed by
//   data-pura-id and mirrors data-pura-meteors-count.
import { PuraElement, define } from "../base.js";
import meta from "./meteors.meta.js";
import { meteorsTemplate } from "./meteors.template.js";

let uid = 0;

function registry() {
  return (window.__puraMeteors ||= new Map());
}

class PuraMeteors extends PuraElement {
  static observedAttributes = ["count"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-meteors-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);
    this._paint();
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (!this.shadowRoot) return;
    this._paint();
  }

  _paint() {
    const { html, css } = meteorsTemplate(this);
    this.render(html, css);
    this.setAttribute("data-pura-meteors-count", this.getAttribute("count") || "14");
  }
}

define("pura-meteors", PuraMeteors, meta);
export { PuraMeteors };
