// Pure render for <pura-scroll-loop>. No DOM; safe on server (SSR/DSD) and client.
// Infinite looping scroll: the track holds an aria-hidden head clone, the real
// slotted content, and an aria-hidden tail clone. Client JS fills the clones
// and repositions the scroll offset when it crosses a seam, so the wrap jump
// lands on the exact same pixel and is invisible.
//
// SSR / pre-JS: the clones are empty and hidden, so the markup is a single
// copy inside a normal scroll container with a regular scrollbar.
// Reduced motion: the loop never activates; the same single-copy fallback.
import { EMPTY_SHIM } from "../base.js";

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

export function scrollLoopTemplate(el = EMPTY_SHIM) {
  const label = esc(el.getAttribute("label") || "Looping scroll gallery");

  const html = `<div class="viewport" part="viewport" role="region" aria-label="${label}" tabindex="0">
         <div class="track" part="track">
           <div class="copy clone clone-head" part="clone-head" aria-hidden="true"></div>
           <div class="copy original" part="content"><slot></slot></div>
           <div class="copy clone clone-tail" part="clone-tail" aria-hidden="true"></div>
         </div>
       </div>`;

  const css = `
    :host {
      display: block;
      height: var(--pura-scroll-loop-height, 24rem);
    }
    .viewport {
      width: 100%;
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      overflow-anchor: none;        /* scroll anchoring would fight the seam jump */
      scroll-behavior: auto;        /* the wrap reposition must be instant */
      overscroll-behavior: var(--pura-scroll-loop-overscroll, contain);
      border-radius: var(--pura-scroll-loop-radius, 0);
      scrollbar-width: thin;
      scrollbar-color: var(--pura-border-strong) transparent;
    }
    .viewport:focus-visible {
      outline: var(--pura-scroll-loop-ring, 2px solid currentColor);
      outline-offset: 2px;
    }
    :host([axis="x"]) .viewport { overflow-x: auto; overflow-y: hidden; }

    .track { display: block; min-height: 100%; }
    /* flow-root keeps child margins inside each copy, so all three copies
       measure exactly the same and the seam math stays pixel-exact */
    .copy { display: flow-root; }

    :host([axis="x"]) .track {
      display: flex;
      flex-wrap: nowrap;
      width: max-content;
      height: 100%;
      min-height: 0;
    }
    :host([axis="x"]) .copy {
      display: flex;
      flex-wrap: nowrap;
      align-items: stretch;
      flex: none;
      height: 100%;
    }

    /* Clones exist only while the loop runs; SSR / pre-JS / disabled /
       reduced motion all paint a single copy with normal, finite scroll. */
    .clone { display: none; }
    @media (prefers-reduced-motion: no-preference) {
      :host([data-pura-loop-active]) .clone { display: flow-root; }
      :host([axis="x"][data-pura-loop-active]) .clone { display: flex; }
      /* a looping scroller has no meaningful scrollbar position */
      :host([data-pura-loop-active]) .viewport { scrollbar-width: none; }
      :host([data-pura-loop-active]) .viewport::-webkit-scrollbar { display: none; }
    }
  `;

  return { html, css };
}
