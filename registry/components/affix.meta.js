export default {
  "name": "affix",
  "tag": "pura-affix",
  "category": "Layout",
  "title": "Affix",
  "role": "",
  "summary": "Pins slotted content to the viewport once its scroll position passes a threshold (sticky-on-scroll).",
  "attributes": [
    { "name": "offset-top", "type": "number", "default": "", "desc": "px gap from the top of the viewport when affixed" },
    { "name": "offset-bottom", "type": "number", "default": "", "desc": "px gap from the bottom of the viewport when affixed" }
  ],
  "events": ["change"],
  "slots": ["default"],
  "i18nKeys": []
};
