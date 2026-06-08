// pura — base class for all components.
// Thin wrapper over HTMLElement: open Shadow DOM, a shared reset, and a small
// render helper. Zero dependencies, zero build step.

const META = new Map();

const RESET = `
  :host { box-sizing: border-box; font-family: var(--pura-font); }
  :host *, :host *::before, :host *::after { box-sizing: border-box; }
  :host([hidden]) { display: none !important; }
  @media (prefers-reduced-motion: reduce) {
    :host *, :host *::before, :host *::after {
      transition-duration: 0.01ms !important;
      animation-duration: 0.01ms !important;
    }
  }
`;

const HTMLElementBase = typeof HTMLElement !== "undefined" ? HTMLElement : class {};
export class PuraElement extends HTMLElementBase {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  // Render markup + scoped CSS into the shadow root. RESET is prepended once.
  render(html, css = "") {
    this.shadowRoot.innerHTML = `<style>${RESET}${css}</style>${html}`;
  }

  // Light-DOM render path used by ejected components: writes to the element's
  // own children (no shadow root) so the consuming app's CSS can target classes.
  renderLight(html, css = "") {
    this.innerHTML = (css ? `<style>${css}</style>` : "") + html;
  }

  $(sel) {
    return this.shadowRoot.querySelector(sel);
  }

  $$(sel) {
    return [...this.shadowRoot.querySelectorAll(sel)];
  }

  // Reflect a boolean attribute as a property-like helper.
  bool(name) {
    return this.hasAttribute(name);
  }

  describe() {
    return META.get(this.tagName.toLowerCase()) || null;
  }
}

export function renderDSD(tag, { html, css }, attrs = {}) {
  const attrStr = Object.entries(attrs).map(([k, v]) => ` ${k}="${v}"`).join("");
  return `<${tag}${attrStr}><template shadowrootmode="open"><style>${RESET}${css}</style>${html}</template></${tag}>`;
}

export function define(tag, cls, meta) {
  if (meta) {
    META.set(tag, meta);
    cls.puraMeta = meta;
    if (meta.name) {
      const orig = cls.prototype.connectedCallback;
      cls.prototype.connectedCallback = function () {
        if (meta.name) this.setAttribute("data-pura", meta.name);
        if (orig) orig.call(this);
      };
    }
  }
  if (!customElements.get(tag)) customElements.define(tag, cls);
}
