export default {
  "name": "matrix-rain",
  "tag": "pura-matrix-rain",
  "category": "Animation",
  "animation": true,
  "title": "Matrix Rain",
  "role": "",
  "summary": "Matrix-style digital rain behind the slotted content: falling glyph columns on a Canvas 2D layer with a glowing lead character and fading trail. SSR paints a deterministic frozen field; reduced motion stays frozen.",
  "attributes": [
    {
      "name": "speed",
      "type": "number",
      "default": "1",
      "desc": "Fall speed multiplier, 0.1..10."
    },
    {
      "name": "font-size",
      "type": "number",
      "default": "16",
      "desc": "Glyph cell size in CSS px, 8..64. Smaller means denser columns."
    },
    {
      "name": "glyphs",
      "type": "string",
      "default": "katakana + digits",
      "desc": "Custom character set drawn on the canvas."
    },
    {
      "name": "fade",
      "type": "number",
      "default": "0.08",
      "desc": "Trail fade alpha per step, 0.01..1. Lower keeps longer trails."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
