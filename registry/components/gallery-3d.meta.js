export default {
  "name": "gallery-3d",
  "tag": "pura-gallery-3d",
  "category": "Animation",
  "animation": true,
  "title": "Gallery 3D",
  "role": "",
  "summary": "Draggable 3D ring gallery: slotted images arranged around a cylinder in perspective. Grab and throw to spin; the release glides with the throw's velocity via one CSS transition. No rAF loop.",
  "attributes": [
    {
      "name": "radius",
      "type": "number",
      "default": "auto",
      "desc": "Cylinder radius in px. Default computes from item width and count so faces just clear each other."
    },
    {
      "name": "sensitivity",
      "type": "number",
      "default": "0.3",
      "desc": "Degrees of rotation per dragged pixel."
    },
    {
      "name": "auto",
      "type": "boolean",
      "default": "false",
      "desc": "Slow infinite spin until the first grab."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
