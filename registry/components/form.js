// <pura-form> - form orchestrator. Wraps a slotted native <form> or bare pura
// inputs (light DOM, so native form semantics + agents keep working). On submit
// it gathers {name: value} from every descendant [name], runs validation
// (required attrs + an optional `validate` property), and dispatches a
// CustomEvent("submit", { detail: data }) while preventing the native submit.
//
// Slots:
//   (default) - the form controls, in light DOM. Native inputs and pura
//               components that expose .value + a `name` attribute are collected.
// Properties:
//   .values            - getter, current {name: value} snapshot.
//   .validate          - optional fn(data) -> { field: message } | falsy. Errors
//                        block submit and are shown; falsy means valid.
//   .setErrors(obj)    - mark matching fields invalid + render a summary.
//   .reset()           - clear all named controls (native form or bare inputs)
//                        and clear errors.
// Events:
//   submit { ...data } - fired (bubbles) only when validation passes.
// Parts: form, errors.
import { PuraElement, define } from "../base.js";
import meta from "./form.meta.js";

class PuraForm extends PuraElement {
  connectedCallback() {
    this.render(
      `<div part="form" class="form">
         <slot></slot>
         <div part="errors" class="errors" role="alert" aria-live="polite" hidden></div>
       </div>`,
      CSS
    );
    this._errors = this.$(".errors");

    // Prefer the slotted native <form>: listen for its submit (a SubmitEvent),
    // never the host (our own dispatched CustomEvent would bubble back in).
    this._form = this.querySelector("form");
    if (this._form) {
      // Swallow the native SubmitEvent (prevent navigation + stop it bubbling
      // past the host) so only our synthetic "submit" CustomEvent surfaces.
      this._onSubmit = (e) => { e.preventDefault(); e.stopPropagation(); this._submit(); };
      this._form.addEventListener("submit", this._onSubmit);
    } else {
      // No native form: drive submit from Enter (non-textarea) + submit buttons.
      this._onKeydown = (e) => {
        if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
          e.preventDefault();
          this._submit();
        }
      };
      this.addEventListener("keydown", this._onKeydown);
      this._onClick = (e) => {
        const btn = e.target.closest('[type="submit"], pura-button[type="submit"]');
        if (btn && this.contains(btn)) { e.preventDefault(); this._submit(); }
      };
      this.addEventListener("click", this._onClick);
    }
  }

  disconnectedCallback() {
    if (this._form && this._onSubmit) this._form.removeEventListener("submit", this._onSubmit);
    if (this._onKeydown) this.removeEventListener("keydown", this._onKeydown);
    if (this._onClick) this.removeEventListener("click", this._onClick);
  }

  // ---- public API ---------------------------------------------------------
  get values() {
    const data = {};
    for (const el of this.querySelectorAll("[name]")) {
      const name = el.getAttribute("name");
      if (!name) continue;
      data[name] = this._readValue(el);
    }
    return data;
  }

  // Validation entry. Property contract: validate(data) returns a map of
  // { field: message } for invalid fields, or a falsy value when all is well.
  set validate(fn) { this._validate = typeof fn === "function" ? fn : null; }
  get validate() { return this._validate || null; }

  reset() {
    if (this._form) {
      this._form.reset();
    } else {
      // No native form: clear each named control directly.
      for (const el of this.querySelectorAll("[name]")) {
        if (el.type === "checkbox" || el.type === "radio") el.checked = false;
        else if ("value" in el) el.value = "";
        else el.removeAttribute("value");
      }
    }
    this.setErrors({});
  }

  // Mark matching fields invalid + show a summary. Empty obj clears everything.
  setErrors(errors) {
    const map = errors || {};
    // Clear prior invalid cues first.
    for (const el of this.querySelectorAll("[name]")) this._clearInvalid(el);

    const messages = [];
    for (const [name, message] of Object.entries(map)) {
      if (!message) continue;
      const el = this.querySelector(`[name="${CSS_ESC(name)}"]`);
      if (el) this._markInvalid(el);
      messages.push(message);
    }

    if (messages.length) {
      this._errors.innerHTML = messages.map((m) => `<div class="err-item">${esc(m)}</div>`).join("");
      this._errors.hidden = false;
    } else {
      this._errors.innerHTML = "";
      this._errors.hidden = true;
    }
  }

  // ---- internals ----------------------------------------------------------
  _submit() {
    const data = this.values;
    const errors = {};

    // required-attr check across all named descendants.
    for (const el of this.querySelectorAll("[name]")) {
      if (!el.hasAttribute("required")) continue;
      const v = this._readValue(el);
      if (v == null || v === "" || v === false) {
        errors[el.getAttribute("name")] = `${el.getAttribute("name")} is required`;
      }
    }

    // Merge in the optional validate() result.
    if (this._validate) {
      const custom = this._validate(data) || {};
      for (const [k, v] of Object.entries(custom)) if (v) errors[k] = v;
    }

    if (Object.keys(errors).length) { this.setErrors(errors); return; }

    this.setErrors({});
    this.dispatchEvent(new CustomEvent("submit", { detail: data, bubbles: true }));
  }

  // Read a value from a native control or a pura component (.value / checked).
  _readValue(el) {
    if (el.type === "checkbox") return !!el.checked;
    if (el.type === "radio") return el.checked ? el.value : (this._radioValue(el) ?? "");
    if ("value" in el) return el.value;
    return el.getAttribute("value") ?? "";
  }

  _radioValue(el) {
    const name = el.getAttribute("name");
    const checked = this.querySelector(`input[type="radio"][name="${CSS_ESC(name)}"]:checked`);
    return checked ? checked.value : null;
  }

  // pura components use `invalid`; native controls use aria-invalid.
  _markInvalid(el) {
    if (el.tagName.startsWith("PURA-")) el.setAttribute("invalid", "");
    else el.setAttribute("aria-invalid", "true");
  }
  _clearInvalid(el) {
    if (el.tagName.startsWith("PURA-")) el.removeAttribute("invalid");
    else el.removeAttribute("aria-invalid");
  }
}

// Escape for innerHTML text.
function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
// Escape a value for a CSS attribute selector.
function CSS_ESC(s) {
  if (window.CSS && window.CSS.escape) return window.CSS.escape(String(s));
  return String(s).replace(/["\\]/g, "\\$&");
}

const CSS = `
  :host { display: block; }
  .form { display: block; }
  .errors {
    margin-top: var(--pura-space-3);
    display: flex; flex-direction: column; gap: var(--pura-space-1);
    padding: var(--pura-space-3);
    background: var(--pura-danger-bg);
    border: 1px solid var(--pura-danger);
    border-radius: var(--pura-radius);
    color: var(--pura-danger);
    font-size: var(--pura-text-sm); font-weight: 550; line-height: 1.4;
  }
  .errors[hidden] { display: none; }
`;

define("pura-form", PuraForm, meta);
export { PuraForm };
