export default {
  "name": "mask-input",
  "tag": "pura-mask-input",
  "category": "Form",
  "title": "Mask Input",
  "role": "",
  "summary": "A text input that enforces a format mask as the user types, with tokens 9 for digit, A for letter, and * for alphanumeric, and auto-insertion of literal characters.",
  "attributes": [
    { "name": "mask", "type": "string", "default": "", "desc": "Format mask string (9=digit, A=letter, *=alphanumeric, other chars are literals)" },
    { "name": "placeholder", "type": "string", "default": "", "desc": "Input placeholder text" },
    { "name": "value", "type": "string", "default": "", "desc": "Current masked value" },
    { "name": "disabled", "type": "boolean", "default": "", "desc": "Disable the input" }
  ],
  "events": ["input"],
  "slots": [],
  "i18nKeys": []
};
