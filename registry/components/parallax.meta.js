export default {
  "name": "parallax",
  "tag": "pura-parallax",
  "category": "Marketing",
  "animation": true,
  "title": "Parallax",
  "role": "",
  "summary": "Scroll parallax container that moves slotted content at a configurable speed factor relative to the page scroll to create a sense of depth.",
  "attributes": [
    { "name": "speed", "type": "number", "default": "0.5", "desc": "Parallax factor for the default content layer (0.5 = half scroll speed, negative reverses direction)." },
    { "name": "axis", "type": "string", "default": "y", "desc": "Scroll axis for the parallax effect: \"y\" (default) or \"x\"." },
    { "name": "image", "type": "string", "default": "", "desc": "Optional background image URL for a built-in parallaxed background layer." }
  ],
  "events": [],
  "slots": ["default"],
  "i18nKeys": []
};
