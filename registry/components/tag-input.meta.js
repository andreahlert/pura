export default {
  "name": "tag-input",
  "tag": "pura-tag-input",
  "category": "Form",
  "title": "Tag Input",
  "role": "",
  "summary": "A tag input field where the user types and presses Enter or comma to add removable chips.",
  "attributes": [
    {
      "name": "value",
      "type": "string",
      "default": "\"\"",
      "desc": "Initial comma-separated tags; reflects the current state as the tags change."
    },
    {
      "name": "placeholder",
      "type": "string",
      "default": "\"\"",
      "desc": "Placeholder text for the input field (also used as the aria-label)."
    },
    {
      "name": "max",
      "type": "number",
      "default": "Infinity",
      "desc": "Maximum number of allowed tags; input is blocked once the limit is reached."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Makes the component non-interactive."
    }
  ],
  "events": [
    "change"
  ],
  "slots": [],
  "i18nKeys": []
};
