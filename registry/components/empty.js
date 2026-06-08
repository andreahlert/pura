// <pura-empty> — empty state. Centered column: optional icon (slot name="icon"),
// title (slot name="title" or attr title, weight 600), description (default slot,
// muted), action area (slot name="action"). Generous padding, centered text.
import { PuraElement, define } from "../base.js";
import meta from "./empty.meta.js";
import { emptyTemplate } from "./empty.template.js";

class PuraEmpty extends PuraElement {
  static observedAttributes = ["title"];

  connectedCallback() {
    this._render();
  }

  attributeChangedCallback() {
    if (this.shadowRoot.childElementCount) this._render();
  }

  _render() {
    const { html, css } = emptyTemplate(this);
    this.render(html, css);
    // hide empty regions so the centered layout stays tidy
    for (const [name, sel] of [["icon", ".media"], ["title", ".title"], ["action", ".actions"]]) {
      const slot = this.$(`slot[name="${name}"]`);
      const host = this.$(sel);
      const upd = () => {
        const nodes = slot.assignedNodes({ flatten: true });
        const has = nodes.length > 0 || (name === "title" && !!this.getAttribute("title"));
        host.style.display = has ? "" : "none";
      };
      slot.addEventListener("slotchange", upd);
      upd();
    }
    // default slot (description) hides when empty too
    const desc = this.$('[part="description"]');
    const dslot = desc.querySelector("slot");
    const dupd = () => {
      desc.style.display = dslot.assignedNodes({ flatten: true }).length ? "" : "none";
    };
    dslot.addEventListener("slotchange", dupd);
    dupd();
  }
}

define("pura-empty", PuraEmpty, meta);
export { PuraEmpty };
