export default {
  "name": "fuzzy-text",
  "tag": "pura-fuzzy-text",
  "category": "Animation",
  "animation": true,
  "title": "Fuzzy Text",
  "role": "",
  "summary": "TV-static fuzzy text: horizontal slices of the glyphs vibrate sideways in continuous canvas noise, intensifying on hover. Progressive enhancement over the real SSR text; static under reduced motion.",
  "attributes": [
    {
      "name": "intensity",
      "type": "number",
      "default": "0.18",
      "desc": "Baseline horizontal jitter, as a fraction of the font size (0..2)."
    },
    {
      "name": "hover-intensity",
      "type": "number",
      "default": "0.5",
      "desc": "Jitter while hovered, as a fraction of the font size. Set it equal to intensity to disable the hover boost."
    },
    {
      "name": "slice",
      "type": "number",
      "default": "2",
      "desc": "Height in CSS px of each jittered horizontal slice (1..24)."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
