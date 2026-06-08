// <pura-popover> — floating panel anchored to a trigger. Built on the native
// Popover API (top layer + light dismiss + ESC for free) plus CSS anchor
// positioning. Slots: trigger (the clickable), default slot = panel content.
// Attributes: placement (bottom default | top | left | right), open.
import { PuraElement, define } from "../base.js";
import meta from "./popover.meta.js";
import { popoverTemplate } from "./popover.template.js";

let uid = 0;

class PuraPopover extends PuraElement {
  static observedAttributes = ["open"];

  connectedCallback() {
    this._name = `--pura-pop-${uid++}`;
    const { html, css } = popoverTemplate(this);
    this.render(html, css);
    this._trigger = this.$(".anchor");
    this._pop = this.$("[popover]");
    this._trigger.addEventListener("click", () => this._pop.togglePopover());
    this._pop.addEventListener("toggle", (e) => {
      this.toggleAttribute("open", e.newState === "open");
      this.dispatchEvent(new CustomEvent(e.newState === "open" ? "open" : "close", { bubbles: true }));
    });
    if (this.hasAttribute("open")) queueMicrotask(() => this._pop.showPopover());
  }

  show() { this._pop?.showPopover(); }
  hide() { this._pop?.hidePopover(); }
}


define("pura-popover", PuraPopover, meta);
export { PuraPopover };
