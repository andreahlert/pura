// Pure render for <pura-sortable>. No DOM; safe on server (SSR/DSD) and client.
// The drag-to-reorder list: items are the light-DOM children of the slotted
// <ul>/<ol> (or of the host itself), so the SSR paint is just the static
// semantic list. All drag behavior, FLIP tweens, and lift styling are client
// progressive enhancement; without JS the list reads and renders normally.
//
// Tokens (consumed by the client at lift time, fallbacks baked in):
//   --pura-sortable-drag-scale  (1.02)
//   --pura-sortable-drag-shadow (0 8px 24px rgba(0, 0, 0, 0.18))
//   --pura-sortable-drag-z      (10)
// Reduced motion: no continuous animation exists here; the FLIP engine and the
// drop snap no-op at the JS layer, and the base reset zeroes any transitions.
import { EMPTY_SHIM } from "../base.js";

export function sortableTemplate(el = EMPTY_SHIM) {
  const html = `<div class="list" part="list"><slot></slot></div>`;

  const css = `
    :host {
      display: block;
      --pura-sortable-drag-scale: 1.02;
      --pura-sortable-drag-z: 10;
    }
    .list { display: block; position: relative; }

    /* a slotted ul/ol paints as a clean stack of items, no markers */
    ::slotted(ul), ::slotted(ol) {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    /* while a pointer drag is live, stop text selection under the pointer */
    :host([data-pura-sortable-dragging="true"]) {
      user-select: none;
      -webkit-user-select: none;
    }
    :host([data-pura-sortable-dragging="true"]) .list { cursor: grabbing; }
  `;

  return { html, css };
}
