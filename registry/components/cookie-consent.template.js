// Pure render(s) for <cookie-consent> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

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

export function cookieConsentTemplate(el = EMPTY_SHIM) {
  const html = `<div class="anchor" part="anchor" aria-hidden="true"></div>
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
       </dialog>`;
  return { html, css: CSS.replaceAll("ANCHOR", el._anchor) };
}
