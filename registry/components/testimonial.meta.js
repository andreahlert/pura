export default {
  "name": "testimonial",
  "tag": "pura-testimonial",
  "category": "Display",
  "title": "Testimonial",
  "role": "",
  "summary": "Testimonial card with decorative quotation marks, a quote, an optional star rating, and an author line.",
  "attributes": [
    {
      "name": "author",
      "type": "string",
      "default": "",
      "desc": "Name of the testimonial's author. When there is no avatar, the name's initials are used instead."
    },
    {
      "name": "role",
      "type": "string",
      "default": "",
      "desc": "Role / company shown below the author's name."
    },
    {
      "name": "avatar",
      "type": "string",
      "default": "",
      "desc": "URL of the avatar image. Without it, it falls back to the author's initials."
    },
    {
      "name": "rating",
      "type": "number",
      "default": "(none)",
      "desc": "Star rating from 0 to max. Omitted => no stars are shown. Accepts fractional values (e.g. 4.5)."
    },
    {
      "name": "max",
      "type": "number",
      "default": "5",
      "desc": "Number of stars when rating is present."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
