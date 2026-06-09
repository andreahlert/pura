// Pure render for <pura-confidence-meter>. No DOM; safe on server (SSR/DSD) and
// client. The fill width, the shimmer sweep speed, and an optional low-confidence
// jitter are all driven by CSS custom properties the component sets from the
// resolved value, so the resting (no-attribute) paint is a calm empty bar.
import { EMPTY_SHIM } from "../base.js";

export function confidenceMeterTemplate(el = EMPTY_SHIM) {
  const label = el.getAttribute("label") || "";
  const html =
    `<div class="meter" part="meter">` +
      `<div class="head" part="head">` +
        `<span class="label" part="label">${escapeHtml(label)}</span>` +
        `<span class="value" part="value"></span>` +
      `</div>` +
      `<div class="track" part="track">` +
        `<div class="fill" part="fill">` +
          `<span class="shimmer" part="shimmer" aria-hidden="true"></span>` +
        `</div>` +
      `</div>` +
    `</div>`;
  return { html, css: CONFIDENCE_METER_CSS };
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

export const CONFIDENCE_METER_CSS = `
  :host {
    display: inline-block;
    width: var(--pura-confidence-width, 220px);
    vertical-align: middle;
    --pura-conf-accent: var(--pura-confidence-color, #6366f1);
    /* Speed of the shimmer sweep; the component lowers it as confidence rises,
       so a confident meter glides calmly and an uncertain one flickers fast. */
    --pura-conf-speed: 2.4s;
  }

  /* Color also encodes confidence: rose when unsure, emerald when sure. Override
     globally with --pura-confidence-color to opt out of the semantic palette. */
  :host([data-pura-confidence-level="low"])    { --pura-conf-accent: var(--pura-confidence-color, #fb7185); }
  :host([data-pura-confidence-level="medium"]) { --pura-conf-accent: var(--pura-confidence-color, #fbbf24); }
  :host([data-pura-confidence-level="high"])   { --pura-conf-accent: var(--pura-confidence-color, #34d399); }

  .meter { display: block; }

  .head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 0.5rem;
    margin-bottom: 0.35rem;
    font: 500 12px var(--pura-font, system-ui, sans-serif);
    color: var(--pura-muted-fg, color-mix(in oklab, var(--pura-fg, #71717a) 70%, transparent));
  }
  .head:empty, .head[hidden] { display: none; }
  .value { font-variant-numeric: tabular-nums; }

  .track {
    position: relative;
    height: var(--pura-confidence-height, 8px);
    border-radius: 999px;
    overflow: hidden;
    background: var(--pura-confidence-track, color-mix(in oklab, var(--pura-fg, #71717a) 14%, transparent));
  }

  .fill {
    position: absolute;
    inset: 0 auto 0 0;
    width: var(--pura-conf-pct, 0%);
    border-radius: 999px;
    overflow: hidden;
    background: linear-gradient(
      90deg,
      color-mix(in oklab, var(--pura-conf-accent), #000 22%),
      var(--pura-conf-accent)
    );
    transition: width 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), background 0.4s ease;
    box-shadow: 0 0 var(--pura-conf-glow, 0px) var(--pura-conf-accent);
  }

  /* A specular highlight glides across the filled portion. Its cadence carries
     the agent's confidence: calm when high, restless when low. */
  .shimmer {
    position: absolute;
    inset: 0;
    width: 45%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
    transform: translateX(-130%);
    /* base.js RESET collapses animation-duration under reduced motion, so the
       sweep parks off-screen with no separate guard. */
    animation: pura-conf-sweep var(--pura-conf-speed, 2.4s) ease-in-out infinite;
  }

  @keyframes pura-conf-sweep {
    0%   { transform: translateX(-130%); }
    100% { transform: translateX(330%); }
  }

  /* Low confidence reads as a faint nervous tremor on the bar itself. */
  :host([data-pura-confidence-level="low"]) .track {
    animation: pura-conf-jitter 0.2s steps(2, jump-none) infinite;
  }
  @keyframes pura-conf-jitter {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(0.5px); }
  }
`;
