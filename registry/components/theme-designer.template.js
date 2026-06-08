// Pure render for <pura-theme-designer>. No DOM; SSR/DSD + client safe.
// Renders the slide-in panel: preset swatch grid (from theme.js presets), the
// customize fields (accent color / radius range / font select), and the optional
// floating launcher button. Every node is attribute/data-derived — [launcher]
// toggles the launcher, preset data + FONTS are static — so the markup is fully
// reproducible without a live instance. The active-preset highlight and live
// token overrides are applied by the component after render. FONTS is owned here
// and re-exported for the component's _applyCustom() font lookup.
import { EMPTY_SHIM } from "../base.js";
import { listPresets } from "../theme.js";
import { t } from "../i18n.js";

export const FONTS = {
  System: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  Serif: "ui-serif, Georgia, Cambria, 'Times New Roman', serif",
  Mono: "ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, Consolas, monospace",
  Rounded: "ui-rounded, 'SF Pro Rounded', 'Nunito', system-ui, sans-serif",
};

const CSS = `
  :host { font-family: var(--pura-font); }
  .backdrop { position: fixed; inset: 0; background: rgb(0 0 0 / 0.4); opacity: 0; visibility: hidden;
    transition: opacity var(--pura-dur) var(--pura-ease); z-index: 9998; }
  .root.is-open .backdrop { opacity: 1; visibility: visible; }
  .panel {
    position: fixed; top: 0; right: 0; height: 100dvh; width: min(340px, 92vw); z-index: 9999;
    background: var(--pura-bg); color: var(--pura-fg); border-left: 1px solid var(--pura-border);
    box-shadow: var(--pura-shadow-lg); display: flex; flex-direction: column;
    transform: translateX(100%); transition: transform var(--pura-dur) var(--pura-ease);
  }
  :host([position="left"]) .panel { right: auto; left: 0; border-left: none; border-right: 1px solid var(--pura-border); transform: translateX(-100%); }
  .root.is-open .panel { transform: none; }

  header { display: flex; align-items: center; justify-content: space-between; padding: var(--pura-space-4) var(--pura-space-5); border-bottom: 1px solid var(--pura-border); }
  header strong { font-size: var(--pura-text-lg); }
  .close { display: grid; place-items: center; width: 1.9rem; height: 1.9rem; border: none; background: transparent; color: var(--pura-muted); cursor: pointer; border-radius: var(--pura-radius-sm); }
  .close:hover { background: var(--pura-subtle); color: var(--pura-fg); }
  .body { padding: var(--pura-space-5); overflow-y: auto; }
  h4 { font-size: var(--pura-text-xs); text-transform: uppercase; letter-spacing: .08em; color: var(--pura-muted); margin: 0 0 var(--pura-space-3); }
  h4:not(:first-child) { margin-top: var(--pura-space-5); }

  .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--pura-space-2); }
  .swatch { display: flex; flex-direction: column; gap: 6px; align-items: center; padding: var(--pura-space-2); cursor: pointer;
    background: transparent; border: 1px solid var(--pura-border); border-radius: var(--pura-radius); transition: border-color var(--pura-dur), box-shadow var(--pura-dur); }
  .swatch:hover { border-color: var(--pura-border-strong); }
  .swatch[aria-pressed="true"] { border-color: var(--pura-primary); box-shadow: 0 0 0 2px var(--pura-ring); }
  .chip { width: 100%; height: 30px; border-radius: var(--pura-radius-sm); border: 1px solid var(--pura-border); display: flex; align-items: flex-end; gap: 3px; padding: 4px; box-sizing: border-box; overflow: hidden; }
  .chip i { width: 10px; height: 10px; border-radius: 999px; display: block; }
  .sw-name { font-size: 11px; color: var(--pura-muted-fg); }

  .field { display: flex; align-items: center; justify-content: space-between; gap: var(--pura-space-3); margin-bottom: var(--pura-space-3); font-size: var(--pura-text-sm); }
  .field span { color: var(--pura-muted-fg); }
  .field input[type=color] { width: 44px; height: 28px; padding: 0; border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius-sm); background: none; cursor: pointer; }
  .field input[type=range] { flex: 1; max-width: 160px; accent-color: var(--pura-primary); }
  .field select { font: inherit; font-size: var(--pura-text-sm); padding: 4px 8px; border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius-sm); background: var(--pura-bg); color: var(--pura-fg); }
  .reset { margin-top: var(--pura-space-2); width: 100%; font: inherit; font-size: var(--pura-text-sm); font-weight: 550; cursor: pointer;
    padding: 8px; border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius); background: var(--pura-bg); color: var(--pura-fg); }
  .reset:hover { background: var(--pura-subtle); }

  .launcher { position: fixed; right: 18px; bottom: 18px; z-index: 9997; width: 46px; height: 46px; border-radius: 999px;
    display: grid; place-items: center; cursor: pointer; border: 1px solid var(--pura-border); background: var(--pura-bg); color: var(--pura-fg); box-shadow: var(--pura-shadow-lg); }
  .launcher:hover { background: var(--pura-subtle); }
`;

export function themeDesignerTemplate(el = EMPTY_SHIM) {
  const presets = listPresets()
    .map((p) => {
      const v = p.vars.light || p.vars.base || {};
      const bg = v["--pura-bg"] || "var(--pura-bg)";
      const primary = v["--pura-primary"] || "var(--pura-primary)";
      const accent = v["--pura-accent"] || primary;
      return `<button class="swatch" data-preset="${p.id}" aria-pressed="false" title="${p.name}">
            <span class="chip" style="background:${bg}">
              <i style="background:${primary}"></i><i style="background:${accent}"></i>
            </span>
            <span class="sw-name">${p.name}</span>
          </button>`;
    })
    .join("");

  const launcher = el.hasAttribute("launcher")
    ? `<button class="launcher" part="launcher" aria-label="${t("theme-designer.designer")}">
           <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18 4.5 4.5 0 0 0 0-9 4.5 4.5 0 0 1 0-9z"/></svg>
         </button>`
    : "";

  const html = `<div class="root">
      ${launcher}
      <div class="backdrop"></div>
      <aside class="panel" part="panel" role="dialog" aria-label="${t("theme-designer.designer")}" inert>
        <header>
          <strong>${t("theme-designer.theme")}</strong>
          <button class="close" aria-label="${t("theme-designer.close")}">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>
          </button>
        </header>
        <div class="body">
          <h4>${t("theme-designer.presets")}</h4>
          <div class="grid">${presets}</div>

          <h4>${t("theme-designer.customize")}</h4>
          <label class="field"><span>${t("theme-designer.accent")}</span><input id="accent" type="color" value="#2563eb"></label>
          <label class="field"><span>${t("theme-designer.radius")}</span><input id="radius" type="range" min="0" max="1.5" step="0.05" value="0.625"></label>
          <label class="field"><span>${t("theme-designer.font")}</span>
            <select id="font">${Object.keys(FONTS).map((f) => `<option>${f}</option>`).join("")}</select>
          </label>
          <button class="reset">${t("theme-designer.reset")}</button>
        </div>
      </aside>
    </div>`;
  return { html, css: CSS };
}
