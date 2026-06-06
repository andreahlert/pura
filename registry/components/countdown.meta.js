export default {
  "name": "countdown",
  "tag": "pura-countdown",
  "category": "Feedback",
  "title": "Countdown",
  "role": "",
  "summary": "Countdown timer that counts down in days, hours, minutes, and seconds and fires an event when it reaches zero.",
  "attributes": [
    {
      "name": "to",
      "type": "string",
      "default": "",
      "desc": "Target moment as an ISO datetime (e.g., \"2026-12-31T23:59:59Z\"). Takes priority over seconds."
    },
    {
      "name": "seconds",
      "type": "number",
      "default": "",
      "desc": "Duration in seconds from the moment of connection. An alternative to to; ignored when to is present."
    },
    {
      "name": "compact",
      "type": "boolean",
      "default": "false",
      "desc": "Displays on a single compact line (\"1d 02:03:04\") instead of separate segments."
    },
    {
      "name": "no-labels",
      "type": "boolean",
      "default": "false",
      "desc": "Hides the unit captions under each segment (segmented mode)."
    },
    {
      "name": "pad-days",
      "type": "boolean",
      "default": "false",
      "desc": "Pads the days value with a leading zero up to 2 digits."
    },
    {
      "name": "running",
      "type": "boolean",
      "default": "false",
      "desc": "Reflected and read-only: present while the timer is running."
    }
  ],
  "events": [
    "tick",
    "complete"
  ],
  "slots": [
    "complete"
  ],
  "i18nKeys": []
};
