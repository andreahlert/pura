export default {
  "name": "highlight",
  "tag": "pura-highlight",
  "category": "Display",
  "title": "Highlight",
  "role": "",
  "summary": "Wraps matched substrings of its text content in mark elements, supporting comma-separated query terms, case sensitivity control, and whole-word matching.",
  "attributes": [
    { "name": "query", "type": "string", "default": "", "desc": "String or comma-separated terms to highlight" },
    { "name": "text", "type": "string", "default": "", "desc": "Text content to search; falls back to textContent when absent" },
    { "name": "ignore-case", "type": "boolean", "default": "true", "desc": "Case-insensitive matching (set to false to enable case-sensitive)" },
    { "name": "whole-word", "type": "boolean", "default": "", "desc": "Match only on word boundaries when present" }
  ],
  "events": [],
  "slots": [],
  "i18nKeys": []
};
