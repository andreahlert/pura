// Pure render for <pura-icon>. No DOM; SSR/DSD + client safe.
// path/d/label/size/stroke-width derive from attributes. Under EMPTY_SHIM no
// attributes are set, so it degrades to the slotted-svg passthrough branch with
// aria-hidden and the default size token.
import { EMPTY_SHIM } from "../base.js";

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

export function iconTemplate(el = EMPTY_SHIM) {
  // size getter: attribute or default token.
  const size = el.getAttribute("size") || "1.25rem";
  // strokeWidth getter: attribute when non-empty, else "2".
  const sw = el.getAttribute("stroke-width");
  const strokeWidth = sw != null && sw !== "" ? sw : "2";

  const d = el.getAttribute("path") || el.getAttribute("d");
  const label = el.getAttribute("label");
  const a11y = label
    ? `role="img" aria-label="${esc(label)}"`
    : `aria-hidden="true"`;

  // Inline-svg branch when a path is given; otherwise pass through a slotted svg.
  const inner = d
    ? `<svg part="svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="${esc(strokeWidth)}" stroke-linecap="round"
            stroke-linejoin="round" focusable="false" ${a11y}>
           <path d="${esc(d)}"/>
         </svg>`
    : `<span part="svg" class="slotwrap" ${a11y}><slot></slot></span>`;

  return { html: inner, css: CSS.replaceAll("SIZE", cssLen(size)) };
}
