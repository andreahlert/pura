export default {
  "name": "lamp",
  "tag": "pura-lamp",
  "category": "Animation",
  "animation": true,
  "title": "Lamp Effect",
  "role": "",
  "summary": "Linear-style lamp header: two mirrored conic-gradient cones spread light downward from a glowing bar onto the slotted heading, with an animated lamp-opening entrance. Pure CSS; SSR renders the open state.",
  "attributes": [
    {
      "name": "trigger",
      "type": "\"view\" | \"scrub\" | \"load\" | \"none\"",
      "default": "view",
      "desc": "view opens once when scrolled into view; scrub ties the opening 1:1 to a scroll-driven timeline; load opens on connect; none renders the lamp always open."
    },
    {
      "name": "color",
      "type": "string",
      "default": "var(--pura-accent, #22d3ee)",
      "desc": "Light color of the bar, glow and cones. Any CSS color."
    },
    {
      "name": "range",
      "type": "string",
      "default": "entry 0% cover 40%",
      "desc": "animation-range for the scrub timeline."
    },
    {
      "name": "duration",
      "type": "number",
      "default": "900",
      "desc": "Entrance duration in ms for the view and load triggers."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
