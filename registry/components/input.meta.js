export default {
  "name": "input",
  "tag": "pura-input",
  "category": "Form",
  "title": "Input",
  "role": "",
  "summary": "Text field with a label, hint, and validation state.",
  "attributes": [
    {
      "name": "label",
      "type": "string",
      "default": "",
      "desc": "Label text shown above the field."
    },
    {
      "name": "hint",
      "type": "string",
      "default": "",
      "desc": "Hint text shown below the field."
    },
    {
      "name": "placeholder",
      "type": "string",
      "default": "",
      "desc": "Example text shown when the field is empty."
    },
    {
      "name": "type",
      "type": "string",
      "default": "text",
      "desc": "HTML input type (text, email, password, etc)."
    },
    {
      "name": "value",
      "type": "string",
      "default": "",
      "desc": "Current value of the field; also available as the .value property."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables the field when present."
    },
    {
      "name": "invalid",
      "type": "boolean",
      "default": "false",
      "desc": "Applies the error style and sets aria-invalid when present."
    }
  ],
  "events": [
    "input"
  ],
  "slots": [],
  "i18nKeys": []
};
