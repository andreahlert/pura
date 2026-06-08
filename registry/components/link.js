// <pura-link> — themeable anchor primitive. Wraps <a> as a building block.
// Attributes:
//   href     — destination URL (forwarded to inner <a>)
//   target   — link target, e.g. _blank (forwarded to inner <a>)
//   variant  — underline-on-hover (default) | underline | subtle | button
//   color    — fg | muted | primary (default) | accent
//   external — boolean; adds rel="noopener noreferrer", target=_blank fallback,
//              and a trailing ↗ glyph
// Slots: default — link text/content.
// Part: link — the inner <a> element.
import { PuraElement, define } from "../base.js";
import meta from "./link.meta.js";
import { linkTemplate } from "./link.template.js";

class PuraLink extends PuraElement {
  static observedAttributes = ["href", "target", "external"];

  connectedCallback() {
    const { html, css } = linkTemplate(this);
    this.render(html, css);
    this._a = this.$("a");
    this._sync();
  }

  attributeChangedCallback() {
    if (this._a) this._sync();
  }

  // Forward link-affecting attributes onto the inner <a>. Presentation
  // (variant/color) is handled purely via :host([...]) attribute selectors.
  _sync() {
    const href = this.getAttribute("href");
    if (href !== null) this._a.setAttribute("href", href);
    else this._a.removeAttribute("href");

    const external = this.hasAttribute("external");
    const target = this.getAttribute("target") ?? (external ? "_blank" : null);
    if (target !== null) this._a.setAttribute("target", target);
    else this._a.removeAttribute("target");

    if (external) this._a.setAttribute("rel", "noopener noreferrer");
    else this._a.removeAttribute("rel");
  }
}


define("pura-link", PuraLink, meta);
export { PuraLink };
