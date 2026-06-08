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
import { blockquoteTemplate } from "./blockquote.template.js";

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
    const { html, css } = blockquoteTemplate(this);
    this.render(html, css);
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


define("pura-blockquote", PuraBlockquote, meta);
export { PuraBlockquote };
