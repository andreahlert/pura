// Pure render for <pura-hide-on-scroll>. No DOM; safe on server (SSR/DSD) and client.
// A sticky (or fixed) bar wrapper that slides out of view when the user scrolls
// down and slides back in when they scroll up. The JS layer only flips
// data-direction / data-pura-hos-* attributes on the host; all motion is CSS
// transitions declared here, so the bar transitions transform (and, in shrink
// mode, padding) entirely off the main thread.
//
// SSR / pre-JS: the bar renders visible, expanded and sticky. With no JS it
// simply stays pinned, which is a perfectly presentable static fallback.
// Reduced motion: transitions collapse to a hard cut (near-zero duration).
import { EMPTY_SHIM } from "../base.js";

export function hideOnScrollTemplate(el = EMPTY_SHIM) {
  const html = `<div class="bar" part="bar"><slot></slot></div>`;

  const css = `
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: var(--pura-hide-on-scroll-z, 100);
      transition: transform
        var(--pura-hide-on-scroll-duration, 0.3s)
        var(--pura-hide-on-scroll-ease, cubic-bezier(0.4, 0, 0.2, 1));
    }
    :host([position="bottom"]) { top: auto; bottom: 0; }
    :host([fixed]) { position: fixed; left: 0; right: 0; }

    /* hidden state: slide out through the nearest edge */
    :host([data-pura-hos-hidden]) { transform: translateY(-100%); }
    :host([position="bottom"][data-pura-hos-hidden]) { transform: translateY(100%); }

    .bar {
      background: var(--pura-hide-on-scroll-bg, transparent);
    }

    /* shrink variant: the bar condenses after the threshold */
    :host([shrink]) .bar {
      padding-block: var(--pura-hide-on-scroll-padding, 16px);
      transition: padding-block
        var(--pura-hide-on-scroll-duration, 0.3s)
        var(--pura-hide-on-scroll-ease, cubic-bezier(0.4, 0, 0.2, 1)),
        box-shadow
        var(--pura-hide-on-scroll-duration, 0.3s)
        var(--pura-hide-on-scroll-ease, cubic-bezier(0.4, 0, 0.2, 1));
    }
    :host([shrink][data-pura-hos-shrunk]) .bar {
      padding-block: var(--pura-hide-on-scroll-shrink-padding, 6px);
      box-shadow: var(--pura-hide-on-scroll-shrink-shadow, 0 2px 12px rgb(0 0 0 / 0.12));
    }

    /* reduced motion: state changes become a hard cut. The shared reset only
       covers shadow descendants, so the host transition is handled here. */
    @media (prefers-reduced-motion: reduce) {
      :host { transition-duration: 0.01ms !important; }
    }
  `;

  return { html, css };
}
