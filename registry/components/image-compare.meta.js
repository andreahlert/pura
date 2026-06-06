export default {
  "name": "image-compare",
  "tag": "pura-image-compare",
  "category": "Layout",
  "title": "Image Compare",
  "role": "",
  "summary": "Before/after comparison slider that reveals two stacked images as the handle is dragged.",
  "attributes": [
    {
      "name": "value",
      "type": "number",
      "default": "50",
      "desc": "Handle position from 0 to 100. 0 shows only the 'before' image, 100 shows only the 'after'. Reflected back to the host attribute."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Before/after comparison",
      "desc": "Accessible label for the slider, applied as aria-label on the handle."
    }
  ],
  "events": [
    "input",
    "change"
  ],
  "slots": [
    "before",
    "after"
  ],
  "i18nKeys": []
};
