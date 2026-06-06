export default {
  "name": "swipe",
  "tag": "pura-swipe",
  "category": "Utility",
  "title": "Swipe",
  "role": "",
  "summary": "Swipeable container that detects pointer and touch drag gestures past a threshold and dispatches a swipe event with direction and distance.",
  "attributes": [
    { "name": "direction", "type": "string", "default": "horizontal", "desc": "Drag axis: horizontal or vertical" },
    { "name": "threshold", "type": "string", "default": "64", "desc": "Trigger/snap distance in px" }
  ],
  "events": ["swipe"],
  "slots": ["default", "left-action", "right-action"],
  "i18nKeys": []
};
