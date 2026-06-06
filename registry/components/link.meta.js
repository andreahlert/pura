export default {
  "name": "link",
  "tag": "pura-link",
  "category": "Primitives",
  "title": "Link",
  "role": "",
  "summary": "A themeable anchor primitive that wraps a native link with color, variant, and external-link styling.",
  "attributes": [
    {
      "name": "href",
      "type": "string",
      "default": "",
      "desc": "Destination URL, forwarded to the inner <a> element."
    },
    {
      "name": "target",
      "type": "string",
      "default": "",
      "desc": "Link target such as _blank, forwarded to the inner <a>. When external is set and no target is given, _blank is used as a fallback."
    },
    {
      "name": "variant",
      "type": "\"underline-on-hover\" | \"underline\" | \"subtle\" | \"button\"",
      "default": "underline-on-hover",
      "desc": "Visual treatment of the link. underline-on-hover shows the underline only on hover, underline keeps it visible until hover, subtle removes the underline, and button renders a bordered button-like control."
    },
    {
      "name": "color",
      "type": "\"fg\" | \"muted\" | \"primary\" | \"accent\"",
      "default": "primary",
      "desc": "Foreground color drawn from the theme tokens."
    },
    {
      "name": "external",
      "type": "boolean",
      "default": "false",
      "desc": "Marks the link as external. Adds rel=\"noopener noreferrer\", falls back to target=_blank, and appends a trailing arrow glyph."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
