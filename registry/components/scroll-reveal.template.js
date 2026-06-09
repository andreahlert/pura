// Pure render for <pura-scroll-reveal>. No DOM; safe on server (SSR/DSD) and
// client. The reveal is driven by the native scroll-driven-animation timeline
// `animation-timeline: view()` so the entrance is *scrubbed* to the element's
// progress through the viewport, with no IntersectionObserver and no per-frame
// JS. When the engine lacks scroll timelines (or under reduced motion) the
// keyframed animation never applies, so .content sits at its natural visible
// state (opacity 1, no transform) from first paint.
import { EMPTY_SHIM } from "../base.js";

export function scrollRevealTemplate(el = EMPTY_SHIM) {
  const html = `<div class="content" part="content"><slot></slot></div>`;
  return { html, css: SCROLL_REVEAL_CSS };
}

export const SCROLL_REVEAL_CSS = `
  :host {
    display: block;
    /* Defaults; the element overrides per-attribute on the host. */
    --pura-sr-distance: 28px;
    --pura-sr-blur: 8px;
    --pura-sr-range: entry 0% cover 38%;
  }

  .content { will-change: opacity, transform, filter; }

  @keyframes pura-sr-fade {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes pura-sr-slide-up {
    from { opacity: 0; transform: translateY(var(--pura-sr-distance)); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pura-sr-slide-down {
    from { opacity: 0; transform: translateY(calc(-1 * var(--pura-sr-distance))); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pura-sr-slide-left {
    from { opacity: 0; transform: translateX(var(--pura-sr-distance)); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes pura-sr-slide-right {
    from { opacity: 0; transform: translateX(calc(-1 * var(--pura-sr-distance))); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes pura-sr-zoom {
    from { opacity: 0; transform: scale(0.9); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes pura-sr-blur {
    from { opacity: 0; filter: blur(var(--pura-sr-blur)); }
    to   { opacity: 1; filter: blur(0); }
  }

  /* Scoped to engines that actually support scroll timelines AND to users who
     have not asked for reduced motion. Outside this block .content keeps its
     default (fully visible) state, so the content is never gated on a feature
     or a timeline that will not run. */
  @supports (animation-timeline: view()) {
    @media (prefers-reduced-motion: no-preference) {
      .content {
        animation: var(--pura-sr-anim, pura-sr-fade) both linear;
        animation-timeline: view();
        animation-range: var(--pura-sr-range);
      }
    }
  }
`;
