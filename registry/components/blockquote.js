// <pura-blockquote> — quotation block. Renders <blockquote part="quote"> with a
// left accent border, italic muted text, and an optional <cite part="cite">.
// Attributes:
//   variant — accent color for the border/cite: default | accent | primary |
//             success | warning | danger | info.
//   cite    — citation text (rendered as <cite>); falls back to slot=author.
// Slots:
//   (default) — the quoted content.
//   author    — citation markup when richer than the `cite` attribute.
import { PuraElement, define } from "../base.js";
import meta from "./blockquote.meta.js";

const ACCENTS = {
  default: "var(--pura-border-strong)",
  accent: "var(--pura-accent)",
  primary: "var(--pura-primary)",
  success: "var(--pura-success)",
  warning: "var(--pura-warning)",
  danger: "var(--pura-danger)",
  info: "var(--pura-info)",
};

class PuraBlockquote extends PuraElement {
  static get observedAttributes() {
    return ["variant", "cite"];
  }

  connectedCallback() {
    this.render(
      `<blockquote part="quote">
         <slot></slot>
         <cite part="cite"><span class="cite-text"></span><slot name="author"></slot></cite>
       </blockquote>`,
      CSS
    );
    this._sync();
    // re-evaluate cite visibility when the author slot changes
    this.$('slot[name="author"]').addEventListener("slotchange", () => this._sync());
  }

  attributeChangedCallback() {
    if (this.shadowRoot) this._sync();
  }

  // Read attributes and reflect them onto the host (accent) + cite content.
  _sync() {
    const variant = this.getAttribute("variant") || "default";
    this.style.setProperty("--_accent", ACCENTS[variant] || ACCENTS.default);

    const cite = this.$('[part="cite"]');
    if (!cite) return; // not rendered yet
    const slot = this.$('slot[name="author"]');
    const text = (this.getAttribute("cite") || "").trim();
    // attribute text only shows when nothing is slotted into name="author"
    const hasSlot = slot.assignedNodes().length > 0;
    cite.querySelector(".cite-text").textContent = hasSlot ? "" : text;
    cite.style.display = hasSlot || text ? "" : "none";
  }
}

const CSS = `
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

define("pura-blockquote", PuraBlockquote, meta);
export { PuraBlockquote };
