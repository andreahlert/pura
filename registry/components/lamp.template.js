// Pure render for <pura-lamp>. No DOM; safe on server (SSR/DSD) and client.
// The Linear-style lamp header: two mirrored conic-gradient cones spread light
// downward from a bright horizontal bar (blur + box-shadow glow), illuminating
// the slotted heading. The entrance "opens" the lamp by animating width and
// opacity of the bar, glow and cones via a single @keyframes, driven either by
// a class-on-view attribute (JS IntersectionObserver) or, in scrub mode, by a
// pure CSS scroll-driven timeline (animation-timeline: view()).
//
// SSR / pre-JS: no data-pura-lamp-* attributes are set, so the lamp renders
// fully open (the final state). Reduced motion: the entrance is skipped and
// the lamp lands open.
import { EMPTY_SHIM } from "../base.js";

export function lampTemplate(el = EMPTY_SHIM) {
  // Attribute color wins over the token chain; sanitized for safe CSS embedding.
  const color = (el.getAttribute("color") || "").replace(/[;{}<>"']/g, "");
  const colorVar = color || "var(--pura-lamp-color, var(--pura-accent, #22d3ee))";

  const html = `<div class="lamp" part="lamp" aria-hidden="true">
      <div class="cone cone-left" part="cone cone-left"></div>
      <div class="cone cone-right" part="cone cone-right"></div>
      <div class="glow" part="glow"></div>
      <div class="bar" part="bar"></div>
    </div>
    <div class="content" part="content"><slot></slot></div>`;

  const css = `
    :host {
      display: block;
      position: relative;
      --_c: ${colorVar};
      --_w: var(--pura-lamp-width, min(28rem, 80vw));
    }

    .lamp {
      position: relative;
      height: var(--pura-lamp-height, 8rem);
      pointer-events: none;
    }

    /* Bright lamp bar: the light source. Blur halo via box-shadow. */
    .bar {
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
      height: 2px;
      border-radius: 999px;
      background: var(--_c);
      box-shadow:
        0 0 0.5rem var(--_c),
        0 0 2rem color-mix(in srgb, var(--_c) 70%, transparent),
        0 1rem 5rem color-mix(in srgb, var(--_c) 45%, transparent);
    }

    /* Soft blurred halo centered on the bar. */
    .glow {
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translate(-50%, 50%);
      height: 5rem;
      border-radius: 50%;
      background: var(--_c);
      filter: blur(36px);
    }

    /* Two mirrored conic wedges spreading the light downward from the bar. */
    .cone {
      position: absolute;
      top: calc(100% - 1px);
      height: var(--pura-lamp-spread, 14rem);
      -webkit-mask-image: linear-gradient(to bottom, black, transparent 88%);
      mask-image: linear-gradient(to bottom, black, transparent 88%);
    }
    .cone-left {
      right: 50%;
      background: conic-gradient(from 180deg at 100% 0, var(--_c) 0deg, transparent 70deg);
    }
    .cone-right {
      left: 50%;
      background: conic-gradient(from 110deg at 0 0, transparent 0deg, var(--_c) 70deg);
    }

    .content {
      position: relative;
      z-index: 1;
      text-align: center;
      padding-top: var(--pura-lamp-gap, 1.5rem);
    }

    /* Open-state geometry per layer; the entrance keyframes resolve these
       custom properties per element, so one @keyframes opens all layers. */
    .bar {
      --pura-lamp-open-w: var(--_w);
      --pura-lamp-open-o: 1;
    }
    .glow {
      --pura-lamp-open-w: calc(var(--_w) * 0.55);
      --pura-lamp-open-o: 0.5;
    }
    .cone {
      --pura-lamp-open-w: calc(var(--_w) * 0.75);
      --pura-lamp-open-o: 0.6;
    }
    .bar, .glow, .cone {
      width: var(--pura-lamp-open-w);
      opacity: var(--pura-lamp-open-o);
    }

    @keyframes pura-lamp-open {
      from {
        width: calc(var(--pura-lamp-open-w) * 0.45);
        opacity: 0;
      }
      to {
        width: var(--pura-lamp-open-w);
        opacity: var(--pura-lamp-open-o);
      }
    }

    /* view / load: hold the lamp closed, then play the entrance once the
       on-view attribute lands. */
    :host([data-pura-lamp-anim]) :is(.bar, .glow, .cone) {
      width: calc(var(--pura-lamp-open-w) * 0.45);
      opacity: 0;
    }
    :host([data-pura-lamp-in]) :is(.bar, .glow, .cone) {
      animation: pura-lamp-open var(--pura-lamp-dur, 900ms) var(--pura-lamp-ease, cubic-bezier(0.22, 1, 0.36, 1)) both;
    }

    /* scrub: tie the opening 1:1 to the element's view progress, no JS frame. */
    @supports (animation-timeline: scroll()) {
      @media (prefers-reduced-motion: no-preference) {
        :host([data-pura-lamp-scrub]) :is(.bar, .glow, .cone) {
          animation: pura-lamp-open linear both;
          animation-timeline: view();
          animation-range: var(--pura-lamp-range, entry 0% cover 40%);
        }
      }
    }

    /* Reduced motion: skip the entrance entirely, land open. */
    @media (prefers-reduced-motion: reduce) {
      :host([data-pura-lamp-anim]) :is(.bar, .glow, .cone),
      :host([data-pura-lamp-scrub]) :is(.bar, .glow, .cone) {
        width: var(--pura-lamp-open-w);
        opacity: var(--pura-lamp-open-o);
        animation: none;
      }
    }
  `;

  return { html, css };
}
