export default {
  "name": "crosshair",
  "tag": "pura-crosshair",
  "category": "Animation",
  "animation": true,
  "title": "Crosshair",
  "role": "",
  "summary": "Full-bleed horizontal and vertical hairlines that cross at the cursor position inside the area, with an optional live coordinates readout. Technical, editorial portfolio look; visible only while hovering, nothing active on SSR.",
  "attributes": [
    {
      "name": "coords",
      "type": "boolean",
      "default": "false",
      "desc": "When present, shows a monospace x, y readout trailing the intersection."
    },
    {
      "name": "dashed",
      "type": "boolean",
      "default": "false",
      "desc": "When present, the hairlines are dashed instead of solid."
    },
    {
      "name": "hide-cursor",
      "type": "boolean",
      "default": "false",
      "desc": "When present, hides the native cursor over the area so only the crosshair shows."
    },
    {
      "name": "smoothing",
      "type": "number",
      "default": "0.18",
      "desc": "Lerp factor per frame, 0..1. Lower trails more; 1 sticks to the cursor."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
