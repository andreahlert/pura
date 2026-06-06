export default {
  "name": "command",
  "tag": "pura-command",
  "category": "Navigation",
  "title": "Command",
  "role": "",
  "summary": "Command palette with substring search and keyboard navigation.",
  "attributes": [
    {
      "name": "placeholder",
      "type": "string",
      "default": "Type a command or search…",
      "desc": "Text shown in the search field when it's empty."
    },
    {
      "name": "empty",
      "type": "string",
      "default": "No results found.",
      "desc": "Empty-state text shown when no item matches the search."
    },
    {
      "name": "value",
      "type": "string",
      "default": "\"\"",
      "desc": "Current search query (reflects the text typed in the input)."
    },
    {
      "name": "value (item)",
      "type": "string",
      "default": "\"\"",
      "desc": "On pura-command-item: value sent in the event detail and used for matching (falls back to the label text if absent)."
    },
    {
      "name": "disabled (item)",
      "type": "boolean",
      "default": "false",
      "desc": "On pura-command-item: disables the item, preventing selection and matching."
    }
  ],
  "events": [
    "command",
    "select"
  ],
  "slots": [
    "default",
    "shortcut"
  ],
  "i18nKeys": []
};
