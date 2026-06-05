// <pura-carousel> — horizontal scroll-snap carousel wrapping slotted slide
// children. Prev/Next buttons scroll one slide at a time; dot indicators below
// reflect and seek the current slide. Keyboard Left/Right when focused.
// Attributes:
//   loop          wrap around from last->first and first->last
//   hide-dots     hide the dot indicator row
//   hide-controls hide the prev/next arrow buttons
//   per-view      slides visible at once (default 1) — drives slide width
import { PuraElement, define } from "../base.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";

registerMessages({
  "carousel.label": {
    en: "Carousel",
    "pt-BR": "Carrossel",
    fr: "Carrousel",
    de: "Karussell",
    it: "Carosello",
  },
  "carousel.prev": {
    en: "Previous slide",
    "pt-BR": "Slide anterior",
    fr: "Diapositive précédente",
    de: "Vorherige Folie",
    it: "Diapositiva precedente",
  },
  "carousel.next": {
    en: "Next slide",
    "pt-BR": "Próximo slide",
    fr: "Diapositive suivante",
    de: "Nächste Folie",
    it: "Diapositiva successiva",
  },
  "carousel.slides": {
    en: "Slides",
    "pt-BR": "Slides",
    fr: "Diapositives",
    de: "Folien",
    it: "Diapositive",
  },
  "carousel.choose": {
    en: "Choose slide",
    "pt-BR": "Escolher slide",
    fr: "Choisir une diapositive",
    de: "Folie auswählen",
    it: "Scegli diapositiva",
  },
  "carousel.slidePosition": {
    en: "{n} of {total}",
    "pt-BR": "{n} de {total}",
    fr: "{n} sur {total}",
    de: "{n} von {total}",
    it: "{n} di {total}",
  },
  "carousel.goto": {
    en: "Go to slide {n}",
    "pt-BR": "Ir para o slide {n}",
    fr: "Aller à la diapositive {n}",
    de: "Zu Folie {n} gehen",
    it: "Vai alla diapositiva {n}",
  },
});

class PuraCarousel extends PuraElement {
  static observedAttributes = ["loop", "hide-dots", "hide-controls", "per-view"];

  connectedCallback() {
    this.render(
      `<div part="root" role="region" aria-roledescription="carousel" aria-label="${this.getAttribute("label") || t("carousel.label")}">
         <button part="control prev" class="ctl prev" type="button" aria-label="${t("carousel.prev")}">
           <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
         </button>
         <div part="viewport" class="viewport" tabindex="0" role="group" aria-roledescription="slides" aria-label="${t("carousel.slides")}">
           <slot></slot>
         </div>
         <button part="control next" class="ctl next" type="button" aria-label="${t("carousel.next")}">
           <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18l6-6-6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
         </button>
         <div part="dots" class="dots" role="tablist" aria-label="${t("carousel.choose")}"></div>
       </div>`,
      CSS
    );

    this._viewport = this.$(".viewport");
    this._dots = this.$(".dots");
    this._prev = this.$(".prev");
    this._next = this.$(".next");
    this._slot = this.$("slot");
    this._index = 0;

    this._prev.addEventListener("click", () => this.prev());
    this._next.addEventListener("click", () => this.next());

    this._viewport.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); this.prev(); }
      else if (e.key === "ArrowRight") { e.preventDefault(); this.next(); }
    });

    // Recompute slide bookkeeping when light-DOM children change.
    this._slot.addEventListener("slotchange", () => this._refresh());

    // Track the most-visible slide as the user scrolls/snaps.
    this._io = new IntersectionObserver(
      (entries) => {
        let best = null;
        for (const en of entries) {
          if (!best || en.intersectionRatio > best.intersectionRatio) best = en;
        }
        if (best && best.intersectionRatio > 0.5) {
          const i = this._slides.indexOf(best.target);
          if (i >= 0) this._setIndex(i);
        }
      },
      { root: this._viewport, threshold: [0.25, 0.5, 0.75] }
    );

    this._refresh();

    // React to locale changes with targeted text/aria updates only — never a
    // re-render (that would drop scroll state and re-add global listeners).
    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this._io?.disconnect();
    this._i18nOff?.();
  }

  // Update only the already-rendered i18n nodes in place. No re-render, no new
  // listeners. Safe to call on every locale change.
  _applyI18n() {
    const root = this.$('[part~="root"]');
    if (root && !this.getAttribute("label")) {
      root.setAttribute("aria-label", t("carousel.label"));
    }
    this._prev?.setAttribute("aria-label", t("carousel.prev"));
    this._next?.setAttribute("aria-label", t("carousel.next"));
    this._viewport?.setAttribute("aria-label", t("carousel.slides"));
    this._dots?.setAttribute("aria-label", t("carousel.choose"));

    if (this._slides) {
      this._slides.forEach((el, i) => {
        el.setAttribute(
          "aria-label",
          t("carousel.slidePosition", { n: i + 1, total: this._slides.length })
        );
      });
    }
    if (this._dotEls) {
      this._dotEls.forEach((d, i) => {
        d.setAttribute("aria-label", t("carousel.goto", { n: i + 1 }));
      });
    }
  }

  attributeChangedCallback(name) {
    if (!this._viewport) return;
    if (name === "per-view") this._applyPerView();
    if (name === "loop" || name === "hide-controls") this._updateControls();
  }

  get slideCount() { return this._slides ? this._slides.length : 0; }
  get index() { return this._index; }

  // Read slotted slides, assign roles/parts, rebuild dots, wire observer.
  _refresh() {
    this._io.disconnect();
    this._slides = this._slot.assignedElements({ flatten: true });

    this._slides.forEach((el, i) => {
      el.setAttribute("part", "slide");
      el.setAttribute("role", "group");
      el.setAttribute("aria-roledescription", "slide");
      el.setAttribute("aria-label", t("carousel.slidePosition", { n: i + 1, total: this._slides.length }));
      this._io.observe(el);
    });

    this._applyPerView();
    this._buildDots();
    this._index = Math.min(this._index, Math.max(0, this._slides.length - 1));
    this._setIndex(this._index);
    this._updateControls();
  }

  _applyPerView() {
    const per = Math.max(1, Number(this.getAttribute("per-view")) || 1);
    this.style.setProperty("--pura-carousel-per", String(per));
  }

  _buildDots() {
    this._dots.innerHTML = this._slides
      .map(
        (_, i) =>
          `<button part="dot" class="dot" type="button" role="tab" data-i="${i}" aria-label="${t("carousel.goto", { n: i + 1 })}"></button>`
      )
      .join("");
    this._dotEls = this.$$(".dot");
    this._dotEls.forEach((d) =>
      d.addEventListener("click", () => this.seek(Number(d.dataset.i)))
    );
  }

  _setIndex(i) {
    this._index = i;
    if (this._dotEls) {
      this._dotEls.forEach((d, j) => {
        const active = j === i;
        d.setAttribute("aria-selected", active ? "true" : "false");
        d.tabIndex = active ? 0 : -1;
        d.classList.toggle("active", active);
      });
    }
    this._updateControls();
    this.dispatchEvent(
      new CustomEvent("change", { detail: { index: i }, bubbles: true })
    );
  }

  _updateControls() {
    const loop = this.hasAttribute("loop");
    const n = this.slideCount;
    if (this._prev) this._prev.disabled = !loop && this._index <= 0;
    if (this._next) this._next.disabled = !loop && this._index >= n - 1;
  }

  // Scroll a given slide into view inside the viewport.
  _scrollTo(i) {
    const el = this._slides && this._slides[i];
    if (!el) return;
    this._viewport.scrollTo({
      left: el.offsetLeft - this._viewport.offsetLeft,
      behavior: "smooth",
    });
  }

  seek(i) {
    const n = this.slideCount;
    if (n === 0) return;
    if (this.hasAttribute("loop")) i = (i % n + n) % n;
    else i = Math.max(0, Math.min(n - 1, i));
    this._setIndex(i);
    this._scrollTo(i);
  }

  next() { this.seek(this._index + 1); }
  prev() { this.seek(this._index - 1); }
}

const CSS = `
  :host { display: block; position: relative; --pura-carousel-per: 1; }

  [part="root"] {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: 1fr auto;
    align-items: center;
    gap: var(--pura-space-2);
  }

  .viewport {
    grid-row: 1;
    grid-column: 2;
    display: flex;
    gap: var(--pura-space-4);
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    border-radius: var(--pura-radius);
    scrollbar-width: none;
  }
  .viewport::-webkit-scrollbar { display: none; }
  .viewport:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--pura-ring);
  }

  /* Slotted slides: equal width based on per-view, snap to center. */
  ::slotted(*) {
    flex: 0 0 calc((100% - (var(--pura-carousel-per) - 1) * var(--pura-space-4)) / var(--pura-carousel-per));
    min-width: 0;
    scroll-snap-align: center;
  }

  .ctl {
    grid-row: 1;
    display: inline-flex; align-items: center; justify-content: center;
    width: 2.25rem; height: 2.25rem; flex: none;
    border: 1px solid var(--pura-border-strong);
    border-radius: var(--pura-radius-full);
    background: var(--pura-bg); color: var(--pura-fg);
    box-shadow: var(--pura-shadow-sm);
    cursor: pointer;
    transition: background var(--pura-dur) var(--pura-ease),
      border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  .ctl.prev { grid-column: 1; }
  .ctl.next { grid-column: 3; }
  .ctl svg { width: 1.125rem; height: 1.125rem; }
  .ctl:hover { background: var(--pura-subtle); }
  .ctl:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  .ctl:disabled { opacity: 0.4; cursor: not-allowed; box-shadow: none; }

  :host([hide-controls]) .ctl { display: none; }

  .dots {
    grid-row: 2;
    grid-column: 1 / -1;
    display: flex; justify-content: center; align-items: center;
    gap: var(--pura-space-2);
    margin-top: var(--pura-space-3);
  }
  .dot {
    width: 0.5rem; height: 0.5rem; padding: 0; flex: none;
    border: none; border-radius: var(--pura-radius-full);
    background: var(--pura-border-strong); cursor: pointer;
    transition: background var(--pura-dur) var(--pura-ease),
      width var(--pura-dur) var(--pura-ease);
  }
  .dot:hover { background: var(--pura-muted); }
  .dot.active { background: var(--pura-primary); width: 1.25rem; }
  .dot:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }

  :host([hide-dots]) .dots { display: none; }
`;

define("pura-carousel", PuraCarousel);
export { PuraCarousel };
