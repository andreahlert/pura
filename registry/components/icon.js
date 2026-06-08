// <pura-icon> - generic inline icon renderer. Render from EITHER a slotted <svg>
// (passed through, sized) OR attribute `path`/`d` (an SVG path `d` string).
// Output is an inline svg viewBox 0 0 24 24 using currentColor stroke, fill none,
// so color follows CSS `color`. Bundles no icon set.
// Attributes:
//   path / d      - SVG path `d` string to render
//   size          - width/height (default 1.25rem)
//   stroke-width  - stroke width (default 2)
//   label         - aria-label; when absent the icon is aria-hidden
// Part: svg
import { PuraElement, define } from "../base.js";
import meta from "./icon.meta.js";
import { iconTemplate } from "./icon.template.js";

class PuraIcon extends PuraElement {
  static observedAttributes = ["path", "d", "size", "stroke-width", "label"];

  connectedCallback() {
    this._render();
  }

  attributeChangedCallback() {
    if (this.shadowRoot.childElementCount) this._render();
  }

  get size() {
    return this.getAttribute("size") || "1.25rem";
  }

  get strokeWidth() {
    const w = this.getAttribute("stroke-width");
    return w != null && w !== "" ? w : "2";
  }

  _render() {
    const { html, css } = iconTemplate(this);
    this.render(html, css);
  }
}

define("pura-icon", PuraIcon, meta);
export { PuraIcon };
