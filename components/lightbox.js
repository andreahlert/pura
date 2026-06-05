// <pura-lightbox> — image lightbox / gallery. Wraps slotted thumbnail <img>
// elements (the light-DOM children); clicking a thumbnail opens a fullscreen
// modal built on the native <dialog> element (focus trap + ESC + backdrop for
// free) showing the large image with prev/next navigation, a counter, keyboard
// arrows and backdrop/ESC close.
//
// Each thumbnail's large source is resolved from, in order: data-full,
// data-large, the parent <a href> wrapping it, then the thumbnail's own src.
// The accessible caption/alt is taken from data-caption, the <img alt>, or the
// figure's <figcaption>.
//
// Slots:
//   (default)  the gallery: any number of <img> (optionally wrapped in <a> or
//              <figure>). Non-image children are ignored as triggers.
//
// Attributes:
//   start      index of the image to open when .open() is called with no arg (default 0)
//   loop       wrap navigation from last->first and first->last
//   label      accessible label for the gallery region (default "Image gallery")
//   open       reflects the open/closed state of the modal viewer
//
// API:
//   .open(index?)   open the viewer (defaults to `start`, or current)
//   .close()        close the viewer
//   .next() / .prev()
//   .seek(index)
//   .index          current image index (read-only)
//   .count          number of images
//
// Events (all bubble):
//   open    -> { index }
//   close   -> { index }
//   change  -> { index }
//
// Agent-native: each instance registers in the global window.__puraLightboxes
// registry keyed by a stable data-pura-lightbox id, exposing
// { el, open, close, next, prev, seek, getIndex, getCount, getItems }. The host
// carries data-pura-lightbox (id), data-count, data-index and data-open so an
// agent can read/drive state without reaching into the shadow DOM. The gallery
// is a role="group"; each thumbnail trigger is a role="button" with an
// aria-label; the modal is a role="dialog" with aria-live counter.
import { PuraElement, define } from "../base.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";

registerMessages({
  "lightbox.gallery": {
    en: "Image gallery",
    "pt-BR": "Galeria de imagens",
    fr: "Galerie d'images",
    de: "Bildergalerie",
    it: "Galleria di immagini",
  },
  "lightbox.prev": {
    en: "Previous image",
    "pt-BR": "Imagem anterior",
    fr: "Image précédente",
    de: "Vorheriges Bild",
    it: "Immagine precedente",
  },
  "lightbox.next": {
    en: "Next image",
    "pt-BR": "Próxima imagem",
    fr: "Image suivante",
    de: "Nächstes Bild",
    it: "Immagine successiva",
  },
  "lightbox.close": {
    en: "Close",
    "pt-BR": "Fechar",
    fr: "Fermer",
    de: "Schließen",
    it: "Chiudi",
  },
  "lightbox.view": {
    en: "view image {n} of {total}",
    "pt-BR": "ver imagem {n} de {total}",
    fr: "voir l'image {n} sur {total}",
    de: "Bild {n} von {total} anzeigen",
    it: "vedi immagine {n} di {total}",
  },
});

let uid = 0;

// Global machine-readable registry so agents can discover and drive every
// lightbox on the page without touching shadow roots.
const REGISTRY = (window.__puraLightboxes ||= new Map());

class PuraLightbox extends PuraElement {
  static observedAttributes = ["open", "loop", "label", "start"];

  connectedCallback() {
    this._id = `pura-lightbox-${uid++}`;
    if (this._index === undefined) this._index = this._startIndex();
    this._items = [];

    this.setAttribute("data-pura-lightbox", this._id);

    this.render(
      `<div part="gallery" class="gallery" role="group" aria-label="${this._esc(this._label())}">
         <slot></slot>
       </div>
       <dialog part="viewer" class="viewer" role="dialog" aria-modal="true" aria-label="${this._esc(this._label())}">
         <div part="stage" class="stage">
           <button part="control prev" class="ctl prev" type="button" aria-label="${this._esc(t("lightbox.prev"))}">
             <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
           </button>
           <figure part="figure" class="figure">
             <img part="image" class="image" alt="" />
             <figcaption part="caption" class="caption"></figcaption>
           </figure>
           <button part="control next" class="ctl next" type="button" aria-label="${this._esc(t("lightbox.next"))}">
             <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18l6-6-6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
           </button>
         </div>
         <div part="counter" class="counter" aria-live="polite"></div>
         <button part="close" class="x" type="button" aria-label="${this._esc(t("lightbox.close"))}">
           <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
         </button>
       </dialog>`,
      CSS
    );

    this._slot = this.$("slot");
    this._dlg = this.$("dialog");
    this._img = this.$(".image");
    this._caption = this.$(".caption");
    this._counter = this.$(".counter");
    this._prev = this.$(".prev");
    this._next = this.$(".next");
    this._closeBtn = this.$(".x");

    this._prev.addEventListener("click", () => this.prev());
    this._next.addEventListener("click", () => this.next());
    this._closeBtn.addEventListener("click", () => this.close());

    // Backdrop click closes (clicks on the dialog box itself, outside the stage).
    this._dlg.addEventListener("click", (e) => {
      if (e.target === this._dlg) this.close();
    });

    // Native <dialog> close (ESC or .close()) -> sync state + emit.
    this._dlg.addEventListener("close", () => {
      if (this.hasAttribute("open")) this.removeAttribute("open");
      this.dataset.open = "false";
      this.dispatchEvent(
        new CustomEvent("close", { detail: { index: this._index }, bubbles: true })
      );
    });

    // Arrow-key navigation while the viewer is open.
    this._dlg.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); this.prev(); }
      else if (e.key === "ArrowRight") { e.preventDefault(); this.next(); }
    });

    // Open the viewer when a thumbnail trigger is activated (delegated).
    this._slot.addEventListener("click", (e) => this._onGalleryActivate(e));
    this._slot.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
        const item = e.target.closest && e.target.closest("[data-pura-lb-trigger]");
        if (item) { e.preventDefault(); this._onGalleryActivate(e); }
      }
    });

    // Rebuild item bookkeeping whenever the slotted gallery changes.
    this._slot.addEventListener("slotchange", () => this._refresh());

    REGISTRY.set(this._id, {
      el: this,
      open: (i) => this.open(i),
      close: () => this.close(),
      next: () => this.next(),
      prev: () => this.prev(),
      seek: (i) => this.seek(i),
      getIndex: () => this._index,
      getCount: () => this.count,
      getItems: () => this._items.map((it) => ({ src: it.full, caption: it.caption })),
    });

    this._refresh();

    this._i18nOff = onLocaleChange(() => this._applyI18n());

    if (this.hasAttribute("open")) queueMicrotask(() => this._show());
  }

  disconnectedCallback() {
    REGISTRY.delete(this._id);
    this._i18nOff?.();
  }

  attributeChangedCallback(name, _old, value) {
    if (!this._dlg) return;
    if (name === "open") {
      if (value !== null && !this._dlg.open) this._show();
      if (value === null && this._dlg.open) this._dlg.close();
    } else if (name === "label") {
      const lbl = this._label();
      this.$(".gallery")?.setAttribute("aria-label", lbl);
      this._dlg.setAttribute("aria-label", lbl);
    } else if (name === "loop") {
      this._updateControls();
    }
  }

  get index() { return this._index; }
  get count() { return this._items ? this._items.length : 0; }

  open(i) {
    if (typeof i === "number" && !Number.isNaN(i)) this._index = this._clamp(i);
    this.setAttribute("open", "");
  }

  close() { this.removeAttribute("open"); }
  next() { this.seek(this._index + 1); }
  prev() { this.seek(this._index - 1); }

  seek(i) {
    const n = this.count;
    if (n === 0) return;
    if (this.hasAttribute("loop")) i = ((i % n) + n) % n;
    else i = Math.max(0, Math.min(n - 1, i));
    this._index = i;
    this._sync();
    this.dataset.index = String(i);
    this.dispatchEvent(
      new CustomEvent("change", { detail: { index: i }, bubbles: true })
    );
  }

  // ---- internals -----------------------------------------------------------

  _startIndex() {
    const s = Number(this.getAttribute("start"));
    return Number.isFinite(s) && s > 0 ? Math.floor(s) : 0;
  }

  _label() { return this.getAttribute("label") || t("lightbox.gallery"); }

  _clamp(i) {
    const n = this.count;
    if (n === 0) return 0;
    return Math.max(0, Math.min(n - 1, i));
  }

  // Read slotted thumbnails, resolve large sources/captions, wire each as an
  // accessible trigger. Degrades gracefully with zero children.
  _refresh() {
    const assigned = this._slot.assignedElements({ flatten: true });
    const imgs = [];
    for (const el of assigned) {
      const img = el.tagName === "IMG" ? el : el.querySelector && el.querySelector("img");
      if (img) imgs.push({ host: el, img });
    }

    this._items = imgs.map(({ host, img }, i) => {
      const wrapper = host !== img ? host : null;
      const anchor =
        (wrapper && wrapper.tagName === "A" && wrapper) ||
        (wrapper && wrapper.querySelector && wrapper.querySelector("a")) ||
        null;
      const full =
        img.getAttribute("data-full") ||
        img.getAttribute("data-large") ||
        (anchor && anchor.getAttribute("href")) ||
        img.getAttribute("src") ||
        "";
      const figcap =
        wrapper && wrapper.querySelector && wrapper.querySelector("figcaption");
      const caption =
        img.getAttribute("data-caption") ||
        img.getAttribute("alt") ||
        (figcap && figcap.textContent.trim()) ||
        "";
      return { trigger: anchor || host, img, full, caption };
    });

    this._items.forEach((it, i) => {
      const trg = it.trigger;
      trg.setAttribute("data-pura-lb-trigger", String(i));
      if (!trg.hasAttribute("role") && trg.tagName !== "A" && trg.tagName !== "BUTTON") {
        trg.setAttribute("role", "button");
      }
      if (trg.tabIndex < 0 && trg.tagName !== "A" && trg.tagName !== "BUTTON") {
        trg.tabIndex = 0;
      }
      if (!trg.hasAttribute("aria-label")) {
        // Flag labels we set ourselves so _applyI18n can re-localize them
        // without clobbering consumer-provided aria-labels.
        trg.dataset.puraLbLabel = "1";
        trg.setAttribute(
          "aria-label",
          (it.caption ? it.caption + ", " : "") +
            t("lightbox.view", { n: i + 1, total: this._items.length })
        );
      }
      it.img.setAttribute("part", "thumbnail");
      // Prevent wrapping <a> from navigating away; we handle activation.
      if (trg.tagName === "A" && !trg.dataset.puraLbBound) {
        trg.dataset.puraLbBound = "1";
        trg.addEventListener("click", (e) => e.preventDefault());
      }
    });

    this._index = this._clamp(this._index);
    this.dataset.count = String(this.count);
    this.dataset.index = String(this._index);
    if (!this.dataset.open) this.dataset.open = "false";
    this._updateControls();
    if (this._dlg.open) this._sync();
  }

  _onGalleryActivate(e) {
    const target = e.target && e.target.closest && e.target.closest("[data-pura-lb-trigger]");
    if (!target) return;
    const i = Number(target.getAttribute("data-pura-lb-trigger"));
    if (Number.isNaN(i)) return;
    e.preventDefault();
    this.open(i);
  }

  _show() {
    if (this.count === 0) {
      // Nothing to show; stay closed but keep state consistent.
      this.removeAttribute("open");
      return;
    }
    if (!this._dlg.open) this._dlg.showModal();
    this._sync();
    this.dataset.open = "true";
    this.dispatchEvent(
      new CustomEvent("open", { detail: { index: this._index }, bubbles: true })
    );
  }

  // Push the current item into the viewer DOM + counter + controls.
  _sync() {
    const it = this._items[this._index];
    if (!it) return;
    this._img.setAttribute("src", it.full);
    this._img.setAttribute("alt", it.caption || "");
    this._caption.textContent = it.caption || "";
    this._caption.style.display = it.caption ? "" : "none";
    this._counter.textContent = `${this._index + 1} / ${this.count}`;
    this._updateControls();
  }

  _updateControls() {
    if (!this._prev) return;
    const loop = this.hasAttribute("loop");
    const n = this.count;
    const single = n <= 1;
    this._prev.disabled = single || (!loop && this._index <= 0);
    this._next.disabled = single || (!loop && this._index >= n - 1);
  }

  // Re-localize already-rendered i18n nodes in place on locale change.
  // Never re-renders, never adds listeners.
  _applyI18n() {
    const lbl = this._label();
    this.$(".gallery")?.setAttribute("aria-label", lbl);
    this._dlg?.setAttribute("aria-label", lbl);
    this._prev?.setAttribute("aria-label", t("lightbox.prev"));
    this._next?.setAttribute("aria-label", t("lightbox.next"));
    this._closeBtn?.setAttribute("aria-label", t("lightbox.close"));
    // Re-localize only the trigger labels we generated ourselves.
    (this._items || []).forEach((it, i) => {
      const trg = it.trigger;
      if (trg && trg.dataset && trg.dataset.puraLbLabel === "1") {
        trg.setAttribute(
          "aria-label",
          (it.caption ? it.caption + ", " : "") +
            t("lightbox.view", { n: i + 1, total: this._items.length })
        );
      }
    });
  }

  _esc(s) {
    return String(s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
    );
  }
}

const CSS = `
  :host { display: block; }

  .gallery {
    display: flex;
    flex-wrap: wrap;
    gap: var(--pura-space-3);
  }

  /* Slotted thumbnails / triggers: clickable, focusable affordance. */
  ::slotted(img),
  ::slotted(a),
  ::slotted(figure) {
    cursor: zoom-in;
    border-radius: var(--pura-radius);
    transition: transform var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  ::slotted(img) { display: block; max-width: 100%; height: auto; }
  ::slotted(img:hover),
  ::slotted(a:hover),
  ::slotted(figure:hover) {
    transform: scale(1.02);
    box-shadow: var(--pura-shadow);
  }
  ::slotted(:focus-visible) {
    outline: none;
    box-shadow: 0 0 0 3px var(--pura-ring);
  }

  /* ---- viewer (native dialog) ---- */
  .viewer {
    padding: 0;
    border: none;
    background: transparent;
    color: #fff;
    max-width: 100vw;
    max-height: 100dvh;
    width: 100vw;
    height: 100dvh;
    overflow: hidden;
  }
  .viewer::backdrop {
    background: rgb(0 0 0 / 0.9);
    backdrop-filter: blur(4px);
    opacity: 0;
    transition: opacity var(--pura-dur) var(--pura-ease);
  }
  .viewer[open]::backdrop { opacity: 1; }

  .stage {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: var(--pura-space-3);
    width: 100%;
    height: 100%;
    padding: var(--pura-space-6);
  }

  .figure {
    grid-column: 2;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--pura-space-3);
    min-width: 0;
    min-height: 0;
    height: 100%;
    opacity: 0;
    transform: scale(0.98);
    transition: opacity var(--pura-dur) var(--pura-ease),
      transform var(--pura-dur) var(--pura-ease);
  }
  .viewer[open] .figure { opacity: 1; transform: none; }

  .image {
    display: block;
    max-width: 100%;
    max-height: calc(100dvh - var(--pura-space-6) * 2 - 3rem);
    width: auto;
    height: auto;
    object-fit: contain;
    border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-lg);
  }

  .caption {
    font-size: var(--pura-text-sm);
    color: #fff;
    text-align: center;
    max-width: 60ch;
    text-shadow: 0 1px 3px rgb(0 0 0 / 0.6);
  }

  .ctl {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    flex: none;
    border: 1px solid rgb(255 255 255 / 0.25);
    border-radius: var(--pura-radius-full);
    background: rgb(0 0 0 / 0.4);
    color: #fff;
    cursor: pointer;
    transition: background var(--pura-dur) var(--pura-ease),
      border-color var(--pura-dur) var(--pura-ease);
  }
  .ctl.prev { grid-column: 1; }
  .ctl.next { grid-column: 3; }
  .ctl svg { width: 1.5rem; height: 1.5rem; }
  .ctl:hover { background: rgb(0 0 0 / 0.65); border-color: rgb(255 255 255 / 0.5); }
  .ctl:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  .ctl:disabled { opacity: 0.3; cursor: not-allowed; }

  .counter {
    position: absolute;
    bottom: var(--pura-space-5);
    left: 50%;
    transform: translateX(-50%);
    font-size: var(--pura-text-sm);
    font-variant-numeric: tabular-nums;
    color: #fff;
    background: rgb(0 0 0 / 0.5);
    padding: var(--pura-space-1) var(--pura-space-3);
    border-radius: var(--pura-radius-full);
    text-shadow: 0 1px 2px rgb(0 0 0 / 0.6);
  }

  .x {
    position: absolute;
    top: var(--pura-space-5);
    right: var(--pura-space-5);
    display: grid;
    place-items: center;
    width: 2.5rem;
    height: 2.5rem;
    border: 1px solid rgb(255 255 255 / 0.25);
    border-radius: var(--pura-radius-full);
    background: rgb(0 0 0 / 0.4);
    color: #fff;
    cursor: pointer;
    transition: background var(--pura-dur) var(--pura-ease);
  }
  .x:hover { background: rgb(0 0 0 / 0.65); }
  .x svg { width: 1.25rem; height: 1.25rem; }
  .x:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
`;

define("pura-lightbox", PuraLightbox);
export { PuraLightbox };
