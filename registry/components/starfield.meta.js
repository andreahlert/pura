export default {
  "name": "starfield",
  "tag": "pura-starfield",
  "category": "Animation",
  "animation": true,
  "title": "Starfield / Hyperspace",
  "role": "",
  "summary": "Classic hyperspace starfield: stars fly toward the screen on a Canvas 2D pseudo-3D projection, with depth and speed streaks configurable by attribute. SSR paints a dark backdrop with static stars; reduced motion holds a still sky.",
  "attributes": [
    {
      "name": "count",
      "type": "number",
      "default": "200",
      "desc": "Number of stars (capped at 400)."
    },
    {
      "name": "speed",
      "type": "number",
      "default": "1",
      "desc": "Warp speed multiplier, 0 to 10. 0 holds the field still; higher values fly faster and stretch the streaks."
    },
    {
      "name": "streak",
      "type": "number",
      "default": "1",
      "desc": "Streak length multiplier, 0 to 10. 0 draws round stars only (no trails)."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
