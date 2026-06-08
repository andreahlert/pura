// Pure render for <pura-container>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function containerTemplate(el = EMPTY_SHIM) {
  const html = `<div part="box"><slot></slot></div>`;
  return { html, css: CONTAINER_CSS };
}

export const CONTAINER_CSS = `
  :host { display: block; }

  [part="box"] {
    width: 100%;
    /* Establish a CSS container too, so native @container queries also work
       for slotted descendants where supported — belt and suspenders. */
    container-type: inline-size;
  }

  :host([center]) [part="box"] { margin-inline: auto; }

  /* Optional breakpoint-scaled inline padding. */
  :host([pad]) [part="box"] { padding-inline: var(--pura-space-3); }
  :host([pad][data-size="sm"]) [part="box"] { padding-inline: var(--pura-space-4); }
  :host([pad][data-size="md"]) [part="box"] { padding-inline: var(--pura-space-5); }
  :host([pad][data-size="lg"]) [part="box"] { padding-inline: var(--pura-space-6); }
`;
