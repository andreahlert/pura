export default {
  "name": "border-beam",
  "tag": "pura-border-beam",
  "category": "Display",
  "animation": true,
  "title": "Border Beam",
  "role": "",
  "summary": "A comet of light travels the rounded border of any container. Pure CSS via offset-path: border-box, SSR-safe, reduced-motion aware.",
  "attributes": [
    {
      "name": "size",
      "type": "number",
      "default": "64",
      "desc": "Beam length in pixels."
    },
    {
      "name": "duration",
      "type": "number",
      "default": "5",
      "desc": "Seconds for the beam to complete one lap of the border."
    },
    {
      "name": "delay",
      "type": "number",
      "default": "0",
      "desc": "Seconds before the beam starts traveling."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
