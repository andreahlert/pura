// Pure render for <pura-glitch-text>. No DOM; safe on server (SSR/DSD) and client.
// Digital signal-error glitch: the real slotted text always renders, and two
// pseudo-element copies (content: attr(data-text)) sit on top with red/cyan
// text-shadow offsets while animated clip-path inset() slices jump across them.
// All slice positions are hand-authored keyframe constants, so every run is
// deterministic; steps(1, end) holds each slice until the next stop for the
// hard-cut, signal-error look.
//
// SSR / pre-JS: data-text is absent, so attr(data-text) resolves to an empty
// string and the layers paint nothing; the slotted text is the whole paint.
// Accessibility: the pseudo-element copies use the `content: ... / ""` alt-text
// form so assistive tech never announces the duplicated text (a plain
// attr(data-text) fallback covers engines without the slash syntax).
// Reduced motion: the layers are removed entirely; only the static text shows.
import { EMPTY_SHIM } from "../base.js";

export function glitchTextTemplate(el = EMPTY_SHIM) {
  const html = `<span class="glitch" part="text"><slot></slot></span>`;

  const css = `
    :host {
      display: inline-block;
      --pura-glitch-text-dur: 3s;
      --pura-glitch-text-shift: 2px;
      --pura-glitch-text-color-a: #ff3b6b;
      --pura-glitch-text-color-b: #00fff9;
    }
    .glitch {
      position: relative;
      display: inline-block;
    }
    .glitch::before,
    .glitch::after {
      content: attr(data-text);
      content: attr(data-text) / "";
      position: absolute;
      inset: 0;
      overflow: hidden;
      opacity: 0;
      pointer-events: none;
      clip-path: inset(50% 0 50% 0);
    }
    .glitch::before {
      text-shadow: calc(-1 * var(--pura-glitch-text-shift)) 0 var(--pura-glitch-text-color-a);
    }
    .glitch::after {
      text-shadow: var(--pura-glitch-text-shift) 0 var(--pura-glitch-text-color-b);
    }

    /* Two desynced slice tracks. Quiet stretches (fully closed inset) between
       bursts keep the glitch intermittent instead of a constant shake. */
    @keyframes pura-glitch-text-a {
      0%   { clip-path: inset(42% 0 44% 0); transform: translate(var(--pura-glitch-text-shift), -1px); }
      6%   { clip-path: inset(8% 0 78% 0);  transform: translate(calc(-1 * var(--pura-glitch-text-shift)), 1px); }
      12%  { clip-path: inset(64% 0 14% 0); transform: translate(var(--pura-glitch-text-shift), 0); }
      18%  { clip-path: inset(50% 0 50% 0); transform: translate(0, 0); }
      44%  { clip-path: inset(50% 0 50% 0); transform: translate(0, 0); }
      50%  { clip-path: inset(22% 0 62% 0); transform: translate(calc(-1 * var(--pura-glitch-text-shift)), 2px); }
      56%  { clip-path: inset(74% 0 6% 0);  transform: translate(var(--pura-glitch-text-shift), -2px); }
      62%  { clip-path: inset(34% 0 52% 0); transform: translate(calc(-1 * var(--pura-glitch-text-shift)), 1px); }
      68%  { clip-path: inset(50% 0 50% 0); transform: translate(0, 0); }
      100% { clip-path: inset(50% 0 50% 0); transform: translate(0, 0); }
    }
    @keyframes pura-glitch-text-b {
      0%   { clip-path: inset(50% 0 50% 0); transform: translate(0, 0); }
      24%  { clip-path: inset(50% 0 50% 0); transform: translate(0, 0); }
      30%  { clip-path: inset(12% 0 76% 0); transform: translate(calc(-1 * var(--pura-glitch-text-shift)), 1px); }
      36%  { clip-path: inset(56% 0 28% 0); transform: translate(var(--pura-glitch-text-shift), -1px); }
      42%  { clip-path: inset(82% 0 4% 0);  transform: translate(calc(-1 * var(--pura-glitch-text-shift)), 2px); }
      48%  { clip-path: inset(50% 0 50% 0); transform: translate(0, 0); }
      72%  { clip-path: inset(50% 0 50% 0); transform: translate(0, 0); }
      78%  { clip-path: inset(38% 0 48% 0); transform: translate(var(--pura-glitch-text-shift), 1px); }
      84%  { clip-path: inset(4% 0 86% 0);  transform: translate(calc(-1 * var(--pura-glitch-text-shift)), -2px); }
      90%  { clip-path: inset(50% 0 50% 0); transform: translate(0, 0); }
      100% { clip-path: inset(50% 0 50% 0); transform: translate(0, 0); }
    }

    @media (prefers-reduced-motion: no-preference) {
      .glitch::before,
      .glitch::after {
        opacity: 1;
      }
      .glitch::before {
        animation: pura-glitch-text-a var(--pura-glitch-text-dur) steps(1, end) infinite;
      }
      .glitch::after {
        animation: pura-glitch-text-b calc(var(--pura-glitch-text-dur) * 1.4) steps(1, end) infinite;
      }
      /* hover mode: layers stay dark and paused until the host is hovered */
      :host([hover]) .glitch::before,
      :host([hover]) .glitch::after {
        opacity: 0;
        animation-play-state: paused;
      }
      :host([hover]:hover) .glitch::before,
      :host([hover]:hover) .glitch::after {
        opacity: 1;
        animation-play-state: running;
      }
    }

    /* Reduced motion: drop the glitch layers entirely; the real text stands. */
    @media (prefers-reduced-motion: reduce) {
      .glitch::before,
      .glitch::after {
        display: none;
        animation: none;
      }
    }
  `;

  return { html, css };
}
