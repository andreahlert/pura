// <pura-skeleton-text> — multiline text loading placeholder. Renders N shimmer
// lines (the last line shorter) to mimic a paragraph while content loads.
// Attributes:
//   lines  — number of lines to render (default 3, clamped to >= 1)
//   gap    — CSS length for vertical spacing between lines (default var(--pura-space-2))
//   last   — CSS width for the (shorter) last line (default 60%)
// Animates a subtle shimmer over var(--pura-subtle); falls back to a gentle
// pulse and honors prefers-reduced-motion (the base reset clamps durations).
import { PuraElement, define } from "../base.js";
import meta from "./skeleton-text.meta.js";
import { skeletonTextTemplate } from "./skeleton-text.template.js";

class PuraSkeletonText extends PuraElement {
  static observedAttributes = ["lines", "gap", "last"];

  connectedCallback() {
    this.setAttribute("aria-busy", "true");
    this._render();
  }

  attributeChangedCallback() {
    // Re-render only once connected (shadowRoot has content).
    if (this.isConnected && this.shadowRoot.childElementCount) this._render();
  }

  _render() {
    const { html, css } = skeletonTextTemplate(this);
    this.render(html, css);
  }
}

define("pura-skeleton-text", PuraSkeletonText, meta);
export { PuraSkeletonText };
