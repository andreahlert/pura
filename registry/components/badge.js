// <pura-badge> — small status label. variant: neutral (default) | primary |
// success | warning | danger | info. Attribute: dot (leading dot).
import { PuraElement, define } from "../base.js";
import meta from "./badge.meta.js";

class PuraBadge extends PuraElement {
  connectedCallback() {
    this.render(
      `<span part="badge">${this.hasAttribute("dot") ? '<span class="dot" aria-hidden="true"></span>' : ""}<slot></slot></span>`,
      CSS
    );
  }
}

const CSS = `
  :host { display: inline-block; }
  span[part="badge"] {
    display: inline-flex; align-items: center; gap: var(--pura-space-1);
    font-size: var(--pura-text-xs); font-weight: 550; line-height: 1;
    padding: 0.3rem var(--pura-space-2); border-radius: var(--pura-radius-full);
    border: 1px solid var(--pura-border); background: var(--pura-subtle);
    color: var(--pura-muted-fg);
  }
  .dot { width: 0.4rem; height: 0.4rem; border-radius: 50%; background: currentColor; }

  :host([variant="primary"]) span[part="badge"] { background: var(--pura-primary); color: var(--pura-primary-fg); border-color: transparent; }
  :host([variant="success"]) span[part="badge"] { background: var(--pura-success-bg); color: var(--pura-success-fg); border-color: color-mix(in srgb, var(--pura-success) 30%, transparent); }
  :host([variant="warning"]) span[part="badge"] { background: var(--pura-warning-bg); color: var(--pura-warning); border-color: color-mix(in srgb, var(--pura-warning) 30%, transparent); }
  :host([variant="danger"]) span[part="badge"] { background: var(--pura-danger-bg); color: var(--pura-danger); border-color: color-mix(in srgb, var(--pura-danger) 30%, transparent); }
  :host([variant="info"]) span[part="badge"] { background: var(--pura-info-bg); color: var(--pura-info); border-color: color-mix(in srgb, var(--pura-info) 30%, transparent); }
`;

define("pura-badge", PuraBadge, meta);
export { PuraBadge };
