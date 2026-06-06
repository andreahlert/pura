// <pura-map> - thin iframe wrapper over a map provider embed. By design this
// does NO tile fetching, canvas rendering, or API-key handling: it just points
// an <iframe> at an embed URL the browser loads. Zero deps, platform only.
// Tradeoff: interactivity, styling, and marker control are limited to what the
// provider's embed offers. For richer maps, drop in a library yourself.
//
// Source resolution (first match wins):
//   src        - a full embed URL, used verbatim.
//   q          - a place/query string; builds an OpenStreetMap export embed.
//   lat + lon  - coordinates; builds an OpenStreetMap export embed around them.
// Other attributes:
//   zoom       - zoom level for q/lat-lon (default 14). Higher = closer.
//   height     - viewer height (number → px, or any CSS length). Default 400.
//   title      - iframe title for accessibility.
// Parts: root, frame, link. Falls back to an empty state when nothing resolves.
import { PuraElement, define } from "../base.js";
import meta from "./map.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";

registerMessages({
  "map.larger": { en: "View larger map", "pt-BR": "Ver mapa ampliado", fr: "Voir une carte plus grande", de: "Größere Karte anzeigen", it: "Visualizza mappa più grande" },
  "map.empty": { en: "No location to display.", "pt-BR": "Nenhuma localização para exibir.", fr: "Aucun lieu à afficher.", de: "Kein Standort zum Anzeigen.", it: "Nessuna posizione da mostrare." },
  "map.title": { en: "Map", "pt-BR": "Mapa", fr: "Carte", de: "Karte", it: "Mappa" },
});

function len(v, fallback) {
  if (v == null || v === "") return fallback;
  return /^-?\d*\.?\d+$/.test(String(v).trim()) ? `${String(v).trim()}px` : v;
}

// Degrees of span at a given zoom; rough heuristic for the bbox window.
function span(zoom) {
  const z = Math.max(1, Math.min(19, Number(zoom) || 14));
  return 360 / Math.pow(2, z);
}

class PuraMap extends PuraElement {
  connectedCallback() {
    this.style.setProperty("--_h", len(this.getAttribute("height"), "400px"));
    const resolved = this._resolve();

    if (!resolved) {
      this.render(`<div class="empty" part="root">${t("map.empty")}</div>`, CSS);
      this._i18nOff = onLocaleChange(() => { const e = this.$(".empty"); if (e) e.textContent = t("map.empty"); });
      return;
    }

    const title = this.getAttribute("title") || t("map.title");
    this.render(
      `<div class="root" part="root">
         <iframe class="frame" part="frame" src="${resolved.embed}" title="${title}"
           loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
         <a class="link" part="link" href="${resolved.link}" target="_blank" rel="noopener noreferrer">${t("map.larger")}</a>
       </div>`,
      CSS
    );
    this._i18nOff = onLocaleChange(() => { const l = this.$(".link"); if (l) l.textContent = t("map.larger"); });
  }

  disconnectedCallback() {
    this._i18nOff?.();
  }

  // Return { embed, link } URLs, or null when nothing is provided.
  _resolve() {
    const src = this.getAttribute("src");
    if (src) {
      // Full embed URL used verbatim; reuse it for the "larger map" link too.
      return { embed: src, link: src };
    }

    const zoom = this.getAttribute("zoom") || 14;
    const lat = parseFloat(this.getAttribute("lat"));
    const lon = parseFloat(this.getAttribute("lon"));
    const q = this.getAttribute("q");

    if (Number.isFinite(lat) && Number.isFinite(lon)) {
      return this._osm(lat, lon, zoom);
    }
    if (q) {
      const base = "https://www.openstreetmap.org/export/embed.html";
      const embed = `${base}?layer=mapnik&query=${encodeURIComponent(q)}`;
      const link = `https://www.openstreetmap.org/search?query=${encodeURIComponent(q)}`;
      return { embed, link };
    }
    return null;
  }

  // Build an OpenStreetMap export embed centered on lat/lon with a zoom bbox.
  _osm(lat, lon, zoom) {
    const d = span(zoom) / 2;
    const bbox = [lon - d, lat - d, lon + d, lat + d].map((n) => n.toFixed(6)).join(",");
    const base = "https://www.openstreetmap.org/export/embed.html";
    const embed = `${base}?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${lat},${lon}`;
    const link = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=${Math.round(Number(zoom) || 14)}/${lat}/${lon}`;
    return { embed, link };
  }
}

const CSS = `
  :host { display: block; }
  .root {
    position: relative; overflow: hidden;
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius);
    background: var(--pura-subtle); box-shadow: var(--pura-shadow-sm);
  }
  .frame {
    display: block; width: 100%; height: var(--_h, 400px);
    border: none; background: var(--pura-subtle);
  }
  .link {
    position: absolute; right: var(--pura-space-2); bottom: var(--pura-space-2);
    font-size: var(--pura-text-xs); font-weight: 550; text-decoration: none;
    color: var(--pura-fg); background: var(--pura-bg);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius-sm);
    padding: var(--pura-space-1) var(--pura-space-2); box-shadow: var(--pura-shadow-sm);
  }
  .link:hover { background: var(--pura-subtle-hover); }
  .link:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }

  .empty {
    display: grid; place-items: center; height: var(--_h, 400px);
    border: 1px dashed var(--pura-border-strong); border-radius: var(--pura-radius);
    color: var(--pura-muted); font-size: var(--pura-text-sm); background: var(--pura-subtle);
  }
`;

define("pura-map", PuraMap, meta);
export { PuraMap };
