// <pura-card> — surface container. Named slots: header, footer. Default slot = body.
// Attribute: hover (lift on hover).
import { PuraElement, define } from "../base.js";
import meta from "./card.meta.js";

class PuraCard extends PuraElement {
  connectedCallback() {
    this.render(
      `<article part="card">
         <header part="header"><slot name="header"></slot></header>
         <div part="body"><slot></slot></div>
         <footer part="footer"><slot name="footer"></slot></footer>
       </article>`,
      CSS
    );
    // hide empty header/footer
    for (const name of ["header", "footer"]) {
      const slot = this.$(`slot[name="${name}"]`);
      const host = slot.closest(name);
      const upd = () => (host.style.display = slot.assignedNodes().length ? "" : "none");
      slot.addEventListener("slotchange", upd); upd();
    }
  }
}

const CSS = `
  :host { display: block; }
  article {
    background: var(--pura-bg); border: 1px solid var(--pura-border);
    border-radius: var(--pura-radius-lg); box-shadow: var(--pura-shadow-sm);
    overflow: hidden;
    transition: box-shadow var(--pura-dur) var(--pura-ease), transform var(--pura-dur) var(--pura-ease), border-color var(--pura-dur) var(--pura-ease);
  }
  :host([hover]) article:hover {
    box-shadow: var(--pura-shadow-lg); transform: translateY(-2px);
    border-color: var(--pura-border-strong);
  }
  header { padding: var(--pura-space-5) var(--pura-space-5) 0;
    font-size: var(--pura-text-lg); font-weight: 600; color: var(--pura-fg); }
  [part="body"] { padding: var(--pura-space-4) var(--pura-space-5);
    font-size: var(--pura-text-sm); color: var(--pura-muted-fg); line-height: 1.6; }
  footer { padding: 0 var(--pura-space-5) var(--pura-space-5);
    display: flex; gap: var(--pura-space-2); }
`;

define("pura-card", PuraCard, meta);
export { PuraCard };
