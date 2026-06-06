export default {
  "name": "reveal",
  "tag": "pura-reveal",
  "category": "Utility",
  "title": "Reveal",
  "role": "",
  "summary": "Animates content into view when it enters the viewport, respecting prefers-reduced-motion.",
  "attributes": [
    {
      "name": "animation",
      "type": "\"fade\" | \"slide-up\" | \"zoom\"",
      "default": "fade",
      "desc": "Entrance animation style. Invalid values fall back to fade."
    },
    {
      "name": "delay",
      "type": "number",
      "default": "0",
      "desc": "Milliseconds to wait before animating when it enters the viewport. Applied as transition-delay and ignored under reduced motion."
    },
    {
      "name": "once",
      "type": "boolean",
      "default": "false",
      "desc": "When present, reveals once and stops observing. When absent, re-hides on exit and reveals again on re-entry."
    },
    {
      "name": "threshold",
      "type": "number",
      "default": "0.15",
      "desc": "IntersectionObserver threshold 0..1 that defines how much of the element must be visible to reveal."
    },
    {
      "name": "revealed",
      "type": "boolean",
      "default": "false",
      "desc": "Read-only reflected state: present while the content is visible."
    }
  ],
  "events": [
    "pura-reveal"
  ],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
