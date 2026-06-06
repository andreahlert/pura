export default {
  "name": "dock",
  "tag": "pura-dock",
  "category": "Navigation",
  "title": "Dock",
  "role": "",
  "summary": "macOS-style icon bar that magnifies items as the pointer gets closer.",
  "attributes": [
    {
      "name": "fixed",
      "type": "boolean",
      "default": "false",
      "desc": "Pins the dock to the bottom-center of the viewport (position: fixed, bottom-center, z-index 50)."
    },
    {
      "name": "magnify",
      "type": "number",
      "default": "1.6",
      "desc": "Maximum scale of the item under the pointer. Values >= 1; invalid values fall back to 1.6."
    },
    {
      "name": "reach",
      "type": "number",
      "default": "110",
      "desc": "Proximity radius in px over which the magnification decays. Larger = more neighbors scale up."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Dock",
      "desc": "Accessible name of the dock (aria-label of the inner role=toolbar track)."
    }
  ],
  "events": [
    "dock-item-activate"
  ],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
