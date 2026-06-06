export default {
  "name": "drawer",
  "tag": "pura-drawer",
  "category": "Overlay",
  "title": "Drawer",
  "role": "",
  "summary": "Sliding drawer anchored to the bottom of the screen, built on the native dialog element.",
  "attributes": [
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "desc": "Controls visibility. Present opens the drawer (showModal); removed closes it. Observed and reactive."
    },
    {
      "name": "title",
      "type": "string",
      "default": "\"\"",
      "desc": "Title text in the header, used when the header slot is not filled. Read at render time."
    }
  ],
  "events": [
    "close"
  ],
  "slots": [
    "default",
    "header",
    "footer"
  ],
  "i18nKeys": []
};
