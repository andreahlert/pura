// Pure render for <pura-lens>. No DOM; safe on server (SSR/DSD) and client.
// The lens is a scaled copy of the slotted media (.zoomed, cloned in by the
// JS layer) clipped to a circle by clip-path: circle() at --pura-lens-x/--pura-lens-y,
// which the element updates on pointermove. transform-origin sits at the same
// point, so the pixel under the cursor stays fixed while its surroundings
// magnify, exactly like a physical loupe. A .ring outlines the circle.
//
// SSR / pre-JS: the lens layer is empty and fully transparent, so the page
// paints the plain media only; the lens is a client enhancement.
// Reduced motion: the lens is pointer-driven (no keyframes); only the fade-in
// transition is gated behind prefers-reduced-motion: no-preference.
import { EMPTY_SHIM } from "../base.js";

function safeNum(raw, fallback) {
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export function lensTemplate(el = EMPTY_SHIM) {
  const zoom = safeNum(el.getAttribute("zoom"), 2);
  const size = safeNum(el.getAttribute("size"), 160);

  const html =
    `<div class="media" part="media"><slot></slot></div>` +
    `<div class="lens" part="lens" aria-hidden="true"><div class="zoomed" part="zoomed"></div></div>` +
    `<div class="ring" part="ring" aria-hidden="true"></div>`;

  const css = `
    :host {
      position: relative;
      display: inline-block;
      overflow: hidden;
      cursor: var(--pura-lens-cursor, crosshair);
      --pura-lens-zoom: ${zoom};
      --pura-lens-size: ${size}px;
      --pura-lens-x: 50%;
      --pura-lens-y: 50%;
    }
    .media { display: block; }
    ::slotted(img), ::slotted(video) {
      display: block;
      width: 100%;
      height: auto;
    }

    /* Circular window over the magnified copy, centred on the pointer. */
    .lens {
      position: absolute;
      inset: 0;
      overflow: hidden;
      pointer-events: none;
      opacity: 0;
      clip-path: circle(calc(var(--pura-lens-size) / 2) at var(--pura-lens-x) var(--pura-lens-y));
      z-index: 1;
    }
    /* The scaled copy: origin at the pointer keeps that point fixed. */
    .zoomed {
      position: absolute;
      inset: 0;
      transform: scale(var(--pura-lens-zoom));
      transform-origin: var(--pura-lens-x) var(--pura-lens-y);
      will-change: transform;
    }
    .zoomed img, .zoomed video {
      display: block;
      width: 100%;
      height: auto;
    }

    /* Outline drawn as a sibling so the clip-path does not cut the border. */
    .ring {
      position: absolute;
      left: calc(var(--pura-lens-x) - var(--pura-lens-size) / 2);
      top: calc(var(--pura-lens-y) - var(--pura-lens-size) / 2);
      width: var(--pura-lens-size);
      height: var(--pura-lens-size);
      border-radius: 50%;
      border: var(--pura-lens-ring, 2px solid rgba(255, 255, 255, 0.65));
      box-shadow: var(--pura-lens-shadow, 0 6px 24px rgba(0, 0, 0, 0.3));
      pointer-events: none;
      opacity: 0;
      z-index: 2;
    }

    :host([data-pura-lens-active]) .lens,
    :host([data-pura-lens-active]) .ring {
      opacity: 1;
    }

    @media (prefers-reduced-motion: no-preference) {
      .lens, .ring { transition: opacity 0.18s ease; }
    }
  `;

  return { html, css };
}
