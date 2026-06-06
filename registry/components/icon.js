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
    const d = this.getAttribute("path") || this.getAttribute("d");
    const label = this.getAttribute("label");
    const a11y = label
      ? `role="img" aria-label="${esc(label)}"`
      : `aria-hidden="true"`;

    // Inline-svg branch when a path is given; otherwise pass through a slotted svg.
    const inner = d
      ? `<svg part="svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="${esc(this.strokeWidth)}" stroke-linecap="round"
            stroke-linejoin="round" focusable="false" ${a11y}>
           <path d="${esc(d)}"/>
         </svg>`
      : `<span part="svg" class="slotwrap" ${a11y}><slot></slot></span>`;

    this.render(inner, CSS.replaceAll("SIZE", cssLen(this.size)));
  }
}

// Quote-safe attribute escaping for path/label coming from attributes.
function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

// Accept a bare number (px) or any CSS length.
function cssLen(v) {
  return /^\d+(\.\d+)?$/.test(v) ? `${v}px` : v;
}

const CSS = `
  :host { display: inline-flex; line-height: 0; vertical-align: middle; }
  [part="svg"] {
    display: inline-flex; width: SIZE; height: SIZE; flex: none;
    color: inherit;
  }
  svg[part="svg"] { display: block; }
  .slotwrap { align-items: center; justify-content: center; }
  ::slotted(svg) { display: block; width: 100%; height: 100%; }
`;

define("pura-icon", PuraIcon, meta);
export { PuraIcon };
