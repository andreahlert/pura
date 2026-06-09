export default {
  "name": "confidence-meter",
  "tag": "pura-confidence-meter",
  "category": "Display",
  "animation": true,
  "title": "Confidence Meter",
  "role": "meter",
  "summary": "A meter whose motion encodes an agent's confidence: the fill is the value, the shimmer cadence and a low-end jitter read as certainty. role=meter, SSR-safe, reduced-motion aware.",
  "attributes": [
    {
      "name": "value",
      "type": "number",
      "default": "0",
      "desc": "Confidence in 0..1. A bare percentage like \"75\" is read as 0.75. Clamped."
    },
    {
      "name": "state",
      "type": "string",
      "default": "\"\"",
      "desc": "Optional free-form phase label (e.g. \"thinking\", \"verifying\", \"done\"); echoed in the event and aria-label."
    },
    {
      "name": "label",
      "type": "string",
      "default": "\"\"",
      "desc": "Optional caption shown above the bar."
    },
    {
      "name": "hide-value",
      "type": "boolean",
      "default": "false",
      "desc": "Hide the numeric percent readout, leaving the bar and label."
    }
  ],
  "events": [
    {
      "name": "confidencechange",
      "detail": "{ value, level, state }",
      "desc": "Fired on any value or state change. value is 0..1, level is low|medium|high."
    }
  ],
  "slots": [],
  "i18nKeys": [
    "confidence.label",
    "confidence.low",
    "confidence.medium",
    "confidence.high"
  ]
};
