export default {
  "name": "cron",
  "tag": "pura-cron",
  "category": "Form",
  "title": "Cron",
  "role": "",
  "summary": "A cron expression builder and visualizer for standard 5-field expressions, with a preset selector and live human-readable description.",
  "attributes": [
    { "name": "value", "type": "string", "default": "", "desc": "5-field cron expression string" },
    { "name": "mode", "type": "string", "default": "builder", "desc": "\"builder\" shows interactive fields; \"describe\" shows read-only description" }
  ],
  "events": ["change"],
  "slots": [],
  "i18nKeys": []
};
