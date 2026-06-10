export default {
  "name": "cipher-hover",
  "tag": "pura-cipher-hover",
  "category": "Animation",
  "animation": true,
  "title": "Cipher Hover",
  "role": "",
  "summary": "Evervault-style encrypted card: a surface of pseudo-random characters revealed only under a radial spotlight that follows the cursor, rewriting every throttled frame. Unlike pura-scramble, the cipher never decodes; it is pure texture.",
  "attributes": [
    {
      "name": "chars",
      "type": "string",
      "default": "letters, digits and symbols",
      "desc": "Charset the cipher field is drawn from."
    },
    {
      "name": "length",
      "type": "number",
      "default": "1500",
      "desc": "Number of characters in the field, capped at 6000."
    },
    {
      "name": "size",
      "type": "string",
      "default": "200px",
      "desc": "Spotlight diameter, px number or any CSS length."
    },
    {
      "name": "fps",
      "type": "number",
      "default": "18",
      "desc": "Scramble rewrites per second, clamped 1..60."
    },
    {
      "name": "seed",
      "type": "number",
      "default": "1",
      "desc": "Integer seeding the deterministic SSR character field."
    },
    {
      "name": "static",
      "type": "boolean",
      "default": "false",
      "desc": "When present, the spotlight reveals the seeded field but the per-frame rewrite never runs."
    }
  ],
  "events": [
    "pura-cipher-hover-show",
    "pura-cipher-hover-hide"
  ],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
