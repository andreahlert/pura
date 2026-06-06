export default {
  "name": "inline-edit",
  "tag": "pura-inline-edit",
  "category": "Form",
  "title": "Inline Edit",
  "role": "",
  "summary": "A click-to-edit text component that shows a read-only value and swaps into an input or textarea in place on click, with confirm and cancel actions.",
  "attributes": [
    { "name": "value", "type": "string", "default": "", "desc": "The current text value" },
    { "name": "placeholder", "type": "string", "default": "", "desc": "Placeholder text shown when the value is empty" },
    { "name": "multiline", "type": "boolean", "default": "", "desc": "Use a textarea instead of a single-line input" },
    { "name": "disabled", "type": "boolean", "default": "", "desc": "Prevent entering edit mode" },
    { "name": "editing", "type": "boolean", "default": "", "desc": "Boolean state attribute to programmatically control edit mode" },
    { "name": "submit-on-blur", "type": "boolean", "default": "", "desc": "Confirm the edit when the field loses focus" }
  ],
  "events": ["change", "cancel"],
  "slots": [],
  "i18nKeys": []
};
