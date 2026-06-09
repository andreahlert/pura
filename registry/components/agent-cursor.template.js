// Pure render for <pura-agent-cursor>. No DOM; safe on server (SSR/DSD) and
// client. The trace is applied at runtime, so the server paints only the stage
// plus a resting (hidden) ghost cursor; the client tweens it along the path.
import { EMPTY_SHIM } from "../base.js";

export function agentCursorTemplate(el = EMPTY_SHIM) {
  const html =
    `<div class="stage" part="stage"><slot></slot></div>` +
    `<div class="cursor" part="cursor" data-state="idle" aria-hidden="true">` +
      `<svg class="pointer" part="pointer" viewBox="0 0 24 24" width="22" height="22">` +
        `<path d="M5 3l14 7-6 1.6L9.6 18z" fill="var(--pura-cursor-color, #6366f1)" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/>` +
      `</svg>` +
      `<span class="ripple" part="ripple" aria-hidden="true"></span>` +
      `<span class="label" part="label"></span>` +
    `</div>` +
    `<span class="sr" part="status" aria-live="polite"></span>`;
  return { html, css: AGENT_CURSOR_CSS };
}

export const AGENT_CURSOR_CSS = `
  :host { position: relative; display: block; }
  .stage { position: relative; z-index: 0; }

  .cursor {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    z-index: 2147483000;
    pointer-events: none;
    opacity: 0;
    transform: translate(-9999px, -9999px);
    transition: opacity 0.2s ease;
  }
  .cursor[data-state="active"] { opacity: 1; }

  .pointer {
    position: absolute;
    top: 0;
    left: 0;
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.35));
  }

  /* Click feedback: a ring expands from the pointer tip. Restarted per click by
     toggling the .go class, which (re)plays this keyframe. */
  .ripple {
    position: absolute;
    top: 2px;
    left: 2px;
    width: var(--pura-cursor-ripple, 30px);
    height: var(--pura-cursor-ripple, 30px);
    margin: 0;
    border-radius: 50%;
    border: 2px solid var(--pura-cursor-color, #6366f1);
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
  }
  .ripple.go {
    /* base.js RESET collapses animation-duration under reduced motion. */
    animation: pura-cursor-ripple 0.5s ease-out;
  }
  @keyframes pura-cursor-ripple {
    from { transform: translate(-50%, -50%) scale(0.2); opacity: 0.85; }
    to   { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
  }

  .label {
    position: absolute;
    top: 20px;
    left: 18px;
    white-space: nowrap;
    font: 500 12px var(--pura-font, system-ui, sans-serif);
    color: var(--pura-cursor-label-fg, #fff);
    background: var(--pura-cursor-label-bg, #18181b);
    padding: 0.2rem 0.45rem;
    border-radius: 6px;
    opacity: 0;
    transform: translateY(4px);
    transition: opacity 0.15s ease, transform 0.15s ease;
  }
  .label[data-show] { opacity: 1; transform: translateY(0); }

  .sr {
    position: absolute;
    width: 1px; height: 1px;
    margin: -1px; padding: 0; border: 0;
    overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap;
  }
`;
