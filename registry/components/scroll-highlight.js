// <pura-scroll-highlight> — text that highlights word by word as you scroll,
// like a reader following the line. The motion.dev "highlight text" move, done
// natively: the host carries a named view timeline and every word span animates
// its color on that shared timeline, each with its own animation-range slice,
// so the highlight sweeps through the words 1:1 with scroll and no per-frame
// JS runs.
//
// Attributes:
//   start — view progress (cover %) where the first word begins (default 10).
//   end   — view progress (cover %) where the last word finishes (default 75).
//
// Tokens: --pura-scroll-highlight-color (highlighted, default currentColor) and
//   --pura-scroll-highlight-base (dimmed, default 30% currentColor).
//
// SSR / pre-JS: the slotted text renders in its normal color. No
// scroll-timeline support or reduced motion: words show highlighted.
//
// Agent-native layer: each instance registers in window.__puraScrollHighlights
//   by data-pura-id with { words, el }; data-pura-shl-* mirror config.
import { PuraElement, define } from "../base.js";
import meta from "./scroll-highlight.meta.js";
import { scrollHighlightTemplate } from "./scroll-highlight.template.js";

let uid = 0;

function registry() {
  return (window.__puraScrollHighlights ||= new Map());
}

class PuraScrollHighlight extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-scroll-highlight-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = scrollHighlightTemplate(this);
    this.render(html, css);

    this._build();
    registry().set(this._id, {
      id: this._id,
      words: this._words?.length || 0,
      el: this,
    });
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get start() {
    const n = parseFloat(this.getAttribute("start"));
    return Number.isFinite(n) ? Math.max(0, Math.min(100, n)) : 10;
  }
  get end() {
    const n = parseFloat(this.getAttribute("end"));
    const v = Number.isFinite(n) ? Math.max(0, Math.min(100, n)) : 75;
    return Math.max(v, this.start + 1);
  }

  // ---- internals ------------------------------------------------------------
  // Split the slotted text into word spans, each with its own contiguous slice
  // of the host's view timeline.
  _build() {
    const text = (this.textContent || "").replace(/\s+/g, " ").trim();
    const wrap = this.$(".wrap");
    this._words = text ? text.split(" ") : [];
    const n = this._words.length;
    if (!n) return;

    const start = this.start;
    const span = this.end - start;
    const frag = document.createDocumentFragment();
    this._words.forEach((word, i) => {
      const s = document.createElement("span");
      s.className = "word";
      s.textContent = word;
      const rs = start + (span * i) / n;
      const re = start + (span * (i + 1)) / n;
      s.style.animationRange = `cover ${rs.toFixed(2)}% cover ${re.toFixed(2)}%`;
      frag.appendChild(s);
      if (i < n - 1) frag.appendChild(document.createTextNode(" "));
    });
    wrap.replaceChildren(frag);

    this.setAttribute("data-pura-shl-ready", "");
    this.setAttribute("data-pura-shl-words", String(n));
  }
}

define("pura-scroll-highlight", PuraScrollHighlight, meta);
export { PuraScrollHighlight };
