export default {
  "name": "grid-motion",
  "tag": "pura-grid-motion",
  "category": "Animation",
  "animation": true,
  "title": "Grid Motion",
  "role": "",
  "summary": "The awwwards infinite-grid hero: an oversized grid of images or cards whose rows slide laterally following the pointer with lerp inertia. Rows alternate direction and depth; SSR paints the static centered grid.",
  "attributes": [
    {
      "name": "columns",
      "type": "number",
      "default": "4",
      "desc": "Cells per row, 1..12. Row membership is floor(index / columns)."
    },
    {
      "name": "shift",
      "type": "number",
      "default": "160",
      "desc": "Max horizontal travel in px for the deepest row."
    },
    {
      "name": "ease",
      "type": "number",
      "default": "0.06",
      "desc": "Lerp factor per frame, 0..1. Lower feels floatier."
    },
    {
      "name": "tilt",
      "type": "number",
      "default": "0",
      "desc": "Grid rotation in degrees, -45..45. Use -12 for the classic angled look."
    },
    {
      "name": "global",
      "type": "boolean",
      "default": "false",
      "desc": "Track the pointer on the whole window instead of only over the element."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
