export default {
  "name": "theme-designer",
  "tag": "pura-theme-designer",
  "category": "Utility",
  "title": "Theme Designer",
  "role": "dialog",
  "summary": "A slide-in panel to pick a brand preset or craft a custom theme, applying --pura-* token overrides live and persisting the choice.",
  "attributes": [
    { "name": "open", "type": "boolean", "default": "", "desc": "Reflects and controls panel visibility" },
    { "name": "launcher", "type": "boolean", "default": "", "desc": "Also render a fixed floating button that toggles the panel" },
    { "name": "position", "type": "string", "default": "right", "desc": "Panel side: right (default) or left" }
  ],
  "events": ["change"],
  "slots": [],
  "i18nKeys": []
};
