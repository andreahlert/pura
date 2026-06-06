// <pura-highlight> wraps matched substrings of its text in <mark>.
// Attributes:
//   query        string or comma-separated terms to match
//   text         the content; if absent, uses textContent / default slot
//   ignore-case  default true (set to "false" to make matching case sensitive)
//   whole-word   match only on word boundaries
// Parts: text, mark. Input is HTML-escaped, no injection.
import { PuraElement, define } from "../base.js";
import meta from "./highlight.meta.js";

class PuraHighlight extends PuraElement {
  static observedAttributes = ["query", "text", "ignore-case", "whole-word"];

  connectedCallback() {
    this.render(`<span part="text" class="text"></span>`, CSS);
    this._out = this.$(".text");
    this._update();
  }

  attributeChangedCallback() {
    if (this.isConnected) this._update();
  }

  _source() {
    if (this.hasAttribute("text")) return this.getAttribute("text") || "";
    return this.textContent || "";
  }

  _ignoreCase() {
    const v = this.getAttribute("ignore-case");
    return v !== "false"; // default true
  }

  _terms() {
    const q = this.getAttribute("query") || "";
    return q
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  _update() {
    if (!this._out) return;
    const text = this._source();
    const terms = this._terms();
    if (!terms.length) {
      this._out.textContent = text;
      return;
    }
    const flags = this._ignoreCase() ? "gi" : "g";
    const wholeWord = this.bool("whole-word");
    const pattern = terms
      .map(escapeRe)
      .map((p) => (wholeWord ? `\\b${p}\\b` : p))
      .join("|");

    let re;
    try {
      re = new RegExp(`(${pattern})`, flags);
    } catch {
      this._out.textContent = text;
      return;
    }

    // Build HTML by escaping each piece, only the matches get wrapped.
    let html = "";
    let last = 0;
    for (const m of text.matchAll(re)) {
      const idx = m.index;
      if (idx > last) html += esc(text.slice(last, idx));
      html += `<mark part="mark">${esc(m[0])}</mark>`;
      last = idx + m[0].length;
      // Guard against zero-length matches to avoid infinite loops.
      if (m[0].length === 0) {
        if (last < text.length) html += esc(text[last]);
        last += 1;
      }
    }
    if (last < text.length) html += esc(text.slice(last));
    this._out.innerHTML = html;
  }
}

function escapeRe(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function esc(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

const CSS = `
  :host { display: inline; }
  .text { color: inherit; font: inherit; }
  mark {
    background: var(--pura-warning-bg);
    color: var(--pura-fg);
    border-radius: var(--pura-radius-sm);
    padding: 0 0.1em;
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--pura-warning) 35%, transparent);
  }
`;

define("pura-highlight", PuraHighlight, meta);
export { PuraHighlight };
