// <pura-prose> — typography wrapper for slotted rich HTML (shadcn Typography).
// Styles default-slot content via ::slotted: h1–h4, p, a, strong, ul/ol/li,
// blockquote, code, pre, hr, img. Comfortable reading measure + vertical rhythm.
// No attributes; purely presentational. Theming via var(--pura-*) tokens.
import { PuraElement, define } from "../base.js";

class PuraProse extends PuraElement {
  connectedCallback() {
    this.render(`<div part="prose" class="prose"><slot></slot></div>`, CSS);
  }
}

const CSS = `
  :host {
    display: block;
    color: var(--pura-fg);
    font-size: var(--pura-text-base);
    line-height: 1.7;
  }

  /* Comfortable reading measure + base vertical rhythm container. */
  [part="prose"] {
    max-width: 70ch;
  }

  /* ---- vertical rhythm: collapse first/last child margins ---- */
  ::slotted(:first-child) { margin-top: 0 !important; }
  ::slotted(:last-child) { margin-bottom: 0 !important; }

  /* ---- headings ---- */
  ::slotted(h1) {
    font-size: var(--pura-text-xl);
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -0.025em;
    margin: var(--pura-space-6) 0 var(--pura-space-4);
  }
  ::slotted(h2) {
    font-size: var(--pura-text-lg);
    font-weight: 700;
    line-height: 1.25;
    letter-spacing: -0.02em;
    margin: var(--pura-space-6) 0 var(--pura-space-3);
    padding-bottom: var(--pura-space-2);
    border-bottom: 1px solid var(--pura-border);
  }
  ::slotted(h3) {
    font-size: var(--pura-text-base);
    font-weight: 650;
    line-height: 1.3;
    letter-spacing: -0.015em;
    margin: var(--pura-space-5) 0 var(--pura-space-2);
  }
  ::slotted(h4) {
    font-size: var(--pura-text-sm);
    font-weight: 600;
    line-height: 1.4;
    letter-spacing: -0.01em;
    margin: var(--pura-space-4) 0 var(--pura-space-2);
  }

  /* ---- paragraphs ---- */
  ::slotted(p) {
    line-height: 1.7;
    margin: 0 0 var(--pura-space-4);
  }

  /* ---- inline emphasis ---- */
  ::slotted(a) {
    color: var(--pura-accent);
    text-decoration: underline;
    text-underline-offset: 2px;
    font-weight: 500;
  }
  ::slotted(strong), ::slotted(b) {
    font-weight: 650;
    color: var(--pura-fg);
  }
  ::slotted(em), ::slotted(i) { font-style: italic; }
  ::slotted(small) { font-size: var(--pura-text-sm); color: var(--pura-muted); }
  ::slotted(mark) {
    background: var(--pura-subtle);
    color: var(--pura-fg);
    border-radius: var(--pura-radius-sm);
    padding: 0 var(--pura-space-1);
  }

  /* ---- lists ---- */
  ::slotted(ul), ::slotted(ol) {
    margin: 0 0 var(--pura-space-4);
    padding-left: var(--pura-space-6);
  }
  ::slotted(ul) { list-style: disc; }
  ::slotted(ol) { list-style: decimal; }
  ::slotted(li) { margin: var(--pura-space-1) 0; line-height: 1.7; }

  /* ---- blockquote ---- */
  ::slotted(blockquote) {
    margin: 0 0 var(--pura-space-4);
    padding-left: var(--pura-space-4);
    border-left: 3px solid var(--pura-border-strong);
    color: var(--pura-muted-fg);
    font-style: italic;
  }

  /* ---- inline code chip ---- */
  ::slotted(code) {
    font-family: var(--pura-font-mono);
    font-size: 0.875em;
    background: var(--pura-subtle);
    color: var(--pura-fg);
    border-radius: var(--pura-radius-sm);
    padding: 0.15em 0.4em;
    border: 1px solid var(--pura-border);
  }

  /* ---- code block ---- */
  ::slotted(pre) {
    font-family: var(--pura-font-mono);
    font-size: var(--pura-text-sm);
    line-height: 1.6;
    background: var(--pura-subtle);
    color: var(--pura-fg);
    border: 1px solid var(--pura-border);
    border-radius: var(--pura-radius);
    padding: var(--pura-space-4);
    margin: 0 0 var(--pura-space-4);
    overflow-x: auto;
  }

  /* ---- horizontal rule ---- */
  ::slotted(hr) {
    border: none;
    border-top: 1px solid var(--pura-border);
    margin: var(--pura-space-6) 0;
  }

  /* ---- media ---- */
  ::slotted(img) {
    max-width: 100%;
    height: auto;
    border-radius: var(--pura-radius);
    margin: 0 0 var(--pura-space-4);
  }

  /* ---- tables (sensible defaults) ---- */
  ::slotted(table) {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--pura-text-sm);
    margin: 0 0 var(--pura-space-4);
  }
`;

define("pura-prose", PuraProse);
export { PuraProse };
