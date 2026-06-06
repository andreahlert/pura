export default {
  "name": "segmented-control",
  "tag": "pura-segmented-control",
  "category": "Form",
  "title": "Segmented Control",
  "role": "",
  "summary": "An iOS-style segmented control for single choice, with a sliding indicator under the active option.",
  "attributes": [
    {
      "name": "options",
      "type": "string",
      "default": "",
      "desc": "Comma-separated list of segment labels (e.g., \"Day,Week,Month\"). Spaces are trimmed and empty items are ignored."
    },
    {
      "name": "value",
      "type": "string",
      "default": "first option",
      "desc": "Label of the currently selected option. If absent or not present in options, it defaults to the first option."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables the entire control (no focus, no clicks)."
    },
    {
      "name": "size",
      "type": "string",
      "default": "md",
      "desc": "Size of the control: sm | md | lg. Purely presentational."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Segmented control",
      "desc": "aria-label text for the radiogroup, for accessibility."
    }
  ],
  "events": [
    "change"
  ],
  "slots": [],
  "i18nKeys": []
};
