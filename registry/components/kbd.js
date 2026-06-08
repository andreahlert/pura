// <pura-kbd> — keyboard key chip. Small monospace inline chip for shortcut keys.
// Usage: <pura-kbd>⌘K</pura-kbd>. Default slot = key text. No attributes.
import { PuraElement, define } from "../base.js";
import meta from "./kbd.meta.js";
import { kbdTemplate } from "./kbd.template.js";

class PuraKbd extends PuraElement {
  connectedCallback() {
    const { html, css } = kbdTemplate(this);
    this.render(html, css);
  }
}


define("pura-kbd", PuraKbd, meta);
export { PuraKbd };
