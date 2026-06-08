// <pura-accordion> with <pura-accordion-item label="..."> children.
// Built on native <details>/<summary> for free a11y + keyboard.
// Attribute on accordion: single (only one item open at a time).
import { PuraElement, define } from "../base.js";
import meta from "./accordion.meta.js";
import { accordionItemTemplate, accordionTemplate } from "./accordion.template.js";

class PuraAccordionItem extends PuraElement {
  connectedCallback() {
    const { html, css } = accordionItemTemplate(this);
    this.render(html, css);
    this._d = this.$("details");
    this._d.addEventListener("toggle", () => {
      this.toggleAttribute("open", this._d.open);
      if (this._d.open) this.dispatchEvent(new CustomEvent("open", { bubbles: true }));
    });
  }
  get open() { return this._d?.open; }
  set open(v) { if (this._d) this._d.open = !!v; }
}

class PuraAccordion extends PuraElement {
  connectedCallback() {
    const { html, css } = accordionTemplate(this);
    this.render(html, css);
    if (this.hasAttribute("single")) {
      this.addEventListener("open", (e) => {
        this.querySelectorAll("pura-accordion-item").forEach((it) => {
          if (it !== e.target) it.open = false;
        });
      });
    }
  }
}


define("pura-accordion-item", PuraAccordionItem);
define("pura-accordion", PuraAccordion, meta);
export { PuraAccordion, PuraAccordionItem };
