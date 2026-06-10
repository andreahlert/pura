// Pure render for <pura-hold-confirm>. No DOM; safe on server (SSR/DSD) and client.
// A press-and-hold button: while held, a ring fills around the indicator dot
// (stroke-dashoffset 1 -> 0 over the hold duration, linear); release early and
// it snaps back. The motion.dev "hold to confirm" move with no per-frame JS —
// the only JS is a setTimeout that fires the confirm.
//
// SSR / pre-JS: renders as a normal button with an empty ring; holding only
// works once the element upgrades.
import { EMPTY_SHIM } from "../base.js";

export function holdConfirmTemplate(el = EMPTY_SHIM) {
  const html =
    `<button part="button" type="button"${el.hasAttribute("disabled") ? " disabled" : ""}>` +
    `<svg part="ring" class="ring" viewBox="0 0 24 24" aria-hidden="true">` +
    `<circle class="track" cx="12" cy="12" r="9" pathLength="1" />` +
    `<circle class="progress" cx="12" cy="12" r="9" pathLength="1" />` +
    `<path class="check" pathLength="1" d="M 7.5 12.5 L 10.5 15.5 L 16.5 8.5" />` +
    `</svg>` +
    `<span part="label" class="label"><slot></slot></span>` +
    `</button>`;

  const css = `
    :host {
      display: inline-block;
      --pura-hold-dur: 1200ms;
    }
    button {
      display: inline-flex;
      align-items: center;
      gap: 0.55em;
      font: inherit;
      color: var(--pura-fg);
      background: var(--pura-bg);
      border: 1px solid var(--pura-border);
      border-radius: var(--pura-radius, 0.5rem);
      padding: 0.55em 1em;
      cursor: pointer;
      user-select: none;
      -webkit-user-select: none;
      touch-action: none;
    }
    button:disabled { opacity: 0.5; cursor: not-allowed; }
    .ring { width: 1.15em; height: 1.15em; flex: none; }
    .track, .progress, .check {
      fill: none;
      stroke-width: 2.6;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .track { stroke: color-mix(in srgb, currentColor 18%, transparent); }
    .progress {
      stroke: currentColor;
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      transform: rotate(-90deg);
      transform-origin: center;
      transition: stroke-dashoffset 150ms ease-out;
    }
    .check {
      stroke: currentColor;
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
    }

    /* held: the ring fills linearly over the hold duration */
    :host([data-pura-hold-active]) .progress {
      stroke-dashoffset: 0;
      transition: stroke-dashoffset var(--pura-hold-dur) linear;
    }

    /* confirmed: ring stays full, check writes itself in */
    :host([data-pura-hold-done]) .progress { stroke-dashoffset: 0; transition: none; }
    :host([data-pura-hold-done]) .track, :host([data-pura-hold-done]) .progress { opacity: 0; }
    :host([data-pura-hold-done]) .check {
      stroke-dashoffset: 0;
      transition: stroke-dashoffset 300ms ease-out;
    }
  `;

  return { html, css };
}
