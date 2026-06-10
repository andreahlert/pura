export default {
  "name": "line-shadow-text",
  "tag": "pura-line-shadow-text",
  "category": "Animation",
  "animation": true,
  "title": "Line Shadow Text",
  "role": "",
  "summary": "Display text with a hard offset shadow made of diagonal stripes sliding behind the characters in a continuous CSS loop. Editorial, brutalist look with zero per-frame JS.",
  "attributes": [
    {
      "name": "text",
      "type": "string",
      "default": "",
      "desc": "Shadow copy text. When set, the striped shadow paints on SSR; when absent the client mirrors the slotted text."
    },
    {
      "name": "shadow-color",
      "type": "string",
      "default": "currentColor",
      "desc": "Color of the shadow stripes."
    },
    {
      "name": "speed",
      "type": "number",
      "default": "30",
      "desc": "Seconds for one full stripe loop. Lower is faster."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
