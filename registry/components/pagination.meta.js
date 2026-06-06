export default {
  "name": "pagination",
  "tag": "pura-pagination",
  "category": "Navigation",
  "title": "Pagination",
  "role": "",
  "summary": "Page navigation with Previous/Next buttons and ellipsis truncation.",
  "attributes": [
    {
      "name": "total",
      "type": "number",
      "default": "1",
      "desc": "Total number of pages. Invalid values or values lower than 1 fall back to 1."
    },
    {
      "name": "page",
      "type": "number",
      "default": "1",
      "desc": "Current page, 1-based. Clamped to the range between 1 and total."
    }
  ],
  "events": [
    "change"
  ],
  "slots": [],
  "i18nKeys": []
};
