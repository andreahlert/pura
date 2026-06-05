// <pura-avatar> — image or initials fallback. Attributes: src, alt, initials,
// size (sm | md | lg). status: online | offline | busy (corner dot).
import { PuraElement, define } from "../base.js";

class PuraAvatar extends PuraElement {
  connectedCallback() {
    const src = this.getAttribute("src");
    const initials = this.getAttribute("initials") || "?";
    const alt = this.getAttribute("alt") || "";
    this.render(
      `<span part="avatar" role="img" aria-label="${alt || initials}">
         ${src ? `<img src="${src}" alt="${alt}" />` : `<span class="ini">${initials}</span>`}
         ${this.hasAttribute("status") ? '<span class="status" part="status"></span>' : ""}
       </span>`,
      CSS
    );
    const img = this.$("img");
    if (img) img.addEventListener("error", () => {
      img.replaceWith(Object.assign(document.createElement("span"), { className: "ini", textContent: initials }));
    });
  }
}

const CSS = `
  :host { display: inline-block; }
  span[part="avatar"] {
    position: relative; display: inline-grid; place-items: center; overflow: visible;
    width: 2.5rem; height: 2.5rem; border-radius: var(--pura-radius-full);
    background: var(--pura-subtle); color: var(--pura-muted-fg);
    font-size: var(--pura-text-sm); font-weight: 600; user-select: none;
    box-shadow: inset 0 0 0 1px var(--pura-border);
  }
  img { width: 100%; height: 100%; object-fit: cover; border-radius: inherit; }
  .ini { display: grid; place-items: center; width: 100%; height: 100%; text-transform: uppercase; }
  :host([size="sm"]) span[part="avatar"] { width: 1.75rem; height: 1.75rem; font-size: var(--pura-text-xs); }
  :host([size="lg"]) span[part="avatar"] { width: 3.5rem; height: 3.5rem; font-size: var(--pura-text-lg); }
  .status {
    position: absolute; right: -1px; bottom: -1px; width: 0.7rem; height: 0.7rem;
    border-radius: 50%; border: 2px solid var(--pura-bg); background: var(--pura-muted);
  }
  :host([status="online"]) .status { background: var(--pura-success); }
  :host([status="busy"]) .status { background: var(--pura-danger); }
  :host([status="offline"]) .status { background: var(--pura-muted); }
`;

define("pura-avatar", PuraAvatar);
export { PuraAvatar };
