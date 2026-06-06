export default {
  "name": "transfer",
  "tag": "pura-transfer",
  "category": "Form",
  "title": "Transfer",
  "role": "",
  "summary": "Dual-list transfer (shuttle) with two panels, checkboxes, and middle controls to move selected items between source and target.",
  "attributes": [
    { "name": "items", "type": "string", "default": "", "desc": "JSON array of {key, label} or strings defining available items" },
    { "name": "value", "type": "string", "default": "", "desc": "JSON array of keys currently in the target panel" },
    { "name": "searchable", "type": "boolean", "default": "", "desc": "Show search inputs in each panel" }
  ],
  "events": ["change"],
  "slots": [],
  "i18nKeys": []
};
