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
import { itemTemplate } from "./item.template.js";

class PuraItem extends PuraElement {
  static observedAttributes = ["title", "clickable"];

  connectedCallback() {
    const { html, css } = itemTemplate(this);
    this.render(html, css);
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

define("pura-item", PuraItem, meta);
export { PuraItem };
