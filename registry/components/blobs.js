// <pura-blobs> — gooey lava-lamp blobs: organic circles that drift slowly and
// fuse together when they approach (metaball effect) behind the slotted
// content, in the style of React Bits' Meta Balls. The fusing comes from an
// inline SVG goo filter (feGaussianBlur + feColorMatrix alpha threshold) over
// one blob container; the drift is pure CSS @keyframes. Blob positions, sizes,
// colors and timings are deterministic index math in the pure template (never
// Math.random), so the server and client paint the same field and the effect
// needs no client JS at all.
//
// Attributes:
//   count — number of blobs (default 5, capped at 12).
//   speed — base drift cycle in seconds (default 18; each blob varies around it).
//   goo   — goo filter blur strength in px (default 14, capped at 40).
//
// Tokens: --pura-blobs-color-1/2/3 (blob palette), --pura-blobs-size (base
//   blob diameter, default 10rem), --pura-blobs-opacity (default 0.85).
//
// Slots: default — content layered above the blob field.
//
// Reduced motion: the drift keyframes are gated behind
//   @media (prefers-reduced-motion: no-preference); under reduce the blobs
//   hold still in their scattered layout, a static presentable backdrop.
//
// Agent-native layer: each instance registers in window.__puraBlobss keyed by
//   data-pura-id and mirrors data-pura-blobs-count / -speed / -goo.
import { PuraElement, define } from "../base.js";
import meta from "./blobs.meta.js";
import { blobsTemplate } from "./blobs.template.js";

let uid = 0;

function registry() {
  return (window.__puraBlobss ||= new Map());
}

class PuraBlobs extends PuraElement {
  static observedAttributes = ["count", "speed", "goo"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-blobs-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);
    this._paint();
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (!this.shadowRoot) return;
    this._paint();
  }

  _paint() {
    const { html, css } = blobsTemplate(this);
    this.render(html, css);
    this.setAttribute("data-pura-blobs-count", this.getAttribute("count") || "5");
    this.setAttribute("data-pura-blobs-speed", this.getAttribute("speed") || "18");
    this.setAttribute("data-pura-blobs-goo", this.getAttribute("goo") || "14");
  }
}

define("pura-blobs", PuraBlobs, meta);
export { PuraBlobs };
