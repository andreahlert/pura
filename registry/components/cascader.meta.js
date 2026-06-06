export default {
  "name": "cascader",
  "tag": "pura-cascader",
  "category": "Form",
  "title": "Cascader",
  "role": "",
  "summary": "A multi-level cascading select that lets the user drill through nested option columns to pick a leaf path.",
  "attributes": [
    { "name": "placeholder", "type": "string", "default": "", "desc": "Trigger placeholder text" },
    { "name": "disabled", "type": "boolean", "default": "", "desc": "Disables the trigger" },
    { "name": "change-on-select", "type": "boolean", "default": "", "desc": "Also fire change on non-leaf selection" },
    { "name": "expand-trigger", "type": "string", "default": "click", "desc": "How to expand child columns: \"click\" or \"hover\"" },
    { "name": "data", "type": "string", "default": "", "desc": "JSON nested array of {value,label,children} items" }
  ],
  "events": ["change"],
  "slots": ["default"],
  "i18nKeys": []
};
