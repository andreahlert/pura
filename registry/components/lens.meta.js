export default {
  "name": "lens",
  "tag": "pura-lens",
  "category": "Animation",
  "animation": true,
  "title": "Lens",
  "role": "",
  "summary": "Magnifying lens under the cursor: a scaled copy of the slotted media clipped to a circle that follows the pointer, like a loupe over a product photo. The classic e-commerce zoom; SSR renders the plain media only.",
  "attributes": [
    {
      "name": "zoom",
      "type": "number",
      "default": "2",
      "desc": "Magnification factor, greater than 1."
    },
    {
      "name": "size",
      "type": "number",
      "default": "160",
      "desc": "Lens diameter in px."
    }
  ],
  "events": [
    "pura-lens-show",
    "pura-lens-hide"
  ],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
