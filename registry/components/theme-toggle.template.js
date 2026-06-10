// Pure render for <pura-theme-toggle>. No DOM; safe on server (SSR/DSD) and client.
// A single icon button with both sun and moon stacked in one grid cell; which
// one shows is pure CSS: prefers-color-scheme picks the SSR/pre-JS icon, and
// once JS resolves the actual theme it pins data-pura-theme-state on the host,
// which overrides the media query. The circular reveal itself is client-only
// (View Transitions API, driven from theme-toggle.js).
//
// Reduced motion: no icon spin (and the JS skips the reveal entirely).
import { EMPTY_SHIM } from "../base.js";

const SUN_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path></svg>`;

const MOON_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

export function themeToggleTemplate(el = EMPTY_SHIM) {
  const html = `
    <button class="btn" part="button" type="button" aria-label="Toggle theme">
      <span class="icon sun" part="icon sun" aria-hidden="true">${SUN_SVG}</span>
      <span class="icon moon" part="icon moon" aria-hidden="true">${MOON_SVG}</span>
    </button>
  `;

  const css = `
    :host { display: inline-block; line-height: 0; }
    .btn {
      display: inline-grid;
      place-items: center;
      width: var(--pura-theme-toggle-size, 2.5rem);
      height: var(--pura-theme-toggle-size, 2.5rem);
      padding: 0;
      border: 1px solid var(--pura-theme-toggle-border, transparent);
      border-radius: var(--pura-theme-toggle-radius, var(--pura-radius, 0.5rem));
      background: var(--pura-theme-toggle-bg, transparent);
      color: var(--pura-theme-toggle-color, var(--pura-fg, currentColor));
      cursor: pointer;
      font: inherit;
    }
    .btn:hover {
      background: var(--pura-theme-toggle-hover-bg, color-mix(in srgb, currentColor 10%, transparent));
    }
    .btn:focus-visible {
      outline: 2px solid var(--pura-accent, currentColor);
      outline-offset: 2px;
    }
    .icon { grid-area: 1 / 1; display: block; line-height: 0; }
    .icon svg {
      display: block;
      width: var(--pura-theme-toggle-icon-size, 1.125rem);
      height: var(--pura-theme-toggle-icon-size, 1.125rem);
    }

    /* SSR / pre-JS default: sun in light, moon when the OS prefers dark. */
    .sun { display: block; }
    .moon { display: none; }
    @media (prefers-color-scheme: dark) {
      :host(:not([data-pura-theme-state="light"])) .sun { display: none; }
      :host(:not([data-pura-theme-state="light"])) .moon { display: block; }
    }
    /* JS-resolved theme pins the icon regardless of the OS preference. */
    :host([data-pura-theme-state="dark"]) .sun { display: none; }
    :host([data-pura-theme-state="dark"]) .moon { display: block; }

    /* Icon spin on swap (display none -> block restarts the animation).
       Gated to data-pura-tt-animate so the hydrate paint never spins. */
    @keyframes pura-theme-toggle-in {
      from { transform: rotate(-90deg) scale(0.6); opacity: 0; }
      to { transform: rotate(0deg) scale(1); opacity: 1; }
    }
    @media (prefers-reduced-motion: no-preference) {
      :host([data-pura-tt-animate]) .icon {
        animation: pura-theme-toggle-in 0.35s cubic-bezier(0.2, 0, 0, 1);
      }
    }
  `;

  return { html, css };
}
