export default {
  "name": "pointer-parallax",
  "tag": "pura-pointer-parallax",
  "category": "Animation",
  "animation": true,
  "title": "Pointer Parallax",
  "role": "",
  "summary": "Atropos-style hover parallax: slotted layers with different data-depth values translate in distinct directions and intensities as the pointer moves, creating 3D depth without rotating the block (that move is pura-tilt's). Event-driven (no rAF loop); layers spring back to center on leave; disabled entirely under reduced motion.",
  "attributes": [
    {
      "name": "strength",
      "type": "number",
      "default": "16",
      "desc": "Max shift in px per unit of depth when the pointer reaches the surface edge."
    },
    {
      "name": "perspective",
      "type": "number",
      "default": "1000",
      "desc": "Perspective depth in px for the 3D scene. Smaller = more dramatic."
    },
    {
      "name": "axis",
      "type": "\"both\" | \"x\" | \"y\"",
      "default": "both",
      "desc": "Restrict the parallax to one axis."
    },
    {
      "name": "preset",
      "type": "\"gentle\" | \"wobbly\" | \"stiff\" | \"slow\" | \"snappy\"",
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
    "default"
  ],
  "i18nKeys": []
};
