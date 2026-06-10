export default {
  "name": "pinch-zoom",
  "tag": "pura-pinch-zoom",
  "category": "Animation",
  "animation": true,
  "title": "Pinch Zoom",
  "role": "",
  "summary": "Touch media viewer: pinch with two pointers to zoom, drag to pan while zoomed, double tap to toggle scale. Pointer Events math with clamped containment; SSR shows the media at scale 1.",
  "attributes": [
    {
      "name": "min",
      "type": "number",
      "default": "1",
      "desc": "Minimum scale."
    },
    {
      "name": "max",
      "type": "number",
      "default": "4",
      "desc": "Maximum scale."
    },
    {
      "name": "double-tap-scale",
      "type": "number",
      "default": "2.5",
      "desc": "Scale a double tap or double click zooms to, capped at max."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Turns all zoom and pan gestures off."
    }
  ],
  "events": [
    "zoom"
  ],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
