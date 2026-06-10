// Pure render for <pura-split>. No DOM; safe on server (SSR/DSD) and client.
// The template only lays out the two layers: .src holds the JS-built, animated
// per-unit spans (aria-hidden), and the slotted original text is kept as the
// accessible copy. Before JS runs, .src is empty and the slot is visible, so the
// text is fully readable from first paint with no script and on the server. Once
// the element has split the text it sets data-pura-split-ready on the host, which
// flips visibility to the animated copy and visually-hides (but keeps readable)
// the original.
import { EMPTY_SHIM } from "../base.js";

export function splitTemplate(el = EMPTY_SHIM) {
  const html = `<span class="src" part="text" aria-hidden="true"></span><span class="a11y"><slot></slot></span>`;
  return { html, css: SPLIT_CSS };
}

export const SPLIT_CSS = `
  :host {
    display: block;
    --pura-split-dur: 0.6s;
    --pura-split-ease: cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  .src { display: none; }
  :host([data-pura-split-ready]) .src { display: block; }
  :host([data-pura-split-ready]) .a11y {
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

  /* Mask wrappers clip the rising inner span. Words/chars flow inline; lines
     stack as blocks. */
  .mask { display: inline-block; overflow: hidden; vertical-align: top; }
  .mask[data-kind="line"] { display: block; }
  .inner {
    display: inline-block;
    transform: translateY(110%);
    transition: transform var(--pura-split-dur) var(--pura-split-ease);
    transition-delay: var(--d, 0ms);
    will-change: transform;
  }
  :host([data-pura-split-in]) .inner { transform: translateY(0); }

  /* effect="scatter" — units fly in from seeded offsets/rotations instead of
     rising under a clip. The mask must not clip, so overflow opens up. */
  :host([data-pura-split-effect="scatter"]) .mask { overflow: visible; }
  :host([data-pura-split-effect="scatter"]) .inner {
    transform: translate(var(--sx, 0px), var(--sy, 40px)) rotate(var(--sr, 0deg)) scale(0.6);
    opacity: 0;
    transition:
      transform var(--pura-split-dur) var(--pura-split-ease),
      opacity calc(var(--pura-split-dur) * 0.6) ease-out;
    transition-delay: var(--d, 0ms);
  }
  :host([data-pura-split-effect="scatter"][data-pura-split-in]) .inner {
    transform: none;
    opacity: 1;
  }

  /* effect="wave" — after a fade-in, each unit bobs on an infinite sine,
     phase-shifted by its stagger delay. */
  :host([data-pura-split-effect="wave"]) .mask { overflow: visible; }
  :host([data-pura-split-effect="wave"]) .inner {
    transform: none;
    opacity: 0;
    transition: opacity calc(var(--pura-split-dur) * 0.5) ease-out;
    transition-delay: var(--d, 0ms);
  }
  :host([data-pura-split-effect="wave"][data-pura-split-in]) .inner {
    opacity: 1;
    animation: pura-split-wave var(--pura-split-wave-dur, 1.4s) ease-in-out infinite;
    animation-delay: var(--d, 0ms);
  }
  @keyframes pura-split-wave {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(calc(-1 * var(--pura-split-wave-amp, 0.35em))); }
  }

  @media (prefers-reduced-motion: reduce) {
    .inner {
      transition: none !important;
      animation: none !important;
      transform: none !important;
      opacity: 1 !important;
    }
  }
`;
