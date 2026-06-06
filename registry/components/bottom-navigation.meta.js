export default {
  "name": "bottom-navigation",
  "tag": "pura-bottom-navigation",
  "category": "Navigation",
  "title": "Bottom Navigation",
  "role": "navigation",
  "summary": "A fixed bottom bar of icon plus label destinations in mobile style, with support for slotted item elements or a JSON items property.",
  "attributes": [
    { "name": "value", "type": "string", "default": "", "desc": "The active destination value" },
    { "name": "labels", "type": "boolean", "default": "true", "desc": "When set to \"false\", shows icons only" },
    { "name": "static", "type": "boolean", "default": "", "desc": "Lays the bar inline instead of fixed to the viewport bottom" }
  ],
  "events": ["change"],
  "slots": ["default"],
  "i18nKeys": []
};
