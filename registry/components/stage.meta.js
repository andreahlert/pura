export default {
  "name": "stage",
  "tag": "pura-stage",
  "category": "Animation",
  "animation": true,
  "title": "Stage",
  "role": "",
  "summary": "A viewport-tall, internally-scrollable box of full-height sections. With the snap attribute, scrolling lands one section at a time (the fullpage feel), using native CSS scroll snapping with no per-frame JS. Scrub children inside that use timeline=scroll bind to the stage's progress.",
  "attributes": [
    {
      "name": "snap",
      "type": "\"\" | \"mandatory\" | \"proximity\"",
      "default": "(off)",
      "desc": "Enables scroll snapping. Present or \"mandatory\" hard-snaps to each section; \"proximity\" snaps only near a boundary; absent scrolls freely."
    },
    {
      "name": "height",
      "type": "string",
      "default": "100vh",
      "desc": "Section and box height. Any CSS length (e.g. 100vh, 100svh, 80vh)."
    },
    {
      "name": "axis",
      "type": "\"y\" | \"x\"",
      "default": "y",
      "desc": "Section axis. y stacks sections vertically; x lays them out as a horizontal row."
    }
  ],
  "events": [
    {
      "name": "stage-change",
      "detail": "{ index: number }",
      "desc": "Fires when the settled section changes."
    }
  ],
  "slots": [
    "default"
  ],
  "i18nKeys": []
};
