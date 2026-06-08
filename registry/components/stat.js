// <pura-stat> — metric / stat card. Big value + label + a colored delta with an
// up/down arrow (green up, red down, neutral flat).
// Attributes:
//   label  — descriptive caption for the metric (e.g. "Revenue")
//   value  — the headline figure (e.g. "$48.2k", "1,204")
//   delta  — change indicator text (e.g. "+12%", "-3.4%")
//   trend  — up | down | flat (drives arrow direction + color). When omitted,
//            it is inferred from the sign of `delta`.
// Slots:
//   icon   — optional leading icon (rendered in a tinted square)
// Agent-native layer: stable data-pura-stat-* attributes mirror live state and
//   each instance registers in window.__puraStats keyed by its data-pura-id, so
//   an agent can enumerate / read every metric on the page without DOM diving.
import { PuraElement, define } from "../base.js";
import meta from "./stat.meta.js";
import { statTemplate } from "./stat.template.js";

let uid = 0;

// Lazily-created global registry: data-pura-id -> element.
function registry() {
  return (window.__puraStats ||= new Map());
}

const TRENDS = new Set(["up", "down", "flat"]);

// Infer a trend from a delta string when `trend` is not explicitly set.
function inferTrend(delta) {
  if (!delta) return "flat";
  const s = String(delta).trim();
  if (s.startsWith("-") || s.startsWith("−")) return "down";
  if (s.startsWith("+")) return "up";
  const n = parseFloat(s.replace(/[^0-9.\-]/g, ""));
  if (Number.isFinite(n)) {
    if (n > 0) return "up";
    if (n < 0) return "down";
  }
  return "flat";
}

class PuraStat extends PuraElement {
  static observedAttributes = ["label", "value", "delta", "trend"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-stat-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    const { html, css } = statTemplate(this);
    this.render(html, css);

    this._root = this.$(".stat");
    this._iconWrap = this.$(".icon");
    this._labelEl = this.$(".label");
    this._valueEl = this.$(".value");
    this._deltaEl = this.$(".delta");
    this._arrowPath = this.$(".arrow-path");
    this._deltaText = this.$(".delta-text");

    // Hide the icon square unless something is actually slotted in.
    this._iconSlot = this.$('slot[name="icon"]');
    this._syncIcon();
    this._iconSlot.addEventListener("slotchange", () => this._syncIcon());

    this._sync();
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (this._root) this._sync();
  }

  // Resolved trend: explicit attribute (if valid) else inferred from delta.
  get trend() {
    const t = (this.getAttribute("trend") || "").toLowerCase();
    if (TRENDS.has(t)) return t;
    return inferTrend(this.getAttribute("delta"));
  }

  _syncIcon() {
    if (!this._iconSlot) return;
    const has = this._iconSlot.assignedNodes().length > 0;
    this._iconWrap.style.display = has ? "" : "none";
  }

  _sync() {
    const label = this.getAttribute("label") || "";
    const value = this.getAttribute("value") || "";
    const delta = this.getAttribute("delta") || "";
    const trend = this.trend;

    this._labelEl.textContent = label;
    this._valueEl.textContent = value;
    this._deltaText.textContent = delta;

    // Show the delta row only when there is a delta to communicate.
    this._deltaEl.style.display = delta ? "" : "none";

    // Arrow geometry per trend (drawn in a 16x16 box).
    const paths = {
      up: "M8 12.5 V3.5 M4 7.5 L8 3.5 L12 7.5",
      down: "M8 3.5 V12.5 M4 8.5 L8 12.5 L12 8.5",
      flat: "M3.5 8 H12.5",
    };
    this._arrowPath.setAttribute("d", paths[trend] || paths.flat);

    // Reflect resolved trend so CSS (color) and agents can read it.
    this._root.dataset.trend = trend;

    // ARIA: the group is labelled by the metric label; the value + delta read as
    // a clear, self-describing string for assistive tech / agents.
    const trendWord = trend === "up" ? "up" : trend === "down" ? "down" : "no change";
    const aria = [label, value].filter(Boolean).join(": ") +
      (delta ? `, ${trendWord} ${delta}` : "");
    this._root.setAttribute("aria-label", aria || "Statistic");
    if (delta) {
      this._deltaEl.setAttribute("aria-label", `${trendWord} ${delta}`);
    } else {
      this._deltaEl.removeAttribute("aria-label");
    }

    // Agent-native: stable, machine-readable mirror of live state.
    this.setAttribute("data-pura-stat-label", label);
    this.setAttribute("data-pura-stat-value", value);
    this.setAttribute("data-pura-stat-delta", delta);
    this.setAttribute("data-pura-stat-trend", trend);
  }
}


define("pura-stat", PuraStat, meta);
export { PuraStat };
