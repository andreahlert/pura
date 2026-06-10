// Pure render for <pura-text-fill>. No DOM; safe on server (SSR/DSD) and client.
// Two stacked copies of the text: .base is the faint resting layer, .top is the
// full-color layer clipped by an animating inset() that slides open along the
// fill axis — the motion.dev "Fill text" move with zero per-frame JS. Both
// layers hold identical text so they lay out identically; clip-path (not
// background-clip: text) is used because background-clip cannot paint slotted
// glyphs and breaks currentColor (the transparent text color would feed back
// into the gradient).
//
// scrub (default): ties the fill 1:1 to a scroll-driven timeline.
// view / load: transitions the fill once.
// SSR / pre-JS: the slotted text renders in its normal color; the dual-layer
// copy only shows once the JS has mirrored the text (data-pura-tf-ready).
import { EMPTY_SHIM } from "../base.js";

// direction -> [unfilled clip, filled clip] for the .top layer
const CLIPS = {
  right: ["inset(0 100% 0 0)", "inset(0 0 0 0)"],
  left: ["inset(0 0 0 100%)", "inset(0 0 0 0)"],
  down: ["inset(0 0 100% 0)", "inset(0 0 0 0)"],
  up: ["inset(100% 0 0 0)", "inset(0 0 0 0)"],
};

export function fillDirection(el = EMPTY_SHIM) {
  const v = el.getAttribute("direction");
  return Object.prototype.hasOwnProperty.call(CLIPS, v) ? v : "right";
}

export function textFillTemplate(el = EMPTY_SHIM) {
  const [hidden, shown] = CLIPS[fillDirection(el)];

  const html = `<span class="wrap" part="text" aria-hidden="true"><span class="base"></span><span class="top"></span></span><span class="a11y"><slot></slot></span>`;

  const css = `
    :host {
      display: block;
      --pura-tf-dur: 1.1s;
      --pura-tf-ease: cubic-bezier(0.65, 0, 0.35, 1);
    }
    .wrap { display: none; position: relative; }
    :host([data-pura-tf-ready]) .wrap { display: block; }
    :host([data-pura-tf-ready]) .a11y {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
      border: 0;
    }
    .base {
      color: var(--pura-text-fill-base, color-mix(in srgb, currentColor 18%, transparent));
    }
    .top {
      position: absolute;
      inset: 0;
      color: var(--pura-text-fill-color, currentColor);
      clip-path: ${shown};
    }

    /* Any trigger first empties the fill; only then does it slide open. */
    :host([data-pura-tf-scrub]) .top,
    :host([data-pura-tf-anim]) .top {
      clip-path: ${hidden};
    }

    /* view / load: transition the fill once. */
    :host([data-pura-tf-anim]) .top {
      transition: clip-path var(--pura-tf-dur) var(--pura-tf-ease);
    }
    :host([data-pura-tf-in]) .top {
      clip-path: ${shown};
    }

    @keyframes pura-text-fill {
      to { clip-path: ${shown}; }
    }

    /* scrub: tie the fill 1:1 to a scroll-driven timeline, no JS frame. */
    @supports (animation-timeline: scroll()) {
      @media (prefers-reduced-motion: no-preference) {
        :host([data-pura-tf-scrub]) .top {
          animation: pura-text-fill linear both;
          animation-timeline: var(--pura-tf-timeline, view());
          animation-range: var(--pura-tf-range, cover 0% cover 60%);
        }
      }
    }

    /* Reduced motion: never animate. Land filled. */
    @media (prefers-reduced-motion: reduce) {
      :host([data-pura-tf-scrub]) .top,
      :host([data-pura-tf-anim]) .top {
        clip-path: ${shown};
        transition: none;
      }
    }
  `;

  return { html, css };
}
