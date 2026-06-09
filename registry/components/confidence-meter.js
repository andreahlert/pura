// <pura-confidence-meter> — a meter whose MOTION encodes an agent's confidence.
// The fill width is the value; the speed of a specular shimmer (and a faint
// jitter at the low end) carries the qualitative state, so a glance reads
// "confident" vs "unsure" before any number is parsed. Built for agent UIs that
// want to surface model certainty without a wall of text.
//
// Attributes:
//   value — 0..1 (a bare percentage like "75" is read as 0.75); clamped.
//   state — optional free-form phase label (e.g. "thinking", "verifying",
//           "done"); echoed in the event + aria-label, never required.
//   label — optional caption shown above the bar (e.g. "Answer confidence").
//   hide-value — hide the numeric percent readout (bar + label only).
//
// Property: .value (number 0..1), .level ("low" | "medium" | "high").
// Method:  setValue(v) — set value via the attribute (source of truth) and sync.
// Event:   confidencechange { value, level, state } — on any value/state change.
//
// ARIA: role="meter" on the host with aria-valuemin/now/max and a self-
//   describing aria-label resolved through i18n.
//
// Agent-native layer: stable data-pura-confidence-{value,level,state} mirror the
//   live state and each instance registers in window.__puraConfidenceMeters keyed
//   by data-pura-id, so an agent can read or drive every meter on the page.
//
// Reduced motion: base.js RESET collapses animation-duration, so the shimmer and
//   jitter rest; the value, color, and ARIA still convey confidence.
import { PuraElement, define } from "../base.js";
import meta from "./confidence-meter.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";
import { confidenceMeterTemplate } from "./confidence-meter.template.js";

registerMessages({
  "confidence.label": {
    en: "Confidence",
    "pt-BR": "Confiança",
    fr: "Confiance",
    de: "Konfidenz",
    it: "Affidabilità",
  },
  "confidence.low": {
    en: "low confidence",
    "pt-BR": "confiança baixa",
    fr: "confiance faible",
    de: "geringe Konfidenz",
    it: "affidabilità bassa",
  },
  "confidence.medium": {
    en: "moderate confidence",
    "pt-BR": "confiança moderada",
    fr: "confiance modérée",
    de: "mittlere Konfidenz",
    it: "affidabilità moderata",
  },
  "confidence.high": {
    en: "high confidence",
    "pt-BR": "confiança alta",
    fr: "confiance élevée",
    de: "hohe Konfidenz",
    it: "affidabilità alta",
  },
});

let uid = 0;

function registry() {
  return (window.__puraConfidenceMeters ||= new Map());
}

// Parse the `value` attribute into a clamped 0..1 number. A value above 1 is
// treated as a percentage (so "75" -> 0.75); non-finite input falls to 0.
export function resolveValue(el) {
  const raw = el.getAttribute("value");
  if (raw == null || raw === "") return 0;
  let n = Number(raw);
  if (!Number.isFinite(n)) return 0;
  if (n > 1) n = n / 100;
  return Math.max(0, Math.min(1, n));
}

// Bucket a 0..1 value into a qualitative level.
export function levelFor(v) {
  if (v < 0.34) return "low";
  if (v < 0.67) return "medium";
  return "high";
}

// Shimmer cadence per level: confident glides, uncertain flickers.
const SPEED = { low: "0.9s", medium: "1.8s", high: "3.2s" };
const GLOW = { low: "0px", medium: "3px", high: "8px" };
const LEVEL_KEY = { low: "confidence.low", medium: "confidence.medium", high: "confidence.high" };

class PuraConfidenceMeter extends PuraElement {
  static observedAttributes = ["value", "state", "label", "hide-value"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-confidence-meter-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    const { html, css } = confidenceMeterTemplate(this);
    this.render(html, css);

    this._head = this.$(".head");
    this._labelEl = this.$(".label");
    this._valueEl = this.$(".value");
    this._fill = this.$(".fill");

    // role=meter lives on the host so it is exposed even via the light-DOM node.
    this.setAttribute("role", "meter");
    this._value = null; // force the first _sync to emit nothing but paint state

    this._sync();
    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
    this._i18nOff?.();
  }

  attributeChangedCallback() {
    if (this._fill) this._sync();
  }

  get value() { return resolveValue(this); }
  get level() { return levelFor(this.value); }
  get state() { return this.getAttribute("state") || null; }

  setValue(v) {
    this.setAttribute("value", String(v));
    if (this._fill) this._sync();
    return this;
  }

  _applyI18n() {
    if (this._fill) this._sync();
  }

  _sync() {
    const v = resolveValue(this);
    const level = levelFor(v);
    const state = this.getAttribute("state") || null;
    const pct = Math.round(v * 1000) / 10; // one decimal
    const valueStr = String(Math.round(v * 100) / 100);

    // Paint.
    this.style.setProperty("--pura-conf-pct", pct + "%");
    this.style.setProperty("--pura-conf-speed", SPEED[level]);
    this.style.setProperty("--pura-conf-glow", GLOW[level]);

    const label = this.getAttribute("label") || "";
    this._labelEl.textContent = label;
    const showValue = !this.hasAttribute("hide-value");
    this._valueEl.textContent = showValue ? Math.round(pct) + "%" : "";
    const showHead = !!label || showValue;
    if (showHead) this._head.removeAttribute("hidden");
    else this._head.setAttribute("hidden", "");

    // ARIA on the host (role=meter).
    this.setAttribute("aria-valuemin", "0");
    this.setAttribute("aria-valuemax", "1");
    this.setAttribute("aria-valuenow", valueStr);
    const levelText = t(LEVEL_KEY[level]);
    const head = label || t("confidence.label");
    const aria = `${head}: ${Math.round(pct)}% (${levelText}${state ? `, ${state}` : ""})`;
    this.setAttribute("aria-label", aria);
    this.setAttribute("aria-valuetext", `${Math.round(pct)}% — ${levelText}`);

    // Agent-native mirror.
    this.setAttribute("data-pura-confidence-value", valueStr);
    this.setAttribute("data-pura-confidence-level", level);
    if (state) this.setAttribute("data-pura-confidence-state", state);
    else this.removeAttribute("data-pura-confidence-state");

    // Emit only on a real change. The first paint seeds _value from null, so it
    // never emits; later syncs compare against the last painted value.
    const first = this._value === null;
    const changed = this._value !== valueStr || this._state !== state;
    this._value = valueStr;
    this._state = state;
    if (changed && !first) {
      this.dispatchEvent(new CustomEvent("confidencechange", {
        bubbles: true,
        detail: { value: v, level, state },
      }));
    }
  }
}

define("pura-confidence-meter", PuraConfidenceMeter, meta);
export { PuraConfidenceMeter };
