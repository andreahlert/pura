// pura-upload, a managed file uploader. A drop/select surface plus a list of
// selected files, each with name, size, a progress bar, a status, and a remove
// button. Attributes: multiple, accept, auto (bool), max-size (bytes), disabled.
//
// Uploader contract: set the `uploader` property to a function
//   (file, { onProgress }) => Promise
// onProgress takes a number 0..100. A resolved promise means done, a rejection
// means error. If `uploader` is unset, progress is simulated to 100 so the
// component is demoable without a server.
//
// Public API: files getter (Array of File), start()/startAll(), clear().
// Events: change (selection changed), upload (a file finished, detail { file }),
// remove (detail { file }). Parts: dropzone, list, item, progress, remove.
import { PuraElement, define } from "../base.js";
import meta from "./upload.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";
import { uploadTemplate } from "./upload.template.js";

registerMessages({
  "upload.label": {
    en: "Drop files here or click to browse",
    "pt-BR": "Solte arquivos aqui ou clique para procurar",
    fr: "Déposez des fichiers ici ou cliquez pour parcourir",
    de: "Dateien hier ablegen oder zum Durchsuchen klicken",
    it: "Trascina i file qui o fai clic per sfogliare",
  },
  "upload.remove": {
    en: "Remove file",
    "pt-BR": "Remover arquivo",
    fr: "Supprimer le fichier",
    de: "Datei entfernen",
    it: "Rimuovi file",
  },
  "upload.pending": {
    en: "Pending", "pt-BR": "Pendente", fr: "En attente", de: "Ausstehend", it: "In attesa",
  },
  "upload.uploading": {
    en: "Uploading", "pt-BR": "Enviando", fr: "Envoi", de: "Wird hochgeladen", it: "Caricamento",
  },
  "upload.done": {
    en: "Done", "pt-BR": "Concluído", fr: "Terminé", de: "Fertig", it: "Completato",
  },
  "upload.error": {
    en: "Error", "pt-BR": "Erro", fr: "Erreur", de: "Fehler", it: "Errore",
  },
  "upload.selected": {
    en: "Selected files",
    "pt-BR": "Arquivos selecionados",
    fr: "Fichiers sélectionnés",
    de: "Ausgewählte Dateien",
    it: "File selezionati",
  },
  "upload.too-big": {
    en: "File too large", "pt-BR": "Arquivo muito grande", fr: "Fichier trop volumineux",
    de: "Datei zu groß", it: "File troppo grande",
  },
});

function formatSize(bytes) {
  if (!Number.isFinite(bytes) || bytes < 0) return "";
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / Math.pow(1024, i);
  const rounded = i === 0 ? value : Math.round(value * 10) / 10;
  return `${rounded} ${units[i]}`;
}

class PuraUpload extends PuraElement {
  static observedAttributes = ["accept", "multiple", "disabled", "auto", "max-size"];

  connectedCallback() {
    // Backing model: array of entries { file, status, progress, error, els }.
    this._items = this._items || [];
    this._uploader = this._uploader || null;

    const multiple = this.hasAttribute("multiple");
    const disabled = this.hasAttribute("disabled");
    const label = t("upload.label");

    const { html, css } = uploadTemplate(this);
    this.render(html, css);

    this._zone = this.$(".zone");
    this._input = this.$(".native");
    this._list = this.$(".list");
    this._label = this.$(".label");

    this._open = () => {
      if (this.hasAttribute("disabled")) return;
      this._input.click();
    };

    this._zone.addEventListener("click", (e) => {
      if (e.target === this._input) return;
      this._open();
    });
    this._zone.addEventListener("keydown", (e) => {
      if (this.hasAttribute("disabled")) return;
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); this._open(); }
    });
    this._input.addEventListener("change", () => {
      this._addFiles([...this._input.files]);
      try { this._input.value = ""; } catch (_) {}
    });

    // Drag and drop with a depth counter so nested dragleave does not flicker.
    let depth = 0;
    this._zone.addEventListener("dragenter", (e) => {
      e.preventDefault();
      if (this.hasAttribute("disabled")) return;
      depth++;
      this._zone.classList.add("over");
    });
    this._zone.addEventListener("dragover", (e) => e.preventDefault());
    this._zone.addEventListener("dragleave", () => {
      depth = Math.max(0, depth - 1);
      if (depth === 0) this._zone.classList.remove("over");
    });
    this._zone.addEventListener("drop", (e) => {
      e.preventDefault();
      depth = 0;
      this._zone.classList.remove("over");
      if (this.hasAttribute("disabled")) return;
      const dropped = e.dataTransfer ? [...e.dataTransfer.files] : [];
      if (dropped.length) this._addFiles(dropped);
    });

    // Rebuild item nodes from any pre-existing model (e.g. re-connect).
    this._renderAll();
    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this._i18nOff?.();
  }

  attributeChangedCallback(name, _old, val) {
    if (!this._input) return;
    if (name === "accept") {
      if (val === null) this._input.removeAttribute("accept");
      else this._input.setAttribute("accept", val);
    } else if (name === "multiple") {
      this._input.multiple = this.hasAttribute("multiple");
    } else if (name === "disabled") {
      const disabled = this.hasAttribute("disabled");
      this._input.disabled = disabled;
      this._zone.setAttribute("aria-disabled", disabled ? "true" : "false");
      this._zone.setAttribute("tabindex", disabled ? "-1" : "0");
    }
  }

  // Property: the host sets this to perform real uploads.
  get uploader() { return this._uploader; }
  set uploader(fn) { this._uploader = typeof fn === "function" ? fn : null; }

  _applyI18n() {
    const label = t("upload.label");
    if (this._zone) this._zone.setAttribute("aria-label", label);
    if (this._label) this._label.textContent = label;
    if (this._list) this._list.setAttribute("aria-label", t("upload.selected"));
    // Refresh status text on existing items by reference.
    for (const it of this._items) this._refreshStatus(it);
  }

  _maxSize() {
    const n = Number(this.getAttribute("max-size"));
    return Number.isFinite(n) && n > 0 ? n : Infinity;
  }

  _addFiles(incoming) {
    if (!incoming || !incoming.length) return;
    const max = this._maxSize();
    if (!this.hasAttribute("multiple")) {
      // Single mode replaces the current selection.
      this._items = [];
      this._list.textContent = "";
      incoming = incoming.slice(0, 1);
    } else {
      // De-dupe against the existing selection.
      const key = (f) => `${f.name}:${f.size}:${f.lastModified}`;
      const seen = new Set(this._items.map((it) => key(it.file)));
      incoming = incoming.filter((f) => !seen.has(key(f)));
    }
    for (const file of incoming) {
      const tooBig = file.size > max;
      const item = {
        file,
        status: tooBig ? "error" : "pending",
        progress: 0,
        error: tooBig ? t("upload.too-big") : "",
        els: null,
      };
      this._items.push(item);
      this._appendItem(item);
    }
    this._emitChange();
    if (this.hasAttribute("auto")) this.startAll();
  }

  _appendItem(item) {
    const li = document.createElement("li");
    li.className = "item";
    li.setAttribute("part", "item");
    li.setAttribute("role", "listitem");
    li.innerHTML =
      `<div class="head">
         <svg class="doc" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3v5h5M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
         <span class="name"></span>
         <span class="size"></span>
         <span class="status"></span>
         <button class="rm" part="remove" type="button" aria-label="${t("upload.remove")}">
           <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
         </button>
       </div>
       <div class="track" part="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100">
         <div class="fill"></div>
       </div>`;
    const els = {
      li,
      name: li.querySelector(".name"),
      size: li.querySelector(".size"),
      status: li.querySelector(".status"),
      track: li.querySelector(".track"),
      fill: li.querySelector(".fill"),
      rm: li.querySelector(".rm"),
    };
    item.els = els;
    els.name.textContent = item.file.name;
    els.size.textContent = formatSize(item.file.size);
    els.rm.addEventListener("click", () => this._removeItem(item));
    this._setProgress(item, item.progress);
    this._refreshStatus(item);
    this._list.appendChild(li);
  }

  _renderAll() {
    if (!this._list) return;
    this._list.textContent = "";
    for (const item of this._items) this._appendItem(item);
  }

  _removeItem(item) {
    const idx = this._items.indexOf(item);
    if (idx < 0) return;
    this._items.splice(idx, 1);
    item.els?.li.remove();
    this.dispatchEvent(new CustomEvent("remove", { detail: { file: item.file }, bubbles: true }));
    this._emitChange();
  }

  _setProgress(item, pct) {
    item.progress = Math.max(0, Math.min(100, pct));
    if (item.els) {
      item.els.fill.style.width = item.progress + "%";
      item.els.track.setAttribute("aria-valuenow", String(Math.round(item.progress)));
    }
  }

  _refreshStatus(item) {
    if (!item.els) return;
    const { status } = item;
    item.els.status.textContent = status === "error" && item.error ? item.error : t("upload." + status);
    item.els.li.setAttribute("data-status", status);
  }

  // Public start, kicks off any pending (not error/done/uploading) item.
  startAll() {
    for (const item of this._items) this.start(item.file);
  }

  // Start a single file by File reference (or all if omitted).
  start(file) {
    if (file === undefined) return this.startAll();
    const item = this._items.find((it) => it.file === file);
    if (!item || item.status !== "pending") return;
    this._upload(item);
  }

  _upload(item) {
    item.status = "uploading";
    this._refreshStatus(item);
    const onProgress = (pct) => this._setProgress(item, pct);

    const job = this._uploader
      ? Promise.resolve().then(() => this._uploader(item.file, { onProgress }))
      : this._simulate(onProgress);

    job.then(() => {
      this._setProgress(item, 100);
      item.status = "done";
      this._refreshStatus(item);
      this.dispatchEvent(new CustomEvent("upload", { detail: { file: item.file }, bubbles: true }));
    }).catch((err) => {
      item.status = "error";
      item.error = (err && err.message) || t("upload.error");
      this._refreshStatus(item);
    });
  }

  // Demo fallback, ramps progress to 100 over a short interval.
  _simulate(onProgress) {
    return new Promise((resolve) => {
      let p = 0;
      const tick = () => {
        p += 8 + Math.random() * 14;
        if (p >= 100) { onProgress(100); resolve(); return; }
        onProgress(p);
        setTimeout(tick, 120);
      };
      setTimeout(tick, 120);
    });
  }

  _emitChange() {
    this.setAttribute("data-pura-file-count", String(this._items.length));
    this.dispatchEvent(new CustomEvent("change", { detail: { files: this.files }, bubbles: true }));
  }

  // Public API.
  get files() { return this._items.map((it) => it.file); }
  clear() {
    if (!this._items.length) return;
    this._items = [];
    if (this._list) this._list.textContent = "";
    this._emitChange();
  }
}


define("pura-upload", PuraUpload, meta);
export { PuraUpload };
