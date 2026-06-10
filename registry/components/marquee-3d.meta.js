export default {
  "name": "marquee-3d",
  "tag": "pura-marquee-3d",
  "category": "Animation",
  "animation": true,
  "title": "Marquee 3D",
  "role": "",
  "summary": "Multiple vertical marquee columns on a perspective-tilted 3D plane (rotateX/rotateZ), for testimonial heroes and logo walls. Pure CSS keyframes; adjacent columns scroll in alternating directions with deterministic stagger.",
  "attributes": [
    {
      "name": "columns",
      "type": "number",
      "default": "3",
      "desc": "Number of vertical columns, 1..8. Slotted items distribute round-robin."
    },
    {
      "name": "speed",
      "type": "number",
      "default": "25",
      "desc": "Seconds for one full column loop. Lower = faster; per-column durations stagger deterministically by index."
    },
    {
      "name": "rotate-x",
      "type": "number",
      "default": "55",
      "desc": "Plane tilt around the X axis, in degrees."
    },
    {
      "name": "rotate-z",
      "type": "number",
      "default": "-45",
      "desc": "Plane rotation around the Z axis, in degrees."
    },
    {
      "name": "pause-on-hover",
      "type": "boolean",
      "default": "false",
      "desc": "When present, pauses while under the mouse or with internal focus."
    },
    {
      "name": "paused",
      "type": "boolean",
      "default": "false",
      "desc": "Reflected state; present when the animation is stopped."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Scrolling gallery",
      "desc": "aria-label text applied to the role=marquee container."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
