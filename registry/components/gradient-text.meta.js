export default {
  "name": "gradient-text",
  "tag": "pura-gradient-text",
  "category": "Animation",
  "animation": true,
  "title": "Gradient Text",
  "role": "",
  "summary": "Text filled with a multicolor gradient that flows continuously across the letters, aurora style. Pure CSS @keyframes clipped to the glyphs, SSR-safe, freezes under reduced motion.",
  "attributes": [
    {
      "name": "colors",
      "type": "string",
      "default": "#40ffaa, #4079ff, #a855f7, #ff6ec4, #40ffaa",
      "desc": "Comma-separated CSS colors used as the gradient stops."
    },
    {
      "name": "angle",
      "type": "string",
      "default": "90deg",
      "desc": "Gradient direction, any CSS angle (deg, turn, rad, grad)."
    },
    {
      "name": "duration",
      "type": "number",
      "default": "8",
      "desc": "Seconds for one full flow cycle."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
