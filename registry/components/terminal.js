// <pura-terminal>. An interactive terminal emulator. A monospace output area
// plus a prompt input line. The user types a command and presses Enter; the
// component echoes "prompt command" to the output, then dispatches a "command"
// CustomEvent (detail { command }). The host can respond by calling .write(text)
// or .writeLine(text) to append output, or by setting a `handler` property: a
// function(command) => string | Promise<string> whose return value is printed.
// When no handler is set a tiny built-in set runs (help, clear, echo).
//
// Attributes:
//   prompt   the prompt string shown before the input (default "$ ")
//   welcome  a line printed into the output on first connect
//
// Events:
//   command  CustomEvent({ detail: { command } }) on every entered command.
//
// Parts: output, line, prompt, input
import { PuraElement, define } from "../base.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";

registerMessages({
  "terminal.label": {
    en: "Terminal",
    "pt-BR": "Terminal",
    fr: "Terminal",
    de: "Terminal",
    it: "Terminale",
  },
  "terminal.help": {
    en: "Available commands: help, clear, echo",
    "pt-BR": "Comandos disponíveis: help, clear, echo",
    fr: "Commandes disponibles: help, clear, echo",
    de: "Verfügbare Befehle: help, clear, echo",
    it: "Comandi disponibili: help, clear, echo",
  },
  "terminal.unknown": {
    en: "Command not found: {cmd}",
    "pt-BR": "Comando não encontrado: {cmd}",
    fr: "Commande introuvable: {cmd}",
    de: "Befehl nicht gefunden: {cmd}",
    it: "Comando non trovato: {cmd}",
  },
});

class PuraTerminal extends PuraElement {
  static observedAttributes = ["prompt", "welcome"];

  connectedCallback() {
    if (!this.hasAttribute("role")) this.setAttribute("role", "group");
    if (!this.hasAttribute("aria-label")) this.setAttribute("aria-label", t("terminal.label"));

    this._history = this._history || [];
    this._histIndex = this._history.length;

    const prompt = this.getAttribute("prompt") ?? "$ ";

    this.render(
      `<div class="output" part="output" role="log" aria-live="polite"></div>
       <div class="line" part="line">
         <span class="prompt" part="prompt">${this._esc(prompt)}</span>
         <input class="input" part="input" type="text" autocomplete="off"
           autocapitalize="off" spellcheck="false" aria-label="${this._esc(t("terminal.label"))}" />
       </div>`,
      CSS
    );

    this._output = this.$(".output");
    this._input = this.$(".input");
    this._promptEl = this.$(".prompt");

    // First connect prints the welcome line, if any.
    const welcome = this.getAttribute("welcome");
    if (welcome && !this._booted) this.writeLine(welcome);
    this._booted = true;

    this._onKeydown = (e) => this._handleKey(e);
    this._input.addEventListener("keydown", this._onKeydown);

    // Click anywhere focuses the input.
    this._onHostClick = () => this._input.focus();
    this.addEventListener("click", this._onHostClick);

    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this.removeEventListener("click", this._onHostClick);
    this._i18nOff?.();
    this._i18nOff = null;
  }

  attributeChangedCallback(name, _old, val) {
    if (name === "prompt" && this._promptEl) this._promptEl.textContent = val ?? "$ ";
  }

  _applyI18n() {
    const cur = this.getAttribute("aria-label");
    if (cur == null || cur === "Terminal" || cur === "Terminale") {
      this.setAttribute("aria-label", t("terminal.label"));
    }
    if (this._input) this._input.setAttribute("aria-label", t("terminal.label"));
  }

  async _handleKey(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      const command = this._input.value;
      this._input.value = "";
      await this._run(command);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      this._recall(-1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      this._recall(1);
    }
  }

  _recall(dir) {
    if (!this._history.length) return;
    this._histIndex = Math.max(0, Math.min(this._history.length, this._histIndex + dir));
    this._input.value = this._history[this._histIndex] ?? "";
    // Move caret to end.
    const len = this._input.value.length;
    this._input.setSelectionRange?.(len, len);
  }

  async _run(command) {
    const prompt = this.getAttribute("prompt") ?? "$ ";
    // Echo the entered line.
    this.writeLine(`${prompt}${command}`);

    const trimmed = command.trim();
    if (trimmed) {
      this._history.push(trimmed);
    }
    this._histIndex = this._history.length;

    this.dispatchEvent(new CustomEvent("command", { detail: { command }, bubbles: true }));

    if (!trimmed) return;

    if (typeof this.handler === "function") {
      try {
        const out = await this.handler(command);
        if (out != null) this.writeLine(String(out));
      } catch (err) {
        this.writeLine(String(err?.message ?? err));
      }
      return;
    }

    this._builtin(trimmed);
  }

  // Tiny built-in command set used when no handler is provided.
  _builtin(trimmed) {
    const [cmd, ...rest] = trimmed.split(/\s+/);
    switch (cmd) {
      case "help":
        this.writeLine(t("terminal.help"));
        break;
      case "clear":
        this.clear();
        break;
      case "echo":
        this.writeLine(rest.join(" "));
        break;
      default:
        this.writeLine(t("terminal.unknown", { cmd }));
    }
  }

  // Append text without a trailing newline (a new output row per call).
  write(text) {
    if (!this._output) return;
    const row = document.createElement("div");
    row.className = "row";
    row.textContent = String(text);
    this._output.appendChild(row);
    this._scroll();
  }

  // Append text as its own line. Alias of write (each row is a line here).
  writeLine(text) {
    this.write(text);
  }

  clear() {
    if (this._output) this._output.textContent = "";
  }

  focus() { this._input?.focus(); }

  _scroll() {
    if (this._output) this._output.scrollTop = this._output.scrollHeight;
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
  :host {
    display: block;
    border: 1px solid var(--pura-border-strong);
    border-radius: var(--pura-radius);
    background: var(--pura-fg);
    color: var(--pura-bg);
    overflow: hidden;
    font-family: var(--pura-font-mono);
    font-size: var(--pura-text-sm);
    cursor: text;
  }

  .output {
    padding: var(--pura-space-3);
    max-height: 20rem;
    overflow-y: auto;
    white-space: pre-wrap;
    word-break: break-word;
    line-height: 1.5;
  }
  .row { min-height: 1.2em; }

  .line {
    display: flex; align-items: baseline; gap: var(--pura-space-1);
    padding: 0 var(--pura-space-3) var(--pura-space-3);
  }
  .prompt {
    flex: none;
    color: var(--pura-success);
    white-space: pre;
    user-select: none;
    -webkit-user-select: none;
  }
  .input {
    flex: 1 1 auto; min-width: 0;
    font: inherit; color: inherit;
    background: transparent; border: none; outline: none;
    padding: 0;
  }
`;

define("pura-terminal", PuraTerminal);
export { PuraTerminal };
