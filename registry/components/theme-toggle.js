// <pura-theme-toggle> — animated light/dark switch: clicking it wraps the
// document.documentElement.dataset.theme flip in a View Transition and reveals
// the new theme as a circle growing from the button's center (clip-path
// circle() animated on ::view-transition-new(root)), instead of an abrupt
// swap. Plugs straight into pura's theme infra ([data-theme] + tokens.css).
//
// Attributes:
//   duration — circular reveal time in ms (default 500).
//   easing   — reveal easing (default "ease-in-out").
//
// Events:
//   toggle — fired after the theme flips, detail { theme } (bubbles, composed).
//
// Tokens: --pura-theme-toggle-size, --pura-theme-toggle-icon-size,
//   --pura-theme-toggle-color, --pura-theme-toggle-bg,
//   --pura-theme-toggle-hover-bg, --pura-theme-toggle-border,
//   --pura-theme-toggle-radius.
//
// SSR / pre-JS: a static button whose sun/moon icon already matches
// prefers-color-scheme. Browsers without the View Transitions API and
// reduced motion: instant theme swap, no reveal, no icon spin.
//
// Agent-native layer: each instance registers in window.__puraThemeToggles by
//   data-pura-id with { theme, toggle, setTheme, el }; the resolved theme is
//   mirrored on data-pura-theme-state.
import { PuraElement, define } from "../base.js";
import meta from "./theme-toggle.meta.js";
import { themeToggleTemplate } from "./theme-toggle.template.js";

let uid = 0;

function registry() {
  return (window.__puraThemeToggles ||= new Map());
}

// The default View Transition cross-fade would fight the clip-path reveal, so
// while a toggle-driven transition runs (root carries data-pura-theme-toggling)
// both snapshots sit still and the circle does all the work. Injected once,
// document-level, because ::view-transition-* lives outside any shadow root.
function ensureViewTransitionStyle() {
  if (document.getElementById("pura-theme-toggle-vt")) return;
  const style = document.createElement("style");
  style.id = "pura-theme-toggle-vt";
  style.textContent = `
    :root[data-pura-theme-toggling]::view-transition-old(root),
    :root[data-pura-theme-toggling]::view-transition-new(root) {
      animation: none;
      mix-blend-mode: normal;
    }
  `;
  document.head.appendChild(style);
}

class PuraThemeToggle extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-theme-toggle-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = themeToggleTemplate(this);
    this.render(html, css);

    this._btn = this.$("button");
    this._onClick = () => this.toggle();
    this._btn.addEventListener("click", this._onClick);

    // Stay in sync when the theme changes elsewhere (another toggle, the docs
    // site, the OS) so every instance shows the right icon and label.
    this._media = window.matchMedia("(prefers-color-scheme: dark)");
    this._onMedia = () => this._sync();
    this._media.addEventListener?.("change", this._onMedia);
    this._observer = new MutationObserver(() => this._sync());
    this._observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    this._sync();

    registry().set(this._id, {
      id: this._id,
      theme: this.theme,
      toggle: () => this.toggle(),
      setTheme: (t) => this.setTheme(t),
      el: this,
    });
  }

  disconnectedCallback() {
    this._btn?.removeEventListener("click", this._onClick);
    this._media?.removeEventListener?.("change", this._onMedia);
    this._observer?.disconnect();
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get duration() {
    const n = parseFloat(this.getAttribute("duration"));
    return Number.isFinite(n) && n > 0 ? n : 500;
  }
  get easing() {
    return this.getAttribute("easing") || "ease-in-out";
  }

  // ---- public API -----------------------------------------------------------
  // The resolved theme: explicit [data-theme] on the root wins, otherwise the
  // OS preference (same resolution tokens.css applies).
  get theme() {
    const t = document.documentElement.dataset.theme;
    if (t === "dark" || t === "light") return t;
    return this._media?.matches ? "dark" : "light";
  }

  toggle() {
    this.setTheme(this.theme === "dark" ? "light" : "dark");
  }

  setTheme(next) {
    next = next === "dark" ? "dark" : "light";
    if (next === this.theme) {
      this._sync();
      return;
    }

    const apply = () => {
      document.documentElement.dataset.theme = next;
      this.dispatchEvent(
        new CustomEvent("toggle", { detail: { theme: next }, bubbles: true, composed: true }),
      );
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof document.startViewTransition !== "function") {
      apply();
      return;
    }

    ensureViewTransitionStyle();
    const root = document.documentElement;
    root.setAttribute("data-pura-theme-toggling", "");
    const vt = document.startViewTransition(apply);
    vt.ready
      .then(() => {
        const rect = this._btn.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        const r = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y),
        );
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
          {
            duration: this.duration,
            easing: this.easing,
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      .catch(() => {});
    vt.finished.finally(() => root.removeAttribute("data-pura-theme-toggling"));
  }

  // ---- internals ------------------------------------------------------------
  _sync() {
    const theme = this.theme;
    // Spin the icon only on real changes, never on the initial hydrate paint.
    if (this._lastTheme !== undefined && this._lastTheme !== theme) {
      this.setAttribute("data-pura-tt-animate", "");
    }
    this._lastTheme = theme;
    this.setAttribute("data-pura-theme-state", theme);

    const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
    this._btn.setAttribute("aria-label", label);
    this._btn.setAttribute("title", label);

    const entry = registry().get(this._id);
    if (entry) entry.theme = theme;
  }
}

define("pura-theme-toggle", PuraThemeToggle, meta);
export { PuraThemeToggle };
