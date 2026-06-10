// Pure render for <pura-scroll-highlight>. No DOM; safe on server (SSR/DSD) and client.
// Text that highlights word by word as you scroll, like a reader following the
// line — the motion.dev "highlight text" move. The host carries a named view
// timeline (view-timeline: --pura-shl); every word span animates its color on
// that shared timeline, each with its own animation-range slice (set inline by
// the element), so the highlight sweeps through the words 1:1 with scroll and
// no per-frame JS runs.
//
// The split words live in the shadow copy (aria-hidden); the slot stays as the
// accessible original, visually hidden once the copy is ready (the split
// dual-layer pattern).
//
// SSR / pre-JS: the slotted text renders in its normal color.
// No scroll-timeline support or reduced motion: words show highlighted.
import { EMPTY_SHIM } from "../base.js";

export function scrollHighlightTemplate(el = EMPTY_SHIM) {
  const html = `<span class="wrap" part="text" aria-hidden="true"></span><span class="a11y"><slot></slot></span>`;

  const css = `
    :host {
      display: block;
      view-timeline: --pura-shl;
    }
    .wrap { display: none; }
    :host([data-pura-shl-ready]) .wrap { display: block; }
    :host([data-pura-shl-ready]) .a11y {
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
    .word {
      color: var(--pura-scroll-highlight-base, color-mix(in srgb, currentColor 30%, transparent));
    }
    @keyframes pura-scroll-highlight {
      to { color: var(--pura-scroll-highlight-color, currentColor); }
    }

    /* each word rides the host's view timeline on its own range slice */
    @supports (animation-timeline: scroll()) {
      @media (prefers-reduced-motion: no-preference) {
        .word {
          animation: pura-scroll-highlight linear both;
          animation-timeline: --pura-shl;
        }
      }
    }

    /* no scroll-driven timelines: show the text highlighted, never dimmed */
    @supports not (animation-timeline: scroll()) {
      .word { color: var(--pura-scroll-highlight-color, currentColor); }
    }
    @media (prefers-reduced-motion: reduce) {
      .word {
        color: var(--pura-scroll-highlight-color, currentColor);
        animation: none;
      }
    }
  `;

  return { html, css };
}
