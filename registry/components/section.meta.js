export default {
  "name": "section",
  "tag": "pura-section",
  "category": "Primitives",
  "title": "Section",
  "role": "",
  "summary": "A semantic section wrapper that applies consistent vertical rhythm and an optional centered, readable max-width container.",
  "attributes": [
    {
      "name": "py",
      "type": "number",
      "default": "6",
      "desc": "Vertical padding on the space scale (1 to 6). Maps to the --pura-space-{n} token, falling back to --pura-space-6."
    },
    {
      "name": "container",
      "type": "boolean",
      "default": "false",
      "desc": "When present, centers the content within a readable max-width (65rem) using auto inline margins."
    },
    {
      "name": "bg",
      "type": "string",
      "default": "transparent",
      "desc": "Background fill. A bare token name (e.g. \"subtle\") resolves to its --pura-* variable; any other value (e.g. a hex color) is used verbatim as a CSS value."
    }
  ],
  "events": [],
  "slots": [
    "default — section content"
  ],
  "i18nKeys": []
};
