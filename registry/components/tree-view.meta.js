export default {
  "name": "tree-view",
  "tag": "pura-tree-view",
  "category": "Display",
  "title": "Tree View",
  "role": "",
  "summary": "Keyboard-navigable hierarchical tree with selection and expandable nodes.",
  "attributes": [
    {
      "name": "label",
      "type": "string",
      "default": "Tree",
      "desc": "On <pura-tree-view>/<pura-tree>: accessible name of the tree (aria-label). On <pura-tree-item>: text label used as a fallback for value and in the snapshot."
    },
    {
      "name": "expanded",
      "type": "boolean",
      "default": "false",
      "desc": "On <pura-tree-item>: reveals the group of nested children (rotates the chevron)."
    },
    {
      "name": "selectable",
      "type": "boolean",
      "default": "false",
      "desc": "On <pura-tree-item>: makes the row selectable (toggles aria-selected on activation)."
    },
    {
      "name": "selected",
      "type": "boolean",
      "default": "false",
      "desc": "On <pura-tree-item>: marks the node as selected."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "On <pura-tree-item>: disables the node (ignored in navigation and clicks)."
    },
    {
      "name": "value",
      "type": "string",
      "default": "label/textContent",
      "desc": "On <pura-tree-item>: machine-readable id exposed in events and in the agent-native snapshot; if absent, falls back to the label or the node's text."
    }
  ],
  "events": [
    "select",
    "expand",
    "collapse",
    "activate"
  ],
  "slots": [
    "label",
    "default"
  ],
  "i18nKeys": []
};
