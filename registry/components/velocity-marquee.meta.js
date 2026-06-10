export default {
  "name": "velocity-marquee",
  "tag": "pura-velocity-marquee",
  "category": "Animation",
  "animation": true,
  "title": "Scroll Velocity Marquee",
  "role": "",
  "summary": "Seamless marquee whose speed and direction respond to scroll velocity: scroll down and it races ahead, scroll up and it runs backwards, stop and it eases back to its resting pace. Pure CSS loop; JS only modulates playbackRate.",
  "attributes": [
    {
      "name": "speed",
      "type": "number",
      "default": "20",
      "desc": "Seconds for one full loop at rest. Lower = faster."
    },
    {
      "name": "direction",
      "type": "\"left\" | \"right\"",
      "default": "left",
      "desc": "Resting scroll direction of the content."
    },
    {
      "name": "factor",
      "type": "number",
      "default": "6",
      "desc": "Sensitivity: playbackRate gained per (px/ms) of scroll speed."
    },
    {
      "name": "max",
      "type": "number",
      "default": "5",
      "desc": "Cap on the playbackRate magnitude in either direction."
    },
    {
      "name": "decay",
      "type": "number",
      "default": "0.08",
      "desc": "Settle lerp factor per frame, 0..1. Lower = drifts back to resting pace more slowly."
    },
    {
      "name": "paused",
      "type": "boolean",
      "default": "false",
      "desc": "Reflected state; present when the loop is stopped."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Scrolling content",
      "desc": "aria-label text applied to the role=marquee container."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
