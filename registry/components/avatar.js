// <pura-avatar> — image or initials fallback. Attributes: src, alt, initials,
// size (sm | md | lg). status: online | offline | busy (corner dot).
import { PuraElement, define } from "../base.js";
import meta from "./avatar.meta.js";
import { avatarTemplate } from "./avatar.template.js";

class PuraAvatar extends PuraElement {
  connectedCallback() {
    const src = this.getAttribute("src");
    const initials = this.getAttribute("initials") || "?";
    const alt = this.getAttribute("alt") || "";
    const { html, css } = avatarTemplate(this);
    this.render(html, css);
    const img = this.$("img");
    if (img) img.addEventListener("error", () => {
      img.replaceWith(Object.assign(document.createElement("span"), { className: "ini", textContent: initials }));
    });
  }
}


define("pura-avatar", PuraAvatar, meta);
export { PuraAvatar };
