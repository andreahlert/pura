export default {
  "name": "mention",
  "tag": "pura-mention",
  "category": "Form",
  "title": "Mention",
  "role": "",
  "summary": "Text field (input or textarea) with an inline autocomplete popup that opens when a trigger character is typed.",
  "attributes": [
    { "name": "placeholder", "type": "string", "default": "", "desc": "Placeholder text for the input or textarea." },
    { "name": "value", "type": "string", "default": "", "desc": "Current text value of the control." },
    { "name": "multiline", "type": "boolean", "default": "", "desc": "Renders a textarea instead of a single-line input." },
    { "name": "trigger", "type": "string", "default": "@", "desc": "Character that activates the mention autocomplete menu." }
  ],
  "events": ["input", "mention"],
  "slots": [],
  "i18nKeys": []
};
