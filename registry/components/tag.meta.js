export default {
  "name": "tag",
  "tag": "pura-tag",
  "category": "Display",
  "title": "Tag",
  "role": "",
  "summary": "Compact pill for labeling, filtering, or categorizing content, with optional removable and status-dot variants.",
  "attributes": [
    {
      "name": "variant",
      "type": "string",
      "default": "neutral",
      "desc": "Color/intent of the tag: neutral, primary, success, warning, danger, or info."
    },
    {
      "name": "removable",
      "type": "boolean",
      "default": "false",
      "desc": "Renders a remove button (×) that emits the remove event."
    },
    {
      "name": "dot",
      "type": "boolean",
      "default": "false",
      "desc": "Renders a status dot in front of the label."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Dims the tag and disables the remove button."
    },
    {
      "name": "label",
      "type": "string",
      "default": "",
      "desc": "Accessible label used as a fallback when the default slot is empty."
    }
  ],
  "events": [
    "remove"
  ],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
