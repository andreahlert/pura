// pura-mask-input, a text input that enforces a format mask as the user types.
// Mask tokens: 9 = digit, A = letter, * = alphanumeric. Any other char is a
// literal inserted automatically (e.g. "(99) 99999-9999", "99/99/9999").
// Attributes: mask, placeholder, value, disabled. Dispatches "input" with
// detail { value, unmasked }. Parts: input.
import { PuraElement, define } from "../base.js";
import meta from "./mask-input.meta.js";

const TOKENS = {
  "9": (c) => /\d/.test(c),
  "A": (c) => /[A-Za-z]/.test(c),
  "*": (c) => /[A-Za-z0-9]/.test(c),
};

class PuraMaskInput extends PuraElement {
  static observedAttributes = ["mask", "placeholder", "value", "disabled"];

  connectedCallback() {
    this.render(
      `<input part="input" type="text"
         placeholder="${this.getAttribute("placeholder") || ""}"
         ${this.hasAttribute("disabled") ? "disabled" : ""} />`,
      CSS
    );
    this._input = this.$("input");
    this._mask = this.getAttribute("mask") || "";

    this._input.addEventListener("input", () => this._onInput());

    // Seed from the value attribute, masked.
    const seed = this.getAttribute("value") || "";
    if (seed) {
      const { masked } = this._apply(seed);
      this._input.value = masked;
      this.setAttribute("value", masked);
    }
  }

  attributeChangedCallback(name, _old, val) {
    if (!this._input) return;
    if (name === "mask") {
      this._mask = val || "";
      // Reformat the current content against the new mask.
      const { masked } = this._apply(this._input.value);
      this._input.value = masked;
      this.setAttribute("value", masked);
    } else if (name === "placeholder") {
      this._input.placeholder = val || "";
    } else if (name === "disabled") {
      this._input.disabled = this.hasAttribute("disabled");
    } else if (name === "value") {
      const next = val || "";
      if (this._input.value !== next) {
        const { masked } = this._apply(next);
        if (this._input.value !== masked) this._input.value = masked;
      }
    }
  }

  // Walk the mask, consuming chars from raw. Returns the masked string and the
  // unmasked (token-matched only) chars. literalsBef(rawIndex) is the count of
  // auto-inserted literals up to a given consumed-data count, used for caret.
  _apply(raw) {
    const mask = this._mask;
    if (!mask) return { masked: raw, unmasked: raw, dataCount: raw.length };
    let masked = "";
    let unmasked = "";
    let pendingLiterals = "";
    let ri = 0;
    for (let mi = 0; mi < mask.length && ri < raw.length; mi++) {
      const tk = mask[mi];
      const test = TOKENS[tk];
      if (test) {
        // Advance through raw until a char fits this slot, dropping rejects.
        while (ri < raw.length && !test(raw[ri])) ri++;
        if (ri >= raw.length) break;
        // Flush buffered literals now that a real data char follows them.
        masked += pendingLiterals + raw[ri];
        pendingLiterals = "";
        unmasked += raw[ri];
        ri++;
      } else {
        // Literal. If the next raw char equals it, consume it so retyping the
        // literal does not double it. Buffer it so a trailing literal run with
        // no following data is not emitted.
        if (raw[ri] === tk) ri++;
        pendingLiterals += tk;
      }
    }
    return { masked, unmasked, dataCount: unmasked.length };
  }

  _onInput() {
    const el = this._input;
    const oldVal = el.value;
    const oldCaret = el.selectionStart ?? oldVal.length;
    // Count data chars (non-literal positions) before the caret in the typed
    // string. Easiest robust measure, count chars that are token-eligible.
    const before = oldVal.slice(0, oldCaret);
    const dataBefore = this._countData(before);

    const { masked, unmasked } = this._apply(oldVal);
    el.value = masked;
    this.setAttribute("value", masked);

    // Place caret after the same number of data chars in the new string.
    const caret = this._caretForData(masked, dataBefore);
    try { el.setSelectionRange(caret, caret); } catch (_) {}

    this.dispatchEvent(new CustomEvent("input", { detail: { value: masked, unmasked }, bubbles: true }));
  }

  // Count chars in a slice that could be data (anything not equal to a literal
  // at its position is hard to know without alignment, so count alnum chars).
  _countData(s) {
    let n = 0;
    for (const c of s) if (/[A-Za-z0-9]/.test(c)) n++;
    return n;
  }

  // Find caret index in masked after `dataCount` data (alnum) chars.
  _caretForData(masked, dataCount) {
    if (dataCount <= 0) return 0;
    let seen = 0;
    for (let i = 0; i < masked.length; i++) {
      if (/[A-Za-z0-9]/.test(masked[i])) {
        seen++;
        if (seen === dataCount) return i + 1;
      }
    }
    return masked.length;
  }

  get value() { return this._input?.value ?? this.getAttribute("value") ?? ""; }
  set value(v) {
    const { masked } = this._apply(v ?? "");
    this.setAttribute("value", masked);
    if (this._input) this._input.value = masked;
  }
  get unmasked() {
    const { unmasked } = this._apply(this._input?.value ?? this.getAttribute("value") ?? "");
    return unmasked;
  }
}

const CSS = `
  :host { display: block; }
  input {
    width: 100%; font: inherit; font-size: var(--pura-text-sm);
    color: var(--pura-fg); background: var(--pura-bg);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius);
    padding: 0 var(--pura-space-3); height: 2.25rem;
    box-shadow: var(--pura-shadow-sm);
    transition: border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  input::placeholder { color: var(--pura-muted); }
  input:hover { border-color: var(--pura-fg); }
  input:focus {
    outline: none; border-color: var(--pura-accent);
    box-shadow: 0 0 0 3px var(--pura-ring);
  }
  input:disabled { opacity: 0.55; cursor: not-allowed; background: var(--pura-subtle); }
`;

define("pura-mask-input", PuraMaskInput, meta);
export { PuraMaskInput };
