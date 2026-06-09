// Pure render for <pura-emphasis>. No DOM; safe on server (SSR/DSD).
import { EMPTY_SHIM } from "../base.js";

export function emphasisTemplate(el = EMPTY_SHIM) {
  const html = `<span class="content" part="content"><slot></slot></span>`;
  return { html, css: EMPHASIS_CSS };
}

// One rule set drives every preset: each animation maps to a keyframe name in
// --_emph-name, and animation-name resolves that var only while playing (manual
// /view trigger sets data-playing; hover and loop are pure CSS). No JS tweening.
export const EMPHASIS_CSS = `
  :host { display: inline-block; }
  .content {
    display: inline-block;
    animation-duration: var(--pura-emphasis-duration, var(--pura-duration-5));
    animation-timing-function: var(--pura-ease-standard);
    animation-iteration-count: var(--_emph-iter, 1);
    animation-fill-mode: both;
  }

  :host([animation="bounce"])    { --_emph-name: pura-emph-bounce; }
  :host([animation="heartbeat"]) { --_emph-name: pura-emph-heartbeat; }
  :host([animation="wiggle"])    { --_emph-name: pura-emph-wiggle; }
  :host([animation="tada"])      { --_emph-name: pura-emph-tada; }
  :host([animation="shake"])     { --_emph-name: pura-emph-shake; }
  :host([animation="pulse"])     { --_emph-name: pura-emph-pulse; }
  :host([animation="flash"])     { --_emph-name: pura-emph-flash; }

  :host([data-playing]) .content,
  :host([trigger="hover"]:hover) .content { animation-name: var(--_emph-name); }

  :host([trigger="loop"]) { --_emph-iter: infinite; }
  :host([trigger="loop"]) .content { animation-name: var(--_emph-name); }

  @keyframes pura-emph-bounce {
    0%, 20%, 53%, 100% { transform: translateY(0); }
    40%, 43% { transform: translateY(-30%); }
    70% { transform: translateY(-15%); }
    90% { transform: translateY(-4%); }
  }
  @keyframes pura-emph-heartbeat {
    0% { transform: scale(1); }
    14% { transform: scale(1.18); }
    28% { transform: scale(1); }
    42% { transform: scale(1.18); }
    70%, 100% { transform: scale(1); }
  }
  @keyframes pura-emph-wiggle {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(-6deg); }
    75% { transform: rotate(6deg); }
  }
  @keyframes pura-emph-tada {
    0% { transform: scale(1) rotate(0); }
    10%, 20% { transform: scale(0.9) rotate(-3deg); }
    30%, 50%, 70%, 90% { transform: scale(1.1) rotate(3deg); }
    40%, 60%, 80% { transform: scale(1.1) rotate(-3deg); }
    100% { transform: scale(1) rotate(0); }
  }
  @keyframes pura-emph-shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-6px); }
    20%, 40%, 60%, 80% { transform: translateX(6px); }
  }
  @keyframes pura-emph-pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.08); }
  }
  @keyframes pura-emph-flash {
    0%, 50%, 100% { opacity: 1; }
    25%, 75% { opacity: 0.3; }
  }
`;
