// Pure render for <pura-crosshair>. No DOM; safe on server (SSR/DSD) and client.
// Two absolute 1px hairlines (one horizontal, one vertical) cross at the cursor
// position inside the host area, positioned entirely by the CSS vars
// --pura-ch-x / --pura-ch-y which client JS updates on pointermove with a light
// lerp. An optional monospace coordinates readout trails the intersection.
//
// SSR / pre-JS: the overlay layer is opacity 0 and nothing is active; the page
// just shows the slotted content. The lines only appear while
// data-pura-crosshair-active is set (hover), which only client JS does.
// Reduced motion: the fade transition is gated behind no-preference (and the
// shared reset also flattens it); positioning in reduce mode snaps in JS.
import { EMPTY_SHIM } from "../base.js";

export function crosshairTemplate(el = EMPTY_SHIM) {
  const html = `
    <slot></slot>
    <div class="layer" part="layer" aria-hidden="true">
      <div class="line line-x" part="line-x"></div>
      <div class="line line-y" part="line-y"></div>
      <div class="coords" part="coords"></div>
    </div>
  `;

  const css = `
    :host {
      display: block;
      position: relative;
      overflow: hidden;
      --pura-ch-x: 50%;
      --pura-ch-y: 50%;
    }
    :host([hide-cursor]) { cursor: none; }

    .layer {
      position: absolute;
      inset: 0;
      pointer-events: none;
      opacity: 0;
      z-index: 2;
    }
    @media (prefers-reduced-motion: no-preference) {
      .layer { transition: opacity var(--pura-crosshair-fade, 0.15s) ease; }
    }
    :host([data-pura-crosshair-active]) .layer { opacity: 1; }

    .line {
      position: absolute;
      background: var(--pura-crosshair-color, var(--pura-accent, var(--pura-fg, currentColor)));
    }
    .line-x {
      left: 0;
      right: 0;
      top: var(--pura-ch-y);
      height: var(--pura-crosshair-thickness, 1px);
      transform: translateY(-50%);
    }
    .line-y {
      top: 0;
      bottom: 0;
      left: var(--pura-ch-x);
      width: var(--pura-crosshair-thickness, 1px);
      transform: translateX(-50%);
    }
    :host([dashed]) .line-x {
      background: repeating-linear-gradient(
        90deg,
        var(--pura-crosshair-color, var(--pura-accent, var(--pura-fg, currentColor))) 0 6px,
        transparent 6px 12px
      );
    }
    :host([dashed]) .line-y {
      background: repeating-linear-gradient(
        180deg,
        var(--pura-crosshair-color, var(--pura-accent, var(--pura-fg, currentColor))) 0 6px,
        transparent 6px 12px
      );
    }

    .coords {
      display: none;
      position: absolute;
      left: var(--pura-ch-x);
      top: var(--pura-ch-y);
      transform: translate(10px, 10px);
      font-family: var(--pura-font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
      font-size: var(--pura-crosshair-coords-size, 0.7rem);
      letter-spacing: 0.05em;
      line-height: 1;
      white-space: nowrap;
      color: var(--pura-crosshair-coords-color, var(--pura-crosshair-color, var(--pura-accent, var(--pura-fg, currentColor))));
    }
    :host([coords]) .coords { display: block; }
  `;

  return { html, css };
}
