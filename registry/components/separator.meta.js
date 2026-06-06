export default {
  "name": "separator",
  "tag": "pura-separator",
  "category": "Display",
  "title": "Separator",
  "role": "",
  "summary": "Horizontal or vertical dividing line, with an optional centered label.",
  "attributes": [
    {
      "name": "orientation",
      "type": "string",
      "default": "horizontal",
      "desc": "Direction of the line: \"horizontal\" or \"vertical\"."
    },
    {
      "name": "label",
      "type": "string",
      "default": "",
      "desc": "Optional text centered between two lines (forces the horizontal layout with a label)."
    }
  ],
  "events": [],
  "slots": [],
  "i18nKeys": []
};
