export default {
  "name": "item",
  "tag": "pura-item",
  "category": "Display",
  "title": "Item",
  "role": "",
  "summary": "Flexible row for lists, with media, title, description, and actions.",
  "attributes": [
    {
      "name": "title",
      "type": "string",
      "default": "",
      "desc": "Convenience text for the title (the \"title\" slot takes priority over it)."
    },
    {
      "name": "hover",
      "type": "boolean",
      "default": "false",
      "desc": "Applies a subtle background when hovering over the item."
    },
    {
      "name": "bordered",
      "type": "boolean",
      "default": "false",
      "desc": "Adds a border, radius, and subtle elevation around the item."
    },
    {
      "name": "clickable",
      "type": "boolean",
      "default": "false",
      "desc": "Makes the item interactive: pointer cursor, role=\"button\", and keyboard activation."
    }
  ],
  "events": [],
  "slots": [
    "media",
    "title",
    "default",
    "actions"
  ],
  "i18nKeys": []
};
