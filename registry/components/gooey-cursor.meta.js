export default {
  "name": "gooey-cursor",
  "tag": "pura-gooey-cursor",
  "category": "Animation",
  "animation": true,
  "title": "Gooey Cursor",
  "role": "",
  "summary": "Meta-ball cursor follower: liquid blobs chase the pointer in a staggered lerp chain and fuse organically through an inline SVG goo filter. The organic sibling of pura-cursor's dot + ring. Touch and reduced motion render nothing and never bind.",
  "attributes": [
    {
      "name": "count",
      "type": "number",
      "default": "4",
      "desc": "Number of blobs in the chain, 2..8."
    },
    {
      "name": "ease",
      "type": "number",
      "default": "0.22",
      "desc": "Lerp factor per frame for each chain link, 0..1. Lower = lazier, stretchier trail."
    },
    {
      "name": "strength",
      "type": "number",
      "default": "12",
      "desc": "Goo blur stdDeviation in px. Higher = gooier, softer merging."
    },
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
      "desc": "mix-blend-mode: difference over the page (white blobs invert what they cross)."
    }
  ],
  "events": [],
  "slots": [],
  "i18nKeys": []
};
