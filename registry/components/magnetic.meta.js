export default {
  "name": "magnetic",
  "tag": "pura-magnetic",
  "category": "Animation",
  "animation": true,
  "title": "Magnetic",
  "role": "",
  "summary": "Draggable + Inertia. Slotted content leans toward the pointer as it nears and springs back on leave (the awwwards magnetic-button move), or follows the pointer 1:1 in drag mode and springs back with a flick bounce. Settles use the native spring primitive.",
  "attributes": [
    {
      "name": "mode",
      "type": "\"lean\" | \"drag\"",
      "default": "lean",
      "desc": "lean magnetizes toward a nearby pointer; drag follows the pointer and springs back to origin on release."
    },
    {
      "name": "strength",
      "type": "number",
      "default": "0.4",
      "desc": "Lean fraction (0..1) of the pointer offset the content follows."
    },
    {
      "name": "radius",
      "type": "number",
      "default": "120",
      "desc": "Pixels around the element within which the lean activates."
    },
    {
      "name": "preset",
      "type": "\"default\" | \"gentle\" | \"wobbly\" | \"stiff\" | \"slow\" | \"snappy\"",
      "default": "default",
      "desc": "Spring profile for the settle. Or set stiffness/damping/mass directly."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
