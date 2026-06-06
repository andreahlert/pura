export default {
  "name": "back-to-top",
  "tag": "pura-back-to-top",
  "category": "Navigation",
  "title": "Back to Top",
  "role": "",
  "summary": "Floating button that appears as you scroll the page and smoothly scrolls back to the top.",
  "attributes": [
    {
      "name": "offset",
      "type": "number",
      "default": "400",
      "desc": "Scroll distance in px before the button appears."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Back to top",
      "desc": "Accessible label (aria-label) of the icon button."
    },
    {
      "name": "target",
      "type": "string",
      "default": "(page)",
      "desc": "CSS selector of the scroll container to observe and scroll. If absent: uses the page scroll (window)."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Makes the button non-interactive and keeps it hidden."
    }
  ],
  "events": [
    "scroll-top"
  ],
  "slots": [
    "(default)"
  ],
  "i18nKeys": []
};
