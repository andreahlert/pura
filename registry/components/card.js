// <pura-card> — surface container. Named slots: header, footer. Default slot = body.
// Attribute: hover (lift on hover).
import { PuraElement, define } from "../base.js";
import meta from "./card.meta.js";
import { cardTemplate } from "./card.template.js";

class PuraCard extends PuraElement {
  connectedCallback() {
    const { html, css } = cardTemplate(this);
    this.render(html, css);
    // hide empty header/footer
    for (const name of ["header", "footer"]) {
      const slot = this.$(`slot[name="${name}"]`);
      const host = slot.closest(name);
      const upd = () => (host.style.display = slot.assignedNodes().length ? "" : "none");
      slot.addEventListener("slotchange", upd); upd();
    }
  }
}


define("pura-card", PuraCard, meta);
export { PuraCard };
