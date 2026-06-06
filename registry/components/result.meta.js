export default {
  "name": "result",
  "tag": "pura-result",
  "category": "Feedback",
  "title": "Result",
  "role": "status",
  "summary": "Status result page block displaying a large icon, title, subtitle, and actions slot for outcomes such as success, error, warning, or HTTP error codes.",
  "attributes": [
    { "name": "status", "type": "string", "default": "info", "desc": "Visual status variant: info | success | error | warning | 404 | 403 | 500." },
    { "name": "title", "type": "string", "default": "", "desc": "Heading text; HTTP code statuses fall back to an i18n default." },
    { "name": "subtitle", "type": "string", "default": "", "desc": "Secondary descriptive line (alias of description)." },
    { "name": "description", "type": "string", "default": "", "desc": "Secondary descriptive line (alias of subtitle)." }
  ],
  "events": [],
  "slots": ["default", "actions"],
  "i18nKeys": []
};
