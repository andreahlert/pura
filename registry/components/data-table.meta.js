export default {
  "name": "data-table",
  "tag": "pura-data-table",
  "category": "Display",
  "title": "Data Table",
  "role": "table",
  "summary": "An interactive layer over a slotted light-DOM <table> that adds column sorting, text search/filter, and client-side pagination.",
  "attributes": [
    { "name": "searchable", "type": "boolean", "default": "", "desc": "Show the search box and filter rows by visible text" },
    { "name": "page-size", "type": "number", "default": "", "desc": "Rows per page; unset or 0 disables pagination" },
    { "name": "striped", "type": "boolean", "default": "", "desc": "Apply zebra-stripe styling to visible body rows" }
  ],
  "events": ["sort", "filter"],
  "slots": ["default"],
  "i18nKeys": []
};
