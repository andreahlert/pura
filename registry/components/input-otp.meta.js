export default {
  "name": "input-otp",
  "tag": "pura-input-otp",
  "category": "Form",
  "title": "Input OTP",
  "role": "",
  "summary": "Single-digit fields for one-time codes (OTP), with auto-advance and smart paste.",
  "attributes": [
    {
      "name": "length",
      "type": "number",
      "default": "6",
      "desc": "Number of digit boxes rendered."
    },
    {
      "name": "value",
      "type": "string",
      "default": "\"\"",
      "desc": "Current code; mirrored to the attribute on every change."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables all input boxes."
    },
    {
      "name": "invalid",
      "type": "boolean",
      "default": "false",
      "desc": "Applies the error style and sets aria-invalid."
    },
    {
      "name": "alphanumeric",
      "type": "boolean",
      "default": "false",
      "desc": "Accepts letters and numbers; without it, digits only."
    },
    {
      "name": "mono",
      "type": "boolean",
      "default": "false",
      "desc": "Uses a monospaced font in the boxes."
    }
  ],
  "events": [
    "input",
    "complete"
  ],
  "slots": [],
  "i18nKeys": []
};
