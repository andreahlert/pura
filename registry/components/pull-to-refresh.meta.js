export default {
  "name": "pull-to-refresh",
  "tag": "pura-pull-to-refresh",
  "category": "Feedback",
  "title": "Pull To Refresh",
  "role": "",
  "summary": "Mobile-style pull-down gesture at scroll-top that reveals an indicator (arrow then spinner) and dispatches a refresh event when released past the threshold.",
  "attributes": [
    { "name": "height", "type": "string", "default": "", "desc": "Height of the scroll container in pixels (number) or any CSS length." },
    { "name": "refreshing", "type": "boolean", "default": "", "desc": "App-controlled busy state that keeps the spinner visible until removed." }
  ],
  "events": ["refresh"],
  "slots": ["default"],
  "i18nKeys": []
};
