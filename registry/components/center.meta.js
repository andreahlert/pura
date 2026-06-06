export default {
  "name": "center",
  "tag": "pura-center",
  "category": "Primitives",
  "title": "Center",
  "role": "",
  "summary": "Centers its slotted content horizontally and vertically using a CSS grid.",
  "attributes": [
    {
      "name": "axis",
      "type": "\"both\" | \"x\" | \"y\"",
      "default": "both",
      "desc": "Which axis to center on. \"both\" centers in both directions, \"x\" centers horizontally while keeping content top-aligned, and \"y\" centers vertically while keeping content left-aligned."
    },
    {
      "name": "min-h",
      "type": "CSS length",
      "default": "auto",
      "desc": "Minimum height of the centering area as any CSS length (e.g. 100vh, 320px). Useful for heroes and full-viewport sections."
    }
  ],
  "events": [],
  "slots": [
    "default — the content to center"
  ],
  "i18nKeys": []
};
