export default {
  "name": "flow-field",
  "tag": "pura-flow-field",
  "category": "Animation",
  "animation": true,
  "title": "Flow Field",
  "role": "",
  "summary": "Generative backdrop: particles flow along a seeded noise vector field on Canvas 2D, drawing organic topographic trails that accumulate behind the slotted content. The vortex preset swaps in a perturbed spiral around the center. SSR paints deterministic streamlines; reduced motion holds one static accumulated frame.",
  "attributes": [
    {
      "name": "count",
      "type": "number",
      "default": "500",
      "desc": "Number of particles, max 1500."
    },
    {
      "name": "preset",
      "type": "\"flow\" | \"vortex\"",
      "default": "flow",
      "desc": "flow steers particles by the noise field; vortex orbits them on a perturbed inward spiral around the center."
    },
    {
      "name": "seed",
      "type": "number",
      "default": "1",
      "desc": "Noise seed. The same seed always produces the same field and the same drawing."
    },
    {
      "name": "scale",
      "type": "number",
      "default": "0.004",
      "desc": "Noise field frequency per px. Smaller values give broader, smoother curves."
    },
    {
      "name": "speed",
      "type": "number",
      "default": "60",
      "desc": "Particle speed in px per second."
    },
    {
      "name": "fade",
      "type": "number",
      "default": "0.04",
      "desc": "Trail fade per frame, 0..1. Lower values keep longer accumulated trails."
    },
    {
      "name": "line-width",
      "type": "number",
      "default": "1",
      "desc": "Stroke width of the trails in px."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
