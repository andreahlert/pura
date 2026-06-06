export default {
  "name": "skeleton-text",
  "tag": "pura-skeleton-text",
  "category": "Display",
  "title": "Skeleton Text",
  "role": "",
  "summary": "Loading placeholder that mimics a paragraph with shimmering lines of text.",
  "attributes": [
    {
      "name": "lines",
      "type": "number",
      "default": "3",
      "desc": "Number of lines to render. Clamped to a minimum of 1; invalid values fall back to 3."
    },
    {
      "name": "gap",
      "type": "string",
      "default": "var(--pura-space-2)",
      "desc": "CSS length for the vertical spacing between lines."
    },
    {
      "name": "last",
      "type": "string",
      "default": "60%",
      "desc": "CSS width of the last (shorter) line, applied only when there is more than one line."
    }
  ],
  "events": [],
  "slots": [],
  "i18nKeys": []
};
