// <pura-burger>. A hamburger menu toggle button that animates between a
// hamburger glyph and an X. Three lines morph into the cross when open. Clicking
// toggles the `open` state and dispatches a "change" CustomEvent (detail {open}).
// The control is a real <button>, so it gets Enter/Space keyboard handling for
// free, with aria-expanded and an accessible label. prefers-reduced-motion is
// respected via the base reset (transition durations collapse).
//
// Attributes:
//   open    boolean, reflects the toggled state.
//   size    CSS length for the glyph box (default "1.5rem").
//   label   accessible label (i18n default "Menu").
//
// Events:
//   change  CustomEvent({ detail: { open } }) on every toggle.
//
// Parts: button, line
import { PuraElement, define } from "../base.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";

registerMessages({
  "burger.label": {
    en: "Menu",
    "pt-BR": "Menu",
    fr: "Menu",
    de: "Menü",
    it: "Menu",
  },
});

class PuraBurger extends PuraElement {
  static observedAttributes = ["open", "size", "label"];

  connectedCallback() {
    const size = this.getAttribute("size") || "1.5rem";
    this.render(
      `<button part="button" type="button"
         aria-expanded="${this.hasAttribute("open") ? "true" : "false"}"
         aria-label="${this._esc(this.getAttribute("label") || t("burger.label"))}"
         style="--burger-size: ${this._esc(size)}">
         <span class="lines" aria-hidden="true">
           <span part="line" class="line"></span>
           <span part="line" class="line"></span>
           <span part="line" class="line"></span>
         </span>
       </button>`,
      CSS
    );

    this._btn = this.$("button");
    this._onClick = () => this.toggle();
    this._btn.addEventListener("click", this._onClick);

    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this._i18nOff?.();
    this._i18nOff = null;
  }

  attributeChangedCallback(name, _old, val) {
    if (!this._btn) return;
    if (name === "open") {
      this._btn.setAttribute("aria-expanded", this.hasAttribute("open") ? "true" : "false");
    } else if (name === "size") {
      this._btn.style.setProperty("--burger-size", val || "1.5rem");
    } else if (name === "label") {
      // Keep an explicit label in sync; fall back to the i18n default.
      this._btn.setAttribute("aria-label", val || t("burger.label"));
    }
  }

  _applyI18n() {
    if (this._btn && !this.hasAttribute("label")) {
      this._btn.setAttribute("aria-label", t("burger.label"));
    }
  }

  toggle() {
    const next = !this.hasAttribute("open");
    if (next) this.setAttribute("open", "");
    else this.removeAttribute("open");
    this.dispatchEvent(new CustomEvent("change", { detail: { open: next }, bubbles: true }));
  }

  get open() { return this.hasAttribute("open"); }
  set open(v) {
    if (v) this.setAttribute("open", "");
    else this.removeAttribute("open");
  }

  _esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
}

const CSS = `
  :host { display: inline-block; }

  button {
    display: inline-grid; place-items: center;
    width: calc(var(--burger-size) + var(--pura-space-3));
    height: calc(var(--burger-size) + var(--pura-space-3));
    padding: 0; margin: 0;
    background: transparent;
    border: 1px solid transparent;
    border-radius: var(--pura-radius-sm);
    color: var(--pura-fg);
    cursor: pointer;
  }
  button:hover { background: var(--pura-subtle); }
  button:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }

  .lines {
    position: relative;
    width: var(--burger-size);
    height: var(--burger-size);
  }
  .line {
    position: absolute;
    left: 12%;
    width: 76%;
    height: 2px;
    border-radius: var(--pura-radius-full);
    background: currentColor;
    transition: transform var(--pura-dur) var(--pura-ease),
      opacity var(--pura-dur) var(--pura-ease),
      top var(--pura-dur) var(--pura-ease);
  }
  .line:nth-child(1) { top: 30%; }
  .line:nth-child(2) { top: 50%; }
  .line:nth-child(3) { top: 70%; }

  /* Morph to an X when open. */
  :host([open]) .line:nth-child(1) { top: 50%; transform: rotate(45deg); }
  :host([open]) .line:nth-child(2) { opacity: 0; }
  :host([open]) .line:nth-child(3) { top: 50%; transform: rotate(-45deg); }
`;

define("pura-burger", PuraBurger);
export { PuraBurger };
