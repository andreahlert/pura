// <pura-scroll-progress> — reading-progress bar fixed at the top of the
// viewport. It fills from 0% to 100% as the document is scrolled from top to
// bottom, updating on scroll (and resize/reflow) via requestAnimationFrame.
//
// Attributes:
//   color  — author-supplied fill color (any valid CSS color). Defaults to
//            var(--pura-primary). The track stays transparent.
//   height — bar thickness (any valid CSS length, e.g. "3px", "0.25rem").
//            Defaults to 3px.
//
// Parts:
//   bar (the fixed positioning context / track), fill (the growing indicator).
//
// ARIA: the bar carries role="progressbar" with aria-valuemin="0",
//   aria-valuemax="100" and a live aria-valuenow. It is a read-only display
//   (no keyboard interaction). The fill transition is neutralized under
//   prefers-reduced-motion by the base reset, and progress is never conveyed
//   by motion alone (the static fill width carries the meaning).
//
// Agent-native layer: stable data-pura-scroll-progress-* attributes mirror the
//   live scroll percentage / pixel offsets, and each instance registers in
//   window.__puraScrollProgress keyed by its data-pura-id, so an agent can read
//   every reading-progress bar on the page without DOM diving.
//
// Degrades gracefully: with no attributes and a page that does not scroll, the
//   percentage is 0 (never NaN) and connectedCallback never throws.
import { PuraElement, define } from "../base.js";
import meta from "./scroll-progress.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";

registerMessages({
  "scroll-progress.aria": {
    en: "Reading progress",
    "pt-BR": "Progresso de leitura",
    fr: "Progression de lecture",
    de: "Lesefortschritt",
    it: "Avanzamento della lettura",
  },
});

let uid = 0;

// Lazily-created global registry: data-pura-id -> element.
function registry() {
  return (window.__puraScrollProgress ||= new Map());
}

class PuraScrollProgress extends PuraElement {
  static observedAttributes = ["color", "height"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-scroll-progress-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    this.render(
      `<div class="bar" part="bar" role="progressbar"
            aria-label="${t("scroll-progress.aria")}"
            aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
         <div class="fill" part="fill"></div>
       </div>`,
      CSS
    );

    this._bar = this.$(".bar");
    this._fill = this.$(".fill");

    // rAF coalescing: a burst of scroll/resize events schedules at most one
    // frame. _ticking guards against piling up rAF callbacks.
    this._ticking = false;
    this._rafId = 0;
    this._onScroll = () => this._schedule();
    this._onResize = () => this._schedule();

    window.addEventListener("scroll", this._onScroll, { passive: true });
    window.addEventListener("resize", this._onResize, { passive: true });

    this._syncStyle();
    // Compute once on connect: the page may already be scrolled on load.
    this._update();

    // React to locale changes with a targeted aria-label update (no re-render,
    // which would re-add the scroll/resize listeners).
    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    window.removeEventListener("scroll", this._onScroll);
    window.removeEventListener("resize", this._onResize);
    if (this._rafId) cancelAnimationFrame(this._rafId);
    this._rafId = 0;
    this._ticking = false;
    this._i18nOff?.();
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  // Update only the already-rendered i18n nodes in place. Must not re-render or
  // re-add any global listener.
  _applyI18n() {
    if (this._bar) this._bar.setAttribute("aria-label", t("scroll-progress.aria"));
  }

  attributeChangedCallback() {
    if (this._fill) this._syncStyle();
  }

  // ---- public API ---------------------------------------------------------
  // Current reading progress, 0..100. Read-only (driven by scroll position).
  get percent() {
    return this._computePercent().percent;
  }

  // ---- internals ----------------------------------------------------------
  _schedule() {
    if (this._ticking) return;
    this._ticking = true;
    this._rafId = requestAnimationFrame(() => {
      this._ticking = false;
      this._rafId = 0;
      this._update();
    });
  }

  // Derive scroll metrics. Guards the no-scroll case (max <= 0) so the result
  // is 0, never NaN — this is the graceful-degrade path for short pages.
  _computePercent() {
    const doc = document.documentElement;
    const scrollTop = window.scrollY || doc.scrollTop || 0;
    const max = doc.scrollHeight - doc.clientHeight;
    const percent = max > 0 ? Math.max(0, Math.min(100, (scrollTop / max) * 100)) : 0;
    return { percent, scrollTop, max };
  }

  _update() {
    if (!this._fill) return;
    const { percent, scrollTop, max } = this._computePercent();
    const rounded = Math.round(percent);

    this._fill.style.width = percent + "%";
    this._bar.setAttribute("aria-valuenow", String(rounded));

    // Agent-native: stable, machine-readable mirror of live scroll state.
    this.setAttribute("data-pura-scroll-progress-percent", String(rounded));
    this.setAttribute("data-pura-scroll-progress-scrolltop", String(Math.round(scrollTop)));
    this.setAttribute("data-pura-scroll-progress-scrollmax", String(Math.round(max)));

    this.dispatchEvent(
      new CustomEvent("pura-scroll-progress", {
        bubbles: true,
        composed: true,
        detail: { percent: rounded, scrollTop, max },
      })
    );
  }

  // Apply author-supplied color/height as custom properties consumed by the CSS.
  _syncStyle() {
    const color = this.getAttribute("color");
    const height = this.getAttribute("height");
    if (color) this.style.setProperty("--_sp-color", color);
    else this.style.removeProperty("--_sp-color");
    if (height) this.style.setProperty("--_sp-height", height);
    else this.style.removeProperty("--_sp-height");
  }
}

const CSS = `
  :host { display: contents; }

  .bar {
    position: fixed;
    top: 0; left: 0; right: 0;
    width: 100%;
    height: var(--_sp-height, 3px);
    background: transparent;
    z-index: 2147483646;
    pointer-events: none;
  }

  .fill {
    height: 100%;
    width: 0%;
    background: var(--_sp-color, var(--pura-primary));
    transition: width var(--pura-dur) var(--pura-ease);
  }
`;

define("pura-scroll-progress", PuraScrollProgress, meta);
export { PuraScrollProgress };
