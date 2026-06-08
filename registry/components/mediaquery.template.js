// Pure render for <pura-mediaquery>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function mediaqueryTemplate(el = EMPTY_SHIM) {
  const html = `<slot name="match" part="match"></slot>
       <slot name="default" part="default"></slot>
       <slot part="fallback"></slot>`;
  return { html, css: MEDIAQUERY_CSS };
}

export const MEDIAQUERY_CSS = `
  :host { display: contents; }

  /* By default (no match) show the named "default" slot and the unnamed
     fallback slot; hide the "match" slot. */
  slot[part="match"] { display: none; }
  slot[part="default"] { display: contents; }
  slot[part="fallback"] { display: contents; }

  /* When the query matches, show only the "match" slot. The unnamed fallback
     slot is suppressed so authors can use it purely as the no-match content. */
  :host([data-matches]) slot[part="match"] { display: contents; }
  :host([data-matches]) slot[part="default"] { display: none; }
  :host([data-matches]) slot[part="fallback"] { display: none; }
`;
