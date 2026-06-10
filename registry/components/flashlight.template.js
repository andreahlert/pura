// Pure render for <pura-flashlight>. No DOM; safe on server (SSR/DSD) and client.
// A hidden "reveal" layer sits over the base content and is clipped by a
// radial-gradient mask-image centred on --pura-flashlight-x / --pura-flashlight-y,
// which the element updates on pointermove. The server paints the resting
// state: with resting="closed" (default) only the base layer is visible; with
// resting="center" the reveal layer shows through a centred beam. Either way
// the page looks finished before any JS runs.
//
// Reduced motion: the reveal layer renders fully visible (final state), so
// nothing is gated behind pointer movement.
import { EMPTY_SHIM } from "../base.js";

export function flashlightTemplate(el = EMPTY_SHIM) {
  const rawSize = el.getAttribute("size");
  const size = !rawSize ? "220px" : /^\d+(\.\d+)?$/.test(rawSize) ? `${rawSize}px` : rawSize;
  const s = parseFloat(el.getAttribute("softness"));
  const softness = Number.isFinite(s) && s >= 0 && s <= 1 ? s : 0.25;
  const inner = Math.round((1 - softness) * 100);
  const centered = el.getAttribute("resting") === "center";

  const beam = `radial-gradient(
      var(--pura-flashlight-size, ${size}) circle at var(--pura-flashlight-x, 50%) var(--pura-flashlight-y, 50%),
      #000 ${inner}%,
      transparent 100%
    )`;

  const html = `
    <div class="base" part="base"><slot></slot></div>
    <div class="reveal" part="reveal"><slot name="reveal"></slot></div>
    <span class="light" part="light" aria-hidden="true"></span>
  `;

  const css = `
    :host {
      position: relative;
      display: block;
      overflow: hidden;
      isolation: isolate;
      border-radius: var(--pura-flashlight-radius, 0px);
    }

    .base {
      position: relative;
      z-index: 1;
    }

    /* Hidden layer, clipped to the beam that follows the pointer. */
    .reveal {
      position: absolute;
      inset: 0;
      z-index: 2;
      pointer-events: none;
      -webkit-mask-image: ${beam};
      mask-image: ${beam};
      opacity: ${centered ? "1" : "0"};
    }
    ::slotted([slot="reveal"]) {
      width: 100%;
      height: 100%;
    }

    /* Soft halo so the beam reads as light even over flat content. */
    .light {
      position: absolute;
      inset: 0;
      z-index: 3;
      pointer-events: none;
      mix-blend-mode: screen;
      opacity: 0;
      background: radial-gradient(
        calc(var(--pura-flashlight-size, ${size}) * 0.85) circle at var(--pura-flashlight-x, 50%) var(--pura-flashlight-y, 50%),
        var(--pura-flashlight-glow, rgba(255, 255, 255, 0.10)),
        transparent 100%
      );
    }

    @media (prefers-reduced-motion: no-preference) {
      .reveal, .light { transition: opacity 0.35s ease; }
      :host(:hover) .reveal,
      :host([data-pura-flashlight-state="tracking"]) .reveal { opacity: 1; }
      :host(:hover) .light,
      :host([data-pura-flashlight-state="tracking"]) .light { opacity: 1; }
    }

    /* Reduced motion: settle on the final state, no pointer dependence. */
    @media (prefers-reduced-motion: reduce) {
      .reveal { opacity: 1; }
      .light { opacity: 0; }
    }
  `;

  return { html, css };
}
