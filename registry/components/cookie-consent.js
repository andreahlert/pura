// <pura-cookie-consent> — cookie/consent banner pinned to the bottom of the
// viewport (or a floating card) with a message and Accept / Decline / Settings
// actions. Remembers the visitor's choice in localStorage and stays hidden once
// a choice has been made. Optional per-category preferences are collected in a
// native modal <dialog> (Settings), and a short "what are cookies" explainer is
// shown in a native Popover anchored to the banner.
//
// Attributes:
//   storage-key   — localStorage key for the remembered choice
//                   (default "pura-cookie-consent")
//   position      — bottom (default) | bottom-left | bottom-right | top
//                   bottom/top span the viewport; *-left / *-right render a card
//   accept-label  — label for the accept button   (default "Aceitar")
//   decline-label — label for the decline button  (default "Recusar")
//   settings-label— label for the settings button (default "Preferências")
//   heading       — optional bold heading shown above the message
//   no-settings   — hide the Settings button (boolean)
//   open          — reflected; present while the banner is visible
// Slots:
//   (default)     — the consent message (falls back to a sensible default)
//   categories    — optional <label>/<input> markup rendered inside Settings;
//                   when empty a built-in necessary/analytics/marketing set is
//                   used
// Events (all bubble & compose):
//   accept   { categories, source }  — visitor accepted (all or a subset)
//   decline  { source }              — visitor declined non-essential cookies
//   settings { open }                — Settings dialog opened/closed
//   change   { choice, categories }  — any persisted decision (accept|decline)
// Public API:
//   .accept(categories?) / .decline() / .openSettings() / .closeSettings()
//   .reset()  — clears the stored choice and re-shows the banner
//   .choice   — "accepted" | "declined" | null
//   .categories — object map of category -> boolean (last persisted)
// Agent-native layer: stable data-pura-consent-* attributes mirror live state,
//   and every instance registers in window.__puraCookieConsents keyed by its
//   data-pura-id so agents/tooling can enumerate and drive consent without
//   reaching into the Shadow DOM.
import { PuraElement, define } from "../base.js";
import meta from "./cookie-consent.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";

registerMessages({
  "cookie-consent.region-label": {
    en: "Cookie notice",
    "pt-BR": "Aviso de cookies",
    fr: "Avis sur les cookies",
    de: "Cookie-Hinweis",
    it: "Avviso sui cookie",
  },
  "cookie-consent.message": {
    en: "We use cookies to improve your experience. You can accept, decline, or adjust your preferences.",
    "pt-BR": "Usamos cookies para melhorar sua experiência. Você pode aceitar, recusar ou ajustar suas preferências.",
    fr: "Nous utilisons des cookies pour améliorer votre expérience. Vous pouvez accepter, refuser ou ajuster vos préférences.",
    de: "Wir verwenden Cookies, um Ihre Erfahrung zu verbessern. Sie können akzeptieren, ablehnen oder Ihre Einstellungen anpassen.",
    it: "Utilizziamo i cookie per migliorare la tua esperienza. Puoi accettare, rifiutare o regolare le tue preferenze.",
  },
  "cookie-consent.info-trigger": {
    en: "What are cookies?",
    "pt-BR": "O que são cookies?",
    fr: "Que sont les cookies ?",
    de: "Was sind Cookies?",
    it: "Cosa sono i cookie?",
  },
  "cookie-consent.info-text": {
    en: "Cookies are small files that websites store in your browser. Necessary ones keep the site working; the rest are optional.",
    "pt-BR": "Cookies são pequenos arquivos que sites guardam no seu navegador. Os necessários mantêm o site funcionando; os demais são opcionais.",
    fr: "Les cookies sont de petits fichiers que les sites web enregistrent dans votre navigateur. Les cookies nécessaires font fonctionner le site ; les autres sont facultatifs.",
    de: "Cookies sind kleine Dateien, die Websites in Ihrem Browser speichern. Die notwendigen halten die Website am Laufen; die übrigen sind optional.",
    it: "I cookie sono piccoli file che i siti web salvano nel tuo browser. Quelli necessari mantengono il sito funzionante; gli altri sono facoltativi.",
  },
  "cookie-consent.settings": {
    en: "Preferences",
    "pt-BR": "Preferências",
    fr: "Préférences",
    de: "Einstellungen",
    it: "Preferenze",
  },
  "cookie-consent.decline": {
    en: "Decline",
    "pt-BR": "Recusar",
    fr: "Refuser",
    de: "Ablehnen",
    it: "Rifiuta",
  },
  "cookie-consent.accept": {
    en: "Accept",
    "pt-BR": "Aceitar",
    fr: "Accepter",
    de: "Akzeptieren",
    it: "Accetta",
  },
  "cookie-consent.settings-title": {
    en: "Cookie preferences",
    "pt-BR": "Preferências de cookies",
    fr: "Préférences des cookies",
    de: "Cookie-Einstellungen",
    it: "Preferenze sui cookie",
  },
  "cookie-consent.close": {
    en: "Close",
    "pt-BR": "Fechar",
    fr: "Fermer",
    de: "Schließen",
    it: "Chiudi",
  },
  "cookie-consent.decline-all": {
    en: "Decline all",
    "pt-BR": "Recusar tudo",
    fr: "Tout refuser",
    de: "Alle ablehnen",
    it: "Rifiuta tutto",
  },
  "cookie-consent.save": {
    en: "Save preferences",
    "pt-BR": "Salvar preferências",
    fr: "Enregistrer les préférences",
    de: "Einstellungen speichern",
    it: "Salva preferenze",
  },
  "cookie-consent.cat-necessary": {
    en: "Necessary",
    "pt-BR": "Necessários",
    fr: "Nécessaires",
    de: "Notwendige",
    it: "Necessari",
  },
  "cookie-consent.cat-analytics": {
    en: "Analytics",
    "pt-BR": "Analíticos",
    fr: "Analytiques",
    de: "Analyse",
    it: "Analitici",
  },
  "cookie-consent.cat-marketing": {
    en: "Marketing",
    "pt-BR": "Marketing",
    fr: "Marketing",
    de: "Marketing",
    it: "Marketing",
  },
  "cookie-consent.always-on": {
    en: "always on",
    "pt-BR": "sempre ativos",
    fr: "toujours actifs",
    de: "immer aktiv",
    it: "sempre attivi",
  },
});

// Module-level counter → unique popover anchor-name per instance.
let uid = 0;

// Lazily-created global registry: id -> element.
function registry() {
  return (window.__puraCookieConsents ||= new Map());
}

const DEFAULT_KEY = "pura-cookie-consent";

// Built-in categories used when the `categories` slot is empty. `necessary` is
// always on and locked; the rest default to off until accepted.
const DEFAULT_CATEGORIES = [
  { id: "necessary", labelKey: "cookie-consent.cat-necessary", required: true },
  { id: "analytics", labelKey: "cookie-consent.cat-analytics", required: false },
  { id: "marketing", labelKey: "cookie-consent.cat-marketing", required: false },
];

class PuraCookieConsent extends PuraElement {
  static observedAttributes = [
    "accept-label",
    "decline-label",
    "settings-label",
    "heading",
    "no-settings",
  ];

  connectedCallback() {
    this._anchor = `--pura-consent-${uid++}`;
    this._id = this.dataset.puraId || `pura-cookie-consent-${this._anchor.slice(-1)}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    this._choice = null;
    this._categories = {};

    this.render(
      `<div class="anchor" part="anchor" aria-hidden="true"></div>
       <section
         part="banner"
         class="banner"
         role="region"
         aria-label="${t("cookie-consent.region-label")}"
         aria-describedby="msg">
         <div class="text" part="text">
           <strong class="heading" part="heading" id="heading"></strong>
           <p class="message" part="message" id="msg">
             <slot>${t("cookie-consent.message")}</slot>
           </p>
           <button type="button" class="info" part="info-trigger" popovertarget="info"
             aria-label="${t("cookie-consent.info-trigger")}">
             ${t("cookie-consent.info-trigger")}
           </button>
           <div id="info" popover="auto" part="info" role="note">
             ${t("cookie-consent.info-text")}
           </div>
         </div>
         <div class="actions" part="actions">
           <button type="button" class="btn settings" part="settings-button">${t("cookie-consent.settings")}</button>
           <button type="button" class="btn decline" part="decline-button">${t("cookie-consent.decline")}</button>
           <button type="button" class="btn accept" part="accept-button">${t("cookie-consent.accept")}</button>
         </div>
       </section>

       <dialog part="settings" class="settings-dialog" aria-label="${t("cookie-consent.settings-title")}">
         <header part="settings-header">
           <span class="settings-title">${t("cookie-consent.settings-title")}</span>
           <button type="button" class="x" part="settings-close" aria-label="${t("cookie-consent.close")}">
             <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
           </button>
         </header>
         <div part="settings-body" class="settings-body">
           <slot name="categories"></slot>
           <div class="cat-list" part="categories"></div>
         </div>
         <footer part="settings-footer">
           <button type="button" class="btn ghost decline-all" part="settings-decline">${t("cookie-consent.decline-all")}</button>
           <button type="button" class="btn save" part="settings-save">${t("cookie-consent.save")}</button>
         </footer>
       </dialog>`,
      CSS.replaceAll("ANCHOR", this._anchor)
    );

    this._banner = this.$(".banner");
    this._dlg = this.$("dialog");
    this._catList = this.$(".cat-list");
    this._catSlot = this.$('slot[name="categories"]');

    // Wire actions. Each handler degrades gracefully if elements are missing.
    this.$(".accept")?.addEventListener("click", () => this.accept());
    this.$(".decline")?.addEventListener("click", () => this.decline());
    this.$(".settings")?.addEventListener("click", () => this.openSettings());
    this.$(".x")?.addEventListener("click", () => this.closeSettings());
    this.$(".decline-all")?.addEventListener("click", () => this.decline("settings"));
    this.$(".save")?.addEventListener("click", () => this._saveFromDialog());

    // Backdrop click + native close → keep state in sync.
    this._dlg?.addEventListener("click", (e) => { if (e.target === this._dlg) this.closeSettings(); });
    this._dlg?.addEventListener("close", () => {
      this._reflect();
      this.dispatchEvent(new CustomEvent("settings", { detail: { open: false }, bubbles: true, composed: true }));
    });

    // Hide the built-in category list when the consumer provides their own.
    const updCats = () => {
      const custom = this._catSlot && this._catSlot.assignedNodes().length > 0;
      if (this._catList) this._catList.style.display = custom ? "none" : "";
    };
    this._catSlot?.addEventListener("slotchange", updCats);

    this._renderCategories();
    updCats();
    this._sync();

    // Read any remembered choice and decide whether to show the banner.
    this._restore();

    // React to locale changes by updating already-rendered nodes in place
    // (never a full re-render, which would re-add listeners and drop state).
    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
    this._i18nOff?.();
  }

  attributeChangedCallback() {
    if (this._banner) this._sync();
  }

  // ---- config getters ------------------------------------------------------
  get storageKey() {
    return this.getAttribute("storage-key") || DEFAULT_KEY;
  }

  get choice() {
    return this._choice;
  }

  get categories() {
    return { ...this._categories };
  }

  // ---- persistence ---------------------------------------------------------
  // localStorage can throw (privacy mode, disabled storage); never let that
  // break the page — fall back to in-memory only.
  _read() {
    try {
      const raw = window.localStorage.getItem(this.storageKey);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  _write(data) {
    try {
      window.localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch {
      /* storage unavailable — keep state in memory only */
    }
  }

  _restore() {
    const saved = this._read();
    if (saved && (saved.choice === "accepted" || saved.choice === "declined")) {
      this._choice = saved.choice;
      this._categories = saved.categories && typeof saved.categories === "object" ? saved.categories : {};
      this._hide();
    } else {
      this._show();
    }
    this._reflect();
  }

  // ---- show / hide ---------------------------------------------------------
  _show() {
    this.hidden = false;
    this.setAttribute("open", "");
  }

  _hide() {
    this.hidden = true;
    this.removeAttribute("open");
  }

  // ---- categories ----------------------------------------------------------
  // Build the built-in category toggles (used when the slot is empty).
  _renderCategories() {
    if (!this._catList) return;
    this._catList.innerHTML = "";
    for (const cat of DEFAULT_CATEGORIES) {
      const row = document.createElement("label");
      row.className = "cat";
      row.setAttribute("part", "category");
      row.setAttribute("data-pura-category", cat.id);

      const input = document.createElement("input");
      input.type = "checkbox";
      input.value = cat.id;
      input.checked = cat.required || this._categories[cat.id] === true;
      input.disabled = !!cat.required;
      if (cat.required) input.setAttribute("aria-disabled", "true");

      const span = document.createElement("span");
      span.className = "cat-label";
      const catLabel = t(cat.labelKey);
      span.textContent = cat.required ? `${catLabel} (${t("cookie-consent.always-on")})` : catLabel;

      row.append(input, span);
      this._catList.append(row);
    }
  }

  // Read the currently checked categories from whichever source is active.
  _collectCategories() {
    const out = {};
    const custom = this._catSlot && this._catSlot.assignedNodes().length > 0;
    const scope = custom
      ? this._catSlot.assignedElements({ flatten: true })
      : [this._catList];
    for (const el of scope) {
      if (!el) continue;
      el.querySelectorAll?.('input[type="checkbox"]').forEach((cb) => {
        if (cb.value) out[cb.value] = cb.checked;
      });
    }
    // Built-in single-element case where _catList itself holds the inputs.
    if (!custom && this._catList) {
      this._catList.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
        if (cb.value) out[cb.value] = cb.checked;
      });
    }
    return out;
  }

  // ---- public API ----------------------------------------------------------
  // Accept all cookies, or a specific category map when provided.
  accept(categories, source = "banner") {
    let cats;
    if (categories && typeof categories === "object") {
      cats = { ...categories };
    } else {
      cats = {};
      for (const cat of DEFAULT_CATEGORIES) cats[cat.id] = true;
    }
    this._persist("accepted", cats, typeof categories === "string" ? categories : source);
    this.dispatchEvent(new CustomEvent("accept", {
      detail: { categories: cats, source: typeof categories === "string" ? categories : source },
      bubbles: true, composed: true,
    }));
  }

  // Decline non-essential cookies (necessary stays on).
  decline(source = "banner") {
    const cats = {};
    for (const cat of DEFAULT_CATEGORIES) cats[cat.id] = !!cat.required;
    this._persist("declined", cats, source);
    this.dispatchEvent(new CustomEvent("decline", {
      detail: { source }, bubbles: true, composed: true,
    }));
  }

  openSettings() {
    if (!this._dlg) return;
    if (typeof this._dlg.showModal === "function") {
      if (!this._dlg.open) this._dlg.showModal();
    } else {
      this._dlg.setAttribute("open", "");
    }
    this._reflect();
    this.dispatchEvent(new CustomEvent("settings", { detail: { open: true }, bubbles: true, composed: true }));
  }

  closeSettings() {
    if (!this._dlg) return;
    if (this._dlg.open) this._dlg.close();
    else this._dlg.removeAttribute("open");
  }

  // Clear the stored choice and bring the banner back.
  reset() {
    try {
      window.localStorage.removeItem(this.storageKey);
    } catch { /* ignore */ }
    this._choice = null;
    this._categories = {};
    this._renderCategories();
    this._show();
    this._reflect();
  }

  // ---- internal ------------------------------------------------------------
  _saveFromDialog() {
    const cats = this._collectCategories();
    // If any non-required category is enabled it counts as an accept of a
    // subset; otherwise it is effectively a decline.
    const acceptedSomething = Object.entries(cats).some(([id, on]) => {
      const def = DEFAULT_CATEGORIES.find((c) => c.id === id);
      return on && !(def && def.required);
    });
    if (acceptedSomething) this.accept(cats, "settings");
    else this.decline("settings");
    this.closeSettings();
  }

  _persist(choice, categories, source) {
    this._choice = choice;
    this._categories = categories;
    this._write({ choice, categories, ts: Date.now() });
    this._hide();
    this._reflect();
    this.dispatchEvent(new CustomEvent("change", {
      detail: { choice, categories, source }, bubbles: true, composed: true,
    }));
  }

  // ---- DOM labels sync -----------------------------------------------------
  _sync() {
    const set = (sel, val) => { const el = this.$(sel); if (el) el.textContent = val; };
    set(".accept", this.getAttribute("accept-label") || t("cookie-consent.accept"));
    set(".decline", this.getAttribute("decline-label") || t("cookie-consent.decline"));
    set(".settings", this.getAttribute("settings-label") || t("cookie-consent.settings"));

    const heading = this.getAttribute("heading") || "";
    const h = this.$(".heading");
    if (h) { h.textContent = heading; h.style.display = heading ? "" : "none"; }

    const settingsBtn = this.$(".settings");
    if (settingsBtn) settingsBtn.style.display = this.hasAttribute("no-settings") ? "none" : "";

    this._reflect();
  }

  // ---- i18n in-place update ------------------------------------------------
  // Update only the already-rendered text/aria nodes when the locale changes.
  // Never re-renders and never re-adds listeners.
  _applyI18n() {
    const banner = this._banner;
    if (banner) banner.setAttribute("aria-label", t("cookie-consent.region-label"));

    const setText = (sel, val) => { const el = this.$(sel); if (el) el.textContent = val; };

    // Default slot message (only the fallback text node, when not slotted over).
    const slot = this.$("#msg slot");
    if (slot) slot.textContent = t("cookie-consent.message");

    const info = this.$(".info");
    if (info) {
      info.setAttribute("aria-label", t("cookie-consent.info-trigger"));
      info.textContent = t("cookie-consent.info-trigger");
    }
    setText("#info", t("cookie-consent.info-text"));

    if (this._dlg) this._dlg.setAttribute("aria-label", t("cookie-consent.settings-title"));
    setText(".settings-title", t("cookie-consent.settings-title"));
    const x = this.$(".x");
    if (x) x.setAttribute("aria-label", t("cookie-consent.close"));
    setText(".decline-all", t("cookie-consent.decline-all"));
    setText(".save", t("cookie-consent.save"));

    // Built-in category labels.
    this._renderCategories();

    // Banner button labels (and attribute-driven heading/visibility).
    this._sync();
  }

  // Stable machine-readable mirror of state on the host element.
  _reflect() {
    this.setAttribute("data-pura-consent", this._choice || "pending");
    this.setAttribute("data-pura-consent-key", this.storageKey);
    this.setAttribute("data-pura-consent-visible", this.hidden ? "false" : "true");
    this.setAttribute("data-pura-consent-settings-open", this._dlg && this._dlg.open ? "true" : "false");
    const accepted = Object.entries(this._categories)
      .filter(([, on]) => on)
      .map(([id]) => id);
    this.setAttribute("data-pura-consent-categories", accepted.join(" "));
  }
}

const CSS = `
  :host {
    /* fixed overlay layer; does not participate in document flow */
    position: fixed; z-index: 2147483000;
    inset: auto 0 0 0; display: block;
    font-size: var(--pura-text-sm); color: var(--pura-fg);
  }
  :host([hidden]) { display: none !important; }

  /* the invisible anchor element drives popover positioning */
  .anchor { anchor-name: ANCHOR; position: absolute; inset: 0 auto auto 0; width: 0; height: 0; }

  /* ----- banner layout ----- */
  .banner {
    display: flex; align-items: center; gap: var(--pura-space-4);
    flex-wrap: wrap;
    background: var(--pura-bg); color: var(--pura-fg);
    border-top: 1px solid var(--pura-border);
    box-shadow: var(--pura-shadow-lg);
    padding: var(--pura-space-4) var(--pura-space-5);
    transform: translateY(0); opacity: 1;
    transition: transform var(--pura-dur) var(--pura-ease), opacity var(--pura-dur) var(--pura-ease);
  }

  .text { flex: 1 1 16rem; min-width: 0; display: flex; flex-direction: column; gap: var(--pura-space-1); }
  .heading { font-size: var(--pura-text-base); font-weight: 600; }
  .message { margin: 0; color: var(--pura-muted-fg); line-height: 1.55; }

  .info {
    align-self: flex-start; margin-top: var(--pura-space-1);
    background: transparent; border: none; padding: 0; cursor: pointer;
    font: inherit; font-size: var(--pura-text-xs); color: var(--pura-accent);
    text-decoration: underline; text-underline-offset: 2px;
  }
  .info:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); border-radius: var(--pura-radius-sm); }

  /* ----- info popover (anchored) ----- */
  [part="info"] {
    position: absolute; position-anchor: ANCHOR;
    margin: 0; inset: auto;
    bottom: anchor(top); left: anchor(left);
    margin-bottom: var(--pura-space-2);
    width: max-content; max-width: min(22rem, 92vw);
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-lg); padding: var(--pura-space-4);
    font-size: var(--pura-text-sm); line-height: 1.55;
    opacity: 0; transform: translateY(4px);
    transition: opacity var(--pura-dur) var(--pura-ease), transform var(--pura-dur) var(--pura-ease);
  }
  [part="info"]:popover-open { opacity: 1; transform: none; }
  @supports not (anchor-name: --x) {
    [part="info"] { position: fixed; inset: auto auto var(--pura-space-6) var(--pura-space-5); }
  }

  /* ----- actions ----- */
  .actions { display: flex; align-items: center; gap: var(--pura-space-2); flex-wrap: wrap; }

  .btn {
    font: inherit; font-size: var(--pura-text-sm); font-weight: 550; line-height: 1;
    white-space: nowrap; cursor: pointer;
    height: 2.25rem; padding: 0 var(--pura-space-4);
    border-radius: var(--pura-radius); border: 1px solid transparent;
    transition: background var(--pura-dur) var(--pura-ease),
      border-color var(--pura-dur) var(--pura-ease),
      color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease),
      transform var(--pura-dur) var(--pura-ease);
  }
  .btn:active { transform: translateY(0.5px) scale(0.99); }
  .btn:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }

  .accept { background: var(--pura-primary); color: var(--pura-primary-fg); border-color: var(--pura-primary); }
  .accept:hover { background: var(--pura-primary-hover); border-color: var(--pura-primary-hover); }

  .decline, .settings {
    background: var(--pura-bg); color: var(--pura-fg);
    border-color: var(--pura-border-strong); box-shadow: var(--pura-shadow-sm);
  }
  .decline:hover, .settings:hover { background: var(--pura-subtle); }

  .ghost { background: transparent; color: var(--pura-fg); border-color: transparent; }
  .ghost:hover { background: var(--pura-subtle); }

  .save { background: var(--pura-primary); color: var(--pura-primary-fg); border-color: var(--pura-primary); }
  .save:hover { background: var(--pura-primary-hover); }

  /* ----- card variants ----- */
  :host([position="top"]) { inset: 0 0 auto 0; }
  :host([position="top"]) .banner { border-top: none; border-bottom: 1px solid var(--pura-border); }

  :host([position="bottom-left"]),
  :host([position="bottom-right"]) {
    inset: auto auto var(--pura-space-5) auto; max-width: min(26rem, calc(100vw - 2rem));
  }
  :host([position="bottom-left"]) { left: var(--pura-space-5); right: auto; }
  :host([position="bottom-right"]) { right: var(--pura-space-5); left: auto; }
  :host([position="bottom-left"]) .banner,
  :host([position="bottom-right"]) .banner {
    flex-direction: column; align-items: stretch;
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius-lg);
  }
  :host([position="bottom-left"]) .actions,
  :host([position="bottom-right"]) .actions { justify-content: flex-end; }

  /* ----- settings dialog ----- */
  dialog {
    padding: 0; border: 1px solid var(--pura-border); color: var(--pura-fg);
    border-radius: var(--pura-radius-lg); background: var(--pura-bg);
    box-shadow: var(--pura-shadow-lg); width: min(30rem, calc(100vw - 2rem));
    opacity: 0; transform: translateY(8px) scale(0.98);
    transition: opacity var(--pura-dur) var(--pura-ease), transform var(--pura-dur) var(--pura-ease);
  }
  dialog[open] { opacity: 1; transform: none; }
  dialog::backdrop { background: rgb(0 0 0 / 0.45); backdrop-filter: blur(2px); }

  dialog header { display: flex; align-items: center; justify-content: space-between;
    gap: var(--pura-space-3); padding: var(--pura-space-5) var(--pura-space-5) var(--pura-space-3); }
  .settings-title { font-size: var(--pura-text-lg); font-weight: 600; }
  .x { display: grid; place-items: center; width: 1.75rem; height: 1.75rem;
    border: none; background: transparent; color: var(--pura-muted); cursor: pointer;
    border-radius: var(--pura-radius-sm); }
  .x:hover { background: var(--pura-subtle); color: var(--pura-fg); }
  .x:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  .x svg { width: 1.1rem; height: 1.1rem; }

  .settings-body { padding: 0 var(--pura-space-5) var(--pura-space-5);
    font-size: var(--pura-text-sm); color: var(--pura-muted-fg); line-height: 1.55; }
  .cat-list { display: flex; flex-direction: column; gap: var(--pura-space-3); }
  .cat { display: flex; align-items: center; gap: var(--pura-space-3); cursor: pointer; color: var(--pura-fg); }
  .cat input { width: 1.05rem; height: 1.05rem; accent-color: var(--pura-accent); cursor: pointer; }
  .cat input:disabled { cursor: not-allowed; }
  .cat-label { font-size: var(--pura-text-sm); }

  dialog footer { display: flex; justify-content: flex-end; gap: var(--pura-space-2);
    padding: var(--pura-space-4) var(--pura-space-5); border-top: 1px solid var(--pura-border);
    background: var(--pura-subtle); }
`;

define("pura-cookie-consent", PuraCookieConsent, meta);
export { PuraCookieConsent };
