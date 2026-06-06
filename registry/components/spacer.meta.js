export default {
  "name": "spacer",
  "tag": "pura-spacer",
  "category": "Primitives",
  "title": "Spacer",
  "role": "",
  "summary": "A layout primitive that adds fixed or flexible empty space between elements.",
  "attributes": [
    {
      "name": "size",
      "type": "string",
      "default": "",
      "desc": "Spacing scale step (1-6, mapped to var(--pura-space-N)) or any raw CSS length (e.g. 2rem, 24px). When omitted, the spacer grows to fill available space (flex: 1) and is inert in normal block flow."
    }
  ],
  "events": [],
  "slots": [],
  "i18nKeys": []
};
