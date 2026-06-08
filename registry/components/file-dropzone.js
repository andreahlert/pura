// <pura-file-dropzone> — drag-and-drop file upload area. A dashed-bordered
// region that highlights on dragover, opens the native file dialog on click or
// Enter/Space, and lists selected files as chips (name + human size) each with
// a remove button. Built on a hidden native <input type="file"> for reliable
// keyboard, accessibility, and OS file picking.
//
// Attributes:
//   accept    — forwarded to the file input (e.g. "image/*,.pdf")
//   multiple  — allow selecting more than one file
//   disabled  — block interaction
//   label     — visible prompt text (default: "Drop files here or click to browse")
//
// Sub-element: <pura-file-chip> — one selected file (part of the agent-native
// machine-readable layer; reflects data-* file metadata).
//
// Events:
//   change { files }  — bubbles whenever the selection changes (add or remove);
//                       detail.files is an Array of File objects.
//
// Parts: root, prompt, icon, label, hint, list, chip, chip-name, chip-size, chip-remove
//
// Agent-native layer: stable data-* attributes on host and each chip, ARIA
// roles/labels, and a global window.__puraFileDropzones registry mapping each
// instance id to a live { files } snapshot for machine inspection.
import { PuraElement, define } from "../base.js";
import meta from "./file-dropzone.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";
import { fileChipTemplate, fileDropzoneTemplate } from "./file-dropzone.template.js";

registerMessages({
  "file-dropzone.label": {
    en: "Drop files here or click to browse",
    "pt-BR": "Solte arquivos aqui ou clique para procurar",
    fr: "Déposez des fichiers ici ou cliquez pour parcourir",
    de: "Dateien hier ablegen oder zum Durchsuchen klicken",
    it: "Trascina i file qui o fai clic per sfogliare",
  },
  "file-dropzone.remove": {
    en: "Remove file",
    "pt-BR": "Remover arquivo",
    fr: "Supprimer le fichier",
    de: "Datei entfernen",
    it: "Rimuovi file",
  },
  "file-dropzone.selected": {
    en: "Selected files",
    "pt-BR": "Arquivos selecionados",
    fr: "Fichiers sélectionnés",
    de: "Ausgewählte Dateien",
    it: "File selezionati",
  },
  "file-dropzone.one": {
    en: "1 file selected",
    "pt-BR": "1 arquivo selecionado",
    fr: "1 fichier sélectionné",
    de: "1 Datei ausgewählt",
    it: "1 file selezionato",
  },
  "file-dropzone.many": {
    en: "{n} files selected",
    "pt-BR": "{n} arquivos selecionados",
    fr: "{n} fichiers sélectionnés",
    de: "{n} Dateien ausgewählt",
    it: "{n} file selezionati",
  },
});

let uid = 0;

// Global registry so agents/tooling can inspect live dropzone state without
// reaching into shadow roots. Keyed by the stable per-instance id.
const REGISTRY = (window.__puraFileDropzones ||= {});

function formatSize(bytes) {
  if (!Number.isFinite(bytes) || bytes < 0) return "";
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / Math.pow(1024, i);
  const rounded = i === 0 ? value : Math.round(value * 10) / 10;
  return `${rounded} ${units[i]}`;
}

class PuraFileChip extends PuraElement {
  static observedAttributes = ["name", "size", "removable"];

  connectedCallback() {
    this.setAttribute("role", "listitem");
    const { html, css } = fileChipTemplate(this);
    this.render(html, css);
    this._sync();
    this.$(".rm").addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("remove", { bubbles: true }));
    });
    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this._i18nOff?.();
  }

  attributeChangedCallback() {
    if (this.shadowRoot && this.shadowRoot.childNodes.length) this._sync();
  }

  _applyI18n() {
    this.$(".rm")?.setAttribute("aria-label", t("file-dropzone.remove"));
  }

  _sync() {
    const nameEl = this.$(".name");
    const sizeEl = this.$(".size");
    const rm = this.$(".rm");
    if (nameEl) nameEl.textContent = this.getAttribute("name") || "";
    if (sizeEl) {
      const raw = Number(this.getAttribute("size"));
      sizeEl.textContent = this.hasAttribute("size") ? formatSize(raw) : "";
    }
    if (rm) {
      const removable = !this.hasAttribute("removable") || this.getAttribute("removable") !== "false";
      rm.style.display = removable ? "" : "none";
    }
  }
}

class PuraFileDropzone extends PuraElement {
  static observedAttributes = ["accept", "multiple", "disabled", "label"];

  connectedCallback() {
    this._id = `pura-fdz-${uid++}`;
    this.setAttribute("data-pura-file-dropzone", this._id);
    // Backing store for the current selection. The native input's FileList is
    // read-only, so we keep our own array and rebuild a DataTransfer when needed.
    this._files = this._files || [];

    const { html, css } = fileDropzoneTemplate(this);
    this.render(html, css);

    this._zone = this.$(".zone");
    this._input = this.$(".native");
    this._list = this.$(".list");
    this._hint = this.$(".hint");

    this._open = () => {
      if (this.hasAttribute("disabled")) return;
      this._input.click();
    };

    this._zone.addEventListener("click", (e) => {
      // Ignore clicks that originated from the native input bubbling back up.
      if (e.target === this._input) return;
      this._open();
    });
    this._zone.addEventListener("keydown", (e) => {
      if (this.hasAttribute("disabled")) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this._open();
      }
    });

    this._input.addEventListener("change", () => {
      this._addFiles([...this._input.files]);
    });

    // Drag-and-drop highlight + drop handling. dragenter/dragover must
    // preventDefault to opt into being a drop target.
    let depth = 0;
    const onEnter = (e) => {
      e.preventDefault();
      if (this.hasAttribute("disabled")) return;
      depth++;
      this._zone.classList.add("over");
      this._zone.setAttribute("data-pura-dragover", "true");
    };
    const onOver = (e) => { e.preventDefault(); };
    const onLeave = () => {
      depth = Math.max(0, depth - 1);
      if (depth === 0) {
        this._zone.classList.remove("over");
        this._zone.removeAttribute("data-pura-dragover");
      }
    };
    const onDrop = (e) => {
      e.preventDefault();
      depth = 0;
      this._zone.classList.remove("over");
      this._zone.removeAttribute("data-pura-dragover");
      if (this.hasAttribute("disabled")) return;
      const dropped = e.dataTransfer ? [...e.dataTransfer.files] : [];
      if (dropped.length) this._addFiles(dropped);
    };
    this._zone.addEventListener("dragenter", onEnter);
    this._zone.addEventListener("dragover", onOver);
    this._zone.addEventListener("dragleave", onLeave);
    this._zone.addEventListener("drop", onDrop);

    REGISTRY[this._id] = { el: this, get files() { return [...this._owner._files]; }, _owner: this };
    this._renderList();
    this._syncRegistry();
    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    delete REGISTRY[this._id];
    this._i18nOff?.();
  }

  _applyI18n() {
    // Only the i18n-owned nodes; never re-render (that would drop chip state).
    if (this._list) this._list.setAttribute("aria-label", t("file-dropzone.selected"));
    if (!this.hasAttribute("label")) {
      const label = t("file-dropzone.label");
      if (this._zone) this._zone.setAttribute("aria-label", label);
      const lbl = this.$(".label");
      if (lbl) lbl.textContent = label;
    }
    this._updateHint();
  }

  _updateHint() {
    if (!this._hint) return;
    const n = this._files.length;
    this._hint.textContent = n === 0 ? "" : n === 1 ? t("file-dropzone.one") : t("file-dropzone.many", { n });
  }

  attributeChangedCallback(name, _old, val) {
    if (!this._input) return;
    if (name === "accept") {
      if (val === null) this._input.removeAttribute("accept");
      else this._input.setAttribute("accept", val);
    } else if (name === "multiple") {
      this._input.multiple = this.hasAttribute("multiple");
      // Drop extra files if multiple was turned off.
      if (!this._input.multiple && this._files.length > 1) {
        this._files = this._files.slice(0, 1);
        this._renderList();
        this._emit();
      }
    } else if (name === "disabled") {
      const disabled = this.hasAttribute("disabled");
      this._input.disabled = disabled;
      if (this._zone) {
        this._zone.setAttribute("aria-disabled", disabled ? "true" : "false");
        this._zone.setAttribute("tabindex", disabled ? "-1" : "0");
      }
    } else if (name === "label" && this._zone) {
      const label = val || t("file-dropzone.label");
      this._zone.setAttribute("aria-label", label);
      const lbl = this.$(".label");
      if (lbl) lbl.textContent = label;
    }
  }

  _addFiles(incoming) {
    if (!incoming || !incoming.length) return;
    if (this.hasAttribute("multiple")) {
      // De-dupe by name+size+lastModified to avoid obvious duplicates.
      const key = (f) => `${f.name}:${f.size}:${f.lastModified}`;
      const seen = new Set(this._files.map(key));
      for (const f of incoming) {
        if (!seen.has(key(f))) { this._files.push(f); seen.add(key(f)); }
      }
    } else {
      this._files = [incoming[0]];
    }
    this._renderList();
    this._emit();
    // Clear the native input so re-selecting the same file fires change again.
    try { this._input.value = ""; } catch (_) { /* ignore */ }
  }

  _removeAt(index) {
    if (index < 0 || index >= this._files.length) return;
    this._files.splice(index, 1);
    this._renderList();
    this._emit();
  }

  _renderList() {
    if (!this._list) return;
    this._list.textContent = "";
    for (let i = 0; i < this._files.length; i++) {
      const f = this._files[i];
      const chip = document.createElement("pura-file-chip");
      chip.setAttribute("part", "chip");
      chip.setAttribute("name", f.name);
      chip.setAttribute("size", String(f.size));
      chip.setAttribute("data-pura-file-name", f.name);
      chip.setAttribute("data-pura-file-size", String(f.size));
      chip.setAttribute("data-pura-file-type", f.type || "");
      chip.setAttribute("data-pura-file-index", String(i));
      if (this.hasAttribute("disabled")) chip.setAttribute("removable", "false");
      chip.addEventListener("remove", () => {
        const idx = Number(chip.getAttribute("data-pura-file-index"));
        this._removeAt(idx);
      });
      this._list.appendChild(chip);
    }
    this._updateHint();
    this.setAttribute("data-pura-file-count", String(this._files.length));
  }

  _emit() {
    this._syncRegistry();
    this.dispatchEvent(new CustomEvent("change", { detail: { files: [...this._files] }, bubbles: true }));
  }

  _syncRegistry() {
    if (REGISTRY[this._id]) REGISTRY[this._id]._owner = this;
    this.setAttribute("data-pura-file-count", String(this._files.length));
  }

  // Public API ---------------------------------------------------------------
  get files() { return [...this._files]; }
  clear() {
    if (!this._files.length) return;
    this._files = [];
    this._renderList();
    this._emit();
  }
}



define("pura-file-chip", PuraFileChip);
define("pura-file-dropzone", PuraFileDropzone, meta);
export { PuraFileDropzone, PuraFileChip };
