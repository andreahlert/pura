export default {
  "name": "copy-button",
  "tag": "pura-copy-button",
  "category": "Display",
  "title": "Copy Button",
  "role": "",
  "summary": "Button that copies text to the clipboard and shows a visual \"Copied\" feedback.",
  "attributes": [
    {
      "name": "value",
      "type": "string",
      "default": "",
      "desc": "Literal text to be copied. Takes priority over target."
    },
    {
      "name": "target",
      "type": "string",
      "default": "",
      "desc": "CSS selector resolved against the document; copies the value (form fields) or the textContent of the matched node."
    },
    {
      "name": "timeout",
      "type": "number",
      "default": "1200",
      "desc": "Duration of the Copied feedback in milliseconds."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Makes the button non-interactive."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Copiar",
      "desc": "Accessible label (aria-label) for the icon-only button."
    }
  ],
  "events": [
    "copy",
    "error"
  ],
  "slots": [
    "(default)"
  ],
  "i18nKeys": []
};
