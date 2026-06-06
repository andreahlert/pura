export default {
  "name": "masonry",
  "tag": "pura-masonry",
  "category": "Layout",
  "title": "Masonry",
  "role": "",
  "summary": "Pinterest-style layout that distributes items into columns using native CSS multi-column.",
  "attributes": [
    {
      "name": "columns",
      "type": "number",
      "default": "(auto)",
      "desc": "Fixed column count (integer >= 1). When set, it uses exactly that number of columns at any width and reflects the value in data-columns."
    },
    {
      "name": "min",
      "type": "string",
      "default": "16rem",
      "desc": "Minimum width of each column (CSS length). Used in responsive mode (when columns is omitted): the browser fits as many columns as will fit at that width."
    },
    {
      "name": "gap",
      "type": "string",
      "default": "var(--pura-space-4)",
      "desc": "Spacing between columns and between rows (CSS length)."
    },
    {
      "name": "label",
      "type": "string",
      "default": "(none)",
      "desc": "Accessible name for the list of items; applied as aria-label on the host (role=list)."
    }
  ],
  "events": [
    "pura-masonry-change"
  ],
  "slots": [
    "(default)"
  ],
  "i18nKeys": []
};
