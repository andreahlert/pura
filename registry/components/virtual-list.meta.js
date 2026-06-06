export default {
  "name": "virtual-list",
  "tag": "pura-virtual-list",
  "category": "Display",
  "title": "Virtual List",
  "role": "",
  "summary": "Windowed rendering for large datasets that only renders the visible slice plus overscan, using a tall spacer and translateY offset for scroll fidelity.",
  "attributes": [
    { "name": "item-height", "type": "string", "default": "32", "desc": "Fixed row height in px (windowing assumes uniform rows)" },
    { "name": "height", "type": "string", "default": "18rem", "desc": "Viewport height" }
  ],
  "events": ["visiblechange"],
  "slots": [],
  "i18nKeys": []
};
