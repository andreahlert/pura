export default {
  "name": "direction-hover",
  "tag": "pura-direction-hover",
  "category": "Animation",
  "animation": true,
  "title": "Direction Hover",
  "role": "",
  "summary": "Direction-aware hover overlay: the caption slides in from the same edge the cursor entered the card through and slides out through the exit edge. The classic premium image-grid detail.",
  "attributes": [
    {
      "name": "duration",
      "type": "number",
      "default": "350",
      "desc": "Slide time in ms."
    },
    {
      "name": "easing",
      "type": "string",
      "default": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      "desc": "CSS easing for the slide."
    }
  ],
  "events": [
    "enter",
    "leave"
  ],
  "slots": [
    "default",
    "overlay"
  ],
  "i18nKeys": []
};
