// Pure render for <pura-narrated-transition>. No DOM; safe on server. Renders
// the slotted content plus a visually-hidden polite live region the component
// writes each narration into, so the morph is also *spoken* to assistive tech.
import { EMPTY_SHIM } from "../base.js";

export function narratedTransitionTemplate(el = EMPTY_SHIM) {
  const html = `<div class="content" part="content"><slot></slot></div>` +
    `<p class="sr" part="narration" role="status" aria-live="polite"></p>`;
  return { html, css: NARRATED_TRANSITION_CSS };
}

export const NARRATED_TRANSITION_CSS = `
  :host { display: block; }
  .content { display: contents; }
  .sr {
    position: absolute;
    width: 1px; height: 1px;
    margin: -1px; padding: 0; border: 0;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    overflow: hidden;
    white-space: nowrap;
  }
`;
