export default {
  "name": "sheen",
  "tag": "pura-sheen",
  "category": "Animation",
  "animation": true,
  "title": "Sheen / Glare Hover",
  "role": "",
  "summary": "A diagonal light streak sweeps across the slotted content once per hover, without tilting anything. Pure CSS: a translucent gradient overlay crossing the frame via a transform transition. The flat counterpart to the tilt glare, for buttons, cards and images.",
  "attributes": [
    {
      "name": "duration",
      "type": "number",
      "default": "800",
      "desc": "Sweep duration in ms."
    },
    {
      "name": "angle",
      "type": "number",
      "default": "120",
      "desc": "Gradient angle of the streak, in degrees."
    },
    {
      "name": "loop",
      "type": "boolean",
      "default": "false",
      "desc": "Sweep continuously without a pointer (ambient mode). Gated behind prefers-reduced-motion: no-preference."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
