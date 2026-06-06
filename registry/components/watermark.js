// <pura-watermark> - overlays a repeating, non-interactive watermark over slotted
// content. Renders the content normally plus an absolutely-positioned overlay that
// tiles a text (or image) mark on top.
// Attributes:
//   text       - watermark text (tiled)
//   image      - image URL (tiled instead of text)
//   opacity    - overlay opacity (default 0.08)
//   rotate     - tile rotation in degrees (default -22)
//   gap        - px spacing between tiles (default 120)
//   font-size  - px text size (default 16)
// Parts: content, mark
import { PuraElement, define } from "../base.js";
import meta from "./watermark.meta.js";

class PuraWatermark extends PuraElement {
  static observedAttributes = ["text", "image", "opacity", "rotate", "gap", "font-size"];

  connectedCallback() {
    this._render();
  }

  attributeChangedCallback() {
    if (this.shadowRoot.childElementCount) this._render();
  }

  get opacity() {
    const n = Number(this.getAttribute("opacity"));
    return Number.isFinite(n) && n >= 0 ? n : 0.08;
  }

  get rotate() {
    const n = Number(this.getAttribute("rotate"));
    return Number.isFinite(n) ? n : -22;
  }

  get gap() {
    const n = Number(this.getAttribute("gap"));
    return Number.isFinite(n) && n > 0 ? n : 120;
  }

  get fontSize() {
    const n = Number(this.getAttribute("font-size"));
    return Number.isFinite(n) && n > 0 ? n : 16;
  }

  _render() {
    this.render(
      `<div part="content" class="content"><slot></slot></div>
       <div part="mark" class="mark" aria-hidden="true"></div>`,
      CSS
    );
    const mark = this.$(".mark");
    mark.style.backgroundImage = `url("${this._tile()}")`;
    mark.style.backgroundSize = `${this.gap}px ${this.gap}px`;
    mark.style.opacity = String(this.opacity);
  }

  // Build a single tiled cell as an SVG data URI. One mark per cell, repeated by
  // CSS background-repeat. Text uses currentColor of the host (resolved here to
  // the live computed color so it sits inside the data URI).
  _tile() {
    const g = this.gap;
    const rot = this.rotate;
    const image = this.getAttribute("image");
    const color = getComputedStyle(this).color || "#000";

    let body;
    if (image) {
      // Center a tiled image within the cell.
      const s = Math.round(g * 0.6);
      body = `<image href="${escAttr(image)}" x="${(g - s) / 2}" y="${(g - s) / 2}" width="${s}" height="${s}" transform="rotate(${rot} ${g / 2} ${g / 2})"/>`;
    } else {
      const text = this.getAttribute("text") || "";
      body = `<text x="50%" y="50%" fill="${escAttr(color)}" font-family="${FONT}" font-size="${this.fontSize}" text-anchor="middle" dominant-baseline="middle" transform="rotate(${rot} ${g / 2} ${g / 2})">${escText(text)}</text>`;
    }

    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" width="${g}" height="${g}" viewBox="0 0 ${g} ${g}">${body}</svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }
}

const FONT = "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif";

function escAttr(s) {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}
function escText(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const CSS = `
  :host { display: block; position: relative; color: var(--pura-fg); }
  [part="content"] { position: relative; z-index: 0; }
  [part="mark"] {
    position: absolute; inset: 0; z-index: 1;
    pointer-events: none; user-select: none;
    background-repeat: repeat;
  }
`;

define("pura-watermark", PuraWatermark, meta);
export { PuraWatermark };
