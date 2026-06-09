// <pura-magic-card> — a card whose gradient border and soft spotlight track the
// pointer, in the style of Magic UI's Magic Card. The resting paint (centred,
// dimmed) is rendered by the pure template, so it is SSR-safe; JS only updates
// two CSS custom properties on pointermove and wires the agent registry.
//
// Theming: --pura-magic-card-bg, -border (border gradient color), -glow (fill
//   color), -size (spotlight diameter), -radius.
//
// Slots: default — the card content.
//
// Motion: the glow is pointer-driven, not a keyframe, so there is nothing to
//   collapse under reduced motion; it simply stays at rest.
//
// Agent-native layer: each instance registers in window.__puraMagicCards keyed
//   by data-pura-id.
import { PuraElement, define } from "../base.js";
import meta from "./magic-card.meta.js";
import { magicCardTemplate } from "./magic-card.template.js";

let uid = 0;

function registry() {
  return (window.__puraMagicCards ||= new Map());
}

class PuraMagicCard extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-magic-card-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    const { html, css } = magicCardTemplate(this);
    this.render(html, css);

    this._onMove = (e) => {
      const r = this.getBoundingClientRect();
      this.style.setProperty("--pura-magic-x", `${e.clientX - r.left}px`);
      this.style.setProperty("--pura-magic-y", `${e.clientY - r.top}px`);
    };
    this.addEventListener("pointermove", this._onMove);
    this.setAttribute("data-pura-magic-card", "true");
  }

  disconnectedCallback() {
    this.removeEventListener("pointermove", this._onMove);
    if (registry().get(this._id) === this) registry().delete(this._id);
  }
}

define("pura-magic-card", PuraMagicCard, meta);
export { PuraMagicCard };
