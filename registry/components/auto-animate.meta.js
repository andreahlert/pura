export default {
  "name": "auto-animate",
  "tag": "pura-auto-animate",
  "category": "Utility",
  "animation": true,
  "title": "Auto Animate",
  "role": "",
  "summary": "Drop-in layout animation: direct children animate on add, remove, and reorder via FLIP, zero per-item wiring, reduced-motion aware.",
  "attributes": [
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Stops observing; children mutate with no animation."
    },
    {
      "name": "duration",
      "type": "number",
      "default": "token --pura-duration-4",
      "desc": "Animation duration in milliseconds. Overrides the token-derived default."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
