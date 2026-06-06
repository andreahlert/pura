// <pura-testimonial> — testimonial / quote card. Shows a large decorative quote
// mark, the quote body (default slot), and an author row with avatar + name +
// role. Optional star rating.
// Attributes:
//   author  — author name (string)
//   role    — author role / company line under the name (string)
//   avatar  — avatar image src (string). Falls back to author initials.
//   rating  — star rating (number 0..max). Omitted => no stars shown.
//   max     — number of stars when rating present (default 5)
// Slots:
//   default — the quote text / body.
// Events: none (display component).
// Agent-native layer: stable data-pura-testimonial-* attributes mirror live
//   state on the host, and each instance registers in window.__puraTestimonials
//   keyed by its data-pura-id so agents can enumerate / read every testimonial
//   on the page without crossing the shadow boundary.
import { PuraElement, define } from "../base.js";
import meta from "./testimonial.meta.js";

let uid = 0;

// Lazily-created global registry: data-pura-id -> element.
function registry() {
  return (window.__puraTestimonials ||= new Map());
}

class PuraTestimonial extends PuraElement {
  static observedAttributes = ["author", "role", "avatar", "rating", "max"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-testimonial-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    this.render(
      `<figure part="testimonial">
         <span class="quote-mark" part="quote-mark" aria-hidden="true">&ldquo;</span>
         <blockquote part="quote"><slot></slot></blockquote>
         <div class="stars" part="rating" hidden></div>
         <figcaption class="author" part="author">
           <span class="avatar" part="avatar" aria-hidden="true"></span>
           <span class="meta">
             <span class="name" part="name"></span>
             <span class="role" part="role"></span>
           </span>
         </figcaption>
       </figure>`,
      CSS
    );
    this._sync();
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (this.shadowRoot && this.shadowRoot.childElementCount) this._sync();
  }

  // ---- config getters ----------------------------------------------------
  get max() {
    const m = Number(this.getAttribute("max"));
    return Number.isFinite(m) && m > 0 ? Math.floor(m) : 5;
  }

  get rating() {
    if (!this.hasAttribute("rating")) return null;
    const r = Number(this.getAttribute("rating"));
    if (!Number.isFinite(r)) return null;
    return clamp(r, 0, this.max);
  }

  // ---- render -------------------------------------------------------------
  _sync() {
    const author = this.getAttribute("author") || "";
    const role = this.getAttribute("role") || "";
    const avatar = this.getAttribute("avatar") || "";

    // Author meta.
    const nameEl = this.$(".name");
    const roleEl = this.$(".role");
    const authorEl = this.$(".author");
    const metaEl = this.$(".meta");
    if (nameEl) nameEl.textContent = author;
    if (roleEl) {
      roleEl.textContent = role;
      roleEl.hidden = !role;
    }
    // Hide whole caption when there is no author info at all.
    const hasAuthor = !!(author || role || avatar);
    if (authorEl) authorEl.hidden = !hasAuthor;
    if (metaEl) metaEl.hidden = !(author || role);

    // Avatar: image when src given, else initials, else generic icon.
    const av = this.$(".avatar");
    if (av) {
      if (avatar) {
        av.innerHTML = `<img src="${esc(avatar)}" alt="" part="avatar-img" />`;
        av.classList.remove("initials");
      } else if (author) {
        av.textContent = initials(author);
        av.classList.add("initials");
      } else {
        av.innerHTML = "";
        av.classList.remove("initials");
        av.hidden = true;
      }
      if (avatar || author) av.hidden = false;
    }

    this._paintStars();
    this._reflectAgentState(author, role, avatar);
  }

  _paintStars() {
    const wrap = this.$(".stars");
    if (!wrap) return;
    const rating = this.rating;
    if (rating == null) {
      wrap.hidden = true;
      wrap.innerHTML = "";
      wrap.removeAttribute("role");
      wrap.removeAttribute("aria-label");
      return;
    }
    const max = this.max;
    wrap.hidden = false;
    // The stars are a non-interactive display: expose as an img with a clear
    // label so AT / agents read the value, not 5 separate icons.
    wrap.setAttribute("role", "img");
    wrap.setAttribute("aria-label", `Rated ${trim(rating)} out of ${max} stars`);

    let markup = "";
    for (let i = 1; i <= max; i++) {
      let fill = 0;
      if (rating >= i) fill = 1;
      else if (rating > i - 1) fill = rating - (i - 1);
      markup +=
        `<span class="star" part="star" aria-hidden="true" style="--fill:${fill * 100}%">` +
        `<span class="glyph empty">${STAR}</span>` +
        `<span class="glyph full">${STAR}</span>` +
        `</span>`;
    }
    wrap.innerHTML = markup;
  }

  // Stable machine-readable mirror of state on the host element.
  _reflectAgentState(author, role, avatar) {
    setAttr(this, "data-pura-testimonial-author", author);
    setAttr(this, "data-pura-testimonial-role", role);
    setAttr(this, "data-pura-testimonial-avatar", avatar);
    if (this.rating != null) {
      this.setAttribute("data-pura-testimonial-rating", trim(this.rating));
      this.setAttribute("data-pura-testimonial-max", String(this.max));
    } else {
      this.removeAttribute("data-pura-testimonial-rating");
      this.removeAttribute("data-pura-testimonial-max");
    }
  }
}

// Inline star glyph reused via currentColor (matches <pura-rating>).
const STAR =
  `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" focusable="false">` +
  `<path d="M12 2.5l2.9 6.06 6.6.92-4.8 4.62 1.16 6.5L12 18.9 6.14 21.6l1.16-6.5-4.8-4.62 6.6-.92z"/>` +
  `</svg>`;

function clamp(n, lo, hi) {
  return Math.min(hi, Math.max(lo, n));
}

// Drop a trailing ".0" so "4" reads cleaner than "4" vs "4.5".
function trim(n) {
  return String(Number(n));
}

// Up to two initials from an author name.
function initials(name) {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Set attribute if value is truthy, else remove it.
function setAttr(el, name, value) {
  if (value) el.setAttribute(name, value);
  else el.removeAttribute(name);
}

// Minimal attribute-value escaping for interpolated src/text.
function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

const CSS = `
  :host { display: block; }

  figure {
    position: relative; margin: 0;
    display: flex; flex-direction: column; gap: var(--pura-space-4);
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius-lg);
    box-shadow: var(--pura-shadow-sm);
    padding: var(--pura-space-5);
    transition: box-shadow var(--pura-dur) var(--pura-ease),
      border-color var(--pura-dur) var(--pura-ease);
  }

  .quote-mark {
    position: absolute; top: var(--pura-space-2); right: var(--pura-space-4);
    font-size: 3.5rem; line-height: 1; font-family: Georgia, "Times New Roman", serif;
    color: var(--pura-border-strong); opacity: 0.6;
    pointer-events: none; user-select: none;
  }

  blockquote {
    margin: 0; position: relative; z-index: 1;
    font-size: var(--pura-text-lg); line-height: 1.55; font-weight: 450;
    color: var(--pura-fg);
  }

  .stars {
    display: inline-flex; align-items: center; gap: var(--pura-space-1);
    font-size: var(--pura-text-base); line-height: 1;
  }
  .stars[hidden] { display: none; }

  .star {
    position: relative; display: inline-flex;
    width: 1em; height: 1em; color: var(--pura-border-strong);
  }
  .glyph {
    position: absolute; inset: 0;
    display: inline-flex; align-items: center; justify-content: center;
  }
  .glyph.empty { color: var(--pura-border-strong); }
  .glyph.full { color: var(--pura-warning); width: var(--fill, 0%); overflow: hidden; }

  .author {
    display: flex; align-items: center; gap: var(--pura-space-3);
  }
  .author[hidden] { display: none; }

  .avatar {
    flex: none; width: 2.5rem; height: 2.5rem; border-radius: var(--pura-radius-full);
    display: inline-flex; align-items: center; justify-content: center;
    overflow: hidden; background: var(--pura-subtle); color: var(--pura-muted-fg);
    border: 1px solid var(--pura-border);
    font-size: var(--pura-text-sm); font-weight: 600;
  }
  .avatar[hidden] { display: none; }
  .avatar.initials { letter-spacing: 0.02em; }
  .avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }

  .meta { display: flex; flex-direction: column; gap: 0.1rem; min-width: 0; }
  .meta[hidden] { display: none; }
  .name {
    font-size: var(--pura-text-sm); font-weight: 600; color: var(--pura-fg);
    line-height: 1.3;
  }
  .role {
    font-size: var(--pura-text-xs); color: var(--pura-muted); line-height: 1.3;
  }
  .role[hidden] { display: none; }
`;

define("pura-testimonial", PuraTestimonial, meta);
export { PuraTestimonial };
