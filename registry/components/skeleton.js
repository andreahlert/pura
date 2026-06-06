// <pura-skeleton> — loading placeholder. Attributes: width, height (CSS lengths
// applied to the placeholder part), circle (boolean -> full border-radius).
// Animates a subtle shimmer over var(--pura-subtle); falls back to a pulse and
// honors prefers-reduced-motion (handled by the base reset).
import { PuraElement, define } from "../base.js";
import meta from "./skeleton.meta.js";

class PuraSkeleton extends PuraElement {
  static observedAttributes = ["width", "height", "circle"];

  connectedCallback() {
    this.render(
      `<div part="skeleton" role="presentation" aria-hidden="true"></div>`,
      CSS
    );
    this.setAttribute("aria-busy", "true");
    this._el = this.$('[part="skeleton"]');
    this._sync();
  }

  attributeChangedCallback() {
    if (this._el) this._sync();
  }

  _sync() {
    const width = this.getAttribute("width");
    const height = this.getAttribute("height");
    this._el.style.width = width || "";
    this._el.style.height = height || "";
  }
}

const CSS = `
  :host { display: block; }
  :host([circle]) { display: inline-block; }

  [part="skeleton"] {
    width: 100%;
    height: 1em;
    border-radius: var(--pura-radius-sm);
    background-color: var(--pura-subtle);
    /* moving shimmer over the subtle base */
    background-image: linear-gradient(
      90deg,
      transparent 0%,
      var(--pura-subtle-hover) 50%,
      transparent 100%
    );
    background-size: 200% 100%;
    background-repeat: no-repeat;
    background-position: 200% 0;
    animation: pura-skeleton-shimmer 1.4s var(--pura-ease) infinite;
  }

  :host([circle]) [part="skeleton"] {
    border-radius: var(--pura-radius-full);
    aspect-ratio: 1 / 1;
  }

  @keyframes pura-skeleton-shimmer {
    to { background-position: -200% 0; }
  }

  /* Reduced motion: drop the moving gradient, keep a gentle opacity pulse.
     The base reset clamps animation-duration, so pulse stays effectively
     static while preserving the placeholder appearance. */
  @media (prefers-reduced-motion: reduce) {
    [part="skeleton"] {
      background-image: none;
      animation-name: pura-skeleton-pulse;
    }
  }

  @keyframes pura-skeleton-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.55; }
  }
`;

define("pura-skeleton", PuraSkeleton, meta);
export { PuraSkeleton };
