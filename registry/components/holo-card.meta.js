export default {
  "name": "holo-card",
  "tag": "pura-holo-card",
  "category": "Animation",
  "animation": true,
  "title": "Holo Card",
  "role": "",
  "summary": "Trading-card holographic foil: an iridescent rainbow sheen and a soft glare slide across the card as the pointer moves, with optional light 3D tilt. SSR renders a pretty resting sheen.",
  "attributes": [
    {
      "name": "intensity",
      "type": "number",
      "default": "0.75",
      "desc": "Foil strength, 0..1. Scales the resting and hover opacity of the holographic layers."
    },
    {
      "name": "angle",
      "type": "number",
      "default": "115",
      "desc": "Base angle of the foil stripes in degrees."
    },
    {
      "name": "tilt",
      "type": "number",
      "default": "0",
      "desc": "Max tilt angle in degrees; bare attribute means 6, absent disables tilt. Compose with pura-tilt for spring physics instead."
    },
    {
      "name": "sparkle",
      "type": "boolean",
      "default": "false",
      "desc": "Adds a glittery dot layer that drifts against the foil."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
