// Pure render for <pura-direction-hover>. No DOM; safe on server (SSR/DSD)
// and client. A direction-aware hover card: the overlay caption slides in
// from the edge the cursor entered through and slides out through the exit
// edge. The client writes data-dir (entry/exit quadrant) and the
// data-pura-dh-active flag on the host; everything else is CSS transitions.
//
// SSR / pre-JS: the card renders at rest, the overlay is parked off-canvas
// behind overflow: hidden, so nothing covers the media. Keyboard users get
// the overlay via :focus-within even before JS loads.
// Reduced motion: the overlay shows and hides instantly, no slide.
import { EMPTY_SHIM } from "../base.js";

export function directionHoverTemplate(el = EMPTY_SHIM) {
  const html =
    `<div class="frame" part="frame">` +
    `<slot></slot>` +
    `<div class="overlay" part="overlay"><slot name="overlay"></slot></div>` +
    `</div>`;

  const css = `
    :host {
      display: block;
      --pura-dh-t: var(--pura-direction-hover-duration, 350ms)
        var(--pura-direction-hover-easing, cubic-bezier(0.25, 0.46, 0.45, 0.94));
    }
    .frame {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-radius: var(--pura-direction-hover-radius, 0.75rem);
      isolation: isolate;
    }
    ::slotted(img), ::slotted(video) {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .overlay {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: var(--pura-direction-hover-padding, 1.25rem);
      background: var(--pura-direction-hover-bg,
        linear-gradient(to top, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.3) 55%, rgba(0, 0, 0, 0.05)));
      color: var(--pura-direction-hover-fg, #fff);
      /* at rest (and on SSR) the overlay is parked off-canvas below */
      transform: translateY(101%);
      transition: transform var(--pura-dh-t);
      pointer-events: none;
    }

    /* parking spots: data-dir holds the entry or exit edge */
    :host([data-dir="top"]) .overlay { transform: translateY(-101%); }
    :host([data-dir="right"]) .overlay { transform: translateX(101%); }
    :host([data-dir="bottom"]) .overlay { transform: translateY(101%); }
    :host([data-dir="left"]) .overlay { transform: translateX(-101%); }

    :host([data-pura-dh-active]) .overlay,
    :host(:focus-within) .overlay {
      transform: none;
      pointer-events: auto;
    }

    @media (prefers-reduced-motion: reduce) {
      .overlay { transition: none; }
    }
  `;

  return { html, css };
}
