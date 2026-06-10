export default {
  "name": "blobs",
  "tag": "pura-blobs",
  "category": "Animation",
  "animation": true,
  "title": "Gooey Blobs",
  "role": "",
  "summary": "Organic blobs that drift slowly and fuse together when they approach (metaball / lava-lamp effect) behind the slotted content. Pure CSS keyframes through an SVG goo filter, deterministic scatter, zero per-frame JS.",
  "attributes": [
    {
      "name": "count",
      "type": "number",
      "default": "5",
      "desc": "Number of blobs, capped at 12."
    },
    {
      "name": "speed",
      "type": "number",
      "default": "18",
      "desc": "Base drift cycle in seconds; each blob varies deterministically around it."
    },
    {
      "name": "goo",
      "type": "number",
      "default": "14",
      "desc": "Goo filter blur strength in px (how readily blobs fuse), capped at 40."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
