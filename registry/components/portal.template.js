// Pure render for <pura-portal>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function portalTemplate(el = EMPTY_SHIM) {
  const html = `<slot></slot><span part="placeholder" aria-hidden="true" hidden></span>`;
  return { html, css: PORTAL_CSS };
}

export const PORTAL_CSS = `
  /* The portal host is a logical anchor only; it has no visual footprint. Its
     teleported content lives in the target (light DOM) where tokens still
     inherit, so this shadow CSS intentionally styles nothing but the host. */
  :host { display: contents; }
  [part="placeholder"] { display: none; }
`;
