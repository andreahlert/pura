export default {
  "name": "typewriter",
  "tag": "pura-typewriter",
  "category": "Display",
  "animation": true,
  "title": "Typewriter",
  "role": "",
  "summary": "Types text out character by character, optionally cycling phrases, with a CSS caret; renders full text and is accessible under reduced motion.",
  "attributes": [
    {
      "name": "text",
      "type": "string",
      "default": "",
      "desc": "The string to type (single phrase)."
    },
    {
      "name": "phrases",
      "type": "string",
      "default": "",
      "desc": "\"|\"-separated phrases to cycle through. Overrides text."
    },
    {
      "name": "speed",
      "type": "number",
      "default": "55",
      "desc": "Milliseconds per character while typing."
    },
    {
      "name": "delete-speed",
      "type": "number",
      "default": "30",
      "desc": "Milliseconds per character while deleting."
    },
    {
      "name": "pause",
      "type": "number",
      "default": "1400",
      "desc": "Milliseconds to hold a completed phrase before deleting."
    },
    {
      "name": "caret",
      "type": "boolean",
      "default": "false",
      "desc": "Show a blinking caret."
    },
    {
      "name": "loop",
      "type": "boolean",
      "default": "false",
      "desc": "Keep cycling phrases (delete and retype)."
    },
    {
      "name": "start",
      "type": "\"view\" | \"load\" | \"manual\"",
      "default": "view",
      "desc": "When to begin: on first intersection, immediately on load, or only via start()."
    }
  ],
  "events": [
    "pura-typewriter"
  ],
  "slots": [],
  "i18nKeys": []
};
