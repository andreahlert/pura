// <pura-link> — themeable anchor primitive. Wraps <a> as a building block.
// Attributes:
//   href     — destination URL (forwarded to inner <a>)
//   target   — link target, e.g. _blank (forwarded to inner <a>)
//   variant  — underline-on-hover (default) | underline | subtle | button
//   color    — fg | muted | primary (default) | accent
//   external — boolean; adds rel="noopener noreferrer", target=_blank fallback,
//              and a trailing ↗ glyph
// Slots: default — link text/content.
// Part: link — the inner <a> element.
import { PuraElement, define } from "../base.js";
import meta from "./link.meta.js";

class PuraLink extends PuraElement {
  static observedAttributes = ["href", "target", "external"];

  connectedCallback() {
    this.render(
      `<a part="link"><slot></slot><span class="ext" part="external" aria-hidden="true">↗</span></a>`,
      CSS
    );
    this._a = this.$("a");
    this._sync();
  }

  attributeChangedCallback() {
    if (this._a) this._sync();
  }

  // Forward link-affecting attributes onto the inner <a>. Presentation
  // (variant/color) is handled purely via :host([...]) attribute selectors.
  _sync() {
    const href = this.getAttribute("href");
    if (href !== null) this._a.setAttribute("href", href);
    else this._a.removeAttribute("href");

    const external = this.hasAttribute("external");
    const target = this.getAttribute("target") ?? (external ? "_blank" : null);
    if (target !== null) this._a.setAttribute("target", target);
    else this._a.removeAttribute("target");

    if (external) this._a.setAttribute("rel", "noopener noreferrer");
    else this._a.removeAttribute("rel");
  }
}

const CSS = `
  :host { display: inline; }

  a {
    color: var(--pura-primary);
    text-decoration: none;
    text-underline-offset: 2px;
    border-radius: var(--pura-radius-sm);
    cursor: pointer;
    transition: color var(--pura-dur) var(--pura-ease),
      text-decoration-color var(--pura-dur) var(--pura-ease),
      background var(--pura-dur) var(--pura-ease);
  }
  a:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--pura-ring);
  }

  /* trailing external glyph — hidden unless [external] */
  .ext { display: none; font-size: 0.85em; margin-left: 0.15em; }
  :host([external]) .ext { display: inline-block; }

  /* ---- colors ---- */
  :host([color="fg"]) a { color: var(--pura-fg); }
  :host([color="muted"]) a { color: var(--pura-muted-fg); }
  :host([color="primary"]) a { color: var(--pura-primary); }
  :host([color="accent"]) a { color: var(--pura-accent); }

  /* ---- variants ---- */
  /* default: underline-on-hover */
  a { text-decoration: underline; text-decoration-color: transparent; }
  a:hover { text-decoration-color: currentColor; }

  :host([variant="underline"]) a { text-decoration-color: currentColor; }
  :host([variant="underline"]) a:hover { text-decoration-color: transparent; }

  :host([variant="subtle"]) a { text-decoration: none; }
  :host([variant="subtle"]) a:hover { color: var(--pura-fg); }

  :host([variant="button"]) a {
    display: inline-flex; align-items: center; gap: var(--pura-space-2);
    text-decoration: none;
    font-size: var(--pura-text-sm); font-weight: 550; line-height: 1;
    padding: 0 var(--pura-space-4); height: 2.25rem;
    border: 1px solid var(--pura-border-strong);
    background: var(--pura-bg); color: var(--pura-fg);
    box-shadow: var(--pura-shadow-sm);
  }
  :host([variant="button"]) a:hover { background: var(--pura-subtle); }
  :host([variant="button"]) a:active { transform: translateY(0.5px) scale(0.99); }
`;

define("pura-link", PuraLink, meta);
export { PuraLink };
