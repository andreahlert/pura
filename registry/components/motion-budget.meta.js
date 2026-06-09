export default {
  "name": "motion-budget",
  "tag": "pura-motion-budget",
  "category": "Utility",
  "animation": true,
  "title": "Motion Budget",
  "role": "",
  "summary": "An invisible page-level governor that drives the global --pura-motion token to calm or stop all token-driven motion library-wide, with system reduced-motion awareness. No render, no shadow paint.",
  "attributes": [
    {
      "name": "mode",
      "type": "\"normal\" | \"calm\" | \"off\"",
      "default": "normal",
      "desc": "Motion budget: full motion, half-speed calm, or a hard stop."
    },
    {
      "name": "scale",
      "type": "number",
      "default": "(per mode)",
      "desc": "Explicit 0..1 override for --pura-motion. Wins over the mode default, except off which always pins 0."
    },
    {
      "name": "respect-system",
      "type": "boolean",
      "default": "false",
      "desc": "When present, a system prefers-reduced-motion: reduce forces off regardless of mode."
    }
  ],
  "events": [
    {
      "name": "motionchange",
      "detail": "{ mode, motion }",
      "desc": "Fired whenever the resolved budget changes."
    }
  ],
  "slots": [],
  "i18nKeys": []
};
