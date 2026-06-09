// AUTO-GENERATED from registry/components/*.meta.js. Do not edit by hand.
export const components = [
{
  "slug": "accordion",
  "title": "Accordion",
  "category": "Disclosure",
  "blurb": "Expandable and collapsible sections to organize content into panels.",
  "description": "A native component (Web Component) built on top of the <details>/<summary> elements, inheriting accessibility and keyboard navigation for free. Use it to group content into panels that the user opens and closes, such as FAQs or settings split into sections. With the single attribute, only one panel stays open at a time.",
  "attributes": [
    {
      "name": "single",
      "type": "boolean",
      "default": "false",
      "desc": "On <pura-accordion>: when present, keeps only one item open at a time."
    },
    {
      "name": "label",
      "type": "string",
      "default": "\"\"",
      "desc": "On <pura-accordion-item>: text shown in the panel's header/trigger."
    },
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "desc": "On <pura-accordion-item>: when present, the item starts expanded (also reflected as the .open property)."
    }
  ],
  "events": [
    "open"
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "<pura-accordion single>\n  <pura-accordion-item label=\"What is pura?\" open>\n    pura is a UI library built with native Web Components, with no dependencies.\n  </pura-accordion-item>\n  <pura-accordion-item label=\"Do I need a framework?\">\n    No. The components work on any HTML page, with or without a framework.\n  </pura-accordion-item>\n  <pura-accordion-item label=\"How does accessibility work?\">\n    Each item uses native <details>/<summary>, with keyboard and screen reader support.\n  </pura-accordion-item>\n</pura-accordion>",
  "usage": "<pura-accordion single>\n  <pura-accordion-item label=\"What is pura?\" open>\n    pura is a UI library built with native Web Components, with no dependencies.\n  </pura-accordion-item>\n  <pura-accordion-item label=\"Do I need a framework?\">\n    No. The components work on any HTML page, with or without a framework.\n  </pura-accordion-item>\n  <pura-accordion-item label=\"How does accessibility work?\">\n    Each item uses native <details>/<summary>, with keyboard and screen reader support.\n  </pura-accordion-item>\n</pura-accordion>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "action",
  "title": "Action",
  "category": "Agent",
  "blurb": "Agent-native wrapper that exposes a control (button) as an action discoverable and invocable by AI agents.",
  "description": "`<pura-action>` wraps a control in the default slot and exposes it as a machine-readable affordance: it mirrors `data-agent-action`/`data-intent` attributes and an `aria-label` onto the control in the light DOM, and registers the action in a global registry `window.__puraActions` (a Map indexed by `action-id`) whose entries expose `invoke()`. Use it so AI or browser agents can discover, understand (via `intent`), and trigger your UI's actions programmatically, without relying on brittle DOM heuristics. It is a transparent wrapper (`display: contents`), so it does not change the layout of the wrapped control.",
  "attributes": [
    {
      "name": "intent",
      "type": "string",
      "default": "",
      "desc": "Human/agent-readable verb phrase describing the action, e.g. \"save document\". Mirrored as data-intent and used as the control's aria-label if it does not already have one."
    },
    {
      "name": "action-id",
      "type": "string",
      "default": "",
      "desc": "Stable identifier used as the key in the window.__puraActions registry and mirrored as data-agent-action on the control. Without it the action is not discoverable."
    },
    {
      "name": "params",
      "type": "json",
      "default": "",
      "desc": "JSON object describing the action's parameters. It is parsed (invalid JSON becomes null) and exposed in the event detail and in the registry entry."
    }
  ],
  "events": [
    "invoke"
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "<pura-action id=\"acao-salvar\" intent=\"save document\" action-id=\"save-doc\" params='{\"force\":false}'>\n  <button>Save document</button>\n</pura-action>\n<p id=\"acao-status\">Waiting for action...</p>\n<button id=\"acao-invoke\">Invoke via agent</button>\n<script type=\"module\">\n  const status = document.getElementById('acao-status');\n  document.getElementById('acao-salvar').addEventListener('invoke', (e) => {\n    status.textContent = 'Action \"' + e.detail.intent + '\" (' + e.detail.actionId + ') invoked. params=' + JSON.stringify(e.detail.params);\n  });\n  // Simulates an agent discovering and triggering the action through the global registry.\n  document.getElementById('acao-invoke').addEventListener('click', () => {\n    window.__puraActions?.get('save-doc')?.invoke();\n  });\n</script>",
  "usage": "<pura-action id=\"acao-salvar\" intent=\"save document\" action-id=\"save-doc\" params='{\"force\":false}'>\n  <button>Save document</button>\n</pura-action>\n<p id=\"acao-status\">Waiting for action...</p>\n<button id=\"acao-invoke\">Invoke via agent</button>\n<script type=\"module\">\n  const status = document.getElementById('acao-status');\n  document.getElementById('acao-salvar').addEventListener('invoke', (e) => {\n    status.textContent = 'Action \"' + e.detail.intent + '\" (' + e.detail.actionId + ') invoked. params=' + JSON.stringify(e.detail.params);\n  });\n  // Simulates an agent discovering and triggering the action through the global registry.\n  document.getElementById('acao-invoke').addEventListener('click', () => {\n    window.__puraActions?.get('save-doc')?.invoke();\n  });\n</script>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "affix",
  "title": "Affix",
  "category": "Layout",
  "blurb": "Pins slotted content to the viewport once its scroll position passes a threshold (sticky-on-scroll).",
  "description": "Pins slotted content to the viewport once its scroll position passes a threshold (sticky-on-scroll).",
  "attributes": [
    {
      "name": "offset-top",
      "type": "number",
      "default": "",
      "desc": "px gap from the top of the viewport when affixed"
    },
    {
      "name": "offset-bottom",
      "type": "number",
      "default": "",
      "desc": "px gap from the bottom of the viewport when affixed"
    }
  ],
  "events": [
    "change"
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "agent-cursor",
  "title": "Agent Cursor",
  "category": "Tools",
  "blurb": "A replayable ghost cursor that drives over slotted content from a portable JSON trace: tweens between points, pulses on click, shows a per-step label. SSR-safe, reduced-motion aware, agent-enumerable.",
  "description": "`<pura-agent-cursor>` replays a sequence of pointer actions over its slotted content from a portable JSON trace, so an agent can *show* what it did (or will do) instead of only describing it. The ghost cursor tweens between points by timestamp, pulses a ring on `click` steps, and surfaces a per-step `label` tooltip plus a screen-reader announcement. Feed it a trace via the `.trace` property, an inline `<script type=\"application/json\">` child, or a `trace` URL attribute. Control it with `play()`, `pause()`, `restart()`, `seek(ms)`, `autoplay`, `loop`, and `speed`; listen for `cursorstep` `{ index, action, target, label, value, t }`, `cursorplay`, `cursorpause`, `cursorend`. Each instance registers in `window.__puraAgentCursors` by `data-pura-id` and mirrors `data-pura-cursor-{playing,step}`. The trace format is `{ version: 1, steps: [{ x, y, t, action, target?, label?, value? }] }` with `x`/`y` in px relative to the element (or a `target` selector to center on), `t` in milliseconds, and `action` one of `move` (default), `click`, `type`, `hover`.",
  "attributes": [
    {
      "name": "trace",
      "type": "string",
      "default": "\"\"",
      "desc": "URL to a JSON trace { version, steps:[{x,y,t,action,target,label,value}] }. An inline <script type=\"application/json\"> child or the .trace property take priority."
    },
    {
      "name": "autoplay",
      "type": "boolean",
      "default": "false",
      "desc": "Start replaying as soon as a trace is applied."
    },
    {
      "name": "loop",
      "type": "boolean",
      "default": "false",
      "desc": "Restart from the beginning when the replay ends."
    },
    {
      "name": "speed",
      "type": "number",
      "default": "1",
      "desc": "Playback rate multiplier (2 = twice as fast)."
    }
  ],
  "events": [
    {
      "name": "cursorstep",
      "detail": "{ index, action, target, label, value, t }",
      "desc": "Fired when the replay enters a new step."
    },
    {
      "name": "cursorplay",
      "detail": "{}",
      "desc": "Fired when playback starts."
    },
    {
      "name": "cursorpause",
      "detail": "{}",
      "desc": "Fired when playback pauses."
    },
    {
      "name": "cursorend",
      "detail": "{}",
      "desc": "Fired when a non-looping replay reaches the end."
    }
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "<pura-agent-cursor autoplay loop style=\"display: block; position: relative; height: 160px; border: 1px solid var(--pura-border, #e4e4e7); border-radius: 12px; background: var(--pura-muted, #fafafa);\">\n  <script type=\"application/json\">{ \"version\": 1, \"steps\": [\n    { \"x\": 30, \"y\": 30, \"t\": 0, \"label\": \"Open menu\" },\n    { \"x\": 220, \"y\": 40, \"t\": 1200, \"action\": \"hover\", \"label\": \"Hover item\" },\n    { \"x\": 150, \"y\": 120, \"t\": 2400, \"action\": \"click\", \"label\": \"Confirm\" },\n    { \"x\": 30, \"y\": 30, \"t\": 3600, \"label\": \"Back\" }\n  ] }</script>\n  <div style=\"padding: 1rem; font: 500 13px system-ui; color: var(--pura-muted-fg, #52525b);\">A scripted cursor replays over this panel.</div>\n</pura-agent-cursor>",
  "usage": "<pura-agent-cursor trace=\"/traces/checkout.json\" loop></pura-agent-cursor>\n\n<script type=\"module\">\n  const c = document.querySelector('pura-agent-cursor');\n  c.trace = { version: 1, steps: [\n    { x: 20, y: 20, t: 0, label: 'Start' },\n    { x: 180, y: 90, t: 1000, action: 'click', target: '#submit', label: 'Submit' },\n  ] };\n  c.addEventListener('cursorstep', (e) => console.log(e.detail));\n  c.play();\n</script>",
  "animation": true,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "agent-hint",
  "title": "Agent Hint",
  "category": "Agent",
  "blurb": "Visually hidden hint that adds context readable by screen readers and AI agents to a nearby control.",
  "description": "Agent Hint (`<pura-agent-hint>`) is an agent-native, headless component that holds text hidden from human eyes (the sr-only technique) but present in the DOM and the accessibility tree. Use it to give a screen reader or automated agent extra context about a neighboring control, connecting via `for` to the target's `aria-describedby`. Beyond ARIA, it exposes a machine-readable layer: stable `data-*` attributes and a global registry `window.__puraAgentHints` (a Map with `query(forId)`) that agents can enumerate to read every hint on the page.",
  "attributes": [
    {
      "name": "for",
      "type": "string",
      "default": "",
      "desc": "id of the control this hint describes. When set, it connects the target's aria-describedby to a stable internal id so the hint is announced for that control."
    },
    {
      "name": "role",
      "type": "string",
      "default": "note",
      "desc": "Accessibility role exposed on the host."
    },
    {
      "name": "label",
      "type": "string",
      "default": "",
      "desc": "Optional aria-label for the hint region."
    },
    {
      "name": "level",
      "type": "\"info\" | \"tip\" | \"warning\"",
      "default": "info",
      "desc": "Machine-readable semantic weight. Surfaces as data-level and aria-roledescription (agent hint / agent tip / agent warning)."
    },
    {
      "name": "visible",
      "type": "boolean",
      "default": "false",
      "desc": "Opt-in escape hatch: renders the hint visibly (for debugging / authoring)."
    }
  ],
  "events": [
    "pura-agent-hint:change"
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:.5rem;max-width:320px\">\n  <label for=\"cupom\">Coupon code</label>\n  <input id=\"cupom\" type=\"text\" placeholder=\"e.g. PURA10\" />\n  <pura-agent-hint for=\"cupom\" level=\"tip\" visible>\n    Enter the coupon in uppercase, with no spaces. Only one coupon per order.\n  </pura-agent-hint>\n</div>",
  "usage": "<label for=\"cupom\">Coupon code</label>\n<input id=\"cupom\" type=\"text\" placeholder=\"e.g. PURA10\" />\n<pura-agent-hint for=\"cupom\" level=\"tip\">\n  Enter the coupon in uppercase, with no spaces. Only one coupon per order.\n</pura-agent-hint>\n\n<!-- Agents can enumerate every hint on the page:\n     window.__puraAgentHints.query(\"cupom\") -->",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "alert-dialog",
  "title": "Alert Dialog",
  "category": "Overlay",
  "blurb": "Confirmation modal that requires a decision from the user before closing.",
  "description": "Alert Dialog is a native web component built on the <dialog> element (showModal, with focus trap and backdrop) that interrupts the flow to require a decision. Unlike a regular dialog, it ignores backdrop clicks and the ESC key, so the user must choose between cancel and confirm. Use it for destructive or irreversible actions, such as deleting a record or leaving without saving.",
  "attributes": [
    {
      "name": "title",
      "type": "string",
      "default": "\"\"",
      "desc": "Title shown in the dialog header."
    },
    {
      "name": "description",
      "type": "string",
      "default": "\"\"",
      "desc": "Body text, used when the default slot is empty."
    },
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "desc": "Controls visibility; present = open (reflects the state and triggers showModal/close)."
    }
  ],
  "events": [
    "confirm",
    "cancel",
    "close"
  ],
  "slots": [
    "default",
    "cancel",
    "action"
  ],
  "demoHTML": "<button id=\"open-ad\">Delete account</button>\n\n<pura-alert-dialog\n  id=\"ad\"\n  title=\"Are you sure?\"\n  description=\"This action cannot be undone. Your account will be permanently removed.\"\n>\n  <button slot=\"cancel\" data-action=\"cancel\">Cancel</button>\n  <button slot=\"action\" data-action=\"confirm\">Yes, delete</button>\n</pura-alert-dialog>\n\n<script type=\"module\">\n  const dialog = document.getElementById(\"ad\");\n  document.getElementById(\"open-ad\").addEventListener(\"click\", () => dialog.open());\n  dialog.addEventListener(\"confirm\", () => console.log(\"confirmed\"));\n  dialog.addEventListener(\"cancel\", () => console.log(\"canceled\"));\n</script>",
  "usage": "<button id=\"open-ad\">Delete account</button>\n\n<pura-alert-dialog\n  id=\"ad\"\n  title=\"Are you sure?\"\n  description=\"This action cannot be undone. Your account will be permanently removed.\"\n>\n  <button slot=\"cancel\" data-action=\"cancel\">Cancel</button>\n  <button slot=\"action\" data-action=\"confirm\">Yes, delete</button>\n</pura-alert-dialog>\n\n<script type=\"module\">\n  const dialog = document.getElementById(\"ad\");\n  document.getElementById(\"open-ad\").addEventListener(\"click\", () => dialog.open());\n  dialog.addEventListener(\"confirm\", () => console.log(\"confirmed\"));\n  dialog.addEventListener(\"cancel\", () => console.log(\"canceled\"));\n</script>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "alert",
  "title": "Alert",
  "category": "Feedback",
  "blurb": "Callout to highlight information, success, warning, or error messages.",
  "description": "Alert is a native web component (`<pura-alert>`) that shows a callout with an icon, an optional title, and a description to communicate contextual messages to the user. Use it for inline feedback on the page, such as confirmations, warnings, or errors, with four semantic variants. It can be dismissible, removing itself from the page when closed.",
  "attributes": [
    {
      "name": "variant",
      "type": "\"info\" | \"success\" | \"warning\" | \"danger\"",
      "default": "info",
      "desc": "Semantic variant that sets the callout's color and icon."
    },
    {
      "name": "title",
      "type": "string",
      "default": "",
      "desc": "Optional title shown in bold above the description."
    },
    {
      "name": "dismissible",
      "type": "boolean",
      "default": "false",
      "desc": "When present, shows a close button that removes the alert."
    }
  ],
  "events": [
    "dismiss"
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "<pura-alert variant=\"info\" title=\"Update available\">\n  A new version of the system is ready to install.\n</pura-alert>\n\n<pura-alert variant=\"success\" title=\"Payment confirmed\" dismissible>\n  We received your payment and your order is already being processed.\n</pura-alert>\n\n<pura-alert variant=\"warning\" title=\"Storage almost full\">\n  You've used 90% of your storage. Consider freeing up space.\n</pura-alert>\n\n<pura-alert variant=\"danger\" title=\"Failed to save\" dismissible>\n  We couldn't save your changes. Please try again.\n</pura-alert>",
  "usage": "<pura-alert variant=\"info\" title=\"Update available\">\n  A new version of the system is ready to install.\n</pura-alert>\n\n<pura-alert variant=\"success\" title=\"Payment confirmed\" dismissible>\n  We received your payment and your order is already being processed.\n</pura-alert>\n\n<pura-alert variant=\"warning\" title=\"Storage almost full\">\n  You've used 90% of your storage. Consider freeing up space.\n</pura-alert>\n\n<pura-alert variant=\"danger\" title=\"Failed to save\" dismissible>\n  We couldn't save your changes. Please try again.\n</pura-alert>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "angle-slider",
  "title": "Angle Slider",
  "category": "Form",
  "blurb": "A circular angle picker dial with a draggable handle on the circumference for selecting an angle in degrees (0..360).",
  "description": "A circular angle picker dial with a draggable handle on the circumference for selecting an angle in degrees (0..360).",
  "attributes": [
    {
      "name": "value",
      "type": "number",
      "default": "0",
      "desc": "Current angle in degrees"
    },
    {
      "name": "size",
      "type": "number",
      "default": "120",
      "desc": "Diameter of the dial in px"
    },
    {
      "name": "step",
      "type": "number",
      "default": "1",
      "desc": "Snap step in degrees"
    },
    {
      "name": "marks",
      "type": "string",
      "default": "",
      "desc": "Comma-separated list of degrees to show tick marks"
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "",
      "desc": "Disables interaction"
    }
  ],
  "events": [
    "change"
  ],
  "slots": [],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "app-shell",
  "title": "App Shell",
  "category": "Layout",
  "blurb": "A top-level page scaffold that wires app chrome together with named slots for header, sidebar, footer, and main content in a CSS grid layout.",
  "description": "A top-level page scaffold that wires app chrome together with named slots for header, sidebar, footer, and main content in a CSS grid layout.",
  "attributes": [
    {
      "name": "sidebar-collapsed",
      "type": "boolean",
      "default": "",
      "desc": "Hides or narrows the sidebar"
    },
    {
      "name": "sidebar-width",
      "type": "string",
      "default": "16rem",
      "desc": "Desktop sidebar width as a CSS length"
    },
    {
      "name": "header-height",
      "type": "string",
      "default": "3.5rem",
      "desc": "Header row height as a CSS length"
    },
    {
      "name": "fixed-header",
      "type": "boolean",
      "default": "",
      "desc": "Makes the header sticky at the top"
    }
  ],
  "events": [
    "sidebartoggle"
  ],
  "slots": [
    "default",
    "header",
    "sidebar",
    "footer"
  ],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "aspect-ratio",
  "title": "Aspect Ratio",
  "category": "Display",
  "blurb": "Keeps content at a fixed ratio and crops media to fill the box.",
  "description": "A native web component that reserves space with a fixed ratio (for example 16/9 or 1/1) for nested content, preventing layout shifts while the media loads. Images, videos, iframes and other media fill 100% of the width and height with object-fit cover, cropped to the bounds of the box. Use it for thumbnails, video players, embedded maps and any responsive media that needs to preserve its proportions.",
  "attributes": [
    {
      "name": "ratio",
      "type": "string",
      "default": "1/1",
      "desc": "Desired ratio. Accepts \"16/9\", \"16:9\", \"1.78\" or a single number; an invalid value falls back to 1/1."
    },
    {
      "name": "rounded",
      "type": "boolean",
      "default": "false",
      "desc": "When present, applies the theme's border radius (var(--pura-radius)) and rounds the corners."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "demoHTML": "<div style=\"display:flex;gap:1rem;flex-wrap:wrap;max-width:680px\">\n  <pura-aspect-ratio ratio=\"16/9\" rounded style=\"flex:1;min-width:280px\">\n    <img src=\"https://picsum.photos/seed/pura-paisagem/800/450\" alt=\"Landscape at dusk\" />\n  </pura-aspect-ratio>\n\n  <pura-aspect-ratio ratio=\"1/1\" rounded style=\"width:160px\">\n    <img src=\"https://picsum.photos/seed/pura-perfil/400/400\" alt=\"Profile photo\" />\n  </pura-aspect-ratio>\n</div>",
  "usage": "<div style=\"display:flex;gap:1rem;flex-wrap:wrap;max-width:680px\">\n  <pura-aspect-ratio ratio=\"16/9\" rounded style=\"flex:1;min-width:280px\">\n    <img src=\"https://picsum.photos/seed/pura-paisagem/800/450\" alt=\"Landscape at dusk\" />\n  </pura-aspect-ratio>\n\n  <pura-aspect-ratio ratio=\"1/1\" rounded style=\"width:160px\">\n    <img src=\"https://picsum.photos/seed/pura-perfil/400/400\" alt=\"Profile photo\" />\n  </pura-aspect-ratio>\n</div>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "async",
  "title": "Async",
  "category": "Agent",
  "blurb": "Declarative async-state container that renders only the slot matching the current phase (idle, loading, error, empty, or ready).",
  "description": "`<pura-async>` expresses a view's loading phases (loading, error, empty, ready) in markup, showing exactly one of its slots according to the `state` attribute, instead of imperative branching. Use it when a region depends on asynchronous data and you want to switch between spinner, error, empty, and ready content without display JS. The agent-native layer marks the region with `aria-busy` during loading, announces each transition in a dedicated sr-only live region, reflects stable `data-pura-id`/`data-state`, and registers the instance in `window.__puraAsync`, letting agents read any region's phase (via `window.__puraAsync.snapshot()`/`state(id)`) without traversing the DOM.",
  "attributes": [
    {
      "name": "state",
      "type": "string",
      "default": "idle",
      "desc": "Current phase of the region. One of: idle | loading | error | empty | ready. A missing or unknown value is normalized to idle (renders nothing). It is the single source of truth; setState(s) only writes to this attribute."
    }
  ],
  "events": [
    "statechange"
  ],
  "slots": [
    "loading",
    "error",
    "empty",
    "default"
  ],
  "demoHTML": "<div style=\"max-width:420px;font-family:system-ui\">\n  <pura-async id=\"conta\" state=\"loading\">\n    <div slot=\"error\">Could not load the data. Please try again.</div>\n    <div slot=\"empty\">No transactions found.</div>\n    <ul>\n      <li>Payment received: $1,200.00</li>\n      <li>Monthly subscription: $49.90</li>\n    </ul>\n  </pura-async>\n\n  <div style=\"margin-top:12px;display:flex;gap:8px;flex-wrap:wrap\">\n    <button id=\"btn-loading\">loading</button>\n    <button id=\"btn-ready\">ready</button>\n    <button id=\"btn-empty\">empty</button>\n    <button id=\"btn-error\">error</button>\n  </div>\n</div>\n\n<script type=\"module\">\n  import \"/pura/lib/async.js\";\n  const el = document.getElementById(\"conta\");\n  document.getElementById(\"btn-loading\").onclick = () => el.setState(\"loading\");\n  document.getElementById(\"btn-ready\").onclick = () => el.setState(\"ready\");\n  document.getElementById(\"btn-empty\").onclick = () => el.setState(\"empty\");\n  document.getElementById(\"btn-error\").onclick = () => el.setState(\"error\");\n  el.addEventListener(\"statechange\", (e) =>\n    console.log(\"state:\", e.detail.previous, \"->\", e.detail.state)\n  );\n</script>",
  "usage": "<pura-async id=\"conta\" state=\"loading\">\n  <div slot=\"error\">Could not load the data. Please try again.</div>\n  <div slot=\"empty\">No transactions found.</div>\n  <ul>\n    <li>Payment received: $1,200.00</li>\n    <li>Monthly subscription: $49.90</li>\n  </ul>\n</pura-async>\n\n<script type=\"module\">\n  import \"/pura/lib/async.js\";\n  const el = document.getElementById(\"conta\");\n  // Switch phase via the validated method (writes to the state attribute)\n  el.setState(\"ready\");\n  el.addEventListener(\"statechange\", (e) =>\n    console.log(\"state:\", e.detail.previous, \"->\", e.detail.state)\n  );\n  // Agent-native reading, without traversing the DOM:\n  // window.__puraAsync.snapshot();  // [{ id, domId, state }]\n  // window.__puraAsync.state(\"conta\");\n</script>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "audio",
  "title": "Audio",
  "category": "Display",
  "blurb": "A styled audio player over native <audio> with play/pause, seek, volume, and mute controls.",
  "description": "A styled audio player over native <audio> with play/pause, seek, volume, and mute controls.",
  "attributes": [
    {
      "name": "src",
      "type": "string",
      "default": "",
      "desc": "Audio URL"
    },
    {
      "name": "autoplay",
      "type": "boolean",
      "default": "",
      "desc": "Start playing on load"
    },
    {
      "name": "loop",
      "type": "boolean",
      "default": "",
      "desc": "Loop playback"
    },
    {
      "name": "title",
      "type": "string",
      "default": "",
      "desc": "Optional track title display"
    },
    {
      "name": "artist",
      "type": "string",
      "default": "",
      "desc": "Optional artist display"
    }
  ],
  "events": [],
  "slots": [],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "aurora",
  "title": "Aurora",
  "category": "Display",
  "blurb": "A slowly drifting aurora-light gradient backdrop behind its content. Pure CSS @keyframes, SSR-safe, reduced-motion aware.",
  "description": "`<pura-aurora>` lays a slowly drifting aurora-light gradient behind its slotted content, in the style of Magic UI's Aurora background. The motion is a single pure CSS `@keyframes` pan and rotate over four blurred color blobs, so it works server-rendered with no client JS and no animation runtime. Theme the four blobs with `--pura-aurora-1` through `--pura-aurora-4`, and tune `--pura-aurora-opacity`, `--pura-aurora-blur`, and `--pura-aurora-duration`. Under reduced motion the field rests as a static gradient via the base reset. It registers in `window.__puraAuroras` by `data-pura-id` for agent enumeration.",
  "attributes": [],
  "events": [],
  "slots": [
    "default"
  ],
  "demoHTML": "<pura-aurora style=\"border-radius: 12px; background: #07080f;\">\n  <div style=\"padding: 3.5rem 1.5rem; text-align: center; font: 700 24px system-ui; letter-spacing: -.02em; color: #fff;\">\n    Aurora\n    <div style=\"font-weight: 400; font-size: 13px; color: rgba(255,255,255,.72); margin-top: .4rem;\">Drifting northern-lights backdrop, pure CSS.</div>\n  </div>\n</pura-aurora>",
  "usage": "<pura-aurora>\n  <section class=\"hero\">Headline over an aurora glow</section>\n</pura-aurora>\n\n<!-- Custom palette -->\n<pura-aurora style=\"--pura-aurora-1: #f97316; --pura-aurora-2: #ec4899; --pura-aurora-3: #8b5cf6;\">\n  <section class=\"hero\">Warm aurora</section>\n</pura-aurora>",
  "animation": true,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "auto-animate",
  "title": "Auto Animate",
  "category": "Utility",
  "blurb": "Drop-in layout animation: direct children animate on add, remove, and reorder via FLIP, zero per-item wiring, reduced-motion aware.",
  "description": "`<pura-auto-animate>` is a drop-in layout animator: wrap any list, grid, or container and its direct children animate automatically on add, remove, and reorder, with no per-item wiring and no keyframes to author. A `MutationObserver` watches the light-DOM children and pura's FLIP engine (`animate.js`, WAAPI under the hood) tweens the layout delta, scale-correcting size changes and fading removed nodes out from their last position. FLIP is one of only two JS-tweening primitives pura ships, fully opt-in: set `disabled` to pause it and `duration` to override the token-derived timing. It no-ops the animation under reduced motion (children still mutate) and registers in `window.__puraAutoAnimate` for agent enumeration.",
  "attributes": [
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Stops observing; children mutate with no animation."
    },
    {
      "name": "duration",
      "type": "number",
      "default": "token --pura-duration-4",
      "desc": "Animation duration in milliseconds. Overrides the token-derived default."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "demoHTML": "<div style=\"display: grid; gap: var(--pura-space-3, 0.75rem); justify-items: start;\">\n  <pura-button id=\"aa-add\" size=\"sm\">Add item</pura-button>\n  <pura-auto-animate style=\"display: grid; gap: 0.5rem; width: 100%;\" id=\"aa-list\">\n    <div style=\"padding: 0.6rem 0.9rem; background: var(--pura-subtle, #f4f4f5); border-radius: 10px; font: 15px system-ui;\">First item</div>\n    <div style=\"padding: 0.6rem 0.9rem; background: var(--pura-subtle, #f4f4f5); border-radius: 10px; font: 15px system-ui;\">Second item</div>\n  </pura-auto-animate>\n</div>\n<script>\n  (() => {\n    const list = document.querySelector('#aa-list');\n    let n = 3;\n    document.querySelector('#aa-add').addEventListener('click', () => {\n      const el = document.createElement('div');\n      el.style.cssText = 'padding:0.6rem 0.9rem;background:var(--pura-subtle,#f4f4f5);border-radius:10px;font:15px system-ui;cursor:pointer;';\n      el.textContent = 'Item ' + (n++);\n      el.addEventListener('click', () => el.remove());\n      list.prepend(el);\n    });\n  })();\n</script>",
  "usage": "<pura-auto-animate>\n  <div>First item</div>\n  <div>Second item</div>\n</pura-auto-animate>\n\n<script>\n  // Any add/remove/reorder of the children animates automatically.\n  const list = document.querySelector('pura-auto-animate');\n  list.prepend(makeItem());   // animates in\n  list.children[2].remove();  // animates out\n</script>",
  "animation": true,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "avatar-group",
  "title": "Avatar Group",
  "category": "Display",
  "blurb": "Overlapping stack of avatars that collapses the overflow into a \"+N\" button with a popover of the hidden members.",
  "description": "The <pura-avatar-group> stacks <pura-avatar> elements with overlap and a separator ring, propagating its size to the children and, via the max attribute, collapsing the overflow into a \"+N\" bubble that opens a popover listing who was left out. Use it to represent participants, teams or collaborators compactly. It is agent-native: it exposes role=\"group\", stable data attributes (data-total, data-shown, data-overflow), a global registry at window.__puraAvatarGroups and the public API total/overflow/showOverflow()/hideOverflow(), letting agents read the state and open the popover programmatically.",
  "attributes": [
    {
      "name": "max",
      "type": "number",
      "default": "0",
      "desc": "Maximum number of avatars shown before collapsing the rest into a \"+N\" bubble. 0 or absent shows all of them."
    },
    {
      "name": "size",
      "type": "\"sm\" | \"md\" | \"lg\"",
      "default": "md",
      "desc": "Size applied (passthrough) to each child <pura-avatar> and to the overflow bubble."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Avatar group",
      "desc": "Accessible name of the group (aria-label)."
    }
  ],
  "events": [
    "pura-overflow-toggle"
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "<pura-avatar-group max=\"4\" size=\"md\" label=\"Project team\">\n  <pura-avatar initials=\"AS\" name=\"Anna Smith\"></pura-avatar>\n  <pura-avatar initials=\"BC\" name=\"Brian Carter\"></pura-avatar>\n  <pura-avatar initials=\"CL\" name=\"Carla Lee\"></pura-avatar>\n  <pura-avatar initials=\"DM\" name=\"Diego Morris\"></pura-avatar>\n  <pura-avatar initials=\"EF\" name=\"Elena Fisher\"></pura-avatar>\n  <pura-avatar initials=\"GR\" name=\"Gabriel Ross\"></pura-avatar>\n</pura-avatar-group>",
  "usage": "<pura-avatar-group max=\"4\" size=\"md\" label=\"Project team\">\n  <pura-avatar initials=\"AS\" name=\"Anna Smith\"></pura-avatar>\n  <pura-avatar initials=\"BC\" name=\"Brian Carter\"></pura-avatar>\n  <pura-avatar initials=\"CL\" name=\"Carla Lee\"></pura-avatar>\n  <pura-avatar initials=\"DM\" name=\"Diego Morris\"></pura-avatar>\n  <pura-avatar initials=\"EF\" name=\"Elena Fisher\"></pura-avatar>\n  <pura-avatar initials=\"GR\" name=\"Gabriel Ross\"></pura-avatar>\n</pura-avatar-group>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "card",
      "title": "Card"
    },
    {
      "slug": "avatar",
      "title": "Avatar"
    },
    {
      "slug": "badge",
      "title": "Badge"
    },
    {
      "slug": "button",
      "title": "Button"
    },
    {
      "slug": "inspector",
      "title": "Inspector"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "kanban",
      "title": "Kanban"
    }
  ]
},
{
  "slug": "avatar",
  "title": "Avatar",
  "category": "Display",
  "blurb": "User photo with an initials fallback and a status indicator.",
  "description": "Avatar is a native web component that displays a user's image and, if the image fails or does not exist, shows their initials as a fallback. Use it to represent people or entities in lists, comments, headers and menus. It supports three sizes and a status indicator in the corner.",
  "attributes": [
    {
      "name": "src",
      "type": "string",
      "default": "",
      "desc": "URL of the avatar image; if absent or it fails to load, the initials are shown instead."
    },
    {
      "name": "alt",
      "type": "string",
      "default": "\"\"",
      "desc": "Alternative text for the image, also used as the aria-label."
    },
    {
      "name": "initials",
      "type": "string",
      "default": "\"?\"",
      "desc": "Initials shown as a fallback when there is no image."
    },
    {
      "name": "size",
      "type": "\"sm\" | \"md\" | \"lg\"",
      "default": "md",
      "desc": "Size of the avatar (md is the default when the attribute is omitted)."
    },
    {
      "name": "status",
      "type": "\"online\" | \"offline\" | \"busy\"",
      "default": "",
      "desc": "When present, shows a colored status dot in the bottom-right corner."
    }
  ],
  "events": [],
  "slots": [],
  "demoHTML": "<div style=\"display:flex;align-items:center;gap:1rem\">\n  <pura-avatar src=\"https://i.pravatar.cc/150?img=12\" alt=\"Anna Smith\" status=\"online\"></pura-avatar>\n  <pura-avatar initials=\"MC\" status=\"busy\"></pura-avatar>\n  <pura-avatar size=\"sm\" initials=\"JP\"></pura-avatar>\n  <pura-avatar size=\"lg\" src=\"https://i.pravatar.cc/150?img=32\" alt=\"Carla Lee\" status=\"offline\"></pura-avatar>\n</div>",
  "usage": "<div style=\"display:flex;align-items:center;gap:1rem\">\n  <pura-avatar src=\"https://i.pravatar.cc/150?img=12\" alt=\"Anna Smith\" status=\"online\"></pura-avatar>\n  <pura-avatar initials=\"MC\" status=\"busy\"></pura-avatar>\n  <pura-avatar size=\"sm\" initials=\"JP\"></pura-avatar>\n  <pura-avatar size=\"lg\" src=\"https://i.pravatar.cc/150?img=32\" alt=\"Carla Lee\" status=\"offline\"></pura-avatar>\n</div>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "dropdown-menu",
      "title": "Dropdown Menu"
    },
    {
      "slug": "stat",
      "title": "Stat"
    },
    {
      "slug": "stat-grid",
      "title": "Stat Grid"
    },
    {
      "slug": "select",
      "title": "Select"
    },
    {
      "slug": "breadcrumb",
      "title": "Breadcrumb"
    },
    {
      "slug": "sidebar",
      "title": "Sidebar"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "app-shell",
      "title": "App Shell"
    },
    {
      "slug": "blog-post",
      "title": "Blog Post"
    },
    {
      "slug": "chat",
      "title": "Chat"
    },
    {
      "slug": "dashboard",
      "title": "Dashboard"
    },
    {
      "slug": "data-table",
      "title": "Data Table"
    },
    {
      "slug": "kanban",
      "title": "Kanban"
    },
    {
      "slug": "landing",
      "title": "Landing"
    },
    {
      "slug": "onboarding",
      "title": "Onboarding"
    },
    {
      "slug": "profile",
      "title": "Profile"
    },
    {
      "slug": "settings",
      "title": "Settings"
    }
  ]
},
{
  "slug": "back-to-top",
  "title": "Back to Top",
  "category": "Navigation",
  "blurb": "Floating button that appears as you scroll the page and smoothly scrolls back to the top.",
  "description": "The `<pura-back-to-top>` is a round button fixed in the bottom-right corner that fades in when the page (or a target container) is scrolled past a threshold and, on click, smoothly scrolls back to the top while respecting prefers-reduced-motion. Use it on long pages (articles, lists, docs) for an accessible return shortcut. It has an agent-native layer: it reflects live state in `data-pura-back-to-top-*` attributes (visible/hidden, current offset, threshold) and registers each instance in `window.__puraBackToTop` by `data-pura-id`, letting agents enumerate the buttons and call `.toTop()` to drive the scroll programmatically.",
  "attributes": [
    {
      "name": "offset",
      "type": "number",
      "default": "400",
      "desc": "Scroll distance in px before the button appears."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Back to top",
      "desc": "Accessible label (aria-label) of the icon button."
    },
    {
      "name": "target",
      "type": "string",
      "default": "(page)",
      "desc": "CSS selector of the scroll container to observe and scroll. If absent: uses the page scroll (window)."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Makes the button non-interactive and keeps it hidden."
    }
  ],
  "events": [
    "scroll-top"
  ],
  "slots": [
    "(default)"
  ],
  "demoHTML": "<div style=\"height: 1400px; padding: 1rem; line-height: 1.7;\">\n  <h2>Long example page</h2>\n  <p>Scroll down the page. After you pass 300px, the \"Back to top\" button appears in the bottom-right corner.</p>\n  <p style=\"margin-top: 1000px;\">Keep scrolling to the end. Click the floating button to smoothly return to the top.</p>\n</div>\n\n<pura-back-to-top offset=\"300\" label=\"Back to top\"></pura-back-to-top>",
  "usage": "<pura-back-to-top offset=\"300\" label=\"Back to top\"></pura-back-to-top>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "badge",
  "title": "Badge",
  "category": "Display",
  "blurb": "Compact label for indicating status, categories or counts.",
  "description": "Badge is a native web component that displays a small status or category label, with color variants for neutral, primary, success, warning, danger and info. Use it to highlight states (active, pending, error), tags or counters next to text and titles. Optionally it shows a leading colored dot to signal status more subtly.",
  "attributes": [
    {
      "name": "variant",
      "type": "\"neutral\" | \"primary\" | \"success\" | \"warning\" | \"danger\" | \"info\"",
      "default": "neutral",
      "desc": "Defines the color scheme of the badge."
    },
    {
      "name": "dot",
      "type": "boolean",
      "default": "false",
      "desc": "When present, shows a colored dot before the content."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "demoHTML": "<div style=\"display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;\">\n  <pura-badge>Draft</pura-badge>\n  <pura-badge variant=\"primary\">New</pura-badge>\n  <pura-badge variant=\"success\" dot>Active</pura-badge>\n  <pura-badge variant=\"warning\" dot>Pending</pura-badge>\n  <pura-badge variant=\"danger\">Error</pura-badge>\n  <pura-badge variant=\"info\">Beta</pura-badge>\n</div>",
  "usage": "<div style=\"display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;\">\n  <pura-badge>Draft</pura-badge>\n  <pura-badge variant=\"primary\">New</pura-badge>\n  <pura-badge variant=\"success\" dot>Active</pura-badge>\n  <pura-badge variant=\"warning\" dot>Pending</pura-badge>\n  <pura-badge variant=\"danger\">Error</pura-badge>\n  <pura-badge variant=\"info\">Beta</pura-badge>\n</div>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "item",
      "title": "Item"
    },
    {
      "slug": "segmented-control",
      "title": "Segmented Control"
    },
    {
      "slug": "stat",
      "title": "Stat"
    },
    {
      "slug": "stat-grid",
      "title": "Stat Grid"
    },
    {
      "slug": "card",
      "title": "Card"
    },
    {
      "slug": "select",
      "title": "Select"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "blog-post",
      "title": "Blog Post"
    },
    {
      "slug": "calendar-app",
      "title": "Calendar"
    },
    {
      "slug": "chat",
      "title": "Chat"
    },
    {
      "slug": "checkout",
      "title": "Checkout"
    },
    {
      "slug": "dashboard",
      "title": "Dashboard"
    },
    {
      "slug": "data-table",
      "title": "Data Table"
    },
    {
      "slug": "kanban",
      "title": "Kanban"
    },
    {
      "slug": "landing",
      "title": "Landing"
    },
    {
      "slug": "notifications",
      "title": "Notifications"
    },
    {
      "slug": "onboarding",
      "title": "Onboarding"
    },
    {
      "slug": "pricing",
      "title": "Pricing"
    },
    {
      "slug": "profile",
      "title": "Profile"
    }
  ]
},
{
  "slug": "banner",
  "title": "Banner",
  "category": "Feedback",
  "blurb": "Full-width notice strip for persistent site or section announcements, with an icon, variants, and optional dismissal.",
  "description": "`<pura-banner>` is a full-width strip for persistent notices (maintenance, news, billing alert, promotion) with a per-variant icon, title, message, optional action, and dismiss button. Use it at the top of a page or section, optionally pinning it with `sticky`. It has an agent-native layer: each banner gets a stable `data-pura-id`, joins the global registry `window.__puraBanners`, and mirrors its live state in `data-pura-banner-*` attributes (variant, dismissible, sticky, dismissed), letting agents enumerate, read, and dismiss banners without inspecting the DOM tree.",
  "attributes": [
    {
      "name": "variant",
      "type": "\"info\" | \"success\" | \"warning\" | \"danger\" | \"promo\"",
      "default": "info",
      "desc": "Sets the banner's background color, border, and icon. An invalid value falls back to info."
    },
    {
      "name": "title",
      "type": "string",
      "default": "",
      "desc": "Text for the bold title line; serves as a fallback for the title slot."
    },
    {
      "name": "message",
      "type": "string",
      "default": "",
      "desc": "Body text of the message; serves as a fallback for the default slot."
    },
    {
      "name": "dismissible",
      "type": "boolean",
      "default": "false",
      "desc": "Renders the close button that fires the dismiss event and hides the banner."
    },
    {
      "name": "sticky",
      "type": "boolean",
      "default": "false",
      "desc": "Positions the banner as sticky at the top of the scroll container (z-index 50)."
    },
    {
      "name": "label",
      "type": "string",
      "default": "\"<Variant> announcement\"",
      "desc": "Accessible label (aria-label) for the region; default derived from the variant."
    }
  ],
  "events": [
    "dismiss"
  ],
  "slots": [
    "title",
    "message (default)",
    "action"
  ],
  "demoHTML": "<pura-banner variant=\"promo\" dismissible title=\"Annual plan with 30% off\"\n  message=\"Offer valid until the end of the month for new subscribers.\">\n  <pura-button slot=\"action\" size=\"sm\" variant=\"ghost\">Get the deal</pura-button>\n</pura-banner>\n\n<pura-banner id=\"aviso-manut\" variant=\"warning\" dismissible sticky\n  title=\"Scheduled maintenance\"\n  message=\"The system will be unavailable this Saturday, from 2 AM to 4 AM.\">\n</pura-banner>",
  "usage": "<pura-banner variant=\"promo\" dismissible title=\"Annual plan with 30% off\"\n  message=\"Offer valid until the end of the month for new subscribers.\">\n  <pura-button slot=\"action\" size=\"sm\" variant=\"ghost\">Get the deal</pura-button>\n</pura-banner>\n\n<pura-banner id=\"aviso-manut\" variant=\"warning\" dismissible sticky\n  title=\"Scheduled maintenance\"\n  message=\"The system will be unavailable this Saturday, from 2 AM to 4 AM.\">\n</pura-banner>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "testimonial",
      "title": "Testimonial"
    },
    {
      "slug": "faq",
      "title": "FAQ"
    },
    {
      "slug": "pricing-table",
      "title": "Pricing Table"
    },
    {
      "slug": "stat",
      "title": "Stat"
    },
    {
      "slug": "stat-grid",
      "title": "Stat Grid"
    },
    {
      "slug": "card",
      "title": "Card"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "landing",
      "title": "Landing"
    }
  ]
},
{
  "slug": "barcode",
  "title": "Barcode",
  "category": "Display",
  "blurb": "A zero-dependency SVG barcode renderer supporting CODE128 (auto B/C) and EAN13 formats with optional human-readable text.",
  "description": "A zero-dependency SVG barcode renderer supporting CODE128 (auto B/C) and EAN13 formats with optional human-readable text.",
  "attributes": [
    {
      "name": "value",
      "type": "string",
      "default": "",
      "desc": "The value to encode as a barcode"
    },
    {
      "name": "format",
      "type": "string",
      "default": "code128",
      "desc": "Barcode format: \"code128\" or \"ean13\""
    },
    {
      "name": "height",
      "type": "number",
      "default": "80",
      "desc": "Bar height in px"
    },
    {
      "name": "displayValue",
      "type": "boolean",
      "default": "",
      "desc": "Show human-readable text under the bars"
    }
  ],
  "events": [],
  "slots": [],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "blockquote",
  "title": "Blockquote",
  "category": "Primitives",
  "blurb": "A quotation block with an accent border and optional citation.",
  "description": "Renders a styled blockquote with a left accent border, italic muted text, and an optional citation. The accent color follows the chosen variant, and the citation can be supplied either through the cite attribute or, for richer markup, the author slot.",
  "attributes": [
    {
      "name": "variant",
      "type": "string",
      "default": "default",
      "desc": "Accent color for the border and citation. One of: default, accent, primary, success, warning, danger, info."
    },
    {
      "name": "cite",
      "type": "string",
      "default": "",
      "desc": "Citation text rendered as a <cite> line. Hidden when content is supplied via the author slot."
    }
  ],
  "events": [],
  "slots": [
    "(default) — the quoted content",
    "author — citation markup when richer than the cite attribute"
  ],
  "demoHTML": "<script type=\"module\" src=\"/pura/lib/blockquote.js\"></script>\n\n<pura-blockquote cite=\"Ada Lovelace\">\n  The Analytical Engine weaves algebraic patterns just as the Jacquard loom weaves flowers and leaves.\n</pura-blockquote>\n\n<pura-blockquote variant=\"primary\" cite=\"Grace Hopper\">\n  The most dangerous phrase in the language is: we've always done it this way.\n</pura-blockquote>\n\n<pura-blockquote variant=\"success\">\n  Simplicity is the ultimate sophistication.\n  <span slot=\"author\">Leonardo da Vinci, <em>Notebooks</em></span>\n</pura-blockquote>",
  "usage": "<script type=\"module\" src=\"/pura/lib/blockquote.js\"></script>\n\n<!-- Default accent with a plain citation -->\n<pura-blockquote cite=\"Marie Curie\">\n  Nothing in life is to be feared, it is only to be understood.\n</pura-blockquote>\n\n<!-- Colored accent variant -->\n<pura-blockquote variant=\"warning\" cite=\"Carl Sagan\">\n  Somewhere, something incredible is waiting to be known.\n</pura-blockquote>\n\n<!-- Rich citation via the author slot -->\n<pura-blockquote variant=\"info\">\n  We are all in the gutter, but some of us are looking at the stars.\n  <span slot=\"author\">Oscar Wilde, <em>Lady Windermere's Fan</em></span>\n</pura-blockquote>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "border-beam",
  "title": "Border Beam",
  "category": "Display",
  "blurb": "A comet of light travels the rounded border of any container. Pure CSS via offset-path: border-box, SSR-safe, reduced-motion aware.",
  "description": "`<pura-border-beam>` sends a comet of light traveling around the rounded border of any container, in the style of Magic UI's Border Beam. The motion is pure CSS: the beam is a `::after` pseudo-element following `offset-path: border-box`, so there is no animation runtime and the effect works server-rendered with no client JS. Tune it with the `size`, `duration`, and `delay` attributes, or theme the gradient with `--pura-border-beam-from` and `--pura-border-beam-to` (default primary→accent). Under reduced motion the beam rests statically via the base reset. It registers in `window.__puraBorderBeams` by `data-pura-id` for agent enumeration.",
  "attributes": [
    {
      "name": "size",
      "type": "number",
      "default": "64",
      "desc": "Beam length in pixels."
    },
    {
      "name": "duration",
      "type": "number",
      "default": "5",
      "desc": "Seconds for the beam to complete one lap of the border."
    },
    {
      "name": "delay",
      "type": "number",
      "default": "0",
      "desc": "Seconds before the beam starts traveling."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "demoHTML": "<pura-border-beam size=\"60\" duration=\"4\" style=\"max-width: 320px;\">\n  <div style=\"padding: 1.5rem; border: 1px solid var(--pura-border, #e4e4e7); border-radius: 12px; background: var(--pura-bg, #fff); font: 15px system-ui;\">\n    <b style=\"display:block; margin-bottom:.3rem;\">Border Beam</b>\n    <span style=\"color: var(--pura-muted-fg, #71717a);\">A light traces the perimeter, pure CSS, server-renderable.</span>\n  </div>\n</pura-border-beam>",
  "usage": "<pura-border-beam size=\"60\" duration=\"4\">\n  <div class=\"card\">Framed content</div>\n</pura-border-beam>\n\n<!-- Custom beam colors -->\n<pura-border-beam style=\"--pura-border-beam-from: #06b6d4; --pura-border-beam-to: #3b82f6;\">\n  <div class=\"card\">Cyan beam</div>\n</pura-border-beam>",
  "animation": true,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "bottom-navigation",
  "title": "Bottom Navigation",
  "category": "Navigation",
  "blurb": "A fixed bottom bar of icon plus label destinations in mobile style, with support for slotted item elements or a JSON items property.",
  "description": "A fixed bottom bar of icon plus label destinations in mobile style, with support for slotted item elements or a JSON items property.",
  "attributes": [
    {
      "name": "value",
      "type": "string",
      "default": "",
      "desc": "The active destination value"
    },
    {
      "name": "labels",
      "type": "boolean",
      "default": "true",
      "desc": "When set to \"false\", shows icons only"
    },
    {
      "name": "static",
      "type": "boolean",
      "default": "",
      "desc": "Lays the bar inline instead of fixed to the viewport bottom"
    }
  ],
  "events": [
    "change"
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "box",
  "title": "Box",
  "category": "Primitives",
  "blurb": "A generic themeable container that maps layout and style attributes to design tokens.",
  "description": "Box is a styled div primitive that turns common layout and visual attributes into CSS backed by --pura-* tokens. Spacing accepts a 0-6 scale or any raw CSS length, while background, color, border, radius, and shadow map to the theme. Use it as the building block for cards, panels, and arbitrary containers without writing custom CSS.",
  "attributes": [
    {
      "name": "p",
      "type": "string",
      "default": "",
      "desc": "Padding on all sides. Scale 0-6 (--pura-space-N) or any CSS length."
    },
    {
      "name": "px",
      "type": "string",
      "default": "",
      "desc": "Horizontal padding (overrides p on the x axis). Scale 0-6 or any CSS length."
    },
    {
      "name": "py",
      "type": "string",
      "default": "",
      "desc": "Vertical padding (overrides p on the y axis). Scale 0-6 or any CSS length."
    },
    {
      "name": "m",
      "type": "string",
      "default": "",
      "desc": "Margin on all sides. Scale 0-6, any CSS length, or 'auto'."
    },
    {
      "name": "mx",
      "type": "string",
      "default": "",
      "desc": "Horizontal margin (overrides m on the x axis). Scale 0-6, any CSS length, or 'auto'."
    },
    {
      "name": "my",
      "type": "string",
      "default": "",
      "desc": "Vertical margin (overrides m on the y axis). Scale 0-6, any CSS length, or 'auto'."
    },
    {
      "name": "bg",
      "type": "string",
      "default": "",
      "desc": "Background color: bg | subtle | primary | transparent. The primary value also sets a readable foreground color."
    },
    {
      "name": "color",
      "type": "string",
      "default": "",
      "desc": "Text color: fg | muted | primary. Wins over the implicit color set by bg."
    },
    {
      "name": "border",
      "type": "string",
      "default": "",
      "desc": "Boolean for a 1px border, or 'strong' for a 1px stronger border."
    },
    {
      "name": "radius",
      "type": "string",
      "default": "",
      "desc": "Corner radius: sm | md | lg | full."
    },
    {
      "name": "shadow",
      "type": "string",
      "default": "",
      "desc": "Box shadow: sm | md | lg | none."
    },
    {
      "name": "w",
      "type": "string",
      "default": "",
      "desc": "Width: any CSS length or 'full' (100%)."
    },
    {
      "name": "h",
      "type": "string",
      "default": "",
      "desc": "Height: any CSS length or 'full' (100%)."
    },
    {
      "name": "display",
      "type": "string",
      "default": "block",
      "desc": "Any CSS display value (block | flex | inline-flex | grid | inline | none ...)."
    }
  ],
  "events": [],
  "slots": [
    "default - container contents"
  ],
  "demoHTML": "<pura-box p=\"4\" bg=\"subtle\" radius=\"md\" border>\n  This is a simple padded box with a subtle background and a border.\n</pura-box>\n\n<pura-box p=\"5\" bg=\"primary\" radius=\"lg\" shadow=\"md\" my=\"3\">\n  A primary card with large rounded corners and a medium shadow.\n</pura-box>\n\n<pura-box p=\"4\" border=\"strong\" radius=\"sm\" color=\"muted\" w=\"320px\">\n  A fixed-width box with a strong border and muted text.\n</pura-box>\n\n<pura-box px=\"6\" py=\"3\" bg=\"bg\" shadow=\"sm\" mx=\"auto\" w=\"full\">\n  A full-width banner centered with auto horizontal margins.\n</pura-box>",
  "usage": "<script type=\"module\" src=\"/pura/lib/box.js\"></script>\n\n<!-- Padded card with a subtle background -->\n<pura-box p=\"4\" bg=\"subtle\" radius=\"md\" border>\n  Card contents go here.\n</pura-box>\n\n<!-- Primary panel with shadow and vertical margin -->\n<pura-box p=\"5\" bg=\"primary\" radius=\"lg\" shadow=\"md\" my=\"3\">\n  Highlighted panel.\n</pura-box>\n\n<!-- Centered, full-width container -->\n<pura-box px=\"6\" py=\"3\" mx=\"auto\" w=\"full\">\n  Centered content.\n</pura-box>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "breadcrumb",
  "title": "Breadcrumb",
  "category": "Navigation",
  "blurb": "Navigation trail that shows the current page's location within the site hierarchy.",
  "description": "The Breadcrumb is a native web component that displays the navigation hierarchy as a trail of links separated by an automatically inserted \"/\" chevron. Use it to indicate where the user is within the site structure and let them quickly jump back to previous levels. It's composed of `pura-breadcrumb` (the nav/ol container) and `pura-breadcrumb-item` (each crumb).",
  "attributes": [
    {
      "name": "href",
      "type": "string",
      "default": "",
      "desc": "On pura-breadcrumb-item: renders the crumb as a link (<a>) to the given URL."
    },
    {
      "name": "current",
      "type": "boolean",
      "default": "false",
      "desc": "On pura-breadcrumb-item: marks the current page (aria-current=page) and renders it as highlighted text, without a link."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "demoHTML": "<pura-breadcrumb>\n  <pura-breadcrumb-item href=\"/\">Home</pura-breadcrumb-item>\n  <pura-breadcrumb-item href=\"/produtos\">Products</pura-breadcrumb-item>\n  <pura-breadcrumb-item href=\"/produtos/calcados\">Footwear</pura-breadcrumb-item>\n  <pura-breadcrumb-item current>Running shoes</pura-breadcrumb-item>\n</pura-breadcrumb>",
  "usage": "<pura-breadcrumb>\n  <pura-breadcrumb-item href=\"/\">Home</pura-breadcrumb-item>\n  <pura-breadcrumb-item href=\"/produtos\">Products</pura-breadcrumb-item>\n  <pura-breadcrumb-item href=\"/produtos/calcados\">Footwear</pura-breadcrumb-item>\n  <pura-breadcrumb-item current>Running shoes</pura-breadcrumb-item>\n</pura-breadcrumb>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "code-block",
      "title": "Code Block"
    },
    {
      "slug": "reactions",
      "title": "Reactions"
    },
    {
      "slug": "scroll-spy",
      "title": "Scroll Spy"
    },
    {
      "slug": "toggle",
      "title": "Toggle"
    },
    {
      "slug": "prose",
      "title": "Typography"
    },
    {
      "slug": "sidebar",
      "title": "Sidebar"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "app-shell",
      "title": "App Shell"
    },
    {
      "slug": "blog-post",
      "title": "Blog Post"
    }
  ]
},
{
  "slug": "burger",
  "title": "Burger",
  "category": "Navigation",
  "blurb": "A hamburger menu toggle button that animates between a hamburger glyph and an X, dispatching a change event on every toggle.",
  "description": "A hamburger menu toggle button that animates between a hamburger glyph and an X, dispatching a change event on every toggle.",
  "attributes": [
    {
      "name": "open",
      "type": "boolean",
      "default": "",
      "desc": "Reflects the toggled open state"
    },
    {
      "name": "size",
      "type": "string",
      "default": "1.5rem",
      "desc": "CSS length for the glyph box"
    },
    {
      "name": "label",
      "type": "string",
      "default": "",
      "desc": "Accessible label (i18n default \"Menu\")"
    }
  ],
  "events": [
    "change"
  ],
  "slots": [],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "button-group",
  "title": "Button Group",
  "category": "Form",
  "blurb": "Groups multiple buttons into a single segmented control.",
  "description": "Button Group is a native web component that joins adjacent pura-button elements, collapsing borders and rounded corners so the set reads as a single segmented control. Use it to group related actions (such as filters, view toggles, or mutually linked options) side by side. Supports horizontal (default) or vertical orientation.",
  "attributes": [
    {
      "name": "orientation",
      "type": "string",
      "default": "horizontal",
      "desc": "Grouping direction: \"horizontal\" (default) or \"vertical\"."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "demoHTML": "<pura-button-group>\n  <pura-button>Day</pura-button>\n  <pura-button>Week</pura-button>\n  <pura-button>Month</pura-button>\n</pura-button-group>\n\n<pura-button-group orientation=\"vertical\">\n  <pura-button>Profile</pura-button>\n  <pura-button>Settings</pura-button>\n  <pura-button>Sign out</pura-button>\n</pura-button-group>",
  "usage": "<pura-button-group>\n  <pura-button>Day</pura-button>\n  <pura-button>Week</pura-button>\n  <pura-button>Month</pura-button>\n</pura-button-group>\n\n<pura-button-group orientation=\"vertical\">\n  <pura-button>Profile</pura-button>\n  <pura-button>Settings</pura-button>\n  <pura-button>Sign out</pura-button>\n</pura-button-group>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "pagination",
      "title": "Pagination"
    },
    {
      "slug": "table",
      "title": "Table"
    },
    {
      "slug": "dropdown-menu",
      "title": "Dropdown Menu"
    },
    {
      "slug": "select",
      "title": "Select"
    },
    {
      "slug": "input",
      "title": "Input"
    },
    {
      "slug": "avatar",
      "title": "Avatar"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "data-table",
      "title": "Data Table"
    }
  ]
},
{
  "slug": "button",
  "title": "Button",
  "category": "Form",
  "blurb": "Actionable button with variants, sizes, and a loading state.",
  "description": "`<pura-button>` is a native web component that renders a styled button for form and UI actions. It offers visual variants (primary, secondary, ghost, danger), sizes, and disabled and loading states. Use it whenever you need a consistent action trigger, with clicks automatically blocked while disabled or loading.",
  "attributes": [
    {
      "name": "variant",
      "type": "\"primary\" | \"secondary\" | \"ghost\" | \"danger\"",
      "default": "primary",
      "desc": "Visual style of the button."
    },
    {
      "name": "size",
      "type": "\"sm\" | \"md\" | \"lg\"",
      "default": "md",
      "desc": "Size of the button."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables the button and blocks clicks."
    },
    {
      "name": "loading",
      "type": "boolean",
      "default": "false",
      "desc": "Shows the spinner, sets aria-busy, and blocks clicks."
    },
    {
      "name": "full",
      "type": "boolean",
      "default": "false",
      "desc": "Makes the button span the full available width."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "demoHTML": "<div style=\"display:flex; gap:.75rem; flex-wrap:wrap; align-items:center\">\n  <pura-button>Save</pura-button>\n  <pura-button variant=\"secondary\">Cancel</pura-button>\n  <pura-button variant=\"ghost\">Details</pura-button>\n  <pura-button variant=\"danger\">Delete</pura-button>\n  <pura-button loading>Sending</pura-button>\n  <pura-button disabled>Unavailable</pura-button>\n  <pura-button size=\"sm\">Small</pura-button>\n  <pura-button size=\"lg\">Large</pura-button>\n</div>",
  "usage": "<div style=\"display:flex; gap:.75rem; flex-wrap:wrap; align-items:center\">\n  <pura-button>Save</pura-button>\n  <pura-button variant=\"secondary\">Cancel</pura-button>\n  <pura-button variant=\"ghost\">Details</pura-button>\n  <pura-button variant=\"danger\">Delete</pura-button>\n  <pura-button loading>Sending</pura-button>\n  <pura-button disabled>Unavailable</pura-button>\n  <pura-button size=\"sm\">Small</pura-button>\n  <pura-button size=\"lg\">Large</pura-button>\n</div>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "card",
      "title": "Card"
    },
    {
      "slug": "input",
      "title": "Input"
    },
    {
      "slug": "empty",
      "title": "Empty"
    },
    {
      "slug": "field",
      "title": "Field"
    },
    {
      "slug": "select",
      "title": "Select"
    },
    {
      "slug": "separator",
      "title": "Separator"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "app-shell",
      "title": "App Shell"
    },
    {
      "slug": "calendar-app",
      "title": "Calendar"
    },
    {
      "slug": "checkout",
      "title": "Checkout"
    },
    {
      "slug": "data-table",
      "title": "Data Table"
    },
    {
      "slug": "error-404",
      "title": "404"
    },
    {
      "slug": "kanban",
      "title": "Kanban"
    },
    {
      "slug": "landing",
      "title": "Landing"
    },
    {
      "slug": "login",
      "title": "Login"
    },
    {
      "slug": "notifications",
      "title": "Notifications"
    },
    {
      "slug": "onboarding",
      "title": "Onboarding"
    },
    {
      "slug": "pricing",
      "title": "Pricing"
    },
    {
      "slug": "profile",
      "title": "Profile"
    },
    {
      "slug": "settings",
      "title": "Settings"
    },
    {
      "slug": "signup",
      "title": "Sign Up"
    }
  ]
},
{
  "slug": "calendar",
  "title": "Calendar",
  "category": "Date",
  "blurb": "Month calendar with date selection, navigation, and accessible keyboard support.",
  "description": "A native web component that renders a monthly calendar with a month/year header, previous/next month navigation buttons, a localized weekday row, and a 7-column grid. Selecting a day (click or Enter/Space) updates the value attribute and fires the change event; the arrow keys move focus between days, crossing months at the edges. Use it when you need an inline, accessible date picker with no dependencies.",
  "attributes": [
    {
      "name": "value",
      "type": "string",
      "default": "\"\"",
      "desc": "Selected day in yyyy-mm-dd format; reflects the user's selection."
    },
    {
      "name": "month",
      "type": "string",
      "default": "current month (yyyy-mm)",
      "desc": "Displayed month in yyyy-mm format; defaults to the current month."
    }
  ],
  "events": [
    "change"
  ],
  "slots": [],
  "demoHTML": "<pura-calendar value=\"2026-05-29\" month=\"2026-05\"></pura-calendar>",
  "usage": "<pura-calendar value=\"2026-05-29\" month=\"2026-05\"></pura-calendar>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "dialog",
      "title": "Dialog"
    },
    {
      "slug": "toast",
      "title": "Toast"
    },
    {
      "slug": "segmented-control",
      "title": "Segmented Control"
    },
    {
      "slug": "item",
      "title": "Item"
    },
    {
      "slug": "select",
      "title": "Select"
    },
    {
      "slug": "input",
      "title": "Input"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "calendar-app",
      "title": "Calendar"
    }
  ]
},
{
  "slug": "card",
  "title": "Card",
  "category": "Display",
  "blurb": "Surface container with optional header, body and footer.",
  "description": "Card is a native web component that groups related content onto a surface with a border, rounded corners and a shadow. Use it to highlight blocks of information, summaries or grouped actions. The header and footer slots hide automatically when empty, and the hover attribute adds an elevation on mouse over.",
  "attributes": [
    {
      "name": "hover",
      "type": "boolean",
      "default": "false",
      "desc": "Elevates the card (larger shadow and a slight translation) on mouse over."
    }
  ],
  "events": [],
  "slots": [
    "default",
    "header",
    "footer"
  ],
  "demoHTML": "<pura-card hover>\n  <span slot=\"header\">Pro Plan</span>\n  Unlimited access to all features, priority support and advanced reports for your team.\n  <div slot=\"footer\">\n    <pura-button variant=\"primary\">Subscribe</pura-button>\n    <pura-button variant=\"ghost\">Learn more</pura-button>\n  </div>\n</pura-card>",
  "usage": "<pura-card hover>\n  <span slot=\"header\">Pro Plan</span>\n  Unlimited access to all features, priority support and advanced reports for your team.\n  <div slot=\"footer\">\n    <pura-button variant=\"primary\">Subscribe</pura-button>\n    <pura-button variant=\"ghost\">Learn more</pura-button>\n  </div>\n</pura-card>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "checkbox",
      "title": "Checkbox"
    },
    {
      "slug": "field",
      "title": "Field"
    },
    {
      "slug": "separator",
      "title": "Separator"
    },
    {
      "slug": "stepper",
      "title": "Stepper"
    },
    {
      "slug": "stat",
      "title": "Stat"
    },
    {
      "slug": "stat-grid",
      "title": "Stat Grid"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "checkout",
      "title": "Checkout"
    },
    {
      "slug": "kanban",
      "title": "Kanban"
    },
    {
      "slug": "landing",
      "title": "Landing"
    },
    {
      "slug": "login",
      "title": "Login"
    },
    {
      "slug": "onboarding",
      "title": "Onboarding"
    },
    {
      "slug": "profile",
      "title": "Profile"
    },
    {
      "slug": "signup",
      "title": "Sign Up"
    }
  ]
},
{
  "slug": "carousel",
  "title": "Carousel",
  "category": "Layout",
  "blurb": "Carousel with horizontal scroll-snap, navigation arrows, and dot indicators.",
  "description": "Carousel is a native web component that arranges the slides passed as children into a horizontal track with scroll-snap. It includes next/previous buttons, clickable dot indicators, and keyboard navigation (left/right arrows). Use it to showcase images, testimonials, or cards in a compact space, optionally showing more than one slide at a time with per-view.",
  "attributes": [
    {
      "name": "loop",
      "type": "boolean",
      "default": "false",
      "desc": "Allows wrapping from the last slide to the first and vice versa."
    },
    {
      "name": "hide-dots",
      "type": "boolean",
      "default": "false",
      "desc": "Hides the row of dot indicators."
    },
    {
      "name": "hide-controls",
      "type": "boolean",
      "default": "false",
      "desc": "Hides the next/previous arrow buttons."
    },
    {
      "name": "per-view",
      "type": "number",
      "default": "1",
      "desc": "Number of slides visible at the same time (sets the width of each slide)."
    },
    {
      "name": "label",
      "type": "string",
      "default": "\"Carousel\"",
      "desc": "Accessible label (aria-label) for the carousel region."
    }
  ],
  "events": [
    "change"
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "<pura-carousel label=\"Highlights\" loop style=\"max-width: 420px\">\n  <div style=\"display:grid;place-items:center;height:200px;background:var(--pura-subtle);border-radius:8px;font-size:1.25rem\">\n    Beach at sunrise\n  </div>\n  <div style=\"display:grid;place-items:center;height:200px;background:var(--pura-subtle);border-radius:8px;font-size:1.25rem\">\n    Mountain trail\n  </div>\n  <div style=\"display:grid;place-items:center;height:200px;background:var(--pura-subtle);border-radius:8px;font-size:1.25rem\">\n    City at night\n  </div>\n</pura-carousel>",
  "usage": "<pura-carousel label=\"Highlights\" loop style=\"max-width: 420px\">\n  <div style=\"display:grid;place-items:center;height:200px;background:var(--pura-subtle);border-radius:8px;font-size:1.25rem\">\n    Beach at sunrise\n  </div>\n  <div style=\"display:grid;place-items:center;height:200px;background:var(--pura-subtle);border-radius:8px;font-size:1.25rem\">\n    Mountain trail\n  </div>\n  <div style=\"display:grid;place-items:center;height:200px;background:var(--pura-subtle);border-radius:8px;font-size:1.25rem\">\n    City at night\n  </div>\n</pura-carousel>",
  "animation": true,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "cascader",
  "title": "Cascader",
  "category": "Form",
  "blurb": "A multi-level cascading select that lets the user drill through nested option columns to pick a leaf path.",
  "description": "A multi-level cascading select that lets the user drill through nested option columns to pick a leaf path.",
  "attributes": [
    {
      "name": "placeholder",
      "type": "string",
      "default": "",
      "desc": "Trigger placeholder text"
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "",
      "desc": "Disables the trigger"
    },
    {
      "name": "change-on-select",
      "type": "boolean",
      "default": "",
      "desc": "Also fire change on non-leaf selection"
    },
    {
      "name": "expand-trigger",
      "type": "string",
      "default": "click",
      "desc": "How to expand child columns: \"click\" or \"hover\""
    },
    {
      "name": "data",
      "type": "string",
      "default": "",
      "desc": "JSON nested array of {value,label,children} items"
    }
  ],
  "events": [
    "change"
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "center",
  "title": "Center",
  "category": "Primitives",
  "blurb": "Centers its slotted content horizontally and vertically using a CSS grid.",
  "description": "A layout primitive that places its content dead-center within itself. Use the axis attribute to constrain centering to a single direction, and min-h to give it a minimum height for hero sections or full-viewport blocks. Theming flows through standard var(--pura-*) tokens.",
  "attributes": [
    {
      "name": "axis",
      "type": "\"both\" | \"x\" | \"y\"",
      "default": "both",
      "desc": "Which axis to center on. \"both\" centers in both directions, \"x\" centers horizontally while keeping content top-aligned, and \"y\" centers vertically while keeping content left-aligned."
    },
    {
      "name": "min-h",
      "type": "CSS length",
      "default": "auto",
      "desc": "Minimum height of the centering area as any CSS length (e.g. 100vh, 320px). Useful for heroes and full-viewport sections."
    }
  ],
  "events": [],
  "slots": [
    "default — the content to center"
  ],
  "demoHTML": "<script type=\"module\" src=\"/pura/lib/center.js\"></script>\n\n<div style=\"width:100%;display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:var(--pura-space-4)\">\n\n  <!-- Both axes: content sits dead-center -->\n  <pura-center min-h=\"200px\" style=\"background:var(--pura-subtle);border:1px solid var(--pura-border);border-radius:var(--pura-radius-lg);padding:var(--pura-space-4)\">\n    <div style=\"text-align:center\">\n      <strong style=\"display:block;font-size:var(--pura-text-lg);color:var(--pura-fg)\">Welcome aboard</strong>\n      <span style=\"color:var(--pura-muted-fg);font-size:var(--pura-text-sm)\">Centered on both axes</span>\n    </div>\n  </pura-center>\n\n  <!-- axis=\"x\": horizontal only, content stays at the top -->\n  <pura-center axis=\"x\" min-h=\"200px\" style=\"background:var(--pura-subtle);border:1px solid var(--pura-border);border-radius:var(--pura-radius-lg);padding:var(--pura-space-4)\">\n    <span style=\"padding:var(--pura-space-2) var(--pura-space-3);background:var(--pura-bg);border:1px solid var(--pura-border);border-radius:var(--pura-radius-full);font-size:var(--pura-text-sm);color:var(--pura-fg)\">axis=&quot;x&quot; &middot; top</span>\n  </pura-center>\n\n  <!-- axis=\"y\": vertical only, content stays on the left -->\n  <pura-center axis=\"y\" min-h=\"200px\" style=\"background:var(--pura-subtle);border:1px solid var(--pura-border);border-radius:var(--pura-radius-lg);padding:var(--pura-space-4)\">\n    <span style=\"padding:var(--pura-space-2) var(--pura-space-3);background:var(--pura-bg);border:1px solid var(--pura-border);border-radius:var(--pura-radius-full);font-size:var(--pura-text-sm);color:var(--pura-fg)\">axis=&quot;y&quot; &middot; left</span>\n  </pura-center>\n\n</div>",
  "usage": "<script type=\"module\" src=\"/pura/lib/center.js\"></script>\n\n<!-- Full-viewport splash screen -->\n<pura-center min-h=\"100vh\">\n  <div style=\"text-align: center;\">\n    <h1>Loading your workspace</h1>\n    <p>Hang tight, this only takes a moment.</p>\n  </div>\n</pura-center>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "chart",
  "title": "Chart",
  "category": "Display",
  "blurb": "A pure-SVG multi-series chart supporting line, bar, and area types with no external dependencies.",
  "description": "A pure-SVG multi-series chart supporting line, bar, and area types with no external dependencies.",
  "attributes": [
    {
      "name": "type",
      "type": "string",
      "default": "line",
      "desc": "Chart type: \"line\", \"bar\", or \"area\""
    },
    {
      "name": "data",
      "type": "string",
      "default": "",
      "desc": "JSON series payload: array of numbers or array of {label,values} objects"
    },
    {
      "name": "width",
      "type": "number",
      "default": "480",
      "desc": "Chart width in px"
    },
    {
      "name": "height",
      "type": "number",
      "default": "240",
      "desc": "Chart height in px"
    },
    {
      "name": "smooth",
      "type": "boolean",
      "default": "",
      "desc": "Curved line/area paths"
    },
    {
      "name": "labels",
      "type": "string",
      "default": "",
      "desc": "Comma list of x-axis tick labels"
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "chat-bubble",
  "title": "Chat Bubble",
  "category": "Display",
  "blurb": "A single chat message bubble, aligned according to who sent it.",
  "description": "Chat Bubble renders a single chat message aligned to the left (received) or to the right (sent), with an optional avatar and timestamp. Use it to build conversation threads, support histories or messaging interfaces. The agent-native layer exposes role=\"listitem\" and data-* attributes (data-side, data-time, data-has-avatar) plus an aria-label that summarizes direction, content and time, making the message readable by screen readers and AI agents.",
  "attributes": [
    {
      "name": "side",
      "type": "string",
      "default": "received",
      "desc": "Direction of the message: received (default, aligns left with a subtle background) or sent (aligns right with the primary color)."
    },
    {
      "name": "time",
      "type": "string",
      "default": "",
      "desc": "Optional timestamp shown below the message. Also populated in data-time and in the aria-label."
    },
    {
      "name": "tail",
      "type": "boolean",
      "default": "false",
      "desc": "When present, draws a small tail pointing toward the side of the speaker."
    }
  ],
  "events": [],
  "slots": [
    "(default)",
    "avatar"
  ],
  "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:0.5rem;max-width:32rem\">\n  <pura-chat-bubble side=\"received\" time=\"2:32 PM\" tail>\n    <span slot=\"avatar\">MJ</span>\n    Hi! Did you see the proposal I sent yesterday?\n  </pura-chat-bubble>\n  <pura-chat-bubble side=\"sent\" time=\"2:33 PM\" tail>\n    I did, it looks great. I'll approve it later today.\n  </pura-chat-bubble>\n  <pura-chat-bubble side=\"received\" time=\"2:35 PM\" tail>\n    <span slot=\"avatar\">MJ</span>\n    Perfect, just let me know here if anything comes up.\n  </pura-chat-bubble>\n</div>",
  "usage": "<div style=\"display:flex;flex-direction:column;gap:0.5rem;max-width:32rem\">\n  <pura-chat-bubble side=\"received\" time=\"2:32 PM\" tail>\n    <span slot=\"avatar\">MJ</span>\n    Hi! Did you see the proposal I sent yesterday?\n  </pura-chat-bubble>\n  <pura-chat-bubble side=\"sent\" time=\"2:33 PM\" tail>\n    I did, it looks great. I'll approve it later today.\n  </pura-chat-bubble>\n  <pura-chat-bubble side=\"received\" time=\"2:35 PM\" tail>\n    <span slot=\"avatar\">MJ</span>\n    Perfect, just let me know here if anything comes up.\n  </pura-chat-bubble>\n</div>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "chat-input",
      "title": "Chat Input"
    },
    {
      "slug": "presence",
      "title": "Presence"
    },
    {
      "slug": "item",
      "title": "Item"
    },
    {
      "slug": "avatar",
      "title": "Avatar"
    },
    {
      "slug": "badge",
      "title": "Badge"
    },
    {
      "slug": "inspector",
      "title": "Inspector"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "chat",
      "title": "Chat"
    }
  ]
},
{
  "slug": "chat-input",
  "title": "Chat Input",
  "category": "Form",
  "blurb": "Chat composer with an auto-expanding textarea and a send button, where Enter sends and Shift+Enter inserts a line break.",
  "description": "Chat Input is a message composer built on a native <textarea>, ensuring reliable IME, keyboard, accessibility, and form semantics. Use it when you need a chat-style input box: Enter fires the send event with the text and clears the field, Shift+Enter inserts a line break, and the actions slot allows extra controls such as attach file. It also exposes an agent-native layer: a stable data-pura-chat-input id on the host and a global window.__puraChatInputs registry that maps each instance to a live handle (value, send(), clear(), focus()), letting agents and tools read the draft and operate the composer without piercing the shadow root.",
  "attributes": [
    {
      "name": "placeholder",
      "type": "string",
      "default": "",
      "desc": "Placeholder text for the textarea."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Blocks typing and sending; applies aria-disabled and disables the textarea and button."
    },
    {
      "name": "value",
      "type": "string",
      "default": "",
      "desc": "Current draft text; mirrored back to the host attribute on every keystroke."
    },
    {
      "name": "maxlength",
      "type": "number",
      "default": "",
      "desc": "Character limit passed through to the textarea (optional)."
    },
    {
      "name": "send-label",
      "type": "string",
      "default": "Send message",
      "desc": "Accessible label (aria-label) for the send button."
    }
  ],
  "events": [
    "send",
    "input"
  ],
  "slots": [
    "actions"
  ],
  "demoHTML": "<pura-chat-input\n  id=\"composer\"\n  placeholder=\"Type a message...\"\n  send-label=\"Send message\"\n  maxlength=\"500\">\n  <button slot=\"actions\" type=\"button\" aria-label=\"Attach file\"\n    style=\"display:inline-grid;place-items:center;width:2.25rem;height:2.25rem;border:none;background:transparent;cursor:pointer;font-size:1.4rem;line-height:1;padding:0;border-radius:8px\">+</button>\n</pura-chat-input>\n<p id=\"log\" style=\"font:14px system-ui;color:#555;margin-top:.75rem\"></p>\n<script type=\"module\">\n  import \"/pura/lib/chat-input.js\";\n  const composer = document.getElementById(\"composer\");\n  const log = document.getElementById(\"log\");\n  composer.addEventListener(\"send\", (e) => {\n    log.textContent = \"Message sent: \" + e.detail.value;\n  });\n</script>",
  "usage": "<pura-chat-input\n  id=\"composer\"\n  placeholder=\"Type a message...\"\n  send-label=\"Send message\"\n  maxlength=\"500\">\n  <button slot=\"actions\" type=\"button\" aria-label=\"Attach file\"\n    style=\"display:inline-grid;place-items:center;width:2.25rem;height:2.25rem;border:none;background:transparent;cursor:pointer;font-size:1.4rem;line-height:1;padding:0;border-radius:8px\">+</button>\n</pura-chat-input>\n<script type=\"module\">\n  import \"/pura/lib/chat-input.js\";\n  const composer = document.getElementById(\"composer\");\n  composer.addEventListener(\"send\", (e) => {\n    console.log(\"send:\", e.detail.value);\n  });\n</script>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "chat-bubble",
      "title": "Chat Bubble"
    },
    {
      "slug": "presence",
      "title": "Presence"
    },
    {
      "slug": "item",
      "title": "Item"
    },
    {
      "slug": "avatar",
      "title": "Avatar"
    },
    {
      "slug": "badge",
      "title": "Badge"
    },
    {
      "slug": "inspector",
      "title": "Inspector"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "chat",
      "title": "Chat"
    }
  ]
},
{
  "slug": "checkbox",
  "title": "Checkbox",
  "category": "Form",
  "blurb": "Accessible checkbox for boolean options.",
  "description": "Native web component that renders a labeled checkbox, used for on/off options in forms. Supports checked and disabled states, keyboard navigation (Space/Enter), and ARIA attributes. Use it when the user needs to turn a single option on or off independently.",
  "attributes": [
    {
      "name": "checked",
      "type": "boolean",
      "default": "false",
      "desc": "Sets whether the box is checked; reflects the state and syncs aria-checked."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables interaction and removes keyboard focus."
    }
  ],
  "events": [
    "change"
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "<pura-checkbox checked>I accept the terms of use</pura-checkbox>\n<pura-checkbox>Receive news by email</pura-checkbox>\n<pura-checkbox disabled>Unavailable option</pura-checkbox>",
  "usage": "<pura-checkbox checked>I accept the terms of use</pura-checkbox>\n<pura-checkbox>Receive news by email</pura-checkbox>\n<pura-checkbox disabled>Unavailable option</pura-checkbox>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "field",
      "title": "Field"
    },
    {
      "slug": "meter",
      "title": "Meter"
    },
    {
      "slug": "card",
      "title": "Card"
    },
    {
      "slug": "input",
      "title": "Input"
    },
    {
      "slug": "stepper",
      "title": "Stepper"
    },
    {
      "slug": "switch",
      "title": "Switch"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "login",
      "title": "Login"
    },
    {
      "slug": "onboarding",
      "title": "Onboarding"
    },
    {
      "slug": "signup",
      "title": "Sign Up"
    }
  ]
},
{
  "slug": "code-block",
  "title": "Code Block",
  "category": "Display",
  "blurb": "Code block with a header, language label and a built-in copy button.",
  "description": "Displays code snippets in a <pre><code> with a monospaced font, a subtle background, horizontal scrolling and optional line numbering. Use it to show code examples with a filename, language label and one-click copy to the clipboard. It is agent-native: each instance registers itself in window.__puraCodeBlocks (a Map keyed by id) exposing { el, getText, copy, language, filename }, and reflects its state on the host via data-pura-code-block, data-language, data-filename, data-lines and data-numbered, so an agent can read and copy the content without touching the shadow DOM.",
  "attributes": [
    {
      "name": "language",
      "type": "string",
      "default": "",
      "desc": "Language label shown in the header (e.g. \"js\", \"css\"). Optional."
    },
    {
      "name": "filename",
      "type": "string",
      "default": "",
      "desc": "Filename shown in the header. Optional; it also becomes the block's aria-label."
    },
    {
      "name": "numbered",
      "type": "boolean",
      "default": "false",
      "desc": "When present, shows a gutter with line numbers."
    }
  ],
  "events": [
    "pura-copy"
  ],
  "slots": [
    "(default)"
  ],
  "demoHTML": "<pura-code-block id=\"cb-demo\" language=\"js\" filename=\"greeting.js\" numbered>function greet(name) {\n  console.log(`Hello, ${name}!`);\n}\n\ngreet(\"Andrew\");</pura-code-block>\n\n<script type=\"module\">\n  import \"/pura/lib/code-block.js\";\n  document.getElementById(\"cb-demo\").addEventListener(\"pura-copy\", (e) => {\n    console.log(\"Code copied:\", e.detail.text);\n  });\n</script>",
  "usage": "<pura-code-block id=\"cb-demo\" language=\"js\" filename=\"greeting.js\" numbered>function greet(name) {\n  console.log(`Hello, ${name}!`);\n}\n\ngreet(\"Andrew\");</pura-code-block>\n\n<script type=\"module\">\n  import \"/pura/lib/code-block.js\";\n  document.getElementById(\"cb-demo\").addEventListener(\"pura-copy\", (e) => {\n    console.log(\"Code copied:\", e.detail.text);\n  });\n</script>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "reactions",
      "title": "Reactions"
    },
    {
      "slug": "scroll-spy",
      "title": "Scroll Spy"
    },
    {
      "slug": "prose",
      "title": "Typography"
    },
    {
      "slug": "breadcrumb",
      "title": "Breadcrumb"
    },
    {
      "slug": "avatar",
      "title": "Avatar"
    },
    {
      "slug": "badge",
      "title": "Badge"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "blog-post",
      "title": "Blog Post"
    }
  ]
},
{
  "slug": "code",
  "title": "Code",
  "category": "Primitives",
  "blurb": "An inline code chip for rendering short snippets, identifiers, and keyboard input within text.",
  "description": "The pura-code primitive renders a single inline code element, styled as a subtle chip by default with a background, border, and monospaced font. Use the variant attribute to switch to a plain, bare monospace style with no chip decoration. Theming is driven entirely by var(--pura-*) tokens, and the inner element is exposed through the code part for custom styling.",
  "attributes": [
    {
      "name": "variant",
      "type": "\"subtle\" | \"plain\"",
      "default": "subtle",
      "desc": "Visual style. \"subtle\" (default) renders a chip with background, border, and padding; \"plain\" renders bare monospace text with no chip decoration."
    }
  ],
  "events": [],
  "slots": [
    "default — the code text to display"
  ],
  "demoHTML": "<script type=\"module\" src=\"/pura/lib/code.js\"></script>\n\n<p>Run <pura-code>npm install pura</pura-code> to add the library to your project.</p>\n\n<p>Set the <pura-code>--pura-accent</pura-code> token to recolor every component at once.</p>\n\n<p>Press <pura-code variant=\"plain\">Ctrl + S</pura-code> to save without the chip styling.</p>\n\n<p>The default export is <pura-code>PuraElement</pura-code>, a thin wrapper around <pura-code variant=\"plain\">HTMLElement</pura-code>.</p>",
  "usage": "<script type=\"module\" src=\"/pura/lib/code.js\"></script>\n\n<!-- Default subtle chip -->\n<pura-code>const value = 42;</pura-code>\n\n<!-- Plain variant: bare monospace text, no chip -->\n<pura-code variant=\"plain\">git status</pura-code>\n\n<!-- Inline within a sentence -->\n<p>Call <pura-code>render()</pura-code> to update the component.</p>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "collapsible",
  "title": "Collapsible",
  "category": "Disclosure",
  "blurb": "Lightweight show/hide region triggered by a clickable trigger.",
  "description": "Collapsible is a native web component (no dependencies) that reveals or hides a block of content when you click the trigger, with a smooth height animation. Use it when you need a single expandable region that's lighter than an accordion, such as showing optional details, simple FAQs, or advanced settings sections.",
  "attributes": [
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "desc": "When present, shows the content expanded."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables the trigger, preventing opening or closing."
    }
  ],
  "events": [
    "open",
    "close"
  ],
  "slots": [
    "trigger",
    "default"
  ],
  "demoHTML": "<pura-collapsible open>\n  <span slot=\"trigger\">Order details</span>\n  <p>Your order has been confirmed and will ship within 2 business days. You'll receive the tracking number by email as soon as the carrier picks up the package.</p>\n</pura-collapsible>",
  "usage": "<pura-collapsible open>\n  <span slot=\"trigger\">Order details</span>\n  <p>Your order has been confirmed and will ship within 2 business days. You'll receive the tracking number by email as soon as the carrier picks up the package.</p>\n</pura-collapsible>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "color-picker",
  "title": "Color Picker",
  "category": "Form",
  "blurb": "Swatch button that opens a popover with a preset palette, a native color picker, and a hex field.",
  "description": "Color Picker is a trigger that shows the current color and opens a popover (native Popover API + CSS anchor positioning) with a grid of predefined colors, a native input type=\"color\", and a hex text field. Use it in forms to choose a color with a manual hex-entry fallback. It is agent-native: it reflects state in stable attributes on the host (data-value, data-open, data-disabled), exposes the grid as role=\"listbox\" with aria-selected and roving tabindex, and registers each live instance in window.__puraColorPickers, letting agents read and manipulate the value programmatically.",
  "attributes": [
    {
      "name": "value",
      "type": "string",
      "default": "#000000",
      "desc": "Current color in hex (e.g. \"#2563eb\"). Accepts #rgb or #rrggbb forms and is normalized to lowercase #rrggbb; invalid values fall back to #000000. Reflected back to the attribute on change."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables the trigger and blocks interaction (pointer-events none, reduced opacity)."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Choose color",
      "desc": "Accessible name (aria-label) for the swatch button."
    }
  ],
  "events": [
    "change",
    "input"
  ],
  "slots": [],
  "demoHTML": "<div style=\"display:flex;align-items:center;gap:1rem;flex-wrap:wrap\">\n  <label style=\"font:inherit\">Brand color</label>\n  <pura-color-picker id=\"cp\" value=\"#2563eb\" label=\"Choose brand color\"></pura-color-picker>\n  <span id=\"saida\" style=\"font-family:monospace\">#2563eb</span>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/color-picker.js\";\n  const cp = document.getElementById(\"cp\");\n  const saida = document.getElementById(\"saida\");\n  cp.addEventListener(\"change\", (e) => { saida.textContent = e.detail.value; });\n  cp.addEventListener(\"input\", (e) => { saida.textContent = e.detail.value; });\n</script>",
  "usage": "<div style=\"display:flex;align-items:center;gap:1rem;flex-wrap:wrap\">\n  <label style=\"font:inherit\">Brand color</label>\n  <pura-color-picker id=\"cp\" value=\"#2563eb\" label=\"Choose brand color\"></pura-color-picker>\n  <span id=\"saida\" style=\"font-family:monospace\">#2563eb</span>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/color-picker.js\";\n  const cp = document.getElementById(\"cp\");\n  const saida = document.getElementById(\"saida\");\n  cp.addEventListener(\"change\", (e) => { saida.textContent = e.detail.value; });\n  cp.addEventListener(\"input\", (e) => { saida.textContent = e.detail.value; });\n</script>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "combobox",
  "title": "Combobox",
  "category": "Form",
  "blurb": "Autocomplete field that filters a list of options as the user types.",
  "description": "Native web component that turns <option> elements into a searchable selector: it renders an input that opens a listbox popover filtered by substring of the typed text, with keyboard navigation and selection by click. Use it when you have a known list of options and want to let the user quickly find and choose an item by typing part of the label. Built on the native Popover API and CSS anchor positioning, with no dependencies.",
  "attributes": [
    {
      "name": "placeholder",
      "type": "string",
      "default": "\"\"",
      "desc": "Placeholder text shown in the input when no value is selected."
    },
    {
      "name": "value",
      "type": "string",
      "default": "\"\"",
      "desc": "Initial/current value; must match the value of one of the options to populate the label."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables the input and prevents the listbox from opening."
    }
  ],
  "events": [
    "change"
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "<pura-combobox placeholder=\"Select a state...\" value=\"sp\">\n  <option value=\"sp\" label=\"São Paulo\"></option>\n  <option value=\"rj\" label=\"Rio de Janeiro\"></option>\n  <option value=\"mg\" label=\"Minas Gerais\"></option>\n  <option value=\"ba\" label=\"Bahia\"></option>\n  <option value=\"pr\" label=\"Paraná\"></option>\n  <option value=\"rs\" label=\"Rio Grande do Sul\"></option>\n  <option value=\"pe\" label=\"Pernambuco\"></option>\n  <option value=\"ce\" label=\"Ceará\"></option>\n</pura-combobox>",
  "usage": "<pura-combobox placeholder=\"Select a state...\" value=\"sp\">\n  <option value=\"sp\" label=\"São Paulo\"></option>\n  <option value=\"rj\" label=\"Rio de Janeiro\"></option>\n  <option value=\"mg\" label=\"Minas Gerais\"></option>\n  <option value=\"ba\" label=\"Bahia\"></option>\n  <option value=\"pr\" label=\"Paraná\"></option>\n  <option value=\"rs\" label=\"Rio Grande do Sul\"></option>\n  <option value=\"pe\" label=\"Pernambuco\"></option>\n  <option value=\"ce\" label=\"Ceará\"></option>\n</pura-combobox>\n\n<script type=\"module\">\n  const cb = document.querySelector(\"pura-combobox\");\n  cb.addEventListener(\"change\", (e) => {\n    console.log(\"selected:\", e.detail.value, e.detail.label);\n  });\n</script>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "command-registry",
  "title": "Command Registry",
  "category": "Agent",
  "blurb": "Invisible registry of page capabilities that exposes actions enumerable and invocable by AI agents and command palettes.",
  "description": "`<pura-command-registry>` is a headless (invisible) WebMCP-style component that collects child `<pura-command-action>` elements and publishes them in a global registry `window.__puraCommands`, letting an AI agent or command palette enumerate (`list()`) and run (`run(id, args)`) the page's capabilities programmatically. Each action carries machine-readable metadata (title, description, keywords) and also sets ARIA/`data-*` attributes so accessibility trees and tools can read the capabilities without touching the JS. Use it when you want to expose your UI's structured affordances to automation, agents, or a command palette without rendering anything visually.",
  "attributes": [
    {
      "name": "namespace",
      "type": "string",
      "default": "",
      "desc": "Prefixes the action ids in the global registry (e.g. \"account:save\"), avoiding collisions between registries. Applied on <pura-command-registry>."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "On <pura-command-registry>, hides all of this registry's actions from list()/get()/run(). On <pura-command-action>, marks the action as unavailable (cannot be invoked)."
    },
    {
      "name": "id",
      "type": "string",
      "default": "pura-cmd-N (auto)",
      "desc": "Action identifier for addressing; auto-generated if absent. Attribute of <pura-command-action>."
    },
    {
      "name": "title",
      "type": "string",
      "default": "",
      "desc": "Readable label for the action; also becomes aria-label. Attribute of <pura-command-action>."
    },
    {
      "name": "description",
      "type": "string",
      "default": "",
      "desc": "Machine-readable description of the action; also becomes aria-description. Attribute of <pura-command-action>."
    },
    {
      "name": "keywords",
      "type": "string",
      "default": "",
      "desc": "Search terms separated by spaces or commas, used by palettes/agents to find the action. Attribute of <pura-command-action>."
    },
    {
      "name": "when",
      "type": "string",
      "default": "",
      "desc": "CSS selector that must match in the document for the action to be enabled; otherwise it appears as disabled. Attribute of <pura-command-action>."
    }
  ],
  "events": [
    "register",
    "unregister",
    "run"
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "<div style=\"font-family:system-ui;display:flex;flex-direction:column;gap:12px;max-width:420px\">\n  <p style=\"margin:0;color:#555\">Invisible registry with 2 capabilities. The button lists and runs them via <code>window.__puraCommands</code>.</p>\n  <button id=\"run-cmds\" style=\"padding:8px 14px;border:1px solid #ccc;border-radius:8px;cursor:pointer\">Run agent commands</button>\n  <pre id=\"cmd-out\" style=\"background:#f5f5f5;border-radius:8px;padding:12px;margin:0;font-size:13px;white-space:pre-wrap\"></pre>\n\n  <pura-command-registry namespace=\"conta\">\n    <pura-command-action id=\"salvar\" title=\"Save profile\" description=\"Persists the user's profile changes\" keywords=\"save store profile\"></pura-command-action>\n    <pura-command-action id=\"exportar\" title=\"Export data\" description=\"Generates a file with the account data\" keywords=\"export download csv\"></pura-command-action>\n  </pura-command-registry>\n</div>\n\n<script type=\"module\">\n  import \"/pura/lib/command-registry.js\";\n\n  const reg = document.querySelector(\"pura-command-registry\");\n  reg.querySelector(\"#salvar\").handler = () => \"Profile saved successfully\";\n  reg.querySelector(\"#exportar\").handler = () => \"Export started\";\n\n  document.getElementById(\"run-cmds\").addEventListener(\"click\", () => {\n    const out = document.getElementById(\"cmd-out\");\n    const cmds = window.__puraCommands.list();\n    const lines = cmds.map(c => `- ${c.id}: ${c.title}`);\n    const r1 = window.__puraCommands.run(\"conta:salvar\");\n    const r2 = window.__puraCommands.run(\"conta:exportar\");\n    out.textContent =\n      \"Available commands:\\n\" + lines.join(\"\\n\") +\n      \"\\n\\nrun(conta:salvar) -> \" + r1 +\n      \"\\nrun(conta:exportar) -> \" + r2;\n  });\n</script>",
  "usage": "<pura-command-registry namespace=\"conta\">\n  <pura-command-action id=\"salvar\" title=\"Save profile\" description=\"Persists the user's profile changes\" keywords=\"save store profile\"></pura-command-action>\n  <pura-command-action id=\"exportar\" title=\"Export data\" description=\"Generates a file with the account data\" keywords=\"export download csv\"></pura-command-action>\n</pura-command-registry>\n\n<script type=\"module\">\n  import \"/pura/lib/command-registry.js\";\n\n  const reg = document.querySelector(\"pura-command-registry\");\n  // Give each action imperative behavior (optional):\n  reg.querySelector(\"#salvar\").handler = () => \"Profile saved successfully\";\n  reg.querySelector(\"#exportar\").handler = () => \"Export started\";\n\n  // An agent or command palette enumerates and invokes capabilities:\n  const commands = window.__puraCommands.list(); // [{ id: \"conta:salvar\", title, description, keywords, ... }]\n  const result = window.__puraCommands.run(\"conta:salvar\");\n\n  // React to any invocation (even without a handler):\n  reg.addEventListener(\"run\", (e) => {\n    console.log(\"command executed:\", e.detail.id, e.detail.args);\n  });\n</script>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "command",
  "title": "Command",
  "category": "Navigation",
  "blurb": "Command palette with substring search and keyboard navigation.",
  "description": "A native web component (zero dependencies) that renders a cmdk-style command palette: a search field at the top and a scrollable list of items below. Typing filters the items by substring, and the arrow keys, Enter, and Esc handle keyboard navigation. Use it for quick-action menus, command search, or, placed inside a pura-dialog, as a modal command menu.",
  "attributes": [
    {
      "name": "placeholder",
      "type": "string",
      "default": "Type a command or search…",
      "desc": "Text shown in the search field when it's empty."
    },
    {
      "name": "empty",
      "type": "string",
      "default": "No results found.",
      "desc": "Empty-state text shown when no item matches the search."
    },
    {
      "name": "value",
      "type": "string",
      "default": "\"\"",
      "desc": "Current search query (reflects the text typed in the input)."
    },
    {
      "name": "value (item)",
      "type": "string",
      "default": "\"\"",
      "desc": "On pura-command-item: value sent in the event detail and used for matching (falls back to the label text if absent)."
    },
    {
      "name": "disabled (item)",
      "type": "boolean",
      "default": "false",
      "desc": "On pura-command-item: disables the item, preventing selection and matching."
    }
  ],
  "events": [
    "command",
    "select"
  ],
  "slots": [
    "default",
    "shortcut"
  ],
  "demoHTML": "<pura-command id=\"cmd\" placeholder=\"Type a command or search…\" empty=\"No results found.\" style=\"max-width: 420px\">\n  <pura-command-item value=\"novo-arquivo\">\n    New file\n    <span slot=\"shortcut\">Ctrl N</span>\n  </pura-command-item>\n  <pura-command-item value=\"abrir\">\n    Open…\n    <span slot=\"shortcut\">Ctrl O</span>\n  </pura-command-item>\n  <pura-command-item value=\"salvar\">\n    Save\n    <span slot=\"shortcut\">Ctrl S</span>\n  </pura-command-item>\n  <pura-command-item value=\"configuracoes\">\n    Settings\n    <span slot=\"shortcut\">Ctrl ,</span>\n  </pura-command-item>\n  <pura-command-item value=\"sair\" disabled>\n    Quit\n  </pura-command-item>\n</pura-command>\n\n<script type=\"module\">\n  document.getElementById(\"cmd\").addEventListener(\"command\", (e) => {\n    console.log(\"command:\", e.detail.value, e.detail.label);\n  });\n</script>",
  "usage": "<pura-command id=\"cmd\" placeholder=\"Type a command or search…\" empty=\"No results found.\" style=\"max-width: 420px\">\n  <pura-command-item value=\"novo-arquivo\">\n    New file\n    <span slot=\"shortcut\">Ctrl N</span>\n  </pura-command-item>\n  <pura-command-item value=\"abrir\">\n    Open…\n    <span slot=\"shortcut\">Ctrl O</span>\n  </pura-command-item>\n  <pura-command-item value=\"salvar\">\n    Save\n    <span slot=\"shortcut\">Ctrl S</span>\n  </pura-command-item>\n  <pura-command-item value=\"configuracoes\">\n    Settings\n    <span slot=\"shortcut\">Ctrl ,</span>\n  </pura-command-item>\n  <pura-command-item value=\"sair\" disabled>\n    Quit\n  </pura-command-item>\n</pura-command>\n\n<script type=\"module\">\n  document.getElementById(\"cmd\").addEventListener(\"command\", (e) => {\n    console.log(\"command:\", e.detail.value, e.detail.label);\n  });\n</script>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "comment",
  "title": "Comment",
  "category": "Display",
  "blurb": "A comment in a threaded discussion, with avatar, author, timestamp and nested replies.",
  "description": "Displays a single comment with a header (author, timestamp, avatar with an initials fallback), a body and an optional row of actions. Nest pura-comment elements as children to create indented replies with an automatic connector line. Use it in comment sections, threads and discussion feeds. Agent-native layer: each instance exposes role=\"article\", stable data-* attributes (data-pura-component, data-author, data-time, data-depth, data-reply-count) and an aria-label summarizing author and body, plus it registers itself in window.__puraComments, allowing agents and screen readers to traverse the thread structure without touching the Shadow DOM.",
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
  "demoHTML": "<pura-comment author=\"Mary Stone\" time=\"2 hours ago\" avatar=\"https://i.pravatar.cc/64?img=47\">\n  I loved the new component API, it's so much simpler to use now.\n  <div slot=\"actions\">\n    <a href=\"#\">Reply</a>\n    <a href=\"#\">Like</a>\n  </div>\n\n  <pura-comment author=\"Andrew Ahlert\" time=\"1 hour ago\">\n    Agreed! The support for nested replies turned out great.\n    <div slot=\"actions\">\n      <a href=\"#\">Reply</a>\n    </div>\n  </pura-comment>\n</pura-comment>",
  "usage": "<pura-comment author=\"Mary Stone\" time=\"2 hours ago\" avatar=\"https://i.pravatar.cc/64?img=47\">\n  I loved the new component API, it's so much simpler to use now.\n  <div slot=\"actions\">\n    <a href=\"#\">Reply</a>\n    <a href=\"#\">Like</a>\n  </div>\n\n  <pura-comment author=\"Andrew Ahlert\" time=\"1 hour ago\">\n    Agreed! The support for nested replies turned out great.\n    <div slot=\"actions\">\n      <a href=\"#\">Reply</a>\n    </div>\n  </pura-comment>\n</pura-comment>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "confidence-meter",
  "title": "Confidence Meter",
  "category": "Display",
  "blurb": "A meter whose motion encodes an agent's confidence: the fill is the value, the shimmer cadence and a low-end jitter read as certainty. role=meter, SSR-safe, reduced-motion aware.",
  "description": "`<pura-confidence-meter>` is a `role=\"meter\"` whose *motion* carries an agent's confidence, not just its width. The fill shows the value; a specular shimmer sweeps slowly when confidence is high and flickers fast (with a faint jitter) when it is low, so a glance reads certainty before any number does. Drive it from `0..1` (a bare `75` is read as `0.75`), add an optional `state` phase label, and listen for `confidencechange` `{ value, level, state }`. Each instance registers in `window.__puraConfidenceMeters` by `data-pura-id`, and mirrors `data-pura-confidence-{value,level,state}` for agent inspection. Under reduced motion the bar rests while value, color, and ARIA still convey confidence.",
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
  "demoHTML": "<div style=\"display: grid; gap: 1.25rem; padding: 1rem; max-width: 320px;\">\n  <pura-confidence-meter value=\"0.92\" state=\"verified\" label=\"High\"></pura-confidence-meter>\n  <pura-confidence-meter value=\"0.55\" state=\"checking\" label=\"Moderate\"></pura-confidence-meter>\n  <pura-confidence-meter value=\"0.18\" state=\"guessing\" label=\"Low\"></pura-confidence-meter>\n</div>",
  "usage": "<pura-confidence-meter value=\"0.92\" label=\"Answer confidence\"></pura-confidence-meter>\n\n<script type=\"module\">\n  const m = document.querySelector('pura-confidence-meter');\n  m.addEventListener('confidencechange', (e) => console.log(e.detail)); // { value, level, state }\n  m.setValue(0.4);            // or: m.setAttribute('value', '40')\n  window.__puraConfidenceMeters;  // Map<data-pura-id, element>\n</script>",
  "animation": true,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "container",
  "title": "Container",
  "category": "Layout",
  "blurb": "Wrapper that observes its own width and reflects a breakpoint (xs/sm/md/lg) so content can adapt to container size rather than viewport size.",
  "description": "Container is an agent-native wrapper that uses ResizeObserver to measure its own width and exposes the current breakpoint via the data-size attribute (xs|sm|md|lg), working like a container query even where the CSS @container feature is not available. Use it when a block of content needs to react to the space it actually occupies (cards, panels, columns) instead of the window size. The machine-readable layer includes the global registry window.__puraContainers (a Map keyed by id, with size, width, el, and a query(size) helper), plus role=\"group\" and the reflected data-size/data-width attributes, so agents can enumerate each container and its current size.",
  "attributes": [
    {
      "name": "breakpoints",
      "type": "string",
      "default": "sm:384, md:640, lg:896",
      "desc": "Custom min-width thresholds in px as a comma-separated list, e.g. \"sm:480, md:768, lg:1024\". Anything below the smallest becomes xs."
    },
    {
      "name": "center",
      "type": "boolean",
      "default": "false",
      "desc": "Horizontally centers the inner box (margin-inline auto)."
    },
    {
      "name": "max",
      "type": "string",
      "default": "(none)",
      "desc": "Optional max-width for the inner box (any CSS length, e.g. \"72rem\"); without it the container is fluid (100%)."
    },
    {
      "name": "pad",
      "type": "boolean",
      "default": "false",
      "desc": "Applies symmetric inline padding that scales with the current breakpoint."
    },
    {
      "name": "label",
      "type": "string",
      "default": "(none)",
      "desc": "aria-label exposed on the host region."
    }
  ],
  "events": [
    "pura-container:resize"
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "<pura-container id=\"demo-container\" center pad max=\"48rem\" label=\"Product card\" style=\"border:1px solid var(--pura-border, #e5e7eb); border-radius:12px; background:#fff;\">\n  <div style=\"display:flex; gap:16px; flex-wrap:wrap; align-items:center; padding:16px 0;\">\n    <div style=\"flex:1; min-width:180px;\">\n      <h3 style=\"margin:0 0 4px;\">Aurora wireless headphones</h3>\n      <p style=\"margin:0; color:#6b7280;\">Noise cancellation and 30h of battery life.</p>\n    </div>\n    <strong style=\"font-size:1.25rem;\">$499.00</strong>\n  </div>\n  <p id=\"demo-status\" style=\"margin:0; font-size:.85rem; color:#2563eb;\">Measuring container size...</p>\n</pura-container>\n<script type=\"module\">\n  import \"/pura/lib/container.js\";\n  const c = document.getElementById(\"demo-container\");\n  const status = document.getElementById(\"demo-status\");\n  c.addEventListener(\"pura-container:resize\", (e) => {\n    status.textContent = `Current breakpoint: ${e.detail.size} (${e.detail.width}px)`;\n  });\n</script>",
  "usage": "<pura-container id=\"product\" center pad max=\"48rem\" label=\"Product card\">\n  <div style=\"display:flex; gap:16px; flex-wrap:wrap; align-items:center;\">\n    <div style=\"flex:1; min-width:180px;\">\n      <h3>Aurora wireless headphones</h3>\n      <p>Noise cancellation and 30h of battery life.</p>\n    </div>\n    <strong>$499.00</strong>\n  </div>\n</pura-container>\n<script type=\"module\">\n  import \"/pura/lib/container.js\";\n  const c = document.getElementById(\"product\");\n  c.addEventListener(\"pura-container:resize\", (e) => {\n    console.log(\"new breakpoint:\", e.detail.size, e.detail.width);\n  });\n  // Agents can also read every container on the page:\n  // window.__puraContainers.query(\"lg\")\n</script>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "context-menu",
  "title": "Context Menu",
  "category": "Overlay",
  "blurb": "Right-click menu that opens a floating panel at the pointer position.",
  "description": "A native web component (zero dependencies) that wraps a region and, on receiving the contextmenu event (right-click), opens a menu panel as a native popover positioned at the pointer coordinates. Use it when you need to offer contextual actions on an element or area, with keyboard navigation, light dismiss and ESC-to-close already included. The items are pura-menu-item elements passed through the \"menu\" slot.",
  "attributes": [
    {
      "name": "target",
      "type": "boolean",
      "default": "false",
      "desc": "Makes the host itself the contextmenu target instead of the default slot region."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables opening the menu on contextmenu."
    },
    {
      "name": "variant",
      "type": "string (default | danger)",
      "default": "default",
      "desc": "Attribute of pura-menu-item: item style, danger uses the danger color."
    },
    {
      "name": "inset",
      "type": "boolean",
      "default": "false",
      "desc": "Attribute of pura-menu-item: adds left indentation to align items without an icon."
    }
  ],
  "events": [
    "open",
    "close",
    "select"
  ],
  "slots": [
    "default",
    "menu",
    "icon",
    "shortcut"
  ],
  "demoHTML": "<pura-context-menu id=\"cm-demo\">\n  <div style=\"display:grid;place-items:center;height:160px;border:1px dashed var(--pura-border);border-radius:var(--pura-radius);color:var(--pura-muted)\">\n    Right-click here\n  </div>\n\n  <pura-menu-item slot=\"menu\">\n    Back\n    <span slot=\"shortcut\">Ctrl+[</span>\n  </pura-menu-item>\n  <pura-menu-item slot=\"menu\">\n    Reload\n    <span slot=\"shortcut\">Ctrl+R</span>\n  </pura-menu-item>\n  <pura-menu-item slot=\"menu\" disabled>Save as...</pura-menu-item>\n  <pura-menu-item slot=\"menu\" variant=\"danger\">Delete</pura-menu-item>\n</pura-context-menu>\n\n<script type=\"module\">\n  const cm = document.getElementById(\"cm-demo\");\n  cm.addEventListener(\"select\", (e) => {\n    console.log(\"Selected item:\", e.target.textContent.trim());\n  });\n</script>",
  "usage": "<pura-context-menu id=\"cm-demo\">\n  <div style=\"display:grid;place-items:center;height:160px;border:1px dashed var(--pura-border);border-radius:var(--pura-radius);color:var(--pura-muted)\">\n    Right-click here\n  </div>\n\n  <pura-menu-item slot=\"menu\">\n    Back\n    <span slot=\"shortcut\">Ctrl+[</span>\n  </pura-menu-item>\n  <pura-menu-item slot=\"menu\">\n    Reload\n    <span slot=\"shortcut\">Ctrl+R</span>\n  </pura-menu-item>\n  <pura-menu-item slot=\"menu\" disabled>Save as...</pura-menu-item>\n  <pura-menu-item slot=\"menu\" variant=\"danger\">Delete</pura-menu-item>\n</pura-context-menu>\n\n<script type=\"module\">\n  const cm = document.getElementById(\"cm-demo\");\n  cm.addEventListener(\"select\", (e) => {\n    console.log(\"Selected item:\", e.target.textContent.trim());\n  });\n</script>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "cookie-consent",
  "title": "Cookie Consent",
  "category": "Overlay",
  "blurb": "Cookie consent banner pinned to the viewport, with accept, decline and per-category preferences, that remembers the visitor's choice.",
  "description": "pura-cookie-consent is a cookie consent banner pinned to the edge of the viewport (or as a floating card) with accept, decline and preferences actions, plus an explanatory popover and a native dialog to choose categories. The choice is persisted in localStorage and the banner stays hidden while a decision is on record; use it when you need to collect cookie consent in a compliant way. It exposes an agent-native layer: data-pura-consent-* attributes mirror the live state on the host and each instance registers itself in window.__puraCookieConsents by its data-pura-id, allowing agents and tools to enumerate and control the consent without accessing the Shadow DOM.",
  "attributes": [
    {
      "name": "storage-key",
      "type": "string",
      "default": "pura-cookie-consent",
      "desc": "The localStorage key where the visitor's choice is stored."
    },
    {
      "name": "position",
      "type": "bottom | bottom-left | bottom-right | top",
      "default": "bottom",
      "desc": "Position of the banner. bottom/top span the width of the viewport; *-left / *-right render as a card."
    },
    {
      "name": "accept-label",
      "type": "string",
      "default": "Aceitar",
      "desc": "Label of the accept button."
    },
    {
      "name": "decline-label",
      "type": "string",
      "default": "Recusar",
      "desc": "Label of the decline button."
    },
    {
      "name": "settings-label",
      "type": "string",
      "default": "Preferências",
      "desc": "Label of the preferences/settings button."
    },
    {
      "name": "heading",
      "type": "string",
      "default": "",
      "desc": "Optional bold title shown above the message."
    },
    {
      "name": "no-settings",
      "type": "boolean",
      "default": "false",
      "desc": "Hides the Preferences button when present."
    },
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "desc": "Reflected by the component; present while the banner is visible (do not set it manually)."
    }
  ],
  "events": [
    "accept",
    "decline",
    "settings",
    "change"
  ],
  "slots": [
    "(default)",
    "categories"
  ],
  "demoHTML": "<pura-cookie-consent\n  id=\"consent\"\n  heading=\"Your privacy\"\n  position=\"bottom-right\"\n  accept-label=\"Accept all\"\n  decline-label=\"Decline\"\n  settings-label=\"Preferences\">\n  We use cookies to improve your experience and analyze traffic. You can accept, decline or adjust your preferences.\n</pura-cookie-consent>\n\n<p id=\"estado\" style=\"font:14px system-ui;color:#555\">Waiting for your choice...</p>\n<button id=\"reabrir\" type=\"button\">Review consent</button>\n\n<script type=\"module\">\n  import \"/pura/lib/cookie-consent.js\";\n  const consent = document.getElementById(\"consent\");\n  const estado = document.getElementById(\"estado\");\n  consent.addEventListener(\"change\", (e) => {\n    const cats = Object.entries(e.detail.categories)\n      .filter(([, on]) => on).map(([id]) => id).join(\", \");\n    estado.textContent = `Choice: ${e.detail.choice} (${cats})`;\n  });\n  document.getElementById(\"reabrir\").addEventListener(\"click\", () => consent.reset());\n</script>",
  "usage": "<pura-cookie-consent\n  id=\"consent\"\n  heading=\"Your privacy\"\n  position=\"bottom-right\"\n  accept-label=\"Accept all\"\n  decline-label=\"Decline\"\n  settings-label=\"Preferences\">\n  We use cookies to improve your experience and analyze traffic. You can accept, decline or adjust your preferences.\n</pura-cookie-consent>\n\n<p id=\"estado\" style=\"font:14px system-ui;color:#555\">Waiting for your choice...</p>\n<button id=\"reabrir\" type=\"button\">Review consent</button>\n\n<script type=\"module\">\n  import \"/pura/lib/cookie-consent.js\";\n  const consent = document.getElementById(\"consent\");\n  const estado = document.getElementById(\"estado\");\n  consent.addEventListener(\"change\", (e) => {\n    const cats = Object.entries(e.detail.categories)\n      .filter(([, on]) => on).map(([id]) => id).join(\", \");\n    estado.textContent = `Choice: ${e.detail.choice} (${cats})`;\n  });\n  document.getElementById(\"reabrir\").addEventListener(\"click\", () => consent.reset());\n</script>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "copy-button",
  "title": "Copy Button",
  "category": "Display",
  "blurb": "Button that copies text to the clipboard and shows a visual \"Copied\" feedback.",
  "description": "The `<pura-copy-button>` copies to the clipboard either a literal text (`value`) or the content of another element on the page (`target`), showing a check icon and the \"Copied\" label for about 1.2s. Use it to copy commands, API keys, links or code snippets with a single click. It has an agent-native layer: each instance mirrors its state in `data-pura-copy-*` attributes and registers itself in `window.__puraCopyButtons` (indexed by `data-pura-id`), letting agents enumerate and trigger copies via the `.copy()` method without touching the Shadow DOM.",
  "attributes": [
    {
      "name": "value",
      "type": "string",
      "default": "",
      "desc": "Literal text to be copied. Takes priority over target."
    },
    {
      "name": "target",
      "type": "string",
      "default": "",
      "desc": "CSS selector resolved against the document; copies the value (form fields) or the textContent of the matched node."
    },
    {
      "name": "timeout",
      "type": "number",
      "default": "1200",
      "desc": "Duration of the Copied feedback in milliseconds."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Makes the button non-interactive."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Copiar",
      "desc": "Accessible label (aria-label) for the icon-only button."
    }
  ],
  "events": [
    "copy",
    "error"
  ],
  "slots": [
    "(default)"
  ],
  "demoHTML": "<div style=\"display:flex; flex-direction:column; gap:1rem; max-width:420px; font-family:system-ui\">\n  <div style=\"display:flex; align-items:center; gap:.5rem\">\n    <code id=\"chave\" style=\"padding:.4rem .6rem; background:#f4f4f5; border-radius:6px; flex:1\">sk-pura-2f9a-7c41-d8e0</code>\n    <pura-copy-button target=\"#chave\" label=\"Copy key\"></pura-copy-button>\n  </div>\n\n  <pura-copy-button value=\"npm install pura\">Copy command</pura-copy-button>\n</div>\n\n<script type=\"module\">\n  import \"/pura/lib/copy-button.js\";\n</script>",
  "usage": "<div style=\"display:flex; align-items:center; gap:.5rem\">\n  <code id=\"chave\">sk-pura-2f9a-7c41-d8e0</code>\n  <pura-copy-button target=\"#chave\" label=\"Copy key\"></pura-copy-button>\n</div>\n\n<pura-copy-button value=\"npm install pura\">Copy command</pura-copy-button>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "copy-region",
  "title": "Copy Region",
  "category": "Agent",
  "blurb": "Wraps any region and makes it copyable with a single click, exposing itself as content extractable by agents.",
  "description": "Agent-native component that wraps slotted content and reveals, on hover or focus, a copy button that writes the region's text (or the `value` attribute) to the clipboard, with a floating confirmation and a live region for screen readers. Use it when you want to offer quick copying of code blocks, tokens, commands, or text. The machine-readable layer marks the host with `data-copyable`, `data-pura-copy`, `data-pura-copy-source`, and role/aria-roledescription, and registers each region in `window.__puraCopyRegions` (a Map with `id`, `el`, `text()`, `copy()`, `all()`), letting agents enumerate, read, and trigger the copy without piercing the Shadow DOM.",
  "attributes": [
    {
      "name": "value",
      "type": "string",
      "default": "",
      "desc": "Literal text to copy. When present, it wins over the slotted text (useful when the visible content differs from the payload)."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Copy",
      "desc": "Accessible label (aria-label) for the copy button."
    },
    {
      "name": "timeout",
      "type": "number",
      "default": "1400",
      "desc": "Confirmation duration in ms. Finite values >= 0 are accepted; otherwise it uses 1400."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Makes the region non-interactive: the button leaves the flow and copy() becomes a no-op."
    },
    {
      "name": "placement",
      "type": "\"top\" | \"bottom\" | \"left\" | \"right\"",
      "default": "top",
      "desc": "Position of the floating confirmation relative to the region. Invalid values are removed."
    }
  ],
  "events": [
    "copy",
    "error"
  ],
  "slots": [
    "(default)"
  ],
  "demoHTML": "<pura-copy-region value=\"npm install pura\" label=\"Copy command\" style=\"max-width:32rem\">\n  <pre style=\"margin:0;padding:1rem 1.25rem;background:#0f172a;color:#e2e8f0;border-radius:8px;font-family:ui-monospace,monospace;font-size:.9rem;overflow:auto\"><code>npm install pura</code></pre>\n</pura-copy-region>\n\n<p id=\"status-copy\" role=\"status\" style=\"margin-top:.75rem;font-size:.85rem;color:#475569\"></p>\n\n<script type=\"module\">\n  import \"/pura/lib/copy-region.js\";\n  const status = document.getElementById(\"status-copy\");\n  document.querySelector(\"pura-copy-region\").addEventListener(\"copy\", (e) => {\n    status.textContent = `Copied: ${e.detail.value}`;\n  });\n</script>",
  "usage": "<pura-copy-region value=\"npm install pura\" label=\"Copy command\" style=\"max-width:32rem\">\n  <pre style=\"margin:0;padding:1rem 1.25rem;background:#0f172a;color:#e2e8f0;border-radius:8px;font-family:ui-monospace,monospace;font-size:.9rem;overflow:auto\"><code>npm install pura</code></pre>\n</pura-copy-region>\n\n<p id=\"status-copy\" role=\"status\"></p>\n\n<script type=\"module\">\n  import \"/pura/lib/copy-region.js\";\n  const status = document.getElementById(\"status-copy\");\n  document.querySelector(\"pura-copy-region\").addEventListener(\"copy\", (e) => {\n    status.textContent = `Copied: ${e.detail.value}`;\n  });\n</script>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "count-up",
  "title": "Count Up",
  "category": "Display",
  "blurb": "Animates a number from a start to a target with eased counting, starts on view, jumps to the final value under reduced motion.",
  "description": "`<pura-count-up>` animates a number from `from` to `to` with eased counting. It starts on first view by default (IntersectionObserver), supports `decimals`, a thousands `separator`, and `prefix`/`suffix` for currency or percentages, and exposes `start()` / `reset()`. The server renders the final value so the number is correct and accessible without JS, and under reduced motion the client skips the tween and shows the target immediately. It mirrors the live number in `data-pura-count-up-value` and registers in `window.__puraCountUps` for agent enumeration.",
  "attributes": [
    {
      "name": "to",
      "type": "number",
      "default": "0",
      "desc": "Target number to count up (or down) to. Required."
    },
    {
      "name": "from",
      "type": "number",
      "default": "0",
      "desc": "Starting number."
    },
    {
      "name": "duration",
      "type": "number",
      "default": "token --pura-duration-6",
      "desc": "Tween length in milliseconds."
    },
    {
      "name": "decimals",
      "type": "number",
      "default": "0",
      "desc": "Fixed decimal places."
    },
    {
      "name": "separator",
      "type": "string",
      "default": "",
      "desc": "Thousands separator, e.g. \",\"."
    },
    {
      "name": "prefix",
      "type": "string",
      "default": "",
      "desc": "String prepended to the number, e.g. \"$\"."
    },
    {
      "name": "suffix",
      "type": "string",
      "default": "",
      "desc": "String appended to the number, e.g. \"%\"."
    },
    {
      "name": "start",
      "type": "\"view\" | \"load\" | \"manual\"",
      "default": "view",
      "desc": "When to begin: on first intersection, immediately on load, or only via start()."
    }
  ],
  "events": [
    "pura-count-up"
  ],
  "slots": [],
  "demoHTML": "<div style=\"display: flex; gap: 2.5rem; flex-wrap: wrap; font: 600 2rem system-ui;\">\n  <pura-count-up to=\"1284\" separator=\",\" duration=\"1500\"></pura-count-up>\n  <pura-count-up to=\"99.9\" decimals=\"1\" suffix=\"%\" duration=\"1500\"></pura-count-up>\n  <pura-count-up to=\"4200\" prefix=\"$\" separator=\",\" duration=\"1500\"></pura-count-up>\n</div>",
  "usage": "<pura-count-up to=\"1284\" separator=\",\"></pura-count-up>\n<pura-count-up to=\"99.9\" decimals=\"1\" suffix=\"%\"></pura-count-up>\n<pura-count-up to=\"4200\" prefix=\"$\" separator=\",\" duration=\"2000\"></pura-count-up>\n\n<!-- Trigger manually -->\n<pura-count-up to=\"500\" start=\"manual\" id=\"score\"></pura-count-up>\n<script>document.querySelector('#score').start();</script>",
  "animation": true,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "countdown",
  "title": "Countdown",
  "category": "Feedback",
  "blurb": "Countdown timer that counts down in days, hours, minutes, and seconds and fires an event when it reaches zero.",
  "description": "`<pura-countdown>` counts down to a target moment (an ISO date via `to`) or for a duration in seconds (`seconds`), updating every second and firing `tick` and, when it reaches zero, `complete`. Use it for limited-time offers, launches, deadlines, or \"coming soon\" pages, with a segmented or compact display. Agent-native layer: on every tick it mirrors its live state in stable `data-pura-countdown-*` attributes (remaining, days, hours, minutes, seconds, target, complete) and registers itself in `window.__puraCountdowns` by its `data-pura-id`, letting an agent read or enumerate every timer on the page without digging through the DOM.",
  "attributes": [
    {
      "name": "to",
      "type": "string",
      "default": "",
      "desc": "Target moment as an ISO datetime (e.g., \"2026-12-31T23:59:59Z\"). Takes priority over seconds."
    },
    {
      "name": "seconds",
      "type": "number",
      "default": "",
      "desc": "Duration in seconds from the moment of connection. An alternative to to; ignored when to is present."
    },
    {
      "name": "compact",
      "type": "boolean",
      "default": "false",
      "desc": "Displays on a single compact line (\"1d 02:03:04\") instead of separate segments."
    },
    {
      "name": "no-labels",
      "type": "boolean",
      "default": "false",
      "desc": "Hides the unit captions under each segment (segmented mode)."
    },
    {
      "name": "pad-days",
      "type": "boolean",
      "default": "false",
      "desc": "Pads the days value with a leading zero up to 2 digits."
    },
    {
      "name": "running",
      "type": "boolean",
      "default": "false",
      "desc": "Reflected and read-only: present while the timer is running."
    }
  ],
  "events": [
    "tick",
    "complete"
  ],
  "slots": [
    "complete"
  ],
  "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:1rem;align-items:flex-start\">\n  <p style=\"margin:0;font-weight:600\">Offer ends in:</p>\n  <pura-countdown seconds=\"90\" pad-days id=\"promo\">\n    <span slot=\"complete\">Offer ended!</span>\n  </pura-countdown>\n  <pura-countdown to=\"2026-12-31T23:59:59Z\" compact></pura-countdown>\n</div>",
  "usage": "<pura-countdown to=\"2026-12-31T23:59:59Z\" pad-days>\n  <span slot=\"complete\">Offer ended!</span>\n</pura-countdown>\n\n<!-- Compact variant from a duration -->\n<pura-countdown seconds=\"3600\" compact></pura-countdown>\n\n<!-- Programmatic control: start() / pause() / reset() -->\n<script type=\"module\">\n  import \"/pura/lib/countdown.js\";\n  const cd = document.querySelector(\"pura-countdown\");\n  cd.addEventListener(\"complete\", () => console.log(\"done\"));\n  cd.addEventListener(\"tick\", (e) => console.log(e.detail.total));\n</script>",
  "animation": true,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "cron",
  "title": "Cron",
  "category": "Form",
  "blurb": "A cron expression builder and visualizer for standard 5-field expressions, with a preset selector and live human-readable description.",
  "description": "A cron expression builder and visualizer for standard 5-field expressions, with a preset selector and live human-readable description.",
  "attributes": [
    {
      "name": "value",
      "type": "string",
      "default": "",
      "desc": "5-field cron expression string"
    },
    {
      "name": "mode",
      "type": "string",
      "default": "builder",
      "desc": "\"builder\" shows interactive fields; \"describe\" shows read-only description"
    }
  ],
  "events": [
    "change"
  ],
  "slots": [],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "data-table",
  "title": "Data Table",
  "category": "Display",
  "blurb": "An interactive layer over a slotted light-DOM <table> that adds column sorting, text search/filter, and client-side pagination.",
  "description": "An interactive layer over a slotted light-DOM <table> that adds column sorting, text search/filter, and client-side pagination.",
  "attributes": [
    {
      "name": "searchable",
      "type": "boolean",
      "default": "",
      "desc": "Show the search box and filter rows by visible text"
    },
    {
      "name": "page-size",
      "type": "number",
      "default": "",
      "desc": "Rows per page; unset or 0 disables pagination"
    },
    {
      "name": "striped",
      "type": "boolean",
      "default": "",
      "desc": "Apply zebra-stripe styling to visible body rows"
    }
  ],
  "events": [
    "sort",
    "filter"
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "date-picker",
  "title": "Date Picker",
  "category": "Date",
  "blurb": "Date field that opens a calendar in a popover to pick a day.",
  "description": "The Date Picker is a native web component (zero dependencies) that shows an input-style button with the selected date formatted (or a placeholder). When clicked, it opens a popover with a calendar; picking a day updates the value, closes the popover, and emits a change event. Use it when you need single-date selection in forms.",
  "attributes": [
    {
      "name": "value",
      "type": "string",
      "default": "\"\"",
      "desc": "Selected date in yyyy-mm-dd format; also available as the .value property."
    },
    {
      "name": "placeholder",
      "type": "string",
      "default": "\"Pick a date\"",
      "desc": "Text shown when no date is selected."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables the trigger and prevents the calendar from opening."
    }
  ],
  "events": [
    "change"
  ],
  "slots": [],
  "demoHTML": "<pura-date-picker value=\"2026-05-29\" placeholder=\"Pick a date\"></pura-date-picker>",
  "usage": "<pura-date-picker value=\"2026-05-29\" placeholder=\"Pick a date\"></pura-date-picker>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "date-range-picker",
  "title": "Date Range Picker",
  "category": "Date",
  "blurb": "A date range picker with a trigger that shows the formatted range and opens a popover with one or two month grids for selecting start and end dates.",
  "description": "A date range picker with a trigger that shows the formatted range and opens a popover with one or two month grids for selecting start and end dates.",
  "attributes": [
    {
      "name": "start",
      "type": "string",
      "default": "",
      "desc": "Start date in YYYY-MM-DD format"
    },
    {
      "name": "end",
      "type": "string",
      "default": "",
      "desc": "End date in YYYY-MM-DD format"
    },
    {
      "name": "months",
      "type": "number",
      "default": "2",
      "desc": "Number of month grids shown: 1 or 2"
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "",
      "desc": "Disables the trigger"
    }
  ],
  "events": [
    "change"
  ],
  "slots": [],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "datetime-picker",
  "title": "Datetime Picker",
  "category": "Date",
  "blurb": "A date and time picker that combines a calendar grid and hour/minute selects in a popover, with a value of \"YYYY-MM-DDTHH:MM\".",
  "description": "A date and time picker that combines a calendar grid and hour/minute selects in a popover, with a value of \"YYYY-MM-DDTHH:MM\".",
  "attributes": [
    {
      "name": "value",
      "type": "string",
      "default": "",
      "desc": "Date-time value in YYYY-MM-DDTHH:MM format"
    },
    {
      "name": "use24",
      "type": "boolean",
      "default": "",
      "desc": "Use 24-hour time format"
    },
    {
      "name": "minuteStep",
      "type": "number",
      "default": "5",
      "desc": "Minute select step interval"
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "",
      "desc": "Disables the trigger"
    }
  ],
  "events": [
    "change"
  ],
  "slots": [],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "dialog",
  "title": "Dialog",
  "category": "Overlay",
  "blurb": "Modal window built on the native dialog element, with backdrop, focus trapping, and ESC to close.",
  "description": "Dialog is a native web component that wraps the HTML dialog element to display content in a modal window, with backdrop, focus capture, and ESC-to-close included out of the box. Use it when you need to interrupt the flow to require an action or confirmation from the user, such as quick forms, alerts, or confirmation dialogs. Open and close it programmatically with the open() and close() methods or via the open attribute.",
  "attributes": [
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "desc": "Controls the visibility of the modal; when present, opens the dialog in modal mode."
    },
    {
      "name": "title",
      "type": "string",
      "default": "\"\"",
      "desc": "Text shown in the header when the header slot is not used."
    }
  ],
  "events": [
    "close"
  ],
  "slots": [
    "default",
    "header",
    "footer"
  ],
  "demoHTML": "<button id=\"abrir-dialog\">Open dialog</button>\n\n<pura-dialog id=\"meu-dialog\" title=\"Confirm deletion\">\n  <p>Are you sure you want to delete this item? This action cannot be undone.</p>\n  <div slot=\"footer\">\n    <button id=\"cancelar-dialog\">Cancel</button>\n    <button id=\"confirmar-dialog\">Delete</button>\n  </div>\n</pura-dialog>\n\n<script type=\"module\">\n  const dlg = document.getElementById(\"meu-dialog\");\n  document.getElementById(\"abrir-dialog\").addEventListener(\"click\", () => dlg.open());\n  document.getElementById(\"cancelar-dialog\").addEventListener(\"click\", () => dlg.close());\n  document.getElementById(\"confirmar-dialog\").addEventListener(\"click\", () => dlg.close());\n</script>",
  "usage": "<button id=\"abrir-dialog\">Open dialog</button>\n\n<pura-dialog id=\"meu-dialog\" title=\"Confirm deletion\">\n  <p>Are you sure you want to delete this item? This action cannot be undone.</p>\n  <div slot=\"footer\">\n    <button id=\"cancelar-dialog\">Cancel</button>\n    <button id=\"confirmar-dialog\">Delete</button>\n  </div>\n</pura-dialog>\n\n<script type=\"module\">\n  const dlg = document.getElementById(\"meu-dialog\");\n  document.getElementById(\"abrir-dialog\").addEventListener(\"click\", () => dlg.open());\n  document.getElementById(\"cancelar-dialog\").addEventListener(\"click\", () => dlg.close());\n  document.getElementById(\"confirmar-dialog\").addEventListener(\"click\", () => dlg.close());\n</script>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "calendar",
      "title": "Calendar"
    },
    {
      "slug": "toast",
      "title": "Toast"
    },
    {
      "slug": "segmented-control",
      "title": "Segmented Control"
    },
    {
      "slug": "item",
      "title": "Item"
    },
    {
      "slug": "select",
      "title": "Select"
    },
    {
      "slug": "input",
      "title": "Input"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "calendar-app",
      "title": "Calendar"
    }
  ]
},
{
  "slug": "diff-motion",
  "title": "Diff Motion",
  "category": "Utility",
  "blurb": "Watches its children and on every mutation computes a keyed semantic diff, emitting { added, removed, moved, changed } and colour-coding each: added glow green and scale in, moved FLIP-slide blue, changed flash amber.",
  "description": "`<pura-diff-motion>` watches its light-DOM children and, on every mutation, computes a *keyed semantic diff* and both narrates and animates it. Where `<pura-auto-animate>` silently FLIP-tweens layout, this answers the agent-facing question \"what actually changed?\": it emits `diffmotion` `{ added, removed, moved, changed }` (lists of keys) and colour-codes each operation, added items glow green and scale in, moved items FLIP-slide with a blue tint, changed items flash amber. Identity comes from each child's `data-key` (falling back to `id`, then index), and \"changed\" is detected from a content signature (`data-sig`, falling back to `textContent`). The highlight durations multiply `var(--pura-motion)` so a `<pura-motion-budget>` governor (or reduced motion) can calm or stop the visuals, while the diff event still fires. Each instance registers in `window.__puraDiffMotion` by `data-pura-id` and mirrors the latest counts in `data-pura-diff-*`.",
  "attributes": [
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Stops observing; children mutate with no diff or animation."
    },
    {
      "name": "duration",
      "type": "number",
      "default": "(token)",
      "desc": "Overrides the token-derived FLIP duration in milliseconds."
    }
  ],
  "events": [
    {
      "name": "diffmotion",
      "detail": "{ added, removed, moved, changed }",
      "desc": "Fired after every observed mutation; each field is an array of child keys."
    }
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "<pura-diff-motion id=\"pura-dm-demo\" style=\"display: flex; flex-wrap: wrap; gap: .5rem;\">\n  <span data-key=\"a\" style=\"padding: .5rem .9rem; border-radius: 8px; background: var(--pura-muted, #f4f4f5); font: 500 13px system-ui;\">Apple</span>\n  <span data-key=\"b\" style=\"padding: .5rem .9rem; border-radius: 8px; background: var(--pura-muted, #f4f4f5); font: 500 13px system-ui;\">Banana</span>\n  <span data-key=\"c\" style=\"padding: .5rem .9rem; border-radius: 8px; background: var(--pura-muted, #f4f4f5); font: 500 13px system-ui;\">Cherry</span>\n</pura-diff-motion>\n<div style=\"margin-top: .75rem; display: flex; gap: .5rem;\">\n  <button style=\"font: 500 13px system-ui; padding: .4rem .8rem; border: 1px solid var(--pura-border, #e4e4e7); border-radius: 8px; background: var(--pura-bg, #fff); cursor: pointer;\" onclick=\"(function(){ var c=document.getElementById('pura-dm-demo'); var s=document.createElement('span'); var k=String.fromCharCode(100+c.children.length); s.setAttribute('data-key', k); s.style.cssText='padding:.5rem .9rem;border-radius:8px;background:var(--pura-muted,#f4f4f5);font:500 13px system-ui'; s.textContent='Item '+k.toUpperCase(); c.appendChild(s); })()\">Add</button>\n  <button style=\"font: 500 13px system-ui; padding: .4rem .8rem; border: 1px solid var(--pura-border, #e4e4e7); border-radius: 8px; background: var(--pura-bg, #fff); cursor: pointer;\" onclick=\"(function(){ var c=document.getElementById('pura-dm-demo'); if(c.children.length>1){ c.insertBefore(c.lastElementChild, c.firstElementChild); } })()\">Shuffle</button>\n  <button style=\"font: 500 13px system-ui; padding: .4rem .8rem; border: 1px solid var(--pura-border, #e4e4e7); border-radius: 8px; background: var(--pura-bg, #fff); cursor: pointer;\" onclick=\"(function(){ var c=document.getElementById('pura-dm-demo'); if(c.firstElementChild) c.firstElementChild.textContent='Edited ' + Date.now()%100; })()\">Edit first</button>\n</div>\n<p id=\"pura-dm-log\" style=\"margin-top: .6rem; font: 13px ui-monospace, monospace; color: var(--pura-muted-fg, #52525b);\">diffmotion events appear here</p>\n<script>\n  document.getElementById('pura-dm-demo').addEventListener('diffmotion', function(e){\n    var d = e.detail;\n    document.getElementById('pura-dm-log').textContent =\n      'added[' + d.added.join(',') + '] moved[' + d.moved.join(',') + '] changed[' + d.changed.join(',') + '] removed[' + d.removed.join(',') + ']';\n  });\n</script>",
  "usage": "<pura-diff-motion id=\"list\">\n  <li data-key=\"1\" data-sig=\"Buy milk\">Buy milk</li>\n  <li data-key=\"2\" data-sig=\"Walk dog\">Walk dog</li>\n</pura-diff-motion>\n\n<script type=\"module\">\n  const dm = document.getElementById('list');\n  dm.addEventListener('diffmotion', (e) => console.log(e.detail));\n  // mutate the children however you like (framework render, manual DOM, etc.)\n  // -> { added:['3'], removed:[], moved:['2'], changed:[] }\n</script>",
  "animation": true,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "diff",
  "title": "Diff",
  "category": "Utility",
  "blurb": "Shows the word-by-word difference between two texts inline, with removals struck through and additions highlighted.",
  "description": "`pura-diff` computes an inline diff (LCS, zero deps) between a `before` text and an `after` text, rendering removed segments in struck-through red, added ones in underlined green, and the rest as plain text. Use it to compare versions of a text, review AI edits, or highlight changes with no external dependencies. The agent-native layer exposes each segment with `data-op` and `data-text`, reflects counts in `data-added`/`data-removed`/`data-equal` on the host, emits a structured `diff` event, and registers each instance in `window.__puraDiffs` so that agents can read the result without scraping the DOM.",
  "attributes": [
    {
      "name": "before",
      "type": "string",
      "default": "\"\"",
      "desc": "Original text. Can be overridden by slot[name=\"before\"]."
    },
    {
      "name": "after",
      "type": "string",
      "default": "\"\"",
      "desc": "New text. Can be overridden by slot[name=\"after\"]."
    },
    {
      "name": "mode",
      "type": "\"words\" | \"chars\"",
      "default": "\"words\"",
      "desc": "Diff granularity: by words (default) or by characters."
    },
    {
      "name": "label",
      "type": "string",
      "default": "\"Text diff\"",
      "desc": "Accessible label (aria-label) for the diff region."
    },
    {
      "name": "block",
      "type": "boolean",
      "default": "false",
      "desc": "When present, displays the component as a block instead of inline."
    }
  ],
  "events": [
    "diff"
  ],
  "slots": [
    "before",
    "after"
  ],
  "demoHTML": "<pura-diff\n  block\n  before=\"The brown dog jumped over the low wall.\"\n  after=\"The black cat jumped over the high wall.\"\n  label=\"Difference between the two sentences\"\n></pura-diff>",
  "usage": "<pura-diff\n  block\n  before=\"The brown dog jumped over the low wall.\"\n  after=\"The black cat jumped over the high wall.\"\n  label=\"Difference between the two sentences\"\n></pura-diff>\n\n<!-- Character mode, using slots as the text source -->\n<pura-diff mode=\"chars\" block>\n  <span slot=\"before\">commit 1a2b3c</span>\n  <span slot=\"after\">commit 1a2b3d</span>\n</pura-diff>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "disclosure",
  "title": "Disclosure",
  "category": "Layout",
  "blurb": "Show/hide region that animates height between 0 and auto using native interpolate-size, no grid hack or JS measuring. SSR-safe, reduced-motion aware.",
  "description": "`<pura-disclosure>` is a show/hide region that animates its height between `0` and the content's natural `auto` using the modern CSS recipe `interpolate-size: allow-keywords` + `transition: height`, no grid-row hack and no JS measuring. Padding, borders, and nested disclosures all tween cleanly. Browsers without `interpolate-size` still open and close, they just snap. Put the summary in `slot=\"trigger\"` and the body in the default slot; drive it with `open`, `.toggle()`, or listen for `disclosuretoggle` `{ open }`. Each instance registers in `window.__puraDisclosures` by `data-pura-id` and mirrors `data-pura-open`. Theme the timing with `--pura-disclosure-duration`.",
  "attributes": [
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "desc": "Expanded when present."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Trigger is inert and toggling is blocked."
    }
  ],
  "events": [
    {
      "name": "disclosuretoggle",
      "detail": "{ open }",
      "desc": "Fired whenever the open state changes."
    }
  ],
  "slots": [
    "trigger",
    "default"
  ],
  "demoHTML": "<pura-disclosure style=\"max-width: 420px; border: 1px solid var(--pura-border, #e4e4e7); border-radius: 10px; padding: 0.75rem 1rem;\">\n  <span slot=\"trigger\">What is animate-to-auto?</span>\n  <p style=\"margin: 0; color: var(--pura-muted-fg, #52525b); line-height: 1.6;\">It tweens height from 0 to the content's real size with one CSS transition, using <code>interpolate-size: allow-keywords</code>. No JavaScript measures anything.</p>\n</pura-disclosure>",
  "usage": "<pura-disclosure>\n  <span slot=\"trigger\">Show more</span>\n  <div>Disclosed content, height animates to auto.</div>\n</pura-disclosure>\n\n<script type=\"module\">\n  const d = document.querySelector('pura-disclosure');\n  d.addEventListener('disclosuretoggle', (e) => console.log(e.detail.open));\n  d.toggle();\n</script>",
  "animation": true,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "dock",
  "title": "Dock",
  "category": "Navigation",
  "blurb": "macOS-style icon bar that magnifies items as the pointer gets closer.",
  "description": "The Dock is a centered, rounded bar of icon buttons that smoothly magnify (scale up) as the pointer gets closer, with a cosine falloff: the item under the cursor grows the most and its neighbors grow less. Use it for quick navigation of shortcuts or apps, pinned to the bottom of the screen or inline. It includes an agent-native layer: the dock exposes role=\"toolbar\" and registers itself in window.__puraDocks by data-pura-id, and it mirrors live state through data-pura-dock-* attributes on the host and items, so agents can enumerate docks and read the count/labels without touching the shadow DOM.",
  "attributes": [
    {
      "name": "fixed",
      "type": "boolean",
      "default": "false",
      "desc": "Pins the dock to the bottom-center of the viewport (position: fixed, bottom-center, z-index 50)."
    },
    {
      "name": "magnify",
      "type": "number",
      "default": "1.6",
      "desc": "Maximum scale of the item under the pointer. Values >= 1; invalid values fall back to 1.6."
    },
    {
      "name": "reach",
      "type": "number",
      "default": "110",
      "desc": "Proximity radius in px over which the magnification decays. Larger = more neighbors scale up."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Dock",
      "desc": "Accessible name of the dock (aria-label of the inner role=toolbar track)."
    }
  ],
  "events": [
    "dock-item-activate"
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "<pura-dock label=\"Shortcuts\" magnify=\"1.7\" reach=\"120\" id=\"meu-dock\">\n  <pura-dock-item label=\"Home\" active>🏠</pura-dock-item>\n  <pura-dock-item label=\"Messages\">💬</pura-dock-item>\n  <pura-dock-item label=\"Calendar\">📅</pura-dock-item>\n  <pura-dock-item label=\"Settings\">⚙️</pura-dock-item>\n  <pura-dock-item label=\"Trash\" disabled>🗑️</pura-dock-item>\n</pura-dock>\n<p id=\"dock-status\" style=\"margin-top:1rem;font:14px system-ui;color:#666\">Hover to magnify and click an item.</p>\n<script type=\"module\">\n  import \"/pura/lib/dock.js\";\n  const status = document.getElementById(\"dock-status\");\n  document.getElementById(\"meu-dock\").addEventListener(\"dock-item-activate\", (e) => {\n    status.textContent = `Opening: ${e.detail.label}`;\n  });\n</script>",
  "usage": "<pura-dock label=\"Shortcuts\" magnify=\"1.7\" reach=\"120\" id=\"meu-dock\">\n  <pura-dock-item label=\"Home\" active>🏠</pura-dock-item>\n  <pura-dock-item label=\"Messages\">💬</pura-dock-item>\n  <pura-dock-item label=\"Calendar\">📅</pura-dock-item>\n  <pura-dock-item label=\"Settings\">⚙️</pura-dock-item>\n  <pura-dock-item label=\"Trash\" disabled>🗑️</pura-dock-item>\n</pura-dock>\n<script type=\"module\">\n  import \"/pura/lib/dock.js\";\n  document.getElementById(\"meu-dock\").addEventListener(\"dock-item-activate\", (e) => {\n    console.log(\"Item activated:\", e.detail.label);\n  });\n</script>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "drawer",
  "title": "Drawer",
  "category": "Overlay",
  "blurb": "Sliding drawer anchored to the bottom of the screen, built on the native dialog element.",
  "description": "The Drawer is a native web component that opens a full-width drawer from the bottom edge of the screen, with a center handle, sliding up over a backdrop. Because it is built on the native dialog element, it gets focus trapping, ESC-to-close, and backdrop click for free. Use it for contextual actions, filters, or forms on smaller screens, where a bottom panel feels more natural than a centered modal.",
  "attributes": [
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "desc": "Controls visibility. Present opens the drawer (showModal); removed closes it. Observed and reactive."
    },
    {
      "name": "title",
      "type": "string",
      "default": "\"\"",
      "desc": "Title text in the header, used when the header slot is not filled. Read at render time."
    }
  ],
  "events": [
    "close"
  ],
  "slots": [
    "default",
    "header",
    "footer"
  ],
  "demoHTML": "<pura-button id=\"abrir-drawer\">Open drawer</pura-button>\n\n<pura-drawer id=\"drawer-exemplo\" title=\"Filters\">\n  <p>Refine the results using the options below.</p>\n  <pura-checkbox>In stock</pura-checkbox>\n  <pura-checkbox>Free shipping</pura-checkbox>\n  <div slot=\"footer\">\n    <pura-button variant=\"ghost\" id=\"cancelar-drawer\">Cancel</pura-button>\n    <pura-button id=\"aplicar-drawer\">Apply</pura-button>\n  </div>\n</pura-drawer>\n\n<script type=\"module\">\n  const drawer = document.getElementById(\"drawer-exemplo\");\n  document.getElementById(\"abrir-drawer\").addEventListener(\"click\", () => drawer.open());\n  document.getElementById(\"cancelar-drawer\").addEventListener(\"click\", () => drawer.close());\n  document.getElementById(\"aplicar-drawer\").addEventListener(\"click\", () => drawer.close());\n</script>",
  "usage": "<pura-button id=\"abrir-drawer\">Open drawer</pura-button>\n\n<pura-drawer id=\"drawer-exemplo\" title=\"Filters\">\n  <p>Refine the results using the options below.</p>\n  <pura-checkbox>In stock</pura-checkbox>\n  <pura-checkbox>Free shipping</pura-checkbox>\n  <div slot=\"footer\">\n    <pura-button variant=\"ghost\" id=\"cancelar-drawer\">Cancel</pura-button>\n    <pura-button id=\"aplicar-drawer\">Apply</pura-button>\n  </div>\n</pura-drawer>\n\n<script type=\"module\">\n  const drawer = document.getElementById(\"drawer-exemplo\");\n  document.getElementById(\"abrir-drawer\").addEventListener(\"click\", () => drawer.open());\n  document.getElementById(\"cancelar-drawer\").addEventListener(\"click\", () => drawer.close());\n  document.getElementById(\"aplicar-drawer\").addEventListener(\"click\", () => drawer.close());\n</script>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "dropdown-menu",
  "title": "Dropdown Menu",
  "category": "Overlay",
  "blurb": "Action menu that opens from a trigger, with keyboard navigation.",
  "description": "A native component (Web Component) that displays an action menu anchored to a trigger, built on the native Popover API (top layer, light dismiss, and ESC included) with CSS anchor positioning. Use it to group contextual actions triggered by a button, such as \"more options\" menus, row actions, or profile menus. It supports arrow-key navigation, Home/End, Enter/Space, and items with an icon, shortcut, and disabled state.",
  "attributes": [
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "desc": "Controls/reflects the open state of the menu; present when the popover is visible."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "On <pura-menu-item>: disables the item, preventing selection and focus."
    }
  ],
  "events": [
    "open",
    "close",
    "select"
  ],
  "slots": [
    "trigger",
    "default",
    "icon",
    "shortcut"
  ],
  "demoHTML": "<pura-dropdown-menu>\n  <button slot=\"trigger\">Options</button>\n\n  <pura-menu-label>Account</pura-menu-label>\n  <pura-menu-item>\n    Profile\n    <span slot=\"shortcut\">Ctrl P</span>\n  </pura-menu-item>\n  <pura-menu-item>\n    Settings\n    <span slot=\"shortcut\">Ctrl ,</span>\n  </pura-menu-item>\n\n  <pura-menu-separator></pura-menu-separator>\n\n  <pura-menu-item disabled>Billing</pura-menu-item>\n  <pura-menu-item>Sign out</pura-menu-item>\n</pura-dropdown-menu>",
  "usage": "<pura-dropdown-menu>\n  <button slot=\"trigger\">Options</button>\n\n  <pura-menu-label>Account</pura-menu-label>\n  <pura-menu-item>\n    Profile\n    <span slot=\"shortcut\">Ctrl P</span>\n  </pura-menu-item>\n  <pura-menu-item>\n    Settings\n    <span slot=\"shortcut\">Ctrl ,</span>\n  </pura-menu-item>\n\n  <pura-menu-separator></pura-menu-separator>\n\n  <pura-menu-item disabled>Billing</pura-menu-item>\n  <pura-menu-item>Sign out</pura-menu-item>\n</pura-dropdown-menu>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "sidebar",
      "title": "Sidebar"
    },
    {
      "slug": "table",
      "title": "Table"
    },
    {
      "slug": "button-group",
      "title": "Button Group"
    },
    {
      "slug": "pagination",
      "title": "Pagination"
    },
    {
      "slug": "sparkline",
      "title": "Sparkline"
    },
    {
      "slug": "toggle",
      "title": "Toggle"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "app-shell",
      "title": "App Shell"
    },
    {
      "slug": "dashboard",
      "title": "Dashboard"
    },
    {
      "slug": "data-table",
      "title": "Data Table"
    }
  ]
},
{
  "slug": "emphasis",
  "title": "Emphasis",
  "category": "Utility",
  "blurb": "Attention-seeking animations (bounce, heartbeat, wiggle, tada, shake, pulse, flash) as a wrapper, CSS-only and reduced-motion aware.",
  "description": "`<pura-emphasis>` wraps any content with an attention-seeking animation: `bounce`, `heartbeat`, `wiggle`, `tada`, `shake`, `pulse`, or `flash`. The motion is pure CSS `@keyframes` selected by the `animation` attribute; the `trigger` decides when it plays, `hover` and `loop` are CSS-only while `view` plays on first intersection and `manual` plays via `play()`. Theme the timing with `--pura-emphasis-duration`. The base reset neutralizes it under reduced motion. It registers in `window.__puraEmphasis` for agent enumeration.",
  "attributes": [
    {
      "name": "animation",
      "type": "\"bounce\" | \"heartbeat\" | \"wiggle\" | \"tada\" | \"shake\" | \"pulse\" | \"flash\"",
      "default": "pulse",
      "desc": "The emphasis preset. Invalid values fall back to pulse."
    },
    {
      "name": "trigger",
      "type": "\"hover\" | \"view\" | \"loop\" | \"manual\"",
      "default": "manual",
      "desc": "What plays the animation: hover (CSS), view (first intersection), loop (infinite), or manual via play()."
    }
  ],
  "events": [
    "pura-emphasis"
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "<div style=\"display: flex; gap: 1.5rem; flex-wrap: wrap; align-items: center; font: 15px system-ui;\">\n  <pura-emphasis animation=\"bounce\" trigger=\"loop\"><span style=\"font-size: 1.6rem;\">🔔</span></pura-emphasis>\n  <pura-emphasis animation=\"heartbeat\" trigger=\"loop\"><span style=\"font-size: 1.6rem;\">❤️</span></pura-emphasis>\n  <pura-emphasis animation=\"wiggle\" trigger=\"hover\"><span style=\"padding: 0.4rem 0.8rem; border: 1px solid var(--pura-border, #ddd); border-radius: 8px;\">Hover me</span></pura-emphasis>\n  <pura-emphasis animation=\"tada\" trigger=\"hover\"><span style=\"padding: 0.4rem 0.8rem; border: 1px solid var(--pura-border, #ddd); border-radius: 8px;\">And me</span></pura-emphasis>\n</div>",
  "usage": "<!-- Loop forever -->\n<pura-emphasis animation=\"bounce\" trigger=\"loop\">🔔</pura-emphasis>\n\n<!-- Play on hover -->\n<pura-emphasis animation=\"wiggle\" trigger=\"hover\">\n  <button>Hover me</button>\n</pura-emphasis>\n\n<!-- Play manually -->\n<pura-emphasis animation=\"tada\" id=\"win\">🎉</pura-emphasis>\n<script>document.querySelector('#win').play();</script>",
  "animation": true,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "empty",
  "title": "Empty",
  "category": "Display",
  "blurb": "Centered empty state with icon, title, description, and action.",
  "description": "Empty (`<pura-empty>`) is a native web component for displaying empty states: a centered column with an optional icon, title, description, and action area. Use it when a list, search, or section has no content to show and you want to guide the user with a clear message and a next step. Regions without content are hidden automatically to keep the layout clean.",
  "attributes": [
    {
      "name": "title",
      "type": "string",
      "default": "",
      "desc": "Title text shown when the \"title\" slot is not used."
    }
  ],
  "events": [],
  "slots": [
    "icon",
    "title",
    "default",
    "action"
  ],
  "demoHTML": "<pura-empty title=\"No results found\">\n  <svg slot=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <circle cx=\"11\" cy=\"11\" r=\"8\"></circle>\n    <line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line>\n  </svg>\n  Try adjusting the filters or searching for another term.\n  <pura-button slot=\"action\" variant=\"primary\">Clear filters</pura-button>\n</pura-empty>",
  "usage": "<pura-empty title=\"No results found\">\n  <svg slot=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <circle cx=\"11\" cy=\"11\" r=\"8\"></circle>\n    <line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line>\n  </svg>\n  Try adjusting the filters or searching for another term.\n  <pura-button slot=\"action\" variant=\"primary\">Clear filters</pura-button>\n</pura-empty>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "notification-item",
      "title": "Notification Item"
    },
    {
      "slug": "toggle",
      "title": "Toggle"
    },
    {
      "slug": "breadcrumb",
      "title": "Breadcrumb"
    },
    {
      "slug": "sidebar",
      "title": "Sidebar"
    },
    {
      "slug": "stepper",
      "title": "Stepper"
    },
    {
      "slug": "switch",
      "title": "Switch"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "app-shell",
      "title": "App Shell"
    },
    {
      "slug": "error-404",
      "title": "404"
    },
    {
      "slug": "notifications",
      "title": "Notifications"
    },
    {
      "slug": "onboarding",
      "title": "Onboarding"
    }
  ]
},
{
  "slug": "explain",
  "title": "Explain",
  "category": "Agent",
  "blurb": "Attaches a plain-language explanation to a piece of content, visible to humans in a popover and always readable by screen readers and agents.",
  "description": "pura-explain wraps content (default slot) and associates a text explanation with it, revealed by humans through a small \"?\" button in a floating popover. The explanation is always present in the accessibility tree via aria-description, so screen readers and agents read it without having to open anything. The agent-native layer exposes data-pura-id, data-pura-explanation, and data-pura-open on the host and registers each explanation in window.__puraExplains (data-pura-id -> { id, text, open, element }), letting an agent enumerate every explanation on the page and read each one as a string without opening the popover or crossing the shadow DOM. Use around technical terms, jargon, or fields that need context.",
  "attributes": [
    {
      "name": "text",
      "type": "string",
      "default": "",
      "desc": "The plain-language explanation. Optional if a child with slot=\"explanation\" is provided. The text attribute takes priority when both are present."
    },
    {
      "name": "placement",
      "type": "\"bottom\" | \"top\" | \"left\" | \"right\"",
      "default": "bottom",
      "desc": "Position of the popover relative to the content. Unknown values are normalized to bottom."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Explanation",
      "desc": "Accessible label for the \"?\" trigger button."
    },
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "desc": "Reflected boolean; present while the popover is open. Can be set to open the popover programmatically."
    }
  ],
  "events": [
    "open",
    "close"
  ],
  "slots": [
    "(default)",
    "explanation"
  ],
  "demoHTML": "<p style=\"max-width:32rem;line-height:1.7\">\n  Your invoice goes into\n  <pura-explain text=\"The period during which a payment is past its due date and still hasn't been settled.\" placement=\"bottom\">delinquency</pura-explain>\n  30 days after the due date, at which point we begin charging\n  <pura-explain placement=\"top\">\n    interest\n    <span slot=\"explanation\">A surcharge of <strong>2%</strong> on the original amount plus 0.033% per day.</span>\n  </pura-explain>\n  on the outstanding balance.\n</p>",
  "usage": "<p style=\"max-width:32rem;line-height:1.7\">\n  Your invoice goes into\n  <pura-explain text=\"The period during which a payment is past its due date and still hasn't been settled.\" placement=\"bottom\">delinquency</pura-explain>\n  30 days after the due date, at which point we begin charging\n  <pura-explain placement=\"top\">\n    interest\n    <span slot=\"explanation\">A surcharge of <strong>2%</strong> on the original amount plus 0.033% per day.</span>\n  </pura-explain>\n  on the outstanding balance.\n</p>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "fab",
  "title": "Floating Action Button",
  "category": "Layout",
  "blurb": "Floating action button pinned to a corner of the viewport, round or extended into a pill.",
  "description": "pura-fab is a circular, elevated button (strong shadow, primary color) anchored to a corner of the screen, with an icon slot and an extended variant that reveals a text label. Use it for the main action of a screen (create, add, compose). It also exposes an agent-native layer: data-pura-fab-* attributes mirror the live state, and each instance registers itself in window.__puraFabs by its data-pura-id, letting agents enumerate, read the state, and trigger the button via .click() without crossing the Shadow DOM.",
  "attributes": [
    {
      "name": "position",
      "type": "string",
      "default": "bottom-right",
      "desc": "Corner where the button is pinned: bottom-right, bottom-left, top-right, or top-left."
    },
    {
      "name": "extended",
      "type": "boolean",
      "default": "false",
      "desc": "Shows the text label next to the icon (pill shape instead of a circle)."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Action",
      "desc": "Accessible name for the icon-only button. Ignored when extended and the label slot has text."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Makes the button non-interactive."
    },
    {
      "name": "hidden",
      "type": "boolean",
      "default": "false",
      "desc": "Standard HTML; removes the host from layout."
    }
  ],
  "events": [
    "pura-fab-click"
  ],
  "slots": [
    "(default)",
    "icon"
  ],
  "demoHTML": "<pura-fab id=\"fab\" extended position=\"bottom-right\" label=\"New item\">\n  <span slot=\"icon\">\n    <svg viewBox=\"0 0 24 24\" width=\"1em\" height=\"1em\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 5v14M5 12h14\"/></svg>\n  </span>\n  New\n</pura-fab>\n<script type=\"module\">\n  import \"/pura/lib/fab.js\";\n  document.getElementById(\"fab\").addEventListener(\"pura-fab-click\", (e) => {\n    alert(\"FAB triggered: \" + e.detail.id);\n  });\n</script>",
  "usage": "<pura-fab id=\"fab\" extended position=\"bottom-right\" label=\"New item\">\n  <span slot=\"icon\">\n    <svg viewBox=\"0 0 24 24\" width=\"1em\" height=\"1em\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 5v14M5 12h14\"/></svg>\n  </span>\n  New\n</pura-fab>\n<script type=\"module\">\n  import \"/pura/lib/fab.js\";\n  document.getElementById(\"fab\").addEventListener(\"pura-fab-click\", (e) => {\n    alert(\"FAB triggered: \" + e.detail.id);\n  });\n</script>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "faq",
  "title": "FAQ",
  "category": "Disclosure",
  "blurb": "Question-and-answer accordion built on native details/summary, with single or multiple open items.",
  "description": "pura-faq groups pura-faq-item elements (each a question/answer pair on native details/summary, getting accessibility and keyboard support for free). By default it is single-open (opening one item closes the others); use the multi attribute to allow several open at once. It is agent-native: it exposes role=\"region\", stable data-* attributes (data-total, data-open, data-open-index), and a global registry window.__puraFaqs indexed by id, where each instance offers a machine-readable snapshot() with the question and the state of each item, plus callable methods like openItem(i), closeItem(i), and collapseAll().",
  "attributes": [
    {
      "name": "multi",
      "type": "boolean",
      "default": "false",
      "desc": "Allows several items open at the same time. Without it, the FAQ is single-open: opening one item closes the others."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Frequently asked questions",
      "desc": "Accessible name for the FAQ region (aria-label)."
    },
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "desc": "On pura-faq-item: reflected, indicates whether the answer is expanded."
    }
  ],
  "events": [
    "open",
    "close"
  ],
  "slots": [
    "default",
    "question"
  ],
  "demoHTML": "<pura-faq label=\"Frequently asked questions\">\n  <pura-faq-item open>\n    <span slot=\"question\">Does pura have dependencies?</span>\n    No. pura is a library of native Web Components, with zero dependencies. Just import the component and use the tag in your HTML.\n  </pura-faq-item>\n  <pura-faq-item>\n    <span slot=\"question\">Does it work with any framework?</span>\n    Yes. Because they are standard Web Components, the elements work in React, Vue, Svelte, or plain HTML, with no adapters.\n  </pura-faq-item>\n  <pura-faq-item>\n    <span slot=\"question\">How do I allow several items open at once?</span>\n    Add the <code>multi</code> attribute to the <code><pura-faq></code> element.\n  </pura-faq-item>\n</pura-faq>",
  "usage": "<pura-faq label=\"Frequently asked questions\">\n  <pura-faq-item open>\n    <span slot=\"question\">Does pura have dependencies?</span>\n    No. pura is a library of native Web Components, with zero dependencies. Just import the component and use the tag in your HTML.\n  </pura-faq-item>\n  <pura-faq-item>\n    <span slot=\"question\">Does it work with any framework?</span>\n    Yes. Because they are standard Web Components, the elements work in React, Vue, Svelte, or plain HTML, with no adapters.\n  </pura-faq-item>\n  <pura-faq-item>\n    <span slot=\"question\">How do I allow several items open at once?</span>\n    Add the <code>multi</code> attribute to the <code><pura-faq></code> element.\n  </pura-faq-item>\n</pura-faq>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "pricing-table",
      "title": "Pricing Table"
    },
    {
      "slug": "banner",
      "title": "Banner"
    },
    {
      "slug": "testimonial",
      "title": "Testimonial"
    },
    {
      "slug": "segmented-control",
      "title": "Segmented Control"
    },
    {
      "slug": "stat",
      "title": "Stat"
    },
    {
      "slug": "stat-grid",
      "title": "Stat Grid"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "landing",
      "title": "Landing"
    },
    {
      "slug": "pricing",
      "title": "Pricing"
    }
  ]
},
{
  "slug": "field",
  "title": "Field",
  "category": "Form",
  "blurb": "Wraps a form control with a label, description, and error message.",
  "description": "Field is a native web component that arranges, in a vertical stack, the label, the control (default slot), the description, and the error message of a form field. Use it to standardize the structure and spacing of any input, select, or textarea. When the error attribute is set, the invalid style is applied and the error message replaces the description.",
  "attributes": [
    {
      "name": "label",
      "type": "string",
      "default": "",
      "desc": "Label text shown above the control."
    },
    {
      "name": "description",
      "type": "string",
      "default": "",
      "desc": "Helper text shown below the control (hidden when there is an error)."
    },
    {
      "name": "error",
      "type": "string",
      "default": "",
      "desc": "Error message; when present, applies the invalid style and replaces the description."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "demoHTML": "<pura-field label=\"Email\" description=\"We'll use it to send the confirmation.\">\n  <pura-input type=\"email\" placeholder=\"you@example.com\"></pura-input>\n</pura-field>\n\n<pura-field label=\"Password\" error=\"The password must be at least 8 characters.\">\n  <pura-input type=\"password\" placeholder=\"********\"></pura-input>\n</pura-field>",
  "usage": "<pura-field label=\"Email\" description=\"We'll use it to send the confirmation.\">\n  <pura-input type=\"email\" placeholder=\"you@example.com\"></pura-input>\n</pura-field>\n\n<pura-field label=\"Password\" error=\"The password must be at least 8 characters.\">\n  <pura-input type=\"password\" placeholder=\"********\"></pura-input>\n</pura-field>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "checkbox",
      "title": "Checkbox"
    },
    {
      "slug": "switch",
      "title": "Switch"
    },
    {
      "slug": "input",
      "title": "Input"
    },
    {
      "slug": "select",
      "title": "Select"
    },
    {
      "slug": "separator",
      "title": "Separator"
    },
    {
      "slug": "meter",
      "title": "Meter"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "login",
      "title": "Login"
    },
    {
      "slug": "onboarding",
      "title": "Onboarding"
    },
    {
      "slug": "settings",
      "title": "Settings"
    },
    {
      "slug": "signup",
      "title": "Sign Up"
    }
  ]
},
{
  "slug": "file-dropzone",
  "title": "File Dropzone",
  "category": "Form",
  "blurb": "Drag-and-drop upload area that lists the selected files as removable chips.",
  "description": "`<pura-file-dropzone>` is a dashed region that highlights on dragover, opens the native file picker on click or Enter/Space, and shows each chosen file as a chip with its name, human-readable size, and a remove button. Use it in upload forms when you want an accessible experience built on a hidden `<input type=\"file\">`. It has an agent-native layer: stable `data-*` attributes on the host and on each chip, plus a global `window.__puraFileDropzones` registry that maps each instance's id to a live `{ files }` snapshot, letting agents inspect the state without touching the shadow DOM.",
  "attributes": [
    {
      "name": "accept",
      "type": "string",
      "default": "",
      "desc": "Passed through to the native input to filter file types (e.g. \"image/*,.pdf\")."
    },
    {
      "name": "multiple",
      "type": "boolean",
      "default": "false",
      "desc": "Allows selecting more than one file; without it, each new selection replaces the previous one."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Blocks click, keyboard, and drop, and hides the chips' remove button."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Drop files here or click to browse",
      "desc": "Visible instruction text and aria-label of the zone."
    }
  ],
  "events": [
    "change"
  ],
  "slots": [],
  "demoHTML": "<pura-file-dropzone\n  id=\"dz\"\n  label=\"Drop files here or click to browse\"\n  accept=\"image/*,.pdf\"\n  multiple>\n</pura-file-dropzone>\n<p id=\"dz-status\" style=\"font: 0.85rem sans-serif; color: #666; margin-top: 0.75rem;\">\n  No files selected.\n</p>\n<script type=\"module\">\n  const dz = document.getElementById(\"dz\");\n  const status = document.getElementById(\"dz-status\");\n  dz.addEventListener(\"change\", (e) => {\n    const files = e.detail.files;\n    status.textContent = files.length\n      ? `${files.length} file(s): ` + files.map((f) => f.name).join(\", \")\n      : \"No files selected.\";\n  });\n</script>",
  "usage": "<pura-file-dropzone\n  id=\"dz\"\n  label=\"Drop files here or click to browse\"\n  accept=\"image/*,.pdf\"\n  multiple>\n</pura-file-dropzone>\n<p id=\"dz-status\">No files selected.</p>\n<script type=\"module\">\n  import \"/pura/lib/file-dropzone.js\";\n  const dz = document.getElementById(\"dz\");\n  const status = document.getElementById(\"dz-status\");\n  dz.addEventListener(\"change\", (e) => {\n    const files = e.detail.files;\n    status.textContent = files.length\n      ? `${files.length} file(s): ` + files.map((f) => f.name).join(\", \")\n      : \"No files selected.\";\n  });\n  // Public API: dz.files (snapshot) and dz.clear()\n</script>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "flex",
  "title": "Flex",
  "category": "Primitives",
  "blurb": "A flexbox layout container for arranging child elements in a row or column.",
  "description": "The pura-flex primitive wraps its slotted children in a flex container, exposing direction, gap, alignment, justification, wrapping, and inline display as plain attributes. The gap attribute accepts the space scale 1 to 6 (mapped to design tokens) or any raw CSS length. It is a layout-only building block with no interactive behavior.",
  "attributes": [
    {
      "name": "direction",
      "type": "\"row\" | \"col\" | \"row-reverse\" | \"col-reverse\"",
      "default": "row",
      "desc": "Main axis direction of the flex container (flex-direction)."
    },
    {
      "name": "gap",
      "type": "string",
      "default": "0",
      "desc": "Spacing between children. Use the space scale 1 to 6 (resolves to a design token) or any CSS length such as \"2rem\" or \"12px\"."
    },
    {
      "name": "align",
      "type": "\"start\" | \"center\" | \"end\" | \"stretch\" | \"baseline\"",
      "default": "",
      "desc": "Cross-axis alignment of children (align-items)."
    },
    {
      "name": "justify",
      "type": "\"start\" | \"center\" | \"end\" | \"between\" | \"around\" | \"evenly\"",
      "default": "",
      "desc": "Main-axis distribution of children (justify-content)."
    },
    {
      "name": "wrap",
      "type": "boolean",
      "default": "false",
      "desc": "When present, allows children to wrap onto multiple lines (flex-wrap)."
    },
    {
      "name": "inline",
      "type": "boolean",
      "default": "false",
      "desc": "When present, renders the container as inline-flex instead of flex."
    }
  ],
  "events": [],
  "slots": [
    "default — flex children"
  ],
  "demoHTML": "<script type=\"module\" src=\"/pura/lib/flex.js\"></script>\n\n<!-- Row with centered items and a gap -->\n<pura-flex align=\"center\" gap=\"3\">\n  <button>Save</button>\n  <button>Cancel</button>\n  <span>Last edited 2 minutes ago</span>\n</pura-flex>\n\n<!-- Column layout -->\n<pura-flex direction=\"col\" gap=\"2\">\n  <h3>Account</h3>\n  <p>Manage your profile and preferences.</p>\n  <a href=\"/settings\">Open settings</a>\n</pura-flex>\n\n<!-- Space the items apart across the row -->\n<pura-flex justify=\"between\" align=\"center\" gap=\"2rem\">\n  <strong>Dashboard</strong>\n  <button>New report</button>\n</pura-flex>\n\n<!-- Wrapping tag list -->\n<pura-flex wrap gap=\"2\">\n  <span>Design</span>\n  <span>Engineering</span>\n  <span>Marketing</span>\n  <span>Operations</span>\n</pura-flex>",
  "usage": "<script type=\"module\" src=\"/pura/lib/flex.js\"></script>\n\n<!-- Row with centered items and a gap -->\n<pura-flex align=\"center\" gap=\"3\">\n  <button>Save</button>\n  <button>Cancel</button>\n  <span>Last edited 2 minutes ago</span>\n</pura-flex>\n\n<!-- Column layout -->\n<pura-flex direction=\"col\" gap=\"2\">\n  <h3>Account</h3>\n  <p>Manage your profile and preferences.</p>\n  <a href=\"/settings\">Open settings</a>\n</pura-flex>\n\n<!-- Space the items apart across the row -->\n<pura-flex justify=\"between\" align=\"center\" gap=\"2rem\">\n  <strong>Dashboard</strong>\n  <button>New report</button>\n</pura-flex>\n\n<!-- Wrapping tag list -->\n<pura-flex wrap gap=\"2\">\n  <span>Design</span>\n  <span>Engineering</span>\n  <span>Marketing</span>\n  <span>Operations</span>\n</pura-flex>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "floating-window",
  "title": "Floating Window",
  "category": "Overlay",
  "blurb": "A draggable, resizable floating window/panel with a title bar, close/minimize/maximize controls, and viewport containment.",
  "description": "A draggable, resizable floating window/panel with a title bar, close/minimize/maximize controls, and viewport containment.",
  "attributes": [
    {
      "name": "open",
      "type": "boolean",
      "default": "",
      "desc": "Whether the window is visible"
    },
    {
      "name": "x",
      "type": "number",
      "default": "80",
      "desc": "Initial horizontal position in px"
    },
    {
      "name": "y",
      "type": "number",
      "default": "80",
      "desc": "Initial vertical position in px"
    },
    {
      "name": "width",
      "type": "number",
      "default": "360",
      "desc": "Initial width in px"
    },
    {
      "name": "height",
      "type": "number",
      "default": "240",
      "desc": "Initial height in px"
    },
    {
      "name": "title",
      "type": "string",
      "default": "",
      "desc": "Window title bar text"
    },
    {
      "name": "modal",
      "type": "boolean",
      "default": "",
      "desc": "Dim the background behind the window"
    }
  ],
  "events": [
    "move",
    "resize",
    "close"
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "flow",
  "title": "Flow",
  "category": "Display",
  "blurb": "A lightweight node-graph / flowchart canvas that composes with light-DOM pura-flow-node children positioned by x/y attributes, and edges declared via the host edges attribute or slotted pura-flow-edge children.",
  "description": "A lightweight node-graph / flowchart canvas that composes with light-DOM pura-flow-node children positioned by x/y attributes, and edges declared via the host edges attribute or slotted pura-flow-edge children.",
  "attributes": [
    {
      "name": "width",
      "type": "string",
      "default": "",
      "desc": "Canvas width (px number or CSS length)"
    },
    {
      "name": "height",
      "type": "string",
      "default": "400px",
      "desc": "Canvas height (px number or CSS length)"
    },
    {
      "name": "edges",
      "type": "string",
      "default": "",
      "desc": "JSON array of edge objects [{from, to}]"
    },
    {
      "name": "readonly",
      "type": "boolean",
      "default": "",
      "desc": "Disables node dragging when present"
    }
  ],
  "events": [
    "nodemove"
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "form",
  "title": "Form",
  "category": "Form",
  "blurb": "A form orchestrator that wraps a slotted native form or bare pura inputs, gathers named values, runs validation, and dispatches a submit CustomEvent while preventing native navigation.",
  "description": "A form orchestrator that wraps a slotted native form or bare pura inputs, gathers named values, runs validation, and dispatches a submit CustomEvent while preventing native navigation.",
  "attributes": [],
  "events": [
    "submit"
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "gauge",
  "title": "Gauge",
  "category": "Display",
  "blurb": "Semicircular meter that shows a value within a range, with a filled arc, needle, and center readout.",
  "description": "`<pura-gauge>` is a read-only meter: it draws a 180-degree SVG arc filled from `min` to `value`, with a needle that rotates and the numeric value plus an optional label in the center. Use it to indicate progress, occupancy, a score, or any scalar reading (CPU usage, NPS, battery). Beyond role=\"meter\" with full ARIA, it exposes an agent-native layer: `data-pura-gauge-*` attributes mirror the live state, and each instance registers itself in `window.__puraGauges` (by `data-pura-id`), so an agent can enumerate and read every gauge on the page without inspecting the internal DOM.",
  "attributes": [
    {
      "name": "value",
      "type": "number",
      "default": "0",
      "desc": "Current reading, clamped within [min, max]."
    },
    {
      "name": "min",
      "type": "number",
      "default": "0",
      "desc": "Start of the scale."
    },
    {
      "name": "max",
      "type": "number",
      "default": "100",
      "desc": "End of the scale. If max <= min, it becomes min+1."
    },
    {
      "name": "label",
      "type": "string",
      "default": "\"\"",
      "desc": "Caption shown below the value and used as the accessible name."
    }
  ],
  "events": [],
  "slots": [],
  "demoHTML": "<div style=\"display:flex;gap:2rem;flex-wrap:wrap;align-items:flex-end\">\n  <pura-gauge id=\"cpu\" value=\"72\" min=\"0\" max=\"100\" label=\"CPU usage\" style=\"width:12rem\"></pura-gauge>\n  <pura-gauge value=\"8.4\" min=\"0\" max=\"10\" label=\"NPS\" style=\"width:12rem\"></pura-gauge>\n  <pura-gauge value=\"430\" min=\"0\" max=\"500\" label=\"Points\" style=\"width:12rem\"></pura-gauge>\n</div>\n<button id=\"randomizar\" style=\"margin-top:1rem\">Update CPU</button>\n<script type=\"module\">\n  import \"/pura/lib/gauge.js\";\n  document.getElementById(\"randomizar\").addEventListener(\"click\", () => {\n    document.getElementById(\"cpu\").value = Math.round(Math.random() * 100);\n  });\n</script>",
  "usage": "<pura-gauge value=\"72\" min=\"0\" max=\"100\" label=\"CPU usage\" style=\"width:12rem\"></pura-gauge>\n\n<!-- Update via property or attribute -->\n<script type=\"module\">\n  import \"/pura/lib/gauge.js\";\n  const g = document.querySelector(\"pura-gauge\");\n  g.value = 85; // also accepts setAttribute(\"value\", \"85\")\n</script>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "grid-pattern",
  "title": "Grid Pattern",
  "category": "Display",
  "blurb": "A tiled grid backdrop with a glowing patch that sweeps across it. Pure CSS @keyframes on a moving mask, SSR-safe, reduced-motion aware.",
  "description": "`<pura-grid-pattern>` lays a tiled grid behind its slotted content and sweeps a glowing patch across it, in the style of Magic UI's (Animated) Grid Pattern. A dim base grid is always visible; a brighter copy is revealed through a moving radial mask, so the motion is one pure CSS `@keyframes` with no animation runtime. Add the `dots` attribute for a dot grid, and theme with `--pura-grid-line`, `--pura-grid-glow`, `--pura-grid-cell`, `--pura-grid-spot` (glow size), and `--pura-grid-duration`. Under reduced motion the glow rests in one spot via the base reset. It registers in `window.__puraGridPatterns` by `data-pura-id` for agent enumeration.",
  "attributes": [
    {
      "name": "dots",
      "type": "boolean",
      "default": "false",
      "desc": "Render dots instead of crossed grid lines."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "demoHTML": "<pura-grid-pattern style=\"border-radius: 12px; background: #07080f; --pura-grid-glow: #6366f1;\">\n  <div style=\"padding: 3.5rem 1.5rem; text-align: center; font: 700 22px system-ui; color: #fff; letter-spacing: -.02em;\">\n    Grid Pattern\n    <div style=\"font-weight: 400; font-size: 13px; color: rgba(255,255,255,.7); margin-top: .4rem;\">A glow drifts across the grid, pure CSS.</div>\n  </div>\n</pura-grid-pattern>",
  "usage": "<pura-grid-pattern>\n  <section class=\"hero\">Content over a grid</section>\n</pura-grid-pattern>\n\n<!-- Dot grid, custom glow -->\n<pura-grid-pattern dots style=\"--pura-grid-glow: #22c55e;\">\n  <div>...</div>\n</pura-grid-pattern>",
  "animation": true,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "grid",
  "title": "Grid",
  "category": "Primitives",
  "blurb": "CSS grid container primitive for building themeable, responsive two-dimensional layouts.",
  "description": "`<pura-grid>` is a native web component that wraps a CSS grid container, exposing layout controls through plain attributes. A bare integer on `cols` or `rows` expands to `repeat(n, 1fr)`, while any other value is passed through as a raw track list, and `gap` accepts the theme space scale (1-6) or any CSS length. When `cols` is omitted, it falls back to a responsive `auto-fit` layout driven by `min`, defaulting to a sensible 16rem minimum track.",
  "attributes": [
    {
      "name": "cols",
      "type": "number | string",
      "default": "",
      "desc": "Column tracks: a bare integer becomes repeat(n, 1fr), or pass a raw track list such as \"1fr 2fr\" or \"200px 1fr\". When omitted, falls back to a responsive auto-fit layout."
    },
    {
      "name": "rows",
      "type": "number | string",
      "default": "none",
      "desc": "Row tracks: a bare integer becomes repeat(n, 1fr), or pass a raw track list."
    },
    {
      "name": "gap",
      "type": "number | string",
      "default": "4",
      "desc": "Gap between items: a space scale value (1-6) maps to var(--pura-space-N), or any CSS length such as \"2rem\"."
    },
    {
      "name": "align",
      "type": "string",
      "default": "stretch",
      "desc": "align-items value (start, center, end, stretch, baseline...)."
    },
    {
      "name": "justify",
      "type": "string",
      "default": "stretch",
      "desc": "justify-items value (start, center, end, stretch...)."
    },
    {
      "name": "flow",
      "type": "string",
      "default": "row",
      "desc": "grid-auto-flow value (row, column, dense, \"row dense\"...)."
    },
    {
      "name": "min",
      "type": "string",
      "default": "16rem",
      "desc": "Minimum track size for the responsive auto-fit fallback, applied only when cols is not set."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "demoHTML": "<div style=\"display:flex; flex-direction:column; gap:1.5rem\">\n  <pura-grid cols=\"3\" gap=\"3\">\n    <div style=\"background:#eef;padding:1rem;border-radius:8px\">One</div>\n    <div style=\"background:#eef;padding:1rem;border-radius:8px\">Two</div>\n    <div style=\"background:#eef;padding:1rem;border-radius:8px\">Three</div>\n  </pura-grid>\n\n  <pura-grid cols=\"1fr 2fr\" gap=\"4\">\n    <div style=\"background:#efe;padding:1rem;border-radius:8px\">Sidebar</div>\n    <div style=\"background:#efe;padding:1rem;border-radius:8px\">Main content area</div>\n  </pura-grid>\n\n  <pura-grid min=\"12rem\" gap=\"2\">\n    <div style=\"background:#fee;padding:1rem;border-radius:8px\">Auto-fit A</div>\n    <div style=\"background:#fee;padding:1rem;border-radius:8px\">Auto-fit B</div>\n    <div style=\"background:#fee;padding:1rem;border-radius:8px\">Auto-fit C</div>\n    <div style=\"background:#fee;padding:1rem;border-radius:8px\">Auto-fit D</div>\n  </pura-grid>\n</div>\n<script type=\"module\" src=\"/pura/lib/grid.js\"></script>",
  "usage": "<pura-grid cols=\"3\" gap=\"3\">\n  <div>One</div>\n  <div>Two</div>\n  <div>Three</div>\n</pura-grid>\n\n<pura-grid cols=\"1fr 2fr\" gap=\"4\" align=\"center\">\n  <div>Sidebar</div>\n  <div>Main content area</div>\n</pura-grid>\n\n<pura-grid min=\"12rem\" gap=\"2\">\n  <div>Auto-fit A</div>\n  <div>Auto-fit B</div>\n  <div>Auto-fit C</div>\n  <div>Auto-fit D</div>\n</pura-grid>\n<script type=\"module\" src=\"/pura/lib/grid.js\"></script>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "heading",
  "title": "Heading",
  "category": "Primitives",
  "blurb": "A semantic heading primitive that renders a real h1-h6 tag for a correct document outline while keeping visual size fully independent and themeable.",
  "description": "pura-heading renders an actual heading element (h1 through h6) in its shadow root based on the level attribute, so the document outline stays semantically correct. Visual size, weight, color, alignment, and letter-spacing are controlled separately through tokens, letting you decouple how a heading looks from where it sits in the hierarchy. All sizes and colors trace back to Pura design tokens, so headings stay consistent across themes.",
  "attributes": [
    {
      "name": "level",
      "type": "1 | 2 | 3 | 4 | 5 | 6",
      "default": "2",
      "desc": "Semantic heading level. Renders the matching h1-h6 tag and sets the default visual size when no size is given."
    },
    {
      "name": "size",
      "type": "xs | sm | md | lg | xl | 2xl | 3xl",
      "default": "(derived from level)",
      "desc": "Overrides the visual size independently of the semantic level."
    },
    {
      "name": "weight",
      "type": "400 | 500 | 600 | 700 | 800",
      "default": "700",
      "desc": "Font weight of the heading text."
    },
    {
      "name": "color",
      "type": "fg | muted | primary | accent | success | danger",
      "default": "fg",
      "desc": "Text color, mapped to a Pura color token."
    },
    {
      "name": "align",
      "type": "start | center | end | justify",
      "default": "start",
      "desc": "Horizontal text alignment."
    },
    {
      "name": "tracking",
      "type": "tight | normal | wide",
      "default": "tight",
      "desc": "Letter-spacing of the heading text."
    }
  ],
  "events": [],
  "slots": [
    "default — the heading text content"
  ],
  "demoHTML": "<script type=\"module\" src=\"/pura/lib/heading.js\"></script>\n\n<pura-heading level=\"1\">Welcome to Pura</pura-heading>\n<pura-heading level=\"2\" color=\"muted\">A small, token-driven component kit</pura-heading>\n\n<pura-heading level=\"2\" size=\"3xl\" color=\"primary\">Big and bold</pura-heading>\n<pura-heading level=\"3\" weight=\"500\" tracking=\"wide\">Lighter, wider tracking</pura-heading>\n<pura-heading level=\"2\" align=\"center\" color=\"accent\">Centered accent heading</pura-heading>\n<pura-heading level=\"4\" size=\"sm\" color=\"danger\">Compact danger label</pura-heading>",
  "usage": "<script type=\"module\" src=\"/pura/lib/heading.js\"></script>\n\n<!-- Semantic level drives both the tag and the default size -->\n<pura-heading level=\"1\">Page title</pura-heading>\n\n<!-- Keep the semantic level but override the visual size -->\n<pura-heading level=\"2\" size=\"lg\">Section title that looks smaller</pura-heading>\n\n<!-- Tune weight, color, alignment, and tracking -->\n<pura-heading level=\"3\" weight=\"600\" color=\"primary\" align=\"center\" tracking=\"normal\">\n  Styled subheading\n</pura-heading>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "heatmap",
  "title": "Heatmap",
  "category": "Display",
  "blurb": "A calendar or matrix heatmap (GitHub contributions style) that accepts data via the data property or attribute and renders intensity buckets using design tokens.",
  "description": "A calendar or matrix heatmap (GitHub contributions style) that accepts data via the data property or attribute and renders intensity buckets using design tokens.",
  "attributes": [
    {
      "name": "type",
      "type": "string",
      "default": "calendar",
      "desc": "Display mode: calendar or matrix"
    },
    {
      "name": "weeks",
      "type": "number",
      "default": "53",
      "desc": "Number of week columns to render in calendar mode"
    },
    {
      "name": "end",
      "type": "string",
      "default": "",
      "desc": "End date (YYYY-MM-DD) for calendar mode; defaults to today"
    },
    {
      "name": "data",
      "type": "string",
      "default": "",
      "desc": "JSON data: {YYYY-MM-DD: count} map for calendar or 2D number array for matrix"
    }
  ],
  "events": [
    "cellclick"
  ],
  "slots": [],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "highlight",
  "title": "Highlight",
  "category": "Display",
  "blurb": "Wraps matched substrings of its text content in mark elements, supporting comma-separated query terms, case sensitivity control, and whole-word matching.",
  "description": "Wraps matched substrings of its text content in mark elements, supporting comma-separated query terms, case sensitivity control, and whole-word matching.",
  "attributes": [
    {
      "name": "query",
      "type": "string",
      "default": "",
      "desc": "String or comma-separated terms to highlight"
    },
    {
      "name": "text",
      "type": "string",
      "default": "",
      "desc": "Text content to search; falls back to textContent when absent"
    },
    {
      "name": "ignore-case",
      "type": "boolean",
      "default": "true",
      "desc": "Case-insensitive matching (set to false to enable case-sensitive)"
    },
    {
      "name": "whole-word",
      "type": "boolean",
      "default": "",
      "desc": "Match only on word boundaries when present"
    }
  ],
  "events": [],
  "slots": [],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "hotkey",
  "title": "Hotkey",
  "category": "Agent",
  "blurb": "Declarative, invisible binder for global keyboard shortcuts, with a machine-readable layer.",
  "description": "<pura-hotkey> registers a global keyboard shortcut on the document and fires the `trigger` event when the combo is pressed, and it can activate a target element via CSS selector without writing any script. Use it when you need shortcuts (mod+k, Ctrl+Shift+P, etc.) that open dialogs, trigger buttons, or drive any control declaratively. Being agent-native, it reflects data-* on the host (data-pura-hotkey, data-keys, data-combo, data-target), exposes aria-keyshortcuts, and registers itself in window.__puraHotkeys with .list(), .find(keys), and .trigger(keys), letting agents enumerate and fire every shortcut on the page without touching the shadow DOM.",
  "attributes": [
    {
      "name": "keys",
      "type": "string",
      "default": "",
      "desc": "The combo to bind, e.g. \"mod+k\", \"Ctrl Shift P\", \"⌘ /\". `mod` becomes ⌘ on Apple and Ctrl elsewhere. Empty/absent => no binding."
    },
    {
      "name": "target",
      "type": "string",
      "default": "",
      "desc": "Optional CSS selector; on trigger, the first match is activated (focus + click on buttons/links, or .show()/.open()/.click() if exposed)."
    },
    {
      "name": "when",
      "type": "string",
      "default": "",
      "desc": "Optional CSS selector that must exist in the document for the binding to be active (scopes the shortcut to a state)."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "While present, the binding is inert."
    },
    {
      "name": "allow-in-input",
      "type": "boolean",
      "default": "false",
      "desc": "By default the combo is ignored while typing in input/textarea/select/contenteditable. Enable to let it fire inside fields (modifier combos, such as mod+k, always fire)."
    },
    {
      "name": "prevent-default",
      "type": "boolean",
      "default": "true para combos com modificador",
      "desc": "When set, prevents the browser's default action on keydown. On by default for combos that have a modifier."
    }
  ],
  "events": [
    "trigger"
  ],
  "slots": [],
  "demoHTML": "<div style=\"font-family:system-ui;display:flex;flex-direction:column;gap:12px;max-width:420px\">\n  <p>Press <kbd>mod+k</kbd> (⌘K on Mac, Ctrl+K elsewhere) or click the button to open search.</p>\n  <button id=\"abrir-busca\">Open search</button>\n  <dialog id=\"busca\" style=\"border:1px solid #ccc;border-radius:8px;padding:16px\">\n    <p>Search opened by the shortcut.</p>\n    <form method=\"dialog\"><button>Close</button></form>\n  </dialog>\n\n  <pura-hotkey keys=\"mod+k\" target=\"#abrir-busca\"></pura-hotkey>\n</div>\n\n<script type=\"module\">\n  import \"/pura/lib/hotkey.js\";\n  const btn = document.getElementById(\"abrir-busca\");\n  const dlg = document.getElementById(\"busca\");\n  btn.addEventListener(\"click\", () => dlg.showModal());\n</script>",
  "usage": "<button id=\"abrir-busca\">Open search</button>\n<dialog id=\"busca\">\n  <p>Search opened by the shortcut.</p>\n  <form method=\"dialog\"><button>Close</button></form>\n</dialog>\n\n<!-- mod+k activates the button (focus + click); the button opens the dialog -->\n<pura-hotkey keys=\"mod+k\" target=\"#abrir-busca\"></pura-hotkey>\n\n<script type=\"module\">\n  import \"/pura/lib/hotkey.js\";\n  const btn = document.getElementById(\"abrir-busca\");\n  const dlg = document.getElementById(\"busca\");\n  btn.addEventListener(\"click\", () => dlg.showModal());\n</script>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "hover-card",
  "title": "Hover Card",
  "category": "Overlay",
  "blurb": "Informational card that reveals rich content when you hover over or focus the trigger.",
  "description": "The Hover Card is a native web component (pura-hover-card) that shows a non-modal card with rich content when the user hovers over or focuses the trigger. It uses the native Popover API (top layer, light dismiss, and ESC included) with CSS anchor positioning, plus configurable open and close delays. Useful for profile previews, definitions, links, and any contextual detail that should not interrupt the user's flow.",
  "attributes": [
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "desc": "Controls/reflects the visibility of the card; present when open."
    },
    {
      "name": "placement",
      "type": "\"bottom\" | \"top\" | \"left\" | \"right\"",
      "default": "bottom",
      "desc": "Position of the card relative to the trigger."
    },
    {
      "name": "open-delay",
      "type": "number (ms)",
      "default": "150",
      "desc": "Delay in milliseconds before opening when user intent is detected."
    },
    {
      "name": "close-delay",
      "type": "number (ms)",
      "default": "150",
      "desc": "Delay in milliseconds before closing when leaving the trigger and the card."
    }
  ],
  "events": [
    "open",
    "close"
  ],
  "slots": [
    "trigger",
    "default"
  ],
  "demoHTML": "<pura-hover-card placement=\"bottom\">\n  <a slot=\"trigger\" href=\"#\" style=\"color: var(--pura-accent, #4f46e5); text-decoration: underline;\">@andre</a>\n\n  <div style=\"display: flex; gap: 12px; align-items: flex-start;\">\n    <img src=\"https://i.pravatar.cc/48?img=12\" alt=\"André\" width=\"48\" height=\"48\" style=\"border-radius: 50%;\" />\n    <div>\n      <strong>André Ahlert</strong>\n      <p style=\"margin: 4px 0 8px;\">Founder of AEX Partners. Building tools for the native web.</p>\n      <small style=\"color: var(--pura-muted, #6b7280);\">Joined March 2021</small>\n    </div>\n  </div>\n</pura-hover-card>",
  "usage": "<pura-hover-card placement=\"bottom\">\n  <a slot=\"trigger\" href=\"#\" style=\"color: var(--pura-accent, #4f46e5); text-decoration: underline;\">@andre</a>\n\n  <div style=\"display: flex; gap: 12px; align-items: flex-start;\">\n    <img src=\"https://i.pravatar.cc/48?img=12\" alt=\"André\" width=\"48\" height=\"48\" style=\"border-radius: 50%;\" />\n    <div>\n      <strong>André Ahlert</strong>\n      <p style=\"margin: 4px 0 8px;\">Founder of AEX Partners. Building tools for the native web.</p>\n      <small style=\"color: var(--pura-muted, #6b7280);\">Joined March 2021</small>\n    </div>\n  </div>\n</pura-hover-card>\n\n<!-- Attributes: open, placement (bottom|top|left|right), open-delay, close-delay -->\n<!-- Events: open, close — Methods: show(), hide() -->",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "icon",
  "title": "Icon",
  "category": "Display",
  "blurb": "A generic inline icon renderer that renders from either a slotted SVG or an SVG path d string attribute, using currentColor stroke so color follows CSS.",
  "description": "A generic inline icon renderer that renders from either a slotted SVG or an SVG path d string attribute, using currentColor stroke so color follows CSS.",
  "attributes": [
    {
      "name": "path",
      "type": "string",
      "default": "",
      "desc": "SVG path d string to render as an inline icon"
    },
    {
      "name": "d",
      "type": "string",
      "default": "",
      "desc": "Alias for path: SVG path d string to render"
    },
    {
      "name": "size",
      "type": "string",
      "default": "1.25rem",
      "desc": "Width and height of the icon"
    },
    {
      "name": "stroke-width",
      "type": "number",
      "default": "2",
      "desc": "SVG stroke width"
    },
    {
      "name": "label",
      "type": "string",
      "default": "",
      "desc": "Accessible aria-label; when absent the icon is aria-hidden"
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "idle",
  "title": "Idle",
  "category": "Agent",
  "blurb": "Invisible inactivity detector that switches between the \"active\" and \"idle\" states after a period without user interaction.",
  "description": "`<pura-idle>` is a non-visual wrapper (display: contents) that monitors input events and fires the transition to idle when the inactivity time expires, useful for auto-save, auto-lock, and \"are you still there?\" prompts. Being agent-native, it exposes a machine-readable layer: `data-*` attributes on the light host, the `status` ARIA role/`aria-live`, and a global registry `window.__puraIdle` (with `.anyActive()` / `.allIdle()`) that lets agents inspect human presence across the whole page without touching the shadow DOM. Use it when you need to react to the user's absence or signal that presence programmatically.",
  "attributes": [
    {
      "name": "timeout",
      "type": "number",
      "default": "60000",
      "desc": "Inactivity window in ms before going idle. Non-numeric or negative values fall back to the default."
    },
    {
      "name": "events",
      "type": "string",
      "default": "mousemove keydown pointerdown wheel touchstart scroll",
      "desc": "Space-separated list of input events to observe. An empty attribute keeps the defaults."
    },
    {
      "name": "target",
      "type": "string",
      "default": "document",
      "desc": "Where to listen: \"document\" | \"window\" | \"self\" (host only, scoped activity)."
    },
    {
      "name": "paused",
      "type": "boolean",
      "default": "false",
      "desc": "When present, suspends the timer (always reported as active, no transitions) until it is removed."
    }
  ],
  "events": [
    "idle",
    "active",
    "pura-idle:change"
  ],
  "slots": [
    "(default)"
  ],
  "demoHTML": "<div style=\"font-family: system-ui; max-width: 420px;\">\n  <pura-idle id=\"detector\" timeout=\"3000\">\n    <div id=\"painel\" style=\"padding: 16px; border: 1px solid #ddd; border-radius: 8px;\">\n      <p>State: <strong id=\"estado\">active</strong></p>\n      <p style=\"color:#666; font-size:13px;\">Stop moving the mouse and keyboard for 3 seconds to see the state turn \"idle\".</p>\n      <button id=\"ping\" type=\"button\">I'm here (reset)</button>\n    </div>\n  </pura-idle>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/idle.js\";\n  const det = document.getElementById(\"detector\");\n  const estado = document.getElementById(\"estado\");\n  const painel = document.getElementById(\"painel\");\n  det.addEventListener(\"pura-idle:change\", (e) => {\n    const ocioso = e.detail.idle;\n    estado.textContent = ocioso ? \"idle\" : \"active\";\n    painel.style.opacity = ocioso ? \"0.5\" : \"1\";\n  });\n  document.getElementById(\"ping\").addEventListener(\"click\", () => det.reset());\n</script>",
  "usage": "<pura-idle id=\"detector\" timeout=\"3000\">\n  <div id=\"painel\" style=\"padding: 16px; border: 1px solid #ddd; border-radius: 8px;\">\n    <p>State: <strong id=\"estado\">active</strong></p>\n    <p style=\"color:#666; font-size:13px;\">Stop moving the mouse and keyboard for 3 seconds to see the state turn \"idle\".</p>\n    <button id=\"ping\" type=\"button\">I'm here (reset)</button>\n  </div>\n</pura-idle>\n<script type=\"module\">\n  import \"/pura/lib/idle.js\";\n  const det = document.getElementById(\"detector\");\n  const estado = document.getElementById(\"estado\");\n  const painel = document.getElementById(\"painel\");\n  det.addEventListener(\"pura-idle:change\", (e) => {\n    const ocioso = e.detail.idle;\n    estado.textContent = ocioso ? \"idle\" : \"active\";\n    painel.style.opacity = ocioso ? \"0.5\" : \"1\";\n  });\n  document.getElementById(\"ping\").addEventListener(\"click\", () => det.reset());\n</script>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "image-compare",
  "title": "Image Compare",
  "category": "Layout",
  "blurb": "Before/after comparison slider that reveals two stacked images as the handle is dragged.",
  "description": "Stacks two images in layers and uses a draggable vertical handle to clip the \"after\" layer, revealing more or less of it as the position changes. Use it for side-by-side visual comparisons, such as photo editing, before/after of renovations, or design tweaks. Each instance has an agent-native layer: it mirrors the live state in data-pura-* attributes and registers itself in window.__puraImageCompares by its data-pura-id, letting agents read and drive the comparison without touching the DOM.",
  "attributes": [
    {
      "name": "value",
      "type": "number",
      "default": "50",
      "desc": "Handle position from 0 to 100. 0 shows only the 'before' image, 100 shows only the 'after'. Reflected back to the host attribute."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Before/after comparison",
      "desc": "Accessible label for the slider, applied as aria-label on the handle."
    }
  ],
  "events": [
    "input",
    "change"
  ],
  "slots": [
    "before",
    "after"
  ],
  "demoHTML": "<div style=\"max-width:520px\">\n  <pura-image-compare value=\"50\" label=\"Before and after renovation comparison\" style=\"border:1px solid var(--pura-border)\">\n    <img slot=\"before\" src=\"https://picsum.photos/id/1018/800/500\" alt=\"Before the renovation\">\n    <img slot=\"after\" src=\"https://picsum.photos/id/1015/800/500\" alt=\"After the renovation\">\n  </pura-image-compare>\n</div>",
  "usage": "<pura-image-compare value=\"50\" label=\"Before and after renovation comparison\">\n  <img slot=\"before\" src=\"/img/antes.jpg\" alt=\"Before the renovation\">\n  <img slot=\"after\" src=\"/img/depois.jpg\" alt=\"After the renovation\">\n</pura-image-compare>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "image",
  "title": "Image",
  "category": "Primitives",
  "blurb": "A lazy-loaded image primitive that wraps an img inside an aspect-ratio box with configurable fit and corner rounding.",
  "description": "The pura-image primitive renders an img inside an aspect-ratio frame, with lazy loading and async decoding enabled by default. It is purely attribute-driven: set the source, aspect ratio, object-fit, corner radius, and explicit dimensions through attributes. It degrades gracefully when no src is provided, showing the subtle background of the frame.",
  "attributes": [
    {
      "name": "src",
      "type": "string",
      "default": "",
      "desc": "Image URL. When omitted, the frame renders empty with a subtle background."
    },
    {
      "name": "alt",
      "type": "string",
      "default": "\"\"",
      "desc": "Alternative text for the image. Defaults to an empty string."
    },
    {
      "name": "ratio",
      "type": "string",
      "default": "auto",
      "desc": "Aspect ratio of the frame, e.g. \"16/9\", \"1/1\", \"4/3\"."
    },
    {
      "name": "fit",
      "type": "\"cover\" | \"contain\" | \"fill\"",
      "default": "cover",
      "desc": "object-fit behavior of the image within the frame."
    },
    {
      "name": "radius",
      "type": "\"sm\" | \"md\" | \"lg\" | \"full\"",
      "default": "",
      "desc": "Corner rounding applied to the frame, mapped to the --pura-radius tokens."
    },
    {
      "name": "w",
      "type": "string | number",
      "default": "auto",
      "desc": "Explicit width. A bare number is coerced to px; any other CSS length is passed through."
    },
    {
      "name": "h",
      "type": "string | number",
      "default": "auto",
      "desc": "Explicit height. A bare number is coerced to px; any other CSS length is passed through."
    }
  ],
  "events": [],
  "slots": [],
  "demoHTML": "<script type=\"module\" src=\"/pura/lib/image.js\"></script>\n\n<!-- Basic image with a 16/9 ratio -->\n<pura-image\n  src=\"https://images.unsplash.com/photo-1506744038136-46273834b3fb\"\n  alt=\"A misty lake surrounded by mountains\"\n  ratio=\"16/9\"\n  w=\"320\"\n></pura-image>\n\n<!-- Square avatar with full rounding -->\n<pura-image\n  src=\"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde\"\n  alt=\"Profile photo\"\n  ratio=\"1/1\"\n  radius=\"full\"\n  w=\"96\"\n></pura-image>\n\n<!-- Contain fit with rounded corners -->\n<pura-image\n  src=\"https://images.unsplash.com/photo-1465101046530-73398c7f28ca\"\n  alt=\"Logo on a light background\"\n  ratio=\"4/3\"\n  fit=\"contain\"\n  radius=\"lg\"\n  w=\"240\"\n></pura-image>\n\n<!-- Empty placeholder (no src) -->\n<pura-image ratio=\"1/1\" w=\"120\" radius=\"md\"></pura-image>",
  "usage": "<script type=\"module\" src=\"/pura/lib/image.js\"></script>\n\n<!-- Responsive cover image -->\n<pura-image\n  src=\"/assets/hero.jpg\"\n  alt=\"Team working together\"\n  ratio=\"16/9\"\n  fit=\"cover\"\n  radius=\"md\"\n></pura-image>\n\n<!-- Fixed-size rounded avatar -->\n<pura-image\n  src=\"/assets/avatar.png\"\n  alt=\"Jane Doe\"\n  ratio=\"1/1\"\n  radius=\"full\"\n  w=\"48\"\n  h=\"48\"\n></pura-image>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "infinite-scroll",
  "title": "Infinite Scroll",
  "category": "Utility",
  "blurb": "Fires a load event when the user nears the bottom of the content using an IntersectionObserver on a sentinel element, with optional loading and done states.",
  "description": "Fires a load event when the user nears the bottom of the content using an IntersectionObserver on a sentinel element, with optional loading and done states.",
  "attributes": [
    {
      "name": "threshold",
      "type": "number",
      "default": "200",
      "desc": "Pixels of rootMargin slack before the sentinel triggers a load event"
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "",
      "desc": "Stop observing the sentinel when present"
    },
    {
      "name": "loading",
      "type": "boolean",
      "default": "",
      "desc": "Show spinner and loading label, suppress further loads"
    },
    {
      "name": "done",
      "type": "boolean",
      "default": "",
      "desc": "Show end message and stop firing load events"
    },
    {
      "name": "height",
      "type": "string",
      "default": "",
      "desc": "Host scroll container height (px or CSS length)"
    },
    {
      "name": "window",
      "type": "boolean",
      "default": "",
      "desc": "Observe the document viewport instead of the host container"
    }
  ],
  "events": [
    "load"
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "inline-edit",
  "title": "Inline Edit",
  "category": "Form",
  "blurb": "A click-to-edit text component that shows a read-only value and swaps into an input or textarea in place on click, with confirm and cancel actions.",
  "description": "A click-to-edit text component that shows a read-only value and swaps into an input or textarea in place on click, with confirm and cancel actions.",
  "attributes": [
    {
      "name": "value",
      "type": "string",
      "default": "",
      "desc": "The current text value"
    },
    {
      "name": "placeholder",
      "type": "string",
      "default": "",
      "desc": "Placeholder text shown when the value is empty"
    },
    {
      "name": "multiline",
      "type": "boolean",
      "default": "",
      "desc": "Use a textarea instead of a single-line input"
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "",
      "desc": "Prevent entering edit mode"
    },
    {
      "name": "editing",
      "type": "boolean",
      "default": "",
      "desc": "Boolean state attribute to programmatically control edit mode"
    },
    {
      "name": "submit-on-blur",
      "type": "boolean",
      "default": "",
      "desc": "Confirm the edit when the field loses focus"
    }
  ],
  "events": [
    "change",
    "cancel"
  ],
  "slots": [],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "input-group",
  "title": "Input Group",
  "category": "Form",
  "blurb": "Groups a text field with prefixes and suffixes inside a single container with a shared border.",
  "description": "Input Group is a native web component that wraps an input control (a plain <input> or a <pura-input>) together with optional addons in the prefix and suffix slots, all inside a single rounded container with a shared focus ring (:focus-within). Use it when you need to attach icons, text, unit symbols, or buttons directly to the field, as in currency values, URLs, or searches. The disabled and invalid states mirror the visual behavior of pura-input.",
  "attributes": [
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables the group, lowering opacity and blocking interaction with the slotted content."
    },
    {
      "name": "invalid",
      "type": "boolean",
      "default": "false",
      "desc": "Applies the error style (border and ring in the danger color) to the container."
    }
  ],
  "events": [],
  "slots": [
    "default",
    "prefix",
    "suffix"
  ],
  "demoHTML": "<pura-input-group>\n  <span slot=\"prefix\">$</span>\n  <input type=\"text\" inputmode=\"decimal\" placeholder=\"0.00\" aria-label=\"Amount\" />\n  <span slot=\"suffix\">USD</span>\n</pura-input-group>\n\n<pura-input-group style=\"margin-top: 12px;\">\n  <span slot=\"prefix\">https://</span>\n  <input type=\"text\" placeholder=\"my-site\" aria-label=\"Website address\" />\n  <span slot=\"suffix\">.com</span>\n</pura-input-group>\n\n<pura-input-group invalid style=\"margin-top: 12px;\">\n  <input type=\"email\" placeholder=\"you@email.com\" aria-label=\"Email\" value=\"invalid-email\" />\n  <span slot=\"suffix\">!</span>\n</pura-input-group>",
  "usage": "<pura-input-group>\n  <span slot=\"prefix\">$</span>\n  <input type=\"text\" inputmode=\"decimal\" placeholder=\"0.00\" aria-label=\"Amount\" />\n  <span slot=\"suffix\">USD</span>\n</pura-input-group>\n\n<pura-input-group>\n  <span slot=\"prefix\">https://</span>\n  <input type=\"text\" placeholder=\"my-site\" aria-label=\"Website address\" />\n  <span slot=\"suffix\">.com</span>\n</pura-input-group>\n\n<pura-input-group invalid>\n  <input type=\"email\" placeholder=\"you@email.com\" aria-label=\"Email\" value=\"invalid-email\" />\n  <span slot=\"suffix\">!</span>\n</pura-input-group>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "number-input",
      "title": "Number Input"
    },
    {
      "slug": "stepper",
      "title": "Stepper"
    },
    {
      "slug": "item",
      "title": "Item"
    },
    {
      "slug": "separator",
      "title": "Separator"
    },
    {
      "slug": "card",
      "title": "Card"
    },
    {
      "slug": "badge",
      "title": "Badge"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "checkout",
      "title": "Checkout"
    }
  ]
},
{
  "slug": "input-otp",
  "title": "Input OTP",
  "category": "Form",
  "blurb": "Single-digit fields for one-time codes (OTP), with auto-advance and smart paste.",
  "description": "Input OTP is a native web component that renders a series of single-character boxes for entering verification codes (one-time code). Typing advances automatically, Backspace goes back and clears, the arrow keys navigate, and pasting a code fills all boxes at once. Use it in two-factor authentication flows, email or SMS verification, and PIN confirmations.",
  "attributes": [
    {
      "name": "length",
      "type": "number",
      "default": "6",
      "desc": "Number of digit boxes rendered."
    },
    {
      "name": "value",
      "type": "string",
      "default": "\"\"",
      "desc": "Current code; mirrored to the attribute on every change."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables all input boxes."
    },
    {
      "name": "invalid",
      "type": "boolean",
      "default": "false",
      "desc": "Applies the error style and sets aria-invalid."
    },
    {
      "name": "alphanumeric",
      "type": "boolean",
      "default": "false",
      "desc": "Accepts letters and numbers; without it, digits only."
    },
    {
      "name": "mono",
      "type": "boolean",
      "default": "false",
      "desc": "Uses a monospaced font in the boxes."
    }
  ],
  "events": [
    "input",
    "complete"
  ],
  "slots": [],
  "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:.75rem;align-items:flex-start\">\n  <label style=\"font-size:.875rem;font-weight:550\">Enter the verification code</label>\n  <pura-input-otp id=\"otp\" length=\"6\" mono></pura-input-otp>\n  <small id=\"otp-status\" style=\"color:var(--pura-muted-fg)\">6 digits sent to your email.</small>\n</div>\n<script type=\"module\">\n  const otp = document.getElementById(\"otp\");\n  const status = document.getElementById(\"otp-status\");\n  otp.addEventListener(\"complete\", (e) => {\n    status.textContent = \"Code complete: \" + e.detail.value;\n  });\n</script>",
  "usage": "<div style=\"display:flex;flex-direction:column;gap:.75rem;align-items:flex-start\">\n  <label style=\"font-size:.875rem;font-weight:550\">Enter the verification code</label>\n  <pura-input-otp id=\"otp\" length=\"6\" mono></pura-input-otp>\n  <small id=\"otp-status\" style=\"color:var(--pura-muted-fg)\">6 digits sent to your email.</small>\n</div>\n<script type=\"module\">\n  const otp = document.getElementById(\"otp\");\n  const status = document.getElementById(\"otp-status\");\n  otp.addEventListener(\"complete\", (e) => {\n    status.textContent = \"Code complete: \" + e.detail.value;\n  });\n</script>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "input",
  "title": "Input",
  "category": "Form",
  "blurb": "Text field with a label, hint, and validation state.",
  "description": "`<pura-input>` is a native web component that renders a text field with an optional label and hint text. Use it in forms to collect text, email, password, or any type supported by the HTML input. It reflects the typed value back to the host's `value` attribute and fires an `input` event on every keystroke.",
  "attributes": [
    {
      "name": "label",
      "type": "string",
      "default": "",
      "desc": "Label text shown above the field."
    },
    {
      "name": "hint",
      "type": "string",
      "default": "",
      "desc": "Hint text shown below the field."
    },
    {
      "name": "placeholder",
      "type": "string",
      "default": "",
      "desc": "Example text shown when the field is empty."
    },
    {
      "name": "type",
      "type": "string",
      "default": "text",
      "desc": "HTML input type (text, email, password, etc)."
    },
    {
      "name": "value",
      "type": "string",
      "default": "",
      "desc": "Current value of the field; also available as the .value property."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables the field when present."
    },
    {
      "name": "invalid",
      "type": "boolean",
      "default": "false",
      "desc": "Applies the error style and sets aria-invalid when present."
    }
  ],
  "events": [
    "input"
  ],
  "slots": [],
  "demoHTML": "<pura-input\n  label=\"Email\"\n  type=\"email\"\n  placeholder=\"you@example.com\"\n  hint=\"We never share your email.\"\n></pura-input>",
  "usage": "<pura-input\n  label=\"Email\"\n  type=\"email\"\n  placeholder=\"you@example.com\"\n  hint=\"We never share your email.\"\n></pura-input>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "field",
      "title": "Field"
    },
    {
      "slug": "select",
      "title": "Select"
    },
    {
      "slug": "checkbox",
      "title": "Checkbox"
    },
    {
      "slug": "switch",
      "title": "Switch"
    },
    {
      "slug": "dropdown-menu",
      "title": "Dropdown Menu"
    },
    {
      "slug": "empty",
      "title": "Empty"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "app-shell",
      "title": "App Shell"
    },
    {
      "slug": "calendar-app",
      "title": "Calendar"
    },
    {
      "slug": "data-table",
      "title": "Data Table"
    },
    {
      "slug": "login",
      "title": "Login"
    },
    {
      "slug": "onboarding",
      "title": "Onboarding"
    },
    {
      "slug": "settings",
      "title": "Settings"
    },
    {
      "slug": "signup",
      "title": "Sign Up"
    }
  ]
},
{
  "slug": "inspector",
  "title": "Inspector",
  "category": "Utility",
  "blurb": "A floating developer tool that enters inspect mode on click, highlighting pura elements on hover and opening a panel to edit component attributes live with localStorage persistence.",
  "description": "A floating developer tool that enters inspect mode on click, highlighting pura elements on hover and opening a panel to edit component attributes live with localStorage persistence.",
  "attributes": [
    {
      "name": "position",
      "type": "string",
      "default": "bottom-left",
      "desc": "Corner of the trigger bubble: bottom-left, bottom-right, top-left, or top-right"
    },
    {
      "name": "hidden-in-prod",
      "type": "boolean",
      "default": "",
      "desc": "Informational attribute; the host app decides whether to mount the inspector"
    }
  ],
  "events": [],
  "slots": [],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "card",
      "title": "Card"
    },
    {
      "slug": "input",
      "title": "Input"
    },
    {
      "slug": "empty",
      "title": "Empty"
    },
    {
      "slug": "field",
      "title": "Field"
    },
    {
      "slug": "item",
      "title": "Item"
    },
    {
      "slug": "select",
      "title": "Select"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "app-shell",
      "title": "App Shell"
    },
    {
      "slug": "blog-post",
      "title": "Blog Post"
    },
    {
      "slug": "calendar-app",
      "title": "Calendar"
    },
    {
      "slug": "chat",
      "title": "Chat"
    },
    {
      "slug": "checkout",
      "title": "Checkout"
    },
    {
      "slug": "dashboard",
      "title": "Dashboard"
    },
    {
      "slug": "data-table",
      "title": "Data Table"
    },
    {
      "slug": "error-404",
      "title": "404"
    },
    {
      "slug": "kanban",
      "title": "Kanban"
    },
    {
      "slug": "landing",
      "title": "Landing"
    },
    {
      "slug": "login",
      "title": "Login"
    },
    {
      "slug": "notifications",
      "title": "Notifications"
    },
    {
      "slug": "onboarding",
      "title": "Onboarding"
    },
    {
      "slug": "pricing",
      "title": "Pricing"
    },
    {
      "slug": "profile",
      "title": "Profile"
    },
    {
      "slug": "settings",
      "title": "Settings"
    },
    {
      "slug": "signup",
      "title": "Sign Up"
    }
  ]
},
{
  "slug": "intent",
  "title": "Intent",
  "category": "Agent",
  "blurb": "Invisible wrapper that annotates a region of the page with a machine-readable goal for autonomous agents.",
  "description": "`<pura-intent>` is an agent-native, non-visual component: it renders `display: contents` (its children flow as if the wrapper didn't exist) and adds no styling of its own. Its value lies in the semantic layer it reflects on the host in light DOM (`role=\"region\"`, `aria-label`, `data-intent`, and `data-intent-actions`) and in a global registry `window.__puraIntents`, letting agents discover \"what this area is for\" and \"what can be done here\" by scanning the DOM. Use it to annotate UI sections with declared goals and actions (via JSON) that AIs and assistive technologies can enumerate.",
  "attributes": [
    {
      "name": "goal",
      "type": "string",
      "default": "",
      "desc": "Human/agent-readable purpose of the region. Reflected in aria-label and data-intent on the host. Empty removes the aria-label and leaves data-intent empty."
    },
    {
      "name": "actions",
      "type": "string (JSON)",
      "default": "[]",
      "desc": "JSON array of sub-actions an agent can perform on the region, e.g.: [{\"name\":\"submit\",\"label\":\"Place order\"}]. Malformed JSON degrades to [] without throwing."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "demoHTML": "<div style=\"font-family:system-ui;max-width:420px\">\n  <pura-intent id=\"regiao-checkout\" goal=\"Complete the cart checkout\" actions='[{\"name\":\"submit\",\"label\":\"Confirm order\"},{\"name\":\"cancel\",\"label\":\"Cancel\"}]'>\n    <section style=\"border:1px solid #ddd;border-radius:12px;padding:16px\">\n      <h3 style=\"margin:0 0 8px\">Order summary</h3>\n      <p style=\"margin:0 0 12px;color:#555\">Total: $149.90</p>\n      <button style=\"padding:8px 16px;border-radius:8px;border:0;background:#111;color:#fff\">Confirm order</button>\n    </section>\n  </pura-intent>\n\n  <button id=\"inspecionar\" style=\"margin-top:12px;padding:8px 14px;border-radius:8px;border:1px solid #ccc;background:#fff;cursor:pointer\">Inspect intents (as an agent would)</button>\n  <pre id=\"saida\" style=\"margin-top:10px;background:#0d1117;color:#9ece6a;padding:12px;border-radius:8px;font-size:12px;white-space:pre-wrap\"></pre>\n</div>\n\n<script type=\"module\">\n  import \"/pura/lib/intent.js\";\n  const out = document.getElementById(\"saida\");\n  document.getElementById(\"inspecionar\").addEventListener(\"click\", () => {\n    const regioes = document.querySelectorAll('[data-intent]');\n    const dados = [...regioes].map((el) => ({\n      goal: el.getAttribute(\"data-intent\"),\n      role: el.getAttribute(\"role\"),\n      acoes: Number(el.getAttribute(\"data-intent-actions\") || 0),\n    }));\n    out.textContent = JSON.stringify(dados, null, 2);\n  });\n</script>",
  "usage": "<pura-intent goal=\"Complete the cart checkout\" actions='[{\"name\":\"submit\",\"label\":\"Confirm order\"},{\"name\":\"cancel\",\"label\":\"Cancel\"}]'>\n  <section>\n    <h3>Order summary</h3>\n    <p>Total: $149.90</p>\n    <button>Confirm order</button>\n  </section>\n</pura-intent>\n\n<script type=\"module\">\n  import \"/pura/lib/intent.js\";\n  // Agents enumerate annotated regions via the DOM or the global registry:\n  const regioes = document.querySelectorAll('[data-intent]');\n  const snapshot = window.__puraIntents; // [{ id, goal, element, actions }]\n</script>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "item",
  "title": "Item",
  "category": "Display",
  "blurb": "Flexible row for lists, with media, title, description, and actions.",
  "description": "Item (`<pura-item>`) is a native web component that builds a flex row with media on the left, a center column for the title and description, and actions on the right. Use it to build lists, settings, notifications, or any structured row of content. When marked as clickable, it behaves like a button, with role, focus, and keyboard activation (Enter/Space).",
  "attributes": [
    {
      "name": "title",
      "type": "string",
      "default": "",
      "desc": "Convenience text for the title (the \"title\" slot takes priority over it)."
    },
    {
      "name": "hover",
      "type": "boolean",
      "default": "false",
      "desc": "Applies a subtle background when hovering over the item."
    },
    {
      "name": "bordered",
      "type": "boolean",
      "default": "false",
      "desc": "Adds a border, radius, and subtle elevation around the item."
    },
    {
      "name": "clickable",
      "type": "boolean",
      "default": "false",
      "desc": "Makes the item interactive: pointer cursor, role=\"button\", and keyboard activation."
    }
  ],
  "events": [],
  "slots": [
    "media",
    "title",
    "default",
    "actions"
  ],
  "demoHTML": "<pura-item bordered>\n  <span slot=\"media\">📁</span>\n  <span slot=\"title\">Documents</span>\n  Files and folders shared with the team\n  <button slot=\"actions\">Open</button>\n</pura-item>\n\n<pura-item hover clickable title=\"Notifications\">\n  <span slot=\"media\">🔔</span>\n  Receive alerts by email and push\n  <span slot=\"actions\">3</span>\n</pura-item>",
  "usage": "<pura-item bordered>\n  <span slot=\"media\">📁</span>\n  <span slot=\"title\">Documents</span>\n  Files and folders shared with the team\n  <button slot=\"actions\">Open</button>\n</pura-item>\n\n<pura-item hover clickable title=\"Notifications\">\n  <span slot=\"media\">🔔</span>\n  Receive alerts by email and push\n  <span slot=\"actions\">3</span>\n</pura-item>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "calendar",
      "title": "Calendar"
    },
    {
      "slug": "chat-bubble",
      "title": "Chat Bubble"
    },
    {
      "slug": "chat-input",
      "title": "Chat Input"
    },
    {
      "slug": "dialog",
      "title": "Dialog"
    },
    {
      "slug": "input-group",
      "title": "Input Group"
    },
    {
      "slug": "number-input",
      "title": "Number Input"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "calendar-app",
      "title": "Calendar"
    },
    {
      "slug": "chat",
      "title": "Chat"
    },
    {
      "slug": "checkout",
      "title": "Checkout"
    },
    {
      "slug": "dashboard",
      "title": "Dashboard"
    }
  ]
},
{
  "slug": "json-input",
  "title": "Json Input",
  "category": "Form",
  "blurb": "A textarea specialized for JSON that validates on blur, shows an error state with the parse message when invalid, and provides a Format button to pretty-print valid JSON.",
  "description": "A textarea specialized for JSON that validates on blur, shows an error state with the parse message when invalid, and provides a Format button to pretty-print valid JSON.",
  "attributes": [
    {
      "name": "value",
      "type": "string",
      "default": "",
      "desc": "The JSON string content of the textarea"
    },
    {
      "name": "placeholder",
      "type": "string",
      "default": "",
      "desc": "Textarea placeholder text"
    },
    {
      "name": "rows",
      "type": "number",
      "default": "6",
      "desc": "Number of textarea rows"
    },
    {
      "name": "format-on-blur",
      "type": "boolean",
      "default": "",
      "desc": "Pretty-print valid JSON automatically on blur"
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "",
      "desc": "Block editing of the textarea"
    },
    {
      "name": "label",
      "type": "string",
      "default": "",
      "desc": "Field label rendered above the textarea"
    },
    {
      "name": "indent",
      "type": "number",
      "default": "2",
      "desc": "Number of spaces used when pretty-printing"
    }
  ],
  "events": [
    "input",
    "change"
  ],
  "slots": [],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "kanban",
  "title": "Kanban",
  "category": "Layout",
  "blurb": "A drag-and-drop board with columns and cards.",
  "description": "Kanban is a native web component board: arrange pura-kanban-card elements inside pura-kanban-column columns and drag them between (and within) columns using native HTML5 drag-and-drop. Columns keep a live count, the board emits a change event after each move, and cards are keyboard-movable (Space to lift, arrow keys to move).",
  "attributes": [
    {
      "name": "label",
      "type": "string",
      "default": "",
      "desc": "Column heading (on pura-kanban-column)."
    }
  ],
  "events": [
    "change"
  ],
  "slots": [
    "default — columns / cards",
    "footer (column) — add-card area"
  ],
  "demoHTML": "<pura-kanban>\n  <pura-kanban-column label=\"To Do\">\n    <pura-kanban-card><b>Design landing page</b><div style=\"color:var(--pura-muted);font-size:.8rem;margin-top:4px\">Hero + pricing</div></pura-kanban-card>\n    <pura-kanban-card>Write release notes</pura-kanban-card>\n    <pura-kanban-card>Fix login bug</pura-kanban-card>\n  </pura-kanban-column>\n  <pura-kanban-column label=\"In Progress\">\n    <pura-kanban-card><b>API rate limiting</b></pura-kanban-card>\n    <pura-kanban-card>Onboarding flow</pura-kanban-card>\n  </pura-kanban-column>\n  <pura-kanban-column label=\"Done\">\n    <pura-kanban-card>Set up CI</pura-kanban-card>\n  </pura-kanban-column>\n</pura-kanban>",
  "usage": "<pura-kanban>\n  <pura-kanban-column label=\"To Do\">\n    <pura-kanban-card><b>Design landing page</b><div style=\"color:var(--pura-muted);font-size:.8rem;margin-top:4px\">Hero + pricing</div></pura-kanban-card>\n    <pura-kanban-card>Write release notes</pura-kanban-card>\n    <pura-kanban-card>Fix login bug</pura-kanban-card>\n  </pura-kanban-column>\n  <pura-kanban-column label=\"In Progress\">\n    <pura-kanban-card><b>API rate limiting</b></pura-kanban-card>\n    <pura-kanban-card>Onboarding flow</pura-kanban-card>\n  </pura-kanban-column>\n  <pura-kanban-column label=\"Done\">\n    <pura-kanban-card>Set up CI</pura-kanban-card>\n  </pura-kanban-column>\n</pura-kanban>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "kbd-shortcuts",
  "title": "Keyboard Shortcuts",
  "category": "Overlay",
  "blurb": "Help modal that lists the page's keyboard shortcuts, grouped by section.",
  "description": "`<pura-kbd-shortcuts>` opens a native modal `<dialog>` that renders, as key-style chips, the shortcuts declared as `<pura-shortcut>` children (pure data carriers, with no UI of their own) grouped by section. Use it when your app has several shortcuts and you want a standard help panel (for example opened with \"?\"). It is agent-native: each instance registers in `window.__puraKbdShortcuts` and reflects `data-pura-kbd-shortcuts` (id), `data-count`, and `data-key` on the host, while exposing the body as `role=\"list\"` with each row in an `aria-label` of \"label: keys\", so an agent can discover, inspect, and trigger the help without touching the shadow DOM.",
  "attributes": [
    {
      "name": "title",
      "type": "string",
      "default": "Keyboard shortcuts",
      "desc": "Title shown in the dialog header (the \"header\" slot takes priority when filled)."
    },
    {
      "name": "key",
      "type": "string",
      "default": "",
      "desc": "Key combo that opens/toggles the help when pressed anywhere in the document, e.g. \"?\" or \"Meta+/\" / \"⌘ /\". Empty = no binding. Accepts symbol tokens (⌘ ⌥ ⌃ ⇧) or names (Meta Cmd Ctrl Control Alt Option Shift) plus a final key, separated by a space or \"+\"."
    },
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "desc": "Reflects and controls the open state; the presence of the attribute opens the dialog (showModal)."
    }
  ],
  "events": [
    "open",
    "close"
  ],
  "slots": [
    "default",
    "header",
    "footer"
  ],
  "demoHTML": "<button id=\"abrir-atalhos\" class=\"pura-trigger\">View keyboard shortcuts (or press ?)</button>\n\n<pura-kbd-shortcuts id=\"ajuda\" title=\"Keyboard shortcuts\" key=\"?\">\n  <pura-shortcut keys=\"⌘ K\" label=\"Open search\" section=\"General\"></pura-shortcut>\n  <pura-shortcut keys=\"⌘ /\" label=\"Show shortcuts\" section=\"General\"></pura-shortcut>\n  <pura-shortcut keys=\"G I\" label=\"Go to inbox\" section=\"Navigation\"></pura-shortcut>\n  <pura-shortcut keys=\"G C\" label=\"Go to calendar\" section=\"Navigation\"></pura-shortcut>\n  <pura-shortcut keys=\"⌘ Enter\" label=\"Send\" section=\"Editing\"></pura-shortcut>\n  <pura-shortcut keys=\"Esc\" label=\"Cancel\" section=\"Editing\"></pura-shortcut>\n  <span slot=\"footer\">Press ? anytime to reopen this help.</span>\n</pura-kbd-shortcuts>\n\n<script type=\"module\">\n  import \"/pura/lib/kbd-shortcuts.js\";\n  const ajuda = document.getElementById(\"ajuda\");\n  document.getElementById(\"abrir-atalhos\").addEventListener(\"click\", () => ajuda.open());\n</script>",
  "usage": "<button id=\"abrir-atalhos\">View keyboard shortcuts (or press ?)</button>\n\n<pura-kbd-shortcuts id=\"ajuda\" title=\"Keyboard shortcuts\" key=\"?\">\n  <pura-shortcut keys=\"⌘ K\" label=\"Open search\" section=\"General\"></pura-shortcut>\n  <pura-shortcut keys=\"⌘ /\" label=\"Show shortcuts\" section=\"General\"></pura-shortcut>\n  <pura-shortcut keys=\"G I\" label=\"Go to inbox\" section=\"Navigation\"></pura-shortcut>\n  <pura-shortcut keys=\"G C\" label=\"Go to calendar\" section=\"Navigation\"></pura-shortcut>\n  <pura-shortcut keys=\"⌘ Enter\" label=\"Send\" section=\"Editing\"></pura-shortcut>\n  <pura-shortcut keys=\"Esc\" label=\"Cancel\" section=\"Editing\"></pura-shortcut>\n  <span slot=\"footer\">Press ? anytime to reopen this help.</span>\n</pura-kbd-shortcuts>\n\n<script type=\"module\">\n  import \"/pura/lib/kbd-shortcuts.js\";\n  const ajuda = document.getElementById(\"ajuda\");\n  document.getElementById(\"abrir-atalhos\").addEventListener(\"click\", () => ajuda.open());\n</script>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "kbd",
  "title": "Kbd",
  "category": "Display",
  "blurb": "Inline monospace chip for displaying shortcut keys.",
  "description": "Kbd is a native web component that renders a shortcut key as a small inline monospace chip. Use it to represent keyboard shortcuts in text, menus, or usage hints, such as ⌘K or Ctrl. The key content is defined by the default slot, with no additional configuration.",
  "attributes": [],
  "events": [],
  "slots": [
    "default"
  ],
  "demoHTML": "<p style=\"display: flex; align-items: center; gap: 8px; font-family: sans-serif;\">\n  Press <pura-kbd>⌘</pura-kbd> <pura-kbd>K</pura-kbd> to search\n</p>\n<p style=\"display: flex; align-items: center; gap: 8px; font-family: sans-serif;\">\n  Save with <pura-kbd>Ctrl</pura-kbd> <pura-kbd>S</pura-kbd>\n</p>",
  "usage": "<p style=\"display: flex; align-items: center; gap: 8px; font-family: sans-serif;\">\n  Press <pura-kbd>⌘</pura-kbd> <pura-kbd>K</pura-kbd> to search\n</p>\n<p style=\"display: flex; align-items: center; gap: 8px; font-family: sans-serif;\">\n  Save with <pura-kbd>Ctrl</pura-kbd> <pura-kbd>S</pura-kbd>\n</p>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "knob",
  "title": "Knob",
  "category": "Form",
  "blurb": "A rotary knob input rendered as an SVG circular dial with a track arc and a value arc, supporting drag, wheel, and keyboard interactions.",
  "description": "A rotary knob input rendered as an SVG circular dial with a track arc and a value arc, supporting drag, wheel, and keyboard interactions.",
  "attributes": [
    {
      "name": "value",
      "type": "number",
      "default": "",
      "desc": "Current knob value"
    },
    {
      "name": "min",
      "type": "number",
      "default": "0",
      "desc": "Minimum value"
    },
    {
      "name": "max",
      "type": "number",
      "default": "100",
      "desc": "Maximum value"
    },
    {
      "name": "step",
      "type": "number",
      "default": "1",
      "desc": "Step increment for value changes"
    },
    {
      "name": "size",
      "type": "number",
      "default": "100",
      "desc": "Diameter of the knob in pixels"
    },
    {
      "name": "stroke-width",
      "type": "number",
      "default": "",
      "desc": "SVG stroke width for the arcs"
    },
    {
      "name": "readonly",
      "type": "boolean",
      "default": "",
      "desc": "Prevent interaction while keeping the knob visible"
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "",
      "desc": "Disable interaction and remove from tab order"
    },
    {
      "name": "value-template",
      "type": "string",
      "default": "",
      "desc": "Template string for center readout, use {value} as placeholder"
    }
  ],
  "events": [
    "input",
    "change"
  ],
  "slots": [],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "label",
  "title": "Label",
  "category": "Form",
  "blurb": "A form label that focuses and activates the associated control when clicked.",
  "description": "pura-label is a native web component that renders an accessible form label. Use it to identify input fields: by setting the \"for\" attribute to the control's id, clicking the text focuses the field and, for checkboxes, radios, or switches, also toggles them, replicating the behavior of the native label element.",
  "attributes": [
    {
      "name": "for",
      "type": "string",
      "default": "",
      "desc": "Id of the control the label describes; clicking it focuses and (when applicable) activates that control."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:8px;max-width:320px\">\n  <pura-label for=\"email\">Email</pura-label>\n  <input id=\"email\" type=\"email\" placeholder=\"you@example.com\" />\n\n  <div style=\"display:flex;align-items:center;gap:8px;margin-top:8px\">\n    <input id=\"termos\" type=\"checkbox\" />\n    <pura-label for=\"termos\">I accept the terms of use</pura-label>\n  </div>\n</div>",
  "usage": "<div style=\"display:flex;flex-direction:column;gap:8px;max-width:320px\">\n  <pura-label for=\"email\">Email</pura-label>\n  <input id=\"email\" type=\"email\" placeholder=\"you@example.com\" />\n\n  <div style=\"display:flex;align-items:center;gap:8px;margin-top:8px\">\n    <input id=\"termos\" type=\"checkbox\" />\n    <pura-label for=\"termos\">I accept the terms of use</pura-label>\n  </div>\n</div>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "lightbox",
  "title": "Lightbox",
  "category": "Overlay",
  "blurb": "Thumbnail gallery that opens images in a fullscreen viewer with navigation, built on the native dialog element.",
  "description": "pura-lightbox wraps images (img, optionally inside a or figure) in the light DOM and, when you click a thumbnail, opens a fullscreen modal with the enlarged image, prev/next arrows, a counter, and close via ESC or backdrop, inheriting focus trapping from the native dialog. Use it for photo galleries, portfolios, or any set of images that needs fullscreen zoom. It is agent-native: each instance registers in window.__puraLightboxes (keyed by data-pura-lightbox), exposing open/close/next/prev/seek/getIndex/getCount/getItems, and the host reflects data-count, data-index, and data-open, so an agent can read and control the state without touching the shadow DOM.",
  "attributes": [
    {
      "name": "start",
      "type": "number",
      "default": "0",
      "desc": "Index of the image opened when .open() is called with no argument."
    },
    {
      "name": "loop",
      "type": "boolean",
      "default": "false",
      "desc": "Makes navigation wrap around: from the last to the first and vice versa."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Image gallery",
      "desc": "Accessible label for the gallery region and the modal (aria-label)."
    },
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "desc": "Reflects and controls the open/closed state of the modal viewer."
    }
  ],
  "events": [
    "open",
    "close",
    "change"
  ],
  "slots": [
    "(default)"
  ],
  "demoHTML": "<pura-lightbox label=\"Trip photos\" loop>\n  <img src=\"https://picsum.photos/id/1018/200/140\" alt=\"Mountains at dawn\" data-full=\"https://picsum.photos/id/1018/1200/800\" />\n  <img src=\"https://picsum.photos/id/1015/200/140\" alt=\"River between the rocks\" data-full=\"https://picsum.photos/id/1015/1200/800\" />\n  <img src=\"https://picsum.photos/id/1016/200/140\" alt=\"Valley with fog\" data-full=\"https://picsum.photos/id/1016/1200/800\" />\n</pura-lightbox>",
  "usage": "<pura-lightbox label=\"Trip photos\" loop>\n  <img src=\"https://picsum.photos/id/1018/200/140\" alt=\"Mountains at dawn\" data-full=\"https://picsum.photos/id/1018/1200/800\" />\n  <img src=\"https://picsum.photos/id/1015/200/140\" alt=\"River between the rocks\" data-full=\"https://picsum.photos/id/1015/1200/800\" />\n  <img src=\"https://picsum.photos/id/1016/200/140\" alt=\"Valley with fog\" data-full=\"https://picsum.photos/id/1016/1200/800\" />\n</pura-lightbox>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "link",
  "title": "Link",
  "category": "Primitives",
  "blurb": "A themeable anchor primitive that wraps a native link with color, variant, and external-link styling.",
  "description": "Pura Link is a building-block anchor that forwards href and target onto an inner native link while handling presentation through attributes. It supports four visual variants (including a button-style link) and a set of theme colors, and can mark a link as external to add safe rel attributes, a _blank target, and a trailing arrow glyph.",
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
  "demoHTML": "<script type=\"module\" src=\"/pura/lib/link.js\"></script>\n\n<p>Read our <pura-link href=\"/docs\">documentation</pura-link> to get started.</p>\n\n<p>\n  <pura-link href=\"/pricing\" variant=\"underline\">Always underlined</pura-link> ·\n  <pura-link href=\"/about\" variant=\"subtle\" color=\"muted\">Subtle muted link</pura-link> ·\n  <pura-link href=\"/changelog\" color=\"accent\">Accent colored</pura-link>\n</p>\n\n<p>\n  <pura-link href=\"https://example.com\" external>Visit our partner site</pura-link>\n</p>\n\n<p>\n  <pura-link href=\"/signup\" variant=\"button\">Create an account</pura-link>\n</p>",
  "usage": "<script type=\"module\" src=\"/pura/lib/link.js\"></script>\n\n<!-- Default: underline appears on hover -->\n<pura-link href=\"/docs\">Documentation</pura-link>\n\n<!-- Always underlined, accent color -->\n<pura-link href=\"/blog\" variant=\"underline\" color=\"accent\">Read the blog</pura-link>\n\n<!-- Subtle link with no underline -->\n<pura-link href=\"/help\" variant=\"subtle\" color=\"muted\">Need help?</pura-link>\n\n<!-- External link: adds rel, target _blank, and a trailing arrow -->\n<pura-link href=\"https://example.com\" external>Open external resource</pura-link>\n\n<!-- Button-style link -->\n<pura-link href=\"/signup\" variant=\"button\">Get started</pura-link>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "list",
  "title": "List",
  "category": "Display",
  "blurb": "A list primitive wrapping real ul/ol semantics with configurable marker style, gap, and inline layout, expecting pura-list-item children in its default slot.",
  "description": "A list primitive wrapping real ul/ol semantics with configurable marker style, gap, and inline layout, expecting pura-list-item children in its default slot.",
  "attributes": [
    {
      "name": "ordered",
      "type": "boolean",
      "default": "",
      "desc": "Render an ol instead of ul when present"
    },
    {
      "name": "marker",
      "type": "string",
      "default": "",
      "desc": "Bullet style: disc, decimal, none, or check"
    },
    {
      "name": "gap",
      "type": "string",
      "default": "",
      "desc": "Vertical (or horizontal) spacing between items (1..6)"
    },
    {
      "name": "inline",
      "type": "boolean",
      "default": "",
      "desc": "Lay items out horizontally when present"
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "live-region",
  "title": "Live Region",
  "category": "Agent",
  "blurb": "Managed ARIA live region that announces dynamic updates to screen readers and autonomous agents.",
  "description": "`pura-live-region` is a managed ARIA live announcer, hidden by default (sr-only), that delivers out-of-band status messages using the clear-and-rewrite technique so that every call is actually picked up by assistive technology. Use it for dynamic feedback (saving, errors, progress) without trapping focus. The machine-readable layer is the centerpiece: it reflects role=status, aria-live, and stable data-* attributes on the host in light DOM, and keeps a global registry `window.__puraLiveRegions` (with history and `query(id)`/`latest()` helpers), letting agents read the latest announcement of each region without a screen reader.",
  "attributes": [
    {
      "name": "live",
      "type": "\"polite\" | \"assertive\"",
      "default": "polite",
      "desc": "Politeness level of the announcement, reflected in aria-live. Any invalid value falls back to polite."
    },
    {
      "name": "visible",
      "type": "boolean",
      "default": "false",
      "desc": "Opt-in escape hatch: renders the announced text visibly (useful for authoring/debugging). By default the region is sr-only."
    },
    {
      "name": "label",
      "type": "string",
      "default": "",
      "desc": "Optional aria-label applied to the region host."
    }
  ],
  "events": [
    "pura-live-region:announce"
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:12px;align-items:flex-start\">\n  <button id=\"btn-salvar\">Save changes</button>\n  <pura-live-region id=\"status\" live=\"polite\" visible label=\"Form status\">Ready to save.</pura-live-region>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/live-region.js\";\n  const regiao = document.getElementById(\"status\");\n  let n = 0;\n  document.getElementById(\"btn-salvar\").addEventListener(\"click\", () => {\n    n++;\n    regiao.announce(`Changes saved successfully (${n}).`);\n  });\n</script>",
  "usage": "<div style=\"display:flex;flex-direction:column;gap:12px;align-items:flex-start\">\n  <button id=\"btn-salvar\">Save changes</button>\n  <pura-live-region id=\"status\" live=\"polite\" visible label=\"Form status\">Ready to save.</pura-live-region>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/live-region.js\";\n  const regiao = document.getElementById(\"status\");\n  let n = 0;\n  document.getElementById(\"btn-salvar\").addEventListener(\"click\", () => {\n    n++;\n    regiao.announce(`Changes saved successfully (${n}).`);\n  });\n</script>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "magic-card",
  "title": "Magic Card",
  "category": "Display",
  "blurb": "A card whose gradient border and soft spotlight follow the pointer. SSR-safe resting paint, progressive enhancement, no animation runtime.",
  "description": "`<pura-magic-card>` lights its gradient border and casts a soft radial spotlight that follows the pointer across the card, in the style of Magic UI's Magic Card. The resting paint (centred and dimmed) is rendered by the pure template, so it is SSR-safe; on the client the element updates `--pura-magic-x` and `--pura-magic-y` on pointer move to steer the glow. Theme it with `--pura-magic-card-bg`, `--pura-magic-card-border`, `--pura-magic-card-glow`, and `--pura-magic-card-size`. Because the glow is pointer-driven rather than a keyframe, it simply rests when the pointer leaves. It registers in `window.__puraMagicCards` by `data-pura-id` for agent enumeration.",
  "attributes": [],
  "events": [],
  "slots": [
    "default"
  ],
  "demoHTML": "<pura-magic-card style=\"max-width: 340px; --pura-magic-card-bg: #0b0b12; --pura-magic-card-border: #8b5cf6;\">\n  <div style=\"padding: 2rem 1.5rem; font: 15px system-ui; color: #fff;\">\n    <b style=\"display:block; margin-bottom:.35rem; font-size: 17px;\">Magic Card</b>\n    <span style=\"color: rgba(255,255,255,.65);\">Move your pointer across the card. The border and spotlight track the cursor.</span>\n  </div>\n</pura-magic-card>",
  "usage": "<pura-magic-card>\n  <div class=\"card-body\">Hover me</div>\n</pura-magic-card>\n\n<!-- Custom palette -->\n<pura-magic-card style=\"--pura-magic-card-bg: #0b0b12; --pura-magic-card-border: #06b6d4; --pura-magic-card-glow: rgba(6,182,212,.22);\">\n  <div class=\"card-body\">Cyan magic</div>\n</pura-magic-card>",
  "animation": true,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "map",
  "title": "Map",
  "category": "Display",
  "blurb": "A thin iframe wrapper over a map provider embed that resolves a location from a full src URL, a place query string, or lat/lon coordinates and renders an OpenStreetMap embed.",
  "description": "A thin iframe wrapper over a map provider embed that resolves a location from a full src URL, a place query string, or lat/lon coordinates and renders an OpenStreetMap embed.",
  "attributes": [
    {
      "name": "src",
      "type": "string",
      "default": "",
      "desc": "Full embed URL used verbatim"
    },
    {
      "name": "q",
      "type": "string",
      "default": "",
      "desc": "Place or query string; builds an OpenStreetMap export embed"
    },
    {
      "name": "lat",
      "type": "number",
      "default": "",
      "desc": "Latitude coordinate for the map center"
    },
    {
      "name": "lon",
      "type": "number",
      "default": "",
      "desc": "Longitude coordinate for the map center"
    },
    {
      "name": "zoom",
      "type": "number",
      "default": "14",
      "desc": "Zoom level for q or lat/lon based embeds"
    },
    {
      "name": "height",
      "type": "string",
      "default": "400",
      "desc": "Viewer height (number in px or any CSS length)"
    },
    {
      "name": "title",
      "type": "string",
      "default": "",
      "desc": "Iframe title for accessibility"
    }
  ],
  "events": [],
  "slots": [],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "markdown-editor",
  "title": "Markdown Editor",
  "category": "Form",
  "blurb": "A split editor with a markdown textarea and a live rendered preview, including a toolbar for inserting common markdown syntax and a self-contained zero-dependency markdown renderer.",
  "description": "A split editor with a markdown textarea and a live rendered preview, including a toolbar for inserting common markdown syntax and a self-contained zero-dependency markdown renderer.",
  "attributes": [
    {
      "name": "value",
      "type": "string",
      "default": "",
      "desc": "Initial markdown text content"
    },
    {
      "name": "placeholder",
      "type": "string",
      "default": "",
      "desc": "Textarea placeholder text"
    },
    {
      "name": "preview",
      "type": "string",
      "default": "side",
      "desc": "Preview layout: side (textarea and preview side by side), tab (toggle), or off (textarea only)"
    }
  ],
  "events": [
    "input"
  ],
  "slots": [],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "marquee",
  "title": "Marquee",
  "category": "Display",
  "blurb": "Seamless, infinitely scrolling content strip with a pure-CSS animation.",
  "description": "pura-marquee horizontally scrolls the default slot content in a continuous loop, cloning the children into an aria-hidden mirror so the seam stays invisible. Use it for partner logos, scrolling announcements, or highlights. It respects prefers-reduced-motion (stopping the animation entirely) and exposes an agent-native layer: data-pura-marquee-* attributes mirror the live state, and each instance registers itself in window.__puraMarquees under the data-pura-id key, letting agents enumerate, read, and control each marquee without scanning the DOM.",
  "attributes": [
    {
      "name": "speed",
      "type": "number",
      "default": "20",
      "desc": "Seconds for one full loop. Lower = faster."
    },
    {
      "name": "direction",
      "type": "\"left\" | \"right\"",
      "default": "left",
      "desc": "Direction the content scrolls."
    },
    {
      "name": "pause-on-hover",
      "type": "boolean",
      "default": "false",
      "desc": "When present, pauses while under the mouse or with internal focus."
    },
    {
      "name": "paused",
      "type": "boolean",
      "default": "false",
      "desc": "Reflected state; present when the animation is stopped."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Scrolling content",
      "desc": "aria-label text applied to the role=marquee container."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "demoHTML": "<div style=\"max-width:640px;border:1px solid var(--pura-border,#e2e2e2);border-radius:8px;padding:12px\">\n  <pura-marquee id=\"m1\" speed=\"18\" pause-on-hover label=\"Partners\">\n    <strong>Acme</strong>\n    <strong>Globex</strong>\n    <strong>Initech</strong>\n    <strong>Umbrella</strong>\n    <strong>Soylent</strong>\n    <strong>Stark Industries</strong>\n  </pura-marquee>\n  <button id=\"toggle\" type=\"button\" style=\"margin-top:12px\">Pause / Resume</button>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/marquee.js\";\n  document.getElementById(\"toggle\").addEventListener(\"click\", () => {\n    document.getElementById(\"m1\").toggle();\n  });\n</script>",
  "usage": "<div style=\"max-width:640px;border:1px solid var(--pura-border,#e2e2e2);border-radius:8px;padding:12px\">\n  <pura-marquee id=\"m1\" speed=\"18\" pause-on-hover label=\"Partners\">\n    <strong>Acme</strong>\n    <strong>Globex</strong>\n    <strong>Initech</strong>\n    <strong>Umbrella</strong>\n    <strong>Soylent</strong>\n    <strong>Stark Industries</strong>\n  </pura-marquee>\n  <button id=\"toggle\" type=\"button\" style=\"margin-top:12px\">Pause / Resume</button>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/marquee.js\";\n  document.getElementById(\"toggle\").addEventListener(\"click\", () => {\n    document.getElementById(\"m1\").toggle();\n  });\n</script>",
  "animation": true,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "mask-input",
  "title": "Mask Input",
  "category": "Form",
  "blurb": "A text input that enforces a format mask as the user types, with tokens 9 for digit, A for letter, and * for alphanumeric, and auto-insertion of literal characters.",
  "description": "A text input that enforces a format mask as the user types, with tokens 9 for digit, A for letter, and * for alphanumeric, and auto-insertion of literal characters.",
  "attributes": [
    {
      "name": "mask",
      "type": "string",
      "default": "",
      "desc": "Format mask string (9=digit, A=letter, *=alphanumeric, other chars are literals)"
    },
    {
      "name": "placeholder",
      "type": "string",
      "default": "",
      "desc": "Input placeholder text"
    },
    {
      "name": "value",
      "type": "string",
      "default": "",
      "desc": "Current masked value"
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "",
      "desc": "Disable the input"
    }
  ],
  "events": [
    "input"
  ],
  "slots": [],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "masonry",
  "title": "Masonry",
  "category": "Layout",
  "blurb": "Pinterest-style layout that distributes items into columns using native CSS multi-column.",
  "description": "`<pura-masonry>` is a container that arranges the default slot's elements into vertical columns (top-to-bottom flow, then breaking to the next column), keeping each item intact via break-inside. Use it for image galleries, cards of varying heights, or feeds where a rigid grid would leave gaps. It has an agent-native layer: each instance gets a stable id in `data-pura-masonry` and publishes a machine-readable snapshot in `window.__puraMasonry[id]` with `{ label, columns, count, items }`, letting agents inspect the collection without scraping the DOM.",
  "attributes": [
    {
      "name": "columns",
      "type": "number",
      "default": "(auto)",
      "desc": "Fixed column count (integer >= 1). When set, it uses exactly that number of columns at any width and reflects the value in data-columns."
    },
    {
      "name": "min",
      "type": "string",
      "default": "16rem",
      "desc": "Minimum width of each column (CSS length). Used in responsive mode (when columns is omitted): the browser fits as many columns as will fit at that width."
    },
    {
      "name": "gap",
      "type": "string",
      "default": "var(--pura-space-4)",
      "desc": "Spacing between columns and between rows (CSS length)."
    },
    {
      "name": "label",
      "type": "string",
      "default": "(none)",
      "desc": "Accessible name for the list of items; applied as aria-label on the host (role=list)."
    }
  ],
  "events": [
    "pura-masonry-change"
  ],
  "slots": [
    "(default)"
  ],
  "demoHTML": "<pura-masonry min=\"12rem\" gap=\"1rem\" label=\"Photo gallery\">\n  <div style=\"background:#fde68a;border-radius:8px;padding:1rem;height:120px\">Sunset</div>\n  <div style=\"background:#bfdbfe;border-radius:8px;padding:1rem;height:200px\">Snowy mountain</div>\n  <div style=\"background:#bbf7d0;border-radius:8px;padding:1rem;height:90px\">Forest</div>\n  <div style=\"background:#fbcfe8;border-radius:8px;padding:1rem;height:160px\">Beach at dawn</div>\n  <div style=\"background:#ddd6fe;border-radius:8px;padding:1rem;height:140px\">City at night</div>\n  <div style=\"background:#fed7aa;border-radius:8px;padding:1rem;height:110px\">Desert</div>\n</pura-masonry>",
  "usage": "<pura-masonry min=\"12rem\" gap=\"1rem\" label=\"Photo gallery\">\n  <div style=\"background:#fde68a;border-radius:8px;padding:1rem;height:120px\">Sunset</div>\n  <div style=\"background:#bfdbfe;border-radius:8px;padding:1rem;height:200px\">Snowy mountain</div>\n  <div style=\"background:#bbf7d0;border-radius:8px;padding:1rem;height:90px\">Forest</div>\n  <div style=\"background:#fbcfe8;border-radius:8px;padding:1rem;height:160px\">Beach at dawn</div>\n  <div style=\"background:#ddd6fe;border-radius:8px;padding:1rem;height:140px\">City at night</div>\n  <div style=\"background:#fed7aa;border-radius:8px;padding:1rem;height:110px\">Desert</div>\n</pura-masonry>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "mediaquery",
  "title": "Media Query",
  "category": "Utility",
  "blurb": "Conditionally renders content based on a CSS media query, with agent-readable responsive state.",
  "description": "`<pura-mediaquery>` evaluates a CSS media query and projects the `match` slot when it matches or the `default` content (or the unnamed default slot) when it doesn't, updating live as the viewport changes. Use it to swap markup declaratively without breakpoint JavaScript. Being agent-native, it exposes machine-readable state (`data-pura`, `data-query`, `data-matches` on the host and a global registry `window.__puraMediaQueries`), letting agents read the page's responsive state without measuring the viewport.",
  "attributes": [
    {
      "name": "query",
      "type": "string",
      "default": "",
      "desc": "The CSS media query to evaluate, for example \"(max-width: 640px)\". Absent or invalid never matches, so the default content is shown. Observed: it swaps live when changed."
    }
  ],
  "events": [
    "pura-mediaquery:change"
  ],
  "slots": [
    "match",
    "default"
  ],
  "demoHTML": "<div style=\"border:1px solid #ddd;border-radius:8px;padding:16px;font-family:system-ui\">\n  <p style=\"margin:0 0 8px;color:#666\">Resize the window to see the content swap:</p>\n  <pura-mediaquery query=\"(max-width: 640px)\">\n    <strong slot=\"match\" style=\"color:#e11\">Mobile layout (screen &le; 640px)</strong>\n    <strong slot=\"default\" style=\"color:#16a34a\">Desktop layout (screen > 640px)</strong>\n  </pura-mediaquery>\n  <p id=\"estado\" style=\"margin:12px 0 0;color:#999;font-size:13px\"></p>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/mediaquery.js\";\n  const mq = document.querySelector(\"pura-mediaquery\");\n  const estado = document.getElementById(\"estado\");\n  mq.addEventListener(\"pura-mediaquery:change\", (e) => {\n    estado.textContent = `query: ${e.detail.query} | matches: ${e.detail.matches}`;\n  });\n</script>",
  "usage": "<div style=\"border:1px solid #ddd;border-radius:8px;padding:16px;font-family:system-ui\">\n  <p style=\"margin:0 0 8px;color:#666\">Resize the window to see the content swap:</p>\n  <pura-mediaquery query=\"(max-width: 640px)\">\n    <strong slot=\"match\" style=\"color:#e11\">Mobile layout (screen &le; 640px)</strong>\n    <strong slot=\"default\" style=\"color:#16a34a\">Desktop layout (screen > 640px)</strong>\n  </pura-mediaquery>\n  <p id=\"estado\" style=\"margin:12px 0 0;color:#999;font-size:13px\"></p>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/mediaquery.js\";\n  const mq = document.querySelector(\"pura-mediaquery\");\n  const estado = document.getElementById(\"estado\");\n  mq.addEventListener(\"pura-mediaquery:change\", (e) => {\n    estado.textContent = `query: ${e.detail.query} | matches: ${e.detail.matches}`;\n  });\n</script>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "mention",
  "title": "Mention",
  "category": "Form",
  "blurb": "Text field (input or textarea) with an inline autocomplete popup that opens when a trigger character is typed.",
  "description": "Text field (input or textarea) with an inline autocomplete popup that opens when a trigger character is typed.",
  "attributes": [
    {
      "name": "placeholder",
      "type": "string",
      "default": "",
      "desc": "Placeholder text for the input or textarea."
    },
    {
      "name": "value",
      "type": "string",
      "default": "",
      "desc": "Current text value of the control."
    },
    {
      "name": "multiline",
      "type": "boolean",
      "default": "",
      "desc": "Renders a textarea instead of a single-line input."
    },
    {
      "name": "trigger",
      "type": "string",
      "default": "@",
      "desc": "Character that activates the mention autocomplete menu."
    }
  ],
  "events": [
    "input",
    "mention"
  ],
  "slots": [],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "menubar",
  "title": "Menubar",
  "category": "Navigation",
  "blurb": "Application menu bar with dropdown menus and keyboard navigation.",
  "description": "Menubar is a native web component that builds a desktop-app-style menu bar (role=menubar), where each menu opens a dropdown panel built on the Popover API and CSS anchor positioning. Use it when you need a persistent horizontal command bar (File, Edit, View) at the top of an application. It supports switching between open menus on hover and full keyboard navigation (arrows, Home/End, Esc).",
  "attributes": [
    {
      "name": "label",
      "type": "string",
      "default": "\"\"",
      "desc": "Trigger text of a <pura-menubar-menu>."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables a <pura-menubar-menu> or a <pura-menu-item>, preventing opening/selection."
    },
    {
      "name": "inset",
      "type": "boolean",
      "default": "false",
      "desc": "On <pura-menu-item>, reserves icon space to align items that have no icon."
    },
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "desc": "Reflected on <pura-menubar-menu> when its panel is open (read-only)."
    }
  ],
  "events": [
    "open",
    "close",
    "select"
  ],
  "slots": [
    "default",
    "icon",
    "shortcut"
  ],
  "demoHTML": "<pura-menubar id=\"barra\">\n  <pura-menubar-menu label=\"File\">\n    <pura-menu-item>New file<span slot=\"shortcut\">Ctrl+N</span></pura-menu-item>\n    <pura-menu-item>Open<span slot=\"shortcut\">Ctrl+O</span></pura-menu-item>\n    <pura-menu-item>Save<span slot=\"shortcut\">Ctrl+S</span></pura-menu-item>\n    <pura-menu-item disabled>Save as...</pura-menu-item>\n  </pura-menubar-menu>\n  <pura-menubar-menu label=\"Edit\">\n    <pura-menu-item>Undo<span slot=\"shortcut\">Ctrl+Z</span></pura-menu-item>\n    <pura-menu-item>Redo<span slot=\"shortcut\">Ctrl+Y</span></pura-menu-item>\n    <pura-menu-item inset>Copy</pura-menu-item>\n    <pura-menu-item inset>Paste</pura-menu-item>\n  </pura-menubar-menu>\n  <pura-menubar-menu label=\"View\">\n    <pura-menu-item>Full screen<span slot=\"shortcut\">F11</span></pura-menu-item>\n    <pura-menu-item>Zoom +</pura-menu-item>\n  </pura-menubar-menu>\n  <pura-menubar-menu label=\"Help\" disabled></pura-menubar-menu>\n</pura-menubar>\n\n<script type=\"module\">\n  const barra = document.getElementById(\"barra\");\n  barra.addEventListener(\"select\", (e) => {\n    console.log(\"Selected item:\", e.target.textContent.trim());\n  });\n</script>",
  "usage": "<pura-menubar id=\"barra\">\n  <pura-menubar-menu label=\"File\">\n    <pura-menu-item>New file<span slot=\"shortcut\">Ctrl+N</span></pura-menu-item>\n    <pura-menu-item>Open<span slot=\"shortcut\">Ctrl+O</span></pura-menu-item>\n    <pura-menu-item>Save<span slot=\"shortcut\">Ctrl+S</span></pura-menu-item>\n    <pura-menu-item disabled>Save as...</pura-menu-item>\n  </pura-menubar-menu>\n  <pura-menubar-menu label=\"Edit\">\n    <pura-menu-item>Undo<span slot=\"shortcut\">Ctrl+Z</span></pura-menu-item>\n    <pura-menu-item>Redo<span slot=\"shortcut\">Ctrl+Y</span></pura-menu-item>\n    <pura-menu-item inset>Copy</pura-menu-item>\n    <pura-menu-item inset>Paste</pura-menu-item>\n  </pura-menubar-menu>\n  <pura-menubar-menu label=\"View\">\n    <pura-menu-item>Full screen<span slot=\"shortcut\">F11</span></pura-menu-item>\n    <pura-menu-item>Zoom +</pura-menu-item>\n  </pura-menubar-menu>\n  <pura-menubar-menu label=\"Help\" disabled></pura-menubar-menu>\n</pura-menubar>\n\n<script type=\"module\">\n  const barra = document.getElementById(\"barra\");\n  barra.addEventListener(\"select\", (e) => {\n    console.log(\"Selected item:\", e.target.textContent.trim());\n  });\n</script>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "meteors",
  "title": "Meteors",
  "category": "Display",
  "blurb": "A field of diagonal shooting-star streaks behind its content. Deterministic scatter (SSR-stable), pure CSS @keyframes, reduced-motion aware.",
  "description": "`<pura-meteors>` paints a field of diagonal shooting-star streaks behind its slotted content, in the style of Magic UI's Meteors. The meteors are scattered deterministically in the pure template (no `Math.random`), so the server and client render the same field and the effect needs no client JS. Each streak is a CSS `@keyframes` fall with a gradient tail, so there is no animation runtime. Set `count` for density and theme the streaks with `--pura-meteor-color` and `--pura-meteor-glow`. Under reduced motion the meteors hold still via the base reset. It registers in `window.__puraMeteors` by `data-pura-id` for agent enumeration.",
  "attributes": [
    {
      "name": "count",
      "type": "number",
      "default": "14",
      "desc": "Number of meteors to render (capped at 80)."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "demoHTML": "<pura-meteors count=\"18\" style=\"border-radius: 12px; background: var(--pura-fg, #0b1020); --pura-meteor-color: #e0e7ff;\">\n  <div style=\"padding: 2.5rem 1.5rem; text-align: center; color: #e0e7ff; font: 600 18px system-ui; position: relative;\">\n    Meteors\n    <div style=\"font-weight: 400; font-size: 13px; opacity: .7; margin-top: .3rem;\">Diagonal streaks, pure CSS, server-renderable.</div>\n  </div>\n</pura-meteors>",
  "usage": "<pura-meteors count=\"20\" style=\"background: #0b1020; --pura-meteor-color: #e0e7ff;\">\n  <div class=\"hero\">Content above the meteor field</div>\n</pura-meteors>",
  "animation": true,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "meter",
  "title": "Meter",
  "category": "Display",
  "blurb": "Labeled measurement bar for a scalar value within a known range, with semantic color by threshold.",
  "description": "Meter displays a scalar measurement within a range (like the native <meter>, but themed), coloring the bar as success, warning, or danger according to the low/high/optimum thresholds following the WHATWG algorithm. Use it to show disk usage, battery, a score, or any quantity with a \"good\" and \"bad\" range, rather than the progress of a task. It is agent-native: beyond role=\"meter\" and ARIA attributes, it mirrors the live state in data-pura-meter-* attributes and registers each instance in window.__puraMeters (keyed by data-pura-id), as well as exposing a .state getter with the resolved snapshot and the level, so an agent can read or enumerate meters without digging through the DOM.",
  "attributes": [
    {
      "name": "value",
      "type": "number",
      "default": "min",
      "desc": "Current measurement; clamped within [min, max]."
    },
    {
      "name": "min",
      "type": "number",
      "default": "0",
      "desc": "Lower bound of the range."
    },
    {
      "name": "max",
      "type": "number",
      "default": "1",
      "desc": "Upper bound of the range; raised to min if authored lower than min."
    },
    {
      "name": "low",
      "type": "number",
      "default": "min",
      "desc": "Upper bound of the \"low\" segment; clamped to [min, max]."
    },
    {
      "name": "high",
      "type": "number",
      "default": "max",
      "desc": "Lower bound of the \"high\" segment; clamped to [min, max] and ordered (>= low)."
    },
    {
      "name": "optimum",
      "type": "number",
      "default": "(min + max) / 2",
      "desc": "Optimum point; decides which segment is success, which is warning, and which is danger."
    },
    {
      "name": "label",
      "type": "string",
      "default": "\"\"",
      "desc": "Descriptive caption (e.g., \"Disk usage\"). Optional."
    },
    {
      "name": "value-text",
      "type": "string",
      "default": "numeric value",
      "desc": "Overrides the displayed value string (e.g., \"42 GB\")."
    },
    {
      "name": "hide-value",
      "type": "boolean",
      "default": "false",
      "desc": "Hides the value text, leaving only the bar and the label."
    }
  ],
  "events": [],
  "slots": [],
  "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:1.25rem;max-width:24rem\">\n  <pura-meter label=\"Disk usage\" value=\"42\" min=\"0\" max=\"64\" value-text=\"42 GB\" low=\"48\" high=\"58\" optimum=\"0\"></pura-meter>\n  <pura-meter label=\"Battery\" value=\"88\" min=\"0\" max=\"100\" value-text=\"88%\" low=\"20\" high=\"80\" optimum=\"100\"></pura-meter>\n  <pura-meter label=\"CPU temperature\" value=\"76\" min=\"30\" max=\"95\" value-text=\"76 degrees C\" low=\"60\" high=\"80\" optimum=\"40\"></pura-meter>\n</div>",
  "usage": "<div style=\"display:flex;flex-direction:column;gap:1.25rem;max-width:24rem\">\n  <pura-meter label=\"Disk usage\" value=\"42\" min=\"0\" max=\"64\" value-text=\"42 GB\" low=\"48\" high=\"58\" optimum=\"0\"></pura-meter>\n  <pura-meter label=\"Battery\" value=\"88\" min=\"0\" max=\"100\" value-text=\"88%\" low=\"20\" high=\"80\" optimum=\"100\"></pura-meter>\n  <pura-meter label=\"CPU temperature\" value=\"76\" min=\"30\" max=\"95\" value-text=\"76 degrees C\" low=\"60\" high=\"80\" optimum=\"40\"></pura-meter>\n</div>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "checkbox",
      "title": "Checkbox"
    },
    {
      "slug": "field",
      "title": "Field"
    },
    {
      "slug": "card",
      "title": "Card"
    },
    {
      "slug": "input",
      "title": "Input"
    },
    {
      "slug": "button",
      "title": "Button"
    },
    {
      "slug": "inspector",
      "title": "Inspector"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "signup",
      "title": "Sign Up"
    }
  ]
},
{
  "slug": "motion-budget",
  "title": "Motion Budget",
  "category": "Utility",
  "blurb": "An invisible page-level governor that drives the global --pura-motion token to calm or stop all token-driven motion library-wide, with system reduced-motion awareness. No render, no shadow paint.",
  "description": "`<pura-motion-budget>` is an invisible, page-level governor for how much motion the whole library may spend. It renders nothing: its only job is to drive the existing global `--pura-motion` token on `<html>` (which pura components already multiply their durations by) plus a machine-readable `data-pura-motion` mirror. Because custom properties inherit across shadow boundaries, one element calms or stops motion inside every component's shadow root at once, without touching any of them. Three semantic modes: `normal` (full motion, steps aside so the system `prefers-reduced-motion` rule still wins), `calm` (half speed, `--pura-motion: 0.5`, to dial down looping vestibular motion without freezing one-shot transitions), and `off` (a hard stop, `--pura-motion: 0`). Set an explicit `scale` (0..1) to override the mode default, or add `respect-system` so a system reduced-motion preference forces `off`. Drive it with `.setMode('calm')`; listen for `motionchange` `{ mode, motion }`. Each instance registers in `window.__puraMotionBudgets` by `data-pura-id`.",
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
  "demoHTML": "<style>\n  @keyframes pura-mb-spin { to { transform: rotate(360deg); } }\n  .pura-mb-demo {\n    width: 56px; height: 56px; border-radius: 12px;\n    background: conic-gradient(from 0deg, var(--pura-primary, #6366f1), transparent 70%);\n    animation: pura-mb-spin calc(1.1s / max(var(--pura-motion, 1), 0.001)) linear infinite;\n  }\n  .pura-mb-btns { display: flex; gap: .5rem; margin-bottom: 1rem; }\n  .pura-mb-btns button { font: 500 13px system-ui; padding: .4rem .8rem; border: 1px solid var(--pura-border, #e4e4e7); border-radius: 8px; background: var(--pura-bg, #fff); cursor: pointer; }\n</style>\n\n<pura-motion-budget id=\"pura-mb-demo\" mode=\"normal\"></pura-motion-budget>\n<div class=\"pura-mb-btns\">\n  <button onclick=\"document.getElementById('pura-mb-demo').setMode('normal')\">Normal</button>\n  <button onclick=\"document.getElementById('pura-mb-demo').setMode('calm')\">Calm</button>\n  <button onclick=\"document.getElementById('pura-mb-demo').setMode('off')\">Off</button>\n</div>\n<div class=\"pura-mb-demo\"></div>",
  "usage": "<!-- Drop one governor near the top of the page -->\n<pura-motion-budget mode=\"normal\" respect-system></pura-motion-budget>\n\n<script type=\"module\">\n  const mb = document.querySelector('pura-motion-budget');\n  // Calm the whole page while a heavy animation runs\n  mb.setMode('calm');\n  mb.addEventListener('motionchange', (e) => console.log(e.detail)); // { mode, motion }\n</script>\n\n<!-- Any component duration that multiplies var(--pura-motion) now responds -->",
  "animation": true,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "motion",
  "title": "Motion",
  "category": "Utility",
  "blurb": "Generic enter/exit motion wrapper: toggle the show attribute to animate any content in and out, CSS-only and reduced-motion aware.",
  "description": "`<pura-motion>` is pura's foundational presence wrapper: it animates any slotted content in and out as the `show` attribute is toggled, with seven presets (fade, slide-up/down/left/right, scale, fade-slide). The motion is pure CSS driven entirely by `show`, so there is no JS animation runtime: content rendered already-`show` on the server snaps in with no hydration flash, and the transition only runs when `show` is toggled at runtime. When hidden the content leaves layout (`display: none` via `allow-discrete`), and under reduced motion the whole transition is skipped for an instant display swap. It has an agent-native layer: each instance registers in `window.__puraMotions` by `data-pura-id` and mirrors config and live state in `data-pura-motion-*` attributes, letting an agent enumerate, read, and drive every transition without traversing the DOM.",
  "attributes": [
    {
      "name": "show",
      "type": "boolean",
      "default": "false",
      "desc": "Present = content visible (entered); absent = content removed (exited). Toggling at runtime runs the transition; rendered already-show snaps in with no flash."
    },
    {
      "name": "animation",
      "type": "\"fade\" | \"slide-up\" | \"slide-down\" | \"slide-left\" | \"slide-right\" | \"scale\" | \"fade-slide\"",
      "default": "fade",
      "desc": "Entrance/exit animation style. Invalid values fall back to fade."
    },
    {
      "name": "appear",
      "type": "boolean",
      "default": "false",
      "desc": "When present and show is set at mount, starts hidden and plays the enter animation on the first frame (opt-in mount animation)."
    }
  ],
  "events": [
    "pura-motion"
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "<div style=\"display: grid; gap: var(--pura-space-4, 1rem); justify-items: start;\">\n  <pura-button onclick=\"this.nextElementSibling.toggle()\">Toggle</pura-button>\n  <pura-motion show animation=\"slide-up\">\n    <article style=\"padding: var(--pura-space-5, 1.5rem); border: 1px solid var(--pura-border, #ddd); border-radius: 12px; font: 16px/1.5 system-ui;\">\n      <h3 style=\"margin-top: 0;\">Animated panel</h3>\n      <p>This block slides up and fades as it enters, and reverses on exit.</p>\n    </article>\n  </pura-motion>\n</div>",
  "usage": "<pura-button onclick=\"document.querySelector('#panel').toggle()\">Toggle</pura-button>\n\n<pura-motion id=\"panel\" show animation=\"slide-up\">\n  <article>\n    <h3>Animated panel</h3>\n    <p>This block slides up and fades as it enters, and reverses on exit.</p>\n  </article>\n</pura-motion>\n\n<!-- Imperative API -->\n<script>\n  const m = document.querySelector('#panel');\n  m.enter();   // show\n  m.exit();    // hide\n  m.toggle();  // flip\n</script>",
  "animation": true,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "narrated-transition",
  "title": "Narrated Transition",
  "category": "Utility",
  "blurb": "Runs a state change inside the native View Transitions API and narrates it: captures before/after named state, diffs it, and emits a structured { from, to, reason, changed } account plus a screen-reader announcement.",
  "description": "`<pura-narrated-transition>` runs a UI state change inside the native View Transitions API like `<pura-view-transition>`, but it *narrates* the change: it captures the named state before and after, diffs them, and emits a structured `transitionnarrate` event `{ from, to, reason, changed }` plus a polite screen-reader announcement. Where a plain view transition only answers \"play a morph\", this also answers \"it went from `{status:'idle'}` to `{status:'done'}` because 'order placed', changing `status`\", so an agent reading the page learns the semantic delta, not just that pixels moved. You own the state: seed it with the `.state` property (or a JSON `state` attribute), then drive changes through `transition({ to, reason }, updateFn)` (morph + narrate) or `narrate(to, reason)` (narrate only). Under reduced motion or an unsupported engine the morph degrades to an instant update while the narration still fires identically. Each instance registers in `window.__puraNarratedTransitions` by `data-pura-id` and mirrors the latest narration in `data-pura-narration-reason` / `data-pura-narration-changed`.",
  "attributes": [
    {
      "name": "name",
      "type": "string",
      "default": "\"\"",
      "desc": "Applies view-transition-name to the host so it morphs as a shared element across page-level transitions."
    },
    {
      "name": "state",
      "type": "string",
      "default": "\"\"",
      "desc": "Optional initial state as a JSON object."
    }
  ],
  "events": [
    {
      "name": "transitionnarrate",
      "detail": "{ id, from, to, reason, changed, at }",
      "desc": "Fired after a transition or narrate(): changed is an array of { key, from, to }."
    }
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "<pura-narrated-transition id=\"pura-nt-demo\" state='{\"status\":\"idle\",\"count\":0}'>\n  <div id=\"pura-nt-panel\" style=\"padding: 1.25rem; border: 1px solid var(--pura-border, #e4e4e7); border-radius: 12px; font: 500 14px system-ui;\">\n    <strong>status:</strong> <span id=\"pura-nt-status\">idle</span> &nbsp; <strong>count:</strong> <span id=\"pura-nt-count\">0</span>\n  </div>\n</pura-narrated-transition>\n<p id=\"pura-nt-log\" style=\"margin-top: .75rem; font: 13px ui-monospace, monospace; color: var(--pura-muted-fg, #52525b);\">click to place an order, the change is narrated below</p>\n<button style=\"margin-top: .5rem; font: 500 13px system-ui; padding: .4rem .9rem; border: 1px solid var(--pura-border, #e4e4e7); border-radius: 8px; background: var(--pura-bg, #fff); cursor: pointer;\" onclick=\"(function(){ const nt = document.getElementById('pura-nt-demo'); const next = nt.state.status === 'idle' ? 'done' : 'idle'; nt.transition({ to: { status: next, count: nt.state.count + 1 }, reason: next === 'done' ? 'order placed' : 'order reset' }, function(){ document.getElementById('pura-nt-status').textContent = next; document.getElementById('pura-nt-count').textContent = String(nt.state.count + 1); }); })()\">Toggle order</button>\n<script>\n  document.getElementById('pura-nt-demo').addEventListener('transitionnarrate', function(e){\n    document.getElementById('pura-nt-log').textContent = e.detail.reason + ' \\u2192 changed ' + e.detail.changed.map(function(c){ return c.key + ': ' + c.from + '\\u2192' + c.to; }).join(', ');\n  });\n</script>",
  "usage": "<pura-narrated-transition id=\"order\" state='{\"status\":\"idle\"}'>\n  <div id=\"panel\">idle</div>\n</pura-narrated-transition>\n\n<script type=\"module\">\n  const nt = document.getElementById('order');\n  nt.addEventListener('transitionnarrate', (e) => console.log(e.detail));\n  await nt.transition(\n    { to: { status: 'done' }, reason: 'order placed' },\n    () => { document.getElementById('panel').textContent = 'done'; },\n  );\n  // -> { from:{status:'idle'}, to:{status:'done'}, reason:'order placed',\n  //      changed:[{ key:'status', from:'idle', to:'done' }] }\n</script>",
  "animation": true,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "navigation-menu",
  "title": "Navigation Menu",
  "category": "Navigation",
  "blurb": "Horizontal navigation bar with rich panels that open on hover or click.",
  "description": "The Navigation Menu is a native web component (no dependencies) that renders a horizontal navigation bar with role=navigation. Each item can be a simple link (with href) or a trigger that opens a rich content panel below it, using the native Popover API and CSS anchor positioning. Use it when you need a site top menu with submenus, keeping only one panel open at a time and full keyboard navigation.",
  "attributes": [
    {
      "name": "label",
      "type": "string",
      "default": "\"\"",
      "desc": "Trigger text of the item (pura-navigation-menu-item)."
    },
    {
      "name": "href",
      "type": "string",
      "default": "(none)",
      "desc": "If present, the item becomes a simple link (anchor) instead of opening a panel."
    },
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "desc": "Reflects whether the item's panel is open; also readable via the .open property."
    },
    {
      "name": "aria-label",
      "type": "string",
      "default": "\"Main\"",
      "desc": "Accessible label of the bar (pura-navigation-menu); defaults to \"Main\" if omitted."
    }
  ],
  "events": [
    "open",
    "close"
  ],
  "slots": [
    "default",
    "label"
  ],
  "demoHTML": "<pura-navigation-menu aria-label=\"Main\">\n  <pura-navigation-menu-item label=\"Products\">\n    <div style=\"display:grid;gap:.5rem;min-width:16rem\">\n      <a href=\"#editor\">Editor</a>\n      <a href=\"#analytics\">Analytics</a>\n      <a href=\"#automacoes\">Automations</a>\n    </div>\n  </pura-navigation-menu-item>\n  <pura-navigation-menu-item label=\"Resources\">\n    <div style=\"display:grid;gap:.5rem;min-width:16rem\">\n      <a href=\"#docs\">Documentation</a>\n      <a href=\"#guias\">Guides</a>\n      <a href=\"#blog\">Blog</a>\n    </div>\n  </pura-navigation-menu-item>\n  <pura-navigation-menu-item label=\"Pricing\" href=\"#precos\"></pura-navigation-menu-item>\n</pura-navigation-menu>",
  "usage": "<pura-navigation-menu aria-label=\"Main\">\n  <pura-navigation-menu-item label=\"Products\">\n    <div style=\"display:grid;gap:.5rem;min-width:16rem\">\n      <a href=\"#editor\">Editor</a>\n      <a href=\"#analytics\">Analytics</a>\n      <a href=\"#automacoes\">Automations</a>\n    </div>\n  </pura-navigation-menu-item>\n  <pura-navigation-menu-item label=\"Resources\">\n    <div style=\"display:grid;gap:.5rem;min-width:16rem\">\n      <a href=\"#docs\">Documentation</a>\n      <a href=\"#guias\">Guides</a>\n      <a href=\"#blog\">Blog</a>\n    </div>\n  </pura-navigation-menu-item>\n  <pura-navigation-menu-item label=\"Pricing\" href=\"#precos\"></pura-navigation-menu-item>\n</pura-navigation-menu>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "notification-item",
  "title": "Notification Item",
  "category": "Display",
  "blurb": "A notification row with icon, title, description, time, and an optional dismiss button.",
  "description": "`pura-notification-item` renders a single notification row in a flex layout: icon on the left, title over description in the middle, and time with a dismiss button on the right, marking an \"unread\" dot when the `unread` attribute is present. Use it inside a notification panel or list. The agent-native layer mirrors the live state in `data-pura-notification-*` attributes on the host and registers each instance in `window.__puraNotificationItems` (indexed by `data-pura-id`), letting agents enumerate, read, and drive the rows via `markRead()`, `markUnread()`, and `dismiss()` without entering the Shadow DOM.",
  "attributes": [
    {
      "name": "title",
      "type": "string",
      "default": "",
      "desc": "Bold text for the row title. When omitted, the title line is hidden."
    },
    {
      "name": "time",
      "type": "string",
      "default": "",
      "desc": "Short time or relative time shown on the right (e.g., \"2 min ago\"). Mirrored in the datetime attribute of the <time>."
    },
    {
      "name": "unread",
      "type": "boolean",
      "default": "false",
      "desc": "Shows the unread dot and applies emphasized styling to the title."
    },
    {
      "name": "dismissible",
      "type": "boolean",
      "default": "false",
      "desc": "Renders the dismiss button (×) on the right."
    },
    {
      "name": "dismiss-label",
      "type": "string",
      "default": "Dispensar",
      "desc": "Accessible label (aria-label) for the dismiss button."
    }
  ],
  "events": [
    "read",
    "dismiss"
  ],
  "slots": [
    "icon",
    "(default)"
  ],
  "demoHTML": "<div role=\"list\" style=\"max-width:420px;border:1px solid var(--pura-border,#e5e5e5);border-radius:8px;overflow:hidden\">\n  <pura-notification-item id=\"notif1\" title=\"New comment\" time=\"2 min ago\" unread dismissible>\n    <span slot=\"icon\">💬</span>\n    Ana replied on your task \"Review proposal\".\n  </pura-notification-item>\n  <pura-notification-item title=\"Payment confirmed\" time=\"1 h ago\" dismissible>\n    <span slot=\"icon\">✅</span>\n    We received the payment for the May invoice.\n  </pura-notification-item>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/notification-item.js\";\n  const n = document.getElementById(\"notif1\");\n  n.addEventListener(\"click\", () => n.markRead());\n  n.addEventListener(\"read\", (e) => console.log(\"read:\", e.detail.id));\n  n.addEventListener(\"dismiss\", (e) => console.log(\"dismissed:\", e.detail.id));\n</script>",
  "usage": "<div role=\"list\" style=\"max-width:420px;border:1px solid var(--pura-border,#e5e5e5);border-radius:8px;overflow:hidden\">\n  <pura-notification-item id=\"notif1\" title=\"New comment\" time=\"2 min ago\" unread dismissible>\n    <span slot=\"icon\">💬</span>\n    Ana replied on your task \"Review proposal\".\n  </pura-notification-item>\n  <pura-notification-item title=\"Payment confirmed\" time=\"1 h ago\" dismissible>\n    <span slot=\"icon\">✅</span>\n    We received the payment for the May invoice.\n  </pura-notification-item>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/notification-item.js\";\n  const n = document.getElementById(\"notif1\");\n  n.addEventListener(\"click\", () => n.markRead());\n  n.addEventListener(\"read\", (e) => console.log(\"read:\", e.detail.id));\n  n.addEventListener(\"dismiss\", (e) => console.log(\"dismissed:\", e.detail.id));\n</script>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "segmented-control",
      "title": "Segmented Control"
    },
    {
      "slug": "empty",
      "title": "Empty"
    },
    {
      "slug": "badge",
      "title": "Badge"
    },
    {
      "slug": "button",
      "title": "Button"
    },
    {
      "slug": "inspector",
      "title": "Inspector"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "notifications",
      "title": "Notifications"
    }
  ]
},
{
  "slug": "number-input",
  "title": "Number Input",
  "category": "Form",
  "blurb": "A numeric field with increment and decrement buttons that clamps, snaps to the step, and exposes the value as a number.",
  "description": "A native numeric field flanked by minus and plus buttons that limits the value to the [min, max] range, aligns it to the step, and mirrors the value back into the host attribute. Use it when you need controlled numeric input (quantities, prices, age) with keyboard support (arrows, PageUp/PageDown, Home/End) and an ARIA spinbutton. It exposes the .value property (Number) and emits input (live) and change (on commit) events.",
  "attributes": [
    {
      "name": "min",
      "type": "number",
      "default": "",
      "desc": "Minimum allowed value. Sets the lower clamp bound and the origin for snapping to the step; it also enables the Home key to jump to the minimum."
    },
    {
      "name": "max",
      "type": "number",
      "default": "",
      "desc": "Maximum allowed value. Sets the upper clamp bound; enables the End key to jump to the maximum."
    },
    {
      "name": "step",
      "type": "number",
      "default": "1",
      "desc": "Increment for the buttons and arrows. PageUp/PageDown use step x 10. The value is snapped to the nearest multiple of step starting from min (or 0)."
    },
    {
      "name": "value",
      "type": "number",
      "default": "",
      "desc": "Current value. It is reflected back into the attribute after clamp/snap. It can be read/written via the .value property as a Number."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables the field and the step buttons."
    },
    {
      "name": "aria-label",
      "type": "string",
      "default": "\"Number\"",
      "desc": "Accessible label applied to the group (role=group) that wraps the field and the buttons."
    }
  ],
  "events": [
    "input",
    "change"
  ],
  "slots": [],
  "demoHTML": "<label for=\"qtd\" style=\"display:block;margin-bottom:.5rem;font:14px system-ui\">Number of products</label>\n<pura-number-input id=\"qtd\" aria-label=\"Quantity\" min=\"0\" max=\"20\" step=\"1\" value=\"3\"></pura-number-input>\n<p id=\"qtd-out\" style=\"margin-top:.75rem;font:14px system-ui;color:#555\">Selected: 3</p>\n<script type=\"module\">\n  import \"/pura/lib/number-input.js\";\n  const inp = document.getElementById(\"qtd\");\n  const out = document.getElementById(\"qtd-out\");\n  inp.addEventListener(\"change\", (e) => {\n    out.textContent = \"Selected: \" + e.detail.value;\n  });\n</script>",
  "usage": "<label for=\"qtd\">Number of products</label>\n<pura-number-input id=\"qtd\" aria-label=\"Quantity\" min=\"0\" max=\"20\" step=\"1\" value=\"3\"></pura-number-input>\n<script type=\"module\">\n  import \"/pura/lib/number-input.js\";\n  const inp = document.getElementById(\"qtd\");\n  inp.addEventListener(\"change\", (e) => {\n    console.log(\"new value:\", e.detail.value);\n  });\n  // Programmatic read/write via the .value property (Number):\n  // inp.value = 5;  inp.disabled = true;\n</script>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "input-group",
      "title": "Input Group"
    },
    {
      "slug": "stepper",
      "title": "Stepper"
    },
    {
      "slug": "item",
      "title": "Item"
    },
    {
      "slug": "separator",
      "title": "Separator"
    },
    {
      "slug": "card",
      "title": "Card"
    },
    {
      "slug": "badge",
      "title": "Badge"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "checkout",
      "title": "Checkout"
    }
  ]
},
{
  "slug": "optimistic",
  "title": "Optimistic",
  "category": "Agent",
  "blurb": "Wraps an action with optimistic UI and built-in rollback, exposing a global registry that agents can enumerate and trigger.",
  "description": "pura-optimistic immediately swaps the original content for the optimistic result when activated, emits commit, and enters the \"pending\" state; the caller confirms success with confirm()/the success event or reverts with rollback()/the fail event, announcing the reversion in an aria-live region. Use it when you want instant feedback on an action that may fail (like, save, send) without freezing the interface. Being agent-native, it reflects the lifecycle in stable data-* attributes (data-state, data-pending) and keeps a global Map window.__puraOptimistic with query(state) and activate/confirm/rollback/reset handles, letting an agent discover and drive every optimistic action on the page.",
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
  "demoHTML": "<pura-optimistic id=\"curtir\" label=\"Like\" auto>\n  <span slot=\"optimistic\">❤️ Liked!</span>\n  <span>🤍 Like this photo</span>\n</pura-optimistic>",
  "usage": "<!-- Demo mode: confirms on its own (auto) -->\n<pura-optimistic id=\"curtir\" label=\"Like\" auto>\n  <span slot=\"optimistic\">❤️ Liked!</span>\n  <span>🤍 Like this photo</span>\n</pura-optimistic>\n\n<!-- Real mode: the caller decides the outcome -->\n<pura-optimistic id=\"salvar\" label=\"Save\" rollback-message=\"Couldn't save.\">\n  <span slot=\"optimistic\">Saving…</span>\n  <span>Unsaved draft</span>\n</pura-optimistic>\n\n<script type=\"module\">\n  import \"/pura/lib/optimistic.js\";\n  const el = document.getElementById(\"salvar\");\n  el.addEventListener(\"commit\", async (e) => {\n    try {\n      await fetch(\"/api/salvar\", { method: \"POST\" });\n      el.confirm();            // settle as committed\n    } catch (err) {\n      el.rollback(\"Network failure.\"); // revert + announce\n    }\n  });\n</script>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "orbiting-circles",
  "title": "Orbiting Circles",
  "category": "Display",
  "blurb": "Satellites ride a circular orbit around centred content. Pure CSS @keyframes with staggered delays, SSR-safe, reduced-motion aware.",
  "description": "`<pura-orbiting-circles>` sends satellites around a circular orbit encircling its slotted centre content, in the style of Magic UI's Orbiting Circles. The motion is pure CSS: one `@keyframes` rotates each satellite's arm, and a negative `animation-delay` spreads them evenly around the ring so the orbit is filled from the first frame, with no animation runtime. Set `count`, `duration`, and `reverse`, and theme with `--pura-orbit-size`, `--pura-orbit-radius`, `--pura-orbit-dot`, `--pura-orbit-color`, and `--pura-orbit-glow`. Under reduced motion the satellites come to rest via the base reset. It registers in `window.__puraOrbitingCircles` by `data-pura-id` for agent enumeration.",
  "attributes": [
    {
      "name": "count",
      "type": "number",
      "default": "5",
      "desc": "Number of orbiting satellites (max 24)."
    },
    {
      "name": "duration",
      "type": "number",
      "default": "20",
      "desc": "Seconds for one full orbit."
    },
    {
      "name": "reverse",
      "type": "boolean",
      "default": "false",
      "desc": "Orbit counter-clockwise."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "demoHTML": "<pura-orbiting-circles count=\"6\" duration=\"16\" style=\"--pura-orbit-size: 220px; --pura-orbit-radius: 88px; --pura-orbit-color: #8b5cf6;\">\n  <div style=\"font: 700 16px system-ui; text-align: center; color: var(--pura-fg, #18181b);\">Orbit</div>\n</pura-orbiting-circles>",
  "usage": "<pura-orbiting-circles count=\"6\" duration=\"16\">\n  <img src=\"/logo.svg\" alt=\"\" width=\"48\" height=\"48\">\n</pura-orbiting-circles>\n\n<!-- Reverse, custom radius -->\n<pura-orbiting-circles count=\"4\" reverse style=\"--pura-orbit-radius: 110px;\">\n  <span>Core</span>\n</pura-orbiting-circles>",
  "animation": true,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "organization-chart",
  "title": "Organization Chart",
  "category": "Display",
  "blurb": "Hierarchical org chart rendered top-down with CSS-drawn connector lines, supporting JSON data or slotted pura-org-node elements.",
  "description": "Hierarchical org chart rendered top-down with CSS-drawn connector lines, supporting JSON data or slotted pura-org-node elements.",
  "attributes": [
    {
      "name": "data",
      "type": "string",
      "default": "",
      "desc": "JSON string representing the nested org chart data ({label, children:[...]})."
    },
    {
      "name": "collapsible",
      "type": "boolean",
      "default": "",
      "desc": "Allows clicking a node to toggle its subtree visibility."
    }
  ],
  "events": [
    "nodeclick"
  ],
  "slots": [],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "overflow-list",
  "title": "Overflow List",
  "category": "Layout",
  "blurb": "Responsive horizontal container that shows as many slotted children as fit on one line and collapses the rest into a trailing overflow menu.",
  "description": "Responsive horizontal container that shows as many slotted children as fit on one line and collapses the rest into a trailing overflow menu.",
  "attributes": [
    {
      "name": "min-visible",
      "type": "number",
      "default": "",
      "desc": "Always show at least N items even if they overflow."
    },
    {
      "name": "gap",
      "type": "string",
      "default": "0.5rem",
      "desc": "CSS length value for the horizontal gap between items."
    }
  ],
  "events": [
    "overflowchange"
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "overlay",
  "title": "Overlay",
  "category": "Overlay",
  "blurb": "Standalone dimming scrim and loading overlay layer, separate from dialog, with optional spinner and dismissable behavior.",
  "description": "Standalone dimming scrim and loading overlay layer, separate from dialog, with optional spinner and dismissable behavior.",
  "attributes": [
    {
      "name": "open",
      "type": "boolean",
      "default": "",
      "desc": "Controls visibility of the overlay."
    },
    {
      "name": "target",
      "type": "string",
      "default": "page",
      "desc": "\"page\" for fixed full-screen or \"parent\" for absolute covering the nearest positioned ancestor."
    },
    {
      "name": "blur",
      "type": "boolean",
      "default": "",
      "desc": "Applies a backdrop-filter blur to the scrim."
    },
    {
      "name": "spinner",
      "type": "boolean",
      "default": "",
      "desc": "Centers a spinner animation inside the overlay."
    },
    {
      "name": "message",
      "type": "string",
      "default": "",
      "desc": "Text shown under the spinner."
    },
    {
      "name": "dismissable",
      "type": "boolean",
      "default": "",
      "desc": "Clicking the scrim closes the overlay and dispatches a close event."
    }
  ],
  "events": [
    "close"
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "pagination",
  "title": "Pagination",
  "category": "Navigation",
  "blurb": "Page navigation with Previous/Next buttons and ellipsis truncation.",
  "description": "Pagination is a native web component that renders pagination controls: a Previous button, page numbers with ellipsis truncation (first, last, current, and neighbors), and a Next button. Use it when you need to split long lists or tables into pages. When a page is clicked, it fires the change event and updates the page attribute automatically.",
  "attributes": [
    {
      "name": "total",
      "type": "number",
      "default": "1",
      "desc": "Total number of pages. Invalid values or values lower than 1 fall back to 1."
    },
    {
      "name": "page",
      "type": "number",
      "default": "1",
      "desc": "Current page, 1-based. Clamped to the range between 1 and total."
    }
  ],
  "events": [
    "change"
  ],
  "slots": [],
  "demoHTML": "<pura-pagination id=\"paginacao\" total=\"10\" page=\"3\"></pura-pagination>\n\n<script type=\"module\">\n  const paginacao = document.getElementById(\"paginacao\");\n  paginacao.addEventListener(\"change\", (e) => {\n    console.log(\"Selected page:\", e.detail.page);\n  });\n</script>",
  "usage": "<pura-pagination id=\"paginacao\" total=\"10\" page=\"3\"></pura-pagination>\n\n<script type=\"module\">\n  const paginacao = document.getElementById(\"paginacao\");\n  paginacao.addEventListener(\"change\", (e) => {\n    console.log(\"Selected page:\", e.detail.page);\n  });\n</script>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "button-group",
      "title": "Button Group"
    },
    {
      "slug": "table",
      "title": "Table"
    },
    {
      "slug": "dropdown-menu",
      "title": "Dropdown Menu"
    },
    {
      "slug": "select",
      "title": "Select"
    },
    {
      "slug": "input",
      "title": "Input"
    },
    {
      "slug": "avatar",
      "title": "Avatar"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "data-table",
      "title": "Data Table"
    }
  ]
},
{
  "slug": "parallax",
  "title": "Parallax",
  "category": "Marketing",
  "blurb": "Scroll parallax container that moves slotted content at a configurable speed factor relative to the page scroll to create a sense of depth.",
  "description": "Scroll parallax container that moves slotted content at a configurable speed factor relative to the page scroll to create a sense of depth.",
  "attributes": [
    {
      "name": "speed",
      "type": "number",
      "default": "0.5",
      "desc": "Parallax factor for the default content layer (0.5 = half scroll speed, negative reverses direction)."
    },
    {
      "name": "axis",
      "type": "string",
      "default": "y",
      "desc": "Scroll axis for the parallax effect: \"y\" (default) or \"x\"."
    },
    {
      "name": "image",
      "type": "string",
      "default": "",
      "desc": "Optional background image URL for a built-in parallaxed background layer."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "demoHTML": "",
  "usage": "",
  "animation": true,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "particles",
  "title": "Particles",
  "category": "Display",
  "blurb": "A field of dots that drift and twinkle behind content. Deterministic pure CSS @keyframes, SSR-safe, reduced-motion aware.",
  "description": "`<pura-particles>` floats a field of small dots that drift and twinkle behind its slotted content, in the style of Magic UI's Particles. The motion is pure CSS: each dot rides a deterministic `@keyframes` (fixed position and timing per index, so server and client paint byte-identically), with no animation runtime. Set the density with `count`, and theme with `--pura-particle-color` and `--pura-particle-opacity`. Under reduced motion the field comes to rest via the base reset. It registers in `window.__puraParticles` by `data-pura-id` for agent enumeration.",
  "attributes": [
    {
      "name": "count",
      "type": "number",
      "default": "60",
      "desc": "Number of particles (max 200)."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "demoHTML": "<pura-particles count=\"80\" style=\"border-radius: 12px; background: #06070d; --pura-particle-color: #c4b5fd;\">\n  <div style=\"padding: 3.5rem 1.5rem; text-align: center; font: 700 22px system-ui; color: #fff; letter-spacing: -.02em;\">\n    Particles\n    <div style=\"font-weight: 400; font-size: 13px; color: rgba(255,255,255,.7); margin-top: .4rem;\">Ambient drifting field, pure CSS.</div>\n  </div>\n</pura-particles>",
  "usage": "<pura-particles count=\"80\">\n  <section class=\"hero\">Content over a particle field</section>\n</pura-particles>\n\n<!-- Sparser, custom color -->\n<pura-particles count=\"40\" style=\"--pura-particle-color: #38bdf8;\">\n  <div>...</div>\n</pura-particles>",
  "animation": true,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "password-input",
  "title": "Password Input",
  "category": "Form",
  "blurb": "Password field with a show/hide reveal toggle and an optional strength meter.",
  "description": "Password field with a show/hide reveal toggle and an optional strength meter.",
  "attributes": [
    {
      "name": "value",
      "type": "string",
      "default": "",
      "desc": "Current value of the password input."
    },
    {
      "name": "placeholder",
      "type": "string",
      "default": "",
      "desc": "Placeholder text for the input."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "",
      "desc": "Disables the input and reveal toggle."
    },
    {
      "name": "meter",
      "type": "boolean",
      "default": "",
      "desc": "Shows a password strength meter and label below the input."
    },
    {
      "name": "name",
      "type": "string",
      "default": "",
      "desc": "Name attribute forwarded to the internal input element for form submission."
    }
  ],
  "events": [
    "input"
  ],
  "slots": [],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "pdf-viewer",
  "title": "Pdf Viewer",
  "category": "Display",
  "blurb": "Thin wrapper that embeds a PDF via the browser's native PDF renderer using an iframe, with an optional toolbar and download link.",
  "description": "Thin wrapper that embeds a PDF via the browser's native PDF renderer using an iframe, with an optional toolbar and download link.",
  "attributes": [
    {
      "name": "src",
      "type": "string",
      "default": "",
      "desc": "URL of the PDF to display."
    },
    {
      "name": "height",
      "type": "string",
      "default": "600",
      "desc": "Viewer height as a number (converted to px) or any CSS length."
    },
    {
      "name": "download",
      "type": "boolean",
      "default": "",
      "desc": "Shows a download link in the toolbar."
    },
    {
      "name": "title",
      "type": "string",
      "default": "",
      "desc": "Display name shown in the toolbar; falls back to the filename from src."
    }
  ],
  "events": [],
  "slots": [],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "popconfirm",
  "title": "Popconfirm",
  "category": "Overlay",
  "blurb": "Confirmation popover anchored to a slotted trigger element, showing a message with Confirm and Cancel buttons built on the native Popover API.",
  "description": "Confirmation popover anchored to a slotted trigger element, showing a message with Confirm and Cancel buttons built on the native Popover API.",
  "attributes": [
    {
      "name": "title",
      "type": "string",
      "default": "",
      "desc": "Question text shown in the popover (alias of message)."
    },
    {
      "name": "message",
      "type": "string",
      "default": "",
      "desc": "Question text shown in the popover (alias of title)."
    },
    {
      "name": "confirm-text",
      "type": "string",
      "default": "",
      "desc": "Label for the confirm button."
    },
    {
      "name": "cancel-text",
      "type": "string",
      "default": "",
      "desc": "Label for the cancel button."
    },
    {
      "name": "danger",
      "type": "boolean",
      "default": "",
      "desc": "Renders the confirm button with a danger style."
    },
    {
      "name": "placement",
      "type": "string",
      "default": "bottom",
      "desc": "Popover placement relative to the trigger: bottom | top | left | right."
    }
  ],
  "events": [
    "confirm",
    "cancel"
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "popover",
  "title": "Popover",
  "category": "Overlay",
  "blurb": "Floating panel anchored to a trigger, with click-outside and ESC dismissal.",
  "description": "Popover is a native web component that displays a floating panel anchored to its trigger, built on the native Popover API (top layer, light dismiss, and ESC included) with CSS anchor positioning. Use it to show contextual content on demand, such as help, action menus, or detail cards. Control positioning with the placement attribute, and open or close it programmatically with the show() and hide() methods.",
  "attributes": [
    {
      "name": "placement",
      "type": "\"bottom\" | \"top\" | \"left\" | \"right\"",
      "default": "bottom",
      "desc": "Side of the trigger where the panel is positioned."
    },
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "desc": "Reflects and controls the open state of the panel; present when visible."
    }
  ],
  "events": [
    "open",
    "close"
  ],
  "slots": [
    "trigger",
    "default"
  ],
  "demoHTML": "<pura-popover placement=\"bottom\">\n  <button slot=\"trigger\">More information</button>\n  <strong>Pro plan</strong>\n  <p>Includes unlimited projects, priority support, and advanced reports.</p>\n</pura-popover>",
  "usage": "<pura-popover placement=\"bottom\">\n  <button slot=\"trigger\">More information</button>\n  <strong>Pro plan</strong>\n  <p>Includes unlimited projects, priority support, and advanced reports.</p>\n</pura-popover>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "portal",
  "title": "Portal",
  "category": "Agent",
  "blurb": "Teleports your content elsewhere in the DOM (the body by default) while keeping logical ownership, and restores it to its original place when removed.",
  "description": "`pura-portal` is a headless teleporter (no appearance of its own, `display: contents`) that physically moves the child nodes into a mount element appended to the target, escaping clipping (overflow), transform, filter, or the z-index stacking context of some ancestor. Use it when an overlay or menu needs to render outside the parent container's clip without losing the logical link to its origin. It exposes a machine-readable layer: stable data-* attributes on the host (data-portal-id, data-to, data-active), a mount element marked with data-pura-portal-mount and data-portal-owner, and a global registry `window.__puraPortals` (a Map with query() and forTarget() helpers) so that agents can trace the teleported content back to its logical owner.",
  "attributes": [
    {
      "name": "to",
      "type": "string",
      "default": "body",
      "desc": "Teleport destination. The keyword \"body\" (default) points to document.body; any other value is treated as a CSS selector resolved via document.querySelector. If it matches nothing, the content stays in place (graceful degradation)."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "When present, the portal does NOT teleport: the content stays inline in its original position."
    }
  ],
  "events": [
    "pura-portal:mount",
    "pura-portal:unmount"
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "<div style=\"position:relative;overflow:hidden;height:120px;border:1px solid #d4d4d8;border-radius:8px;padding:16px;background:#fafafa\">\n  <p style=\"margin:0 0 8px\">Container with <code>overflow:hidden</code> (clips the content).</p>\n  <pura-portal id=\"demo-portal\" to=\"body\">\n    <div style=\"position:fixed;bottom:24px;right:24px;padding:12px 16px;background:#18181b;color:#fff;border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,.25)\">\n      Teleported to the <strong><body></strong>, escaping the clip.\n    </div>\n  </pura-portal>\n</div>\n<button id=\"demo-toggle\" type=\"button\" style=\"margin-top:12px;padding:8px 14px;border:1px solid #d4d4d8;border-radius:6px;cursor:pointer\">Toggle teleport</button>\n<script type=\"module\">\n  const portal = document.getElementById(\"demo-portal\");\n  document.getElementById(\"demo-toggle\").addEventListener(\"click\", () => {\n    portal.toggleAttribute(\"disabled\");\n  });\n  portal.addEventListener(\"pura-portal:mount\", (e) => console.log(\"mount\", e.detail));\n  portal.addEventListener(\"pura-portal:unmount\", (e) => console.log(\"unmount\", e.detail));\n</script>",
  "usage": "<div style=\"position:relative;overflow:hidden;height:120px;border:1px solid #d4d4d8;border-radius:8px;padding:16px;background:#fafafa\">\n  <p style=\"margin:0 0 8px\">Container with <code>overflow:hidden</code> (clips the content).</p>\n  <pura-portal id=\"demo-portal\" to=\"body\">\n    <div style=\"position:fixed;bottom:24px;right:24px;padding:12px 16px;background:#18181b;color:#fff;border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,.25)\">\n      Teleported to the <strong><body></strong>, escaping the clip.\n    </div>\n  </pura-portal>\n</div>\n<button id=\"demo-toggle\" type=\"button\" style=\"margin-top:12px;padding:8px 14px;border:1px solid #d4d4d8;border-radius:6px;cursor:pointer\">Toggle teleport</button>\n<script type=\"module\">\n  const portal = document.getElementById(\"demo-portal\");\n  document.getElementById(\"demo-toggle\").addEventListener(\"click\", () => {\n    portal.toggleAttribute(\"disabled\");\n  });\n  portal.addEventListener(\"pura-portal:mount\", (e) => console.log(\"mount\", e.detail));\n  portal.addEventListener(\"pura-portal:unmount\", (e) => console.log(\"unmount\", e.detail));\n</script>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "presence",
  "title": "Presence",
  "category": "Display",
  "blurb": "Stack of overlapping avatars with a real-time online count and an overflow roster.",
  "description": "Presence stacks overlapping avatars (`<pura-avatar>`), derives how many people are online from each one's `status`, and shows a subtle live pulse. Use it to indicate who is present in a document, room, or collaboration; when the number of avatars exceeds `max`, the overflow collapses into a \"+N\" bubble that opens a popover with the remaining roster. It is agent-native: it exposes `role=\"group\"`, a count region with `aria-live`, stable `data-*` attributes (`data-total`, `data-online`, `data-overflow`) on the host and the inner group, plus a global registry in `window.__puraPresence` by instance id for agent reading.",
  "attributes": [
    {
      "name": "max",
      "type": "number",
      "default": "0 (all)",
      "desc": "Maximum avatars shown before collapsing into a \"+N\" bubble. 0, absent, or non-positive shows all. When collapsing, it reserves a slot for the bubble."
    },
    {
      "name": "size",
      "type": "\"sm\" | \"md\" | \"lg\"",
      "default": "md",
      "desc": "Passed down to each child <pura-avatar> and adjusts the stack overlap (sm tighter, lg wider)."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Online presence",
      "desc": "Accessible name (aria-label) of the presence stack."
    }
  ],
  "events": [
    "pura-overflow-toggle"
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "<pura-presence max=\"4\" size=\"md\" label=\"People in the document\">\n  <pura-avatar initials=\"AS\" status=\"online\"></pura-avatar>\n  <pura-avatar initials=\"BL\" status=\"online\"></pura-avatar>\n  <pura-avatar initials=\"CR\" status=\"busy\"></pura-avatar>\n  <pura-avatar initials=\"DM\" status=\"online\"></pura-avatar>\n  <pura-avatar initials=\"EF\" status=\"offline\"></pura-avatar>\n  <pura-avatar initials=\"GP\" status=\"online\"></pura-avatar>\n</pura-presence>",
  "usage": "<pura-presence max=\"4\" size=\"md\" label=\"People in the document\">\n  <pura-avatar initials=\"AS\" status=\"online\"></pura-avatar>\n  <pura-avatar initials=\"BL\" status=\"online\"></pura-avatar>\n  <pura-avatar initials=\"CR\" status=\"busy\"></pura-avatar>\n  <pura-avatar initials=\"DM\" status=\"online\"></pura-avatar>\n  <pura-avatar initials=\"EF\" status=\"offline\"></pura-avatar>\n  <pura-avatar initials=\"GP\" status=\"online\"></pura-avatar>\n</pura-presence>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "chat-bubble",
      "title": "Chat Bubble"
    },
    {
      "slug": "chat-input",
      "title": "Chat Input"
    },
    {
      "slug": "item",
      "title": "Item"
    },
    {
      "slug": "avatar",
      "title": "Avatar"
    },
    {
      "slug": "badge",
      "title": "Badge"
    },
    {
      "slug": "inspector",
      "title": "Inspector"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "chat",
      "title": "Chat"
    }
  ]
},
{
  "slug": "pricing-table",
  "title": "Pricing Table",
  "category": "Marketing",
  "blurb": "Responsive grid of pricing plans, with a featured plan and an AI-agent-readable snapshot.",
  "description": "`<pura-pricing-table>` is a container that lays out `<pura-pricing-tier>` columns in a grid that auto-fits the available width, and can highlight a plan with an accent ring and a \"Popular\" badge. Use it on marketing or plans/subscription pages to compare tiers side by side in an accessible way (role=\"list\" with role=\"listitem\" items). It is agent-native: each table registers a live, machine-readable snapshot in `window.__puraPricing[id]` with `{ label, tiers: [{ id, name, price, period, featured, features }] }`, letting AI agents read the plans without scraping the DOM.",
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
  "demoHTML": "<pura-pricing-table label=\"Pura plans\" min=\"16rem\">\n  <pura-pricing-tier name=\"Starter\" price=\"$0\" period=\"/mo\">\n    <span slot=\"description\">For starting personal projects.</span>\n    <ul>\n      <li>1 project</li>\n      <li>Essential components</li>\n      <li>Community support</li>\n    </ul>\n    <pura-button slot=\"action\" variant=\"outline\">Start for free</pura-button>\n  </pura-pricing-tier>\n\n  <pura-pricing-tier name=\"Pro\" price=\"$29\" period=\"/mo\" featured badge=\"Most popular\">\n    <span slot=\"description\">For teams that need more.</span>\n    <ul>\n      <li>Unlimited projects</li>\n      <li>All components</li>\n      <li>Priority support</li>\n    </ul>\n    <pura-button slot=\"action\" variant=\"primary\">Subscribe to Pro</pura-button>\n  </pura-pricing-tier>\n\n  <pura-pricing-tier name=\"Enterprise\" price=\"Custom\">\n    <span slot=\"description\">For large organizations.</span>\n    <ul>\n      <li>Dedicated SLA</li>\n      <li>SSO and auditing</li>\n      <li>Account manager</li>\n    </ul>\n    <pura-button slot=\"action\" variant=\"outline\">Talk to sales</pura-button>\n  </pura-pricing-tier>\n</pura-pricing-table>",
  "usage": "<pura-pricing-table label=\"Pura plans\" min=\"16rem\">\n  <pura-pricing-tier name=\"Starter\" price=\"$0\" period=\"/mo\">\n    <span slot=\"description\">For starting personal projects.</span>\n    <ul>\n      <li>1 project</li>\n      <li>Essential components</li>\n      <li>Community support</li>\n    </ul>\n    <pura-button slot=\"action\" variant=\"outline\">Start for free</pura-button>\n  </pura-pricing-tier>\n\n  <pura-pricing-tier name=\"Pro\" price=\"$29\" period=\"/mo\" featured badge=\"Most popular\">\n    <span slot=\"description\">For teams that need more.</span>\n    <ul>\n      <li>Unlimited projects</li>\n      <li>All components</li>\n      <li>Priority support</li>\n    </ul>\n    <pura-button slot=\"action\" variant=\"primary\">Subscribe to Pro</pura-button>\n  </pura-pricing-tier>\n\n  <pura-pricing-tier name=\"Enterprise\" price=\"Custom\">\n    <span slot=\"description\">For large organizations.</span>\n    <ul>\n      <li>Dedicated SLA</li>\n      <li>SSO and auditing</li>\n      <li>Account manager</li>\n    </ul>\n    <pura-button slot=\"action\" variant=\"outline\">Talk to sales</pura-button>\n  </pura-pricing-tier>\n</pura-pricing-table>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "faq",
      "title": "FAQ"
    },
    {
      "slug": "banner",
      "title": "Banner"
    },
    {
      "slug": "testimonial",
      "title": "Testimonial"
    },
    {
      "slug": "segmented-control",
      "title": "Segmented Control"
    },
    {
      "slug": "stat",
      "title": "Stat"
    },
    {
      "slug": "stat-grid",
      "title": "Stat Grid"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "landing",
      "title": "Landing"
    },
    {
      "slug": "pricing",
      "title": "Pricing"
    }
  ]
},
{
  "slug": "progress-ring",
  "title": "Progress Ring",
  "category": "Display",
  "blurb": "Circular progress ring that shows the percentage in the center, with an animated indeterminate mode.",
  "description": "Circular progress indicator in SVG: the fill arc is controlled by stroke-dashoffset and the percentage appears in the center of the ring. Use it to represent determinate progress from 0 to 100 (uploads, steps, metrics), or add the indeterminate attribute for a spinner of unknown progress. The agent-native layer exposes data-pura-ring-* attributes that mirror the live state (value, state, size, thickness), and each instance registers itself in window.__puraProgressRings indexed by data-pura-id, letting an agent enumerate and read all rings without traversing the DOM.",
  "attributes": [
    {
      "name": "value",
      "type": "number",
      "default": "0",
      "desc": "Progress from 0 to 100 (clamped). Ignored when indeterminate."
    },
    {
      "name": "size",
      "type": "number",
      "default": "64",
      "desc": "Ring diameter in px. A plain number or a px value."
    },
    {
      "name": "thickness",
      "type": "number",
      "default": "6",
      "desc": "Stroke width in px, capped at half the size."
    },
    {
      "name": "indeterminate",
      "type": "boolean",
      "default": "false",
      "desc": "Spins continuously and hides the percentage label (unknown progress)."
    },
    {
      "name": "label",
      "type": "string",
      "default": "\"<value> percent\"",
      "desc": "Overrides the accessible name (aria-label)."
    }
  ],
  "events": [],
  "slots": [],
  "demoHTML": "<div style=\"display:flex;gap:24px;align-items:center;flex-wrap:wrap\">\n  <pura-progress-ring id=\"upload\" value=\"35\" size=\"96\" thickness=\"8\" label=\"Upload progress\"></pura-progress-ring>\n  <pura-progress-ring indeterminate size=\"96\" thickness=\"8\" label=\"Loading\"></pura-progress-ring>\n  <button id=\"avancar\" type=\"button\">Advance 10%</button>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/progress-ring.js\";\n  const ring = document.getElementById(\"upload\");\n  document.getElementById(\"avancar\").addEventListener(\"click\", () => {\n    ring.value = Math.min(100, ring.value + 10);\n  });\n</script>",
  "usage": "<div style=\"display:flex;gap:24px;align-items:center;flex-wrap:wrap\">\n  <pura-progress-ring id=\"upload\" value=\"35\" size=\"96\" thickness=\"8\" label=\"Upload progress\"></pura-progress-ring>\n  <pura-progress-ring indeterminate size=\"96\" thickness=\"8\" label=\"Loading\"></pura-progress-ring>\n  <button id=\"avancar\" type=\"button\">Advance 10%</button>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/progress-ring.js\";\n  const ring = document.getElementById(\"upload\");\n  document.getElementById(\"avancar\").addEventListener(\"click\", () => {\n    ring.value = Math.min(100, ring.value + 10);\n  });\n</script>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "progress",
  "title": "Progress",
  "category": "Display",
  "blurb": "Determinate or indeterminate progress bar to indicate the advancement of a task.",
  "description": "Progress is a native web component that displays a horizontal progress bar. Use the `value` attribute (0 to 100) to show determinate progress, or add `indeterminate` for an animated state when the duration is unknown. Ideal for uploads, loading, and workflow steps.",
  "attributes": [
    {
      "name": "value",
      "type": "number",
      "default": "0",
      "desc": "Current progress from 0 to 100; out-of-range values are clamped."
    },
    {
      "name": "indeterminate",
      "type": "boolean",
      "default": "false",
      "desc": "When present, shows an indefinite progress animation and ignores value."
    }
  ],
  "events": [],
  "slots": [],
  "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:1rem;max-width:24rem\">\n  <div>\n    <p style=\"margin:0 0 .5rem\">Uploading file (65%)</p>\n    <pura-progress value=\"65\"></pura-progress>\n  </div>\n  <div>\n    <p style=\"margin:0 0 .5rem\">Processing...</p>\n    <pura-progress indeterminate></pura-progress>\n  </div>\n</div>",
  "usage": "<div style=\"display:flex;flex-direction:column;gap:1rem;max-width:24rem\">\n  <div>\n    <p style=\"margin:0 0 .5rem\">Uploading file (65%)</p>\n    <pura-progress value=\"65\"></pura-progress>\n  </div>\n  <div>\n    <p style=\"margin:0 0 .5rem\">Processing...</p>\n    <pura-progress indeterminate></pura-progress>\n  </div>\n</div>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "prose",
  "title": "Typography",
  "category": "Display",
  "blurb": "Styles rich HTML content with a comfortable reading rhythm.",
  "description": "Typography (`<pura-prose>`) is a native web component that wraps rich HTML (headings, paragraphs, lists, quotes, code, images, and tables) and applies consistent typography via `::slotted`, with a comfortable reading measure and vertical rhythm. Use it to render articles, documentation, blog posts, or any long-form text without styling each element by hand. It's purely presentational, has no attributes, and is themeable through the `var(--pura-*)` tokens.",
  "attributes": [],
  "events": [],
  "slots": [
    "default"
  ],
  "demoHTML": "<pura-prose>\n  <h1>Introduction to pura</h1>\n  <p><strong>pura</strong> is a library of native <a href=\"#\">Web Components</a> with no dependencies. Use <code><pura-prose></code> for long-form text with consistent typography.</p>\n  <h2>Why use it</h2>\n  <ul>\n    <li>Zero dependencies and lightweight</li>\n    <li>Themeable via CSS tokens</li>\n    <li>Vertical rhythm and a comfortable reading measure</li>\n  </ul>\n  <blockquote>Write plain HTML and let the component handle the rhythm.</blockquote>\n</pura-prose>",
  "usage": "<pura-prose>\n  <h1>Introduction to pura</h1>\n  <p><strong>pura</strong> is a library of native <a href=\"#\">Web Components</a> with no dependencies. Use <code><pura-prose></code> for long-form text with consistent typography.</p>\n  <h2>Why use it</h2>\n  <ul>\n    <li>Zero dependencies and lightweight</li>\n    <li>Themeable via CSS tokens</li>\n    <li>Vertical rhythm and a comfortable reading measure</li>\n  </ul>\n  <blockquote>Write plain HTML and let the component handle the rhythm.</blockquote>\n</pura-prose>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "code-block",
      "title": "Code Block"
    },
    {
      "slug": "reactions",
      "title": "Reactions"
    },
    {
      "slug": "scroll-spy",
      "title": "Scroll Spy"
    },
    {
      "slug": "breadcrumb",
      "title": "Breadcrumb"
    },
    {
      "slug": "avatar",
      "title": "Avatar"
    },
    {
      "slug": "badge",
      "title": "Badge"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "blog-post",
      "title": "Blog Post"
    }
  ]
},
{
  "slug": "pull-to-refresh",
  "title": "Pull To Refresh",
  "category": "Feedback",
  "blurb": "Mobile-style pull-down gesture at scroll-top that reveals an indicator (arrow then spinner) and dispatches a refresh event when released past the threshold.",
  "description": "Mobile-style pull-down gesture at scroll-top that reveals an indicator (arrow then spinner) and dispatches a refresh event when released past the threshold.",
  "attributes": [
    {
      "name": "height",
      "type": "string",
      "default": "",
      "desc": "Height of the scroll container in pixels (number) or any CSS length."
    },
    {
      "name": "refreshing",
      "type": "boolean",
      "default": "",
      "desc": "App-controlled busy state that keeps the spinner visible until removed."
    }
  ],
  "events": [
    "refresh"
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "qr-code",
  "title": "Qr Code",
  "category": "Utility",
  "blurb": "Zero-dependency QR code encoder (byte mode, versions 1–10) that renders an SVG matrix using theme foreground and background colors.",
  "description": "Zero-dependency QR code encoder (byte mode, versions 1–10) that renders an SVG matrix using theme foreground and background colors.",
  "attributes": [
    {
      "name": "value",
      "type": "string",
      "default": "",
      "desc": "Text or URL to encode into the QR code."
    },
    {
      "name": "size",
      "type": "number",
      "default": "200",
      "desc": "Width and height of the rendered SVG in pixels."
    },
    {
      "name": "level",
      "type": "string",
      "default": "M",
      "desc": "Error correction level: L, M, Q, or H."
    }
  ],
  "events": [],
  "slots": [],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "radio-group",
  "title": "Radio Group",
  "category": "Form",
  "blurb": "Groups mutually exclusive radio options with keyboard navigation.",
  "description": "Radio Group is a native web component that groups child <pura-radio> elements, allowing only one option to be selected at a time. It renders a wrapper with role=radiogroup, offers arrow-key navigation (roving tabindex), and reflects the chosen option in the value attribute. Use it when the user needs to choose exactly one alternative among a few visible options.",
  "attributes": [
    {
      "name": "label",
      "type": "string",
      "default": "",
      "desc": "Heading/legend text for the group, also used as the aria-label."
    },
    {
      "name": "orientation",
      "type": "\"vertical\" | \"horizontal\"",
      "default": "vertical",
      "desc": "Layout direction of the options."
    },
    {
      "name": "value",
      "type": "string",
      "default": "",
      "desc": "Value of the selected option; it reflects and is reflected by the checked radio."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables the entire group, blocking interaction."
    }
  ],
  "events": [
    "change"
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "<pura-radio-group label=\"Subscription plan\" value=\"pro\">\n  <pura-radio name=\"plano\" value=\"free\">Free</pura-radio>\n  <pura-radio name=\"plano\" value=\"pro\">Professional</pura-radio>\n  <pura-radio name=\"plano\" value=\"team\">Team</pura-radio>\n  <pura-radio name=\"plano\" value=\"legacy\" disabled>Legacy (unavailable)</pura-radio>\n</pura-radio-group>",
  "usage": "<pura-radio-group label=\"Subscription plan\" value=\"pro\">\n  <pura-radio name=\"plano\" value=\"free\">Free</pura-radio>\n  <pura-radio name=\"plano\" value=\"pro\">Professional</pura-radio>\n  <pura-radio name=\"plano\" value=\"team\">Team</pura-radio>\n  <pura-radio name=\"plano\" value=\"legacy\" disabled>Legacy (unavailable)</pura-radio>\n</pura-radio-group>\n\n<script type=\"module\">\n  document.querySelector('pura-radio-group')\n    .addEventListener('change', (e) => console.log('selected:', e.detail.value));\n</script>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "radio",
      "title": "Radio"
    },
    {
      "slug": "switch",
      "title": "Switch"
    },
    {
      "slug": "tabs",
      "title": "Tabs"
    },
    {
      "slug": "field",
      "title": "Field"
    },
    {
      "slug": "select",
      "title": "Select"
    },
    {
      "slug": "separator",
      "title": "Separator"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "settings",
      "title": "Settings"
    }
  ]
},
{
  "slug": "radio",
  "title": "Radio",
  "category": "Form",
  "blurb": "Single radio button with a slotted label; group multiple radios by shared name attribute.",
  "description": "Single radio button with a slotted label; group multiple radios by shared name attribute.",
  "attributes": [
    {
      "name": "checked",
      "type": "boolean",
      "default": "",
      "desc": "Whether this radio is selected."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "",
      "desc": "Disables the radio button."
    },
    {
      "name": "name",
      "type": "string",
      "default": "",
      "desc": "Group name shared across related radio buttons."
    },
    {
      "name": "value",
      "type": "string",
      "default": "",
      "desc": "Value emitted in the change event detail when this radio is selected."
    }
  ],
  "events": [
    "change"
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "radio-group",
      "title": "Radio Group"
    },
    {
      "slug": "switch",
      "title": "Switch"
    },
    {
      "slug": "tabs",
      "title": "Tabs"
    },
    {
      "slug": "field",
      "title": "Field"
    },
    {
      "slug": "select",
      "title": "Select"
    },
    {
      "slug": "separator",
      "title": "Separator"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "settings",
      "title": "Settings"
    }
  ]
},
{
  "slug": "range-slider",
  "title": "Range Slider",
  "category": "Form",
  "blurb": "A range slider with two handles for selecting an interval between a minimum and a maximum.",
  "description": "`<pura-range-slider>` is a range slider with two handles (minimum and maximum) over a track, with the segment between them filled. Use it when the user needs to choose a range of values, such as a price or date range, rather than just a single number. Each handle is an independent `role=\"slider\"` with its own `aria-valuemin/max/now` and exposes its current state in `data-pura-value`, making each handle readable and operable by screen readers and agents via the keyboard (arrows, Home, End, PageUp, PageDown).",
  "attributes": [
    {
      "name": "min",
      "type": "number",
      "default": "0",
      "desc": "Minimum value of the range."
    },
    {
      "name": "max",
      "type": "number",
      "default": "100",
      "desc": "Maximum value of the range. If it is less than or equal to min, it becomes min + 1."
    },
    {
      "name": "step",
      "type": "number",
      "default": "1",
      "desc": "Increment between values; values are snapped to the nearest step."
    },
    {
      "name": "value-min",
      "type": "number",
      "default": "min",
      "desc": "Position of the lower handle. Reflected back to the host; it never exceeds value-max."
    },
    {
      "name": "value-max",
      "type": "number",
      "default": "max",
      "desc": "Position of the upper handle. Reflected back to the host; it never falls below value-min."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables pointer and keyboard interaction and removes the handles from the tab order."
    },
    {
      "name": "aria-label",
      "type": "string",
      "default": "\"Range\"",
      "desc": "Base label used to name the handles as \"<label> minimum\" and \"<label> maximum\"."
    }
  ],
  "events": [
    "input",
    "change"
  ],
  "slots": [],
  "demoHTML": "<label for=\"preco\" style=\"display:block;margin-bottom:.5rem;font:500 .875rem system-ui\">Price range</label>\n<pura-range-slider id=\"preco\" aria-label=\"Price range\"\n  min=\"0\" max=\"1000\" step=\"50\" value-min=\"200\" value-max=\"750\"></pura-range-slider>\n<p id=\"saida\" style=\"margin-top:.75rem;font:.875rem system-ui;color:#555\">$200 to $750</p>\n<script type=\"module\">\n  import \"/pura/lib/range-slider.js\";\n  const slider = document.getElementById(\"preco\");\n  const saida = document.getElementById(\"saida\");\n  slider.addEventListener(\"input\", (e) => {\n    saida.textContent = `$${e.detail.min} to $${e.detail.max}`;\n  });\n</script>",
  "usage": "<label for=\"preco\">Price range</label>\n<pura-range-slider id=\"preco\" aria-label=\"Price range\"\n  min=\"0\" max=\"1000\" step=\"50\" value-min=\"200\" value-max=\"750\"></pura-range-slider>\n<script type=\"module\">\n  import \"/pura/lib/range-slider.js\";\n  const slider = document.getElementById(\"preco\");\n  slider.addEventListener(\"change\", (e) => {\n    console.log(\"final range:\", e.detail.min, e.detail.max);\n  });\n</script>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "rating",
  "title": "Rating",
  "category": "Form",
  "blurb": "A star rating control, keyboard accessible and exposed as an ARIA slider.",
  "description": "`<pura-rating>` is a star rating selector that accepts click, hover, and full keyboard input (arrows, Home/End, number keys), with optional half-star support. Use it in feedback forms, reviews, or any rating capture from 0 up to `max`. The agent-native layer mirrors the live state in `data-pura-rating-*` attributes (value, max, readonly, step) on the element itself and registers each instance in `window.__puraRatings` (keyed by `data-pura-id`), allowing agents to read and drive every rating on the page without inspecting the shadow DOM.",
  "attributes": [
    {
      "name": "value",
      "type": "number",
      "default": "0",
      "desc": "Current rating. It can be fractional (0.5) when allow-half is active; it is clamped between 0 and max."
    },
    {
      "name": "max",
      "type": "number",
      "default": "5",
      "desc": "Number of stars."
    },
    {
      "name": "readonly",
      "type": "boolean",
      "default": "false",
      "desc": "Read-only mode: not interactive and not focusable (tabindex -1)."
    },
    {
      "name": "allow-half",
      "type": "boolean",
      "default": "false",
      "desc": "Allows half-star increments (0.5) on hover, click, and keyboard."
    },
    {
      "name": "label",
      "type": "string",
      "default": "\"Rating\"",
      "desc": "Accessible label (aria-label of the slider)."
    }
  ],
  "events": [
    "change",
    "input"
  ],
  "slots": [],
  "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:12px;align-items:flex-start\">\n  <pura-rating id=\"nota\" value=\"3\" max=\"5\" allow-half label=\"Rate the product\"></pura-rating>\n  <p id=\"saida\" style=\"font:14px system-ui;margin:0\">Selected rating: 3</p>\n</div>\n<script type=\"module\">\n  const r = document.getElementById(\"nota\");\n  const out = document.getElementById(\"saida\");\n  r.addEventListener(\"change\", (e) => {\n    out.textContent = \"Selected rating: \" + e.detail.value;\n  });\n</script>",
  "usage": "<pura-rating id=\"nota\" value=\"3\" max=\"5\" allow-half label=\"Rate the product\"></pura-rating>\n<p id=\"saida\">Selected rating: 3</p>\n<script type=\"module\">\n  const r = document.getElementById(\"nota\");\n  const out = document.getElementById(\"saida\");\n  r.addEventListener(\"change\", (e) => {\n    out.textContent = \"Selected rating: \" + e.detail.value;\n  });\n</script>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "reactions",
  "title": "Reactions",
  "category": "Display",
  "blurb": "Bar of emoji pills where each click toggles the reaction and adjusts the counter.",
  "description": "`<pura-reactions>` groups `<pura-reaction>` pills (toggle buttons with `aria-pressed`); clicking a pill turns the user's reaction on/off and increments or decrements the counter, emitting a `react` event. Use it for emoji-style reactions on posts, comments, or messages. It is agent-native: each bar and pill registers itself in `window.__puraReactions` (keyed by `data-pura-id`) and mirrors the state in `data-pura-reaction-*` and `data-pura-reactions-count`/`data-pura-reactions-active` attributes, letting agents enumerate, read, and trigger reactions via `toggle()`.",
  "attributes": [
    {
      "name": "label",
      "type": "string",
      "default": "\"Reactions\"",
      "desc": "On <pura-reactions>: accessible label for the group (aria-label)."
    },
    {
      "name": "emoji",
      "type": "string",
      "default": "\"\"",
      "desc": "On <pura-reaction>: the emoji glyph displayed (e.g., \"👍\"). Empty if absent."
    },
    {
      "name": "count",
      "type": "integer",
      "default": "0",
      "desc": "On <pura-reaction>: current counter (reflected). Hidden when zero."
    },
    {
      "name": "active",
      "type": "boolean",
      "default": "false",
      "desc": "On <pura-reaction>: indicates the user reacted; pill highlighted with aria-pressed=true."
    },
    {
      "name": "label",
      "type": "string",
      "default": "(emoji)",
      "desc": "On <pura-reaction>: optional accessible label for the reaction (e.g., \"Like\"). Falls back to the emoji if absent."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "On <pura-reaction>: makes the pill non-interactive."
    }
  ],
  "events": [
    "react"
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "<pura-reactions label=\"Post reactions\" id=\"rx\">\n  <pura-reaction emoji=\"👍\" count=\"12\" label=\"Like\" active></pura-reaction>\n  <pura-reaction emoji=\"❤️\" count=\"8\" label=\"Love\"></pura-reaction>\n  <pura-reaction emoji=\"🎉\" count=\"3\" label=\"Celebrate\"></pura-reaction>\n  <pura-reaction emoji=\"🤔\" count=\"1\" label=\"Thinking\"></pura-reaction>\n</pura-reactions>\n\n<script type=\"module\">\n  document.getElementById(\"rx\").addEventListener(\"react\", (e) => {\n    const { emoji, active, count } = e.detail;\n    console.log(`${emoji} ${active ? \"activated\" : \"deactivated\"} (total: ${count})`);\n  });\n</script>",
  "usage": "<pura-reactions label=\"Post reactions\" id=\"rx\">\n  <pura-reaction emoji=\"👍\" count=\"12\" label=\"Like\" active></pura-reaction>\n  <pura-reaction emoji=\"❤️\" count=\"8\" label=\"Love\"></pura-reaction>\n  <pura-reaction emoji=\"🎉\" count=\"3\" label=\"Celebrate\"></pura-reaction>\n  <pura-reaction emoji=\"🤔\" count=\"1\" label=\"Thinking\"></pura-reaction>\n</pura-reactions>\n\n<script type=\"module\">\n  document.getElementById(\"rx\").addEventListener(\"react\", (e) => {\n    const { emoji, active, count } = e.detail;\n    console.log(`${emoji} ${active ? \"activated\" : \"deactivated\"} (total: ${count})`);\n  });\n</script>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "code-block",
      "title": "Code Block"
    },
    {
      "slug": "scroll-spy",
      "title": "Scroll Spy"
    },
    {
      "slug": "prose",
      "title": "Typography"
    },
    {
      "slug": "breadcrumb",
      "title": "Breadcrumb"
    },
    {
      "slug": "avatar",
      "title": "Avatar"
    },
    {
      "slug": "badge",
      "title": "Badge"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "blog-post",
      "title": "Blog Post"
    }
  ]
},
{
  "slug": "redact",
  "title": "Redact",
  "category": "Agent",
  "blurb": "Hides sensitive content with blur until it's explicitly revealed, keeping the value out of the accessibility tree.",
  "description": "Redact is an agent-native component that blurs and protects sensitive content in the slot (secrets, tokens, salaries, PII) until an explicit reveal by click, hover, or programmatic call. While hidden, the accessibility tree exposes only a generic label (\"hidden content\"), so screen readers and agents never leak the real value before a human reveals it. The agent-native layer mirrors the state in stable data-* attributes on the host (data-pura-redact, data-pura-id, data-state, data-reveal-on) and registers each instance in window.__puraRedactions, letting agents audit and control every redaction on the page without crossing the Shadow DOM (the value is never mirrored in those attributes).",
  "attributes": [
    {
      "name": "reveal-on",
      "type": "\"click\" | \"hover\" | \"none\"",
      "default": "click",
      "desc": "Interaction that reveals the content. \"none\" makes it purely programmatic (reveal via .reveal())."
    },
    {
      "name": "revealed",
      "type": "boolean",
      "default": "false",
      "desc": "Reflected boolean; present while the value is visible. Set it in markup to start already revealed."
    },
    {
      "name": "label",
      "type": "string",
      "default": "conteúdo oculto",
      "desc": "Accessible label announced while the content is hidden."
    },
    {
      "name": "blur",
      "type": "\"sm\" | \"md\" | \"lg\"",
      "default": "md",
      "desc": "Intensity of the blur that obscures the content while hidden."
    },
    {
      "name": "toggle",
      "type": "boolean",
      "default": "false",
      "desc": "When present, the same interaction that reveals also hides again (click toggles)."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Non-interactive; stays hidden and cannot be revealed by the user."
    }
  ],
  "events": [
    "reveal",
    "hide"
  ],
  "slots": [
    "(default)"
  ],
  "demoHTML": "<p style=\"font-family: system-ui; line-height: 2;\">\n  Your API key:\n  <pura-redact id=\"apikey\" reveal-on=\"click\" toggle blur=\"md\">sk-live-9f2c7b41ad8e4f00</pura-redact>\n  <br>\n  Salary (hover over it):\n  <pura-redact reveal-on=\"hover\" blur=\"lg\">$14,250.00</pura-redact>\n</p>\n<p id=\"status\" style=\"font-family: system-ui; color: #16a34a; font-size: 14px;\"></p>\n<script type=\"module\">\n  const status = document.getElementById(\"status\");\n  document.getElementById(\"apikey\").addEventListener(\"reveal\", (e) => {\n    status.textContent = \"Key revealed: \" + e.detail.value;\n  });\n  document.getElementById(\"apikey\").addEventListener(\"hide\", () => {\n    status.textContent = \"Key hidden again.\";\n  });\n</script>",
  "usage": "<p style=\"font-family: system-ui; line-height: 2;\">\n  Your API key:\n  <pura-redact id=\"apikey\" reveal-on=\"click\" toggle blur=\"md\">sk-live-9f2c7b41ad8e4f00</pura-redact>\n  <br>\n  Salary (hover over it):\n  <pura-redact reveal-on=\"hover\" blur=\"lg\">$14,250.00</pura-redact>\n</p>\n<p id=\"status\" style=\"font-family: system-ui; color: #16a34a; font-size: 14px;\"></p>\n<script type=\"module\">\n  const status = document.getElementById(\"status\");\n  document.getElementById(\"apikey\").addEventListener(\"reveal\", (e) => {\n    status.textContent = \"Key revealed: \" + e.detail.value;\n  });\n  document.getElementById(\"apikey\").addEventListener(\"hide\", () => {\n    status.textContent = \"Key hidden again.\";\n  });\n</script>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "resizable",
  "title": "Resizable",
  "category": "Layout",
  "blurb": "Two resizable panels separated by a draggable divider.",
  "description": "pura-resizable is a native web component that splits the space into two panels (start and end) separated by a divider that can be dragged with the pointer or adjusted with the keyboard arrow keys. Use it whenever you need user-adjustable layouts, such as side-by-side editors, lists with a detail panel, or split previews. It supports horizontal or vertical orientation.",
  "attributes": [
    {
      "name": "orientation",
      "type": "\"horizontal\" | \"vertical\"",
      "default": "horizontal",
      "desc": "Split direction: horizontal (panels side by side) or vertical (stacked)."
    },
    {
      "name": "min",
      "type": "number",
      "default": "10",
      "desc": "Minimum percentage allowed for each panel (clamped between 0 and 45)."
    },
    {
      "name": "value",
      "type": "number",
      "default": "50",
      "desc": "Initial split percentage assigned to the start panel."
    }
  ],
  "events": [
    "change"
  ],
  "slots": [
    "start",
    "end"
  ],
  "demoHTML": "<pura-resizable value=\"40\" min=\"15\" style=\"height: 240px; border: 1px solid var(--pura-border); border-radius: var(--pura-radius);\">\n  <div slot=\"start\" style=\"padding: 1rem;\">\n    <strong>Files</strong>\n    <ul style=\"margin: 0.5rem 0 0; padding-left: 1.25rem;\">\n      <li>index.html</li>\n      <li>style.css</li>\n      <li>app.js</li>\n    </ul>\n  </div>\n  <div slot=\"end\" style=\"padding: 1rem;\">\n    <strong>Editor</strong>\n    <p style=\"margin: 0.5rem 0 0; color: var(--pura-muted);\">\n      Drag the divider in the center to resize the panels.\n    </p>\n  </div>\n</pura-resizable>",
  "usage": "<pura-resizable value=\"40\" min=\"15\" style=\"height: 240px; border: 1px solid var(--pura-border); border-radius: var(--pura-radius);\">\n  <div slot=\"start\" style=\"padding: 1rem;\">\n    <strong>Files</strong>\n    <ul style=\"margin: 0.5rem 0 0; padding-left: 1.25rem;\">\n      <li>index.html</li>\n      <li>style.css</li>\n      <li>app.js</li>\n    </ul>\n  </div>\n  <div slot=\"end\" style=\"padding: 1rem;\">\n    <strong>Editor</strong>\n    <p style=\"margin: 0.5rem 0 0; color: var(--pura-muted);\">\n      Drag the divider in the center to resize the panels.\n    </p>\n  </div>\n</pura-resizable>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "result",
  "title": "Result",
  "category": "Feedback",
  "blurb": "Status result page block displaying a large icon, title, subtitle, and actions slot for outcomes such as success, error, warning, or HTTP error codes.",
  "description": "Status result page block displaying a large icon, title, subtitle, and actions slot for outcomes such as success, error, warning, or HTTP error codes.",
  "attributes": [
    {
      "name": "status",
      "type": "string",
      "default": "info",
      "desc": "Visual status variant: info | success | error | warning | 404 | 403 | 500."
    },
    {
      "name": "title",
      "type": "string",
      "default": "",
      "desc": "Heading text; HTTP code statuses fall back to an i18n default."
    },
    {
      "name": "subtitle",
      "type": "string",
      "default": "",
      "desc": "Secondary descriptive line (alias of description)."
    },
    {
      "name": "description",
      "type": "string",
      "default": "",
      "desc": "Secondary descriptive line (alias of subtitle)."
    }
  ],
  "events": [],
  "slots": [
    "default",
    "actions"
  ],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "retro-grid",
  "title": "Retro Grid",
  "category": "Display",
  "blurb": "A tilted perspective grid floor whose lines scroll toward the viewer. Pure CSS @keyframes, SSR-safe, reduced-motion aware.",
  "description": "`<pura-retro-grid>` lays a tilted, perspective grid floor whose lines scroll toward the viewer, in the style of Magic UI's Retro Grid. The motion is one pure CSS `@keyframes` background-position scroll on a `rotateX` plane, so it works server-rendered with no client JS and no animation runtime. Theme the lines with `--pura-retro-grid-line`, and tune `--pura-retro-grid-cell`, `--pura-retro-grid-angle`, `--pura-retro-grid-perspective`, `--pura-retro-grid-opacity`, and `--pura-retro-grid-duration`. Under reduced motion the grid holds still via the base reset. It registers in `window.__puraRetroGrids` by `data-pura-id` for agent enumeration.",
  "attributes": [],
  "events": [],
  "slots": [
    "default"
  ],
  "demoHTML": "<pura-retro-grid style=\"border-radius: 12px; background: linear-gradient(180deg, #0b0618 0%, #1a0b2e 100%); --pura-retro-grid-line: #c026d3;\">\n  <div style=\"padding: 4rem 1.5rem 5rem; text-align: center; font: 700 24px system-ui; color: #fff; letter-spacing: -.02em;\">\n    Retro Grid\n    <div style=\"font-weight: 400; font-size: 13px; opacity: .7; margin-top: .4rem;\">Synthwave floor, pure CSS, server-renderable.</div>\n  </div>\n</pura-retro-grid>",
  "usage": "<pura-retro-grid style=\"--pura-retro-grid-line: #a855f7;\">\n  <section class=\"hero\">Content over the grid</section>\n</pura-retro-grid>",
  "animation": true,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "reveal",
  "title": "Reveal",
  "category": "Utility",
  "blurb": "Animates content into view when it enters the viewport, respecting prefers-reduced-motion.",
  "description": "`<pura-reveal>` wraps any content and animates it (fade, slide-up, or zoom) the first time it enters the viewport, using IntersectionObserver. The entrance is purely visual (opacity + transform): the content always stays in the accessibility tree and is never truly hidden, and under reduced motion it appears immediately with no delay. It has an agent-native layer: each instance registers in `window.__puraReveals` by `data-pura-id` and mirrors config and live state in `data-pura-reveal-*` attributes, letting an agent enumerate, read, and trigger each reveal without traversing the DOM.",
  "attributes": [
    {
      "name": "animation",
      "type": "\"fade\" | \"slide-up\" | \"zoom\"",
      "default": "fade",
      "desc": "Entrance animation style. Invalid values fall back to fade."
    },
    {
      "name": "delay",
      "type": "number",
      "default": "0",
      "desc": "Milliseconds to wait before animating when it enters the viewport. Applied as transition-delay and ignored under reduced motion."
    },
    {
      "name": "once",
      "type": "boolean",
      "default": "false",
      "desc": "When present, reveals once and stops observing. When absent, re-hides on exit and reveals again on re-entry."
    },
    {
      "name": "threshold",
      "type": "number",
      "default": "0.15",
      "desc": "IntersectionObserver threshold 0..1 that defines how much of the element must be visible to reveal."
    },
    {
      "name": "revealed",
      "type": "boolean",
      "default": "false",
      "desc": "Read-only reflected state: present while the content is visible."
    }
  ],
  "events": [
    "pura-reveal"
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "<div style=\"height: 120px; display: grid; place-items: center; color: var(--pura-muted, #888); font: 14px system-ui;\">\n  Scroll down to reveal the content\n</div>\n\n<pura-reveal animation=\"slide-up\" delay=\"100\" threshold=\"0.3\">\n  <article style=\"padding: var(--pura-space-5, 1.5rem); border: 1px solid var(--pura-border, #ddd); border-radius: 12px; font: 16px/1.5 system-ui;\">\n    <h3 style=\"margin-top: 0;\">Revealed content</h3>\n    <p>This block slides up and fades in smoothly as soon as it enters the screen.</p>\n  </article>\n</pura-reveal>\n\n<pura-reveal animation=\"zoom\" once>\n  <article style=\"margin-top: var(--pura-space-4, 1rem); padding: var(--pura-space-5, 1.5rem); border: 1px solid var(--pura-border, #ddd); border-radius: 12px; font: 16px/1.5 system-ui;\">\n    <h3 style=\"margin-top: 0;\">Reveals only once</h3>\n    <p>With <code>once</code>, it animates on the first entry and stops observing.</p>\n  </article>\n</pura-reveal>",
  "usage": "<pura-reveal animation=\"slide-up\" delay=\"100\" threshold=\"0.3\">\n  <article>\n    <h3>Revealed content</h3>\n    <p>This block slides up and fades in smoothly as soon as it enters the screen.</p>\n  </article>\n</pura-reveal>\n\n<pura-reveal animation=\"zoom\" once>\n  <article>\n    <h3>Reveals only once</h3>\n    <p>With <code>once</code>, it animates on the first entry and stops observing.</p>\n  </article>\n</pura-reveal>",
  "animation": true,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "rich-text",
  "title": "Rich Text",
  "category": "Form",
  "blurb": "WYSIWYG rich-text editor with a formatting toolbar (bold, italic, underline, headings, lists, link, blockquote, code) and a contenteditable region.",
  "description": "WYSIWYG rich-text editor with a formatting toolbar (bold, italic, underline, headings, lists, link, blockquote, code) and a contenteditable region.",
  "attributes": [
    {
      "name": "placeholder",
      "type": "string",
      "default": "",
      "desc": "Placeholder text shown when the editor is empty."
    },
    {
      "name": "value",
      "type": "string",
      "default": "",
      "desc": "Initial HTML content for the editable area."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "",
      "desc": "Blocks editing and disables all toolbar buttons."
    }
  ],
  "events": [
    "input",
    "change"
  ],
  "slots": [],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "ripple",
  "title": "Ripple",
  "category": "Utility",
  "blurb": "Material-style touch ripple wrapper: a ripple expands from the pointer on press, CSS-only motion, reduced-motion aware.",
  "description": "`<pura-ripple>` wraps any clickable surface and expands a Material-style ripple from the pointer position on press, fading it out. The motion is pure CSS `@keyframes`: JS only spawns the ripple span at the right coordinates and removes it on `animationend`, so there is no animation runtime. Theme it with `--pura-ripple-color`, `--pura-ripple-opacity`, and `--pura-ripple-duration`; use `centered` for icon buttons and `disabled` to switch it off. Under reduced motion the ripple resolves instantly via the base reset. It registers in `window.__puraRipples` by `data-pura-id` for agent enumeration.",
  "attributes": [
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Suppresses ripples entirely."
    },
    {
      "name": "centered",
      "type": "boolean",
      "default": "false",
      "desc": "Ripples emanate from the host center rather than the pointer position (good for icon buttons)."
    }
  ],
  "events": [
    "pura-ripple"
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "<div style=\"display: flex; gap: var(--pura-space-4, 1rem); flex-wrap: wrap;\">\n  <pura-ripple style=\"border-radius: 10px;\">\n    <button style=\"padding: 0.6rem 1.2rem; border: 1px solid var(--pura-border, #ddd); border-radius: 10px; background: var(--pura-subtle, #f4f4f5); font: 15px system-ui; cursor: pointer;\">Press me</button>\n  </pura-ripple>\n  <pura-ripple centered style=\"border-radius: 999px; --pura-ripple-color: #2563eb;\">\n    <button style=\"width: 44px; height: 44px; border: 1px solid var(--pura-border, #ddd); border-radius: 999px; background: var(--pura-bg, #fff); font: 18px system-ui; cursor: pointer;\">★</button>\n  </pura-ripple>\n</div>",
  "usage": "<pura-ripple>\n  <button>Press me</button>\n</pura-ripple>\n\n<!-- Icon button: ripple from center, custom color -->\n<pura-ripple centered style=\"--pura-ripple-color: #2563eb;\">\n  <button aria-label=\"Favorite\">★</button>\n</pura-ripple>",
  "animation": true,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "scroll-area",
  "title": "Scroll Area",
  "category": "Navigation",
  "blurb": "Scroll container with a thin scrollbar styled by the theme.",
  "description": "Scroll Area is a native web component that creates a scroll area with a thin, themed scrollbar that is consistent across browsers. Use it when you need to cap the height of a content block (lists, long text, menus) and make the overflow scrollable without losing the library's visual style. The viewport is focusable and shows an accessible focus ring.",
  "attributes": [
    {
      "name": "height",
      "type": "string (CSS length)",
      "default": "18rem",
      "desc": "Sets the maximum height of the viewport (any CSS unit); without it, defaults to 18rem."
    },
    {
      "name": "horizontal",
      "type": "boolean",
      "default": "false",
      "desc": "When present, enables horizontal scrolling; otherwise horizontal overflow is hidden."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "demoHTML": "<pura-scroll-area height=\"12rem\">\n  <h3 style=\"margin:0 0 .5rem\">Terms of use</h3>\n  <p>By using this service, you agree to the conditions described below.</p>\n  <p>The content provided is for informational purposes and may be updated at any time.</p>\n  <p>Personal data is handled in accordance with applicable data protection laws.</p>\n  <p>Cookies are used to improve the browsing experience on the platform.</p>\n  <p>If you have any questions, please contact our support team.</p>\n  <p>These terms may be revised periodically without prior notice.</p>\n</pura-scroll-area>",
  "usage": "<pura-scroll-area height=\"12rem\">\n  <h3 style=\"margin:0 0 .5rem\">Terms of use</h3>\n  <p>By using this service, you agree to the conditions described below.</p>\n  <p>The content provided is for informational purposes and may be updated at any time.</p>\n  <p>Personal data is handled in accordance with applicable data protection laws.</p>\n  <p>Cookies are used to improve the browsing experience on the platform.</p>\n  <p>If you have any questions, please contact our support team.</p>\n  <p>These terms may be revised periodically without prior notice.</p>\n</pura-scroll-area>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "scroll-progress",
  "title": "Scroll Progress",
  "category": "Navigation",
  "blurb": "A thin bar fixed at the top of the viewport that fills from 0% to 100% as the page is scrolled.",
  "description": "A reading progress indicator that tracks the document's scroll position and updates the fill width via requestAnimationFrame on scroll and resize events. Use it at the top of articles and long pages to show how much is left to reach the end. It has an agent-native layer: data-pura-scroll-progress-* attributes reflect the percentage and pixel offsets live, and each instance registers itself in window.__puraScrollProgress by its data-pura-id, allowing an agent to read the progress without traversing the DOM.",
  "attributes": [
    {
      "name": "color",
      "type": "string",
      "default": "var(--pura-primary)",
      "desc": "Fill color of the bar (any valid CSS color). The track stays transparent."
    },
    {
      "name": "height",
      "type": "string",
      "default": "3px",
      "desc": "Thickness of the bar (any valid CSS length, e.g.: \"3px\", \"0.25rem\")."
    }
  ],
  "events": [
    "pura-scroll-progress"
  ],
  "slots": [],
  "demoHTML": "<pura-scroll-progress color=\"#7c3aed\" height=\"5px\"></pura-scroll-progress>\n\n<article style=\"max-width:640px;margin:0 auto;padding:24px;font-family:system-ui,sans-serif;line-height:1.7\">\n  <h1>The history of coffee in Brazil</h1>\n  <p id=\"status\" style=\"color:#7c3aed;font-weight:600\">Reading progress: 0%</p>\n  <p>Coffee arrived in Brazil in 1727, brought from the neighboring region of French Guiana. Scroll down the page and watch the purple bar at the top of the window fill as you move through the text.</p>\n  <p>Within a few decades, the plantations spread across the Paraiba Valley and, later, the western part of Sao Paulo, transforming the country's economy.</p>\n  <p>The coffee cycle funded railways, ports and European immigration, shaping entire cities around the bean route.</p>\n  <p>By the 20th century, Brazil was already the world's largest producer, a position it still holds today, with specialty coffees becoming increasingly valued.</p>\n  <p>Keep scrolling to see the bar reach close to 100% at the end of the text.</p>\n  <p>The aroma of artisanal roasteries became a symbol of regions such as Southern Minas, Cerrado Mineiro and Mogiana.</p>\n  <p>Today, domestic consumption grows alongside exports, and the coffee ritual remains part of everyday Brazilian life.</p>\n  <p>End of the reading. The bar should be complete now.</p>\n</article>\n\n<script type=\"module\">\n  const bar = document.querySelector('pura-scroll-progress');\n  const status = document.getElementById('status');\n  bar.addEventListener('pura-scroll-progress', (e) => {\n    status.textContent = 'Reading progress: ' + e.detail.percent + '%';\n  });\n</script>",
  "usage": "<pura-scroll-progress color=\"#7c3aed\" height=\"5px\"></pura-scroll-progress>\n\n<article style=\"max-width:640px;margin:0 auto;padding:24px;font-family:system-ui,sans-serif;line-height:1.7\">\n  <h1>The history of coffee in Brazil</h1>\n  <p id=\"status\" style=\"color:#7c3aed;font-weight:600\">Reading progress: 0%</p>\n  <p>Coffee arrived in Brazil in 1727. Scroll down the page and watch the purple bar at the top of the window fill as you move through the text.</p>\n  <p>Within a few decades, the plantations spread across the Paraiba Valley and the western part of Sao Paulo.</p>\n  <p>Keep scrolling to see the bar reach close to 100% at the end of the text.</p>\n  <p>End of the reading. The bar should be complete now.</p>\n</article>\n\n<script type=\"module\">\n  const bar = document.querySelector('pura-scroll-progress');\n  const status = document.getElementById('status');\n  bar.addEventListener('pura-scroll-progress', (e) => {\n    status.textContent = 'Reading progress: ' + e.detail.percent + '%';\n  });\n</script>",
  "animation": true,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "scroll-reveal",
  "title": "Scroll Reveal",
  "category": "Utility",
  "blurb": "Scrubs a reveal to the element's progress through the viewport using the native scroll-driven CSS timeline (animation-timeline: view()), no IntersectionObserver and no per-frame JS.",
  "description": "`<pura-scroll-reveal>` reveals slotted content as it scrolls through the viewport, driven entirely by the native CSS scroll-driven-animation timeline (`animation-timeline: view()`). Where `<pura-reveal>` uses an IntersectionObserver to flip a binary hidden/visible state, this *scrubs* the entrance to the element's progress through the viewport, so scrolling halfway plays the animation halfway, and scrolling back reverses it, with no observer and no per-frame JavaScript. The whole effect is pure CSS, so it survives SSR untouched. Choose an `animation` (fade, slide-*, zoom, blur), a slide `distance`, and a `range` preset (`enter`, `cover`, `early`) or a raw CSS `animation-range`. When the engine lacks scroll timelines or the user prefers reduced motion, the content is simply visible from first paint. Each instance registers in `window.__puraScrollReveals` by `data-pura-id` and mirrors its resolved config in `data-pura-reveal-*` (animation, range, native).",
  "attributes": [
    {
      "name": "animation",
      "type": "\"fade\" | \"slide-up\" | \"slide-down\" | \"slide-left\" | \"slide-right\" | \"zoom\" | \"blur\"",
      "default": "fade",
      "desc": "Entrance style scrubbed across the scroll range. Invalid values fall back to fade."
    },
    {
      "name": "distance",
      "type": "number",
      "default": "28",
      "desc": "Pixels the slide variants travel from their offset start to rest."
    },
    {
      "name": "range",
      "type": "\"enter\" | \"cover\" | \"early\" | string",
      "default": "enter",
      "desc": "Preset scroll window the reveal scrubs over, or any raw CSS animation-range value (e.g. \"entry 0% exit 0%\")."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "demoHTML": "<div style=\"height: 140px; display: grid; place-items: center; color: var(--pura-muted, #888); font: 14px system-ui;\">\n  Scroll the page, each block scrubs in with its scroll position\n</div>\n\n<pura-scroll-reveal animation=\"slide-up\">\n  <article style=\"padding: var(--pura-space-5, 1.5rem); border: 1px solid var(--pura-border, #ddd); border-radius: 12px; font: 16px/1.5 system-ui;\">\n    <h3 style=\"margin-top: 0;\">Slide up</h3>\n    <p>This block is tied to the native scroll timeline, the reveal scrubs as it crosses the viewport.</p>\n  </article>\n</pura-scroll-reveal>\n\n<pura-scroll-reveal animation=\"blur\" range=\"cover\">\n  <article style=\"margin-top: var(--pura-space-4, 1rem); padding: var(--pura-space-5, 1.5rem); border: 1px solid var(--pura-border, #ddd); border-radius: 12px; font: 16px/1.5 system-ui;\">\n    <h3 style=\"margin-top: 0;\">Blur across the crossing</h3>\n    <p>With <code>range=\"cover\"</code> the de-blur scrubs across the whole time the block is on screen.</p>\n  </article>\n</pura-scroll-reveal>",
  "usage": "<pura-scroll-reveal animation=\"slide-up\">\n  <article>\n    <h3>Slide up</h3>\n    <p>Scrubs in with the native scroll timeline, no IntersectionObserver.</p>\n  </article>\n</pura-scroll-reveal>\n\n<pura-scroll-reveal animation=\"blur\" range=\"cover\" distance=\"40\">\n  <article>\n    <h3>Blur across the crossing</h3>\n    <p>Any raw CSS animation-range also works, e.g. range=\"entry 0% exit 0%\".</p>\n  </article>\n</pura-scroll-reveal>",
  "animation": true,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "scroll-spy",
  "title": "Scroll Spy",
  "category": "Navigation",
  "blurb": "Table-of-contents navigation that automatically highlights the link of the visible section as the user scrolls the page.",
  "description": "pura-scroll-spy is an \"on this page\" navigation for docs and long-form text: it observes sections with IntersectionObserver and moves aria-current=\"location\" to the link matching the section in view. Use it when you have a side table of contents that should follow the scroll. It has an agent-native layer: stable data-pura-scroll-spy-* attributes reflect the active section (active, index, count) and each instance registers itself in window.__puraScrollSpy with { id, activeId, activeIndex, sections, el, activate } so an agent can read the table-of-contents state and jump to a section via activate(idOrIndex) without inspecting the Shadow DOM.",
  "attributes": [
    {
      "name": "sections",
      "type": "string",
      "default": "",
      "desc": "CSS selector for the sections to observe. When absent, the sections are derived from the hrefs (hash) of the links in the slot."
    },
    {
      "name": "root",
      "type": "string",
      "default": "",
      "desc": "CSS selector for the scroll container. When absent, uses the viewport (root null)."
    },
    {
      "name": "offset",
      "type": "number",
      "default": "0",
      "desc": "Top offset in px that biases which section counts as current (e.g.: to account for a sticky header). It becomes the negative top of the IntersectionObserver's rootMargin."
    },
    {
      "name": "auto-scroll",
      "type": "boolean",
      "default": "false",
      "desc": "When present, the active link is scrolled into view within the nav itself (respecting prefers-reduced-motion)."
    },
    {
      "name": "label",
      "type": "string",
      "default": "On this page",
      "desc": "Accessible label (aria-label) for the navigation landmark."
    }
  ],
  "events": [
    "pura-scroll-spy:change"
  ],
  "slots": [
    "(default)"
  ],
  "demoHTML": "<div style=\"display:grid;grid-template-columns:200px 1fr;gap:32px;max-width:860px\">\n  <pura-scroll-spy root=\"#conteudo\" offset=\"16\" auto-scroll label=\"On this page\" style=\"position:sticky;top:16px;align-self:start\">\n    <a href=\"#introducao\" style=\"display:block;padding:6px 10px\">Introduction</a>\n    <a href=\"#instalacao\" style=\"display:block;padding:6px 10px\">Installation</a>\n    <a href=\"#uso\" style=\"display:block;padding:6px 10px\">Usage</a>\n    <a href=\"#api\" style=\"display:block;padding:6px 10px\">API</a>\n  </pura-scroll-spy>\n  <div id=\"conteudo\" style=\"height:320px;overflow:auto;border:1px solid var(--pura-border, #ddd);border-radius:8px;padding:16px\">\n    <section id=\"introducao\"><h2>Introduction</h2><p style=\"height:260px\">Overview of the component and when to use it.</p></section>\n    <section id=\"instalacao\"><h2>Installation</h2><p style=\"height:260px\">Import the module and use the tag, with no dependencies.</p></section>\n    <section id=\"uso\"><h2>Usage</h2><p style=\"height:260px\">Place anchors with a hash href inside the slot.</p></section>\n    <section id=\"api\"><h2>API</h2><p style=\"height:260px\">Attributes, events and the activate() method.</p></section>\n  </div>\n</div>",
  "usage": "<div style=\"display:grid;grid-template-columns:200px 1fr;gap:32px;max-width:860px\">\n  <pura-scroll-spy root=\"#conteudo\" offset=\"16\" auto-scroll label=\"On this page\" style=\"position:sticky;top:16px;align-self:start\">\n    <a href=\"#introducao\" style=\"display:block;padding:6px 10px\">Introduction</a>\n    <a href=\"#instalacao\" style=\"display:block;padding:6px 10px\">Installation</a>\n    <a href=\"#uso\" style=\"display:block;padding:6px 10px\">Usage</a>\n    <a href=\"#api\" style=\"display:block;padding:6px 10px\">API</a>\n  </pura-scroll-spy>\n  <div id=\"conteudo\" style=\"height:320px;overflow:auto;border:1px solid var(--pura-border, #ddd);border-radius:8px;padding:16px\">\n    <section id=\"introducao\"><h2>Introduction</h2><p style=\"height:260px\">Overview of the component and when to use it.</p></section>\n    <section id=\"instalacao\"><h2>Installation</h2><p style=\"height:260px\">Import the module and use the tag, with no dependencies.</p></section>\n    <section id=\"uso\"><h2>Usage</h2><p style=\"height:260px\">Place anchors with a hash href inside the slot.</p></section>\n    <section id=\"api\"><h2>API</h2><p style=\"height:260px\">Attributes, events and the activate() method.</p></section>\n  </div>\n</div>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "code-block",
      "title": "Code Block"
    },
    {
      "slug": "reactions",
      "title": "Reactions"
    },
    {
      "slug": "prose",
      "title": "Typography"
    },
    {
      "slug": "breadcrumb",
      "title": "Breadcrumb"
    },
    {
      "slug": "avatar",
      "title": "Avatar"
    },
    {
      "slug": "badge",
      "title": "Badge"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "blog-post",
      "title": "Blog Post"
    }
  ]
},
{
  "slug": "search-field",
  "title": "Search Field",
  "category": "Form",
  "blurb": "Search input with a leading magnifier icon and a trailing clear button, firing a debounced search event on input or immediately on Enter and clear.",
  "description": "Search input with a leading magnifier icon and a trailing clear button, firing a debounced search event on input or immediately on Enter and clear.",
  "attributes": [
    {
      "name": "value",
      "type": "string",
      "default": "",
      "desc": "Current value of the search input."
    },
    {
      "name": "placeholder",
      "type": "string",
      "default": "",
      "desc": "Placeholder text; defaults to localized \"Search\"."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "",
      "desc": "Disables the input and clear button."
    },
    {
      "name": "loading",
      "type": "boolean",
      "default": "",
      "desc": "Replaces the magnifier icon with a spinner to indicate a pending search."
    },
    {
      "name": "debounce",
      "type": "number",
      "default": "250",
      "desc": "Debounce delay in milliseconds before the search event fires."
    }
  ],
  "events": [
    "search"
  ],
  "slots": [],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "section",
  "title": "Section",
  "category": "Primitives",
  "blurb": "A semantic section wrapper that applies consistent vertical rhythm and an optional centered, readable max-width container.",
  "description": "<pura-section> renders a semantic <section> with vertical padding from the space scale, keeping spacing between page regions consistent. Add the container attribute to center its content within a comfortable reading max-width, and set bg to fill the section with a design token or any CSS color. It is a layout primitive meant to wrap the major blocks of a page.",
  "attributes": [
    {
      "name": "py",
      "type": "number",
      "default": "6",
      "desc": "Vertical padding on the space scale (1 to 6). Maps to the --pura-space-{n} token, falling back to --pura-space-6."
    },
    {
      "name": "container",
      "type": "boolean",
      "default": "false",
      "desc": "When present, centers the content within a readable max-width (65rem) using auto inline margins."
    },
    {
      "name": "bg",
      "type": "string",
      "default": "transparent",
      "desc": "Background fill. A bare token name (e.g. \"subtle\") resolves to its --pura-* variable; any other value (e.g. a hex color) is used verbatim as a CSS value."
    }
  ],
  "events": [],
  "slots": [
    "default — section content"
  ],
  "demoHTML": "<pura-section container>\n  <h2>Welcome to Pura</h2>\n  <p>A primitive section with default vertical padding and a centered, readable width.</p>\n</pura-section>\n\n<pura-section bg=\"subtle\" py=\"4\" container>\n  <h2>Tinted background</h2>\n  <p>This section uses the \"subtle\" design token as its background and tighter padding.</p>\n</pura-section>\n\n<pura-section bg=\"#0f172a\" py=\"6\">\n  <p style=\"color: #fff;\">A full-bleed section with a custom color background and generous spacing.</p>\n</pura-section>",
  "usage": "<script type=\"module\" src=\"/pura/lib/section.js\"></script>\n\n<!-- Centered, readable content block -->\n<pura-section container>\n  <h2>Section heading</h2>\n  <p>Content sits within a comfortable max-width and is centered on the page.</p>\n</pura-section>\n\n<!-- Tinted, full-width band with tighter padding -->\n<pura-section bg=\"subtle\" py=\"4\">\n  <p>A background band that spans the full width of its parent.</p>\n</pura-section>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "segmented-control",
  "title": "Segmented Control",
  "category": "Form",
  "blurb": "An iOS-style segmented control for single choice, with a sliding indicator under the active option.",
  "description": "A single-choice selector in a pill shape, where each segment is an option and an indicator slides behind the selected one. Use it when there are a few mutually exclusive options (2 to 5) and you want all of them visible at once, such as switching between \"Day/Week/Month\". It is agent-native: the host mirrors machine-readable state in data-value, data-active-index, and data-count, and each segment exposes data-value, data-index, and data-active, allowing agents to read and locate the selection without inspecting the shadow DOM.",
  "attributes": [
    {
      "name": "options",
      "type": "string",
      "default": "",
      "desc": "Comma-separated list of segment labels (e.g., \"Day,Week,Month\"). Spaces are trimmed and empty items are ignored."
    },
    {
      "name": "value",
      "type": "string",
      "default": "first option",
      "desc": "Label of the currently selected option. If absent or not present in options, it defaults to the first option."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables the entire control (no focus, no clicks)."
    },
    {
      "name": "size",
      "type": "string",
      "default": "md",
      "desc": "Size of the control: sm | md | lg. Purely presentational."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Segmented control",
      "desc": "aria-label text for the radiogroup, for accessibility."
    }
  ],
  "events": [
    "change"
  ],
  "slots": [],
  "demoHTML": "<pura-segmented-control\n  id=\"periodo\"\n  label=\"Period\"\n  options=\"Day,Week,Month\"\n  value=\"Week\"\n></pura-segmented-control>\n<p id=\"periodo-saida\" style=\"margin-top:.75rem;font:14px system-ui;color:#555;\">Selected: Week</p>\n<script type=\"module\">\n  import \"/pura/lib/segmented-control.js\";\n  const sc = document.getElementById(\"periodo\");\n  const out = document.getElementById(\"periodo-saida\");\n  sc.addEventListener(\"change\", (e) => {\n    out.textContent = \"Selected: \" + e.detail.value;\n  });\n</script>",
  "usage": "<pura-segmented-control\n  id=\"periodo\"\n  label=\"Period\"\n  options=\"Day,Week,Month\"\n  value=\"Week\"\n></pura-segmented-control>\n<p id=\"periodo-saida\">Selected: Week</p>\n<script type=\"module\">\n  import \"/pura/lib/segmented-control.js\";\n  const sc = document.getElementById(\"periodo\");\n  const out = document.getElementById(\"periodo-saida\");\n  sc.addEventListener(\"change\", (e) => {\n    out.textContent = \"Selected: \" + e.detail.value;\n  });\n</script>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "calendar",
      "title": "Calendar"
    },
    {
      "slug": "dialog",
      "title": "Dialog"
    },
    {
      "slug": "notification-item",
      "title": "Notification Item"
    },
    {
      "slug": "toast",
      "title": "Toast"
    },
    {
      "slug": "faq",
      "title": "FAQ"
    },
    {
      "slug": "pricing-table",
      "title": "Pricing Table"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "calendar-app",
      "title": "Calendar"
    },
    {
      "slug": "notifications",
      "title": "Notifications"
    },
    {
      "slug": "pricing",
      "title": "Pricing"
    }
  ]
},
{
  "slug": "select",
  "title": "Select",
  "category": "Form",
  "blurb": "A styled native select that is accessible and agent-readable.",
  "description": "Select is a native web component (zero dependencies) that styles the browser's native <select> element while keeping its reliability and accessibility. The options are passed as <option> children in the light DOM and re-emitted internally. Use it whenever you need a single-selection field in forms, with an optional label and helper text.",
  "attributes": [
    {
      "name": "label",
      "type": "string",
      "default": "",
      "desc": "Label text shown above the select."
    },
    {
      "name": "hint",
      "type": "string",
      "default": "",
      "desc": "Helper text shown below the select."
    },
    {
      "name": "value",
      "type": "string",
      "default": "",
      "desc": "Selected value; also reflected as a property and updated on change."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables the select when present."
    },
    {
      "name": "invalid",
      "type": "boolean",
      "default": "false",
      "desc": "Applies an error style and aria-invalid when present."
    }
  ],
  "events": [
    "change"
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "<pura-select label=\"State\" hint=\"Select your state of residence\" value=\"sp\">\n  <option value=\"sp\">Sao Paulo</option>\n  <option value=\"rj\">Rio de Janeiro</option>\n  <option value=\"mg\">Minas Gerais</option>\n  <option value=\"rs\">Rio Grande do Sul</option>\n  <option value=\"ba\">Bahia</option>\n</pura-select>",
  "usage": "<pura-select label=\"State\" hint=\"Select your state of residence\" value=\"sp\">\n  <option value=\"sp\">Sao Paulo</option>\n  <option value=\"rj\">Rio de Janeiro</option>\n  <option value=\"mg\">Minas Gerais</option>\n  <option value=\"rs\">Rio Grande do Sul</option>\n  <option value=\"ba\">Bahia</option>\n</pura-select>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "switch",
      "title": "Switch"
    },
    {
      "slug": "input",
      "title": "Input"
    },
    {
      "slug": "field",
      "title": "Field"
    },
    {
      "slug": "button-group",
      "title": "Button Group"
    },
    {
      "slug": "calendar",
      "title": "Calendar"
    },
    {
      "slug": "dialog",
      "title": "Dialog"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "calendar-app",
      "title": "Calendar"
    },
    {
      "slug": "data-table",
      "title": "Data Table"
    },
    {
      "slug": "onboarding",
      "title": "Onboarding"
    },
    {
      "slug": "settings",
      "title": "Settings"
    }
  ]
},
{
  "slug": "separator",
  "title": "Separator",
  "category": "Display",
  "blurb": "Horizontal or vertical dividing line, with an optional centered label.",
  "description": "The Separator is a native web component that renders a dividing rule to visually separate blocks of content. It supports horizontal (default) or vertical orientation and an optional centered text label. Use it to divide page sections, list items, or to group related content.",
  "attributes": [
    {
      "name": "orientation",
      "type": "string",
      "default": "horizontal",
      "desc": "Direction of the line: \"horizontal\" or \"vertical\"."
    },
    {
      "name": "label",
      "type": "string",
      "default": "",
      "desc": "Optional text centered between two lines (forces the horizontal layout with a label)."
    }
  ],
  "events": [],
  "slots": [],
  "demoHTML": "<div style=\"max-width: 360px;\">\n  <p>Your account was created successfully.</p>\n  <pura-separator></pura-separator>\n  <p>Review your settings below.</p>\n  <pura-separator label=\"or continue with\"></pura-separator>\n  <div style=\"display: flex; align-items: center; gap: 12px;\">\n    <span>Profile</span>\n    <pura-separator orientation=\"vertical\"></pura-separator>\n    <span>Security</span>\n    <pura-separator orientation=\"vertical\"></pura-separator>\n    <span>Notifications</span>\n  </div>\n</div>",
  "usage": "<div style=\"max-width: 360px;\">\n  <p>Your account was created successfully.</p>\n  <pura-separator></pura-separator>\n  <p>Review your settings below.</p>\n  <pura-separator label=\"or continue with\"></pura-separator>\n  <div style=\"display: flex; align-items: center; gap: 12px;\">\n    <span>Profile</span>\n    <pura-separator orientation=\"vertical\"></pura-separator>\n    <span>Security</span>\n    <pura-separator orientation=\"vertical\"></pura-separator>\n    <span>Notifications</span>\n  </div>\n</div>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "tabs",
      "title": "Tabs"
    },
    {
      "slug": "field",
      "title": "Field"
    },
    {
      "slug": "input-group",
      "title": "Input Group"
    },
    {
      "slug": "number-input",
      "title": "Number Input"
    },
    {
      "slug": "radio",
      "title": "Radio"
    },
    {
      "slug": "radio-group",
      "title": "Radio Group"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "checkout",
      "title": "Checkout"
    },
    {
      "slug": "login",
      "title": "Login"
    },
    {
      "slug": "profile",
      "title": "Profile"
    },
    {
      "slug": "settings",
      "title": "Settings"
    }
  ]
},
{
  "slug": "sheet",
  "title": "Sheet",
  "category": "Overlay",
  "blurb": "Sliding panel over a modal backdrop, anchored to any edge of the screen.",
  "description": "Sheet is a native web component that displays a sliding panel over a modal backdrop, built on the native <dialog> element (with focus trapping, the ESC key, and backdrop included). Use it for forms, filters, details, or secondary navigation that should appear on top of the content without switching pages. The panel can slide in from the right (default), left, top, or bottom.",
  "attributes": [
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "desc": "Controls visibility; present opens the panel via showModal(), absent closes it."
    },
    {
      "name": "side",
      "type": "string",
      "default": "right",
      "desc": "Edge the panel originates from: right, left, top, or bottom."
    },
    {
      "name": "title",
      "type": "string",
      "default": "\"\"",
      "desc": "Header text shown when the header slot is not used."
    }
  ],
  "events": [
    "close"
  ],
  "slots": [
    "default",
    "header",
    "footer"
  ],
  "demoHTML": "<pura-button id=\"abrir-sheet\">Open panel</pura-button>\n\n<pura-sheet id=\"meu-sheet\" title=\"Edit profile\" side=\"right\">\n  <p>Update your information and click save when you're done.</p>\n  <pura-input label=\"Name\" value=\"Andre\"></pura-input>\n  <pura-input label=\"Email\" value=\"andre@aex.partners\"></pura-input>\n\n  <pura-button slot=\"footer\" variant=\"ghost\" id=\"cancelar-sheet\">Cancel</pura-button>\n  <pura-button slot=\"footer\" id=\"salvar-sheet\">Save</pura-button>\n</pura-sheet>\n\n<script type=\"module\">\n  const sheet = document.getElementById(\"meu-sheet\");\n  document.getElementById(\"abrir-sheet\").addEventListener(\"click\", () => sheet.open());\n  document.getElementById(\"cancelar-sheet\").addEventListener(\"click\", () => sheet.close());\n  document.getElementById(\"salvar-sheet\").addEventListener(\"click\", () => sheet.close());\n</script>",
  "usage": "<pura-button id=\"abrir-sheet\">Open panel</pura-button>\n\n<pura-sheet id=\"meu-sheet\" title=\"Edit profile\" side=\"right\">\n  <p>Update your information and click save when you're done.</p>\n  <pura-input label=\"Name\" value=\"Andre\"></pura-input>\n  <pura-input label=\"Email\" value=\"andre@aex.partners\"></pura-input>\n\n  <pura-button slot=\"footer\" variant=\"ghost\" id=\"cancelar-sheet\">Cancel</pura-button>\n  <pura-button slot=\"footer\" id=\"salvar-sheet\">Save</pura-button>\n</pura-sheet>\n\n<script type=\"module\">\n  const sheet = document.getElementById(\"meu-sheet\");\n  document.getElementById(\"abrir-sheet\").addEventListener(\"click\", () => sheet.open());\n  document.getElementById(\"cancelar-sheet\").addEventListener(\"click\", () => sheet.close());\n  document.getElementById(\"salvar-sheet\").addEventListener(\"click\", () => sheet.close());\n</script>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "shine-border",
  "title": "Shine Border",
  "category": "Display",
  "blurb": "A conic sheen rotates around the rounded border of any container. Pure CSS via @property angle + mask-composite, SSR-safe, reduced-motion aware.",
  "description": "`<pura-shine-border>` rotates a conic sheen around the rounded border of any container, in the style of Magic UI's Shine Border. The motion is pure CSS: a `::before` ring painted with a `conic-gradient`, clipped to the border with a `mask-composite` trick, and spun by animating an `@property` angle, so there is no animation runtime and the effect works server-rendered. Tune it with the `duration` and `width` attributes, or theme the sheen with `--pura-shine-border-color` and `--pura-shine-border-color-2` (default primary→accent). Under reduced motion the sheen rests statically via the base reset. It registers in `window.__puraShineBorders` by `data-pura-id` for agent enumeration.",
  "attributes": [
    {
      "name": "duration",
      "type": "number",
      "default": "4",
      "desc": "Seconds for the sheen to complete one rotation."
    },
    {
      "name": "width",
      "type": "number",
      "default": "1.5",
      "desc": "Border thickness in pixels."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "demoHTML": "<pura-shine-border duration=\"3\" style=\"max-width: 320px;\">\n  <div style=\"padding: 1.5rem; border-radius: 12px; background: var(--pura-bg, #fff); font: 15px system-ui;\">\n    <b style=\"display:block; margin-bottom:.3rem;\">Shine Border</b>\n    <span style=\"color: var(--pura-muted-fg, #71717a);\">A sheen circles the frame, pure CSS, server-renderable.</span>\n  </div>\n</pura-shine-border>",
  "usage": "<pura-shine-border duration=\"3\">\n  <div class=\"card\">Framed content</div>\n</pura-shine-border>\n\n<!-- Custom sheen colors -->\n<pura-shine-border style=\"--pura-shine-border-color: #06b6d4; --pura-shine-border-color-2: #3b82f6;\">\n  <div class=\"card\">Cyan sheen</div>\n</pura-shine-border>",
  "animation": true,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "sidebar",
  "title": "Sidebar",
  "category": "Navigation",
  "blurb": "Side navigation panel with a header, scrollable body and footer that turns into a drawer on mobile.",
  "description": "Sidebar is a native web component (zero dependencies) that builds an application's side navigation, with header, body and footer slots. On desktop it stays fixed and inline; on screens up to 768px it becomes a modal off-canvas drawer (with focus trap, ESC and backdrop) reusing the same content. Use it when you need persistent primary navigation, optionally collapsible to a rail of icons.",
  "attributes": [
    {
      "name": "collapsible",
      "type": "boolean",
      "default": "false",
      "desc": "Enables collapsing the sidebar to a rail of icons (pura-sidebar)."
    },
    {
      "name": "collapsed",
      "type": "boolean",
      "default": "false",
      "desc": "Collapses to the narrow rail and hides the labels; only takes effect with collapsible (pura-sidebar)."
    },
    {
      "name": "href",
      "type": "string",
      "default": "",
      "desc": "When present on pura-sidebar-item, renders an <a>; otherwise a <button>."
    },
    {
      "name": "active",
      "type": "boolean",
      "default": "false",
      "desc": "Highlights the item as current and adds aria-current=\"page\" (pura-sidebar-item)."
    }
  ],
  "events": [
    "open",
    "close"
  ],
  "slots": [
    "header",
    "default",
    "footer",
    "icon"
  ],
  "demoHTML": "<div style=\"height: 380px; display: flex; border: 1px solid var(--pura-border); border-radius: var(--pura-radius); overflow: hidden;\">\n  <pura-sidebar collapsible>\n    <div slot=\"header\" style=\"font-weight:600;\">Acme Inc.</div>\n\n    <pura-sidebar-item href=\"#\" active>\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M3 9.5 12 3l9 6.5\"/><path d=\"M5 10v10h14V10\"/></svg>\n      Home\n    </pura-sidebar-item>\n    <pura-sidebar-item href=\"#\">\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"3\" y=\"3\" width=\"7\" height=\"7\"/><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\"/><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\"/><rect x=\"14\" y=\"14\" width=\"7\" height=\"7\"/></svg>\n      Dashboard\n    </pura-sidebar-item>\n    <pura-sidebar-item href=\"#\">\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"8\" r=\"4\"/><path d=\"M4 21v-1a6 6 0 0 1 12 0v1\"/></svg>\n      Team\n    </pura-sidebar-item>\n    <pura-sidebar-item href=\"#\">\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.5-2.3 1a7 7 0 0 0-1.7-1l-.3-2.5h-4l-.3 2.5a7 7 0 0 0-1.7 1l-2.3-1-2 3.5 2 1.5a7 7 0 0 0 0 2l-2 1.5 2 3.5 2.3-1a7 7 0 0 0 1.7 1l.3 2.5h4l.3-2.5a7 7 0 0 0 1.7-1l2.3 1 2-3.5-2-1.5a7 7 0 0 0 .1-1Z\"/></svg>\n      Settings\n    </pura-sidebar-item>\n\n    <pura-sidebar-item slot=\"footer\" href=\"#\">\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4\"/><path d=\"m16 17 5-5-5-5\"/><path d=\"M21 12H9\"/></svg>\n      Sign out\n    </pura-sidebar-item>\n  </pura-sidebar>\n\n  <main style=\"flex:1; padding: var(--pura-space-4);\">\n    <h3 style=\"margin:0;\">Content</h3>\n    <p style=\"color: var(--pura-muted-fg);\">On mobile the sidebar turns into a drawer. Call .toggle() to collapse it on desktop.</p>\n  </main>\n</div>",
  "usage": "<div style=\"height: 380px; display: flex; border: 1px solid var(--pura-border); border-radius: var(--pura-radius); overflow: hidden;\">\n  <pura-sidebar collapsible>\n    <div slot=\"header\">Acme Inc.</div>\n\n    <pura-sidebar-item href=\"#\" active>\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M3 9.5 12 3l9 6.5\"/><path d=\"M5 10v10h14V10\"/></svg>\n      Home\n    </pura-sidebar-item>\n    <pura-sidebar-item href=\"#\">\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"3\" y=\"3\" width=\"7\" height=\"7\"/><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\"/><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\"/><rect x=\"14\" y=\"14\" width=\"7\" height=\"7\"/></svg>\n      Dashboard\n    </pura-sidebar-item>\n    <pura-sidebar-item href=\"#\">\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"8\" r=\"4\"/><path d=\"M4 21v-1a6 6 0 0 1 12 0v1\"/></svg>\n      Team\n    </pura-sidebar-item>\n\n    <pura-sidebar-item slot=\"footer\" href=\"#\">\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4\"/><path d=\"m16 17 5-5-5-5\"/><path d=\"M21 12H9\"/></svg>\n      Sign out\n    </pura-sidebar-item>\n  </pura-sidebar>\n\n  <main style=\"flex:1; padding: var(--pura-space-4);\">\n    <h3>Content</h3>\n    <p>On mobile the sidebar turns into a drawer.</p>\n  </main>\n</div>\n\n<!--\n  Collapse on desktop: document.querySelector('pura-sidebar').toggle()\n  Open/close on mobile: .openMobile() / .closeMobile()\n  Events: 'open' and 'close' (fired in mobile mode)\n-->",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "dropdown-menu",
      "title": "Dropdown Menu"
    },
    {
      "slug": "sparkline",
      "title": "Sparkline"
    },
    {
      "slug": "toggle",
      "title": "Toggle"
    },
    {
      "slug": "breadcrumb",
      "title": "Breadcrumb"
    },
    {
      "slug": "table",
      "title": "Table"
    },
    {
      "slug": "timeline",
      "title": "Timeline"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "app-shell",
      "title": "App Shell"
    },
    {
      "slug": "dashboard",
      "title": "Dashboard"
    }
  ]
},
{
  "slug": "signature",
  "title": "Signature",
  "category": "Form",
  "blurb": "Canvas signature pad that captures pointer and touch strokes, HiDPI aware, with a clear button.",
  "description": "Canvas signature pad that captures pointer and touch strokes, HiDPI aware, with a clear button.",
  "attributes": [
    {
      "name": "width",
      "type": "string",
      "default": "400",
      "desc": "Canvas CSS width (number → px, or CSS length)"
    },
    {
      "name": "height",
      "type": "string",
      "default": "160",
      "desc": "Canvas CSS height (number → px, or CSS length)"
    },
    {
      "name": "color",
      "type": "string",
      "default": "var(--pura-fg)",
      "desc": "Stroke color"
    },
    {
      "name": "line-width",
      "type": "string",
      "default": "2.5",
      "desc": "Stroke width in px"
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "",
      "desc": "Disables drawing and the Clear button"
    }
  ],
  "events": [
    "change"
  ],
  "slots": [],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "skeleton-text",
  "title": "Skeleton Text",
  "category": "Display",
  "blurb": "Loading placeholder that mimics a paragraph with shimmering lines of text.",
  "description": "The Skeleton Text renders N animated (shimmer) lines, with the last one shorter, to mimic a paragraph while the real content is still loading. Use it during data fetching or hydration to reduce the sense of waiting. It marks aria-busy=\"true\" on the host and hides the decorative lines from screen readers (aria-hidden), respecting prefers-reduced-motion by swapping the shimmer for a soft pulse.",
  "attributes": [
    {
      "name": "lines",
      "type": "number",
      "default": "3",
      "desc": "Number of lines to render. Clamped to a minimum of 1; invalid values fall back to 3."
    },
    {
      "name": "gap",
      "type": "string",
      "default": "var(--pura-space-2)",
      "desc": "CSS length for the vertical spacing between lines."
    },
    {
      "name": "last",
      "type": "string",
      "default": "60%",
      "desc": "CSS width of the last (shorter) line, applied only when there is more than one line."
    }
  ],
  "events": [],
  "slots": [],
  "demoHTML": "<div style=\"max-width: 360px; display: flex; flex-direction: column; gap: 24px;\">\n  <pura-skeleton-text lines=\"3\"></pura-skeleton-text>\n  <pura-skeleton-text lines=\"5\" gap=\"12px\" last=\"40%\"></pura-skeleton-text>\n</div>",
  "usage": "<pura-skeleton-text lines=\"3\"></pura-skeleton-text>\n\n<pura-skeleton-text lines=\"5\" gap=\"12px\" last=\"40%\"></pura-skeleton-text>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "skeleton",
  "title": "Skeleton",
  "category": "Display",
  "blurb": "Animated placeholder to indicate loading content.",
  "description": "The Skeleton is a native web component that displays a placeholder with a shimmer effect while the real content is still loading. Use it to reserve space for text, images, or avatars and reduce the perceived wait. It respects prefers-reduced-motion, swapping the shimmer for a subtle pulse.",
  "attributes": [
    {
      "name": "width",
      "type": "string (CSS length)",
      "default": "100%",
      "desc": "Width of the placeholder, in any CSS unit (e.g. 200px, 60%)."
    },
    {
      "name": "height",
      "type": "string (CSS length)",
      "default": "1em",
      "desc": "Height of the placeholder, in any CSS unit (e.g. 16px, 2rem)."
    },
    {
      "name": "circle",
      "type": "boolean",
      "default": "false",
      "desc": "Renders the placeholder as a circle (full border-radius and 1:1 aspect-ratio), ideal for avatars."
    }
  ],
  "events": [],
  "slots": [],
  "demoHTML": "<div style=\"display:flex;align-items:center;gap:16px;margin-bottom:16px\">\n  <pura-skeleton circle width=\"48px\"></pura-skeleton>\n  <div style=\"flex:1;display:flex;flex-direction:column;gap:8px\">\n    <pura-skeleton width=\"40%\"></pura-skeleton>\n    <pura-skeleton width=\"70%\"></pura-skeleton>\n  </div>\n</div>\n<pura-skeleton height=\"160px\"></pura-skeleton>",
  "usage": "<div style=\"display:flex;align-items:center;gap:16px;margin-bottom:16px\">\n  <pura-skeleton circle width=\"48px\"></pura-skeleton>\n  <div style=\"flex:1;display:flex;flex-direction:column;gap:8px\">\n    <pura-skeleton width=\"40%\"></pura-skeleton>\n    <pura-skeleton width=\"70%\"></pura-skeleton>\n  </div>\n</div>\n<pura-skeleton height=\"160px\"></pura-skeleton>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "skip-nav",
  "title": "Skip Nav",
  "category": "Navigation",
  "blurb": "A \"Skip to content\" link, visually hidden until focused, that jumps to a target anchor.",
  "description": "A \"Skip to content\" link, visually hidden until focused, that jumps to a target anchor.",
  "attributes": [
    {
      "name": "href",
      "type": "string",
      "default": "#main",
      "desc": "Target anchor for the skip link"
    },
    {
      "name": "label",
      "type": "string",
      "default": "Skip to content",
      "desc": "Link text (i18n)"
    }
  ],
  "events": [],
  "slots": [],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "slider",
  "title": "Slider",
  "category": "Form",
  "blurb": "A slider control for selecting a numeric value within a range.",
  "description": "Slider is a native web component built on a styled input[type=range], giving you keyboard navigation (arrows, Home/End, PageUp/PageDown) and ARIA (role=slider) for free. Use it to let the user pick a value within a continuous range, such as volume, brightness, or price. It mirrors the value back into the host attribute and exposes the .value property, plus it emits input and change events.",
  "attributes": [
    {
      "name": "min",
      "type": "number",
      "default": "0",
      "desc": "Minimum value of the range."
    },
    {
      "name": "max",
      "type": "number",
      "default": "100",
      "desc": "Maximum value of the range."
    },
    {
      "name": "step",
      "type": "number",
      "default": "1",
      "desc": "Increment between allowed values."
    },
    {
      "name": "value",
      "type": "number",
      "default": "(midpoint of min/max)",
      "desc": "Current value; mirrored back into the attribute and available via the .value property."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables interaction with the slider."
    },
    {
      "name": "show-value",
      "type": "boolean",
      "default": "false",
      "desc": "Shows a bubble with the current value following the thumb."
    }
  ],
  "events": [
    "input",
    "change"
  ],
  "slots": [],
  "demoHTML": "<label for=\"volume\" style=\"display:block;margin-bottom:.5rem;font-size:.875rem\">Volume</label>\n<pura-slider id=\"volume\" min=\"0\" max=\"100\" step=\"1\" value=\"60\" show-value aria-label=\"Volume\"></pura-slider>",
  "usage": "<label for=\"volume\" style=\"display:block;margin-bottom:.5rem;font-size:.875rem\">Volume</label>\n<pura-slider id=\"volume\" min=\"0\" max=\"100\" step=\"1\" value=\"60\" show-value aria-label=\"Volume\"></pura-slider>\n\n<script type=\"module\">\n  const slider = document.getElementById(\"volume\");\n  slider.addEventListener(\"change\", (e) => {\n    console.log(\"New value:\", e.detail.value);\n  });\n</script>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "spacer",
  "title": "Spacer",
  "category": "Primitives",
  "blurb": "A layout primitive that adds fixed or flexible empty space between elements.",
  "description": "Spacer renders an empty box used to create gaps in a layout. With a size attribute it produces a fixed gap from the spacing scale (steps 1 to 6) or any CSS length, working both in normal block flow and along the main axis of a flex container. Without size it grows to fill available room, pushing flex siblings apart.",
  "attributes": [
    {
      "name": "size",
      "type": "string",
      "default": "",
      "desc": "Spacing scale step (1-6, mapped to var(--pura-space-N)) or any raw CSS length (e.g. 2rem, 24px). When omitted, the spacer grows to fill available space (flex: 1) and is inert in normal block flow."
    }
  ],
  "events": [],
  "slots": [],
  "demoHTML": "<script type=\"module\" src=\"/pura/lib/spacer.js\"></script>\n\n<!-- Fixed vertical gaps in normal block flow -->\n<p>First paragraph above the gap.</p>\n<pura-spacer size=\"4\"></pura-spacer>\n<p>Second paragraph, pushed down by a scale-step gap.</p>\n<pura-spacer size=\"2rem\"></pura-spacer>\n<p>Third paragraph, pushed down by a custom 2rem gap.</p>\n\n<!-- Flexible spacer pushing siblings to opposite ends of a row -->\n<div style=\"display: flex; align-items: center; padding: 12px; border: 1px solid #ccc;\">\n  <strong>Brand</strong>\n  <pura-spacer></pura-spacer>\n  <button>Sign in</button>\n</div>",
  "usage": "<script type=\"module\" src=\"/pura/lib/spacer.js\"></script>\n\n<!-- Fixed gap between two cards using a spacing-scale step -->\n<div style=\"display: flex;\">\n  <div>Card A</div>\n  <pura-spacer size=\"3\"></pura-spacer>\n  <div>Card B</div>\n</div>\n\n<!-- Flexible spacer to right-align an action in a toolbar -->\n<div style=\"display: flex; align-items: center;\">\n  <span>Page title</span>\n  <pura-spacer></pura-spacer>\n  <button>New item</button>\n</div>\n\n<!-- Custom CSS length gap in block flow -->\n<section>Intro text</section>\n<pura-spacer size=\"48px\"></pura-spacer>\n<section>Following section after a 48px gap.</section>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "sparkline",
  "title": "Sparkline",
  "category": "Display",
  "blurb": "Inline mini line chart, with no axes, that fits inside a sentence or a table cell.",
  "description": "The `<pura-sparkline>` renders a compact SVG with a polyline scaled to fit its box, with optional area fill and a dot on the last value. Use it to show time-series trends in little space (KPIs, table rows, dashboards). It is agent-native: in addition to `role=\"img\"` with an auto-generated `aria-label` (count, min, max, last), each instance exposes stable `data-pura-sparkline-count/values/min/max/last` attributes and registers itself in `window.__puraSparklines` (keyed by `data-pura-id`), letting an agent enumerate and read the data of every chart on the page without parsing the SVG.",
  "attributes": [
    {
      "name": "values",
      "type": "string",
      "default": "\"\"",
      "desc": "Comma-separated numbers, e.g. \"3,7,4,9,5,8\". Spaces are tolerated and non-numeric entries are discarded; empty/invalid draws nothing."
    },
    {
      "name": "width",
      "type": "number",
      "default": "80",
      "desc": "Chart width in px. Accepts a plain number."
    },
    {
      "name": "height",
      "type": "number",
      "default": "24",
      "desc": "Chart height in px. Accepts a plain number."
    },
    {
      "name": "color",
      "type": "string",
      "default": "var(--pura-fg)",
      "desc": "Color of the line, dot, and fill. Any CSS color."
    },
    {
      "name": "fill",
      "type": "boolean",
      "default": "false",
      "desc": "Draws a translucent area under the line (only with more than one value)."
    },
    {
      "name": "dot",
      "type": "boolean",
      "default": "false",
      "desc": "Draws a dot on the last value of the series."
    }
  ],
  "events": [],
  "slots": [],
  "demoHTML": "<div style=\"display:flex;align-items:center;gap:12px;font-family:system-ui\">\n  <span>Revenue (7 days)</span>\n  <pura-sparkline values=\"4,7,5,9,6,11,13\" width=\"120\" height=\"32\" color=\"#16a34a\" fill dot></pura-sparkline>\n  <strong>$13k</strong>\n</div>",
  "usage": "<div style=\"display:flex;align-items:center;gap:12px;font-family:system-ui\">\n  <span>Revenue (7 days)</span>\n  <pura-sparkline values=\"4,7,5,9,6,11,13\" width=\"120\" height=\"32\" color=\"#16a34a\" fill dot></pura-sparkline>\n  <strong>$13k</strong>\n</div>",
  "animation": true,
  "relatedComponents": [
    {
      "slug": "sidebar",
      "title": "Sidebar"
    },
    {
      "slug": "table",
      "title": "Table"
    },
    {
      "slug": "timeline",
      "title": "Timeline"
    },
    {
      "slug": "dropdown-menu",
      "title": "Dropdown Menu"
    },
    {
      "slug": "stat",
      "title": "Stat"
    },
    {
      "slug": "stat-grid",
      "title": "Stat Grid"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "dashboard",
      "title": "Dashboard"
    }
  ]
},
{
  "slug": "speed-dial",
  "title": "Speed Dial",
  "category": "Overlay",
  "blurb": "Floating action button (FAB) pinned to a corner of the viewport that fans out into secondary actions.",
  "description": "`pura-speed-dial` is a FAB anchored to a corner of the screen that, on click (or optionally on hover), expands a stack of secondary `pura-speed-dial-action` actions, each with an icon and label. Use it to concentrate primary-action shortcuts on screens like dashboards or mobile apps, where an always-visible button offers quick create, share, or edit. Built on the native Popover API and CSS anchor positioning, it gets ESC-to-close and light-dismiss for free, and exposes an agent-native layer: the host mirrors state in `data-pura-speed-dial-*` attributes, registers in `window.__puraSpeedDials`, and offers a `.state` getter with JSON of the actions, letting agents enumerate and trigger the dial without scraping the shadow DOM.",
  "attributes": [
    {
      "name": "position",
      "type": "string",
      "default": "bottom-end",
      "desc": "Viewport corner and fan-out direction: bottom-end, bottom-start, top-end, or top-start."
    },
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "desc": "Reflects and controls the open state of the action stack."
    },
    {
      "name": "hover",
      "type": "boolean",
      "default": "false",
      "desc": "When present, also expands on hover (clicking still toggles)."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Ações rápidas",
      "desc": "Accessible label (aria-label) for the FAB button."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "On pura-speed-dial-action: disables the action (no click, no focus)."
    }
  ],
  "events": [
    "open",
    "close",
    "action"
  ],
  "slots": [
    "default",
    "icon"
  ],
  "demoHTML": "<div style=\"position:relative;height:320px;border:1px solid var(--pura-border);border-radius:var(--pura-radius);overflow:hidden;background:var(--pura-subtle)\">\n  <p style=\"padding:var(--pura-space-4);color:var(--pura-muted-fg)\">Click the button in the bottom-right corner.</p>\n  <pura-speed-dial label=\"Quick actions\" style=\"position:absolute\">\n    <pura-speed-dial-action id=\"acao-novo\">\n      New document\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\"><path d=\"M12 5v14M5 12h14\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/></svg>\n    </pura-speed-dial-action>\n    <pura-speed-dial-action id=\"acao-compartilhar\">\n      Share\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\"><path d=\"M4 12v8h16v-8M12 3v13M7 8l5-5 5 5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>\n    </pura-speed-dial-action>\n    <pura-speed-dial-action id=\"acao-editar\">\n      Edit\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\"><path d=\"M4 20h4L18 10l-4-4L4 16v4zM14 6l4 4\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>\n    </pura-speed-dial-action>\n  </pura-speed-dial>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/speed-dial.js\";\n  document.querySelector(\"pura-speed-dial\").addEventListener(\"action\", (e) => {\n    console.log(\"Action triggered:\", e.detail.id, e.detail.label);\n  });\n</script>",
  "usage": "<pura-speed-dial label=\"Quick actions\" position=\"bottom-end\">\n  <pura-speed-dial-action id=\"acao-novo\">\n    New document\n    <svg slot=\"icon\" viewBox=\"0 0 24 24\"><path d=\"M12 5v14M5 12h14\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/></svg>\n  </pura-speed-dial-action>\n  <pura-speed-dial-action id=\"acao-compartilhar\">\n    Share\n    <svg slot=\"icon\" viewBox=\"0 0 24 24\"><path d=\"M4 12v8h16v-8M12 3v13M7 8l5-5 5 5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>\n  </pura-speed-dial-action>\n  <pura-speed-dial-action id=\"acao-editar\">\n    Edit\n    <svg slot=\"icon\" viewBox=\"0 0 24 24\"><path d=\"M4 20h4L18 10l-4-4L4 16v4zM14 6l4 4\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>\n  </pura-speed-dial-action>\n</pura-speed-dial>\n<script type=\"module\">\n  import \"/pura/lib/speed-dial.js\";\n  document.querySelector(\"pura-speed-dial\").addEventListener(\"action\", (e) => {\n    console.log(\"Action triggered:\", e.detail.id, e.detail.label);\n  });\n</script>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "spinner",
  "title": "Spinner",
  "category": "Display",
  "blurb": "Animated loading indicator in three sizes.",
  "description": "The Spinner is a native web component that displays an animated circular loading indicator. Use it to signal that processing is in progress, such as loading data or submitting a form. It exposes the ARIA \"status\" role for screen readers and supports a custom accessible label.",
  "attributes": [
    {
      "name": "size",
      "type": "\"sm\" | \"md\" | \"lg\"",
      "default": "md",
      "desc": "Spinner size: sm (small), md (medium), or lg (large)."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Loading",
      "desc": "Accessible label (aria-label) announced by screen readers."
    }
  ],
  "events": [],
  "slots": [],
  "demoHTML": "<div style=\"display:flex;align-items:center;gap:1.5rem;\">\n  <pura-spinner size=\"sm\"></pura-spinner>\n  <pura-spinner></pura-spinner>\n  <pura-spinner size=\"lg\" label=\"Loading data\"></pura-spinner>\n</div>",
  "usage": "<div style=\"display:flex;align-items:center;gap:1.5rem;\">\n  <pura-spinner size=\"sm\"></pura-spinner>\n  <pura-spinner></pura-spinner>\n  <pura-spinner size=\"lg\" label=\"Loading data\"></pura-spinner>\n</div>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "split-button",
  "title": "Split Button",
  "category": "Overlay",
  "blurb": "Primary action button coupled to a caret that opens a dropdown menu of secondary actions.",
  "description": "The Split Button joins a primary action to an arrow button that opens a menu of secondary actions, built on the native Popover API (top layer, light dismiss, and ESC for free) and CSS anchor positioning. Use it when there is one dominant default action plus a set of less frequent alternatives, such as Save with options like Save as draft or Save and close. Agent-native layer: the component mirrors live state in stable data-pura-split-* attributes (disabled, loading, variant, open) and registers in window.__puraSplitButtons indexed by data-pura-id, letting agents enumerate, read, and drive each split button on the page without touching internals.",
  "attributes": [
    {
      "name": "variant",
      "type": "string",
      "default": "primary",
      "desc": "Visual style: primary, secondary, ghost, or danger."
    },
    {
      "name": "size",
      "type": "string",
      "default": "md",
      "desc": "Button size: sm, md, or lg."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables both buttons (primary and caret)."
    },
    {
      "name": "loading",
      "type": "boolean",
      "default": "false",
      "desc": "Shows a spinner on the primary button and makes both inert."
    },
    {
      "name": "placement",
      "type": "string",
      "default": "bottom",
      "desc": "Side the menu opens on: bottom or top."
    },
    {
      "name": "label",
      "type": "string",
      "default": "More actions",
      "desc": "Accessible label for the caret button and the menu."
    },
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "desc": "Reflects and controls the open state of the menu."
    },
    {
      "name": "full",
      "type": "boolean",
      "default": "false",
      "desc": "Makes the component take the full width, with the primary button expanding."
    }
  ],
  "events": [
    "click",
    "select",
    "open",
    "close"
  ],
  "slots": [
    "default",
    "icon",
    "menu"
  ],
  "demoHTML": "<pura-split-button id=\"salvar\" variant=\"primary\">\n  Save\n  <pura-menu-item slot=\"menu\" data-action=\"rascunho\">Save as draft</pura-menu-item>\n  <pura-menu-item slot=\"menu\" data-action=\"fechar\">Save and close</pura-menu-item>\n  <pura-menu-separator slot=\"menu\"></pura-menu-separator>\n  <pura-menu-item slot=\"menu\" data-action=\"modelo\">Save as template</pura-menu-item>\n</pura-split-button>\n\n<p id=\"status-salvar\" style=\"margin-top:1rem;font:inherit;color:var(--pura-muted,#666)\"></p>\n\n<script type=\"module\">\n  import \"/pura/lib/split-button.js\";\n  const btn = document.getElementById(\"salvar\");\n  const status = document.getElementById(\"status-salvar\");\n  btn.addEventListener(\"click\", () => { status.textContent = \"Document saved.\"; });\n  btn.addEventListener(\"select\", (e) => {\n    status.textContent = \"Action: \" + e.target.getAttribute(\"data-action\");\n  });\n</script>",
  "usage": "<pura-split-button id=\"salvar\" variant=\"primary\">\n  Save\n  <pura-menu-item slot=\"menu\" data-action=\"rascunho\">Save as draft</pura-menu-item>\n  <pura-menu-item slot=\"menu\" data-action=\"fechar\">Save and close</pura-menu-item>\n  <pura-menu-separator slot=\"menu\"></pura-menu-separator>\n  <pura-menu-item slot=\"menu\" data-action=\"modelo\">Save as template</pura-menu-item>\n</pura-split-button>\n\n<p id=\"status-salvar\"></p>\n\n<script type=\"module\">\n  import \"/pura/lib/split-button.js\";\n  const btn = document.getElementById(\"salvar\");\n  const status = document.getElementById(\"status-salvar\");\n  btn.addEventListener(\"click\", () => { status.textContent = \"Document saved.\"; });\n  btn.addEventListener(\"select\", (e) => {\n    status.textContent = \"Action: \" + e.target.getAttribute(\"data-action\");\n  });\n</script>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "spotlight",
  "title": "Spotlight",
  "category": "Overlay",
  "blurb": "Dims the entire page, leaving only one element highlighted through a transparent cutout.",
  "description": "Spotlight dims the whole screen with a modal overlay (a native <dialog> via showModal, with top layer, ESC, and focus trap for free) and opens a transparent cutout around the element pointed to by target, clipped from its bounding rect and repositioned on scroll/resize. Use it to guide attention during onboarding, guided tours, or to highlight a specific element of the interface. It is agent-native: each instance registers in window.__puraSpotlights by id, and the dialog exposes stable data-pura-spotlight, data-target, and data-active attributes, letting agents discover and control the highlight programmatically.",
  "attributes": [
    {
      "name": "target",
      "type": "string",
      "default": "",
      "desc": "CSS selector of the element to highlight (resolved live). With no target, the overlay just dims the page uniformly."
    },
    {
      "name": "radius",
      "type": "string",
      "default": "var(--pura-radius)",
      "desc": "Corner radius of the cutout (any CSS length)."
    },
    {
      "name": "pad",
      "type": "number",
      "default": "6",
      "desc": "Extra px around the target's rectangle, for breathing room."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Spotlight",
      "desc": "Accessible name of the overlay (aria-label)."
    },
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "desc": "Reflects the visible state; present -> shown."
    }
  ],
  "events": [
    "spotlight-show",
    "spotlight-hide"
  ],
  "slots": [],
  "demoHTML": "<div style=\"padding:24px;display:flex;flex-direction:column;gap:16px;align-items:flex-start\">\n  <p>Click to highlight the button below:</p>\n  <button id=\"alvo\" style=\"padding:8px 16px\">New feature</button>\n  <button id=\"guiar\">Show highlight</button>\n</div>\n\n<pura-spotlight id=\"sp\" target=\"#alvo\" label=\"Meet the new feature\"></pura-spotlight>\n\n<script type=\"module\">\n  import \"/pura/lib/spotlight.js\";\n  const sp = document.getElementById(\"sp\");\n  document.getElementById(\"guiar\").addEventListener(\"click\", () => sp.show());\n</script>",
  "usage": "<div style=\"padding:24px;display:flex;flex-direction:column;gap:16px;align-items:flex-start\">\n  <p>Click to highlight the button below:</p>\n  <button id=\"alvo\" style=\"padding:8px 16px\">New feature</button>\n  <button id=\"guiar\">Show highlight</button>\n</div>\n\n<pura-spotlight id=\"sp\" target=\"#alvo\" label=\"Meet the new feature\"></pura-spotlight>\n\n<script type=\"module\">\n  import \"/pura/lib/spotlight.js\";\n  const sp = document.getElementById(\"sp\");\n  document.getElementById(\"guiar\").addEventListener(\"click\", () => sp.show());\n</script>",
  "animation": true,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "stack",
  "title": "Stack",
  "category": "Primitives",
  "blurb": "A vertical flex column that spaces its children with a consistent gap.",
  "description": "Stack lays out its slotted children in a single vertical column with even spacing controlled by a space-scale gap. You can align and justify the children, and optionally draw thin divider lines between them. It is the go-to primitive for forms, lists, and any top-to-bottom flow.",
  "attributes": [
    {
      "name": "gap",
      "type": "string",
      "default": "4",
      "desc": "Space scale 0-6 that sets the gap between children; maps to --pura-space-N (0 means no gap)."
    },
    {
      "name": "align",
      "type": "string",
      "default": "stretch",
      "desc": "Cross-axis alignment of children: start, center, end, or stretch."
    },
    {
      "name": "justify",
      "type": "string",
      "default": "start",
      "desc": "Main-axis distribution of children: start, center, end, between, or around."
    },
    {
      "name": "divide",
      "type": "boolean",
      "default": "false",
      "desc": "When present, draws a 1px border between children, using the gap value as padding around each rule."
    }
  ],
  "events": [],
  "slots": [
    "default — the stacked children"
  ],
  "demoHTML": "<script type=\"module\" src=\"/pura/lib/stack.js\"></script>\n\n<!-- Default stack: gap 4 -->\n<pura-stack>\n  <h3>Account settings</h3>\n  <p>Update your profile and notification preferences.</p>\n  <button>Save changes</button>\n</pura-stack>\n\n<!-- Tighter gap, centered children -->\n<pura-stack gap=\"2\" align=\"center\">\n  <strong>Plan: Pro</strong>\n  <span>Renews on June 1</span>\n  <button>Manage subscription</button>\n</pura-stack>\n\n<!-- Divided list of items -->\n<pura-stack gap=\"3\" divide>\n  <div>Inbox</div>\n  <div>Starred</div>\n  <div>Archived</div>\n</pura-stack>",
  "usage": "<script type=\"module\" src=\"/pura/lib/stack.js\"></script>\n\n<!-- A simple sign-in form laid out vertically -->\n<pura-stack gap=\"3\">\n  <label>Email\n    <input type=\"email\" placeholder=\"you@example.com\" />\n  </label>\n  <label>Password\n    <input type=\"password\" />\n  </label>\n  <button>Sign in</button>\n</pura-stack>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "stat-grid",
  "title": "Stat Grid",
  "category": "Display",
  "blurb": "Responsive grid of metrics that arranges statistic cells with automatic dividers.",
  "description": "The `<pura-stat-grid>` is a container that arranges `<pura-stat>` elements into a fluid grid (auto-fit columns, no fixed count) with 1px dividers that adapt to however many columns wrap at the available width. Use it for KPI panels, dashboard summaries, or blocks of highlighted numbers. Agent-native layer: each grid gets a stable `data-pura-stat-grid` id and registers a live, machine-readable snapshot in `window.__puraStats[id]` in the format `{ label, stats: [{ id, label, value, delta, trend }] }`, letting agents read the metrics without scraping the DOM; each `<pura-stat>` also exposes a public `snapshot()` method.",
  "attributes": [
    {
      "name": "label",
      "type": "string",
      "default": "",
      "desc": "Accessible name for the group (becomes the aria-label and the snapshot's label field in the registry). Attribute of <pura-stat-grid>."
    },
    {
      "name": "min",
      "type": "string (CSS length)",
      "default": "11rem",
      "desc": "Minimum width of each column before it wraps to the next row. Attribute of <pura-stat-grid>."
    },
    {
      "name": "dividers",
      "type": "string",
      "default": "(present)",
      "desc": "Controls the 1px lines between cells. Use dividers=\"none\" to remove them. Attribute of <pura-stat-grid>."
    },
    {
      "name": "label",
      "type": "string",
      "default": "",
      "desc": "Text for the cell's label, used when the label slot is empty. Attribute of <pura-stat>."
    },
    {
      "name": "value",
      "type": "string",
      "default": "",
      "desc": "Text for the cell's value, used when the default slot is empty. Attribute of <pura-stat>."
    },
    {
      "name": "delta",
      "type": "string",
      "default": "",
      "desc": "Change text (e.g. \"+12.5%\") rendered next to the value. Attribute of <pura-stat>."
    },
    {
      "name": "trend",
      "type": "up | down | flat",
      "default": "",
      "desc": "Change direction: colors the delta (green/red/neutral), adds an arrow, and exposes the direction via data-trend and aria-label. Attribute of <pura-stat>."
    }
  ],
  "events": [],
  "slots": [
    "label",
    "default",
    "help"
  ],
  "demoHTML": "<pura-stat-grid label=\"Monthly overview\" min=\"13rem\">\n  <pura-stat label=\"Revenue\" value=\"$128,430\" delta=\"+12.5%\" trend=\"up\">\n    <span slot=\"help\">vs. previous month</span>\n  </pura-stat>\n  <pura-stat label=\"New customers\" value=\"342\" delta=\"+8.1%\" trend=\"up\"></pura-stat>\n  <pura-stat label=\"Churn rate\" value=\"2.3%\" delta=\"-0.4 pp\" trend=\"down\"></pura-stat>\n  <pura-stat label=\"Average order value\" value=\"$375\" delta=\"0.0%\" trend=\"flat\"></pura-stat>\n</pura-stat-grid>",
  "usage": "<pura-stat-grid label=\"Monthly overview\" min=\"13rem\">\n  <pura-stat label=\"Revenue\" value=\"$128,430\" delta=\"+12.5%\" trend=\"up\">\n    <span slot=\"help\">vs. previous month</span>\n  </pura-stat>\n  <pura-stat label=\"New customers\" value=\"342\" delta=\"+8.1%\" trend=\"up\"></pura-stat>\n  <pura-stat label=\"Churn rate\" value=\"2.3%\" delta=\"-0.4 pp\" trend=\"down\"></pura-stat>\n  <pura-stat label=\"Average order value\" value=\"$375\" delta=\"0.0%\" trend=\"flat\"></pura-stat>\n</pura-stat-grid>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "stat",
      "title": "Stat"
    },
    {
      "slug": "timeline",
      "title": "Timeline"
    },
    {
      "slug": "banner",
      "title": "Banner"
    },
    {
      "slug": "sparkline",
      "title": "Sparkline"
    },
    {
      "slug": "testimonial",
      "title": "Testimonial"
    },
    {
      "slug": "faq",
      "title": "FAQ"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "dashboard",
      "title": "Dashboard"
    },
    {
      "slug": "landing",
      "title": "Landing"
    },
    {
      "slug": "profile",
      "title": "Profile"
    }
  ]
},
{
  "slug": "stat",
  "title": "Stat",
  "category": "Display",
  "blurb": "Metric card with a prominent value, a label, and a colored delta with a trend arrow.",
  "description": "The `<pura-stat>` displays a numeric indicator (KPI) with a label, a main value, and a change (delta) that automatically gains an arrow and color: green for an increase, red for a decrease, neutral for stable. Use it in dashboards and summary panels where each number needs to communicate a trend at a glance. It is agent-native: in addition to mirroring its live state in stable `data-pura-stat-*` attributes, each instance registers itself in `window.__puraStats` (a map keyed by `data-pura-id`), letting an agent enumerate and read all the metrics on the page without inspecting the DOM.",
  "attributes": [
    {
      "name": "label",
      "type": "string",
      "default": "",
      "desc": "Descriptive caption for the metric (e.g. \"Revenue\")."
    },
    {
      "name": "value",
      "type": "string",
      "default": "",
      "desc": "The prominent number (e.g. \"$48.2k\", \"1,204\")."
    },
    {
      "name": "delta",
      "type": "string",
      "default": "",
      "desc": "Change text (e.g. \"+12%\", \"-3.4%\"). The delta line only appears when filled in."
    },
    {
      "name": "trend",
      "type": "\"up\" | \"down\" | \"flat\"",
      "default": "(inferred from the sign of the delta)",
      "desc": "Arrow direction and color. When omitted, it is inferred from the sign of the delta (+ = up, - = down, otherwise flat)."
    }
  ],
  "events": [],
  "slots": [
    "icon"
  ],
  "demoHTML": "<div style=\"display:flex;gap:1rem;flex-wrap:wrap\">\n  <pura-stat label=\"Revenue\" value=\"$48.2k\" delta=\"+12%\">\n    <svg slot=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6\"/></svg>\n  </pura-stat>\n  <pura-stat label=\"Cancellations\" value=\"3.4%\" delta=\"-1.2%\"></pura-stat>\n  <pura-stat label=\"Active customers\" value=\"1,204\" delta=\"0%\" trend=\"flat\"></pura-stat>\n</div>",
  "usage": "<div style=\"display:flex;gap:1rem;flex-wrap:wrap\">\n  <pura-stat label=\"Revenue\" value=\"$48.2k\" delta=\"+12%\">\n    <svg slot=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6\"/></svg>\n  </pura-stat>\n  <pura-stat label=\"Cancellations\" value=\"3.4%\" delta=\"-1.2%\"></pura-stat>\n  <pura-stat label=\"Active customers\" value=\"1,204\" delta=\"0%\" trend=\"flat\"></pura-stat>\n</div>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "stat-grid",
      "title": "Stat Grid"
    },
    {
      "slug": "timeline",
      "title": "Timeline"
    },
    {
      "slug": "banner",
      "title": "Banner"
    },
    {
      "slug": "sparkline",
      "title": "Sparkline"
    },
    {
      "slug": "testimonial",
      "title": "Testimonial"
    },
    {
      "slug": "faq",
      "title": "FAQ"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "dashboard",
      "title": "Dashboard"
    },
    {
      "slug": "landing",
      "title": "Landing"
    },
    {
      "slug": "profile",
      "title": "Profile"
    }
  ]
},
{
  "slug": "stepper",
  "title": "Stepper",
  "category": "Navigation",
  "blurb": "Step indicator with numbered circles that shows completed, current and upcoming progress.",
  "description": "`<pura-stepper>` renders a sequence of numbered steps connected by lines, marking completed ones with a check, highlighting the current one and dimming the upcoming ones. Use it in multi-step flows such as checkout, onboarding or forms split into steps. It is agent-native: the host exposes `data-count`/`data-active` and each step carries `data-index` and `data-state` (\"complete\" | \"current\" | \"upcoming\"), plus an ordered list with `aria-current=\"step\"` and ARIA labels that spell out position and state, making the progress readable by machines and by assistive technology.",
  "attributes": [
    {
      "name": "steps",
      "type": "string",
      "default": "\"\"",
      "desc": "Step labels separated by commas, e.g.: \"Account, Shipping, Payment\". Spaces are trimmed and empty items discarded."
    },
    {
      "name": "active",
      "type": "number",
      "default": "0",
      "desc": "Zero-based index of the current step. Steps with a lower index are completed, the equal one is current and the higher ones are upcoming."
    },
    {
      "name": "orientation",
      "type": "string",
      "default": "\"horizontal\"",
      "desc": "Direction of the indicator: \"horizontal\" (default) or \"vertical\"."
    }
  ],
  "events": [],
  "slots": [],
  "demoHTML": "<pura-stepper id=\"checkout\" steps=\"Account, Shipping, Payment, Review\" active=\"1\"></pura-stepper>\n\n<div style=\"margin-top:1.5rem;display:flex;gap:.5rem\">\n  <button id=\"prev\">Back</button>\n  <button id=\"next\">Next</button>\n</div>\n\n<script type=\"module\">\n  import \"/pura/lib/stepper.js\";\n  const stepper = document.getElementById(\"checkout\");\n  const total = stepper.getAttribute(\"steps\").split(\",\").length;\n  document.getElementById(\"next\").addEventListener(\"click\", () => {\n    const i = Math.min(stepper.active + 1, total - 1);\n    stepper.setAttribute(\"active\", String(i));\n  });\n  document.getElementById(\"prev\").addEventListener(\"click\", () => {\n    const i = Math.max(stepper.active - 1, 0);\n    stepper.setAttribute(\"active\", String(i));\n  });\n</script>",
  "usage": "<pura-stepper id=\"checkout\" steps=\"Account, Shipping, Payment, Review\" active=\"1\"></pura-stepper>\n\n<div style=\"margin-top:1.5rem;display:flex;gap:.5rem\">\n  <button id=\"prev\">Back</button>\n  <button id=\"next\">Next</button>\n</div>\n\n<script type=\"module\">\n  import \"/pura/lib/stepper.js\";\n  const stepper = document.getElementById(\"checkout\");\n  const total = stepper.getAttribute(\"steps\").split(\",\").length;\n  document.getElementById(\"next\").addEventListener(\"click\", () => {\n    const i = Math.min(stepper.active + 1, total - 1);\n    stepper.setAttribute(\"active\", String(i));\n  });\n  document.getElementById(\"prev\").addEventListener(\"click\", () => {\n    const i = Math.max(stepper.active - 1, 0);\n    stepper.setAttribute(\"active\", String(i));\n  });\n</script>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "input-group",
      "title": "Input Group"
    },
    {
      "slug": "number-input",
      "title": "Number Input"
    },
    {
      "slug": "switch",
      "title": "Switch"
    },
    {
      "slug": "card",
      "title": "Card"
    },
    {
      "slug": "checkbox",
      "title": "Checkbox"
    },
    {
      "slug": "empty",
      "title": "Empty"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "checkout",
      "title": "Checkout"
    },
    {
      "slug": "onboarding",
      "title": "Onboarding"
    }
  ]
},
{
  "slug": "swatch-picker",
  "title": "Swatch Picker",
  "category": "Form",
  "blurb": "A grid of preset color chips to pick from, lighter than a full color picker.",
  "description": "A grid of preset color chips to pick from, lighter than a full color picker.",
  "attributes": [
    {
      "name": "colors",
      "type": "string",
      "default": "",
      "desc": "Comma-separated hex color list"
    },
    {
      "name": "value",
      "type": "string",
      "default": "",
      "desc": "Selected color"
    },
    {
      "name": "columns",
      "type": "string",
      "default": "",
      "desc": "Number of grid columns"
    },
    {
      "name": "size",
      "type": "string",
      "default": "1.75rem",
      "desc": "Swatch size (CSS length or number of px)"
    },
    {
      "name": "allow-clear",
      "type": "boolean",
      "default": "",
      "desc": "When set, clicking the selected swatch clears the value"
    }
  ],
  "events": [
    "change"
  ],
  "slots": [],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "swipe",
  "title": "Swipe",
  "category": "Utility",
  "blurb": "Swipeable container that detects pointer and touch drag gestures past a threshold and dispatches a swipe event with direction and distance.",
  "description": "Swipeable container that detects pointer and touch drag gestures past a threshold and dispatches a swipe event with direction and distance.",
  "attributes": [
    {
      "name": "direction",
      "type": "string",
      "default": "horizontal",
      "desc": "Drag axis: horizontal or vertical"
    },
    {
      "name": "threshold",
      "type": "string",
      "default": "64",
      "desc": "Trigger/snap distance in px"
    }
  ],
  "events": [
    "swipe"
  ],
  "slots": [
    "default",
    "left-action",
    "right-action"
  ],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "switch",
  "title": "Switch",
  "category": "Form",
  "blurb": "An on/off toggle for flipping a setting, with an optional label.",
  "description": "Switch is a native web component (zero dependencies) that represents a binary on/off state, ideal for enabling or disabling settings instantly. Use it when the action takes effect immediately, without needing a confirmation button. The label text goes in the default slot, and it fires a change event on every toggle.",
  "attributes": [
    {
      "name": "checked",
      "type": "boolean",
      "default": "false",
      "desc": "Sets whether the switch is on; reflects the .checked property."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables interaction and removes the switch from the focus order."
    }
  ],
  "events": [
    "change"
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "<div style=\"display: flex; flex-direction: column; gap: 1rem;\">\n  <pura-switch checked>Email notifications</pura-switch>\n  <pura-switch>Dark mode</pura-switch>\n  <pura-switch disabled>Feature unavailable</pura-switch>\n</div>",
  "usage": "<div style=\"display: flex; flex-direction: column; gap: 1rem;\">\n  <pura-switch checked>Email notifications</pura-switch>\n  <pura-switch>Dark mode</pura-switch>\n  <pura-switch disabled>Feature unavailable</pura-switch>\n</div>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "field",
      "title": "Field"
    },
    {
      "slug": "select",
      "title": "Select"
    },
    {
      "slug": "radio",
      "title": "Radio"
    },
    {
      "slug": "radio-group",
      "title": "Radio Group"
    },
    {
      "slug": "stepper",
      "title": "Stepper"
    },
    {
      "slug": "tabs",
      "title": "Tabs"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "onboarding",
      "title": "Onboarding"
    },
    {
      "slug": "settings",
      "title": "Settings"
    }
  ]
},
{
  "slug": "table",
  "title": "Table",
  "category": "Display",
  "blurb": "Wraps a native HTML table with consistent pura styling.",
  "description": "A native web component that styles an ordinary HTML table placed in the default slot, preserving all the native semantics of thead, tbody, tfoot, and caption. Use it to display tabular data with the pura look, including a highlighted header, row hover, and borders. Enable the striped attribute for zebra striping on even rows.",
  "attributes": [
    {
      "name": "striped",
      "type": "boolean",
      "default": "false",
      "desc": "Applies zebra striping (a background color on the even rows of the tbody)."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "demoHTML": "<pura-table striped>\n  <table>\n    <caption>Recent orders</caption>\n    <thead>\n      <tr>\n        <th>Customer</th>\n        <th>Product</th>\n        <th>Status</th>\n        <th>Amount</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td>Ana Souza</td>\n        <td>Annual Plan</td>\n        <td>Paid</td>\n        <td>$1,200.00</td>\n      </tr>\n      <tr>\n        <td>Bruno Lima</td>\n        <td>Monthly Plan</td>\n        <td>Pending</td>\n        <td>$120.00</td>\n      </tr>\n      <tr>\n        <td>Carla Dias</td>\n        <td>Annual Plan</td>\n        <td>Canceled</td>\n        <td>$1,200.00</td>\n      </tr>\n    </tbody>\n  </table>\n</pura-table>",
  "usage": "<pura-table striped>\n  <table>\n    <caption>Recent orders</caption>\n    <thead>\n      <tr>\n        <th>Customer</th>\n        <th>Product</th>\n        <th>Status</th>\n        <th>Amount</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td>Ana Souza</td>\n        <td>Annual Plan</td>\n        <td>Paid</td>\n        <td>$1,200.00</td>\n      </tr>\n      <tr>\n        <td>Bruno Lima</td>\n        <td>Monthly Plan</td>\n        <td>Pending</td>\n        <td>$120.00</td>\n      </tr>\n      <tr>\n        <td>Carla Dias</td>\n        <td>Annual Plan</td>\n        <td>Canceled</td>\n        <td>$1,200.00</td>\n      </tr>\n    </tbody>\n  </table>\n</pura-table>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "dropdown-menu",
      "title": "Dropdown Menu"
    },
    {
      "slug": "button-group",
      "title": "Button Group"
    },
    {
      "slug": "pagination",
      "title": "Pagination"
    },
    {
      "slug": "sparkline",
      "title": "Sparkline"
    },
    {
      "slug": "sidebar",
      "title": "Sidebar"
    },
    {
      "slug": "timeline",
      "title": "Timeline"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "dashboard",
      "title": "Dashboard"
    },
    {
      "slug": "data-table",
      "title": "Data Table"
    }
  ]
},
{
  "slug": "tabs",
  "title": "Tabs",
  "category": "Navigation",
  "blurb": "Switches between content panels with an accessible tab bar.",
  "description": "Tabs is a native web component that organizes content into panels selectable by a tab bar. Use it when you need to group related sections in the same space, showing one at a time. Each tab is a pura-tab element with its label, and the active panel is controlled by the active attribute on pura-tabs.",
  "attributes": [
    {
      "name": "active",
      "type": "number",
      "default": "0",
      "desc": "Zero-based index of the active tab on pura-tabs; reflected when switching tabs."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Tab {n}",
      "desc": "Text of the tab button, set on each child pura-tab."
    }
  ],
  "events": [
    "change"
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "<pura-tabs active=\"0\">\n  <pura-tab label=\"Account\">\n    Manage your name, email and profile photo here.\n  </pura-tab>\n  <pura-tab label=\"Password\">\n    Update your password and enable two-step verification.\n  </pura-tab>\n  <pura-tab label=\"Notifications\">\n    Choose which alerts you want to receive by email.\n  </pura-tab>\n</pura-tabs>",
  "usage": "<pura-tabs active=\"0\">\n  <pura-tab label=\"Account\">\n    Manage your name, email and profile photo here.\n  </pura-tab>\n  <pura-tab label=\"Password\">\n    Update your password and enable two-step verification.\n  </pura-tab>\n  <pura-tab label=\"Notifications\">\n    Choose which alerts you want to receive by email.\n  </pura-tab>\n</pura-tabs>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "separator",
      "title": "Separator"
    },
    {
      "slug": "radio",
      "title": "Radio"
    },
    {
      "slug": "radio-group",
      "title": "Radio Group"
    },
    {
      "slug": "switch",
      "title": "Switch"
    },
    {
      "slug": "timeline",
      "title": "Timeline"
    },
    {
      "slug": "stat",
      "title": "Stat"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "profile",
      "title": "Profile"
    },
    {
      "slug": "settings",
      "title": "Settings"
    }
  ]
},
{
  "slug": "tag-input",
  "title": "Tag Input",
  "category": "Form",
  "blurb": "A tag input field where the user types and presses Enter or comma to add removable chips.",
  "description": "`pura-tag-input` is a form field that turns text into chips: typing and pressing Enter (or comma) adds a tag, Backspace in an empty field removes the last one, and the × on each chip removes it individually. Use it when you need to collect a list of short values (keywords, recipients, categories), with an optional limit via `max` and no duplicates. It is agent-native: each instance registers in `window.__puraTagInputs` and mirrors its state on the host via the `data-tags` (JSON), `data-count`, and `data-max` attributes, allowing an agent to read and control the tags without touching the shadow DOM.",
  "attributes": [
    {
      "name": "value",
      "type": "string",
      "default": "\"\"",
      "desc": "Initial comma-separated tags; reflects the current state as the tags change."
    },
    {
      "name": "placeholder",
      "type": "string",
      "default": "\"\"",
      "desc": "Placeholder text for the input field (also used as the aria-label)."
    },
    {
      "name": "max",
      "type": "number",
      "default": "Infinity",
      "desc": "Maximum number of allowed tags; input is blocked once the limit is reached."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Makes the component non-interactive."
    }
  ],
  "events": [
    "change"
  ],
  "slots": [],
  "demoHTML": "<pura-tag-input\n  id=\"tags-demo\"\n  value=\"javascript,css,web components\"\n  placeholder=\"Add a technology\"\n  max=\"6\"></pura-tag-input>\n<p id=\"tags-saida\" style=\"margin-top:.75rem;font:14px system-ui;color:#555\">3 tag(s): javascript, css, web components</p>\n<script type=\"module\">\n  const input = document.getElementById(\"tags-demo\");\n  const saida = document.getElementById(\"tags-saida\");\n  input.addEventListener(\"change\", (e) => {\n    const tags = e.detail.tags;\n    saida.textContent = `${tags.length} tag(s): ${tags.join(\", \") || \"none\"}`;\n  });\n</script>",
  "usage": "<pura-tag-input\n  id=\"tags-demo\"\n  value=\"javascript,css,web components\"\n  placeholder=\"Add a technology\"\n  max=\"6\"></pura-tag-input>\n<p id=\"tags-saida\">3 tag(s): javascript, css, web components</p>\n<script type=\"module\">\n  const input = document.getElementById(\"tags-demo\");\n  const saida = document.getElementById(\"tags-saida\");\n  input.addEventListener(\"change\", (e) => {\n    const tags = e.detail.tags;\n    saida.textContent = `${tags.length} tag(s): ${tags.join(\", \") || \"none\"}`;\n  });\n</script>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "tag",
  "title": "Tag",
  "category": "Display",
  "blurb": "Compact pill for labeling, filtering, or categorizing content, with optional removable and status-dot variants.",
  "description": "The Tag (<pura-tag>) is a rounded chip that labels, filters, or categorizes content, with color variants, an optional status dot, and a remove button (×) that makes it dismissible. Use it to display categories, active filters, statuses, or markers in lists and headers. It has an agent-native layer: each tag gets a stable data-pura-id, is registered in window.__puraTags, and mirrors its live state in data-pura-tag-* attributes (variant, removable, disabled, removed), letting agents and tools enumerate, read, and remove tags without accessing the Shadow DOM.",
  "attributes": [
    {
      "name": "variant",
      "type": "string",
      "default": "neutral",
      "desc": "Color/intent of the tag: neutral, primary, success, warning, danger, or info."
    },
    {
      "name": "removable",
      "type": "boolean",
      "default": "false",
      "desc": "Renders a remove button (×) that emits the remove event."
    },
    {
      "name": "dot",
      "type": "boolean",
      "default": "false",
      "desc": "Renders a status dot in front of the label."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Dims the tag and disables the remove button."
    },
    {
      "name": "label",
      "type": "string",
      "default": "",
      "desc": "Accessible label used as a fallback when the default slot is empty."
    }
  ],
  "events": [
    "remove"
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "<div style=\"display:flex;gap:.5rem;flex-wrap:wrap;align-items:center\">\n  <pura-tag>Default</pura-tag>\n  <pura-tag variant=\"primary\">Featured</pura-tag>\n  <pura-tag variant=\"success\" dot>Active</pura-tag>\n  <pura-tag variant=\"warning\" dot>Pending</pura-tag>\n  <pura-tag variant=\"danger\">Overdue</pura-tag>\n  <pura-tag variant=\"info\">Beta</pura-tag>\n  <pura-tag variant=\"primary\" removable id=\"filtro-categoria\">Category: Design</pura-tag>\n  <pura-tag removable disabled>Locked</pura-tag>\n</div>\n<script type=\"module\">\n  const filtro = document.getElementById(\"filtro-categoria\");\n  filtro.addEventListener(\"remove\", (e) => {\n    console.log(\"Filtro removido:\", e.detail.label);\n  });\n</script>",
  "usage": "<div style=\"display:flex;gap:.5rem;flex-wrap:wrap;align-items:center\">\n  <pura-tag>Default</pura-tag>\n  <pura-tag variant=\"primary\">Featured</pura-tag>\n  <pura-tag variant=\"success\" dot>Active</pura-tag>\n  <pura-tag variant=\"warning\" dot>Pending</pura-tag>\n  <pura-tag variant=\"danger\">Overdue</pura-tag>\n  <pura-tag variant=\"info\">Beta</pura-tag>\n  <pura-tag variant=\"primary\" removable id=\"filtro-categoria\">Category: Design</pura-tag>\n  <pura-tag removable disabled>Locked</pura-tag>\n</div>\n<script type=\"module\">\n  const filtro = document.getElementById(\"filtro-categoria\");\n  filtro.addEventListener(\"remove\", (e) => {\n    console.log(\"Filtro removido:\", e.detail.label);\n  });\n</script>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "terminal",
  "title": "Terminal",
  "category": "Display",
  "blurb": "An interactive terminal emulator with a monospace output area and a prompt input line that dispatches a command event on Enter.",
  "description": "An interactive terminal emulator with a monospace output area and a prompt input line that dispatches a command event on Enter.",
  "attributes": [
    {
      "name": "prompt",
      "type": "string",
      "default": "$ ",
      "desc": "The prompt string shown before the input"
    },
    {
      "name": "welcome",
      "type": "string",
      "default": "",
      "desc": "A line printed into the output on first connect"
    }
  ],
  "events": [
    "command"
  ],
  "slots": [],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "testimonial",
  "title": "Testimonial",
  "category": "Display",
  "blurb": "Testimonial card with decorative quotation marks, a quote, an optional star rating, and an author line.",
  "description": "The `<pura-testimonial>` displays a testimonial or quote as a figure: a large decorative quotation mark, the quote text (default slot), an optional star rating, and an author line with avatar, name, and role. Use it for social proof, customer testimonials, or review highlights. It is purely display-oriented (it emits no events), but it has an agent-native layer: each instance mirrors its state in stable `data-pura-testimonial-*` attributes on the host and registers itself in `window.__puraTestimonials` (a map indexed by `data-pura-id`), letting agents enumerate and read all the testimonials on the page without crossing the shadow DOM boundary.",
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
  "demoHTML": "<div style=\"max-width: 420px;\">\n  <pura-testimonial\n    author=\"Mariana Lopes\"\n    role=\"CEO, Aurora Tech\"\n    avatar=\"https://i.pravatar.cc/120?img=47\"\n    rating=\"4.5\"\n    max=\"5\">\n    Moving to pura was the best decision our team made. Zero dependencies, native components, and everything worked on the first try in our stack.\n  </pura-testimonial>\n</div>",
  "usage": "<pura-testimonial\n  author=\"Mariana Lopes\"\n  role=\"CEO, Aurora Tech\"\n  avatar=\"https://i.pravatar.cc/120?img=47\"\n  rating=\"4.5\"\n  max=\"5\">\n  Moving to pura was the best decision our team made. Zero dependencies, native components, and everything worked on the first try in our stack.\n</pura-testimonial>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "banner",
      "title": "Banner"
    },
    {
      "slug": "faq",
      "title": "FAQ"
    },
    {
      "slug": "pricing-table",
      "title": "Pricing Table"
    },
    {
      "slug": "stat",
      "title": "Stat"
    },
    {
      "slug": "stat-grid",
      "title": "Stat Grid"
    },
    {
      "slug": "card",
      "title": "Card"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "landing",
      "title": "Landing"
    }
  ]
},
{
  "slug": "text-shimmer",
  "title": "Text Shimmer",
  "category": "Display",
  "blurb": "A bright band sweeps across text via a gradient clipped to the glyphs. Pure CSS @keyframes, SSR-safe, reduced-motion aware.",
  "description": "`<pura-text-shimmer>` sweeps a bright band across the slotted text, in the style of Magic UI's Animated Shiny Text. The band is a moving gradient clipped to the glyphs with `background-clip: text`, driven by a pure CSS `@keyframes`, so it works server-rendered with no client JS and no animation runtime. Theme the resting color with `--pura-text-shimmer-base`, the band with `--pura-text-shimmer-highlight`, and the speed with `--pura-text-shimmer-duration`. Under reduced motion the sweep freezes and the text shows in the base color via the base reset. Slot plain text or color-inheriting elements. It registers in `window.__puraTextShimmers` by `data-pura-id` for agent enumeration.",
  "attributes": [],
  "events": [],
  "slots": [
    "default"
  ],
  "demoHTML": "<pura-text-shimmer style=\"font: 700 28px system-ui; letter-spacing: -.02em;\">Shimmering headline</pura-text-shimmer>\n<br>\n<pura-text-shimmer style=\"font: 500 14px system-ui; --pura-text-shimmer-highlight: #6366f1;\">✨ Introducing pura animations</pura-text-shimmer>",
  "usage": "<pura-text-shimmer>Shimmering headline</pura-text-shimmer>\n\n<!-- Custom band color and speed -->\n<pura-text-shimmer style=\"--pura-text-shimmer-highlight: #6366f1; --pura-text-shimmer-duration: 2s;\">\n  ✨ New\n</pura-text-shimmer>",
  "animation": true,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "text",
  "title": "Text",
  "category": "Primitives",
  "blurb": "A typographic primitive for rendering body copy and inline text with consistent size, weight, color, and alignment tokens.",
  "description": "<pura-text> renders a paragraph by default, a span when inline, or any of p/span/div via the as attribute. It exposes size, weight, color, align, and leading scales mapped to design tokens, plus a single-line truncate option. Theme it through the var(--pura-*) tokens and target its rendered element with the \"text\" CSS part.",
  "attributes": [
    {
      "name": "size",
      "type": "xs | sm | base | lg | xl",
      "default": "base",
      "desc": "Font size scale, mapped to the --pura-text-* tokens."
    },
    {
      "name": "weight",
      "type": "normal | medium | semibold | bold",
      "default": "normal",
      "desc": "Font weight (400 / 500 / 600 / 700)."
    },
    {
      "name": "color",
      "type": "fg | muted | primary | accent | success | danger",
      "default": "fg",
      "desc": "Text color, mapped to the corresponding theme token."
    },
    {
      "name": "align",
      "type": "left | center | right",
      "default": "left",
      "desc": "Horizontal text alignment."
    },
    {
      "name": "leading",
      "type": "tight | normal | relaxed",
      "default": "normal",
      "desc": "Line-height (1.25 / 1.5 / 1.75)."
    },
    {
      "name": "truncate",
      "type": "boolean",
      "default": "false",
      "desc": "Clamps the text to a single line with an ellipsis."
    },
    {
      "name": "inline",
      "type": "boolean",
      "default": "false",
      "desc": "Renders a <span> and displays inline instead of a block <p>."
    },
    {
      "name": "as",
      "type": "p | span | div",
      "default": "p",
      "desc": "Explicit tag override for the rendered element."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "demoHTML": "<script type=\"module\" src=\"/pura/lib/text.js\"></script>\n\n<pura-text size=\"xl\" weight=\"bold\">Welcome to Pura</pura-text>\n<pura-text color=\"muted\">A small set of primitive components for building interfaces.</pura-text>\n<pura-text size=\"lg\" weight=\"semibold\" color=\"primary\" align=\"center\">Centered, emphasized heading</pura-text>\n<pura-text leading=\"relaxed\">\n  This paragraph uses relaxed leading so longer passages of body copy stay\n  comfortable to read across multiple lines.\n</pura-text>\n<pura-text color=\"danger\" weight=\"medium\">Something went wrong. Please try again.</pura-text>\n<pura-text>\n  Status:\n  <pura-text inline color=\"success\" weight=\"semibold\">Online</pura-text>\n</pura-text>\n<pura-text truncate style=\"max-width: 240px\">\n  This is a very long line of text that will be truncated with an ellipsis when it overflows.\n</pura-text>",
  "usage": "<script type=\"module\" src=\"/pura/lib/text.js\"></script>\n\n<!-- Default: renders a block <p> -->\n<pura-text>Plain body text.</pura-text>\n\n<!-- Size, weight, and color scales -->\n<pura-text size=\"xl\" weight=\"bold\" color=\"primary\">Page title</pura-text>\n<pura-text size=\"sm\" color=\"muted\">Helper caption</pura-text>\n\n<!-- Inline usage inside other text -->\n<pura-text>\n  Saved as\n  <pura-text inline weight=\"semibold\" color=\"accent\">draft</pura-text>.\n</pura-text>\n\n<!-- Explicit tag override -->\n<pura-text as=\"div\" align=\"center\" leading=\"relaxed\">Centered block of text.</pura-text>\n\n<!-- Single-line truncation -->\n<pura-text truncate style=\"max-width: 200px\">A long string that gets clipped.</pura-text>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "textarea",
  "title": "Textarea",
  "category": "Form",
  "blurb": "A multiline text field with a label, hint, and error state.",
  "description": "A native web component for multiline text input (`<pura-textarea>`), with an optional label, hint text, and disabled/invalid states. Use it in forms to collect long text such as comments, descriptions, or notes. The value is accessible through the `value` property, and the `value` attribute is updated on every keystroke.",
  "attributes": [
    {
      "name": "label",
      "type": "string",
      "default": "",
      "desc": "Label text shown above the field."
    },
    {
      "name": "hint",
      "type": "string",
      "default": "",
      "desc": "Hint text shown below the field."
    },
    {
      "name": "placeholder",
      "type": "string",
      "default": "",
      "desc": "Text shown when the field is empty."
    },
    {
      "name": "rows",
      "type": "number",
      "default": "4",
      "desc": "Number of visible rows in the field."
    },
    {
      "name": "value",
      "type": "string",
      "default": "",
      "desc": "Current content of the field; also available as a property."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables the field for editing."
    },
    {
      "name": "invalid",
      "type": "boolean",
      "default": "false",
      "desc": "Applies the error style to the field and the hint."
    }
  ],
  "events": [
    "input"
  ],
  "slots": [],
  "demoHTML": "<pura-textarea\n  label=\"Comment\"\n  placeholder=\"Write your comment...\"\n  hint=\"Maximum of 500 characters.\"\n  rows=\"5\"\n></pura-textarea>",
  "usage": "<pura-textarea\n  label=\"Comment\"\n  placeholder=\"Write your comment...\"\n  hint=\"Maximum of 500 characters.\"\n  rows=\"5\"\n></pura-textarea>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "theme-designer",
  "title": "Theme Designer",
  "category": "Utility",
  "blurb": "A slide-in panel to pick a brand preset or craft a custom theme, applying --pura-* token overrides live and persisting the choice.",
  "description": "A slide-in panel to pick a brand preset or craft a custom theme, applying --pura-* token overrides live and persisting the choice.",
  "attributes": [
    {
      "name": "open",
      "type": "boolean",
      "default": "",
      "desc": "Reflects and controls panel visibility"
    },
    {
      "name": "launcher",
      "type": "boolean",
      "default": "",
      "desc": "Also render a fixed floating button that toggles the panel"
    },
    {
      "name": "position",
      "type": "string",
      "default": "right",
      "desc": "Panel side: right (default) or left"
    }
  ],
  "events": [
    "change"
  ],
  "slots": [],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "ticker",
  "title": "Ticker",
  "category": "Display",
  "blurb": "A number that animates scrolling from the previous value up to the new one, with locale-aware thousands separators.",
  "description": "The `<pura-ticker>` displays a number that animates (counting up or down) from the previous value to the target over a short duration, formatted with locale-aware thousands separators. Use it for dashboards, metrics, revenue counters, or statistics that change in real time. It is agent-native: it exposes `role=\"status\"` with `aria-live`, mirrors its numeric state in stable `data-value`/`data-formatted` attributes (even during the animation), and registers each live instance in `window.__puraTickers`, letting agents and tools reliably enumerate and read all the tickers on the page.",
  "attributes": [
    {
      "name": "value",
      "type": "number",
      "default": "0",
      "desc": "Target number; animates from the previous value when it changes."
    },
    {
      "name": "duration",
      "type": "number",
      "default": "800",
      "desc": "Animation duration in ms (ignored under prefers-reduced-motion)."
    },
    {
      "name": "decimals",
      "type": "number",
      "default": "inferred from value",
      "desc": "Fixed number of decimal places; if omitted, inferred from the literal value."
    },
    {
      "name": "locale",
      "type": "string",
      "default": "document locale",
      "desc": "Intl locale used for grouping and separators."
    },
    {
      "name": "prefix",
      "type": "string",
      "default": "\"\"",
      "desc": "Text rendered before the number (e.g. \"$\")."
    },
    {
      "name": "suffix",
      "type": "string",
      "default": "\"\"",
      "desc": "Text rendered after the number (e.g. \"%\")."
    },
    {
      "name": "label",
      "type": "string",
      "default": "none",
      "desc": "Accessible label for the value (composes the aria-label)."
    }
  ],
  "events": [
    "ticker:start",
    "ticker:end"
  ],
  "slots": [],
  "demoHTML": "<div style=\"display:flex; align-items:center; gap:1.5rem; flex-wrap:wrap;\">\n  <pura-ticker id=\"receita\" value=\"0\" duration=\"1200\" decimals=\"2\" locale=\"en-US\" prefix=\"$\" label=\"Monthly revenue\"></pura-ticker>\n  <pura-ticker id=\"taxa\" value=\"0\" duration=\"1200\" decimals=\"1\" locale=\"en-US\" suffix=\"%\" label=\"Conversion rate\"></pura-ticker>\n  <button id=\"atualizar\" type=\"button\">Update values</button>\n</div>\n<script type=\"module\">\n  const receita = document.getElementById(\"receita\");\n  const taxa = document.getElementById(\"taxa\");\n  // Animate from zero on load.\n  receita.value = 128430.75;\n  taxa.value = 4.7;\n  document.getElementById(\"atualizar\").addEventListener(\"click\", () => {\n    receita.value = Math.round(Math.random() * 200000 * 100) / 100;\n    taxa.value = Math.round(Math.random() * 100 * 10) / 10;\n  });\n</script>",
  "usage": "<div style=\"display:flex; align-items:center; gap:1.5rem; flex-wrap:wrap;\">\n  <pura-ticker id=\"receita\" value=\"0\" duration=\"1200\" decimals=\"2\" locale=\"en-US\" prefix=\"$\" label=\"Monthly revenue\"></pura-ticker>\n  <pura-ticker id=\"taxa\" value=\"0\" duration=\"1200\" decimals=\"1\" locale=\"en-US\" suffix=\"%\" label=\"Conversion rate\"></pura-ticker>\n  <button id=\"atualizar\" type=\"button\">Update values</button>\n</div>\n<script type=\"module\">\n  const receita = document.getElementById(\"receita\");\n  const taxa = document.getElementById(\"taxa\");\n  receita.value = 128430.75;\n  taxa.value = 4.7;\n  document.getElementById(\"atualizar\").addEventListener(\"click\", () => {\n    receita.value = Math.round(Math.random() * 200000 * 100) / 100;\n    taxa.value = Math.round(Math.random() * 100 * 10) / 10;\n  });\n</script>",
  "animation": true,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "time-picker",
  "title": "Time Picker",
  "category": "Date",
  "blurb": "A time input that shows formatted selected time via a trigger and opens a popover with a scrollable list of selectable times stepped by minutes.",
  "description": "A time input that shows formatted selected time via a trigger and opens a popover with a scrollable list of selectable times stepped by minutes.",
  "attributes": [
    {
      "name": "value",
      "type": "string",
      "default": "",
      "desc": "Selected time as HH:MM or HH:MM:SS"
    },
    {
      "name": "step",
      "type": "string",
      "default": "30",
      "desc": "Step between time options in minutes"
    },
    {
      "name": "use24",
      "type": "boolean",
      "default": "",
      "desc": "Use 24-hour time format"
    },
    {
      "name": "seconds",
      "type": "boolean",
      "default": "",
      "desc": "Include seconds in value and display"
    },
    {
      "name": "min",
      "type": "string",
      "default": "",
      "desc": "Minimum selectable time as HH:MM"
    },
    {
      "name": "max",
      "type": "string",
      "default": "",
      "desc": "Maximum selectable time as HH:MM"
    },
    {
      "name": "placeholder",
      "type": "string",
      "default": "Pick a time",
      "desc": "Placeholder text when no time is selected"
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "",
      "desc": "Disables the picker"
    }
  ],
  "events": [
    "change"
  ],
  "slots": [],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "timeline",
  "title": "Timeline",
  "category": "Display",
  "blurb": "Vertical timeline with connected markers for displaying events in sequence.",
  "description": "Timeline is a vertical container (`<pura-timeline>`) that draws a line connecting the dots of each `<pura-timeline-item>` placed in the default slot. Use it to display history logs, process steps, changelogs, or activity feeds in chronological order. It's agent-native: in addition to the accessible `role=\"list\"`, every mounted timeline registers a live, machine-readable snapshot at `window.__puraTimelines[id]` (with a label and items containing time, title, body, and variant), letting agents read the content without scraping the DOM.",
  "attributes": [
    {
      "name": "label",
      "type": "string",
      "default": "",
      "desc": "Accessible name of the list (becomes aria-label) on <pura-timeline>; also reflected in the registry snapshot."
    },
    {
      "name": "variant",
      "type": "\"neutral\" | \"primary\" | \"success\" | \"warning\" | \"danger\" | \"info\"",
      "default": "neutral",
      "desc": "Sets the dot color of each <pura-timeline-item>."
    }
  ],
  "events": [],
  "slots": [
    "time",
    "title",
    "default"
  ],
  "demoHTML": "<pura-timeline label=\"Order history\">\n  <pura-timeline-item variant=\"success\">\n    <span slot=\"time\">May 29, 2026, 9:12 AM</span>\n    <span slot=\"title\">Order confirmed</span>\n    Payment approved and invoice issued.\n  </pura-timeline-item>\n  <pura-timeline-item variant=\"primary\">\n    <span slot=\"time\">May 29, 2026, 2:40 PM</span>\n    <span slot=\"title\">Being picked</span>\n    Items reserved in the distribution center's inventory.\n  </pura-timeline-item>\n  <pura-timeline-item variant=\"info\">\n    <span slot=\"time\">May 30, 2026, 8:05 AM</span>\n    <span slot=\"title\">On the way</span>\n    Package handed off to the carrier.\n  </pura-timeline-item>\n  <pura-timeline-item>\n    <span slot=\"time\">Estimated: Jun 2, 2026</span>\n    <span slot=\"title\">Delivery</span>\n    Awaiting receipt at the registered address.\n  </pura-timeline-item>\n</pura-timeline>",
  "usage": "<pura-timeline label=\"Order history\">\n  <pura-timeline-item variant=\"success\">\n    <span slot=\"time\">May 29, 2026, 9:12 AM</span>\n    <span slot=\"title\">Order confirmed</span>\n    Payment approved and invoice issued.\n  </pura-timeline-item>\n  <pura-timeline-item variant=\"primary\">\n    <span slot=\"time\">May 29, 2026, 2:40 PM</span>\n    <span slot=\"title\">Being picked</span>\n    Items reserved in the distribution center's inventory.\n  </pura-timeline-item>\n  <pura-timeline-item variant=\"info\">\n    <span slot=\"time\">May 30, 2026, 8:05 AM</span>\n    <span slot=\"title\">On the way</span>\n    Package handed off to the carrier.\n  </pura-timeline-item>\n  <pura-timeline-item>\n    <span slot=\"time\">Estimated: Jun 2, 2026</span>\n    <span slot=\"title\">Delivery</span>\n    Awaiting receipt at the registered address.\n  </pura-timeline-item>\n</pura-timeline>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "stat",
      "title": "Stat"
    },
    {
      "slug": "stat-grid",
      "title": "Stat Grid"
    },
    {
      "slug": "sparkline",
      "title": "Sparkline"
    },
    {
      "slug": "sidebar",
      "title": "Sidebar"
    },
    {
      "slug": "table",
      "title": "Table"
    },
    {
      "slug": "tabs",
      "title": "Tabs"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "dashboard",
      "title": "Dashboard"
    },
    {
      "slug": "profile",
      "title": "Profile"
    }
  ]
},
{
  "slug": "toast",
  "title": "Toast",
  "category": "Feedback",
  "blurb": "Temporary notifications stacked in a corner of the screen, with auto-dismiss and an optional action.",
  "description": "Toast is a native web component (zero dependencies) for showing short, non-blocking messages. `<pura-toaster>` is a fixed container (an aria-live polite region) that stacks the toasts in a corner, and each `<pura-toast>` animates in, pauses on hover, and disappears on its own after the duration. In practice you use the imperative function `toast(message, opts)` (and the shortcuts `toast.success/error/warning/info`), which creates the default toaster automatically. Use it to confirm actions, warn about errors, or give quick feedback without interrupting the flow.",
  "attributes": [
    {
      "name": "position",
      "type": "\"bottom-right\" | \"top-left\" | \"top-center\" | \"top-right\" | \"bottom-left\" | \"bottom-center\"",
      "default": "bottom-right",
      "desc": "Corner where <pura-toaster> stacks the toasts (an invalid value falls back to the default)."
    },
    {
      "name": "title",
      "type": "string",
      "default": "",
      "desc": "Optional bold title for the <pura-toast>."
    },
    {
      "name": "variant",
      "type": "\"info\" | \"success\" | \"warning\" | \"danger\"",
      "default": "info",
      "desc": "Accent color and icon for the <pura-toast>."
    },
    {
      "name": "duration",
      "type": "number (ms)",
      "default": "4000",
      "desc": "Time until auto-dismiss; 0 or negative keeps the toast pinned."
    }
  ],
  "events": [
    "dismiss"
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "<pura-toaster position=\"bottom-right\"></pura-toaster>\n\n<div style=\"display:flex; gap:.5rem; flex-wrap:wrap;\">\n  <button id=\"t-info\" type=\"button\">Show info</button>\n  <button id=\"t-ok\" type=\"button\">Success</button>\n  <button id=\"t-err\" type=\"button\">Error with action</button>\n</div>\n\n<script type=\"module\">\n  import { toast } from \"/pura/lib/toast.js\";\n\n  document.getElementById(\"t-info\").addEventListener(\"click\", () => {\n    toast(\"Your changes were saved as a draft.\", { title: \"Draft saved\" });\n  });\n  document.getElementById(\"t-ok\").addEventListener(\"click\", () => {\n    toast.success(\"Payment confirmed successfully!\", { title: \"All set\" });\n  });\n  document.getElementById(\"t-err\").addEventListener(\"click\", () => {\n    toast.error(\"We couldn't upload the file.\", {\n      title: \"Upload failed\",\n      duration: 8000,\n      action: { label: \"Try again\", onClick: () => toast.info(\"Resending...\") },\n    });\n  });\n</script>",
  "usage": "<pura-toaster position=\"bottom-right\"></pura-toaster>\n\n<div style=\"display:flex; gap:.5rem; flex-wrap:wrap;\">\n  <button id=\"t-info\" type=\"button\">Show info</button>\n  <button id=\"t-ok\" type=\"button\">Success</button>\n  <button id=\"t-err\" type=\"button\">Error with action</button>\n</div>\n\n<script type=\"module\">\n  import { toast } from \"/pura/lib/toast.js\";\n\n  document.getElementById(\"t-info\").addEventListener(\"click\", () => {\n    toast(\"Your changes were saved as a draft.\", { title: \"Draft saved\" });\n  });\n  document.getElementById(\"t-ok\").addEventListener(\"click\", () => {\n    toast.success(\"Payment confirmed successfully!\", { title: \"All set\" });\n  });\n  document.getElementById(\"t-err\").addEventListener(\"click\", () => {\n    toast.error(\"We couldn't upload the file.\", {\n      title: \"Upload failed\",\n      duration: 8000,\n      action: { label: \"Try again\", onClick: () => toast.info(\"Resending...\") },\n    });\n  });\n</script>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "calendar",
      "title": "Calendar"
    },
    {
      "slug": "dialog",
      "title": "Dialog"
    },
    {
      "slug": "segmented-control",
      "title": "Segmented Control"
    },
    {
      "slug": "item",
      "title": "Item"
    },
    {
      "slug": "select",
      "title": "Select"
    },
    {
      "slug": "input",
      "title": "Input"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "calendar-app",
      "title": "Calendar"
    }
  ]
},
{
  "slug": "toggle-group",
  "title": "Toggle Group",
  "category": "Form",
  "blurb": "Segmented control of toggle buttons, with single or multiple selection.",
  "description": "Toggle Group is a native web component that groups several `<pura-toggle>` elements into a segmented control. Use \"single\" mode for an exclusive choice (radio style) or \"multiple\" to select several options at once. It supports horizontal or vertical orientation and arrow-key keyboard navigation (roving focus).",
  "attributes": [
    {
      "name": "type",
      "type": "string",
      "default": "multiple",
      "desc": "'single' allows an exclusive choice (radio style); 'multiple' (default) allows several selections."
    },
    {
      "name": "value",
      "type": "string",
      "default": "",
      "desc": "In single mode, reflects the value of the pressed toggle; set it to pre-select. In multiple mode, read the .value property to get the array."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables the entire group, preserving each toggle's individual disabled state."
    },
    {
      "name": "orientation",
      "type": "string",
      "default": "horizontal",
      "desc": "'horizontal' (default) or 'vertical'; controls layout and the direction of the navigation arrows."
    },
    {
      "name": "pressed",
      "type": "boolean",
      "default": "false",
      "desc": "Attribute on the child <pura-toggle>: indicates whether it is pressed/active."
    },
    {
      "name": "value (pura-toggle)",
      "type": "string",
      "default": "textContent",
      "desc": "Attribute on the child <pura-toggle>: value associated with the toggle; falls back to the inner text if absent."
    }
  ],
  "events": [
    "change"
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:1.5rem;align-items:flex-start\">\n  <pura-toggle-group type=\"single\" value=\"medio\">\n    <pura-toggle value=\"baixo\">Low</pura-toggle>\n    <pura-toggle value=\"medio\">Medium</pura-toggle>\n    <pura-toggle value=\"alto\">High</pura-toggle>\n  </pura-toggle-group>\n\n  <pura-toggle-group type=\"multiple\">\n    <pura-toggle value=\"negrito\" pressed>Bold</pura-toggle>\n    <pura-toggle value=\"italico\">Italic</pura-toggle>\n    <pura-toggle value=\"sublinhado\">Underline</pura-toggle>\n  </pura-toggle-group>\n\n  <pura-toggle-group type=\"single\" orientation=\"vertical\" value=\"lista\">\n    <pura-toggle value=\"lista\">List</pura-toggle>\n    <pura-toggle value=\"grade\">Grid</pura-toggle>\n    <pura-toggle value=\"tabela\">Table</pura-toggle>\n  </pura-toggle-group>\n</div>",
  "usage": "<!-- Single selection (radio style) -->\n<pura-toggle-group type=\"single\" value=\"medio\">\n  <pura-toggle value=\"baixo\">Low</pura-toggle>\n  <pura-toggle value=\"medio\">Medium</pura-toggle>\n  <pura-toggle value=\"alto\">High</pura-toggle>\n</pura-toggle-group>\n\n<!-- Multiple selection -->\n<pura-toggle-group type=\"multiple\">\n  <pura-toggle value=\"negrito\" pressed>Bold</pura-toggle>\n  <pura-toggle value=\"italico\">Italic</pura-toggle>\n  <pura-toggle value=\"sublinhado\">Underline</pura-toggle>\n</pura-toggle-group>\n\n<!-- Vertical orientation -->\n<pura-toggle-group type=\"single\" orientation=\"vertical\" value=\"lista\">\n  <pura-toggle value=\"lista\">List</pura-toggle>\n  <pura-toggle value=\"grade\">Grid</pura-toggle>\n  <pura-toggle value=\"tabela\">Table</pura-toggle>\n</pura-toggle-group>\n\n<script type=\"module\">\n  const group = document.querySelector('pura-toggle-group[type=\"multiple\"]');\n  group.addEventListener('change', (e) => {\n    // single: string | null  |  multiple: array of values\n    console.log(e.detail.value, e.detail.type);\n  });\n</script>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "toggle",
  "title": "Toggle",
  "category": "Form",
  "blurb": "Two-state button that switches between on and off.",
  "description": "Toggle is a native web component that works as a two-position button (pressed or not), useful for switching formatting or on/off options, such as bold in a text editor. It supports visual variants and sizes, and fires an event whenever its state changes. Use it when you need a binary control with a button-like appearance instead of a traditional checkbox.",
  "attributes": [
    {
      "name": "pressed",
      "type": "boolean",
      "default": "false",
      "desc": "Reflects the active (on) state of the toggle; present when pressed."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "Disables the toggle and prevents switching via click or keyboard."
    },
    {
      "name": "variant",
      "type": "string",
      "default": "default",
      "desc": "Visual style: \"default\" (subtle) or \"outline\" (with a border)."
    },
    {
      "name": "size",
      "type": "string",
      "default": "md",
      "desc": "Button size: \"sm\", \"md\" or \"lg\"."
    },
    {
      "name": "value",
      "type": "string",
      "default": "textContent",
      "desc": "Value associated with the toggle; used by pura-toggle-group and sent in the change event."
    }
  ],
  "events": [
    "change"
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "<div style=\"display:flex; gap:0.5rem; align-items:center;\">\n  <pura-toggle pressed aria-label=\"Bold\">B</pura-toggle>\n  <pura-toggle variant=\"outline\" aria-label=\"Italic\"><em>I</em></pura-toggle>\n  <pura-toggle size=\"lg\">Notifications</pura-toggle>\n  <pura-toggle disabled>Unavailable</pura-toggle>\n</div>",
  "usage": "<div style=\"display:flex; gap:0.5rem; align-items:center;\">\n  <pura-toggle pressed aria-label=\"Bold\">B</pura-toggle>\n  <pura-toggle variant=\"outline\" aria-label=\"Italic\"><em>I</em></pura-toggle>\n  <pura-toggle size=\"lg\">Notifications</pura-toggle>\n  <pura-toggle disabled>Unavailable</pura-toggle>\n</div>",
  "animation": false,
  "relatedComponents": [
    {
      "slug": "breadcrumb",
      "title": "Breadcrumb"
    },
    {
      "slug": "sidebar",
      "title": "Sidebar"
    },
    {
      "slug": "dropdown-menu",
      "title": "Dropdown Menu"
    },
    {
      "slug": "empty",
      "title": "Empty"
    },
    {
      "slug": "input",
      "title": "Input"
    },
    {
      "slug": "avatar",
      "title": "Avatar"
    }
  ],
  "relatedBlocks": [
    {
      "slug": "app-shell",
      "title": "App Shell"
    }
  ]
},
{
  "slug": "toolbar",
  "title": "Toolbar",
  "category": "Navigation",
  "blurb": "Container that groups controls into a bar with roving focus via arrow keys and horizontal or vertical orientation.",
  "description": "`pura-toolbar` arranges slotted controls (buttons, toggles, links, inputs, separators) with consistent spacing and keyboard navigation: only one item stays in the tab order and the arrow keys move focus within the bar (Home/End go to the ends). Use it to group related actions such as a formatting or command bar. The agent-native layer exposes `role=\"toolbar\"` and mirrors the live state in `data-pura-toolbar-*` attributes on the host, and registers each toolbar in `window.__puraToolbars` by `data-pura-id`, allowing agents to enumerate and read all toolbars without touching the shadow DOM.",
  "attributes": [
    {
      "name": "orientation",
      "type": "string",
      "default": "horizontal",
      "desc": "Sets the layout and which arrow keys move focus: 'horizontal' (Left/Right) or 'vertical' (Up/Down). It also adjusts the aria-orientation."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "demoHTML": "<pura-toolbar orientation=\"horizontal\" aria-label=\"Formatting\">\n  <pura-button>Bold</pura-button>\n  <pura-button>Italic</pura-button>\n  <pura-button>Underline</pura-button>\n  <pura-separator></pura-separator>\n  <pura-button>Align left</pura-button>\n  <pura-button>Center</pura-button>\n  <pura-button>Align right</pura-button>\n</pura-toolbar>",
  "usage": "<pura-toolbar orientation=\"horizontal\" aria-label=\"Formatting\">\n  <pura-button>Bold</pura-button>\n  <pura-button>Italic</pura-button>\n  <pura-button>Underline</pura-button>\n  <pura-separator></pura-separator>\n  <pura-button>Align left</pura-button>\n  <pura-button>Center</pura-button>\n  <pura-button>Align right</pura-button>\n</pura-toolbar>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "tooltip",
  "title": "Tooltip",
  "category": "Overlay",
  "blurb": "Floating hint that appears when you hover over or focus an element.",
  "description": "Tooltip is a native web component that wraps a trigger element and shows a short supporting text when the user hovers over it or focuses it with the keyboard. Use it to describe icons, abbreviate labels, or add extra context without taking up permanent space in the interface.",
  "attributes": [
    {
      "name": "text",
      "type": "string",
      "default": "\"\"",
      "desc": "Text shown inside the hint."
    },
    {
      "name": "placement",
      "type": "\"top\" | \"bottom\" | \"left\" | \"right\"",
      "default": "top",
      "desc": "Position of the hint relative to the trigger."
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "demoHTML": "<pura-tooltip text=\"Save changes\">\n  <pura-button>Save</pura-button>\n</pura-tooltip>\n\n<pura-tooltip text=\"Delete item\" placement=\"bottom\">\n  <pura-button variant=\"ghost\">Delete</pura-button>\n</pura-tooltip>\n\n<pura-tooltip text=\"More information\" placement=\"right\">\n  <span aria-label=\"help\" style=\"cursor:help;\">?</span>\n</pura-tooltip>",
  "usage": "<pura-tooltip text=\"Save changes\">\n  <pura-button>Save</pura-button>\n</pura-tooltip>\n\n<pura-tooltip text=\"Delete item\" placement=\"bottom\">\n  <pura-button variant=\"ghost\">Delete</pura-button>\n</pura-tooltip>\n\n<pura-tooltip text=\"More information\" placement=\"right\">\n  <span aria-label=\"help\" style=\"cursor:help;\">?</span>\n</pura-tooltip>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "tour",
  "title": "Tour",
  "category": "Overlay",
  "blurb": "Step-by-step guided tour that highlights page elements with a spotlight and coachmarks.",
  "description": "pura-tour walks through a sequence of targets (declared as pura-tour-step), highlighting each one with a spotlight over a native modal dialog and showing a coachmark anchored via CSS anchor positioning, with Back/Next/Done buttons, a step counter, and arrow-key navigation. Use it for onboarding, introducing new features, or guided walkthroughs. It is agent-native: each tour registers itself in window.__puraTours indexed by id, and the overlay carries stable, machine-readable attributes (data-pura-tour, data-step, data-total, data-running) plus correct ARIA, letting agents discover and drive the tour via start()/next()/back()/goTo()/stop().",
  "attributes": [
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "desc": "Reflects the tour's running state; present in the initial markup, it starts the tour automatically on connect."
    },
    {
      "name": "index",
      "type": "number",
      "default": "0",
      "desc": "Current step (reflected). Changing the attribute while the tour is running navigates to that step via goTo()."
    }
  ],
  "events": [
    "tour-start",
    "tour-step",
    "tour-end"
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "<div style=\"display:grid;gap:1rem;max-width:420px\">\n  <h2 id=\"passo-titulo\">Account dashboard</h2>\n  <button id=\"passo-salvar\" type=\"button\">Save changes</button>\n  <a id=\"passo-ajuda\" href=\"#\">Help center</a>\n  <button id=\"iniciar-tour\" type=\"button\">Start tour</button>\n</div>\n\n<pura-tour id=\"tour-onboarding\">\n  <pura-tour-step target=\"#passo-titulo\" title=\"Welcome\" placement=\"bottom\">This is your main dashboard, where you manage your account.</pura-tour-step>\n  <pura-tour-step target=\"#passo-salvar\" title=\"Save your changes\" placement=\"bottom\">Click here whenever you adjust something so you don't lose your progress.</pura-tour-step>\n  <pura-tour-step target=\"#passo-ajuda\" title=\"Need help?\" placement=\"top\">Reach the help center anytime through this link.</pura-tour-step>\n</pura-tour>\n\n<script type=\"module\">\n  import \"/pura/lib/tour.js\";\n  const tour = document.getElementById(\"tour-onboarding\");\n  document.getElementById(\"iniciar-tour\").addEventListener(\"click\", () => tour.start());\n</script>",
  "usage": "<div style=\"display:grid;gap:1rem;max-width:420px\">\n  <h2 id=\"passo-titulo\">Account dashboard</h2>\n  <button id=\"passo-salvar\" type=\"button\">Save changes</button>\n  <a id=\"passo-ajuda\" href=\"#\">Help center</a>\n  <button id=\"iniciar-tour\" type=\"button\">Start tour</button>\n</div>\n\n<pura-tour id=\"tour-onboarding\">\n  <pura-tour-step target=\"#passo-titulo\" title=\"Welcome\" placement=\"bottom\">This is your main dashboard, where you manage your account.</pura-tour-step>\n  <pura-tour-step target=\"#passo-salvar\" title=\"Save your changes\" placement=\"bottom\">Click here whenever you adjust something so you don't lose your progress.</pura-tour-step>\n  <pura-tour-step target=\"#passo-ajuda\" title=\"Need help?\" placement=\"top\">Reach the help center anytime through this link.</pura-tour-step>\n</pura-tour>\n\n<script type=\"module\">\n  import \"/pura/lib/tour.js\";\n  const tour = document.getElementById(\"tour-onboarding\");\n  document.getElementById(\"iniciar-tour\").addEventListener(\"click\", () => tour.start());\n</script>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "transfer",
  "title": "Transfer",
  "category": "Form",
  "blurb": "Dual-list transfer (shuttle) with two panels, checkboxes, and middle controls to move selected items between source and target.",
  "description": "Dual-list transfer (shuttle) with two panels, checkboxes, and middle controls to move selected items between source and target.",
  "attributes": [
    {
      "name": "items",
      "type": "string",
      "default": "",
      "desc": "JSON array of {key, label} or strings defining available items"
    },
    {
      "name": "value",
      "type": "string",
      "default": "",
      "desc": "JSON array of keys currently in the target panel"
    },
    {
      "name": "searchable",
      "type": "boolean",
      "default": "",
      "desc": "Show search inputs in each panel"
    }
  ],
  "events": [
    "change"
  ],
  "slots": [],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "tree-select",
  "title": "Tree Select",
  "category": "Form",
  "blurb": "A select whose dropdown is a hierarchical tree for picking one or many nodes, with expandable branches, optional search, and multi-select support.",
  "description": "A select whose dropdown is a hierarchical tree for picking one or many nodes, with expandable branches, optional search, and multi-select support.",
  "attributes": [
    {
      "name": "multiple",
      "type": "boolean",
      "default": "",
      "desc": "Enable multi-select with checkboxes and tags"
    },
    {
      "name": "placeholder",
      "type": "string",
      "default": "Select",
      "desc": "Placeholder text when nothing is selected"
    },
    {
      "name": "searchable",
      "type": "boolean",
      "default": "",
      "desc": "Show a search input that filters and auto-expands matching paths"
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "",
      "desc": "Disables the trigger"
    },
    {
      "name": "data",
      "type": "string",
      "default": "",
      "desc": "JSON nested array of {value, label, children} nodes"
    }
  ],
  "events": [
    "change"
  ],
  "slots": [],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "tree-view",
  "title": "Tree View",
  "category": "Display",
  "blurb": "Keyboard-navigable hierarchical tree with selection and expandable nodes.",
  "description": "Tree View displays hierarchical data as an accessible tree (role=tree/treeitem), with arrow-key navigation, roving tabindex, expand/collapse, and selection. Use it for file navigation, nested categories, or any parent/child structure. It's agent-native: every node carries data-pura-* and ARIA attributes, and a global window.__puraTrees registry exposes a serializable snapshot of the structure via __puraTrees.snapshot(id) and __puraTrees.list(), letting agents read the tree without traversing the DOM.",
  "attributes": [
    {
      "name": "label",
      "type": "string",
      "default": "Tree",
      "desc": "On <pura-tree-view>/<pura-tree>: accessible name of the tree (aria-label). On <pura-tree-item>: text label used as a fallback for value and in the snapshot."
    },
    {
      "name": "expanded",
      "type": "boolean",
      "default": "false",
      "desc": "On <pura-tree-item>: reveals the group of nested children (rotates the chevron)."
    },
    {
      "name": "selectable",
      "type": "boolean",
      "default": "false",
      "desc": "On <pura-tree-item>: makes the row selectable (toggles aria-selected on activation)."
    },
    {
      "name": "selected",
      "type": "boolean",
      "default": "false",
      "desc": "On <pura-tree-item>: marks the node as selected."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "desc": "On <pura-tree-item>: disables the node (ignored in navigation and clicks)."
    },
    {
      "name": "value",
      "type": "string",
      "default": "label/textContent",
      "desc": "On <pura-tree-item>: machine-readable id exposed in events and in the agent-native snapshot; if absent, falls back to the label or the node's text."
    }
  ],
  "events": [
    "select",
    "expand",
    "collapse",
    "activate"
  ],
  "slots": [
    "label",
    "default"
  ],
  "demoHTML": "<pura-tree-view id=\"arvore\" label=\"Documents\">\n  <pura-tree-item expanded>\n    <span slot=\"label\">Projects</span>\n    <pura-tree-item selectable value=\"site\">\n      <span slot=\"label\">marketing-site</span>\n    </pura-tree-item>\n    <pura-tree-item selectable value=\"api\">\n      <span slot=\"label\">payments-api</span>\n    </pura-tree-item>\n  </pura-tree-item>\n  <pura-tree-item>\n    <span slot=\"label\">Archived</span>\n    <pura-tree-item selectable value=\"legado\" disabled>\n      <span slot=\"label\">legacy-system</span>\n    </pura-tree-item>\n  </pura-tree-item>\n</pura-tree-view>\n\n<p id=\"saida\" style=\"font-family: var(--pura-font); font-size: 0.875rem; color: var(--pura-muted); margin-top: 0.75rem;\">Select an item from the tree.</p>\n\n<script type=\"module\">\n  import \"/pura/lib/tree-view.js\";\n  const arvore = document.getElementById(\"arvore\");\n  const saida = document.getElementById(\"saida\");\n  arvore.addEventListener(\"select\", (e) => {\n    saida.textContent = `Selected: ${e.detail.value}`;\n  });\n</script>",
  "usage": "<pura-tree-view id=\"arvore\" label=\"Documents\">\n  <pura-tree-item expanded>\n    <span slot=\"label\">Projects</span>\n    <pura-tree-item selectable value=\"site\">\n      <span slot=\"label\">marketing-site</span>\n    </pura-tree-item>\n    <pura-tree-item selectable value=\"api\">\n      <span slot=\"label\">payments-api</span>\n    </pura-tree-item>\n  </pura-tree-item>\n  <pura-tree-item>\n    <span slot=\"label\">Archived</span>\n    <pura-tree-item selectable value=\"legado\" disabled>\n      <span slot=\"label\">legacy-system</span>\n    </pura-tree-item>\n  </pura-tree-item>\n</pura-tree-view>\n\n<script type=\"module\">\n  import \"/pura/lib/tree-view.js\";\n  const arvore = document.getElementById(\"arvore\");\n  arvore.addEventListener(\"select\", (e) => {\n    console.log(\"Selected:\", e.detail.value);\n  });\n  // Agent-native: serializable snapshot of the structure\n  // window.__puraTrees.snapshot(\"arvore\");\n</script>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "truncate",
  "title": "Truncate",
  "category": "Utility",
  "blurb": "Limits text to N lines with an ellipsis and a \"more\"/\"less\" button to expand it.",
  "description": "`<pura-truncate>` visually clips text to a fixed number of lines using line-clamp, showing an expand button only when the content actually overflows. Use it when you need to condense long descriptions, comments, or bios while keeping the option to see everything. The full text always remains in the DOM and the accessibility tree (only the clipping is visual), so screen readers and agents read the entire content; it also exposes an agent-native layer with stable data-* attributes and a global window.__puraTruncate registry keyed by id.",
  "attributes": [
    {
      "name": "lines",
      "type": "number",
      "default": "3",
      "desc": "Number of visible lines when collapsed (minimum 1)."
    },
    {
      "name": "expanded",
      "type": "boolean",
      "default": "false",
      "desc": "Present = starts expanded; reflected as state."
    },
    {
      "name": "more-label",
      "type": "string",
      "default": "more",
      "desc": "Label for the expand button."
    },
    {
      "name": "less-label",
      "type": "string",
      "default": "less",
      "desc": "Label for the collapse button."
    }
  ],
  "events": [
    "toggle"
  ],
  "slots": [
    "(default)"
  ],
  "demoHTML": "<pura-truncate lines=\"2\" more-label=\"read more\" less-label=\"read less\" style=\"max-width: 380px; display: block;\">\n  The Blue Ridge Mountains are one of the most prominent ranges in the eastern United States, stretching across Virginia, North Carolina, and Georgia. Their trails, waterfalls, and mild climate draw visitors all year long, especially in the winter months, when temperatures drop close to freezing at the higher elevations.\n</pura-truncate>",
  "usage": "<pura-truncate lines=\"2\" more-label=\"read more\" less-label=\"read less\" style=\"max-width: 380px; display: block;\">\n  The Blue Ridge Mountains are one of the most prominent ranges in the eastern United States, stretching across Virginia, North Carolina, and Georgia. Their trails, waterfalls, and mild climate draw visitors all year long, especially in the winter months, when temperatures drop close to freezing at the higher elevations.\n</pura-truncate>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "typewriter",
  "title": "Typewriter",
  "category": "Display",
  "blurb": "Types text out character by character, optionally cycling phrases, with a CSS caret; renders full text and is accessible under reduced motion.",
  "description": "`<pura-typewriter>` types text out character by character and can cycle through several `|`-separated `phrases`, with an optional CSS-only blinking `caret`. It is accessible by design: the full text is rendered for no-JS and exposed via the host `aria-label`, while the animated span is `aria-hidden` so screen readers are not spammed per keystroke. Tune `speed`, `delete-speed`, and `pause`; start on view, load, or manually. Under reduced motion it renders the first phrase in full with no typing. It mirrors the visible text in `data-pura-typewriter-text` and registers in `window.__puraTypewriters` for agent enumeration.",
  "attributes": [
    {
      "name": "text",
      "type": "string",
      "default": "",
      "desc": "The string to type (single phrase)."
    },
    {
      "name": "phrases",
      "type": "string",
      "default": "",
      "desc": "\"|\"-separated phrases to cycle through. Overrides text."
    },
    {
      "name": "speed",
      "type": "number",
      "default": "55",
      "desc": "Milliseconds per character while typing."
    },
    {
      "name": "delete-speed",
      "type": "number",
      "default": "30",
      "desc": "Milliseconds per character while deleting."
    },
    {
      "name": "pause",
      "type": "number",
      "default": "1400",
      "desc": "Milliseconds to hold a completed phrase before deleting."
    },
    {
      "name": "caret",
      "type": "boolean",
      "default": "false",
      "desc": "Show a blinking caret."
    },
    {
      "name": "loop",
      "type": "boolean",
      "default": "false",
      "desc": "Keep cycling phrases (delete and retype)."
    },
    {
      "name": "start",
      "type": "\"view\" | \"load\" | \"manual\"",
      "default": "view",
      "desc": "When to begin: on first intersection, immediately on load, or only via start()."
    }
  ],
  "events": [
    "pura-typewriter"
  ],
  "slots": [],
  "demoHTML": "<div style=\"font: 600 1.4rem system-ui;\">\n  <pura-typewriter phrases=\"Native web components.|Zero dependencies.|Agent-readable motion.\" caret loop speed=\"60\"></pura-typewriter>\n</div>",
  "usage": "<!-- Single phrase -->\n<pura-typewriter text=\"Welcome to pura\" caret></pura-typewriter>\n\n<!-- Cycle phrases forever -->\n<pura-typewriter\n  phrases=\"Native web components.|Zero dependencies.|Agent-readable motion.\"\n  caret loop speed=\"60\"></pura-typewriter>",
  "animation": true,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "typing",
  "title": "Typing Indicator",
  "category": "Feedback",
  "blurb": "Three-dot typing indicator for chat and agent UIs, CSS-only animation with an accessible status label.",
  "description": "`<pura-typing>` is a three-dot \"typing…\" indicator for chat and agent interfaces. The bounce is pure CSS `@keyframes` with a per-dot stagger, and `role=\"status\"` with a localized `aria-label` announces it to assistive tech. Theme it with `--pura-typing-color`, `--pura-typing-size`, and `--pura-typing-gap`. Under reduced motion the dots fall still while the status label still conveys the meaning.",
  "attributes": [
    {
      "name": "label",
      "type": "string",
      "default": "Typing…",
      "desc": "Overrides the localized accessible label announced by assistive tech."
    }
  ],
  "events": [],
  "slots": [],
  "demoHTML": "<div style=\"display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.6rem 0.9rem; background: var(--pura-subtle, #f4f4f5); border-radius: 14px;\">\n  <pura-typing></pura-typing>\n</div>",
  "usage": "<pura-typing></pura-typing>\n\n<!-- Custom color + larger dots -->\n<pura-typing style=\"--pura-typing-color: #2563eb; --pura-typing-size: 0.6rem;\"></pura-typing>",
  "animation": true,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "undo",
  "title": "Undo",
  "category": "Feedback",
  "blurb": "Runs an action and shows an \"undo\" snackbar for a window of time before committing the effect.",
  "description": "An agent-native component that implements the \"action with an undo window\" pattern: when triggered, it enters the pending state, shows an inline snackbar (message + Undo button), and commits the action automatically when the timeout expires. Use it in deletion flows or destructive actions where the real effect should be deferred (\"Deleted. Undo?\"). The machine-readable layer exposes data-state on the host (idle | pending | undone | committed) and a global registry window.__puraUndo (a Map keyed by undo-id with remaining, run/undo/commit, and .pending()), letting agents enumerate and resolve any undo flow on the page.",
  "attributes": [
    {
      "name": "timeout",
      "type": "number",
      "default": "5000",
      "desc": "Undo window in ms. Values <= 0 keep the snackbar pinned (sticky), resolved only via undo()/commit()."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Action performed.",
      "desc": "Message text when there's no content in the default slot."
    },
    {
      "name": "undo-label",
      "type": "string",
      "default": "Undo",
      "desc": "Text for the undo button."
    }
  ],
  "events": [
    "action",
    "undo",
    "commit"
  ],
  "slots": [
    "trigger",
    "default"
  ],
  "demoHTML": "<pura-undo id=\"demo-undo\" timeout=\"5000\" undo-label=\"Undo\">\n  Conversation archived.\n  <button slot=\"trigger\" type=\"button\">Archive conversation</button>\n</pura-undo>\n\n<script type=\"module\">\n  const u = document.getElementById(\"demo-undo\");\n  u.addEventListener(\"action\", () => console.log(\"action started\"));\n  u.addEventListener(\"undo\", () => console.log(\"undone in time\"));\n  u.addEventListener(\"commit\", () => console.log(\"committed, effect applied\"));\n</script>",
  "usage": "<pura-undo id=\"demo-undo\" timeout=\"5000\" undo-label=\"Undo\">\n  Conversation archived.\n  <button slot=\"trigger\" type=\"button\">Archive conversation</button>\n</pura-undo>\n\n<script type=\"module\">\n  const u = document.getElementById(\"demo-undo\");\n  u.addEventListener(\"action\", () => console.log(\"action started\"));\n  u.addEventListener(\"undo\", () => console.log(\"undone in time\"));\n  u.addEventListener(\"commit\", () => console.log(\"committed, effect applied\"));\n</script>",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "upload",
  "title": "Upload",
  "category": "Form",
  "blurb": "A managed file uploader with a drag-and-drop surface, file list with progress bars, status indicators, and an optional uploader function property.",
  "description": "A managed file uploader with a drag-and-drop surface, file list with progress bars, status indicators, and an optional uploader function property.",
  "attributes": [
    {
      "name": "multiple",
      "type": "boolean",
      "default": "",
      "desc": "Allow multiple file selection"
    },
    {
      "name": "accept",
      "type": "string",
      "default": "",
      "desc": "Accepted file types (passed to native input)"
    },
    {
      "name": "auto",
      "type": "boolean",
      "default": "",
      "desc": "Automatically start upload on file selection"
    },
    {
      "name": "max-size",
      "type": "string",
      "default": "",
      "desc": "Maximum file size in bytes"
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "",
      "desc": "Disables the drop zone and file input"
    }
  ],
  "events": [
    "change",
    "upload",
    "remove"
  ],
  "slots": [],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "video",
  "title": "Video",
  "category": "Display",
  "blurb": "Styled wrapper around native video with a custom control bar including play/pause, seek, volume, mute, and fullscreen.",
  "description": "Styled wrapper around native video with a custom control bar including play/pause, seek, volume, mute, and fullscreen.",
  "attributes": [
    {
      "name": "src",
      "type": "string",
      "default": "",
      "desc": "Video URL"
    },
    {
      "name": "poster",
      "type": "string",
      "default": "",
      "desc": "Poster image URL"
    },
    {
      "name": "autoplay",
      "type": "boolean",
      "default": "",
      "desc": "Start playing on load (implies muted in most browsers)"
    },
    {
      "name": "loop",
      "type": "boolean",
      "default": "",
      "desc": "Loop playback"
    },
    {
      "name": "muted",
      "type": "boolean",
      "default": "",
      "desc": "Start muted"
    },
    {
      "name": "controls",
      "type": "boolean",
      "default": "",
      "desc": "Show browser native controls instead of the custom bar"
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "view-transition",
  "title": "View Transition",
  "category": "Utility",
  "blurb": "Morph between UI states with the native View Transitions API: wrap a region, call transition(updateFn) to cross-fade or magic-move, degrades gracefully.",
  "description": "`<pura-view-transition>` morphs between UI states using the native View Transitions API with zero dependencies. Call `transition(updateFn)` to run any DOM update wrapped in a cross-fade; children that share a `view-transition-name` across the before and after states \"magic move\" between their positions. Set the `name` attribute to make the host itself a shared element across page-level transitions. When the API is unavailable or reduced motion is on, the update runs instantly and the same `pura-view-transition` events still fire, so callers stay API-agnostic. It registers in `window.__puraViewTransitions` for agent enumeration.",
  "attributes": [
    {
      "name": "name",
      "type": "string",
      "default": "",
      "desc": "Applies view-transition-name to the host so it morphs as a single shared element across page-level transitions."
    }
  ],
  "events": [
    "pura-view-transition"
  ],
  "slots": [
    "default"
  ],
  "demoHTML": "<div style=\"display: grid; gap: var(--pura-space-3, 0.75rem); justify-items: start;\">\n  <pura-button id=\"vt-shuffle\" size=\"sm\">Shuffle</pura-button>\n  <pura-view-transition id=\"vt-demo\" style=\"display: flex; gap: 0.5rem; flex-wrap: wrap;\">\n    <span style=\"view-transition-name: vt-a; padding: 0.5rem 0.8rem; background: #2563eb; color: #fff; border-radius: 8px; font: 14px system-ui;\">A</span>\n    <span style=\"view-transition-name: vt-b; padding: 0.5rem 0.8rem; background: #16a34a; color: #fff; border-radius: 8px; font: 14px system-ui;\">B</span>\n    <span style=\"view-transition-name: vt-c; padding: 0.5rem 0.8rem; background: #d97706; color: #fff; border-radius: 8px; font: 14px system-ui;\">C</span>\n  </pura-view-transition>\n</div>\n<script>\n  (() => {\n    const vt = document.querySelector('#vt-demo');\n    document.querySelector('#vt-shuffle').addEventListener('click', () => {\n      vt.transition(() => {\n        const kids = [...vt.children];\n        vt.append(kids[Math.floor(Math.random() * kids.length)]);\n      });\n    });\n  })();\n</script>",
  "usage": "<pura-view-transition id=\"region\">\n  <span style=\"view-transition-name: card-a\">A</span>\n  <span style=\"view-transition-name: card-b\">B</span>\n</pura-view-transition>\n\n<script>\n  const region = document.querySelector('#region');\n  // The reorder morphs: each named child slides to its new position.\n  region.transition(() => region.append(region.firstElementChild));\n</script>",
  "animation": true,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "virtual-list",
  "title": "Virtual List",
  "category": "Display",
  "blurb": "Windowed rendering for large datasets that only renders the visible slice plus overscan, using a tall spacer and translateY offset for scroll fidelity.",
  "description": "Windowed rendering for large datasets that only renders the visible slice plus overscan, using a tall spacer and translateY offset for scroll fidelity.",
  "attributes": [
    {
      "name": "item-height",
      "type": "string",
      "default": "32",
      "desc": "Fixed row height in px (windowing assumes uniform rows)"
    },
    {
      "name": "height",
      "type": "string",
      "default": "18rem",
      "desc": "Viewport height"
    }
  ],
  "events": [
    "visiblechange"
  ],
  "slots": [],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "visually-hidden",
  "title": "Visually Hidden",
  "category": "Primitives",
  "blurb": "Accessibility utility that visually hides slotted content while keeping it available to screen readers using the standard sr-only clip pattern.",
  "description": "Accessibility utility that visually hides slotted content while keeping it available to screen readers using the standard sr-only clip pattern.",
  "attributes": [
    {
      "name": "focusable",
      "type": "boolean",
      "default": "",
      "desc": "When set, content becomes visible when it or anything inside has focus"
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
},
{
  "slug": "watermark",
  "title": "Watermark",
  "category": "Display",
  "blurb": "Overlays a repeating, non-interactive watermark of tiled text or image over slotted content.",
  "description": "Overlays a repeating, non-interactive watermark of tiled text or image over slotted content.",
  "attributes": [
    {
      "name": "text",
      "type": "string",
      "default": "",
      "desc": "Watermark text (tiled)"
    },
    {
      "name": "image",
      "type": "string",
      "default": "",
      "desc": "Image URL tiled instead of text"
    },
    {
      "name": "opacity",
      "type": "string",
      "default": "0.08",
      "desc": "Overlay opacity"
    },
    {
      "name": "rotate",
      "type": "string",
      "default": "-22",
      "desc": "Tile rotation in degrees"
    },
    {
      "name": "gap",
      "type": "string",
      "default": "120",
      "desc": "Pixel spacing between tiles"
    },
    {
      "name": "font-size",
      "type": "string",
      "default": "16",
      "desc": "Text size in px"
    }
  ],
  "events": [],
  "slots": [
    "default"
  ],
  "demoHTML": "",
  "usage": "",
  "animation": false,
  "relatedComponents": [],
  "relatedBlocks": []
}
];
