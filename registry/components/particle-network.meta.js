export default {
  "name": "particle-network",
  "tag": "pura-particle-network",
  "category": "Animation",
  "animation": true,
  "title": "Particle Network",
  "role": "",
  "summary": "The iconic particles.js background: dots drift on a Canvas 2D field and connect with lines while close, with pointer grab, repulse or attract. The rAF loop pauses offscreen; SSR paints a static dot field; reduced motion freezes on one connected frame.",
  "attributes": [
    {
      "name": "count",
      "type": "number",
      "default": "80",
      "desc": "Number of particles, max 160."
    },
    {
      "name": "distance",
      "type": "number",
      "default": "120",
      "desc": "Max distance in px for two particles to be linked by a line."
    },
    {
      "name": "speed",
      "type": "number",
      "default": "40",
      "desc": "Drift speed in px per second."
    },
    {
      "name": "size",
      "type": "number",
      "default": "2",
      "desc": "Base dot radius in px."
    },
    {
      "name": "pointer",
      "type": "\"grab\" | \"repulse\" | \"attract\" | \"none\"",
      "default": "grab",
      "desc": "Pointer interaction: grab draws lines to the cursor, repulse pushes particles away, attract pulls them in."
    },
    {
      "name": "pointer-distance",
      "type": "number",
      "default": "160",
      "desc": "Pointer interaction radius in px."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
