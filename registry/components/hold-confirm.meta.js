export default {
  "name": "hold-confirm",
  "tag": "pura-hold-confirm",
  "category": "Animation",
  "animation": true,
  "title": "Hold Confirm",
  "role": "",
  "summary": "Press-and-hold to confirm: a ring fills around the button while held, snaps back on early release, and morphs into a check when the hold completes. The fill is a CSS transition; the only JS is a setTimeout.",
  "attributes": [
    {
      "name": "duration",
      "type": "number",
      "default": "1200",
      "desc": "Hold time in milliseconds before the confirm fires."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables the button."
    }
  ],
  "events": ["confirm", "cancel"],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
