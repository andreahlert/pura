export default {
  "name": "folder",
  "tag": "pura-folder",
  "category": "Animation",
  "animation": true,
  "title": "Folder",
  "role": "",
  "summary": "Stylized paper folder that opens on hover or click, revealing up to three papers that rise and fan out above the cover. Drawn entirely in CSS, opening is pure CSS transitions.",
  "attributes": [
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "desc": "Forces the open state, independent of hover."
    },
    {
      "name": "trigger",
      "type": "\"hover\" | \"click\"",
      "default": "hover",
      "desc": "hover opens on :hover via pure CSS; click makes the folder a keyboard-operable toggle button."
    },
    {
      "name": "papers",
      "type": "number",
      "default": "3",
      "desc": "Number of paper sheets in the folder, 1..3."
    },
    {
      "name": "color",
      "type": "string",
      "default": "var(--pura-accent)",
      "desc": "Folder color, any CSS color. The --pura-folder-color token still wins if set."
    }
  ],
  "events": [
    "open",
    "close"
  ],
  "slots": [
    "paper-1",
    "paper-2",
    "paper-3"
  ],
  "i18nKeys": []
};
