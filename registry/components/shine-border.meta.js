export default {
  "name": "shine-border",
  "tag": "pura-shine-border",
  "category": "Display",
  "animation": true,
  "title": "Shine Border",
  "role": "",
  "summary": "A conic sheen rotates around the rounded border of any container. Pure CSS via @property angle + mask-composite, SSR-safe, reduced-motion aware.",
  "attributes": [
    {
      "name": "duration",
      "type": "number",
      "default": "4",
      "desc": "Seconds for the sheen to complete one rotation."
    },
    {
      "name": "width",
      "type": "number",
      "default": "1.5",
      "desc": "Border thickness in pixels."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
