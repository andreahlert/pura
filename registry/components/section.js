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
import { sectionTemplate } from "./section.template.js";

class PuraSection extends PuraElement {
  static get observedAttributes() {
    return ["py", "bg"];
  }

  connectedCallback() {
    const { html, css } = sectionTemplate(this);
    this.render(html, css);
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


define("pura-section", PuraSection, meta);
export { PuraSection };
