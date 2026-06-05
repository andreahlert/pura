// <pura-chat-input> — chat composer. An auto-growing <textarea> paired with a
// send button and an optional actions slot (e.g. an attach button). Enter sends
// the message (Shift+Enter inserts a newline); sending emits a 'send' event with
// detail { value } and clears the field. Built on a native <textarea> for
// reliable IME, keyboard, accessibility and form semantics.
//
// Attributes:
//   placeholder — textarea placeholder text
//   disabled    — block typing and sending
//   value       — current text (mirrored back to the host attribute on input)
//   maxlength   — forwarded to the textarea (optional)
//   send-label  — accessible label for the send button (default: "Send message")
//
// Slots:
//   actions — optional leading controls (e.g. an attach button); rendered before
//             the textarea. Empty by default and collapses when unused.
//
// Events:
//   send  { value } — bubbles when the user sends a non-empty message.
//   input { value } — bubbles on every keystroke.
//
// Parts: root, actions, field, send, send-icon
//
// Agent-native layer: a stable data-pura-chat-input id on the host, ARIA wiring
// (role=group + labelled send button + aria-disabled), and a global
// window.__puraChatInputs registry mapping each instance id to a live handle
// ({ el, value getter, send(), clear(), focus() }) so agents/tooling can read
// the draft and drive the composer without reaching into the shadow root.
import { PuraElement, define } from "../base.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";

registerMessages({
  "chat-input.send": {
    en: "Send message",
    "pt-BR": "Enviar mensagem",
    fr: "Envoyer le message",
    de: "Nachricht senden",
    it: "Invia messaggio",
  },
  "chat-input.message": {
    en: "Message",
    "pt-BR": "Mensagem",
    fr: "Message",
    de: "Nachricht",
    it: "Messaggio",
  },
});

let uid = 0;

// Global registry so agents/tooling can inspect and drive live composers without
// piercing shadow roots. Keyed by the stable per-instance id.
const REGISTRY = (window.__puraChatInputs ||= {});

class PuraChatInput extends PuraElement {
  static observedAttributes = ["placeholder", "disabled", "value", "maxlength", "send-label"];

  connectedCallback() {
    this._id = this._id || `pura-chat-input-${uid++}`;
    this.setAttribute("data-pura-chat-input", this._id);
    if (!this.hasAttribute("role")) this.setAttribute("role", "group");

    const disabled = this.hasAttribute("disabled");
    const sendLabel = this.getAttribute("send-label") || t("chat-input.send");

    this.render(
      `<div class="root" part="root" data-pura-disabled="${disabled ? "true" : "false"}">
         <span class="actions" part="actions"><slot name="actions"></slot></span>
         <textarea class="field" part="field" rows="1"
           aria-label="${t("chat-input.message")}"
           ${this.getAttribute("placeholder") ? `placeholder="${this.getAttribute("placeholder")}"` : ""}
           ${this.hasAttribute("maxlength") ? `maxlength="${this.getAttribute("maxlength")}"` : ""}
           ${disabled ? "disabled" : ""}></textarea>
         <button class="send" part="send" type="button"
           aria-label="${sendLabel}"
           ${disabled ? "disabled" : ""}>
           <svg part="send-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12l14-7-7 14-2-5-5-2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
         </button>
       </div>`,
      CSS
    );

    this._root = this.$(".root");
    this._field = this.$(".field");
    this._send = this.$(".send");

    // Seed from the value attribute, if any.
    if (this.hasAttribute("value")) this._field.value = this.getAttribute("value");
    this._autosize();
    this._syncDisabled();

    this._onInput = () => {
      this.setAttribute("value", this._field.value);
      this._autosize();
      this.dispatchEvent(new CustomEvent("input", { detail: { value: this._field.value }, bubbles: true }));
    };
    this._onKeydown = (e) => {
      // Enter sends; Shift+Enter (and IME composition) insert a newline.
      if (e.key === "Enter" && !e.shiftKey && !e.isComposing) {
        e.preventDefault();
        this.send();
      }
    };
    this._field.addEventListener("input", this._onInput);
    this._field.addEventListener("keydown", this._onKeydown);
    this._send.addEventListener("click", () => this.send());

    REGISTRY[this._id] = {
      el: this,
      get value() { return this._owner.value; },
      send() { return this._owner.send(); },
      clear() { return this._owner.clear(); },
      focus() { return this._owner.focus(); },
      _owner: this,
    };

    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    delete REGISTRY[this._id];
    this._i18nOff?.();
  }

  // Update only the already-rendered i18n nodes in place (no re-render, no new
  // listeners). The send label stays untouched when the consumer pinned it.
  _applyI18n() {
    if (this._field) this._field.setAttribute("aria-label", t("chat-input.message"));
    if (this._send && !this.hasAttribute("send-label")) {
      this._send.setAttribute("aria-label", t("chat-input.send"));
    }
  }

  attributeChangedCallback(name, _old, val) {
    if (!this._field) return;
    if (name === "disabled") {
      this._syncDisabled();
    } else if (name === "placeholder") {
      if (val === null) this._field.removeAttribute("placeholder");
      else this._field.setAttribute("placeholder", val);
    } else if (name === "maxlength") {
      if (val === null) this._field.removeAttribute("maxlength");
      else this._field.setAttribute("maxlength", val);
    } else if (name === "send-label") {
      if (this._send) this._send.setAttribute("aria-label", val || t("chat-input.send"));
    } else if (name === "value" && val !== null && val !== this._field.value) {
      this._field.value = val;
      this._autosize();
    }
  }

  _syncDisabled() {
    const disabled = this.hasAttribute("disabled");
    this._field.disabled = disabled;
    this._send.disabled = disabled;
    this.setAttribute("aria-disabled", disabled ? "true" : "false");
    if (this._root) this._root.setAttribute("data-pura-disabled", disabled ? "true" : "false");
  }

  // Auto-grow the textarea to fit its content, capped by the CSS max-height.
  _autosize() {
    const ta = this._field;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${ta.scrollHeight}px`;
  }

  // Emit a 'send' with the trimmed value, then clear. No-op when disabled or
  // the draft is empty/whitespace.
  send() {
    if (this.hasAttribute("disabled")) return;
    const value = (this._field?.value ?? "").trim();
    if (!value) return;
    this.dispatchEvent(new CustomEvent("send", { detail: { value }, bubbles: true }));
    this.clear();
  }

  clear() {
    if (this._field) {
      this._field.value = "";
      this._autosize();
    }
    this.removeAttribute("value");
  }

  focus() { this._field?.focus(); }

  get value() { return this._field?.value ?? this.getAttribute("value") ?? ""; }
  set value(v) {
    const next = v == null ? "" : String(v);
    this.setAttribute("value", next);
    if (this._field) {
      this._field.value = next;
      this._autosize();
    }
  }
}

const CSS = `
  :host { display: block; }
  :host([disabled]) { opacity: 0.6; }

  .root {
    display: flex; align-items: flex-end; gap: var(--pura-space-2);
    background: var(--pura-bg);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius-lg);
    padding: var(--pura-space-2);
    box-shadow: var(--pura-shadow-sm);
    transition: border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  .root:focus-within {
    border-color: var(--pura-accent);
    box-shadow: 0 0 0 3px var(--pura-ring);
  }

  /* actions slot collapses when empty (no assigned nodes) */
  .actions { display: inline-flex; align-items: center; gap: var(--pura-space-1); flex: none; }
  .actions:not(:has(*)) { display: none; }

  .field {
    flex: 1 1 auto; min-width: 0;
    font: inherit; font-size: var(--pura-text-sm); line-height: 1.45;
    color: var(--pura-fg); background: transparent;
    border: none; outline: none; resize: none;
    padding: var(--pura-space-2) var(--pura-space-1);
    max-height: 12rem; overflow-y: auto;
  }
  .field::placeholder { color: var(--pura-muted); }
  .field:disabled { cursor: not-allowed; }

  .send {
    flex: none; display: inline-grid; place-items: center;
    width: 2.25rem; height: 2.25rem;
    font: inherit; cursor: pointer;
    color: var(--pura-primary-fg); background: var(--pura-primary);
    border: 1px solid transparent; border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-sm);
    transition: background var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease),
      transform var(--pura-dur) var(--pura-ease);
  }
  .send svg { width: 1.05rem; height: 1.05rem; }
  .send:hover { background: var(--pura-primary-hover); }
  .send:active { transform: translateY(0.5px) scale(0.99); }
  .send:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  .send:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }
`;

define("pura-chat-input", PuraChatInput);
export { PuraChatInput };
