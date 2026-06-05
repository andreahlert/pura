// <pura-popover> — floating panel anchored to a trigger. Built on the native
// Popover API (top layer + light dismiss + ESC for free) plus CSS anchor
// positioning. Slots: trigger (the clickable), default slot = panel content.
// Attributes: placement (bottom default | top | left | right), open.
import { PuraElement, define } from "../base.js";

let uid = 0;

class PuraPopover extends PuraElement {
  static observedAttributes = ["open"];

  connectedCallback() {
    this._name = `--pura-pop-${uid++}`;
    this.render(
      `<span class="anchor" part="trigger"><slot name="trigger"></slot></span>
       <div part="content" popover="auto"><slot></slot></div>`,
      CSS.replaceAll("ANCHOR", this._name)
    );
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

const CSS = `
  :host { display: inline-block; }
  .anchor { anchor-name: ANCHOR; display: inline-flex; }
  [part="content"] {
    position: absolute; position-anchor: ANCHOR;
    margin: 0; inset: auto; box-sizing: border-box;
    top: anchor(bottom); left: anchor(left); margin-top: var(--pura-space-2);
    min-width: anchor-size(width); width: max-content; max-width: min(20rem, 92vw);
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-lg); padding: var(--pura-space-4);
    font-size: var(--pura-text-sm);
    opacity: 0; transform: translateY(-4px);
    transition: opacity var(--pura-dur) var(--pura-ease), transform var(--pura-dur) var(--pura-ease);
  }
  [part="content"]:popover-open { opacity: 1; transform: none; }

  :host([placement="top"]) [part="content"] { top: auto; bottom: anchor(top); margin: 0 0 var(--pura-space-2); transform: translateY(4px); }
  :host([placement="right"]) [part="content"] { top: anchor(top); left: anchor(right); margin: 0 0 0 var(--pura-space-2); transform: translateX(-4px); }
  :host([placement="left"]) [part="content"] { top: anchor(top); left: auto; right: anchor(left); margin: 0 var(--pura-space-2) 0 0; transform: translateX(4px); }
  :host([placement="top"]) [part="content"]:popover-open,
  :host([placement="left"]) [part="content"]:popover-open,
  :host([placement="right"]) [part="content"]:popover-open { transform: none; }

  /* graceful fallback if anchor positioning is unsupported */
  @supports not (anchor-name: --x) {
    :host { position: relative; }
    [part="content"] { position: absolute; top: 100%; left: 0; inset: auto; }
  }
`;

define("pura-popover", PuraPopover);
export { PuraPopover };
