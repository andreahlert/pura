export default {
  "description": "`<pura-typing>` is a three-dot \"typing…\" indicator for chat and agent interfaces. The bounce is pure CSS `@keyframes` with a per-dot stagger, and `role=\"status\"` with a localized `aria-label` announces it to assistive tech. Theme it with `--pura-typing-color`, `--pura-typing-size`, and `--pura-typing-gap`. Under reduced motion the dots fall still while the status label still conveys the meaning.",
  "demoHTML": "<div style=\"display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.6rem 0.9rem; background: var(--pura-subtle, #f4f4f5); border-radius: 14px;\">\n  <pura-typing></pura-typing>\n</div>",
  "usage": "<pura-typing></pura-typing>\n\n<!-- Custom color + larger dots -->\n<pura-typing style=\"--pura-typing-color: #2563eb; --pura-typing-size: 0.6rem;\"></pura-typing>"
};
