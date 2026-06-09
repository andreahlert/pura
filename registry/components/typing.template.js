// Pure render for <pura-typing>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

export function typingTemplate(el = EMPTY_SHIM) {
  const label = el.getAttribute("label") || t("typing.label");
  const html = `<span class="dots" part="dots" role="status" aria-label="${label}">
    <span class="dot" part="dot"></span><span class="dot" part="dot"></span><span class="dot" part="dot"></span>
  </span>`;
  return { html, css: TYPING_CSS };
}

export const TYPING_CSS = `
  :host { display: inline-block; }

  .dots {
    display: inline-flex;
    align-items: center;
    gap: var(--pura-typing-gap, 0.25rem);
  }

  .dot {
    width: var(--pura-typing-size, 0.5rem);
    height: var(--pura-typing-size, 0.5rem);
    border-radius: 50%;
    background: var(--pura-typing-color, var(--pura-muted));
    /* base.js RESET collapses animation-duration under reduced motion, so the
       dots fall still there with no separate guard. */
    animation: pura-typing 1.2s var(--pura-ease-standard) infinite;
  }
  .dot:nth-child(2) { animation-delay: 0.15s; }
  .dot:nth-child(3) { animation-delay: 0.3s; }

  @keyframes pura-typing {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
    30% { transform: translateY(-30%); opacity: 1; }
  }
`;
