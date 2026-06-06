export default {
  "name": "search-field",
  "tag": "pura-search-field",
  "category": "Form",
  "title": "Search Field",
  "role": "",
  "summary": "Search input with a leading magnifier icon and a trailing clear button, firing a debounced search event on input or immediately on Enter and clear.",
  "attributes": [
    { "name": "value", "type": "string", "default": "", "desc": "Current value of the search input." },
    { "name": "placeholder", "type": "string", "default": "", "desc": "Placeholder text; defaults to localized \"Search\"." },
    { "name": "disabled", "type": "boolean", "default": "", "desc": "Disables the input and clear button." },
    { "name": "loading", "type": "boolean", "default": "", "desc": "Replaces the magnifier icon with a spinner to indicate a pending search." },
    { "name": "debounce", "type": "number", "default": "250", "desc": "Debounce delay in milliseconds before the search event fires." }
  ],
  "events": ["search"],
  "slots": [],
  "i18nKeys": []
};
