// Pure render for <pura-true-focus>. No DOM; safe on server (SSR/DSD) and client.
// Lays out three layers inside a relative wrap: .words holds the JS-built,
// aria-hidden word spans whose blur is driven by the active index; the slotted
// original text is kept as the accessible copy; .frame is the absolutely
// positioned viewfinder (four corner brackets) the client moves between words.
//
// Before JS runs (and on the server) .words is empty and the slot is visible,
// so the sentence renders sharp and fully readable from first paint. Once the
// element has split the text it sets data-pura-true-focus-ready on the host,
// which flips visibility to the animated copy and visually-hides (but keeps
// readable) the original.
//
// Blur only applies under prefers-reduced-motion: no-preference; in reduce
// every word stays sharp and the frame simply sits still.
import { EMPTY_SHIM } from "../base.js";

export function trueFocusTemplate(el = EMPTY_SHIM) {
  const html = `
    <span class="wrap" part="wrap">
      <span class="words" part="words" aria-hidden="true"></span>
      <span class="a11y"><slot></slot></span>
      <span class="frame" part="frame" aria-hidden="true">
        <span class="corner tl" part="corner"></span>
        <span class="corner tr" part="corner"></span>
        <span class="corner bl" part="corner"></span>
        <span class="corner br" part="corner"></span>
      </span>
    </span>`;
  return { html, css: TRUE_FOCUS_CSS };
}

export const TRUE_FOCUS_CSS = `
  :host {
    display: inline-block;
    --pura-true-focus-blur: 5px;
    --pura-true-focus-dur: 0.4s;
    --pura-true-focus-color: var(--pura-primary, currentColor);
    --pura-true-focus-corner: 0.8em;
    --pura-true-focus-thickness: 3px;
    --pura-true-focus-radius: 4px;
    --pura-true-focus-glow: 4px;
  }
  .wrap { position: relative; display: inline-block; }

  /* JS-built copy is hidden until ready; the accessible original then becomes
     visually hidden but stays readable (same pattern as <pura-split>). */
  .words { display: none; }
  :host([data-pura-true-focus-ready]) .words { display: inline; }
  :host([data-pura-true-focus-ready]) .a11y {
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
    display: inline-block;
    transition: filter var(--pura-true-focus-dur) ease;
    will-change: filter;
  }
  @media (prefers-reduced-motion: no-preference) {
    :host([data-pura-true-focus-ready]) .word:not([data-active]) {
      filter: blur(var(--pura-true-focus-blur));
    }
  }

  /* The viewfinder. JS writes top/left/width/height inline and FLIPs between
     placements; only opacity is handled here. */
  .frame {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  :host([data-pura-true-focus-active]) .frame { opacity: 1; }

  .corner {
    position: absolute;
    width: var(--pura-true-focus-corner);
    height: var(--pura-true-focus-corner);
    border: var(--pura-true-focus-thickness) solid var(--pura-true-focus-color);
    filter: drop-shadow(0 0 var(--pura-true-focus-glow) var(--pura-true-focus-color));
  }
  .tl { top: 0; left: 0; border-right: 0; border-bottom: 0; border-top-left-radius: var(--pura-true-focus-radius); }
  .tr { top: 0; right: 0; border-left: 0; border-bottom: 0; border-top-right-radius: var(--pura-true-focus-radius); }
  .bl { bottom: 0; left: 0; border-right: 0; border-top: 0; border-bottom-left-radius: var(--pura-true-focus-radius); }
  .br { bottom: 0; right: 0; border-left: 0; border-top: 0; border-bottom-right-radius: var(--pura-true-focus-radius); }
`;
