export default {
  "name": "color-picker",
  "tag": "pura-color-picker",
  "category": "Form",
  "title": "Color Picker",
  "role": "",
  "summary": "Swatch button that opens a popover with a preset palette, a native color picker, and a hex field.",
  "attributes": [
    {
      "name": "value",
      "type": "string",
      "default": "#000000",
      "desc": "Current color in hex (e.g. \"#2563eb\"). Accepts #rgb or #rrggbb forms and is normalized to lowercase #rrggbb; invalid values fall back to #000000. Reflected back to the attribute on change."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables the trigger and blocks interaction (pointer-events none, reduced opacity)."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Choose color",
      "desc": "Accessible name (aria-label) for the swatch button."
    }
  ],
  "events": [
    "change",
    "input"
  ],
  "slots": [],
  "i18nKeys": []
};
