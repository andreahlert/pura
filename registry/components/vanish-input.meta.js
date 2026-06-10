export default {
  "name": "vanish-input",
  "tag": "pura-vanish-input",
  "category": "Animation",
  "animation": true,
  "title": "Vanish Input",
  "role": "",
  "summary": "Submit feedback for chat and search composers: on submit the typed text dissolves into particles that fly out of the field before it clears. Canvas 2D progressive enhancement over a plain form; optional rotating placeholders.",
  "attributes": [
    {
      "name": "placeholder",
      "type": "string",
      "default": "",
      "desc": "Static placeholder text."
    },
    {
      "name": "placeholders",
      "type": "string",
      "default": "",
      "desc": "Pipe-separated list of rotating placeholders; overrides placeholder."
    },
    {
      "name": "interval",
      "type": "number",
      "default": "3000",
      "desc": "Placeholder rotation interval in milliseconds (min 800)."
    },
    {
      "name": "value",
      "type": "string",
      "default": "",
      "desc": "Initial value."
    },
    {
      "name": "duration",
      "type": "number",
      "default": "900",
      "desc": "Particle dissolve time in milliseconds."
    },
    {
      "name": "label",
      "type": "string",
      "default": "",
      "desc": "Accessible name for the inner input."
    },
    {
      "name": "submit-label",
      "type": "string",
      "default": "Submit",
      "desc": "aria-label for the submit button."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables the field and the submit button."
    }
  ],
  "events": [
    "submit",
    "vanish",
    "input"
  ],
  "slots": [],
  "i18nKeys": []
};
