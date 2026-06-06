export default {
  "name": "optimistic",
  "tag": "pura-optimistic",
  "category": "Agent",
  "title": "Optimistic",
  "role": "",
  "summary": "Wraps an action with optimistic UI and built-in rollback, exposing a global registry that agents can enumerate and trigger.",
  "attributes": [
    {
      "name": "label",
      "type": "string",
      "default": "Confirmar",
      "desc": "Text of the built-in trigger button, used when no trigger is provided via slot."
    },
    {
      "name": "state",
      "type": "string",
      "default": "idle",
      "desc": "Lifecycle state: idle | pending | committed | failed. The author can set the initial state, but the component then controls it."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "When present, blocks activation."
    },
    {
      "name": "rollback-message",
      "type": "string",
      "default": "Ação revertida.",
      "desc": "Text announced in the aria-live region on rollback, when no explicit reason is passed to rollback()."
    },
    {
      "name": "auto",
      "type": "boolean",
      "default": "false",
      "desc": "Demo/no-backend mode: on activation, it auto-confirms on the next frame without needing the caller."
    }
  ],
  "events": [
    "commit",
    "confirm",
    "rollback"
  ],
  "slots": [
    "trigger",
    "default",
    "optimistic"
  ],
  "i18nKeys": []
};
