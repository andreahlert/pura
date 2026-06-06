export default {
  "name": "tree-select",
  "tag": "pura-tree-select",
  "category": "Form",
  "title": "Tree Select",
  "role": "",
  "summary": "A select whose dropdown is a hierarchical tree for picking one or many nodes, with expandable branches, optional search, and multi-select support.",
  "attributes": [
    { "name": "multiple", "type": "boolean", "default": "", "desc": "Enable multi-select with checkboxes and tags" },
    { "name": "placeholder", "type": "string", "default": "Select", "desc": "Placeholder text when nothing is selected" },
    { "name": "searchable", "type": "boolean", "default": "", "desc": "Show a search input that filters and auto-expands matching paths" },
    { "name": "disabled", "type": "boolean", "default": "", "desc": "Disables the trigger" },
    { "name": "data", "type": "string", "default": "", "desc": "JSON nested array of {value, label, children} nodes" }
  ],
  "events": ["change"],
  "slots": [],
  "i18nKeys": []
};
