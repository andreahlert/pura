// <pura-kbd> — keyboard key chip. Small monospace inline chip for shortcut keys.
// Usage: <pura-kbd>⌘K</pura-kbd>. Default slot = key text. No attributes.
import { PuraElement, define } from "../base.js";
import meta from "./kbd.meta.js";

class PuraKbd extends PuraElement {
  connectedCallback() {
    this.render(
      `<kbd part="kbd"><slot></slot></kbd>`,
      CSS
    );
  }
}

const CSS = `
  :host { display: inline-block; vertical-align: middle; line-height: 1; }

  kbd {
    display: inline-flex; align-items: center; justify-content: center;
    font-family: var(--pura-font-mono);
    font-size: var(--pura-text-xs); font-weight: 500;
    line-height: 1; white-space: nowrap;
    min-width: 1.25em; height: 1.25rem;
    padding: 0 var(--pura-space-2);
    color: var(--pura-muted-fg);
    background: var(--pura-subtle);
    border: 1px solid var(--pura-border);
    border-radius: var(--pura-radius-sm);
  }
`;

define("pura-kbd", PuraKbd, meta);
export { PuraKbd };
