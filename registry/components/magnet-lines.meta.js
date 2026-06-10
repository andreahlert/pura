export default {
  "name": "magnet-lines",
  "tag": "pura-magnet-lines",
  "category": "Animation",
  "animation": true,
  "title": "Magnet Lines",
  "role": "",
  "summary": "A grid of short ticks that rotate to point at the cursor like compass needles. The template paints the resting field for SSR; client JS aims each line with atan2 on pointermove, one CSS var per cell, rAF-throttled.",
  "attributes": [
    {
      "name": "rows",
      "type": "number",
      "default": "9",
      "desc": "Grid rows, capped at 30."
    },
    {
      "name": "columns",
      "type": "number",
      "default": "9",
      "desc": "Grid columns, capped at 30."
    },
    {
      "name": "base-angle",
      "type": "number",
      "default": "-10",
      "desc": "Resting rotation in degrees before any pointer input; also the reduced-motion and SSR state."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
