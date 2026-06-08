// Pure render for <pura-testimonial>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function testimonialTemplate(el = EMPTY_SHIM) {
  const html = `<figure part="testimonial">
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
       </figure>`;
  return { html, css: TESTIMONIAL_CSS };
}

export const TESTIMONIAL_CSS = `
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
