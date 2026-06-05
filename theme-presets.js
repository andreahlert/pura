// pura theme presets — each overrides --pura-* tokens. Shape:
// { id, name, group, vars: { base?, light?, dark? } } with { "--pura-token": "value" }.
// "default" uses pura's built-in tokens. 57 presets (6 hand-tuned + 51 brand-generated).
export const PRESETS = [
  {
    "id": "default",
    "name": "Pura",
    "group": "Base",
    "vars": {}
  },
  {
    "id": "vercel",
    "name": "Vercel",
    "group": "Tech",
    "vars": {
      "base": {
        "--pura-radius-sm": "0.3rem",
        "--pura-radius": "0.45rem",
        "--pura-radius-lg": "0.6rem"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#000000",
        "--pura-primary": "#000000",
        "--pura-primary-hover": "#1a1a1a",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#0070f3",
        "--pura-border": "#eaeaea",
        "--pura-border-strong": "#dcdcdc",
        "--pura-subtle": "#fafafa",
        "--pura-muted": "#666666"
      },
      "dark": {
        "--pura-bg": "#000000",
        "--pura-fg": "#ffffff",
        "--pura-primary": "#ffffff",
        "--pura-primary-hover": "#e6e6e6",
        "--pura-primary-fg": "#000000",
        "--pura-accent": "#3291ff",
        "--pura-border": "#1a1a1a",
        "--pura-border-strong": "#333333",
        "--pura-subtle": "#111111",
        "--pura-muted": "#888888"
      }
    }
  },
  {
    "id": "linear",
    "name": "Linear",
    "group": "Tech",
    "vars": {
      "base": {
        "--pura-radius": "0.5rem",
        "--pura-radius-lg": "0.75rem"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#0d0e10",
        "--pura-primary": "#5e6ad2",
        "--pura-primary-hover": "#525ec4",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#5e6ad2",
        "--pura-border": "#e6e6e8",
        "--pura-border-strong": "#d4d4d8",
        "--pura-subtle": "#f7f8f8",
        "--pura-muted": "#6b6f76"
      },
      "dark": {
        "--pura-bg": "#08090a",
        "--pura-fg": "#f7f8f8",
        "--pura-primary": "#7c84e0",
        "--pura-primary-hover": "#8b92e6",
        "--pura-primary-fg": "#0d0e10",
        "--pura-accent": "#7c84e0",
        "--pura-border": "#1c1d21",
        "--pura-border-strong": "#2a2b30",
        "--pura-subtle": "#101113",
        "--pura-muted": "#8a8f98"
      }
    }
  },
  {
    "id": "stripe",
    "name": "Stripe",
    "group": "Tech",
    "vars": {
      "base": {
        "--pura-radius": "0.6rem",
        "--pura-radius-lg": "0.9rem"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#0a2540",
        "--pura-primary": "#635bff",
        "--pura-primary-hover": "#564fd8",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#635bff",
        "--pura-border": "#e6e9ee",
        "--pura-border-strong": "#d5dbe3",
        "--pura-subtle": "#f6f9fc",
        "--pura-muted": "#5f6b7c"
      },
      "dark": {
        "--pura-bg": "#0a2540",
        "--pura-fg": "#f6f9fc",
        "--pura-primary": "#7a73ff",
        "--pura-primary-hover": "#897fff",
        "--pura-primary-fg": "#0a2540",
        "--pura-accent": "#8b85ff",
        "--pura-border": "#1c3a57",
        "--pura-border-strong": "#2a4a6a",
        "--pura-subtle": "#0e2c4a",
        "--pura-muted": "#8fa3b8"
      }
    }
  },
  {
    "id": "spotify",
    "name": "Spotify",
    "group": "Media",
    "vars": {
      "base": {
        "--pura-radius": "0.75rem",
        "--pura-radius-full": "999px"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#121212",
        "--pura-primary": "#1db954",
        "--pura-primary-hover": "#1aa34a",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#1db954",
        "--pura-border": "#e8e8e8",
        "--pura-border-strong": "#d6d6d6",
        "--pura-subtle": "#f6f6f6",
        "--pura-muted": "#6a6a6a"
      },
      "dark": {
        "--pura-bg": "#121212",
        "--pura-fg": "#ffffff",
        "--pura-primary": "#1db954",
        "--pura-primary-hover": "#1ed760",
        "--pura-primary-fg": "#000000",
        "--pura-accent": "#1ed760",
        "--pura-border": "#282828",
        "--pura-border-strong": "#3a3a3a",
        "--pura-subtle": "#1a1a1a",
        "--pura-muted": "#b3b3b3"
      }
    }
  },
  {
    "id": "supabase",
    "name": "Supabase",
    "group": "Tech",
    "vars": {
      "base": {
        "--pura-radius": "0.4rem"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#171717",
        "--pura-primary": "#3ecf8e",
        "--pura-primary-hover": "#34b87d",
        "--pura-primary-fg": "#072d1d",
        "--pura-accent": "#3ecf8e",
        "--pura-border": "#ededed",
        "--pura-border-strong": "#dcdcdc",
        "--pura-subtle": "#f8f8f8",
        "--pura-muted": "#666666"
      },
      "dark": {
        "--pura-bg": "#1c1c1c",
        "--pura-fg": "#ededed",
        "--pura-primary": "#3ecf8e",
        "--pura-primary-hover": "#4ade9d",
        "--pura-primary-fg": "#072d1d",
        "--pura-accent": "#3ecf8e",
        "--pura-border": "#2e2e2e",
        "--pura-border-strong": "#404040",
        "--pura-subtle": "#242424",
        "--pura-muted": "#a0a0a0"
      }
    }
  },
  {
    "id": "github",
    "name": "GitHub",
    "group": "Dev",
    "vars": {
      "base": {
        "--pura-radius-sm": "4px",
        "--pura-radius": "6px",
        "--pura-radius-lg": "12px",
        "--pura-font": "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif",
        "--pura-font-mono": "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#1f2328",
        "--pura-muted": "#59636e",
        "--pura-muted-fg": "#656d76",
        "--pura-subtle": "#f6f8fa",
        "--pura-subtle-hover": "#eaeef2",
        "--pura-border": "#d1d9e0",
        "--pura-border-strong": "#afb8c1",
        "--pura-primary": "#0969da",
        "--pura-primary-hover": "#0860ca",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#0969da"
      },
      "dark": {
        "--pura-bg": "#0d1117",
        "--pura-fg": "#e6edf3",
        "--pura-muted": "#9198a1",
        "--pura-muted-fg": "#8b949e",
        "--pura-subtle": "#161b22",
        "--pura-subtle-hover": "#21262d",
        "--pura-border": "#30363d",
        "--pura-border-strong": "#3d444d",
        "--pura-primary": "#1f6feb",
        "--pura-primary-hover": "#388bfd",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#58a6ff"
      }
    }
  },
  {
    "id": "gitlab",
    "name": "GitLab",
    "group": "Dev",
    "vars": {
      "base": {
        "--pura-radius-sm": "4px",
        "--pura-radius": "8px",
        "--pura-radius-lg": "12px",
        "--pura-font": "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif",
        "--pura-font-mono": "\"SFMono-Regular\", \"Menlo\", \"Consolas\", \"Liberation Mono\", monospace"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#1f1326",
        "--pura-muted": "#6a5f73",
        "--pura-muted-fg": "#4a3f55",
        "--pura-subtle": "#f7f4fb",
        "--pura-subtle-hover": "#efe9f6",
        "--pura-border": "#e1d9ec",
        "--pura-border-strong": "#c5b8d9",
        "--pura-primary": "#6e49cb",
        "--pura-primary-hover": "#5b39b3",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#fc6d26"
      },
      "dark": {
        "--pura-bg": "#1b1525",
        "--pura-fg": "#ece8f0",
        "--pura-muted": "#a99fb5",
        "--pura-muted-fg": "#cfc6d9",
        "--pura-subtle": "#251d33",
        "--pura-subtle-hover": "#2f2540",
        "--pura-border": "#3a2f4d",
        "--pura-border-strong": "#52456b",
        "--pura-primary": "#8259cc",
        "--pura-primary-hover": "#9670da",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#fc6d26"
      }
    }
  },
  {
    "id": "figma",
    "name": "Figma",
    "group": "Design",
    "vars": {
      "base": {
        "--pura-radius-sm": "5px",
        "--pura-radius": "8px",
        "--pura-radius-lg": "13px",
        "--pura-font": "Inter, 'Helvetica Neue', Helvetica, Arial, system-ui, sans-serif",
        "--pura-font-mono": "'Roboto Mono', 'SF Mono', Menlo, Consolas, monospace"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#1a1a2e",
        "--pura-muted": "#67677e",
        "--pura-muted-fg": "#52526a",
        "--pura-subtle": "#f5f4fb",
        "--pura-subtle-hover": "#ece9f9",
        "--pura-border": "#e4e2ef",
        "--pura-border-strong": "#cbc7dd",
        "--pura-primary": "#7b2fef",
        "--pura-primary-hover": "#6a25d6",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#1abcfe"
      },
      "dark": {
        "--pura-bg": "#16161f",
        "--pura-fg": "#ececf4",
        "--pura-muted": "#9b9bb5",
        "--pura-muted-fg": "#b8b8cc",
        "--pura-subtle": "#20202c",
        "--pura-subtle-hover": "#2a2a38",
        "--pura-border": "#2e2e3d",
        "--pura-border-strong": "#43435a",
        "--pura-primary": "#a772ff",
        "--pura-primary-hover": "#b990ff",
        "--pura-primary-fg": "#15151e",
        "--pura-accent": "#1abcfe"
      }
    }
  },
  {
    "id": "notion",
    "name": "Notion",
    "group": "Productivity",
    "vars": {
      "base": {
        "--pura-radius-sm": "3px",
        "--pura-radius": "4px",
        "--pura-radius-lg": "6px",
        "--pura-font": "ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
        "--pura-font-mono": "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#191919",
        "--pura-muted": "#f7f6f3",
        "--pura-muted-fg": "#706f6c",
        "--pura-subtle": "#f1f0ee",
        "--pura-subtle-hover": "#e9e8e4",
        "--pura-border": "#e6e4df",
        "--pura-border-strong": "#d3d1cb",
        "--pura-primary": "#191919",
        "--pura-primary-hover": "#2f2f2f",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#2383e2"
      },
      "dark": {
        "--pura-bg": "#1f1f1f",
        "--pura-fg": "#e6e6e3",
        "--pura-muted": "#2a2a2a",
        "--pura-muted-fg": "#9b9b98",
        "--pura-subtle": "#2f2f2f",
        "--pura-subtle-hover": "#373737",
        "--pura-border": "#3a3a3a",
        "--pura-border-strong": "#4d4d4d",
        "--pura-primary": "#e6e6e3",
        "--pura-primary-hover": "#ffffff",
        "--pura-primary-fg": "#1f1f1f",
        "--pura-accent": "#529cca"
      }
    }
  },
  {
    "id": "slack",
    "name": "Slack",
    "group": "Productivity",
    "vars": {
      "base": {
        "--pura-radius-sm": "6px",
        "--pura-radius": "8px",
        "--pura-radius-lg": "12px",
        "--pura-font": "'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif",
        "--pura-font-mono": "'Monaco', 'Menlo', 'Consolas', 'Courier New', monospace"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#1d1c1d",
        "--pura-muted": "#5e5b5e",
        "--pura-muted-fg": "#616061",
        "--pura-subtle": "#f8f8f8",
        "--pura-subtle-hover": "#efedef",
        "--pura-border": "#e2dfe2",
        "--pura-border-strong": "#c9c4c9",
        "--pura-primary": "#4a154b",
        "--pura-primary-hover": "#611f64",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#007a5a"
      },
      "dark": {
        "--pura-bg": "#1a1d21",
        "--pura-fg": "#e8e8e8",
        "--pura-muted": "#9a9a9a",
        "--pura-muted-fg": "#ababad",
        "--pura-subtle": "#222529",
        "--pura-subtle-hover": "#2c2f33",
        "--pura-border": "#35373b",
        "--pura-border-strong": "#4a4d52",
        "--pura-primary": "#7c3a7e",
        "--pura-primary-hover": "#8e468f",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#2eb67d"
      }
    }
  },
  {
    "id": "discord",
    "name": "Discord",
    "group": "Social",
    "vars": {
      "base": {
        "--pura-radius-sm": "4px",
        "--pura-radius": "8px",
        "--pura-radius-lg": "16px",
        "--pura-font": "'gg sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
        "--pura-font-mono": "Consolas, 'Andale Mono WT', 'Andale Mono', 'Courier New', monospace"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#2e3338",
        "--pura-muted": "#5c6068",
        "--pura-muted-fg": "#4e5058",
        "--pura-subtle": "#f2f3f5",
        "--pura-subtle-hover": "#e3e5e8",
        "--pura-border": "#e0e1e5",
        "--pura-border-strong": "#c7c9ce",
        "--pura-primary": "#5865f2",
        "--pura-primary-hover": "#4752c4",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#5865f2"
      },
      "dark": {
        "--pura-bg": "#313338",
        "--pura-fg": "#dbdee1",
        "--pura-muted": "#b5bac1",
        "--pura-muted-fg": "#949ba4",
        "--pura-subtle": "#2b2d31",
        "--pura-subtle-hover": "#35373c",
        "--pura-border": "#3f4147",
        "--pura-border-strong": "#4e5058",
        "--pura-primary": "#5865f2",
        "--pura-primary-hover": "#4752c4",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#5865f2"
      }
    }
  },
  {
    "id": "twitch",
    "name": "Twitch",
    "group": "Media",
    "vars": {
      "base": {
        "--pura-radius-sm": "0.25rem",
        "--pura-radius": "0.375rem",
        "--pura-radius-lg": "0.625rem",
        "--pura-font": "'Inter', 'Roobert', 'Helvetica Neue', Helvetica, Arial, sans-serif",
        "--pura-font-mono": "'Roboto Mono', 'SFMono-Regular', Menlo, Consolas, monospace"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#0e0e10",
        "--pura-muted": "#53535f",
        "--pura-muted-fg": "#6b6b78",
        "--pura-subtle": "#f7f7f8",
        "--pura-subtle-hover": "#efeff1",
        "--pura-border": "#e6e6e8",
        "--pura-border-strong": "#d3d3d9",
        "--pura-primary": "#772ce8",
        "--pura-primary-hover": "#6520d4",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#9146ff"
      },
      "dark": {
        "--pura-bg": "#0e0e10",
        "--pura-fg": "#efeff1",
        "--pura-muted": "#adadb8",
        "--pura-muted-fg": "#898995",
        "--pura-subtle": "#18181b",
        "--pura-subtle-hover": "#1f1f23",
        "--pura-border": "#2a2a2e",
        "--pura-border-strong": "#3a3a40",
        "--pura-primary": "#9146ff",
        "--pura-primary-hover": "#a970ff",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#bf94ff"
      }
    }
  },
  {
    "id": "youtube",
    "name": "YouTube",
    "group": "Media",
    "vars": {
      "base": {
        "--pura-radius-sm": "0.25rem",
        "--pura-radius": "0.5rem",
        "--pura-radius-lg": "0.75rem",
        "--pura-font": "Roboto, 'Segoe UI', Arial, system-ui, sans-serif",
        "--pura-font-mono": "'Roboto Mono', 'SFMono-Regular', Menlo, Consolas, monospace"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#0f0f0f",
        "--pura-muted": "#606060",
        "--pura-muted-fg": "#606060",
        "--pura-subtle": "#f9f9f9",
        "--pura-subtle-hover": "#f0f0f0",
        "--pura-border": "#e5e5e5",
        "--pura-border-strong": "#d0d0d0",
        "--pura-primary": "#cc0000",
        "--pura-primary-hover": "#b30000",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#ff0000"
      },
      "dark": {
        "--pura-bg": "#0f0f0f",
        "--pura-fg": "#f1f1f1",
        "--pura-muted": "#aaaaaa",
        "--pura-muted-fg": "#aaaaaa",
        "--pura-subtle": "#212121",
        "--pura-subtle-hover": "#2c2c2c",
        "--pura-border": "#303030",
        "--pura-border-strong": "#3f3f3f",
        "--pura-primary": "#cc0000",
        "--pura-primary-hover": "#e60000",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#ff0000"
      }
    }
  },
  {
    "id": "google",
    "name": "Google",
    "group": "Tech",
    "vars": {
      "base": {
        "--pura-radius-sm": "4px",
        "--pura-radius": "8px",
        "--pura-radius-lg": "16px",
        "--pura-font": "Roboto, \"Helvetica Neue\", Arial, \"Segoe UI\", system-ui, sans-serif",
        "--pura-font-mono": "\"Roboto Mono\", \"Source Code Pro\", \"SFMono-Regular\", Menlo, Consolas, monospace"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#202124",
        "--pura-muted": "#f1f3f4",
        "--pura-muted-fg": "#5f6368",
        "--pura-subtle": "#f8f9fa",
        "--pura-subtle-hover": "#f1f3f4",
        "--pura-border": "#dadce0",
        "--pura-border-strong": "#bdc1c6",
        "--pura-primary": "#1669d6",
        "--pura-primary-hover": "#1257b8",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#34a853"
      },
      "dark": {
        "--pura-bg": "#202124",
        "--pura-fg": "#e8eaed",
        "--pura-muted": "#2a2b2e",
        "--pura-muted-fg": "#9aa0a6",
        "--pura-subtle": "#28292c",
        "--pura-subtle-hover": "#35363a",
        "--pura-border": "#3c4043",
        "--pura-border-strong": "#5f6368",
        "--pura-primary": "#8ab4f8",
        "--pura-primary-hover": "#aecbfa",
        "--pura-primary-fg": "#202124",
        "--pura-accent": "#81c995"
      }
    }
  },
  {
    "id": "meta",
    "name": "Meta",
    "group": "Tech",
    "vars": {
      "base": {
        "--pura-radius-sm": "0.4rem",
        "--pura-radius": "0.6rem",
        "--pura-radius-lg": "0.85rem",
        "--pura-font": "\"Segoe UI\", system-ui, -apple-system, Roboto, Helvetica, Arial, sans-serif",
        "--pura-font-mono": "ui-monospace, \"SF Mono\", \"Cascadia Code\", Menlo, Consolas, monospace"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#0a1a2f",
        "--pura-muted": "#5b6675",
        "--pura-muted-fg": "#3d4655",
        "--pura-subtle": "#f0f3f8",
        "--pura-subtle-hover": "#e6ebf3",
        "--pura-border": "#dde3ec",
        "--pura-border-strong": "#c7d0dc",
        "--pura-primary": "#0668e1",
        "--pura-primary-hover": "#0558c2",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#0668e1"
      },
      "dark": {
        "--pura-bg": "#0a1420",
        "--pura-fg": "#f0f4fa",
        "--pura-muted": "#8b96a8",
        "--pura-muted-fg": "#c2cad6",
        "--pura-subtle": "#13202f",
        "--pura-subtle-hover": "#1b2c3f",
        "--pura-border": "#1f2f42",
        "--pura-border-strong": "#2e4258",
        "--pura-primary": "#0668e1",
        "--pura-primary-hover": "#1877f2",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#3b95ff"
      }
    }
  },
  {
    "id": "instagram",
    "name": "Instagram",
    "group": "Social",
    "vars": {
      "base": {
        "--pura-radius-sm": "0.5rem",
        "--pura-radius": "0.75rem",
        "--pura-radius-lg": "1.25rem",
        "--pura-font": "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        "--pura-font-mono": "ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#1a1015",
        "--pura-muted": "#7a4a60",
        "--pura-muted-fg": "#5a3445",
        "--pura-subtle": "#fbe9f1",
        "--pura-subtle-hover": "#f6d8e6",
        "--pura-border": "#f0d3df",
        "--pura-border-strong": "#e0a9c0",
        "--pura-primary": "#c81f5e",
        "--pura-primary-hover": "#b01851",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#f56040"
      },
      "dark": {
        "--pura-bg": "#120a0f",
        "--pura-fg": "#fbe9f1",
        "--pura-muted": "#d99bb8",
        "--pura-muted-fg": "#e7bdd0",
        "--pura-subtle": "#241620",
        "--pura-subtle-hover": "#321e2c",
        "--pura-border": "#3a2330",
        "--pura-border-strong": "#5c3a4c",
        "--pura-primary": "#d12862",
        "--pura-primary-hover": "#e1306c",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#fcb045"
      }
    }
  },
  {
    "id": "x-twitter",
    "name": "X",
    "group": "Social",
    "vars": {
      "base": {
        "--pura-radius-sm": "8px",
        "--pura-radius": "16px",
        "--pura-radius-lg": "9999px",
        "--pura-font": "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        "--pura-font-mono": "ui-monospace, 'SF Mono', SFMono-Regular, Menlo, Consolas, monospace"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#0f1419",
        "--pura-muted": "#536471",
        "--pura-muted-fg": "#536471",
        "--pura-subtle": "#f7f9f9",
        "--pura-subtle-hover": "#eff3f4",
        "--pura-border": "#eff3f4",
        "--pura-border-strong": "#cfd9de",
        "--pura-primary": "#0f1419",
        "--pura-primary-hover": "#272c30",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#1d9bf0"
      },
      "dark": {
        "--pura-bg": "#000000",
        "--pura-fg": "#e7e9ea",
        "--pura-muted": "#8b98a5",
        "--pura-muted-fg": "#8b98a5",
        "--pura-subtle": "#16181c",
        "--pura-subtle-hover": "#1d1f23",
        "--pura-border": "#2f3336",
        "--pura-border-strong": "#3e4144",
        "--pura-primary": "#ffffff",
        "--pura-primary-hover": "#e6e6e6",
        "--pura-primary-fg": "#000000",
        "--pura-accent": "#1d9bf0"
      }
    }
  },
  {
    "id": "openai",
    "name": "OpenAI",
    "group": "AI",
    "vars": {
      "base": {
        "--pura-radius-sm": "4px",
        "--pura-radius": "6px",
        "--pura-radius-lg": "12px",
        "--pura-font": "\"Helvetica Neue\", Helvetica, Arial, ui-sans-serif, system-ui, sans-serif",
        "--pura-font-mono": "ui-monospace, \"SFMono-Regular\", \"Menlo\", \"Consolas\", monospace"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#0d0d0d",
        "--pura-muted": "#565869",
        "--pura-muted-fg": "#8e8ea0",
        "--pura-subtle": "#f7f7f8",
        "--pura-subtle-hover": "#ececf1",
        "--pura-border": "#e5e5e5",
        "--pura-border-strong": "#c5c5d2",
        "--pura-primary": "#0a8060",
        "--pura-primary-hover": "#097355",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#10a37f"
      },
      "dark": {
        "--pura-bg": "#0d0d0d",
        "--pura-fg": "#ececf1",
        "--pura-muted": "#9a9aa5",
        "--pura-muted-fg": "#8e8ea0",
        "--pura-subtle": "#1a1a1a",
        "--pura-subtle-hover": "#272729",
        "--pura-border": "#2a2a2c",
        "--pura-border-strong": "#3e3e42",
        "--pura-primary": "#0a8060",
        "--pura-primary-hover": "#0b8d6a",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#10a37f"
      }
    }
  },
  {
    "id": "anthropic",
    "name": "Anthropic",
    "group": "AI",
    "vars": {
      "base": {
        "--pura-radius-sm": "4px",
        "--pura-radius": "8px",
        "--pura-radius-lg": "14px",
        "--pura-font": "Georgia, 'Times New Roman', 'Iowan Old Style', serif",
        "--pura-font-mono": "'SFMono-Regular', Menlo, Consolas, 'Liberation Mono', monospace"
      },
      "light": {
        "--pura-bg": "#f0eee6",
        "--pura-fg": "#2b2722",
        "--pura-muted": "#6b6357",
        "--pura-muted-fg": "#857c6e",
        "--pura-subtle": "#e7e4da",
        "--pura-subtle-hover": "#dedacd",
        "--pura-border": "#ddd8cc",
        "--pura-border-strong": "#c8c2b2",
        "--pura-primary": "#bd5436",
        "--pura-primary-hover": "#a8482d",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#d97757"
      },
      "dark": {
        "--pura-bg": "#1f1d1a",
        "--pura-fg": "#ece9e2",
        "--pura-muted": "#a39b8d",
        "--pura-muted-fg": "#8a8275",
        "--pura-subtle": "#2a2825",
        "--pura-subtle-hover": "#34312d",
        "--pura-border": "#3a3631",
        "--pura-border-strong": "#4d4842",
        "--pura-primary": "#d97757",
        "--pura-primary-hover": "#e2876a",
        "--pura-primary-fg": "#1f1d1a",
        "--pura-accent": "#e2876a"
      }
    }
  },
  {
    "id": "raycast",
    "name": "Raycast",
    "group": "Dev",
    "vars": {
      "base": {
        "--pura-radius-sm": "6px",
        "--pura-radius": "10px",
        "--pura-radius-lg": "16px",
        "--pura-font": "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        "--pura-font-mono": "'SF Mono', 'JetBrains Mono', 'Fira Code', Menlo, Consolas, monospace"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#16181a",
        "--pura-muted": "#5c6166",
        "--pura-muted-fg": "#6b7177",
        "--pura-subtle": "#f4f5f6",
        "--pura-subtle-hover": "#e9eaec",
        "--pura-border": "#e0e2e4",
        "--pura-border-strong": "#c5c8cb",
        "--pura-primary": "#e03e3e",
        "--pura-primary-hover": "#c92f2f",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#ff6363"
      },
      "dark": {
        "--pura-bg": "#0b0d0e",
        "--pura-fg": "#f2f3f4",
        "--pura-muted": "#9aa0a6",
        "--pura-muted-fg": "#7e858b",
        "--pura-subtle": "#17191b",
        "--pura-subtle-hover": "#212427",
        "--pura-border": "#26292c",
        "--pura-border-strong": "#3a3e42",
        "--pura-primary": "#ff6363",
        "--pura-primary-hover": "#ff7a7a",
        "--pura-primary-fg": "#1a0707",
        "--pura-accent": "#ff6363"
      }
    }
  },
  {
    "id": "framer",
    "name": "Framer",
    "group": "Design",
    "vars": {
      "base": {
        "--pura-radius-sm": "6px",
        "--pura-radius": "10px",
        "--pura-radius-lg": "16px",
        "--pura-font": "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        "--pura-font-mono": "'SFMono-Regular', ui-monospace, Menlo, Consolas, 'Liberation Mono', monospace"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#0a0a0a",
        "--pura-muted": "#56565e",
        "--pura-muted-fg": "#56565e",
        "--pura-subtle": "#f4f5f7",
        "--pura-subtle-hover": "#e9eaee",
        "--pura-border": "#e3e4e8",
        "--pura-border-strong": "#c8cad0",
        "--pura-primary": "#0066ff",
        "--pura-primary-hover": "#0099ff",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#0099ff"
      },
      "dark": {
        "--pura-bg": "#0a0a0c",
        "--pura-fg": "#f5f6f8",
        "--pura-muted": "#9a9ca6",
        "--pura-muted-fg": "#9a9ca6",
        "--pura-subtle": "#16171a",
        "--pura-subtle-hover": "#202126",
        "--pura-border": "#26272d",
        "--pura-border-strong": "#3a3c44",
        "--pura-primary": "#0066ff",
        "--pura-primary-hover": "#0099ff",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#38aaff"
      }
    }
  },
  {
    "id": "tailwind",
    "name": "Tailwind",
    "group": "Dev",
    "vars": {
      "base": {
        "--pura-radius-sm": "0.25rem",
        "--pura-radius": "0.5rem",
        "--pura-radius-lg": "0.75rem",
        "--pura-font": "Inter, system-ui, -apple-system, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif",
        "--pura-font-mono": "ui-monospace, \"SF Mono\", \"Cascadia Code\", \"JetBrains Mono\", Menlo, Consolas, monospace"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#0f172a",
        "--pura-muted": "#475569",
        "--pura-muted-fg": "#64748b",
        "--pura-subtle": "#f1f5f9",
        "--pura-subtle-hover": "#e2e8f0",
        "--pura-border": "#e2e8f0",
        "--pura-border-strong": "#cbd5e1",
        "--pura-primary": "#0ea5e9",
        "--pura-primary-hover": "#38bdf8",
        "--pura-primary-fg": "#0f172a",
        "--pura-accent": "#0d9488"
      },
      "dark": {
        "--pura-bg": "#020617",
        "--pura-fg": "#e2e8f0",
        "--pura-muted": "#94a3b8",
        "--pura-muted-fg": "#94a3b8",
        "--pura-subtle": "#1e293b",
        "--pura-subtle-hover": "#334155",
        "--pura-border": "#1e293b",
        "--pura-border-strong": "#334155",
        "--pura-primary": "#38bdf8",
        "--pura-primary-hover": "#7dd3fc",
        "--pura-primary-fg": "#082f49",
        "--pura-accent": "#2dd4bf"
      }
    }
  },
  {
    "id": "netlify",
    "name": "Netlify",
    "group": "Dev",
    "vars": {
      "base": {
        "--pura-radius-sm": "6px",
        "--pura-radius": "10px",
        "--pura-radius-lg": "16px",
        "--pura-font": "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        "--pura-font-mono": "ui-monospace, 'SFMono-Regular', Menlo, Monaco, Consolas, 'Liberation Mono', monospace"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#0e1e25",
        "--pura-muted": "#5a7572",
        "--pura-muted-fg": "#5a7572",
        "--pura-subtle": "#eef4f3",
        "--pura-subtle-hover": "#e1ecea",
        "--pura-border": "#d4e0de",
        "--pura-border-strong": "#b3c5c2",
        "--pura-primary": "#00ad9f",
        "--pura-primary-hover": "#048478",
        "--pura-primary-fg": "#04201d",
        "--pura-accent": "#00ad9f"
      },
      "dark": {
        "--pura-bg": "#0e1e25",
        "--pura-fg": "#e8f0ee",
        "--pura-muted": "#8aa6a3",
        "--pura-muted-fg": "#a8c0bd",
        "--pura-subtle": "#16323a",
        "--pura-subtle-hover": "#1d3d45",
        "--pura-border": "#27424a",
        "--pura-border-strong": "#3a5a62",
        "--pura-primary": "#00ad9f",
        "--pura-primary-hover": "#2ec4b6",
        "--pura-primary-fg": "#04201d",
        "--pura-accent": "#2ec4b6"
      }
    }
  },
  {
    "id": "railway",
    "name": "Railway",
    "group": "Dev",
    "vars": {
      "base": {
        "--pura-radius-sm": "4px",
        "--pura-radius": "8px",
        "--pura-radius-lg": "12px",
        "--pura-font": "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        "--pura-font-mono": "ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, Monaco, 'Cascadia Mono', Consolas, monospace"
      },
      "light": {
        "--pura-bg": "#FBFAFE",
        "--pura-fg": "#1A1726",
        "--pura-muted": "#6B6580",
        "--pura-muted-fg": "#4A4560",
        "--pura-subtle": "#F2F0F9",
        "--pura-subtle-hover": "#EAE7F4",
        "--pura-border": "#E4E0F0",
        "--pura-border-strong": "#CFC9E2",
        "--pura-primary": "#7C3AED",
        "--pura-primary-hover": "#6D28D9",
        "--pura-primary-fg": "#FFFFFF",
        "--pura-accent": "#8B5CF6"
      },
      "dark": {
        "--pura-bg": "#13111C",
        "--pura-fg": "#ECEAF5",
        "--pura-muted": "#9B96B0",
        "--pura-muted-fg": "#B8B3CA",
        "--pura-subtle": "#1C1A28",
        "--pura-subtle-hover": "#242131",
        "--pura-border": "#2A2740",
        "--pura-border-strong": "#3B3756",
        "--pura-primary": "#774BEB",
        "--pura-primary-hover": "#8B5CF6",
        "--pura-primary-fg": "#FFFFFF",
        "--pura-accent": "#A78BFA"
      }
    }
  },
  {
    "id": "planetscale",
    "name": "PlanetScale",
    "group": "Dev",
    "vars": {
      "base": {
        "--pura-radius-sm": "4px",
        "--pura-radius": "6px",
        "--pura-radius-lg": "10px",
        "--pura-font": "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
        "--pura-font-mono": "ui-monospace, 'SFMono-Regular', Menlo, Consolas, 'Liberation Mono', monospace"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#111111",
        "--pura-muted": "#595959",
        "--pura-muted-fg": "#737373",
        "--pura-subtle": "#f5f5f5",
        "--pura-subtle-hover": "#ebebeb",
        "--pura-border": "#e2e2e2",
        "--pura-border-strong": "#c7c7c7",
        "--pura-primary": "#000000",
        "--pura-primary-hover": "#1f1f1f",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#2563eb"
      },
      "dark": {
        "--pura-bg": "#0a0a0a",
        "--pura-fg": "#ededed",
        "--pura-muted": "#9e9e9e",
        "--pura-muted-fg": "#828282",
        "--pura-subtle": "#1a1a1a",
        "--pura-subtle-hover": "#242424",
        "--pura-border": "#2e2e2e",
        "--pura-border-strong": "#454545",
        "--pura-primary": "#fafafa",
        "--pura-primary-hover": "#e0e0e0",
        "--pura-primary-fg": "#0a0a0a",
        "--pura-accent": "#3b82f6"
      }
    }
  },
  {
    "id": "clerk",
    "name": "Clerk",
    "group": "Dev",
    "vars": {
      "base": {
        "--pura-radius-sm": "6px",
        "--pura-radius": "10px",
        "--pura-radius-lg": "16px",
        "--pura-font": "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        "--pura-font-mono": "ui-monospace, 'SF Mono', SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#1a1523",
        "--pura-muted": "#5e5772",
        "--pura-muted-fg": "#5e5772",
        "--pura-subtle": "#f6f5fa",
        "--pura-subtle-hover": "#eeecf5",
        "--pura-border": "#e7e5ee",
        "--pura-border-strong": "#d3cfe0",
        "--pura-primary": "#6c47ff",
        "--pura-primary-hover": "#5a36e0",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#6c47ff"
      },
      "dark": {
        "--pura-bg": "#161519",
        "--pura-fg": "#ededf2",
        "--pura-muted": "#a5a2ad",
        "--pura-muted-fg": "#a5a2ad",
        "--pura-subtle": "#201f25",
        "--pura-subtle-hover": "#2a2832",
        "--pura-border": "#2e2c36",
        "--pura-border-strong": "#403d4b",
        "--pura-primary": "#6c47ff",
        "--pura-primary-hover": "#7c5cff",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#9379ff"
      }
    }
  },
  {
    "id": "resend",
    "name": "Resend",
    "group": "Dev",
    "vars": {
      "base": {
        "--pura-radius-sm": "4px",
        "--pura-radius": "6px",
        "--pura-radius-lg": "10px",
        "--pura-font": "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif",
        "--pura-font-mono": "ui-monospace, SFMono-Regular, \"SF Mono\", Menlo, Consolas, \"Liberation Mono\", monospace"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#0a0a0a",
        "--pura-muted": "#646464",
        "--pura-muted-fg": "#8f8f8f",
        "--pura-subtle": "#f5f5f5",
        "--pura-subtle-hover": "#ebebeb",
        "--pura-border": "#e4e4e4",
        "--pura-border-strong": "#cfcfcf",
        "--pura-primary": "#0a0a0a",
        "--pura-primary-hover": "#262626",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#0a0a0a"
      },
      "dark": {
        "--pura-bg": "#0a0a0a",
        "--pura-fg": "#ededed",
        "--pura-muted": "#a1a1a1",
        "--pura-muted-fg": "#7a7a7a",
        "--pura-subtle": "#161616",
        "--pura-subtle-hover": "#1f1f1f",
        "--pura-border": "#2a2a2a",
        "--pura-border-strong": "#3d3d3d",
        "--pura-primary": "#ffffff",
        "--pura-primary-hover": "#e4e4e4",
        "--pura-primary-fg": "#0a0a0a",
        "--pura-accent": "#ffffff"
      }
    }
  },
  {
    "id": "cloudflare",
    "name": "Cloudflare",
    "group": "Tech",
    "vars": {
      "base": {
        "--pura-radius-sm": "4px",
        "--pura-radius": "8px",
        "--pura-radius-lg": "14px",
        "--pura-font": "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
        "--pura-font-mono": "'SFMono-Regular', Menlo, Consolas, 'Liberation Mono', monospace"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#1d1f20",
        "--pura-muted": "#5b5f66",
        "--pura-muted-fg": "#6b7077",
        "--pura-subtle": "#f6f7f8",
        "--pura-subtle-hover": "#eceef0",
        "--pura-border": "#dfe2e5",
        "--pura-border-strong": "#c2c7cd",
        "--pura-primary": "#f6821f",
        "--pura-primary-hover": "#e0700f",
        "--pura-primary-fg": "#1d1f20",
        "--pura-accent": "#faad3f"
      },
      "dark": {
        "--pura-bg": "#16181a",
        "--pura-fg": "#f4f5f6",
        "--pura-muted": "#a0a6ad",
        "--pura-muted-fg": "#8b9198",
        "--pura-subtle": "#202326",
        "--pura-subtle-hover": "#2a2e32",
        "--pura-border": "#32363b",
        "--pura-border-strong": "#474c52",
        "--pura-primary": "#f6821f",
        "--pura-primary-hover": "#faad3f",
        "--pura-primary-fg": "#16181a",
        "--pura-accent": "#faad3f"
      }
    }
  },
  {
    "id": "apple",
    "name": "Apple",
    "group": "Tech",
    "vars": {
      "base": {
        "--pura-radius-sm": "8px",
        "--pura-radius": "12px",
        "--pura-radius-lg": "18px",
        "--pura-font": "-apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"Helvetica Neue\", Helvetica, Arial, sans-serif",
        "--pura-font-mono": "\"SF Mono\", ui-monospace, Menlo, Monaco, \"Cascadia Mono\", \"Roboto Mono\", monospace"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#1d1d1f",
        "--pura-muted": "#6e6e73",
        "--pura-muted-fg": "#1d1d1f",
        "--pura-subtle": "#f5f5f7",
        "--pura-subtle-hover": "#ebebed",
        "--pura-border": "#d2d2d7",
        "--pura-border-strong": "#aeaeb2",
        "--pura-primary": "#0071e3",
        "--pura-primary-hover": "#0077ed",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#0071e3"
      },
      "dark": {
        "--pura-bg": "#000000",
        "--pura-fg": "#f5f5f7",
        "--pura-muted": "#98989d",
        "--pura-muted-fg": "#f5f5f7",
        "--pura-subtle": "#1c1c1e",
        "--pura-subtle-hover": "#2c2c2e",
        "--pura-border": "#38383a",
        "--pura-border-strong": "#545458",
        "--pura-primary": "#0071e3",
        "--pura-primary-hover": "#0a84ff",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#0a84ff"
      }
    }
  },
  {
    "id": "microsoft",
    "name": "Microsoft",
    "group": "Tech",
    "vars": {
      "base": {
        "--pura-radius-sm": "2px",
        "--pura-radius": "4px",
        "--pura-radius-lg": "8px",
        "--pura-font": "'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, system-ui, 'Helvetica Neue', Arial, sans-serif",
        "--pura-font-mono": "'Cascadia Code', 'Cascadia Mono', Consolas, 'Courier New', monospace"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#1b1a19",
        "--pura-muted": "#605e5c",
        "--pura-muted-fg": "#323130",
        "--pura-subtle": "#f3f2f1",
        "--pura-subtle-hover": "#edebe9",
        "--pura-border": "#d2d0ce",
        "--pura-border-strong": "#a19f9d",
        "--pura-primary": "#0067b8",
        "--pura-primary-hover": "#005a9e",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#0078d4"
      },
      "dark": {
        "--pura-bg": "#1b1a19",
        "--pura-fg": "#f3f2f1",
        "--pura-muted": "#a19f9d",
        "--pura-muted-fg": "#c8c6c4",
        "--pura-subtle": "#292827",
        "--pura-subtle-hover": "#323130",
        "--pura-border": "#3b3a39",
        "--pura-border-strong": "#605e5c",
        "--pura-primary": "#0078d4",
        "--pura-primary-hover": "#106ebe",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#50e6ff"
      }
    }
  },
  {
    "id": "aws",
    "name": "AWS",
    "group": "Tech",
    "vars": {
      "base": {
        "--pura-radius-sm": "3px",
        "--pura-radius": "5px",
        "--pura-radius-lg": "8px",
        "--pura-font": "\"Amazon Ember\", \"Helvetica Neue\", Arial, system-ui, sans-serif",
        "--pura-font-mono": "\"SFMono-Regular\", \"Roboto Mono\", Menlo, Consolas, monospace"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#16202e",
        "--pura-muted": "#5a6b7b",
        "--pura-muted-fg": "#3d4a59",
        "--pura-subtle": "#f1f3f5",
        "--pura-subtle-hover": "#e6eaee",
        "--pura-border": "#d5dbe1",
        "--pura-border-strong": "#aeb8c2",
        "--pura-primary": "#ff9900",
        "--pura-primary-hover": "#ec8b00",
        "--pura-primary-fg": "#232f3e",
        "--pura-accent": "#d97706"
      },
      "dark": {
        "--pura-bg": "#161e2d",
        "--pura-fg": "#e8eaed",
        "--pura-muted": "#9aa7b4",
        "--pura-muted-fg": "#b6c0cb",
        "--pura-subtle": "#232f3e",
        "--pura-subtle-hover": "#2c3a4b",
        "--pura-border": "#37475a",
        "--pura-border-strong": "#4d6072",
        "--pura-primary": "#ff9900",
        "--pura-primary-hover": "#ffad33",
        "--pura-primary-fg": "#232f3e",
        "--pura-accent": "#ff9900"
      }
    }
  },
  {
    "id": "salesforce",
    "name": "Salesforce",
    "group": "Tech",
    "vars": {
      "base": {
        "--pura-radius-sm": "0.25rem",
        "--pura-radius": "0.375rem",
        "--pura-radius-lg": "0.625rem",
        "--pura-font": "'Helvetica Neue', Helvetica, Arial, system-ui, -apple-system, 'Segoe UI', sans-serif",
        "--pura-font-mono": "'SFMono-Regular', Menlo, Consolas, 'Liberation Mono', monospace"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#0b1b2b",
        "--pura-muted": "#5a6b7b",
        "--pura-muted-fg": "#5a6b7b",
        "--pura-subtle": "#f3f7fb",
        "--pura-subtle-hover": "#e6eff7",
        "--pura-border": "#d4e0ec",
        "--pura-border-strong": "#aebfd0",
        "--pura-primary": "#0176d3",
        "--pura-primary-hover": "#014486",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#00a1e0"
      },
      "dark": {
        "--pura-bg": "#071622",
        "--pura-fg": "#e6f4fb",
        "--pura-muted": "#8fa9bc",
        "--pura-muted-fg": "#8fa9bc",
        "--pura-subtle": "#0e2433",
        "--pura-subtle-hover": "#163349",
        "--pura-border": "#1e3850",
        "--pura-border-strong": "#345168",
        "--pura-primary": "#0176d3",
        "--pura-primary-hover": "#1b96ff",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#57b4ff"
      }
    }
  },
  {
    "id": "atlassian",
    "name": "Atlassian",
    "group": "Productivity",
    "vars": {
      "base": {
        "--pura-radius-sm": "3px",
        "--pura-radius": "6px",
        "--pura-radius-lg": "8px",
        "--pura-font": "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        "--pura-font-mono": "ui-monospace, 'SFMono-Regular', 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace"
      },
      "light": {
        "--pura-bg": "#FFFFFF",
        "--pura-fg": "#172B4D",
        "--pura-muted": "#626F86",
        "--pura-muted-fg": "#44546F",
        "--pura-subtle": "#F1F2F4",
        "--pura-subtle-hover": "#DCDFE4",
        "--pura-border": "#DFE1E6",
        "--pura-border-strong": "#8590A2",
        "--pura-primary": "#0052CC",
        "--pura-primary-hover": "#0747A6",
        "--pura-primary-fg": "#FFFFFF",
        "--pura-accent": "#1868DB"
      },
      "dark": {
        "--pura-bg": "#1D2125",
        "--pura-fg": "#C7D1DB",
        "--pura-muted": "#9FADBC",
        "--pura-muted-fg": "#9FADBC",
        "--pura-subtle": "#282E33",
        "--pura-subtle-hover": "#2C333A",
        "--pura-border": "#38414A",
        "--pura-border-strong": "#596773",
        "--pura-primary": "#579DFF",
        "--pura-primary-hover": "#85B8FF",
        "--pura-primary-fg": "#1D2125",
        "--pura-accent": "#388BFF"
      }
    }
  },
  {
    "id": "dropbox",
    "name": "Dropbox",
    "group": "Productivity",
    "vars": {
      "base": {
        "--pura-radius-sm": "4px",
        "--pura-radius": "6px",
        "--pura-radius-lg": "10px",
        "--pura-font": "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
        "--pura-font-mono": "ui-monospace, 'SF Mono', Menlo, Consolas, monospace"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#1a2533",
        "--pura-muted": "#5b6b7d",
        "--pura-muted-fg": "#5b6b7d",
        "--pura-subtle": "#f2f6fb",
        "--pura-subtle-hover": "#e6eef8",
        "--pura-border": "#d8e0ea",
        "--pura-border-strong": "#b9c5d4",
        "--pura-primary": "#0061ff",
        "--pura-primary-hover": "#0050d4",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#0061ff"
      },
      "dark": {
        "--pura-bg": "#0d1117",
        "--pura-fg": "#e8edf2",
        "--pura-muted": "#8b9bb0",
        "--pura-muted-fg": "#8b9bb0",
        "--pura-subtle": "#161c26",
        "--pura-subtle-hover": "#1e2632",
        "--pura-border": "#26303d",
        "--pura-border-strong": "#3a4756",
        "--pura-primary": "#3d84ff",
        "--pura-primary-hover": "#5b95ff",
        "--pura-primary-fg": "#0d1117",
        "--pura-accent": "#3d84ff"
      }
    }
  },
  {
    "id": "airbnb",
    "name": "Airbnb",
    "group": "Travel",
    "vars": {
      "base": {
        "--pura-radius-sm": "8px",
        "--pura-radius": "12px",
        "--pura-radius-lg": "16px",
        "--pura-font": "'Circular', 'Helvetica Neue', 'Segoe UI', Roboto, Arial, sans-serif",
        "--pura-font-mono": "'SFMono-Regular', 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#222222",
        "--pura-muted": "#6a6a6a",
        "--pura-muted-fg": "#6a6a6a",
        "--pura-subtle": "#f7f7f7",
        "--pura-subtle-hover": "#ebebeb",
        "--pura-border": "#dddddd",
        "--pura-border-strong": "#b0b0b0",
        "--pura-primary": "#e31c5f",
        "--pura-primary-hover": "#c81e58",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#ff385c"
      },
      "dark": {
        "--pura-bg": "#181113",
        "--pura-fg": "#ededed",
        "--pura-muted": "#a5a0a1",
        "--pura-muted-fg": "#a5a0a1",
        "--pura-subtle": "#241a1c",
        "--pura-subtle-hover": "#2f2326",
        "--pura-border": "#3a2e31",
        "--pura-border-strong": "#574649",
        "--pura-primary": "#e31c5f",
        "--pura-primary-hover": "#c81e58",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#ff385c"
      }
    }
  },
  {
    "id": "uber",
    "name": "Uber",
    "group": "Travel",
    "vars": {
      "base": {
        "--pura-radius-sm": "2px",
        "--pura-radius": "4px",
        "--pura-radius-lg": "8px",
        "--pura-font": "\"Helvetica Neue\", Helvetica, Arial, sans-serif",
        "--pura-font-mono": "ui-monospace, \"SF Mono\", Menlo, Consolas, monospace"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#000000",
        "--pura-muted": "#6b6b6b",
        "--pura-muted-fg": "#545454",
        "--pura-subtle": "#f6f6f6",
        "--pura-subtle-hover": "#ececec",
        "--pura-border": "#e2e2e2",
        "--pura-border-strong": "#c7c7c7",
        "--pura-primary": "#000000",
        "--pura-primary-hover": "#1f1f1f",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#000000"
      },
      "dark": {
        "--pura-bg": "#000000",
        "--pura-fg": "#ffffff",
        "--pura-muted": "#a0a0a0",
        "--pura-muted-fg": "#b8b8b8",
        "--pura-subtle": "#151515",
        "--pura-subtle-hover": "#222222",
        "--pura-border": "#2e2e2e",
        "--pura-border-strong": "#4a4a4a",
        "--pura-primary": "#ffffff",
        "--pura-primary-hover": "#e6e6e6",
        "--pura-primary-fg": "#000000",
        "--pura-accent": "#ffffff"
      }
    }
  },
  {
    "id": "coinbase",
    "name": "Coinbase",
    "group": "Finance",
    "vars": {
      "base": {
        "--pura-radius-sm": "6px",
        "--pura-radius": "10px",
        "--pura-radius-lg": "16px",
        "--pura-font": "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        "--pura-font-mono": "ui-monospace, 'SF Mono', 'Roboto Mono', Menlo, Consolas, monospace"
      },
      "light": {
        "--pura-bg": "#FFFFFF",
        "--pura-fg": "#0A0B0D",
        "--pura-muted": "#5B616E",
        "--pura-muted-fg": "#0A0B0D",
        "--pura-subtle": "#F5F7FA",
        "--pura-subtle-hover": "#EAEEF5",
        "--pura-border": "#DCE0E8",
        "--pura-border-strong": "#C2C8D4",
        "--pura-primary": "#0052FF",
        "--pura-primary-hover": "#0043CC",
        "--pura-primary-fg": "#FFFFFF",
        "--pura-accent": "#0052FF"
      },
      "dark": {
        "--pura-bg": "#0A0B0D",
        "--pura-fg": "#F5F6F8",
        "--pura-muted": "#9AA0AE",
        "--pura-muted-fg": "#F5F6F8",
        "--pura-subtle": "#16181C",
        "--pura-subtle-hover": "#1F2329",
        "--pura-border": "#272B33",
        "--pura-border-strong": "#3A3F49",
        "--pura-primary": "#0052FF",
        "--pura-primary-hover": "#1A66FF",
        "--pura-primary-fg": "#FFFFFF",
        "--pura-accent": "#4D82FF"
      }
    }
  },
  {
    "id": "robinhood",
    "name": "Robinhood",
    "group": "Finance",
    "vars": {
      "base": {
        "--pura-radius-sm": "4px",
        "--pura-radius": "8px",
        "--pura-radius-lg": "14px",
        "--pura-font": "\"Helvetica Neue\", Helvetica, Arial, system-ui, sans-serif",
        "--pura-font-mono": "\"SFMono-Regular\", Menlo, Consolas, \"Liberation Mono\", monospace"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#0c0d0f",
        "--pura-muted": "#5b636b",
        "--pura-muted-fg": "#6b7178",
        "--pura-subtle": "#f3f5f6",
        "--pura-subtle-hover": "#e9ecee",
        "--pura-border": "#dfe3e6",
        "--pura-border-strong": "#c2c8cd",
        "--pura-primary": "#00c805",
        "--pura-primary-hover": "#00b004",
        "--pura-primary-fg": "#06210a",
        "--pura-accent": "#00a804"
      },
      "dark": {
        "--pura-bg": "#0c0d0f",
        "--pura-fg": "#f5f7f8",
        "--pura-muted": "#8b939b",
        "--pura-muted-fg": "#9aa3ab",
        "--pura-subtle": "#16181b",
        "--pura-subtle-hover": "#1e2125",
        "--pura-border": "#26292e",
        "--pura-border-strong": "#3a3e44",
        "--pura-primary": "#00c805",
        "--pura-primary-hover": "#00b004",
        "--pura-primary-fg": "#06210a",
        "--pura-accent": "#00c805"
      }
    }
  },
  {
    "id": "revolut",
    "name": "Revolut",
    "group": "Finance",
    "vars": {
      "base": {
        "--pura-radius-sm": "8px",
        "--pura-radius": "12px",
        "--pura-radius-lg": "18px",
        "--pura-font": "\"Helvetica Neue\", Helvetica, Arial, system-ui, -apple-system, sans-serif",
        "--pura-font-mono": "ui-monospace, \"SF Mono\", \"Roboto Mono\", Menlo, Consolas, monospace"
      },
      "light": {
        "--pura-bg": "#FFFFFF",
        "--pura-fg": "#0B0D14",
        "--pura-muted": "#5A6275",
        "--pura-muted-fg": "#FFFFFF",
        "--pura-subtle": "#F2F4F9",
        "--pura-subtle-hover": "#E7EBF3",
        "--pura-border": "#DCE1EC",
        "--pura-border-strong": "#BFC6D6",
        "--pura-primary": "#0B6FE0",
        "--pura-primary-hover": "#0A5FC4",
        "--pura-primary-fg": "#FFFFFF",
        "--pura-accent": "#6E4CE5"
      },
      "dark": {
        "--pura-bg": "#0A0B0F",
        "--pura-fg": "#F3F5F9",
        "--pura-muted": "#9BA3B4",
        "--pura-muted-fg": "#0E0F14",
        "--pura-subtle": "#15171E",
        "--pura-subtle-hover": "#1D2029",
        "--pura-border": "#262A35",
        "--pura-border-strong": "#3A3F4E",
        "--pura-primary": "#1466D6",
        "--pura-primary-hover": "#2E7BEA",
        "--pura-primary-fg": "#FFFFFF",
        "--pura-accent": "#8B5CF6"
      }
    }
  },
  {
    "id": "nubank",
    "name": "Nubank",
    "group": "Finance",
    "vars": {
      "base": {
        "--pura-radius-sm": "0.5rem",
        "--pura-radius": "0.875rem",
        "--pura-radius-lg": "1.25rem",
        "--pura-font": "'Inter', 'Helvetica Neue', Helvetica, Arial, system-ui, sans-serif",
        "--pura-font-mono": "'SFMono-Regular', ui-monospace, 'Menlo', 'Consolas', monospace"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#1a1130",
        "--pura-muted": "#6b6577",
        "--pura-muted-fg": "#3d3548",
        "--pura-subtle": "#f4f1f8",
        "--pura-subtle-hover": "#ece6f4",
        "--pura-border": "#e4dfeb",
        "--pura-border-strong": "#cfc6dd",
        "--pura-primary": "#820ad1",
        "--pura-primary-hover": "#6f08b3",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#a855f7"
      },
      "dark": {
        "--pura-bg": "#15101f",
        "--pura-fg": "#f3eefb",
        "--pura-muted": "#a89bc0",
        "--pura-muted-fg": "#cfc4e3",
        "--pura-subtle": "#221a33",
        "--pura-subtle-hover": "#2c2240",
        "--pura-border": "#352a4a",
        "--pura-border-strong": "#4a3a66",
        "--pura-primary": "#9333ea",
        "--pura-primary-hover": "#a855f7",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#c084fc"
      }
    }
  },
  {
    "id": "shopify",
    "name": "Shopify",
    "group": "Commerce",
    "vars": {
      "base": {
        "--pura-radius-sm": "4px",
        "--pura-radius": "8px",
        "--pura-radius-lg": "12px",
        "--pura-font": "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif",
        "--pura-font-mono": "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
      },
      "light": {
        "--pura-bg": "#FFFFFF",
        "--pura-fg": "#1A1A1A",
        "--pura-muted": "#F6F6F7",
        "--pura-muted-fg": "#5C5F62",
        "--pura-subtle": "#F1F2F3",
        "--pura-subtle-hover": "#E6E8EA",
        "--pura-border": "#E1E3E5",
        "--pura-border-strong": "#C9CCCF",
        "--pura-primary": "#008060",
        "--pura-primary-hover": "#006E52",
        "--pura-primary-fg": "#FFFFFF",
        "--pura-accent": "#008060"
      },
      "dark": {
        "--pura-bg": "#161616",
        "--pura-fg": "#EDEDED",
        "--pura-muted": "#1F1F1F",
        "--pura-muted-fg": "#9CA0A3",
        "--pura-subtle": "#1F1F1F",
        "--pura-subtle-hover": "#2A2A2A",
        "--pura-border": "#2C2C2C",
        "--pura-border-strong": "#3D3D3D",
        "--pura-primary": "#00A47C",
        "--pura-primary-hover": "#1AB894",
        "--pura-primary-fg": "#04231B",
        "--pura-accent": "#1AB894"
      }
    }
  },
  {
    "id": "paypal",
    "name": "PayPal",
    "group": "Finance",
    "vars": {
      "base": {
        "--pura-radius-sm": "6px",
        "--pura-radius": "10px",
        "--pura-radius-lg": "16px",
        "--pura-font": "\"Helvetica Neue\", Helvetica, Arial, system-ui, -apple-system, sans-serif",
        "--pura-font-mono": "ui-monospace, \"SF Mono\", Menlo, Consolas, monospace"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#0a1b3d",
        "--pura-muted": "#5a6a8a",
        "--pura-muted-fg": "#7a89a8",
        "--pura-subtle": "#eef2fa",
        "--pura-subtle-hover": "#e1e8f5",
        "--pura-border": "#d4ddec",
        "--pura-border-strong": "#aebdd6",
        "--pura-primary": "#003087",
        "--pura-primary-hover": "#001c64",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#009cde"
      },
      "dark": {
        "--pura-bg": "#0a1430",
        "--pura-fg": "#e8edf7",
        "--pura-muted": "#9aa8c8",
        "--pura-muted-fg": "#7e8eb2",
        "--pura-subtle": "#16224a",
        "--pura-subtle-hover": "#1e2c5c",
        "--pura-border": "#2a3866",
        "--pura-border-strong": "#3c4d82",
        "--pura-primary": "#009cde",
        "--pura-primary-hover": "#33b1e6",
        "--pura-primary-fg": "#001c64",
        "--pura-accent": "#4db8e8"
      }
    }
  },
  {
    "id": "adobe",
    "name": "Adobe",
    "group": "Design",
    "vars": {
      "base": {
        "--pura-radius-sm": "3px",
        "--pura-radius": "5px",
        "--pura-radius-lg": "8px",
        "--pura-font": "'Helvetica Neue', Helvetica, Arial, system-ui, sans-serif",
        "--pura-font-mono": "'SF Mono', 'Source Code Pro', Menlo, Consolas, monospace"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#1a1a1a",
        "--pura-muted": "#6b6b6b",
        "--pura-muted-fg": "#6b6b6b",
        "--pura-subtle": "#f0f0f0",
        "--pura-subtle-hover": "#e4e4e4",
        "--pura-border": "#d4d4d4",
        "--pura-border-strong": "#b0b0b0",
        "--pura-primary": "#d7000f",
        "--pura-primary-hover": "#b60010",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#fa0f00"
      },
      "dark": {
        "--pura-bg": "#141414",
        "--pura-fg": "#f5f5f5",
        "--pura-muted": "#a0a0a0",
        "--pura-muted-fg": "#a3a3a3",
        "--pura-subtle": "#1f1f1f",
        "--pura-subtle-hover": "#2a2a2a",
        "--pura-border": "#383838",
        "--pura-border-strong": "#545454",
        "--pura-primary": "#e00016",
        "--pura-primary-hover": "#fa0f00",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#ff453a"
      }
    }
  },
  {
    "id": "canva",
    "name": "Canva",
    "group": "Design",
    "vars": {
      "base": {
        "--pura-radius-sm": "8px",
        "--pura-radius": "12px",
        "--pura-radius-lg": "20px",
        "--pura-font": "'Segoe UI', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif",
        "--pura-font-mono": "'SF Mono', ui-monospace, 'Cascadia Code', Menlo, Consolas, monospace"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#1a1033",
        "--pura-muted": "#6b5b8c",
        "--pura-muted-fg": "#4a3d66",
        "--pura-subtle": "#f4f1fb",
        "--pura-subtle-hover": "#ebe5f7",
        "--pura-border": "#e2dcf0",
        "--pura-border-strong": "#cfc6e6",
        "--pura-primary": "#7d2ae8",
        "--pura-primary-hover": "#6a1fce",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#00c4cc"
      },
      "dark": {
        "--pura-bg": "#15101f",
        "--pura-fg": "#f2effa",
        "--pura-muted": "#a99fc4",
        "--pura-muted-fg": "#c5bcdd",
        "--pura-subtle": "#211a30",
        "--pura-subtle-hover": "#2c243f",
        "--pura-border": "#352b4a",
        "--pura-border-strong": "#473a61",
        "--pura-primary": "#8b3dff",
        "--pura-primary-hover": "#9d57ff",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#00c4cc"
      }
    }
  },
  {
    "id": "reddit",
    "name": "Reddit",
    "group": "Social",
    "vars": {
      "base": {
        "--pura-radius-sm": "6px",
        "--pura-radius": "10px",
        "--pura-radius-lg": "16px",
        "--pura-font": "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif",
        "--pura-font-mono": "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#1a1a1b",
        "--pura-muted": "#5c6c72",
        "--pura-muted-fg": "#7c8a90",
        "--pura-subtle": "#f6f7f8",
        "--pura-subtle-hover": "#eef0f1",
        "--pura-border": "#e0e4e6",
        "--pura-border-strong": "#c8ced1",
        "--pura-primary": "#ff4500",
        "--pura-primary-hover": "#ff5722",
        "--pura-primary-fg": "#1a1a1b",
        "--pura-accent": "#ff4500"
      },
      "dark": {
        "--pura-bg": "#1a1a1b",
        "--pura-fg": "#d7dadc",
        "--pura-muted": "#8b9296",
        "--pura-muted-fg": "#6e7375",
        "--pura-subtle": "#272729",
        "--pura-subtle-hover": "#343536",
        "--pura-border": "#343536",
        "--pura-border-strong": "#474849",
        "--pura-primary": "#ff4500",
        "--pura-primary-hover": "#ff6334",
        "--pura-primary-fg": "#1a1a1b",
        "--pura-accent": "#ff4500"
      }
    }
  },
  {
    "id": "pinterest",
    "name": "Pinterest",
    "group": "Social",
    "vars": {
      "base": {
        "--pura-radius-sm": "0.5rem",
        "--pura-radius": "0.85rem",
        "--pura-radius-lg": "1.5rem",
        "--pura-font": "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        "--pura-font-mono": "ui-monospace, 'SF Mono', Menlo, Consolas, monospace"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#111111",
        "--pura-muted": "#6b6b6b",
        "--pura-muted-fg": "#3f3f3f",
        "--pura-subtle": "#fafafa",
        "--pura-subtle-hover": "#efefef",
        "--pura-border": "#e9e9e9",
        "--pura-border-strong": "#d6d6d6",
        "--pura-primary": "#e60023",
        "--pura-primary-hover": "#cc001f",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#e60023"
      },
      "dark": {
        "--pura-bg": "#111114",
        "--pura-fg": "#fafafa",
        "--pura-muted": "#a8a8ad",
        "--pura-muted-fg": "#d4d4d8",
        "--pura-subtle": "#1b1b1f",
        "--pura-subtle-hover": "#26262b",
        "--pura-border": "#2a2a2f",
        "--pura-border-strong": "#3c3c42",
        "--pura-primary": "#e60023",
        "--pura-primary-hover": "#ff1a3d",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#ff4d6a"
      }
    }
  },
  {
    "id": "tiktok",
    "name": "TikTok",
    "group": "Social",
    "vars": {
      "base": {
        "--pura-radius-sm": "0.25rem",
        "--pura-radius": "0.5rem",
        "--pura-radius-lg": "0.875rem",
        "--pura-font": "'Helvetica Neue', Helvetica, Arial, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
        "--pura-font-mono": "ui-monospace, 'SF Mono', 'Cascadia Mono', Menlo, Consolas, monospace"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#161823",
        "--pura-muted": "#5b5b66",
        "--pura-muted-fg": "#5b5b66",
        "--pura-subtle": "#f4f4f6",
        "--pura-subtle-hover": "#e9e9ec",
        "--pura-border": "#e1e1e5",
        "--pura-border-strong": "#c4c4cb",
        "--pura-primary": "#e8002e",
        "--pura-primary-hover": "#c40027",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#00b8b0"
      },
      "dark": {
        "--pura-bg": "#000000",
        "--pura-fg": "#f1f1f2",
        "--pura-muted": "#a8a8ad",
        "--pura-muted-fg": "#c2c2c6",
        "--pura-subtle": "#1d1e29",
        "--pura-subtle-hover": "#26272f",
        "--pura-border": "#2b2c35",
        "--pura-border-strong": "#42434c",
        "--pura-primary": "#25f4ee",
        "--pura-primary-hover": "#5af6f1",
        "--pura-primary-fg": "#000000",
        "--pura-accent": "#fe2c55"
      }
    }
  },
  {
    "id": "telegram",
    "name": "Telegram",
    "group": "Social",
    "vars": {
      "base": {
        "--pura-radius-sm": "6px",
        "--pura-radius": "10px",
        "--pura-radius-lg": "16px",
        "--pura-font": "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif",
        "--pura-font-mono": "\"SF Mono\", \"Roboto Mono\", Menlo, Consolas, monospace"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#16191c",
        "--pura-muted": "#586672",
        "--pura-muted-fg": "#586672",
        "--pura-subtle": "#f0f4f8",
        "--pura-subtle-hover": "#e3edf4",
        "--pura-border": "#dce3e9",
        "--pura-border-strong": "#bcc8d2",
        "--pura-primary": "#2079ba",
        "--pura-primary-hover": "#1a689e",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#2aabee"
      },
      "dark": {
        "--pura-bg": "#17212b",
        "--pura-fg": "#f5f7f9",
        "--pura-muted": "#90a4b7",
        "--pura-muted-fg": "#90a4b7",
        "--pura-subtle": "#1f2c38",
        "--pura-subtle-hover": "#26374a",
        "--pura-border": "#2b3a4a",
        "--pura-border-strong": "#3d5063",
        "--pura-primary": "#2079ba",
        "--pura-primary-hover": "#1a689e",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#2aabee"
      }
    }
  },
  {
    "id": "signal",
    "name": "Signal",
    "group": "Social",
    "vars": {
      "base": {
        "--pura-radius-sm": "8px",
        "--pura-radius": "12px",
        "--pura-radius-lg": "18px",
        "--pura-font": "-apple-system, BlinkMacSystemFont, \"Inter\", \"Helvetica Neue\", Arial, sans-serif",
        "--pura-font-mono": "\"SF Mono\", \"Roboto Mono\", \"Menlo\", \"Consolas\", monospace"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#16191d",
        "--pura-muted": "#5b6168",
        "--pura-muted-fg": "#6b7178",
        "--pura-subtle": "#f3f5f8",
        "--pura-subtle-hover": "#e8ebf0",
        "--pura-border": "#dfe3e8",
        "--pura-border-strong": "#c4cad2",
        "--pura-primary": "#2c6bed",
        "--pura-primary-hover": "#1f5bd6",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#3a76f0"
      },
      "dark": {
        "--pura-bg": "#15181c",
        "--pura-fg": "#e9edf2",
        "--pura-muted": "#99a2ac",
        "--pura-muted-fg": "#aab2bc",
        "--pura-subtle": "#1e2228",
        "--pura-subtle-hover": "#272c33",
        "--pura-border": "#2c323a",
        "--pura-border-strong": "#3c434c",
        "--pura-primary": "#3970e0",
        "--pura-primary-hover": "#4a82f5",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#5b91ff"
      }
    }
  },
  {
    "id": "brave",
    "name": "Brave",
    "group": "Tech",
    "vars": {
      "base": {
        "--pura-radius-sm": "4px",
        "--pura-radius": "8px",
        "--pura-radius-lg": "12px",
        "--pura-font": "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        "--pura-font-mono": "ui-monospace, 'SF Mono', 'Cascadia Code', Menlo, Consolas, monospace"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#1a1820",
        "--pura-muted": "#f4f2f7",
        "--pura-muted-fg": "#5f5870",
        "--pura-subtle": "#f1eef5",
        "--pura-subtle-hover": "#e7e3ee",
        "--pura-border": "#e0dce7",
        "--pura-border-strong": "#c7c1d2",
        "--pura-primary": "#fb542b",
        "--pura-primary-hover": "#e8421a",
        "--pura-primary-fg": "#1a1820",
        "--pura-accent": "#fb542b"
      },
      "dark": {
        "--pura-bg": "#17151f",
        "--pura-fg": "#f5f3f7",
        "--pura-muted": "#221f2c",
        "--pura-muted-fg": "#a39db3",
        "--pura-subtle": "#26222f",
        "--pura-subtle-hover": "#312c3c",
        "--pura-border": "#322d3c",
        "--pura-border-strong": "#4a4456",
        "--pura-primary": "#fb542b",
        "--pura-primary-hover": "#ff6a44",
        "--pura-primary-fg": "#1a1820",
        "--pura-accent": "#fb7a57"
      }
    }
  },
  {
    "id": "arc",
    "name": "Arc",
    "group": "Tech",
    "vars": {
      "base": {
        "--pura-radius-sm": "8px",
        "--pura-radius": "14px",
        "--pura-radius-lg": "22px",
        "--pura-font": "ui-sans-serif, -apple-system, \"Segoe UI\", Inter, Helvetica, Arial, sans-serif",
        "--pura-font-mono": "ui-monospace, \"SF Mono\", Menlo, Consolas, monospace"
      },
      "light": {
        "--pura-bg": "#FFFFFF",
        "--pura-fg": "#1A1A2E",
        "--pura-muted": "#5E5E78",
        "--pura-muted-fg": "#3A3A52",
        "--pura-subtle": "#F4F3FB",
        "--pura-subtle-hover": "#EBEAF7",
        "--pura-border": "#E4E2F2",
        "--pura-border-strong": "#CFCCE6",
        "--pura-primary": "#3139FB",
        "--pura-primary-hover": "#2228D6",
        "--pura-primary-fg": "#FFFFFF",
        "--pura-accent": "#FF5060"
      },
      "dark": {
        "--pura-bg": "#16161F",
        "--pura-fg": "#ECECF5",
        "--pura-muted": "#A0A0B8",
        "--pura-muted-fg": "#C4C4D8",
        "--pura-subtle": "#22222E",
        "--pura-subtle-hover": "#2C2C3B",
        "--pura-border": "#33334A",
        "--pura-border-strong": "#474766",
        "--pura-primary": "#5A60FF",
        "--pura-primary-hover": "#7B80FF",
        "--pura-primary-fg": "#FFFFFF",
        "--pura-accent": "#FF6B7A"
      }
    }
  },
  {
    "id": "obsidian",
    "name": "Obsidian",
    "group": "Productivity",
    "vars": {
      "base": {
        "--pura-radius-sm": "4px",
        "--pura-radius": "6px",
        "--pura-radius-lg": "10px",
        "--pura-font": "-apple-system, BlinkMacSystemFont, \"Inter\", \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif",
        "--pura-font-mono": "\"SFMono-Regular\", \"JetBrains Mono\", Menlo, Consolas, \"Liberation Mono\", monospace"
      },
      "light": {
        "--pura-bg": "#faf9fc",
        "--pura-fg": "#1e1e22",
        "--pura-muted": "#6a6a76",
        "--pura-muted-fg": "#5a5a66",
        "--pura-subtle": "#f1eff7",
        "--pura-subtle-hover": "#e8e4f3",
        "--pura-border": "#e3e0ec",
        "--pura-border-strong": "#cfc9dd",
        "--pura-primary": "#6d28d9",
        "--pura-primary-hover": "#5b21b6",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#7c3aed"
      },
      "dark": {
        "--pura-bg": "#1a1a1e",
        "--pura-fg": "#e8e8ec",
        "--pura-muted": "#9a9aa6",
        "--pura-muted-fg": "#a1a1ac",
        "--pura-subtle": "#26262d",
        "--pura-subtle-hover": "#2f2f38",
        "--pura-border": "#33333d",
        "--pura-border-strong": "#454552",
        "--pura-primary": "#7c3aed",
        "--pura-primary-hover": "#8b5cf6",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#a78bfa"
      }
    }
  },
  {
    "id": "posthog",
    "name": "PostHog",
    "group": "Dev",
    "vars": {
      "base": {
        "--pura-radius-sm": "6px",
        "--pura-radius": "10px",
        "--pura-radius-lg": "16px",
        "--pura-font": "'Helvetica Neue', Helvetica, Arial, system-ui, sans-serif",
        "--pura-font-mono": "'SFMono-Regular', Menlo, Consolas, 'Liberation Mono', monospace"
      },
      "light": {
        "--pura-bg": "#f9f4ec",
        "--pura-fg": "#1d1f27",
        "--pura-muted": "#eee7db",
        "--pura-muted-fg": "#5f6470",
        "--pura-subtle": "#f1ebe0",
        "--pura-subtle-hover": "#e8e0d2",
        "--pura-border": "#dcd4c5",
        "--pura-border-strong": "#c3baa9",
        "--pura-primary": "#f54e00",
        "--pura-primary-hover": "#d94300",
        "--pura-primary-fg": "#2d1300",
        "--pura-accent": "#1d4aff"
      },
      "dark": {
        "--pura-bg": "#15171c",
        "--pura-fg": "#f1ece4",
        "--pura-muted": "#1f2229",
        "--pura-muted-fg": "#9aa0ad",
        "--pura-subtle": "#1c1f26",
        "--pura-subtle-hover": "#262a33",
        "--pura-border": "#2c313b",
        "--pura-border-strong": "#3d434f",
        "--pura-primary": "#ff5f17",
        "--pura-primary-hover": "#ff7836",
        "--pura-primary-fg": "#1a1206",
        "--pura-accent": "#5b7bff"
      }
    }
  },
  {
    "id": "sentry",
    "name": "Sentry",
    "group": "Dev",
    "vars": {
      "base": {
        "--pura-radius-sm": "0.25rem",
        "--pura-radius": "0.375rem",
        "--pura-radius-lg": "0.625rem",
        "--pura-font": "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        "--pura-font-mono": "ui-monospace, 'SFMono-Regular', 'Roboto Mono', Menlo, Consolas, monospace"
      },
      "light": {
        "--pura-bg": "#FBFAFD",
        "--pura-fg": "#1D1127",
        "--pura-muted": "#6E6388",
        "--pura-muted-fg": "#3B2E55",
        "--pura-subtle": "#F2EFF8",
        "--pura-subtle-hover": "#E8E2F3",
        "--pura-border": "#DED6EC",
        "--pura-border-strong": "#C3B7DD",
        "--pura-primary": "#584B9E",
        "--pura-primary-hover": "#483D85",
        "--pura-primary-fg": "#FFFFFF",
        "--pura-accent": "#6C5FC7"
      },
      "dark": {
        "--pura-bg": "#1D1127",
        "--pura-fg": "#EDE9F5",
        "--pura-muted": "#9C93B5",
        "--pura-muted-fg": "#C9C1DE",
        "--pura-subtle": "#2A1D3A",
        "--pura-subtle-hover": "#37294B",
        "--pura-border": "#3A2D4F",
        "--pura-border-strong": "#53456E",
        "--pura-primary": "#6C5FC7",
        "--pura-primary-hover": "#5E51B5",
        "--pura-primary-fg": "#FFFFFF",
        "--pura-accent": "#A396DA"
      }
    }
  },
  {
    "id": "datadog",
    "name": "Datadog",
    "group": "Dev",
    "vars": {
      "base": {
        "--pura-radius-sm": "4px",
        "--pura-radius": "6px",
        "--pura-radius-lg": "10px",
        "--pura-font": "'Segoe UI', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif",
        "--pura-font-mono": "'SF Mono', ui-monospace, 'Cascadia Code', 'Fira Code', Menlo, Consolas, monospace"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#1a1523",
        "--pura-muted": "#5b5470",
        "--pura-muted-fg": "#ffffff",
        "--pura-subtle": "#f5f3f9",
        "--pura-subtle-hover": "#ece8f4",
        "--pura-border": "#e2dcf0",
        "--pura-border-strong": "#c9bfe2",
        "--pura-primary": "#632ca6",
        "--pura-primary-hover": "#54248c",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#774aba"
      },
      "dark": {
        "--pura-bg": "#16131f",
        "--pura-fg": "#ece9f4",
        "--pura-muted": "#9d92ba",
        "--pura-muted-fg": "#16131f",
        "--pura-subtle": "#211c30",
        "--pura-subtle-hover": "#2c2640",
        "--pura-border": "#332c47",
        "--pura-border-strong": "#473e62",
        "--pura-primary": "#7b45bd",
        "--pura-primary-hover": "#8a59c7",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#b79ae0"
      }
    }
  },
  {
    "id": "vercel-dark",
    "name": "Vercel Black",
    "group": "Tech",
    "vars": {
      "base": {
        "--pura-radius-sm": "3px",
        "--pura-radius": "5px",
        "--pura-radius-lg": "8px",
        "--pura-font": "ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
        "--pura-font-mono": "ui-monospace, 'SF Mono', 'Menlo', 'Consolas', 'Liberation Mono', monospace"
      },
      "light": {
        "--pura-bg": "#ffffff",
        "--pura-fg": "#171717",
        "--pura-muted": "#666666",
        "--pura-muted-fg": "#888888",
        "--pura-subtle": "#fafafa",
        "--pura-subtle-hover": "#f2f2f2",
        "--pura-border": "#eaeaea",
        "--pura-border-strong": "#d4d4d4",
        "--pura-primary": "#0070f3",
        "--pura-primary-hover": "#0061d5",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#0070f3"
      },
      "dark": {
        "--pura-bg": "#000000",
        "--pura-fg": "#ededed",
        "--pura-muted": "#a1a1a1",
        "--pura-muted-fg": "#7a7a7a",
        "--pura-subtle": "#0a0a0a",
        "--pura-subtle-hover": "#161616",
        "--pura-border": "#262626",
        "--pura-border-strong": "#444444",
        "--pura-primary": "#0070f3",
        "--pura-primary-hover": "#3291ff",
        "--pura-primary-fg": "#ffffff",
        "--pura-accent": "#3291ff"
      }
    }
  }
];
