// <pura-section> — semantic <section> wrapper with vertical rhythm + optional
// centered, readable max-width container. Renders <section part="section">
// <div class="inner"><slot></slot></div></section>.
// Attributes:
//   py        — vertical padding on the space scale (1–6). Default 6.
//   container — boolean. Centers content within a readable max-width.
//   bg        — background. Accepts a --pura-* token name (e.g. "subtle") or any
//               CSS color/value. Default transparent.
// Slots: default — section content.
import { PuraElement, define } from "../base.js";
import meta from "./section.meta.js";

class PuraSection extends PuraElement {
  static get observedAttributes() {
    return ["py", "bg"];
  }

  connectedCallback() {
    this.render(
      `<section part="section"><div class="inner"><slot></slot></div></section>`,
      CSS
    );
    this._sync();
  }

  attributeChangedCallback() {
    // Only re-sync once the shadow tree exists (post connect).
    if (this.shadowRoot && this.shadowRoot.childElementCount) this._sync();
  }

  // Map attributes → CSS custom properties on the host.
  _sync() {
    const py = this.getAttribute("py") || "6";
    this.style.setProperty("--_py", `var(--pura-space-${py}, var(--pura-space-6))`);

    const bg = this.getAttribute("bg");
    if (bg) {
      // A bare token name (e.g. "subtle") maps to its --pura-* var; anything
      // else is used verbatim as a CSS value.
      const value = /^[a-z][a-z0-9-]*$/.test(bg) ? `var(--pura-${bg}, ${bg})` : bg;
      this.style.setProperty("--_bg", value);
    } else {
      this.style.removeProperty("--_bg");
    }
  }
}

const CSS = `
  :host {
    display: block;
    --_py: var(--pura-space-6);
    --_bg: transparent;
  }
  [part="section"] {
    padding: var(--_py) var(--pura-space-4);
    background: var(--_bg);
    color: var(--pura-fg);
  }
  .inner { width: 100%; }
  /* container: center content at a comfortable reading max-width */
  :host([container]) .inner {
    max-width: 65rem;
    margin-inline: auto;
  }
`;

define("pura-section", PuraSection, meta);
export { PuraSection };
