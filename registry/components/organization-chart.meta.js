export default {
  "name": "organization-chart",
  "tag": "pura-organization-chart",
  "category": "Display",
  "title": "Organization Chart",
  "role": "treeitem",
  "summary": "Hierarchical org chart rendered top-down with CSS-drawn connector lines, supporting JSON data or slotted pura-org-node elements.",
  "attributes": [
    { "name": "data", "type": "string", "default": "", "desc": "JSON string representing the nested org chart data ({label, children:[...]})." },
    { "name": "collapsible", "type": "boolean", "default": "", "desc": "Allows clicking a node to toggle its subtree visibility." }
  ],
  "events": ["nodeclick"],
  "slots": [],
  "i18nKeys": []
};
