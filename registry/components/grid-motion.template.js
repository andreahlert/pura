// Pure render for <pura-grid-motion>. No DOM; safe on server (SSR/DSD) and
// client. Paints an oversized centered grid of slotted cells: the grid is
// wider than the host (--pura-grid-motion-overflow) so rows can travel
// laterally without exposing their ends; the host clips the excess. The
// per-row translateX is applied by the client rAF loop on the slotted cells
// themselves; SSR and no-JS render the grid perfectly static and centered.
//
// Reduced motion: cells are pinned in place with !important (beats the inline
// transforms the JS loop writes), on top of the JS never binding at all.
import { EMPTY_SHIM } from "../base.js";

export function gridMotionTemplate(el = EMPTY_SHIM) {
  const colsRaw = parseInt(el.getAttribute("columns") || "", 10);
  const columns = Number.isFinite(colsRaw) && colsRaw >= 1 && colsRaw <= 12 ? colsRaw : 4;
  const tiltRaw = parseFloat(el.getAttribute("tilt") || "");
  const tilt = Number.isFinite(tiltRaw) && tiltRaw >= -45 && tiltRaw <= 45 ? tiltRaw : 0;

  const html = `<div class="viewport" part="viewport"><div class="grid" part="grid"><slot></slot></div></div>`;

  const css = `
    :host {
      display: block;
      position: relative;
      overflow: hidden;
      background: var(--pura-grid-motion-bg, transparent);
    }
    .viewport {
      position: absolute;
      inset: 0;
      overflow: hidden;
      display: grid;
      place-items: center;
    }
    /* Oversized so row travel never exposes the grid's edges. */
    .grid {
      width: var(--pura-grid-motion-overflow, 160%);
      flex: none;
      display: grid;
      grid-template-columns: repeat(${columns}, 1fr);
      gap: var(--pura-grid-motion-gap, 1rem);
      ${tilt ? `transform: rotate(${tilt}deg);` : ""}
    }
    ::slotted(*) {
      width: 100%;
      aspect-ratio: var(--pura-grid-motion-ratio, 16 / 11);
      border-radius: var(--pura-grid-motion-radius, 10px);
      overflow: hidden;
      will-change: transform;
    }
    ::slotted(img), ::slotted(video) {
      display: block;
      object-fit: cover;
    }
    /* Hard guarantee: even if a transform was written before the preference
       flipped, cells stay pinned under reduced motion. */
    @media (prefers-reduced-motion: reduce) {
      ::slotted(*) {
        transform: none !important;
        will-change: auto;
      }
    }
  `;

  return { html, css };
}
