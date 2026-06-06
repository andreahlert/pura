// <pura-separator> — divider rule. Attributes: orientation (horizontal default
// | vertical), label (optional centered text).
import { PuraElement, define } from "../base.js";
import meta from "./separator.meta.js";

class PuraSeparator extends PuraElement {
  connectedCallback() {
    const label = this.getAttribute("label");
    this.render(
      label
        ? `<div part="separator" role="separator" class="labeled"><span class="line"></span><span class="label">${label}</span><span class="line"></span></div>`
        : `<div part="separator" role="separator" aria-orientation="${this.getAttribute("orientation") || "horizontal"}"></div>`,
      CSS
    );
  }
}

const CSS = `
  :host { display: block; }
  :host([orientation="vertical"]) { display: inline-block; height: 100%; }
  [part="separator"] { background: var(--pura-border); }
  :host(:not([orientation="vertical"])) [part="separator"]:not(.labeled) { width: 100%; height: 1px; }
  :host([orientation="vertical"]) [part="separator"] { width: 1px; height: 100%; min-height: 1em; }
  .labeled { display: flex; align-items: center; gap: var(--pura-space-3); background: transparent; }
  .labeled .line { flex: 1; height: 1px; background: var(--pura-border); }
  .labeled .label { font-size: var(--pura-text-xs); color: var(--pura-muted); white-space: nowrap; }
`;

define("pura-separator", PuraSeparator, meta);
export { PuraSeparator };
