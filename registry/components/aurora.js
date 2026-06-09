// <pura-aurora> — a slowly drifting aurora-light gradient backdrop behind its
// slotted content, in the style of Magic UI's Aurora background. Motion is one
// pure CSS @keyframes pan/rotate, so it works server-rendered with no client JS
// and no animation runtime. JS only wires the agent registry.
//
// Theming: --pura-aurora-1..4 (the four blob colors), --pura-aurora-opacity,
//   --pura-aurora-blur, --pura-aurora-duration.
//
// Slots: default — content layered above the aurora field.
//
// Reduced motion: base.js RESET collapses animation-duration, so the field
//   rests as a static gradient.
//
// Agent-native layer: each instance registers in window.__puraAuroras keyed by
//   data-pura-id.
import { PuraElement, define } from "../base.js";
import meta from "./aurora.meta.js";
import { auroraTemplate } from "./aurora.template.js";

let uid = 0;

function registry() {
  return (window.__puraAuroras ||= new Map());
}

class PuraAurora extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-aurora-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    const { html, css } = auroraTemplate(this);
    this.render(html, css);
    this.setAttribute("data-pura-aurora", "true");
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
  }
}

define("pura-aurora", PuraAurora, meta);
export { PuraAurora };
