export default {
  "name": "kanban",
  "tag": "pura-kanban",
  "category": "Layout",
  "title": "Kanban",
  "role": "",
  "summary": "A drag-and-drop board with columns and cards.",
  "attributes": [
    {
      "name": "label",
      "type": "string",
      "default": "",
      "desc": "Column heading (on pura-kanban-column)."
    }
  ],
  "events": [
    "change"
  ],
  "slots": [
    "default — columns / cards",
    "footer (column) — add-card area"
  ],
  "i18nKeys": []
};
