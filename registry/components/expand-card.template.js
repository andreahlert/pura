// Pure render for <pura-expand-card>. No DOM; safe on server (SSR/DSD) and client.
// An App Store style card: in the closed state it is a normal card in the
// layout; open it and it morphs into a near-fullscreen overlay (a FLIP
// animation on top/left/width/height driven by the element), the backdrop
// fades in, and the detail content fades in after the morph. The host keeps
// its closed size inline while open, so the layout never jumps.
//
// SSR / pre-JS: the closed card renders; the detail stays hidden.
import { EMPTY_SHIM } from "../base.js";

export function expandCardTemplate(el = EMPTY_SHIM) {
  const html =
    `<div class="backdrop" part="backdrop"></div>` +
    `<div class="card" part="card" role="button" tabindex="0">` +
    `<slot name="card"></slot>` +
    `<div class="detail" part="detail"><slot></slot></div>` +
    `</div>`;

  const css = `
    :host { display: block; }
    .backdrop {
      position: fixed;
      inset: 0;
      z-index: var(--pura-expand-z, 998);
      background: var(--pura-expand-backdrop, color-mix(in srgb, var(--pura-fg) 40%, transparent));
      opacity: 0;
      pointer-events: none;
      transition: opacity 250ms ease;
    }
    :host([data-pura-expand-open]) .backdrop {
      opacity: 1;
      pointer-events: auto;
    }
    .card {
      box-sizing: border-box;
      height: 100%;
      background: var(--pura-bg);
      color: var(--pura-fg);
      border: 1px solid var(--pura-border);
      border-radius: var(--pura-expand-radius, 0.9rem);
      overflow: hidden;
      cursor: pointer;
    }
    .card:focus-visible {
      outline: 2px solid var(--pura-ring, var(--pura-fg));
      outline-offset: 2px;
    }
    :host([data-pura-expand-open]) .card {
      position: fixed;
      z-index: calc(var(--pura-expand-z, 998) + 1);
      cursor: auto;
      overflow: auto;
      box-shadow: 0 24px 80px color-mix(in srgb, var(--pura-fg) 30%, transparent);
    }
    .detail { display: none; }
    :host([data-pura-expand-open]) .detail {
      display: block;
      animation: pura-expand-fade 300ms ease 120ms backwards;
    }
    @keyframes pura-expand-fade {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: none; }
    }

    @media (prefers-reduced-motion: reduce) {
      .backdrop { transition: none; }
      :host([data-pura-expand-open]) .detail { animation: none; }
    }
  `;

  return { html, css };
}
