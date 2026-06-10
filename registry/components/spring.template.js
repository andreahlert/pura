// Pure render for <pura-spring>. No DOM; safe on server (SSR/DSD) and client.
// The visual is a poke-able token on a rail; the element sets --pura-spring-ease
// and --pura-spring-dur from the sampled spring so the transition overshoots and
// settles like a real damped oscillator. Outside a running transition the token
// rests at its natural position, so first paint is correct without JS.
import { EMPTY_SHIM } from "../base.js";

export function springTemplate(el = EMPTY_SHIM) {
  const html = `
    <button class="stage" part="stage" type="button" aria-label="Poke the spring">
      <span class="rail" part="rail">
        <span class="ball" part="ball"></span>
      </span>
    </button>`;
  return { html, css: SPRING_CSS };
}

export const SPRING_CSS = `
  :host {
    display: block;
    --pura-spring-travel: 190px;
    --pura-spring-dur: 0.6s;
    --pura-spring-ease: linear;
  }
  .stage {
    all: unset;
    display: block;
    width: 100%;
    cursor: pointer;
    padding: 20px 14px;
    border-radius: 12px;
  }
  .stage:focus-visible {
    outline: 2px solid var(--pura-accent, #2563eb);
    outline-offset: 3px;
  }
  .rail {
    position: relative;
    display: block;
    height: 8px;
    border-radius: 999px;
    background: var(--pura-border, #e4e4e7);
  }
  .ball {
    position: absolute;
    top: 50%;
    left: 0;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: var(--pura-primary, #18181b);
    box-shadow: 0 2px 8px color-mix(in srgb, var(--pura-primary, #18181b) 30%, transparent);
    transform: translate(calc(var(--pura-spring-on, 0) * var(--pura-spring-travel)), -50%);
    transition: transform var(--pura-spring-dur) var(--pura-spring-ease);
    will-change: transform;
  }
`;
