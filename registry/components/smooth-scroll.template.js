// Pure render for <pura-smooth-scroll>. No DOM; safe on server (SSR/DSD) and client.
// Progressive enhancement is the whole contract: this template renders the
// slotted page content in normal flow (native scroll fully intact) plus an
// empty spacer. Only when the client JS sets data-pura-ss-active does the
// content become a fixed, transform-driven layer while the spacer (sized by
// JS to the real content) keeps the document height so the native scrollbar,
// keyboard and touch scrolling keep working untouched.
//
// SSR / pre-JS: plain in-flow content, zero visual difference from no wrapper.
// Reduced motion: the static layout is forced even if the attribute is set.
import { EMPTY_SHIM } from "../base.js";

export function smoothScrollTemplate(el = EMPTY_SHIM) {
  const html = `
    <div class="spacer" part="spacer" aria-hidden="true"></div>
    <div class="content" part="content"><slot></slot></div>
  `;

  const css = `
    :host { display: block; }
    .spacer { height: 0; pointer-events: none; }

    @media (prefers-reduced-motion: no-preference) {
      :host([data-pura-ss-active]) .content {
        position: fixed;
        top: 0;
        left: 0;
        width: var(--pura-smooth-scroll-width, 100%);
        z-index: var(--pura-smooth-scroll-z, auto);
        will-change: transform;
        /* the layer spans the viewport; only the real children take hits */
        pointer-events: none;
      }
      :host([data-pura-ss-active]) .content ::slotted(*) {
        pointer-events: auto;
      }
      :host([data-pura-ss-active][data-pura-ss-horizontal]) .content {
        width: var(--pura-smooth-scroll-width, max-content);
        min-width: 100%;
        min-height: var(--pura-smooth-scroll-min-height, 100vh);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .content {
        position: static !important;
        transform: none !important;
      }
      .spacer { height: 0 !important; }
    }
  `;

  return { html, css };
}
