// <pura-accordion> with <pura-accordion-item label="..."> children.
// Built on native <details>/<summary> for free a11y + keyboard.
// Attribute on accordion: single (only one item open at a time).
import { PuraElement, define } from "../base.js";
import meta from "./accordion.meta.js";

class PuraAccordionItem extends PuraElement {
  connectedCallback() {
    this.render(
      `<details part="item" ${this.hasAttribute("open") ? "open" : ""}>
         <summary part="trigger">
           <span>${this.getAttribute("label") || ""}</span>
           <svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
         </summary>
         <div part="content"><slot></slot></div>
       </details>`,
      CSS
    );
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
    this.render(`<slot></slot>`, `:host { display: block; border: 1px solid var(--pura-border); border-radius: var(--pura-radius-lg); overflow: hidden; }`);
    if (this.hasAttribute("single")) {
      this.addEventListener("open", (e) => {
        this.querySelectorAll("pura-accordion-item").forEach((it) => {
          if (it !== e.target) it.open = false;
        });
      });
    }
  }
}

const CSS = `
  :host { display: block; }
  :host(:not(:last-child)) details { border-bottom: 1px solid var(--pura-border); }
  summary {
    display: flex; align-items: center; justify-content: space-between;
    gap: var(--pura-space-3); cursor: pointer; list-style: none;
    padding: var(--pura-space-4) var(--pura-space-5);
    font-size: var(--pura-text-sm); font-weight: 550; color: var(--pura-fg);
    transition: background var(--pura-dur) var(--pura-ease);
  }
  summary::-webkit-details-marker { display: none; }
  summary:hover { background: var(--pura-subtle); }
  summary:focus-visible { outline: none; box-shadow: inset 0 0 0 2px var(--pura-ring); }
  .chev { width: 1rem; height: 1rem; color: var(--pura-muted); flex: none;
    transition: transform var(--pura-dur) var(--pura-ease); }
  details[open] .chev { transform: rotate(180deg); }
  [part="content"] { padding: 0 var(--pura-space-5) var(--pura-space-4);
    font-size: var(--pura-text-sm); color: var(--pura-muted-fg); line-height: 1.6; }
`;

define("pura-accordion-item", PuraAccordionItem);
define("pura-accordion", PuraAccordion, meta);
export { PuraAccordion, PuraAccordionItem };
