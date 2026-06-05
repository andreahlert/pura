// pura — base class for all components.
// Thin wrapper over HTMLElement: open Shadow DOM, a shared reset, and a small
// render helper. Zero dependencies, zero build step.

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

export class PuraElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  // Render markup + scoped CSS into the shadow root. RESET is prepended once.
  render(html, css = "") {
    this.shadowRoot.innerHTML = `<style>${RESET}${css}</style>${html}`;
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
}

export function define(tag, cls) {
  if (!customElements.get(tag)) customElements.define(tag, cls);
}
