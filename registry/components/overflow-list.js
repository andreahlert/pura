// <pura-overflow-list> is a responsive horizontal container that shows as many
// slotted children as fit on one line and collapses the rest into a trailing
// overflow menu. It observes its own width with a ResizeObserver, measures each
// child, hides the ones that overflow, and shows a "+N more" button that opens a
// popover listing the hidden items (cloned into the menu). Recompute happens on
// resize and on slotchange. When nothing overflows the more button is hidden.
//
// Attributes:
//   min-visible (number) always show at least N items, even if they overflow.
//   gap (CSS length, default 0.5rem) horizontal gap between items.
// Dispatches an "overflowchange" CustomEvent with detail { visible, hidden } as
// counts (not element arrays).
// Parts: list, item, more, menu.
import { PuraElement, define } from "../base.js";
import meta from "./overflow-list.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";
import { overflowListTemplate } from "./overflow-list.template.js";

let uid = 0;

const LEN = /^[\d.]+(px|rem|em|vw|ch)$/i;

registerMessages({
  "overflowList.more": {
    en: "{n} more",
    "pt-BR": "mais {n}",
    fr: "{n} de plus",
    de: "{n} weitere",
    it: "altri {n}",
  },
});

class PuraOverflowList extends PuraElement {
  static observedAttributes = ["min-visible", "gap"];

  connectedCallback() {
    this._anchor = `--pura-overflow-${uid++}`;
    const { html, css } = overflowListTemplate(this);
    this.render(html, css);

    this._list = this.$(".list");
    this._slot = this.$("slot");
    this._more = this.$(".more");
    this._menu = this.$(".menu");

    this._more.addEventListener("click", () => this._menu.togglePopover());
    this._menu.addEventListener("toggle", (e) => {
      this._more.setAttribute("aria-expanded", e.newState === "open" ? "true" : "false");
    });

    this._slot.addEventListener("slotchange", () => this._schedule());

    this._applyGap();
    this._updateMoreLabel(0);

    if (typeof ResizeObserver === "function") {
      this._ro = new ResizeObserver(() => this._schedule());
      this._ro.observe(this);
    } else {
      this._onWin = () => this._schedule();
      window.addEventListener("resize", this._onWin, { passive: true });
    }

    this._i18nOff = onLocaleChange(() => this._updateMoreLabel(this._hiddenCount || 0));
    this._schedule();
  }

  disconnectedCallback() {
    this._ro?.disconnect();
    if (this._onWin) window.removeEventListener("resize", this._onWin);
    cancelAnimationFrame(this._raf);
    this._i18nOff?.();
  }

  attributeChangedCallback(name) {
    if (!this._list) return;
    if (name === "gap") this._applyGap();
    this._schedule();
  }

  _applyGap() {
    const v = (this.getAttribute("gap") || "").trim();
    if (v && LEN.test(v)) this.style.setProperty("--overflow-gap", v);
    else this.style.removeProperty("--overflow-gap");
  }

  _minVisible() {
    const v = parseInt(this.getAttribute("min-visible"), 10);
    return Number.isFinite(v) && v >= 0 ? v : 0;
  }

  // Batch through rAF with a reentry guard so mutating layout inside the
  // ResizeObserver callback does not trigger a feedback loop.
  _schedule() {
    if (this._raf) return;
    this._raf = requestAnimationFrame(() => {
      this._raf = 0;
      this._recompute();
    });
  }

  _children() {
    return this._slot.assignedElements();
  }

  _recompute() {
    const items = this._children();

    // Measure pass: reveal everything first so offsetWidth is meaningful.
    for (const el of items) el.hidden = false;
    this._more.hidden = false;

    const gap = this._gapPx();
    const avail = this._list.clientWidth;
    const moreW = this._more.offsetWidth;
    const minVisible = this._minVisible();

    // Widths captured with all items visible (display:none reports 0).
    const widths = items.map((el) => el.offsetWidth);

    // First, find how many fit assuming no more button is needed.
    let fitAll = 0;
    let used = 0;
    for (let i = 0; i < items.length; i++) {
      const add = widths[i] + (i > 0 ? gap : 0);
      if (used + add <= avail) {
        used += add;
        fitAll = i + 1;
      } else break;
    }

    let visibleCount;
    if (fitAll === items.length) {
      visibleCount = items.length; // everything fits, no overflow
    } else {
      // Some overflow: reserve room for the more button and recount.
      const budget = avail - (moreW + (items.length ? gap : 0));
      let count = 0;
      let w = 0;
      for (let i = 0; i < items.length; i++) {
        const add = widths[i] + (i > 0 ? gap : 0);
        if (w + add <= budget) {
          w += add;
          count = i + 1;
        } else break;
      }
      visibleCount = count;
    }

    // Honor min-visible (clamped to the item count).
    visibleCount = Math.max(visibleCount, Math.min(minVisible, items.length));

    const hidden = [];
    items.forEach((el, i) => {
      const show = i < visibleCount;
      el.hidden = !show;
      if (!show) hidden.push(el);
    });

    this._hiddenCount = hidden.length;
    if (hidden.length) {
      this._fillMenu(hidden);
      this._updateMoreLabel(hidden.length);
      this._more.hidden = false;
    } else {
      this._menu.hidePopover?.();
      this._menu.replaceChildren();
      this._more.hidden = true;
    }

    // Only emit when the split actually changed (avoid event spam per resize
    // tick), matching the change-only behavior of pura-container.
    if (this._prevVisible !== visibleCount || this._prevHidden !== hidden.length) {
      this._prevVisible = visibleCount;
      this._prevHidden = hidden.length;
      this.dispatchEvent(
        new CustomEvent("overflowchange", {
          bubbles: true,
          detail: { visible: visibleCount, hidden: hidden.length },
        })
      );
    }
  }

  // Clone hidden items into the menu. Clones do not reflect later state changes,
  // which is acceptable: the menu is rebuilt on every recompute.
  _fillMenu(hidden) {
    const frag = document.createDocumentFragment();
    for (const el of hidden) {
      const wrap = document.createElement("div");
      wrap.className = "menu-item";
      wrap.setAttribute("part", "item menu-item");
      wrap.setAttribute("role", "menuitem");
      wrap.appendChild(el.cloneNode(true));
      frag.appendChild(wrap);
    }
    this._menu.replaceChildren(frag);
  }

  _updateMoreLabel(n) {
    if (this._more) this._more.textContent = t("overflowList.more", { n });
  }

  _gapPx() {
    // Resolve the effective gap (CSS length) to pixels via the computed style.
    const cs = getComputedStyle(this._list);
    const g = parseFloat(cs.columnGap || cs.gap || "0");
    return Number.isFinite(g) ? g : 0;
  }
}


define("pura-overflow-list", PuraOverflowList, meta);
export { PuraOverflowList };
