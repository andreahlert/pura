// Pure render for <pura-diff-motion>. No DOM; safe on server. A single slot for
// the observed light-DOM children, plus ::slotted highlight keyframes keyed off
// the transient data-pura-diff attribute the component stamps on each child. The
// durations multiply var(--pura-motion), so a <pura-motion-budget> governor (or
// reduced motion) calms or stops these highlights along with everything else.
import { EMPTY_SHIM } from "../base.js";

export function diffMotionTemplate(el = EMPTY_SHIM) {
  const html = `<slot></slot>`;
  return { html, css: DIFF_MOTION_CSS };
}

export const DIFF_MOTION_CSS = `
  :host { display: block; }

  ::slotted([data-pura-diff]) { will-change: opacity, transform; }

  ::slotted([data-pura-diff="added"]) {
    animation: pura-diff-in calc(var(--pura-dur, 160ms) * 2.6 * var(--pura-motion, 1)) var(--pura-ease, ease) both;
  }
  ::slotted([data-pura-diff="changed"]) {
    animation: pura-diff-flash calc(var(--pura-dur, 160ms) * 3 * var(--pura-motion, 1)) ease both;
  }
  ::slotted([data-pura-diff="moved"]) {
    animation: pura-diff-moved calc(var(--pura-dur, 160ms) * 3 * var(--pura-motion, 1)) ease both;
  }

  @keyframes pura-diff-in {
    0%   { opacity: 0; transform: scale(0.82); box-shadow: 0 0 0 4px var(--pura-diff-added, rgba(52, 211, 153, 0.55)); }
    60%  { opacity: 1; }
    100% { opacity: 1; transform: none; box-shadow: 0 0 0 0 transparent; }
  }
  @keyframes pura-diff-flash {
    0%   { box-shadow: 0 0 0 0 transparent; }
    18%  { box-shadow: 0 0 0 4px var(--pura-diff-changed, rgba(251, 191, 36, 0.6)); }
    100% { box-shadow: 0 0 0 0 transparent; }
  }
  @keyframes pura-diff-moved {
    0%   { box-shadow: 0 0 0 0 transparent; }
    22%  { box-shadow: 0 0 0 4px var(--pura-diff-moved, rgba(96, 165, 250, 0.55)); }
    100% { box-shadow: 0 0 0 0 transparent; }
  }
`;
