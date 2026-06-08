// Pure render for <pura-card>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function cardTemplate(el = EMPTY_SHIM) {
  const html = `<article part="card">
         <header part="header"><slot name="header"></slot></header>
         <div part="body"><slot></slot></div>
         <footer part="footer"><slot name="footer"></slot></footer>
       </article>`;
  return { html, css: CARD_CSS };
}

export const CARD_CSS = `
  :host { display: block; }
  article {
    background: var(--pura-bg); border: 1px solid var(--pura-border);
    border-radius: var(--pura-radius-lg); box-shadow: var(--pura-shadow-sm);
    overflow: hidden;
    transition: box-shadow var(--pura-dur) var(--pura-ease), transform var(--pura-dur) var(--pura-ease), border-color var(--pura-dur) var(--pura-ease);
  }
  :host([hover]) article:hover {
    box-shadow: var(--pura-shadow-lg); transform: translateY(-2px);
    border-color: var(--pura-border-strong);
  }
  header { padding: var(--pura-space-5) var(--pura-space-5) 0;
    font-size: var(--pura-text-lg); font-weight: 600; color: var(--pura-fg); }
  [part="body"] { padding: var(--pura-space-4) var(--pura-space-5);
    font-size: var(--pura-text-sm); color: var(--pura-muted-fg); line-height: 1.6; }
  footer { padding: 0 var(--pura-space-5) var(--pura-space-5);
    display: flex; gap: var(--pura-space-2); }
`;
