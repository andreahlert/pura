// <pura-skeleton-text> — multiline text loading placeholder. Renders N shimmer
// lines (the last line shorter) to mimic a paragraph while content loads.
// Attributes:
//   lines  — number of lines to render (default 3, clamped to >= 1)
//   gap    — CSS length for vertical spacing between lines (default var(--pura-space-2))
//   last   — CSS width for the (shorter) last line (default 60%)
// Animates a subtle shimmer over var(--pura-subtle); falls back to a gentle
// pulse and honors prefers-reduced-motion (the base reset clamps durations).
import { PuraElement, define } from "../base.js";

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

  _lineCount() {
    const raw = parseInt(this.getAttribute("lines"), 10);
    return Number.isFinite(raw) && raw > 0 ? raw : 3;
  }

  _render() {
    const count = this._lineCount();
    const gap = this.getAttribute("gap") || "var(--pura-space-2)";
    const last = this.getAttribute("last") || "60%";

    let lines = "";
    for (let i = 0; i < count; i++) {
      const isLast = i === count - 1 && count > 1;
      const style = isLast ? ` style="width:${last}"` : "";
      lines += `<span part="line"${style} data-line="${i}"></span>`;
    }

    this.render(
      `<div part="text" role="presentation" aria-hidden="true" style="--pura-skeleton-gap:${gap}">${lines}</div>`,
      CSS
    );
  }
}

const CSS = `
  :host { display: block; }

  [part="text"] {
    display: flex;
    flex-direction: column;
    gap: var(--pura-skeleton-gap, var(--pura-space-2));
    width: 100%;
  }

  [part="line"] {
    display: block;
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
    animation: pura-skeleton-text-shimmer 1.4s var(--pura-ease) infinite;
  }

  @keyframes pura-skeleton-text-shimmer {
    to { background-position: -200% 0; }
  }

  /* Reduced motion: drop the moving gradient, keep a gentle opacity pulse.
     The base reset clamps animation-duration, so pulse stays effectively
     static while preserving the placeholder appearance. */
  @media (prefers-reduced-motion: reduce) {
    [part="line"] {
      background-image: none;
      animation-name: pura-skeleton-text-pulse;
    }
  }

  @keyframes pura-skeleton-text-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.55; }
  }
`;

define("pura-skeleton-text", PuraSkeletonText);
export { PuraSkeletonText };
