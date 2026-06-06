// <pura-empty> — empty state. Centered column: optional icon (slot name="icon"),
// title (slot name="title" or attr title, weight 600), description (default slot,
// muted), action area (slot name="action"). Generous padding, centered text.
import { PuraElement, define } from "../base.js";
import meta from "./empty.meta.js";

class PuraEmpty extends PuraElement {
  static observedAttributes = ["title"];

  connectedCallback() {
    this._render();
  }

  attributeChangedCallback() {
    if (this.shadowRoot.childElementCount) this._render();
  }

  _render() {
    const title = this.getAttribute("title");
    this.render(
      `<div part="empty" role="status">
         <div class="media" part="icon"><slot name="icon"></slot></div>
         <div part="title" class="title">
           <slot name="title">${title ? title : ""}</slot>
         </div>
         <div part="description" class="desc"><slot></slot></div>
         <div class="actions" part="action"><slot name="action"></slot></div>
       </div>`,
      CSS
    );
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

const CSS = `
  :host { display: block; }
  [part="empty"] {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center; gap: var(--pura-space-2);
    padding: var(--pura-space-6) var(--pura-space-5);
    color: var(--pura-muted-fg);
  }
  .media {
    display: grid; place-items: center;
    width: 2.75rem; height: 2.75rem; margin-bottom: var(--pura-space-2);
    border-radius: var(--pura-radius-lg);
    background: var(--pura-subtle); color: var(--pura-muted);
    border: 1px solid var(--pura-border);
  }
  .media ::slotted(svg) { width: 1.4rem; height: 1.4rem; }
  .title {
    font-size: var(--pura-text-lg); font-weight: 600; line-height: 1.3;
    color: var(--pura-fg);
  }
  .desc {
    font-size: var(--pura-text-sm); line-height: 1.55; color: var(--pura-muted);
    max-width: 28rem;
  }
  .actions {
    display: flex; flex-wrap: wrap; align-items: center; justify-content: center;
    gap: var(--pura-space-2); margin-top: var(--pura-space-3);
  }
`;

define("pura-empty", PuraEmpty, meta);
export { PuraEmpty };
