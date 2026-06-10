// Pure render for <pura-clip-reveal>. No DOM; safe on server (SSR/DSD) and client.
// The slotted content is revealed by an animating clip-path wipe: an inset()
// slides open from one edge, or a circle() irises out from the center. Both
// clip-path forms interpolate natively, and the from/to values are baked into
// the CSS as literals.
//
// scrub (default): ties the wipe 1:1 to a scroll-driven timeline.
// view / load: transitions the wipe once.
// SSR / pre-JS: the content sits fully revealed (nothing hidden without script);
// the hide/reveal only engages once a trigger attribute applies.
import { EMPTY_SHIM } from "../base.js";

// direction -> [hidden clip, revealed clip]
const CLIPS = {
  up: ["inset(100% 0 0 0)", "inset(0 0 0 0)"],
  down: ["inset(0 0 100% 0)", "inset(0 0 0 0)"],
  left: ["inset(0 100% 0 0)", "inset(0 0 0 0)"],
  right: ["inset(0 0 0 100%)", "inset(0 0 0 0)"],
  circle: ["circle(0% at 50% 50%)", "circle(120% at 50% 50%)"],
};

export function clipDirection(el = EMPTY_SHIM) {
  const v = el.getAttribute("direction");
  return Object.prototype.hasOwnProperty.call(CLIPS, v) ? v : "up";
}

export function clipRevealTemplate(el = EMPTY_SHIM) {
  const [hidden, shown] = CLIPS[clipDirection(el)];

  const html = `<div class="frame" part="frame"><slot></slot></div>`;

  const css = `
    :host {
      display: block;
      --pura-cr-dur: 0.9s;
      --pura-cr-ease: cubic-bezier(0.65, 0, 0.35, 1);
    }
    .frame { clip-path: ${shown}; }

    /* Any trigger first hides the content; only then does it wipe open. */
    :host([data-pura-cr-anim]) .frame,
    :host([data-pura-cr-scrub]) .frame {
      clip-path: ${hidden};
    }

    /* view / load: transition the wipe open. */
    :host([data-pura-cr-anim]) .frame {
      transition: clip-path var(--pura-cr-dur) var(--pura-cr-ease);
    }
    :host([data-pura-cr-in]) .frame {
      clip-path: ${shown};
    }

    @keyframes pura-clip-reveal {
      to { clip-path: ${shown}; }
    }

    /* scrub: tie the wipe 1:1 to a scroll-driven timeline, no JS frame. */
    @supports (animation-timeline: scroll()) {
      @media (prefers-reduced-motion: no-preference) {
        :host([data-pura-cr-scrub]) .frame {
          animation: pura-clip-reveal linear both;
          animation-timeline: var(--pura-cr-timeline, view());
          animation-range: var(--pura-cr-range, cover 0% cover 50%);
        }
      }
    }

    /* Reduced motion: never scrub. Show the content revealed. */
    @media (prefers-reduced-motion: reduce) {
      :host([data-pura-cr-scrub]) .frame { clip-path: ${shown}; }
    }
  `;

  return { html, css };
}
