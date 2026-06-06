// <pura-item> — flexible row / list item primitive (shadcn Item).
// Flex row, align-center, gap: leading media (slot="media"), a middle column
// with title (slot="title" or attr title, weight 550) over description
// (default slot, muted sm), and trailing actions (slot="actions").
// Attributes:
//   title       — convenience text for the title row (slot="title" overrides it)
//   hover       — hover background var(--pura-subtle)
//   bordered    — border + radius around the item
//   clickable   — cursor pointer + role="button" + keyboard activation (Enter/Space)
import { PuraElement, define } from "../base.js";
import meta from "./item.meta.js";

class PuraItem extends PuraElement {
  static observedAttributes = ["title", "clickable"];

  connectedCallback() {
    this.render(
      `<div class="item" part="item">
         <span class="media" part="media"><slot name="media"></slot></span>
         <span class="content" part="content">
           <span class="title" part="title"><slot name="title">${this._titleText()}</slot></span>
           <span class="description" part="description"><slot></slot></span>
         </span>
         <span class="actions" part="actions"><slot name="actions"></slot></span>
       </div>`,
      CSS
    );
    this._root = this.$(".item");
    this._onKeydown = this._onKeydown.bind(this);
    this.addEventListener("keydown", this._onKeydown);
    this._sync();
  }

  disconnectedCallback() {
    this.removeEventListener("keydown", this._onKeydown);
  }

  attributeChangedCallback() {
    if (!this._root) return;
    const titleSlot = this.$('slot[name="title"]');
    if (titleSlot) titleSlot.textContent = this._titleText();
    this._sync();
  }

  _titleText() {
    return this.getAttribute("title") || "";
  }

  // Reflect interactive state: clickable items behave like a button.
  _sync() {
    const clickable = this.hasAttribute("clickable");
    if (clickable) {
      if (!this.hasAttribute("role")) this.setAttribute("role", "button");
      if (!this.hasAttribute("tabindex")) this.setAttribute("tabindex", "0");
    } else {
      if (this.getAttribute("role") === "button") this.removeAttribute("role");
      if (this.getAttribute("tabindex") === "0") this.removeAttribute("tabindex");
    }
  }

  // Keyboard activation mirrors native button semantics.
  _onKeydown(e) {
    if (!this.hasAttribute("clickable")) return;
    if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      this.click();
    }
  }
}

const CSS = `
  :host { display: block; }

  .item {
    display: flex;
    align-items: center;
    gap: var(--pura-space-3);
    padding: var(--pura-space-3) var(--pura-space-4);
    color: var(--pura-fg);
    background: transparent;
    border: 1px solid transparent;
    border-radius: var(--pura-radius);
    transition: background var(--pura-dur) var(--pura-ease),
      border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }

  /* leading media: icons, avatars, thumbnails */
  .media {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    color: var(--pura-muted-fg);
  }
  .media slot::slotted(*) { display: block; }

  /* middle column grows to fill available space */
  .content {
    display: flex;
    flex-direction: column;
    gap: var(--pura-space-1);
    min-width: 0;
    flex: 1 1 auto;
  }

  .title {
    display: block;
    font-size: var(--pura-text-sm);
    font-weight: 550;
    line-height: 1.3;
    color: var(--pura-fg);
    overflow: hidden;
    text-overflow: ellipsis;
  }
  /* hide the title row entirely when there is no title text or slotted node */
  .title:empty { display: none; }

  .description {
    display: block;
    font-size: var(--pura-text-sm);
    line-height: 1.4;
    color: var(--pura-muted);
  }

  /* trailing actions: buttons, menus, badges */
  .actions {
    display: inline-flex;
    align-items: center;
    gap: var(--pura-space-2);
    flex: 0 0 auto;
    margin-left: auto;
  }

  /* hover background */
  :host([hover]) .item:hover {
    background: var(--pura-subtle);
  }

  /* bordered: visible border + radius + subtle elevation */
  :host([bordered]) .item {
    border-color: var(--pura-border);
    box-shadow: var(--pura-shadow-sm);
  }

  /* clickable: pointer affordance + focus ring on the host */
  :host([clickable]) { cursor: pointer; }
  :host([clickable]) .item { cursor: pointer; }
  :host([clickable]:hover) .item { background: var(--pura-subtle); }
  :host([clickable][hover]:hover) .item { background: var(--pura-subtle-hover); }
  :host([clickable]:focus) { outline: none; }
  :host([clickable]:focus-visible) {
    outline: none;
  }
  :host([clickable]:focus-visible) .item {
    box-shadow: 0 0 0 3px var(--pura-ring);
  }
  :host([clickable]:active) .item { background: var(--pura-subtle-hover); }
`;

define("pura-item", PuraItem, meta);
export { PuraItem };
