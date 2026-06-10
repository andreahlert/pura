// Pure render for <pura-blur-text>. No DOM; safe on server (SSR/DSD) and client.
// The template only lays out the two layers: .src holds the JS-built, animated
// per-unit spans (aria-hidden), and the slotted original text is kept as the
// accessible copy. Before JS runs, .src is empty and the slot is visible, so
// the text paints sharp and complete with no script and on the server. Once
// the element has split the text it sets data-pura-blur-text-ready on the
// host, which flips visibility to the animated copy and visually-hides (but
// keeps readable) the original.
//
// Each unit animates filter: blur + opacity + translateY via one CSS keyframe,
// staggered through a per-unit --d delay set inline by the element. Reduced
// motion renders every unit sharp and in place.
import { EMPTY_SHIM } from "../base.js";

export function blurTextTemplate(el = EMPTY_SHIM) {
  const html = `<span class="src" part="text" aria-hidden="true"></span><span class="a11y"><slot></slot></span>`;
  return { html, css: BLUR_TEXT_CSS };
}

export const BLUR_TEXT_CSS = `
  :host {
    display: block;
    --pura-bt-sign: 1;
  }
  :host([direction="down"]) { --pura-bt-sign: -1; }

  .src { display: none; }
  :host([data-pura-blur-text-ready]) .src { display: block; }
  :host([data-pura-blur-text-ready]) .a11y {
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

  /* Units start blurred, transparent and offset; the keyframe sharpens them
     into place. Before the host gets data-pura-blur-text-in the static state
     matches the keyframe's "from", so the reveal starts seamlessly. */
  .unit {
    display: inline-block;
    opacity: 0;
    filter: blur(var(--pura-blur-text-blur, 8px));
    transform: translateY(calc(var(--pura-bt-sign) * var(--pura-blur-text-distance, 0.6em)));
    will-change: filter, transform, opacity;
  }
  :host([data-pura-blur-text-in]) .unit {
    animation: pura-blur-text-in
      var(--pura-blur-text-duration, 0.6s)
      var(--pura-blur-text-ease, cubic-bezier(0.2, 0.8, 0.2, 1))
      both;
    animation-delay: var(--d, 0ms);
  }

  @keyframes pura-blur-text-in {
    from {
      opacity: 0;
      filter: blur(var(--pura-blur-text-blur, 8px));
      transform: translateY(calc(var(--pura-bt-sign) * var(--pura-blur-text-distance, 0.6em)));
    }
    to {
      opacity: 1;
      filter: blur(0);
      transform: none;
    }
  }

  /* Reduced motion: skip the entrance entirely, render the final sharp text. */
  @media (prefers-reduced-motion: reduce) {
    .unit {
      animation: none !important;
      opacity: 1 !important;
      filter: none !important;
      transform: none !important;
    }
  }
`;
