export default {
  "name": "orbiting-circles",
  "tag": "pura-orbiting-circles",
  "category": "Display",
  "animation": true,
  "title": "Orbiting Circles",
  "role": "",
  "summary": "Satellites ride a circular orbit around centred content. Pure CSS @keyframes with staggered delays, SSR-safe, reduced-motion aware.",
  "attributes": [
    {
      "name": "count",
      "type": "number",
      "default": "5",
      "desc": "Number of orbiting satellites (max 24)."
    },
    {
      "name": "duration",
      "type": "number",
      "default": "20",
      "desc": "Seconds for one full orbit."
    },
    {
      "name": "reverse",
      "type": "boolean",
      "default": "false",
      "desc": "Orbit counter-clockwise."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
