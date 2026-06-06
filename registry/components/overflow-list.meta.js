export default {
  "name": "overflow-list",
  "tag": "pura-overflow-list",
  "category": "Layout",
  "title": "Overflow List",
  "role": "",
  "summary": "Responsive horizontal container that shows as many slotted children as fit on one line and collapses the rest into a trailing overflow menu.",
  "attributes": [
    { "name": "min-visible", "type": "number", "default": "", "desc": "Always show at least N items even if they overflow." },
    { "name": "gap", "type": "string", "default": "0.5rem", "desc": "CSS length value for the horizontal gap between items." }
  ],
  "events": ["overflowchange"],
  "slots": ["default"],
  "i18nKeys": []
};
