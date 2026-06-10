export default {
  "name": "image-trail",
  "tag": "pura-image-trail",
  "category": "Animation",
  "animation": true,
  "title": "Image Trail",
  "role": "",
  "summary": "The awwwards image-trail hero: move the pointer across the zone and copies of the slotted images spawn under the cursor, pop in, drift and fade out. One WAAPI animation per copy, nothing per frame.",
  "attributes": [
    {
      "name": "step",
      "type": "number",
      "default": "110",
      "desc": "Pointer distance in px between spawns."
    },
    {
      "name": "life",
      "type": "number",
      "default": "900",
      "desc": "Milliseconds each copy lives."
    },
    {
      "name": "max",
      "type": "number",
      "default": "10",
      "desc": "Concurrent copies cap; the oldest is removed first."
    }
  ],
  "events": [],
  "slots": [
    "default",
    "content"
  ],
  "i18nKeys": []
};
