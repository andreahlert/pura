export default {
  "name": "field",
  "tag": "pura-field",
  "category": "Form",
  "title": "Field",
  "role": "",
  "summary": "Wraps a form control with a label, description, and error message.",
  "attributes": [
    {
      "name": "label",
      "type": "string",
      "default": "",
      "desc": "Label text shown above the control."
    },
    {
      "name": "description",
      "type": "string",
      "default": "",
      "desc": "Helper text shown below the control (hidden when there is an error)."
    },
    {
      "name": "error",
      "type": "string",
      "default": "",
      "desc": "Error message; when present, applies the invalid style and replaces the description."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
