// Pure render for <pura-text-highlighter>. No DOM; safe on server (SSR/DSD)
// and client. The marker-pen sweep: the slotted text gets a no-repeat
// linear-gradient background whose background-size grows from 0% to 100%
// along the sweep axis, like a highlighter pen dragging across the words.
// The text itself is never duplicated or moved, so it stays selectable and
// accessible; box-decoration-break: clone keeps the pen ink continuous when
// the highlighted run wraps across lines.
//
// view / load: the sweep is a single background-size transition, fired by the
// in-view attribute the JS sets (IntersectionObserver fallback class).
// scrub: ties the sweep 1:1 to a scroll-driven timeline, zero per-frame JS.
// SSR / pre-JS: the full highlight is already painted, the page looks
// finished without JS. Reduced motion: lands fully highlighted, no sweep.
import { EMPTY_SHIM } from "../base.js";

// direction -> background anchor: the edge the ink grows out from.
const ANCHORS = { right: "0%", left: "100%" };

export function highlightDirection(el = EMPTY_SHIM) {
  return el.getAttribute("direction") === "left" ? "left" : "right";
}

export function textHighlighterTemplate(el = EMPTY_SHIM) {
  const anchor = ANCHORS[highlightDirection(el)];

  const html = `<span class="hl" part="highlight"><slot></slot></span>`;

  const css = `
    :host {
      display: inline;
      --pura-th-h: var(--pura-text-highlighter-height, 100%);
      --pura-th-dur: 0.9s;
      --pura-th-delay: 0s;
      --pura-th-ease: cubic-bezier(0.65, 0, 0.35, 1);
    }
    .hl {
      display: inline;
      background-image: linear-gradient(
        var(--pura-text-highlighter-color, #fde047),
        var(--pura-text-highlighter-color, #fde047)
      );
      background-repeat: no-repeat;
      background-position: ${anchor} 100%;
      background-size: 100% var(--pura-th-h);
      border-radius: var(--pura-text-highlighter-radius, 0.25em);
      padding: var(--pura-text-highlighter-padding, 0.08em 0.25em);
      -webkit-box-decoration-break: clone;
      box-decoration-break: clone;
    }

    /* view / load: empty the pen first, then sweep open once triggered. */
    :host([data-pura-th-anim]) .hl {
      background-size: 0% var(--pura-th-h);
      transition: background-size var(--pura-th-dur) var(--pura-th-ease) var(--pura-th-delay);
    }
    :host([data-pura-th-in]) .hl {
      background-size: 100% var(--pura-th-h);
    }

    @keyframes pura-text-highlighter {
      from { background-size: 0% var(--pura-th-h); }
      to { background-size: 100% var(--pura-th-h); }
    }

    /* scrub: tie the sweep 1:1 to a scroll-driven timeline, no JS frame. */
    @supports (animation-timeline: scroll()) {
      @media (prefers-reduced-motion: no-preference) {
        :host([data-pura-th-scrub]) .hl {
          animation: pura-text-highlighter linear both;
          animation-timeline: var(--pura-th-timeline, view());
          animation-range: var(--pura-th-range, entry 0% cover 50%);
        }
      }
    }

    /* Reduced motion: never sweep. Land fully highlighted. */
    @media (prefers-reduced-motion: reduce) {
      :host([data-pura-th-anim]) .hl,
      :host([data-pura-th-scrub]) .hl {
        background-size: 100% var(--pura-th-h);
        transition: none;
        animation: none;
      }
    }
  `;

  return { html, css };
}
