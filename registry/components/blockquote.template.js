// Pure render for <pura-blockquote>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function blockquoteTemplate(el = EMPTY_SHIM) {
  const html = `<blockquote part="quote">
         <slot></slot>
         <cite part="cite"><span class="cite-text"></span><slot name="author"></slot></cite>
       </blockquote>`;
  return { html, css: BLOCKQUOTE_CSS };
}

export const BLOCKQUOTE_CSS = `
  :host { display: block; --_accent: var(--pura-border-strong); }
  [part="quote"] {
    margin: 0;
    padding: var(--pura-space-1) 0 var(--pura-space-1) var(--pura-space-4);
    border-left: 3px solid var(--_accent);
    color: var(--pura-muted-fg);
    font-style: italic;
    font-size: var(--pura-text-base);
    line-height: 1.7;
  }
  [part="cite"] {
    display: block;
    margin-top: var(--pura-space-2);
    color: var(--pura-muted);
    font-style: normal;
    font-size: var(--pura-text-sm);
    font-weight: 500;
  }
  [part="cite"]::before { content: "— "; }
`;
