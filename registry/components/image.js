// <pura-image> — image primitive. Wraps <img part="image"> inside an
// aspect-ratio box. Lazy loading; graceful with no src.
// Attributes:
//   src     — image URL.
//   alt     — alt text (defaults to "").
//   ratio   — aspect ratio, e.g. "16/9", "1/1", "4/3".
//   fit     — object-fit: cover (default) | contain | fill.
//   radius  — corner rounding: sm | md | lg | full.
//   w, h    — explicit width / height (any CSS length or number → px).
// No slots; purely attribute-driven. Theming via var(--pura-*) tokens.
import { PuraElement, define } from "../base.js";
import meta from "./image.meta.js";

class PuraImage extends PuraElement {
  static get observedAttributes() {
    return ["src", "alt", "ratio", "w", "h"];
  }

  connectedCallback() {
    this.render(
      `<div part="frame" class="frame"><img part="image" loading="lazy" decoding="async" alt=""></div>`,
      CSS
    );
    this._sync();
  }

  attributeChangedCallback() {
    // Skip until first render has populated the shadow root.
    if (this.shadowRoot.childElementCount) this._sync();
  }

  // Map dynamic attributes to CSS custom properties + the <img>.
  _sync() {
    const img = this.$("img");
    if (!img) return;

    const src = this.getAttribute("src");
    if (src) img.setAttribute("src", src);
    else img.removeAttribute("src");
    img.setAttribute("alt", this.getAttribute("alt") || "");

    const ratio = this.getAttribute("ratio");
    this.style.setProperty("--_ratio", ratio ? ratio.replace("/", " / ") : "auto");
    this.style.setProperty("--_w", len(this.getAttribute("w")) || "auto");
    this.style.setProperty("--_h", len(this.getAttribute("h")) || "auto");
  }
}

// Coerce a bare number to px; pass through any other CSS length.
function len(v) {
  if (v == null || v === "") return "";
  return /^-?\d*\.?\d+$/.test(v.trim()) ? `${v.trim()}px` : v;
}

const CSS = `
  :host {
    display: inline-block;
    width: var(--_w, auto);
    height: var(--_h, auto);
    vertical-align: middle;
  }
  .frame {
    position: relative;
    width: 100%;
    height: 100%;
    aspect-ratio: var(--_ratio, auto);
    overflow: hidden;
    background: var(--pura-subtle);
    border-radius: var(--pura-radius);
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    color: var(--pura-muted);
    font-size: var(--pura-text-sm);
  }

  /* ---- object-fit ---- */
  :host([fit="contain"]) img { object-fit: contain; }
  :host([fit="fill"]) img { object-fit: fill; }

  /* ---- radius ---- */
  :host([radius="sm"]) .frame { border-radius: var(--pura-radius-sm); }
  :host([radius="md"]) .frame { border-radius: var(--pura-radius); }
  :host([radius="lg"]) .frame { border-radius: var(--pura-radius-lg); }
  :host([radius="full"]) .frame { border-radius: var(--pura-radius-full); }
`;

define("pura-image", PuraImage, meta);
export { PuraImage };
