export default {
  "name": "marquee",
  "tag": "pura-marquee",
  "category": "Display",
  "title": "Marquee",
  "role": "",
  "summary": "Seamless, infinitely scrolling content strip with a pure-CSS animation.",
  "attributes": [
    {
      "name": "speed",
      "type": "number",
      "default": "20",
      "desc": "Seconds for one full loop. Lower = faster."
    },
    {
      "name": "direction",
      "type": "\"left\" | \"right\"",
      "default": "left",
      "desc": "Direction the content scrolls."
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
