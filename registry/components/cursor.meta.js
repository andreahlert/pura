export default {
  "name": "cursor",
  "tag": "pura-cursor",
  "category": "Animation",
  "animation": true,
  "title": "Cursor",
  "role": "",
  "summary": "Custom cursor follower: a dot snaps to the pointer, a ring lerps behind it. The ring grows over links, buttons and [data-cursor] targets; a target with data-cursor-text fills the ring and shows that text. Touch and reduced motion render nothing and never bind.",
  "attributes": [
    {
      "name": "hide-native",
      "type": "boolean",
      "default": "false",
      "desc": "Suppress the native cursor while the component is connected."
    },
    {
      "name": "blend",
      "type": "boolean",
      "default": "false",
      "desc": "mix-blend-mode: difference over the page (white cursor inverts what it crosses)."
    },
    {
      "name": "ease",
      "type": "number",
      "default": "0.18",
      "desc": "Ring lerp factor per frame, 0..1. Lower = lazier trail."
    },
    {
      "name": "targets",
      "type": "string",
      "default": "",
      "desc": "Extra CSS selector treated as interactive, on top of a, button, [data-cursor]."
    }
  ],
  "events": [],
  "slots": [],
  "i18nKeys": []
};
