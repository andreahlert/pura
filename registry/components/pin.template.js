// Pure render for <pura-pin>. No DOM; safe on server (SSR/DSD) and client. The
// pin (position: sticky) and the horizontal scrub (a native scroll-driven
// animation bound to the outer's view-timeline) live inside an @supports gate, so
// where scroll timelines are missing or reduced motion is set the panels simply
// lay out as a horizontally scrollable row, fully usable with no JS. The panel
// count drives the scroll length via --pura-pin-count, set by the element.
import { EMPTY_SHIM } from "../base.js";

export function pinTemplate(el = EMPTY_SHIM) {
  const html = `
    <div class="pin-outer" part="outer">
      <div class="pin-sticky" part="sticky">
        <div class="pin-track" part="track"><slot></slot></div>
      </div>
    </div>`;
  return { html, css: PIN_CSS };
}

export const PIN_CSS = `
  :host {
    display: block;
    --pura-pin-count: 3;
  }

  /* Fallback (no scroll timelines / reduced motion): a normal horizontal scroller.
     Usable everywhere; no pin, no scrub. */
  .pin-track {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    height: 70vh;
  }
  .pin-track ::slotted(*) {
    flex: 0 0 100%;
    scroll-snap-align: start;
    min-width: 0;
  }

  @supports (animation-timeline: scroll()) {
    @media (prefers-reduced-motion: no-preference) {
      .pin-outer {
        position: relative;
        height: calc(var(--pura-pin-count) * 100vh);
        view-timeline-name: --pura-pin;
        view-timeline-axis: block;
      }
      .pin-sticky {
        position: sticky;
        top: 0;
        height: 100vh;
        overflow: hidden;
      }
      .pin-track {
        height: 100%;
        overflow: visible;
        scroll-snap-type: none;
        animation: pura-pin-scrub linear both;
        animation-timeline: --pura-pin;
        animation-range: contain 0% contain 100%;
        will-change: transform;
      }
      .pin-track ::slotted(*) {
        flex: 0 0 100vw;
        height: 100%;
        scroll-snap-align: none;
      }
    }
  }

  @keyframes pura-pin-scrub {
    to { transform: translateX(calc(-100% + 100vw)); }
  }
`;
