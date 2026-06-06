export default {
  "name": "flow",
  "tag": "pura-flow",
  "category": "Display",
  "title": "Flow",
  "role": "",
  "summary": "A lightweight node-graph / flowchart canvas that composes with light-DOM pura-flow-node children positioned by x/y attributes, and edges declared via the host edges attribute or slotted pura-flow-edge children.",
  "attributes": [
    { "name": "width", "type": "string", "default": "", "desc": "Canvas width (px number or CSS length)" },
    { "name": "height", "type": "string", "default": "400px", "desc": "Canvas height (px number or CSS length)" },
    { "name": "edges", "type": "string", "default": "", "desc": "JSON array of edge objects [{from, to}]" },
    { "name": "readonly", "type": "boolean", "default": "", "desc": "Disables node dragging when present" }
  ],
  "events": ["nodemove"],
  "slots": ["default"],
  "i18nKeys": []
};
