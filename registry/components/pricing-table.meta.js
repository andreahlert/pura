export default {
  "name": "pricing-table",
  "tag": "pura-pricing-table",
  "category": "Marketing",
  "title": "Pricing Table",
  "role": "",
  "summary": "Responsive grid of pricing plans, with a featured plan and an AI-agent-readable snapshot.",
  "attributes": [
    {
      "name": "label",
      "type": "string",
      "default": "",
      "desc": "Accessible name for the group of plans (becomes the table's aria-label and the snapshot's label field). Applies to <pura-pricing-table>."
    },
    {
      "name": "min",
      "type": "string",
      "default": "15rem",
      "desc": "Minimum width of each column (any CSS length, e.g. \"16rem\"); controls the grid's auto-fit. Applies to <pura-pricing-table>."
    },
    {
      "name": "name",
      "type": "string",
      "default": "",
      "desc": "Plan name (e.g. \"Pro\"). Applies to <pura-pricing-tier>."
    },
    {
      "name": "price",
      "type": "string",
      "default": "",
      "desc": "Price text (e.g. \"$29\" or \"Free\"). Applies to <pura-pricing-tier>."
    },
    {
      "name": "period",
      "type": "string",
      "default": "",
      "desc": "Billing period suffix (e.g. \"/mo\"). Applies to <pura-pricing-tier>."
    },
    {
      "name": "featured",
      "type": "boolean",
      "default": "false",
      "desc": "Highlights this plan with an accent ring and a badge; also sets data-featured. Applies to <pura-pricing-tier>."
    },
    {
      "name": "badge",
      "type": "string",
      "default": "Popular",
      "desc": "Custom text for the highlight badge (only appears with featured). Applies to <pura-pricing-tier>."
    }
  ],
  "events": [],
  "slots": [
    "default (no tier: lista de features, ex. um <ul>)",
    "action (botao de CTA do tier)",
    "description (texto pequeno abaixo do preco)"
  ],
  "i18nKeys": []
};
