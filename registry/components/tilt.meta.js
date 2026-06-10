export default {
  "name": "tilt",
  "tag": "pura-tilt",
  "category": "Animation",
  "animation": true,
  "title": "Tilt",
  "role": "",
  "summary": "3D tilt on hover: the slotted content rotates toward the pointer in perspective, then springs back flat on leave. Optional glare highlight follows the pointer. Event-driven (no rAF loop); disabled entirely under reduced motion.",
  "attributes": [
    {
      "name": "max",
      "type": "number",
      "default": "12",
      "desc": "Maximum tilt angle in degrees at the edges of the surface."
    },
    {
      "name": "perspective",
      "type": "number",
      "default": "900",
      "desc": "Perspective depth in px. Smaller = more dramatic."
    },
    {
      "name": "scale",
      "type": "number",
      "default": "1",
      "desc": "Scale applied while hovered (try 1.04)."
    },
    {
      "name": "glare",
      "type": "boolean",
      "default": "false",
      "desc": "Render a radial highlight that follows the pointer across the surface."
    },
    {
      "name": "reverse",
      "type": "boolean",
      "default": "false",
      "desc": "Tilt away from the pointer instead of toward it."
    },
    {
      "name": "preset",
      "type": "\"gentle\" | \"wobbly\" | \"stiff\" | \"slow\" | \"molasses\"",
      "default": "",
      "desc": "Spring preset for the settle-back easing. Or tune stiffness / damping / mass directly."
    },
    {
      "name": "stiffness",
      "type": "number",
      "default": "170",
      "desc": "Spring stiffness for the settle."
    },
    {
      "name": "damping",
      "type": "number",
      "default": "26",
      "desc": "Spring damping for the settle."
    },
    {
      "name": "mass",
      "type": "number",
      "default": "1",
      "desc": "Spring mass for the settle."
    }
  ],
  "events": [],
  "slots": [
    {
      "name": "default",
      "desc": "The content that tilts (usually a card)."
    }
  ],
  "i18nKeys": []
};
