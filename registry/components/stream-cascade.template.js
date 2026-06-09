// Pure render for <pura-stream-cascade>. No DOM; safe on server. The whole point
// lives here: a generated `::slotted(:nth-child(n))` stagger so the cascade is
// computed at PARSE TIME, in CSS, with no JS coordinating it. Server-rendered as
// Declarative Shadow DOM, the slot + these rules exist before the light-DOM
// children stream in, so each child fades up a step later than the last purely
// from where it lands in source order. Delays (and durations) multiply
// var(--pura-motion) so a <pura-motion-budget> governor or reduced motion calms
// or stops the cascade.
import { EMPTY_SHIM } from "../base.js";

// How many nth-child stagger rules to emit. Children past this index still
// animate, they just share the last step instead of getting an ever-growing
// delay (which is what you want for long streams anyway).
export const CASCADE_STOPS = 32;

// Pure: build the nth-child delay block for 1..n.
export function buildCascadeDelays(n = CASCADE_STOPS) {
  let out = "";
  for (let i = 1; i <= n; i++) {
    out += `  ::slotted(:nth-child(${i})) { animation-delay: calc(${i - 1} * var(--pura-cascade-step, 60ms) * var(--pura-motion, 1)); }\n`;
  }
  return out;
}

export function streamCascadeTemplate(el = EMPTY_SHIM) {
  const html = `<slot></slot>`;
  return { html, css: STREAM_CASCADE_CSS };
}

export const STREAM_CASCADE_CSS = `
  :host { display: block; }

  ::slotted(*) {
    animation: var(--pura-cascade-anim, pura-cascade-fade)
      calc(var(--pura-dur, 160ms) * 2.4 * var(--pura-motion, 1)) var(--pura-ease, ease) both;
  }

${buildCascadeDelays()}
  @keyframes pura-cascade-fade {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes pura-cascade-slide-up {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pura-cascade-slide-left {
    from { opacity: 0; transform: translateX(16px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes pura-cascade-zoom {
    from { opacity: 0; transform: scale(0.92); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes pura-cascade-blur {
    from { opacity: 0; filter: blur(6px); }
    to   { opacity: 1; filter: blur(0); }
  }
`;
