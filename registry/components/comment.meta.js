export default {
  "name": "comment",
  "tag": "pura-comment",
  "category": "Display",
  "title": "Comment",
  "role": "",
  "summary": "A comment in a threaded discussion, with avatar, author, timestamp and nested replies.",
  "attributes": [
    {
      "name": "author",
      "type": "string",
      "default": "\"\"",
      "desc": "Display name of the commenter, shown in bold in the header. Generates the initials used in the avatar fallback; when absent, shows \"Anonymous\"."
    },
    {
      "name": "time",
      "type": "string",
      "default": "\"\"",
      "desc": "Timestamp/date text shown next to the author, rendered in a <time> (also used as datetime). Hidden when empty."
    },
    {
      "name": "avatar",
      "type": "string",
      "default": "(none)",
      "desc": "Optional URL of the avatar image. When absent, or if the image fails to load, it falls back to the author's initials."
    }
  ],
  "events": [],
  "slots": [
    "(default)",
    "actions"
  ],
  "i18nKeys": []
};
