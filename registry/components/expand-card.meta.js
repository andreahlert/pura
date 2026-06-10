export default {
  "name": "expand-card",
  "tag": "pura-expand-card",
  "category": "Animation",
  "animation": true,
  "title": "Expand Card",
  "role": "",
  "summary": "The iOS App Store card: a normal card in the layout that morphs into a near-fullscreen overlay revealing detail content. FLIP morph on the card rect, CSS fades for backdrop and detail, layout never jumps.",
  "attributes": [
    {
      "name": "margin",
      "type": "number",
      "default": "24",
      "desc": "Pixel inset of the expanded card from the viewport edges."
    },
    {
      "name": "duration",
      "type": "number",
      "default": "450",
      "desc": "Morph time in milliseconds."
    }
  ],
  "events": ["open", "close"],
  "slots": [
    "card",
    "default"
  ],
  "i18nKeys": []
};
