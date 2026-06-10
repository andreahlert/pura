export default {
  "name": "smooth-scroll",
  "tag": "pura-smooth-scroll",
  "category": "Animation",
  "animation": true,
  "title": "Smooth Scroll (lerp)",
  "role": "",
  "summary": "Lenis-style smoothed page scroll: wheel, touch and scrollbar input become fluid movement with inertia via a rAF lerp on a fixed content layer, with the native scrollbar preserved by a spacer. Includes programmatic scrollTo with easing and offset, and optional horizontal orientation.",
  "attributes": [
    {
      "name": "lerp",
      "type": "number",
      "default": "0.1",
      "desc": "Interpolation factor per frame at 60fps, 0 to 1. Lower is floatier; 1 follows the scrollbar exactly."
    },
    {
      "name": "horizontal",
      "type": "boolean",
      "default": "false",
      "desc": "Map the vertical scrollbar and wheel to horizontal movement of the content."
    },
    {
      "name": "duration",
      "type": "number",
      "default": "1000",
      "desc": "Default duration in milliseconds for programmatic scrollTo()."
    },
    {
      "name": "offset",
      "type": "number",
      "default": "0",
      "desc": "Default pixel offset applied by scrollTo(); negative stops short of the target, e.g. for a fixed header."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Keep native scrolling, no smoothing. Toggle at runtime to stop and start the effect."
    }
  ],
  "events": ["pura-smooth-scroll"],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
