// <pura-scroll-area> — styled scroll container. Attributes: height (CSS length
// for max-height; falls back to a default), horizontal (allow horizontal scroll).
// Default slot = content. Slim themed scrollbar via scrollbar-width/-color tokens
// plus ::-webkit-scrollbar styling (thumb var(--pura-border-strong) rounded,
// track transparent).
import { PuraElement, define } from "../base.js";
import meta from "./scroll-area.meta.js";

class PuraScrollArea extends PuraElement {
  static observedAttributes = ["height"];

  connectedCallback() {
    this.render(
      `<div part="viewport" class="viewport" tabindex="0"><slot></slot></div>`,
      CSS
    );
    this._viewport = this.$(".viewport");
    this._sync();
  }

  attributeChangedCallback() {
    if (this._viewport) this._sync();
  }

  _sync() {
    const height = this.getAttribute("height");
    if (height) this._viewport.style.maxHeight = height;
    else this._viewport.style.removeProperty("max-height");
  }
}

const CSS = `
  :host { display: block; }

  .viewport {
    overflow: auto;
    max-height: 18rem;
    border-radius: var(--pura-radius);
    color: var(--pura-fg);
    /* Firefox / standards slim scrollbar */
    scrollbar-width: thin;
    scrollbar-color: var(--pura-border-strong) transparent;
  }

  :host([horizontal]) .viewport { overflow-x: auto; }
  :host(:not([horizontal])) .viewport { overflow-x: hidden; }

  /* WebKit / Blink slim scrollbar */
  .viewport::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
  }
  .viewport::-webkit-scrollbar-track {
    background: transparent;
  }
  .viewport::-webkit-scrollbar-thumb {
    background: var(--pura-border-strong);
    border-radius: var(--pura-radius-full);
    border: 2px solid transparent;
    background-clip: padding-box;
  }
  .viewport::-webkit-scrollbar-thumb:hover {
    background: var(--pura-muted);
    background-clip: padding-box;
  }
  .viewport::-webkit-scrollbar-corner {
    background: transparent;
  }

  .viewport:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--pura-ring);
  }
`;

define("pura-scroll-area", PuraScrollArea, meta);
export { PuraScrollArea };
