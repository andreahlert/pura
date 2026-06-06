export default {
  "name": "textarea",
  "tag": "pura-textarea",
  "category": "Form",
  "title": "Textarea",
  "role": "",
  "summary": "A multiline text field with a label, hint, and error state.",
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
      "desc": "Text shown when the field is empty."
    },
    {
      "name": "rows",
      "type": "number",
      "default": "4",
      "desc": "Number of visible rows in the field."
    },
    {
      "name": "value",
      "type": "string",
      "default": "",
      "desc": "Current content of the field; also available as a property."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables the field for editing."
    },
    {
      "name": "invalid",
      "type": "boolean",
      "default": "false",
      "desc": "Applies the error style to the field and the hint."
    }
  ],
  "events": [
    "input"
  ],
  "slots": [],
  "i18nKeys": []
};
