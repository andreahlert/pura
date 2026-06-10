// Pure render for <pura-image-trail>. No DOM; safe on server (SSR/DSD) and client.
// A trail zone: move the pointer across it and copies of the slotted images
// spawn under the cursor, pop in, drift and fade out — the awwwards
// image-trail hero move. The slotted images are the source list (hidden);
// spawned copies live in the .layer and are animated with one WAAPI animation
// each, so nothing runs per frame — only pointermove events.
//
// SSR / pre-JS: the zone renders empty (sources hidden); nothing spawns.
import { EMPTY_SHIM } from "../base.js";

export function imageTrailTemplate(el = EMPTY_SHIM) {
  const html =
    `<div class="layer" part="layer" aria-hidden="true"></div>` +
    `<div class="src" hidden><slot></slot></div>` +
    `<div class="content" part="content"><slot name="content"></slot></div>`;

  const css = `
    :host {
      display: block;
      position: relative;
      overflow: hidden;
      --pura-image-trail-size: 170px;
    }
    .layer {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 2;
    }
    .layer img {
      position: absolute;
      width: var(--pura-image-trail-size);
      height: auto;
      aspect-ratio: 3 / 4;
      object-fit: cover;
      border-radius: var(--pura-image-trail-radius, 6px);
      transform: translate(-50%, -50%);
      will-change: transform, opacity;
    }
    .content {
      position: relative;
      z-index: 1;
    }
  `;

  return { html, css };
}
