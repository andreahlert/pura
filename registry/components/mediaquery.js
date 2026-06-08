// <pura-mediaquery> — AGENT-NATIVE declarative responsive rendering. Evaluates a
// CSS media query and conditionally projects content: the slot name="match" when
// the query currently matches, the slot name="default" (or the unnamed default
// slot) otherwise. Updates live as the viewport / environment changes.
//
// Attributes:
//   query — the media query string, e.g. "(max-width: 640px)". Absent/invalid =>
//           never matches, so the default content is shown. (observed: live swap)
// Slots:
//   match   — shown only while the query matches.
//   default — shown only while the query does NOT match. The unnamed default slot
//             is also treated as the "no match" fallback for ergonomic markup.
// Properties (agent-callable):
//   .matches  — boolean, current match state (read-only).
//   .query    — get/set the media query string (mirrors the attribute).
// Events:
//   pura-mediaquery:change — bubbles, detail { query, matches }, on every change
//                            (including the initial evaluation).
// Machine-readable layer:
//   - stable data-* on the host: data-pura="mediaquery", data-query, data-matches.
//   - global window.__puraMediaQueries registry: a live Map keyed by instance id
//     with { id, query, matches, el } entries, plus a query(forMatch) helper to
//     enumerate instances by current match state. Agents can read it to learn the
//     responsive state of the page without measuring the viewport.
import { PuraElement, define } from "../base.js";
import meta from "./mediaquery.meta.js";
import { mediaqueryTemplate } from "./mediaquery.template.js";

// Module-level counter for stable, unique ids per instance.
let uid = 0;

// Live global registry so agents can enumerate every media query on the page.
function registry() {
  if (!window.__puraMediaQueries) {
    const map = new Map();
    // Convenience: all instances whose current match state equals `state`.
    map.query = (state) =>
      [...map.values()].filter((m) => m.matches === !!state);
    window.__puraMediaQueries = map;
  }
  return window.__puraMediaQueries;
}

class PuraMediaQuery extends PuraElement {
  static observedAttributes = ["query"];

  connectedCallback() {
    this._id = this.id || `pura-mediaquery-${uid++}`;
    this._matches = false;

    const { html, css } = mediaqueryTemplate(this);
    this.render(html, css);

    this._listen();
    this._sync();
  }

  disconnectedCallback() {
    this._unlisten();
    registry().delete(this._id);
  }

  attributeChangedCallback(name) {
    // connectedCallback may not have run yet; guard on the rendered shadow root.
    if (name === "query" && this.shadowRoot && this.shadowRoot.childElementCount) {
      this._listen();
      this._sync();
    }
  }

  // Current match state (read-only).
  get matches() {
    return this._matches;
  }

  // The media query string (mirrors the attribute).
  get query() {
    return this.getAttribute("query") || "";
  }
  set query(value) {
    if (value == null || value === "") this.removeAttribute("query");
    else this.setAttribute("query", String(value));
  }

  // (Re)create the MediaQueryList + listener for the current query string.
  _listen() {
    this._unlisten();
    const q = this.getAttribute("query");
    if (!q || typeof window.matchMedia !== "function") {
      this._mql = null;
      return;
    }
    let mql = null;
    try {
      mql = window.matchMedia(q);
    } catch (_) {
      // Invalid query syntax: degrade gracefully (treated as "never matches").
      mql = null;
    }
    this._mql = mql;
    if (!mql) return;
    this._onChange = () => this._sync();
    // Modern API; addEventListener is the standard path.
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", this._onChange);
    } else if (typeof mql.addListener === "function") {
      // Legacy fallback.
      mql.addListener(this._onChange);
    }
  }

  _unlisten() {
    const mql = this._mql;
    if (mql && this._onChange) {
      if (typeof mql.removeEventListener === "function") {
        mql.removeEventListener("change", this._onChange);
      } else if (typeof mql.removeListener === "function") {
        mql.removeListener(this._onChange);
      }
    }
    this._mql = null;
    this._onChange = null;
  }

  // Evaluate, reflect machine-readable state, and emit a change event on delta.
  _sync() {
    const query = this.getAttribute("query") || "";
    const matches = !!(this._mql && this._mql.matches);
    const changed = matches !== this._matches || this.dataset.pura !== "mediaquery";
    this._matches = matches;

    // Drive the visual swap via a host attribute (styled in CSS).
    this.toggleAttribute("data-matches", matches);

    // Stable machine-readable attributes on the host (light DOM).
    this.dataset.pura = "mediaquery";
    if (query) this.dataset.query = query;
    else delete this.dataset.query;

    // Publish to the global registry (live entry).
    registry().set(this._id, {
      id: this._id,
      query: query || null,
      matches,
      el: this,
    });

    if (changed) {
      this.dispatchEvent(
        new CustomEvent("pura-mediaquery:change", {
          bubbles: true,
          detail: { query: query || null, matches },
        })
      );
    }
  }
}


define("pura-mediaquery", PuraMediaQuery, meta);
export { PuraMediaQuery };
