export default {
  "name": "banner",
  "tag": "pura-banner",
  "category": "Feedback",
  "title": "Banner",
  "role": "",
  "summary": "Full-width notice strip for persistent site or section announcements, with an icon, variants, and optional dismissal.",
  "attributes": [
    {
      "name": "variant",
      "type": "\"info\" | \"success\" | \"warning\" | \"danger\" | \"promo\"",
      "default": "info",
      "desc": "Sets the banner's background color, border, and icon. An invalid value falls back to info."
    },
    {
      "name": "title",
      "type": "string",
      "default": "",
      "desc": "Text for the bold title line; serves as a fallback for the title slot."
    },
    {
      "name": "message",
      "type": "string",
      "default": "",
      "desc": "Body text of the message; serves as a fallback for the default slot."
    },
    {
      "name": "dismissible",
      "type": "boolean",
      "default": "false",
      "desc": "Renders the close button that fires the dismiss event and hides the banner."
    },
    {
      "name": "sticky",
      "type": "boolean",
      "default": "false",
      "desc": "Positions the banner as sticky at the top of the scroll container (z-index 50)."
    },
    {
      "name": "label",
      "type": "string",
      "default": "\"<Variant> announcement\"",
      "desc": "Accessible label (aria-label) for the region; default derived from the variant."
    }
  ],
  "events": [
    "dismiss"
  ],
  "slots": [
    "title",
    "message (default)",
    "action"
  ],
  "i18nKeys": []
};
