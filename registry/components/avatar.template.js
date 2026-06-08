// Pure render for <pura-avatar>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function avatarTemplate(el = EMPTY_SHIM) {
  const src = el.getAttribute("src");
  const initials = el.getAttribute("initials") || "?";
  const alt = el.getAttribute("alt") || "";
  const html = `<span part="avatar" role="img" aria-label="${alt || initials}">
         ${src ? `<img src="${src}" alt="${alt}" />` : `<span class="ini">${initials}</span>`}
         ${el.hasAttribute("status") ? '<span class="status" part="status"></span>' : ""}
       </span>`;
  return { html, css: AVATAR_CSS };
}

export const AVATAR_CSS = `
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
