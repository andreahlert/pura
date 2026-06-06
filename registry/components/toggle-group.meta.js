export default {
  "name": "toggle-group",
  "tag": "pura-toggle-group",
  "category": "Form",
  "title": "Toggle Group",
  "role": "",
  "summary": "Segmented control of toggle buttons, with single or multiple selection.",
  "attributes": [
    {
      "name": "type",
      "type": "string",
      "default": "multiple",
      "desc": "'single' allows an exclusive choice (radio style); 'multiple' (default) allows several selections."
    },
    {
      "name": "value",
      "type": "string",
      "default": "",
      "desc": "In single mode, reflects the value of the pressed toggle; set it to pre-select. In multiple mode, read the .value property to get the array."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables the entire group, preserving each toggle's individual disabled state."
    },
    {
      "name": "orientation",
      "type": "string",
      "default": "horizontal",
      "desc": "'horizontal' (default) or 'vertical'; controls layout and the direction of the navigation arrows."
    },
    {
      "name": "pressed",
      "type": "boolean",
      "default": "false",
      "desc": "Attribute on the child <pura-toggle>: indicates whether it is pressed/active."
    },
    {
      "name": "value (pura-toggle)",
      "type": "string",
      "default": "textContent",
      "desc": "Attribute on the child <pura-toggle>: value associated with the toggle; falls back to the inner text if absent."
    }
  ],
  "events": [
    "change"
  ],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
