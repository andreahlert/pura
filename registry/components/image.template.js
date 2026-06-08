// Pure render for <pura-image>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function imageTemplate(el = EMPTY_SHIM) {
  const html = `<div part="frame" class="frame"><img part="image" loading="lazy" decoding="async" alt=""></div>`;
  return { html, css: IMAGE_CSS };
}

export const IMAGE_CSS = `
  :host {
    display: inline-block;
    width: var(--_w, auto);
    height: var(--_h, auto);
    vertical-align: middle;
  }
  .frame {
    position: relative;
    width: 100%;
    height: 100%;
    aspect-ratio: var(--_ratio, auto);
    overflow: hidden;
    background: var(--pura-subtle);
    border-radius: var(--pura-radius);
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    color: var(--pura-muted);
    font-size: var(--pura-text-sm);
  }

  /* ---- object-fit ---- */
  :host([fit="contain"]) img { object-fit: contain; }
  :host([fit="fill"]) img { object-fit: fill; }

  /* ---- radius ---- */
  :host([radius="sm"]) .frame { border-radius: var(--pura-radius-sm); }
  :host([radius="md"]) .frame { border-radius: var(--pura-radius); }
  :host([radius="lg"]) .frame { border-radius: var(--pura-radius-lg); }
  :host([radius="full"]) .frame { border-radius: var(--pura-radius-full); }
`;
