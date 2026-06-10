// Pure render for <pura-pinch-zoom>. No DOM; safe on server (SSR/DSD) and client.
// A clipping frame around a transformable stage: client JS drives the stage's
// translate() + scale() from pinch/pan pointer math. The frame allows vertical
// page scroll at rest (touch-action: pan-y) and locks to the gesture once
// zoomed (data-pura-pz-zoomed flips touch-action: none).
//
// SSR / pre-JS: the slotted media renders normally at scale 1.
// Reduced motion: the programmatic zoom transition is gated; gestures are
// input-driven and unaffected.
import { EMPTY_SHIM } from "../base.js";

export function pinchZoomTemplate(el = EMPTY_SHIM) {
  const html = `
    <div class="frame" part="frame">
      <div class="stage" part="stage"><slot></slot></div>
    </div>
  `;

  const css = `
    :host { display: block; }
    .frame {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-radius: var(--pura-pinch-zoom-radius, 0px);
      background: var(--pura-pinch-zoom-bg, transparent);
      touch-action: pan-y;
      user-select: none;
      -webkit-user-select: none;
      cursor: zoom-in;
      outline-offset: 2px;
    }
    :host([data-pura-pz-zoomed]) .frame {
      touch-action: none;
      cursor: grab;
    }
    :host([data-pura-pz-zoomed]) .frame:active { cursor: grabbing; }
    :host([disabled]) .frame {
      touch-action: auto;
      cursor: default;
    }
    .stage {
      width: 100%;
      height: 100%;
      transform-origin: 50% 50%;
      will-change: transform;
    }
    ::slotted(img), ::slotted(video) {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: contain;
      -webkit-user-drag: none;
    }

    /* eased programmatic zoom (double tap, keyboard, API); gestures are not
       animated, they follow the pointers 1:1 */
    @media (prefers-reduced-motion: no-preference) {
      .stage.anim {
        transition: transform var(--pura-pinch-zoom-duration, 300ms) cubic-bezier(0.22, 1, 0.36, 1);
      }
    }
  `;

  return { html, css };
}
