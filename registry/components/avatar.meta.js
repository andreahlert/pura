export default {
  "name": "avatar",
  "tag": "pura-avatar",
  "category": "Display",
  "title": "Avatar",
  "role": "",
  "summary": "User photo with an initials fallback and a status indicator.",
  "attributes": [
    {
      "name": "src",
      "type": "string",
      "default": "",
      "desc": "URL of the avatar image; if absent or it fails to load, the initials are shown instead."
    },
    {
      "name": "alt",
      "type": "string",
      "default": "\"\"",
      "desc": "Alternative text for the image, also used as the aria-label."
    },
    {
      "name": "initials",
      "type": "string",
      "default": "\"?\"",
      "desc": "Initials shown as a fallback when there is no image."
    },
    {
      "name": "size",
      "type": "\"sm\" | \"md\" | \"lg\"",
      "default": "md",
      "desc": "Size of the avatar (md is the default when the attribute is omitted)."
    },
    {
      "name": "status",
      "type": "\"online\" | \"offline\" | \"busy\"",
      "default": "",
      "desc": "When present, shows a colored status dot in the bottom-right corner."
    }
  ],
  "events": [],
  "slots": [],
  "i18nKeys": []
};
