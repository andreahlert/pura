// AUTO-GENERATED docs translations (pt-BR/fr/de/it: description, attributes, demoHTML). Do not edit by hand.
export const docsI18n = {
 "button": {
  "pt-BR": {
   "description": "`<pura-button>` é um web component nativo que renderiza um botão estilizado para ações de formulário e de interface. Oferece variantes visuais (primary, secondary, ghost, danger), tamanhos e estados desabilitado e de carregamento. Use sempre que precisar de um gatilho de ação consistente, com cliques automaticamente bloqueados enquanto estiver desabilitado ou carregando.",
   "attributes": [
    {
     "desc": "Estilo visual do botão."
    },
    {
     "desc": "Tamanho do botão."
    },
    {
     "desc": "Desabilita o botão e bloqueia cliques."
    },
    {
     "desc": "Exibe o spinner, define aria-busy e bloqueia cliques."
    },
    {
     "desc": "Faz o botão ocupar toda a largura disponível."
    }
   ],
   "demoHTML": "<div style=\"display:flex; gap:.75rem; flex-wrap:wrap; align-items:center\">\n  <pura-button>Salvar</pura-button>\n  <pura-button variant=\"secondary\">Cancelar</pura-button>\n  <pura-button variant=\"ghost\">Detalhes</pura-button>\n  <pura-button variant=\"danger\">Excluir</pura-button>\n  <pura-button loading>Enviando</pura-button>\n  <pura-button disabled>Indisponível</pura-button>\n  <pura-button size=\"sm\">Pequeno</pura-button>\n  <pura-button size=\"lg\">Grande</pura-button>\n</div>"
  },
  "fr": {
   "description": "`<pura-button>` est un web component natif qui affiche un bouton stylisé pour les actions de formulaire et d'interface. Il propose des variantes visuelles (primary, secondary, ghost, danger), des tailles ainsi que des états désactivé et de chargement. Utilisez-le chaque fois que vous avez besoin d'un déclencheur d'action cohérent, les clics étant automatiquement bloqués lorsqu'il est désactivé ou en cours de chargement.",
   "attributes": [
    {
     "desc": "Style visuel du bouton."
    },
    {
     "desc": "Taille du bouton."
    },
    {
     "desc": "Désactive le bouton et bloque les clics."
    },
    {
     "desc": "Affiche le spinner, définit aria-busy et bloque les clics."
    },
    {
     "desc": "Fait occuper au bouton toute la largeur disponible."
    }
   ],
   "demoHTML": "<div style=\"display:flex; gap:.75rem; flex-wrap:wrap; align-items:center\">\n  <pura-button>Enregistrer</pura-button>\n  <pura-button variant=\"secondary\">Annuler</pura-button>\n  <pura-button variant=\"ghost\">Détails</pura-button>\n  <pura-button variant=\"danger\">Supprimer</pura-button>\n  <pura-button loading>Envoi en cours</pura-button>\n  <pura-button disabled>Indisponible</pura-button>\n  <pura-button size=\"sm\">Petit</pura-button>\n  <pura-button size=\"lg\">Grand</pura-button>\n</div>"
  },
  "de": {
   "description": "`<pura-button>` ist eine native Web Component, die einen gestylten Button für Formular- und UI-Aktionen rendert. Sie bietet visuelle Varianten (primary, secondary, ghost, danger), Größen sowie deaktivierte und Ladezustände. Verwenden Sie ihn immer dann, wenn Sie einen konsistenten Aktionsauslöser benötigen, wobei Klicks automatisch blockiert werden, solange er deaktiviert ist oder lädt.",
   "attributes": [
    {
     "desc": "Visueller Stil des Buttons."
    },
    {
     "desc": "Größe des Buttons."
    },
    {
     "desc": "Deaktiviert den Button und blockiert Klicks."
    },
    {
     "desc": "Zeigt den Spinner an, setzt aria-busy und blockiert Klicks."
    },
    {
     "desc": "Lässt den Button die gesamte verfügbare Breite einnehmen."
    }
   ],
   "demoHTML": "<div style=\"display:flex; gap:.75rem; flex-wrap:wrap; align-items:center\">\n  <pura-button>Speichern</pura-button>\n  <pura-button variant=\"secondary\">Abbrechen</pura-button>\n  <pura-button variant=\"ghost\">Details</pura-button>\n  <pura-button variant=\"danger\">Löschen</pura-button>\n  <pura-button loading>Wird gesendet</pura-button>\n  <pura-button disabled>Nicht verfügbar</pura-button>\n  <pura-button size=\"sm\">Klein</pura-button>\n  <pura-button size=\"lg\">Groß</pura-button>\n</div>"
  },
  "it": {
   "description": "`<pura-button>` è un web component nativo che esegue il rendering di un pulsante stilizzato per le azioni di form e interfaccia. Offre varianti visive (primary, secondary, ghost, danger), dimensioni e stati disabilitato e di caricamento. Usalo ogni volta che hai bisogno di un trigger di azione coerente, con i clic bloccati automaticamente mentre è disabilitato o in caricamento.",
   "attributes": [
    {
     "desc": "Stile visivo del pulsante."
    },
    {
     "desc": "Dimensione del pulsante."
    },
    {
     "desc": "Disabilita il pulsante e blocca i clic."
    },
    {
     "desc": "Mostra lo spinner, imposta aria-busy e blocca i clic."
    },
    {
     "desc": "Fa occupare al pulsante tutta la larghezza disponibile."
    }
   ],
   "demoHTML": "<div style=\"display:flex; gap:.75rem; flex-wrap:wrap; align-items:center\">\n  <pura-button>Salva</pura-button>\n  <pura-button variant=\"secondary\">Annulla</pura-button>\n  <pura-button variant=\"ghost\">Dettagli</pura-button>\n  <pura-button variant=\"danger\">Elimina</pura-button>\n  <pura-button loading>Invio in corso</pura-button>\n  <pura-button disabled>Non disponibile</pura-button>\n  <pura-button size=\"sm\">Piccolo</pura-button>\n  <pura-button size=\"lg\">Grande</pura-button>\n</div>"
  }
 },
 "button-group": {
  "pt-BR": {
   "description": "Button Group é um web component nativo que une elementos pura-button adjacentes, colapsando bordas e cantos arredondados para que o conjunto seja lido como um único controle segmentado. Use-o para agrupar ações relacionadas (como filtros, alternâncias de visualização ou opções mutuamente vinculadas) lado a lado. Suporta orientação horizontal (padrão) ou vertical.",
   "attributes": [
    {
     "desc": "Direção do agrupamento: \"horizontal\" (padrão) ou \"vertical\"."
    }
   ],
   "demoHTML": "<pura-button-group>\n  <pura-button>Dia</pura-button>\n  <pura-button>Semana</pura-button>\n  <pura-button>Mês</pura-button>\n</pura-button-group>\n\n<pura-button-group orientation=\"vertical\">\n  <pura-button>Perfil</pura-button>\n  <pura-button>Configurações</pura-button>\n  <pura-button>Sair</pura-button>\n</pura-button-group>"
  },
  "fr": {
   "description": "Button Group est un web component natif qui réunit des éléments pura-button adjacents, en fusionnant les bordures et les coins arrondis afin que l'ensemble se lise comme un unique contrôle segmenté. Utilisez-le pour regrouper côte à côte des actions liées (telles que des filtres, des bascules de vue ou des options mutuellement liées). Prend en charge l'orientation horizontale (par défaut) ou verticale.",
   "attributes": [
    {
     "desc": "Direction du regroupement : \"horizontal\" (par défaut) ou \"vertical\"."
    }
   ],
   "demoHTML": "<pura-button-group>\n  <pura-button>Jour</pura-button>\n  <pura-button>Semaine</pura-button>\n  <pura-button>Mois</pura-button>\n</pura-button-group>\n\n<pura-button-group orientation=\"vertical\">\n  <pura-button>Profil</pura-button>\n  <pura-button>Paramètres</pura-button>\n  <pura-button>Se déconnecter</pura-button>\n</pura-button-group>"
  },
  "de": {
   "description": "Button Group ist eine native Web Component, die benachbarte pura-button-Elemente verbindet und dabei Ränder und abgerundete Ecken zusammenführt, sodass die Gruppe als ein einziges segmentiertes Steuerelement gelesen wird. Verwenden Sie sie, um zusammengehörige Aktionen (wie Filter, Ansichtsumschalter oder gegenseitig verknüpfte Optionen) nebeneinander zu gruppieren. Unterstützt horizontale (Standard) oder vertikale Ausrichtung.",
   "attributes": [
    {
     "desc": "Gruppierungsrichtung: \"horizontal\" (Standard) oder \"vertical\"."
    }
   ],
   "demoHTML": "<pura-button-group>\n  <pura-button>Tag</pura-button>\n  <pura-button>Woche</pura-button>\n  <pura-button>Monat</pura-button>\n</pura-button-group>\n\n<pura-button-group orientation=\"vertical\">\n  <pura-button>Profil</pura-button>\n  <pura-button>Einstellungen</pura-button>\n  <pura-button>Abmelden</pura-button>\n</pura-button-group>"
  },
  "it": {
   "description": "Button Group è un web component nativo che unisce elementi pura-button adiacenti, fondendo bordi e angoli arrotondati in modo che l'insieme venga letto come un unico controllo segmentato. Usalo per raggruppare azioni correlate (come filtri, interruttori di visualizzazione o opzioni reciprocamente collegate) affiancate. Supporta l'orientamento orizzontale (predefinito) o verticale.",
   "attributes": [
    {
     "desc": "Direzione del raggruppamento: \"horizontal\" (predefinito) o \"vertical\"."
    }
   ],
   "demoHTML": "<pura-button-group>\n  <pura-button>Giorno</pura-button>\n  <pura-button>Settimana</pura-button>\n  <pura-button>Mese</pura-button>\n</pura-button-group>\n\n<pura-button-group orientation=\"vertical\">\n  <pura-button>Profilo</pura-button>\n  <pura-button>Impostazioni</pura-button>\n  <pura-button>Esci</pura-button>\n</pura-button-group>"
  }
 },
 "chat-input": {
  "pt-BR": {
   "description": "Chat Input é um compositor de mensagens construído sobre um <textarea> nativo, garantindo IME, teclado, acessibilidade e semântica de formulário confiáveis. Use-o quando precisar de uma caixa de entrada no estilo de chat: Enter dispara o evento send com o texto e limpa o campo, Shift+Enter insere uma quebra de linha e o slot actions permite controles extras, como anexar arquivo. Ele também expõe uma camada agent-native: um id data-pura-chat-input estável no host e um registro global window.__puraChatInputs que mapeia cada instância para um handle ativo (value, send(), clear(), focus()), permitindo que agentes e ferramentas leiam o rascunho e operem o compositor sem atravessar o shadow root.",
   "attributes": [
    {
     "desc": "Texto de placeholder do textarea."
    },
    {
     "desc": "Bloqueia a digitação e o envio; aplica aria-disabled e desabilita o textarea e o botão."
    },
    {
     "desc": "Texto do rascunho atual; espelhado de volta para o atributo do host a cada tecla pressionada."
    },
    {
     "desc": "Limite de caracteres repassado ao textarea (opcional)."
    },
    {
     "desc": "Rótulo acessível (aria-label) do botão de envio."
    }
   ],
   "demoHTML": "<pura-chat-input\n  id=\"composer\"\n  placeholder=\"Digite uma mensagem...\"\n  send-label=\"Enviar mensagem\"\n  maxlength=\"500\">\n  <button slot=\"actions\" type=\"button\" aria-label=\"Anexar arquivo\"\n    style=\"border:none;background:transparent;cursor:pointer;font-size:1.2rem;line-height:1;padding:.25rem\">+</button>\n</pura-chat-input>\n<p id=\"log\" style=\"font:14px system-ui;color:#555;margin-top:.75rem\"></p>\n<script type=\"module\">\n  import \"/pura/lib/chat-input.js\";\n  const composer = document.getElementById(\"composer\");\n  const log = document.getElementById(\"log\");\n  composer.addEventListener(\"send\", (e) => {\n    log.textContent = \"Mensagem enviada: \" + e.detail.value;\n  });\n</script>"
  },
  "fr": {
   "description": "Chat Input est un composeur de messages construit sur un <textarea> natif, garantissant une IME, un clavier, une accessibilité et une sémantique de formulaire fiables. Utilisez-le lorsque vous avez besoin d'une zone de saisie de type chat : Entrée déclenche l'événement send avec le texte et vide le champ, Maj+Entrée insère un saut de ligne, et le slot actions permet d'ajouter des contrôles supplémentaires comme joindre un fichier. Il expose également une couche agent-native : un id data-pura-chat-input stable sur l'hôte et un registre global window.__puraChatInputs qui associe chaque instance à un handle actif (value, send(), clear(), focus()), permettant aux agents et aux outils de lire le brouillon et de piloter le composeur sans percer le shadow root.",
   "attributes": [
    {
     "desc": "Texte indicatif (placeholder) du textarea."
    },
    {
     "desc": "Bloque la saisie et l'envoi ; applique aria-disabled et désactive le textarea et le bouton."
    },
    {
     "desc": "Texte du brouillon actuel ; répercuté vers l'attribut de l'hôte à chaque frappe."
    },
    {
     "desc": "Limite de caractères transmise au textarea (facultatif)."
    },
    {
     "desc": "Libellé accessible (aria-label) du bouton d'envoi."
    }
   ],
   "demoHTML": "<pura-chat-input\n  id=\"composer\"\n  placeholder=\"Saisissez un message...\"\n  send-label=\"Envoyer le message\"\n  maxlength=\"500\">\n  <button slot=\"actions\" type=\"button\" aria-label=\"Joindre un fichier\"\n    style=\"border:none;background:transparent;cursor:pointer;font-size:1.2rem;line-height:1;padding:.25rem\">+</button>\n</pura-chat-input>\n<p id=\"log\" style=\"font:14px system-ui;color:#555;margin-top:.75rem\"></p>\n<script type=\"module\">\n  import \"/pura/lib/chat-input.js\";\n  const composer = document.getElementById(\"composer\");\n  const log = document.getElementById(\"log\");\n  composer.addEventListener(\"send\", (e) => {\n    log.textContent = \"Message envoyé : \" + e.detail.value;\n  });\n</script>"
  },
  "de": {
   "description": "Chat Input ist ein Nachrichten-Editor, der auf einem nativen <textarea> aufbaut und so zuverlässige IME-, Tastatur-, Barrierefreiheits- und Formularsemantik gewährleistet. Verwenden Sie ihn, wenn Sie ein chatähnliches Eingabefeld benötigen: Enter löst das send-Ereignis mit dem Text aus und leert das Feld, Shift+Enter fügt einen Zeilenumbruch ein, und der actions-Slot erlaubt zusätzliche Steuerelemente wie Datei anhängen. Er stellt außerdem eine agent-native Ebene bereit: eine stabile data-pura-chat-input-id auf dem Host und ein globales window.__puraChatInputs-Register, das jede Instanz einem aktiven Handle (value, send(), clear(), focus()) zuordnet, sodass Agenten und Tools den Entwurf lesen und den Editor bedienen können, ohne den Shadow Root zu durchdringen.",
   "attributes": [
    {
     "desc": "Platzhaltertext für das Textarea."
    },
    {
     "desc": "Blockiert Eingabe und Senden; setzt aria-disabled und deaktiviert das Textarea und den Button."
    },
    {
     "desc": "Aktueller Entwurfstext; bei jedem Tastenanschlag zurück zum Host-Attribut gespiegelt."
    },
    {
     "desc": "An das Textarea durchgereichtes Zeichenlimit (optional)."
    },
    {
     "desc": "Barrierefreie Beschriftung (aria-label) für den Senden-Button."
    }
   ],
   "demoHTML": "<pura-chat-input\n  id=\"composer\"\n  placeholder=\"Nachricht eingeben...\"\n  send-label=\"Nachricht senden\"\n  maxlength=\"500\">\n  <button slot=\"actions\" type=\"button\" aria-label=\"Datei anhängen\"\n    style=\"border:none;background:transparent;cursor:pointer;font-size:1.2rem;line-height:1;padding:.25rem\">+</button>\n</pura-chat-input>\n<p id=\"log\" style=\"font:14px system-ui;color:#555;margin-top:.75rem\"></p>\n<script type=\"module\">\n  import \"/pura/lib/chat-input.js\";\n  const composer = document.getElementById(\"composer\");\n  const log = document.getElementById(\"log\");\n  composer.addEventListener(\"send\", (e) => {\n    log.textContent = \"Nachricht gesendet: \" + e.detail.value;\n  });\n</script>"
  },
  "it": {
   "description": "Chat Input è un compositore di messaggi costruito su un <textarea> nativo, che garantisce IME, tastiera, accessibilità e semantica dei form affidabili. Usalo quando hai bisogno di una casella di input in stile chat: Invio attiva l'evento send con il testo e svuota il campo, Maiusc+Invio inserisce un'interruzione di riga e lo slot actions consente controlli aggiuntivi come allega file. Espone anche un livello agent-native: un id data-pura-chat-input stabile sull'host e un registro globale window.__puraChatInputs che associa ogni istanza a un handle attivo (value, send(), clear(), focus()), consentendo ad agenti e strumenti di leggere la bozza e operare sul compositore senza attraversare lo shadow root.",
   "attributes": [
    {
     "desc": "Testo segnaposto del textarea."
    },
    {
     "desc": "Blocca la digitazione e l'invio; applica aria-disabled e disabilita il textarea e il pulsante."
    },
    {
     "desc": "Testo della bozza corrente; rispecchiato nell'attributo dell'host a ogni pressione di tasto."
    },
    {
     "desc": "Limite di caratteri trasmesso al textarea (facoltativo)."
    },
    {
     "desc": "Etichetta accessibile (aria-label) del pulsante di invio."
    }
   ],
   "demoHTML": "<pura-chat-input\n  id=\"composer\"\n  placeholder=\"Scrivi un messaggio...\"\n  send-label=\"Invia messaggio\"\n  maxlength=\"500\">\n  <button slot=\"actions\" type=\"button\" aria-label=\"Allega file\"\n    style=\"border:none;background:transparent;cursor:pointer;font-size:1.2rem;line-height:1;padding:.25rem\">+</button>\n</pura-chat-input>\n<p id=\"log\" style=\"font:14px system-ui;color:#555;margin-top:.75rem\"></p>\n<script type=\"module\">\n  import \"/pura/lib/chat-input.js\";\n  const composer = document.getElementById(\"composer\");\n  const log = document.getElementById(\"log\");\n  composer.addEventListener(\"send\", (e) => {\n    log.textContent = \"Messaggio inviato: \" + e.detail.value;\n  });\n</script>"
  }
 },
 "checkbox": {
  "pt-BR": {
   "description": "Web component nativo que renderiza um checkbox com rótulo, usado para opções liga/desliga em formulários. Suporta estados marcado e desabilitado, navegação por teclado (Space/Enter) e atributos ARIA. Use-o quando o usuário precisar ativar ou desativar uma única opção de forma independente.",
   "attributes": [
    {
     "desc": "Define se a caixa está marcada; reflete o estado e sincroniza aria-checked."
    },
    {
     "desc": "Desabilita a interação e remove o foco por teclado."
    }
   ],
   "demoHTML": "<pura-checkbox checked>Aceito os termos de uso</pura-checkbox>\n<pura-checkbox>Receber novidades por e-mail</pura-checkbox>\n<pura-checkbox disabled>Opção indisponível</pura-checkbox>"
  },
  "fr": {
   "description": "Web component natif qui affiche une case à cocher avec un libellé, utilisée pour les options on/off dans les formulaires. Prend en charge les états coché et désactivé, la navigation au clavier (Space/Enter) et les attributs ARIA. Utilisez-le lorsque l'utilisateur doit activer ou désactiver une seule option de manière indépendante.",
   "attributes": [
    {
     "desc": "Définit si la case est cochée ; reflète l'état et synchronise aria-checked."
    },
    {
     "desc": "Désactive l'interaction et retire le focus clavier."
    }
   ],
   "demoHTML": "<pura-checkbox checked>J'accepte les conditions d'utilisation</pura-checkbox>\n<pura-checkbox>Recevoir les actualités par e-mail</pura-checkbox>\n<pura-checkbox disabled>Option indisponible</pura-checkbox>"
  },
  "de": {
   "description": "Native Web Component, die ein beschriftetes Kontrollkästchen rendert und für Ein/Aus-Optionen in Formularen verwendet wird. Unterstützt die Zustände aktiviert und deaktiviert, Tastaturnavigation (Space/Enter) und ARIA-Attribute. Verwenden Sie es, wenn der Benutzer eine einzelne Option unabhängig ein- oder ausschalten muss.",
   "attributes": [
    {
     "desc": "Legt fest, ob das Kästchen aktiviert ist; spiegelt den Zustand wider und synchronisiert aria-checked."
    },
    {
     "desc": "Deaktiviert die Interaktion und entfernt den Tastaturfokus."
    }
   ],
   "demoHTML": "<pura-checkbox checked>Ich akzeptiere die Nutzungsbedingungen</pura-checkbox>\n<pura-checkbox>Neuigkeiten per E-Mail erhalten</pura-checkbox>\n<pura-checkbox disabled>Option nicht verfügbar</pura-checkbox>"
  },
  "it": {
   "description": "Web component nativo che esegue il rendering di una casella di controllo con etichetta, usata per le opzioni on/off nei form. Supporta gli stati selezionato e disabilitato, la navigazione da tastiera (Space/Enter) e gli attributi ARIA. Usalo quando l'utente deve attivare o disattivare una singola opzione in modo indipendente.",
   "attributes": [
    {
     "desc": "Imposta se la casella è selezionata; riflette lo stato e sincronizza aria-checked."
    },
    {
     "desc": "Disabilita l'interazione e rimuove il focus da tastiera."
    }
   ],
   "demoHTML": "<pura-checkbox checked>Accetto i termini di utilizzo</pura-checkbox>\n<pura-checkbox>Ricevi novità via e-mail</pura-checkbox>\n<pura-checkbox disabled>Opzione non disponibile</pura-checkbox>"
  }
 },
 "color-picker": {
  "pt-BR": {
   "description": "Color Picker é um gatilho que mostra a cor atual e abre um popover (Popover API nativa + posicionamento por âncora em CSS) com uma grade de cores predefinidas, um input type=\"color\" nativo e um campo de texto hexadecimal. Use-o em formulários para escolher uma cor com a alternativa de entrada manual de hexadecimal. Ele é agent-native: reflete o estado em atributos estáveis no host (data-value, data-open, data-disabled), expõe a grade como role=\"listbox\" com aria-selected e roving tabindex, e registra cada instância ativa em window.__puraColorPickers, permitindo que agentes leiam e manipulem o valor programaticamente.",
   "attributes": [
    {
     "desc": "Cor atual em hexadecimal (ex.: \"#2563eb\"). Aceita as formas #rgb ou #rrggbb e é normalizada para #rrggbb em minúsculas; valores inválidos retornam para #000000. Refletida de volta para o atributo na alteração."
    },
    {
     "desc": "Desabilita o gatilho e bloqueia a interação (pointer-events none, opacidade reduzida)."
    },
    {
     "desc": "Nome acessível (aria-label) do botão de amostra."
    }
   ],
   "demoHTML": "<div style=\"display:flex;align-items:center;gap:1rem;flex-wrap:wrap\">\n  <label style=\"font:inherit\">Cor da marca</label>\n  <pura-color-picker id=\"cp\" value=\"#2563eb\" label=\"Escolher cor da marca\"></pura-color-picker>\n  <span id=\"saida\" style=\"font-family:monospace\">#2563eb</span>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/color-picker.js\";\n  const cp = document.getElementById(\"cp\");\n  const saida = document.getElementById(\"saida\");\n  cp.addEventListener(\"change\", (e) => { saida.textContent = e.detail.value; });\n  cp.addEventListener(\"input\", (e) => { saida.textContent = e.detail.value; });\n</script>"
  },
  "fr": {
   "description": "Color Picker est un déclencheur qui affiche la couleur actuelle et ouvre un popover (Popover API native + positionnement par ancrage CSS) avec une grille de couleurs prédéfinies, un input type=\"color\" natif et un champ texte hexadécimal. Utilisez-le dans les formulaires pour choisir une couleur avec une solution de repli de saisie manuelle en hexadécimal. Il est agent-native : il reflète l'état dans des attributs stables sur l'hôte (data-value, data-open, data-disabled), expose la grille en tant que role=\"listbox\" avec aria-selected et roving tabindex, et enregistre chaque instance active dans window.__puraColorPickers, permettant aux agents de lire et de manipuler la valeur par programmation.",
   "attributes": [
    {
     "desc": "Couleur actuelle en hexadécimal (par ex. \"#2563eb\"). Accepte les formes #rgb ou #rrggbb et est normalisée en #rrggbb minuscule ; les valeurs invalides retombent sur #000000. Répercutée vers l'attribut lors d'un changement."
    },
    {
     "desc": "Désactive le déclencheur et bloque l'interaction (pointer-events none, opacité réduite)."
    },
    {
     "desc": "Nom accessible (aria-label) du bouton d'échantillon."
    }
   ],
   "demoHTML": "<div style=\"display:flex;align-items:center;gap:1rem;flex-wrap:wrap\">\n  <label style=\"font:inherit\">Couleur de la marque</label>\n  <pura-color-picker id=\"cp\" value=\"#2563eb\" label=\"Choisir la couleur de la marque\"></pura-color-picker>\n  <span id=\"saida\" style=\"font-family:monospace\">#2563eb</span>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/color-picker.js\";\n  const cp = document.getElementById(\"cp\");\n  const saida = document.getElementById(\"saida\");\n  cp.addEventListener(\"change\", (e) => { saida.textContent = e.detail.value; });\n  cp.addEventListener(\"input\", (e) => { saida.textContent = e.detail.value; });\n</script>"
  },
  "de": {
   "description": "Color Picker ist ein Auslöser, der die aktuelle Farbe anzeigt und ein Popover (native Popover API + CSS-Anker-Positionierung) mit einem Raster vordefinierter Farben, einem nativen input type=\"color\" und einem Hex-Textfeld öffnet. Verwenden Sie ihn in Formularen, um eine Farbe mit der Möglichkeit zur manuellen Hex-Eingabe als Rückfalloption auszuwählen. Er ist agent-native: Er spiegelt den Zustand in stabilen Attributen auf dem Host wider (data-value, data-open, data-disabled), stellt das Raster als role=\"listbox\" mit aria-selected und roving tabindex bereit und registriert jede aktive Instanz in window.__puraColorPickers, sodass Agenten den Wert programmgesteuert lesen und bearbeiten können.",
   "attributes": [
    {
     "desc": "Aktuelle Farbe in Hex (z. B. \"#2563eb\"). Akzeptiert die Formen #rgb oder #rrggbb und wird zu kleingeschriebenem #rrggbb normalisiert; ungültige Werte fallen auf #000000 zurück. Bei Änderung zurück zum Attribut gespiegelt."
    },
    {
     "desc": "Deaktiviert den Auslöser und blockiert die Interaktion (pointer-events none, reduzierte Deckkraft)."
    },
    {
     "desc": "Barrierefreier Name (aria-label) für den Farbfeld-Button."
    }
   ],
   "demoHTML": "<div style=\"display:flex;align-items:center;gap:1rem;flex-wrap:wrap\">\n  <label style=\"font:inherit\">Markenfarbe</label>\n  <pura-color-picker id=\"cp\" value=\"#2563eb\" label=\"Markenfarbe auswählen\"></pura-color-picker>\n  <span id=\"saida\" style=\"font-family:monospace\">#2563eb</span>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/color-picker.js\";\n  const cp = document.getElementById(\"cp\");\n  const saida = document.getElementById(\"saida\");\n  cp.addEventListener(\"change\", (e) => { saida.textContent = e.detail.value; });\n  cp.addEventListener(\"input\", (e) => { saida.textContent = e.detail.value; });\n</script>"
  },
  "it": {
   "description": "Color Picker è un trigger che mostra il colore corrente e apre un popover (Popover API nativa + posizionamento tramite anchor CSS) con una griglia di colori predefiniti, un input type=\"color\" nativo e un campo di testo esadecimale. Usalo nei form per scegliere un colore con il ripiego dell'inserimento manuale dell'esadecimale. È agent-native: riflette lo stato in attributi stabili sull'host (data-value, data-open, data-disabled), espone la griglia come role=\"listbox\" con aria-selected e roving tabindex, e registra ogni istanza attiva in window.__puraColorPickers, consentendo agli agenti di leggere e manipolare il valore programmaticamente.",
   "attributes": [
    {
     "desc": "Colore corrente in esadecimale (es. \"#2563eb\"). Accetta le forme #rgb o #rrggbb ed è normalizzato in #rrggbb minuscolo; i valori non validi ripiegano su #000000. Rispecchiato nell'attributo alla modifica."
    },
    {
     "desc": "Disabilita il trigger e blocca l'interazione (pointer-events none, opacità ridotta)."
    },
    {
     "desc": "Nome accessibile (aria-label) del pulsante campione."
    }
   ],
   "demoHTML": "<div style=\"display:flex;align-items:center;gap:1rem;flex-wrap:wrap\">\n  <label style=\"font:inherit\">Colore del marchio</label>\n  <pura-color-picker id=\"cp\" value=\"#2563eb\" label=\"Scegli il colore del marchio\"></pura-color-picker>\n  <span id=\"saida\" style=\"font-family:monospace\">#2563eb</span>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/color-picker.js\";\n  const cp = document.getElementById(\"cp\");\n  const saida = document.getElementById(\"saida\");\n  cp.addEventListener(\"change\", (e) => { saida.textContent = e.detail.value; });\n  cp.addEventListener(\"input\", (e) => { saida.textContent = e.detail.value; });\n</script>"
  }
 },
 "combobox": {
  "pt-BR": {
   "description": "Web component nativo que transforma elementos <option> em um seletor pesquisável: ele renderiza um input que abre um popover de listbox filtrado por substring do texto digitado, com navegação por teclado e seleção por clique. Use-o quando você tiver uma lista conhecida de opções e quiser permitir que o usuário encontre e escolha rapidamente um item digitando parte do rótulo. Construído sobre a Popover API nativa e o posicionamento por âncora em CSS, sem dependências.",
   "attributes": [
    {
     "desc": "Texto de placeholder exibido no input quando nenhum valor está selecionado."
    },
    {
     "desc": "Valor inicial/atual; deve corresponder ao valor de uma das opções para preencher o rótulo."
    },
    {
     "desc": "Desabilita o input e impede que o listbox seja aberto."
    }
   ],
   "demoHTML": "<pura-combobox placeholder=\"Selecione um estado...\" value=\"sp\">\n  <option value=\"sp\" label=\"São Paulo\"></option>\n  <option value=\"rj\" label=\"Rio de Janeiro\"></option>\n  <option value=\"mg\" label=\"Minas Gerais\"></option>\n  <option value=\"ba\" label=\"Bahia\"></option>\n  <option value=\"pr\" label=\"Paraná\"></option>\n  <option value=\"rs\" label=\"Rio Grande do Sul\"></option>\n  <option value=\"pe\" label=\"Pernambuco\"></option>\n  <option value=\"ce\" label=\"Ceará\"></option>\n</pura-combobox>"
  },
  "fr": {
   "description": "Web component natif qui transforme des éléments <option> en un sélecteur consultable : il affiche un input qui ouvre un popover de listbox filtré par sous-chaîne du texte saisi, avec navigation au clavier et sélection au clic. Utilisez-le lorsque vous disposez d'une liste connue d'options et que vous souhaitez permettre à l'utilisateur de trouver et de choisir rapidement un élément en saisissant une partie du libellé. Construit sur la Popover API native et le positionnement par ancrage CSS, sans dépendances.",
   "attributes": [
    {
     "desc": "Texte indicatif affiché dans l'input lorsqu'aucune valeur n'est sélectionnée."
    },
    {
     "desc": "Valeur initiale/actuelle ; doit correspondre à la valeur de l'une des options pour renseigner le libellé."
    },
    {
     "desc": "Désactive l'input et empêche l'ouverture du listbox."
    }
   ],
   "demoHTML": "<pura-combobox placeholder=\"Sélectionnez un état...\" value=\"sp\">\n  <option value=\"sp\" label=\"São Paulo\"></option>\n  <option value=\"rj\" label=\"Rio de Janeiro\"></option>\n  <option value=\"mg\" label=\"Minas Gerais\"></option>\n  <option value=\"ba\" label=\"Bahia\"></option>\n  <option value=\"pr\" label=\"Paraná\"></option>\n  <option value=\"rs\" label=\"Rio Grande do Sul\"></option>\n  <option value=\"pe\" label=\"Pernambuco\"></option>\n  <option value=\"ce\" label=\"Ceará\"></option>\n</pura-combobox>"
  },
  "de": {
   "description": "Native Web Component, die <option>-Elemente in eine durchsuchbare Auswahl verwandelt: Sie rendert ein Input, das ein Listbox-Popover öffnet, das nach Teilzeichenfolgen des eingegebenen Textes gefiltert wird, mit Tastaturnavigation und Auswahl per Klick. Verwenden Sie sie, wenn Sie eine bekannte Optionsliste haben und dem Benutzer ermöglichen möchten, ein Element schnell zu finden und auszuwählen, indem er einen Teil der Beschriftung eingibt. Aufgebaut auf der nativen Popover API und der CSS-Anker-Positionierung, ohne Abhängigkeiten.",
   "attributes": [
    {
     "desc": "Platzhaltertext, der im Input angezeigt wird, wenn kein Wert ausgewählt ist."
    },
    {
     "desc": "Anfangs-/aktueller Wert; muss dem Wert einer der Optionen entsprechen, um die Beschriftung zu füllen."
    },
    {
     "desc": "Deaktiviert das Input und verhindert das Öffnen der Listbox."
    }
   ],
   "demoHTML": "<pura-combobox placeholder=\"Wählen Sie einen Bundesstaat...\" value=\"sp\">\n  <option value=\"sp\" label=\"São Paulo\"></option>\n  <option value=\"rj\" label=\"Rio de Janeiro\"></option>\n  <option value=\"mg\" label=\"Minas Gerais\"></option>\n  <option value=\"ba\" label=\"Bahia\"></option>\n  <option value=\"pr\" label=\"Paraná\"></option>\n  <option value=\"rs\" label=\"Rio Grande do Sul\"></option>\n  <option value=\"pe\" label=\"Pernambuco\"></option>\n  <option value=\"ce\" label=\"Ceará\"></option>\n</pura-combobox>"
  },
  "it": {
   "description": "Web component nativo che trasforma gli elementi <option> in un selettore ricercabile: esegue il rendering di un input che apre un popover listbox filtrato per sottostringa del testo digitato, con navigazione da tastiera e selezione tramite clic. Usalo quando hai un elenco noto di opzioni e vuoi consentire all'utente di trovare e scegliere rapidamente un elemento digitando parte dell'etichetta. Costruito sulla Popover API nativa e sul posizionamento tramite anchor CSS, senza dipendenze.",
   "attributes": [
    {
     "desc": "Testo segnaposto mostrato nell'input quando nessun valore è selezionato."
    },
    {
     "desc": "Valore iniziale/corrente; deve corrispondere al valore di una delle opzioni per popolare l'etichetta."
    },
    {
     "desc": "Disabilita l'input e impedisce l'apertura del listbox."
    }
   ],
   "demoHTML": "<pura-combobox placeholder=\"Seleziona uno stato...\" value=\"sp\">\n  <option value=\"sp\" label=\"São Paulo\"></option>\n  <option value=\"rj\" label=\"Rio de Janeiro\"></option>\n  <option value=\"mg\" label=\"Minas Gerais\"></option>\n  <option value=\"ba\" label=\"Bahia\"></option>\n  <option value=\"pr\" label=\"Paraná\"></option>\n  <option value=\"rs\" label=\"Rio Grande do Sul\"></option>\n  <option value=\"pe\" label=\"Pernambuco\"></option>\n  <option value=\"ce\" label=\"Ceará\"></option>\n</pura-combobox>"
  }
 },
 "field": {
  "pt-BR": {
   "description": "Field é um web component nativo que organiza, em uma pilha vertical, o rótulo, o controle (slot default), a descrição e a mensagem de erro de um campo de formulário. Use-o para padronizar a estrutura e o espaçamento de qualquer input, select ou textarea. Quando o atributo error é definido, o estilo de inválido é aplicado e a mensagem de erro substitui a descrição.",
   "attributes": [
    {
     "desc": "Texto do rótulo exibido acima do controle."
    },
    {
     "desc": "Texto auxiliar exibido abaixo do controle (oculto quando há um erro)."
    },
    {
     "desc": "Mensagem de erro; quando presente, aplica o estilo de inválido e substitui a descrição."
    }
   ],
   "demoHTML": "<pura-field label=\"E-mail\" description=\"Vamos usá-lo para enviar a confirmação.\">\n  <pura-input type=\"email\" placeholder=\"voce@exemplo.com\"></pura-input>\n</pura-field>\n\n<pura-field label=\"Senha\" error=\"A senha deve ter pelo menos 8 caracteres.\">\n  <pura-input type=\"password\" placeholder=\"********\"></pura-input>\n</pura-field>"
  },
  "fr": {
   "description": "Field est un web component natif qui dispose, dans une pile verticale, le libellé, le contrôle (slot default), la description et le message d'erreur d'un champ de formulaire. Utilisez-le pour standardiser la structure et l'espacement de tout input, select ou textarea. Lorsque l'attribut error est défini, le style invalide est appliqué et le message d'erreur remplace la description.",
   "attributes": [
    {
     "desc": "Texte du libellé affiché au-dessus du contrôle."
    },
    {
     "desc": "Texte d'aide affiché sous le contrôle (masqué en cas d'erreur)."
    },
    {
     "desc": "Message d'erreur ; lorsqu'il est présent, applique le style invalide et remplace la description."
    }
   ],
   "demoHTML": "<pura-field label=\"E-mail\" description=\"Nous l'utiliserons pour envoyer la confirmation.\">\n  <pura-input type=\"email\" placeholder=\"vous@exemple.com\"></pura-input>\n</pura-field>\n\n<pura-field label=\"Mot de passe\" error=\"Le mot de passe doit comporter au moins 8 caractères.\">\n  <pura-input type=\"password\" placeholder=\"********\"></pura-input>\n</pura-field>"
  },
  "de": {
   "description": "Field ist eine native Web Component, die in einem vertikalen Stapel die Beschriftung, das Steuerelement (default-Slot), die Beschreibung und die Fehlermeldung eines Formularfelds anordnet. Verwenden Sie sie, um Struktur und Abstände jedes Inputs, Selects oder Textareas zu vereinheitlichen. Wenn das error-Attribut gesetzt ist, wird der Ungültig-Stil angewendet und die Fehlermeldung ersetzt die Beschreibung.",
   "attributes": [
    {
     "desc": "Beschriftungstext, der über dem Steuerelement angezeigt wird."
    },
    {
     "desc": "Hilfetext, der unter dem Steuerelement angezeigt wird (ausgeblendet, wenn ein Fehler vorliegt)."
    },
    {
     "desc": "Fehlermeldung; wenn vorhanden, wird der Ungültig-Stil angewendet und die Beschreibung ersetzt."
    }
   ],
   "demoHTML": "<pura-field label=\"E-Mail\" description=\"Wir verwenden sie, um die Bestätigung zu senden.\">\n  <pura-input type=\"email\" placeholder=\"sie@beispiel.com\"></pura-input>\n</pura-field>\n\n<pura-field label=\"Passwort\" error=\"Das Passwort muss mindestens 8 Zeichen lang sein.\">\n  <pura-input type=\"password\" placeholder=\"********\"></pura-input>\n</pura-field>"
  },
  "it": {
   "description": "Field è un web component nativo che dispone, in una pila verticale, l'etichetta, il controllo (slot default), la descrizione e il messaggio di errore di un campo di form. Usalo per standardizzare la struttura e la spaziatura di qualsiasi input, select o textarea. Quando l'attributo error è impostato, viene applicato lo stile non valido e il messaggio di errore sostituisce la descrizione.",
   "attributes": [
    {
     "desc": "Testo dell'etichetta mostrato sopra il controllo."
    },
    {
     "desc": "Testo di aiuto mostrato sotto il controllo (nascosto in presenza di un errore)."
    },
    {
     "desc": "Messaggio di errore; quando presente, applica lo stile non valido e sostituisce la descrizione."
    }
   ],
   "demoHTML": "<pura-field label=\"E-mail\" description=\"La useremo per inviare la conferma.\">\n  <pura-input type=\"email\" placeholder=\"tu@esempio.com\"></pura-input>\n</pura-field>\n\n<pura-field label=\"Password\" error=\"La password deve contenere almeno 8 caratteri.\">\n  <pura-input type=\"password\" placeholder=\"********\"></pura-input>\n</pura-field>"
  }
 },
 "file-dropzone": {
  "pt-BR": {
   "description": "`<pura-file-dropzone>` é uma região tracejada que se destaca ao arrastar sobre ela, abre o seletor de arquivos nativo ao clicar ou com Enter/Space, e mostra cada arquivo escolhido como um chip com seu nome, tamanho legível por humanos e um botão de remoção. Use-o em formulários de upload quando quiser uma experiência acessível construída sobre um `<input type=\"file\">` oculto. Ele tem uma camada agent-native: atributos `data-*` estáveis no host e em cada chip, além de um registro global `window.__puraFileDropzones` que mapeia o id de cada instância para um snapshot ativo `{ files }`, permitindo que agentes inspecionem o estado sem tocar no Shadow DOM.",
   "attributes": [
    {
     "desc": "Repassado ao input nativo para filtrar tipos de arquivo (ex.: \"image/*,.pdf\")."
    },
    {
     "desc": "Permite selecionar mais de um arquivo; sem ele, cada nova seleção substitui a anterior."
    },
    {
     "desc": "Bloqueia clique, teclado e soltar, e oculta o botão de remoção dos chips."
    },
    {
     "desc": "Texto de instrução visível e aria-label da zona."
    }
   ],
   "demoHTML": "<pura-file-dropzone\n  id=\"dz\"\n  label=\"Solte arquivos aqui ou clique para procurar\"\n  accept=\"image/*,.pdf\"\n  multiple>\n</pura-file-dropzone>\n<p id=\"dz-status\" style=\"font: 0.85rem sans-serif; color: #666; margin-top: 0.75rem;\">\n  Nenhum arquivo selecionado.\n</p>\n<script type=\"module\">\n  const dz = document.getElementById(\"dz\");\n  const status = document.getElementById(\"dz-status\");\n  dz.addEventListener(\"change\", (e) => {\n    const files = e.detail.files;\n    status.textContent = files.length\n      ? `${files.length} arquivo(s): ` + files.map((f) => f.name).join(\", \")\n      : \"Nenhum arquivo selecionado.\";\n  });\n</script>"
  },
  "fr": {
   "description": "`<pura-file-dropzone>` est une région en pointillés qui se met en évidence au survol par glissement, ouvre le sélecteur de fichiers natif au clic ou via Enter/Space, et affiche chaque fichier choisi sous forme de puce avec son nom, sa taille lisible par un humain et un bouton de suppression. Utilisez-la dans les formulaires de téléversement lorsque vous souhaitez une expérience accessible construite sur un `<input type=\"file\">` masqué. Elle dispose d'une couche agent-native : des attributs `data-*` stables sur l'hôte et sur chaque puce, ainsi qu'un registre global `window.__puraFileDropzones` qui associe l'id de chaque instance à un snapshot actif `{ files }`, permettant aux agents d'inspecter l'état sans toucher au Shadow DOM.",
   "attributes": [
    {
     "desc": "Transmis à l'input natif pour filtrer les types de fichiers (par ex. \"image/*,.pdf\")."
    },
    {
     "desc": "Permet de sélectionner plusieurs fichiers ; sans cet attribut, chaque nouvelle sélection remplace la précédente."
    },
    {
     "desc": "Bloque le clic, le clavier et le dépôt, et masque le bouton de suppression des puces."
    },
    {
     "desc": "Texte d'instruction visible et aria-label de la zone."
    }
   ],
   "demoHTML": "<pura-file-dropzone\n  id=\"dz\"\n  label=\"Déposez des fichiers ici ou cliquez pour parcourir\"\n  accept=\"image/*,.pdf\"\n  multiple>\n</pura-file-dropzone>\n<p id=\"dz-status\" style=\"font: 0.85rem sans-serif; color: #666; margin-top: 0.75rem;\">\n  Aucun fichier sélectionné.\n</p>\n<script type=\"module\">\n  const dz = document.getElementById(\"dz\");\n  const status = document.getElementById(\"dz-status\");\n  dz.addEventListener(\"change\", (e) => {\n    const files = e.detail.files;\n    status.textContent = files.length\n      ? `${files.length} fichier(s): ` + files.map((f) => f.name).join(\", \")\n      : \"Aucun fichier sélectionné.\";\n  });\n</script>"
  },
  "de": {
   "description": "`<pura-file-dropzone>` ist ein gestrichelter Bereich, der beim Darüberziehen hervorgehoben wird, beim Klick oder mit Enter/Space die native Dateiauswahl öffnet und jede gewählte Datei als Chip mit ihrem Namen, einer menschenlesbaren Größe und einer Entfernen-Schaltfläche anzeigt. Verwenden Sie ihn in Upload-Formularen, wenn Sie ein barrierefreies Erlebnis wünschen, das auf einem verborgenen `<input type=\"file\">` aufbaut. Er verfügt über eine agent-native Ebene: stabile `data-*`-Attribute auf dem Host und auf jedem Chip sowie ein globales `window.__puraFileDropzones`-Register, das die id jeder Instanz einem aktiven `{ files }`-Snapshot zuordnet, sodass Agenten den Zustand untersuchen können, ohne das Shadow DOM zu berühren.",
   "attributes": [
    {
     "desc": "An das native Input durchgereicht, um Dateitypen zu filtern (z. B. \"image/*,.pdf\")."
    },
    {
     "desc": "Erlaubt die Auswahl mehrerer Dateien; ohne dieses Attribut ersetzt jede neue Auswahl die vorherige."
    },
    {
     "desc": "Blockiert Klick, Tastatur und Drop und blendet die Entfernen-Schaltfläche der Chips aus."
    },
    {
     "desc": "Sichtbarer Anweisungstext und aria-label der Zone."
    }
   ],
   "demoHTML": "<pura-file-dropzone\n  id=\"dz\"\n  label=\"Dateien hier ablegen oder zum Durchsuchen klicken\"\n  accept=\"image/*,.pdf\"\n  multiple>\n</pura-file-dropzone>\n<p id=\"dz-status\" style=\"font: 0.85rem sans-serif; color: #666; margin-top: 0.75rem;\">\n  Keine Datei ausgewählt.\n</p>\n<script type=\"module\">\n  const dz = document.getElementById(\"dz\");\n  const status = document.getElementById(\"dz-status\");\n  dz.addEventListener(\"change\", (e) => {\n    const files = e.detail.files;\n    status.textContent = files.length\n      ? `${files.length} Datei(en): ` + files.map((f) => f.name).join(\", \")\n      : \"Keine Datei ausgewählt.\";\n  });\n</script>"
  },
  "it": {
   "description": "`<pura-file-dropzone>` è una regione tratteggiata che si evidenzia al passaggio durante il trascinamento, apre il selettore di file nativo al clic o con Enter/Space, e mostra ogni file scelto come un chip con il suo nome, una dimensione leggibile dall'utente e un pulsante di rimozione. Usalo nei form di caricamento quando desideri un'esperienza accessibile costruita su un `<input type=\"file\">` nascosto. Ha un livello agent-native: attributi `data-*` stabili sull'host e su ogni chip, oltre a un registro globale `window.__puraFileDropzones` che associa l'id di ogni istanza a uno snapshot attivo `{ files }`, consentendo agli agenti di ispezionare lo stato senza toccare lo Shadow DOM.",
   "attributes": [
    {
     "desc": "Trasmesso all'input nativo per filtrare i tipi di file (es. \"image/*,.pdf\")."
    },
    {
     "desc": "Consente di selezionare più di un file; senza questo attributo, ogni nuova selezione sostituisce la precedente."
    },
    {
     "desc": "Blocca clic, tastiera e rilascio, e nasconde il pulsante di rimozione dei chip."
    },
    {
     "desc": "Testo di istruzione visibile e aria-label della zona."
    }
   ],
   "demoHTML": "<pura-file-dropzone\n  id=\"dz\"\n  label=\"Trascina i file qui o fai clic per sfogliare\"\n  accept=\"image/*,.pdf\"\n  multiple>\n</pura-file-dropzone>\n<p id=\"dz-status\" style=\"font: 0.85rem sans-serif; color: #666; margin-top: 0.75rem;\">\n  Nessun file selezionato.\n</p>\n<script type=\"module\">\n  const dz = document.getElementById(\"dz\");\n  const status = document.getElementById(\"dz-status\");\n  dz.addEventListener(\"change\", (e) => {\n    const files = e.detail.files;\n    status.textContent = files.length\n      ? `${files.length} file: ` + files.map((f) => f.name).join(\", \")\n      : \"Nessun file selezionato.\";\n  });\n</script>"
  }
 },
 "input": {
  "pt-BR": {
   "description": "`<pura-input>` é um web component nativo que renderiza um campo de texto com rótulo e texto de dica opcionais. Use-o em formulários para coletar texto, e-mail, senha ou qualquer tipo suportado pelo input do HTML. Ele reflete o valor digitado de volta para o atributo `value` do host e dispara um evento `input` a cada tecla pressionada.",
   "attributes": [
    {
     "desc": "Texto do rótulo exibido acima do campo."
    },
    {
     "desc": "Texto de dica exibido abaixo do campo."
    },
    {
     "desc": "Texto de exemplo exibido quando o campo está vazio."
    },
    {
     "desc": "Tipo do input HTML (text, email, password, etc)."
    },
    {
     "desc": "Valor atual do campo; também disponível como a propriedade .value."
    },
    {
     "desc": "Desabilita o campo quando presente."
    },
    {
     "desc": "Aplica o estilo de erro e define aria-invalid quando presente."
    }
   ],
   "demoHTML": "<pura-input\n  label=\"E-mail\"\n  type=\"email\"\n  placeholder=\"voce@exemplo.com\"\n  hint=\"Nunca compartilhamos seu e-mail.\"\n></pura-input>"
  },
  "fr": {
   "description": "`<pura-input>` est un web component natif qui affiche un champ de texte avec un libellé et un texte d'indication facultatifs. Utilisez-le dans les formulaires pour collecter du texte, un e-mail, un mot de passe ou tout type pris en charge par l'input HTML. Il répercute la valeur saisie vers l'attribut `value` de l'hôte et déclenche un événement `input` à chaque frappe.",
   "attributes": [
    {
     "desc": "Texte du libellé affiché au-dessus du champ."
    },
    {
     "desc": "Texte d'indication affiché sous le champ."
    },
    {
     "desc": "Texte d'exemple affiché lorsque le champ est vide."
    },
    {
     "desc": "Type de l'input HTML (text, email, password, etc)."
    },
    {
     "desc": "Valeur actuelle du champ ; également disponible via la propriété .value."
    },
    {
     "desc": "Désactive le champ lorsqu'il est présent."
    },
    {
     "desc": "Applique le style d'erreur et définit aria-invalid lorsqu'il est présent."
    }
   ],
   "demoHTML": "<pura-input\n  label=\"E-mail\"\n  type=\"email\"\n  placeholder=\"vous@exemple.com\"\n  hint=\"Nous ne partageons jamais votre e-mail.\"\n></pura-input>"
  },
  "de": {
   "description": "`<pura-input>` ist eine native Web Component, die ein Textfeld mit optionaler Beschriftung und optionalem Hinweistext rendert. Verwenden Sie es in Formularen, um Text, E-Mail, Passwort oder jeden vom HTML-Input unterstützten Typ zu erfassen. Es spiegelt den eingegebenen Wert zurück zum `value`-Attribut des Hosts und löst bei jedem Tastenanschlag ein `input`-Ereignis aus.",
   "attributes": [
    {
     "desc": "Beschriftungstext, der über dem Feld angezeigt wird."
    },
    {
     "desc": "Hinweistext, der unter dem Feld angezeigt wird."
    },
    {
     "desc": "Beispieltext, der angezeigt wird, wenn das Feld leer ist."
    },
    {
     "desc": "HTML-Input-Typ (text, email, password usw.)."
    },
    {
     "desc": "Aktueller Wert des Felds; auch als .value-Eigenschaft verfügbar."
    },
    {
     "desc": "Deaktiviert das Feld, wenn vorhanden."
    },
    {
     "desc": "Wendet den Fehlerstil an und setzt aria-invalid, wenn vorhanden."
    }
   ],
   "demoHTML": "<pura-input\n  label=\"E-Mail\"\n  type=\"email\"\n  placeholder=\"sie@beispiel.com\"\n  hint=\"Wir geben Ihre E-Mail niemals weiter.\"\n></pura-input>"
  },
  "it": {
   "description": "`<pura-input>` è un web component nativo che esegue il rendering di un campo di testo con etichetta e testo di suggerimento facoltativi. Usalo nei form per raccogliere testo, e-mail, password o qualsiasi tipo supportato dall'input HTML. Rispecchia il valore digitato nell'attributo `value` dell'host e attiva un evento `input` a ogni pressione di tasto.",
   "attributes": [
    {
     "desc": "Testo dell'etichetta mostrato sopra il campo."
    },
    {
     "desc": "Testo di suggerimento mostrato sotto il campo."
    },
    {
     "desc": "Testo di esempio mostrato quando il campo è vuoto."
    },
    {
     "desc": "Tipo dell'input HTML (text, email, password, ecc)."
    },
    {
     "desc": "Valore corrente del campo; disponibile anche come proprietà .value."
    },
    {
     "desc": "Disabilita il campo quando presente."
    },
    {
     "desc": "Applica lo stile di errore e imposta aria-invalid quando presente."
    }
   ],
   "demoHTML": "<pura-input\n  label=\"E-mail\"\n  type=\"email\"\n  placeholder=\"tu@esempio.com\"\n  hint=\"Non condividiamo mai la tua e-mail.\"\n></pura-input>"
  }
 },
 "input-group": {
  "pt-BR": {
   "description": "O Input Group é um web component nativo que envolve um controle de entrada (um <input> simples ou um <pura-input>) junto com addons opcionais nos slots de prefixo e sufixo, tudo dentro de um único contêiner arredondado com um anel de foco compartilhado (:focus-within). Use-o quando precisar anexar ícones, texto, símbolos de unidade ou botões diretamente ao campo, como em valores monetários, URLs ou buscas. Os estados disabled e invalid espelham o comportamento visual do pura-input.",
   "attributes": [
    {
     "desc": "Desabilita o grupo, reduzindo a opacidade e bloqueando a interação com o conteúdo dos slots."
    },
    {
     "desc": "Aplica o estilo de erro (borda e anel na cor de perigo) ao contêiner."
    }
   ],
   "demoHTML": "<pura-input-group>\n  <span slot=\"prefix\">R$</span>\n  <input type=\"text\" inputmode=\"decimal\" placeholder=\"0,00\" aria-label=\"Valor\" />\n  <span slot=\"suffix\">BRL</span>\n</pura-input-group>\n\n<pura-input-group style=\"margin-top: 12px;\">\n  <span slot=\"prefix\">https://</span>\n  <input type=\"text\" placeholder=\"meu-site\" aria-label=\"Endereço do site\" />\n  <span slot=\"suffix\">.com</span>\n</pura-input-group>\n\n<pura-input-group invalid style=\"margin-top: 12px;\">\n  <input type=\"email\" placeholder=\"voce@email.com\" aria-label=\"E-mail\" value=\"email-invalido\" />\n  <span slot=\"suffix\">!</span>\n</pura-input-group>"
  },
  "fr": {
   "description": "Input Group est un composant web natif qui enveloppe un contrôle de saisie (un <input> simple ou un <pura-input>) avec des addons optionnels dans les slots préfixe et suffixe, le tout dans un unique conteneur arrondi avec un anneau de focus partagé (:focus-within). Utilisez-le lorsque vous devez attacher des icônes, du texte, des symboles d'unité ou des boutons directement au champ, comme pour des valeurs monétaires, des URL ou des recherches. Les états disabled et invalid reflètent le comportement visuel de pura-input.",
   "attributes": [
    {
     "desc": "Désactive le groupe, en réduisant l'opacité et en bloquant l'interaction avec le contenu des slots."
    },
    {
     "desc": "Applique le style d'erreur (bordure et anneau dans la couleur de danger) au conteneur."
    }
   ],
   "demoHTML": "<pura-input-group>\n  <span slot=\"prefix\">€</span>\n  <input type=\"text\" inputmode=\"decimal\" placeholder=\"0,00\" aria-label=\"Montant\" />\n  <span slot=\"suffix\">EUR</span>\n</pura-input-group>\n\n<pura-input-group style=\"margin-top: 12px;\">\n  <span slot=\"prefix\">https://</span>\n  <input type=\"text\" placeholder=\"mon-site\" aria-label=\"Adresse du site\" />\n  <span slot=\"suffix\">.com</span>\n</pura-input-group>\n\n<pura-input-group invalid style=\"margin-top: 12px;\">\n  <input type=\"email\" placeholder=\"vous@email.com\" aria-label=\"E-mail\" value=\"email-invalide\" />\n  <span slot=\"suffix\">!</span>\n</pura-input-group>"
  },
  "de": {
   "description": "Input Group ist eine native Web-Komponente, die ein Eingabesteuerelement (ein einfaches <input> oder ein <pura-input>) zusammen mit optionalen Add-ons in den Präfix- und Suffix-Slots umschließt, alles in einem einzigen abgerundeten Container mit gemeinsamem Fokusring (:focus-within). Verwenden Sie sie, wenn Sie Symbole, Text, Einheitenzeichen oder Schaltflächen direkt an das Feld anhängen möchten, etwa bei Währungswerten, URLs oder Suchen. Die Zustände disabled und invalid spiegeln das visuelle Verhalten von pura-input wider.",
   "attributes": [
    {
     "desc": "Deaktiviert die Gruppe, verringert die Deckkraft und blockiert die Interaktion mit dem Slot-Inhalt."
    },
    {
     "desc": "Wendet den Fehlerstil (Rahmen und Ring in der Gefahrenfarbe) auf den Container an."
    }
   ],
   "demoHTML": "<pura-input-group>\n  <span slot=\"prefix\">€</span>\n  <input type=\"text\" inputmode=\"decimal\" placeholder=\"0,00\" aria-label=\"Betrag\" />\n  <span slot=\"suffix\">EUR</span>\n</pura-input-group>\n\n<pura-input-group style=\"margin-top: 12px;\">\n  <span slot=\"prefix\">https://</span>\n  <input type=\"text\" placeholder=\"meine-seite\" aria-label=\"Webadresse\" />\n  <span slot=\"suffix\">.com</span>\n</pura-input-group>\n\n<pura-input-group invalid style=\"margin-top: 12px;\">\n  <input type=\"email\" placeholder=\"sie@email.com\" aria-label=\"E-Mail\" value=\"ungueltige-email\" />\n  <span slot=\"suffix\">!</span>\n</pura-input-group>"
  },
  "it": {
   "description": "Input Group è un web component nativo che racchiude un controllo di input (un semplice <input> o un <pura-input>) insieme ad addon opzionali negli slot prefisso e suffisso, il tutto in un unico contenitore arrotondato con un anello di focus condiviso (:focus-within). Usalo quando devi collegare icone, testo, simboli di unità o pulsanti direttamente al campo, come nei valori monetari, negli URL o nelle ricerche. Gli stati disabled e invalid rispecchiano il comportamento visivo di pura-input.",
   "attributes": [
    {
     "desc": "Disabilita il gruppo, riducendo l'opacità e bloccando l'interazione con il contenuto degli slot."
    },
    {
     "desc": "Applica lo stile di errore (bordo e anello nel colore di pericolo) al contenitore."
    }
   ],
   "demoHTML": "<pura-input-group>\n  <span slot=\"prefix\">€</span>\n  <input type=\"text\" inputmode=\"decimal\" placeholder=\"0,00\" aria-label=\"Importo\" />\n  <span slot=\"suffix\">EUR</span>\n</pura-input-group>\n\n<pura-input-group style=\"margin-top: 12px;\">\n  <span slot=\"prefix\">https://</span>\n  <input type=\"text\" placeholder=\"mio-sito\" aria-label=\"Indirizzo del sito\" />\n  <span slot=\"suffix\">.com</span>\n</pura-input-group>\n\n<pura-input-group invalid style=\"margin-top: 12px;\">\n  <input type=\"email\" placeholder=\"tu@email.com\" aria-label=\"E-mail\" value=\"email-non-valida\" />\n  <span slot=\"suffix\">!</span>\n</pura-input-group>"
  }
 },
 "input-otp": {
  "pt-BR": {
   "description": "O Input OTP é um web component nativo que renderiza uma série de caixas de um único caractere para digitar códigos de verificação (one-time code). A digitação avança automaticamente, Backspace volta e limpa, as setas navegam e colar um código preenche todas as caixas de uma vez. Use-o em fluxos de autenticação de dois fatores, verificação por e-mail ou SMS e confirmações de PIN.",
   "attributes": [
    {
     "desc": "Número de caixas de dígito renderizadas."
    },
    {
     "desc": "Código atual; espelhado no atributo a cada alteração."
    },
    {
     "desc": "Desabilita todas as caixas de entrada."
    },
    {
     "desc": "Aplica o estilo de erro e define aria-invalid."
    },
    {
     "desc": "Aceita letras e números; sem ele, apenas dígitos."
    },
    {
     "desc": "Usa uma fonte monoespaçada nas caixas."
    }
   ],
   "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:.75rem;align-items:flex-start\">\n  <label style=\"font-size:.875rem;font-weight:550\">Digite o código de verificação</label>\n  <pura-input-otp id=\"otp\" length=\"6\" mono></pura-input-otp>\n  <small id=\"otp-status\" style=\"color:var(--pura-muted-fg)\">6 dígitos enviados para o seu e-mail.</small>\n</div>\n<script type=\"module\">\n  const otp = document.getElementById(\"otp\");\n  const status = document.getElementById(\"otp-status\");\n  otp.addEventListener(\"complete\", (e) => {\n    status.textContent = \"Código completo: \" + e.detail.value;\n  });\n</script>"
  },
  "fr": {
   "description": "Input OTP est un composant web natif qui affiche une série de cases à un seul caractère pour saisir des codes de vérification (one-time code). La saisie avance automatiquement, Retour arrière revient en arrière et efface, les touches fléchées permettent de naviguer et coller un code remplit toutes les cases en une fois. Utilisez-le dans les flux d'authentification à deux facteurs, la vérification par e-mail ou SMS et les confirmations de code PIN.",
   "attributes": [
    {
     "desc": "Nombre de cases de chiffres affichées."
    },
    {
     "desc": "Code actuel ; reflété dans l'attribut à chaque modification."
    },
    {
     "desc": "Désactive toutes les cases de saisie."
    },
    {
     "desc": "Applique le style d'erreur et définit aria-invalid."
    },
    {
     "desc": "Accepte les lettres et les chiffres ; sans cette option, uniquement des chiffres."
    },
    {
     "desc": "Utilise une police à chasse fixe dans les cases."
    }
   ],
   "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:.75rem;align-items:flex-start\">\n  <label style=\"font-size:.875rem;font-weight:550\">Saisissez le code de vérification</label>\n  <pura-input-otp id=\"otp\" length=\"6\" mono></pura-input-otp>\n  <small id=\"otp-status\" style=\"color:var(--pura-muted-fg)\">6 chiffres envoyés à votre e-mail.</small>\n</div>\n<script type=\"module\">\n  const otp = document.getElementById(\"otp\");\n  const status = document.getElementById(\"otp-status\");\n  otp.addEventListener(\"complete\", (e) => {\n    status.textContent = \"Code complet : \" + e.detail.value;\n  });\n</script>"
  },
  "de": {
   "description": "Input OTP ist eine native Web-Komponente, die eine Reihe von Feldern mit jeweils einem Zeichen zur Eingabe von Verifizierungscodes (one-time code) darstellt. Die Eingabe springt automatisch weiter, Backspace geht zurück und löscht, die Pfeiltasten navigieren und das Einfügen eines Codes füllt alle Felder auf einmal. Verwenden Sie sie in Zwei-Faktor-Authentifizierungsabläufen, der Verifizierung per E-Mail oder SMS und PIN-Bestätigungen.",
   "attributes": [
    {
     "desc": "Anzahl der dargestellten Ziffernfelder."
    },
    {
     "desc": "Aktueller Code; wird bei jeder Änderung im Attribut gespiegelt."
    },
    {
     "desc": "Deaktiviert alle Eingabefelder."
    },
    {
     "desc": "Wendet den Fehlerstil an und setzt aria-invalid."
    },
    {
     "desc": "Akzeptiert Buchstaben und Zahlen; ohne diese Option nur Ziffern."
    },
    {
     "desc": "Verwendet eine dicktengleiche Schrift in den Feldern."
    }
   ],
   "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:.75rem;align-items:flex-start\">\n  <label style=\"font-size:.875rem;font-weight:550\">Geben Sie den Bestätigungscode ein</label>\n  <pura-input-otp id=\"otp\" length=\"6\" mono></pura-input-otp>\n  <small id=\"otp-status\" style=\"color:var(--pura-muted-fg)\">6 Ziffern an Ihre E-Mail gesendet.</small>\n</div>\n<script type=\"module\">\n  const otp = document.getElementById(\"otp\");\n  const status = document.getElementById(\"otp-status\");\n  otp.addEventListener(\"complete\", (e) => {\n    status.textContent = \"Code vollständig: \" + e.detail.value;\n  });\n</script>"
  },
  "it": {
   "description": "Input OTP è un web component nativo che visualizza una serie di caselle a singolo carattere per inserire codici di verifica (one-time code). La digitazione avanza automaticamente, Backspace torna indietro e cancella, i tasti freccia permettono di navigare e incollare un codice riempie tutte le caselle in una volta. Usalo nei flussi di autenticazione a due fattori, nella verifica via e-mail o SMS e nelle conferme del PIN.",
   "attributes": [
    {
     "desc": "Numero di caselle per le cifre visualizzate."
    },
    {
     "desc": "Codice attuale; rispecchiato nell'attributo a ogni modifica."
    },
    {
     "desc": "Disabilita tutte le caselle di input."
    },
    {
     "desc": "Applica lo stile di errore e imposta aria-invalid."
    },
    {
     "desc": "Accetta lettere e numeri; senza questa opzione, solo cifre."
    },
    {
     "desc": "Usa un font a spaziatura fissa nelle caselle."
    }
   ],
   "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:.75rem;align-items:flex-start\">\n  <label style=\"font-size:.875rem;font-weight:550\">Inserisci il codice di verifica</label>\n  <pura-input-otp id=\"otp\" length=\"6\" mono></pura-input-otp>\n  <small id=\"otp-status\" style=\"color:var(--pura-muted-fg)\">6 cifre inviate alla tua e-mail.</small>\n</div>\n<script type=\"module\">\n  const otp = document.getElementById(\"otp\");\n  const status = document.getElementById(\"otp-status\");\n  otp.addEventListener(\"complete\", (e) => {\n    status.textContent = \"Codice completo: \" + e.detail.value;\n  });\n</script>"
  }
 },
 "label": {
  "pt-BR": {
   "description": "O pura-label é um web component nativo que renderiza um rótulo de formulário acessível. Use-o para identificar campos de entrada: ao definir o atributo \"for\" com o id do controle, clicar no texto foca o campo e, no caso de checkboxes, radios ou switches, também os alterna, replicando o comportamento do elemento label nativo.",
   "attributes": [
    {
     "desc": "Id do controle que o rótulo descreve; clicar nele foca e (quando aplicável) ativa esse controle."
    }
   ],
   "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:8px;max-width:320px\">\n  <pura-label for=\"email\">E-mail</pura-label>\n  <input id=\"email\" type=\"email\" placeholder=\"voce@exemplo.com\" />\n\n  <div style=\"display:flex;align-items:center;gap:8px;margin-top:8px\">\n    <input id=\"termos\" type=\"checkbox\" />\n    <pura-label for=\"termos\">Aceito os termos de uso</pura-label>\n  </div>\n</div>"
  },
  "fr": {
   "description": "pura-label est un composant web natif qui affiche une étiquette de formulaire accessible. Utilisez-la pour identifier les champs de saisie : en définissant l'attribut \"for\" avec l'id du contrôle, cliquer sur le texte met le focus sur le champ et, pour les cases à cocher, les boutons radio ou les interrupteurs, les bascule également, reproduisant le comportement de l'élément label natif.",
   "attributes": [
    {
     "desc": "Id du contrôle que l'étiquette décrit ; cliquer dessus met le focus sur ce contrôle et (le cas échéant) l'active."
    }
   ],
   "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:8px;max-width:320px\">\n  <pura-label for=\"email\">E-mail</pura-label>\n  <input id=\"email\" type=\"email\" placeholder=\"vous@exemple.com\" />\n\n  <div style=\"display:flex;align-items:center;gap:8px;margin-top:8px\">\n    <input id=\"termos\" type=\"checkbox\" />\n    <pura-label for=\"termos\">J'accepte les conditions d'utilisation</pura-label>\n  </div>\n</div>"
  },
  "de": {
   "description": "pura-label ist eine native Web-Komponente, die eine barrierefreie Formularbeschriftung darstellt. Verwenden Sie sie, um Eingabefelder zu kennzeichnen: Wenn Sie das Attribut \"for\" auf die id des Steuerelements setzen, fokussiert ein Klick auf den Text das Feld und schaltet es bei Kontrollkästchen, Optionsfeldern oder Schaltern zudem um, wodurch das Verhalten des nativen label-Elements nachgebildet wird.",
   "attributes": [
    {
     "desc": "Id des Steuerelements, das die Beschriftung beschreibt; ein Klick darauf fokussiert und (sofern zutreffend) aktiviert dieses Steuerelement."
    }
   ],
   "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:8px;max-width:320px\">\n  <pura-label for=\"email\">E-Mail</pura-label>\n  <input id=\"email\" type=\"email\" placeholder=\"sie@beispiel.com\" />\n\n  <div style=\"display:flex;align-items:center;gap:8px;margin-top:8px\">\n    <input id=\"termos\" type=\"checkbox\" />\n    <pura-label for=\"termos\">Ich akzeptiere die Nutzungsbedingungen</pura-label>\n  </div>\n</div>"
  },
  "it": {
   "description": "pura-label è un web component nativo che visualizza un'etichetta di modulo accessibile. Usala per identificare i campi di input: impostando l'attributo \"for\" con l'id del controllo, cliccando sul testo si mette a fuoco il campo e, nel caso di checkbox, radio o switch, lo si commuta anche, replicando il comportamento dell'elemento label nativo.",
   "attributes": [
    {
     "desc": "Id del controllo descritto dall'etichetta; cliccandola si mette a fuoco e (quando applicabile) si attiva quel controllo."
    }
   ],
   "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:8px;max-width:320px\">\n  <pura-label for=\"email\">E-mail</pura-label>\n  <input id=\"email\" type=\"email\" placeholder=\"tu@esempio.com\" />\n\n  <div style=\"display:flex;align-items:center;gap:8px;margin-top:8px\">\n    <input id=\"termos\" type=\"checkbox\" />\n    <pura-label for=\"termos\">Accetto i termini di utilizzo</pura-label>\n  </div>\n</div>"
  }
 },
 "number-input": {
  "pt-BR": {
   "description": "Um campo numérico nativo ladeado por botões de menos e mais que limita o valor ao intervalo [min, max], alinha-o ao passo e espelha o valor de volta no atributo do host. Use-o quando precisar de entrada numérica controlada (quantidades, preços, idade) com suporte de teclado (setas, PageUp/PageDown, Home/End) e um spinbutton ARIA. Ele expõe a propriedade .value (Number) e emite os eventos input (ao vivo) e change (na confirmação).",
   "attributes": [
    {
     "desc": "Valor mínimo permitido. Define o limite inferior e a origem para o alinhamento ao passo; também habilita a tecla Home para saltar ao mínimo."
    },
    {
     "desc": "Valor máximo permitido. Define o limite superior; habilita a tecla End para saltar ao máximo."
    },
    {
     "desc": "Incremento dos botões e das setas. PageUp/PageDown usam step x 10. O valor é alinhado ao múltiplo de step mais próximo a partir de min (ou 0)."
    },
    {
     "desc": "Valor atual. É refletido de volta no atributo após o clamp/alinhamento. Pode ser lido/escrito pela propriedade .value como Number."
    },
    {
     "desc": "Desabilita o campo e os botões de passo."
    },
    {
     "desc": "Rótulo acessível aplicado ao grupo (role=group) que envolve o campo e os botões."
    }
   ],
   "demoHTML": "<label for=\"qtd\" style=\"display:block;margin-bottom:.5rem;font:14px system-ui\">Número de produtos</label>\n<pura-number-input id=\"qtd\" aria-label=\"Quantidade\" min=\"0\" max=\"20\" step=\"1\" value=\"3\"></pura-number-input>\n<p id=\"qtd-out\" style=\"margin-top:.75rem;font:14px system-ui;color:#555\">Selecionado: 3</p>\n<script type=\"module\">\n  import \"/pura/lib/number-input.js\";\n  const inp = document.getElementById(\"qtd\");\n  const out = document.getElementById(\"qtd-out\");\n  inp.addEventListener(\"change\", (e) => {\n    out.textContent = \"Selecionado: \" + e.detail.value;\n  });\n</script>"
  },
  "fr": {
   "description": "Un champ numérique natif encadré par des boutons moins et plus qui limite la valeur à l'intervalle [min, max], l'aligne sur le pas et reflète la valeur dans l'attribut de l'hôte. Utilisez-le lorsque vous avez besoin d'une saisie numérique contrôlée (quantités, prix, âge) avec prise en charge du clavier (flèches, PageUp/PageDown, Home/End) et un spinbutton ARIA. Il expose la propriété .value (Number) et émet les événements input (en direct) et change (à la validation).",
   "attributes": [
    {
     "desc": "Valeur minimale autorisée. Définit la borne inférieure et l'origine de l'alignement sur le pas ; active également la touche Home pour aller au minimum."
    },
    {
     "desc": "Valeur maximale autorisée. Définit la borne supérieure ; active la touche End pour aller au maximum."
    },
    {
     "desc": "Incrément des boutons et des flèches. PageUp/PageDown utilisent step x 10. La valeur est alignée sur le multiple de step le plus proche à partir de min (ou 0)."
    },
    {
     "desc": "Valeur actuelle. Elle est reflétée dans l'attribut après le bornage/alignement. Elle peut être lue/écrite via la propriété .value sous forme de Number."
    },
    {
     "desc": "Désactive le champ et les boutons de pas."
    },
    {
     "desc": "Étiquette accessible appliquée au groupe (role=group) qui entoure le champ et les boutons."
    }
   ],
   "demoHTML": "<label for=\"qtd\" style=\"display:block;margin-bottom:.5rem;font:14px system-ui\">Nombre de produits</label>\n<pura-number-input id=\"qtd\" aria-label=\"Quantité\" min=\"0\" max=\"20\" step=\"1\" value=\"3\"></pura-number-input>\n<p id=\"qtd-out\" style=\"margin-top:.75rem;font:14px system-ui;color:#555\">Sélectionné : 3</p>\n<script type=\"module\">\n  import \"/pura/lib/number-input.js\";\n  const inp = document.getElementById(\"qtd\");\n  const out = document.getElementById(\"qtd-out\");\n  inp.addEventListener(\"change\", (e) => {\n    out.textContent = \"Sélectionné : \" + e.detail.value;\n  });\n</script>"
  },
  "de": {
   "description": "Ein natives numerisches Feld, flankiert von Minus- und Plus-Schaltflächen, das den Wert auf den Bereich [min, max] begrenzt, ihn am Schritt ausrichtet und den Wert in das Host-Attribut zurückspiegelt. Verwenden Sie es, wenn Sie eine kontrollierte numerische Eingabe (Mengen, Preise, Alter) mit Tastaturunterstützung (Pfeiltasten, PageUp/PageDown, Home/End) und einem ARIA-Spinbutton benötigen. Es stellt die Eigenschaft .value (Number) bereit und löst die Ereignisse input (live) und change (beim Bestätigen) aus.",
   "attributes": [
    {
     "desc": "Minimal zulässiger Wert. Legt die untere Begrenzung und den Ursprung für die Ausrichtung am Schritt fest; aktiviert außerdem die Home-Taste, um zum Minimum zu springen."
    },
    {
     "desc": "Maximal zulässiger Wert. Legt die obere Begrenzung fest; aktiviert die End-Taste, um zum Maximum zu springen."
    },
    {
     "desc": "Inkrement für die Schaltflächen und Pfeiltasten. PageUp/PageDown verwenden step x 10. Der Wert wird auf das nächste Vielfache von step ausgehend von min (oder 0) ausgerichtet."
    },
    {
     "desc": "Aktueller Wert. Er wird nach Begrenzung/Ausrichtung in das Attribut zurückgespiegelt. Er kann über die Eigenschaft .value als Number gelesen/geschrieben werden."
    },
    {
     "desc": "Deaktiviert das Feld und die Schritt-Schaltflächen."
    },
    {
     "desc": "Barrierefreie Beschriftung, die auf die Gruppe (role=group) angewendet wird, die das Feld und die Schaltflächen umschließt."
    }
   ],
   "demoHTML": "<label for=\"qtd\" style=\"display:block;margin-bottom:.5rem;font:14px system-ui\">Anzahl der Produkte</label>\n<pura-number-input id=\"qtd\" aria-label=\"Menge\" min=\"0\" max=\"20\" step=\"1\" value=\"3\"></pura-number-input>\n<p id=\"qtd-out\" style=\"margin-top:.75rem;font:14px system-ui;color:#555\">Ausgewählt: 3</p>\n<script type=\"module\">\n  import \"/pura/lib/number-input.js\";\n  const inp = document.getElementById(\"qtd\");\n  const out = document.getElementById(\"qtd-out\");\n  inp.addEventListener(\"change\", (e) => {\n    out.textContent = \"Ausgewählt: \" + e.detail.value;\n  });\n</script>"
  },
  "it": {
   "description": "Un campo numerico nativo affiancato da pulsanti meno e più che limita il valore all'intervallo [min, max], lo allinea al passo e rispecchia il valore nell'attributo dell'host. Usalo quando hai bisogno di un input numerico controllato (quantità, prezzi, età) con supporto da tastiera (frecce, PageUp/PageDown, Home/End) e uno spinbutton ARIA. Espone la proprietà .value (Number) ed emette gli eventi input (in tempo reale) e change (alla conferma).",
   "attributes": [
    {
     "desc": "Valore minimo consentito. Imposta il limite inferiore e l'origine per l'allineamento al passo; abilita inoltre il tasto Home per saltare al minimo."
    },
    {
     "desc": "Valore massimo consentito. Imposta il limite superiore; abilita il tasto End per saltare al massimo."
    },
    {
     "desc": "Incremento per i pulsanti e le frecce. PageUp/PageDown usano step x 10. Il valore viene allineato al multiplo di step più vicino a partire da min (o 0)."
    },
    {
     "desc": "Valore attuale. Viene rispecchiato nell'attributo dopo il clamp/allineamento. Può essere letto/scritto tramite la proprietà .value come Number."
    },
    {
     "desc": "Disabilita il campo e i pulsanti di passo."
    },
    {
     "desc": "Etichetta accessibile applicata al gruppo (role=group) che racchiude il campo e i pulsanti."
    }
   ],
   "demoHTML": "<label for=\"qtd\" style=\"display:block;margin-bottom:.5rem;font:14px system-ui\">Numero di prodotti</label>\n<pura-number-input id=\"qtd\" aria-label=\"Quantità\" min=\"0\" max=\"20\" step=\"1\" value=\"3\"></pura-number-input>\n<p id=\"qtd-out\" style=\"margin-top:.75rem;font:14px system-ui;color:#555\">Selezionato: 3</p>\n<script type=\"module\">\n  import \"/pura/lib/number-input.js\";\n  const inp = document.getElementById(\"qtd\");\n  const out = document.getElementById(\"qtd-out\");\n  inp.addEventListener(\"change\", (e) => {\n    out.textContent = \"Selezionato: \" + e.detail.value;\n  });\n</script>"
  }
 },
 "radio-group": {
  "pt-BR": {
   "description": "O Radio Group é um web component nativo que agrupa elementos filhos <pura-radio>, permitindo selecionar apenas uma opção por vez. Ele renderiza um wrapper com role=radiogroup, oferece navegação por setas (roving tabindex) e reflete a opção escolhida no atributo value. Use-o quando o usuário precisar escolher exatamente uma alternativa entre poucas opções visíveis.",
   "attributes": [
    {
     "desc": "Texto de título/legenda do grupo, também usado como aria-label."
    },
    {
     "desc": "Direção de layout das opções."
    },
    {
     "desc": "Valor da opção selecionada; reflete e é refletido pelo radio marcado."
    },
    {
     "desc": "Desabilita o grupo inteiro, bloqueando a interação."
    }
   ],
   "demoHTML": "<pura-radio-group label=\"Plano de assinatura\" value=\"pro\">\n  <pura-radio name=\"plano\" value=\"free\">Gratuito</pura-radio>\n  <pura-radio name=\"plano\" value=\"pro\">Profissional</pura-radio>\n  <pura-radio name=\"plano\" value=\"team\">Equipe</pura-radio>\n  <pura-radio name=\"plano\" value=\"legacy\" disabled>Legado (indisponível)</pura-radio>\n</pura-radio-group>"
  },
  "fr": {
   "description": "Radio Group est un composant web natif qui regroupe des éléments enfants <pura-radio>, ne permettant de sélectionner qu'une seule option à la fois. Il affiche un wrapper avec role=radiogroup, propose une navigation au clavier par les flèches (roving tabindex) et reflète l'option choisie dans l'attribut value. Utilisez-le lorsque l'utilisateur doit choisir exactement une alternative parmi quelques options visibles.",
   "attributes": [
    {
     "desc": "Texte de titre/légende du groupe, également utilisé comme aria-label."
    },
    {
     "desc": "Sens de disposition des options."
    },
    {
     "desc": "Valeur de l'option sélectionnée ; elle reflète et est reflétée par le bouton radio coché."
    },
    {
     "desc": "Désactive l'ensemble du groupe, en bloquant l'interaction."
    }
   ],
   "demoHTML": "<pura-radio-group label=\"Formule d'abonnement\" value=\"pro\">\n  <pura-radio name=\"plano\" value=\"free\">Gratuit</pura-radio>\n  <pura-radio name=\"plano\" value=\"pro\">Professionnel</pura-radio>\n  <pura-radio name=\"plano\" value=\"team\">Équipe</pura-radio>\n  <pura-radio name=\"plano\" value=\"legacy\" disabled>Ancien (indisponible)</pura-radio>\n</pura-radio-group>"
  },
  "de": {
   "description": "Radio Group ist eine native Web-Komponente, die untergeordnete <pura-radio>-Elemente gruppiert und es erlaubt, jeweils nur eine Option auszuwählen. Sie stellt einen Wrapper mit role=radiogroup dar, bietet Navigation per Pfeiltasten (Roving-Tabindex) und spiegelt die gewählte Option im Attribut value wider. Verwenden Sie sie, wenn der Benutzer genau eine Alternative aus einigen sichtbaren Optionen auswählen muss.",
   "attributes": [
    {
     "desc": "Überschriften-/Legendentext der Gruppe, der auch als aria-label verwendet wird."
    },
    {
     "desc": "Anordnungsrichtung der Optionen."
    },
    {
     "desc": "Wert der ausgewählten Option; spiegelt das markierte Optionsfeld wider und wird von ihm widergespiegelt."
    },
    {
     "desc": "Deaktiviert die gesamte Gruppe und blockiert die Interaktion."
    }
   ],
   "demoHTML": "<pura-radio-group label=\"Abonnement-Tarif\" value=\"pro\">\n  <pura-radio name=\"plano\" value=\"free\">Kostenlos</pura-radio>\n  <pura-radio name=\"plano\" value=\"pro\">Professionell</pura-radio>\n  <pura-radio name=\"plano\" value=\"team\">Team</pura-radio>\n  <pura-radio name=\"plano\" value=\"legacy\" disabled>Legacy (nicht verfügbar)</pura-radio>\n</pura-radio-group>"
  },
  "it": {
   "description": "Radio Group è un web component nativo che raggruppa elementi figli <pura-radio>, consentendo di selezionare una sola opzione alla volta. Visualizza un wrapper con role=radiogroup, offre la navigazione con i tasti freccia (roving tabindex) e rispecchia l'opzione scelta nell'attributo value. Usalo quando l'utente deve scegliere esattamente un'alternativa tra poche opzioni visibili.",
   "attributes": [
    {
     "desc": "Testo del titolo/legenda del gruppo, usato anche come aria-label."
    },
    {
     "desc": "Direzione di disposizione delle opzioni."
    },
    {
     "desc": "Valore dell'opzione selezionata; rispecchia ed è rispecchiato dal radio selezionato."
    },
    {
     "desc": "Disabilita l'intero gruppo, bloccando l'interazione."
    }
   ],
   "demoHTML": "<pura-radio-group label=\"Piano di abbonamento\" value=\"pro\">\n  <pura-radio name=\"plano\" value=\"free\">Gratuito</pura-radio>\n  <pura-radio name=\"plano\" value=\"pro\">Professionale</pura-radio>\n  <pura-radio name=\"plano\" value=\"team\">Team</pura-radio>\n  <pura-radio name=\"plano\" value=\"legacy\" disabled>Legacy (non disponibile)</pura-radio>\n</pura-radio-group>"
  }
 },
 "range-slider": {
  "pt-BR": {
   "description": "`<pura-range-slider>` é um controle deslizante de intervalo com dois marcadores (mínimo e máximo) sobre uma trilha, com o segmento entre eles preenchido. Use-o quando o usuário precisar escolher um intervalo de valores, como uma faixa de preço ou de datas, em vez de apenas um único número. Cada marcador é um `role=\"slider\"` independente com seus próprios `aria-valuemin/max/now` e expõe seu estado atual em `data-pura-value`, tornando cada marcador legível e operável por leitores de tela e agentes via teclado (setas, Home, End, PageUp, PageDown).",
   "attributes": [
    {
     "desc": "Valor mínimo do intervalo."
    },
    {
     "desc": "Valor máximo do intervalo. Se for menor ou igual a min, torna-se min + 1."
    },
    {
     "desc": "Incremento entre os valores; os valores são alinhados ao passo mais próximo."
    },
    {
     "desc": "Posição do marcador inferior. Refletida de volta no host; nunca ultrapassa value-max."
    },
    {
     "desc": "Posição do marcador superior. Refletida de volta no host; nunca fica abaixo de value-min."
    },
    {
     "desc": "Desabilita a interação por ponteiro e teclado e remove os marcadores da ordem de tabulação."
    },
    {
     "desc": "Rótulo base usado para nomear os marcadores como \"<label> mínimo\" e \"<label> máximo\"."
    }
   ],
   "demoHTML": "<label for=\"preco\" style=\"display:block;margin-bottom:.5rem;font:500 .875rem system-ui\">Faixa de preço</label>\n<pura-range-slider id=\"preco\" aria-label=\"Faixa de preço\"\n  min=\"0\" max=\"1000\" step=\"50\" value-min=\"200\" value-max=\"750\"></pura-range-slider>\n<p id=\"saida\" style=\"margin-top:.75rem;font:.875rem system-ui;color:#555\">R$200 a R$750</p>\n<script type=\"module\">\n  import \"/pura/lib/range-slider.js\";\n  const slider = document.getElementById(\"preco\");\n  const saida = document.getElementById(\"saida\");\n  slider.addEventListener(\"input\", (e) => {\n    saida.textContent = `R$${e.detail.min} a R$${e.detail.max}`;\n  });\n</script>"
  },
  "fr": {
   "description": "`<pura-range-slider>` est un curseur de plage à deux poignées (minimum et maximum) sur une piste, avec le segment entre elles rempli. Utilisez-le lorsque l'utilisateur doit choisir une plage de valeurs, comme une fourchette de prix ou de dates, plutôt qu'un seul nombre. Chaque poignée est un `role=\"slider\"` indépendant avec ses propres `aria-valuemin/max/now` et expose son état actuel dans `data-pura-value`, rendant chaque poignée lisible et utilisable par les lecteurs d'écran et les agents via le clavier (flèches, Home, End, PageUp, PageDown).",
   "attributes": [
    {
     "desc": "Valeur minimale de la plage."
    },
    {
     "desc": "Valeur maximale de la plage. Si elle est inférieure ou égale à min, elle devient min + 1."
    },
    {
     "desc": "Incrément entre les valeurs ; les valeurs sont alignées sur le pas le plus proche."
    },
    {
     "desc": "Position de la poignée inférieure. Reflétée dans l'hôte ; elle ne dépasse jamais value-max."
    },
    {
     "desc": "Position de la poignée supérieure. Reflétée dans l'hôte ; elle ne descend jamais sous value-min."
    },
    {
     "desc": "Désactive l'interaction au pointeur et au clavier et retire les poignées de l'ordre de tabulation."
    },
    {
     "desc": "Étiquette de base utilisée pour nommer les poignées « <label> minimum » et « <label> maximum »."
    }
   ],
   "demoHTML": "<label for=\"preco\" style=\"display:block;margin-bottom:.5rem;font:500 .875rem system-ui\">Plage de prix</label>\n<pura-range-slider id=\"preco\" aria-label=\"Plage de prix\"\n  min=\"0\" max=\"1000\" step=\"50\" value-min=\"200\" value-max=\"750\"></pura-range-slider>\n<p id=\"saida\" style=\"margin-top:.75rem;font:.875rem system-ui;color:#555\">200 € à 750 €</p>\n<script type=\"module\">\n  import \"/pura/lib/range-slider.js\";\n  const slider = document.getElementById(\"preco\");\n  const saida = document.getElementById(\"saida\");\n  slider.addEventListener(\"input\", (e) => {\n    saida.textContent = `${e.detail.min} € à ${e.detail.max} €`;\n  });\n</script>"
  },
  "de": {
   "description": "`<pura-range-slider>` ist ein Bereichsregler mit zwei Schiebern (Minimum und Maximum) auf einer Schiene, wobei das Segment dazwischen gefüllt ist. Verwenden Sie ihn, wenn der Benutzer einen Wertebereich auswählen muss, etwa eine Preis- oder Datumsspanne, statt nur einer einzelnen Zahl. Jeder Schieber ist ein eigenständiger `role=\"slider\"` mit eigenen `aria-valuemin/max/now` und stellt seinen aktuellen Zustand in `data-pura-value` bereit, wodurch jeder Schieber von Screenreadern und Agenten über die Tastatur (Pfeiltasten, Home, End, PageUp, PageDown) lesbar und bedienbar ist.",
   "attributes": [
    {
     "desc": "Minimalwert des Bereichs."
    },
    {
     "desc": "Maximalwert des Bereichs. Ist er kleiner oder gleich min, wird er zu min + 1."
    },
    {
     "desc": "Inkrement zwischen den Werten; die Werte werden am nächsten Schritt ausgerichtet."
    },
    {
     "desc": "Position des unteren Schiebers. Wird in den Host zurückgespiegelt; überschreitet nie value-max."
    },
    {
     "desc": "Position des oberen Schiebers. Wird in den Host zurückgespiegelt; fällt nie unter value-min."
    },
    {
     "desc": "Deaktiviert die Interaktion per Zeiger und Tastatur und entfernt die Schieber aus der Tabulatorreihenfolge."
    },
    {
     "desc": "Basisbeschriftung, die zur Benennung der Schieber als \"<label> Minimum\" und \"<label> Maximum\" verwendet wird."
    }
   ],
   "demoHTML": "<label for=\"preco\" style=\"display:block;margin-bottom:.5rem;font:500 .875rem system-ui\">Preisspanne</label>\n<pura-range-slider id=\"preco\" aria-label=\"Preisspanne\"\n  min=\"0\" max=\"1000\" step=\"50\" value-min=\"200\" value-max=\"750\"></pura-range-slider>\n<p id=\"saida\" style=\"margin-top:.75rem;font:.875rem system-ui;color:#555\">200 € bis 750 €</p>\n<script type=\"module\">\n  import \"/pura/lib/range-slider.js\";\n  const slider = document.getElementById(\"preco\");\n  const saida = document.getElementById(\"saida\");\n  slider.addEventListener(\"input\", (e) => {\n    saida.textContent = `${e.detail.min} € bis ${e.detail.max} €`;\n  });\n</script>"
  },
  "it": {
   "description": "`<pura-range-slider>` è un cursore di intervallo con due maniglie (minimo e massimo) su una traccia, con il segmento tra di esse riempito. Usalo quando l'utente deve scegliere un intervallo di valori, come una fascia di prezzo o di date, anziché un singolo numero. Ogni maniglia è un `role=\"slider\"` indipendente con i propri `aria-valuemin/max/now` ed espone il proprio stato attuale in `data-pura-value`, rendendo ogni maniglia leggibile e azionabile da screen reader e agenti tramite tastiera (frecce, Home, End, PageUp, PageDown).",
   "attributes": [
    {
     "desc": "Valore minimo dell'intervallo."
    },
    {
     "desc": "Valore massimo dell'intervallo. Se è minore o uguale a min, diventa min + 1."
    },
    {
     "desc": "Incremento tra i valori; i valori vengono allineati al passo più vicino."
    },
    {
     "desc": "Posizione della maniglia inferiore. Rispecchiata nell'host; non supera mai value-max."
    },
    {
     "desc": "Posizione della maniglia superiore. Rispecchiata nell'host; non scende mai sotto value-min."
    },
    {
     "desc": "Disabilita l'interazione tramite puntatore e tastiera e rimuove le maniglie dall'ordine di tabulazione."
    },
    {
     "desc": "Etichetta di base usata per nominare le maniglie come \"<label> minimo\" e \"<label> massimo\"."
    }
   ],
   "demoHTML": "<label for=\"preco\" style=\"display:block;margin-bottom:.5rem;font:500 .875rem system-ui\">Fascia di prezzo</label>\n<pura-range-slider id=\"preco\" aria-label=\"Fascia di prezzo\"\n  min=\"0\" max=\"1000\" step=\"50\" value-min=\"200\" value-max=\"750\"></pura-range-slider>\n<p id=\"saida\" style=\"margin-top:.75rem;font:.875rem system-ui;color:#555\">200 € a 750 €</p>\n<script type=\"module\">\n  import \"/pura/lib/range-slider.js\";\n  const slider = document.getElementById(\"preco\");\n  const saida = document.getElementById(\"saida\");\n  slider.addEventListener(\"input\", (e) => {\n    saida.textContent = `${e.detail.min} € a ${e.detail.max} €`;\n  });\n</script>"
  }
 },
 "rating": {
  "pt-BR": {
   "description": "`<pura-rating>` é um seletor de avaliação por estrelas que aceita clique, hover e entrada completa por teclado (setas, Home/End, teclas numéricas), com suporte opcional a meia estrela. Use-o em formulários de feedback, avaliações ou qualquer captura de nota de 0 até `max`. A camada agent-native espelha o estado ao vivo em atributos `data-pura-rating-*` (value, max, readonly, step) no próprio elemento e registra cada instância em `window.__puraRatings` (indexada por `data-pura-id`), permitindo que agentes leiam e controlem todas as avaliações da página sem inspecionar o shadow DOM.",
   "attributes": [
    {
     "desc": "Avaliação atual. Pode ser fracionária (0.5) quando allow-half está ativo; é limitada entre 0 e max."
    },
    {
     "desc": "Número de estrelas."
    },
    {
     "desc": "Modo somente leitura: não interativo e não focável (tabindex -1)."
    },
    {
     "desc": "Permite incrementos de meia estrela (0.5) ao passar o mouse, clicar e usar o teclado."
    },
    {
     "desc": "Rótulo acessível (aria-label do slider)."
    }
   ],
   "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:12px;align-items:flex-start\">\n  <pura-rating id=\"nota\" value=\"3\" max=\"5\" allow-half label=\"Avalie o produto\"></pura-rating>\n  <p id=\"saida\" style=\"font:14px system-ui;margin:0\">Avaliação selecionada: 3</p>\n</div>\n<script type=\"module\">\n  const r = document.getElementById(\"nota\");\n  const out = document.getElementById(\"saida\");\n  r.addEventListener(\"change\", (e) => {\n    out.textContent = \"Avaliação selecionada: \" + e.detail.value;\n  });\n</script>"
  },
  "fr": {
   "description": "`<pura-rating>` est un sélecteur de notation par étoiles qui accepte le clic, le survol et la saisie complète au clavier (flèches, Home/End, touches numériques), avec prise en charge optionnelle des demi-étoiles. Utilisez-le dans les formulaires de retour, les avis ou toute capture de note de 0 jusqu'à `max`. La couche agent-native reflète l'état en direct dans les attributs `data-pura-rating-*` (value, max, readonly, step) sur l'élément lui-même et enregistre chaque instance dans `window.__puraRatings` (indexée par `data-pura-id`), permettant aux agents de lire et de piloter toutes les notations de la page sans inspecter le shadow DOM.",
   "attributes": [
    {
     "desc": "Note actuelle. Elle peut être fractionnaire (0.5) lorsque allow-half est actif ; elle est bornée entre 0 et max."
    },
    {
     "desc": "Nombre d'étoiles."
    },
    {
     "desc": "Mode lecture seule : non interactif et non focusable (tabindex -1)."
    },
    {
     "desc": "Autorise les incréments d'une demi-étoile (0.5) au survol, au clic et au clavier."
    },
    {
     "desc": "Étiquette accessible (aria-label du slider)."
    }
   ],
   "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:12px;align-items:flex-start\">\n  <pura-rating id=\"nota\" value=\"3\" max=\"5\" allow-half label=\"Évaluez le produit\"></pura-rating>\n  <p id=\"saida\" style=\"font:14px system-ui;margin:0\">Note sélectionnée : 3</p>\n</div>\n<script type=\"module\">\n  const r = document.getElementById(\"nota\");\n  const out = document.getElementById(\"saida\");\n  r.addEventListener(\"change\", (e) => {\n    out.textContent = \"Note sélectionnée : \" + e.detail.value;\n  });\n</script>"
  },
  "de": {
   "description": "`<pura-rating>` ist ein Sternebewertungsauswähler, der Klick, Hover und vollständige Tastatureingabe (Pfeiltasten, Home/End, Zahlentasten) akzeptiert, mit optionaler Unterstützung halber Sterne. Verwenden Sie ihn in Feedback-Formularen, Bewertungen oder jeder Bewertungserfassung von 0 bis `max`. Die Agent-Native-Schicht spiegelt den Live-Zustand in `data-pura-rating-*`-Attributen (value, max, readonly, step) am Element selbst wider und registriert jede Instanz in `window.__puraRatings` (per `data-pura-id` indiziert), wodurch Agenten jede Bewertung auf der Seite lesen und steuern können, ohne das Shadow DOM zu inspizieren.",
   "attributes": [
    {
     "desc": "Aktuelle Bewertung. Sie kann gebrochen sein (0.5), wenn allow-half aktiv ist; sie wird zwischen 0 und max begrenzt."
    },
    {
     "desc": "Anzahl der Sterne."
    },
    {
     "desc": "Schreibgeschützter Modus: nicht interaktiv und nicht fokussierbar (tabindex -1)."
    },
    {
     "desc": "Erlaubt Halbsternschritte (0.5) bei Hover, Klick und Tastatur."
    },
    {
     "desc": "Barrierefreie Beschriftung (aria-label des Sliders)."
    }
   ],
   "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:12px;align-items:flex-start\">\n  <pura-rating id=\"nota\" value=\"3\" max=\"5\" allow-half label=\"Bewerten Sie das Produkt\"></pura-rating>\n  <p id=\"saida\" style=\"font:14px system-ui;margin:0\">Ausgewählte Bewertung: 3</p>\n</div>\n<script type=\"module\">\n  const r = document.getElementById(\"nota\");\n  const out = document.getElementById(\"saida\");\n  r.addEventListener(\"change\", (e) => {\n    out.textContent = \"Ausgewählte Bewertung: \" + e.detail.value;\n  });\n</script>"
  },
  "it": {
   "description": "`<pura-rating>` è un selettore di valutazione a stelle che accetta clic, hover e input completo da tastiera (frecce, Home/End, tasti numerici), con supporto opzionale per le mezze stelle. Usalo nei moduli di feedback, nelle recensioni o in qualsiasi raccolta di valutazioni da 0 fino a `max`. Lo strato agent-native rispecchia lo stato in tempo reale negli attributi `data-pura-rating-*` (value, max, readonly, step) sull'elemento stesso e registra ogni istanza in `window.__puraRatings` (indicizzata per `data-pura-id`), consentendo agli agenti di leggere e controllare ogni valutazione nella pagina senza ispezionare lo shadow DOM.",
   "attributes": [
    {
     "desc": "Valutazione attuale. Può essere frazionaria (0.5) quando allow-half è attivo; è limitata tra 0 e max."
    },
    {
     "desc": "Numero di stelle."
    },
    {
     "desc": "Modalità sola lettura: non interattiva e non focalizzabile (tabindex -1)."
    },
    {
     "desc": "Consente incrementi di mezza stella (0.5) al passaggio del mouse, al clic e da tastiera."
    },
    {
     "desc": "Etichetta accessibile (aria-label dello slider)."
    }
   ],
   "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:12px;align-items:flex-start\">\n  <pura-rating id=\"nota\" value=\"3\" max=\"5\" allow-half label=\"Valuta il prodotto\"></pura-rating>\n  <p id=\"saida\" style=\"font:14px system-ui;margin:0\">Valutazione selezionata: 3</p>\n</div>\n<script type=\"module\">\n  const r = document.getElementById(\"nota\");\n  const out = document.getElementById(\"saida\");\n  r.addEventListener(\"change\", (e) => {\n    out.textContent = \"Valutazione selezionata: \" + e.detail.value;\n  });\n</script>"
  }
 },
 "segmented-control": {
  "pt-BR": {
   "description": "Um seletor de escolha única em formato de pílula, em que cada segmento é uma opção e um indicador desliza por trás da selecionada. Use-o quando houver poucas opções mutuamente exclusivas (2 a 5) e você quiser que todas fiquem visíveis ao mesmo tempo, como ao alternar entre \"Dia/Semana/Mês\". É agent-native: o host espelha o estado legível por máquina em data-value, data-active-index e data-count, e cada segmento expõe data-value, data-index e data-active, permitindo que agentes leiam e localizem a seleção sem inspecionar o shadow DOM.",
   "attributes": [
    {
     "desc": "Lista de rótulos de segmentos separados por vírgula (ex.: \"Dia,Semana,Mês\"). Os espaços são removidos e itens vazios são ignorados."
    },
    {
     "desc": "Rótulo da opção atualmente selecionada. Se ausente ou não presente em options, assume a primeira opção."
    },
    {
     "desc": "Desabilita o controle inteiro (sem foco, sem cliques)."
    },
    {
     "desc": "Tamanho do controle: sm | md | lg. Puramente apresentacional."
    },
    {
     "desc": "Texto de aria-label do radiogroup, para acessibilidade."
    }
   ],
   "demoHTML": "<pura-segmented-control\n  id=\"periodo\"\n  label=\"Período\"\n  options=\"Dia,Semana,Mês\"\n  value=\"Semana\"\n></pura-segmented-control>\n<p id=\"periodo-saida\" style=\"margin-top:.75rem;font:14px system-ui;color:#555;\">Selecionado: Semana</p>\n<script type=\"module\">\n  import \"/pura/lib/segmented-control.js\";\n  const sc = document.getElementById(\"periodo\");\n  const out = document.getElementById(\"periodo-saida\");\n  sc.addEventListener(\"change\", (e) => {\n    out.textContent = \"Selecionado: \" + e.detail.value;\n  });\n</script>"
  },
  "fr": {
   "description": "Un sélecteur à choix unique en forme de pilule, où chaque segment est une option et un indicateur glisse derrière celle qui est sélectionnée. Utilisez-le lorsqu'il y a quelques options mutuellement exclusives (2 à 5) et que vous voulez les voir toutes en même temps, comme pour basculer entre « Jour/Semaine/Mois ». Il est agent-native : l'hôte reflète l'état lisible par machine dans data-value, data-active-index et data-count, et chaque segment expose data-value, data-index et data-active, permettant aux agents de lire et de localiser la sélection sans inspecter le shadow DOM.",
   "attributes": [
    {
     "desc": "Liste d'étiquettes de segments séparées par des virgules (ex. : « Jour,Semaine,Mois »). Les espaces sont supprimés et les éléments vides sont ignorés."
    },
    {
     "desc": "Étiquette de l'option actuellement sélectionnée. Si absente ou non présente dans options, la première option est utilisée par défaut."
    },
    {
     "desc": "Désactive l'ensemble du contrôle (pas de focus, pas de clics)."
    },
    {
     "desc": "Taille du contrôle : sm | md | lg. Purement présentationnel."
    },
    {
     "desc": "Texte de l'aria-label du radiogroup, pour l'accessibilité."
    }
   ],
   "demoHTML": "<pura-segmented-control\n  id=\"periodo\"\n  label=\"Période\"\n  options=\"Jour,Semaine,Mois\"\n  value=\"Semaine\"\n></pura-segmented-control>\n<p id=\"periodo-saida\" style=\"margin-top:.75rem;font:14px system-ui;color:#555;\">Sélectionné : Semaine</p>\n<script type=\"module\">\n  import \"/pura/lib/segmented-control.js\";\n  const sc = document.getElementById(\"periodo\");\n  const out = document.getElementById(\"periodo-saida\");\n  sc.addEventListener(\"change\", (e) => {\n    out.textContent = \"Sélectionné : \" + e.detail.value;\n  });\n</script>"
  },
  "de": {
   "description": "Ein Einzelauswahl-Selektor in Pillenform, bei dem jedes Segment eine Option ist und ein Indikator hinter der ausgewählten gleitet. Verwenden Sie es, wenn es einige sich gegenseitig ausschließende Optionen (2 bis 5) gibt und Sie alle gleichzeitig sichtbar haben möchten, etwa beim Wechseln zwischen \"Tag/Woche/Monat\". Es ist agent-native: Der Host spiegelt den maschinenlesbaren Zustand in data-value, data-active-index und data-count wider, und jedes Segment stellt data-value, data-index und data-active bereit, sodass Agenten die Auswahl lesen und lokalisieren können, ohne das Shadow DOM zu inspizieren.",
   "attributes": [
    {
     "desc": "Durch Kommas getrennte Liste von Segmentbeschriftungen (z. B. \"Tag,Woche,Monat\"). Leerzeichen werden entfernt und leere Einträge ignoriert."
    },
    {
     "desc": "Beschriftung der aktuell ausgewählten Option. Fehlt sie oder ist sie nicht in options enthalten, wird die erste Option verwendet."
    },
    {
     "desc": "Deaktiviert das gesamte Steuerelement (kein Fokus, keine Klicks)."
    },
    {
     "desc": "Größe des Steuerelements: sm | md | lg. Rein gestalterisch."
    },
    {
     "desc": "aria-label-Text für die radiogroup, zur Barrierefreiheit."
    }
   ],
   "demoHTML": "<pura-segmented-control\n  id=\"periodo\"\n  label=\"Zeitraum\"\n  options=\"Tag,Woche,Monat\"\n  value=\"Woche\"\n></pura-segmented-control>\n<p id=\"periodo-saida\" style=\"margin-top:.75rem;font:14px system-ui;color:#555;\">Ausgewählt: Woche</p>\n<script type=\"module\">\n  import \"/pura/lib/segmented-control.js\";\n  const sc = document.getElementById(\"periodo\");\n  const out = document.getElementById(\"periodo-saida\");\n  sc.addEventListener(\"change\", (e) => {\n    out.textContent = \"Ausgewählt: \" + e.detail.value;\n  });\n</script>"
  },
  "it": {
   "description": "Un selettore a scelta singola a forma di pillola, in cui ogni segmento è un'opzione e un indicatore scorre dietro quella selezionata. Usalo quando ci sono poche opzioni mutuamente esclusive (da 2 a 5) e vuoi che siano tutte visibili contemporaneamente, come quando si passa tra \"Giorno/Settimana/Mese\". È agent-native: l'host rispecchia lo stato leggibile dalla macchina in data-value, data-active-index e data-count, e ogni segmento espone data-value, data-index e data-active, consentendo agli agenti di leggere e individuare la selezione senza ispezionare lo shadow DOM.",
   "attributes": [
    {
     "desc": "Elenco di etichette dei segmenti separate da virgola (es.: \"Giorno,Settimana,Mese\"). Gli spazi vengono rimossi e gli elementi vuoti ignorati."
    },
    {
     "desc": "Etichetta dell'opzione attualmente selezionata. Se assente o non presente in options, viene usata la prima opzione."
    },
    {
     "desc": "Disabilita l'intero controllo (nessun focus, nessun clic)."
    },
    {
     "desc": "Dimensione del controllo: sm | md | lg. Puramente estetico."
    },
    {
     "desc": "Testo dell'aria-label del radiogroup, per l'accessibilità."
    }
   ],
   "demoHTML": "<pura-segmented-control\n  id=\"periodo\"\n  label=\"Periodo\"\n  options=\"Giorno,Settimana,Mese\"\n  value=\"Settimana\"\n></pura-segmented-control>\n<p id=\"periodo-saida\" style=\"margin-top:.75rem;font:14px system-ui;color:#555;\">Selezionato: Settimana</p>\n<script type=\"module\">\n  import \"/pura/lib/segmented-control.js\";\n  const sc = document.getElementById(\"periodo\");\n  const out = document.getElementById(\"periodo-saida\");\n  sc.addEventListener(\"change\", (e) => {\n    out.textContent = \"Selezionato: \" + e.detail.value;\n  });\n</script>"
  }
 },
 "select": {
  "pt-BR": {
   "description": "O Select é um web component nativo (zero dependências) que estiliza o elemento <select> nativo do navegador mantendo sua confiabilidade e acessibilidade. As opções são passadas como filhos <option> no light DOM e re-emitidas internamente. Use-o sempre que precisar de um campo de seleção única em formulários, com rótulo e texto de ajuda opcionais.",
   "attributes": [
    {
     "desc": "Texto do rótulo exibido acima do select."
    },
    {
     "desc": "Texto de ajuda exibido abaixo do select."
    },
    {
     "desc": "Valor selecionado; também refletido como propriedade e atualizado na alteração."
    },
    {
     "desc": "Desabilita o select quando presente."
    },
    {
     "desc": "Aplica um estilo de erro e aria-invalid quando presente."
    }
   ],
   "demoHTML": "<pura-select label=\"Estado\" hint=\"Selecione seu estado de residência\" value=\"sp\">\n  <option value=\"sp\">São Paulo</option>\n  <option value=\"rj\">Rio de Janeiro</option>\n  <option value=\"mg\">Minas Gerais</option>\n  <option value=\"rs\">Rio Grande do Sul</option>\n  <option value=\"ba\">Bahia</option>\n</pura-select>"
  },
  "fr": {
   "description": "Select est un composant web natif (zéro dépendance) qui stylise l'élément <select> natif du navigateur tout en conservant sa fiabilité et son accessibilité. Les options sont passées sous forme d'enfants <option> dans le light DOM et réémises en interne. Utilisez-le chaque fois que vous avez besoin d'un champ à sélection unique dans des formulaires, avec une étiquette et un texte d'aide optionnels.",
   "attributes": [
    {
     "desc": "Texte de l'étiquette affiché au-dessus du select."
    },
    {
     "desc": "Texte d'aide affiché sous le select."
    },
    {
     "desc": "Valeur sélectionnée ; également reflétée comme propriété et mise à jour lors du changement."
    },
    {
     "desc": "Désactive le select lorsqu'il est présent."
    },
    {
     "desc": "Applique un style d'erreur et aria-invalid lorsqu'il est présent."
    }
   ],
   "demoHTML": "<pura-select label=\"État\" hint=\"Sélectionnez votre état de résidence\" value=\"sp\">\n  <option value=\"sp\">São Paulo</option>\n  <option value=\"rj\">Rio de Janeiro</option>\n  <option value=\"mg\">Minas Gerais</option>\n  <option value=\"rs\">Rio Grande do Sul</option>\n  <option value=\"ba\">Bahia</option>\n</pura-select>"
  },
  "de": {
   "description": "Select ist eine native Web-Komponente (ohne Abhängigkeiten), die das native <select>-Element des Browsers gestaltet und dabei dessen Zuverlässigkeit und Barrierefreiheit beibehält. Die Optionen werden als untergeordnete <option>-Elemente im Light DOM übergeben und intern erneut ausgegeben. Verwenden Sie sie immer dann, wenn Sie ein Einzelauswahlfeld in Formularen benötigen, mit optionaler Beschriftung und Hilfetext.",
   "attributes": [
    {
     "desc": "Beschriftungstext, der über dem Select angezeigt wird."
    },
    {
     "desc": "Hilfetext, der unter dem Select angezeigt wird."
    },
    {
     "desc": "Ausgewählter Wert; wird auch als Eigenschaft widergespiegelt und bei Änderung aktualisiert."
    },
    {
     "desc": "Deaktiviert das Select, wenn vorhanden."
    },
    {
     "desc": "Wendet einen Fehlerstil und aria-invalid an, wenn vorhanden."
    }
   ],
   "demoHTML": "<pura-select label=\"Bundesstaat\" hint=\"Wählen Sie Ihren Wohnsitzstaat\" value=\"sp\">\n  <option value=\"sp\">São Paulo</option>\n  <option value=\"rj\">Rio de Janeiro</option>\n  <option value=\"mg\">Minas Gerais</option>\n  <option value=\"rs\">Rio Grande do Sul</option>\n  <option value=\"ba\">Bahia</option>\n</pura-select>"
  },
  "it": {
   "description": "Select è un web component nativo (zero dipendenze) che applica uno stile all'elemento <select> nativo del browser mantenendone affidabilità e accessibilità. Le opzioni vengono passate come figli <option> nel light DOM e riemesse internamente. Usalo ogni volta che hai bisogno di un campo a selezione singola nei moduli, con etichetta e testo di aiuto opzionali.",
   "attributes": [
    {
     "desc": "Testo dell'etichetta mostrato sopra il select."
    },
    {
     "desc": "Testo di aiuto mostrato sotto il select."
    },
    {
     "desc": "Valore selezionato; rispecchiato anche come proprietà e aggiornato alla modifica."
    },
    {
     "desc": "Disabilita il select quando presente."
    },
    {
     "desc": "Applica uno stile di errore e aria-invalid quando presente."
    }
   ],
   "demoHTML": "<pura-select label=\"Stato\" hint=\"Seleziona il tuo stato di residenza\" value=\"sp\">\n  <option value=\"sp\">São Paulo</option>\n  <option value=\"rj\">Rio de Janeiro</option>\n  <option value=\"mg\">Minas Gerais</option>\n  <option value=\"rs\">Rio Grande do Sul</option>\n  <option value=\"ba\">Bahia</option>\n</pura-select>"
  }
 },
 "slider": {
  "pt-BR": {
   "description": "O Slider é um web component nativo construído sobre um input[type=range] estilizado, oferecendo navegação por teclado (setas, Home/End, PageUp/PageDown) e ARIA (role=slider) de graça. Use-o para deixar o usuário escolher um valor dentro de um intervalo contínuo, como volume, brilho ou preço. Ele reflete o valor de volta no atributo do host e expõe a propriedade .value, além de emitir os eventos input e change.",
   "attributes": [
    {
     "desc": "Valor mínimo do intervalo."
    },
    {
     "desc": "Valor máximo do intervalo."
    },
    {
     "desc": "Incremento entre os valores permitidos."
    },
    {
     "desc": "Valor atual; refletido de volta no atributo e disponível pela propriedade .value."
    },
    {
     "desc": "Desabilita a interação com o slider."
    },
    {
     "desc": "Mostra um balão com o valor atual acompanhando o cursor."
    }
   ],
   "demoHTML": "<label for=\"volume\" style=\"display:block;margin-bottom:.5rem;font-size:.875rem\">Volume</label>\n<pura-slider id=\"volume\" min=\"0\" max=\"100\" step=\"1\" value=\"60\" show-value aria-label=\"Volume\"></pura-slider>"
  },
  "fr": {
   "description": "Slider est un web component natif construit sur un input[type=range] stylisé, vous offrant la navigation au clavier (flèches, Home/End, PageUp/PageDown) et l'ARIA (role=slider) gratuitement. Utilisez-le pour laisser l'utilisateur choisir une valeur dans une plage continue, comme le volume, la luminosité ou le prix. Il reflète la valeur dans l'attribut de l'hôte et expose la propriété .value, en plus d'émettre les événements input et change.",
   "attributes": [
    {
     "desc": "Valeur minimale de la plage."
    },
    {
     "desc": "Valeur maximale de la plage."
    },
    {
     "desc": "Incrément entre les valeurs autorisées."
    },
    {
     "desc": "Valeur actuelle ; reflétée dans l'attribut et disponible via la propriété .value."
    },
    {
     "desc": "Désactive l'interaction avec le curseur."
    },
    {
     "desc": "Affiche une bulle avec la valeur actuelle suivant le curseur."
    }
   ],
   "demoHTML": "<label for=\"volume\" style=\"display:block;margin-bottom:.5rem;font-size:.875rem\">Volume</label>\n<pura-slider id=\"volume\" min=\"0\" max=\"100\" step=\"1\" value=\"60\" show-value aria-label=\"Volume\"></pura-slider>"
  },
  "de": {
   "description": "Slider ist ein natives Web Component, das auf einem gestylten input[type=range] aufbaut und Ihnen Tastaturnavigation (Pfeiltasten, Home/End, PageUp/PageDown) und ARIA (role=slider) kostenlos bietet. Verwenden Sie es, damit der Benutzer einen Wert innerhalb eines kontinuierlichen Bereichs auswählen kann, etwa Lautstärke, Helligkeit oder Preis. Es spiegelt den Wert zurück in das Host-Attribut und stellt die Eigenschaft .value bereit, außerdem löst es die Ereignisse input und change aus.",
   "attributes": [
    {
     "desc": "Minimalwert des Bereichs."
    },
    {
     "desc": "Maximalwert des Bereichs."
    },
    {
     "desc": "Schrittweite zwischen den zulässigen Werten."
    },
    {
     "desc": "Aktueller Wert; zurückgespiegelt in das Attribut und über die Eigenschaft .value verfügbar."
    },
    {
     "desc": "Deaktiviert die Interaktion mit dem Slider."
    },
    {
     "desc": "Zeigt eine Sprechblase mit dem aktuellen Wert, die dem Reglerknopf folgt."
    }
   ],
   "demoHTML": "<label for=\"volume\" style=\"display:block;margin-bottom:.5rem;font-size:.875rem\">Lautstärke</label>\n<pura-slider id=\"volume\" min=\"0\" max=\"100\" step=\"1\" value=\"60\" show-value aria-label=\"Lautstärke\"></pura-slider>"
  },
  "it": {
   "description": "Slider è un web component nativo costruito su un input[type=range] stilizzato, che ti offre gratuitamente la navigazione da tastiera (frecce, Home/End, PageUp/PageDown) e l'ARIA (role=slider). Usalo per permettere all'utente di scegliere un valore all'interno di un intervallo continuo, come volume, luminosità o prezzo. Riflette il valore nell'attributo dell'host ed espone la proprietà .value, oltre a emettere gli eventi input e change.",
   "attributes": [
    {
     "desc": "Valore minimo dell'intervallo."
    },
    {
     "desc": "Valore massimo dell'intervallo."
    },
    {
     "desc": "Incremento tra i valori consentiti."
    },
    {
     "desc": "Valore corrente; riflesso nell'attributo e disponibile tramite la proprietà .value."
    },
    {
     "desc": "Disabilita l'interazione con il cursore."
    },
    {
     "desc": "Mostra un fumetto con il valore corrente che segue il cursore."
    }
   ],
   "demoHTML": "<label for=\"volume\" style=\"display:block;margin-bottom:.5rem;font-size:.875rem\">Volume</label>\n<pura-slider id=\"volume\" min=\"0\" max=\"100\" step=\"1\" value=\"60\" show-value aria-label=\"Volume\"></pura-slider>"
  }
 },
 "switch": {
  "pt-BR": {
   "description": "O Switch é um web component nativo (sem dependências) que representa um estado binário liga/desliga, ideal para ativar ou desativar configurações instantaneamente. Use-o quando a ação tem efeito imediato, sem precisar de um botão de confirmação. O texto do rótulo vai no slot padrão, e ele dispara um evento change a cada alternância.",
   "attributes": [
    {
     "desc": "Define se o switch está ligado; reflete a propriedade .checked."
    },
    {
     "desc": "Desabilita a interação e remove o switch da ordem de foco."
    }
   ],
   "demoHTML": "<div style=\"display: flex; flex-direction: column; gap: 1rem;\">\n  <pura-switch checked>Notificações por e-mail</pura-switch>\n  <pura-switch>Modo escuro</pura-switch>\n  <pura-switch disabled>Recurso indisponível</pura-switch>\n</div>"
  },
  "fr": {
   "description": "Switch est un web component natif (sans dépendances) qui représente un état binaire on/off, idéal pour activer ou désactiver des réglages instantanément. Utilisez-le lorsque l'action prend effet immédiatement, sans bouton de confirmation. Le texte de l'étiquette se place dans le slot par défaut, et il déclenche un événement change à chaque bascule.",
   "attributes": [
    {
     "desc": "Définit si l'interrupteur est activé ; reflète la propriété .checked."
    },
    {
     "desc": "Désactive l'interaction et retire l'interrupteur de l'ordre de focus."
    }
   ],
   "demoHTML": "<div style=\"display: flex; flex-direction: column; gap: 1rem;\">\n  <pura-switch checked>Notifications par e-mail</pura-switch>\n  <pura-switch>Mode sombre</pura-switch>\n  <pura-switch disabled>Fonctionnalité indisponible</pura-switch>\n</div>"
  },
  "de": {
   "description": "Switch ist ein natives Web Component (ohne Abhängigkeiten), das einen binären Ein/Aus-Zustand darstellt und sich ideal dafür eignet, Einstellungen sofort zu aktivieren oder zu deaktivieren. Verwenden Sie es, wenn die Aktion sofort wirksam wird, ohne dass eine Bestätigungsschaltfläche nötig ist. Der Beschriftungstext kommt in den Standard-Slot, und bei jedem Umschalten wird ein change-Ereignis ausgelöst.",
   "attributes": [
    {
     "desc": "Legt fest, ob der Schalter eingeschaltet ist; spiegelt die Eigenschaft .checked wider."
    },
    {
     "desc": "Deaktiviert die Interaktion und entfernt den Schalter aus der Fokusreihenfolge."
    }
   ],
   "demoHTML": "<div style=\"display: flex; flex-direction: column; gap: 1rem;\">\n  <pura-switch checked>E-Mail-Benachrichtigungen</pura-switch>\n  <pura-switch>Dunkelmodus</pura-switch>\n  <pura-switch disabled>Funktion nicht verfügbar</pura-switch>\n</div>"
  },
  "it": {
   "description": "Switch è un web component nativo (senza dipendenze) che rappresenta uno stato binario on/off, ideale per abilitare o disabilitare impostazioni istantaneamente. Usalo quando l'azione ha effetto immediato, senza bisogno di un pulsante di conferma. Il testo dell'etichetta va nello slot predefinito, e attiva un evento change a ogni commutazione.",
   "attributes": [
    {
     "desc": "Imposta se l'interruttore è acceso; riflette la proprietà .checked."
    },
    {
     "desc": "Disabilita l'interazione e rimuove l'interruttore dall'ordine di focus."
    }
   ],
   "demoHTML": "<div style=\"display: flex; flex-direction: column; gap: 1rem;\">\n  <pura-switch checked>Notifiche e-mail</pura-switch>\n  <pura-switch>Modalità scura</pura-switch>\n  <pura-switch disabled>Funzione non disponibile</pura-switch>\n</div>"
  }
 },
 "tag-input": {
  "pt-BR": {
   "description": "`pura-tag-input` é um campo de formulário que transforma texto em chips: digitar e pressionar Enter (ou vírgula) adiciona uma tag, Backspace em um campo vazio remove a última, e o × em cada chip o remove individualmente. Use-o quando precisar coletar uma lista de valores curtos (palavras-chave, destinatários, categorias), com um limite opcional via `max` e sem duplicatas. Ele é agent-native: cada instância se registra em `window.__puraTagInputs` e espelha seu estado no host por meio dos atributos `data-tags` (JSON), `data-count` e `data-max`, permitindo que um agente leia e controle as tags sem tocar no shadow DOM.",
   "attributes": [
    {
     "desc": "Tags iniciais separadas por vírgula; reflete o estado atual conforme as tags mudam."
    },
    {
     "desc": "Texto de placeholder do campo de entrada (também usado como aria-label)."
    },
    {
     "desc": "Número máximo de tags permitidas; a entrada é bloqueada quando o limite é atingido."
    },
    {
     "desc": "Torna o componente não interativo."
    }
   ],
   "demoHTML": "<pura-tag-input\n  id=\"tags-demo\"\n  value=\"javascript,css,web components\"\n  placeholder=\"Adicione uma tecnologia\"\n  max=\"6\"></pura-tag-input>\n<p id=\"tags-saida\" style=\"margin-top:.75rem;font:14px system-ui;color:#555\">3 tag(s): javascript, css, web components</p>\n<script type=\"module\">\n  const input = document.getElementById(\"tags-demo\");\n  const saida = document.getElementById(\"tags-saida\");\n  input.addEventListener(\"change\", (e) => {\n    const tags = e.detail.tags;\n    saida.textContent = `${tags.length} tag(s): ${tags.join(\", \") || \"nenhuma\"}`;\n  });\n</script>"
  },
  "fr": {
   "description": "`pura-tag-input` est un champ de formulaire qui transforme du texte en chips : taper et appuyer sur Entrée (ou virgule) ajoute un tag, Backspace dans un champ vide supprime le dernier, et le × sur chaque chip le supprime individuellement. Utilisez-le lorsque vous devez collecter une liste de valeurs courtes (mots-clés, destinataires, catégories), avec une limite optionnelle via `max` et sans doublons. Il est agent-native : chaque instance s'enregistre dans `window.__puraTagInputs` et reflète son état sur l'hôte via les attributs `data-tags` (JSON), `data-count` et `data-max`, permettant à un agent de lire et de contrôler les tags sans toucher au shadow DOM.",
   "attributes": [
    {
     "desc": "Tags initiaux séparés par des virgules ; reflète l'état actuel à mesure que les tags changent."
    },
    {
     "desc": "Texte d'indication du champ de saisie (également utilisé comme aria-label)."
    },
    {
     "desc": "Nombre maximal de tags autorisés ; la saisie est bloquée une fois la limite atteinte."
    },
    {
     "desc": "Rend le composant non interactif."
    }
   ],
   "demoHTML": "<pura-tag-input\n  id=\"tags-demo\"\n  value=\"javascript,css,web components\"\n  placeholder=\"Ajouter une technologie\"\n  max=\"6\"></pura-tag-input>\n<p id=\"tags-saida\" style=\"margin-top:.75rem;font:14px system-ui;color:#555\">3 tag(s) : javascript, css, web components</p>\n<script type=\"module\">\n  const input = document.getElementById(\"tags-demo\");\n  const saida = document.getElementById(\"tags-saida\");\n  input.addEventListener(\"change\", (e) => {\n    const tags = e.detail.tags;\n    saida.textContent = `${tags.length} tag(s) : ${tags.join(\", \") || \"aucune\"}`;\n  });\n</script>"
  },
  "de": {
   "description": "`pura-tag-input` ist ein Formularfeld, das Text in Chips verwandelt: Tippen und Drücken von Enter (oder Komma) fügt einen Tag hinzu, Backspace in einem leeren Feld entfernt den letzten, und das × an jedem Chip entfernt ihn einzeln. Verwenden Sie es, wenn Sie eine Liste kurzer Werte (Schlüsselwörter, Empfänger, Kategorien) erfassen müssen, mit einem optionalen Limit über `max` und ohne Duplikate. Es ist agent-native: Jede Instanz registriert sich in `window.__puraTagInputs` und spiegelt ihren Zustand über die Attribute `data-tags` (JSON), `data-count` und `data-max` auf dem Host wider, sodass ein Agent die Tags lesen und steuern kann, ohne das Shadow DOM zu berühren.",
   "attributes": [
    {
     "desc": "Anfängliche, durch Kommas getrennte Tags; spiegelt den aktuellen Zustand wider, während sich die Tags ändern."
    },
    {
     "desc": "Platzhaltertext für das Eingabefeld (wird auch als aria-label verwendet)."
    },
    {
     "desc": "Maximale Anzahl zulässiger Tags; die Eingabe wird gesperrt, sobald das Limit erreicht ist."
    },
    {
     "desc": "Macht die Komponente nicht interaktiv."
    }
   ],
   "demoHTML": "<pura-tag-input\n  id=\"tags-demo\"\n  value=\"javascript,css,web components\"\n  placeholder=\"Technologie hinzufügen\"\n  max=\"6\"></pura-tag-input>\n<p id=\"tags-saida\" style=\"margin-top:.75rem;font:14px system-ui;color:#555\">3 Tag(s): javascript, css, web components</p>\n<script type=\"module\">\n  const input = document.getElementById(\"tags-demo\");\n  const saida = document.getElementById(\"tags-saida\");\n  input.addEventListener(\"change\", (e) => {\n    const tags = e.detail.tags;\n    saida.textContent = `${tags.length} Tag(s): ${tags.join(\", \") || \"keine\"}`;\n  });\n</script>"
  },
  "it": {
   "description": "`pura-tag-input` è un campo di modulo che trasforma il testo in chip: digitare e premere Invio (o virgola) aggiunge un tag, Backspace in un campo vuoto rimuove l'ultimo, e la × su ogni chip lo rimuove singolarmente. Usalo quando devi raccogliere un elenco di valori brevi (parole chiave, destinatari, categorie), con un limite opzionale tramite `max` e senza duplicati. È agent-native: ogni istanza si registra in `window.__puraTagInputs` e rispecchia il proprio stato sull'host tramite gli attributi `data-tags` (JSON), `data-count` e `data-max`, permettendo a un agente di leggere e controllare i tag senza toccare lo shadow DOM.",
   "attributes": [
    {
     "desc": "Tag iniziali separati da virgola; riflette lo stato corrente man mano che i tag cambiano."
    },
    {
     "desc": "Testo segnaposto del campo di input (usato anche come aria-label)."
    },
    {
     "desc": "Numero massimo di tag consentiti; l'input viene bloccato una volta raggiunto il limite."
    },
    {
     "desc": "Rende il componente non interattivo."
    }
   ],
   "demoHTML": "<pura-tag-input\n  id=\"tags-demo\"\n  value=\"javascript,css,web components\"\n  placeholder=\"Aggiungi una tecnologia\"\n  max=\"6\"></pura-tag-input>\n<p id=\"tags-saida\" style=\"margin-top:.75rem;font:14px system-ui;color:#555\">3 tag: javascript, css, web components</p>\n<script type=\"module\">\n  const input = document.getElementById(\"tags-demo\");\n  const saida = document.getElementById(\"tags-saida\");\n  input.addEventListener(\"change\", (e) => {\n    const tags = e.detail.tags;\n    saida.textContent = `${tags.length} tag: ${tags.join(\", \") || \"nessuno\"}`;\n  });\n</script>"
  }
 },
 "textarea": {
  "pt-BR": {
   "description": "Um web component nativo para entrada de texto multilinha (`<pura-textarea>`), com rótulo opcional, texto de dica e estados desabilitado/inválido. Use-o em formulários para coletar textos longos como comentários, descrições ou notas. O valor é acessível pela propriedade `value`, e o atributo `value` é atualizado a cada tecla pressionada.",
   "attributes": [
    {
     "desc": "Texto do rótulo exibido acima do campo."
    },
    {
     "desc": "Texto de dica exibido abaixo do campo."
    },
    {
     "desc": "Texto exibido quando o campo está vazio."
    },
    {
     "desc": "Número de linhas visíveis no campo."
    },
    {
     "desc": "Conteúdo atual do campo; também disponível como propriedade."
    },
    {
     "desc": "Desabilita a edição do campo."
    },
    {
     "desc": "Aplica o estilo de erro ao campo e à dica."
    }
   ],
   "demoHTML": "<pura-textarea\n  label=\"Comentário\"\n  placeholder=\"Escreva seu comentário...\"\n  hint=\"Máximo de 500 caracteres.\"\n  rows=\"5\"\n></pura-textarea>"
  },
  "fr": {
   "description": "Un web component natif pour la saisie de texte multiligne (`<pura-textarea>`), avec une étiquette optionnelle, un texte d'indication et des états désactivé/invalide. Utilisez-le dans les formulaires pour collecter des textes longs tels que des commentaires, des descriptions ou des notes. La valeur est accessible via la propriété `value`, et l'attribut `value` est mis à jour à chaque frappe.",
   "attributes": [
    {
     "desc": "Texte de l'étiquette affiché au-dessus du champ."
    },
    {
     "desc": "Texte d'indication affiché sous le champ."
    },
    {
     "desc": "Texte affiché lorsque le champ est vide."
    },
    {
     "desc": "Nombre de lignes visibles dans le champ."
    },
    {
     "desc": "Contenu actuel du champ ; également disponible comme propriété."
    },
    {
     "desc": "Désactive l'édition du champ."
    },
    {
     "desc": "Applique le style d'erreur au champ et à l'indication."
    }
   ],
   "demoHTML": "<pura-textarea\n  label=\"Commentaire\"\n  placeholder=\"Rédigez votre commentaire...\"\n  hint=\"Maximum de 500 caractères.\"\n  rows=\"5\"\n></pura-textarea>"
  },
  "de": {
   "description": "Ein natives Web Component für mehrzeilige Texteingabe (`<pura-textarea>`), mit optionaler Beschriftung, Hinweistext und deaktivierten/ungültigen Zuständen. Verwenden Sie es in Formularen, um lange Texte wie Kommentare, Beschreibungen oder Notizen zu erfassen. Der Wert ist über die Eigenschaft `value` zugänglich, und das Attribut `value` wird bei jedem Tastendruck aktualisiert.",
   "attributes": [
    {
     "desc": "Beschriftungstext, der über dem Feld angezeigt wird."
    },
    {
     "desc": "Hinweistext, der unter dem Feld angezeigt wird."
    },
    {
     "desc": "Text, der angezeigt wird, wenn das Feld leer ist."
    },
    {
     "desc": "Anzahl der sichtbaren Zeilen im Feld."
    },
    {
     "desc": "Aktueller Inhalt des Feldes; auch als Eigenschaft verfügbar."
    },
    {
     "desc": "Deaktiviert die Bearbeitung des Feldes."
    },
    {
     "desc": "Wendet den Fehlerstil auf das Feld und den Hinweis an."
    }
   ],
   "demoHTML": "<pura-textarea\n  label=\"Kommentar\"\n  placeholder=\"Schreiben Sie Ihren Kommentar...\"\n  hint=\"Maximal 500 Zeichen.\"\n  rows=\"5\"\n></pura-textarea>"
  },
  "it": {
   "description": "Un web component nativo per l'inserimento di testo multilinea (`<pura-textarea>`), con etichetta opzionale, testo di suggerimento e stati disabilitato/non valido. Usalo nei moduli per raccogliere testi lunghi come commenti, descrizioni o note. Il valore è accessibile tramite la proprietà `value`, e l'attributo `value` viene aggiornato a ogni pressione di tasto.",
   "attributes": [
    {
     "desc": "Testo dell'etichetta mostrato sopra il campo."
    },
    {
     "desc": "Testo di suggerimento mostrato sotto il campo."
    },
    {
     "desc": "Testo mostrato quando il campo è vuoto."
    },
    {
     "desc": "Numero di righe visibili nel campo."
    },
    {
     "desc": "Contenuto corrente del campo; disponibile anche come proprietà."
    },
    {
     "desc": "Disabilita la modifica del campo."
    },
    {
     "desc": "Applica lo stile di errore al campo e al suggerimento."
    }
   ],
   "demoHTML": "<pura-textarea\n  label=\"Commento\"\n  placeholder=\"Scrivi il tuo commento...\"\n  hint=\"Massimo 500 caratteri.\"\n  rows=\"5\"\n></pura-textarea>"
  }
 },
 "toggle": {
  "pt-BR": {
   "description": "O Toggle é um web component nativo que funciona como um botão de duas posições (pressionado ou não), útil para alternar formatação ou opções liga/desliga, como negrito em um editor de texto. Ele suporta variantes visuais e tamanhos, e dispara um evento sempre que seu estado muda. Use-o quando precisar de um controle binário com aparência de botão em vez de um checkbox tradicional.",
   "attributes": [
    {
     "desc": "Reflete o estado ativo (ligado) do toggle; presente quando pressionado."
    },
    {
     "desc": "Desabilita o toggle e impede a alternância por clique ou teclado."
    },
    {
     "desc": "Estilo visual: \"default\" (sutil) ou \"outline\" (com borda)."
    },
    {
     "desc": "Tamanho do botão: \"sm\", \"md\" ou \"lg\"."
    },
    {
     "desc": "Valor associado ao toggle; usado pelo pura-toggle-group e enviado no evento change."
    }
   ],
   "demoHTML": "<div style=\"display:flex; gap:0.5rem; align-items:center;\">\n  <pura-toggle pressed aria-label=\"Negrito\">B</pura-toggle>\n  <pura-toggle variant=\"outline\" aria-label=\"Itálico\"><em>I</em></pura-toggle>\n  <pura-toggle size=\"lg\">Notificações</pura-toggle>\n  <pura-toggle disabled>Indisponível</pura-toggle>\n</div>"
  },
  "fr": {
   "description": "Toggle est un web component natif qui fonctionne comme un bouton à deux positions (enfoncé ou non), utile pour basculer une mise en forme ou des options on/off, comme le gras dans un éditeur de texte. Il prend en charge des variantes visuelles et des tailles, et déclenche un événement chaque fois que son état change. Utilisez-le lorsque vous avez besoin d'un contrôle binaire avec une apparence de bouton plutôt qu'une case à cocher traditionnelle.",
   "attributes": [
    {
     "desc": "Reflète l'état actif (activé) du toggle ; présent lorsqu'il est enfoncé."
    },
    {
     "desc": "Désactive le toggle et empêche le basculement par clic ou clavier."
    },
    {
     "desc": "Style visuel : \"default\" (discret) ou \"outline\" (avec bordure)."
    },
    {
     "desc": "Taille du bouton : \"sm\", \"md\" ou \"lg\"."
    },
    {
     "desc": "Valeur associée au toggle ; utilisée par pura-toggle-group et envoyée dans l'événement change."
    }
   ],
   "demoHTML": "<div style=\"display:flex; gap:0.5rem; align-items:center;\">\n  <pura-toggle pressed aria-label=\"Gras\">B</pura-toggle>\n  <pura-toggle variant=\"outline\" aria-label=\"Italique\"><em>I</em></pura-toggle>\n  <pura-toggle size=\"lg\">Notifications</pura-toggle>\n  <pura-toggle disabled>Indisponible</pura-toggle>\n</div>"
  },
  "de": {
   "description": "Toggle ist ein natives Web Component, das als Schaltfläche mit zwei Stellungen (gedrückt oder nicht) funktioniert und sich zum Umschalten von Formatierung oder Ein/Aus-Optionen eignet, etwa Fettdruck in einem Texteditor. Es unterstützt visuelle Varianten und Größen und löst ein Ereignis aus, sobald sich sein Zustand ändert. Verwenden Sie es, wenn Sie ein binäres Steuerelement mit dem Aussehen einer Schaltfläche anstelle eines herkömmlichen Kontrollkästchens benötigen.",
   "attributes": [
    {
     "desc": "Spiegelt den aktiven (eingeschalteten) Zustand des Toggles wider; vorhanden, wenn gedrückt."
    },
    {
     "desc": "Deaktiviert den Toggle und verhindert das Umschalten per Klick oder Tastatur."
    },
    {
     "desc": "Visueller Stil: \"default\" (dezent) oder \"outline\" (mit Rahmen)."
    },
    {
     "desc": "Schaltflächengröße: \"sm\", \"md\" oder \"lg\"."
    },
    {
     "desc": "Mit dem Toggle verknüpfter Wert; wird von pura-toggle-group verwendet und im change-Ereignis gesendet."
    }
   ],
   "demoHTML": "<div style=\"display:flex; gap:0.5rem; align-items:center;\">\n  <pura-toggle pressed aria-label=\"Fett\">B</pura-toggle>\n  <pura-toggle variant=\"outline\" aria-label=\"Kursiv\"><em>I</em></pura-toggle>\n  <pura-toggle size=\"lg\">Benachrichtigungen</pura-toggle>\n  <pura-toggle disabled>Nicht verfügbar</pura-toggle>\n</div>"
  },
  "it": {
   "description": "Toggle è un web component nativo che funziona come un pulsante a due posizioni (premuto o no), utile per alternare la formattazione o opzioni on/off, come il grassetto in un editor di testo. Supporta varianti visive e dimensioni, e attiva un evento ogni volta che il suo stato cambia. Usalo quando hai bisogno di un controllo binario con l'aspetto di un pulsante invece di una casella di controllo tradizionale.",
   "attributes": [
    {
     "desc": "Riflette lo stato attivo (acceso) del toggle; presente quando è premuto."
    },
    {
     "desc": "Disabilita il toggle e impedisce il cambio di stato tramite clic o tastiera."
    },
    {
     "desc": "Stile visivo: \"default\" (discreto) o \"outline\" (con bordo)."
    },
    {
     "desc": "Dimensione del pulsante: \"sm\", \"md\" o \"lg\"."
    },
    {
     "desc": "Valore associato al toggle; usato da pura-toggle-group e inviato nell'evento change."
    }
   ],
   "demoHTML": "<div style=\"display:flex; gap:0.5rem; align-items:center;\">\n  <pura-toggle pressed aria-label=\"Grassetto\">B</pura-toggle>\n  <pura-toggle variant=\"outline\" aria-label=\"Corsivo\"><em>I</em></pura-toggle>\n  <pura-toggle size=\"lg\">Notifiche</pura-toggle>\n  <pura-toggle disabled>Non disponibile</pura-toggle>\n</div>"
  }
 },
 "toggle-group": {
  "pt-BR": {
   "description": "O Toggle Group é um web component nativo que agrupa vários elementos `<pura-toggle>` em um controle segmentado. Use o modo \"single\" para uma escolha exclusiva (estilo radio) ou \"multiple\" para selecionar várias opções ao mesmo tempo. Ele suporta orientação horizontal ou vertical e navegação por teclado com as setas (roving focus).",
   "attributes": [
    {
     "desc": "'single' permite uma escolha exclusiva (estilo radio); 'multiple' (padrão) permite várias seleções."
    },
    {
     "desc": "No modo single, reflete o valor do toggle pressionado; defina-o para pré-selecionar. No modo multiple, leia a propriedade .value para obter o array."
    },
    {
     "desc": "Desabilita o grupo inteiro, preservando o estado disabled individual de cada toggle."
    },
    {
     "desc": "'horizontal' (padrão) ou 'vertical'; controla o layout e a direção das setas de navegação."
    },
    {
     "desc": "Atributo no <pura-toggle> filho: indica se ele está pressionado/ativo."
    },
    {
     "desc": "Atributo no <pura-toggle> filho: valor associado ao toggle; recorre ao texto interno se ausente."
    }
   ],
   "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:1.5rem;align-items:flex-start\">\n  <pura-toggle-group type=\"single\" value=\"medio\">\n    <pura-toggle value=\"baixo\">Baixo</pura-toggle>\n    <pura-toggle value=\"medio\">Médio</pura-toggle>\n    <pura-toggle value=\"alto\">Alto</pura-toggle>\n  </pura-toggle-group>\n\n  <pura-toggle-group type=\"multiple\">\n    <pura-toggle value=\"negrito\" pressed>Negrito</pura-toggle>\n    <pura-toggle value=\"italico\">Itálico</pura-toggle>\n    <pura-toggle value=\"sublinhado\">Sublinhado</pura-toggle>\n  </pura-toggle-group>\n\n  <pura-toggle-group type=\"single\" orientation=\"vertical\" value=\"lista\">\n    <pura-toggle value=\"lista\">Lista</pura-toggle>\n    <pura-toggle value=\"grade\">Grade</pura-toggle>\n    <pura-toggle value=\"tabela\">Tabela</pura-toggle>\n  </pura-toggle-group>\n</div>"
  },
  "fr": {
   "description": "Toggle Group est un web component natif qui regroupe plusieurs éléments `<pura-toggle>` dans un contrôle segmenté. Utilisez le mode \"single\" pour un choix exclusif (style radio) ou \"multiple\" pour sélectionner plusieurs options à la fois. Il prend en charge l'orientation horizontale ou verticale et la navigation au clavier avec les flèches (roving focus).",
   "attributes": [
    {
     "desc": "'single' permet un choix exclusif (style radio) ; 'multiple' (par défaut) permet plusieurs sélections."
    },
    {
     "desc": "En mode single, reflète la valeur du toggle enfoncé ; définissez-le pour présélectionner. En mode multiple, lisez la propriété .value pour obtenir le tableau."
    },
    {
     "desc": "Désactive l'ensemble du groupe, en préservant l'état disabled individuel de chaque toggle."
    },
    {
     "desc": "'horizontal' (par défaut) ou 'vertical' ; contrôle la disposition et la direction des flèches de navigation."
    },
    {
     "desc": "Attribut sur le <pura-toggle> enfant : indique s'il est enfoncé/actif."
    },
    {
     "desc": "Attribut sur le <pura-toggle> enfant : valeur associée au toggle ; se rabat sur le texte interne s'il est absent."
    }
   ],
   "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:1.5rem;align-items:flex-start\">\n  <pura-toggle-group type=\"single\" value=\"medio\">\n    <pura-toggle value=\"baixo\">Bas</pura-toggle>\n    <pura-toggle value=\"medio\">Moyen</pura-toggle>\n    <pura-toggle value=\"alto\">Élevé</pura-toggle>\n  </pura-toggle-group>\n\n  <pura-toggle-group type=\"multiple\">\n    <pura-toggle value=\"negrito\" pressed>Gras</pura-toggle>\n    <pura-toggle value=\"italico\">Italique</pura-toggle>\n    <pura-toggle value=\"sublinhado\">Souligné</pura-toggle>\n  </pura-toggle-group>\n\n  <pura-toggle-group type=\"single\" orientation=\"vertical\" value=\"lista\">\n    <pura-toggle value=\"lista\">Liste</pura-toggle>\n    <pura-toggle value=\"grade\">Grille</pura-toggle>\n    <pura-toggle value=\"tabela\">Tableau</pura-toggle>\n  </pura-toggle-group>\n</div>"
  },
  "de": {
   "description": "Toggle Group ist ein natives Web Component, das mehrere `<pura-toggle>`-Elemente zu einem segmentierten Steuerelement zusammenfasst. Verwenden Sie den Modus \"single\" für eine exklusive Auswahl (Radio-Stil) oder \"multiple\", um mehrere Optionen gleichzeitig auszuwählen. Es unterstützt horizontale oder vertikale Ausrichtung und Tastaturnavigation mit den Pfeiltasten (Roving Focus).",
   "attributes": [
    {
     "desc": "'single' erlaubt eine exklusive Auswahl (Radio-Stil); 'multiple' (Standard) erlaubt mehrere Auswahlen."
    },
    {
     "desc": "Im Modus single spiegelt es den Wert des gedrückten Toggles wider; setzen Sie es, um eine Vorauswahl zu treffen. Im Modus multiple lesen Sie die Eigenschaft .value, um das Array zu erhalten."
    },
    {
     "desc": "Deaktiviert die gesamte Gruppe, wobei der individuelle disabled-Zustand jedes Toggles erhalten bleibt."
    },
    {
     "desc": "'horizontal' (Standard) oder 'vertical'; steuert das Layout und die Richtung der Navigationspfeile."
    },
    {
     "desc": "Attribut am untergeordneten <pura-toggle>: gibt an, ob es gedrückt/aktiv ist."
    },
    {
     "desc": "Attribut am untergeordneten <pura-toggle>: mit dem Toggle verknüpfter Wert; greift auf den inneren Text zurück, wenn nicht vorhanden."
    }
   ],
   "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:1.5rem;align-items:flex-start\">\n  <pura-toggle-group type=\"single\" value=\"medio\">\n    <pura-toggle value=\"baixo\">Niedrig</pura-toggle>\n    <pura-toggle value=\"medio\">Mittel</pura-toggle>\n    <pura-toggle value=\"alto\">Hoch</pura-toggle>\n  </pura-toggle-group>\n\n  <pura-toggle-group type=\"multiple\">\n    <pura-toggle value=\"negrito\" pressed>Fett</pura-toggle>\n    <pura-toggle value=\"italico\">Kursiv</pura-toggle>\n    <pura-toggle value=\"sublinhado\">Unterstrichen</pura-toggle>\n  </pura-toggle-group>\n\n  <pura-toggle-group type=\"single\" orientation=\"vertical\" value=\"lista\">\n    <pura-toggle value=\"lista\">Liste</pura-toggle>\n    <pura-toggle value=\"grade\">Raster</pura-toggle>\n    <pura-toggle value=\"tabela\">Tabelle</pura-toggle>\n  </pura-toggle-group>\n</div>"
  },
  "it": {
   "description": "Toggle Group è un web component nativo che raggruppa diversi elementi `<pura-toggle>` in un controllo segmentato. Usa la modalità \"single\" per una scelta esclusiva (stile radio) o \"multiple\" per selezionare più opzioni contemporaneamente. Supporta l'orientamento orizzontale o verticale e la navigazione da tastiera con le frecce (roving focus).",
   "attributes": [
    {
     "desc": "'single' consente una scelta esclusiva (stile radio); 'multiple' (predefinito) consente più selezioni."
    },
    {
     "desc": "In modalità single, riflette il valore del toggle premuto; impostalo per preselezionare. In modalità multiple, leggi la proprietà .value per ottenere l'array."
    },
    {
     "desc": "Disabilita l'intero gruppo, preservando lo stato disabled individuale di ciascun toggle."
    },
    {
     "desc": "'horizontal' (predefinito) o 'vertical'; controlla il layout e la direzione delle frecce di navigazione."
    },
    {
     "desc": "Attributo sul <pura-toggle> figlio: indica se è premuto/attivo."
    },
    {
     "desc": "Attributo sul <pura-toggle> figlio: valore associato al toggle; ricorre al testo interno se assente."
    }
   ],
   "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:1.5rem;align-items:flex-start\">\n  <pura-toggle-group type=\"single\" value=\"medio\">\n    <pura-toggle value=\"baixo\">Basso</pura-toggle>\n    <pura-toggle value=\"medio\">Medio</pura-toggle>\n    <pura-toggle value=\"alto\">Alto</pura-toggle>\n  </pura-toggle-group>\n\n  <pura-toggle-group type=\"multiple\">\n    <pura-toggle value=\"negrito\" pressed>Grassetto</pura-toggle>\n    <pura-toggle value=\"italico\">Corsivo</pura-toggle>\n    <pura-toggle value=\"sublinhado\">Sottolineato</pura-toggle>\n  </pura-toggle-group>\n\n  <pura-toggle-group type=\"single\" orientation=\"vertical\" value=\"lista\">\n    <pura-toggle value=\"lista\">Elenco</pura-toggle>\n    <pura-toggle value=\"grade\">Griglia</pura-toggle>\n    <pura-toggle value=\"tabela\">Tabella</pura-toggle>\n  </pura-toggle-group>\n</div>"
  }
 },
 "aspect-ratio": {
  "pt-BR": {
   "description": "Um web component nativo que reserva espaço com uma proporção fixa (por exemplo 16/9 ou 1/1) para o conteúdo aninhado, evitando saltos de layout enquanto a mídia carrega. Imagens, vídeos, iframes e outras mídias preenchem 100% da largura e da altura com object-fit cover, recortados aos limites da caixa. Use-o para miniaturas, players de vídeo, mapas incorporados e qualquer mídia responsiva que precise preservar suas proporções.",
   "attributes": [
    {
     "desc": "Proporção desejada. Aceita \"16/9\", \"16:9\", \"1.78\" ou um único número; um valor inválido recai para 1/1."
    },
    {
     "desc": "Quando presente, aplica o raio de borda do tema (var(--pura-radius)) e arredonda os cantos."
    }
   ],
   "demoHTML": "<div style=\"display:flex;gap:1rem;flex-wrap:wrap;max-width:680px\">\n  <pura-aspect-ratio ratio=\"16/9\" rounded style=\"flex:1;min-width:280px\">\n    <img src=\"https://picsum.photos/seed/pura-paisagem/800/450\" alt=\"Paisagem ao entardecer\" />\n  </pura-aspect-ratio>\n\n  <pura-aspect-ratio ratio=\"1/1\" rounded style=\"width:160px\">\n    <img src=\"https://picsum.photos/seed/pura-perfil/400/400\" alt=\"Foto de perfil\" />\n  </pura-aspect-ratio>\n</div>"
  },
  "fr": {
   "description": "Un web component natif qui réserve de l'espace avec un ratio fixe (par exemple 16/9 ou 1/1) pour le contenu imbriqué, évitant les décalages de mise en page pendant le chargement du média. Images, vidéos, iframes et autres médias remplissent 100 % de la largeur et de la hauteur avec object-fit cover, recadrés aux limites de la boîte. Utilisez-le pour les vignettes, les lecteurs vidéo, les cartes intégrées et tout média responsive devant préserver ses proportions.",
   "attributes": [
    {
     "desc": "Ratio souhaité. Accepte \"16/9\", \"16:9\", \"1.78\" ou un nombre unique ; une valeur invalide se rabat sur 1/1."
    },
    {
     "desc": "Lorsqu'il est présent, applique le rayon de bordure du thème (var(--pura-radius)) et arrondit les coins."
    }
   ],
   "demoHTML": "<div style=\"display:flex;gap:1rem;flex-wrap:wrap;max-width:680px\">\n  <pura-aspect-ratio ratio=\"16/9\" rounded style=\"flex:1;min-width:280px\">\n    <img src=\"https://picsum.photos/seed/pura-paisagem/800/450\" alt=\"Paysage au crépuscule\" />\n  </pura-aspect-ratio>\n\n  <pura-aspect-ratio ratio=\"1/1\" rounded style=\"width:160px\">\n    <img src=\"https://picsum.photos/seed/pura-perfil/400/400\" alt=\"Photo de profil\" />\n  </pura-aspect-ratio>\n</div>"
  },
  "de": {
   "description": "Ein natives Web Component, das Platz mit einem festen Verhältnis (zum Beispiel 16/9 oder 1/1) für verschachtelten Inhalt reserviert und Layout-Verschiebungen verhindert, während die Medien laden. Bilder, Videos, Iframes und andere Medien füllen 100 % der Breite und Höhe mit object-fit cover und werden auf die Grenzen des Kastens beschnitten. Verwenden Sie es für Vorschaubilder, Videoplayer, eingebettete Karten und alle responsiven Medien, die ihre Proportionen bewahren müssen.",
   "attributes": [
    {
     "desc": "Gewünschtes Verhältnis. Akzeptiert \"16/9\", \"16:9\", \"1.78\" oder eine einzelne Zahl; ein ungültiger Wert fällt auf 1/1 zurück."
    },
    {
     "desc": "Wenn vorhanden, wendet es den Eckenradius des Themes (var(--pura-radius)) an und rundet die Ecken ab."
    }
   ],
   "demoHTML": "<div style=\"display:flex;gap:1rem;flex-wrap:wrap;max-width:680px\">\n  <pura-aspect-ratio ratio=\"16/9\" rounded style=\"flex:1;min-width:280px\">\n    <img src=\"https://picsum.photos/seed/pura-paisagem/800/450\" alt=\"Landschaft in der Dämmerung\" />\n  </pura-aspect-ratio>\n\n  <pura-aspect-ratio ratio=\"1/1\" rounded style=\"width:160px\">\n    <img src=\"https://picsum.photos/seed/pura-perfil/400/400\" alt=\"Profilfoto\" />\n  </pura-aspect-ratio>\n</div>"
  },
  "it": {
   "description": "Un web component nativo che riserva spazio con un rapporto fisso (ad esempio 16/9 o 1/1) per il contenuto annidato, evitando salti di layout durante il caricamento del media. Immagini, video, iframe e altri media riempiono il 100% della larghezza e dell'altezza con object-fit cover, ritagliati ai limiti del riquadro. Usalo per miniature, lettori video, mappe incorporate e qualsiasi media responsive che debba preservare le proprie proporzioni.",
   "attributes": [
    {
     "desc": "Rapporto desiderato. Accetta \"16/9\", \"16:9\", \"1.78\" o un singolo numero; un valore non valido ricade su 1/1."
    },
    {
     "desc": "Quando presente, applica il raggio del bordo del tema (var(--pura-radius)) e arrotonda gli angoli."
    }
   ],
   "demoHTML": "<div style=\"display:flex;gap:1rem;flex-wrap:wrap;max-width:680px\">\n  <pura-aspect-ratio ratio=\"16/9\" rounded style=\"flex:1;min-width:280px\">\n    <img src=\"https://picsum.photos/seed/pura-paisagem/800/450\" alt=\"Paesaggio al tramonto\" />\n  </pura-aspect-ratio>\n\n  <pura-aspect-ratio ratio=\"1/1\" rounded style=\"width:160px\">\n    <img src=\"https://picsum.photos/seed/pura-perfil/400/400\" alt=\"Foto del profilo\" />\n  </pura-aspect-ratio>\n</div>"
  }
 },
 "avatar": {
  "pt-BR": {
   "description": "O Avatar é um web component nativo que exibe a imagem de um usuário e, se a imagem falhar ou não existir, mostra suas iniciais como fallback. Use-o para representar pessoas ou entidades em listas, comentários, cabeçalhos e menus. Ele suporta três tamanhos e um indicador de status no canto.",
   "attributes": [
    {
     "desc": "URL da imagem do avatar; se ausente ou se falhar ao carregar, as iniciais são exibidas no lugar."
    },
    {
     "desc": "Texto alternativo da imagem, também usado como aria-label."
    },
    {
     "desc": "Iniciais exibidas como fallback quando não há imagem."
    },
    {
     "desc": "Tamanho do avatar (md é o padrão quando o atributo é omitido)."
    },
    {
     "desc": "Quando presente, exibe um ponto de status colorido no canto inferior direito."
    }
   ],
   "demoHTML": "<div style=\"display:flex;align-items:center;gap:1rem\">\n  <pura-avatar src=\"https://i.pravatar.cc/150?img=12\" alt=\"Ana Silva\" status=\"online\"></pura-avatar>\n  <pura-avatar initials=\"MC\" status=\"busy\"></pura-avatar>\n  <pura-avatar size=\"sm\" initials=\"JP\"></pura-avatar>\n  <pura-avatar size=\"lg\" src=\"https://i.pravatar.cc/150?img=32\" alt=\"Carla Lima\" status=\"offline\"></pura-avatar>\n</div>"
  },
  "fr": {
   "description": "Avatar est un web component natif qui affiche l'image d'un utilisateur et, si l'image échoue ou n'existe pas, montre ses initiales en repli. Utilisez-le pour représenter des personnes ou des entités dans des listes, des commentaires, des en-têtes et des menus. Il prend en charge trois tailles et un indicateur de statut dans le coin.",
   "attributes": [
    {
     "desc": "URL de l'image de l'avatar ; si elle est absente ou échoue au chargement, les initiales sont affichées à la place."
    },
    {
     "desc": "Texte alternatif de l'image, également utilisé comme aria-label."
    },
    {
     "desc": "Initiales affichées en repli lorsqu'il n'y a pas d'image."
    },
    {
     "desc": "Taille de l'avatar (md est la valeur par défaut lorsque l'attribut est omis)."
    },
    {
     "desc": "Lorsqu'il est présent, affiche une pastille de statut colorée dans le coin inférieur droit."
    }
   ],
   "demoHTML": "<div style=\"display:flex;align-items:center;gap:1rem\">\n  <pura-avatar src=\"https://i.pravatar.cc/150?img=12\" alt=\"Anne Martin\" status=\"online\"></pura-avatar>\n  <pura-avatar initials=\"MC\" status=\"busy\"></pura-avatar>\n  <pura-avatar size=\"sm\" initials=\"JP\"></pura-avatar>\n  <pura-avatar size=\"lg\" src=\"https://i.pravatar.cc/150?img=32\" alt=\"Claire Lefèvre\" status=\"offline\"></pura-avatar>\n</div>"
  },
  "de": {
   "description": "Avatar ist ein natives Web Component, das das Bild eines Benutzers anzeigt und, falls das Bild fehlschlägt oder nicht existiert, dessen Initialen als Ersatz darstellt. Verwenden Sie es, um Personen oder Entitäten in Listen, Kommentaren, Kopfzeilen und Menüs darzustellen. Es unterstützt drei Größen und eine Statusanzeige in der Ecke.",
   "attributes": [
    {
     "desc": "URL des Avatar-Bildes; falls nicht vorhanden oder das Laden fehlschlägt, werden stattdessen die Initialen angezeigt."
    },
    {
     "desc": "Alternativtext für das Bild, der auch als aria-label verwendet wird."
    },
    {
     "desc": "Initialen, die als Ersatz angezeigt werden, wenn kein Bild vorhanden ist."
    },
    {
     "desc": "Größe des Avatars (md ist der Standard, wenn das Attribut weggelassen wird)."
    },
    {
     "desc": "Wenn vorhanden, zeigt es einen farbigen Statuspunkt in der unteren rechten Ecke an."
    }
   ],
   "demoHTML": "<div style=\"display:flex;align-items:center;gap:1rem\">\n  <pura-avatar src=\"https://i.pravatar.cc/150?img=12\" alt=\"Anna Schmidt\" status=\"online\"></pura-avatar>\n  <pura-avatar initials=\"MC\" status=\"busy\"></pura-avatar>\n  <pura-avatar size=\"sm\" initials=\"JP\"></pura-avatar>\n  <pura-avatar size=\"lg\" src=\"https://i.pravatar.cc/150?img=32\" alt=\"Carla Lehmann\" status=\"offline\"></pura-avatar>\n</div>"
  },
  "it": {
   "description": "Avatar è un web component nativo che mostra l'immagine di un utente e, se l'immagine non si carica o non esiste, ne mostra le iniziali come ripiego. Usalo per rappresentare persone o entità in elenchi, commenti, intestazioni e menu. Supporta tre dimensioni e un indicatore di stato nell'angolo.",
   "attributes": [
    {
     "desc": "URL dell'immagine dell'avatar; se assente o se il caricamento fallisce, vengono mostrate le iniziali al suo posto."
    },
    {
     "desc": "Testo alternativo dell'immagine, usato anche come aria-label."
    },
    {
     "desc": "Iniziali mostrate come ripiego quando non c'è alcuna immagine."
    },
    {
     "desc": "Dimensione dell'avatar (md è il valore predefinito quando l'attributo viene omesso)."
    },
    {
     "desc": "Quando presente, mostra un punto di stato colorato nell'angolo in basso a destra."
    }
   ],
   "demoHTML": "<div style=\"display:flex;align-items:center;gap:1rem\">\n  <pura-avatar src=\"https://i.pravatar.cc/150?img=12\" alt=\"Anna Rossi\" status=\"online\"></pura-avatar>\n  <pura-avatar initials=\"MC\" status=\"busy\"></pura-avatar>\n  <pura-avatar size=\"sm\" initials=\"JP\"></pura-avatar>\n  <pura-avatar size=\"lg\" src=\"https://i.pravatar.cc/150?img=32\" alt=\"Carla Bianchi\" status=\"offline\"></pura-avatar>\n</div>"
  }
 },
 "avatar-group": {
  "pt-BR": {
   "description": "O <pura-avatar-group> empilha elementos <pura-avatar> com sobreposição e um anel separador, propagando seu tamanho aos filhos e, por meio do atributo max, recolhendo o excedente em um balão \"+N\" que abre um popover listando quem ficou de fora. Use-o para representar participantes, equipes ou colaboradores de forma compacta. Ele é agent-native: expõe role=\"group\", atributos data estáveis (data-total, data-shown, data-overflow), um registro global em window.__puraAvatarGroups e a API pública total/overflow/showOverflow()/hideOverflow(), permitindo que agentes leiam o estado e abram o popover programaticamente.",
   "attributes": [
    {
     "desc": "Número máximo de avatares exibidos antes de recolher o restante em um balão \"+N\". 0 ou ausente exibe todos."
    },
    {
     "desc": "Tamanho aplicado (passthrough) a cada <pura-avatar> filho e ao balão de excedente."
    },
    {
     "desc": "Nome acessível do grupo (aria-label)."
    }
   ],
   "demoHTML": "<pura-avatar-group max=\"4\" size=\"md\" label=\"Equipe do projeto\">\n  <pura-avatar initials=\"AS\" name=\"Ana Silva\"></pura-avatar>\n  <pura-avatar initials=\"BC\" name=\"Bruno Costa\"></pura-avatar>\n  <pura-avatar initials=\"CL\" name=\"Carla Lima\"></pura-avatar>\n  <pura-avatar initials=\"DM\" name=\"Diego Moraes\"></pura-avatar>\n  <pura-avatar initials=\"EF\" name=\"Elena Freitas\"></pura-avatar>\n  <pura-avatar initials=\"GR\" name=\"Gabriel Rocha\"></pura-avatar>\n</pura-avatar-group>"
  },
  "fr": {
   "description": "Le <pura-avatar-group> empile des éléments <pura-avatar> avec chevauchement et un anneau séparateur, en propageant sa taille aux enfants et, via l'attribut max, en repliant le surplus dans une bulle \"+N\" qui ouvre un popover listant ceux qui ont été laissés de côté. Utilisez-le pour représenter des participants, des équipes ou des collaborateurs de façon compacte. Il est agent-native : il expose role=\"group\", des attributs data stables (data-total, data-shown, data-overflow), un registre global dans window.__puraAvatarGroups et l'API publique total/overflow/showOverflow()/hideOverflow(), permettant aux agents de lire l'état et d'ouvrir le popover de manière programmatique.",
   "attributes": [
    {
     "desc": "Nombre maximal d'avatars affichés avant de replier le reste dans une bulle \"+N\". 0 ou absent les affiche tous."
    },
    {
     "desc": "Taille appliquée (passthrough) à chaque <pura-avatar> enfant et à la bulle de surplus."
    },
    {
     "desc": "Nom accessible du groupe (aria-label)."
    }
   ],
   "demoHTML": "<pura-avatar-group max=\"4\" size=\"md\" label=\"Équipe du projet\">\n  <pura-avatar initials=\"AM\" name=\"Anne Martin\"></pura-avatar>\n  <pura-avatar initials=\"BC\" name=\"Bruno Caron\"></pura-avatar>\n  <pura-avatar initials=\"CL\" name=\"Claire Lefèvre\"></pura-avatar>\n  <pura-avatar initials=\"DM\" name=\"Damien Moreau\"></pura-avatar>\n  <pura-avatar initials=\"EF\" name=\"Élise Faure\"></pura-avatar>\n  <pura-avatar initials=\"GR\" name=\"Gabriel Rousseau\"></pura-avatar>\n</pura-avatar-group>"
  },
  "de": {
   "description": "Das <pura-avatar-group> stapelt <pura-avatar>-Elemente mit Überlappung und einem Trennring, gibt seine Größe an die untergeordneten Elemente weiter und fasst über das Attribut max den Überschuss in einer \"+N\"-Blase zusammen, die ein Popover öffnet, in dem aufgelistet wird, wer ausgelassen wurde. Verwenden Sie es, um Teilnehmer, Teams oder Mitarbeiter kompakt darzustellen. Es ist agent-native: Es stellt role=\"group\", stabile data-Attribute (data-total, data-shown, data-overflow), ein globales Register in window.__puraAvatarGroups und die öffentliche API total/overflow/showOverflow()/hideOverflow() bereit, sodass Agenten den Zustand lesen und das Popover programmatisch öffnen können.",
   "attributes": [
    {
     "desc": "Maximale Anzahl von Avataren, die angezeigt werden, bevor der Rest in einer \"+N\"-Blase zusammengefasst wird. 0 oder nicht vorhanden zeigt alle an."
    },
    {
     "desc": "Größe, die (per Passthrough) auf jeden untergeordneten <pura-avatar> und auf die Überlauf-Blase angewendet wird."
    },
    {
     "desc": "Zugänglicher Name der Gruppe (aria-label)."
    }
   ],
   "demoHTML": "<pura-avatar-group max=\"4\" size=\"md\" label=\"Projektteam\">\n  <pura-avatar initials=\"AS\" name=\"Anna Schmidt\"></pura-avatar>\n  <pura-avatar initials=\"BK\" name=\"Bernd Krause\"></pura-avatar>\n  <pura-avatar initials=\"CL\" name=\"Carla Lehmann\"></pura-avatar>\n  <pura-avatar initials=\"DM\" name=\"David Müller\"></pura-avatar>\n  <pura-avatar initials=\"EF\" name=\"Elena Fischer\"></pura-avatar>\n  <pura-avatar initials=\"GR\" name=\"Gabriel Richter\"></pura-avatar>\n</pura-avatar-group>"
  },
  "it": {
   "description": "Il <pura-avatar-group> impila elementi <pura-avatar> con sovrapposizione e un anello separatore, propagando la propria dimensione ai figli e, tramite l'attributo max, raccogliendo l'eccedenza in un fumetto \"+N\" che apre un popover che elenca chi è stato escluso. Usalo per rappresentare partecipanti, team o collaboratori in modo compatto. È agent-native: espone role=\"group\", attributi data stabili (data-total, data-shown, data-overflow), un registro globale in window.__puraAvatarGroups e l'API pubblica total/overflow/showOverflow()/hideOverflow(), permettendo agli agenti di leggere lo stato e aprire il popover in modo programmatico.",
   "attributes": [
    {
     "desc": "Numero massimo di avatar mostrati prima di raccogliere il resto in un fumetto \"+N\". 0 o assente li mostra tutti."
    },
    {
     "desc": "Dimensione applicata (passthrough) a ciascun <pura-avatar> figlio e al fumetto dell'eccedenza."
    },
    {
     "desc": "Nome accessibile del gruppo (aria-label)."
    }
   ],
   "demoHTML": "<pura-avatar-group max=\"4\" size=\"md\" label=\"Team di progetto\">\n  <pura-avatar initials=\"AR\" name=\"Anna Rossi\"></pura-avatar>\n  <pura-avatar initials=\"BC\" name=\"Bruno Conti\"></pura-avatar>\n  <pura-avatar initials=\"CB\" name=\"Carla Bianchi\"></pura-avatar>\n  <pura-avatar initials=\"DM\" name=\"Diego Marino\"></pura-avatar>\n  <pura-avatar initials=\"EF\" name=\"Elena Ferrari\"></pura-avatar>\n  <pura-avatar initials=\"GR\" name=\"Gabriele Russo\"></pura-avatar>\n</pura-avatar-group>"
  }
 },
 "badge": {
  "pt-BR": {
   "description": "Badge é um web component nativo que exibe um pequeno rótulo de status ou categoria, com variantes de cor para neutro, primário, sucesso, aviso, perigo e informação. Use-o para destacar estados (ativo, pendente, erro), tags ou contadores ao lado de textos e títulos. Opcionalmente, exibe um ponto colorido à esquerda para sinalizar o status de forma mais sutil.",
   "attributes": [
    {
     "desc": "Define o esquema de cores do badge."
    },
    {
     "desc": "Quando presente, exibe um ponto colorido antes do conteúdo."
    }
   ],
   "demoHTML": "<div style=\"display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;\">\n  <pura-badge>Rascunho</pura-badge>\n  <pura-badge variant=\"primary\">Novo</pura-badge>\n  <pura-badge variant=\"success\" dot>Ativo</pura-badge>\n  <pura-badge variant=\"warning\" dot>Pendente</pura-badge>\n  <pura-badge variant=\"danger\">Erro</pura-badge>\n  <pura-badge variant=\"info\">Beta</pura-badge>\n</div>"
  },
  "fr": {
   "description": "Badge est un composant web natif qui affiche une petite étiquette de statut ou de catégorie, avec des variantes de couleur pour neutre, primaire, succès, avertissement, danger et information. Utilisez-le pour mettre en évidence des états (actif, en attente, erreur), des tags ou des compteurs à côté de textes et de titres. Il peut également afficher un point coloré à gauche pour signaler le statut de manière plus discrète.",
   "attributes": [
    {
     "desc": "Définit le jeu de couleurs du badge."
    },
    {
     "desc": "Lorsqu'il est présent, affiche un point coloré avant le contenu."
    }
   ],
   "demoHTML": "<div style=\"display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;\">\n  <pura-badge>Brouillon</pura-badge>\n  <pura-badge variant=\"primary\">Nouveau</pura-badge>\n  <pura-badge variant=\"success\" dot>Actif</pura-badge>\n  <pura-badge variant=\"warning\" dot>En attente</pura-badge>\n  <pura-badge variant=\"danger\">Erreur</pura-badge>\n  <pura-badge variant=\"info\">Beta</pura-badge>\n</div>"
  },
  "de": {
   "description": "Badge ist eine native Web-Komponente, die ein kleines Status- oder Kategorie-Label anzeigt, mit Farbvarianten für neutral, primär, Erfolg, Warnung, Gefahr und Info. Verwenden Sie es, um Zustände (aktiv, ausstehend, Fehler), Tags oder Zähler neben Texten und Überschriften hervorzuheben. Optional zeigt es einen vorangestellten farbigen Punkt, um den Status dezenter zu signalisieren.",
   "attributes": [
    {
     "desc": "Legt das Farbschema des Badges fest."
    },
    {
     "desc": "Wenn vorhanden, wird vor dem Inhalt ein farbiger Punkt angezeigt."
    }
   ],
   "demoHTML": "<div style=\"display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;\">\n  <pura-badge>Entwurf</pura-badge>\n  <pura-badge variant=\"primary\">Neu</pura-badge>\n  <pura-badge variant=\"success\" dot>Aktiv</pura-badge>\n  <pura-badge variant=\"warning\" dot>Ausstehend</pura-badge>\n  <pura-badge variant=\"danger\">Fehler</pura-badge>\n  <pura-badge variant=\"info\">Beta</pura-badge>\n</div>"
  },
  "it": {
   "description": "Badge è un web component nativo che mostra una piccola etichetta di stato o categoria, con varianti di colore per neutro, primario, successo, avviso, pericolo e informazione. Usalo per evidenziare stati (attivo, in sospeso, errore), tag o contatori accanto a testi e titoli. Facoltativamente mostra un punto colorato iniziale per segnalare lo stato in modo più discreto.",
   "attributes": [
    {
     "desc": "Definisce lo schema di colori del badge."
    },
    {
     "desc": "Quando presente, mostra un punto colorato prima del contenuto."
    }
   ],
   "demoHTML": "<div style=\"display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;\">\n  <pura-badge>Bozza</pura-badge>\n  <pura-badge variant=\"primary\">Nuovo</pura-badge>\n  <pura-badge variant=\"success\" dot>Attivo</pura-badge>\n  <pura-badge variant=\"warning\" dot>In sospeso</pura-badge>\n  <pura-badge variant=\"danger\">Errore</pura-badge>\n  <pura-badge variant=\"info\">Beta</pura-badge>\n</div>"
  }
 },
 "card": {
  "pt-BR": {
   "description": "Card é um web component nativo que agrupa conteúdos relacionados em uma superfície com borda, cantos arredondados e sombra. Use-o para destacar blocos de informação, resumos ou ações agrupadas. Os slots de cabeçalho e rodapé se ocultam automaticamente quando vazios, e o atributo hover adiciona uma elevação ao passar o mouse.",
   "attributes": [
    {
     "desc": "Eleva o card (sombra maior e uma leve translação) ao passar o mouse."
    }
   ],
   "demoHTML": "<pura-card hover>\n  <span slot=\"header\">Plano Pro</span>\n  Acesso ilimitado a todos os recursos, suporte prioritário e relatórios avançados para a sua equipe.\n  <div slot=\"footer\">\n    <pura-button variant=\"primary\">Assinar</pura-button>\n    <pura-button variant=\"ghost\">Saiba mais</pura-button>\n  </div>\n</pura-card>"
  },
  "fr": {
   "description": "Card est un composant web natif qui regroupe du contenu lié sur une surface dotée d'une bordure, de coins arrondis et d'une ombre. Utilisez-le pour mettre en évidence des blocs d'information, des résumés ou des actions regroupées. Les slots d'en-tête et de pied de page se masquent automatiquement lorsqu'ils sont vides, et l'attribut hover ajoute une élévation au survol de la souris.",
   "attributes": [
    {
     "desc": "Surélève la carte (ombre plus marquée et léger déplacement) au survol de la souris."
    }
   ],
   "demoHTML": "<pura-card hover>\n  <span slot=\"header\">Forfait Pro</span>\n  Accès illimité à toutes les fonctionnalités, assistance prioritaire et rapports avancés pour votre équipe.\n  <div slot=\"footer\">\n    <pura-button variant=\"primary\">S'abonner</pura-button>\n    <pura-button variant=\"ghost\">En savoir plus</pura-button>\n  </div>\n</pura-card>"
  },
  "de": {
   "description": "Card ist eine native Web-Komponente, die zusammengehörige Inhalte auf einer Oberfläche mit Rahmen, abgerundeten Ecken und Schatten gruppiert. Verwenden Sie es, um Informationsblöcke, Zusammenfassungen oder gruppierte Aktionen hervorzuheben. Die Kopf- und Fußzeilen-Slots werden automatisch ausgeblendet, wenn sie leer sind, und das Attribut hover fügt beim Überfahren mit der Maus eine Hervorhebung hinzu.",
   "attributes": [
    {
     "desc": "Hebt die Karte beim Überfahren mit der Maus an (größerer Schatten und leichte Verschiebung)."
    }
   ],
   "demoHTML": "<pura-card hover>\n  <span slot=\"header\">Pro-Tarif</span>\n  Unbegrenzter Zugriff auf alle Funktionen, vorrangiger Support und erweiterte Berichte für Ihr Team.\n  <div slot=\"footer\">\n    <pura-button variant=\"primary\">Abonnieren</pura-button>\n    <pura-button variant=\"ghost\">Mehr erfahren</pura-button>\n  </div>\n</pura-card>"
  },
  "it": {
   "description": "Card è un web component nativo che raggruppa contenuti correlati su una superficie con bordo, angoli arrotondati e ombra. Usalo per evidenziare blocchi di informazioni, riepiloghi o azioni raggruppate. Gli slot di intestazione e piè di pagina si nascondono automaticamente quando sono vuoti e l'attributo hover aggiunge un'elevazione al passaggio del mouse.",
   "attributes": [
    {
     "desc": "Solleva la card (ombra più ampia e una leggera traslazione) al passaggio del mouse."
    }
   ],
   "demoHTML": "<pura-card hover>\n  <span slot=\"header\">Piano Pro</span>\n  Accesso illimitato a tutte le funzionalità, supporto prioritario e report avanzati per il tuo team.\n  <div slot=\"footer\">\n    <pura-button variant=\"primary\">Abbonati</pura-button>\n    <pura-button variant=\"ghost\">Scopri di più</pura-button>\n  </div>\n</pura-card>"
  }
 },
 "chat-bubble": {
  "pt-BR": {
   "description": "Chat Bubble renderiza uma única mensagem de chat alinhada à esquerda (recebida) ou à direita (enviada), com avatar e horário opcionais. Use-o para construir threads de conversa, históricos de suporte ou interfaces de mensagens. A camada agent-native expõe role=\"listitem\" e atributos data-* (data-side, data-time, data-has-avatar) além de um aria-label que resume direção, conteúdo e horário, tornando a mensagem legível por leitores de tela e agentes de IA.",
   "attributes": [
    {
     "desc": "Direção da mensagem: recebida (padrão, alinha à esquerda com um fundo sutil) ou enviada (alinha à direita com a cor primária)."
    },
    {
     "desc": "Horário opcional exibido abaixo da mensagem. Também preenchido em data-time e no aria-label."
    },
    {
     "desc": "Quando presente, desenha uma pequena ponta apontando para o lado de quem fala."
    }
   ],
   "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:0.5rem;max-width:32rem\">\n  <pura-chat-bubble side=\"received\" time=\"14:32\" tail>\n    <span slot=\"avatar\">MJ</span>\n    Oi! Você viu a proposta que enviei ontem?\n  </pura-chat-bubble>\n  <pura-chat-bubble side=\"sent\" time=\"14:33\" tail>\n    Vi sim, ficou ótima. Vou aprovar ainda hoje.\n  </pura-chat-bubble>\n  <pura-chat-bubble side=\"received\" time=\"14:35\" tail>\n    <span slot=\"avatar\">MJ</span>\n    Perfeito, é só me avisar aqui se surgir qualquer coisa.\n  </pura-chat-bubble>\n</div>"
  },
  "fr": {
   "description": "Chat Bubble affiche un seul message de chat aligné à gauche (reçu) ou à droite (envoyé), avec un avatar et un horodatage optionnels. Utilisez-le pour construire des fils de conversation, des historiques de support ou des interfaces de messagerie. La couche agent-native expose role=\"listitem\" et des attributs data-* (data-side, data-time, data-has-avatar) ainsi qu'un aria-label qui résume la direction, le contenu et l'heure, rendant le message lisible par les lecteurs d'écran et les agents d'IA.",
   "attributes": [
    {
     "desc": "Direction du message : reçu (par défaut, aligné à gauche avec un fond discret) ou envoyé (aligné à droite avec la couleur primaire)."
    },
    {
     "desc": "Horodatage optionnel affiché sous le message. Également renseigné dans data-time et dans l'aria-label."
    },
    {
     "desc": "Lorsqu'il est présent, dessine une petite pointe orientée vers le côté de l'interlocuteur."
    }
   ],
   "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:0.5rem;max-width:32rem\">\n  <pura-chat-bubble side=\"received\" time=\"14:32\" tail>\n    <span slot=\"avatar\">MJ</span>\n    Salut ! Tu as vu la proposition que j'ai envoyée hier ?\n  </pura-chat-bubble>\n  <pura-chat-bubble side=\"sent\" time=\"14:33\" tail>\n    Oui, elle est super. Je l'approuverai dans la journée.\n  </pura-chat-bubble>\n  <pura-chat-bubble side=\"received\" time=\"14:35\" tail>\n    <span slot=\"avatar\">MJ</span>\n    Parfait, dis-moi simplement ici si quelque chose se présente.\n  </pura-chat-bubble>\n</div>"
  },
  "de": {
   "description": "Chat Bubble stellt eine einzelne Chat-Nachricht dar, links ausgerichtet (empfangen) oder rechts ausgerichtet (gesendet), mit optionalem Avatar und Zeitstempel. Verwenden Sie es, um Konversationsverläufe, Support-Historien oder Messaging-Oberflächen aufzubauen. Die agent-native Ebene stellt role=\"listitem\" und data-*-Attribute (data-side, data-time, data-has-avatar) sowie ein aria-label bereit, das Richtung, Inhalt und Zeit zusammenfasst und die Nachricht für Screenreader und KI-Agenten lesbar macht.",
   "attributes": [
    {
     "desc": "Richtung der Nachricht: empfangen (Standard, links ausgerichtet mit dezentem Hintergrund) oder gesendet (rechts ausgerichtet mit der Primärfarbe)."
    },
    {
     "desc": "Optionaler Zeitstempel, der unter der Nachricht angezeigt wird. Wird auch in data-time und im aria-label befüllt."
    },
    {
     "desc": "Wenn vorhanden, wird eine kleine Spitze gezeichnet, die zur Seite des Sprechers zeigt."
    }
   ],
   "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:0.5rem;max-width:32rem\">\n  <pura-chat-bubble side=\"received\" time=\"14:32\" tail>\n    <span slot=\"avatar\">MJ</span>\n    Hallo! Hast du den Vorschlag gesehen, den ich gestern geschickt habe?\n  </pura-chat-bubble>\n  <pura-chat-bubble side=\"sent\" time=\"14:33\" tail>\n    Ja, sieht super aus. Ich genehmige ihn noch heute.\n  </pura-chat-bubble>\n  <pura-chat-bubble side=\"received\" time=\"14:35\" tail>\n    <span slot=\"avatar\">MJ</span>\n    Perfekt, sag mir hier einfach Bescheid, falls etwas aufkommt.\n  </pura-chat-bubble>\n</div>"
  },
  "it": {
   "description": "Chat Bubble visualizza un singolo messaggio di chat allineato a sinistra (ricevuto) o a destra (inviato), con avatar e orario opzionali. Usalo per costruire thread di conversazione, cronologie di assistenza o interfacce di messaggistica. Il livello agent-native espone role=\"listitem\" e attributi data-* (data-side, data-time, data-has-avatar) oltre a un aria-label che riassume direzione, contenuto e orario, rendendo il messaggio leggibile dagli screen reader e dagli agenti di IA.",
   "attributes": [
    {
     "desc": "Direzione del messaggio: ricevuto (predefinito, allineato a sinistra con uno sfondo discreto) o inviato (allineato a destra con il colore primario)."
    },
    {
     "desc": "Orario opzionale mostrato sotto il messaggio. Viene popolato anche in data-time e nell'aria-label."
    },
    {
     "desc": "Quando presente, disegna una piccola punta rivolta verso il lato di chi parla."
    }
   ],
   "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:0.5rem;max-width:32rem\">\n  <pura-chat-bubble side=\"received\" time=\"14:32\" tail>\n    <span slot=\"avatar\">MJ</span>\n    Ciao! Hai visto la proposta che ho inviato ieri?\n  </pura-chat-bubble>\n  <pura-chat-bubble side=\"sent\" time=\"14:33\" tail>\n    Sì, è ottima. La approverò più tardi oggi.\n  </pura-chat-bubble>\n  <pura-chat-bubble side=\"received\" time=\"14:35\" tail>\n    <span slot=\"avatar\">MJ</span>\n    Perfetto, fammi sapere qui se salta fuori qualcosa.\n  </pura-chat-bubble>\n</div>"
  }
 },
 "code-block": {
  "pt-BR": {
   "description": "Exibe trechos de código em um <pre><code> com fonte monoespaçada, fundo sutil, rolagem horizontal e numeração de linhas opcional. Use-o para mostrar exemplos de código com nome de arquivo, rótulo de linguagem e cópia para a área de transferência com um clique. É agent-native: cada instância se registra em window.__puraCodeBlocks (um Map indexado por id) expondo { el, getText, copy, language, filename }, e reflete seu estado no host por meio de data-pura-code-block, data-language, data-filename, data-lines e data-numbered, de modo que um agente possa ler e copiar o conteúdo sem tocar no shadow DOM.",
   "attributes": [
    {
     "desc": "Rótulo de linguagem exibido no cabeçalho (por exemplo, \"js\", \"css\"). Opcional."
    },
    {
     "desc": "Nome do arquivo exibido no cabeçalho. Opcional; também se torna o aria-label do bloco."
    },
    {
     "desc": "Quando presente, exibe uma calha com números de linha."
    }
   ],
   "demoHTML": "<pura-code-block id=\"cb-demo\" language=\"js\" filename=\"greeting.js\" numbered>function greet(name) {\n  console.log(`Olá, ${name}!`);\n}\n\ngreet(\"André\");</pura-code-block>\n\n<script type=\"module\">\n  import \"/pura/lib/code-block.js\";\n  document.getElementById(\"cb-demo\").addEventListener(\"pura-copy\", (e) => {\n    console.log(\"Code copied:\", e.detail.text);\n  });\n</script>"
  },
  "fr": {
   "description": "Affiche des extraits de code dans un <pre><code> avec une police à chasse fixe, un fond discret, un défilement horizontal et une numérotation des lignes optionnelle. Utilisez-le pour présenter des exemples de code avec un nom de fichier, une indication de langage et une copie dans le presse-papiers en un clic. Il est agent-native : chaque instance s'enregistre dans window.__puraCodeBlocks (une Map indexée par id) en exposant { el, getText, copy, language, filename }, et reflète son état sur l'hôte via data-pura-code-block, data-language, data-filename, data-lines et data-numbered, afin qu'un agent puisse lire et copier le contenu sans toucher au shadow DOM.",
   "attributes": [
    {
     "desc": "Indication de langage affichée dans l'en-tête (par exemple « js », « css »). Optionnel."
    },
    {
     "desc": "Nom de fichier affiché dans l'en-tête. Optionnel ; il devient également l'aria-label du bloc."
    },
    {
     "desc": "Lorsqu'il est présent, affiche une gouttière avec les numéros de ligne."
    }
   ],
   "demoHTML": "<pura-code-block id=\"cb-demo\" language=\"js\" filename=\"greeting.js\" numbered>function greet(name) {\n  console.log(`Bonjour, ${name}!`);\n}\n\ngreet(\"André\");</pura-code-block>\n\n<script type=\"module\">\n  import \"/pura/lib/code-block.js\";\n  document.getElementById(\"cb-demo\").addEventListener(\"pura-copy\", (e) => {\n    console.log(\"Code copied:\", e.detail.text);\n  });\n</script>"
  },
  "de": {
   "description": "Zeigt Code-Schnipsel in einem <pre><code> mit Festbreitenschrift, dezentem Hintergrund, horizontalem Scrollen und optionaler Zeilennummerierung an. Verwenden Sie es, um Code-Beispiele mit Dateiname, Sprachkennzeichnung und Kopieren in die Zwischenablage per Klick anzuzeigen. Es ist agent-native: Jede Instanz registriert sich in window.__puraCodeBlocks (eine Map mit id als Schlüssel) und stellt { el, getText, copy, language, filename } bereit; sie spiegelt ihren Zustand am Host über data-pura-code-block, data-language, data-filename, data-lines und data-numbered wider, sodass ein Agent den Inhalt lesen und kopieren kann, ohne das shadow DOM zu berühren.",
   "attributes": [
    {
     "desc": "Sprachkennzeichnung, die in der Kopfzeile angezeigt wird (z. B. \"js\", \"css\"). Optional."
    },
    {
     "desc": "Dateiname, der in der Kopfzeile angezeigt wird. Optional; er wird außerdem zum aria-label des Blocks."
    },
    {
     "desc": "Wenn vorhanden, wird eine Spalte mit Zeilennummern angezeigt."
    }
   ],
   "demoHTML": "<pura-code-block id=\"cb-demo\" language=\"js\" filename=\"greeting.js\" numbered>function greet(name) {\n  console.log(`Hallo, ${name}!`);\n}\n\ngreet(\"Andreas\");</pura-code-block>\n\n<script type=\"module\">\n  import \"/pura/lib/code-block.js\";\n  document.getElementById(\"cb-demo\").addEventListener(\"pura-copy\", (e) => {\n    console.log(\"Code copied:\", e.detail.text);\n  });\n</script>"
  },
  "it": {
   "description": "Mostra frammenti di codice in un <pre><code> con carattere a spaziatura fissa, sfondo discreto, scorrimento orizzontale e numerazione delle righe opzionale. Usalo per mostrare esempi di codice con nome del file, etichetta del linguaggio e copia negli appunti con un clic. È agent-native: ogni istanza si registra in window.__puraCodeBlocks (una Map indicizzata per id) esponendo { el, getText, copy, language, filename } e riflette il proprio stato sull'host tramite data-pura-code-block, data-language, data-filename, data-lines e data-numbered, in modo che un agente possa leggere e copiare il contenuto senza toccare lo shadow DOM.",
   "attributes": [
    {
     "desc": "Etichetta del linguaggio mostrata nell'intestazione (ad esempio \"js\", \"css\"). Facoltativa."
    },
    {
     "desc": "Nome del file mostrato nell'intestazione. Facoltativo; diventa anche l'aria-label del blocco."
    },
    {
     "desc": "Quando presente, mostra una colonna con i numeri di riga."
    }
   ],
   "demoHTML": "<pura-code-block id=\"cb-demo\" language=\"js\" filename=\"greeting.js\" numbered>function greet(name) {\n  console.log(`Ciao, ${name}!`);\n}\n\ngreet(\"Andrea\");</pura-code-block>\n\n<script type=\"module\">\n  import \"/pura/lib/code-block.js\";\n  document.getElementById(\"cb-demo\").addEventListener(\"pura-copy\", (e) => {\n    console.log(\"Code copied:\", e.detail.text);\n  });\n</script>"
  }
 },
 "comment": {
  "pt-BR": {
   "description": "Exibe um único comentário com cabeçalho (autor, horário, avatar com fallback de iniciais), corpo e uma linha de ações opcional. Aninhe elementos pura-comment como filhos para criar respostas recuadas com uma linha conectora automática. Use-o em seções de comentários, threads e feeds de discussão. Camada agent-native: cada instância expõe role=\"article\", atributos data-* estáveis (data-pura-component, data-author, data-time, data-depth, data-reply-count) e um aria-label que resume autor e corpo, além de se registrar em window.__puraComments, permitindo que agentes e leitores de tela percorram a estrutura da thread sem tocar no Shadow DOM.",
   "attributes": [
    {
     "desc": "Nome de exibição de quem comenta, mostrado em negrito no cabeçalho. Gera as iniciais usadas no fallback do avatar; quando ausente, mostra \"Anonymous\"."
    },
    {
     "desc": "Texto de horário/data exibido ao lado do autor, renderizado em um <time> (também usado como datetime). Oculto quando vazio."
    },
    {
     "desc": "URL opcional da imagem do avatar. Quando ausente, ou se a imagem falhar ao carregar, recorre às iniciais do autor."
    }
   ],
   "demoHTML": "<pura-comment author=\"Maria Pedra\" time=\"há 2 horas\" avatar=\"https://i.pravatar.cc/64?img=47\">\n  Adorei a nova API do componente, ficou muito mais simples de usar agora.\n  <div slot=\"actions\">\n    <a href=\"#\">Responder</a>\n    <a href=\"#\">Curtir</a>\n  </div>\n\n  <pura-comment author=\"André Ahlert\" time=\"há 1 hora\">\n    Concordo! O suporte a respostas aninhadas ficou ótimo.\n    <div slot=\"actions\">\n      <a href=\"#\">Responder</a>\n    </div>\n  </pura-comment>\n</pura-comment>"
  },
  "fr": {
   "description": "Affiche un seul commentaire avec un en-tête (auteur, horodatage, avatar avec repli sur les initiales), un corps et une rangée d'actions optionnelle. Imbriquez des éléments pura-comment en tant qu'enfants pour créer des réponses en retrait avec une ligne de connexion automatique. Utilisez-le dans les sections de commentaires, les fils et les flux de discussion. Couche agent-native : chaque instance expose role=\"article\", des attributs data-* stables (data-pura-component, data-author, data-time, data-depth, data-reply-count) et un aria-label résumant l'auteur et le corps, et s'enregistre dans window.__puraComments, permettant aux agents et aux lecteurs d'écran de parcourir la structure du fil sans toucher au Shadow DOM.",
   "attributes": [
    {
     "desc": "Nom affiché de l'auteur du commentaire, montré en gras dans l'en-tête. Génère les initiales utilisées dans le repli de l'avatar ; en son absence, affiche « Anonymous »."
    },
    {
     "desc": "Texte d'horodatage/date affiché à côté de l'auteur, rendu dans un <time> (également utilisé comme datetime). Masqué lorsqu'il est vide."
    },
    {
     "desc": "URL optionnelle de l'image de l'avatar. En son absence, ou si l'image ne se charge pas, on revient aux initiales de l'auteur."
    }
   ],
   "demoHTML": "<pura-comment author=\"Marie Pierre\" time=\"il y a 2 heures\" avatar=\"https://i.pravatar.cc/64?img=47\">\n  J'ai adoré la nouvelle API du composant, elle est tellement plus simple à utiliser maintenant.\n  <div slot=\"actions\">\n    <a href=\"#\">Répondre</a>\n    <a href=\"#\">J'aime</a>\n  </div>\n\n  <pura-comment author=\"André Ahlert\" time=\"il y a 1 heure\">\n    Tout à fait d'accord ! La prise en charge des réponses imbriquées est très réussie.\n    <div slot=\"actions\">\n      <a href=\"#\">Répondre</a>\n    </div>\n  </pura-comment>\n</pura-comment>"
  },
  "de": {
   "description": "Zeigt einen einzelnen Kommentar mit Kopfzeile (Autor, Zeitstempel, Avatar mit Initialen-Fallback), Inhalt und einer optionalen Aktionszeile an. Verschachteln Sie pura-comment-Elemente als Kinder, um eingerückte Antworten mit einer automatischen Verbindungslinie zu erstellen. Verwenden Sie es in Kommentarbereichen, Threads und Diskussions-Feeds. Agent-native Ebene: Jede Instanz stellt role=\"article\", stabile data-*-Attribute (data-pura-component, data-author, data-time, data-depth, data-reply-count) und ein aria-label bereit, das Autor und Inhalt zusammenfasst, und registriert sich in window.__puraComments, sodass Agenten und Screenreader die Thread-Struktur durchlaufen können, ohne das Shadow DOM zu berühren.",
   "attributes": [
    {
     "desc": "Anzeigename des Kommentierenden, in der Kopfzeile fett dargestellt. Erzeugt die Initialen, die im Avatar-Fallback verwendet werden; ist er nicht vorhanden, wird \"Anonymous\" angezeigt."
    },
    {
     "desc": "Zeitstempel-/Datumstext, der neben dem Autor angezeigt und in einem <time> gerendert wird (auch als datetime verwendet). Wird ausgeblendet, wenn leer."
    },
    {
     "desc": "Optionale URL des Avatar-Bilds. Ist sie nicht vorhanden oder lässt sich das Bild nicht laden, wird auf die Initialen des Autors zurückgegriffen."
    }
   ],
   "demoHTML": "<pura-comment author=\"Maria Stein\" time=\"vor 2 Stunden\" avatar=\"https://i.pravatar.cc/64?img=47\">\n  Die neue Komponenten-API gefällt mir sehr, sie ist jetzt viel einfacher zu nutzen.\n  <div slot=\"actions\">\n    <a href=\"#\">Antworten</a>\n    <a href=\"#\">Gefällt mir</a>\n  </div>\n\n  <pura-comment author=\"André Ahlert\" time=\"vor 1 Stunde\">\n    Stimme zu! Die Unterstützung für verschachtelte Antworten ist richtig gut geworden.\n    <div slot=\"actions\">\n      <a href=\"#\">Antworten</a>\n    </div>\n  </pura-comment>\n</pura-comment>"
  },
  "it": {
   "description": "Mostra un singolo commento con intestazione (autore, orario, avatar con fallback alle iniziali), corpo e una riga di azioni opzionale. Annida elementi pura-comment come figli per creare risposte rientrate con una linea di collegamento automatica. Usalo nelle sezioni di commenti, nei thread e nei feed di discussione. Livello agent-native: ogni istanza espone role=\"article\", attributi data-* stabili (data-pura-component, data-author, data-time, data-depth, data-reply-count) e un aria-label che riassume autore e corpo, e si registra in window.__puraComments, consentendo ad agenti e screen reader di percorrere la struttura del thread senza toccare lo Shadow DOM.",
   "attributes": [
    {
     "desc": "Nome visualizzato di chi commenta, mostrato in grassetto nell'intestazione. Genera le iniziali usate nel fallback dell'avatar; quando assente, mostra \"Anonymous\"."
    },
    {
     "desc": "Testo di orario/data mostrato accanto all'autore, reso in un <time> (usato anche come datetime). Nascosto quando vuoto."
    },
    {
     "desc": "URL opzionale dell'immagine dell'avatar. Quando assente, o se l'immagine non si carica, ricorre alle iniziali dell'autore."
    }
   ],
   "demoHTML": "<pura-comment author=\"Maria Pietri\" time=\"2 ore fa\" avatar=\"https://i.pravatar.cc/64?img=47\">\n  Adoro la nuova API del componente, ora è molto più semplice da usare.\n  <div slot=\"actions\">\n    <a href=\"#\">Rispondi</a>\n    <a href=\"#\">Mi piace</a>\n  </div>\n\n  <pura-comment author=\"André Ahlert\" time=\"1 ora fa\">\n    Concordo! Il supporto per le risposte annidate è venuto benissimo.\n    <div slot=\"actions\">\n      <a href=\"#\">Rispondi</a>\n    </div>\n  </pura-comment>\n</pura-comment>"
  }
 },
 "copy-button": {
  "pt-BR": {
   "description": "O `<pura-copy-button>` copia para a área de transferência um texto literal (`value`) ou o conteúdo de outro elemento na página (`target`), exibindo um ícone de confirmação e o rótulo \"Copiado\" por cerca de 1,2s. Use-o para copiar comandos, chaves de API, links ou trechos de código com um único clique. Possui uma camada agent-native: cada instância espelha seu estado em atributos `data-pura-copy-*` e se registra em `window.__puraCopyButtons` (indexado por `data-pura-id`), permitindo que agentes enumerem e acionem cópias por meio do método `.copy()` sem tocar no Shadow DOM.",
   "attributes": [
    {
     "desc": "Texto literal a ser copiado. Tem prioridade sobre target."
    },
    {
     "desc": "Seletor CSS resolvido em relação ao documento; copia o valor (campos de formulário) ou o textContent do nó correspondente."
    },
    {
     "desc": "Duração do feedback Copiado em milissegundos."
    },
    {
     "desc": "Torna o botão não interativo."
    },
    {
     "desc": "Rótulo acessível (aria-label) para o botão apenas com ícone."
    }
   ],
   "demoHTML": "<div style=\"display:flex; flex-direction:column; gap:1rem; max-width:420px; font-family:system-ui\">\n  <div style=\"display:flex; align-items:center; gap:.5rem\">\n    <code id=\"chave\" style=\"padding:.4rem .6rem; background:#f4f4f5; border-radius:6px; flex:1\">sk-pura-2f9a-7c41-d8e0</code>\n    <pura-copy-button target=\"#chave\" label=\"Copiar chave\"></pura-copy-button>\n  </div>\n\n  <pura-copy-button value=\"npm install pura\">Copiar comando</pura-copy-button>\n</div>\n\n<script type=\"module\">\n  import \"/pura/lib/copy-button.js\";\n</script>"
  },
  "fr": {
   "description": "Le `<pura-copy-button>` copie dans le presse-papiers soit un texte littéral (`value`), soit le contenu d'un autre élément de la page (`target`), en affichant une icône de validation et le libellé « Copié » pendant environ 1,2 s. Utilisez-le pour copier des commandes, des clés d'API, des liens ou des extraits de code en un seul clic. Il dispose d'une couche agent-native : chaque instance reflète son état dans des attributs `data-pura-copy-*` et s'enregistre dans `window.__puraCopyButtons` (indexé par `data-pura-id`), permettant aux agents d'énumérer et de déclencher des copies via la méthode `.copy()` sans toucher au Shadow DOM.",
   "attributes": [
    {
     "desc": "Texte littéral à copier. Prioritaire sur target."
    },
    {
     "desc": "Sélecteur CSS résolu par rapport au document ; copie la valeur (champs de formulaire) ou le textContent du nœud correspondant."
    },
    {
     "desc": "Durée du retour Copié en millisecondes."
    },
    {
     "desc": "Rend le bouton non interactif."
    },
    {
     "desc": "Libellé accessible (aria-label) pour le bouton à icône seule."
    }
   ],
   "demoHTML": "<div style=\"display:flex; flex-direction:column; gap:1rem; max-width:420px; font-family:system-ui\">\n  <div style=\"display:flex; align-items:center; gap:.5rem\">\n    <code id=\"chave\" style=\"padding:.4rem .6rem; background:#f4f4f5; border-radius:6px; flex:1\">sk-pura-2f9a-7c41-d8e0</code>\n    <pura-copy-button target=\"#chave\" label=\"Copier la clé\"></pura-copy-button>\n  </div>\n\n  <pura-copy-button value=\"npm install pura\">Copier la commande</pura-copy-button>\n</div>\n\n<script type=\"module\">\n  import \"/pura/lib/copy-button.js\";\n</script>"
  },
  "de": {
   "description": "Der `<pura-copy-button>` kopiert entweder einen wörtlichen Text (`value`) oder den Inhalt eines anderen Elements auf der Seite (`target`) in die Zwischenablage und zeigt dabei für etwa 1,2 s ein Häkchen-Symbol und die Bezeichnung \"Kopiert\" an. Verwenden Sie ihn, um Befehle, API-Schlüssel, Links oder Code-Schnipsel mit einem einzigen Klick zu kopieren. Er verfügt über eine agent-native Ebene: Jede Instanz spiegelt ihren Zustand in `data-pura-copy-*`-Attributen wider und registriert sich in `window.__puraCopyButtons` (indiziert über `data-pura-id`), sodass Agenten Kopiervorgänge über die Methode `.copy()` aufzählen und auslösen können, ohne das Shadow DOM zu berühren.",
   "attributes": [
    {
     "desc": "Wörtlicher Text, der kopiert werden soll. Hat Vorrang vor target."
    },
    {
     "desc": "CSS-Selektor, der gegen das Dokument aufgelöst wird; kopiert den Wert (Formularfelder) oder den textContent des passenden Knotens."
    },
    {
     "desc": "Dauer der Kopiert-Rückmeldung in Millisekunden."
    },
    {
     "desc": "Macht den Button nicht interaktiv."
    },
    {
     "desc": "Barrierefreie Bezeichnung (aria-label) für den Button mit reinem Symbol."
    }
   ],
   "demoHTML": "<div style=\"display:flex; flex-direction:column; gap:1rem; max-width:420px; font-family:system-ui\">\n  <div style=\"display:flex; align-items:center; gap:.5rem\">\n    <code id=\"chave\" style=\"padding:.4rem .6rem; background:#f4f4f5; border-radius:6px; flex:1\">sk-pura-2f9a-7c41-d8e0</code>\n    <pura-copy-button target=\"#chave\" label=\"Schlüssel kopieren\"></pura-copy-button>\n  </div>\n\n  <pura-copy-button value=\"npm install pura\">Befehl kopieren</pura-copy-button>\n</div>\n\n<script type=\"module\">\n  import \"/pura/lib/copy-button.js\";\n</script>"
  },
  "it": {
   "description": "Il `<pura-copy-button>` copia negli appunti un testo letterale (`value`) o il contenuto di un altro elemento della pagina (`target`), mostrando un'icona di conferma e l'etichetta \"Copiato\" per circa 1,2 s. Usalo per copiare comandi, chiavi API, link o frammenti di codice con un solo clic. Dispone di un livello agent-native: ogni istanza rispecchia il proprio stato negli attributi `data-pura-copy-*` e si registra in `window.__puraCopyButtons` (indicizzato per `data-pura-id`), consentendo agli agenti di enumerare e avviare copie tramite il metodo `.copy()` senza toccare lo Shadow DOM.",
   "attributes": [
    {
     "desc": "Testo letterale da copiare. Ha priorità su target."
    },
    {
     "desc": "Selettore CSS risolto rispetto al documento; copia il valore (campi di modulo) o il textContent del nodo corrispondente."
    },
    {
     "desc": "Durata del feedback Copiato in millisecondi."
    },
    {
     "desc": "Rende il pulsante non interattivo."
    },
    {
     "desc": "Etichetta accessibile (aria-label) per il pulsante con sola icona."
    }
   ],
   "demoHTML": "<div style=\"display:flex; flex-direction:column; gap:1rem; max-width:420px; font-family:system-ui\">\n  <div style=\"display:flex; align-items:center; gap:.5rem\">\n    <code id=\"chave\" style=\"padding:.4rem .6rem; background:#f4f4f5; border-radius:6px; flex:1\">sk-pura-2f9a-7c41-d8e0</code>\n    <pura-copy-button target=\"#chave\" label=\"Copia chiave\"></pura-copy-button>\n  </div>\n\n  <pura-copy-button value=\"npm install pura\">Copia comando</pura-copy-button>\n</div>\n\n<script type=\"module\">\n  import \"/pura/lib/copy-button.js\";\n</script>"
  }
 },
 "empty": {
  "pt-BR": {
   "description": "Empty (`<pura-empty>`) é um web component nativo para exibir estados vazios: uma coluna centralizada com ícone, título, descrição e área de ação opcionais. Use-o quando uma lista, busca ou seção não tiver conteúdo para mostrar e você quiser orientar o usuário com uma mensagem clara e um próximo passo. Regiões sem conteúdo são ocultadas automaticamente para manter o layout limpo.",
   "attributes": [
    {
     "desc": "Texto do título exibido quando o slot \"title\" não é usado."
    }
   ],
   "demoHTML": "<pura-empty title=\"Nenhum resultado encontrado\">\n  <svg slot=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <circle cx=\"11\" cy=\"11\" r=\"8\"></circle>\n    <line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line>\n  </svg>\n  Tente ajustar os filtros ou buscar por outro termo.\n  <pura-button slot=\"action\" variant=\"primary\">Limpar filtros</pura-button>\n</pura-empty>"
  },
  "fr": {
   "description": "Empty (`<pura-empty>`) est un composant web natif pour afficher des états vides : une colonne centrée avec une icône, un titre, une description et une zone d'action optionnels. Utilisez-le lorsqu'une liste, une recherche ou une section n'a aucun contenu à afficher et que vous souhaitez guider l'utilisateur avec un message clair et une prochaine étape. Les régions sans contenu sont masquées automatiquement pour garder une mise en page épurée.",
   "attributes": [
    {
     "desc": "Texte du titre affiché lorsque le slot « title » n'est pas utilisé."
    }
   ],
   "demoHTML": "<pura-empty title=\"Aucun résultat trouvé\">\n  <svg slot=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <circle cx=\"11\" cy=\"11\" r=\"8\"></circle>\n    <line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line>\n  </svg>\n  Essayez d'ajuster les filtres ou de rechercher un autre terme.\n  <pura-button slot=\"action\" variant=\"primary\">Effacer les filtres</pura-button>\n</pura-empty>"
  },
  "de": {
   "description": "Empty (`<pura-empty>`) ist eine native Web-Komponente zur Anzeige von Leerzuständen: eine zentrierte Spalte mit optionalem Symbol, Titel, Beschreibung und Aktionsbereich. Verwenden Sie es, wenn eine Liste, eine Suche oder ein Bereich keinen Inhalt anzuzeigen hat und Sie den Benutzer mit einer klaren Nachricht und einem nächsten Schritt leiten möchten. Bereiche ohne Inhalt werden automatisch ausgeblendet, um das Layout übersichtlich zu halten.",
   "attributes": [
    {
     "desc": "Titeltext, der angezeigt wird, wenn der \"title\"-Slot nicht verwendet wird."
    }
   ],
   "demoHTML": "<pura-empty title=\"Keine Ergebnisse gefunden\">\n  <svg slot=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <circle cx=\"11\" cy=\"11\" r=\"8\"></circle>\n    <line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line>\n  </svg>\n  Versuchen Sie, die Filter anzupassen oder nach einem anderen Begriff zu suchen.\n  <pura-button slot=\"action\" variant=\"primary\">Filter zurücksetzen</pura-button>\n</pura-empty>"
  },
  "it": {
   "description": "Empty (`<pura-empty>`) è un web component nativo per visualizzare stati vuoti: una colonna centrata con icona, titolo, descrizione e area di azione opzionali. Usalo quando un elenco, una ricerca o una sezione non ha contenuti da mostrare e vuoi guidare l'utente con un messaggio chiaro e un passo successivo. Le regioni senza contenuto vengono nascoste automaticamente per mantenere il layout pulito.",
   "attributes": [
    {
     "desc": "Testo del titolo mostrato quando lo slot \"title\" non viene usato."
    }
   ],
   "demoHTML": "<pura-empty title=\"Nessun risultato trovato\">\n  <svg slot=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <circle cx=\"11\" cy=\"11\" r=\"8\"></circle>\n    <line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line>\n  </svg>\n  Prova a modificare i filtri o a cercare un altro termine.\n  <pura-button slot=\"action\" variant=\"primary\">Cancella filtri</pura-button>\n</pura-empty>"
  }
 },
 "gauge": {
  "pt-BR": {
   "description": "O `<pura-gauge>` é um medidor somente leitura: desenha um arco SVG de 180 graus preenchido de `min` até `value`, com um ponteiro que gira e o valor numérico mais um rótulo opcional no centro. Use-o para indicar progresso, ocupação, uma pontuação ou qualquer leitura escalar (uso de CPU, NPS, bateria). Além de role=\"meter\" com ARIA completo, ele expõe uma camada agent-native: atributos `data-pura-gauge-*` espelham o estado ao vivo e cada instância se registra em `window.__puraGauges` (por `data-pura-id`), de modo que um agente possa enumerar e ler cada gauge da página sem inspecionar o DOM interno.",
   "attributes": [
    {
     "desc": "Leitura atual, limitada ao intervalo [min, max]."
    },
    {
     "desc": "Início da escala."
    },
    {
     "desc": "Fim da escala. Se max <= min, torna-se min+1."
    },
    {
     "desc": "Legenda exibida abaixo do valor e usada como nome acessível."
    }
   ],
   "demoHTML": "<div style=\"display:flex;gap:2rem;flex-wrap:wrap;align-items:flex-end\">\n  <pura-gauge id=\"cpu\" value=\"72\" min=\"0\" max=\"100\" label=\"Uso de CPU\" style=\"width:12rem\"></pura-gauge>\n  <pura-gauge value=\"8.4\" min=\"0\" max=\"10\" label=\"NPS\" style=\"width:12rem\"></pura-gauge>\n  <pura-gauge value=\"430\" min=\"0\" max=\"500\" label=\"Pontos\" style=\"width:12rem\"></pura-gauge>\n</div>\n<button id=\"randomizar\" style=\"margin-top:1rem\">Atualizar CPU</button>\n<script type=\"module\">\n  import \"/pura/lib/gauge.js\";\n  document.getElementById(\"randomizar\").addEventListener(\"click\", () => {\n    document.getElementById(\"cpu\").value = Math.round(Math.random() * 100);\n  });\n</script>"
  },
  "fr": {
   "description": "Le `<pura-gauge>` est une jauge en lecture seule : il trace un arc SVG de 180 degrés rempli de `min` à `value`, avec une aiguille qui pivote et la valeur numérique accompagnée d'un libellé optionnel au centre. Utilisez-le pour indiquer une progression, un taux d'occupation, un score ou toute lecture scalaire (utilisation du CPU, NPS, batterie). Au-delà de role=\"meter\" avec un ARIA complet, il expose une couche agent-native : les attributs `data-pura-gauge-*` reflètent l'état en direct, et chaque instance s'enregistre dans `window.__puraGauges` (par `data-pura-id`), afin qu'un agent puisse énumérer et lire chaque jauge de la page sans inspecter le DOM interne.",
   "attributes": [
    {
     "desc": "Lecture actuelle, bornée à l'intervalle [min, max]."
    },
    {
     "desc": "Début de l'échelle."
    },
    {
     "desc": "Fin de l'échelle. Si max <= min, elle devient min+1."
    },
    {
     "desc": "Légende affichée sous la valeur et utilisée comme nom accessible."
    }
   ],
   "demoHTML": "<div style=\"display:flex;gap:2rem;flex-wrap:wrap;align-items:flex-end\">\n  <pura-gauge id=\"cpu\" value=\"72\" min=\"0\" max=\"100\" label=\"Utilisation du processeur\" style=\"width:12rem\"></pura-gauge>\n  <pura-gauge value=\"8.4\" min=\"0\" max=\"10\" label=\"NPS\" style=\"width:12rem\"></pura-gauge>\n  <pura-gauge value=\"430\" min=\"0\" max=\"500\" label=\"Points\" style=\"width:12rem\"></pura-gauge>\n</div>\n<button id=\"randomizar\" style=\"margin-top:1rem\">Actualiser le processeur</button>\n<script type=\"module\">\n  import \"/pura/lib/gauge.js\";\n  document.getElementById(\"randomizar\").addEventListener(\"click\", () => {\n    document.getElementById(\"cpu\").value = Math.round(Math.random() * 100);\n  });\n</script>"
  },
  "de": {
   "description": "Der `<pura-gauge>` ist eine schreibgeschützte Anzeige: Er zeichnet einen 180-Grad-SVG-Bogen, der von `min` bis `value` gefüllt ist, mit einem rotierenden Zeiger sowie dem numerischen Wert und einer optionalen Beschriftung in der Mitte. Verwenden Sie ihn, um Fortschritt, Auslastung, eine Bewertung oder einen beliebigen skalaren Messwert (CPU-Auslastung, NPS, Akku) anzuzeigen. Über role=\"meter\" mit vollständigem ARIA hinaus stellt er eine agent-native Ebene bereit: `data-pura-gauge-*`-Attribute spiegeln den Live-Zustand wider, und jede Instanz registriert sich in `window.__puraGauges` (über `data-pura-id`), sodass ein Agent jede Anzeige auf der Seite aufzählen und auslesen kann, ohne das interne DOM zu inspizieren.",
   "attributes": [
    {
     "desc": "Aktueller Messwert, begrenzt auf den Bereich [min, max]."
    },
    {
     "desc": "Anfang der Skala."
    },
    {
     "desc": "Ende der Skala. Wenn max <= min, wird es zu min+1."
    },
    {
     "desc": "Beschriftung, die unter dem Wert angezeigt und als barrierefreier Name verwendet wird."
    }
   ],
   "demoHTML": "<div style=\"display:flex;gap:2rem;flex-wrap:wrap;align-items:flex-end\">\n  <pura-gauge id=\"cpu\" value=\"72\" min=\"0\" max=\"100\" label=\"CPU-Auslastung\" style=\"width:12rem\"></pura-gauge>\n  <pura-gauge value=\"8.4\" min=\"0\" max=\"10\" label=\"NPS\" style=\"width:12rem\"></pura-gauge>\n  <pura-gauge value=\"430\" min=\"0\" max=\"500\" label=\"Punkte\" style=\"width:12rem\"></pura-gauge>\n</div>\n<button id=\"randomizar\" style=\"margin-top:1rem\">CPU aktualisieren</button>\n<script type=\"module\">\n  import \"/pura/lib/gauge.js\";\n  document.getElementById(\"randomizar\").addEventListener(\"click\", () => {\n    document.getElementById(\"cpu\").value = Math.round(Math.random() * 100);\n  });\n</script>"
  },
  "it": {
   "description": "Il `<pura-gauge>` è un indicatore in sola lettura: disegna un arco SVG di 180 gradi riempito da `min` a `value`, con una lancetta che ruota e il valore numerico più un'etichetta opzionale al centro. Usalo per indicare avanzamento, occupazione, un punteggio o qualsiasi lettura scalare (utilizzo della CPU, NPS, batteria). Oltre a role=\"meter\" con ARIA completo, espone un livello agent-native: gli attributi `data-pura-gauge-*` rispecchiano lo stato in tempo reale e ogni istanza si registra in `window.__puraGauges` (per `data-pura-id`), così che un agente possa enumerare e leggere ogni gauge della pagina senza ispezionare il DOM interno.",
   "attributes": [
    {
     "desc": "Lettura corrente, limitata all'intervallo [min, max]."
    },
    {
     "desc": "Inizio della scala."
    },
    {
     "desc": "Fine della scala. Se max <= min, diventa min+1."
    },
    {
     "desc": "Didascalia mostrata sotto il valore e usata come nome accessibile."
    }
   ],
   "demoHTML": "<div style=\"display:flex;gap:2rem;flex-wrap:wrap;align-items:flex-end\">\n  <pura-gauge id=\"cpu\" value=\"72\" min=\"0\" max=\"100\" label=\"Utilizzo CPU\" style=\"width:12rem\"></pura-gauge>\n  <pura-gauge value=\"8.4\" min=\"0\" max=\"10\" label=\"NPS\" style=\"width:12rem\"></pura-gauge>\n  <pura-gauge value=\"430\" min=\"0\" max=\"500\" label=\"Punti\" style=\"width:12rem\"></pura-gauge>\n</div>\n<button id=\"randomizar\" style=\"margin-top:1rem\">Aggiorna CPU</button>\n<script type=\"module\">\n  import \"/pura/lib/gauge.js\";\n  document.getElementById(\"randomizar\").addEventListener(\"click\", () => {\n    document.getElementById(\"cpu\").value = Math.round(Math.random() * 100);\n  });\n</script>"
  }
 },
 "item": {
  "pt-BR": {
   "description": "Item (`<pura-item>`) é um web component nativo que monta uma linha flex com mídia à esquerda, uma coluna central para o título e a descrição, e ações à direita. Use-o para construir listas, configurações, notificações ou qualquer linha de conteúdo estruturada. Quando marcado como clicável, comporta-se como um botão, com role, foco e ativação por teclado (Enter/Espaço).",
   "attributes": [
    {
     "desc": "Texto de conveniência para o título (o slot \"title\" tem prioridade sobre ele)."
    },
    {
     "desc": "Aplica um fundo sutil ao passar o mouse sobre o item."
    },
    {
     "desc": "Adiciona borda, raio e uma elevação sutil ao redor do item."
    },
    {
     "desc": "Torna o item interativo: cursor de ponteiro, role=\"button\" e ativação por teclado."
    }
   ],
   "demoHTML": "<pura-item bordered>\n  <span slot=\"media\">📁</span>\n  <span slot=\"title\">Documentos</span>\n  Arquivos e pastas compartilhados com a equipe\n  <button slot=\"actions\">Abrir</button>\n</pura-item>\n\n<pura-item hover clickable title=\"Notificações\">\n  <span slot=\"media\">🔔</span>\n  Receba alertas por email e push\n  <span slot=\"actions\">3</span>\n</pura-item>"
  },
  "fr": {
   "description": "Item (`<pura-item>`) est un composant web natif qui compose une ligne flex avec un média à gauche, une colonne centrale pour le titre et la description, et des actions à droite. Utilisez-le pour construire des listes, des paramètres, des notifications ou toute ligne de contenu structurée. Lorsqu'il est marqué comme cliquable, il se comporte comme un bouton, avec rôle, focus et activation au clavier (Entrée/Espace).",
   "attributes": [
    {
     "desc": "Texte pratique pour le titre (le slot « title » est prioritaire sur lui)."
    },
    {
     "desc": "Applique un fond discret au survol de l'élément."
    },
    {
     "desc": "Ajoute une bordure, un rayon et une légère élévation autour de l'élément."
    },
    {
     "desc": "Rend l'élément interactif : curseur en pointeur, role=\"button\" et activation au clavier."
    }
   ],
   "demoHTML": "<pura-item bordered>\n  <span slot=\"media\">📁</span>\n  <span slot=\"title\">Documents</span>\n  Fichiers et dossiers partagés avec l'équipe\n  <button slot=\"actions\">Ouvrir</button>\n</pura-item>\n\n<pura-item hover clickable title=\"Notifications\">\n  <span slot=\"media\">🔔</span>\n  Recevez des alertes par e-mail et notification push\n  <span slot=\"actions\">3</span>\n</pura-item>"
  },
  "de": {
   "description": "Item (`<pura-item>`) ist eine native Web-Komponente, die eine Flex-Zeile mit Medien links, einer mittleren Spalte für Titel und Beschreibung und Aktionen rechts aufbaut. Verwenden Sie es, um Listen, Einstellungen, Benachrichtigungen oder jede strukturierte Inhaltszeile aufzubauen. Wenn es als klickbar markiert ist, verhält es sich wie ein Button, mit Rolle, Fokus und Tastaturaktivierung (Enter/Leertaste).",
   "attributes": [
    {
     "desc": "Komfort-Text für den Titel (der \"title\"-Slot hat Vorrang davor)."
    },
    {
     "desc": "Wendet beim Überfahren des Elements mit der Maus einen dezenten Hintergrund an."
    },
    {
     "desc": "Fügt einen Rahmen, eine Rundung und eine dezente Hervorhebung um das Element herum hinzu."
    },
    {
     "desc": "Macht das Element interaktiv: Zeiger-Cursor, role=\"button\" und Tastaturaktivierung."
    }
   ],
   "demoHTML": "<pura-item bordered>\n  <span slot=\"media\">📁</span>\n  <span slot=\"title\">Dokumente</span>\n  Mit dem Team geteilte Dateien und Ordner\n  <button slot=\"actions\">Öffnen</button>\n</pura-item>\n\n<pura-item hover clickable title=\"Benachrichtigungen\">\n  <span slot=\"media\">🔔</span>\n  Erhalten Sie Hinweise per E-Mail und Push\n  <span slot=\"actions\">3</span>\n</pura-item>"
  },
  "it": {
   "description": "Item (`<pura-item>`) è un web component nativo che costruisce una riga flex con i media a sinistra, una colonna centrale per il titolo e la descrizione e le azioni a destra. Usalo per costruire elenchi, impostazioni, notifiche o qualsiasi riga di contenuto strutturata. Quando contrassegnato come cliccabile, si comporta come un pulsante, con ruolo, focus e attivazione da tastiera (Invio/Spazio).",
   "attributes": [
    {
     "desc": "Testo di comodità per il titolo (lo slot \"title\" ha priorità su di esso)."
    },
    {
     "desc": "Applica uno sfondo discreto al passaggio del mouse sull'elemento."
    },
    {
     "desc": "Aggiunge un bordo, un raggio e una leggera elevazione attorno all'elemento."
    },
    {
     "desc": "Rende l'elemento interattivo: cursore a puntatore, role=\"button\" e attivazione da tastiera."
    }
   ],
   "demoHTML": "<pura-item bordered>\n  <span slot=\"media\">📁</span>\n  <span slot=\"title\">Documenti</span>\n  File e cartelle condivisi con il team\n  <button slot=\"actions\">Apri</button>\n</pura-item>\n\n<pura-item hover clickable title=\"Notifiche\">\n  <span slot=\"media\">🔔</span>\n  Ricevi avvisi via email e push\n  <span slot=\"actions\">3</span>\n</pura-item>"
  }
 },
 "kbd": {
  "pt-BR": {
   "description": "Kbd é um web component nativo que renderiza uma tecla de atalho como um pequeno chip monoespaçado inline. Use-o para representar atalhos de teclado em texto, menus ou dicas de uso, como ⌘K ou Ctrl. O conteúdo da tecla é definido pelo slot padrão, sem configuração adicional.",
   "attributes": [],
   "demoHTML": "<p style=\"display: flex; align-items: center; gap: 8px; font-family: sans-serif;\">\n  Pressione <pura-kbd>⌘</pura-kbd> <pura-kbd>K</pura-kbd> para buscar\n</p>\n<p style=\"display: flex; align-items: center; gap: 8px; font-family: sans-serif;\">\n  Salve com <pura-kbd>Ctrl</pura-kbd> <pura-kbd>S</pura-kbd>\n</p>"
  },
  "fr": {
   "description": "Kbd est un web component natif qui affiche une touche de raccourci sous la forme d'une petite puce monospace en ligne. Utilisez-le pour représenter des raccourcis clavier dans du texte, des menus ou des indications d'utilisation, comme ⌘K ou Ctrl. Le contenu de la touche est défini par le slot par défaut, sans configuration supplémentaire.",
   "attributes": [],
   "demoHTML": "<p style=\"display: flex; align-items: center; gap: 8px; font-family: sans-serif;\">\n  Appuyez sur <pura-kbd>⌘</pura-kbd> <pura-kbd>K</pura-kbd> pour rechercher\n</p>\n<p style=\"display: flex; align-items: center; gap: 8px; font-family: sans-serif;\">\n  Enregistrez avec <pura-kbd>Ctrl</pura-kbd> <pura-kbd>S</pura-kbd>\n</p>"
  },
  "de": {
   "description": "Kbd ist ein natives Web Component, das eine Tastaturtaste als kleinen Inline-Chip in dicktengleicher Schrift darstellt. Verwenden Sie es, um Tastaturkürzel in Text, Menüs oder Nutzungshinweisen darzustellen, etwa ⌘K oder Ctrl. Der Inhalt der Taste wird über den Standard-Slot festgelegt, ohne zusätzliche Konfiguration.",
   "attributes": [],
   "demoHTML": "<p style=\"display: flex; align-items: center; gap: 8px; font-family: sans-serif;\">\n  Drücken Sie <pura-kbd>⌘</pura-kbd> <pura-kbd>K</pura-kbd> zum Suchen\n</p>\n<p style=\"display: flex; align-items: center; gap: 8px; font-family: sans-serif;\">\n  Speichern mit <pura-kbd>Ctrl</pura-kbd> <pura-kbd>S</pura-kbd>\n</p>"
  },
  "it": {
   "description": "Kbd è un web component nativo che visualizza un tasto di scelta rapida come un piccolo chip monospaziato inline. Usalo per rappresentare scorciatoie da tastiera nel testo, nei menu o nei suggerimenti d'uso, come ⌘K o Ctrl. Il contenuto del tasto è definito dallo slot predefinito, senza configurazioni aggiuntive.",
   "attributes": [],
   "demoHTML": "<p style=\"display: flex; align-items: center; gap: 8px; font-family: sans-serif;\">\n  Premi <pura-kbd>⌘</pura-kbd> <pura-kbd>K</pura-kbd> per cercare\n</p>\n<p style=\"display: flex; align-items: center; gap: 8px; font-family: sans-serif;\">\n  Salva con <pura-kbd>Ctrl</pura-kbd> <pura-kbd>S</pura-kbd>\n</p>"
  }
 },
 "marquee": {
  "pt-BR": {
   "description": "pura-marquee rola horizontalmente o conteúdo do slot padrão em um loop contínuo, clonando os filhos em um espelho aria-hidden para que a emenda permaneça invisível. Use-o para logos de parceiros, anúncios em rolagem ou destaques. Ele respeita prefers-reduced-motion (interrompendo a animação por completo) e expõe uma camada agent-native: atributos data-pura-marquee-* espelham o estado ao vivo, e cada instância se registra em window.__puraMarquees sob a chave data-pura-id, permitindo que agentes enumerem, leiam e controlem cada marquee sem varrer o DOM.",
   "attributes": [
    {
     "desc": "Segundos para um loop completo. Menor = mais rápido."
    },
    {
     "desc": "Direção em que o conteúdo rola."
    },
    {
     "desc": "Quando presente, pausa enquanto o cursor está sobre o elemento ou há foco interno."
    },
    {
     "desc": "Estado refletido; presente quando a animação está parada."
    },
    {
     "desc": "Texto de aria-label aplicado ao contêiner com role=marquee."
    }
   ],
   "demoHTML": "<div style=\"max-width:640px;border:1px solid var(--pura-border,#e2e2e2);border-radius:8px;padding:12px\">\n  <pura-marquee id=\"m1\" speed=\"18\" pause-on-hover label=\"Parceiros\">\n    <strong>Acme</strong>\n    <strong>Globex</strong>\n    <strong>Initech</strong>\n    <strong>Umbrella</strong>\n    <strong>Soylent</strong>\n    <strong>Stark Industries</strong>\n  </pura-marquee>\n  <button id=\"toggle\" type=\"button\" style=\"margin-top:12px\">Pausar / Retomar</button>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/marquee.js\";\n  document.getElementById(\"toggle\").addEventListener(\"click\", () => {\n    document.getElementById(\"m1\").toggle();\n  });\n</script>"
  },
  "fr": {
   "description": "pura-marquee fait défiler horizontalement le contenu du slot par défaut en boucle continue, en clonant les enfants dans un miroir aria-hidden pour que la jointure reste invisible. Utilisez-le pour des logos de partenaires, des annonces défilantes ou des mises en avant. Il respecte prefers-reduced-motion (en arrêtant complètement l'animation) et expose une couche agent-native : les attributs data-pura-marquee-* reflètent l'état en direct, et chaque instance s'enregistre dans window.__puraMarquees sous la clé data-pura-id, ce qui permet aux agents d'énumérer, de lire et de contrôler chaque marquee sans parcourir le DOM.",
   "attributes": [
    {
     "desc": "Secondes pour une boucle complète. Plus bas = plus rapide."
    },
    {
     "desc": "Direction dans laquelle le contenu défile."
    },
    {
     "desc": "Lorsqu'il est présent, met en pause lorsque le curseur survole l'élément ou qu'il a le focus interne."
    },
    {
     "desc": "État reflété ; présent lorsque l'animation est arrêtée."
    },
    {
     "desc": "Texte aria-label appliqué au conteneur avec role=marquee."
    }
   ],
   "demoHTML": "<div style=\"max-width:640px;border:1px solid var(--pura-border,#e2e2e2);border-radius:8px;padding:12px\">\n  <pura-marquee id=\"m1\" speed=\"18\" pause-on-hover label=\"Partenaires\">\n    <strong>Acme</strong>\n    <strong>Globex</strong>\n    <strong>Initech</strong>\n    <strong>Umbrella</strong>\n    <strong>Soylent</strong>\n    <strong>Stark Industries</strong>\n  </pura-marquee>\n  <button id=\"toggle\" type=\"button\" style=\"margin-top:12px\">Pause / Reprendre</button>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/marquee.js\";\n  document.getElementById(\"toggle\").addEventListener(\"click\", () => {\n    document.getElementById(\"m1\").toggle();\n  });\n</script>"
  },
  "de": {
   "description": "pura-marquee scrollt den Inhalt des Standard-Slots horizontal in einer durchgehenden Schleife und klont die Kinder in ein aria-hidden-Spiegelbild, sodass die Nahtstelle unsichtbar bleibt. Verwenden Sie es für Partner-Logos, scrollende Ankündigungen oder Highlights. Es respektiert prefers-reduced-motion (indem die Animation vollständig gestoppt wird) und stellt eine agent-native Ebene bereit: data-pura-marquee-*-Attribute spiegeln den Live-Zustand, und jede Instanz registriert sich unter dem Schlüssel data-pura-id in window.__puraMarquees, sodass Agenten jedes Marquee aufzählen, auslesen und steuern können, ohne das DOM zu durchsuchen.",
   "attributes": [
    {
     "desc": "Sekunden für eine vollständige Schleife. Niedriger = schneller."
    },
    {
     "desc": "Richtung, in die der Inhalt scrollt."
    },
    {
     "desc": "Falls vorhanden, pausiert die Animation, solange sich der Mauszeiger darüber befindet oder interner Fokus vorliegt."
    },
    {
     "desc": "Reflektierter Zustand; vorhanden, wenn die Animation gestoppt ist."
    },
    {
     "desc": "aria-label-Text, der auf den Container mit role=marquee angewendet wird."
    }
   ],
   "demoHTML": "<div style=\"max-width:640px;border:1px solid var(--pura-border,#e2e2e2);border-radius:8px;padding:12px\">\n  <pura-marquee id=\"m1\" speed=\"18\" pause-on-hover label=\"Partner\">\n    <strong>Acme</strong>\n    <strong>Globex</strong>\n    <strong>Initech</strong>\n    <strong>Umbrella</strong>\n    <strong>Soylent</strong>\n    <strong>Stark Industries</strong>\n  </pura-marquee>\n  <button id=\"toggle\" type=\"button\" style=\"margin-top:12px\">Pausieren / Fortsetzen</button>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/marquee.js\";\n  document.getElementById(\"toggle\").addEventListener(\"click\", () => {\n    document.getElementById(\"m1\").toggle();\n  });\n</script>"
  },
  "it": {
   "description": "pura-marquee scorre orizzontalmente il contenuto dello slot predefinito in un ciclo continuo, clonando i figli in uno specchio aria-hidden affinché la giunzione resti invisibile. Usalo per loghi di partner, annunci scorrevoli o contenuti in evidenza. Rispetta prefers-reduced-motion (arrestando completamente l'animazione) ed espone uno strato agent-native: gli attributi data-pura-marquee-* rispecchiano lo stato in tempo reale e ogni istanza si registra in window.__puraMarquees con la chiave data-pura-id, consentendo agli agenti di enumerare, leggere e controllare ciascun marquee senza scandagliare il DOM.",
   "attributes": [
    {
     "desc": "Secondi per un ciclo completo. Più basso = più veloce."
    },
    {
     "desc": "Direzione in cui scorre il contenuto."
    },
    {
     "desc": "Quando presente, mette in pausa mentre il cursore è sopra l'elemento o c'è il focus interno."
    },
    {
     "desc": "Stato riflesso; presente quando l'animazione è ferma."
    },
    {
     "desc": "Testo aria-label applicato al contenitore con role=marquee."
    }
   ],
   "demoHTML": "<div style=\"max-width:640px;border:1px solid var(--pura-border,#e2e2e2);border-radius:8px;padding:12px\">\n  <pura-marquee id=\"m1\" speed=\"18\" pause-on-hover label=\"Partner\">\n    <strong>Acme</strong>\n    <strong>Globex</strong>\n    <strong>Initech</strong>\n    <strong>Umbrella</strong>\n    <strong>Soylent</strong>\n    <strong>Stark Industries</strong>\n  </pura-marquee>\n  <button id=\"toggle\" type=\"button\" style=\"margin-top:12px\">Pausa / Riprendi</button>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/marquee.js\";\n  document.getElementById(\"toggle\").addEventListener(\"click\", () => {\n    document.getElementById(\"m1\").toggle();\n  });\n</script>"
  }
 },
 "meter": {
  "pt-BR": {
   "description": "Meter exibe uma medição escalar dentro de um intervalo (como o <meter> nativo, porém com tema), colorindo a barra como sucesso, alerta ou perigo de acordo com os limiares low/high/optimum, seguindo o algoritmo do WHATWG. Use-o para mostrar uso de disco, bateria, uma pontuação ou qualquer quantidade com um intervalo \"bom\" e \"ruim\", em vez do progresso de uma tarefa. É agent-native: além de role=\"meter\" e atributos ARIA, espelha o estado ao vivo em atributos data-pura-meter-* e registra cada instância em window.__puraMeters (indexada por data-pura-id), além de expor um getter .state com o snapshot resolvido e o nível, para que um agente possa ler ou enumerar meters sem vasculhar o DOM.",
   "attributes": [
    {
     "desc": "Medição atual; limitada ao intervalo [min, max]."
    },
    {
     "desc": "Limite inferior do intervalo."
    },
    {
     "desc": "Limite superior do intervalo; elevado a min se for definido abaixo de min."
    },
    {
     "desc": "Limite superior do segmento \"baixo\"; limitado a [min, max]."
    },
    {
     "desc": "Limite inferior do segmento \"alto\"; limitado a [min, max] e ordenado (>= low)."
    },
    {
     "desc": "Ponto ótimo; decide qual segmento é sucesso, qual é alerta e qual é perigo."
    },
    {
     "desc": "Legenda descritiva (por exemplo, \"Uso de disco\"). Opcional."
    },
    {
     "desc": "Substitui o texto do valor exibido (por exemplo, \"42 GB\")."
    },
    {
     "desc": "Oculta o texto do valor, deixando apenas a barra e o rótulo."
    }
   ],
   "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:1.25rem;max-width:24rem\">\n  <pura-meter label=\"Uso do disco\" value=\"42\" min=\"0\" max=\"64\" value-text=\"42 GB\" low=\"48\" high=\"58\" optimum=\"0\"></pura-meter>\n  <pura-meter label=\"Bateria\" value=\"88\" min=\"0\" max=\"100\" value-text=\"88%\" low=\"20\" high=\"80\" optimum=\"100\"></pura-meter>\n  <pura-meter label=\"Temperatura da CPU\" value=\"76\" min=\"30\" max=\"95\" value-text=\"76 graus C\" low=\"60\" high=\"80\" optimum=\"40\"></pura-meter>\n</div>"
  },
  "fr": {
   "description": "Meter affiche une mesure scalaire dans une plage (comme le <meter> natif, mais avec un thème), en colorant la barre comme succès, avertissement ou danger selon les seuils low/high/optimum, conformément à l'algorithme du WHATWG. Utilisez-le pour afficher l'utilisation du disque, la batterie, un score ou toute quantité ayant une plage « bonne » et « mauvaise », plutôt que la progression d'une tâche. Il est agent-native : au-delà de role=\"meter\" et des attributs ARIA, il reflète l'état en direct dans les attributs data-pura-meter-* et enregistre chaque instance dans window.__puraMeters (indexée par data-pura-id), tout en exposant un getter .state avec l'instantané résolu et le niveau, afin qu'un agent puisse lire ou énumérer les meters sans fouiller le DOM.",
   "attributes": [
    {
     "desc": "Mesure actuelle ; bornée à la plage [min, max]."
    },
    {
     "desc": "Borne inférieure de la plage."
    },
    {
     "desc": "Borne supérieure de la plage ; relevée à min si définie en dessous de min."
    },
    {
     "desc": "Borne supérieure du segment « bas » ; bornée à [min, max]."
    },
    {
     "desc": "Borne inférieure du segment « haut » ; bornée à [min, max] et ordonnée (>= low)."
    },
    {
     "desc": "Point optimal ; détermine quel segment est succès, lequel est avertissement et lequel est danger."
    },
    {
     "desc": "Légende descriptive (par exemple « Utilisation du disque »). Optionnelle."
    },
    {
     "desc": "Remplace la chaîne de valeur affichée (par exemple « 42 Go »)."
    },
    {
     "desc": "Masque le texte de la valeur, ne laissant que la barre et l'étiquette."
    }
   ],
   "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:1.25rem;max-width:24rem\">\n  <pura-meter label=\"Utilisation du disque\" value=\"42\" min=\"0\" max=\"64\" value-text=\"42 Go\" low=\"48\" high=\"58\" optimum=\"0\"></pura-meter>\n  <pura-meter label=\"Batterie\" value=\"88\" min=\"0\" max=\"100\" value-text=\"88%\" low=\"20\" high=\"80\" optimum=\"100\"></pura-meter>\n  <pura-meter label=\"Température du processeur\" value=\"76\" min=\"30\" max=\"95\" value-text=\"76 degrés C\" low=\"60\" high=\"80\" optimum=\"40\"></pura-meter>\n</div>"
  },
  "de": {
   "description": "Meter zeigt eine skalare Messung innerhalb eines Bereichs an (wie das native <meter>, jedoch mit Theme) und färbt die Leiste gemäß den low/high/optimum-Schwellenwerten nach dem WHATWG-Algorithmus als Erfolg, Warnung oder Gefahr. Verwenden Sie es, um Festplattenbelegung, Akkustand, einen Wert oder jede Größe mit einem \"guten\" und \"schlechten\" Bereich anzuzeigen, statt des Fortschritts einer Aufgabe. Es ist agent-native: neben role=\"meter\" und ARIA-Attributen spiegelt es den Live-Zustand in data-pura-meter-*-Attributen wider und registriert jede Instanz in window.__puraMeters (indiziert nach data-pura-id); zudem stellt es einen .state-Getter mit dem aufgelösten Snapshot und der Stufe bereit, sodass ein Agent Meter auslesen oder aufzählen kann, ohne das DOM zu durchforsten.",
   "attributes": [
    {
     "desc": "Aktuelle Messung; auf den Bereich [min, max] begrenzt."
    },
    {
     "desc": "Untere Grenze des Bereichs."
    },
    {
     "desc": "Obere Grenze des Bereichs; wird auf min angehoben, wenn sie niedriger als min angegeben wird."
    },
    {
     "desc": "Obere Grenze des \"niedrigen\" Segments; auf [min, max] begrenzt."
    },
    {
     "desc": "Untere Grenze des \"hohen\" Segments; auf [min, max] begrenzt und geordnet (>= low)."
    },
    {
     "desc": "Optimalpunkt; entscheidet, welches Segment Erfolg, welches Warnung und welches Gefahr ist."
    },
    {
     "desc": "Beschreibende Beschriftung (z. B. \"Festplattenbelegung\"). Optional."
    },
    {
     "desc": "Überschreibt die angezeigte Wertzeichenfolge (z. B. \"42 GB\")."
    },
    {
     "desc": "Blendet den Werttext aus, sodass nur die Leiste und die Beschriftung übrig bleiben."
    }
   ],
   "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:1.25rem;max-width:24rem\">\n  <pura-meter label=\"Speicherbelegung\" value=\"42\" min=\"0\" max=\"64\" value-text=\"42 GB\" low=\"48\" high=\"58\" optimum=\"0\"></pura-meter>\n  <pura-meter label=\"Akku\" value=\"88\" min=\"0\" max=\"100\" value-text=\"88%\" low=\"20\" high=\"80\" optimum=\"100\"></pura-meter>\n  <pura-meter label=\"CPU-Temperatur\" value=\"76\" min=\"30\" max=\"95\" value-text=\"76 Grad C\" low=\"60\" high=\"80\" optimum=\"40\"></pura-meter>\n</div>"
  },
  "it": {
   "description": "Meter mostra una misurazione scalare entro un intervallo (come il <meter> nativo, ma con tema), colorando la barra come successo, avviso o pericolo in base alle soglie low/high/optimum, seguendo l'algoritmo del WHATWG. Usalo per mostrare l'uso del disco, la batteria, un punteggio o qualsiasi grandezza con un intervallo \"buono\" e \"cattivo\", anziché l'avanzamento di un'attività. È agent-native: oltre a role=\"meter\" e agli attributi ARIA, rispecchia lo stato in tempo reale negli attributi data-pura-meter-* e registra ogni istanza in window.__puraMeters (indicizzata per data-pura-id), oltre a esporre un getter .state con lo snapshot risolto e il livello, così che un agente possa leggere o enumerare i meter senza frugare nel DOM.",
   "attributes": [
    {
     "desc": "Misurazione corrente; limitata all'intervallo [min, max]."
    },
    {
     "desc": "Limite inferiore dell'intervallo."
    },
    {
     "desc": "Limite superiore dell'intervallo; portato a min se impostato al di sotto di min."
    },
    {
     "desc": "Limite superiore del segmento \"basso\"; limitato a [min, max]."
    },
    {
     "desc": "Limite inferiore del segmento \"alto\"; limitato a [min, max] e ordinato (>= low)."
    },
    {
     "desc": "Punto ottimale; determina quale segmento è successo, quale avviso e quale pericolo."
    },
    {
     "desc": "Didascalia descrittiva (ad esempio, \"Uso del disco\"). Opzionale."
    },
    {
     "desc": "Sovrascrive la stringa del valore visualizzato (ad esempio, \"42 GB\")."
    },
    {
     "desc": "Nasconde il testo del valore, lasciando solo la barra e l'etichetta."
    }
   ],
   "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:1.25rem;max-width:24rem\">\n  <pura-meter label=\"Utilizzo del disco\" value=\"42\" min=\"0\" max=\"64\" value-text=\"42 GB\" low=\"48\" high=\"58\" optimum=\"0\"></pura-meter>\n  <pura-meter label=\"Batteria\" value=\"88\" min=\"0\" max=\"100\" value-text=\"88%\" low=\"20\" high=\"80\" optimum=\"100\"></pura-meter>\n  <pura-meter label=\"Temperatura della CPU\" value=\"76\" min=\"30\" max=\"95\" value-text=\"76 gradi C\" low=\"60\" high=\"80\" optimum=\"40\"></pura-meter>\n</div>"
  }
 },
 "notification-item": {
  "pt-BR": {
   "description": "`pura-notification-item` renderiza uma única linha de notificação em um layout flex: ícone à esquerda, título sobre a descrição no centro e horário com um botão de dispensa à direita, marcando um ponto de \"não lido\" quando o atributo `unread` está presente. Use-o dentro de um painel ou lista de notificações. A camada agent-native espelha o estado ao vivo em atributos `data-pura-notification-*` no host e registra cada instância em `window.__puraNotificationItems` (indexada por `data-pura-id`), permitindo que agentes enumerem, leiam e controlem as linhas via `markRead()`, `markUnread()` e `dismiss()` sem entrar no Shadow DOM.",
   "attributes": [
    {
     "desc": "Texto em negrito para o título da linha. Quando omitido, a linha de título fica oculta."
    },
    {
     "desc": "Horário curto ou relativo exibido à direita (por exemplo, \"há 2 min\"). Espelhado no atributo datetime do <time>."
    },
    {
     "desc": "Mostra o ponto de não lido e aplica um estilo enfatizado ao título."
    },
    {
     "desc": "Renderiza o botão de dispensa (×) à direita."
    },
    {
     "desc": "Rótulo acessível (aria-label) para o botão de dispensa."
    }
   ],
   "demoHTML": "<div role=\"list\" style=\"max-width:420px;border:1px solid var(--pura-border,#e5e5e5);border-radius:8px;overflow:hidden\">\n  <pura-notification-item id=\"notif1\" title=\"Novo comentário\" time=\"há 2 min\" unread dismissible>\n    <span slot=\"icon\">💬</span>\n    Ana respondeu na sua tarefa \"Revisar proposta\".\n  </pura-notification-item>\n  <pura-notification-item title=\"Pagamento confirmado\" time=\"há 1 h\" dismissible>\n    <span slot=\"icon\">✅</span>\n    Recebemos o pagamento da fatura de maio.\n  </pura-notification-item>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/notification-item.js\";\n  const n = document.getElementById(\"notif1\");\n  n.addEventListener(\"click\", () => n.markRead());\n  n.addEventListener(\"read\", (e) => console.log(\"read:\", e.detail.id));\n  n.addEventListener(\"dismiss\", (e) => console.log(\"dismissed:\", e.detail.id));\n</script>"
  },
  "fr": {
   "description": "`pura-notification-item` affiche une seule ligne de notification dans une disposition flex : icône à gauche, titre au-dessus de la description au centre, et heure avec un bouton de fermeture à droite, marquant un point « non lu » lorsque l'attribut `unread` est présent. Utilisez-le à l'intérieur d'un panneau ou d'une liste de notifications. La couche agent-native reflète l'état en direct dans les attributs `data-pura-notification-*` sur l'hôte et enregistre chaque instance dans `window.__puraNotificationItems` (indexée par `data-pura-id`), ce qui permet aux agents d'énumérer, de lire et de piloter les lignes via `markRead()`, `markUnread()` et `dismiss()` sans entrer dans le Shadow DOM.",
   "attributes": [
    {
     "desc": "Texte en gras pour le titre de la ligne. Lorsqu'il est omis, la ligne de titre est masquée."
    },
    {
     "desc": "Heure courte ou relative affichée à droite (par exemple « il y a 2 min »). Reflétée dans l'attribut datetime de <time>."
    },
    {
     "desc": "Affiche le point « non lu » et applique un style accentué au titre."
    },
    {
     "desc": "Affiche le bouton de fermeture (×) à droite."
    },
    {
     "desc": "Étiquette accessible (aria-label) pour le bouton de fermeture."
    }
   ],
   "demoHTML": "<div role=\"list\" style=\"max-width:420px;border:1px solid var(--pura-border,#e5e5e5);border-radius:8px;overflow:hidden\">\n  <pura-notification-item id=\"notif1\" title=\"Nouveau commentaire\" time=\"il y a 2 min\" unread dismissible>\n    <span slot=\"icon\">💬</span>\n    Ana a répondu à votre tâche \"Examiner la proposition\".\n  </pura-notification-item>\n  <pura-notification-item title=\"Paiement confirmé\" time=\"il y a 1 h\" dismissible>\n    <span slot=\"icon\">✅</span>\n    Nous avons reçu le paiement de la facture de mai.\n  </pura-notification-item>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/notification-item.js\";\n  const n = document.getElementById(\"notif1\");\n  n.addEventListener(\"click\", () => n.markRead());\n  n.addEventListener(\"read\", (e) => console.log(\"read:\", e.detail.id));\n  n.addEventListener(\"dismiss\", (e) => console.log(\"dismissed:\", e.detail.id));\n</script>"
  },
  "de": {
   "description": "`pura-notification-item` rendert eine einzelne Benachrichtigungszeile in einem Flex-Layout: Symbol links, Titel über der Beschreibung in der Mitte und Zeit mit einer Schließen-Schaltfläche rechts; ein \"ungelesen\"-Punkt wird gesetzt, wenn das Attribut `unread` vorhanden ist. Verwenden Sie es innerhalb eines Benachrichtigungsbereichs oder einer Liste. Die agent-native Ebene spiegelt den Live-Zustand in `data-pura-notification-*`-Attributen am Host wider und registriert jede Instanz in `window.__puraNotificationItems` (indiziert nach `data-pura-id`), sodass Agenten die Zeilen über `markRead()`, `markUnread()` und `dismiss()` aufzählen, auslesen und steuern können, ohne das Shadow DOM zu betreten.",
   "attributes": [
    {
     "desc": "Fettgedruckter Text für den Zeilentitel. Wird er weggelassen, ist die Titelzeile ausgeblendet."
    },
    {
     "desc": "Kurze oder relative Zeitangabe rechts (z. B. \"vor 2 Min.\"). Wird im datetime-Attribut des <time> gespiegelt."
    },
    {
     "desc": "Zeigt den Ungelesen-Punkt an und hebt den Titel hervor."
    },
    {
     "desc": "Rendert die Schließen-Schaltfläche (×) auf der rechten Seite."
    },
    {
     "desc": "Barrierefreie Beschriftung (aria-label) für die Schließen-Schaltfläche."
    }
   ],
   "demoHTML": "<div role=\"list\" style=\"max-width:420px;border:1px solid var(--pura-border,#e5e5e5);border-radius:8px;overflow:hidden\">\n  <pura-notification-item id=\"notif1\" title=\"Neuer Kommentar\" time=\"vor 2 Min.\" unread dismissible>\n    <span slot=\"icon\">💬</span>\n    Ana hat auf Ihre Aufgabe \"Vorschlag prüfen\" geantwortet.\n  </pura-notification-item>\n  <pura-notification-item title=\"Zahlung bestätigt\" time=\"vor 1 Std.\" dismissible>\n    <span slot=\"icon\">✅</span>\n    Wir haben die Zahlung für die Mai-Rechnung erhalten.\n  </pura-notification-item>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/notification-item.js\";\n  const n = document.getElementById(\"notif1\");\n  n.addEventListener(\"click\", () => n.markRead());\n  n.addEventListener(\"read\", (e) => console.log(\"read:\", e.detail.id));\n  n.addEventListener(\"dismiss\", (e) => console.log(\"dismissed:\", e.detail.id));\n</script>"
  },
  "it": {
   "description": "`pura-notification-item` visualizza una singola riga di notifica in un layout flex: icona a sinistra, titolo sopra la descrizione al centro e ora con un pulsante di chiusura a destra, contrassegnando un punto \"non letto\" quando è presente l'attributo `unread`. Usalo all'interno di un pannello o di un elenco di notifiche. Lo strato agent-native rispecchia lo stato in tempo reale negli attributi `data-pura-notification-*` sull'host e registra ogni istanza in `window.__puraNotificationItems` (indicizzata per `data-pura-id`), consentendo agli agenti di enumerare, leggere e gestire le righe tramite `markRead()`, `markUnread()` e `dismiss()` senza entrare nello Shadow DOM.",
   "attributes": [
    {
     "desc": "Testo in grassetto per il titolo della riga. Se omesso, la riga del titolo viene nascosta."
    },
    {
     "desc": "Ora breve o relativa mostrata a destra (ad esempio, \"2 min fa\"). Rispecchiata nell'attributo datetime di <time>."
    },
    {
     "desc": "Mostra il punto di non letto e applica uno stile enfatizzato al titolo."
    },
    {
     "desc": "Visualizza il pulsante di chiusura (×) a destra."
    },
    {
     "desc": "Etichetta accessibile (aria-label) per il pulsante di chiusura."
    }
   ],
   "demoHTML": "<div role=\"list\" style=\"max-width:420px;border:1px solid var(--pura-border,#e5e5e5);border-radius:8px;overflow:hidden\">\n  <pura-notification-item id=\"notif1\" title=\"Nuovo commento\" time=\"2 min fa\" unread dismissible>\n    <span slot=\"icon\">💬</span>\n    Ana ha risposto alla tua attività \"Rivedi proposta\".\n  </pura-notification-item>\n  <pura-notification-item title=\"Pagamento confermato\" time=\"1 h fa\" dismissible>\n    <span slot=\"icon\">✅</span>\n    Abbiamo ricevuto il pagamento della fattura di maggio.\n  </pura-notification-item>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/notification-item.js\";\n  const n = document.getElementById(\"notif1\");\n  n.addEventListener(\"click\", () => n.markRead());\n  n.addEventListener(\"read\", (e) => console.log(\"read:\", e.detail.id));\n  n.addEventListener(\"dismiss\", (e) => console.log(\"dismissed:\", e.detail.id));\n</script>"
  }
 },
 "presence": {
  "pt-BR": {
   "description": "Presence empilha avatares sobrepostos (`<pura-avatar>`), deriva quantas pessoas estão online a partir do `status` de cada um e exibe um pulso ao vivo sutil. Use-o para indicar quem está presente em um documento, sala ou colaboração; quando o número de avatares excede `max`, o excedente se condensa em uma bolha \"+N\" que abre um popover com a lista restante. É agent-native: expõe `role=\"group\"`, uma região de contagem com `aria-live`, atributos `data-*` estáveis (`data-total`, `data-online`, `data-overflow`) no host e no grupo interno, além de um registro global em `window.__puraPresence` por id de instância para leitura por agentes.",
   "attributes": [
    {
     "desc": "Número máximo de avatares mostrados antes de se condensar em uma bolha \"+N\". 0, ausente ou não positivo mostra todos. Ao condensar, reserva um espaço para a bolha."
    },
    {
     "desc": "Repassado para cada <pura-avatar> filho e ajusta a sobreposição da pilha (sm mais justo, lg mais espaçado)."
    },
    {
     "desc": "Nome acessível (aria-label) da pilha de presença."
    }
   ],
   "demoHTML": "<pura-presence max=\"4\" size=\"md\" label=\"Pessoas no documento\">\n  <pura-avatar initials=\"AS\" status=\"online\"></pura-avatar>\n  <pura-avatar initials=\"BL\" status=\"online\"></pura-avatar>\n  <pura-avatar initials=\"CR\" status=\"busy\"></pura-avatar>\n  <pura-avatar initials=\"DM\" status=\"online\"></pura-avatar>\n  <pura-avatar initials=\"EF\" status=\"offline\"></pura-avatar>\n  <pura-avatar initials=\"GP\" status=\"online\"></pura-avatar>\n</pura-presence>"
  },
  "fr": {
   "description": "Presence empile des avatars superposés (`<pura-avatar>`), déduit le nombre de personnes en ligne à partir du `status` de chacun et affiche une légère pulsation en direct. Utilisez-le pour indiquer qui est présent dans un document, une salle ou une collaboration ; lorsque le nombre d'avatars dépasse `max`, l'excédent se réduit en une bulle « +N » qui ouvre une popover avec la liste restante. Il est agent-native : il expose `role=\"group\"`, une région de comptage avec `aria-live`, des attributs `data-*` stables (`data-total`, `data-online`, `data-overflow`) sur l'hôte et le groupe interne, ainsi qu'un registre global dans `window.__puraPresence` par id d'instance pour la lecture par les agents.",
   "attributes": [
    {
     "desc": "Nombre maximal d'avatars affichés avant de se réduire en une bulle « +N ». 0, absent ou non positif affiche tout. Lors de la réduction, il réserve un emplacement pour la bulle."
    },
    {
     "desc": "Transmis à chaque <pura-avatar> enfant et ajuste le chevauchement de la pile (sm plus serré, lg plus large)."
    },
    {
     "desc": "Nom accessible (aria-label) de la pile de présence."
    }
   ],
   "demoHTML": "<pura-presence max=\"4\" size=\"md\" label=\"Personnes dans le document\">\n  <pura-avatar initials=\"AS\" status=\"online\"></pura-avatar>\n  <pura-avatar initials=\"BL\" status=\"online\"></pura-avatar>\n  <pura-avatar initials=\"CR\" status=\"busy\"></pura-avatar>\n  <pura-avatar initials=\"DM\" status=\"online\"></pura-avatar>\n  <pura-avatar initials=\"EF\" status=\"offline\"></pura-avatar>\n  <pura-avatar initials=\"GP\" status=\"online\"></pura-avatar>\n</pura-presence>"
  },
  "de": {
   "description": "Presence stapelt überlappende Avatare (`<pura-avatar>`), leitet aus dem `status` jedes einzelnen ab, wie viele Personen online sind, und zeigt ein dezentes Live-Pulsieren. Verwenden Sie es, um anzuzeigen, wer in einem Dokument, Raum oder einer Zusammenarbeit anwesend ist; wenn die Anzahl der Avatare `max` überschreitet, wird der Überlauf zu einer \"+N\"-Blase zusammengefasst, die ein Popover mit der restlichen Liste öffnet. Es ist agent-native: es stellt `role=\"group\"`, einen Zählbereich mit `aria-live`, stabile `data-*`-Attribute (`data-total`, `data-online`, `data-overflow`) am Host und an der inneren Gruppe sowie ein globales Register in `window.__puraPresence` nach Instanz-id für das Auslesen durch Agenten bereit.",
   "attributes": [
    {
     "desc": "Maximale Anzahl angezeigter Avatare, bevor sie zu einer \"+N\"-Blase zusammengefasst werden. 0, fehlend oder nicht positiv zeigt alle an. Beim Zusammenfassen wird ein Platz für die Blase reserviert."
    },
    {
     "desc": "Wird an jeden untergeordneten <pura-avatar> weitergegeben und passt die Überlappung des Stapels an (sm enger, lg breiter)."
    },
    {
     "desc": "Barrierefreier Name (aria-label) des Präsenz-Stapels."
    }
   ],
   "demoHTML": "<pura-presence max=\"4\" size=\"md\" label=\"Personen im Dokument\">\n  <pura-avatar initials=\"AS\" status=\"online\"></pura-avatar>\n  <pura-avatar initials=\"BL\" status=\"online\"></pura-avatar>\n  <pura-avatar initials=\"CR\" status=\"busy\"></pura-avatar>\n  <pura-avatar initials=\"DM\" status=\"online\"></pura-avatar>\n  <pura-avatar initials=\"EF\" status=\"offline\"></pura-avatar>\n  <pura-avatar initials=\"GP\" status=\"online\"></pura-avatar>\n</pura-presence>"
  },
  "it": {
   "description": "Presence impila avatar sovrapposti (`<pura-avatar>`), ricava quante persone sono online dallo `status` di ciascuno e mostra un sottile pulsare in tempo reale. Usalo per indicare chi è presente in un documento, una stanza o una collaborazione; quando il numero di avatar supera `max`, l'eccesso si condensa in una bolla \"+N\" che apre un popover con l'elenco rimanente. È agent-native: espone `role=\"group\"`, una regione di conteggio con `aria-live`, attributi `data-*` stabili (`data-total`, `data-online`, `data-overflow`) sull'host e sul gruppo interno, oltre a un registro globale in `window.__puraPresence` per id di istanza per la lettura da parte degli agenti.",
   "attributes": [
    {
     "desc": "Numero massimo di avatar mostrati prima di condensarsi in una bolla \"+N\". 0, assente o non positivo mostra tutti. Durante la condensazione, riserva uno spazio per la bolla."
    },
    {
     "desc": "Trasmesso a ciascun <pura-avatar> figlio e regola la sovrapposizione della pila (sm più stretta, lg più ampia)."
    },
    {
     "desc": "Nome accessibile (aria-label) della pila di presenza."
    }
   ],
   "demoHTML": "<pura-presence max=\"4\" size=\"md\" label=\"Persone nel documento\">\n  <pura-avatar initials=\"AS\" status=\"online\"></pura-avatar>\n  <pura-avatar initials=\"BL\" status=\"online\"></pura-avatar>\n  <pura-avatar initials=\"CR\" status=\"busy\"></pura-avatar>\n  <pura-avatar initials=\"DM\" status=\"online\"></pura-avatar>\n  <pura-avatar initials=\"EF\" status=\"offline\"></pura-avatar>\n  <pura-avatar initials=\"GP\" status=\"online\"></pura-avatar>\n</pura-presence>"
  }
 },
 "progress": {
  "pt-BR": {
   "description": "Progress é um web component nativo que exibe uma barra de progresso horizontal. Use o atributo `value` (0 a 100) para mostrar progresso determinado, ou adicione `indeterminate` para um estado animado quando a duração é desconhecida. Ideal para uploads, carregamento e etapas de fluxo de trabalho.",
   "attributes": [
    {
     "desc": "Progresso atual de 0 a 100; valores fora do intervalo são limitados."
    },
    {
     "desc": "Quando presente, exibe uma animação de progresso indefinido e ignora value."
    }
   ],
   "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:1rem;max-width:24rem\">\n  <div>\n    <p style=\"margin:0 0 .5rem\">Enviando arquivo (65%)</p>\n    <pura-progress value=\"65\"></pura-progress>\n  </div>\n  <div>\n    <p style=\"margin:0 0 .5rem\">Processando...</p>\n    <pura-progress indeterminate></pura-progress>\n  </div>\n</div>"
  },
  "fr": {
   "description": "Progress est un web component natif qui affiche une barre de progression horizontale. Utilisez l'attribut `value` (0 à 100) pour afficher une progression déterminée, ou ajoutez `indeterminate` pour un état animé lorsque la durée est inconnue. Idéal pour les téléversements, le chargement et les étapes de flux de travail.",
   "attributes": [
    {
     "desc": "Progression actuelle de 0 à 100 ; les valeurs hors plage sont bornées."
    },
    {
     "desc": "Lorsqu'il est présent, affiche une animation de progression indéfinie et ignore value."
    }
   ],
   "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:1rem;max-width:24rem\">\n  <div>\n    <p style=\"margin:0 0 .5rem\">Envoi du fichier (65%)</p>\n    <pura-progress value=\"65\"></pura-progress>\n  </div>\n  <div>\n    <p style=\"margin:0 0 .5rem\">Traitement...</p>\n    <pura-progress indeterminate></pura-progress>\n  </div>\n</div>"
  },
  "de": {
   "description": "Progress ist ein natives Web Component, das einen horizontalen Fortschrittsbalken anzeigt. Verwenden Sie das Attribut `value` (0 bis 100), um einen bestimmten Fortschritt anzuzeigen, oder fügen Sie `indeterminate` für einen animierten Zustand hinzu, wenn die Dauer unbekannt ist. Ideal für Uploads, Ladevorgänge und Workflow-Schritte.",
   "attributes": [
    {
     "desc": "Aktueller Fortschritt von 0 bis 100; Werte außerhalb des Bereichs werden begrenzt."
    },
    {
     "desc": "Falls vorhanden, zeigt es eine Animation für unbestimmten Fortschritt an und ignoriert value."
    }
   ],
   "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:1rem;max-width:24rem\">\n  <div>\n    <p style=\"margin:0 0 .5rem\">Datei wird hochgeladen (65%)</p>\n    <pura-progress value=\"65\"></pura-progress>\n  </div>\n  <div>\n    <p style=\"margin:0 0 .5rem\">Wird verarbeitet...</p>\n    <pura-progress indeterminate></pura-progress>\n  </div>\n</div>"
  },
  "it": {
   "description": "Progress è un web component nativo che mostra una barra di avanzamento orizzontale. Usa l'attributo `value` (da 0 a 100) per mostrare un avanzamento determinato, oppure aggiungi `indeterminate` per uno stato animato quando la durata è sconosciuta. Ideale per upload, caricamento e fasi di un flusso di lavoro.",
   "attributes": [
    {
     "desc": "Avanzamento corrente da 0 a 100; i valori fuori intervallo vengono limitati."
    },
    {
     "desc": "Quando presente, mostra un'animazione di avanzamento indefinito e ignora value."
    }
   ],
   "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:1rem;max-width:24rem\">\n  <div>\n    <p style=\"margin:0 0 .5rem\">Caricamento del file (65%)</p>\n    <pura-progress value=\"65\"></pura-progress>\n  </div>\n  <div>\n    <p style=\"margin:0 0 .5rem\">Elaborazione...</p>\n    <pura-progress indeterminate></pura-progress>\n  </div>\n</div>"
  }
 },
 "progress-ring": {
  "pt-BR": {
   "description": "Indicador de progresso circular em SVG: o arco de preenchimento é controlado por stroke-dashoffset e a porcentagem aparece no centro do anel. Use-o para representar progresso determinado de 0 a 100 (uploads, etapas, métricas), ou adicione o atributo indeterminate para um spinner de progresso desconhecido. A camada agent-native expõe atributos data-pura-ring-* que espelham o estado ao vivo (value, state, size, thickness), e cada instância se registra em window.__puraProgressRings indexada por data-pura-id, permitindo que um agente enumere e leia todos os anéis sem percorrer o DOM.",
   "attributes": [
    {
     "desc": "Progresso de 0 a 100 (limitado). Ignorado quando indeterminate."
    },
    {
     "desc": "Diâmetro do anel em px. Um número simples ou um valor em px."
    },
    {
     "desc": "Largura do traço em px, limitada a metade do size."
    },
    {
     "desc": "Gira continuamente e oculta o rótulo de porcentagem (progresso desconhecido)."
    },
    {
     "desc": "Substitui o nome acessível (aria-label)."
    }
   ],
   "demoHTML": "<div style=\"display:flex;gap:24px;align-items:center;flex-wrap:wrap\">\n  <pura-progress-ring id=\"upload\" value=\"35\" size=\"96\" thickness=\"8\" label=\"Progresso do upload\"></pura-progress-ring>\n  <pura-progress-ring indeterminate size=\"96\" thickness=\"8\" label=\"Carregando\"></pura-progress-ring>\n  <button id=\"avancar\" type=\"button\">Avançar 10%</button>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/progress-ring.js\";\n  const ring = document.getElementById(\"upload\");\n  document.getElementById(\"avancar\").addEventListener(\"click\", () => {\n    ring.value = Math.min(100, ring.value + 10);\n  });\n</script>"
  },
  "fr": {
   "description": "Indicateur de progression circulaire en SVG : l'arc de remplissage est contrôlé par stroke-dashoffset et le pourcentage apparaît au centre de l'anneau. Utilisez-le pour représenter une progression déterminée de 0 à 100 (téléversements, étapes, métriques), ou ajoutez l'attribut indeterminate pour un spinner de progression inconnue. La couche agent-native expose des attributs data-pura-ring-* qui reflètent l'état en direct (value, state, size, thickness), et chaque instance s'enregistre dans window.__puraProgressRings indexée par data-pura-id, ce qui permet à un agent d'énumérer et de lire tous les anneaux sans parcourir le DOM.",
   "attributes": [
    {
     "desc": "Progression de 0 à 100 (bornée). Ignorée lorsque indeterminate."
    },
    {
     "desc": "Diamètre de l'anneau en px. Un simple nombre ou une valeur en px."
    },
    {
     "desc": "Épaisseur du trait en px, plafonnée à la moitié de size."
    },
    {
     "desc": "Tourne en continu et masque l'étiquette de pourcentage (progression inconnue)."
    },
    {
     "desc": "Remplace le nom accessible (aria-label)."
    }
   ],
   "demoHTML": "<div style=\"display:flex;gap:24px;align-items:center;flex-wrap:wrap\">\n  <pura-progress-ring id=\"upload\" value=\"35\" size=\"96\" thickness=\"8\" label=\"Progression de l'envoi\"></pura-progress-ring>\n  <pura-progress-ring indeterminate size=\"96\" thickness=\"8\" label=\"Chargement\"></pura-progress-ring>\n  <button id=\"avancar\" type=\"button\">Avancer de 10%</button>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/progress-ring.js\";\n  const ring = document.getElementById(\"upload\");\n  document.getElementById(\"avancar\").addEventListener(\"click\", () => {\n    ring.value = Math.min(100, ring.value + 10);\n  });\n</script>"
  },
  "de": {
   "description": "Kreisförmige Fortschrittsanzeige als SVG: der Füllbogen wird durch stroke-dashoffset gesteuert und der Prozentsatz erscheint in der Mitte des Rings. Verwenden Sie es, um einen bestimmten Fortschritt von 0 bis 100 darzustellen (Uploads, Schritte, Metriken), oder fügen Sie das Attribut indeterminate für einen Spinner mit unbekanntem Fortschritt hinzu. Die agent-native Ebene stellt data-pura-ring-*-Attribute bereit, die den Live-Zustand spiegeln (value, state, size, thickness), und jede Instanz registriert sich in window.__puraProgressRings, indiziert nach data-pura-id, sodass ein Agent alle Ringe aufzählen und auslesen kann, ohne das DOM zu durchlaufen.",
   "attributes": [
    {
     "desc": "Fortschritt von 0 bis 100 (begrenzt). Wird ignoriert, wenn indeterminate."
    },
    {
     "desc": "Ringdurchmesser in px. Eine reine Zahl oder ein px-Wert."
    },
    {
     "desc": "Strichbreite in px, begrenzt auf die Hälfte von size."
    },
    {
     "desc": "Dreht sich kontinuierlich und blendet die Prozentbeschriftung aus (unbekannter Fortschritt)."
    },
    {
     "desc": "Überschreibt den barrierefreien Namen (aria-label)."
    }
   ],
   "demoHTML": "<div style=\"display:flex;gap:24px;align-items:center;flex-wrap:wrap\">\n  <pura-progress-ring id=\"upload\" value=\"35\" size=\"96\" thickness=\"8\" label=\"Upload-Fortschritt\"></pura-progress-ring>\n  <pura-progress-ring indeterminate size=\"96\" thickness=\"8\" label=\"Wird geladen\"></pura-progress-ring>\n  <button id=\"avancar\" type=\"button\">Um 10% erhöhen</button>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/progress-ring.js\";\n  const ring = document.getElementById(\"upload\");\n  document.getElementById(\"avancar\").addEventListener(\"click\", () => {\n    ring.value = Math.min(100, ring.value + 10);\n  });\n</script>"
  },
  "it": {
   "description": "Indicatore di avanzamento circolare in SVG: l'arco di riempimento è controllato da stroke-dashoffset e la percentuale appare al centro dell'anello. Usalo per rappresentare un avanzamento determinato da 0 a 100 (upload, fasi, metriche), oppure aggiungi l'attributo indeterminate per uno spinner di avanzamento sconosciuto. Lo strato agent-native espone attributi data-pura-ring-* che rispecchiano lo stato in tempo reale (value, state, size, thickness), e ogni istanza si registra in window.__puraProgressRings indicizzata per data-pura-id, consentendo a un agente di enumerare e leggere tutti gli anelli senza attraversare il DOM.",
   "attributes": [
    {
     "desc": "Avanzamento da 0 a 100 (limitato). Ignorato quando indeterminate."
    },
    {
     "desc": "Diametro dell'anello in px. Un numero semplice o un valore in px."
    },
    {
     "desc": "Spessore del tratto in px, limitato alla metà di size."
    },
    {
     "desc": "Ruota in modo continuo e nasconde l'etichetta della percentuale (avanzamento sconosciuto)."
    },
    {
     "desc": "Sovrascrive il nome accessibile (aria-label)."
    }
   ],
   "demoHTML": "<div style=\"display:flex;gap:24px;align-items:center;flex-wrap:wrap\">\n  <pura-progress-ring id=\"upload\" value=\"35\" size=\"96\" thickness=\"8\" label=\"Avanzamento del caricamento\"></pura-progress-ring>\n  <pura-progress-ring indeterminate size=\"96\" thickness=\"8\" label=\"Caricamento\"></pura-progress-ring>\n  <button id=\"avancar\" type=\"button\">Avanza del 10%</button>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/progress-ring.js\";\n  const ring = document.getElementById(\"upload\");\n  document.getElementById(\"avancar\").addEventListener(\"click\", () => {\n    ring.value = Math.min(100, ring.value + 10);\n  });\n</script>"
  }
 },
 "reactions": {
  "pt-BR": {
   "description": "`<pura-reactions>` agrupa pills `<pura-reaction>` (botões de alternância com `aria-pressed`); clicar em uma pill ativa/desativa a reação do usuário e incrementa ou decrementa o contador, emitindo um evento `react`. Use-o para reações no estilo emoji em posts, comentários ou mensagens. É agent-native: cada barra e pill se registra em `window.__puraReactions` (indexada por `data-pura-id`) e espelha o estado nos atributos `data-pura-reaction-*` e `data-pura-reactions-count`/`data-pura-reactions-active`, permitindo que agentes enumerem, leiam e disparem reações via `toggle()`.",
   "attributes": [
    {
     "desc": "Em <pura-reactions>: rótulo acessível para o grupo (aria-label)."
    },
    {
     "desc": "Em <pura-reaction>: o glifo de emoji exibido (por exemplo, \"👍\"). Vazio se ausente."
    },
    {
     "desc": "Em <pura-reaction>: contador atual (refletido). Oculto quando zero."
    },
    {
     "desc": "Em <pura-reaction>: indica que o usuário reagiu; pill destacada com aria-pressed=true."
    },
    {
     "desc": "Em <pura-reaction>: rótulo acessível opcional para a reação (por exemplo, \"Curtir\"). Recorre ao emoji se ausente."
    },
    {
     "desc": "Em <pura-reaction>: torna a pill não interativa."
    }
   ],
   "demoHTML": "<pura-reactions label=\"Reações do post\" id=\"rx\">\n  <pura-reaction emoji=\"👍\" count=\"12\" label=\"Curtir\" active></pura-reaction>\n  <pura-reaction emoji=\"❤️\" count=\"8\" label=\"Amei\"></pura-reaction>\n  <pura-reaction emoji=\"🎉\" count=\"3\" label=\"Comemorar\"></pura-reaction>\n  <pura-reaction emoji=\"🤔\" count=\"1\" label=\"Pensando\"></pura-reaction>\n</pura-reactions>\n\n<script type=\"module\">\n  document.getElementById(\"rx\").addEventListener(\"react\", (e) => {\n    const { emoji, active, count } = e.detail;\n    console.log(`${emoji} ${active ? \"activated\" : \"deactivated\"} (total: ${count})`);\n  });\n</script>"
  },
  "fr": {
   "description": "`<pura-reactions>` regroupe des pastilles `<pura-reaction>` (boutons à bascule avec `aria-pressed`) ; cliquer sur une pastille active/désactive la réaction de l'utilisateur et incrémente ou décrémente le compteur, en émettant un événement `react`. Utilisez-le pour des réactions de type emoji sur des publications, des commentaires ou des messages. Il est agent-native : chaque barre et pastille s'enregistre dans `window.__puraReactions` (indexée par `data-pura-id`) et reflète l'état dans les attributs `data-pura-reaction-*` et `data-pura-reactions-count`/`data-pura-reactions-active`, ce qui permet aux agents d'énumérer, de lire et de déclencher des réactions via `toggle()`.",
   "attributes": [
    {
     "desc": "Sur <pura-reactions> : étiquette accessible pour le groupe (aria-label)."
    },
    {
     "desc": "Sur <pura-reaction> : le glyphe d'emoji affiché (par exemple « 👍 »). Vide si absent."
    },
    {
     "desc": "Sur <pura-reaction> : compteur actuel (reflété). Masqué lorsqu'il vaut zéro."
    },
    {
     "desc": "Sur <pura-reaction> : indique que l'utilisateur a réagi ; pastille mise en évidence avec aria-pressed=true."
    },
    {
     "desc": "Sur <pura-reaction> : étiquette accessible optionnelle pour la réaction (par exemple « J'aime »). Se rabat sur l'emoji si absente."
    },
    {
     "desc": "Sur <pura-reaction> : rend la pastille non interactive."
    }
   ],
   "demoHTML": "<pura-reactions label=\"Réactions à la publication\" id=\"rx\">\n  <pura-reaction emoji=\"👍\" count=\"12\" label=\"J'aime\" active></pura-reaction>\n  <pura-reaction emoji=\"❤️\" count=\"8\" label=\"J'adore\"></pura-reaction>\n  <pura-reaction emoji=\"🎉\" count=\"3\" label=\"Bravo\"></pura-reaction>\n  <pura-reaction emoji=\"🤔\" count=\"1\" label=\"Réflexion\"></pura-reaction>\n</pura-reactions>\n\n<script type=\"module\">\n  document.getElementById(\"rx\").addEventListener(\"react\", (e) => {\n    const { emoji, active, count } = e.detail;\n    console.log(`${emoji} ${active ? \"activated\" : \"deactivated\"} (total: ${count})`);\n  });\n</script>"
  },
  "de": {
   "description": "`<pura-reactions>` gruppiert `<pura-reaction>`-Pills (Umschalt-Schaltflächen mit `aria-pressed`); ein Klick auf eine Pill aktiviert/deaktiviert die Reaktion des Nutzers und erhöht oder verringert den Zähler, wobei ein `react`-Ereignis ausgelöst wird. Verwenden Sie es für Reaktionen im Emoji-Stil bei Beiträgen, Kommentaren oder Nachrichten. Es ist agent-native: jede Leiste und Pill registriert sich in `window.__puraReactions` (indiziert nach `data-pura-id`) und spiegelt den Zustand in den Attributen `data-pura-reaction-*` und `data-pura-reactions-count`/`data-pura-reactions-active` wider, sodass Agenten Reaktionen aufzählen, auslesen und über `toggle()` auslösen können.",
   "attributes": [
    {
     "desc": "Bei <pura-reactions>: barrierefreie Beschriftung für die Gruppe (aria-label)."
    },
    {
     "desc": "Bei <pura-reaction>: das angezeigte Emoji-Glyph (z. B. \"👍\"). Leer, falls nicht vorhanden."
    },
    {
     "desc": "Bei <pura-reaction>: aktueller Zähler (reflektiert). Bei null ausgeblendet."
    },
    {
     "desc": "Bei <pura-reaction>: zeigt an, dass der Nutzer reagiert hat; Pill hervorgehoben mit aria-pressed=true."
    },
    {
     "desc": "Bei <pura-reaction>: optionale barrierefreie Beschriftung für die Reaktion (z. B. \"Gefällt mir\"). Greift auf das Emoji zurück, falls nicht vorhanden."
    },
    {
     "desc": "Bei <pura-reaction>: macht die Pill nicht interaktiv."
    }
   ],
   "demoHTML": "<pura-reactions label=\"Reaktionen auf den Beitrag\" id=\"rx\">\n  <pura-reaction emoji=\"👍\" count=\"12\" label=\"Gefällt mir\" active></pura-reaction>\n  <pura-reaction emoji=\"❤️\" count=\"8\" label=\"Liebe\"></pura-reaction>\n  <pura-reaction emoji=\"🎉\" count=\"3\" label=\"Feiern\"></pura-reaction>\n  <pura-reaction emoji=\"🤔\" count=\"1\" label=\"Nachdenklich\"></pura-reaction>\n</pura-reactions>\n\n<script type=\"module\">\n  document.getElementById(\"rx\").addEventListener(\"react\", (e) => {\n    const { emoji, active, count } = e.detail;\n    console.log(`${emoji} ${active ? \"activated\" : \"deactivated\"} (total: ${count})`);\n  });\n</script>"
  },
  "it": {
   "description": "`<pura-reactions>` raggruppa pill `<pura-reaction>` (pulsanti di commutazione con `aria-pressed`); facendo clic su una pill si attiva/disattiva la reazione dell'utente e si incrementa o decrementa il contatore, emettendo un evento `react`. Usalo per reazioni in stile emoji su post, commenti o messaggi. È agent-native: ogni barra e pill si registra in `window.__puraReactions` (indicizzata per `data-pura-id`) e rispecchia lo stato negli attributi `data-pura-reaction-*` e `data-pura-reactions-count`/`data-pura-reactions-active`, consentendo agli agenti di enumerare, leggere e attivare reazioni tramite `toggle()`.",
   "attributes": [
    {
     "desc": "Su <pura-reactions>: etichetta accessibile per il gruppo (aria-label)."
    },
    {
     "desc": "Su <pura-reaction>: il glifo emoji visualizzato (ad esempio, \"👍\"). Vuoto se assente."
    },
    {
     "desc": "Su <pura-reaction>: contatore corrente (riflesso). Nascosto quando è zero."
    },
    {
     "desc": "Su <pura-reaction>: indica che l'utente ha reagito; pill evidenziata con aria-pressed=true."
    },
    {
     "desc": "Su <pura-reaction>: etichetta accessibile opzionale per la reazione (ad esempio, \"Mi piace\"). Ricorre all'emoji se assente."
    },
    {
     "desc": "Su <pura-reaction>: rende la pill non interattiva."
    }
   ],
   "demoHTML": "<pura-reactions label=\"Reazioni al post\" id=\"rx\">\n  <pura-reaction emoji=\"👍\" count=\"12\" label=\"Mi piace\" active></pura-reaction>\n  <pura-reaction emoji=\"❤️\" count=\"8\" label=\"Adoro\"></pura-reaction>\n  <pura-reaction emoji=\"🎉\" count=\"3\" label=\"Festeggia\"></pura-reaction>\n  <pura-reaction emoji=\"🤔\" count=\"1\" label=\"Riflessione\"></pura-reaction>\n</pura-reactions>\n\n<script type=\"module\">\n  document.getElementById(\"rx\").addEventListener(\"react\", (e) => {\n    const { emoji, active, count } = e.detail;\n    console.log(`${emoji} ${active ? \"activated\" : \"deactivated\"} (total: ${count})`);\n  });\n</script>"
  }
 },
 "separator": {
  "pt-BR": {
   "description": "O Separator é um web component nativo que renderiza uma linha divisória para separar visualmente blocos de conteúdo. Ele suporta orientação horizontal (padrão) ou vertical e um rótulo de texto centralizado opcional. Use-o para dividir seções de página, itens de lista ou para agrupar conteúdos relacionados.",
   "attributes": [
    {
     "desc": "Direção da linha: \"horizontal\" ou \"vertical\"."
    },
    {
     "desc": "Texto opcional centralizado entre duas linhas (força o layout horizontal com um rótulo)."
    }
   ],
   "demoHTML": "<div style=\"max-width: 360px;\">\n  <p>Sua conta foi criada com sucesso.</p>\n  <pura-separator></pura-separator>\n  <p>Revise suas configurações abaixo.</p>\n  <pura-separator label=\"ou continue com\"></pura-separator>\n  <div style=\"display: flex; align-items: center; gap: 12px;\">\n    <span>Perfil</span>\n    <pura-separator orientation=\"vertical\"></pura-separator>\n    <span>Segurança</span>\n    <pura-separator orientation=\"vertical\"></pura-separator>\n    <span>Notificações</span>\n  </div>\n</div>"
  },
  "fr": {
   "description": "Le Separator est un web component natif qui affiche un filet de séparation pour séparer visuellement des blocs de contenu. Il prend en charge l'orientation horizontale (par défaut) ou verticale et une étiquette de texte centrée optionnelle. Utilisez-le pour diviser des sections de page, des éléments de liste ou pour regrouper des contenus connexes.",
   "attributes": [
    {
     "desc": "Direction de la ligne : « horizontal » ou « vertical »."
    },
    {
     "desc": "Texte optionnel centré entre deux lignes (force la disposition horizontale avec une étiquette)."
    }
   ],
   "demoHTML": "<div style=\"max-width: 360px;\">\n  <p>Votre compte a été créé avec succès.</p>\n  <pura-separator></pura-separator>\n  <p>Vérifiez vos paramètres ci-dessous.</p>\n  <pura-separator label=\"ou continuer avec\"></pura-separator>\n  <div style=\"display: flex; align-items: center; gap: 12px;\">\n    <span>Profil</span>\n    <pura-separator orientation=\"vertical\"></pura-separator>\n    <span>Sécurité</span>\n    <pura-separator orientation=\"vertical\"></pura-separator>\n    <span>Notifications</span>\n  </div>\n</div>"
  },
  "de": {
   "description": "Der Separator ist ein natives Web Component, das eine Trennlinie rendert, um Inhaltsblöcke visuell zu trennen. Es unterstützt eine horizontale (Standard) oder vertikale Ausrichtung sowie eine optionale zentrierte Textbeschriftung. Verwenden Sie es, um Seitenabschnitte, Listenelemente zu trennen oder zusammengehörige Inhalte zu gruppieren.",
   "attributes": [
    {
     "desc": "Richtung der Linie: \"horizontal\" oder \"vertical\"."
    },
    {
     "desc": "Optionaler Text, zentriert zwischen zwei Linien (erzwingt das horizontale Layout mit Beschriftung)."
    }
   ],
   "demoHTML": "<div style=\"max-width: 360px;\">\n  <p>Ihr Konto wurde erfolgreich erstellt.</p>\n  <pura-separator></pura-separator>\n  <p>Überprüfen Sie unten Ihre Einstellungen.</p>\n  <pura-separator label=\"oder weiter mit\"></pura-separator>\n  <div style=\"display: flex; align-items: center; gap: 12px;\">\n    <span>Profil</span>\n    <pura-separator orientation=\"vertical\"></pura-separator>\n    <span>Sicherheit</span>\n    <pura-separator orientation=\"vertical\"></pura-separator>\n    <span>Benachrichtigungen</span>\n  </div>\n</div>"
  },
  "it": {
   "description": "Il Separator è un web component nativo che visualizza una linea di separazione per separare visivamente blocchi di contenuto. Supporta l'orientamento orizzontale (predefinito) o verticale e un'etichetta di testo centrata opzionale. Usalo per dividere sezioni di pagina, elementi di un elenco o per raggruppare contenuti correlati.",
   "attributes": [
    {
     "desc": "Direzione della linea: \"horizontal\" o \"vertical\"."
    },
    {
     "desc": "Testo opzionale centrato tra due linee (forza il layout orizzontale con un'etichetta)."
    }
   ],
   "demoHTML": "<div style=\"max-width: 360px;\">\n  <p>Il tuo account è stato creato con successo.</p>\n  <pura-separator></pura-separator>\n  <p>Rivedi le tue impostazioni qui sotto.</p>\n  <pura-separator label=\"oppure continua con\"></pura-separator>\n  <div style=\"display: flex; align-items: center; gap: 12px;\">\n    <span>Profilo</span>\n    <pura-separator orientation=\"vertical\"></pura-separator>\n    <span>Sicurezza</span>\n    <pura-separator orientation=\"vertical\"></pura-separator>\n    <span>Notifiche</span>\n  </div>\n</div>"
  }
 },
 "skeleton": {
  "pt-BR": {
   "description": "O Skeleton é um web component nativo que exibe um espaço reservado com efeito de brilho (shimmer) enquanto o conteúdo real ainda está carregando. Use-o para reservar espaço para texto, imagens ou avatares e reduzir a sensação de espera. Ele respeita prefers-reduced-motion, trocando o brilho por uma pulsação sutil.",
   "attributes": [
    {
     "desc": "Largura do espaço reservado, em qualquer unidade CSS (ex.: 200px, 60%)."
    },
    {
     "desc": "Altura do espaço reservado, em qualquer unidade CSS (ex.: 16px, 2rem)."
    },
    {
     "desc": "Renderiza o espaço reservado como um círculo (border-radius total e proporção 1:1), ideal para avatares."
    }
   ],
   "demoHTML": "<div style=\"display:flex;align-items:center;gap:16px;margin-bottom:16px\">\n  <pura-skeleton circle width=\"48px\"></pura-skeleton>\n  <div style=\"flex:1;display:flex;flex-direction:column;gap:8px\">\n    <pura-skeleton width=\"40%\"></pura-skeleton>\n    <pura-skeleton width=\"70%\"></pura-skeleton>\n  </div>\n</div>\n<pura-skeleton height=\"160px\"></pura-skeleton>"
  },
  "fr": {
   "description": "Le Skeleton est un web component natif qui affiche un espace réservé avec un effet de scintillement (shimmer) pendant que le contenu réel se charge encore. Utilisez-le pour réserver de l'espace pour du texte, des images ou des avatars et réduire l'attente perçue. Il respecte prefers-reduced-motion en remplaçant le scintillement par une légère pulsation.",
   "attributes": [
    {
     "desc": "Largeur de l'espace réservé, dans n'importe quelle unité CSS (ex. : 200px, 60%)."
    },
    {
     "desc": "Hauteur de l'espace réservé, dans n'importe quelle unité CSS (ex. : 16px, 2rem)."
    },
    {
     "desc": "Affiche l'espace réservé sous forme de cercle (border-radius complet et rapport 1:1), idéal pour les avatars."
    }
   ],
   "demoHTML": "<div style=\"display:flex;align-items:center;gap:16px;margin-bottom:16px\">\n  <pura-skeleton circle width=\"48px\"></pura-skeleton>\n  <div style=\"flex:1;display:flex;flex-direction:column;gap:8px\">\n    <pura-skeleton width=\"40%\"></pura-skeleton>\n    <pura-skeleton width=\"70%\"></pura-skeleton>\n  </div>\n</div>\n<pura-skeleton height=\"160px\"></pura-skeleton>"
  },
  "de": {
   "description": "Das Skeleton ist eine native Web Component, die einen Platzhalter mit einem Schimmereffekt anzeigt, während der eigentliche Inhalt noch lädt. Verwenden Sie es, um Platz für Text, Bilder oder Avatare zu reservieren und die gefühlte Wartezeit zu verkürzen. Es berücksichtigt prefers-reduced-motion und ersetzt den Schimmer durch ein dezentes Pulsieren.",
   "attributes": [
    {
     "desc": "Breite des Platzhalters in einer beliebigen CSS-Einheit (z. B. 200px, 60%)."
    },
    {
     "desc": "Höhe des Platzhalters in einer beliebigen CSS-Einheit (z. B. 16px, 2rem)."
    },
    {
     "desc": "Stellt den Platzhalter als Kreis dar (voller Border-Radius und Seitenverhältnis 1:1), ideal für Avatare."
    }
   ],
   "demoHTML": "<div style=\"display:flex;align-items:center;gap:16px;margin-bottom:16px\">\n  <pura-skeleton circle width=\"48px\"></pura-skeleton>\n  <div style=\"flex:1;display:flex;flex-direction:column;gap:8px\">\n    <pura-skeleton width=\"40%\"></pura-skeleton>\n    <pura-skeleton width=\"70%\"></pura-skeleton>\n  </div>\n</div>\n<pura-skeleton height=\"160px\"></pura-skeleton>"
  },
  "it": {
   "description": "Lo Skeleton è un web component nativo che mostra un segnaposto con un effetto shimmer mentre il contenuto reale è ancora in caricamento. Usalo per riservare spazio a testo, immagini o avatar e ridurre l'attesa percepita. Rispetta prefers-reduced-motion, sostituendo lo shimmer con una leggera pulsazione.",
   "attributes": [
    {
     "desc": "Larghezza del segnaposto, in qualsiasi unità CSS (es. 200px, 60%)."
    },
    {
     "desc": "Altezza del segnaposto, in qualsiasi unità CSS (es. 16px, 2rem)."
    },
    {
     "desc": "Rende il segnaposto come un cerchio (border-radius pieno e proporzione 1:1), ideale per gli avatar."
    }
   ],
   "demoHTML": "<div style=\"display:flex;align-items:center;gap:16px;margin-bottom:16px\">\n  <pura-skeleton circle width=\"48px\"></pura-skeleton>\n  <div style=\"flex:1;display:flex;flex-direction:column;gap:8px\">\n    <pura-skeleton width=\"40%\"></pura-skeleton>\n    <pura-skeleton width=\"70%\"></pura-skeleton>\n  </div>\n</div>\n<pura-skeleton height=\"160px\"></pura-skeleton>"
  }
 },
 "skeleton-text": {
  "pt-BR": {
   "description": "O Skeleton Text renderiza N linhas animadas (shimmer), com a última mais curta, para imitar um parágrafo enquanto o conteúdo real ainda está carregando. Use-o durante a busca de dados ou a hidratação para reduzir a sensação de espera. Ele define aria-busy=\"true\" no host e oculta as linhas decorativas dos leitores de tela (aria-hidden), respeitando prefers-reduced-motion ao trocar o shimmer por uma pulsação suave.",
   "attributes": [
    {
     "desc": "Número de linhas a renderizar. Limitado a um mínimo de 1; valores inválidos voltam para 3."
    },
    {
     "desc": "Comprimento CSS para o espaçamento vertical entre as linhas."
    },
    {
     "desc": "Largura CSS da última linha (mais curta), aplicada apenas quando há mais de uma linha."
    }
   ],
   "demoHTML": "<div style=\"max-width: 360px; display: flex; flex-direction: column; gap: 24px;\">\n  <pura-skeleton-text lines=\"3\"></pura-skeleton-text>\n  <pura-skeleton-text lines=\"5\" gap=\"12px\" last=\"40%\"></pura-skeleton-text>\n</div>"
  },
  "fr": {
   "description": "Le Skeleton Text affiche N lignes animées (shimmer), la dernière plus courte, pour imiter un paragraphe pendant que le contenu réel se charge encore. Utilisez-le lors de la récupération des données ou de l'hydratation pour réduire l'impression d'attente. Il définit aria-busy=\"true\" sur l'hôte et masque les lignes décoratives aux lecteurs d'écran (aria-hidden), en respectant prefers-reduced-motion par le remplacement du scintillement par une pulsation douce.",
   "attributes": [
    {
     "desc": "Nombre de lignes à afficher. Limité à un minimum de 1 ; les valeurs invalides reviennent à 3."
    },
    {
     "desc": "Longueur CSS pour l'espacement vertical entre les lignes."
    },
    {
     "desc": "Largeur CSS de la dernière ligne (plus courte), appliquée uniquement lorsqu'il y a plus d'une ligne."
    }
   ],
   "demoHTML": "<div style=\"max-width: 360px; display: flex; flex-direction: column; gap: 24px;\">\n  <pura-skeleton-text lines=\"3\"></pura-skeleton-text>\n  <pura-skeleton-text lines=\"5\" gap=\"12px\" last=\"40%\"></pura-skeleton-text>\n</div>"
  },
  "de": {
   "description": "Der Skeleton Text rendert N animierte Zeilen (Schimmer), wobei die letzte kürzer ist, um einen Absatz nachzuahmen, während der eigentliche Inhalt noch lädt. Verwenden Sie ihn während des Datenabrufs oder der Hydration, um das Gefühl des Wartens zu verringern. Er setzt aria-busy=\"true\" auf dem Host und verbirgt die dekorativen Zeilen vor Screenreadern (aria-hidden); dabei berücksichtigt er prefers-reduced-motion, indem er den Schimmer durch ein sanftes Pulsieren ersetzt.",
   "attributes": [
    {
     "desc": "Anzahl der zu rendernden Zeilen. Auf mindestens 1 begrenzt; ungültige Werte fallen auf 3 zurück."
    },
    {
     "desc": "CSS-Länge für den vertikalen Abstand zwischen den Zeilen."
    },
    {
     "desc": "CSS-Breite der letzten (kürzeren) Zeile, die nur angewendet wird, wenn es mehr als eine Zeile gibt."
    }
   ],
   "demoHTML": "<div style=\"max-width: 360px; display: flex; flex-direction: column; gap: 24px;\">\n  <pura-skeleton-text lines=\"3\"></pura-skeleton-text>\n  <pura-skeleton-text lines=\"5\" gap=\"12px\" last=\"40%\"></pura-skeleton-text>\n</div>"
  },
  "it": {
   "description": "Lo Skeleton Text esegue il rendering di N righe animate (shimmer), con l'ultima più corta, per imitare un paragrafo mentre il contenuto reale è ancora in caricamento. Usalo durante il recupero dei dati o l'hydration per ridurre la sensazione di attesa. Imposta aria-busy=\"true\" sull'host e nasconde le righe decorative agli screen reader (aria-hidden), rispettando prefers-reduced-motion sostituendo lo shimmer con una pulsazione delicata.",
   "attributes": [
    {
     "desc": "Numero di righe da renderizzare. Limitato a un minimo di 1; i valori non validi tornano a 3."
    },
    {
     "desc": "Lunghezza CSS per la spaziatura verticale tra le righe."
    },
    {
     "desc": "Larghezza CSS dell'ultima riga (più corta), applicata solo quando c'è più di una riga."
    }
   ],
   "demoHTML": "<div style=\"max-width: 360px; display: flex; flex-direction: column; gap: 24px;\">\n  <pura-skeleton-text lines=\"3\"></pura-skeleton-text>\n  <pura-skeleton-text lines=\"5\" gap=\"12px\" last=\"40%\"></pura-skeleton-text>\n</div>"
  }
 },
 "sparkline": {
  "pt-BR": {
   "description": "O `<pura-sparkline>` renderiza um SVG compacto com uma polilinha dimensionada para caber em sua caixa, com preenchimento de área opcional e um ponto no último valor. Use-o para mostrar tendências de séries temporais em pouco espaço (KPIs, linhas de tabela, dashboards). Ele é nativo para agentes: além de `role=\"img\"` com um `aria-label` gerado automaticamente (quantidade, mínimo, máximo, último), cada instância expõe atributos estáveis `data-pura-sparkline-count/values/min/max/last` e se registra em `window.__puraSparklines` (indexado por `data-pura-id`), permitindo que um agente enumere e leia os dados de cada gráfico na página sem fazer parsing do SVG.",
   "attributes": [
    {
     "desc": "Números separados por vírgula, ex.: \"3,7,4,9,5,8\". Espaços são tolerados e entradas não numéricas são descartadas; valores vazios/inválidos não desenham nada."
    },
    {
     "desc": "Largura do gráfico em px. Aceita um número simples."
    },
    {
     "desc": "Altura do gráfico em px. Aceita um número simples."
    },
    {
     "desc": "Cor da linha, do ponto e do preenchimento. Qualquer cor CSS."
    },
    {
     "desc": "Desenha uma área translúcida sob a linha (apenas com mais de um valor)."
    },
    {
     "desc": "Desenha um ponto no último valor da série."
    }
   ],
   "demoHTML": "<div style=\"display:flex;align-items:center;gap:12px;font-family:system-ui\">\n  <span>Receita (7 dias)</span>\n  <pura-sparkline values=\"4,7,5,9,6,11,13\" width=\"120\" height=\"32\" color=\"#16a34a\" fill dot></pura-sparkline>\n  <strong>$13k</strong>\n</div>"
  },
  "fr": {
   "description": "Le `<pura-sparkline>` affiche un SVG compact avec une polyligne mise à l'échelle pour tenir dans sa boîte, avec un remplissage de zone optionnel et un point sur la dernière valeur. Utilisez-le pour montrer des tendances de séries temporelles dans peu d'espace (KPI, lignes de tableau, tableaux de bord). Il est agent-native : en plus de `role=\"img\"` avec un `aria-label` généré automatiquement (nombre, min, max, dernier), chaque instance expose des attributs stables `data-pura-sparkline-count/values/min/max/last` et s'enregistre dans `window.__puraSparklines` (indexé par `data-pura-id`), ce qui permet à un agent d'énumérer et de lire les données de chaque graphique de la page sans analyser le SVG.",
   "attributes": [
    {
     "desc": "Nombres séparés par des virgules, ex. : \"3,7,4,9,5,8\". Les espaces sont tolérés et les entrées non numériques sont ignorées ; les valeurs vides/invalides ne dessinent rien."
    },
    {
     "desc": "Largeur du graphique en px. Accepte un simple nombre."
    },
    {
     "desc": "Hauteur du graphique en px. Accepte un simple nombre."
    },
    {
     "desc": "Couleur de la ligne, du point et du remplissage. N'importe quelle couleur CSS."
    },
    {
     "desc": "Dessine une zone translucide sous la ligne (uniquement avec plus d'une valeur)."
    },
    {
     "desc": "Dessine un point sur la dernière valeur de la série."
    }
   ],
   "demoHTML": "<div style=\"display:flex;align-items:center;gap:12px;font-family:system-ui\">\n  <span>Revenu (7 jours)</span>\n  <pura-sparkline values=\"4,7,5,9,6,11,13\" width=\"120\" height=\"32\" color=\"#16a34a\" fill dot></pura-sparkline>\n  <strong>$13k</strong>\n</div>"
  },
  "de": {
   "description": "Das `<pura-sparkline>` rendert ein kompaktes SVG mit einer Polylinie, die so skaliert ist, dass sie in ihren Rahmen passt, mit optionaler Flächenfüllung und einem Punkt auf dem letzten Wert. Verwenden Sie es, um Zeitreihentrends auf wenig Raum darzustellen (KPIs, Tabellenzeilen, Dashboards). Es ist agent-native: Neben `role=\"img\"` mit einem automatisch generierten `aria-label` (Anzahl, Min, Max, Letzter) stellt jede Instanz stabile Attribute `data-pura-sparkline-count/values/min/max/last` bereit und registriert sich in `window.__puraSparklines` (indiziert über `data-pura-id`), sodass ein Agent die Daten jedes Diagramms auf der Seite auflisten und lesen kann, ohne das SVG zu parsen.",
   "attributes": [
    {
     "desc": "Durch Kommas getrennte Zahlen, z. B. \"3,7,4,9,5,8\". Leerzeichen sind zulässig und nicht numerische Einträge werden verworfen; leere/ungültige Werte zeichnen nichts."
    },
    {
     "desc": "Breite des Diagramms in px. Akzeptiert eine einfache Zahl."
    },
    {
     "desc": "Höhe des Diagramms in px. Akzeptiert eine einfache Zahl."
    },
    {
     "desc": "Farbe der Linie, des Punkts und der Füllung. Beliebige CSS-Farbe."
    },
    {
     "desc": "Zeichnet eine durchscheinende Fläche unter der Linie (nur bei mehr als einem Wert)."
    },
    {
     "desc": "Zeichnet einen Punkt auf dem letzten Wert der Reihe."
    }
   ],
   "demoHTML": "<div style=\"display:flex;align-items:center;gap:12px;font-family:system-ui\">\n  <span>Umsatz (7 Tage)</span>\n  <pura-sparkline values=\"4,7,5,9,6,11,13\" width=\"120\" height=\"32\" color=\"#16a34a\" fill dot></pura-sparkline>\n  <strong>$13k</strong>\n</div>"
  },
  "it": {
   "description": "Il `<pura-sparkline>` esegue il rendering di un SVG compatto con una polilinea ridimensionata per adattarsi al suo riquadro, con riempimento dell'area opzionale e un punto sull'ultimo valore. Usalo per mostrare tendenze di serie temporali in poco spazio (KPI, righe di tabella, dashboard). È agent-native: oltre a `role=\"img\"` con un `aria-label` generato automaticamente (conteggio, min, max, ultimo), ogni istanza espone attributi stabili `data-pura-sparkline-count/values/min/max/last` e si registra in `window.__puraSparklines` (indicizzato tramite `data-pura-id`), consentendo a un agente di enumerare e leggere i dati di ogni grafico nella pagina senza analizzare l'SVG.",
   "attributes": [
    {
     "desc": "Numeri separati da virgola, es. \"3,7,4,9,5,8\". Gli spazi sono tollerati e le voci non numeriche vengono scartate; valori vuoti/non validi non disegnano nulla."
    },
    {
     "desc": "Larghezza del grafico in px. Accetta un semplice numero."
    },
    {
     "desc": "Altezza del grafico in px. Accetta un semplice numero."
    },
    {
     "desc": "Colore della linea, del punto e del riempimento. Qualsiasi colore CSS."
    },
    {
     "desc": "Disegna un'area traslucida sotto la linea (solo con più di un valore)."
    },
    {
     "desc": "Disegna un punto sull'ultimo valore della serie."
    }
   ],
   "demoHTML": "<div style=\"display:flex;align-items:center;gap:12px;font-family:system-ui\">\n  <span>Ricavi (7 giorni)</span>\n  <pura-sparkline values=\"4,7,5,9,6,11,13\" width=\"120\" height=\"32\" color=\"#16a34a\" fill dot></pura-sparkline>\n  <strong>$13k</strong>\n</div>"
  }
 },
 "spinner": {
  "pt-BR": {
   "description": "O Spinner é um web component nativo que exibe um indicador de carregamento circular animado. Use-o para sinalizar que um processamento está em andamento, como o carregamento de dados ou o envio de um formulário. Ele expõe o papel ARIA \"status\" para leitores de tela e suporta um rótulo acessível personalizado.",
   "attributes": [
    {
     "desc": "Tamanho do spinner: sm (pequeno), md (médio) ou lg (grande)."
    },
    {
     "desc": "Rótulo acessível (aria-label) anunciado pelos leitores de tela."
    }
   ],
   "demoHTML": "<div style=\"display:flex;align-items:center;gap:1.5rem;\">\n  <pura-spinner size=\"sm\"></pura-spinner>\n  <pura-spinner></pura-spinner>\n  <pura-spinner size=\"lg\" label=\"Carregando dados\"></pura-spinner>\n</div>"
  },
  "fr": {
   "description": "Le Spinner est un web component natif qui affiche un indicateur de chargement circulaire animé. Utilisez-le pour signaler qu'un traitement est en cours, comme le chargement de données ou l'envoi d'un formulaire. Il expose le rôle ARIA \"status\" pour les lecteurs d'écran et prend en charge un libellé accessible personnalisé.",
   "attributes": [
    {
     "desc": "Taille du spinner : sm (petit), md (moyen) ou lg (grand)."
    },
    {
     "desc": "Libellé accessible (aria-label) annoncé par les lecteurs d'écran."
    }
   ],
   "demoHTML": "<div style=\"display:flex;align-items:center;gap:1.5rem;\">\n  <pura-spinner size=\"sm\"></pura-spinner>\n  <pura-spinner></pura-spinner>\n  <pura-spinner size=\"lg\" label=\"Chargement des données\"></pura-spinner>\n</div>"
  },
  "de": {
   "description": "Der Spinner ist eine native Web Component, die einen animierten kreisförmigen Ladeindikator anzeigt. Verwenden Sie ihn, um zu signalisieren, dass eine Verarbeitung läuft, etwa das Laden von Daten oder das Absenden eines Formulars. Er stellt die ARIA-Rolle \"status\" für Screenreader bereit und unterstützt eine benutzerdefinierte barrierefreie Beschriftung.",
   "attributes": [
    {
     "desc": "Größe des Spinners: sm (klein), md (mittel) oder lg (groß)."
    },
    {
     "desc": "Barrierefreie Beschriftung (aria-label), die von Screenreadern angesagt wird."
    }
   ],
   "demoHTML": "<div style=\"display:flex;align-items:center;gap:1.5rem;\">\n  <pura-spinner size=\"sm\"></pura-spinner>\n  <pura-spinner></pura-spinner>\n  <pura-spinner size=\"lg\" label=\"Daten werden geladen\"></pura-spinner>\n</div>"
  },
  "it": {
   "description": "Lo Spinner è un web component nativo che mostra un indicatore di caricamento circolare animato. Usalo per segnalare che un'elaborazione è in corso, come il caricamento dei dati o l'invio di un modulo. Espone il ruolo ARIA \"status\" per gli screen reader e supporta un'etichetta accessibile personalizzata.",
   "attributes": [
    {
     "desc": "Dimensione dello spinner: sm (piccolo), md (medio) o lg (grande)."
    },
    {
     "desc": "Etichetta accessibile (aria-label) annunciata dagli screen reader."
    }
   ],
   "demoHTML": "<div style=\"display:flex;align-items:center;gap:1.5rem;\">\n  <pura-spinner size=\"sm\"></pura-spinner>\n  <pura-spinner></pura-spinner>\n  <pura-spinner size=\"lg\" label=\"Caricamento dati\"></pura-spinner>\n</div>"
  }
 },
 "stat": {
  "pt-BR": {
   "description": "O `<pura-stat>` exibe um indicador numérico (KPI) com um rótulo, um valor principal e uma variação (delta) que ganha automaticamente uma seta e cor: verde para aumento, vermelho para queda, neutro para estável. Use-o em dashboards e painéis de resumo onde cada número precisa comunicar uma tendência num relance. Ele é nativo para agentes: além de espelhar seu estado em tempo real em atributos estáveis `data-pura-stat-*`, cada instância se registra em `window.__puraStats` (um mapa indexado por `data-pura-id`), permitindo que um agente enumere e leia todas as métricas da página sem inspecionar o DOM.",
   "attributes": [
    {
     "desc": "Legenda descritiva da métrica (ex.: \"Receita\")."
    },
    {
     "desc": "O número em destaque (ex.: \"R$48,2 mil\", \"1.204\")."
    },
    {
     "desc": "Texto da variação (ex.: \"+12%\", \"-3,4%\"). A linha do delta só aparece quando preenchida."
    },
    {
     "desc": "Direção e cor da seta. Quando omitido, é inferido pelo sinal do delta (+ = para cima, - = para baixo, caso contrário estável)."
    }
   ],
   "demoHTML": "<div style=\"display:flex;gap:1rem;flex-wrap:wrap\">\n  <pura-stat label=\"Receita\" value=\"R$48,2 mil\" delta=\"+12%\">\n    <svg slot=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6\"/></svg>\n  </pura-stat>\n  <pura-stat label=\"Cancelamentos\" value=\"3,4%\" delta=\"-1,2%\"></pura-stat>\n  <pura-stat label=\"Clientes ativos\" value=\"1.204\" delta=\"0%\" trend=\"flat\"></pura-stat>\n</div>"
  },
  "fr": {
   "description": "Le `<pura-stat>` affiche un indicateur numérique (KPI) avec un libellé, une valeur principale et une variation (delta) qui reçoit automatiquement une flèche et une couleur : vert pour une hausse, rouge pour une baisse, neutre pour stable. Utilisez-le dans les tableaux de bord et les panneaux de synthèse où chaque chiffre doit communiquer une tendance d'un coup d'œil. Il est agent-native : en plus de refléter son état en temps réel dans des attributs stables `data-pura-stat-*`, chaque instance s'enregistre dans `window.__puraStats` (une carte indexée par `data-pura-id`), ce qui permet à un agent d'énumérer et de lire toutes les métriques de la page sans inspecter le DOM.",
   "attributes": [
    {
     "desc": "Légende descriptive de la métrique (ex. : \"Chiffre d'affaires\")."
    },
    {
     "desc": "Le chiffre mis en avant (ex. : \"48,2 k€\", \"1 204\")."
    },
    {
     "desc": "Texte de la variation (ex. : \"+12 %\", \"-3,4 %\"). La ligne du delta n'apparaît que lorsqu'elle est renseignée."
    },
    {
     "desc": "Direction et couleur de la flèche. Lorsqu'elle est omise, elle est déduite du signe du delta (+ = hausse, - = baisse, sinon stable)."
    }
   ],
   "demoHTML": "<div style=\"display:flex;gap:1rem;flex-wrap:wrap\">\n  <pura-stat label=\"Chiffre d'affaires\" value=\"48,2 k€\" delta=\"+12%\">\n    <svg slot=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6\"/></svg>\n  </pura-stat>\n  <pura-stat label=\"Annulations\" value=\"3,4%\" delta=\"-1,2%\"></pura-stat>\n  <pura-stat label=\"Clients actifs\" value=\"1 204\" delta=\"0%\" trend=\"flat\"></pura-stat>\n</div>"
  },
  "de": {
   "description": "Das `<pura-stat>` zeigt eine numerische Kennzahl (KPI) mit einer Beschriftung, einem Hauptwert und einer Veränderung (Delta), die automatisch einen Pfeil und eine Farbe erhält: Grün bei Anstieg, Rot bei Rückgang, neutral bei gleichbleibend. Verwenden Sie es in Dashboards und Übersichtspanels, in denen jede Zahl auf einen Blick einen Trend vermitteln soll. Es ist agent-native: Neben der Spiegelung seines Live-Zustands in stabilen Attributen `data-pura-stat-*` registriert sich jede Instanz in `window.__puraStats` (eine über `data-pura-id` indizierte Map), sodass ein Agent alle Kennzahlen der Seite auflisten und lesen kann, ohne das DOM zu inspizieren.",
   "attributes": [
    {
     "desc": "Beschreibende Bezeichnung der Kennzahl (z. B. \"Umsatz\")."
    },
    {
     "desc": "Die hervorgehobene Zahl (z. B. \"48,2 Tsd. €\", \"1.204\")."
    },
    {
     "desc": "Veränderungstext (z. B. \"+12 %\", \"-3,4 %\"). Die Delta-Zeile erscheint nur, wenn sie ausgefüllt ist."
    },
    {
     "desc": "Pfeilrichtung und -farbe. Wird sie weggelassen, wird sie aus dem Vorzeichen des Deltas abgeleitet (+ = aufwärts, - = abwärts, sonst gleichbleibend)."
    }
   ],
   "demoHTML": "<div style=\"display:flex;gap:1rem;flex-wrap:wrap\">\n  <pura-stat label=\"Umsatz\" value=\"48,2 Tsd. €\" delta=\"+12%\">\n    <svg slot=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6\"/></svg>\n  </pura-stat>\n  <pura-stat label=\"Stornierungen\" value=\"3,4%\" delta=\"-1,2%\"></pura-stat>\n  <pura-stat label=\"Aktive Kunden\" value=\"1.204\" delta=\"0%\" trend=\"flat\"></pura-stat>\n</div>"
  },
  "it": {
   "description": "Il `<pura-stat>` mostra un indicatore numerico (KPI) con un'etichetta, un valore principale e una variazione (delta) che acquisisce automaticamente una freccia e un colore: verde per un aumento, rosso per una diminuzione, neutro per stabile. Usalo nelle dashboard e nei pannelli di riepilogo in cui ogni numero deve comunicare una tendenza a colpo d'occhio. È agent-native: oltre a rispecchiare il suo stato in tempo reale in attributi stabili `data-pura-stat-*`, ogni istanza si registra in `window.__puraStats` (una mappa indicizzata tramite `data-pura-id`), consentendo a un agente di enumerare e leggere tutte le metriche della pagina senza ispezionare il DOM.",
   "attributes": [
    {
     "desc": "Didascalia descrittiva della metrica (es. \"Ricavi\")."
    },
    {
     "desc": "Il numero in evidenza (es. \"48,2 mila €\", \"1.204\")."
    },
    {
     "desc": "Testo della variazione (es. \"+12%\", \"-3,4%\"). La riga del delta appare solo quando è compilata."
    },
    {
     "desc": "Direzione e colore della freccia. Se omesso, viene dedotto dal segno del delta (+ = su, - = giù, altrimenti stabile)."
    }
   ],
   "demoHTML": "<div style=\"display:flex;gap:1rem;flex-wrap:wrap\">\n  <pura-stat label=\"Ricavi\" value=\"48,2 mila €\" delta=\"+12%\">\n    <svg slot=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6\"/></svg>\n  </pura-stat>\n  <pura-stat label=\"Cancellazioni\" value=\"3,4%\" delta=\"-1,2%\"></pura-stat>\n  <pura-stat label=\"Clienti attivi\" value=\"1.204\" delta=\"0%\" trend=\"flat\"></pura-stat>\n</div>"
  }
 },
 "stat-grid": {
  "pt-BR": {
   "description": "O `<pura-stat-grid>` é um contêiner que organiza elementos `<pura-stat>` em uma grade fluida (colunas auto-fit, sem quantidade fixa) com divisórias de 1px que se adaptam à quantidade de colunas que se acomodam na largura disponível. Use-o para painéis de KPI, resumos de dashboard ou blocos de números em destaque. Camada nativa para agentes: cada grade recebe um id estável `data-pura-stat-grid` e registra um snapshot ao vivo, legível por máquina, em `window.__puraStats[id]` no formato `{ label, stats: [{ id, label, value, delta, trend }] }`, permitindo que agentes leiam as métricas sem fazer scraping do DOM; cada `<pura-stat>` também expõe um método público `snapshot()`.",
   "attributes": [
    {
     "desc": "Nome acessível do grupo (torna-se o aria-label e o campo label do snapshot no registro). Atributo de <pura-stat-grid>."
    },
    {
     "desc": "Largura mínima de cada coluna antes de quebrar para a próxima linha. Atributo de <pura-stat-grid>."
    },
    {
     "desc": "Controla as linhas de 1px entre as células. Use dividers=\"none\" para removê-las. Atributo de <pura-stat-grid>."
    },
    {
     "desc": "Texto para o rótulo da célula, usado quando o slot label está vazio. Atributo de <pura-stat>."
    },
    {
     "desc": "Texto para o valor da célula, usado quando o slot default está vazio. Atributo de <pura-stat>."
    },
    {
     "desc": "Texto da variação (ex.: \"+12,5%\") renderizado ao lado do valor. Atributo de <pura-stat>."
    },
    {
     "desc": "Direção da variação: colore o delta (verde/vermelho/neutro), adiciona uma seta e expõe a direção via data-trend e aria-label. Atributo de <pura-stat>."
    }
   ],
   "demoHTML": "<pura-stat-grid label=\"Visão geral do mês\" min=\"13rem\">\n  <pura-stat label=\"Receita\" value=\"R$128.430\" delta=\"+12,5%\" trend=\"up\">\n    <span slot=\"help\">vs. mês anterior</span>\n  </pura-stat>\n  <pura-stat label=\"Novos clientes\" value=\"342\" delta=\"+8,1%\" trend=\"up\"></pura-stat>\n  <pura-stat label=\"Taxa de cancelamento\" value=\"2,3%\" delta=\"-0,4 pp\" trend=\"down\"></pura-stat>\n  <pura-stat label=\"Ticket médio\" value=\"R$375\" delta=\"0,0%\" trend=\"flat\"></pura-stat>\n</pura-stat-grid>"
  },
  "fr": {
   "description": "Le `<pura-stat-grid>` est un conteneur qui organise des éléments `<pura-stat>` dans une grille fluide (colonnes auto-fit, sans nombre fixe) avec des séparateurs de 1px qui s'adaptent au nombre de colonnes qui se répartissent dans la largeur disponible. Utilisez-le pour des panneaux de KPI, des synthèses de tableau de bord ou des blocs de chiffres mis en avant. Couche agent-native : chaque grille reçoit un id stable `data-pura-stat-grid` et enregistre un instantané en temps réel, lisible par une machine, dans `window.__puraStats[id]` au format `{ label, stats: [{ id, label, value, delta, trend }] }`, ce qui permet aux agents de lire les métriques sans scraper le DOM ; chaque `<pura-stat>` expose aussi une méthode publique `snapshot()`.",
   "attributes": [
    {
     "desc": "Nom accessible du groupe (devient l'aria-label et le champ label de l'instantané dans le registre). Attribut de <pura-stat-grid>."
    },
    {
     "desc": "Largeur minimale de chaque colonne avant qu'elle ne passe à la ligne suivante. Attribut de <pura-stat-grid>."
    },
    {
     "desc": "Contrôle les lignes de 1px entre les cellules. Utilisez dividers=\"none\" pour les supprimer. Attribut de <pura-stat-grid>."
    },
    {
     "desc": "Texte du libellé de la cellule, utilisé lorsque le slot label est vide. Attribut de <pura-stat>."
    },
    {
     "desc": "Texte de la valeur de la cellule, utilisé lorsque le slot default est vide. Attribut de <pura-stat>."
    },
    {
     "desc": "Texte de la variation (ex. : \"+12,5 %\") affiché à côté de la valeur. Attribut de <pura-stat>."
    },
    {
     "desc": "Direction de la variation : colore le delta (vert/rouge/neutre), ajoute une flèche et expose la direction via data-trend et aria-label. Attribut de <pura-stat>."
    }
   ],
   "demoHTML": "<pura-stat-grid label=\"Aperçu du mois\" min=\"13rem\">\n  <pura-stat label=\"Chiffre d'affaires\" value=\"128 430 €\" delta=\"+12,5%\" trend=\"up\">\n    <span slot=\"help\">vs. mois précédent</span>\n  </pura-stat>\n  <pura-stat label=\"Nouveaux clients\" value=\"342\" delta=\"+8,1%\" trend=\"up\"></pura-stat>\n  <pura-stat label=\"Taux d'attrition\" value=\"2,3%\" delta=\"-0,4 pt\" trend=\"down\"></pura-stat>\n  <pura-stat label=\"Panier moyen\" value=\"375 €\" delta=\"0,0%\" trend=\"flat\"></pura-stat>\n</pura-stat-grid>"
  },
  "de": {
   "description": "Das `<pura-stat-grid>` ist ein Container, der `<pura-stat>`-Elemente in einem flexiblen Raster (Auto-Fit-Spalten, ohne feste Anzahl) mit 1px-Trennlinien anordnet, die sich an die jeweils in der verfügbaren Breite umbrechende Anzahl von Spalten anpassen. Verwenden Sie es für KPI-Panels, Dashboard-Zusammenfassungen oder Blöcke hervorgehobener Zahlen. Agent-native Schicht: Jedes Raster erhält eine stabile id `data-pura-stat-grid` und registriert einen Live-, maschinenlesbaren Snapshot in `window.__puraStats[id]` im Format `{ label, stats: [{ id, label, value, delta, trend }] }`, sodass Agenten die Kennzahlen lesen können, ohne das DOM zu scrapen; jedes `<pura-stat>` stellt außerdem eine öffentliche Methode `snapshot()` bereit.",
   "attributes": [
    {
     "desc": "Barrierefreier Name der Gruppe (wird zum aria-label und zum label-Feld des Snapshots im Registry). Attribut von <pura-stat-grid>."
    },
    {
     "desc": "Mindestbreite jeder Spalte, bevor sie in die nächste Zeile umbricht. Attribut von <pura-stat-grid>."
    },
    {
     "desc": "Steuert die 1px-Linien zwischen den Zellen. Verwenden Sie dividers=\"none\", um sie zu entfernen. Attribut von <pura-stat-grid>."
    },
    {
     "desc": "Text für die Beschriftung der Zelle, der verwendet wird, wenn der label-Slot leer ist. Attribut von <pura-stat>."
    },
    {
     "desc": "Text für den Wert der Zelle, der verwendet wird, wenn der default-Slot leer ist. Attribut von <pura-stat>."
    },
    {
     "desc": "Veränderungstext (z. B. \"+12,5 %\"), der neben dem Wert dargestellt wird. Attribut von <pura-stat>."
    },
    {
     "desc": "Veränderungsrichtung: färbt das Delta (grün/rot/neutral), fügt einen Pfeil hinzu und stellt die Richtung über data-trend und aria-label bereit. Attribut von <pura-stat>."
    }
   ],
   "demoHTML": "<pura-stat-grid label=\"Monatsübersicht\" min=\"13rem\">\n  <pura-stat label=\"Umsatz\" value=\"128.430 €\" delta=\"+12,5%\" trend=\"up\">\n    <span slot=\"help\">vs. Vormonat</span>\n  </pura-stat>\n  <pura-stat label=\"Neue Kunden\" value=\"342\" delta=\"+8,1%\" trend=\"up\"></pura-stat>\n  <pura-stat label=\"Abwanderungsrate\" value=\"2,3%\" delta=\"-0,4 PP\" trend=\"down\"></pura-stat>\n  <pura-stat label=\"Durchschnittlicher Bestellwert\" value=\"375 €\" delta=\"0,0%\" trend=\"flat\"></pura-stat>\n</pura-stat-grid>"
  },
  "it": {
   "description": "Il `<pura-stat-grid>` è un contenitore che dispone gli elementi `<pura-stat>` in una griglia fluida (colonne auto-fit, senza un numero fisso) con divisori da 1px che si adattano al numero di colonne che si distribuiscono nella larghezza disponibile. Usalo per pannelli di KPI, riepiloghi di dashboard o blocchi di numeri in evidenza. Livello agent-native: ogni griglia riceve un id stabile `data-pura-stat-grid` e registra uno snapshot in tempo reale, leggibile dalla macchina, in `window.__puraStats[id]` nel formato `{ label, stats: [{ id, label, value, delta, trend }] }`, consentendo agli agenti di leggere le metriche senza fare scraping del DOM; ogni `<pura-stat>` espone inoltre un metodo pubblico `snapshot()`.",
   "attributes": [
    {
     "desc": "Nome accessibile del gruppo (diventa l'aria-label e il campo label dello snapshot nel registro). Attributo di <pura-stat-grid>."
    },
    {
     "desc": "Larghezza minima di ogni colonna prima che vada a capo nella riga successiva. Attributo di <pura-stat-grid>."
    },
    {
     "desc": "Controlla le linee da 1px tra le celle. Usa dividers=\"none\" per rimuoverle. Attributo di <pura-stat-grid>."
    },
    {
     "desc": "Testo per l'etichetta della cella, usato quando lo slot label è vuoto. Attributo di <pura-stat>."
    },
    {
     "desc": "Testo per il valore della cella, usato quando lo slot default è vuoto. Attributo di <pura-stat>."
    },
    {
     "desc": "Testo della variazione (es. \"+12,5%\") visualizzato accanto al valore. Attributo di <pura-stat>."
    },
    {
     "desc": "Direzione della variazione: colora il delta (verde/rosso/neutro), aggiunge una freccia ed espone la direzione tramite data-trend e aria-label. Attributo di <pura-stat>."
    }
   ],
   "demoHTML": "<pura-stat-grid label=\"Panoramica mensile\" min=\"13rem\">\n  <pura-stat label=\"Ricavi\" value=\"128.430 €\" delta=\"+12,5%\" trend=\"up\">\n    <span slot=\"help\">vs. mese precedente</span>\n  </pura-stat>\n  <pura-stat label=\"Nuovi clienti\" value=\"342\" delta=\"+8,1%\" trend=\"up\"></pura-stat>\n  <pura-stat label=\"Tasso di abbandono\" value=\"2,3%\" delta=\"-0,4 pp\" trend=\"down\"></pura-stat>\n  <pura-stat label=\"Valore medio ordine\" value=\"375 €\" delta=\"0,0%\" trend=\"flat\"></pura-stat>\n</pura-stat-grid>"
  }
 },
 "table": {
  "pt-BR": {
   "description": "Um web component nativo que estiliza uma tabela HTML comum colocada no slot default, preservando toda a semântica nativa de thead, tbody, tfoot e caption. Use-o para exibir dados tabulares com a aparência do pura, incluindo cabeçalho em destaque, hover nas linhas e bordas. Ative o atributo striped para listras zebradas nas linhas pares.",
   "attributes": [
    {
     "desc": "Aplica listras zebradas (uma cor de fundo nas linhas pares do tbody)."
    }
   ],
   "demoHTML": "<pura-table striped>\n  <table>\n    <caption>Pedidos recentes</caption>\n    <thead>\n      <tr>\n        <th>Cliente</th>\n        <th>Produto</th>\n        <th>Status</th>\n        <th>Valor</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td>Ana Souza</td>\n        <td>Plano Anual</td>\n        <td>Pago</td>\n        <td>R$1.200,00</td>\n      </tr>\n      <tr>\n        <td>Bruno Lima</td>\n        <td>Plano Mensal</td>\n        <td>Pendente</td>\n        <td>R$120,00</td>\n      </tr>\n      <tr>\n        <td>Carla Dias</td>\n        <td>Plano Anual</td>\n        <td>Cancelado</td>\n        <td>R$1.200,00</td>\n      </tr>\n    </tbody>\n  </table>\n</pura-table>"
  },
  "fr": {
   "description": "Un web component natif qui met en forme un tableau HTML ordinaire placé dans le slot default, en préservant toute la sémantique native de thead, tbody, tfoot et caption. Utilisez-le pour afficher des données tabulaires avec l'apparence de pura, avec un en-tête mis en évidence, un survol des lignes et des bordures. Activez l'attribut striped pour des rayures zébrées sur les lignes paires.",
   "attributes": [
    {
     "desc": "Applique des rayures zébrées (une couleur d'arrière-plan sur les lignes paires du tbody)."
    }
   ],
   "demoHTML": "<pura-table striped>\n  <table>\n    <caption>Commandes récentes</caption>\n    <thead>\n      <tr>\n        <th>Client</th>\n        <th>Produit</th>\n        <th>Statut</th>\n        <th>Montant</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td>Ana Souza</td>\n        <td>Forfait annuel</td>\n        <td>Payé</td>\n        <td>1 200,00 €</td>\n      </tr>\n      <tr>\n        <td>Bruno Lima</td>\n        <td>Forfait mensuel</td>\n        <td>En attente</td>\n        <td>120,00 €</td>\n      </tr>\n      <tr>\n        <td>Carla Dias</td>\n        <td>Forfait annuel</td>\n        <td>Annulé</td>\n        <td>1 200,00 €</td>\n      </tr>\n    </tbody>\n  </table>\n</pura-table>"
  },
  "de": {
   "description": "Eine native Web Component, die eine gewöhnliche, im default-Slot platzierte HTML-Tabelle gestaltet und dabei die gesamte native Semantik von thead, tbody, tfoot und caption bewahrt. Verwenden Sie sie, um Tabellendaten im pura-Look anzuzeigen, einschließlich einer hervorgehobenen Kopfzeile, Zeilen-Hover und Rändern. Aktivieren Sie das Attribut striped für Zebrastreifen auf den geraden Zeilen.",
   "attributes": [
    {
     "desc": "Wendet Zebrastreifen an (eine Hintergrundfarbe auf den geraden Zeilen des tbody)."
    }
   ],
   "demoHTML": "<pura-table striped>\n  <table>\n    <caption>Aktuelle Bestellungen</caption>\n    <thead>\n      <tr>\n        <th>Kunde</th>\n        <th>Produkt</th>\n        <th>Status</th>\n        <th>Betrag</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td>Ana Souza</td>\n        <td>Jahresabo</td>\n        <td>Bezahlt</td>\n        <td>1.200,00 €</td>\n      </tr>\n      <tr>\n        <td>Bruno Lima</td>\n        <td>Monatsabo</td>\n        <td>Ausstehend</td>\n        <td>120,00 €</td>\n      </tr>\n      <tr>\n        <td>Carla Dias</td>\n        <td>Jahresabo</td>\n        <td>Storniert</td>\n        <td>1.200,00 €</td>\n      </tr>\n    </tbody>\n  </table>\n</pura-table>"
  },
  "it": {
   "description": "Un web component nativo che applica uno stile a una normale tabella HTML inserita nello slot default, preservando tutta la semantica nativa di thead, tbody, tfoot e caption. Usalo per mostrare dati tabellari con l'aspetto di pura, inclusi intestazione in evidenza, hover sulle righe e bordi. Attiva l'attributo striped per le strisce zebrate sulle righe pari.",
   "attributes": [
    {
     "desc": "Applica le strisce zebrate (un colore di sfondo sulle righe pari del tbody)."
    }
   ],
   "demoHTML": "<pura-table striped>\n  <table>\n    <caption>Ordini recenti</caption>\n    <thead>\n      <tr>\n        <th>Cliente</th>\n        <th>Prodotto</th>\n        <th>Stato</th>\n        <th>Importo</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td>Ana Souza</td>\n        <td>Piano annuale</td>\n        <td>Pagato</td>\n        <td>1.200,00 €</td>\n      </tr>\n      <tr>\n        <td>Bruno Lima</td>\n        <td>Piano mensile</td>\n        <td>In sospeso</td>\n        <td>120,00 €</td>\n      </tr>\n      <tr>\n        <td>Carla Dias</td>\n        <td>Piano annuale</td>\n        <td>Annullato</td>\n        <td>1.200,00 €</td>\n      </tr>\n    </tbody>\n  </table>\n</pura-table>"
  }
 },
 "tag": {
  "pt-BR": {
   "description": "A Tag (<pura-tag>) é um chip arredondado que rotula, filtra ou categoriza conteúdo, com variantes de cor, um ponto de status opcional e um botão de remover (×) que a torna dispensável. Use-a para exibir categorias, filtros ativos, status ou marcadores em listas e cabeçalhos. Ela tem uma camada nativa para agentes: cada tag recebe um data-pura-id estável, é registrada em window.__puraTags e espelha seu estado em tempo real em atributos data-pura-tag-* (variant, removable, disabled, removed), permitindo que agentes e ferramentas enumerem, leiam e removam tags sem acessar o Shadow DOM.",
   "attributes": [
    {
     "desc": "Cor/intenção da tag: neutral, primary, success, warning, danger ou info."
    },
    {
     "desc": "Renderiza um botão de remover (×) que emite o evento remove."
    },
    {
     "desc": "Renderiza um ponto de status à frente do rótulo."
    },
    {
     "desc": "Esmaece a tag e desativa o botão de remover."
    },
    {
     "desc": "Rótulo acessível usado como alternativa quando o slot default está vazio."
    }
   ],
   "demoHTML": "<div style=\"display:flex;gap:.5rem;flex-wrap:wrap;align-items:center\">\n  <pura-tag>Padrão</pura-tag>\n  <pura-tag variant=\"primary\">Destaque</pura-tag>\n  <pura-tag variant=\"success\" dot>Ativo</pura-tag>\n  <pura-tag variant=\"warning\" dot>Pendente</pura-tag>\n  <pura-tag variant=\"danger\">Em atraso</pura-tag>\n  <pura-tag variant=\"info\">Beta</pura-tag>\n  <pura-tag variant=\"primary\" removable id=\"filtro-categoria\">Categoria: Design</pura-tag>\n  <pura-tag removable disabled>Bloqueado</pura-tag>\n</div>\n<script type=\"module\">\n  const filtro = document.getElementById(\"filtro-categoria\");\n  filtro.addEventListener(\"remove\", (e) => {\n    console.log(\"Filtro removido:\", e.detail.label);\n  });\n</script>"
  },
  "fr": {
   "description": "La Tag (<pura-tag>) est une puce arrondie qui étiquette, filtre ou catégorise du contenu, avec des variantes de couleur, un point de statut optionnel et un bouton de suppression (×) qui la rend supprimable. Utilisez-la pour afficher des catégories, des filtres actifs, des statuts ou des marqueurs dans des listes et des en-têtes. Elle dispose d'une couche agent-native : chaque tag reçoit un data-pura-id stable, est enregistrée dans window.__puraTags et reflète son état en temps réel dans des attributs data-pura-tag-* (variant, removable, disabled, removed), ce qui permet aux agents et aux outils d'énumérer, lire et supprimer des tags sans accéder au Shadow DOM.",
   "attributes": [
    {
     "desc": "Couleur/intention de la tag : neutral, primary, success, warning, danger ou info."
    },
    {
     "desc": "Affiche un bouton de suppression (×) qui émet l'événement remove."
    },
    {
     "desc": "Affiche un point de statut devant le libellé."
    },
    {
     "desc": "Atténue la tag et désactive le bouton de suppression."
    },
    {
     "desc": "Libellé accessible utilisé comme solution de repli lorsque le slot default est vide."
    }
   ],
   "demoHTML": "<div style=\"display:flex;gap:.5rem;flex-wrap:wrap;align-items:center\">\n  <pura-tag>Par défaut</pura-tag>\n  <pura-tag variant=\"primary\">À la une</pura-tag>\n  <pura-tag variant=\"success\" dot>Actif</pura-tag>\n  <pura-tag variant=\"warning\" dot>En attente</pura-tag>\n  <pura-tag variant=\"danger\">En retard</pura-tag>\n  <pura-tag variant=\"info\">Bêta</pura-tag>\n  <pura-tag variant=\"primary\" removable id=\"filtro-categoria\">Catégorie : Design</pura-tag>\n  <pura-tag removable disabled>Verrouillé</pura-tag>\n</div>\n<script type=\"module\">\n  const filtro = document.getElementById(\"filtro-categoria\");\n  filtro.addEventListener(\"remove\", (e) => {\n    console.log(\"Filtro removido:\", e.detail.label);\n  });\n</script>"
  },
  "de": {
   "description": "Die Tag (<pura-tag>) ist ein abgerundeter Chip, der Inhalte beschriftet, filtert oder kategorisiert, mit Farbvarianten, einem optionalen Statuspunkt und einer Entfernen-Schaltfläche (×), die sie schließbar macht. Verwenden Sie sie, um Kategorien, aktive Filter, Status oder Markierungen in Listen und Kopfzeilen anzuzeigen. Sie verfügt über eine agent-native Schicht: Jede Tag erhält eine stabile data-pura-id, wird in window.__puraTags registriert und spiegelt ihren Live-Zustand in data-pura-tag-*-Attributen (variant, removable, disabled, removed) wider, sodass Agenten und Tools Tags auflisten, lesen und entfernen können, ohne auf das Shadow DOM zuzugreifen.",
   "attributes": [
    {
     "desc": "Farbe/Intention der Tag: neutral, primary, success, warning, danger oder info."
    },
    {
     "desc": "Rendert eine Entfernen-Schaltfläche (×), die das remove-Ereignis auslöst."
    },
    {
     "desc": "Rendert einen Statuspunkt vor der Beschriftung."
    },
    {
     "desc": "Dimmt die Tag und deaktiviert die Entfernen-Schaltfläche."
    },
    {
     "desc": "Barrierefreie Beschriftung, die als Fallback verwendet wird, wenn der default-Slot leer ist."
    }
   ],
   "demoHTML": "<div style=\"display:flex;gap:.5rem;flex-wrap:wrap;align-items:center\">\n  <pura-tag>Standard</pura-tag>\n  <pura-tag variant=\"primary\">Empfohlen</pura-tag>\n  <pura-tag variant=\"success\" dot>Aktiv</pura-tag>\n  <pura-tag variant=\"warning\" dot>Ausstehend</pura-tag>\n  <pura-tag variant=\"danger\">Überfällig</pura-tag>\n  <pura-tag variant=\"info\">Beta</pura-tag>\n  <pura-tag variant=\"primary\" removable id=\"filtro-categoria\">Kategorie: Design</pura-tag>\n  <pura-tag removable disabled>Gesperrt</pura-tag>\n</div>\n<script type=\"module\">\n  const filtro = document.getElementById(\"filtro-categoria\");\n  filtro.addEventListener(\"remove\", (e) => {\n    console.log(\"Filtro removido:\", e.detail.label);\n  });\n</script>"
  },
  "it": {
   "description": "La Tag (<pura-tag>) è un chip arrotondato che etichetta, filtra o categorizza i contenuti, con varianti di colore, un punto di stato opzionale e un pulsante di rimozione (×) che la rende eliminabile. Usala per mostrare categorie, filtri attivi, stati o marcatori in elenchi e intestazioni. Dispone di un livello agent-native: ogni tag riceve un data-pura-id stabile, viene registrata in window.__puraTags e rispecchia il suo stato in tempo reale negli attributi data-pura-tag-* (variant, removable, disabled, removed), consentendo ad agenti e strumenti di enumerare, leggere e rimuovere le tag senza accedere allo Shadow DOM.",
   "attributes": [
    {
     "desc": "Colore/intento della tag: neutral, primary, success, warning, danger o info."
    },
    {
     "desc": "Rende un pulsante di rimozione (×) che emette l'evento remove."
    },
    {
     "desc": "Rende un punto di stato davanti all'etichetta."
    },
    {
     "desc": "Attenua la tag e disabilita il pulsante di rimozione."
    },
    {
     "desc": "Etichetta accessibile usata come ripiego quando lo slot default è vuoto."
    }
   ],
   "demoHTML": "<div style=\"display:flex;gap:.5rem;flex-wrap:wrap;align-items:center\">\n  <pura-tag>Predefinito</pura-tag>\n  <pura-tag variant=\"primary\">In evidenza</pura-tag>\n  <pura-tag variant=\"success\" dot>Attivo</pura-tag>\n  <pura-tag variant=\"warning\" dot>In sospeso</pura-tag>\n  <pura-tag variant=\"danger\">In ritardo</pura-tag>\n  <pura-tag variant=\"info\">Beta</pura-tag>\n  <pura-tag variant=\"primary\" removable id=\"filtro-categoria\">Categoria: Design</pura-tag>\n  <pura-tag removable disabled>Bloccato</pura-tag>\n</div>\n<script type=\"module\">\n  const filtro = document.getElementById(\"filtro-categoria\");\n  filtro.addEventListener(\"remove\", (e) => {\n    console.log(\"Filtro removido:\", e.detail.label);\n  });\n</script>"
  }
 },
 "testimonial": {
  "pt-BR": {
   "description": "O `<pura-testimonial>` exibe um depoimento ou citação como uma figure: uma aspa decorativa grande, o texto da citação (slot default), uma avaliação por estrelas opcional e uma linha de autor com avatar, nome e cargo. Use-o para prova social, depoimentos de clientes ou destaques de avaliações. Ele é puramente voltado para exibição (não emite eventos), mas possui uma camada nativa para agentes: cada instância espelha seu estado em atributos estáveis `data-pura-testimonial-*` no host e se registra em `window.__puraTestimonials` (um mapa indexado por `data-pura-id`), permitindo que agentes enumerem e leiam todos os depoimentos da página sem cruzar o limite do shadow DOM.",
   "attributes": [
    {
     "desc": "Nome do autor do depoimento. Quando não há avatar, as iniciais do nome são usadas no lugar."
    },
    {
     "desc": "Cargo / empresa exibido abaixo do nome do autor."
    },
    {
     "desc": "URL da imagem do avatar. Sem ela, recorre às iniciais do autor."
    },
    {
     "desc": "Avaliação por estrelas de 0 a max. Omitido => nenhuma estrela é exibida. Aceita valores fracionários (ex.: 4,5)."
    },
    {
     "desc": "Número de estrelas quando rating está presente."
    }
   ],
   "demoHTML": "<div style=\"max-width: 420px;\">\n  <pura-testimonial\n    author=\"Mariana Lopes\"\n    role=\"CEO, Aurora Tech\"\n    avatar=\"https://i.pravatar.cc/120?img=47\"\n    rating=\"4.5\"\n    max=\"5\">\n    Migrar para o pura foi a melhor decisão que nossa equipe tomou. Zero dependências, componentes nativos e tudo funcionou de primeira na nossa stack.\n  </pura-testimonial>\n</div>"
  },
  "fr": {
   "description": "Le `<pura-testimonial>` affiche un témoignage ou une citation sous forme de figure : un grand guillemet décoratif, le texte de la citation (slot default), une note par étoiles optionnelle et une ligne d'auteur avec avatar, nom et fonction. Utilisez-le pour la preuve sociale, les témoignages de clients ou les avis mis en avant. Il est purement orienté affichage (il n'émet aucun événement), mais il dispose d'une couche agent-native : chaque instance reflète son état dans des attributs stables `data-pura-testimonial-*` sur l'hôte et s'enregistre dans `window.__puraTestimonials` (une carte indexée par `data-pura-id`), ce qui permet aux agents d'énumérer et de lire tous les témoignages de la page sans franchir la frontière du shadow DOM.",
   "attributes": [
    {
     "desc": "Nom de l'auteur du témoignage. En l'absence d'avatar, les initiales du nom sont utilisées à la place."
    },
    {
     "desc": "Fonction / entreprise affichée sous le nom de l'auteur."
    },
    {
     "desc": "URL de l'image de l'avatar. Sans elle, on se rabat sur les initiales de l'auteur."
    },
    {
     "desc": "Note par étoiles de 0 à max. Omise => aucune étoile n'est affichée. Accepte des valeurs fractionnaires (ex. : 4,5)."
    },
    {
     "desc": "Nombre d'étoiles lorsque rating est présent."
    }
   ],
   "demoHTML": "<div style=\"max-width: 420px;\">\n  <pura-testimonial\n    author=\"Mariana Lopes\"\n    role=\"PDG, Aurora Tech\"\n    avatar=\"https://i.pravatar.cc/120?img=47\"\n    rating=\"4.5\"\n    max=\"5\">\n    Passer à pura a été la meilleure décision de notre équipe. Zéro dépendance, des composants natifs, et tout a fonctionné du premier coup dans notre stack.\n  </pura-testimonial>\n</div>"
  },
  "de": {
   "description": "Das `<pura-testimonial>` zeigt ein Testimonial oder Zitat als figure: ein großes dekoratives Anführungszeichen, den Zitattext (default-Slot), eine optionale Sternebewertung und eine Autorenzeile mit Avatar, Name und Funktion. Verwenden Sie es für Social Proof, Kundenstimmen oder hervorgehobene Bewertungen. Es ist rein anzeigeorientiert (es löst keine Ereignisse aus), verfügt jedoch über eine agent-native Schicht: Jede Instanz spiegelt ihren Zustand in stabilen Attributen `data-pura-testimonial-*` auf dem Host wider und registriert sich in `window.__puraTestimonials` (eine über `data-pura-id` indizierte Map), sodass Agenten alle Testimonials der Seite auflisten und lesen können, ohne die Grenze des shadow DOM zu überschreiten.",
   "attributes": [
    {
     "desc": "Name des Verfassers des Testimonials. Wenn kein Avatar vorhanden ist, werden stattdessen die Initialen des Namens verwendet."
    },
    {
     "desc": "Funktion / Unternehmen, das unter dem Namen des Verfassers angezeigt wird."
    },
    {
     "desc": "URL des Avatar-Bildes. Ohne sie wird auf die Initialen des Verfassers zurückgegriffen."
    },
    {
     "desc": "Sternebewertung von 0 bis max. Weggelassen => es werden keine Sterne angezeigt. Akzeptiert Nachkommawerte (z. B. 4,5)."
    },
    {
     "desc": "Anzahl der Sterne, wenn rating vorhanden ist."
    }
   ],
   "demoHTML": "<div style=\"max-width: 420px;\">\n  <pura-testimonial\n    author=\"Mariana Lopes\"\n    role=\"CEO, Aurora Tech\"\n    avatar=\"https://i.pravatar.cc/120?img=47\"\n    rating=\"4.5\"\n    max=\"5\">\n    Der Wechsel zu pura war die beste Entscheidung unseres Teams. Null Abhängigkeiten, native Komponenten, und alles hat in unserem Stack auf Anhieb funktioniert.\n  </pura-testimonial>\n</div>"
  },
  "it": {
   "description": "Il `<pura-testimonial>` mostra una testimonianza o citazione come figure: una grande virgoletta decorativa, il testo della citazione (slot default), una valutazione a stelle opzionale e una riga dell'autore con avatar, nome e ruolo. Usalo per la riprova sociale, le testimonianze dei clienti o le recensioni in evidenza. È puramente orientato alla visualizzazione (non emette eventi), ma dispone di un livello agent-native: ogni istanza rispecchia il suo stato in attributi stabili `data-pura-testimonial-*` sull'host e si registra in `window.__puraTestimonials` (una mappa indicizzata tramite `data-pura-id`), consentendo agli agenti di enumerare e leggere tutte le testimonianze della pagina senza oltrepassare il confine dello shadow DOM.",
   "attributes": [
    {
     "desc": "Nome dell'autore della testimonianza. Quando non c'è un avatar, vengono usate al suo posto le iniziali del nome."
    },
    {
     "desc": "Ruolo / azienda mostrato sotto il nome dell'autore."
    },
    {
     "desc": "URL dell'immagine dell'avatar. In sua assenza, si ricorre alle iniziali dell'autore."
    },
    {
     "desc": "Valutazione a stelle da 0 a max. Omesso => non viene mostrata alcuna stella. Accetta valori frazionari (es. 4,5)."
    },
    {
     "desc": "Numero di stelle quando rating è presente."
    }
   ],
   "demoHTML": "<div style=\"max-width: 420px;\">\n  <pura-testimonial\n    author=\"Mariana Lopes\"\n    role=\"CEO, Aurora Tech\"\n    avatar=\"https://i.pravatar.cc/120?img=47\"\n    rating=\"4.5\"\n    max=\"5\">\n    Passare a pura è stata la migliore decisione presa dal nostro team. Zero dipendenze, componenti nativi e tutto ha funzionato al primo colpo nel nostro stack.\n  </pura-testimonial>\n</div>"
  }
 },
 "ticker": {
  "pt-BR": {
   "description": "O `<pura-ticker>` exibe um número que anima (contando para cima ou para baixo) do valor anterior até o alvo ao longo de uma curta duração, formatado com separadores de milhar sensíveis ao locale. Use-o em dashboards, métricas, contadores de receita ou estatísticas que mudam em tempo real. Ele é agent-native: expõe `role=\"status\"` com `aria-live`, espelha seu estado numérico em atributos estáveis `data-value`/`data-formatted` (mesmo durante a animação) e registra cada instância ativa em `window.__puraTickers`, permitindo que agentes e ferramentas enumerem e leiam de forma confiável todos os tickers da página.",
   "attributes": [
    {
     "desc": "Número alvo; anima a partir do valor anterior quando muda."
    },
    {
     "desc": "Duração da animação em ms (ignorada sob prefers-reduced-motion)."
    },
    {
     "desc": "Número fixo de casas decimais; se omitido, é inferido a partir do valor literal."
    },
    {
     "desc": "Locale do Intl usado para agrupamento e separadores."
    },
    {
     "desc": "Texto renderizado antes do número (ex.: \"$\")."
    },
    {
     "desc": "Texto renderizado depois do número (ex.: \"%\")."
    },
    {
     "desc": "Rótulo acessível para o valor (compõe o aria-label)."
    }
   ],
   "demoHTML": "<div style=\"display:flex; align-items:center; gap:1.5rem; flex-wrap:wrap;\">\n  <pura-ticker id=\"receita\" value=\"0\" duration=\"1200\" decimals=\"2\" locale=\"en-US\" prefix=\"$\" label=\"Receita mensal\"></pura-ticker>\n  <pura-ticker id=\"taxa\" value=\"0\" duration=\"1200\" decimals=\"1\" locale=\"en-US\" suffix=\"%\" label=\"Taxa de conversão\"></pura-ticker>\n  <button id=\"atualizar\" type=\"button\">Atualizar valores</button>\n</div>\n<script type=\"module\">\n  const receita = document.getElementById(\"receita\");\n  const taxa = document.getElementById(\"taxa\");\n  // Animate from zero on load.\n  receita.value = 128430.75;\n  taxa.value = 4.7;\n  document.getElementById(\"atualizar\").addEventListener(\"click\", () => {\n    receita.value = Math.round(Math.random() * 200000 * 100) / 100;\n    taxa.value = Math.round(Math.random() * 100 * 10) / 10;\n  });\n</script>"
  },
  "fr": {
   "description": "Le `<pura-ticker>` affiche un nombre qui s'anime (en comptant vers le haut ou vers le bas) de la valeur précédente jusqu'à la cible sur une courte durée, formaté avec des séparateurs de milliers adaptés à la locale. Utilisez-le pour des tableaux de bord, des métriques, des compteurs de revenus ou des statistiques qui changent en temps réel. Il est agent-native : il expose `role=\"status\"` avec `aria-live`, reflète son état numérique dans des attributs stables `data-value`/`data-formatted` (même pendant l'animation) et enregistre chaque instance active dans `window.__puraTickers`, ce qui permet aux agents et aux outils d'énumérer et de lire de façon fiable tous les tickers de la page.",
   "attributes": [
    {
     "desc": "Nombre cible ; s'anime depuis la valeur précédente lorsqu'il change."
    },
    {
     "desc": "Durée de l'animation en ms (ignorée sous prefers-reduced-motion)."
    },
    {
     "desc": "Nombre fixe de décimales ; s'il est omis, il est déduit de la valeur littérale."
    },
    {
     "desc": "Locale Intl utilisée pour le regroupement et les séparateurs."
    },
    {
     "desc": "Texte affiché avant le nombre (par ex. \"$\")."
    },
    {
     "desc": "Texte affiché après le nombre (par ex. \"%\")."
    },
    {
     "desc": "Libellé accessible pour la valeur (compose l'aria-label)."
    }
   ],
   "demoHTML": "<div style=\"display:flex; align-items:center; gap:1.5rem; flex-wrap:wrap;\">\n  <pura-ticker id=\"receita\" value=\"0\" duration=\"1200\" decimals=\"2\" locale=\"en-US\" prefix=\"$\" label=\"Chiffre d'affaires mensuel\"></pura-ticker>\n  <pura-ticker id=\"taxa\" value=\"0\" duration=\"1200\" decimals=\"1\" locale=\"en-US\" suffix=\"%\" label=\"Taux de conversion\"></pura-ticker>\n  <button id=\"atualizar\" type=\"button\">Mettre à jour les valeurs</button>\n</div>\n<script type=\"module\">\n  const receita = document.getElementById(\"receita\");\n  const taxa = document.getElementById(\"taxa\");\n  // Animate from zero on load.\n  receita.value = 128430.75;\n  taxa.value = 4.7;\n  document.getElementById(\"atualizar\").addEventListener(\"click\", () => {\n    receita.value = Math.round(Math.random() * 200000 * 100) / 100;\n    taxa.value = Math.round(Math.random() * 100 * 10) / 10;\n  });\n</script>"
  },
  "de": {
   "description": "Der `<pura-ticker>` zeigt eine Zahl an, die (auf- oder abwärts zählend) vom vorherigen Wert über eine kurze Dauer zum Zielwert animiert, formatiert mit gebietsschemaabhängigen Tausendertrennzeichen. Verwenden Sie ihn für Dashboards, Metriken, Umsatzzähler oder Statistiken, die sich in Echtzeit ändern. Er ist agent-native: Er stellt `role=\"status\"` mit `aria-live` bereit, spiegelt seinen numerischen Zustand in stabilen Attributen `data-value`/`data-formatted` wider (auch während der Animation) und registriert jede aktive Instanz in `window.__puraTickers`, sodass Agenten und Tools alle Ticker der Seite zuverlässig auflisten und auslesen können.",
   "attributes": [
    {
     "desc": "Zielzahl; animiert beim Ändern vom vorherigen Wert aus."
    },
    {
     "desc": "Animationsdauer in ms (wird bei prefers-reduced-motion ignoriert)."
    },
    {
     "desc": "Feste Anzahl an Dezimalstellen; wird sie weggelassen, wird sie aus dem literalen Wert abgeleitet."
    },
    {
     "desc": "Intl-Gebietsschema, das für Gruppierung und Trennzeichen verwendet wird."
    },
    {
     "desc": "Vor der Zahl angezeigter Text (z. B. \"$\")."
    },
    {
     "desc": "Nach der Zahl angezeigter Text (z. B. \"%\")."
    },
    {
     "desc": "Barrierefreie Beschriftung für den Wert (bildet das aria-label)."
    }
   ],
   "demoHTML": "<div style=\"display:flex; align-items:center; gap:1.5rem; flex-wrap:wrap;\">\n  <pura-ticker id=\"receita\" value=\"0\" duration=\"1200\" decimals=\"2\" locale=\"en-US\" prefix=\"$\" label=\"Monatlicher Umsatz\"></pura-ticker>\n  <pura-ticker id=\"taxa\" value=\"0\" duration=\"1200\" decimals=\"1\" locale=\"en-US\" suffix=\"%\" label=\"Konversionsrate\"></pura-ticker>\n  <button id=\"atualizar\" type=\"button\">Werte aktualisieren</button>\n</div>\n<script type=\"module\">\n  const receita = document.getElementById(\"receita\");\n  const taxa = document.getElementById(\"taxa\");\n  // Animate from zero on load.\n  receita.value = 128430.75;\n  taxa.value = 4.7;\n  document.getElementById(\"atualizar\").addEventListener(\"click\", () => {\n    receita.value = Math.round(Math.random() * 200000 * 100) / 100;\n    taxa.value = Math.round(Math.random() * 100 * 10) / 10;\n  });\n</script>"
  },
  "it": {
   "description": "Il `<pura-ticker>` mostra un numero che si anima (contando in su o in giù) dal valore precedente fino a quello target nell'arco di una breve durata, formattato con separatori delle migliaia in base al locale. Usalo per dashboard, metriche, contatori di fatturato o statistiche che cambiano in tempo reale. È agent-native: espone `role=\"status\"` con `aria-live`, rispecchia il suo stato numerico in attributi stabili `data-value`/`data-formatted` (anche durante l'animazione) e registra ogni istanza attiva in `window.__puraTickers`, consentendo ad agenti e strumenti di enumerare e leggere in modo affidabile tutti i ticker della pagina.",
   "attributes": [
    {
     "desc": "Numero target; si anima dal valore precedente quando cambia."
    },
    {
     "desc": "Durata dell'animazione in ms (ignorata con prefers-reduced-motion)."
    },
    {
     "desc": "Numero fisso di cifre decimali; se omesso, viene dedotto dal valore letterale."
    },
    {
     "desc": "Locale Intl usato per il raggruppamento e i separatori."
    },
    {
     "desc": "Testo mostrato prima del numero (es. \"$\")."
    },
    {
     "desc": "Testo mostrato dopo il numero (es. \"%\")."
    },
    {
     "desc": "Etichetta accessibile per il valore (compone l'aria-label)."
    }
   ],
   "demoHTML": "<div style=\"display:flex; align-items:center; gap:1.5rem; flex-wrap:wrap;\">\n  <pura-ticker id=\"receita\" value=\"0\" duration=\"1200\" decimals=\"2\" locale=\"en-US\" prefix=\"$\" label=\"Ricavi mensili\"></pura-ticker>\n  <pura-ticker id=\"taxa\" value=\"0\" duration=\"1200\" decimals=\"1\" locale=\"en-US\" suffix=\"%\" label=\"Tasso di conversione\"></pura-ticker>\n  <button id=\"atualizar\" type=\"button\">Aggiorna valori</button>\n</div>\n<script type=\"module\">\n  const receita = document.getElementById(\"receita\");\n  const taxa = document.getElementById(\"taxa\");\n  // Animate from zero on load.\n  receita.value = 128430.75;\n  taxa.value = 4.7;\n  document.getElementById(\"atualizar\").addEventListener(\"click\", () => {\n    receita.value = Math.round(Math.random() * 200000 * 100) / 100;\n    taxa.value = Math.round(Math.random() * 100 * 10) / 10;\n  });\n</script>"
  }
 },
 "timeline": {
  "pt-BR": {
   "description": "A Timeline é um contêiner vertical (`<pura-timeline>`) que desenha uma linha conectando os pontos de cada `<pura-timeline-item>` colocado no slot padrão. Use-a para exibir históricos, etapas de processos, changelogs ou feeds de atividade em ordem cronológica. Ela é agent-native: além do `role=\"list\"` acessível, cada timeline montada registra um snapshot legível por máquina e em tempo real em `window.__puraTimelines[id]` (com um label e itens contendo time, title, body e variant), permitindo que agentes leiam o conteúdo sem fazer scraping do DOM.",
   "attributes": [
    {
     "desc": "Nome acessível da lista (vira aria-label) em <pura-timeline>; também é refletido no snapshot do registro."
    },
    {
     "desc": "Define a cor do ponto de cada <pura-timeline-item>."
    }
   ],
   "demoHTML": "<pura-timeline label=\"Histórico do pedido\">\n  <pura-timeline-item variant=\"success\">\n    <span slot=\"time\">29 de mai. de 2026, 09:12</span>\n    <span slot=\"title\">Pedido confirmado</span>\n    Pagamento aprovado e nota fiscal emitida.\n  </pura-timeline-item>\n  <pura-timeline-item variant=\"primary\">\n    <span slot=\"time\">29 de mai. de 2026, 14:40</span>\n    <span slot=\"title\">Em separação</span>\n    Itens reservados no estoque do centro de distribuição.\n  </pura-timeline-item>\n  <pura-timeline-item variant=\"info\">\n    <span slot=\"time\">30 de mai. de 2026, 08:05</span>\n    <span slot=\"title\">A caminho</span>\n    Pacote entregue à transportadora.\n  </pura-timeline-item>\n  <pura-timeline-item>\n    <span slot=\"time\">Previsão: 2 de jun. de 2026</span>\n    <span slot=\"title\">Entrega</span>\n    Aguardando recebimento no endereço cadastrado.\n  </pura-timeline-item>\n</pura-timeline>"
  },
  "fr": {
   "description": "La Timeline est un conteneur vertical (`<pura-timeline>`) qui trace une ligne reliant les points de chaque `<pura-timeline-item>` placé dans le slot par défaut. Utilisez-la pour afficher des historiques, des étapes de processus, des changelogs ou des fils d'activité dans l'ordre chronologique. Elle est agent-native : en plus du `role=\"list\"` accessible, chaque timeline montée enregistre un instantané lisible par machine et en temps réel dans `window.__puraTimelines[id]` (avec un label et des items contenant time, title, body et variant), ce qui permet aux agents de lire le contenu sans scraper le DOM.",
   "attributes": [
    {
     "desc": "Nom accessible de la liste (devient aria-label) sur <pura-timeline> ; également reflété dans l'instantané du registre."
    },
    {
     "desc": "Définit la couleur du point de chaque <pura-timeline-item>."
    }
   ],
   "demoHTML": "<pura-timeline label=\"Historique de la commande\">\n  <pura-timeline-item variant=\"success\">\n    <span slot=\"time\">29 mai 2026, 09:12</span>\n    <span slot=\"title\">Commande confirmée</span>\n    Paiement approuvé et facture émise.\n  </pura-timeline-item>\n  <pura-timeline-item variant=\"primary\">\n    <span slot=\"time\">29 mai 2026, 14:40</span>\n    <span slot=\"title\">En préparation</span>\n    Articles réservés dans le stock du centre de distribution.\n  </pura-timeline-item>\n  <pura-timeline-item variant=\"info\">\n    <span slot=\"time\">30 mai 2026, 08:05</span>\n    <span slot=\"title\">En route</span>\n    Colis remis au transporteur.\n  </pura-timeline-item>\n  <pura-timeline-item>\n    <span slot=\"time\">Estimée : 2 juin 2026</span>\n    <span slot=\"title\">Livraison</span>\n    En attente de réception à l'adresse enregistrée.\n  </pura-timeline-item>\n</pura-timeline>"
  },
  "de": {
   "description": "Die Timeline ist ein vertikaler Container (`<pura-timeline>`), der eine Linie zeichnet, die die Punkte jedes im Standard-Slot platzierten `<pura-timeline-item>` verbindet. Verwenden Sie sie, um Verläufe, Prozessschritte, Changelogs oder Aktivitäts-Feeds in chronologischer Reihenfolge anzuzeigen. Sie ist agent-native: Zusätzlich zum barrierefreien `role=\"list\"` registriert jede eingebundene Timeline einen maschinenlesbaren Live-Snapshot unter `window.__puraTimelines[id]` (mit einem Label und Elementen, die time, title, body und variant enthalten), sodass Agenten den Inhalt lesen können, ohne das DOM zu scrapen.",
   "attributes": [
    {
     "desc": "Barrierefreier Name der Liste (wird zum aria-label) an <pura-timeline>; wird außerdem im Registry-Snapshot widergespiegelt."
    },
    {
     "desc": "Legt die Punktfarbe jedes <pura-timeline-item> fest."
    }
   ],
   "demoHTML": "<pura-timeline label=\"Bestellverlauf\">\n  <pura-timeline-item variant=\"success\">\n    <span slot=\"time\">29. Mai 2026, 09:12</span>\n    <span slot=\"title\">Bestellung bestätigt</span>\n    Zahlung genehmigt und Rechnung ausgestellt.\n  </pura-timeline-item>\n  <pura-timeline-item variant=\"primary\">\n    <span slot=\"time\">29. Mai 2026, 14:40</span>\n    <span slot=\"title\">Wird kommissioniert</span>\n    Artikel im Bestand des Verteilzentrums reserviert.\n  </pura-timeline-item>\n  <pura-timeline-item variant=\"info\">\n    <span slot=\"time\">30. Mai 2026, 08:05</span>\n    <span slot=\"title\">Unterwegs</span>\n    Paket an den Versanddienstleister übergeben.\n  </pura-timeline-item>\n  <pura-timeline-item>\n    <span slot=\"time\">Voraussichtlich: 2. Juni 2026</span>\n    <span slot=\"title\">Zustellung</span>\n    Warten auf Empfang an der registrierten Adresse.\n  </pura-timeline-item>\n</pura-timeline>"
  },
  "it": {
   "description": "La Timeline è un contenitore verticale (`<pura-timeline>`) che traccia una linea che collega i punti di ogni `<pura-timeline-item>` posizionato nello slot predefinito. Usala per mostrare cronologie, fasi di un processo, changelog o feed di attività in ordine cronologico. È agent-native: oltre al `role=\"list\"` accessibile, ogni timeline montata registra uno snapshot leggibile dalla macchina e in tempo reale in `window.__puraTimelines[id]` (con un label e item che contengono time, title, body e variant), consentendo agli agenti di leggere il contenuto senza fare scraping del DOM.",
   "attributes": [
    {
     "desc": "Nome accessibile della lista (diventa aria-label) su <pura-timeline>; viene anche rispecchiato nello snapshot del registro."
    },
    {
     "desc": "Imposta il colore del punto di ogni <pura-timeline-item>."
    }
   ],
   "demoHTML": "<pura-timeline label=\"Cronologia dell'ordine\">\n  <pura-timeline-item variant=\"success\">\n    <span slot=\"time\">29 mag 2026, 09:12</span>\n    <span slot=\"title\">Ordine confermato</span>\n    Pagamento approvato e fattura emessa.\n  </pura-timeline-item>\n  <pura-timeline-item variant=\"primary\">\n    <span slot=\"time\">29 mag 2026, 14:40</span>\n    <span slot=\"title\">In preparazione</span>\n    Articoli riservati nel magazzino del centro di distribuzione.\n  </pura-timeline-item>\n  <pura-timeline-item variant=\"info\">\n    <span slot=\"time\">30 mag 2026, 08:05</span>\n    <span slot=\"title\">In viaggio</span>\n    Pacco consegnato al corriere.\n  </pura-timeline-item>\n  <pura-timeline-item>\n    <span slot=\"time\">Stima: 2 giu 2026</span>\n    <span slot=\"title\">Consegna</span>\n    In attesa di ricezione all'indirizzo registrato.\n  </pura-timeline-item>\n</pura-timeline>"
  }
 },
 "tree-view": {
  "pt-BR": {
   "description": "A Tree View exibe dados hierárquicos como uma árvore acessível (role=tree/treeitem), com navegação pelas setas, roving tabindex, expandir/recolher e seleção. Use-a para navegação de arquivos, categorias aninhadas ou qualquer estrutura pai/filho. Ela é agent-native: cada nó carrega atributos data-pura-* e ARIA, e um registro global window.__puraTrees expõe um snapshot serializável da estrutura via __puraTrees.snapshot(id) e __puraTrees.list(), permitindo que agentes leiam a árvore sem percorrer o DOM.",
   "attributes": [
    {
     "desc": "Em <pura-tree-view>/<pura-tree>: nome acessível da árvore (aria-label). Em <pura-tree-item>: rótulo de texto usado como fallback para value e no snapshot."
    },
    {
     "desc": "Em <pura-tree-item>: revela o grupo de filhos aninhados (gira o chevron)."
    },
    {
     "desc": "Em <pura-tree-item>: torna a linha selecionável (alterna aria-selected na ativação)."
    },
    {
     "desc": "Em <pura-tree-item>: marca o nó como selecionado."
    },
    {
     "desc": "Em <pura-tree-item>: desabilita o nó (ignorado na navegação e nos cliques)."
    },
    {
     "desc": "Em <pura-tree-item>: id legível por máquina exposto nos eventos e no snapshot agent-native; se ausente, recorre ao label ou ao texto do nó."
    }
   ],
   "demoHTML": "<pura-tree-view id=\"arvore\" label=\"Documentos\">\n  <pura-tree-item expanded>\n    <span slot=\"label\">Projetos</span>\n    <pura-tree-item selectable value=\"site\">\n      <span slot=\"label\">marketing-site</span>\n    </pura-tree-item>\n    <pura-tree-item selectable value=\"api\">\n      <span slot=\"label\">payments-api</span>\n    </pura-tree-item>\n  </pura-tree-item>\n  <pura-tree-item>\n    <span slot=\"label\">Arquivados</span>\n    <pura-tree-item selectable value=\"legado\" disabled>\n      <span slot=\"label\">legacy-system</span>\n    </pura-tree-item>\n  </pura-tree-item>\n</pura-tree-view>\n\n<p id=\"saida\" style=\"font-family: var(--pura-font); font-size: 0.875rem; color: var(--pura-muted); margin-top: 0.75rem;\">Selecione um item da árvore.</p>\n\n<script type=\"module\">\n  import \"/pura/lib/tree-view.js\";\n  const arvore = document.getElementById(\"arvore\");\n  const saida = document.getElementById(\"saida\");\n  arvore.addEventListener(\"select\", (e) => {\n    saida.textContent = `Selecionado: ${e.detail.value}`;\n  });\n</script>"
  },
  "fr": {
   "description": "La Tree View affiche des données hiérarchiques sous forme d'arborescence accessible (role=tree/treeitem), avec navigation aux flèches, roving tabindex, déploiement/repli et sélection. Utilisez-la pour la navigation de fichiers, des catégories imbriquées ou toute structure parent/enfant. Elle est agent-native : chaque nœud porte des attributs data-pura-* et ARIA, et un registre global window.__puraTrees expose un instantané sérialisable de la structure via __puraTrees.snapshot(id) et __puraTrees.list(), ce qui permet aux agents de lire l'arborescence sans parcourir le DOM.",
   "attributes": [
    {
     "desc": "Sur <pura-tree-view>/<pura-tree> : nom accessible de l'arborescence (aria-label). Sur <pura-tree-item> : libellé textuel utilisé comme valeur de repli pour value et dans l'instantané."
    },
    {
     "desc": "Sur <pura-tree-item> : affiche le groupe d'enfants imbriqués (fait pivoter le chevron)."
    },
    {
     "desc": "Sur <pura-tree-item> : rend la ligne sélectionnable (bascule aria-selected à l'activation)."
    },
    {
     "desc": "Sur <pura-tree-item> : marque le nœud comme sélectionné."
    },
    {
     "desc": "Sur <pura-tree-item> : désactive le nœud (ignoré dans la navigation et les clics)."
    },
    {
     "desc": "Sur <pura-tree-item> : id lisible par machine exposé dans les événements et dans l'instantané agent-native ; s'il est absent, il se rabat sur le label ou le texte du nœud."
    }
   ],
   "demoHTML": "<pura-tree-view id=\"arvore\" label=\"Documents\">\n  <pura-tree-item expanded>\n    <span slot=\"label\">Projets</span>\n    <pura-tree-item selectable value=\"site\">\n      <span slot=\"label\">marketing-site</span>\n    </pura-tree-item>\n    <pura-tree-item selectable value=\"api\">\n      <span slot=\"label\">payments-api</span>\n    </pura-tree-item>\n  </pura-tree-item>\n  <pura-tree-item>\n    <span slot=\"label\">Archivés</span>\n    <pura-tree-item selectable value=\"legado\" disabled>\n      <span slot=\"label\">legacy-system</span>\n    </pura-tree-item>\n  </pura-tree-item>\n</pura-tree-view>\n\n<p id=\"saida\" style=\"font-family: var(--pura-font); font-size: 0.875rem; color: var(--pura-muted); margin-top: 0.75rem;\">Sélectionnez un élément dans l'arborescence.</p>\n\n<script type=\"module\">\n  import \"/pura/lib/tree-view.js\";\n  const arvore = document.getElementById(\"arvore\");\n  const saida = document.getElementById(\"saida\");\n  arvore.addEventListener(\"select\", (e) => {\n    saida.textContent = `Sélectionné : ${e.detail.value}`;\n  });\n</script>"
  },
  "de": {
   "description": "Die Tree View zeigt hierarchische Daten als barrierefreien Baum (role=tree/treeitem) an, mit Pfeiltastennavigation, Roving Tabindex, Auf-/Zuklappen und Auswahl. Verwenden Sie sie für die Dateinavigation, verschachtelte Kategorien oder jede Eltern-/Kind-Struktur. Sie ist agent-native: Jeder Knoten trägt data-pura-*- und ARIA-Attribute, und ein globales Registry window.__puraTrees stellt über __puraTrees.snapshot(id) und __puraTrees.list() einen serialisierbaren Snapshot der Struktur bereit, sodass Agenten den Baum lesen können, ohne das DOM zu durchlaufen.",
   "attributes": [
    {
     "desc": "An <pura-tree-view>/<pura-tree>: barrierefreier Name des Baums (aria-label). An <pura-tree-item>: Textbeschriftung, die als Fallback für value und im Snapshot verwendet wird."
    },
    {
     "desc": "An <pura-tree-item>: blendet die Gruppe der verschachtelten Kinder ein (dreht das Chevron)."
    },
    {
     "desc": "An <pura-tree-item>: macht die Zeile auswählbar (schaltet aria-selected bei Aktivierung um)."
    },
    {
     "desc": "An <pura-tree-item>: markiert den Knoten als ausgewählt."
    },
    {
     "desc": "An <pura-tree-item>: deaktiviert den Knoten (bei Navigation und Klicks ignoriert)."
    },
    {
     "desc": "An <pura-tree-item>: maschinenlesbare id, die in Ereignissen und im agent-native Snapshot bereitgestellt wird; fehlt sie, wird auf das Label oder den Text des Knotens zurückgegriffen."
    }
   ],
   "demoHTML": "<pura-tree-view id=\"arvore\" label=\"Dokumente\">\n  <pura-tree-item expanded>\n    <span slot=\"label\">Projekte</span>\n    <pura-tree-item selectable value=\"site\">\n      <span slot=\"label\">marketing-site</span>\n    </pura-tree-item>\n    <pura-tree-item selectable value=\"api\">\n      <span slot=\"label\">payments-api</span>\n    </pura-tree-item>\n  </pura-tree-item>\n  <pura-tree-item>\n    <span slot=\"label\">Archiviert</span>\n    <pura-tree-item selectable value=\"legado\" disabled>\n      <span slot=\"label\">legacy-system</span>\n    </pura-tree-item>\n  </pura-tree-item>\n</pura-tree-view>\n\n<p id=\"saida\" style=\"font-family: var(--pura-font); font-size: 0.875rem; color: var(--pura-muted); margin-top: 0.75rem;\">Wählen Sie ein Element aus dem Baum aus.</p>\n\n<script type=\"module\">\n  import \"/pura/lib/tree-view.js\";\n  const arvore = document.getElementById(\"arvore\");\n  const saida = document.getElementById(\"saida\");\n  arvore.addEventListener(\"select\", (e) => {\n    saida.textContent = `Ausgewählt: ${e.detail.value}`;\n  });\n</script>"
  },
  "it": {
   "description": "La Tree View mostra dati gerarchici come un albero accessibile (role=tree/treeitem), con navigazione con i tasti freccia, roving tabindex, espandi/comprimi e selezione. Usala per la navigazione di file, categorie annidate o qualsiasi struttura padre/figlio. È agent-native: ogni nodo porta attributi data-pura-* e ARIA, e un registro globale window.__puraTrees espone uno snapshot serializzabile della struttura tramite __puraTrees.snapshot(id) e __puraTrees.list(), consentendo agli agenti di leggere l'albero senza attraversare il DOM.",
   "attributes": [
    {
     "desc": "Su <pura-tree-view>/<pura-tree>: nome accessibile dell'albero (aria-label). Su <pura-tree-item>: etichetta di testo usata come fallback per value e nello snapshot."
    },
    {
     "desc": "Su <pura-tree-item>: mostra il gruppo di figli annidati (ruota il chevron)."
    },
    {
     "desc": "Su <pura-tree-item>: rende la riga selezionabile (commuta aria-selected all'attivazione)."
    },
    {
     "desc": "Su <pura-tree-item>: contrassegna il nodo come selezionato."
    },
    {
     "desc": "Su <pura-tree-item>: disabilita il nodo (ignorato nella navigazione e nei clic)."
    },
    {
     "desc": "Su <pura-tree-item>: id leggibile dalla macchina esposto negli eventi e nello snapshot agent-native; se assente, ricade sul label o sul testo del nodo."
    }
   ],
   "demoHTML": "<pura-tree-view id=\"arvore\" label=\"Documenti\">\n  <pura-tree-item expanded>\n    <span slot=\"label\">Progetti</span>\n    <pura-tree-item selectable value=\"site\">\n      <span slot=\"label\">marketing-site</span>\n    </pura-tree-item>\n    <pura-tree-item selectable value=\"api\">\n      <span slot=\"label\">payments-api</span>\n    </pura-tree-item>\n  </pura-tree-item>\n  <pura-tree-item>\n    <span slot=\"label\">Archiviati</span>\n    <pura-tree-item selectable value=\"legado\" disabled>\n      <span slot=\"label\">legacy-system</span>\n    </pura-tree-item>\n  </pura-tree-item>\n</pura-tree-view>\n\n<p id=\"saida\" style=\"font-family: var(--pura-font); font-size: 0.875rem; color: var(--pura-muted); margin-top: 0.75rem;\">Seleziona un elemento dall'albero.</p>\n\n<script type=\"module\">\n  import \"/pura/lib/tree-view.js\";\n  const arvore = document.getElementById(\"arvore\");\n  const saida = document.getElementById(\"saida\");\n  arvore.addEventListener(\"select\", (e) => {\n    saida.textContent = `Selezionato: ${e.detail.value}`;\n  });\n</script>"
  }
 },
 "prose": {
  "pt-BR": {
   "description": "O Typography (`<pura-prose>`) é um web component nativo que envolve HTML rico (títulos, parágrafos, listas, citações, código, imagens e tabelas) e aplica tipografia consistente via `::slotted`, com uma medida de leitura confortável e ritmo vertical. Use-o para renderizar artigos, documentação, posts de blog ou qualquer texto longo sem estilizar cada elemento manualmente. É puramente apresentacional, não tem atributos e é tematizável pelos tokens `var(--pura-*)`.",
   "attributes": [],
   "demoHTML": "<pura-prose>\n  <h1>Introdução ao pura</h1>\n  <p><strong>pura</strong> é uma biblioteca de <a href=\"#\">Web Components</a> nativos sem dependências. Use <code><pura-prose></code> para textos longos com tipografia consistente.</p>\n  <h2>Por que usar</h2>\n  <ul>\n    <li>Zero dependências e leve</li>\n    <li>Personalizável via tokens CSS</li>\n    <li>Ritmo vertical e uma medida de leitura confortável</li>\n  </ul>\n  <blockquote>Escreva HTML puro e deixe o componente cuidar do ritmo.</blockquote>\n</pura-prose>"
  },
  "fr": {
   "description": "Typography (`<pura-prose>`) est un web component natif qui englobe du HTML riche (titres, paragraphes, listes, citations, code, images et tableaux) et applique une typographie cohérente via `::slotted`, avec une mesure de lecture confortable et un rythme vertical. Utilisez-le pour afficher des articles, de la documentation, des billets de blog ou tout texte long sans styliser chaque élément à la main. Il est purement présentationnel, n'a aucun attribut et est personnalisable via les tokens `var(--pura-*)`.",
   "attributes": [],
   "demoHTML": "<pura-prose>\n  <h1>Introduction à pura</h1>\n  <p><strong>pura</strong> est une bibliothèque de <a href=\"#\">Web Components</a> natifs sans dépendances. Utilisez <code><pura-prose></code> pour les textes longs avec une typographie cohérente.</p>\n  <h2>Pourquoi l'utiliser</h2>\n  <ul>\n    <li>Zéro dépendance et léger</li>\n    <li>Personnalisable via des tokens CSS</li>\n    <li>Rythme vertical et une largeur de lecture confortable</li>\n  </ul>\n  <blockquote>Écrivez du HTML simple et laissez le composant gérer le rythme.</blockquote>\n</pura-prose>"
  },
  "de": {
   "description": "Typography (`<pura-prose>`) ist ein natives Web Component, das reichhaltiges HTML (Überschriften, Absätze, Listen, Zitate, Code, Bilder und Tabellen) umschließt und über `::slotted` eine konsistente Typografie anwendet, mit einem angenehmen Lesemaß und vertikalem Rhythmus. Verwenden Sie es, um Artikel, Dokumentation, Blogbeiträge oder beliebige Langtexte zu rendern, ohne jedes Element von Hand zu gestalten. Es ist rein präsentativ, hat keine Attribute und ist über die `var(--pura-*)`-Tokens themenfähig.",
   "attributes": [],
   "demoHTML": "<pura-prose>\n  <h1>Einführung in pura</h1>\n  <p><strong>pura</strong> ist eine Bibliothek nativer <a href=\"#\">Web Components</a> ohne Abhängigkeiten. Verwenden Sie <code><pura-prose></code> für lange Texte mit konsistenter Typografie.</p>\n  <h2>Warum sollte man es verwenden</h2>\n  <ul>\n    <li>Keine Abhängigkeiten und leichtgewichtig</li>\n    <li>Anpassbar über CSS-Tokens</li>\n    <li>Vertikaler Rhythmus und eine angenehme Lesebreite</li>\n  </ul>\n  <blockquote>Schreiben Sie reines HTML und überlassen Sie dem Komponenten den Rhythmus.</blockquote>\n</pura-prose>"
  },
  "it": {
   "description": "Typography (`<pura-prose>`) è un web component nativo che racchiude HTML ricco (titoli, paragrafi, elenchi, citazioni, codice, immagini e tabelle) e applica una tipografia coerente tramite `::slotted`, con una misura di lettura confortevole e ritmo verticale. Usalo per renderizzare articoli, documentazione, post di blog o qualsiasi testo lungo senza stilizzare ogni elemento a mano. È puramente presentazionale, non ha attributi ed è personalizzabile tramite i token `var(--pura-*)`.",
   "attributes": [],
   "demoHTML": "<pura-prose>\n  <h1>Introduzione a pura</h1>\n  <p><strong>pura</strong> è una libreria di <a href=\"#\">Web Components</a> nativi senza dipendenze. Usa <code><pura-prose></code> per testi lunghi con una tipografia coerente.</p>\n  <h2>Perché usarlo</h2>\n  <ul>\n    <li>Zero dipendenze e leggero</li>\n    <li>Personalizzabile tramite token CSS</li>\n    <li>Ritmo verticale e una larghezza di lettura confortevole</li>\n  </ul>\n  <blockquote>Scrivi HTML semplice e lascia che il componente gestisca il ritmo.</blockquote>\n</pura-prose>"
  }
 },
 "calendar": {
  "pt-BR": {
   "description": "Um web component nativo que renderiza um calendário mensal com cabeçalho de mês/ano, botões de navegação para o mês anterior/próximo, uma linha de dias da semana localizada e uma grade de 7 colunas. Selecionar um dia (clique ou Enter/Espaço) atualiza o atributo value e dispara o evento change; as setas movem o foco entre os dias, cruzando meses nas bordas. Use-o quando precisar de um seletor de datas inline e acessível, sem dependências.",
   "attributes": [
    {
     "desc": "Dia selecionado no formato yyyy-mm-dd; reflete a seleção do usuário."
    },
    {
     "desc": "Mês exibido no formato yyyy-mm; por padrão, o mês atual."
    }
   ],
   "demoHTML": "<pura-calendar value=\"2026-05-29\" month=\"2026-05\"></pura-calendar>"
  },
  "fr": {
   "description": "Un web component natif qui affiche un calendrier mensuel avec un en-tête mois/année, des boutons de navigation vers le mois précédent/suivant, une ligne de jours de la semaine localisée et une grille de 7 colonnes. Sélectionner un jour (clic ou Entrée/Espace) met à jour l'attribut value et déclenche l'événement change ; les touches fléchées déplacent le focus entre les jours, en franchissant les mois aux bords. Utilisez-le lorsque vous avez besoin d'un sélecteur de date intégré et accessible, sans dépendances.",
   "attributes": [
    {
     "desc": "Jour sélectionné au format yyyy-mm-dd ; reflète la sélection de l'utilisateur."
    },
    {
     "desc": "Mois affiché au format yyyy-mm ; par défaut, le mois en cours."
    }
   ],
   "demoHTML": "<pura-calendar value=\"2026-05-29\" month=\"2026-05\"></pura-calendar>"
  },
  "de": {
   "description": "Ein natives Web Component, das einen Monatskalender mit Monats-/Jahres-Kopfzeile, Navigationsschaltflächen für den vorherigen/nächsten Monat, einer lokalisierten Wochentagszeile und einem 7-spaltigen Raster rendert. Das Auswählen eines Tages (Klick oder Enter/Leertaste) aktualisiert das Attribut value und löst das Ereignis change aus; die Pfeiltasten bewegen den Fokus zwischen den Tagen und überschreiten an den Rändern die Monate. Verwenden Sie es, wenn Sie einen eingebetteten, barrierefreien Datumswähler ohne Abhängigkeiten benötigen.",
   "attributes": [
    {
     "desc": "Ausgewählter Tag im Format yyyy-mm-dd; spiegelt die Auswahl des Benutzers wider."
    },
    {
     "desc": "Angezeigter Monat im Format yyyy-mm; standardmäßig der aktuelle Monat."
    }
   ],
   "demoHTML": "<pura-calendar value=\"2026-05-29\" month=\"2026-05\"></pura-calendar>"
  },
  "it": {
   "description": "Un web component nativo che renderizza un calendario mensile con intestazione mese/anno, pulsanti di navigazione per il mese precedente/successivo, una riga dei giorni della settimana localizzata e una griglia a 7 colonne. Selezionando un giorno (clic o Invio/Spazio) si aggiorna l'attributo value e si attiva l'evento change; i tasti freccia spostano il focus tra i giorni, attraversando i mesi ai bordi. Usalo quando ti serve un selettore di date inline e accessibile, senza dipendenze.",
   "attributes": [
    {
     "desc": "Giorno selezionato nel formato yyyy-mm-dd; riflette la selezione dell'utente."
    },
    {
     "desc": "Mese visualizzato nel formato yyyy-mm; per impostazione predefinita il mese corrente."
    }
   ],
   "demoHTML": "<pura-calendar value=\"2026-05-29\" month=\"2026-05\"></pura-calendar>"
  }
 },
 "date-picker": {
  "pt-BR": {
   "description": "O Date Picker é um web component nativo (zero dependências) que mostra um botão em estilo de input com a data selecionada formatada (ou um placeholder). Ao clicar, abre um popover com um calendário; escolher um dia atualiza o value, fecha o popover e emite um evento change. Use-o quando precisar de seleção de data única em formulários.",
   "attributes": [
    {
     "desc": "Data selecionada no formato yyyy-mm-dd; também disponível como a propriedade .value."
    },
    {
     "desc": "Texto exibido quando nenhuma data está selecionada."
    },
    {
     "desc": "Desabilita o gatilho e impede que o calendário abra."
    }
   ],
   "demoHTML": "<pura-date-picker value=\"2026-05-29\" placeholder=\"Escolha uma data\"></pura-date-picker>"
  },
  "fr": {
   "description": "Le Date Picker est un web component natif (zéro dépendance) qui affiche un bouton de style champ de saisie avec la date sélectionnée formatée (ou un placeholder). Au clic, il ouvre un popover avec un calendrier ; choisir un jour met à jour la value, ferme le popover et émet un événement change. Utilisez-le lorsque vous avez besoin de sélectionner une date unique dans des formulaires.",
   "attributes": [
    {
     "desc": "Date sélectionnée au format yyyy-mm-dd ; également disponible via la propriété .value."
    },
    {
     "desc": "Texte affiché lorsqu'aucune date n'est sélectionnée."
    },
    {
     "desc": "Désactive le déclencheur et empêche l'ouverture du calendrier."
    }
   ],
   "demoHTML": "<pura-date-picker value=\"2026-05-29\" placeholder=\"Choisissez une date\"></pura-date-picker>"
  },
  "de": {
   "description": "Der Date Picker ist ein natives Web Component (ohne Abhängigkeiten), das eine Schaltfläche im Eingabefeldstil mit dem formatierten ausgewählten Datum (oder einem Platzhalter) anzeigt. Beim Klicken öffnet sich ein Popover mit einem Kalender; das Auswählen eines Tages aktualisiert den value, schließt das Popover und löst ein change-Ereignis aus. Verwenden Sie ihn, wenn Sie in Formularen die Auswahl eines einzelnen Datums benötigen.",
   "attributes": [
    {
     "desc": "Ausgewähltes Datum im Format yyyy-mm-dd; auch als Eigenschaft .value verfügbar."
    },
    {
     "desc": "Text, der angezeigt wird, wenn kein Datum ausgewählt ist."
    },
    {
     "desc": "Deaktiviert den Auslöser und verhindert das Öffnen des Kalenders."
    }
   ],
   "demoHTML": "<pura-date-picker value=\"2026-05-29\" placeholder=\"Datum auswählen\"></pura-date-picker>"
  },
  "it": {
   "description": "Il Date Picker è un web component nativo (zero dipendenze) che mostra un pulsante in stile input con la data selezionata formattata (o un placeholder). Al clic apre un popover con un calendario; scegliendo un giorno si aggiorna il value, si chiude il popover e si emette un evento change. Usalo quando ti serve la selezione di una singola data nei moduli.",
   "attributes": [
    {
     "desc": "Data selezionata nel formato yyyy-mm-dd; disponibile anche come proprietà .value."
    },
    {
     "desc": "Testo mostrato quando nessuna data è selezionata."
    },
    {
     "desc": "Disabilita il trigger e impedisce l'apertura del calendario."
    }
   ],
   "demoHTML": "<pura-date-picker value=\"2026-05-29\" placeholder=\"Scegli una data\"></pura-date-picker>"
  }
 },
 "back-to-top": {
  "pt-BR": {
   "description": "O `<pura-back-to-top>` é um botão redondo fixo no canto inferior direito que aparece com fade quando a página (ou um contêiner alvo) é rolada além de um limite e, ao ser clicado, rola suavemente de volta ao topo respeitando o prefers-reduced-motion. Use-o em páginas longas (artigos, listas, docs) como um atalho de retorno acessível. Ele tem uma camada agent-native: reflete o estado em tempo real em atributos `data-pura-back-to-top-*` (visível/oculto, offset atual, limite) e registra cada instância em `window.__puraBackToTop` por `data-pura-id`, permitindo que agentes enumerem os botões e chamem `.toTop()` para controlar a rolagem programaticamente.",
   "attributes": [
    {
     "desc": "Distância de rolagem em px antes de o botão aparecer."
    },
    {
     "desc": "Rótulo acessível (aria-label) do botão de ícone."
    },
    {
     "desc": "Seletor CSS do contêiner de rolagem a observar e rolar. Se ausente: usa a rolagem da página (window)."
    },
    {
     "desc": "Torna o botão não interativo e o mantém oculto."
    }
   ],
   "demoHTML": "<div style=\"height: 1400px; padding: 1rem; line-height: 1.7;\">\n  <h2>Página de exemplo longa</h2>\n  <p>Role a página para baixo. Depois de passar de 300px, o botão \"Voltar ao topo\" aparece no canto inferior direito.</p>\n  <p style=\"margin-top: 1000px;\">Continue rolando até o fim. Clique no botão flutuante para voltar suavemente ao topo.</p>\n</div>\n\n<pura-back-to-top offset=\"300\" label=\"Voltar ao topo\"></pura-back-to-top>"
  },
  "fr": {
   "description": "Le `<pura-back-to-top>` est un bouton rond fixé dans le coin inférieur droit qui apparaît en fondu lorsque la page (ou un conteneur cible) est défilée au-delà d'un seuil et qui, au clic, remonte en douceur vers le haut tout en respectant prefers-reduced-motion. Utilisez-le sur les pages longues (articles, listes, docs) comme raccourci de retour accessible. Il dispose d'une couche agent-native : il reflète l'état en temps réel dans des attributs `data-pura-back-to-top-*` (visible/masqué, offset courant, seuil) et enregistre chaque instance dans `window.__puraBackToTop` par `data-pura-id`, ce qui permet aux agents d'énumérer les boutons et d'appeler `.toTop()` pour piloter le défilement par programmation.",
   "attributes": [
    {
     "desc": "Distance de défilement en px avant l'apparition du bouton."
    },
    {
     "desc": "Libellé accessible (aria-label) du bouton-icône."
    },
    {
     "desc": "Sélecteur CSS du conteneur de défilement à observer et à faire défiler. S'il est absent : utilise le défilement de la page (window)."
    },
    {
     "desc": "Rend le bouton non interactif et le maintient masqué."
    }
   ],
   "demoHTML": "<div style=\"height: 1400px; padding: 1rem; line-height: 1.7;\">\n  <h2>Page d'exemple longue</h2>\n  <p>Faites défiler la page vers le bas. Après avoir dépassé 300px, le bouton \"Retour en haut\" apparaît dans le coin inférieur droit.</p>\n  <p style=\"margin-top: 1000px;\">Continuez à faire défiler jusqu'à la fin. Cliquez sur le bouton flottant pour remonter en douceur en haut.</p>\n</div>\n\n<pura-back-to-top offset=\"300\" label=\"Retour en haut\"></pura-back-to-top>"
  },
  "de": {
   "description": "Der `<pura-back-to-top>` ist eine runde, in der unteren rechten Ecke fixierte Schaltfläche, die eingeblendet wird, wenn die Seite (oder ein Zielcontainer) über einen Schwellenwert hinaus gescrollt wird, und beim Klick unter Beachtung von prefers-reduced-motion sanft nach oben zurückscrollt. Verwenden Sie ihn auf langen Seiten (Artikel, Listen, Docs) als barrierefreie Rücksprung-Verknüpfung. Er verfügt über eine agent-native Schicht: Er spiegelt den Live-Zustand in `data-pura-back-to-top-*`-Attributen wider (sichtbar/verborgen, aktueller Offset, Schwellenwert) und registriert jede Instanz in `window.__puraBackToTop` per `data-pura-id`, sodass Agenten die Schaltflächen auflisten und `.toTop()` aufrufen können, um das Scrollen programmatisch zu steuern.",
   "attributes": [
    {
     "desc": "Scrolldistanz in px, bevor die Schaltfläche erscheint."
    },
    {
     "desc": "Barrierefreie Beschriftung (aria-label) der Symbol-Schaltfläche."
    },
    {
     "desc": "CSS-Selektor des zu beobachtenden und zu scrollenden Scroll-Containers. Fehlt er: verwendet das Scrollen der Seite (window)."
    },
    {
     "desc": "Macht die Schaltfläche nicht interaktiv und hält sie verborgen."
    }
   ],
   "demoHTML": "<div style=\"height: 1400px; padding: 1rem; line-height: 1.7;\">\n  <h2>Lange Beispielseite</h2>\n  <p>Scrollen Sie auf der Seite nach unten. Nachdem Sie 300px überschritten haben, erscheint die Schaltfläche \"Nach oben\" in der unteren rechten Ecke.</p>\n  <p style=\"margin-top: 1000px;\">Scrollen Sie weiter bis zum Ende. Klicken Sie auf die schwebende Schaltfläche, um sanft nach oben zurückzukehren.</p>\n</div>\n\n<pura-back-to-top offset=\"300\" label=\"Nach oben\"></pura-back-to-top>"
  },
  "it": {
   "description": "Il `<pura-back-to-top>` è un pulsante rotondo fissato nell'angolo in basso a destra che appare in dissolvenza quando la pagina (o un contenitore target) viene scorsa oltre una soglia e, al clic, torna dolcemente in cima rispettando prefers-reduced-motion. Usalo su pagine lunghe (articoli, elenchi, documentazione) come scorciatoia di ritorno accessibile. Dispone di un livello agent-native: riflette lo stato in tempo reale negli attributi `data-pura-back-to-top-*` (visibile/nascosto, offset corrente, soglia) e registra ogni istanza in `window.__puraBackToTop` tramite `data-pura-id`, consentendo agli agenti di enumerare i pulsanti e chiamare `.toTop()` per pilotare lo scorrimento in modo programmatico.",
   "attributes": [
    {
     "desc": "Distanza di scorrimento in px prima che il pulsante appaia."
    },
    {
     "desc": "Etichetta accessibile (aria-label) del pulsante con icona."
    },
    {
     "desc": "Selettore CSS del contenitore di scorrimento da osservare e scorrere. Se assente: usa lo scorrimento della pagina (window)."
    },
    {
     "desc": "Rende il pulsante non interattivo e lo mantiene nascosto."
    }
   ],
   "demoHTML": "<div style=\"height: 1400px; padding: 1rem; line-height: 1.7;\">\n  <h2>Pagina di esempio lunga</h2>\n  <p>Scorri la pagina verso il basso. Dopo aver superato i 300px, il pulsante \"Torna su\" appare nell'angolo in basso a destra.</p>\n  <p style=\"margin-top: 1000px;\">Continua a scorrere fino alla fine. Clicca sul pulsante flottante per tornare in cima in modo fluido.</p>\n</div>\n\n<pura-back-to-top offset=\"300\" label=\"Torna su\"></pura-back-to-top>"
  }
 },
 "breadcrumb": {
  "pt-BR": {
   "description": "O Breadcrumb é um web component nativo que exibe a hierarquia de navegação como uma trilha de links separados por um chevron \"/\" inserido automaticamente. Use-o para indicar onde o usuário está dentro da estrutura do site e permitir que ele volte rapidamente para níveis anteriores. É composto por `pura-breadcrumb` (o contêiner nav/ol) e `pura-breadcrumb-item` (cada item da trilha).",
   "attributes": [
    {
     "desc": "Em pura-breadcrumb-item: renderiza o item como um link (<a>) para a URL fornecida."
    },
    {
     "desc": "Em pura-breadcrumb-item: marca a página atual (aria-current=page) e a renderiza como texto destacado, sem link."
    }
   ],
   "demoHTML": "<pura-breadcrumb>\n  <pura-breadcrumb-item href=\"/\">Início</pura-breadcrumb-item>\n  <pura-breadcrumb-item href=\"/produtos\">Produtos</pura-breadcrumb-item>\n  <pura-breadcrumb-item href=\"/produtos/calcados\">Calçados</pura-breadcrumb-item>\n  <pura-breadcrumb-item current>Tênis de corrida</pura-breadcrumb-item>\n</pura-breadcrumb>"
  },
  "fr": {
   "description": "Le Breadcrumb est un web component natif qui affiche la hiérarchie de navigation sous forme d'un fil de liens séparés par un chevron \"/\" inséré automatiquement. Utilisez-le pour indiquer où se trouve l'utilisateur dans la structure du site et lui permettre de revenir rapidement aux niveaux précédents. Il est composé de `pura-breadcrumb` (le conteneur nav/ol) et de `pura-breadcrumb-item` (chaque maillon).",
   "attributes": [
    {
     "desc": "Sur pura-breadcrumb-item : rend le maillon comme un lien (<a>) vers l'URL fournie."
    },
    {
     "desc": "Sur pura-breadcrumb-item : marque la page actuelle (aria-current=page) et l'affiche en texte mis en évidence, sans lien."
    }
   ],
   "demoHTML": "<pura-breadcrumb>\n  <pura-breadcrumb-item href=\"/\">Accueil</pura-breadcrumb-item>\n  <pura-breadcrumb-item href=\"/produtos\">Produits</pura-breadcrumb-item>\n  <pura-breadcrumb-item href=\"/produtos/calcados\">Chaussures</pura-breadcrumb-item>\n  <pura-breadcrumb-item current>Chaussures de course</pura-breadcrumb-item>\n</pura-breadcrumb>"
  },
  "de": {
   "description": "Der Breadcrumb ist ein natives Web Component, das die Navigationshierarchie als Pfad von Links anzeigt, die durch ein automatisch eingefügtes \"/\"-Chevron getrennt sind. Verwenden Sie ihn, um anzuzeigen, wo sich der Benutzer innerhalb der Website-Struktur befindet, und um ihm einen schnellen Rücksprung zu vorherigen Ebenen zu ermöglichen. Er besteht aus `pura-breadcrumb` (dem nav/ol-Container) und `pura-breadcrumb-item` (jedem einzelnen Glied).",
   "attributes": [
    {
     "desc": "An pura-breadcrumb-item: rendert das Glied als Link (<a>) zur angegebenen URL."
    },
    {
     "desc": "An pura-breadcrumb-item: markiert die aktuelle Seite (aria-current=page) und rendert sie als hervorgehobenen Text ohne Link."
    }
   ],
   "demoHTML": "<pura-breadcrumb>\n  <pura-breadcrumb-item href=\"/\">Startseite</pura-breadcrumb-item>\n  <pura-breadcrumb-item href=\"/produtos\">Produkte</pura-breadcrumb-item>\n  <pura-breadcrumb-item href=\"/produtos/calcados\">Schuhe</pura-breadcrumb-item>\n  <pura-breadcrumb-item current>Laufschuhe</pura-breadcrumb-item>\n</pura-breadcrumb>"
  },
  "it": {
   "description": "Il Breadcrumb è un web component nativo che mostra la gerarchia di navigazione come un percorso di link separati da un chevron \"/\" inserito automaticamente. Usalo per indicare dove si trova l'utente all'interno della struttura del sito e per consentirgli di tornare rapidamente ai livelli precedenti. È composto da `pura-breadcrumb` (il contenitore nav/ol) e `pura-breadcrumb-item` (ogni elemento del percorso).",
   "attributes": [
    {
     "desc": "Su pura-breadcrumb-item: renderizza l'elemento come un link (<a>) all'URL fornito."
    },
    {
     "desc": "Su pura-breadcrumb-item: contrassegna la pagina corrente (aria-current=page) e la renderizza come testo evidenziato, senza link."
    }
   ],
   "demoHTML": "<pura-breadcrumb>\n  <pura-breadcrumb-item href=\"/\">Home</pura-breadcrumb-item>\n  <pura-breadcrumb-item href=\"/produtos\">Prodotti</pura-breadcrumb-item>\n  <pura-breadcrumb-item href=\"/produtos/calcados\">Calzature</pura-breadcrumb-item>\n  <pura-breadcrumb-item current>Scarpe da corsa</pura-breadcrumb-item>\n</pura-breadcrumb>"
  }
 },
 "command": {
  "pt-BR": {
   "description": "Um web component nativo (zero dependências) que renderiza uma paleta de comandos no estilo cmdk: um campo de busca no topo e uma lista rolável de itens abaixo. Digitar filtra os itens por substring, e as setas, Enter e Esc cuidam da navegação por teclado. Use-a para menus de ações rápidas, busca de comandos ou, colocada dentro de um pura-dialog, como um menu de comandos modal.",
   "attributes": [
    {
     "desc": "Texto exibido no campo de busca quando está vazio."
    },
    {
     "desc": "Texto de estado vazio exibido quando nenhum item corresponde à busca."
    },
    {
     "desc": "Consulta de busca atual (reflete o texto digitado no input)."
    },
    {
     "desc": "Em pura-command-item: valor enviado no detalhe do evento e usado na correspondência (recorre ao texto do label se ausente)."
    },
    {
     "desc": "Em pura-command-item: desabilita o item, impedindo a seleção e a correspondência."
    }
   ],
   "demoHTML": "<pura-command id=\"cmd\" placeholder=\"Digite um comando ou pesquise…\" empty=\"Nenhum resultado encontrado.\" style=\"max-width: 420px\">\n  <pura-command-item value=\"novo-arquivo\">\n    Novo arquivo\n    <span slot=\"shortcut\">Ctrl N</span>\n  </pura-command-item>\n  <pura-command-item value=\"abrir\">\n    Abrir…\n    <span slot=\"shortcut\">Ctrl O</span>\n  </pura-command-item>\n  <pura-command-item value=\"salvar\">\n    Salvar\n    <span slot=\"shortcut\">Ctrl S</span>\n  </pura-command-item>\n  <pura-command-item value=\"configuracoes\">\n    Configurações\n    <span slot=\"shortcut\">Ctrl ,</span>\n  </pura-command-item>\n  <pura-command-item value=\"sair\" disabled>\n    Sair\n  </pura-command-item>\n</pura-command>\n\n<script type=\"module\">\n  document.getElementById(\"cmd\").addEventListener(\"command\", (e) => {\n    console.log(\"command:\", e.detail.value, e.detail.label);\n  });\n</script>"
  },
  "fr": {
   "description": "Un web component natif (zéro dépendance) qui affiche une palette de commandes de style cmdk : un champ de recherche en haut et une liste défilante d'éléments en dessous. La saisie filtre les éléments par sous-chaîne, et les touches fléchées, Entrée et Échap gèrent la navigation au clavier. Utilisez-la pour des menus d'actions rapides, la recherche de commandes ou, placée dans un pura-dialog, comme menu de commandes modal.",
   "attributes": [
    {
     "desc": "Texte affiché dans le champ de recherche lorsqu'il est vide."
    },
    {
     "desc": "Texte d'état vide affiché lorsqu'aucun élément ne correspond à la recherche."
    },
    {
     "desc": "Requête de recherche actuelle (reflète le texte saisi dans le champ)."
    },
    {
     "desc": "Sur pura-command-item : valeur envoyée dans le détail de l'événement et utilisée pour la correspondance (se rabat sur le texte du label si absente)."
    },
    {
     "desc": "Sur pura-command-item : désactive l'élément, empêchant sa sélection et sa correspondance."
    }
   ],
   "demoHTML": "<pura-command id=\"cmd\" placeholder=\"Tapez une commande ou recherchez…\" empty=\"Aucun résultat trouvé.\" style=\"max-width: 420px\">\n  <pura-command-item value=\"novo-arquivo\">\n    Nouveau fichier\n    <span slot=\"shortcut\">Ctrl N</span>\n  </pura-command-item>\n  <pura-command-item value=\"abrir\">\n    Ouvrir…\n    <span slot=\"shortcut\">Ctrl O</span>\n  </pura-command-item>\n  <pura-command-item value=\"salvar\">\n    Enregistrer\n    <span slot=\"shortcut\">Ctrl S</span>\n  </pura-command-item>\n  <pura-command-item value=\"configuracoes\">\n    Paramètres\n    <span slot=\"shortcut\">Ctrl ,</span>\n  </pura-command-item>\n  <pura-command-item value=\"sair\" disabled>\n    Quitter\n  </pura-command-item>\n</pura-command>\n\n<script type=\"module\">\n  document.getElementById(\"cmd\").addEventListener(\"command\", (e) => {\n    console.log(\"command:\", e.detail.value, e.detail.label);\n  });\n</script>"
  },
  "de": {
   "description": "Ein natives Web Component (ohne Abhängigkeiten), das eine Befehlspalette im cmdk-Stil rendert: oben ein Suchfeld und darunter eine scrollbare Liste von Elementen. Die Eingabe filtert die Elemente per Teilstring, und die Pfeiltasten, Enter und Esc übernehmen die Tastaturnavigation. Verwenden Sie sie für Schnellaktions-Menüs, die Befehlssuche oder, in einem pura-dialog platziert, als modales Befehlsmenü.",
   "attributes": [
    {
     "desc": "Text, der im Suchfeld angezeigt wird, wenn es leer ist."
    },
    {
     "desc": "Text für den Leerzustand, der angezeigt wird, wenn kein Element der Suche entspricht."
    },
    {
     "desc": "Aktuelle Suchanfrage (spiegelt den im Eingabefeld eingegebenen Text wider)."
    },
    {
     "desc": "An pura-command-item: Wert, der im Ereignisdetail gesendet und für den Abgleich verwendet wird (greift auf den Label-Text zurück, falls nicht vorhanden)."
    },
    {
     "desc": "An pura-command-item: deaktiviert das Element und verhindert Auswahl und Abgleich."
    }
   ],
   "demoHTML": "<pura-command id=\"cmd\" placeholder=\"Befehl eingeben oder suchen…\" empty=\"Keine Ergebnisse gefunden.\" style=\"max-width: 420px\">\n  <pura-command-item value=\"novo-arquivo\">\n    Neue Datei\n    <span slot=\"shortcut\">Ctrl N</span>\n  </pura-command-item>\n  <pura-command-item value=\"abrir\">\n    Öffnen…\n    <span slot=\"shortcut\">Ctrl O</span>\n  </pura-command-item>\n  <pura-command-item value=\"salvar\">\n    Speichern\n    <span slot=\"shortcut\">Ctrl S</span>\n  </pura-command-item>\n  <pura-command-item value=\"configuracoes\">\n    Einstellungen\n    <span slot=\"shortcut\">Ctrl ,</span>\n  </pura-command-item>\n  <pura-command-item value=\"sair\" disabled>\n    Beenden\n  </pura-command-item>\n</pura-command>\n\n<script type=\"module\">\n  document.getElementById(\"cmd\").addEventListener(\"command\", (e) => {\n    console.log(\"command:\", e.detail.value, e.detail.label);\n  });\n</script>"
  },
  "it": {
   "description": "Un web component nativo (zero dipendenze) che renderizza una palette dei comandi in stile cmdk: un campo di ricerca in alto e un elenco scorrevole di elementi sotto. La digitazione filtra gli elementi per sottostringa, e i tasti freccia, Invio ed Esc gestiscono la navigazione da tastiera. Usala per menu di azioni rapide, ricerca di comandi o, posizionata all'interno di un pura-dialog, come menu dei comandi modale.",
   "attributes": [
    {
     "desc": "Testo mostrato nel campo di ricerca quando è vuoto."
    },
    {
     "desc": "Testo dello stato vuoto mostrato quando nessun elemento corrisponde alla ricerca."
    },
    {
     "desc": "Query di ricerca corrente (riflette il testo digitato nell'input)."
    },
    {
     "desc": "Su pura-command-item: valore inviato nel dettaglio dell'evento e usato per la corrispondenza (ricade sul testo del label se assente)."
    },
    {
     "desc": "Su pura-command-item: disabilita l'elemento, impedendone la selezione e la corrispondenza."
    }
   ],
   "demoHTML": "<pura-command id=\"cmd\" placeholder=\"Digita un comando o cerca…\" empty=\"Nessun risultato trovato.\" style=\"max-width: 420px\">\n  <pura-command-item value=\"novo-arquivo\">\n    Nuovo file\n    <span slot=\"shortcut\">Ctrl N</span>\n  </pura-command-item>\n  <pura-command-item value=\"abrir\">\n    Apri…\n    <span slot=\"shortcut\">Ctrl O</span>\n  </pura-command-item>\n  <pura-command-item value=\"salvar\">\n    Salva\n    <span slot=\"shortcut\">Ctrl S</span>\n  </pura-command-item>\n  <pura-command-item value=\"configuracoes\">\n    Impostazioni\n    <span slot=\"shortcut\">Ctrl ,</span>\n  </pura-command-item>\n  <pura-command-item value=\"sair\" disabled>\n    Esci\n  </pura-command-item>\n</pura-command>\n\n<script type=\"module\">\n  document.getElementById(\"cmd\").addEventListener(\"command\", (e) => {\n    console.log(\"command:\", e.detail.value, e.detail.label);\n  });\n</script>"
  }
 },
 "dock": {
  "pt-BR": {
   "description": "O Dock é uma barra arredondada e centralizada de botões de ícone que ampliam (aumentam de escala) suavemente conforme o ponteiro se aproxima, com uma atenuação por cosseno: o item sob o cursor cresce mais e os vizinhos crescem menos. Use-o para navegação rápida de atalhos ou aplicativos, fixado na parte inferior da tela ou inline. Ele inclui uma camada agent-native: o dock expõe role=\"toolbar\" e se registra em window.__puraDocks por data-pura-id, e espelha o estado ao vivo por meio de atributos data-pura-dock-* no host e nos itens, de modo que agentes possam enumerar docks e ler a contagem/rótulos sem tocar no Shadow DOM.",
   "attributes": [
    {
     "desc": "Fixa o dock na parte inferior-central da viewport (position: fixed, bottom-center, z-index 50)."
    },
    {
     "desc": "Escala máxima do item sob o ponteiro. Valores >= 1; valores inválidos voltam para 1.6."
    },
    {
     "desc": "Raio de proximidade em px ao longo do qual a ampliação decai. Maior = mais vizinhos aumentam de escala."
    },
    {
     "desc": "Nome acessível do dock (aria-label da trilha interna com role=toolbar)."
    }
   ],
   "demoHTML": "<pura-dock label=\"Atalhos\" magnify=\"1.7\" reach=\"120\" id=\"meu-dock\">\n  <pura-dock-item label=\"Início\" active>🏠</pura-dock-item>\n  <pura-dock-item label=\"Mensagens\">💬</pura-dock-item>\n  <pura-dock-item label=\"Calendário\">📅</pura-dock-item>\n  <pura-dock-item label=\"Configurações\">⚙️</pura-dock-item>\n  <pura-dock-item label=\"Lixeira\" disabled>🗑️</pura-dock-item>\n</pura-dock>\n<p id=\"dock-status\" style=\"margin-top:1rem;font:14px system-ui;color:#666\">Passe o mouse para ampliar e clique em um item.</p>\n<script type=\"module\">\n  import \"/pura/lib/dock.js\";\n  const status = document.getElementById(\"dock-status\");\n  document.getElementById(\"meu-dock\").addEventListener(\"dock-item-activate\", (e) => {\n    status.textContent = `Abrindo: ${e.detail.label}`;\n  });\n</script>"
  },
  "fr": {
   "description": "Le Dock est une barre arrondie et centrée de boutons à icône qui s'agrandissent (montent en échelle) en douceur à mesure que le pointeur s'approche, avec une atténuation en cosinus : l'élément sous le curseur grandit le plus et ses voisins grandissent moins. Utilisez-le pour une navigation rapide de raccourcis ou d'applications, épinglé en bas de l'écran ou en ligne. Il comprend une couche agent-native : le dock expose role=\"toolbar\" et s'enregistre dans window.__puraDocks via data-pura-id, et il reflète l'état en direct grâce aux attributs data-pura-dock-* sur l'hôte et les éléments, ce qui permet aux agents d'énumérer les docks et de lire le nombre/les libellés sans toucher au Shadow DOM.",
   "attributes": [
    {
     "desc": "Épingle le dock en bas-centre de la viewport (position: fixed, bottom-center, z-index 50)."
    },
    {
     "desc": "Échelle maximale de l'élément sous le pointeur. Valeurs >= 1 ; les valeurs non valides reviennent à 1.6."
    },
    {
     "desc": "Rayon de proximité en px sur lequel l'agrandissement décroît. Plus grand = plus de voisins montent en échelle."
    },
    {
     "desc": "Nom accessible du dock (aria-label de la piste interne avec role=toolbar)."
    }
   ],
   "demoHTML": "<pura-dock label=\"Raccourcis\" magnify=\"1.7\" reach=\"120\" id=\"meu-dock\">\n  <pura-dock-item label=\"Accueil\" active>🏠</pura-dock-item>\n  <pura-dock-item label=\"Messages\">💬</pura-dock-item>\n  <pura-dock-item label=\"Calendrier\">📅</pura-dock-item>\n  <pura-dock-item label=\"Paramètres\">⚙️</pura-dock-item>\n  <pura-dock-item label=\"Corbeille\" disabled>🗑️</pura-dock-item>\n</pura-dock>\n<p id=\"dock-status\" style=\"margin-top:1rem;font:14px system-ui;color:#666\">Survolez pour agrandir et cliquez sur un élément.</p>\n<script type=\"module\">\n  import \"/pura/lib/dock.js\";\n  const status = document.getElementById(\"dock-status\");\n  document.getElementById(\"meu-dock\").addEventListener(\"dock-item-activate\", (e) => {\n    status.textContent = `Ouverture : ${e.detail.label}`;\n  });\n</script>"
  },
  "de": {
   "description": "Das Dock ist eine zentrierte, abgerundete Leiste mit Symbolschaltflächen, die sich sanft vergrößern (hochskalieren), je näher der Zeiger kommt, mit einem Cosinus-Abfall: Das Element unter dem Cursor wächst am stärksten und seine Nachbarn weniger. Verwende es zur schnellen Navigation von Verknüpfungen oder Apps, am unteren Bildschirmrand oder inline angeheftet. Es enthält eine agent-native Schicht: Das Dock stellt role=\"toolbar\" bereit und registriert sich über data-pura-id in window.__puraDocks und spiegelt den Live-Status über data-pura-dock-*-Attribute am Host und an den Elementen wider, sodass Agenten Docks aufzählen und die Anzahl/Beschriftungen lesen können, ohne das Shadow DOM zu berühren.",
   "attributes": [
    {
     "desc": "Heftet das Dock am unteren mittleren Rand der Viewport an (position: fixed, bottom-center, z-index 50)."
    },
    {
     "desc": "Maximale Skalierung des Elements unter dem Zeiger. Werte >= 1; ungültige Werte fallen auf 1.6 zurück."
    },
    {
     "desc": "Näherungsradius in px, über den die Vergrößerung abklingt. Größer = mehr Nachbarn werden skaliert."
    },
    {
     "desc": "Zugänglicher Name des Docks (aria-label der inneren Spur mit role=toolbar)."
    }
   ],
   "demoHTML": "<pura-dock label=\"Verknüpfungen\" magnify=\"1.7\" reach=\"120\" id=\"meu-dock\">\n  <pura-dock-item label=\"Startseite\" active>🏠</pura-dock-item>\n  <pura-dock-item label=\"Nachrichten\">💬</pura-dock-item>\n  <pura-dock-item label=\"Kalender\">📅</pura-dock-item>\n  <pura-dock-item label=\"Einstellungen\">⚙️</pura-dock-item>\n  <pura-dock-item label=\"Papierkorb\" disabled>🗑️</pura-dock-item>\n</pura-dock>\n<p id=\"dock-status\" style=\"margin-top:1rem;font:14px system-ui;color:#666\">Bewegen Sie den Mauszeiger zum Vergrößern und klicken Sie auf ein Element.</p>\n<script type=\"module\">\n  import \"/pura/lib/dock.js\";\n  const status = document.getElementById(\"dock-status\");\n  document.getElementById(\"meu-dock\").addEventListener(\"dock-item-activate\", (e) => {\n    status.textContent = `Wird geöffnet: ${e.detail.label}`;\n  });\n</script>"
  },
  "it": {
   "description": "Il Dock è una barra arrotondata e centrata di pulsanti a icona che si ingrandiscono (aumentano di scala) in modo fluido man mano che il puntatore si avvicina, con un'attenuazione a coseno: l'elemento sotto il cursore cresce di più e i suoi vicini crescono di meno. Usalo per una navigazione rapida di scorciatoie o app, fissato in fondo allo schermo o inline. Include un livello agent-native: il dock espone role=\"toolbar\" e si registra in window.__puraDocks tramite data-pura-id e rispecchia lo stato live attraverso gli attributi data-pura-dock-* sull'host e sugli elementi, così che gli agenti possano enumerare i dock e leggere il conteggio/le etichette senza toccare lo Shadow DOM.",
   "attributes": [
    {
     "desc": "Fissa il dock in basso al centro della viewport (position: fixed, bottom-center, z-index 50)."
    },
    {
     "desc": "Scala massima dell'elemento sotto il puntatore. Valori >= 1; i valori non validi tornano a 1.6."
    },
    {
     "desc": "Raggio di prossimità in px lungo il quale l'ingrandimento decade. Più grande = più vicini aumentano di scala."
    },
    {
     "desc": "Nome accessibile del dock (aria-label della traccia interna con role=toolbar)."
    }
   ],
   "demoHTML": "<pura-dock label=\"Scorciatoie\" magnify=\"1.7\" reach=\"120\" id=\"meu-dock\">\n  <pura-dock-item label=\"Home\" active>🏠</pura-dock-item>\n  <pura-dock-item label=\"Messaggi\">💬</pura-dock-item>\n  <pura-dock-item label=\"Calendario\">📅</pura-dock-item>\n  <pura-dock-item label=\"Impostazioni\">⚙️</pura-dock-item>\n  <pura-dock-item label=\"Cestino\" disabled>🗑️</pura-dock-item>\n</pura-dock>\n<p id=\"dock-status\" style=\"margin-top:1rem;font:14px system-ui;color:#666\">Passa il mouse per ingrandire e clicca su un elemento.</p>\n<script type=\"module\">\n  import \"/pura/lib/dock.js\";\n  const status = document.getElementById(\"dock-status\");\n  document.getElementById(\"meu-dock\").addEventListener(\"dock-item-activate\", (e) => {\n    status.textContent = `Apertura: ${e.detail.label}`;\n  });\n</script>"
  }
 },
 "menubar": {
  "pt-BR": {
   "description": "O Menubar é um web component nativo que constrói uma barra de menus no estilo de aplicativo desktop (role=menubar), em que cada menu abre um painel suspenso baseado na Popover API e no posicionamento por âncora do CSS. Use-o quando precisar de uma barra de comandos horizontal e persistente (Arquivo, Editar, Exibir) no topo de uma aplicação. Ela suporta alternar entre menus abertos ao passar o mouse e navegação completa por teclado (setas, Home/End, Esc).",
   "attributes": [
    {
     "desc": "Texto do gatilho de um <pura-menubar-menu>."
    },
    {
     "desc": "Desabilita um <pura-menubar-menu> ou um <pura-menu-item>, impedindo a abertura/seleção."
    },
    {
     "desc": "Em <pura-menu-item>, reserva espaço de ícone para alinhar itens que não têm ícone."
    },
    {
     "desc": "Refletido em <pura-menubar-menu> quando seu painel está aberto (somente leitura)."
    }
   ],
   "demoHTML": "<pura-menubar id=\"barra\">\n  <pura-menubar-menu label=\"Arquivo\">\n    <pura-menu-item>Novo arquivo<span slot=\"shortcut\">Ctrl+N</span></pura-menu-item>\n    <pura-menu-item>Abrir<span slot=\"shortcut\">Ctrl+O</span></pura-menu-item>\n    <pura-menu-item>Salvar<span slot=\"shortcut\">Ctrl+S</span></pura-menu-item>\n    <pura-menu-item disabled>Salvar como...</pura-menu-item>\n  </pura-menubar-menu>\n  <pura-menubar-menu label=\"Editar\">\n    <pura-menu-item>Desfazer<span slot=\"shortcut\">Ctrl+Z</span></pura-menu-item>\n    <pura-menu-item>Refazer<span slot=\"shortcut\">Ctrl+Y</span></pura-menu-item>\n    <pura-menu-item inset>Copiar</pura-menu-item>\n    <pura-menu-item inset>Colar</pura-menu-item>\n  </pura-menubar-menu>\n  <pura-menubar-menu label=\"Exibir\">\n    <pura-menu-item>Tela cheia<span slot=\"shortcut\">F11</span></pura-menu-item>\n    <pura-menu-item>Zoom +</pura-menu-item>\n  </pura-menubar-menu>\n  <pura-menubar-menu label=\"Ajuda\" disabled></pura-menubar-menu>\n</pura-menubar>\n\n<script type=\"module\">\n  const barra = document.getElementById(\"barra\");\n  barra.addEventListener(\"select\", (e) => {\n    console.log(\"Selected item:\", e.target.textContent.trim());\n  });\n</script>"
  },
  "fr": {
   "description": "Le Menubar est un composant web natif qui construit une barre de menus façon application de bureau (role=menubar), où chaque menu ouvre un panneau déroulant fondé sur la Popover API et le positionnement par ancrage CSS. Utilisez-le lorsque vous avez besoin d'une barre de commandes horizontale et persistante (Fichier, Édition, Affichage) en haut d'une application. Elle prend en charge le basculement entre menus ouverts au survol et la navigation complète au clavier (flèches, Home/End, Échap).",
   "attributes": [
    {
     "desc": "Texte du déclencheur d'un <pura-menubar-menu>."
    },
    {
     "desc": "Désactive un <pura-menubar-menu> ou un <pura-menu-item>, empêchant l'ouverture/la sélection."
    },
    {
     "desc": "Sur <pura-menu-item>, réserve l'espace d'icône pour aligner les éléments sans icône."
    },
    {
     "desc": "Reflété sur <pura-menubar-menu> lorsque son panneau est ouvert (lecture seule)."
    }
   ],
   "demoHTML": "<pura-menubar id=\"barra\">\n  <pura-menubar-menu label=\"Fichier\">\n    <pura-menu-item>Nouveau fichier<span slot=\"shortcut\">Ctrl+N</span></pura-menu-item>\n    <pura-menu-item>Ouvrir<span slot=\"shortcut\">Ctrl+O</span></pura-menu-item>\n    <pura-menu-item>Enregistrer<span slot=\"shortcut\">Ctrl+S</span></pura-menu-item>\n    <pura-menu-item disabled>Enregistrer sous...</pura-menu-item>\n  </pura-menubar-menu>\n  <pura-menubar-menu label=\"Édition\">\n    <pura-menu-item>Annuler<span slot=\"shortcut\">Ctrl+Z</span></pura-menu-item>\n    <pura-menu-item>Rétablir<span slot=\"shortcut\">Ctrl+Y</span></pura-menu-item>\n    <pura-menu-item inset>Copier</pura-menu-item>\n    <pura-menu-item inset>Coller</pura-menu-item>\n  </pura-menubar-menu>\n  <pura-menubar-menu label=\"Affichage\">\n    <pura-menu-item>Plein écran<span slot=\"shortcut\">F11</span></pura-menu-item>\n    <pura-menu-item>Zoom +</pura-menu-item>\n  </pura-menubar-menu>\n  <pura-menubar-menu label=\"Aide\" disabled></pura-menubar-menu>\n</pura-menubar>\n\n<script type=\"module\">\n  const barra = document.getElementById(\"barra\");\n  barra.addEventListener(\"select\", (e) => {\n    console.log(\"Selected item:\", e.target.textContent.trim());\n  });\n</script>"
  },
  "de": {
   "description": "Menubar ist eine native Web Component, die eine Menüleiste im Stil einer Desktop-Anwendung erstellt (role=menubar), bei der jedes Menü ein Dropdown-Panel öffnet, das auf der Popover API und der CSS-Anchor-Positionierung aufbaut. Verwende sie, wenn du eine dauerhafte horizontale Befehlsleiste (Datei, Bearbeiten, Ansicht) am oberen Rand einer Anwendung benötigst. Sie unterstützt das Wechseln zwischen geöffneten Menüs beim Überfahren mit der Maus und die vollständige Tastaturnavigation (Pfeile, Home/End, Esc).",
   "attributes": [
    {
     "desc": "Auslösetext eines <pura-menubar-menu>."
    },
    {
     "desc": "Deaktiviert ein <pura-menubar-menu> oder ein <pura-menu-item> und verhindert das Öffnen/Auswählen."
    },
    {
     "desc": "Reserviert bei <pura-menu-item> Platz für ein Symbol, um Elemente ohne Symbol auszurichten."
    },
    {
     "desc": "Wird an <pura-menubar-menu> gespiegelt, wenn dessen Panel geöffnet ist (schreibgeschützt)."
    }
   ],
   "demoHTML": "<pura-menubar id=\"barra\">\n  <pura-menubar-menu label=\"Datei\">\n    <pura-menu-item>Neue Datei<span slot=\"shortcut\">Ctrl+N</span></pura-menu-item>\n    <pura-menu-item>Öffnen<span slot=\"shortcut\">Ctrl+O</span></pura-menu-item>\n    <pura-menu-item>Speichern<span slot=\"shortcut\">Ctrl+S</span></pura-menu-item>\n    <pura-menu-item disabled>Speichern unter...</pura-menu-item>\n  </pura-menubar-menu>\n  <pura-menubar-menu label=\"Bearbeiten\">\n    <pura-menu-item>Rückgängig<span slot=\"shortcut\">Ctrl+Z</span></pura-menu-item>\n    <pura-menu-item>Wiederholen<span slot=\"shortcut\">Ctrl+Y</span></pura-menu-item>\n    <pura-menu-item inset>Kopieren</pura-menu-item>\n    <pura-menu-item inset>Einfügen</pura-menu-item>\n  </pura-menubar-menu>\n  <pura-menubar-menu label=\"Ansicht\">\n    <pura-menu-item>Vollbild<span slot=\"shortcut\">F11</span></pura-menu-item>\n    <pura-menu-item>Zoom +</pura-menu-item>\n  </pura-menubar-menu>\n  <pura-menubar-menu label=\"Hilfe\" disabled></pura-menubar-menu>\n</pura-menubar>\n\n<script type=\"module\">\n  const barra = document.getElementById(\"barra\");\n  barra.addEventListener(\"select\", (e) => {\n    console.log(\"Selected item:\", e.target.textContent.trim());\n  });\n</script>"
  },
  "it": {
   "description": "Menubar è un web component nativo che costruisce una barra dei menu in stile applicazione desktop (role=menubar), in cui ogni menu apre un pannello a discesa basato sulla Popover API e sul posizionamento ad ancora di CSS. Usalo quando hai bisogno di una barra di comandi orizzontale e persistente (File, Modifica, Visualizza) in cima a un'applicazione. Supporta il passaggio tra menu aperti al passaggio del mouse e la navigazione completa da tastiera (frecce, Home/End, Esc).",
   "attributes": [
    {
     "desc": "Testo del trigger di un <pura-menubar-menu>."
    },
    {
     "desc": "Disabilita un <pura-menubar-menu> o un <pura-menu-item>, impedendone l'apertura/la selezione."
    },
    {
     "desc": "Su <pura-menu-item>, riserva lo spazio per l'icona per allineare gli elementi privi di icona."
    },
    {
     "desc": "Riflesso su <pura-menubar-menu> quando il suo pannello è aperto (sola lettura)."
    }
   ],
   "demoHTML": "<pura-menubar id=\"barra\">\n  <pura-menubar-menu label=\"File\">\n    <pura-menu-item>Nuovo file<span slot=\"shortcut\">Ctrl+N</span></pura-menu-item>\n    <pura-menu-item>Apri<span slot=\"shortcut\">Ctrl+O</span></pura-menu-item>\n    <pura-menu-item>Salva<span slot=\"shortcut\">Ctrl+S</span></pura-menu-item>\n    <pura-menu-item disabled>Salva con nome...</pura-menu-item>\n  </pura-menubar-menu>\n  <pura-menubar-menu label=\"Modifica\">\n    <pura-menu-item>Annulla<span slot=\"shortcut\">Ctrl+Z</span></pura-menu-item>\n    <pura-menu-item>Ripeti<span slot=\"shortcut\">Ctrl+Y</span></pura-menu-item>\n    <pura-menu-item inset>Copia</pura-menu-item>\n    <pura-menu-item inset>Incolla</pura-menu-item>\n  </pura-menubar-menu>\n  <pura-menubar-menu label=\"Visualizza\">\n    <pura-menu-item>Schermo intero<span slot=\"shortcut\">F11</span></pura-menu-item>\n    <pura-menu-item>Zoom +</pura-menu-item>\n  </pura-menubar-menu>\n  <pura-menubar-menu label=\"Aiuto\" disabled></pura-menubar-menu>\n</pura-menubar>\n\n<script type=\"module\">\n  const barra = document.getElementById(\"barra\");\n  barra.addEventListener(\"select\", (e) => {\n    console.log(\"Selected item:\", e.target.textContent.trim());\n  });\n</script>"
  }
 },
 "navigation-menu": {
  "pt-BR": {
   "description": "O Navigation Menu é um web component nativo (sem dependências) que renderiza uma barra de navegação horizontal com role=navigation. Cada item pode ser um link simples (com href) ou um gatilho que abre um painel de conteúdo rico abaixo dele, usando a Popover API nativa e o posicionamento por âncora do CSS. Use-o quando precisar de um menu superior de site com submenus, mantendo apenas um painel aberto por vez e navegação completa por teclado.",
   "attributes": [
    {
     "desc": "Texto do gatilho do item (pura-navigation-menu-item)."
    },
    {
     "desc": "Se presente, o item se torna um link simples (âncora) em vez de abrir um painel."
    },
    {
     "desc": "Reflete se o painel do item está aberto; também legível pela propriedade .open."
    },
    {
     "desc": "Rótulo acessível da barra (pura-navigation-menu); o padrão é \"Main\" se omitido."
    }
   ],
   "demoHTML": "<pura-navigation-menu aria-label=\"Principal\">\n  <pura-navigation-menu-item label=\"Produtos\">\n    <div style=\"display:grid;gap:.5rem;min-width:16rem\">\n      <a href=\"#editor\">Editor</a>\n      <a href=\"#analytics\">Análises</a>\n      <a href=\"#automacoes\">Automações</a>\n    </div>\n  </pura-navigation-menu-item>\n  <pura-navigation-menu-item label=\"Recursos\">\n    <div style=\"display:grid;gap:.5rem;min-width:16rem\">\n      <a href=\"#docs\">Documentação</a>\n      <a href=\"#guias\">Guias</a>\n      <a href=\"#blog\">Blog</a>\n    </div>\n  </pura-navigation-menu-item>\n  <pura-navigation-menu-item label=\"Preços\" href=\"#precos\"></pura-navigation-menu-item>\n</pura-navigation-menu>"
  },
  "fr": {
   "description": "Le Navigation Menu est un composant web natif (sans dépendances) qui affiche une barre de navigation horizontale avec role=navigation. Chaque élément peut être un lien simple (avec href) ou un déclencheur qui ouvre un panneau de contenu riche en dessous, à l'aide de la Popover API native et du positionnement par ancrage CSS. Utilisez-le lorsque vous avez besoin d'un menu supérieur de site avec des sous-menus, en gardant un seul panneau ouvert à la fois et une navigation complète au clavier.",
   "attributes": [
    {
     "desc": "Texte du déclencheur de l'élément (pura-navigation-menu-item)."
    },
    {
     "desc": "S'il est présent, l'élément devient un lien simple (ancre) au lieu d'ouvrir un panneau."
    },
    {
     "desc": "Reflète si le panneau de l'élément est ouvert ; lisible aussi via la propriété .open."
    },
    {
     "desc": "Libellé accessible de la barre (pura-navigation-menu) ; vaut \"Main\" par défaut s'il est omis."
    }
   ],
   "demoHTML": "<pura-navigation-menu aria-label=\"Principal\">\n  <pura-navigation-menu-item label=\"Produits\">\n    <div style=\"display:grid;gap:.5rem;min-width:16rem\">\n      <a href=\"#editor\">Éditeur</a>\n      <a href=\"#analytics\">Analytique</a>\n      <a href=\"#automacoes\">Automatisations</a>\n    </div>\n  </pura-navigation-menu-item>\n  <pura-navigation-menu-item label=\"Ressources\">\n    <div style=\"display:grid;gap:.5rem;min-width:16rem\">\n      <a href=\"#docs\">Documentation</a>\n      <a href=\"#guias\">Guides</a>\n      <a href=\"#blog\">Blog</a>\n    </div>\n  </pura-navigation-menu-item>\n  <pura-navigation-menu-item label=\"Tarifs\" href=\"#precos\"></pura-navigation-menu-item>\n</pura-navigation-menu>"
  },
  "de": {
   "description": "Das Navigation Menu ist eine native Web Component (ohne Abhängigkeiten), die eine horizontale Navigationsleiste mit role=navigation rendert. Jedes Element kann ein einfacher Link (mit href) oder ein Auslöser sein, der darunter ein Panel mit reichhaltigem Inhalt öffnet, über die native Popover API und die CSS-Anchor-Positionierung. Verwende es, wenn du ein oberes Website-Menü mit Untermenüs benötigst, wobei jeweils nur ein Panel geöffnet bleibt und die vollständige Tastaturnavigation unterstützt wird.",
   "attributes": [
    {
     "desc": "Auslösetext des Elements (pura-navigation-menu-item)."
    },
    {
     "desc": "Wenn vorhanden, wird das Element zu einem einfachen Link (Anker), anstatt ein Panel zu öffnen."
    },
    {
     "desc": "Gibt wieder, ob das Panel des Elements geöffnet ist; auch über die Eigenschaft .open lesbar."
    },
    {
     "desc": "Zugängliche Beschriftung der Leiste (pura-navigation-menu); standardmäßig \"Main\", falls weggelassen."
    }
   ],
   "demoHTML": "<pura-navigation-menu aria-label=\"Hauptmenü\">\n  <pura-navigation-menu-item label=\"Produkte\">\n    <div style=\"display:grid;gap:.5rem;min-width:16rem\">\n      <a href=\"#editor\">Editor</a>\n      <a href=\"#analytics\">Analysen</a>\n      <a href=\"#automacoes\">Automatisierungen</a>\n    </div>\n  </pura-navigation-menu-item>\n  <pura-navigation-menu-item label=\"Ressourcen\">\n    <div style=\"display:grid;gap:.5rem;min-width:16rem\">\n      <a href=\"#docs\">Dokumentation</a>\n      <a href=\"#guias\">Anleitungen</a>\n      <a href=\"#blog\">Blog</a>\n    </div>\n  </pura-navigation-menu-item>\n  <pura-navigation-menu-item label=\"Preise\" href=\"#precos\"></pura-navigation-menu-item>\n</pura-navigation-menu>"
  },
  "it": {
   "description": "Il Navigation Menu è un web component nativo (senza dipendenze) che esegue il rendering di una barra di navigazione orizzontale con role=navigation. Ogni elemento può essere un semplice link (con href) o un trigger che apre sotto di sé un pannello di contenuto ricco, usando la Popover API nativa e il posizionamento ad ancora di CSS. Usalo quando hai bisogno di un menu superiore del sito con sottomenu, mantenendo aperto un solo pannello alla volta e con navigazione completa da tastiera.",
   "attributes": [
    {
     "desc": "Testo del trigger dell'elemento (pura-navigation-menu-item)."
    },
    {
     "desc": "Se presente, l'elemento diventa un semplice link (ancora) anziché aprire un pannello."
    },
    {
     "desc": "Riflette se il pannello dell'elemento è aperto; leggibile anche tramite la proprietà .open."
    },
    {
     "desc": "Etichetta accessibile della barra (pura-navigation-menu); il valore predefinito è \"Main\" se omessa."
    }
   ],
   "demoHTML": "<pura-navigation-menu aria-label=\"Principale\">\n  <pura-navigation-menu-item label=\"Prodotti\">\n    <div style=\"display:grid;gap:.5rem;min-width:16rem\">\n      <a href=\"#editor\">Editor</a>\n      <a href=\"#analytics\">Analisi</a>\n      <a href=\"#automacoes\">Automazioni</a>\n    </div>\n  </pura-navigation-menu-item>\n  <pura-navigation-menu-item label=\"Risorse\">\n    <div style=\"display:grid;gap:.5rem;min-width:16rem\">\n      <a href=\"#docs\">Documentazione</a>\n      <a href=\"#guias\">Guide</a>\n      <a href=\"#blog\">Blog</a>\n    </div>\n  </pura-navigation-menu-item>\n  <pura-navigation-menu-item label=\"Prezzi\" href=\"#precos\"></pura-navigation-menu-item>\n</pura-navigation-menu>"
  }
 },
 "pagination": {
  "pt-BR": {
   "description": "O Pagination é um web component nativo que renderiza controles de paginação: um botão Anterior, números de página com truncamento por reticências (primeira, última, atual e vizinhas) e um botão Próximo. Use-o quando precisar dividir listas ou tabelas longas em páginas. Ao clicar em uma página, ele dispara o evento change e atualiza o atributo page automaticamente.",
   "attributes": [
    {
     "desc": "Número total de páginas. Valores inválidos ou menores que 1 voltam para 1."
    },
    {
     "desc": "Página atual, começando em 1. Limitada ao intervalo entre 1 e total."
    }
   ],
   "demoHTML": "<pura-pagination id=\"paginacao\" total=\"10\" page=\"3\"></pura-pagination>\n\n<script type=\"module\">\n  const paginacao = document.getElementById(\"paginacao\");\n  paginacao.addEventListener(\"change\", (e) => {\n    console.log(\"Selected page:\", e.detail.page);\n  });\n</script>"
  },
  "fr": {
   "description": "Le Pagination est un composant web natif qui affiche des contrôles de pagination : un bouton Précédent, des numéros de page avec troncature par points de suspension (première, dernière, actuelle et voisines) et un bouton Suivant. Utilisez-le lorsque vous devez répartir de longues listes ou tableaux en pages. Lorsqu'on clique sur une page, il déclenche l'événement change et met à jour l'attribut page automatiquement.",
   "attributes": [
    {
     "desc": "Nombre total de pages. Les valeurs non valides ou inférieures à 1 reviennent à 1."
    },
    {
     "desc": "Page actuelle, à partir de 1. Bornée à la plage comprise entre 1 et total."
    }
   ],
   "demoHTML": "<pura-pagination id=\"paginacao\" total=\"10\" page=\"3\"></pura-pagination>\n\n<script type=\"module\">\n  const paginacao = document.getElementById(\"paginacao\");\n  paginacao.addEventListener(\"change\", (e) => {\n    console.log(\"Selected page:\", e.detail.page);\n  });\n</script>"
  },
  "de": {
   "description": "Pagination ist eine native Web Component, die Paginierungssteuerungen rendert: eine Schaltfläche Zurück, Seitenzahlen mit Kürzung durch Auslassungspunkte (erste, letzte, aktuelle und benachbarte) und eine Schaltfläche Weiter. Verwende sie, wenn du lange Listen oder Tabellen auf Seiten aufteilen musst. Beim Klick auf eine Seite löst sie das change-Ereignis aus und aktualisiert das page-Attribut automatisch.",
   "attributes": [
    {
     "desc": "Gesamtzahl der Seiten. Ungültige Werte oder Werte kleiner als 1 fallen auf 1 zurück."
    },
    {
     "desc": "Aktuelle Seite, beginnend bei 1. Auf den Bereich zwischen 1 und total begrenzt."
    }
   ],
   "demoHTML": "<pura-pagination id=\"paginacao\" total=\"10\" page=\"3\"></pura-pagination>\n\n<script type=\"module\">\n  const paginacao = document.getElementById(\"paginacao\");\n  paginacao.addEventListener(\"change\", (e) => {\n    console.log(\"Selected page:\", e.detail.page);\n  });\n</script>"
  },
  "it": {
   "description": "Pagination è un web component nativo che esegue il rendering dei controlli di paginazione: un pulsante Precedente, i numeri di pagina con troncamento tramite puntini di sospensione (prima, ultima, corrente e adiacenti) e un pulsante Successivo. Usalo quando devi suddividere in pagine elenchi o tabelle lunghi. Quando si fa clic su una pagina, emette l'evento change e aggiorna automaticamente l'attributo page.",
   "attributes": [
    {
     "desc": "Numero totale di pagine. I valori non validi o inferiori a 1 tornano a 1."
    },
    {
     "desc": "Pagina corrente, a partire da 1. Limitata all'intervallo tra 1 e total."
    }
   ],
   "demoHTML": "<pura-pagination id=\"paginacao\" total=\"10\" page=\"3\"></pura-pagination>\n\n<script type=\"module\">\n  const paginacao = document.getElementById(\"paginacao\");\n  paginacao.addEventListener(\"change\", (e) => {\n    console.log(\"Selected page:\", e.detail.page);\n  });\n</script>"
  }
 },
 "scroll-area": {
  "pt-BR": {
   "description": "O Scroll Area é um web component nativo que cria uma área de rolagem com uma barra de rolagem fina e temática, consistente entre os navegadores. Use-o quando precisar limitar a altura de um bloco de conteúdo (listas, textos longos, menus) e tornar o overflow rolável sem perder o estilo visual da biblioteca. A viewport é focável e exibe um anel de foco acessível.",
   "attributes": [
    {
     "desc": "Define a altura máxima da viewport (qualquer unidade CSS); sem ele, o padrão é 18rem."
    },
    {
     "desc": "Quando presente, habilita a rolagem horizontal; caso contrário, o overflow horizontal fica oculto."
    }
   ],
   "demoHTML": "<pura-scroll-area height=\"12rem\">\n  <h3 style=\"margin:0 0 .5rem\">Termos de uso</h3>\n  <p>Ao utilizar este serviço, você concorda com as condições descritas a seguir.</p>\n  <p>O conteúdo fornecido tem caráter informativo e pode ser atualizado a qualquer momento.</p>\n  <p>Os dados pessoais são tratados de acordo com as leis de proteção de dados aplicáveis.</p>\n  <p>Cookies são utilizados para melhorar a experiência de navegação na plataforma.</p>\n  <p>Em caso de dúvidas, entre em contato com a nossa equipe de suporte.</p>\n  <p>Estes termos podem ser revisados periodicamente sem aviso prévio.</p>\n</pura-scroll-area>"
  },
  "fr": {
   "description": "Le Scroll Area est un composant web natif qui crée une zone de défilement avec une barre de défilement fine et thématisée, cohérente d'un navigateur à l'autre. Utilisez-le lorsque vous devez plafonner la hauteur d'un bloc de contenu (listes, textes longs, menus) et rendre le débordement défilable sans perdre le style visuel de la bibliothèque. La viewport est focalisable et affiche un anneau de focus accessible.",
   "attributes": [
    {
     "desc": "Définit la hauteur maximale de la viewport (n'importe quelle unité CSS) ; sans cela, la valeur par défaut est 18rem."
    },
    {
     "desc": "Lorsqu'il est présent, active le défilement horizontal ; sinon, le débordement horizontal est masqué."
    }
   ],
   "demoHTML": "<pura-scroll-area height=\"12rem\">\n  <h3 style=\"margin:0 0 .5rem\">Conditions d'utilisation</h3>\n  <p>En utilisant ce service, vous acceptez les conditions décrites ci-dessous.</p>\n  <p>Le contenu fourni est à titre informatif et peut être mis à jour à tout moment.</p>\n  <p>Les données personnelles sont traitées conformément aux lois applicables sur la protection des données.</p>\n  <p>Des cookies sont utilisés pour améliorer l'expérience de navigation sur la plateforme.</p>\n  <p>Pour toute question, veuillez contacter notre équipe d'assistance.</p>\n  <p>Ces conditions peuvent être révisées périodiquement sans préavis.</p>\n</pura-scroll-area>"
  },
  "de": {
   "description": "Scroll Area ist eine native Web Component, die einen Scrollbereich mit einer dünnen, themengestalteten Bildlaufleiste erstellt, die über Browser hinweg konsistent ist. Verwende es, wenn du die Höhe eines Inhaltsblocks (Listen, lange Texte, Menüs) begrenzen und den Überlauf scrollbar machen möchtest, ohne den visuellen Stil der Bibliothek zu verlieren. Die Viewport ist fokussierbar und zeigt einen zugänglichen Fokusring.",
   "attributes": [
    {
     "desc": "Legt die maximale Höhe der Viewport fest (jede CSS-Einheit); ohne diese ist der Standardwert 18rem."
    },
    {
     "desc": "Wenn vorhanden, wird horizontales Scrollen aktiviert; andernfalls wird der horizontale Überlauf ausgeblendet."
    }
   ],
   "demoHTML": "<pura-scroll-area height=\"12rem\">\n  <h3 style=\"margin:0 0 .5rem\">Nutzungsbedingungen</h3>\n  <p>Durch die Nutzung dieses Dienstes erklären Sie sich mit den nachfolgend beschriebenen Bedingungen einverstanden.</p>\n  <p>Die bereitgestellten Inhalte dienen zu Informationszwecken und können jederzeit aktualisiert werden.</p>\n  <p>Personenbezogene Daten werden in Übereinstimmung mit den geltenden Datenschutzgesetzen verarbeitet.</p>\n  <p>Cookies werden verwendet, um das Surferlebnis auf der Plattform zu verbessern.</p>\n  <p>Bei Fragen wenden Sie sich bitte an unser Support-Team.</p>\n  <p>Diese Bedingungen können regelmäßig ohne vorherige Ankündigung überarbeitet werden.</p>\n</pura-scroll-area>"
  },
  "it": {
   "description": "Scroll Area è un web component nativo che crea un'area di scorrimento con una barra di scorrimento sottile e a tema, coerente tra i browser. Usalo quando devi limitare l'altezza di un blocco di contenuto (elenchi, testi lunghi, menu) e rendere scorrevole l'overflow senza perdere lo stile visivo della libreria. La viewport è focalizzabile e mostra un anello di focus accessibile.",
   "attributes": [
    {
     "desc": "Imposta l'altezza massima della viewport (qualsiasi unità CSS); senza di esso, il valore predefinito è 18rem."
    },
    {
     "desc": "Quando presente, abilita lo scorrimento orizzontale; altrimenti l'overflow orizzontale viene nascosto."
    }
   ],
   "demoHTML": "<pura-scroll-area height=\"12rem\">\n  <h3 style=\"margin:0 0 .5rem\">Termini di utilizzo</h3>\n  <p>Utilizzando questo servizio, accetti le condizioni descritte di seguito.</p>\n  <p>Il contenuto fornito ha carattere informativo e può essere aggiornato in qualsiasi momento.</p>\n  <p>I dati personali sono trattati in conformità con le leggi applicabili sulla protezione dei dati.</p>\n  <p>I cookie sono utilizzati per migliorare l'esperienza di navigazione sulla piattaforma.</p>\n  <p>In caso di domande, contatta il nostro team di assistenza.</p>\n  <p>Questi termini possono essere rivisti periodicamente senza preavviso.</p>\n</pura-scroll-area>"
  }
 },
 "scroll-progress": {
  "pt-BR": {
   "description": "Um indicador de progresso de leitura que acompanha a posição de rolagem do documento e atualiza a largura do preenchimento via requestAnimationFrame nos eventos de scroll e resize. Use-o no topo de artigos e páginas longas para mostrar quanto falta para chegar ao fim. Ele tem uma camada agent-native: atributos data-pura-scroll-progress-* refletem ao vivo a porcentagem e os deslocamentos em pixels, e cada instância se registra em window.__puraScrollProgress por seu data-pura-id, permitindo que um agente leia o progresso sem percorrer o DOM.",
   "attributes": [
    {
     "desc": "Cor de preenchimento da barra (qualquer cor CSS válida). A trilha permanece transparente."
    },
    {
     "desc": "Espessura da barra (qualquer comprimento CSS válido, por exemplo: \"3px\", \"0.25rem\")."
    }
   ],
   "demoHTML": "<pura-scroll-progress color=\"#7c3aed\" height=\"5px\"></pura-scroll-progress>\n\n<article style=\"max-width:640px;margin:0 auto;padding:24px;font-family:system-ui,sans-serif;line-height:1.7\">\n  <h1>A história do café no Brasil</h1>\n  <p id=\"status\" style=\"color:#7c3aed;font-weight:600\">Progresso de leitura: 0%</p>\n  <p>O café chegou ao Brasil em 1727, trazido da região vizinha da Guiana Francesa. Role a página para baixo e observe a barra roxa no topo da janela se preencher conforme você avança pelo texto.</p>\n  <p>Em poucas décadas, as plantações se espalharam pelo Vale do Paraíba e, mais tarde, pelo oeste de São Paulo, transformando a economia do país.</p>\n  <p>O ciclo do café financiou ferrovias, portos e a imigração europeia, moldando cidades inteiras ao redor da rota do grão.</p>\n  <p>Já no século XX, o Brasil era o maior produtor do mundo, posição que mantém até hoje, com os cafés especiais cada vez mais valorizados.</p>\n  <p>Continue rolando para ver a barra chegar perto de 100% no fim do texto.</p>\n  <p>O aroma das torrefações artesanais virou símbolo de regiões como o Sul de Minas, o Cerrado Mineiro e a Mogiana.</p>\n  <p>Hoje, o consumo interno cresce junto com as exportações, e o ritual do café segue parte do dia a dia dos brasileiros.</p>\n  <p>Fim da leitura. A barra deve estar completa agora.</p>\n</article>\n\n<script type=\"module\">\n  const bar = document.querySelector('pura-scroll-progress');\n  const status = document.getElementById('status');\n  bar.addEventListener('pura-scroll-progress', (e) => {\n    status.textContent = 'Progresso de leitura: ' + e.detail.percent + '%';\n  });\n</script>"
  },
  "fr": {
   "description": "Un indicateur de progression de lecture qui suit la position de défilement du document et met à jour la largeur du remplissage via requestAnimationFrame lors des événements de défilement et de redimensionnement. Utilisez-le en haut des articles et des pages longues pour montrer ce qu'il reste avant la fin. Il possède une couche agent-native : les attributs data-pura-scroll-progress-* reflètent en direct le pourcentage et les décalages en pixels, et chaque instance s'enregistre dans window.__puraScrollProgress par son data-pura-id, permettant à un agent de lire la progression sans parcourir le DOM.",
   "attributes": [
    {
     "desc": "Couleur de remplissage de la barre (n'importe quelle couleur CSS valide). La piste reste transparente."
    },
    {
     "desc": "Épaisseur de la barre (n'importe quelle longueur CSS valide, par exemple : \"3px\", \"0.25rem\")."
    }
   ],
   "demoHTML": "<pura-scroll-progress color=\"#7c3aed\" height=\"5px\"></pura-scroll-progress>\n\n<article style=\"max-width:640px;margin:0 auto;padding:24px;font-family:system-ui,sans-serif;line-height:1.7\">\n  <h1>L'histoire du café au Brésil</h1>\n  <p id=\"status\" style=\"color:#7c3aed;font-weight:600\">Progression de lecture : 0%</p>\n  <p>Le café est arrivé au Brésil en 1727, apporté de la région voisine de la Guyane française. Faites défiler la page vers le bas et regardez la barre violette en haut de la fenêtre se remplir à mesure que vous avancez dans le texte.</p>\n  <p>En quelques décennies, les plantations se sont répandues dans la vallée du Paraíba puis, plus tard, dans l'ouest de São Paulo, transformant l'économie du pays.</p>\n  <p>Le cycle du café a financé les chemins de fer, les ports et l'immigration européenne, façonnant des villes entières autour de la route du grain.</p>\n  <p>Dès le XXe siècle, le Brésil était déjà le premier producteur mondial, une position qu'il conserve encore aujourd'hui, avec des cafés de spécialité de plus en plus appréciés.</p>\n  <p>Continuez à faire défiler pour voir la barre atteindre près de 100 % à la fin du texte.</p>\n  <p>L'arôme des torréfactions artisanales est devenu un symbole de régions telles que le Sud du Minas, le Cerrado Mineiro et la Mogiana.</p>\n  <p>Aujourd'hui, la consommation intérieure progresse de pair avec les exportations, et le rituel du café reste ancré dans le quotidien des Brésiliens.</p>\n  <p>Fin de la lecture. La barre devrait maintenant être complète.</p>\n</article>\n\n<script type=\"module\">\n  const bar = document.querySelector('pura-scroll-progress');\n  const status = document.getElementById('status');\n  bar.addEventListener('pura-scroll-progress', (e) => {\n    status.textContent = 'Progression de lecture : ' + e.detail.percent + '%';\n  });\n</script>"
  },
  "de": {
   "description": "Ein Lesefortschritts-Indikator, der die Scrollposition des Dokuments verfolgt und die Füllbreite über requestAnimationFrame bei Scroll- und Resize-Ereignissen aktualisiert. Verwende ihn am Anfang von Artikeln und langen Seiten, um anzuzeigen, wie viel bis zum Ende noch übrig ist. Er besitzt eine agent-native Schicht: data-pura-scroll-progress-*-Attribute spiegeln den Prozentsatz und die Pixel-Versätze live wider, und jede Instanz registriert sich über ihre data-pura-id in window.__puraScrollProgress, sodass ein Agent den Fortschritt lesen kann, ohne das DOM zu durchlaufen.",
   "attributes": [
    {
     "desc": "Füllfarbe der Leiste (jede gültige CSS-Farbe). Die Spur bleibt transparent."
    },
    {
     "desc": "Dicke der Leiste (jede gültige CSS-Länge, zum Beispiel: \"3px\", \"0.25rem\")."
    }
   ],
   "demoHTML": "<pura-scroll-progress color=\"#7c3aed\" height=\"5px\"></pura-scroll-progress>\n\n<article style=\"max-width:640px;margin:0 auto;padding:24px;font-family:system-ui,sans-serif;line-height:1.7\">\n  <h1>Die Geschichte des Kaffees in Brasilien</h1>\n  <p id=\"status\" style=\"color:#7c3aed;font-weight:600\">Lesefortschritt: 0%</p>\n  <p>Der Kaffee kam 1727 nach Brasilien, gebracht aus der benachbarten Region Französisch-Guayana. Scrollen Sie die Seite nach unten und beobachten Sie, wie sich der violette Balken oben im Fenster füllt, während Sie sich durch den Text bewegen.</p>\n  <p>Innerhalb weniger Jahrzehnte breiteten sich die Plantagen über das Paraíba-Tal und später über den Westen von São Paulo aus und veränderten die Wirtschaft des Landes.</p>\n  <p>Der Kaffeezyklus finanzierte Eisenbahnen, Häfen und die europäische Einwanderung und prägte ganze Städte rund um die Route der Bohne.</p>\n  <p>Bereits im 20. Jahrhundert war Brasilien der größte Produzent der Welt, eine Position, die es bis heute innehat, wobei Spezialitätenkaffees immer mehr geschätzt werden.</p>\n  <p>Scrollen Sie weiter, um zu sehen, wie der Balken am Ende des Textes nahe an 100 % gelangt.</p>\n  <p>Das Aroma handwerklicher Röstereien wurde zum Symbol für Regionen wie Süd-Minas, den Cerrado Mineiro und die Mogiana.</p>\n  <p>Heute wächst der Inlandsverbrauch parallel zu den Exporten, und das Kaffeeritual bleibt Teil des brasilianischen Alltags.</p>\n  <p>Ende der Lektüre. Der Balken sollte jetzt vollständig sein.</p>\n</article>\n\n<script type=\"module\">\n  const bar = document.querySelector('pura-scroll-progress');\n  const status = document.getElementById('status');\n  bar.addEventListener('pura-scroll-progress', (e) => {\n    status.textContent = 'Lesefortschritt: ' + e.detail.percent + '%';\n  });\n</script>"
  },
  "it": {
   "description": "Un indicatore di avanzamento della lettura che tiene traccia della posizione di scorrimento del documento e aggiorna la larghezza del riempimento tramite requestAnimationFrame in occasione degli eventi di scorrimento e ridimensionamento. Usalo in cima ad articoli e pagine lunghe per mostrare quanto manca per arrivare alla fine. Ha un livello agent-native: gli attributi data-pura-scroll-progress-* riflettono in tempo reale la percentuale e gli offset in pixel, e ogni istanza si registra in window.__puraScrollProgress tramite il suo data-pura-id, consentendo a un agente di leggere l'avanzamento senza attraversare il DOM.",
   "attributes": [
    {
     "desc": "Colore di riempimento della barra (qualsiasi colore CSS valido). La traccia resta trasparente."
    },
    {
     "desc": "Spessore della barra (qualsiasi lunghezza CSS valida, ad esempio: \"3px\", \"0.25rem\")."
    }
   ],
   "demoHTML": "<pura-scroll-progress color=\"#7c3aed\" height=\"5px\"></pura-scroll-progress>\n\n<article style=\"max-width:640px;margin:0 auto;padding:24px;font-family:system-ui,sans-serif;line-height:1.7\">\n  <h1>La storia del caffè in Brasile</h1>\n  <p id=\"status\" style=\"color:#7c3aed;font-weight:600\">Avanzamento della lettura: 0%</p>\n  <p>Il caffè arrivò in Brasile nel 1727, portato dalla vicina regione della Guyana francese. Scorri la pagina verso il basso e osserva la barra viola in alto nella finestra riempirsi man mano che avanzi nel testo.</p>\n  <p>In poche decine di anni, le piantagioni si diffusero nella Valle del Paraíba e, più tardi, nella parte occidentale di San Paolo, trasformando l'economia del paese.</p>\n  <p>Il ciclo del caffè finanziò ferrovie, porti e l'immigrazione europea, plasmando intere città attorno alla rotta del chicco.</p>\n  <p>Già nel XX secolo, il Brasile era il maggior produttore al mondo, posizione che mantiene ancora oggi, con i caffè specialty sempre più apprezzati.</p>\n  <p>Continua a scorrere per vedere la barra avvicinarsi al 100% alla fine del testo.</p>\n  <p>L'aroma delle torrefazioni artigianali è diventato un simbolo di regioni come il Sud del Minas, il Cerrado Mineiro e la Mogiana.</p>\n  <p>Oggi il consumo interno cresce insieme alle esportazioni, e il rituale del caffè rimane parte della vita quotidiana dei brasiliani.</p>\n  <p>Fine della lettura. La barra dovrebbe ora essere completa.</p>\n</article>\n\n<script type=\"module\">\n  const bar = document.querySelector('pura-scroll-progress');\n  const status = document.getElementById('status');\n  bar.addEventListener('pura-scroll-progress', (e) => {\n    status.textContent = 'Avanzamento della lettura: ' + e.detail.percent + '%';\n  });\n</script>"
  }
 },
 "scroll-spy": {
  "pt-BR": {
   "description": "O pura-scroll-spy é uma navegação \"nesta página\" para documentação e textos longos: ele observa as seções com IntersectionObserver e move aria-current=\"location\" para o link correspondente à seção em vista. Use-o quando tiver um sumário lateral que deva acompanhar a rolagem. Ele tem uma camada agent-native: atributos estáveis data-pura-scroll-spy-* refletem a seção ativa (active, index, count) e cada instância se registra em window.__puraScrollSpy com { id, activeId, activeIndex, sections, el, activate }, de modo que um agente possa ler o estado do sumário e pular para uma seção via activate(idOrIndex) sem inspecionar o Shadow DOM.",
   "attributes": [
    {
     "desc": "Seletor CSS para as seções a observar. Quando ausente, as seções são derivadas dos hrefs (hash) dos links no slot."
    },
    {
     "desc": "Seletor CSS para o contêiner de rolagem. Quando ausente, usa a viewport (root null)."
    },
    {
     "desc": "Deslocamento superior em px que influencia qual seção conta como atual (por exemplo: para considerar um cabeçalho fixo). Ele se torna o top negativo do rootMargin do IntersectionObserver."
    },
    {
     "desc": "Quando presente, o link ativo é rolado para a vista dentro do próprio nav (respeitando prefers-reduced-motion)."
    },
    {
     "desc": "Rótulo acessível (aria-label) para o landmark de navegação."
    }
   ],
   "demoHTML": "<div style=\"display:grid;grid-template-columns:200px 1fr;gap:32px;max-width:860px\">\n  <pura-scroll-spy root=\"#conteudo\" offset=\"16\" auto-scroll label=\"Nesta página\" style=\"position:sticky;top:16px;align-self:start\">\n    <a href=\"#introducao\" style=\"display:block;padding:6px 10px\">Introdução</a>\n    <a href=\"#instalacao\" style=\"display:block;padding:6px 10px\">Instalação</a>\n    <a href=\"#uso\" style=\"display:block;padding:6px 10px\">Uso</a>\n    <a href=\"#api\" style=\"display:block;padding:6px 10px\">API</a>\n  </pura-scroll-spy>\n  <div id=\"conteudo\" style=\"height:320px;overflow:auto;border:1px solid var(--pura-border, #ddd);border-radius:8px;padding:16px\">\n    <section id=\"introducao\"><h2>Introdução</h2><p style=\"height:260px\">Visão geral do componente e quando usá-lo.</p></section>\n    <section id=\"instalacao\"><h2>Instalação</h2><p style=\"height:260px\">Importe o módulo e use a tag, sem dependências.</p></section>\n    <section id=\"uso\"><h2>Uso</h2><p style=\"height:260px\">Coloque âncoras com href de hash dentro do slot.</p></section>\n    <section id=\"api\"><h2>API</h2><p style=\"height:260px\">Atributos, eventos e o método activate().</p></section>\n  </div>\n</div>"
  },
  "fr": {
   "description": "Le pura-scroll-spy est une navigation « sur cette page » pour la documentation et les textes longs : il observe les sections avec IntersectionObserver et déplace aria-current=\"location\" vers le lien correspondant à la section en vue. Utilisez-le lorsque vous avez une table des matières latérale qui doit suivre le défilement. Il possède une couche agent-native : des attributs stables data-pura-scroll-spy-* reflètent la section active (active, index, count) et chaque instance s'enregistre dans window.__puraScrollSpy avec { id, activeId, activeIndex, sections, el, activate }, de sorte qu'un agent puisse lire l'état de la table des matières et sauter à une section via activate(idOrIndex) sans inspecter le Shadow DOM.",
   "attributes": [
    {
     "desc": "Sélecteur CSS des sections à observer. En son absence, les sections sont déduites des hrefs (hash) des liens du slot."
    },
    {
     "desc": "Sélecteur CSS du conteneur de défilement. En son absence, utilise la viewport (root null)."
    },
    {
     "desc": "Décalage supérieur en px qui influence quelle section compte comme actuelle (par exemple : pour tenir compte d'un en-tête fixe). Il devient le top négatif du rootMargin de l'IntersectionObserver."
    },
    {
     "desc": "Lorsqu'il est présent, le lien actif est amené dans la vue au sein de la nav elle-même (en respectant prefers-reduced-motion)."
    },
    {
     "desc": "Libellé accessible (aria-label) pour le repère de navigation."
    }
   ],
   "demoHTML": "<div style=\"display:grid;grid-template-columns:200px 1fr;gap:32px;max-width:860px\">\n  <pura-scroll-spy root=\"#conteudo\" offset=\"16\" auto-scroll label=\"Sur cette page\" style=\"position:sticky;top:16px;align-self:start\">\n    <a href=\"#introducao\" style=\"display:block;padding:6px 10px\">Introduction</a>\n    <a href=\"#instalacao\" style=\"display:block;padding:6px 10px\">Installation</a>\n    <a href=\"#uso\" style=\"display:block;padding:6px 10px\">Utilisation</a>\n    <a href=\"#api\" style=\"display:block;padding:6px 10px\">API</a>\n  </pura-scroll-spy>\n  <div id=\"conteudo\" style=\"height:320px;overflow:auto;border:1px solid var(--pura-border, #ddd);border-radius:8px;padding:16px\">\n    <section id=\"introducao\"><h2>Introduction</h2><p style=\"height:260px\">Aperçu du composant et quand l'utiliser.</p></section>\n    <section id=\"instalacao\"><h2>Installation</h2><p style=\"height:260px\">Importez le module et utilisez la balise, sans dépendances.</p></section>\n    <section id=\"uso\"><h2>Utilisation</h2><p style=\"height:260px\">Placez des ancres avec un href de type hash à l'intérieur du slot.</p></section>\n    <section id=\"api\"><h2>API</h2><p style=\"height:260px\">Attributs, événements et la méthode activate().</p></section>\n  </div>\n</div>"
  },
  "de": {
   "description": "pura-scroll-spy ist eine „Auf dieser Seite“-Navigation für Dokumentation und lange Texte: Es beobachtet Abschnitte mit dem IntersectionObserver und verschiebt aria-current=\"location\" auf den Link, der dem sichtbaren Abschnitt entspricht. Verwende es, wenn du ein seitliches Inhaltsverzeichnis hast, das dem Scrollen folgen soll. Es besitzt eine agent-native Schicht: stabile data-pura-scroll-spy-*-Attribute spiegeln den aktiven Abschnitt wider (active, index, count) und jede Instanz registriert sich in window.__puraScrollSpy mit { id, activeId, activeIndex, sections, el, activate }, sodass ein Agent den Zustand des Inhaltsverzeichnisses lesen und über activate(idOrIndex) zu einem Abschnitt springen kann, ohne das Shadow DOM zu inspizieren.",
   "attributes": [
    {
     "desc": "CSS-Selektor für die zu beobachtenden Abschnitte. Fehlt er, werden die Abschnitte aus den hrefs (Hash) der Links im Slot abgeleitet."
    },
    {
     "desc": "CSS-Selektor für den Scroll-Container. Fehlt er, wird die Viewport verwendet (root null)."
    },
    {
     "desc": "Oberer Versatz in px, der beeinflusst, welcher Abschnitt als aktuell gilt (zum Beispiel: um einen fixierten Header zu berücksichtigen). Er wird zum negativen top des rootMargin des IntersectionObserver."
    },
    {
     "desc": "Wenn vorhanden, wird der aktive Link innerhalb der nav selbst in den sichtbaren Bereich gescrollt (unter Beachtung von prefers-reduced-motion)."
    },
    {
     "desc": "Zugängliche Beschriftung (aria-label) für das Navigations-Landmark."
    }
   ],
   "demoHTML": "<div style=\"display:grid;grid-template-columns:200px 1fr;gap:32px;max-width:860px\">\n  <pura-scroll-spy root=\"#conteudo\" offset=\"16\" auto-scroll label=\"Auf dieser Seite\" style=\"position:sticky;top:16px;align-self:start\">\n    <a href=\"#introducao\" style=\"display:block;padding:6px 10px\">Einführung</a>\n    <a href=\"#instalacao\" style=\"display:block;padding:6px 10px\">Installation</a>\n    <a href=\"#uso\" style=\"display:block;padding:6px 10px\">Verwendung</a>\n    <a href=\"#api\" style=\"display:block;padding:6px 10px\">API</a>\n  </pura-scroll-spy>\n  <div id=\"conteudo\" style=\"height:320px;overflow:auto;border:1px solid var(--pura-border, #ddd);border-radius:8px;padding:16px\">\n    <section id=\"introducao\"><h2>Einführung</h2><p style=\"height:260px\">Überblick über die Komponente und wann sie zu verwenden ist.</p></section>\n    <section id=\"instalacao\"><h2>Installation</h2><p style=\"height:260px\">Importieren Sie das Modul und verwenden Sie das Tag, ohne Abhängigkeiten.</p></section>\n    <section id=\"uso\"><h2>Verwendung</h2><p style=\"height:260px\">Platzieren Sie Anker mit einem Hash-href innerhalb des Slots.</p></section>\n    <section id=\"api\"><h2>API</h2><p style=\"height:260px\">Attribute, Ereignisse und die Methode activate().</p></section>\n  </div>\n</div>"
  },
  "it": {
   "description": "pura-scroll-spy è una navigazione \"in questa pagina\" per la documentazione e i testi lunghi: osserva le sezioni con IntersectionObserver e sposta aria-current=\"location\" sul link corrispondente alla sezione in vista. Usalo quando hai un sommario laterale che deve seguire lo scorrimento. Ha un livello agent-native: attributi stabili data-pura-scroll-spy-* riflettono la sezione attiva (active, index, count) e ogni istanza si registra in window.__puraScrollSpy con { id, activeId, activeIndex, sections, el, activate }, così che un agente possa leggere lo stato del sommario e saltare a una sezione tramite activate(idOrIndex) senza ispezionare lo Shadow DOM.",
   "attributes": [
    {
     "desc": "Selettore CSS per le sezioni da osservare. In sua assenza, le sezioni vengono derivate dagli href (hash) dei link nello slot."
    },
    {
     "desc": "Selettore CSS per il contenitore di scorrimento. In sua assenza, usa la viewport (root null)."
    },
    {
     "desc": "Scostamento superiore in px che influenza quale sezione conta come corrente (ad esempio: per tenere conto di un'intestazione fissa). Diventa il top negativo del rootMargin dell'IntersectionObserver."
    },
    {
     "desc": "Quando presente, il link attivo viene portato in vista all'interno della nav stessa (rispettando prefers-reduced-motion)."
    },
    {
     "desc": "Etichetta accessibile (aria-label) per il landmark di navigazione."
    }
   ],
   "demoHTML": "<div style=\"display:grid;grid-template-columns:200px 1fr;gap:32px;max-width:860px\">\n  <pura-scroll-spy root=\"#conteudo\" offset=\"16\" auto-scroll label=\"In questa pagina\" style=\"position:sticky;top:16px;align-self:start\">\n    <a href=\"#introducao\" style=\"display:block;padding:6px 10px\">Introduzione</a>\n    <a href=\"#instalacao\" style=\"display:block;padding:6px 10px\">Installazione</a>\n    <a href=\"#uso\" style=\"display:block;padding:6px 10px\">Utilizzo</a>\n    <a href=\"#api\" style=\"display:block;padding:6px 10px\">API</a>\n  </pura-scroll-spy>\n  <div id=\"conteudo\" style=\"height:320px;overflow:auto;border:1px solid var(--pura-border, #ddd);border-radius:8px;padding:16px\">\n    <section id=\"introducao\"><h2>Introduzione</h2><p style=\"height:260px\">Panoramica del componente e quando utilizzarlo.</p></section>\n    <section id=\"instalacao\"><h2>Installazione</h2><p style=\"height:260px\">Importa il modulo e usa il tag, senza dipendenze.</p></section>\n    <section id=\"uso\"><h2>Utilizzo</h2><p style=\"height:260px\">Inserisci ancore con href di tipo hash all'interno dello slot.</p></section>\n    <section id=\"api\"><h2>API</h2><p style=\"height:260px\">Attributi, eventi e il metodo activate().</p></section>\n  </div>\n</div>"
  }
 },
 "sidebar": {
  "pt-BR": {
   "description": "O Sidebar é um web component nativo (zero dependências) que constrói a navegação lateral de uma aplicação, com slots de cabeçalho, corpo e rodapé. No desktop ele permanece fixo e inline; em telas de até 768px ele se torna um drawer off-canvas modal (com captura de foco, ESC e backdrop) reutilizando o mesmo conteúdo. Use-o quando precisar de uma navegação primária persistente, opcionalmente recolhível para uma trilha de ícones.",
   "attributes": [
    {
     "desc": "Habilita recolher a sidebar para uma trilha de ícones (pura-sidebar)."
    },
    {
     "desc": "Recolhe para a trilha estreita e oculta os rótulos; só tem efeito com collapsible (pura-sidebar)."
    },
    {
     "desc": "Quando presente em pura-sidebar-item, renderiza um <a>; caso contrário, um <button>."
    },
    {
     "desc": "Destaca o item como atual e adiciona aria-current=\"page\" (pura-sidebar-item)."
    }
   ],
   "demoHTML": "<div style=\"height: 380px; display: flex; border: 1px solid var(--pura-border); border-radius: var(--pura-radius); overflow: hidden;\">\n  <pura-sidebar collapsible>\n    <div slot=\"header\" style=\"font-weight:600;\">Acme Inc.</div>\n\n    <pura-sidebar-item href=\"#\" active>\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M3 9.5 12 3l9 6.5\"/><path d=\"M5 10v10h14V10\"/></svg>\n      Início\n    </pura-sidebar-item>\n    <pura-sidebar-item href=\"#\">\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"3\" y=\"3\" width=\"7\" height=\"7\"/><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\"/><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\"/><rect x=\"14\" y=\"14\" width=\"7\" height=\"7\"/></svg>\n      Painel\n    </pura-sidebar-item>\n    <pura-sidebar-item href=\"#\">\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"8\" r=\"4\"/><path d=\"M4 21v-1a6 6 0 0 1 12 0v1\"/></svg>\n      Equipe\n    </pura-sidebar-item>\n    <pura-sidebar-item href=\"#\">\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.5-2.3 1a7 7 0 0 0-1.7-1l-.3-2.5h-4l-.3 2.5a7 7 0 0 0-1.7 1l-2.3-1-2 3.5 2 1.5a7 7 0 0 0 0 2l-2 1.5 2 3.5 2.3-1a7 7 0 0 0 1.7 1l.3 2.5h4l.3-2.5a7 7 0 0 0 1.7-1l2.3 1 2-3.5-2-1.5a7 7 0 0 0 .1-1Z\"/></svg>\n      Configurações\n    </pura-sidebar-item>\n\n    <pura-sidebar-item slot=\"footer\" href=\"#\">\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4\"/><path d=\"m16 17 5-5-5-5\"/><path d=\"M21 12H9\"/></svg>\n      Sair\n    </pura-sidebar-item>\n  </pura-sidebar>\n\n  <main style=\"flex:1; padding: var(--pura-space-4);\">\n    <h3 style=\"margin:0;\">Conteúdo</h3>\n    <p style=\"color: var(--pura-muted-fg);\">No celular, a barra lateral vira uma gaveta. Chame .toggle() para recolhê-la no desktop.</p>\n  </main>\n</div>"
  },
  "fr": {
   "description": "Le Sidebar est un composant web natif (zéro dépendance) qui construit la navigation latérale d'une application, avec des slots d'en-tête, de corps et de pied de page. Sur ordinateur, il reste fixe et en ligne ; sur les écrans jusqu'à 768px, il devient un tiroir off-canvas modal (avec piège à focus, ÉCHAP et arrière-plan) en réutilisant le même contenu. Utilisez-le lorsque vous avez besoin d'une navigation principale persistante, éventuellement repliable en une barre d'icônes.",
   "attributes": [
    {
     "desc": "Permet de replier la sidebar en une barre d'icônes (pura-sidebar)."
    },
    {
     "desc": "Replie en une barre étroite et masque les libellés ; ne prend effet qu'avec collapsible (pura-sidebar)."
    },
    {
     "desc": "Lorsqu'il est présent sur pura-sidebar-item, rend un <a> ; sinon un <button>."
    },
    {
     "desc": "Met en évidence l'élément comme actuel et ajoute aria-current=\"page\" (pura-sidebar-item)."
    }
   ],
   "demoHTML": "<div style=\"height: 380px; display: flex; border: 1px solid var(--pura-border); border-radius: var(--pura-radius); overflow: hidden;\">\n  <pura-sidebar collapsible>\n    <div slot=\"header\" style=\"font-weight:600;\">Acme Inc.</div>\n\n    <pura-sidebar-item href=\"#\" active>\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M3 9.5 12 3l9 6.5\"/><path d=\"M5 10v10h14V10\"/></svg>\n      Accueil\n    </pura-sidebar-item>\n    <pura-sidebar-item href=\"#\">\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"3\" y=\"3\" width=\"7\" height=\"7\"/><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\"/><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\"/><rect x=\"14\" y=\"14\" width=\"7\" height=\"7\"/></svg>\n      Tableau de bord\n    </pura-sidebar-item>\n    <pura-sidebar-item href=\"#\">\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"8\" r=\"4\"/><path d=\"M4 21v-1a6 6 0 0 1 12 0v1\"/></svg>\n      Équipe\n    </pura-sidebar-item>\n    <pura-sidebar-item href=\"#\">\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.5-2.3 1a7 7 0 0 0-1.7-1l-.3-2.5h-4l-.3 2.5a7 7 0 0 0-1.7 1l-2.3-1-2 3.5 2 1.5a7 7 0 0 0 0 2l-2 1.5 2 3.5 2.3-1a7 7 0 0 0 1.7 1l.3 2.5h4l.3-2.5a7 7 0 0 0 1.7-1l2.3 1 2-3.5-2-1.5a7 7 0 0 0 .1-1Z\"/></svg>\n      Paramètres\n    </pura-sidebar-item>\n\n    <pura-sidebar-item slot=\"footer\" href=\"#\">\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4\"/><path d=\"m16 17 5-5-5-5\"/><path d=\"M21 12H9\"/></svg>\n      Se déconnecter\n    </pura-sidebar-item>\n  </pura-sidebar>\n\n  <main style=\"flex:1; padding: var(--pura-space-4);\">\n    <h3 style=\"margin:0;\">Contenu</h3>\n    <p style=\"color: var(--pura-muted-fg);\">Sur mobile, la barre latérale devient un tiroir. Appelez .toggle() pour la replier sur ordinateur.</p>\n  </main>\n</div>"
  },
  "de": {
   "description": "Sidebar ist eine native Web Component (ohne Abhängigkeiten), die die seitliche Navigation einer Anwendung erstellt, mit Slots für Kopfzeile, Hauptbereich und Fußzeile. Auf dem Desktop bleibt sie fixiert und inline; auf Bildschirmen bis 768px wird sie zu einem modalen Off-Canvas-Drawer (mit Fokusfalle, ESC und Hintergrund), der denselben Inhalt wiederverwendet. Verwende sie, wenn du eine dauerhafte primäre Navigation benötigst, die optional zu einer Symbolleiste eingeklappt werden kann.",
   "attributes": [
    {
     "desc": "Ermöglicht das Einklappen der Sidebar zu einer Symbolleiste (pura-sidebar)."
    },
    {
     "desc": "Klappt zur schmalen Leiste ein und blendet die Beschriftungen aus; wird nur mit collapsible wirksam (pura-sidebar)."
    },
    {
     "desc": "Wenn an pura-sidebar-item vorhanden, wird ein <a> gerendert; andernfalls ein <button>."
    },
    {
     "desc": "Hebt das Element als aktuell hervor und fügt aria-current=\"page\" hinzu (pura-sidebar-item)."
    }
   ],
   "demoHTML": "<div style=\"height: 380px; display: flex; border: 1px solid var(--pura-border); border-radius: var(--pura-radius); overflow: hidden;\">\n  <pura-sidebar collapsible>\n    <div slot=\"header\" style=\"font-weight:600;\">Acme Inc.</div>\n\n    <pura-sidebar-item href=\"#\" active>\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M3 9.5 12 3l9 6.5\"/><path d=\"M5 10v10h14V10\"/></svg>\n      Startseite\n    </pura-sidebar-item>\n    <pura-sidebar-item href=\"#\">\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"3\" y=\"3\" width=\"7\" height=\"7\"/><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\"/><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\"/><rect x=\"14\" y=\"14\" width=\"7\" height=\"7\"/></svg>\n      Dashboard\n    </pura-sidebar-item>\n    <pura-sidebar-item href=\"#\">\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"8\" r=\"4\"/><path d=\"M4 21v-1a6 6 0 0 1 12 0v1\"/></svg>\n      Team\n    </pura-sidebar-item>\n    <pura-sidebar-item href=\"#\">\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.5-2.3 1a7 7 0 0 0-1.7-1l-.3-2.5h-4l-.3 2.5a7 7 0 0 0-1.7 1l-2.3-1-2 3.5 2 1.5a7 7 0 0 0 0 2l-2 1.5 2 3.5 2.3-1a7 7 0 0 0 1.7 1l.3 2.5h4l.3-2.5a7 7 0 0 0 1.7-1l2.3 1 2-3.5-2-1.5a7 7 0 0 0 .1-1Z\"/></svg>\n      Einstellungen\n    </pura-sidebar-item>\n\n    <pura-sidebar-item slot=\"footer\" href=\"#\">\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4\"/><path d=\"m16 17 5-5-5-5\"/><path d=\"M21 12H9\"/></svg>\n      Abmelden\n    </pura-sidebar-item>\n  </pura-sidebar>\n\n  <main style=\"flex:1; padding: var(--pura-space-4);\">\n    <h3 style=\"margin:0;\">Inhalt</h3>\n    <p style=\"color: var(--pura-muted-fg);\">Auf Mobilgeräten wird die Seitenleiste zu einer Schublade. Rufen Sie .toggle() auf, um sie auf dem Desktop einzuklappen.</p>\n  </main>\n</div>"
  },
  "it": {
   "description": "Sidebar è un web component nativo (zero dipendenze) che costruisce la navigazione laterale di un'applicazione, con slot per intestazione, corpo e piè di pagina. Su desktop rimane fissa e inline; su schermi fino a 768px diventa un drawer off-canvas modale (con focus trap, ESC e backdrop) riutilizzando lo stesso contenuto. Usala quando hai bisogno di una navigazione primaria persistente, eventualmente comprimibile in una barra di icone.",
   "attributes": [
    {
     "desc": "Abilita la compressione della sidebar in una barra di icone (pura-sidebar)."
    },
    {
     "desc": "Comprime nella barra stretta e nasconde le etichette; ha effetto solo con collapsible (pura-sidebar)."
    },
    {
     "desc": "Quando presente su pura-sidebar-item, esegue il rendering di un <a>; altrimenti di un <button>."
    },
    {
     "desc": "Evidenzia l'elemento come corrente e aggiunge aria-current=\"page\" (pura-sidebar-item)."
    }
   ],
   "demoHTML": "<div style=\"height: 380px; display: flex; border: 1px solid var(--pura-border); border-radius: var(--pura-radius); overflow: hidden;\">\n  <pura-sidebar collapsible>\n    <div slot=\"header\" style=\"font-weight:600;\">Acme Inc.</div>\n\n    <pura-sidebar-item href=\"#\" active>\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M3 9.5 12 3l9 6.5\"/><path d=\"M5 10v10h14V10\"/></svg>\n      Home\n    </pura-sidebar-item>\n    <pura-sidebar-item href=\"#\">\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"3\" y=\"3\" width=\"7\" height=\"7\"/><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\"/><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\"/><rect x=\"14\" y=\"14\" width=\"7\" height=\"7\"/></svg>\n      Dashboard\n    </pura-sidebar-item>\n    <pura-sidebar-item href=\"#\">\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"8\" r=\"4\"/><path d=\"M4 21v-1a6 6 0 0 1 12 0v1\"/></svg>\n      Team\n    </pura-sidebar-item>\n    <pura-sidebar-item href=\"#\">\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.5-2.3 1a7 7 0 0 0-1.7-1l-.3-2.5h-4l-.3 2.5a7 7 0 0 0-1.7 1l-2.3-1-2 3.5 2 1.5a7 7 0 0 0 0 2l-2 1.5 2 3.5 2.3-1a7 7 0 0 0 1.7 1l.3 2.5h4l.3-2.5a7 7 0 0 0 1.7-1l2.3 1 2-3.5-2-1.5a7 7 0 0 0 .1-1Z\"/></svg>\n      Impostazioni\n    </pura-sidebar-item>\n\n    <pura-sidebar-item slot=\"footer\" href=\"#\">\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4\"/><path d=\"m16 17 5-5-5-5\"/><path d=\"M21 12H9\"/></svg>\n      Esci\n    </pura-sidebar-item>\n  </pura-sidebar>\n\n  <main style=\"flex:1; padding: var(--pura-space-4);\">\n    <h3 style=\"margin:0;\">Contenuto</h3>\n    <p style=\"color: var(--pura-muted-fg);\">Su dispositivi mobili la barra laterale diventa un pannello a scomparsa. Chiama .toggle() per comprimerla su desktop.</p>\n  </main>\n</div>"
  }
 },
 "stepper": {
  "pt-BR": {
   "description": "O `<pura-stepper>` renderiza uma sequência de etapas numeradas conectadas por linhas, marcando as concluídas com um check, destacando a atual e esmaecendo as futuras. Use-o em fluxos de várias etapas, como checkout, onboarding ou formulários divididos em etapas. Ele é agent-native: o host expõe `data-count`/`data-active` e cada etapa carrega `data-index` e `data-state` (\"complete\" | \"current\" | \"upcoming\"), além de uma lista ordenada com `aria-current=\"step\"` e rótulos ARIA que descrevem posição e estado, tornando o progresso legível por máquinas e por tecnologia assistiva.",
   "attributes": [
    {
     "desc": "Rótulos das etapas separados por vírgulas, por exemplo: \"Conta, Envio, Pagamento\". Os espaços são removidos e os itens vazios descartados."
    },
    {
     "desc": "Índice baseado em zero da etapa atual. Etapas com índice menor estão concluídas, a igual é a atual e as maiores são futuras."
    },
    {
     "desc": "Direção do indicador: \"horizontal\" (padrão) ou \"vertical\"."
    }
   ],
   "demoHTML": "<pura-stepper id=\"checkout\" steps=\"Conta, Entrega, Pagamento, Revisão\" active=\"1\"></pura-stepper>\n\n<div style=\"margin-top:1.5rem;display:flex;gap:.5rem\">\n  <button id=\"prev\">Voltar</button>\n  <button id=\"next\">Avançar</button>\n</div>\n\n<script type=\"module\">\n  import \"/pura/lib/stepper.js\";\n  const stepper = document.getElementById(\"checkout\");\n  const total = stepper.getAttribute(\"steps\").split(\",\").length;\n  document.getElementById(\"next\").addEventListener(\"click\", () => {\n    const i = Math.min(stepper.active + 1, total - 1);\n    stepper.setAttribute(\"active\", String(i));\n  });\n  document.getElementById(\"prev\").addEventListener(\"click\", () => {\n    const i = Math.max(stepper.active - 1, 0);\n    stepper.setAttribute(\"active\", String(i));\n  });\n</script>"
  },
  "fr": {
   "description": "Le `<pura-stepper>` affiche une séquence d'étapes numérotées reliées par des lignes, marquant celles qui sont terminées d'une coche, mettant en évidence l'actuelle et atténuant celles à venir. Utilisez-le dans des parcours en plusieurs étapes tels que le paiement, l'onboarding ou les formulaires découpés en étapes. Il est agent-native : l'hôte expose `data-count`/`data-active` et chaque étape porte `data-index` et `data-state` (\"complete\" | \"current\" | \"upcoming\"), ainsi qu'une liste ordonnée avec `aria-current=\"step\"` et des libellés ARIA qui précisent la position et l'état, rendant la progression lisible par les machines et par les technologies d'assistance.",
   "attributes": [
    {
     "desc": "Libellés des étapes séparés par des virgules, par exemple : \"Compte, Livraison, Paiement\". Les espaces sont supprimés et les éléments vides écartés."
    },
    {
     "desc": "Index à base zéro de l'étape actuelle. Les étapes d'index inférieur sont terminées, celle d'index égal est l'actuelle et celles d'index supérieur sont à venir."
    },
    {
     "desc": "Direction de l'indicateur : \"horizontal\" (par défaut) ou \"vertical\"."
    }
   ],
   "demoHTML": "<pura-stepper id=\"checkout\" steps=\"Compte, Livraison, Paiement, Vérification\" active=\"1\"></pura-stepper>\n\n<div style=\"margin-top:1.5rem;display:flex;gap:.5rem\">\n  <button id=\"prev\">Précédent</button>\n  <button id=\"next\">Suivant</button>\n</div>\n\n<script type=\"module\">\n  import \"/pura/lib/stepper.js\";\n  const stepper = document.getElementById(\"checkout\");\n  const total = stepper.getAttribute(\"steps\").split(\",\").length;\n  document.getElementById(\"next\").addEventListener(\"click\", () => {\n    const i = Math.min(stepper.active + 1, total - 1);\n    stepper.setAttribute(\"active\", String(i));\n  });\n  document.getElementById(\"prev\").addEventListener(\"click\", () => {\n    const i = Math.max(stepper.active - 1, 0);\n    stepper.setAttribute(\"active\", String(i));\n  });\n</script>"
  },
  "de": {
   "description": "`<pura-stepper>` rendert eine Folge nummerierter Schritte, die durch Linien verbunden sind, markiert die abgeschlossenen mit einem Häkchen, hebt den aktuellen hervor und blendet die bevorstehenden ab. Verwende es in mehrstufigen Abläufen wie Checkout, Onboarding oder in Schritte aufgeteilten Formularen. Es ist agent-native: Der Host stellt `data-count`/`data-active` bereit und jeder Schritt trägt `data-index` und `data-state` (\"complete\" | \"current\" | \"upcoming\") sowie eine geordnete Liste mit `aria-current=\"step\"` und ARIA-Beschriftungen, die Position und Status ausschreiben, wodurch der Fortschritt für Maschinen und für assistive Technologien lesbar wird.",
   "attributes": [
    {
     "desc": "Schrittbeschriftungen durch Kommas getrennt, zum Beispiel: \"Konto, Versand, Zahlung\". Leerzeichen werden entfernt und leere Einträge verworfen."
    },
    {
     "desc": "Nullbasierter Index des aktuellen Schritts. Schritte mit niedrigerem Index sind abgeschlossen, der gleiche ist der aktuelle und die höheren sind bevorstehend."
    },
    {
     "desc": "Richtung der Anzeige: \"horizontal\" (Standard) oder \"vertical\"."
    }
   ],
   "demoHTML": "<pura-stepper id=\"checkout\" steps=\"Konto, Versand, Zahlung, Überprüfung\" active=\"1\"></pura-stepper>\n\n<div style=\"margin-top:1.5rem;display:flex;gap:.5rem\">\n  <button id=\"prev\">Zurück</button>\n  <button id=\"next\">Weiter</button>\n</div>\n\n<script type=\"module\">\n  import \"/pura/lib/stepper.js\";\n  const stepper = document.getElementById(\"checkout\");\n  const total = stepper.getAttribute(\"steps\").split(\",\").length;\n  document.getElementById(\"next\").addEventListener(\"click\", () => {\n    const i = Math.min(stepper.active + 1, total - 1);\n    stepper.setAttribute(\"active\", String(i));\n  });\n  document.getElementById(\"prev\").addEventListener(\"click\", () => {\n    const i = Math.max(stepper.active - 1, 0);\n    stepper.setAttribute(\"active\", String(i));\n  });\n</script>"
  },
  "it": {
   "description": "`<pura-stepper>` esegue il rendering di una sequenza di passaggi numerati collegati da linee, contrassegnando quelli completati con un segno di spunta, evidenziando quello corrente e attenuando quelli futuri. Usalo nei flussi a più passaggi come checkout, onboarding o moduli suddivisi in passaggi. È agent-native: l'host espone `data-count`/`data-active` e ogni passaggio porta `data-index` e `data-state` (\"complete\" | \"current\" | \"upcoming\"), oltre a un elenco ordinato con `aria-current=\"step\"` ed etichette ARIA che esplicitano posizione e stato, rendendo l'avanzamento leggibile dalle macchine e dalle tecnologie assistive.",
   "attributes": [
    {
     "desc": "Etichette dei passaggi separate da virgole, ad esempio: \"Account, Spedizione, Pagamento\". Gli spazi vengono rimossi e gli elementi vuoti scartati."
    },
    {
     "desc": "Indice a base zero del passaggio corrente. I passaggi con indice inferiore sono completati, quello uguale è il corrente e quelli superiori sono futuri."
    },
    {
     "desc": "Direzione dell'indicatore: \"horizontal\" (predefinito) o \"vertical\"."
    }
   ],
   "demoHTML": "<pura-stepper id=\"checkout\" steps=\"Account, Spedizione, Pagamento, Revisione\" active=\"1\"></pura-stepper>\n\n<div style=\"margin-top:1.5rem;display:flex;gap:.5rem\">\n  <button id=\"prev\">Indietro</button>\n  <button id=\"next\">Avanti</button>\n</div>\n\n<script type=\"module\">\n  import \"/pura/lib/stepper.js\";\n  const stepper = document.getElementById(\"checkout\");\n  const total = stepper.getAttribute(\"steps\").split(\",\").length;\n  document.getElementById(\"next\").addEventListener(\"click\", () => {\n    const i = Math.min(stepper.active + 1, total - 1);\n    stepper.setAttribute(\"active\", String(i));\n  });\n  document.getElementById(\"prev\").addEventListener(\"click\", () => {\n    const i = Math.max(stepper.active - 1, 0);\n    stepper.setAttribute(\"active\", String(i));\n  });\n</script>"
  }
 },
 "tabs": {
  "pt-BR": {
   "description": "Tabs é um web component nativo que organiza o conteúdo em painéis selecionáveis por uma barra de abas. Use quando precisar agrupar seções relacionadas no mesmo espaço, exibindo uma de cada vez. Cada aba é um elemento pura-tab com seu rótulo, e o painel ativo é controlado pelo atributo active em pura-tabs.",
   "attributes": [
    {
     "desc": "Índice base zero da aba ativa em pura-tabs; refletido ao trocar de aba."
    },
    {
     "desc": "Texto do botão da aba, definido em cada pura-tab filho."
    }
   ],
   "demoHTML": "<pura-tabs active=\"0\">\n  <pura-tab label=\"Conta\">\n    Gerencie seu nome, e-mail e foto de perfil aqui.\n  </pura-tab>\n  <pura-tab label=\"Senha\">\n    Atualize sua senha e ative a verificação em duas etapas.\n  </pura-tab>\n  <pura-tab label=\"Notificações\">\n    Escolha quais alertas você quer receber por e-mail.\n  </pura-tab>\n</pura-tabs>"
  },
  "fr": {
   "description": "Tabs est un web component natif qui organise le contenu en panneaux sélectionnables par une barre d'onglets. Utilisez-le lorsque vous devez regrouper des sections liées dans le même espace, en affichant une à la fois. Chaque onglet est un élément pura-tab avec son libellé, et le panneau actif est contrôlé par l'attribut active sur pura-tabs.",
   "attributes": [
    {
     "desc": "Index à base zéro de l'onglet actif sur pura-tabs ; reflété lors du changement d'onglet."
    },
    {
     "desc": "Texte du bouton d'onglet, défini sur chaque pura-tab enfant."
    }
   ],
   "demoHTML": "<pura-tabs active=\"0\">\n  <pura-tab label=\"Compte\">\n    Gérez ici votre nom, votre e-mail et votre photo de profil.\n  </pura-tab>\n  <pura-tab label=\"Mot de passe\">\n    Modifiez votre mot de passe et activez la vérification en deux étapes.\n  </pura-tab>\n  <pura-tab label=\"Notifications\">\n    Choisissez les alertes que vous souhaitez recevoir par e-mail.\n  </pura-tab>\n</pura-tabs>"
  },
  "de": {
   "description": "Tabs ist ein natives Web Component, das Inhalte in Bereiche gliedert, die über eine Tab-Leiste auswählbar sind. Verwenden Sie es, wenn Sie zusammengehörige Abschnitte im selben Bereich gruppieren und jeweils einen davon anzeigen möchten. Jeder Tab ist ein pura-tab-Element mit seiner Beschriftung, und der aktive Bereich wird über das Attribut active an pura-tabs gesteuert.",
   "attributes": [
    {
     "desc": "Nullbasierter Index des aktiven Tabs an pura-tabs; wird beim Wechsel der Tabs reflektiert."
    },
    {
     "desc": "Text der Tab-Schaltfläche, der an jedem untergeordneten pura-tab festgelegt wird."
    }
   ],
   "demoHTML": "<pura-tabs active=\"0\">\n  <pura-tab label=\"Konto\">\n    Verwalten Sie hier Ihren Namen, Ihre E-Mail und Ihr Profilbild.\n  </pura-tab>\n  <pura-tab label=\"Passwort\">\n    Aktualisieren Sie Ihr Passwort und aktivieren Sie die Zwei-Schritt-Verifizierung.\n  </pura-tab>\n  <pura-tab label=\"Benachrichtigungen\">\n    Wählen Sie, welche Benachrichtigungen Sie per E-Mail erhalten möchten.\n  </pura-tab>\n</pura-tabs>"
  },
  "it": {
   "description": "Tabs è un web component nativo che organizza i contenuti in pannelli selezionabili tramite una barra delle schede. Usalo quando devi raggruppare sezioni correlate nello stesso spazio, mostrandone una alla volta. Ogni scheda è un elemento pura-tab con la propria etichetta, e il pannello attivo è controllato dall'attributo active su pura-tabs.",
   "attributes": [
    {
     "desc": "Indice in base zero della scheda attiva su pura-tabs; riflesso quando si cambia scheda."
    },
    {
     "desc": "Testo del pulsante della scheda, impostato su ogni pura-tab figlio."
    }
   ],
   "demoHTML": "<pura-tabs active=\"0\">\n  <pura-tab label=\"Account\">\n    Gestisci qui il tuo nome, la tua e-mail e la foto del profilo.\n  </pura-tab>\n  <pura-tab label=\"Password\">\n    Aggiorna la tua password e attiva la verifica in due passaggi.\n  </pura-tab>\n  <pura-tab label=\"Notifiche\">\n    Scegli quali avvisi vuoi ricevere via e-mail.\n  </pura-tab>\n</pura-tabs>"
  }
 },
 "toolbar": {
  "pt-BR": {
   "description": "`pura-toolbar` organiza controles encaixados (botões, alternadores, links, inputs, separadores) com espaçamento consistente e navegação por teclado: apenas um item permanece na ordem de tabulação e as teclas de seta movem o foco dentro da barra (Home/End vão para as extremidades). Use-o para agrupar ações relacionadas, como uma barra de formatação ou de comandos. A camada agent-native expõe `role=\"toolbar\"` e espelha o estado ao vivo em atributos `data-pura-toolbar-*` no host, e registra cada toolbar em `window.__puraToolbars` por `data-pura-id`, permitindo que agentes enumerem e leiam todas as toolbars sem tocar no Shadow DOM.",
   "attributes": [
    {
     "desc": "Define o layout e quais teclas de seta movem o foco: 'horizontal' (Esquerda/Direita) ou 'vertical' (Cima/Baixo). Também ajusta o aria-orientation."
    }
   ],
   "demoHTML": "<pura-toolbar orientation=\"horizontal\" aria-label=\"Formatação\">\n  <pura-button>Negrito</pura-button>\n  <pura-button>Itálico</pura-button>\n  <pura-button>Sublinhado</pura-button>\n  <pura-separator></pura-separator>\n  <pura-button>Alinhar à esquerda</pura-button>\n  <pura-button>Centralizar</pura-button>\n  <pura-button>Alinhar à direita</pura-button>\n</pura-toolbar>"
  },
  "fr": {
   "description": "`pura-toolbar` dispose les contrôles insérés (boutons, bascules, liens, champs de saisie, séparateurs) avec un espacement cohérent et une navigation au clavier : un seul élément reste dans l'ordre de tabulation et les touches fléchées déplacent le focus à l'intérieur de la barre (Home/End vont aux extrémités). Utilisez-le pour regrouper des actions liées, comme une barre de mise en forme ou de commandes. La couche agent-native expose `role=\"toolbar\"` et reflète l'état en direct dans des attributs `data-pura-toolbar-*` sur l'hôte, et enregistre chaque toolbar dans `window.__puraToolbars` par `data-pura-id`, permettant aux agents d'énumérer et de lire toutes les toolbars sans toucher au Shadow DOM.",
   "attributes": [
    {
     "desc": "Définit la disposition et les touches fléchées qui déplacent le focus : 'horizontal' (Gauche/Droite) ou 'vertical' (Haut/Bas). Cela ajuste également l'aria-orientation."
    }
   ],
   "demoHTML": "<pura-toolbar orientation=\"horizontal\" aria-label=\"Mise en forme\">\n  <pura-button>Gras</pura-button>\n  <pura-button>Italique</pura-button>\n  <pura-button>Souligné</pura-button>\n  <pura-separator></pura-separator>\n  <pura-button>Aligner à gauche</pura-button>\n  <pura-button>Centrer</pura-button>\n  <pura-button>Aligner à droite</pura-button>\n</pura-toolbar>"
  },
  "de": {
   "description": "`pura-toolbar` ordnet eingefügte Steuerelemente (Schaltflächen, Umschalter, Links, Eingabefelder, Trennlinien) mit einheitlichem Abstand und Tastaturnavigation an: Nur ein Element bleibt in der Tabulatorreihenfolge, und die Pfeiltasten bewegen den Fokus innerhalb der Leiste (Home/End springen an die Enden). Verwenden Sie es, um zusammengehörige Aktionen zu gruppieren, etwa eine Formatierungs- oder Befehlsleiste. Die agent-native Schicht stellt `role=\"toolbar\"` bereit und spiegelt den Live-Zustand in `data-pura-toolbar-*`-Attributen am Host wider und registriert jede Toolbar in `window.__puraToolbars` per `data-pura-id`, sodass Agenten alle Toolbars auflisten und auslesen können, ohne das Shadow DOM zu berühren.",
   "attributes": [
    {
     "desc": "Legt das Layout fest und welche Pfeiltasten den Fokus bewegen: 'horizontal' (Links/Rechts) oder 'vertical' (Auf/Ab). Es passt außerdem die aria-orientation an."
    }
   ],
   "demoHTML": "<pura-toolbar orientation=\"horizontal\" aria-label=\"Formatierung\">\n  <pura-button>Fett</pura-button>\n  <pura-button>Kursiv</pura-button>\n  <pura-button>Unterstrichen</pura-button>\n  <pura-separator></pura-separator>\n  <pura-button>Linksbündig</pura-button>\n  <pura-button>Zentrieren</pura-button>\n  <pura-button>Rechtsbündig</pura-button>\n</pura-toolbar>"
  },
  "it": {
   "description": "`pura-toolbar` dispone i controlli inseriti (pulsanti, interruttori, link, input, separatori) con spaziatura uniforme e navigazione da tastiera: un solo elemento rimane nell'ordine di tabulazione e i tasti freccia spostano il focus all'interno della barra (Home/End vanno alle estremità). Usalo per raggruppare azioni correlate, come una barra di formattazione o di comandi. Il livello agent-native espone `role=\"toolbar\"` e rispecchia lo stato in tempo reale negli attributi `data-pura-toolbar-*` sull'host, e registra ogni toolbar in `window.__puraToolbars` tramite `data-pura-id`, consentendo agli agenti di enumerare e leggere tutte le toolbar senza toccare lo Shadow DOM.",
   "attributes": [
    {
     "desc": "Imposta il layout e quali tasti freccia spostano il focus: 'horizontal' (Sinistra/Destra) o 'vertical' (Su/Giù). Regola anche l'aria-orientation."
    }
   ],
   "demoHTML": "<pura-toolbar orientation=\"horizontal\" aria-label=\"Formattazione\">\n  <pura-button>Grassetto</pura-button>\n  <pura-button>Corsivo</pura-button>\n  <pura-button>Sottolineato</pura-button>\n  <pura-separator></pura-separator>\n  <pura-button>Allinea a sinistra</pura-button>\n  <pura-button>Centra</pura-button>\n  <pura-button>Allinea a destra</pura-button>\n</pura-toolbar>"
  }
 },
 "alert-dialog": {
  "pt-BR": {
   "description": "Alert Dialog é um web component nativo construído sobre o elemento <dialog> (showModal, com captura de foco e backdrop) que interrompe o fluxo para exigir uma decisão. Diferente de um dialog comum, ele ignora cliques no backdrop e a tecla ESC, de modo que o usuário precisa escolher entre cancelar e confirmar. Use-o para ações destrutivas ou irreversíveis, como excluir um registro ou sair sem salvar.",
   "attributes": [
    {
     "desc": "Título exibido no cabeçalho do dialog."
    },
    {
     "desc": "Texto do corpo, usado quando o slot padrão está vazio."
    },
    {
     "desc": "Controla a visibilidade; presente = aberto (reflete o estado e aciona showModal/close)."
    }
   ],
   "demoHTML": "<button id=\"open-ad\">Excluir conta</button>\n\n<pura-alert-dialog\n  id=\"ad\"\n  title=\"Tem certeza?\"\n  description=\"Esta ação não pode ser desfeita. Sua conta será removida permanentemente.\"\n>\n  <button slot=\"cancel\" data-action=\"cancel\">Cancelar</button>\n  <button slot=\"action\" data-action=\"confirm\">Sim, excluir</button>\n</pura-alert-dialog>\n\n<script type=\"module\">\n  const dialog = document.getElementById(\"ad\");\n  document.getElementById(\"open-ad\").addEventListener(\"click\", () => dialog.open());\n  dialog.addEventListener(\"confirm\", () => console.log(\"confirmed\"));\n  dialog.addEventListener(\"cancel\", () => console.log(\"canceled\"));\n</script>"
  },
  "fr": {
   "description": "Alert Dialog est un web component natif construit sur l'élément <dialog> (showModal, avec piège de focus et backdrop) qui interrompt le flux pour exiger une décision. Contrairement à un dialog classique, il ignore les clics sur le backdrop et la touche ESC, de sorte que l'utilisateur doit choisir entre annuler et confirmer. Utilisez-le pour des actions destructrices ou irréversibles, comme supprimer un enregistrement ou quitter sans enregistrer.",
   "attributes": [
    {
     "desc": "Titre affiché dans l'en-tête du dialog."
    },
    {
     "desc": "Texte du corps, utilisé lorsque le slot par défaut est vide."
    },
    {
     "desc": "Contrôle la visibilité ; présent = ouvert (reflète l'état et déclenche showModal/close)."
    }
   ],
   "demoHTML": "<button id=\"open-ad\">Supprimer le compte</button>\n\n<pura-alert-dialog\n  id=\"ad\"\n  title=\"Êtes-vous sûr ?\"\n  description=\"Cette action est irréversible. Votre compte sera supprimé définitivement.\"\n>\n  <button slot=\"cancel\" data-action=\"cancel\">Annuler</button>\n  <button slot=\"action\" data-action=\"confirm\">Oui, supprimer</button>\n</pura-alert-dialog>\n\n<script type=\"module\">\n  const dialog = document.getElementById(\"ad\");\n  document.getElementById(\"open-ad\").addEventListener(\"click\", () => dialog.open());\n  dialog.addEventListener(\"confirm\", () => console.log(\"confirmed\"));\n  dialog.addEventListener(\"cancel\", () => console.log(\"canceled\"));\n</script>"
  },
  "de": {
   "description": "Alert Dialog ist ein natives Web Component, das auf dem <dialog>-Element aufbaut (showModal, mit Fokusfalle und Backdrop) und den Ablauf unterbricht, um eine Entscheidung zu erzwingen. Anders als ein gewöhnlicher Dialog ignoriert es Klicks auf den Backdrop und die ESC-Taste, sodass der Benutzer zwischen Abbrechen und Bestätigen wählen muss. Verwenden Sie es für destruktive oder unumkehrbare Aktionen, etwa das Löschen eines Datensatzes oder das Verlassen ohne Speichern.",
   "attributes": [
    {
     "desc": "Im Dialog-Header angezeigter Titel."
    },
    {
     "desc": "Fließtext, der verwendet wird, wenn der Standard-Slot leer ist."
    },
    {
     "desc": "Steuert die Sichtbarkeit; vorhanden = geöffnet (reflektiert den Zustand und löst showModal/close aus)."
    }
   ],
   "demoHTML": "<button id=\"open-ad\">Konto löschen</button>\n\n<pura-alert-dialog\n  id=\"ad\"\n  title=\"Sind Sie sicher?\"\n  description=\"Diese Aktion kann nicht rückgängig gemacht werden. Ihr Konto wird dauerhaft entfernt.\"\n>\n  <button slot=\"cancel\" data-action=\"cancel\">Abbrechen</button>\n  <button slot=\"action\" data-action=\"confirm\">Ja, löschen</button>\n</pura-alert-dialog>\n\n<script type=\"module\">\n  const dialog = document.getElementById(\"ad\");\n  document.getElementById(\"open-ad\").addEventListener(\"click\", () => dialog.open());\n  dialog.addEventListener(\"confirm\", () => console.log(\"confirmed\"));\n  dialog.addEventListener(\"cancel\", () => console.log(\"canceled\"));\n</script>"
  },
  "it": {
   "description": "Alert Dialog è un web component nativo costruito sull'elemento <dialog> (showModal, con cattura del focus e backdrop) che interrompe il flusso per richiedere una decisione. A differenza di un dialog comune, ignora i clic sul backdrop e il tasto ESC, quindi l'utente deve scegliere tra annulla e conferma. Usalo per azioni distruttive o irreversibili, come eliminare un record o uscire senza salvare.",
   "attributes": [
    {
     "desc": "Titolo mostrato nell'intestazione del dialog."
    },
    {
     "desc": "Testo del corpo, usato quando lo slot predefinito è vuoto."
    },
    {
     "desc": "Controlla la visibilità; presente = aperto (riflette lo stato e attiva showModal/close)."
    }
   ],
   "demoHTML": "<button id=\"open-ad\">Elimina account</button>\n\n<pura-alert-dialog\n  id=\"ad\"\n  title=\"Sei sicuro?\"\n  description=\"Questa azione non può essere annullata. Il tuo account verrà rimosso definitivamente.\"\n>\n  <button slot=\"cancel\" data-action=\"cancel\">Annulla</button>\n  <button slot=\"action\" data-action=\"confirm\">Sì, elimina</button>\n</pura-alert-dialog>\n\n<script type=\"module\">\n  const dialog = document.getElementById(\"ad\");\n  document.getElementById(\"open-ad\").addEventListener(\"click\", () => dialog.open());\n  dialog.addEventListener(\"confirm\", () => console.log(\"confirmed\"));\n  dialog.addEventListener(\"cancel\", () => console.log(\"canceled\"));\n</script>"
  }
 },
 "context-menu": {
  "pt-BR": {
   "description": "Um web component nativo (zero dependências) que envolve uma região e, ao receber o evento contextmenu (clique direito), abre um painel de menu como popover nativo posicionado nas coordenadas do ponteiro. Use-o quando precisar oferecer ações contextuais em um elemento ou área, com navegação por teclado, light dismiss e fechamento com ESC já incluídos. Os itens são elementos pura-menu-item passados pelo slot \"menu\".",
   "attributes": [
    {
     "desc": "Faz com que o próprio host seja o alvo do contextmenu, em vez da região do slot padrão."
    },
    {
     "desc": "Desativa a abertura do menu no contextmenu."
    },
    {
     "desc": "Atributo de pura-menu-item: estilo do item, danger usa a cor de perigo."
    },
    {
     "desc": "Atributo de pura-menu-item: adiciona recuo à esquerda para alinhar itens sem ícone."
    }
   ],
   "demoHTML": "<pura-context-menu id=\"cm-demo\">\n  <div style=\"display:grid;place-items:center;height:160px;border:1px dashed var(--pura-border);border-radius:var(--pura-radius);color:var(--pura-muted)\">\n    Clique com o botão direito aqui\n  </div>\n\n  <pura-menu-item slot=\"menu\">\n    Voltar\n    <span slot=\"shortcut\">Ctrl+[</span>\n  </pura-menu-item>\n  <pura-menu-item slot=\"menu\">\n    Recarregar\n    <span slot=\"shortcut\">Ctrl+R</span>\n  </pura-menu-item>\n  <pura-menu-item slot=\"menu\" disabled>Salvar como...</pura-menu-item>\n  <pura-menu-item slot=\"menu\" variant=\"danger\">Excluir</pura-menu-item>\n</pura-context-menu>\n\n<script type=\"module\">\n  const cm = document.getElementById(\"cm-demo\");\n  cm.addEventListener(\"select\", (e) => {\n    console.log(\"Selected item:\", e.target.textContent.trim());\n  });\n</script>"
  },
  "fr": {
   "description": "Un web component natif (zéro dépendance) qui enveloppe une zone et, à la réception de l'événement contextmenu (clic droit), ouvre un panneau de menu sous forme de popover natif positionné aux coordonnées du pointeur. Utilisez-le lorsque vous devez proposer des actions contextuelles sur un élément ou une zone, avec navigation au clavier, light dismiss et fermeture par ESC déjà inclus. Les éléments sont des pura-menu-item passés via le slot \"menu\".",
   "attributes": [
    {
     "desc": "Fait de l'hôte lui-même la cible du contextmenu, au lieu de la zone du slot par défaut."
    },
    {
     "desc": "Désactive l'ouverture du menu au contextmenu."
    },
    {
     "desc": "Attribut de pura-menu-item : style de l'élément, danger utilise la couleur de danger."
    },
    {
     "desc": "Attribut de pura-menu-item : ajoute un retrait à gauche pour aligner les éléments sans icône."
    }
   ],
   "demoHTML": "<pura-context-menu id=\"cm-demo\">\n  <div style=\"display:grid;place-items:center;height:160px;border:1px dashed var(--pura-border);border-radius:var(--pura-radius);color:var(--pura-muted)\">\n    Faites un clic droit ici\n  </div>\n\n  <pura-menu-item slot=\"menu\">\n    Retour\n    <span slot=\"shortcut\">Ctrl+[</span>\n  </pura-menu-item>\n  <pura-menu-item slot=\"menu\">\n    Recharger\n    <span slot=\"shortcut\">Ctrl+R</span>\n  </pura-menu-item>\n  <pura-menu-item slot=\"menu\" disabled>Enregistrer sous...</pura-menu-item>\n  <pura-menu-item slot=\"menu\" variant=\"danger\">Supprimer</pura-menu-item>\n</pura-context-menu>\n\n<script type=\"module\">\n  const cm = document.getElementById(\"cm-demo\");\n  cm.addEventListener(\"select\", (e) => {\n    console.log(\"Selected item:\", e.target.textContent.trim());\n  });\n</script>"
  },
  "de": {
   "description": "Ein natives Web Component (ohne Abhängigkeiten), das einen Bereich umschließt und beim Empfang des contextmenu-Ereignisses (Rechtsklick) ein Menü-Panel als natives Popover öffnet, das an den Zeigerkoordinaten positioniert wird. Verwenden Sie es, wenn Sie kontextbezogene Aktionen für ein Element oder einen Bereich anbieten möchten, mit bereits enthaltener Tastaturnavigation, Light Dismiss und Schließen per ESC. Die Einträge sind pura-menu-item-Elemente, die über den Slot \"menu\" übergeben werden.",
   "attributes": [
    {
     "desc": "Macht den Host selbst zum contextmenu-Ziel anstelle des Standard-Slot-Bereichs."
    },
    {
     "desc": "Deaktiviert das Öffnen des Menüs beim contextmenu."
    },
    {
     "desc": "Attribut von pura-menu-item: Stil des Eintrags, danger verwendet die Gefahrenfarbe."
    },
    {
     "desc": "Attribut von pura-menu-item: fügt links einen Einzug hinzu, um Einträge ohne Symbol auszurichten."
    }
   ],
   "demoHTML": "<pura-context-menu id=\"cm-demo\">\n  <div style=\"display:grid;place-items:center;height:160px;border:1px dashed var(--pura-border);border-radius:var(--pura-radius);color:var(--pura-muted)\">\n    Hier rechtsklicken\n  </div>\n\n  <pura-menu-item slot=\"menu\">\n    Zurück\n    <span slot=\"shortcut\">Ctrl+[</span>\n  </pura-menu-item>\n  <pura-menu-item slot=\"menu\">\n    Neu laden\n    <span slot=\"shortcut\">Ctrl+R</span>\n  </pura-menu-item>\n  <pura-menu-item slot=\"menu\" disabled>Speichern unter...</pura-menu-item>\n  <pura-menu-item slot=\"menu\" variant=\"danger\">Löschen</pura-menu-item>\n</pura-context-menu>\n\n<script type=\"module\">\n  const cm = document.getElementById(\"cm-demo\");\n  cm.addEventListener(\"select\", (e) => {\n    console.log(\"Selected item:\", e.target.textContent.trim());\n  });\n</script>"
  },
  "it": {
   "description": "Un web component nativo (zero dipendenze) che avvolge una regione e, alla ricezione dell'evento contextmenu (clic destro), apre un pannello di menu come popover nativo posizionato alle coordinate del puntatore. Usalo quando devi offrire azioni contestuali su un elemento o un'area, con navigazione da tastiera, light dismiss e chiusura con ESC già inclusi. Gli elementi sono pura-menu-item passati tramite lo slot \"menu\".",
   "attributes": [
    {
     "desc": "Rende l'host stesso il bersaglio del contextmenu, anziché la regione dello slot predefinito."
    },
    {
     "desc": "Disabilita l'apertura del menu al contextmenu."
    },
    {
     "desc": "Attributo di pura-menu-item: stile dell'elemento, danger usa il colore di pericolo."
    },
    {
     "desc": "Attributo di pura-menu-item: aggiunge un rientro a sinistra per allineare gli elementi senza icona."
    }
   ],
   "demoHTML": "<pura-context-menu id=\"cm-demo\">\n  <div style=\"display:grid;place-items:center;height:160px;border:1px dashed var(--pura-border);border-radius:var(--pura-radius);color:var(--pura-muted)\">\n    Fai clic con il tasto destro qui\n  </div>\n\n  <pura-menu-item slot=\"menu\">\n    Indietro\n    <span slot=\"shortcut\">Ctrl+[</span>\n  </pura-menu-item>\n  <pura-menu-item slot=\"menu\">\n    Ricarica\n    <span slot=\"shortcut\">Ctrl+R</span>\n  </pura-menu-item>\n  <pura-menu-item slot=\"menu\" disabled>Salva con nome...</pura-menu-item>\n  <pura-menu-item slot=\"menu\" variant=\"danger\">Elimina</pura-menu-item>\n</pura-context-menu>\n\n<script type=\"module\">\n  const cm = document.getElementById(\"cm-demo\");\n  cm.addEventListener(\"select\", (e) => {\n    console.log(\"Selected item:\", e.target.textContent.trim());\n  });\n</script>"
  }
 },
 "cookie-consent": {
  "pt-BR": {
   "description": "pura-cookie-consent é um banner de consentimento de cookies fixado à borda da viewport (ou como cartão flutuante) com ações de aceitar, recusar e preferências, além de um popover explicativo e um dialog nativo para escolher categorias. A escolha é persistida no localStorage e o banner permanece oculto enquanto houver uma decisão registrada; use-o quando precisar coletar o consentimento de cookies de forma compatível. Ele expõe uma camada agent-native: atributos data-pura-consent-* espelham o estado ao vivo no host e cada instância se registra em window.__puraCookieConsents pelo seu data-pura-id, permitindo que agentes e ferramentas enumerem e controlem o consentimento sem acessar o Shadow DOM.",
   "attributes": [
    {
     "desc": "A chave do localStorage onde a escolha do visitante é armazenada."
    },
    {
     "desc": "Posição do banner. bottom/top ocupam a largura da viewport; *-left / *-right são exibidos como cartão."
    },
    {
     "desc": "Rótulo do botão de aceitar."
    },
    {
     "desc": "Rótulo do botão de recusar."
    },
    {
     "desc": "Rótulo do botão de preferências/configurações."
    },
    {
     "desc": "Título opcional em negrito exibido acima da mensagem."
    },
    {
     "desc": "Oculta o botão de Preferências quando presente."
    },
    {
     "desc": "Refletido pelo componente; presente enquanto o banner está visível (não defina manualmente)."
    }
   ],
   "demoHTML": "<pura-cookie-consent\n  id=\"consent\"\n  heading=\"Sua privacidade\"\n  position=\"bottom-right\"\n  accept-label=\"Aceitar tudo\"\n  decline-label=\"Recusar\"\n  settings-label=\"Preferências\">\n  Usamos cookies para melhorar sua experiência e analisar o tráfego. Você pode aceitar, recusar ou ajustar suas preferências.\n</pura-cookie-consent>\n\n<p id=\"estado\" style=\"font:14px system-ui;color:#555\">Aguardando sua escolha...</p>\n<button id=\"reabrir\" type=\"button\">Revisar consentimento</button>\n\n<script type=\"module\">\n  import \"/pura/lib/cookie-consent.js\";\n  const consent = document.getElementById(\"consent\");\n  const estado = document.getElementById(\"estado\");\n  consent.addEventListener(\"change\", (e) => {\n    const cats = Object.entries(e.detail.categories)\n      .filter(([, on]) => on).map(([id]) => id).join(\", \");\n    estado.textContent = `Escolha: ${e.detail.choice} (${cats})`;\n  });\n  document.getElementById(\"reabrir\").addEventListener(\"click\", () => consent.reset());\n</script>"
  },
  "fr": {
   "description": "pura-cookie-consent est une bannière de consentement aux cookies fixée au bord de la fenêtre d'affichage (ou sous forme de carte flottante) avec des actions accepter, refuser et préférences, ainsi qu'un popover explicatif et un dialog natif pour choisir les catégories. Le choix est conservé dans localStorage et la bannière reste masquée tant qu'une décision est enregistrée ; utilisez-la lorsque vous devez recueillir le consentement aux cookies de manière conforme. Elle expose une couche agent-native : les attributs data-pura-consent-* reflètent l'état en direct sur l'hôte et chaque instance s'enregistre dans window.__puraCookieConsents par son data-pura-id, permettant aux agents et aux outils d'énumérer et de contrôler le consentement sans accéder au Shadow DOM.",
   "attributes": [
    {
     "desc": "La clé localStorage où le choix du visiteur est stocké."
    },
    {
     "desc": "Position de la bannière. bottom/top occupent toute la largeur de la fenêtre d'affichage ; *-left / *-right s'affichent sous forme de carte."
    },
    {
     "desc": "Libellé du bouton d'acceptation."
    },
    {
     "desc": "Libellé du bouton de refus."
    },
    {
     "desc": "Libellé du bouton de préférences/paramètres."
    },
    {
     "desc": "Titre en gras facultatif affiché au-dessus du message."
    },
    {
     "desc": "Masque le bouton Préférences lorsqu'il est présent."
    },
    {
     "desc": "Reflété par le composant ; présent tant que la bannière est visible (ne pas le définir manuellement)."
    }
   ],
   "demoHTML": "<pura-cookie-consent\n  id=\"consent\"\n  heading=\"Votre confidentialité\"\n  position=\"bottom-right\"\n  accept-label=\"Tout accepter\"\n  decline-label=\"Refuser\"\n  settings-label=\"Préférences\">\n  Nous utilisons des cookies pour améliorer votre expérience et analyser le trafic. Vous pouvez accepter, refuser ou ajuster vos préférences.\n</pura-cookie-consent>\n\n<p id=\"estado\" style=\"font:14px system-ui;color:#555\">En attente de votre choix...</p>\n<button id=\"reabrir\" type=\"button\">Revoir le consentement</button>\n\n<script type=\"module\">\n  import \"/pura/lib/cookie-consent.js\";\n  const consent = document.getElementById(\"consent\");\n  const estado = document.getElementById(\"estado\");\n  consent.addEventListener(\"change\", (e) => {\n    const cats = Object.entries(e.detail.categories)\n      .filter(([, on]) => on).map(([id]) => id).join(\", \");\n    estado.textContent = `Choix : ${e.detail.choice} (${cats})`;\n  });\n  document.getElementById(\"reabrir\").addEventListener(\"click\", () => consent.reset());\n</script>"
  },
  "de": {
   "description": "pura-cookie-consent ist ein Cookie-Zustimmungsbanner, das am Rand des Viewports fixiert ist (oder als schwebende Karte) und Aktionen zum Annehmen, Ablehnen und für Einstellungen bietet, dazu ein erläuterndes Popover und einen nativen Dialog zur Auswahl der Kategorien. Die Wahl wird im localStorage gespeichert, und das Banner bleibt verborgen, solange eine Entscheidung hinterlegt ist; verwenden Sie es, wenn Sie die Cookie-Zustimmung rechtskonform einholen müssen. Es stellt eine agent-native Schicht bereit: data-pura-consent-*-Attribute spiegeln den Live-Zustand am Host wider, und jede Instanz registriert sich über ihre data-pura-id in window.__puraCookieConsents, sodass Agenten und Tools die Zustimmung auflisten und steuern können, ohne auf das Shadow DOM zuzugreifen.",
   "attributes": [
    {
     "desc": "Der localStorage-Schlüssel, unter dem die Wahl des Besuchers gespeichert wird."
    },
    {
     "desc": "Position des Banners. bottom/top erstrecken sich über die Breite des Viewports; *-left / *-right werden als Karte dargestellt."
    },
    {
     "desc": "Beschriftung der Schaltfläche zum Annehmen."
    },
    {
     "desc": "Beschriftung der Schaltfläche zum Ablehnen."
    },
    {
     "desc": "Beschriftung der Schaltfläche für Einstellungen/Präferenzen."
    },
    {
     "desc": "Optionaler fett gedruckter Titel, der über der Nachricht angezeigt wird."
    },
    {
     "desc": "Blendet die Schaltfläche Einstellungen aus, wenn vorhanden."
    },
    {
     "desc": "Wird vom Component reflektiert; vorhanden, solange das Banner sichtbar ist (nicht manuell setzen)."
    }
   ],
   "demoHTML": "<pura-cookie-consent\n  id=\"consent\"\n  heading=\"Ihre Privatsphäre\"\n  position=\"bottom-right\"\n  accept-label=\"Alle akzeptieren\"\n  decline-label=\"Ablehnen\"\n  settings-label=\"Einstellungen\">\n  Wir verwenden Cookies, um Ihre Erfahrung zu verbessern und den Datenverkehr zu analysieren. Sie können akzeptieren, ablehnen oder Ihre Einstellungen anpassen.\n</pura-cookie-consent>\n\n<p id=\"estado\" style=\"font:14px system-ui;color:#555\">Warten auf Ihre Auswahl...</p>\n<button id=\"reabrir\" type=\"button\">Einwilligung überprüfen</button>\n\n<script type=\"module\">\n  import \"/pura/lib/cookie-consent.js\";\n  const consent = document.getElementById(\"consent\");\n  const estado = document.getElementById(\"estado\");\n  consent.addEventListener(\"change\", (e) => {\n    const cats = Object.entries(e.detail.categories)\n      .filter(([, on]) => on).map(([id]) => id).join(\", \");\n    estado.textContent = `Auswahl: ${e.detail.choice} (${cats})`;\n  });\n  document.getElementById(\"reabrir\").addEventListener(\"click\", () => consent.reset());\n</script>"
  },
  "it": {
   "description": "pura-cookie-consent è un banner di consenso ai cookie fissato al bordo della viewport (o come scheda fluttuante) con azioni di accetta, rifiuta e preferenze, oltre a un popover esplicativo e un dialog nativo per scegliere le categorie. La scelta viene mantenuta nel localStorage e il banner resta nascosto finché è registrata una decisione; usalo quando devi raccogliere il consenso ai cookie in modo conforme. Espone un livello agent-native: gli attributi data-pura-consent-* rispecchiano lo stato in tempo reale sull'host e ogni istanza si registra in window.__puraCookieConsents tramite il suo data-pura-id, consentendo ad agenti e strumenti di enumerare e controllare il consenso senza accedere allo Shadow DOM.",
   "attributes": [
    {
     "desc": "La chiave del localStorage in cui viene memorizzata la scelta del visitatore."
    },
    {
     "desc": "Posizione del banner. bottom/top occupano la larghezza della viewport; *-left / *-right vengono visualizzati come scheda."
    },
    {
     "desc": "Etichetta del pulsante di accettazione."
    },
    {
     "desc": "Etichetta del pulsante di rifiuto."
    },
    {
     "desc": "Etichetta del pulsante preferenze/impostazioni."
    },
    {
     "desc": "Titolo opzionale in grassetto mostrato sopra il messaggio."
    },
    {
     "desc": "Nasconde il pulsante Preferenze quando presente."
    },
    {
     "desc": "Riflesso dal componente; presente mentre il banner è visibile (non impostarlo manualmente)."
    }
   ],
   "demoHTML": "<pura-cookie-consent\n  id=\"consent\"\n  heading=\"La tua privacy\"\n  position=\"bottom-right\"\n  accept-label=\"Accetta tutto\"\n  decline-label=\"Rifiuta\"\n  settings-label=\"Preferenze\">\n  Utilizziamo i cookie per migliorare la tua esperienza e analizzare il traffico. Puoi accettare, rifiutare o regolare le tue preferenze.\n</pura-cookie-consent>\n\n<p id=\"estado\" style=\"font:14px system-ui;color:#555\">In attesa della tua scelta...</p>\n<button id=\"reabrir\" type=\"button\">Rivedi il consenso</button>\n\n<script type=\"module\">\n  import \"/pura/lib/cookie-consent.js\";\n  const consent = document.getElementById(\"consent\");\n  const estado = document.getElementById(\"estado\");\n  consent.addEventListener(\"change\", (e) => {\n    const cats = Object.entries(e.detail.categories)\n      .filter(([, on]) => on).map(([id]) => id).join(\", \");\n    estado.textContent = `Scelta: ${e.detail.choice} (${cats})`;\n  });\n  document.getElementById(\"reabrir\").addEventListener(\"click\", () => consent.reset());\n</script>"
  }
 },
 "dialog": {
  "pt-BR": {
   "description": "Dialog é um web component nativo que envolve o elemento dialog do HTML para exibir conteúdo em uma janela modal, com backdrop, captura de foco e fechamento com ESC já incluídos. Use-o quando precisar interromper o fluxo para exigir uma ação ou confirmação do usuário, como formulários rápidos, alertas ou diálogos de confirmação. Abra-o e feche-o programaticamente com os métodos open() e close() ou pelo atributo open.",
   "attributes": [
    {
     "desc": "Controla a visibilidade do modal; quando presente, abre o dialog em modo modal."
    },
    {
     "desc": "Texto exibido no cabeçalho quando o slot header não é usado."
    }
   ],
   "demoHTML": "<button id=\"abrir-dialog\">Abrir diálogo</button>\n\n<pura-dialog id=\"meu-dialog\" title=\"Confirmar exclusão\">\n  <p>Tem certeza de que deseja excluir este item? Esta ação não pode ser desfeita.</p>\n  <div slot=\"footer\">\n    <button id=\"cancelar-dialog\">Cancelar</button>\n    <button id=\"confirmar-dialog\">Excluir</button>\n  </div>\n</pura-dialog>\n\n<script type=\"module\">\n  const dlg = document.getElementById(\"meu-dialog\");\n  document.getElementById(\"abrir-dialog\").addEventListener(\"click\", () => dlg.open());\n  document.getElementById(\"cancelar-dialog\").addEventListener(\"click\", () => dlg.close());\n  document.getElementById(\"confirmar-dialog\").addEventListener(\"click\", () => dlg.close());\n</script>"
  },
  "fr": {
   "description": "Dialog est un web component natif qui enveloppe l'élément dialog du HTML pour afficher du contenu dans une fenêtre modale, avec backdrop, piège de focus et fermeture par ESC inclus d'emblée. Utilisez-le lorsque vous devez interrompre le flux pour exiger une action ou une confirmation de l'utilisateur, comme des formulaires rapides, des alertes ou des boîtes de dialogue de confirmation. Ouvrez-le et fermez-le par programmation avec les méthodes open() et close() ou via l'attribut open.",
   "attributes": [
    {
     "desc": "Contrôle la visibilité du modal ; lorsqu'il est présent, ouvre le dialog en mode modal."
    },
    {
     "desc": "Texte affiché dans l'en-tête lorsque le slot header n'est pas utilisé."
    }
   ],
   "demoHTML": "<button id=\"abrir-dialog\">Ouvrir la boîte de dialogue</button>\n\n<pura-dialog id=\"meu-dialog\" title=\"Confirmer la suppression\">\n  <p>Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.</p>\n  <div slot=\"footer\">\n    <button id=\"cancelar-dialog\">Annuler</button>\n    <button id=\"confirmar-dialog\">Supprimer</button>\n  </div>\n</pura-dialog>\n\n<script type=\"module\">\n  const dlg = document.getElementById(\"meu-dialog\");\n  document.getElementById(\"abrir-dialog\").addEventListener(\"click\", () => dlg.open());\n  document.getElementById(\"cancelar-dialog\").addEventListener(\"click\", () => dlg.close());\n  document.getElementById(\"confirmar-dialog\").addEventListener(\"click\", () => dlg.close());\n</script>"
  },
  "de": {
   "description": "Dialog ist ein natives Web Component, das das HTML-dialog-Element umschließt, um Inhalte in einem modalen Fenster anzuzeigen, mit Backdrop, Fokuserfassung und Schließen per ESC von Haus aus. Verwenden Sie es, wenn Sie den Ablauf unterbrechen müssen, um eine Aktion oder Bestätigung des Benutzers zu verlangen, etwa bei schnellen Formularen, Warnungen oder Bestätigungsdialogen. Öffnen und schließen Sie es programmgesteuert mit den Methoden open() und close() oder über das Attribut open.",
   "attributes": [
    {
     "desc": "Steuert die Sichtbarkeit des Modals; wenn vorhanden, öffnet es den Dialog im Modalmodus."
    },
    {
     "desc": "Text, der im Header angezeigt wird, wenn der header-Slot nicht verwendet wird."
    }
   ],
   "demoHTML": "<button id=\"abrir-dialog\">Dialog öffnen</button>\n\n<pura-dialog id=\"meu-dialog\" title=\"Löschen bestätigen\">\n  <p>Möchten Sie dieses Element wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.</p>\n  <div slot=\"footer\">\n    <button id=\"cancelar-dialog\">Abbrechen</button>\n    <button id=\"confirmar-dialog\">Löschen</button>\n  </div>\n</pura-dialog>\n\n<script type=\"module\">\n  const dlg = document.getElementById(\"meu-dialog\");\n  document.getElementById(\"abrir-dialog\").addEventListener(\"click\", () => dlg.open());\n  document.getElementById(\"cancelar-dialog\").addEventListener(\"click\", () => dlg.close());\n  document.getElementById(\"confirmar-dialog\").addEventListener(\"click\", () => dlg.close());\n</script>"
  },
  "it": {
   "description": "Dialog è un web component nativo che avvolge l'elemento dialog dell'HTML per mostrare contenuti in una finestra modale, con backdrop, cattura del focus e chiusura con ESC inclusi di serie. Usalo quando devi interrompere il flusso per richiedere un'azione o una conferma dall'utente, come moduli rapidi, avvisi o finestre di conferma. Aprilo e chiudilo a livello programmatico con i metodi open() e close() oppure tramite l'attributo open.",
   "attributes": [
    {
     "desc": "Controlla la visibilità del modale; quando presente, apre il dialog in modalità modale."
    },
    {
     "desc": "Testo mostrato nell'intestazione quando lo slot header non viene usato."
    }
   ],
   "demoHTML": "<button id=\"abrir-dialog\">Apri finestra di dialogo</button>\n\n<pura-dialog id=\"meu-dialog\" title=\"Conferma eliminazione\">\n  <p>Sei sicuro di voler eliminare questo elemento? Questa azione non può essere annullata.</p>\n  <div slot=\"footer\">\n    <button id=\"cancelar-dialog\">Annulla</button>\n    <button id=\"confirmar-dialog\">Elimina</button>\n  </div>\n</pura-dialog>\n\n<script type=\"module\">\n  const dlg = document.getElementById(\"meu-dialog\");\n  document.getElementById(\"abrir-dialog\").addEventListener(\"click\", () => dlg.open());\n  document.getElementById(\"cancelar-dialog\").addEventListener(\"click\", () => dlg.close());\n  document.getElementById(\"confirmar-dialog\").addEventListener(\"click\", () => dlg.close());\n</script>"
  }
 },
 "drawer": {
  "pt-BR": {
   "description": "O Drawer é um web component nativo que abre uma gaveta de largura total a partir da borda inferior da tela, com uma alça central, deslizando para cima sobre um backdrop. Por ser construído sobre o elemento dialog nativo, ele ganha captura de foco, fechamento com ESC e clique no backdrop de graça. Use-o para ações contextuais, filtros ou formulários em telas menores, onde um painel inferior parece mais natural do que um modal centralizado.",
   "attributes": [
    {
     "desc": "Controla a visibilidade. Presente abre a gaveta (showModal); removido a fecha. Observado e reativo."
    },
    {
     "desc": "Texto do título no cabeçalho, usado quando o slot header não é preenchido. Lido no momento da renderização."
    }
   ],
   "demoHTML": "<pura-button id=\"abrir-drawer\">Abrir gaveta</pura-button>\n\n<pura-drawer id=\"drawer-exemplo\" title=\"Filtros\">\n  <p>Refine os resultados usando as opções abaixo.</p>\n  <pura-checkbox>Em estoque</pura-checkbox>\n  <pura-checkbox>Frete grátis</pura-checkbox>\n  <div slot=\"footer\">\n    <pura-button variant=\"ghost\" id=\"cancelar-drawer\">Cancelar</pura-button>\n    <pura-button id=\"aplicar-drawer\">Aplicar</pura-button>\n  </div>\n</pura-drawer>\n\n<script type=\"module\">\n  const drawer = document.getElementById(\"drawer-exemplo\");\n  document.getElementById(\"abrir-drawer\").addEventListener(\"click\", () => drawer.open());\n  document.getElementById(\"cancelar-drawer\").addEventListener(\"click\", () => drawer.close());\n  document.getElementById(\"aplicar-drawer\").addEventListener(\"click\", () => drawer.close());\n</script>"
  },
  "fr": {
   "description": "Le Drawer est un web component natif qui ouvre un tiroir pleine largeur depuis le bord inférieur de l'écran, avec une poignée centrale, glissant vers le haut au-dessus d'un backdrop. Comme il est construit sur l'élément dialog natif, il bénéficie gratuitement du piège de focus, de la fermeture par ESC et du clic sur le backdrop. Utilisez-le pour des actions contextuelles, des filtres ou des formulaires sur les petits écrans, où un panneau en bas semble plus naturel qu'un modal centré.",
   "attributes": [
    {
     "desc": "Contrôle la visibilité. Présent ouvre le tiroir (showModal) ; retiré le ferme. Observé et réactif."
    },
    {
     "desc": "Texte du titre dans l'en-tête, utilisé lorsque le slot header n'est pas rempli. Lu au moment du rendu."
    }
   ],
   "demoHTML": "<pura-button id=\"abrir-drawer\">Ouvrir le panneau</pura-button>\n\n<pura-drawer id=\"drawer-exemplo\" title=\"Filtres\">\n  <p>Affinez les résultats à l'aide des options ci-dessous.</p>\n  <pura-checkbox>En stock</pura-checkbox>\n  <pura-checkbox>Livraison gratuite</pura-checkbox>\n  <div slot=\"footer\">\n    <pura-button variant=\"ghost\" id=\"cancelar-drawer\">Annuler</pura-button>\n    <pura-button id=\"aplicar-drawer\">Appliquer</pura-button>\n  </div>\n</pura-drawer>\n\n<script type=\"module\">\n  const drawer = document.getElementById(\"drawer-exemplo\");\n  document.getElementById(\"abrir-drawer\").addEventListener(\"click\", () => drawer.open());\n  document.getElementById(\"cancelar-drawer\").addEventListener(\"click\", () => drawer.close());\n  document.getElementById(\"aplicar-drawer\").addEventListener(\"click\", () => drawer.close());\n</script>"
  },
  "de": {
   "description": "Der Drawer ist ein natives Web Component, das eine Schublade in voller Breite vom unteren Bildschirmrand öffnet, mit einem mittigen Griff, die über einem Backdrop nach oben gleitet. Da es auf dem nativen dialog-Element aufbaut, erhält es Fokuserfassung, Schließen per ESC und Backdrop-Klick kostenlos. Verwenden Sie es für kontextbezogene Aktionen, Filter oder Formulare auf kleineren Bildschirmen, wo sich ein unteres Panel natürlicher anfühlt als ein zentriertes Modal.",
   "attributes": [
    {
     "desc": "Steuert die Sichtbarkeit. Vorhanden öffnet die Schublade (showModal); entfernt schließt sie. Wird beobachtet und reagiert darauf."
    },
    {
     "desc": "Titeltext im Header, verwendet, wenn der header-Slot nicht gefüllt ist. Wird zur Renderzeit gelesen."
    }
   ],
   "demoHTML": "<pura-button id=\"abrir-drawer\">Schublade öffnen</pura-button>\n\n<pura-drawer id=\"drawer-exemplo\" title=\"Filter\">\n  <p>Verfeinern Sie die Ergebnisse mit den folgenden Optionen.</p>\n  <pura-checkbox>Auf Lager</pura-checkbox>\n  <pura-checkbox>Kostenloser Versand</pura-checkbox>\n  <div slot=\"footer\">\n    <pura-button variant=\"ghost\" id=\"cancelar-drawer\">Abbrechen</pura-button>\n    <pura-button id=\"aplicar-drawer\">Anwenden</pura-button>\n  </div>\n</pura-drawer>\n\n<script type=\"module\">\n  const drawer = document.getElementById(\"drawer-exemplo\");\n  document.getElementById(\"abrir-drawer\").addEventListener(\"click\", () => drawer.open());\n  document.getElementById(\"cancelar-drawer\").addEventListener(\"click\", () => drawer.close());\n  document.getElementById(\"aplicar-drawer\").addEventListener(\"click\", () => drawer.close());\n</script>"
  },
  "it": {
   "description": "Il Drawer è un web component nativo che apre un cassetto a tutta larghezza dal bordo inferiore dello schermo, con una maniglia centrale, scorrendo verso l'alto sopra un backdrop. Essendo costruito sull'elemento dialog nativo, ottiene gratuitamente la cattura del focus, la chiusura con ESC e il clic sul backdrop. Usalo per azioni contestuali, filtri o moduli su schermi più piccoli, dove un pannello inferiore risulta più naturale di un modale centrato.",
   "attributes": [
    {
     "desc": "Controlla la visibilità. Presente apre il cassetto (showModal); rimosso lo chiude. Osservato e reattivo."
    },
    {
     "desc": "Testo del titolo nell'intestazione, usato quando lo slot header non è riempito. Letto al momento del rendering."
    }
   ],
   "demoHTML": "<pura-button id=\"abrir-drawer\">Apri pannello</pura-button>\n\n<pura-drawer id=\"drawer-exemplo\" title=\"Filtri\">\n  <p>Affina i risultati utilizzando le opzioni sottostanti.</p>\n  <pura-checkbox>Disponibile</pura-checkbox>\n  <pura-checkbox>Spedizione gratuita</pura-checkbox>\n  <div slot=\"footer\">\n    <pura-button variant=\"ghost\" id=\"cancelar-drawer\">Annulla</pura-button>\n    <pura-button id=\"aplicar-drawer\">Applica</pura-button>\n  </div>\n</pura-drawer>\n\n<script type=\"module\">\n  const drawer = document.getElementById(\"drawer-exemplo\");\n  document.getElementById(\"abrir-drawer\").addEventListener(\"click\", () => drawer.open());\n  document.getElementById(\"cancelar-drawer\").addEventListener(\"click\", () => drawer.close());\n  document.getElementById(\"aplicar-drawer\").addEventListener(\"click\", () => drawer.close());\n</script>"
  }
 },
 "dropdown-menu": {
  "pt-BR": {
   "description": "Um componente nativo (Web Component) que exibe um menu de ações ancorado a um gatilho, construído sobre a Popover API nativa (top layer, light dismiss e ESC incluídos) com posicionamento por CSS anchor. Use-o para agrupar ações contextuais acionadas por um botão, como menus de \"mais opções\", ações de linha ou menus de perfil. Ele suporta navegação por teclas de seta, Home/End, Enter/Espaço, e itens com ícone, atalho e estado desabilitado.",
   "attributes": [
    {
     "desc": "Controla/reflete o estado aberto do menu; presente quando o popover está visível."
    },
    {
     "desc": "Em <pura-menu-item>: desabilita o item, impedindo seleção e foco."
    }
   ],
   "demoHTML": "<pura-dropdown-menu>\n  <button slot=\"trigger\">Opções</button>\n\n  <pura-menu-label>Conta</pura-menu-label>\n  <pura-menu-item>\n    Perfil\n    <span slot=\"shortcut\">Ctrl P</span>\n  </pura-menu-item>\n  <pura-menu-item>\n    Configurações\n    <span slot=\"shortcut\">Ctrl ,</span>\n  </pura-menu-item>\n\n  <pura-menu-separator></pura-menu-separator>\n\n  <pura-menu-item disabled>Faturamento</pura-menu-item>\n  <pura-menu-item>Sair</pura-menu-item>\n</pura-dropdown-menu>"
  },
  "fr": {
   "description": "Un composant natif (Web Component) qui affiche un menu d'actions ancré à un déclencheur, construit sur la Popover API native (top layer, light dismiss et ESC inclus) avec positionnement par CSS anchor. Utilisez-le pour regrouper des actions contextuelles déclenchées par un bouton, comme les menus « plus d'options », les actions de ligne ou les menus de profil. Il prend en charge la navigation par les touches fléchées, Home/End, Entrée/Espace, et les éléments avec icône, raccourci et état désactivé.",
   "attributes": [
    {
     "desc": "Contrôle/reflète l'état ouvert du menu ; présent lorsque le popover est visible."
    },
    {
     "desc": "Sur <pura-menu-item> : désactive l'élément, empêchant la sélection et le focus."
    }
   ],
   "demoHTML": "<pura-dropdown-menu>\n  <button slot=\"trigger\">Options</button>\n\n  <pura-menu-label>Compte</pura-menu-label>\n  <pura-menu-item>\n    Profil\n    <span slot=\"shortcut\">Ctrl P</span>\n  </pura-menu-item>\n  <pura-menu-item>\n    Paramètres\n    <span slot=\"shortcut\">Ctrl ,</span>\n  </pura-menu-item>\n\n  <pura-menu-separator></pura-menu-separator>\n\n  <pura-menu-item disabled>Facturation</pura-menu-item>\n  <pura-menu-item>Se déconnecter</pura-menu-item>\n</pura-dropdown-menu>"
  },
  "de": {
   "description": "Ein natives Component (Web Component), das ein an einen Auslöser verankertes Aktionsmenü anzeigt, aufgebaut auf der nativen Popover API (Top Layer, Light Dismiss und ESC inklusive) mit Positionierung über CSS Anchor. Verwenden Sie es, um kontextbezogene Aktionen zu gruppieren, die durch eine Schaltfläche ausgelöst werden, etwa \"Mehr Optionen\"-Menüs, Zeilenaktionen oder Profilmenüs. Es unterstützt Navigation per Pfeiltasten, Home/End, Enter/Leertaste sowie Einträge mit Symbol, Tastenkürzel und deaktiviertem Zustand.",
   "attributes": [
    {
     "desc": "Steuert/reflektiert den geöffneten Zustand des Menüs; vorhanden, wenn das Popover sichtbar ist."
    },
    {
     "desc": "An <pura-menu-item>: deaktiviert den Eintrag und verhindert Auswahl und Fokus."
    }
   ],
   "demoHTML": "<pura-dropdown-menu>\n  <button slot=\"trigger\">Optionen</button>\n\n  <pura-menu-label>Konto</pura-menu-label>\n  <pura-menu-item>\n    Profil\n    <span slot=\"shortcut\">Ctrl P</span>\n  </pura-menu-item>\n  <pura-menu-item>\n    Einstellungen\n    <span slot=\"shortcut\">Ctrl ,</span>\n  </pura-menu-item>\n\n  <pura-menu-separator></pura-menu-separator>\n\n  <pura-menu-item disabled>Abrechnung</pura-menu-item>\n  <pura-menu-item>Abmelden</pura-menu-item>\n</pura-dropdown-menu>"
  },
  "it": {
   "description": "Un componente nativo (Web Component) che mostra un menu di azioni ancorato a un trigger, costruito sulla Popover API nativa (top layer, light dismiss ed ESC inclusi) con posizionamento tramite CSS anchor. Usalo per raggruppare azioni contestuali attivate da un pulsante, come menu \"altre opzioni\", azioni di riga o menu del profilo. Supporta la navigazione con i tasti freccia, Home/End, Invio/Spazio e voci con icona, scorciatoia e stato disabilitato.",
   "attributes": [
    {
     "desc": "Controlla/riflette lo stato aperto del menu; presente quando il popover è visibile."
    },
    {
     "desc": "Su <pura-menu-item>: disabilita la voce, impedendone selezione e focus."
    }
   ],
   "demoHTML": "<pura-dropdown-menu>\n  <button slot=\"trigger\">Opzioni</button>\n\n  <pura-menu-label>Account</pura-menu-label>\n  <pura-menu-item>\n    Profilo\n    <span slot=\"shortcut\">Ctrl P</span>\n  </pura-menu-item>\n  <pura-menu-item>\n    Impostazioni\n    <span slot=\"shortcut\">Ctrl ,</span>\n  </pura-menu-item>\n\n  <pura-menu-separator></pura-menu-separator>\n\n  <pura-menu-item disabled>Fatturazione</pura-menu-item>\n  <pura-menu-item>Esci</pura-menu-item>\n</pura-dropdown-menu>"
  }
 },
 "hover-card": {
  "pt-BR": {
   "description": "O Hover Card é um web component nativo (pura-hover-card) que mostra um cartão não modal com conteúdo rico quando o usuário passa o mouse sobre ou foca o gatilho. Ele usa a Popover API nativa (top layer, light dismiss e ESC incluídos) com posicionamento por CSS anchor, além de atrasos configuráveis de abertura e fechamento. Útil para prévias de perfil, definições, links e qualquer detalhe contextual que não deva interromper o fluxo do usuário.",
   "attributes": [
    {
     "desc": "Controla/reflete a visibilidade do cartão; presente quando aberto."
    },
    {
     "desc": "Posição do cartão em relação ao gatilho."
    },
    {
     "desc": "Atraso em milissegundos antes de abrir quando a intenção do usuário é detectada."
    },
    {
     "desc": "Atraso em milissegundos antes de fechar ao sair do gatilho e do cartão."
    }
   ],
   "demoHTML": "<pura-hover-card placement=\"bottom\">\n  <a slot=\"trigger\" href=\"#\" style=\"color: var(--pura-accent, #4f46e5); text-decoration: underline;\">@andre</a>\n\n  <div style=\"display: flex; gap: 12px; align-items: flex-start;\">\n    <img src=\"https://i.pravatar.cc/48?img=12\" alt=\"André\" width=\"48\" height=\"48\" style=\"border-radius: 50%;\" />\n    <div>\n      <strong>André Ahlert</strong>\n      <p style=\"margin: 4px 0 8px;\">Fundador da AEX Partners. Criando ferramentas para a web nativa.</p>\n      <small style=\"color: var(--pura-muted, #6b7280);\">Entrou em março de 2021</small>\n    </div>\n  </div>\n</pura-hover-card>"
  },
  "fr": {
   "description": "Le Hover Card est un web component natif (pura-hover-card) qui affiche une carte non modale au contenu riche lorsque l'utilisateur survole ou active le déclencheur. Il utilise la Popover API native (top layer, light dismiss et ESC inclus) avec positionnement par CSS anchor, ainsi que des délais d'ouverture et de fermeture configurables. Utile pour les aperçus de profil, les définitions, les liens et tout détail contextuel qui ne doit pas interrompre le flux de l'utilisateur.",
   "attributes": [
    {
     "desc": "Contrôle/reflète la visibilité de la carte ; présent lorsqu'elle est ouverte."
    },
    {
     "desc": "Position de la carte par rapport au déclencheur."
    },
    {
     "desc": "Délai en millisecondes avant l'ouverture lorsque l'intention de l'utilisateur est détectée."
    },
    {
     "desc": "Délai en millisecondes avant la fermeture en quittant le déclencheur et la carte."
    }
   ],
   "demoHTML": "<pura-hover-card placement=\"bottom\">\n  <a slot=\"trigger\" href=\"#\" style=\"color: var(--pura-accent, #4f46e5); text-decoration: underline;\">@andre</a>\n\n  <div style=\"display: flex; gap: 12px; align-items: flex-start;\">\n    <img src=\"https://i.pravatar.cc/48?img=12\" alt=\"André\" width=\"48\" height=\"48\" style=\"border-radius: 50%;\" />\n    <div>\n      <strong>André Ahlert</strong>\n      <p style=\"margin: 4px 0 8px;\">Fondateur d'AEX Partners. Crée des outils pour le web natif.</p>\n      <small style=\"color: var(--pura-muted, #6b7280);\">Inscrit en mars 2021</small>\n    </div>\n  </div>\n</pura-hover-card>"
  },
  "de": {
   "description": "Die Hover Card ist ein natives Web Component (pura-hover-card), das eine nicht-modale Karte mit reichhaltigem Inhalt anzeigt, wenn der Benutzer den Auslöser überfährt oder fokussiert. Sie nutzt die native Popover API (Top Layer, Light Dismiss und ESC inklusive) mit Positionierung über CSS Anchor sowie konfigurierbare Öffnungs- und Schließverzögerungen. Nützlich für Profilvorschauen, Definitionen, Links und jedes kontextbezogene Detail, das den Fluss des Benutzers nicht unterbrechen soll.",
   "attributes": [
    {
     "desc": "Steuert/reflektiert die Sichtbarkeit der Karte; vorhanden, wenn geöffnet."
    },
    {
     "desc": "Position der Karte relativ zum Auslöser."
    },
    {
     "desc": "Verzögerung in Millisekunden vor dem Öffnen, wenn die Absicht des Benutzers erkannt wird."
    },
    {
     "desc": "Verzögerung in Millisekunden vor dem Schließen beim Verlassen von Auslöser und Karte."
    }
   ],
   "demoHTML": "<pura-hover-card placement=\"bottom\">\n  <a slot=\"trigger\" href=\"#\" style=\"color: var(--pura-accent, #4f46e5); text-decoration: underline;\">@andre</a>\n\n  <div style=\"display: flex; gap: 12px; align-items: flex-start;\">\n    <img src=\"https://i.pravatar.cc/48?img=12\" alt=\"André\" width=\"48\" height=\"48\" style=\"border-radius: 50%;\" />\n    <div>\n      <strong>André Ahlert</strong>\n      <p style=\"margin: 4px 0 8px;\">Gründer von AEX Partners. Entwickelt Tools für das native Web.</p>\n      <small style=\"color: var(--pura-muted, #6b7280);\">Beigetreten im März 2021</small>\n    </div>\n  </div>\n</pura-hover-card>"
  },
  "it": {
   "description": "L'Hover Card è un web component nativo (pura-hover-card) che mostra una scheda non modale con contenuti dettagliati quando l'utente passa il mouse sopra o mette a fuoco il trigger. Usa la Popover API nativa (top layer, light dismiss ed ESC inclusi) con posizionamento tramite CSS anchor, oltre a ritardi di apertura e chiusura configurabili. Utile per anteprime di profilo, definizioni, link e qualsiasi dettaglio contestuale che non debba interrompere il flusso dell'utente.",
   "attributes": [
    {
     "desc": "Controlla/riflette la visibilità della scheda; presente quando è aperta."
    },
    {
     "desc": "Posizione della scheda rispetto al trigger."
    },
    {
     "desc": "Ritardo in millisecondi prima dell'apertura quando viene rilevata l'intenzione dell'utente."
    },
    {
     "desc": "Ritardo in millisecondi prima della chiusura quando si abbandonano il trigger e la scheda."
    }
   ],
   "demoHTML": "<pura-hover-card placement=\"bottom\">\n  <a slot=\"trigger\" href=\"#\" style=\"color: var(--pura-accent, #4f46e5); text-decoration: underline;\">@andre</a>\n\n  <div style=\"display: flex; gap: 12px; align-items: flex-start;\">\n    <img src=\"https://i.pravatar.cc/48?img=12\" alt=\"André\" width=\"48\" height=\"48\" style=\"border-radius: 50%;\" />\n    <div>\n      <strong>André Ahlert</strong>\n      <p style=\"margin: 4px 0 8px;\">Fondatore di AEX Partners. Crea strumenti per il web nativo.</p>\n      <small style=\"color: var(--pura-muted, #6b7280);\">Iscritto a marzo 2021</small>\n    </div>\n  </div>\n</pura-hover-card>"
  }
 },
 "kbd-shortcuts": {
  "pt-BR": {
   "description": "`<pura-kbd-shortcuts>` abre um `<dialog>` modal nativo que renderiza, como chips no estilo de teclas, os atalhos declarados como filhos `<pura-shortcut>` (puros portadores de dados, sem UI própria) agrupados por seção. Use-o quando seu app tem vários atalhos e você quer um painel de ajuda padronizado (por exemplo, aberto com \"?\"). É agent-native: cada instância se registra em `window.__puraKbdShortcuts` e reflete `data-pura-kbd-shortcuts` (id), `data-count` e `data-key` no host, enquanto expõe o corpo como `role=\"list\"` com cada linha em um `aria-label` de \"rótulo: teclas\", para que um agente possa descobrir, inspecionar e acionar a ajuda sem tocar no shadow DOM.",
   "attributes": [
    {
     "desc": "Título exibido no cabeçalho do diálogo (o slot \"header\" tem prioridade quando preenchido)."
    },
    {
     "desc": "Combinação de teclas que abre/alterna a ajuda quando pressionada em qualquer lugar do documento, por exemplo \"?\" ou \"Meta+/\" / \"⌘ /\". Vazio = sem atalho. Aceita tokens de símbolo (⌘ ⌥ ⌃ ⇧) ou nomes (Meta Cmd Ctrl Control Alt Option Shift) mais uma tecla final, separados por espaço ou \"+\"."
    },
    {
     "desc": "Reflete e controla o estado de aberto; a presença do atributo abre o diálogo (showModal)."
    }
   ],
   "demoHTML": "<button id=\"abrir-atalhos\" class=\"pura-trigger\">Ver atalhos de teclado (ou pressione ?)</button>\n\n<pura-kbd-shortcuts id=\"ajuda\" title=\"Atalhos de teclado\" key=\"?\">\n  <pura-shortcut keys=\"⌘ K\" label=\"Abrir busca\" section=\"Geral\"></pura-shortcut>\n  <pura-shortcut keys=\"⌘ /\" label=\"Mostrar atalhos\" section=\"Geral\"></pura-shortcut>\n  <pura-shortcut keys=\"G I\" label=\"Ir para a caixa de entrada\" section=\"Navegação\"></pura-shortcut>\n  <pura-shortcut keys=\"G C\" label=\"Ir para o calendário\" section=\"Navegação\"></pura-shortcut>\n  <pura-shortcut keys=\"⌘ Enter\" label=\"Enviar\" section=\"Edição\"></pura-shortcut>\n  <pura-shortcut keys=\"Esc\" label=\"Cancelar\" section=\"Edição\"></pura-shortcut>\n  <span slot=\"footer\">Pressione ? a qualquer momento para reabrir esta ajuda.</span>\n</pura-kbd-shortcuts>\n\n<script type=\"module\">\n  import \"/pura/lib/kbd-shortcuts.js\";\n  const ajuda = document.getElementById(\"ajuda\");\n  document.getElementById(\"abrir-atalhos\").addEventListener(\"click\", () => ajuda.open());\n</script>"
  },
  "fr": {
   "description": "`<pura-kbd-shortcuts>` ouvre une `<dialog>` modale native qui affiche, sous forme de pastilles façon touches, les raccourcis déclarés comme enfants `<pura-shortcut>` (purs porteurs de données, sans interface propre) regroupés par section. Utilisez-le lorsque votre application comporte plusieurs raccourcis et que vous souhaitez un panneau d'aide standard (par exemple ouvert avec \"?\"). Il est agent-native : chaque instance s'enregistre dans `window.__puraKbdShortcuts` et reflète `data-pura-kbd-shortcuts` (id), `data-count` et `data-key` sur l'hôte, tout en exposant le corps en tant que `role=\"list\"` avec chaque ligne dans un `aria-label` de type « libellé : touches », afin qu'un agent puisse découvrir, inspecter et déclencher l'aide sans toucher au shadow DOM.",
   "attributes": [
    {
     "desc": "Titre affiché dans l'en-tête de la boîte de dialogue (le slot « header » est prioritaire lorsqu'il est rempli)."
    },
    {
     "desc": "Combinaison de touches qui ouvre/bascule l'aide lorsqu'elle est pressée n'importe où dans le document, par exemple \"?\" ou \"Meta+/\" / \"⌘ /\". Vide = aucun raccourci. Accepte des jetons symboliques (⌘ ⌥ ⌃ ⇧) ou des noms (Meta Cmd Ctrl Control Alt Option Shift) suivis d'une touche finale, séparés par un espace ou un \"+\"."
    },
    {
     "desc": "Reflète et contrôle l'état d'ouverture ; la présence de l'attribut ouvre la boîte de dialogue (showModal)."
    }
   ],
   "demoHTML": "<button id=\"abrir-atalhos\" class=\"pura-trigger\">Voir les raccourcis clavier (ou appuyez sur ?)</button>\n\n<pura-kbd-shortcuts id=\"ajuda\" title=\"Raccourcis clavier\" key=\"?\">\n  <pura-shortcut keys=\"⌘ K\" label=\"Ouvrir la recherche\" section=\"Général\"></pura-shortcut>\n  <pura-shortcut keys=\"⌘ /\" label=\"Afficher les raccourcis\" section=\"Général\"></pura-shortcut>\n  <pura-shortcut keys=\"G I\" label=\"Aller à la boîte de réception\" section=\"Navigation\"></pura-shortcut>\n  <pura-shortcut keys=\"G C\" label=\"Aller au calendrier\" section=\"Navigation\"></pura-shortcut>\n  <pura-shortcut keys=\"⌘ Enter\" label=\"Envoyer\" section=\"Édition\"></pura-shortcut>\n  <pura-shortcut keys=\"Esc\" label=\"Annuler\" section=\"Édition\"></pura-shortcut>\n  <span slot=\"footer\">Appuyez sur ? à tout moment pour rouvrir cette aide.</span>\n</pura-kbd-shortcuts>\n\n<script type=\"module\">\n  import \"/pura/lib/kbd-shortcuts.js\";\n  const ajuda = document.getElementById(\"ajuda\");\n  document.getElementById(\"abrir-atalhos\").addEventListener(\"click\", () => ajuda.open());\n</script>"
  },
  "de": {
   "description": "`<pura-kbd-shortcuts>` öffnet ein natives modales `<dialog>`, das die als `<pura-shortcut>`-Kindelemente deklarierten Tastenkürzel (reine Datenträger ohne eigene Oberfläche) als tastenförmige Chips gruppiert nach Abschnitt darstellt. Verwenden Sie es, wenn Ihre App mehrere Tastenkürzel hat und Sie ein standardisiertes Hilfe-Panel möchten (zum Beispiel mit \"?\" geöffnet). Es ist agent-native: Jede Instanz registriert sich in `window.__puraKbdShortcuts` und spiegelt `data-pura-kbd-shortcuts` (id), `data-count` und `data-key` auf dem Host, während sie den Inhalt als `role=\"list\"` bereitstellt, wobei jede Zeile in einem `aria-label` der Form „Beschriftung: Tasten“ steht, sodass ein Agent die Hilfe erkennen, inspizieren und auslösen kann, ohne das Shadow DOM zu berühren.",
   "attributes": [
    {
     "desc": "Im Dialogkopf angezeigter Titel (der Slot „header“ hat Vorrang, wenn er gefüllt ist)."
    },
    {
     "desc": "Tastenkombination, die die Hilfe öffnet/umschaltet, wenn sie irgendwo im Dokument gedrückt wird, z. B. \"?\" oder \"Meta+/\" / \"⌘ /\". Leer = keine Zuweisung. Akzeptiert Symboltokens (⌘ ⌥ ⌃ ⇧) oder Namen (Meta Cmd Ctrl Control Alt Option Shift) plus eine abschließende Taste, getrennt durch ein Leerzeichen oder \"+\"."
    },
    {
     "desc": "Spiegelt und steuert den geöffneten Zustand; das Vorhandensein des Attributs öffnet den Dialog (showModal)."
    }
   ],
   "demoHTML": "<button id=\"abrir-atalhos\" class=\"pura-trigger\">Tastenkürzel anzeigen (oder ? drücken)</button>\n\n<pura-kbd-shortcuts id=\"ajuda\" title=\"Tastenkürzel\" key=\"?\">\n  <pura-shortcut keys=\"⌘ K\" label=\"Suche öffnen\" section=\"Allgemein\"></pura-shortcut>\n  <pura-shortcut keys=\"⌘ /\" label=\"Kürzel anzeigen\" section=\"Allgemein\"></pura-shortcut>\n  <pura-shortcut keys=\"G I\" label=\"Zum Posteingang\" section=\"Navigation\"></pura-shortcut>\n  <pura-shortcut keys=\"G C\" label=\"Zum Kalender\" section=\"Navigation\"></pura-shortcut>\n  <pura-shortcut keys=\"⌘ Enter\" label=\"Senden\" section=\"Bearbeitung\"></pura-shortcut>\n  <pura-shortcut keys=\"Esc\" label=\"Abbrechen\" section=\"Bearbeitung\"></pura-shortcut>\n  <span slot=\"footer\">Drücken Sie jederzeit ?, um diese Hilfe erneut zu öffnen.</span>\n</pura-kbd-shortcuts>\n\n<script type=\"module\">\n  import \"/pura/lib/kbd-shortcuts.js\";\n  const ajuda = document.getElementById(\"ajuda\");\n  document.getElementById(\"abrir-atalhos\").addEventListener(\"click\", () => ajuda.open());\n</script>"
  },
  "it": {
   "description": "`<pura-kbd-shortcuts>` apre un `<dialog>` modale nativo che mostra, come chip in stile tasti, le scorciatoie dichiarate come figli `<pura-shortcut>` (puri portatori di dati, senza interfaccia propria) raggruppate per sezione. Usalo quando la tua app ha diverse scorciatoie e vuoi un pannello di aiuto standard (per esempio aperto con \"?\"). È agent-native: ogni istanza si registra in `window.__puraKbdShortcuts` e riflette `data-pura-kbd-shortcuts` (id), `data-count` e `data-key` sull'host, esponendo il corpo come `role=\"list\"` con ogni riga in un `aria-label` del tipo «etichetta: tasti», così che un agente possa scoprire, ispezionare e attivare l'aiuto senza toccare lo shadow DOM.",
   "attributes": [
    {
     "desc": "Titolo mostrato nell'intestazione della finestra di dialogo (lo slot «header» ha la priorità quando è compilato)."
    },
    {
     "desc": "Combinazione di tasti che apre/commuta l'aiuto quando viene premuta in qualsiasi punto del documento, ad esempio \"?\" oppure \"Meta+/\" / \"⌘ /\". Vuoto = nessuna associazione. Accetta token simbolici (⌘ ⌥ ⌃ ⇧) o nomi (Meta Cmd Ctrl Control Alt Option Shift) più un tasto finale, separati da uno spazio o da un \"+\"."
    },
    {
     "desc": "Riflette e controlla lo stato di apertura; la presenza dell'attributo apre la finestra di dialogo (showModal)."
    }
   ],
   "demoHTML": "<button id=\"abrir-atalhos\" class=\"pura-trigger\">Mostra le scorciatoie da tastiera (o premi ?)</button>\n\n<pura-kbd-shortcuts id=\"ajuda\" title=\"Scorciatoie da tastiera\" key=\"?\">\n  <pura-shortcut keys=\"⌘ K\" label=\"Apri ricerca\" section=\"Generale\"></pura-shortcut>\n  <pura-shortcut keys=\"⌘ /\" label=\"Mostra scorciatoie\" section=\"Generale\"></pura-shortcut>\n  <pura-shortcut keys=\"G I\" label=\"Vai alla posta in arrivo\" section=\"Navigazione\"></pura-shortcut>\n  <pura-shortcut keys=\"G C\" label=\"Vai al calendario\" section=\"Navigazione\"></pura-shortcut>\n  <pura-shortcut keys=\"⌘ Enter\" label=\"Invia\" section=\"Modifica\"></pura-shortcut>\n  <pura-shortcut keys=\"Esc\" label=\"Annulla\" section=\"Modifica\"></pura-shortcut>\n  <span slot=\"footer\">Premi ? in qualsiasi momento per riaprire questa guida.</span>\n</pura-kbd-shortcuts>\n\n<script type=\"module\">\n  import \"/pura/lib/kbd-shortcuts.js\";\n  const ajuda = document.getElementById(\"ajuda\");\n  document.getElementById(\"abrir-atalhos\").addEventListener(\"click\", () => ajuda.open());\n</script>"
  }
 },
 "lightbox": {
  "pt-BR": {
   "description": "pura-lightbox envolve imagens (img, opcionalmente dentro de a ou figure) no light DOM e, quando você clica em uma miniatura, abre um modal em tela cheia com a imagem ampliada, setas de anterior/próximo, um contador e fechamento via ESC ou backdrop, herdando o aprisionamento de foco do dialog nativo. Use-o para galerias de fotos, portfólios ou qualquer conjunto de imagens que precise de zoom em tela cheia. É agent-native: cada instância se registra em window.__puraLightboxes (indexada por data-pura-lightbox), expondo open/close/next/prev/seek/getIndex/getCount/getItems, e o host reflete data-count, data-index e data-open, para que um agente possa ler e controlar o estado sem tocar no shadow DOM.",
   "attributes": [
    {
     "desc": "Índice da imagem aberta quando .open() é chamado sem argumento."
    },
    {
     "desc": "Faz a navegação dar a volta: da última para a primeira e vice-versa."
    },
    {
     "desc": "Rótulo acessível para a região da galeria e o modal (aria-label)."
    },
    {
     "desc": "Reflete e controla o estado aberto/fechado do visualizador modal."
    }
   ],
   "demoHTML": "<pura-lightbox label=\"Fotos da viagem\" loop>\n  <img src=\"https://picsum.photos/id/1018/200/140\" alt=\"Montanhas ao amanhecer\" data-full=\"https://picsum.photos/id/1018/1200/800\" />\n  <img src=\"https://picsum.photos/id/1015/200/140\" alt=\"Rio entre as rochas\" data-full=\"https://picsum.photos/id/1015/1200/800\" />\n  <img src=\"https://picsum.photos/id/1016/200/140\" alt=\"Vale com neblina\" data-full=\"https://picsum.photos/id/1016/1200/800\" />\n</pura-lightbox>"
  },
  "fr": {
   "description": "pura-lightbox enveloppe des images (img, éventuellement à l'intérieur d'un a ou d'un figure) dans le light DOM et, lorsque vous cliquez sur une vignette, ouvre une fenêtre modale plein écran avec l'image agrandie, des flèches précédent/suivant, un compteur et une fermeture via ESC ou arrière-plan, héritant du piégeage du focus de la dialog native. Utilisez-le pour des galeries de photos, des portfolios ou tout ensemble d'images nécessitant un zoom plein écran. Il est agent-native : chaque instance s'enregistre dans window.__puraLightboxes (indexée par data-pura-lightbox), exposant open/close/next/prev/seek/getIndex/getCount/getItems, et l'hôte reflète data-count, data-index et data-open, afin qu'un agent puisse lire et contrôler l'état sans toucher au shadow DOM.",
   "attributes": [
    {
     "desc": "Index de l'image ouverte lorsque .open() est appelé sans argument."
    },
    {
     "desc": "Fait boucler la navigation : de la dernière à la première et inversement."
    },
    {
     "desc": "Libellé accessible pour la zone de la galerie et la fenêtre modale (aria-label)."
    },
    {
     "desc": "Reflète et contrôle l'état ouvert/fermé de la visionneuse modale."
    }
   ],
   "demoHTML": "<pura-lightbox label=\"Photos du voyage\" loop>\n  <img src=\"https://picsum.photos/id/1018/200/140\" alt=\"Montagnes à l'aube\" data-full=\"https://picsum.photos/id/1018/1200/800\" />\n  <img src=\"https://picsum.photos/id/1015/200/140\" alt=\"Rivière entre les rochers\" data-full=\"https://picsum.photos/id/1015/1200/800\" />\n  <img src=\"https://picsum.photos/id/1016/200/140\" alt=\"Vallée dans la brume\" data-full=\"https://picsum.photos/id/1016/1200/800\" />\n</pura-lightbox>"
  },
  "de": {
   "description": "pura-lightbox umschließt Bilder (img, optional innerhalb eines a oder figure) im Light DOM und öffnet beim Klick auf eine Miniaturansicht ein Vollbild-Modal mit dem vergrößerten Bild, Vor-/Zurück-Pfeilen, einem Zähler und Schließen per ESC oder Backdrop, wobei es das Fokus-Trapping vom nativen dialog erbt. Verwenden Sie es für Fotogalerien, Portfolios oder jede Bildergruppe, die einen Vollbild-Zoom benötigt. Es ist agent-native: Jede Instanz registriert sich in window.__puraLightboxes (indexiert nach data-pura-lightbox) und stellt open/close/next/prev/seek/getIndex/getCount/getItems bereit, und der Host spiegelt data-count, data-index und data-open, sodass ein Agent den Zustand lesen und steuern kann, ohne das Shadow DOM zu berühren.",
   "attributes": [
    {
     "desc": "Index des Bildes, das geöffnet wird, wenn .open() ohne Argument aufgerufen wird."
    },
    {
     "desc": "Lässt die Navigation umlaufen: vom letzten zum ersten und umgekehrt."
    },
    {
     "desc": "Zugängliche Beschriftung für den Galeriebereich und das Modal (aria-label)."
    },
    {
     "desc": "Spiegelt und steuert den geöffneten/geschlossenen Zustand des modalen Betrachters."
    }
   ],
   "demoHTML": "<pura-lightbox label=\"Reisefotos\" loop>\n  <img src=\"https://picsum.photos/id/1018/200/140\" alt=\"Berge bei Sonnenaufgang\" data-full=\"https://picsum.photos/id/1018/1200/800\" />\n  <img src=\"https://picsum.photos/id/1015/200/140\" alt=\"Fluss zwischen den Felsen\" data-full=\"https://picsum.photos/id/1015/1200/800\" />\n  <img src=\"https://picsum.photos/id/1016/200/140\" alt=\"Tal im Nebel\" data-full=\"https://picsum.photos/id/1016/1200/800\" />\n</pura-lightbox>"
  },
  "it": {
   "description": "pura-lightbox racchiude immagini (img, eventualmente all'interno di un a o di un figure) nel light DOM e, quando fai clic su una miniatura, apre una finestra modale a schermo intero con l'immagine ingrandita, frecce precedente/successivo, un contatore e la chiusura tramite ESC o backdrop, ereditando il blocco del focus dal dialog nativo. Usalo per gallerie di foto, portfolio o qualsiasi insieme di immagini che necessiti di uno zoom a schermo intero. È agent-native: ogni istanza si registra in window.__puraLightboxes (indicizzata da data-pura-lightbox), esponendo open/close/next/prev/seek/getIndex/getCount/getItems, e l'host riflette data-count, data-index e data-open, così che un agente possa leggere e controllare lo stato senza toccare lo shadow DOM.",
   "attributes": [
    {
     "desc": "Indice dell'immagine aperta quando .open() viene chiamato senza argomenti."
    },
    {
     "desc": "Fa scorrere la navigazione in modo ciclico: dall'ultima alla prima e viceversa."
    },
    {
     "desc": "Etichetta accessibile per la regione della galleria e per la finestra modale (aria-label)."
    },
    {
     "desc": "Riflette e controlla lo stato aperto/chiuso del visualizzatore modale."
    }
   ],
   "demoHTML": "<pura-lightbox label=\"Foto del viaggio\" loop>\n  <img src=\"https://picsum.photos/id/1018/200/140\" alt=\"Montagne all'alba\" data-full=\"https://picsum.photos/id/1018/1200/800\" />\n  <img src=\"https://picsum.photos/id/1015/200/140\" alt=\"Fiume tra le rocce\" data-full=\"https://picsum.photos/id/1015/1200/800\" />\n  <img src=\"https://picsum.photos/id/1016/200/140\" alt=\"Valle nella nebbia\" data-full=\"https://picsum.photos/id/1016/1200/800\" />\n</pura-lightbox>"
  }
 },
 "popover": {
  "pt-BR": {
   "description": "Popover é um web component nativo que exibe um painel flutuante ancorado ao seu gatilho, construído sobre a Popover API nativa (top layer, light dismiss e ESC incluídos) com posicionamento por âncora CSS. Use-o para mostrar conteúdo contextual sob demanda, como ajuda, menus de ação ou cartões de detalhe. Controle o posicionamento com o atributo placement e abra ou feche programaticamente com os métodos show() e hide().",
   "attributes": [
    {
     "desc": "Lado do gatilho onde o painel é posicionado."
    },
    {
     "desc": "Reflete e controla o estado de aberto do painel; presente quando visível."
    }
   ],
   "demoHTML": "<pura-popover placement=\"bottom\">\n  <button slot=\"trigger\">Mais informações</button>\n  <strong>Plano Pro</strong>\n  <p>Inclui projetos ilimitados, suporte prioritário e relatórios avançados.</p>\n</pura-popover>"
  },
  "fr": {
   "description": "Popover est un web component natif qui affiche un panneau flottant ancré à son déclencheur, construit sur la Popover API native (top layer, light dismiss et ESC inclus) avec un positionnement par ancre CSS. Utilisez-le pour afficher du contenu contextuel à la demande, comme de l'aide, des menus d'actions ou des cartes de détail. Contrôlez le positionnement avec l'attribut placement, et ouvrez ou fermez-le par programmation avec les méthodes show() et hide().",
   "attributes": [
    {
     "desc": "Côté du déclencheur où le panneau est positionné."
    },
    {
     "desc": "Reflète et contrôle l'état d'ouverture du panneau ; présent lorsqu'il est visible."
    }
   ],
   "demoHTML": "<pura-popover placement=\"bottom\">\n  <button slot=\"trigger\">Plus d'informations</button>\n  <strong>Forfait Pro</strong>\n  <p>Inclut des projets illimités, une assistance prioritaire et des rapports avancés.</p>\n</pura-popover>"
  },
  "de": {
   "description": "Popover ist ein natives Web Component, das ein schwebendes, an seinen Auslöser verankertes Panel anzeigt, aufbauend auf der nativen Popover API (Top Layer, Light Dismiss und ESC inklusive) mit CSS-Anker-Positionierung. Verwenden Sie es, um kontextbezogene Inhalte bei Bedarf anzuzeigen, etwa Hilfe, Aktionsmenüs oder Detailkarten. Steuern Sie die Positionierung mit dem placement-Attribut und öffnen oder schließen Sie es programmatisch mit den Methoden show() und hide().",
   "attributes": [
    {
     "desc": "Seite des Auslösers, an der das Panel positioniert wird."
    },
    {
     "desc": "Spiegelt und steuert den geöffneten Zustand des Panels; vorhanden, wenn sichtbar."
    }
   ],
   "demoHTML": "<pura-popover placement=\"bottom\">\n  <button slot=\"trigger\">Mehr Informationen</button>\n  <strong>Pro-Tarif</strong>\n  <p>Enthält unbegrenzte Projekte, priorisierten Support und erweiterte Berichte.</p>\n</pura-popover>"
  },
  "it": {
   "description": "Popover è un web component nativo che mostra un pannello fluttuante ancorato al suo trigger, costruito sulla Popover API nativa (top layer, light dismiss ed ESC inclusi) con posizionamento tramite ancora CSS. Usalo per mostrare contenuti contestuali su richiesta, come aiuto, menu di azioni o schede di dettaglio. Controlla il posizionamento con l'attributo placement e aprilo o chiudilo programmaticamente con i metodi show() e hide().",
   "attributes": [
    {
     "desc": "Lato del trigger su cui viene posizionato il pannello."
    },
    {
     "desc": "Riflette e controlla lo stato di apertura del pannello; presente quando è visibile."
    }
   ],
   "demoHTML": "<pura-popover placement=\"bottom\">\n  <button slot=\"trigger\">Maggiori informazioni</button>\n  <strong>Piano Pro</strong>\n  <p>Include progetti illimitati, supporto prioritario e report avanzati.</p>\n</pura-popover>"
  }
 },
 "sheet": {
  "pt-BR": {
   "description": "Sheet é um web component nativo que exibe um painel deslizante sobre um backdrop modal, construído sobre o elemento <dialog> nativo (com aprisionamento de foco, a tecla ESC e backdrop incluídos). Use-o para formulários, filtros, detalhes ou navegação secundária que deve aparecer sobre o conteúdo sem trocar de página. O painel pode deslizar a partir da direita (padrão), esquerda, topo ou base.",
   "attributes": [
    {
     "desc": "Controla a visibilidade; presente abre o painel via showModal(), ausente o fecha."
    },
    {
     "desc": "Borda de onde o painel se origina: direita, esquerda, topo ou base."
    },
    {
     "desc": "Texto do cabeçalho exibido quando o slot header não é usado."
    }
   ],
   "demoHTML": "<pura-button id=\"abrir-sheet\">Abrir painel</pura-button>\n\n<pura-sheet id=\"meu-sheet\" title=\"Editar perfil\" side=\"right\">\n  <p>Atualize suas informações e clique em salvar quando terminar.</p>\n  <pura-input label=\"Nome\" value=\"Andre\"></pura-input>\n  <pura-input label=\"E-mail\" value=\"andre@aex.partners\"></pura-input>\n\n  <pura-button slot=\"footer\" variant=\"ghost\" id=\"cancelar-sheet\">Cancelar</pura-button>\n  <pura-button slot=\"footer\" id=\"salvar-sheet\">Salvar</pura-button>\n</pura-sheet>\n\n<script type=\"module\">\n  const sheet = document.getElementById(\"meu-sheet\");\n  document.getElementById(\"abrir-sheet\").addEventListener(\"click\", () => sheet.open());\n  document.getElementById(\"cancelar-sheet\").addEventListener(\"click\", () => sheet.close());\n  document.getElementById(\"salvar-sheet\").addEventListener(\"click\", () => sheet.close());\n</script>"
  },
  "fr": {
   "description": "Sheet est un web component natif qui affiche un panneau coulissant au-dessus d'un arrière-plan modal, construit sur l'élément <dialog> natif (avec piégeage du focus, la touche ESC et l'arrière-plan inclus). Utilisez-le pour des formulaires, des filtres, des détails ou une navigation secondaire qui doit apparaître par-dessus le contenu sans changer de page. Le panneau peut glisser depuis la droite (par défaut), la gauche, le haut ou le bas.",
   "attributes": [
    {
     "desc": "Contrôle la visibilité ; présent, ouvre le panneau via showModal(), absent, le ferme."
    },
    {
     "desc": "Bord d'où provient le panneau : droite, gauche, haut ou bas."
    },
    {
     "desc": "Texte d'en-tête affiché lorsque le slot header n'est pas utilisé."
    }
   ],
   "demoHTML": "<pura-button id=\"abrir-sheet\">Ouvrir le panneau</pura-button>\n\n<pura-sheet id=\"meu-sheet\" title=\"Modifier le profil\" side=\"right\">\n  <p>Mettez à jour vos informations et cliquez sur enregistrer une fois terminé.</p>\n  <pura-input label=\"Nom\" value=\"Andre\"></pura-input>\n  <pura-input label=\"E-mail\" value=\"andre@aex.partners\"></pura-input>\n\n  <pura-button slot=\"footer\" variant=\"ghost\" id=\"cancelar-sheet\">Annuler</pura-button>\n  <pura-button slot=\"footer\" id=\"salvar-sheet\">Enregistrer</pura-button>\n</pura-sheet>\n\n<script type=\"module\">\n  const sheet = document.getElementById(\"meu-sheet\");\n  document.getElementById(\"abrir-sheet\").addEventListener(\"click\", () => sheet.open());\n  document.getElementById(\"cancelar-sheet\").addEventListener(\"click\", () => sheet.close());\n  document.getElementById(\"salvar-sheet\").addEventListener(\"click\", () => sheet.close());\n</script>"
  },
  "de": {
   "description": "Sheet ist ein natives Web Component, das ein gleitendes Panel über einem modalen Backdrop anzeigt, aufbauend auf dem nativen <dialog>-Element (mit Fokus-Trapping, der ESC-Taste und Backdrop inklusive). Verwenden Sie es für Formulare, Filter, Details oder sekundäre Navigation, die über dem Inhalt erscheinen soll, ohne die Seite zu wechseln. Das Panel kann von rechts (Standard), links, oben oder unten hereingleiten.",
   "attributes": [
    {
     "desc": "Steuert die Sichtbarkeit; vorhanden öffnet das Panel über showModal(), nicht vorhanden schließt es."
    },
    {
     "desc": "Kante, von der das Panel ausgeht: rechts, links, oben oder unten."
    },
    {
     "desc": "Kopfzeilentext, der angezeigt wird, wenn der header-Slot nicht verwendet wird."
    }
   ],
   "demoHTML": "<pura-button id=\"abrir-sheet\">Panel öffnen</pura-button>\n\n<pura-sheet id=\"meu-sheet\" title=\"Profil bearbeiten\" side=\"right\">\n  <p>Aktualisieren Sie Ihre Informationen und klicken Sie auf Speichern, wenn Sie fertig sind.</p>\n  <pura-input label=\"Name\" value=\"Andre\"></pura-input>\n  <pura-input label=\"E-Mail\" value=\"andre@aex.partners\"></pura-input>\n\n  <pura-button slot=\"footer\" variant=\"ghost\" id=\"cancelar-sheet\">Abbrechen</pura-button>\n  <pura-button slot=\"footer\" id=\"salvar-sheet\">Speichern</pura-button>\n</pura-sheet>\n\n<script type=\"module\">\n  const sheet = document.getElementById(\"meu-sheet\");\n  document.getElementById(\"abrir-sheet\").addEventListener(\"click\", () => sheet.open());\n  document.getElementById(\"cancelar-sheet\").addEventListener(\"click\", () => sheet.close());\n  document.getElementById(\"salvar-sheet\").addEventListener(\"click\", () => sheet.close());\n</script>"
  },
  "it": {
   "description": "Sheet è un web component nativo che mostra un pannello scorrevole sopra un backdrop modale, costruito sull'elemento <dialog> nativo (con blocco del focus, il tasto ESC e backdrop inclusi). Usalo per moduli, filtri, dettagli o navigazione secondaria che devono apparire sopra il contenuto senza cambiare pagina. Il pannello può scorrere dalla destra (predefinito), dalla sinistra, dall'alto o dal basso.",
   "attributes": [
    {
     "desc": "Controlla la visibilità; presente apre il pannello tramite showModal(), assente lo chiude."
    },
    {
     "desc": "Bordo da cui ha origine il pannello: destra, sinistra, alto o basso."
    },
    {
     "desc": "Testo dell'intestazione mostrato quando lo slot header non viene usato."
    }
   ],
   "demoHTML": "<pura-button id=\"abrir-sheet\">Apri pannello</pura-button>\n\n<pura-sheet id=\"meu-sheet\" title=\"Modifica profilo\" side=\"right\">\n  <p>Aggiorna le tue informazioni e clicca su salva quando hai finito.</p>\n  <pura-input label=\"Nome\" value=\"Andre\"></pura-input>\n  <pura-input label=\"E-mail\" value=\"andre@aex.partners\"></pura-input>\n\n  <pura-button slot=\"footer\" variant=\"ghost\" id=\"cancelar-sheet\">Annulla</pura-button>\n  <pura-button slot=\"footer\" id=\"salvar-sheet\">Salva</pura-button>\n</pura-sheet>\n\n<script type=\"module\">\n  const sheet = document.getElementById(\"meu-sheet\");\n  document.getElementById(\"abrir-sheet\").addEventListener(\"click\", () => sheet.open());\n  document.getElementById(\"cancelar-sheet\").addEventListener(\"click\", () => sheet.close());\n  document.getElementById(\"salvar-sheet\").addEventListener(\"click\", () => sheet.close());\n</script>"
  }
 },
 "speed-dial": {
  "pt-BR": {
   "description": "`pura-speed-dial` é um FAB ancorado a um canto da tela que, ao clicar (ou opcionalmente ao passar o mouse), expande uma pilha de ações secundárias `pura-speed-dial-action`, cada uma com um ícone e um rótulo. Use-o para concentrar atalhos de ação primária em telas como dashboards ou apps mobile, onde um botão sempre visível oferece criar, compartilhar ou editar rapidamente. Construído sobre a Popover API nativa e o posicionamento por âncora CSS, ele ganha de graça o fechar-com-ESC e o light-dismiss, e expõe uma camada agent-native: o host espelha o estado em atributos `data-pura-speed-dial-*`, registra-se em `window.__puraSpeedDials` e oferece um getter `.state` com JSON das ações, permitindo que agentes enumerem e acionem o dial sem extrair dados do shadow DOM.",
   "attributes": [
    {
     "desc": "Canto da viewport e direção de expansão: bottom-end, bottom-start, top-end ou top-start."
    },
    {
     "desc": "Reflete e controla o estado de aberto da pilha de ações."
    },
    {
     "desc": "Quando presente, também expande ao passar o mouse (o clique ainda alterna)."
    },
    {
     "desc": "Rótulo acessível (aria-label) para o botão FAB."
    },
    {
     "desc": "Em pura-speed-dial-action: desabilita a ação (sem clique, sem foco)."
    }
   ],
   "demoHTML": "<div style=\"position:relative;height:320px;border:1px solid var(--pura-border);border-radius:var(--pura-radius);overflow:hidden;background:var(--pura-subtle)\">\n  <p style=\"padding:var(--pura-space-4);color:var(--pura-muted-fg)\">Clique no botão no canto inferior direito.</p>\n  <pura-speed-dial label=\"Ações rápidas\" style=\"position:absolute\">\n    <pura-speed-dial-action id=\"acao-novo\">\n      Novo documento\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\"><path d=\"M12 5v14M5 12h14\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/></svg>\n    </pura-speed-dial-action>\n    <pura-speed-dial-action id=\"acao-compartilhar\">\n      Compartilhar\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\"><path d=\"M4 12v8h16v-8M12 3v13M7 8l5-5 5 5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>\n    </pura-speed-dial-action>\n    <pura-speed-dial-action id=\"acao-editar\">\n      Editar\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\"><path d=\"M4 20h4L18 10l-4-4L4 16v4zM14 6l4 4\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>\n    </pura-speed-dial-action>\n  </pura-speed-dial>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/speed-dial.js\";\n  document.querySelector(\"pura-speed-dial\").addEventListener(\"action\", (e) => {\n    console.log(\"Action triggered:\", e.detail.id, e.detail.label);\n  });\n</script>"
  },
  "fr": {
   "description": "`pura-speed-dial` est un FAB ancré dans un coin de l'écran qui, au clic (ou éventuellement au survol), déploie une pile d'actions secondaires `pura-speed-dial-action`, chacune avec une icône et un libellé. Utilisez-le pour regrouper les raccourcis d'action principale sur des écrans comme les tableaux de bord ou les applications mobiles, où un bouton toujours visible permet de créer, partager ou modifier rapidement. Construit sur la Popover API native et le positionnement par ancre CSS, il bénéficie gratuitement de la fermeture par ESC et du light-dismiss, et expose une couche agent-native : l'hôte reflète l'état dans des attributs `data-pura-speed-dial-*`, s'enregistre dans `window.__puraSpeedDials` et propose un getter `.state` avec un JSON des actions, permettant aux agents d'énumérer et de déclencher le dial sans extraire de données du shadow DOM.",
   "attributes": [
    {
     "desc": "Coin de la fenêtre et direction de déploiement : bottom-end, bottom-start, top-end ou top-start."
    },
    {
     "desc": "Reflète et contrôle l'état d'ouverture de la pile d'actions."
    },
    {
     "desc": "Lorsqu'il est présent, se déploie aussi au survol (le clic continue de basculer)."
    },
    {
     "desc": "Libellé accessible (aria-label) pour le bouton FAB."
    },
    {
     "desc": "Sur pura-speed-dial-action : désactive l'action (aucun clic, aucun focus)."
    }
   ],
   "demoHTML": "<div style=\"position:relative;height:320px;border:1px solid var(--pura-border);border-radius:var(--pura-radius);overflow:hidden;background:var(--pura-subtle)\">\n  <p style=\"padding:var(--pura-space-4);color:var(--pura-muted-fg)\">Cliquez sur le bouton dans le coin inférieur droit.</p>\n  <pura-speed-dial label=\"Actions rapides\" style=\"position:absolute\">\n    <pura-speed-dial-action id=\"acao-novo\">\n      Nouveau document\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\"><path d=\"M12 5v14M5 12h14\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/></svg>\n    </pura-speed-dial-action>\n    <pura-speed-dial-action id=\"acao-compartilhar\">\n      Partager\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\"><path d=\"M4 12v8h16v-8M12 3v13M7 8l5-5 5 5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>\n    </pura-speed-dial-action>\n    <pura-speed-dial-action id=\"acao-editar\">\n      Modifier\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\"><path d=\"M4 20h4L18 10l-4-4L4 16v4zM14 6l4 4\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>\n    </pura-speed-dial-action>\n  </pura-speed-dial>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/speed-dial.js\";\n  document.querySelector(\"pura-speed-dial\").addEventListener(\"action\", (e) => {\n    console.log(\"Action triggered:\", e.detail.id, e.detail.label);\n  });\n</script>"
  },
  "de": {
   "description": "`pura-speed-dial` ist ein FAB, der in einer Ecke des Bildschirms verankert ist und beim Klick (oder optional beim Überfahren) einen Stapel sekundärer `pura-speed-dial-action`-Aktionen ausklappt, jede mit einem Symbol und einer Beschriftung. Verwenden Sie es, um Verknüpfungen für Primäraktionen auf Bildschirmen wie Dashboards oder mobilen Apps zu bündeln, wo eine stets sichtbare Schaltfläche schnelles Erstellen, Teilen oder Bearbeiten ermöglicht. Aufbauend auf der nativen Popover API und der CSS-Anker-Positionierung erhält es kostenlos das Schließen-per-ESC und Light-Dismiss und stellt eine agent-native Ebene bereit: Der Host spiegelt den Zustand in `data-pura-speed-dial-*`-Attributen, registriert sich in `window.__puraSpeedDials` und bietet einen `.state`-Getter mit JSON der Aktionen, sodass Agenten den Dial aufzählen und auslösen können, ohne das Shadow DOM auszulesen.",
   "attributes": [
    {
     "desc": "Viewport-Ecke und Ausklapprichtung: bottom-end, bottom-start, top-end oder top-start."
    },
    {
     "desc": "Spiegelt und steuert den geöffneten Zustand des Aktionsstapels."
    },
    {
     "desc": "Wenn vorhanden, klappt es auch beim Überfahren aus (Klicken schaltet weiterhin um)."
    },
    {
     "desc": "Zugängliche Beschriftung (aria-label) für die FAB-Schaltfläche."
    },
    {
     "desc": "Bei pura-speed-dial-action: deaktiviert die Aktion (kein Klick, kein Fokus)."
    }
   ],
   "demoHTML": "<div style=\"position:relative;height:320px;border:1px solid var(--pura-border);border-radius:var(--pura-radius);overflow:hidden;background:var(--pura-subtle)\">\n  <p style=\"padding:var(--pura-space-4);color:var(--pura-muted-fg)\">Klicken Sie auf die Schaltfläche in der unteren rechten Ecke.</p>\n  <pura-speed-dial label=\"Schnellaktionen\" style=\"position:absolute\">\n    <pura-speed-dial-action id=\"acao-novo\">\n      Neues Dokument\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\"><path d=\"M12 5v14M5 12h14\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/></svg>\n    </pura-speed-dial-action>\n    <pura-speed-dial-action id=\"acao-compartilhar\">\n      Teilen\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\"><path d=\"M4 12v8h16v-8M12 3v13M7 8l5-5 5 5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>\n    </pura-speed-dial-action>\n    <pura-speed-dial-action id=\"acao-editar\">\n      Bearbeiten\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\"><path d=\"M4 20h4L18 10l-4-4L4 16v4zM14 6l4 4\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>\n    </pura-speed-dial-action>\n  </pura-speed-dial>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/speed-dial.js\";\n  document.querySelector(\"pura-speed-dial\").addEventListener(\"action\", (e) => {\n    console.log(\"Action triggered:\", e.detail.id, e.detail.label);\n  });\n</script>"
  },
  "it": {
   "description": "`pura-speed-dial` è un FAB ancorato a un angolo dello schermo che, al clic (o facoltativamente al passaggio del mouse), espande una pila di azioni secondarie `pura-speed-dial-action`, ciascuna con un'icona e un'etichetta. Usalo per concentrare le scorciatoie delle azioni primarie su schermate come dashboard o app mobili, dove un pulsante sempre visibile offre creazione, condivisione o modifica rapide. Costruito sulla Popover API nativa e sul posizionamento tramite ancora CSS, ottiene gratuitamente la chiusura con ESC e il light-dismiss, ed espone uno strato agent-native: l'host rispecchia lo stato in attributi `data-pura-speed-dial-*`, si registra in `window.__puraSpeedDials` e offre un getter `.state` con il JSON delle azioni, consentendo agli agenti di enumerare e attivare il dial senza estrarre dati dallo shadow DOM.",
   "attributes": [
    {
     "desc": "Angolo della viewport e direzione di espansione: bottom-end, bottom-start, top-end o top-start."
    },
    {
     "desc": "Riflette e controlla lo stato di apertura della pila di azioni."
    },
    {
     "desc": "Quando presente, si espande anche al passaggio del mouse (il clic continua a commutare)."
    },
    {
     "desc": "Etichetta accessibile (aria-label) per il pulsante FAB."
    },
    {
     "desc": "Su pura-speed-dial-action: disabilita l'azione (nessun clic, nessun focus)."
    }
   ],
   "demoHTML": "<div style=\"position:relative;height:320px;border:1px solid var(--pura-border);border-radius:var(--pura-radius);overflow:hidden;background:var(--pura-subtle)\">\n  <p style=\"padding:var(--pura-space-4);color:var(--pura-muted-fg)\">Clicca sul pulsante nell'angolo in basso a destra.</p>\n  <pura-speed-dial label=\"Azioni rapide\" style=\"position:absolute\">\n    <pura-speed-dial-action id=\"acao-novo\">\n      Nuovo documento\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\"><path d=\"M12 5v14M5 12h14\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/></svg>\n    </pura-speed-dial-action>\n    <pura-speed-dial-action id=\"acao-compartilhar\">\n      Condividi\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\"><path d=\"M4 12v8h16v-8M12 3v13M7 8l5-5 5 5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>\n    </pura-speed-dial-action>\n    <pura-speed-dial-action id=\"acao-editar\">\n      Modifica\n      <svg slot=\"icon\" viewBox=\"0 0 24 24\"><path d=\"M4 20h4L18 10l-4-4L4 16v4zM14 6l4 4\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>\n    </pura-speed-dial-action>\n  </pura-speed-dial>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/speed-dial.js\";\n  document.querySelector(\"pura-speed-dial\").addEventListener(\"action\", (e) => {\n    console.log(\"Action triggered:\", e.detail.id, e.detail.label);\n  });\n</script>"
  }
 },
 "split-button": {
  "pt-BR": {
   "description": "O Split Button une uma ação primária a um botão de seta que abre um menu de ações secundárias, construído sobre a Popover API nativa (top layer, light dismiss e ESC de graça) e o posicionamento por âncora CSS. Use-o quando houver uma ação padrão dominante mais um conjunto de alternativas menos frequentes, como Salvar com opções como Salvar como rascunho ou Salvar e fechar. Camada agent-native: o componente espelha o estado em tempo real em atributos estáveis data-pura-split-* (disabled, loading, variant, open) e registra-se em window.__puraSplitButtons indexado por data-pura-id, permitindo que agentes enumerem, leiam e controlem cada split button da página sem tocar nos internos.",
   "attributes": [
    {
     "desc": "Estilo visual: primary, secondary, ghost ou danger."
    },
    {
     "desc": "Tamanho do botão: sm, md ou lg."
    },
    {
     "desc": "Desabilita ambos os botões (primário e caret)."
    },
    {
     "desc": "Mostra um spinner no botão primário e torna ambos inertes."
    },
    {
     "desc": "Lado em que o menu abre: bottom ou top."
    },
    {
     "desc": "Rótulo acessível para o botão caret e o menu."
    },
    {
     "desc": "Reflete e controla o estado de aberto do menu."
    },
    {
     "desc": "Faz o componente ocupar a largura total, com o botão primário se expandindo."
    }
   ],
   "demoHTML": "<pura-split-button id=\"salvar\" variant=\"primary\">\n  Salvar\n  <pura-menu-item slot=\"menu\" data-action=\"rascunho\">Salvar como rascunho</pura-menu-item>\n  <pura-menu-item slot=\"menu\" data-action=\"fechar\">Salvar e fechar</pura-menu-item>\n  <pura-menu-separator slot=\"menu\"></pura-menu-separator>\n  <pura-menu-item slot=\"menu\" data-action=\"modelo\">Salvar como modelo</pura-menu-item>\n</pura-split-button>\n\n<p id=\"status-salvar\" style=\"margin-top:1rem;font:inherit;color:var(--pura-muted,#666)\"></p>\n\n<script type=\"module\">\n  import \"/pura/lib/split-button.js\";\n  const btn = document.getElementById(\"salvar\");\n  const status = document.getElementById(\"status-salvar\");\n  btn.addEventListener(\"click\", () => { status.textContent = \"Document saved.\"; });\n  btn.addEventListener(\"select\", (e) => {\n    status.textContent = \"Action: \" + e.target.getAttribute(\"data-action\");\n  });\n</script>"
  },
  "fr": {
   "description": "Le Split Button associe une action principale à un bouton fléché qui ouvre un menu d'actions secondaires, construit sur la Popover API native (top layer, light dismiss et ESC gratuits) et le positionnement par ancre CSS. Utilisez-le lorsqu'il existe une action par défaut dominante plus un ensemble d'alternatives moins fréquentes, comme Enregistrer avec des options telles qu'Enregistrer comme brouillon ou Enregistrer et fermer. Couche agent-native : le composant reflète l'état en temps réel dans des attributs stables data-pura-split-* (disabled, loading, variant, open) et s'enregistre dans window.__puraSplitButtons indexé par data-pura-id, permettant aux agents d'énumérer, de lire et de piloter chaque split button de la page sans toucher aux composants internes.",
   "attributes": [
    {
     "desc": "Style visuel : primary, secondary, ghost ou danger."
    },
    {
     "desc": "Taille du bouton : sm, md ou lg."
    },
    {
     "desc": "Désactive les deux boutons (principal et chevron)."
    },
    {
     "desc": "Affiche un spinner sur le bouton principal et rend les deux inertes."
    },
    {
     "desc": "Côté où le menu s'ouvre : bottom ou top."
    },
    {
     "desc": "Libellé accessible pour le bouton chevron et le menu."
    },
    {
     "desc": "Reflète et contrôle l'état d'ouverture du menu."
    },
    {
     "desc": "Fait occuper toute la largeur au composant, avec le bouton principal qui s'étend."
    }
   ],
   "demoHTML": "<pura-split-button id=\"salvar\" variant=\"primary\">\n  Enregistrer\n  <pura-menu-item slot=\"menu\" data-action=\"rascunho\">Enregistrer comme brouillon</pura-menu-item>\n  <pura-menu-item slot=\"menu\" data-action=\"fechar\">Enregistrer et fermer</pura-menu-item>\n  <pura-menu-separator slot=\"menu\"></pura-menu-separator>\n  <pura-menu-item slot=\"menu\" data-action=\"modelo\">Enregistrer comme modèle</pura-menu-item>\n</pura-split-button>\n\n<p id=\"status-salvar\" style=\"margin-top:1rem;font:inherit;color:var(--pura-muted,#666)\"></p>\n\n<script type=\"module\">\n  import \"/pura/lib/split-button.js\";\n  const btn = document.getElementById(\"salvar\");\n  const status = document.getElementById(\"status-salvar\");\n  btn.addEventListener(\"click\", () => { status.textContent = \"Document saved.\"; });\n  btn.addEventListener(\"select\", (e) => {\n    status.textContent = \"Action: \" + e.target.getAttribute(\"data-action\");\n  });\n</script>"
  },
  "de": {
   "description": "Der Split Button verbindet eine Primäraktion mit einer Pfeilschaltfläche, die ein Menü mit Sekundäraktionen öffnet, aufbauend auf der nativen Popover API (Top Layer, Light Dismiss und ESC kostenlos) und der CSS-Anker-Positionierung. Verwenden Sie ihn, wenn es eine dominante Standardaktion plus eine Reihe selteneren Alternativen gibt, etwa Speichern mit Optionen wie Als Entwurf speichern oder Speichern und schließen. Agent-native Ebene: Die Komponente spiegelt den Live-Zustand in stabilen data-pura-split-*-Attributen (disabled, loading, variant, open) und registriert sich in window.__puraSplitButtons indexiert nach data-pura-id, sodass Agenten jeden Split Button auf der Seite aufzählen, lesen und steuern können, ohne interne Bestandteile zu berühren.",
   "attributes": [
    {
     "desc": "Visueller Stil: primary, secondary, ghost oder danger."
    },
    {
     "desc": "Schaltflächengröße: sm, md oder lg."
    },
    {
     "desc": "Deaktiviert beide Schaltflächen (primär und Caret)."
    },
    {
     "desc": "Zeigt einen Spinner auf der primären Schaltfläche und macht beide inaktiv."
    },
    {
     "desc": "Seite, auf der sich das Menü öffnet: bottom oder top."
    },
    {
     "desc": "Zugängliche Beschriftung für die Caret-Schaltfläche und das Menü."
    },
    {
     "desc": "Spiegelt und steuert den geöffneten Zustand des Menüs."
    },
    {
     "desc": "Lässt die Komponente die volle Breite einnehmen, wobei sich die primäre Schaltfläche ausdehnt."
    }
   ],
   "demoHTML": "<pura-split-button id=\"salvar\" variant=\"primary\">\n  Speichern\n  <pura-menu-item slot=\"menu\" data-action=\"rascunho\">Als Entwurf speichern</pura-menu-item>\n  <pura-menu-item slot=\"menu\" data-action=\"fechar\">Speichern und schließen</pura-menu-item>\n  <pura-menu-separator slot=\"menu\"></pura-menu-separator>\n  <pura-menu-item slot=\"menu\" data-action=\"modelo\">Als Vorlage speichern</pura-menu-item>\n</pura-split-button>\n\n<p id=\"status-salvar\" style=\"margin-top:1rem;font:inherit;color:var(--pura-muted,#666)\"></p>\n\n<script type=\"module\">\n  import \"/pura/lib/split-button.js\";\n  const btn = document.getElementById(\"salvar\");\n  const status = document.getElementById(\"status-salvar\");\n  btn.addEventListener(\"click\", () => { status.textContent = \"Document saved.\"; });\n  btn.addEventListener(\"select\", (e) => {\n    status.textContent = \"Action: \" + e.target.getAttribute(\"data-action\");\n  });\n</script>"
  },
  "it": {
   "description": "Lo Split Button unisce un'azione primaria a un pulsante freccia che apre un menu di azioni secondarie, costruito sulla Popover API nativa (top layer, light dismiss ed ESC gratuiti) e sul posizionamento tramite ancora CSS. Usalo quando esiste un'azione predefinita dominante più un insieme di alternative meno frequenti, come Salva con opzioni quali Salva come bozza o Salva e chiudi. Strato agent-native: il componente rispecchia lo stato in tempo reale in attributi stabili data-pura-split-* (disabled, loading, variant, open) e si registra in window.__puraSplitButtons indicizzato per data-pura-id, consentendo agli agenti di enumerare, leggere e pilotare ogni split button della pagina senza toccare le parti interne.",
   "attributes": [
    {
     "desc": "Stile visivo: primary, secondary, ghost o danger."
    },
    {
     "desc": "Dimensione del pulsante: sm, md o lg."
    },
    {
     "desc": "Disabilita entrambi i pulsanti (primario e caret)."
    },
    {
     "desc": "Mostra uno spinner sul pulsante primario e rende entrambi inerti."
    },
    {
     "desc": "Lato su cui si apre il menu: bottom o top."
    },
    {
     "desc": "Etichetta accessibile per il pulsante caret e il menu."
    },
    {
     "desc": "Riflette e controlla lo stato di apertura del menu."
    },
    {
     "desc": "Fa occupare al componente l'intera larghezza, con il pulsante primario che si espande."
    }
   ],
   "demoHTML": "<pura-split-button id=\"salvar\" variant=\"primary\">\n  Salva\n  <pura-menu-item slot=\"menu\" data-action=\"rascunho\">Salva come bozza</pura-menu-item>\n  <pura-menu-item slot=\"menu\" data-action=\"fechar\">Salva e chiudi</pura-menu-item>\n  <pura-menu-separator slot=\"menu\"></pura-menu-separator>\n  <pura-menu-item slot=\"menu\" data-action=\"modelo\">Salva come modello</pura-menu-item>\n</pura-split-button>\n\n<p id=\"status-salvar\" style=\"margin-top:1rem;font:inherit;color:var(--pura-muted,#666)\"></p>\n\n<script type=\"module\">\n  import \"/pura/lib/split-button.js\";\n  const btn = document.getElementById(\"salvar\");\n  const status = document.getElementById(\"status-salvar\");\n  btn.addEventListener(\"click\", () => { status.textContent = \"Document saved.\"; });\n  btn.addEventListener(\"select\", (e) => {\n    status.textContent = \"Action: \" + e.target.getAttribute(\"data-action\");\n  });\n</script>"
  }
 },
 "spotlight": {
  "pt-BR": {
   "description": "Spotlight escurece a tela inteira com uma sobreposição modal (um <dialog> nativo via showModal, com top layer, ESC e aprisionamento de foco de graça) e abre um recorte transparente ao redor do elemento apontado por target, recortado a partir do seu bounding rect e reposicionado ao rolar/redimensionar. Use-o para direcionar a atenção durante o onboarding, tours guiados ou para destacar um elemento específico da interface. É agent-native: cada instância se registra em window.__puraSpotlights por id, e o dialog expõe atributos estáveis data-pura-spotlight, data-target e data-active, permitindo que agentes descubram e controlem o destaque programaticamente.",
   "attributes": [
    {
     "desc": "Seletor CSS do elemento a destacar (resolvido em tempo real). Sem target, a sobreposição apenas escurece a página de modo uniforme."
    },
    {
     "desc": "Raio dos cantos do recorte (qualquer comprimento CSS)."
    },
    {
     "desc": "Px extras ao redor do retângulo do alvo, para dar espaço."
    },
    {
     "desc": "Nome acessível da sobreposição (aria-label)."
    },
    {
     "desc": "Reflete o estado visível; presente -> exibido."
    }
   ],
   "demoHTML": "<div style=\"padding:24px;display:flex;flex-direction:column;gap:16px;align-items:flex-start\">\n  <p>Clique para destacar o botão abaixo:</p>\n  <button id=\"alvo\" style=\"padding:8px 16px\">Novo recurso</button>\n  <button id=\"guiar\">Mostrar destaque</button>\n</div>\n\n<pura-spotlight id=\"sp\" target=\"#alvo\" label=\"Conheça o novo recurso\"></pura-spotlight>\n\n<script type=\"module\">\n  import \"/pura/lib/spotlight.js\";\n  const sp = document.getElementById(\"sp\");\n  document.getElementById(\"guiar\").addEventListener(\"click\", () => sp.show());\n</script>"
  },
  "fr": {
   "description": "Spotlight assombrit tout l'écran avec une superposition modale (une <dialog> native via showModal, avec top layer, ESC et piégeage du focus gratuits) et ouvre une découpe transparente autour de l'élément désigné par target, découpé à partir de son bounding rect et repositionné lors du défilement/redimensionnement. Utilisez-le pour orienter l'attention pendant l'onboarding, les visites guidées, ou pour mettre en valeur un élément spécifique de l'interface. Il est agent-native : chaque instance s'enregistre dans window.__puraSpotlights par id, et la dialog expose des attributs stables data-pura-spotlight, data-target et data-active, permettant aux agents de découvrir et de contrôler la mise en valeur par programmation.",
   "attributes": [
    {
     "desc": "Sélecteur CSS de l'élément à mettre en valeur (résolu en direct). Sans target, la superposition se contente d'assombrir la page de manière uniforme."
    },
    {
     "desc": "Rayon des coins de la découpe (toute longueur CSS)."
    },
    {
     "desc": "Pixels supplémentaires autour du rectangle de la cible, pour laisser de l'espace."
    },
    {
     "desc": "Nom accessible de la superposition (aria-label)."
    },
    {
     "desc": "Reflète l'état visible ; présent -> affiché."
    }
   ],
   "demoHTML": "<div style=\"padding:24px;display:flex;flex-direction:column;gap:16px;align-items:flex-start\">\n  <p>Cliquez pour mettre en évidence le bouton ci-dessous :</p>\n  <button id=\"alvo\" style=\"padding:8px 16px\">Nouvelle fonctionnalité</button>\n  <button id=\"guiar\">Afficher la mise en évidence</button>\n</div>\n\n<pura-spotlight id=\"sp\" target=\"#alvo\" label=\"Découvrez la nouvelle fonctionnalité\"></pura-spotlight>\n\n<script type=\"module\">\n  import \"/pura/lib/spotlight.js\";\n  const sp = document.getElementById(\"sp\");\n  document.getElementById(\"guiar\").addEventListener(\"click\", () => sp.show());\n</script>"
  },
  "de": {
   "description": "Spotlight verdunkelt den gesamten Bildschirm mit einem modalen Overlay (ein natives <dialog> über showModal, mit Top Layer, ESC und Fokus-Trapping kostenlos) und öffnet eine transparente Aussparung um das durch target angegebene Element, ausgeschnitten aus dessen Bounding Rect und beim Scrollen/Skalieren neu positioniert. Verwenden Sie es, um die Aufmerksamkeit während des Onboardings, bei geführten Touren oder zum Hervorheben eines bestimmten Elements der Oberfläche zu lenken. Es ist agent-native: Jede Instanz registriert sich in window.__puraSpotlights nach id, und der Dialog stellt stabile Attribute data-pura-spotlight, data-target und data-active bereit, sodass Agenten die Hervorhebung programmatisch erkennen und steuern können.",
   "attributes": [
    {
     "desc": "CSS-Selektor des hervorzuhebenden Elements (live aufgelöst). Ohne target verdunkelt das Overlay die Seite lediglich gleichmäßig."
    },
    {
     "desc": "Eckenradius der Aussparung (beliebige CSS-Länge)."
    },
    {
     "desc": "Zusätzliche px um das Rechteck des Ziels, für etwas Freiraum."
    },
    {
     "desc": "Zugänglicher Name des Overlays (aria-label)."
    },
    {
     "desc": "Spiegelt den sichtbaren Zustand; vorhanden -> angezeigt."
    }
   ],
   "demoHTML": "<div style=\"padding:24px;display:flex;flex-direction:column;gap:16px;align-items:flex-start\">\n  <p>Klicken Sie, um die Schaltfläche unten hervorzuheben:</p>\n  <button id=\"alvo\" style=\"padding:8px 16px\">Neue Funktion</button>\n  <button id=\"guiar\">Hervorhebung anzeigen</button>\n</div>\n\n<pura-spotlight id=\"sp\" target=\"#alvo\" label=\"Lernen Sie die neue Funktion kennen\"></pura-spotlight>\n\n<script type=\"module\">\n  import \"/pura/lib/spotlight.js\";\n  const sp = document.getElementById(\"sp\");\n  document.getElementById(\"guiar\").addEventListener(\"click\", () => sp.show());\n</script>"
  },
  "it": {
   "description": "Spotlight oscura tutto lo schermo con una sovrapposizione modale (un <dialog> nativo tramite showModal, con top layer, ESC e blocco del focus gratuiti) e apre un ritaglio trasparente attorno all'elemento indicato da target, ritagliato dal suo bounding rect e riposizionato allo scorrimento/ridimensionamento. Usalo per indirizzare l'attenzione durante l'onboarding, i tour guidati o per mettere in evidenza un elemento specifico dell'interfaccia. È agent-native: ogni istanza si registra in window.__puraSpotlights per id, e il dialog espone attributi stabili data-pura-spotlight, data-target e data-active, consentendo agli agenti di scoprire e controllare l'evidenziazione programmaticamente.",
   "attributes": [
    {
     "desc": "Selettore CSS dell'elemento da evidenziare (risolto in tempo reale). Senza target, la sovrapposizione si limita a oscurare la pagina in modo uniforme."
    },
    {
     "desc": "Raggio degli angoli del ritaglio (qualsiasi lunghezza CSS)."
    },
    {
     "desc": "Px aggiuntivi attorno al rettangolo del target, per lasciare respiro."
    },
    {
     "desc": "Nome accessibile della sovrapposizione (aria-label)."
    },
    {
     "desc": "Riflette lo stato visibile; presente -> mostrato."
    }
   ],
   "demoHTML": "<div style=\"padding:24px;display:flex;flex-direction:column;gap:16px;align-items:flex-start\">\n  <p>Clicca per evidenziare il pulsante qui sotto:</p>\n  <button id=\"alvo\" style=\"padding:8px 16px\">Nuova funzionalità</button>\n  <button id=\"guiar\">Mostra evidenziazione</button>\n</div>\n\n<pura-spotlight id=\"sp\" target=\"#alvo\" label=\"Scopri la nuova funzionalità\"></pura-spotlight>\n\n<script type=\"module\">\n  import \"/pura/lib/spotlight.js\";\n  const sp = document.getElementById(\"sp\");\n  document.getElementById(\"guiar\").addEventListener(\"click\", () => sp.show());\n</script>"
  }
 },
 "tooltip": {
  "pt-BR": {
   "description": "Tooltip é um web component nativo que envolve um elemento gatilho e exibe um pequeno texto de apoio quando o usuário passa o mouse sobre ele ou o foca com o teclado. Use-o para descrever ícones, abreviar rótulos ou adicionar contexto extra sem ocupar espaço permanente na interface.",
   "attributes": [
    {
     "desc": "Texto exibido dentro da dica."
    },
    {
     "desc": "Posição da dica em relação ao gatilho."
    }
   ],
   "demoHTML": "<pura-tooltip text=\"Salvar alterações\">\n  <pura-button>Salvar</pura-button>\n</pura-tooltip>\n\n<pura-tooltip text=\"Excluir item\" placement=\"bottom\">\n  <pura-button variant=\"ghost\">Excluir</pura-button>\n</pura-tooltip>\n\n<pura-tooltip text=\"Mais informações\" placement=\"right\">\n  <span aria-label=\"ajuda\" style=\"cursor:help;\">?</span>\n</pura-tooltip>"
  },
  "fr": {
   "description": "Tooltip est un web component natif qui enveloppe un élément déclencheur et affiche un court texte d'appui lorsque l'utilisateur le survole ou y met le focus au clavier. Utilisez-le pour décrire des icônes, abréger des libellés ou ajouter un contexte supplémentaire sans occuper un espace permanent dans l'interface.",
   "attributes": [
    {
     "desc": "Texte affiché à l'intérieur de l'info-bulle."
    },
    {
     "desc": "Position de l'info-bulle par rapport au déclencheur."
    }
   ],
   "demoHTML": "<pura-tooltip text=\"Enregistrer les modifications\">\n  <pura-button>Enregistrer</pura-button>\n</pura-tooltip>\n\n<pura-tooltip text=\"Supprimer l'élément\" placement=\"bottom\">\n  <pura-button variant=\"ghost\">Supprimer</pura-button>\n</pura-tooltip>\n\n<pura-tooltip text=\"Plus d'informations\" placement=\"right\">\n  <span aria-label=\"aide\" style=\"cursor:help;\">?</span>\n</pura-tooltip>"
  },
  "de": {
   "description": "Tooltip ist ein natives Web Component, das ein Auslöserelement umschließt und einen kurzen ergänzenden Text anzeigt, wenn der Benutzer es überfährt oder per Tastatur fokussiert. Verwenden Sie es, um Symbole zu beschreiben, Beschriftungen abzukürzen oder zusätzlichen Kontext hinzuzufügen, ohne dauerhaft Platz in der Oberfläche zu beanspruchen.",
   "attributes": [
    {
     "desc": "Innerhalb des Hinweises angezeigter Text."
    },
    {
     "desc": "Position des Hinweises relativ zum Auslöser."
    }
   ],
   "demoHTML": "<pura-tooltip text=\"Änderungen speichern\">\n  <pura-button>Speichern</pura-button>\n</pura-tooltip>\n\n<pura-tooltip text=\"Element löschen\" placement=\"bottom\">\n  <pura-button variant=\"ghost\">Löschen</pura-button>\n</pura-tooltip>\n\n<pura-tooltip text=\"Mehr Informationen\" placement=\"right\">\n  <span aria-label=\"Hilfe\" style=\"cursor:help;\">?</span>\n</pura-tooltip>"
  },
  "it": {
   "description": "Tooltip è un web component nativo che racchiude un elemento trigger e mostra un breve testo di supporto quando l'utente vi passa sopra il mouse o lo mette a fuoco con la tastiera. Usalo per descrivere icone, abbreviare etichette o aggiungere contesto extra senza occupare spazio permanente nell'interfaccia.",
   "attributes": [
    {
     "desc": "Testo mostrato all'interno del suggerimento."
    },
    {
     "desc": "Posizione del suggerimento rispetto al trigger."
    }
   ],
   "demoHTML": "<pura-tooltip text=\"Salva modifiche\">\n  <pura-button>Salva</pura-button>\n</pura-tooltip>\n\n<pura-tooltip text=\"Elimina elemento\" placement=\"bottom\">\n  <pura-button variant=\"ghost\">Elimina</pura-button>\n</pura-tooltip>\n\n<pura-tooltip text=\"Maggiori informazioni\" placement=\"right\">\n  <span aria-label=\"aiuto\" style=\"cursor:help;\">?</span>\n</pura-tooltip>"
  }
 },
 "tour": {
  "pt-BR": {
   "description": "pura-tour percorre uma sequência de alvos (declarados como pura-tour-step), destacando cada um com um spotlight sobre um dialog modal nativo e exibindo um coachmark ancorado via posicionamento por âncora CSS, com botões Voltar/Avançar/Concluir, um contador de passos e navegação por teclas de seta. Use-o para onboarding, apresentação de novas funcionalidades ou tutoriais guiados. É agent-native: cada tour se registra em window.__puraTours indexado por id, e a sobreposição carrega atributos estáveis e legíveis por máquina (data-pura-tour, data-step, data-total, data-running) além de ARIA correto, permitindo que agentes descubram e conduzam o tour via start()/next()/back()/goTo()/stop().",
   "attributes": [
    {
     "desc": "Reflete o estado de execução do tour; presente na marcação inicial, inicia o tour automaticamente ao conectar."
    },
    {
     "desc": "Passo atual (refletido). Alterar o atributo enquanto o tour está em execução navega até esse passo via goTo()."
    }
   ],
   "demoHTML": "<div style=\"display:grid;gap:1rem;max-width:420px\">\n  <h2 id=\"passo-titulo\">Painel da conta</h2>\n  <button id=\"passo-salvar\" type=\"button\">Salvar alterações</button>\n  <a id=\"passo-ajuda\" href=\"#\">Central de ajuda</a>\n  <button id=\"iniciar-tour\" type=\"button\">Iniciar tour</button>\n</div>\n\n<pura-tour id=\"tour-onboarding\">\n  <pura-tour-step target=\"#passo-titulo\" title=\"Bem-vindo\" placement=\"bottom\">Este é o seu painel principal, onde você gerencia a sua conta.</pura-tour-step>\n  <pura-tour-step target=\"#passo-salvar\" title=\"Salve suas alterações\" placement=\"bottom\">Clique aqui sempre que ajustar algo para não perder o seu progresso.</pura-tour-step>\n  <pura-tour-step target=\"#passo-ajuda\" title=\"Precisa de ajuda?\" placement=\"top\">Acesse a central de ajuda a qualquer momento por este link.</pura-tour-step>\n</pura-tour>\n\n<script type=\"module\">\n  import \"/pura/lib/tour.js\";\n  const tour = document.getElementById(\"tour-onboarding\");\n  document.getElementById(\"iniciar-tour\").addEventListener(\"click\", () => tour.start());\n</script>"
  },
  "fr": {
   "description": "pura-tour parcourt une séquence de cibles (déclarées comme pura-tour-step), mettant chacune en valeur avec un spotlight par-dessus une boîte de dialogue modale native et affichant un coachmark ancré via le positionnement par ancre CSS, avec des boutons Précédent/Suivant/Terminé, un compteur d'étapes et une navigation aux touches fléchées. Utilisez-le pour l'onboarding, la présentation de nouvelles fonctionnalités ou des visites guidées. Il est agent-native : chaque visite s'enregistre dans window.__puraTours indexée par id, et la superposition porte des attributs stables et lisibles par machine (data-pura-tour, data-step, data-total, data-running) ainsi qu'un ARIA correct, permettant aux agents de découvrir et de piloter la visite via start()/next()/back()/goTo()/stop().",
   "attributes": [
    {
     "desc": "Reflète l'état d'exécution de la visite ; présent dans le balisage initial, il démarre la visite automatiquement à la connexion."
    },
    {
     "desc": "Étape actuelle (reflétée). Modifier l'attribut pendant que la visite est en cours navigue vers cette étape via goTo()."
    }
   ],
   "demoHTML": "<div style=\"display:grid;gap:1rem;max-width:420px\">\n  <h2 id=\"passo-titulo\">Tableau de bord du compte</h2>\n  <button id=\"passo-salvar\" type=\"button\">Enregistrer les modifications</button>\n  <a id=\"passo-ajuda\" href=\"#\">Centre d'aide</a>\n  <button id=\"iniciar-tour\" type=\"button\">Démarrer la visite</button>\n</div>\n\n<pura-tour id=\"tour-onboarding\">\n  <pura-tour-step target=\"#passo-titulo\" title=\"Bienvenue\" placement=\"bottom\">Voici votre tableau de bord principal, où vous gérez votre compte.</pura-tour-step>\n  <pura-tour-step target=\"#passo-salvar\" title=\"Enregistrez vos modifications\" placement=\"bottom\">Cliquez ici chaque fois que vous ajustez quelque chose afin de ne pas perdre votre progression.</pura-tour-step>\n  <pura-tour-step target=\"#passo-ajuda\" title=\"Besoin d'aide ?\" placement=\"top\">Accédez au centre d'aide à tout moment grâce à ce lien.</pura-tour-step>\n</pura-tour>\n\n<script type=\"module\">\n  import \"/pura/lib/tour.js\";\n  const tour = document.getElementById(\"tour-onboarding\");\n  document.getElementById(\"iniciar-tour\").addEventListener(\"click\", () => tour.start());\n</script>"
  },
  "de": {
   "description": "pura-tour durchläuft eine Folge von Zielen (deklariert als pura-tour-step), hebt jedes mit einem Spotlight über einem nativen modalen Dialog hervor und zeigt ein per CSS-Anker-Positionierung verankertes Coachmark, mit Zurück-/Weiter-/Fertig-Schaltflächen, einem Schrittzähler und Navigation per Pfeiltasten. Verwenden Sie es für Onboarding, die Vorstellung neuer Funktionen oder geführte Rundgänge. Es ist agent-native: Jede Tour registriert sich in window.__puraTours indexiert nach id, und das Overlay trägt stabile, maschinenlesbare Attribute (data-pura-tour, data-step, data-total, data-running) sowie korrektes ARIA, sodass Agenten die Tour über start()/next()/back()/goTo()/stop() erkennen und steuern können.",
   "attributes": [
    {
     "desc": "Spiegelt den Ausführungszustand der Tour; im anfänglichen Markup vorhanden, startet es die Tour beim Verbinden automatisch."
    },
    {
     "desc": "Aktueller Schritt (gespiegelt). Das Ändern des Attributs während der laufenden Tour navigiert über goTo() zu diesem Schritt."
    }
   ],
   "demoHTML": "<div style=\"display:grid;gap:1rem;max-width:420px\">\n  <h2 id=\"passo-titulo\">Konto-Dashboard</h2>\n  <button id=\"passo-salvar\" type=\"button\">Änderungen speichern</button>\n  <a id=\"passo-ajuda\" href=\"#\">Hilfecenter</a>\n  <button id=\"iniciar-tour\" type=\"button\">Tour starten</button>\n</div>\n\n<pura-tour id=\"tour-onboarding\">\n  <pura-tour-step target=\"#passo-titulo\" title=\"Willkommen\" placement=\"bottom\">Dies ist Ihr Haupt-Dashboard, auf dem Sie Ihr Konto verwalten.</pura-tour-step>\n  <pura-tour-step target=\"#passo-salvar\" title=\"Speichern Sie Ihre Änderungen\" placement=\"bottom\">Klicken Sie hier, wann immer Sie etwas anpassen, damit Sie Ihren Fortschritt nicht verlieren.</pura-tour-step>\n  <pura-tour-step target=\"#passo-ajuda\" title=\"Brauchen Sie Hilfe?\" placement=\"top\">Erreichen Sie das Hilfecenter jederzeit über diesen Link.</pura-tour-step>\n</pura-tour>\n\n<script type=\"module\">\n  import \"/pura/lib/tour.js\";\n  const tour = document.getElementById(\"tour-onboarding\");\n  document.getElementById(\"iniciar-tour\").addEventListener(\"click\", () => tour.start());\n</script>"
  },
  "it": {
   "description": "pura-tour percorre una sequenza di target (dichiarati come pura-tour-step), evidenziando ciascuno con uno spotlight sopra una finestra di dialogo modale nativa e mostrando un coachmark ancorato tramite posizionamento con ancora CSS, con pulsanti Indietro/Avanti/Fatto, un contatore dei passi e navigazione con i tasti freccia. Usalo per l'onboarding, la presentazione di nuove funzionalità o le procedure guidate. È agent-native: ogni tour si registra in window.__puraTours indicizzato per id, e la sovrapposizione presenta attributi stabili e leggibili dalla macchina (data-pura-tour, data-step, data-total, data-running) oltre ad ARIA corretto, consentendo agli agenti di scoprire e pilotare il tour tramite start()/next()/back()/goTo()/stop().",
   "attributes": [
    {
     "desc": "Riflette lo stato di esecuzione del tour; presente nel markup iniziale, avvia il tour automaticamente alla connessione."
    },
    {
     "desc": "Passo corrente (riflesso). Modificare l'attributo mentre il tour è in esecuzione naviga a quel passo tramite goTo()."
    }
   ],
   "demoHTML": "<div style=\"display:grid;gap:1rem;max-width:420px\">\n  <h2 id=\"passo-titulo\">Dashboard dell'account</h2>\n  <button id=\"passo-salvar\" type=\"button\">Salva modifiche</button>\n  <a id=\"passo-ajuda\" href=\"#\">Centro assistenza</a>\n  <button id=\"iniciar-tour\" type=\"button\">Avvia il tour</button>\n</div>\n\n<pura-tour id=\"tour-onboarding\">\n  <pura-tour-step target=\"#passo-titulo\" title=\"Benvenuto\" placement=\"bottom\">Questa è la tua dashboard principale, dove gestisci il tuo account.</pura-tour-step>\n  <pura-tour-step target=\"#passo-salvar\" title=\"Salva le tue modifiche\" placement=\"bottom\">Fai clic qui ogni volta che modifichi qualcosa per non perdere i tuoi progressi.</pura-tour-step>\n  <pura-tour-step target=\"#passo-ajuda\" title=\"Hai bisogno di aiuto?\" placement=\"top\">Raggiungi il centro assistenza in qualsiasi momento tramite questo link.</pura-tour-step>\n</pura-tour>\n\n<script type=\"module\">\n  import \"/pura/lib/tour.js\";\n  const tour = document.getElementById(\"tour-onboarding\");\n  document.getElementById(\"iniciar-tour\").addEventListener(\"click\", () => tour.start());\n</script>"
  }
 },
 "accordion": {
  "pt-BR": {
   "description": "Um componente nativo (Web Component) construído sobre os elementos <details>/<summary>, herdando acessibilidade e navegação por teclado de graça. Use-o para agrupar conteúdo em painéis que o usuário abre e fecha, como FAQs ou configurações divididas em seções. Com o atributo single, apenas um painel permanece aberto por vez.",
   "attributes": [
    {
     "desc": "No <pura-accordion>: quando presente, mantém apenas um item aberto por vez."
    },
    {
     "desc": "No <pura-accordion-item>: texto exibido no cabeçalho/gatilho do painel."
    },
    {
     "desc": "No <pura-accordion-item>: quando presente, o item começa expandido (também refletido como a propriedade .open)."
    }
   ],
   "demoHTML": "<pura-accordion single>\n  <pura-accordion-item label=\"O que é a pura?\" open>\n    A pura é uma biblioteca de UI construída com Web Components nativos, sem dependências.\n  </pura-accordion-item>\n  <pura-accordion-item label=\"Preciso de um framework?\">\n    Não. Os componentes funcionam em qualquer página HTML, com ou sem framework.\n  </pura-accordion-item>\n  <pura-accordion-item label=\"Como funciona a acessibilidade?\">\n    Cada item usa <details>/<summary> nativos, com suporte a teclado e leitores de tela.\n  </pura-accordion-item>\n</pura-accordion>"
  },
  "fr": {
   "description": "Un composant natif (Web Component) construit au-dessus des éléments <details>/<summary>, héritant gratuitement de l'accessibilité et de la navigation au clavier. Utilisez-le pour regrouper du contenu en panneaux que l'utilisateur ouvre et ferme, comme des FAQ ou des paramètres répartis en sections. Avec l'attribut single, un seul panneau reste ouvert à la fois.",
   "attributes": [
    {
     "desc": "Sur <pura-accordion> : lorsqu'il est présent, ne garde qu'un seul élément ouvert à la fois."
    },
    {
     "desc": "Sur <pura-accordion-item> : texte affiché dans l'en-tête/le déclencheur du panneau."
    },
    {
     "desc": "Sur <pura-accordion-item> : lorsqu'il est présent, l'élément démarre déplié (également reflété par la propriété .open)."
    }
   ],
   "demoHTML": "<pura-accordion single>\n  <pura-accordion-item label=\"Qu'est-ce que pura ?\" open>\n    pura est une bibliothèque d'interface construite avec des Web Components natifs, sans dépendances.\n  </pura-accordion-item>\n  <pura-accordion-item label=\"Ai-je besoin d'un framework ?\">\n    Non. Les composants fonctionnent sur n'importe quelle page HTML, avec ou sans framework.\n  </pura-accordion-item>\n  <pura-accordion-item label=\"Comment fonctionne l'accessibilité ?\">\n    Chaque élément utilise les balises natives <details>/<summary>, avec prise en charge du clavier et des lecteurs d'écran.\n  </pura-accordion-item>\n</pura-accordion>"
  },
  "de": {
   "description": "Eine native Komponente (Web Component), die auf den Elementen <details>/<summary> aufbaut und Barrierefreiheit sowie Tastaturnavigation kostenlos erbt. Verwenden Sie sie, um Inhalte in Panels zu gruppieren, die der Benutzer öffnet und schließt, etwa FAQs oder in Abschnitte aufgeteilte Einstellungen. Mit dem Attribut single bleibt jeweils nur ein Panel geöffnet.",
   "attributes": [
    {
     "desc": "An <pura-accordion>: Wenn vorhanden, bleibt jeweils nur ein Element geöffnet."
    },
    {
     "desc": "An <pura-accordion-item>: Text, der im Kopf/Auslöser des Panels angezeigt wird."
    },
    {
     "desc": "An <pura-accordion-item>: Wenn vorhanden, startet das Element aufgeklappt (wird auch als Eigenschaft .open gespiegelt)."
    }
   ],
   "demoHTML": "<pura-accordion single>\n  <pura-accordion-item label=\"Was ist pura?\" open>\n    pura ist eine UI-Bibliothek, die mit nativen Web Components erstellt wurde, ohne Abhängigkeiten.\n  </pura-accordion-item>\n  <pura-accordion-item label=\"Brauche ich ein Framework?\">\n    Nein. Die Komponenten funktionieren auf jeder HTML-Seite, mit oder ohne Framework.\n  </pura-accordion-item>\n  <pura-accordion-item label=\"Wie funktioniert die Barrierefreiheit?\">\n    Jedes Element verwendet natives <details>/<summary>, mit Tastatur- und Screenreader-Unterstützung.\n  </pura-accordion-item>\n</pura-accordion>"
  },
  "it": {
   "description": "Un componente nativo (Web Component) costruito sugli elementi <details>/<summary>, ereditando gratuitamente accessibilità e navigazione da tastiera. Usalo per raggruppare i contenuti in pannelli che l'utente apre e chiude, come FAQ o impostazioni suddivise in sezioni. Con l'attributo single, resta aperto un solo pannello alla volta.",
   "attributes": [
    {
     "desc": "Su <pura-accordion>: quando presente, mantiene aperto un solo elemento alla volta."
    },
    {
     "desc": "Su <pura-accordion-item>: testo mostrato nell'intestazione/attivatore del pannello."
    },
    {
     "desc": "Su <pura-accordion-item>: quando presente, l'elemento parte espanso (riflesso anche come proprietà .open)."
    }
   ],
   "demoHTML": "<pura-accordion single>\n  <pura-accordion-item label=\"Che cos'è pura?\" open>\n    pura è una libreria di UI costruita con Web Components nativi, senza dipendenze.\n  </pura-accordion-item>\n  <pura-accordion-item label=\"Ho bisogno di un framework?\">\n    No. I componenti funzionano su qualsiasi pagina HTML, con o senza framework.\n  </pura-accordion-item>\n  <pura-accordion-item label=\"Come funziona l'accessibilità?\">\n    Ogni elemento usa <details>/<summary> nativi, con supporto per tastiera e screen reader.\n  </pura-accordion-item>\n</pura-accordion>"
  }
 },
 "collapsible": {
  "pt-BR": {
   "description": "Collapsible é um web component nativo (sem dependências) que revela ou oculta um bloco de conteúdo quando você clica no gatilho, com uma animação suave de altura. Use-o quando precisar de uma única região expansível mais leve que um accordion, como mostrar detalhes opcionais, FAQs simples ou seções de configurações avançadas.",
   "attributes": [
    {
     "desc": "Quando presente, mostra o conteúdo expandido."
    },
    {
     "desc": "Desabilita o gatilho, impedindo abrir ou fechar."
    }
   ],
   "demoHTML": "<pura-collapsible open>\n  <span slot=\"trigger\">Detalhes do pedido</span>\n  <p>Seu pedido foi confirmado e será enviado em até 2 dias úteis. Você receberá o código de rastreamento por e-mail assim que a transportadora retirar o pacote.</p>\n</pura-collapsible>"
  },
  "fr": {
   "description": "Collapsible est un web component natif (sans dépendances) qui révèle ou masque un bloc de contenu lorsque vous cliquez sur le déclencheur, avec une animation de hauteur fluide. Utilisez-le lorsque vous avez besoin d'une seule région extensible plus légère qu'un accordéon, comme afficher des détails optionnels, des FAQ simples ou des sections de paramètres avancés.",
   "attributes": [
    {
     "desc": "Lorsqu'il est présent, affiche le contenu déplié."
    },
    {
     "desc": "Désactive le déclencheur, empêchant l'ouverture ou la fermeture."
    }
   ],
   "demoHTML": "<pura-collapsible open>\n  <span slot=\"trigger\">Détails de la commande</span>\n  <p>Votre commande a été confirmée et sera expédiée sous 2 jours ouvrés. Vous recevrez le numéro de suivi par e-mail dès que le transporteur aura récupéré le colis.</p>\n</pura-collapsible>"
  },
  "de": {
   "description": "Collapsible ist eine native Web Component (ohne Abhängigkeiten), die einen Inhaltsblock ein- oder ausblendet, wenn Sie auf den Auslöser klicken, mit einer sanften Höhenanimation. Verwenden Sie sie, wenn Sie einen einzelnen aufklappbaren Bereich benötigen, der leichter als ein Accordion ist, etwa um optionale Details, einfache FAQs oder Abschnitte mit erweiterten Einstellungen anzuzeigen.",
   "attributes": [
    {
     "desc": "Wenn vorhanden, wird der Inhalt aufgeklappt angezeigt."
    },
    {
     "desc": "Deaktiviert den Auslöser und verhindert das Öffnen oder Schließen."
    }
   ],
   "demoHTML": "<pura-collapsible open>\n  <span slot=\"trigger\">Bestelldetails</span>\n  <p>Ihre Bestellung wurde bestätigt und wird innerhalb von 2 Werktagen versendet. Sie erhalten die Sendungsnummer per E-Mail, sobald der Versanddienstleister das Paket abgeholt hat.</p>\n</pura-collapsible>"
  },
  "it": {
   "description": "Collapsible è un web component nativo (senza dipendenze) che mostra o nasconde un blocco di contenuto quando fai clic sull'attivatore, con una fluida animazione di altezza. Usalo quando hai bisogno di una singola area espandibile più leggera di un accordion, come mostrare dettagli opzionali, FAQ semplici o sezioni di impostazioni avanzate.",
   "attributes": [
    {
     "desc": "Quando presente, mostra il contenuto espanso."
    },
    {
     "desc": "Disabilita l'attivatore, impedendo l'apertura o la chiusura."
    }
   ],
   "demoHTML": "<pura-collapsible open>\n  <span slot=\"trigger\">Dettagli dell'ordine</span>\n  <p>Il tuo ordine è stato confermato e verrà spedito entro 2 giorni lavorativi. Riceverai il numero di tracciamento via e-mail non appena il corriere ritirerà il pacco.</p>\n</pura-collapsible>"
  }
 },
 "faq": {
  "pt-BR": {
   "description": "pura-faq agrupa elementos pura-faq-item (cada um um par pergunta/resposta sobre details/summary nativos, ganhando acessibilidade e suporte de teclado de graça). Por padrão, abre apenas um item por vez (abrir um fecha os demais); use o atributo multi para permitir vários abertos ao mesmo tempo. É agent-native: expõe role=\"region\", atributos data-* estáveis (data-total, data-open, data-open-index) e um registro global window.__puraFaqs indexado por id, em que cada instância oferece um snapshot() legível por máquina com a pergunta e o estado de cada item, além de métodos chamáveis como openItem(i), closeItem(i) e collapseAll().",
   "attributes": [
    {
     "desc": "Permite vários itens abertos ao mesmo tempo. Sem ele, o FAQ abre apenas um por vez: abrir um item fecha os demais."
    },
    {
     "desc": "Nome acessível para a região do FAQ (aria-label)."
    },
    {
     "desc": "No pura-faq-item: refletido, indica se a resposta está expandida."
    }
   ],
   "demoHTML": "<pura-faq label=\"Perguntas frequentes\">\n  <pura-faq-item open>\n    <span slot=\"question\">A pura tem dependências?</span>\n    Não. A pura é uma biblioteca de Web Components nativos, com zero dependências. Basta importar o componente e usar a tag no seu HTML.\n  </pura-faq-item>\n  <pura-faq-item>\n    <span slot=\"question\">Funciona com qualquer framework?</span>\n    Sim. Por serem Web Components padrão, os elementos funcionam em React, Vue, Svelte ou HTML puro, sem adaptadores.\n  </pura-faq-item>\n  <pura-faq-item>\n    <span slot=\"question\">Como permito vários itens abertos ao mesmo tempo?</span>\n    Adicione o atributo <code>multi</code> ao elemento <code><pura-faq></code>.\n  </pura-faq-item>\n</pura-faq>"
  },
  "fr": {
   "description": "pura-faq regroupe des éléments pura-faq-item (chacun étant une paire question/réponse sur details/summary natifs, bénéficiant gratuitement de l'accessibilité et de la prise en charge du clavier). Par défaut, un seul élément est ouvert à la fois (en ouvrir un ferme les autres) ; utilisez l'attribut multi pour en autoriser plusieurs ouverts simultanément. Il est agent-native : il expose role=\"region\", des attributs data-* stables (data-total, data-open, data-open-index) et un registre global window.__puraFaqs indexé par id, où chaque instance propose un snapshot() lisible par machine avec la question et l'état de chaque élément, ainsi que des méthodes appelables comme openItem(i), closeItem(i) et collapseAll().",
   "attributes": [
    {
     "desc": "Autorise plusieurs éléments ouverts en même temps. Sans cet attribut, la FAQ n'en ouvre qu'un à la fois : ouvrir un élément ferme les autres."
    },
    {
     "desc": "Nom accessible de la région FAQ (aria-label)."
    },
    {
     "desc": "Sur pura-faq-item : reflété, indique si la réponse est dépliée."
    }
   ],
   "demoHTML": "<pura-faq label=\"Questions fréquentes\">\n  <pura-faq-item open>\n    <span slot=\"question\">pura a-t-il des dépendances ?</span>\n    Non. pura est une bibliothèque de Web Components natifs, sans aucune dépendance. Il suffit d'importer le composant et d'utiliser la balise dans votre HTML.\n  </pura-faq-item>\n  <pura-faq-item>\n    <span slot=\"question\">Fonctionne-t-il avec n'importe quel framework ?</span>\n    Oui. Comme ce sont des Web Components standard, les éléments fonctionnent dans React, Vue, Svelte ou en HTML simple, sans adaptateurs.\n  </pura-faq-item>\n  <pura-faq-item>\n    <span slot=\"question\">Comment autoriser plusieurs éléments ouverts à la fois ?</span>\n    Ajoutez l'attribut <code>multi</code> à l'élément <code><pura-faq></code>.\n  </pura-faq-item>\n</pura-faq>"
  },
  "de": {
   "description": "pura-faq gruppiert pura-faq-item-Elemente (jedes ein Frage/Antwort-Paar auf nativem details/summary, das Barrierefreiheit und Tastaturunterstützung kostenlos erhält). Standardmäßig ist nur ein Element gleichzeitig geöffnet (öffnet man eines, schließen sich die anderen); mit dem Attribut multi lassen sich mehrere gleichzeitig öffnen. Sie ist agent-native: Sie stellt role=\"region\", stabile data-*-Attribute (data-total, data-open, data-open-index) und ein globales Register window.__puraFaqs nach id bereit, wobei jede Instanz ein maschinenlesbares snapshot() mit der Frage und dem Zustand jedes Elements sowie aufrufbare Methoden wie openItem(i), closeItem(i) und collapseAll() bietet.",
   "attributes": [
    {
     "desc": "Erlaubt mehrere gleichzeitig geöffnete Elemente. Ohne dieses Attribut öffnet die FAQ nur eines auf einmal: Das Öffnen eines Elements schließt die anderen."
    },
    {
     "desc": "Zugänglicher Name für die FAQ-Region (aria-label)."
    },
    {
     "desc": "An pura-faq-item: gespiegelt, gibt an, ob die Antwort aufgeklappt ist."
    }
   ],
   "demoHTML": "<pura-faq label=\"Häufig gestellte Fragen\">\n  <pura-faq-item open>\n    <span slot=\"question\">Hat pura Abhängigkeiten?</span>\n    Nein. pura ist eine Bibliothek aus nativen Web Components, mit null Abhängigkeiten. Importieren Sie einfach die Komponente und verwenden Sie das Tag in Ihrem HTML.\n  </pura-faq-item>\n  <pura-faq-item>\n    <span slot=\"question\">Funktioniert es mit jedem Framework?</span>\n    Ja. Da es sich um standardmäßige Web Components handelt, funktionieren die Elemente in React, Vue, Svelte oder reinem HTML, ohne Adapter.\n  </pura-faq-item>\n  <pura-faq-item>\n    <span slot=\"question\">Wie erlaube ich mehrere gleichzeitig geöffnete Elemente?</span>\n    Fügen Sie das Attribut <code>multi</code> zum Element <code><pura-faq></code> hinzu.\n  </pura-faq-item>\n</pura-faq>"
  },
  "it": {
   "description": "pura-faq raggruppa elementi pura-faq-item (ciascuno una coppia domanda/risposta su details/summary nativi, che ottengono gratuitamente accessibilità e supporto da tastiera). Per impostazione predefinita apre un solo elemento alla volta (aprirne uno chiude gli altri); usa l'attributo multi per consentirne più aperti contemporaneamente. È agent-native: espone role=\"region\", attributi data-* stabili (data-total, data-open, data-open-index) e un registro globale window.__puraFaqs indicizzato per id, dove ogni istanza offre uno snapshot() leggibile dalla macchina con la domanda e lo stato di ciascun elemento, oltre a metodi richiamabili come openItem(i), closeItem(i) e collapseAll().",
   "attributes": [
    {
     "desc": "Consente più elementi aperti contemporaneamente. Senza di esso, la FAQ ne apre uno solo alla volta: aprire un elemento chiude gli altri."
    },
    {
     "desc": "Nome accessibile per la regione FAQ (aria-label)."
    },
    {
     "desc": "Su pura-faq-item: riflesso, indica se la risposta è espansa."
    }
   ],
   "demoHTML": "<pura-faq label=\"Domande frequenti\">\n  <pura-faq-item open>\n    <span slot=\"question\">pura ha dipendenze?</span>\n    No. pura è una libreria di Web Components nativi, con zero dipendenze. Basta importare il componente e usare il tag nel tuo HTML.\n  </pura-faq-item>\n  <pura-faq-item>\n    <span slot=\"question\">Funziona con qualsiasi framework?</span>\n    Sì. Trattandosi di Web Components standard, gli elementi funzionano in React, Vue, Svelte o in HTML puro, senza adattatori.\n  </pura-faq-item>\n  <pura-faq-item>\n    <span slot=\"question\">Come consento più elementi aperti contemporaneamente?</span>\n    Aggiungi l'attributo <code>multi</code> all'elemento <code><pura-faq></code>.\n  </pura-faq-item>\n</pura-faq>"
  }
 },
 "alert": {
  "pt-BR": {
   "description": "Alert é um web component nativo (`<pura-alert>`) que exibe um destaque com um ícone, um título opcional e uma descrição para comunicar mensagens contextuais ao usuário. Use-o para feedback inline na página, como confirmações, avisos ou erros, com quatro variantes semânticas. Pode ser dispensável, removendo-se da página ao ser fechado.",
   "attributes": [
    {
     "desc": "Variante semântica que define a cor e o ícone do destaque."
    },
    {
     "desc": "Título opcional exibido em negrito acima da descrição."
    },
    {
     "desc": "Quando presente, exibe um botão de fechar que remove o alert."
    }
   ],
   "demoHTML": "<pura-alert variant=\"info\" title=\"Atualização disponível\">\n  Uma nova versão do sistema está pronta para instalar.\n</pura-alert>\n\n<pura-alert variant=\"success\" title=\"Pagamento confirmado\" dismissible>\n  Recebemos o seu pagamento e o seu pedido já está sendo processado.\n</pura-alert>\n\n<pura-alert variant=\"warning\" title=\"Armazenamento quase cheio\">\n  Você usou 90% do seu armazenamento. Considere liberar espaço.\n</pura-alert>\n\n<pura-alert variant=\"danger\" title=\"Falha ao salvar\" dismissible>\n  Não foi possível salvar as suas alterações. Tente novamente.\n</pura-alert>"
  },
  "fr": {
   "description": "Alert est un web component natif (`<pura-alert>`) qui affiche un encart avec une icône, un titre optionnel et une description pour communiquer des messages contextuels à l'utilisateur. Utilisez-le pour un retour inline sur la page, comme des confirmations, des avertissements ou des erreurs, avec quatre variantes sémantiques. Il peut être dismissible, se retirant de la page une fois fermé.",
   "attributes": [
    {
     "desc": "Variante sémantique qui définit la couleur et l'icône de l'encart."
    },
    {
     "desc": "Titre optionnel affiché en gras au-dessus de la description."
    },
    {
     "desc": "Lorsqu'il est présent, affiche un bouton de fermeture qui retire l'alerte."
    }
   ],
   "demoHTML": "<pura-alert variant=\"info\" title=\"Mise à jour disponible\">\n  Une nouvelle version du système est prête à être installée.\n</pura-alert>\n\n<pura-alert variant=\"success\" title=\"Paiement confirmé\" dismissible>\n  Nous avons reçu votre paiement et votre commande est déjà en cours de traitement.\n</pura-alert>\n\n<pura-alert variant=\"warning\" title=\"Stockage presque plein\">\n  Vous avez utilisé 90 % de votre stockage. Pensez à libérer de l'espace.\n</pura-alert>\n\n<pura-alert variant=\"danger\" title=\"Échec de l'enregistrement\" dismissible>\n  Nous n'avons pas pu enregistrer vos modifications. Veuillez réessayer.\n</pura-alert>"
  },
  "de": {
   "description": "Alert ist eine native Web Component (`<pura-alert>`), die ein Hinweisfeld mit einem Symbol, einem optionalen Titel und einer Beschreibung anzeigt, um dem Benutzer kontextbezogene Meldungen zu vermitteln. Verwenden Sie sie für Inline-Feedback auf der Seite, etwa Bestätigungen, Warnungen oder Fehler, mit vier semantischen Varianten. Sie kann dismissible sein und entfernt sich beim Schließen von der Seite.",
   "attributes": [
    {
     "desc": "Semantische Variante, die Farbe und Symbol des Hinweisfelds festlegt."
    },
    {
     "desc": "Optionaler Titel, der fett über der Beschreibung angezeigt wird."
    },
    {
     "desc": "Wenn vorhanden, wird eine Schließen-Schaltfläche angezeigt, die das Alert entfernt."
    }
   ],
   "demoHTML": "<pura-alert variant=\"info\" title=\"Update verfügbar\">\n  Eine neue Version des Systems ist zur Installation bereit.\n</pura-alert>\n\n<pura-alert variant=\"success\" title=\"Zahlung bestätigt\" dismissible>\n  Wir haben Ihre Zahlung erhalten und Ihre Bestellung wird bereits bearbeitet.\n</pura-alert>\n\n<pura-alert variant=\"warning\" title=\"Speicher fast voll\">\n  Sie haben 90 % Ihres Speichers verwendet. Erwägen Sie, Platz freizugeben.\n</pura-alert>\n\n<pura-alert variant=\"danger\" title=\"Speichern fehlgeschlagen\" dismissible>\n  Wir konnten Ihre Änderungen nicht speichern. Bitte versuchen Sie es erneut.\n</pura-alert>"
  },
  "it": {
   "description": "Alert è un web component nativo (`<pura-alert>`) che mostra un riquadro con un'icona, un titolo opzionale e una descrizione per comunicare messaggi contestuali all'utente. Usalo per il feedback inline nella pagina, come conferme, avvisi o errori, con quattro varianti semantiche. Può essere dismissible, rimuovendosi dalla pagina alla chiusura.",
   "attributes": [
    {
     "desc": "Variante semantica che imposta il colore e l'icona del riquadro."
    },
    {
     "desc": "Titolo opzionale mostrato in grassetto sopra la descrizione."
    },
    {
     "desc": "Quando presente, mostra un pulsante di chiusura che rimuove l'alert."
    }
   ],
   "demoHTML": "<pura-alert variant=\"info\" title=\"Aggiornamento disponibile\">\n  Una nuova versione del sistema è pronta per l'installazione.\n</pura-alert>\n\n<pura-alert variant=\"success\" title=\"Pagamento confermato\" dismissible>\n  Abbiamo ricevuto il tuo pagamento e il tuo ordine è già in elaborazione.\n</pura-alert>\n\n<pura-alert variant=\"warning\" title=\"Spazio di archiviazione quasi pieno\">\n  Hai utilizzato il 90% del tuo spazio di archiviazione. Valuta di liberare spazio.\n</pura-alert>\n\n<pura-alert variant=\"danger\" title=\"Salvataggio non riuscito\" dismissible>\n  Non è stato possibile salvare le tue modifiche. Riprova.\n</pura-alert>"
  }
 },
 "banner": {
  "pt-BR": {
   "description": "`<pura-banner>` é uma faixa em largura total para avisos persistentes (manutenção, novidades, alerta de cobrança, promoção) com ícone por variante, título, mensagem, ação opcional e botão de dispensar. Use-a no topo de uma página ou seção, opcionalmente fixando-a com `sticky`. Possui uma camada agent-native: cada banner recebe um `data-pura-id` estável, entra no registro global `window.__puraBanners` e espelha seu estado ao vivo nos atributos `data-pura-banner-*` (variant, dismissible, sticky, dismissed), permitindo que agentes enumerem, leiam e dispensem banners sem inspecionar a árvore do DOM.",
   "attributes": [
    {
     "desc": "Define a cor de fundo, a borda e o ícone do banner. Um valor inválido recai para info."
    },
    {
     "desc": "Texto para a linha do título em negrito; serve como fallback para o slot title."
    },
    {
     "desc": "Texto do corpo da mensagem; serve como fallback para o slot default."
    },
    {
     "desc": "Renderiza o botão de fechar que dispara o evento dismiss e oculta o banner."
    },
    {
     "desc": "Posiciona o banner como sticky no topo do contêiner de rolagem (z-index 50)."
    },
    {
     "desc": "Rótulo acessível (aria-label) para a região; o padrão é derivado da variante."
    }
   ],
   "demoHTML": "<pura-banner variant=\"promo\" dismissible title=\"Plano anual com 30% de desconto\"\n  message=\"Oferta válida até o fim do mês para novos assinantes.\">\n  <pura-button slot=\"action\" size=\"sm\" variant=\"ghost\">Aproveitar oferta</pura-button>\n</pura-banner>\n\n<pura-banner id=\"aviso-manut\" variant=\"warning\" dismissible sticky\n  title=\"Manutenção programada\"\n  message=\"O sistema ficará indisponível neste sábado, das 2h às 4h.\">\n</pura-banner>"
  },
  "fr": {
   "description": "`<pura-banner>` est un bandeau pleine largeur pour les avis persistants (maintenance, actualités, alerte de facturation, promotion) avec une icône par variante, un titre, un message, une action optionnelle et un bouton de fermeture. Utilisez-le en haut d'une page ou d'une section, en le fixant éventuellement avec `sticky`. Il dispose d'une couche agent-native : chaque bandeau reçoit un `data-pura-id` stable, rejoint le registre global `window.__puraBanners` et reflète son état en direct dans les attributs `data-pura-banner-*` (variant, dismissible, sticky, dismissed), permettant aux agents d'énumérer, de lire et de fermer les bandeaux sans inspecter l'arbre du DOM.",
   "attributes": [
    {
     "desc": "Définit la couleur de fond, la bordure et l'icône du bandeau. Une valeur invalide revient à info."
    },
    {
     "desc": "Texte de la ligne de titre en gras ; sert de repli pour le slot title."
    },
    {
     "desc": "Texte du corps du message ; sert de repli pour le slot par défaut."
    },
    {
     "desc": "Affiche le bouton de fermeture qui déclenche l'événement dismiss et masque le bandeau."
    },
    {
     "desc": "Positionne le bandeau en sticky en haut du conteneur de défilement (z-index 50)."
    },
    {
     "desc": "Libellé accessible (aria-label) pour la région ; la valeur par défaut est dérivée de la variante."
    }
   ],
   "demoHTML": "<pura-banner variant=\"promo\" dismissible title=\"Forfait annuel avec 30 % de réduction\"\n  message=\"Offre valable jusqu'à la fin du mois pour les nouveaux abonnés.\">\n  <pura-button slot=\"action\" size=\"sm\" variant=\"ghost\">Profiter de l'offre</pura-button>\n</pura-banner>\n\n<pura-banner id=\"aviso-manut\" variant=\"warning\" dismissible sticky\n  title=\"Maintenance planifiée\"\n  message=\"Le système sera indisponible ce samedi, de 2h à 4h.\">\n</pura-banner>"
  },
  "de": {
   "description": "`<pura-banner>` ist eine vollbreite Leiste für dauerhafte Hinweise (Wartung, Neuigkeiten, Abrechnungshinweis, Aktion) mit einem Symbol je Variante, Titel, Nachricht, optionaler Aktion und Schließen-Schaltfläche. Verwenden Sie sie am oberen Rand einer Seite oder eines Abschnitts und heften Sie sie bei Bedarf mit `sticky` an. Sie verfügt über eine agent-native Ebene: Jeder Banner erhält eine stabile `data-pura-id`, tritt dem globalen Register `window.__puraBanners` bei und spiegelt seinen Live-Zustand in den Attributen `data-pura-banner-*` (variant, dismissible, sticky, dismissed), sodass Agenten Banner aufzählen, lesen und schließen können, ohne den DOM-Baum zu untersuchen.",
   "attributes": [
    {
     "desc": "Legt Hintergrundfarbe, Rahmen und Symbol des Banners fest. Ein ungültiger Wert fällt auf info zurück."
    },
    {
     "desc": "Text für die fette Titelzeile; dient als Fallback für den Slot title."
    },
    {
     "desc": "Textkörper der Nachricht; dient als Fallback für den Standard-Slot."
    },
    {
     "desc": "Rendert die Schließen-Schaltfläche, die das Ereignis dismiss auslöst und den Banner ausblendet."
    },
    {
     "desc": "Positioniert den Banner als sticky am oberen Rand des Scroll-Containers (z-index 50)."
    },
    {
     "desc": "Zugängliche Beschriftung (aria-label) für die Region; der Standard wird aus der Variante abgeleitet."
    }
   ],
   "demoHTML": "<pura-banner variant=\"promo\" dismissible title=\"Jahresabo mit 30 % Rabatt\"\n  message=\"Angebot gültig bis zum Monatsende für Neukunden.\">\n  <pura-button slot=\"action\" size=\"sm\" variant=\"ghost\">Angebot sichern</pura-button>\n</pura-banner>\n\n<pura-banner id=\"aviso-manut\" variant=\"warning\" dismissible sticky\n  title=\"Geplante Wartung\"\n  message=\"Das System ist diesen Samstag von 2 bis 4 Uhr nicht verfügbar.\">\n</pura-banner>"
  },
  "it": {
   "description": "`<pura-banner>` è una striscia a tutta larghezza per avvisi persistenti (manutenzione, novità, avviso di fatturazione, promozione) con un'icona per variante, titolo, messaggio, azione opzionale e pulsante di chiusura. Usala in cima a una pagina o a una sezione, fissandola eventualmente con `sticky`. Dispone di un livello agent-native: ogni banner riceve un `data-pura-id` stabile, entra nel registro globale `window.__puraBanners` e rispecchia il suo stato in tempo reale negli attributi `data-pura-banner-*` (variant, dismissible, sticky, dismissed), consentendo agli agenti di enumerare, leggere e chiudere i banner senza ispezionare l'albero del DOM.",
   "attributes": [
    {
     "desc": "Imposta il colore di sfondo, il bordo e l'icona del banner. Un valore non valido ricade su info."
    },
    {
     "desc": "Testo per la riga del titolo in grassetto; funge da fallback per lo slot title."
    },
    {
     "desc": "Testo del corpo del messaggio; funge da fallback per lo slot predefinito."
    },
    {
     "desc": "Renderizza il pulsante di chiusura che attiva l'evento dismiss e nasconde il banner."
    },
    {
     "desc": "Posiziona il banner come sticky in cima al contenitore di scorrimento (z-index 50)."
    },
    {
     "desc": "Etichetta accessibile (aria-label) per la regione; il valore predefinito è derivato dalla variante."
    }
   ],
   "demoHTML": "<pura-banner variant=\"promo\" dismissible title=\"Piano annuale con 30% di sconto\"\n  message=\"Offerta valida fino alla fine del mese per i nuovi abbonati.\">\n  <pura-button slot=\"action\" size=\"sm\" variant=\"ghost\">Approfitta dell'offerta</pura-button>\n</pura-banner>\n\n<pura-banner id=\"aviso-manut\" variant=\"warning\" dismissible sticky\n  title=\"Manutenzione programmata\"\n  message=\"Il sistema non sarà disponibile questo sabato, dalle 2 alle 4.\">\n</pura-banner>"
  }
 },
 "countdown": {
  "pt-BR": {
   "description": "`<pura-countdown>` faz a contagem regressiva até um momento-alvo (uma data ISO via `to`) ou por uma duração em segundos (`seconds`), atualizando a cada segundo e disparando `tick` e, ao chegar a zero, `complete`. Use-o para ofertas por tempo limitado, lançamentos, prazos ou páginas de \"em breve\", com exibição segmentada ou compacta. Camada agent-native: a cada tick ele espelha seu estado ao vivo nos atributos estáveis `data-pura-countdown-*` (remaining, days, hours, minutes, seconds, target, complete) e se registra em `window.__puraCountdowns` pelo seu `data-pura-id`, permitindo que um agente leia ou enumere cada cronômetro da página sem vasculhar o DOM.",
   "attributes": [
    {
     "desc": "Momento-alvo como datetime ISO (ex.: \"2026-12-31T23:59:59Z\"). Tem prioridade sobre seconds."
    },
    {
     "desc": "Duração em segundos a partir do momento da conexão. Uma alternativa a to; ignorado quando to está presente."
    },
    {
     "desc": "Exibe em uma única linha compacta (\"1d 02:03:04\") em vez de segmentos separados."
    },
    {
     "desc": "Oculta as legendas de unidade sob cada segmento (modo segmentado)."
    },
    {
     "desc": "Preenche o valor de dias com um zero à esquerda até 2 dígitos."
    },
    {
     "desc": "Refletido e somente leitura: presente enquanto o cronômetro está em execução."
    }
   ],
   "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:1rem;align-items:flex-start\">\n  <p style=\"margin:0;font-weight:600\">A oferta termina em:</p>\n  <pura-countdown seconds=\"90\" pad-days id=\"promo\">\n    <span slot=\"complete\">A oferta terminou!</span>\n  </pura-countdown>\n  <pura-countdown to=\"2026-12-31T23:59:59Z\" compact></pura-countdown>\n</div>"
  },
  "fr": {
   "description": "`<pura-countdown>` effectue un compte à rebours jusqu'à un moment cible (une date ISO via `to`) ou pendant une durée en secondes (`seconds`), en se mettant à jour chaque seconde et en déclenchant `tick` puis, à l'arrivée à zéro, `complete`. Utilisez-le pour des offres à durée limitée, des lancements, des échéances ou des pages \"bientôt disponible\", avec un affichage segmenté ou compact. Couche agent-native : à chaque tick, il reflète son état en direct dans les attributs stables `data-pura-countdown-*` (remaining, days, hours, minutes, seconds, target, complete) et s'enregistre dans `window.__puraCountdowns` par son `data-pura-id`, permettant à un agent de lire ou d'énumérer chaque minuteur de la page sans fouiller le DOM.",
   "attributes": [
    {
     "desc": "Moment cible sous forme de datetime ISO (par ex. \"2026-12-31T23:59:59Z\"). Prioritaire sur seconds."
    },
    {
     "desc": "Durée en secondes à partir du moment de la connexion. Une alternative à to ; ignorée lorsque to est présent."
    },
    {
     "desc": "Affiche sur une seule ligne compacte (\"1d 02:03:04\") au lieu de segments séparés."
    },
    {
     "desc": "Masque les légendes d'unité sous chaque segment (mode segmenté)."
    },
    {
     "desc": "Complète la valeur des jours d'un zéro initial jusqu'à 2 chiffres."
    },
    {
     "desc": "Reflété et en lecture seule : présent tant que le minuteur est en cours d'exécution."
    }
   ],
   "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:1rem;align-items:flex-start\">\n  <p style=\"margin:0;font-weight:600\">L'offre se termine dans :</p>\n  <pura-countdown seconds=\"90\" pad-days id=\"promo\">\n    <span slot=\"complete\">L'offre est terminée !</span>\n  </pura-countdown>\n  <pura-countdown to=\"2026-12-31T23:59:59Z\" compact></pura-countdown>\n</div>"
  },
  "de": {
   "description": "`<pura-countdown>` zählt bis zu einem Zielzeitpunkt (ein ISO-Datum über `to`) oder für eine Dauer in Sekunden (`seconds`) herunter, aktualisiert sich jede Sekunde und löst `tick` aus sowie beim Erreichen von null `complete`. Verwenden Sie ihn für zeitlich begrenzte Angebote, Veröffentlichungen, Fristen oder \"demnächst verfügbar\"-Seiten, mit segmentierter oder kompakter Anzeige. Agent-native Ebene: Bei jedem Tick spiegelt er seinen Live-Zustand in den stabilen Attributen `data-pura-countdown-*` (remaining, days, hours, minutes, seconds, target, complete) und registriert sich über seine `data-pura-id` in `window.__puraCountdowns`, sodass ein Agent jeden Timer auf der Seite lesen oder aufzählen kann, ohne das DOM zu durchforsten.",
   "attributes": [
    {
     "desc": "Zielzeitpunkt als ISO-Datetime (z. B. \"2026-12-31T23:59:59Z\"). Hat Vorrang vor seconds."
    },
    {
     "desc": "Dauer in Sekunden ab dem Moment der Verbindung. Eine Alternative zu to; wird ignoriert, wenn to vorhanden ist."
    },
    {
     "desc": "Zeigt in einer einzigen kompakten Zeile an (\"1d 02:03:04\") statt in getrennten Segmenten."
    },
    {
     "desc": "Blendet die Einheitenbeschriftungen unter jedem Segment aus (segmentierter Modus)."
    },
    {
     "desc": "Füllt den Tageswert mit einer führenden Null auf bis zu 2 Stellen auf."
    },
    {
     "desc": "Gespiegelt und schreibgeschützt: vorhanden, solange der Timer läuft."
    }
   ],
   "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:1rem;align-items:flex-start\">\n  <p style=\"margin:0;font-weight:600\">Das Angebot endet in:</p>\n  <pura-countdown seconds=\"90\" pad-days id=\"promo\">\n    <span slot=\"complete\">Das Angebot ist abgelaufen!</span>\n  </pura-countdown>\n  <pura-countdown to=\"2026-12-31T23:59:59Z\" compact></pura-countdown>\n</div>"
  },
  "it": {
   "description": "`<pura-countdown>` esegue il conto alla rovescia fino a un momento di destinazione (una data ISO tramite `to`) o per una durata in secondi (`seconds`), aggiornandosi ogni secondo e attivando `tick` e, al raggiungimento dello zero, `complete`. Usalo per offerte a tempo limitato, lanci, scadenze o pagine \"in arrivo\", con visualizzazione segmentata o compatta. Livello agent-native: a ogni tick rispecchia il suo stato in tempo reale negli attributi stabili `data-pura-countdown-*` (remaining, days, hours, minutes, seconds, target, complete) e si registra in `window.__puraCountdowns` tramite il suo `data-pura-id`, consentendo a un agente di leggere o enumerare ogni timer della pagina senza scavare nel DOM.",
   "attributes": [
    {
     "desc": "Momento di destinazione come datetime ISO (es. \"2026-12-31T23:59:59Z\"). Ha priorità su seconds."
    },
    {
     "desc": "Durata in secondi dal momento della connessione. Un'alternativa a to; ignorato quando to è presente."
    },
    {
     "desc": "Mostra su un'unica riga compatta (\"1d 02:03:04\") invece di segmenti separati."
    },
    {
     "desc": "Nasconde le didascalie delle unità sotto ciascun segmento (modalità segmentata)."
    },
    {
     "desc": "Riempie il valore dei giorni con uno zero iniziale fino a 2 cifre."
    },
    {
     "desc": "Riflesso e di sola lettura: presente mentre il timer è in esecuzione."
    }
   ],
   "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:1rem;align-items:flex-start\">\n  <p style=\"margin:0;font-weight:600\">L'offerta termina tra:</p>\n  <pura-countdown seconds=\"90\" pad-days id=\"promo\">\n    <span slot=\"complete\">L'offerta è terminata!</span>\n  </pura-countdown>\n  <pura-countdown to=\"2026-12-31T23:59:59Z\" compact></pura-countdown>\n</div>"
  }
 },
 "toast": {
  "pt-BR": {
   "description": "Toast é um web component nativo (zero dependências) para exibir mensagens curtas e não bloqueantes. `<pura-toaster>` é um contêiner fixo (uma região aria-live polite) que empilha os toasts em um canto, e cada `<pura-toast>` entra com animação, pausa ao passar o mouse e some sozinho após a duração. Na prática você usa a função imperativa `toast(message, opts)` (e os atalhos `toast.success/error/warning/info`), que cria o toaster padrão automaticamente. Use-o para confirmar ações, avisar sobre erros ou dar feedback rápido sem interromper o fluxo.",
   "attributes": [
    {
     "desc": "Canto em que <pura-toaster> empilha os toasts (um valor inválido recai para o padrão)."
    },
    {
     "desc": "Título opcional em negrito para o <pura-toast>."
    },
    {
     "desc": "Cor de destaque e ícone para o <pura-toast>."
    },
    {
     "desc": "Tempo até a dispensa automática; 0 ou negativo mantém o toast fixo."
    }
   ],
   "demoHTML": "<pura-toaster position=\"bottom-right\"></pura-toaster>\n\n<div style=\"display:flex; gap:.5rem; flex-wrap:wrap;\">\n  <button id=\"t-info\" type=\"button\">Mostrar info</button>\n  <button id=\"t-ok\" type=\"button\">Sucesso</button>\n  <button id=\"t-err\" type=\"button\">Erro com ação</button>\n</div>\n\n<script type=\"module\">\n  import { toast } from \"/pura/lib/toast.js\";\n\n  document.getElementById(\"t-info\").addEventListener(\"click\", () => {\n    toast(\"Suas alterações foram salvas como rascunho.\", { title: \"Rascunho salvo\" });\n  });\n  document.getElementById(\"t-ok\").addEventListener(\"click\", () => {\n    toast.success(\"Pagamento confirmado com sucesso!\", { title: \"Tudo certo\" });\n  });\n  document.getElementById(\"t-err\").addEventListener(\"click\", () => {\n    toast.error(\"Não foi possível enviar o arquivo.\", {\n      title: \"Falha no envio\",\n      duration: 8000,\n      action: { label: \"Tentar de novo\", onClick: () => toast.info(\"Reenviando...\") },\n    });\n  });\n</script>"
  },
  "fr": {
   "description": "Toast est un web component natif (zéro dépendance) pour afficher des messages courts et non bloquants. `<pura-toaster>` est un conteneur fixe (une région aria-live polite) qui empile les toasts dans un coin, et chaque `<pura-toast>` apparaît avec une animation, se met en pause au survol et disparaît de lui-même après la durée. En pratique, vous utilisez la fonction impérative `toast(message, opts)` (et les raccourcis `toast.success/error/warning/info`), qui crée le toaster par défaut automatiquement. Utilisez-le pour confirmer des actions, avertir d'erreurs ou donner un retour rapide sans interrompre le flux.",
   "attributes": [
    {
     "desc": "Coin où <pura-toaster> empile les toasts (une valeur invalide revient à la valeur par défaut)."
    },
    {
     "desc": "Titre optionnel en gras pour le <pura-toast>."
    },
    {
     "desc": "Couleur d'accent et icône pour le <pura-toast>."
    },
    {
     "desc": "Délai avant la fermeture automatique ; 0 ou une valeur négative garde le toast épinglé."
    }
   ],
   "demoHTML": "<pura-toaster position=\"bottom-right\"></pura-toaster>\n\n<div style=\"display:flex; gap:.5rem; flex-wrap:wrap;\">\n  <button id=\"t-info\" type=\"button\">Afficher l'info</button>\n  <button id=\"t-ok\" type=\"button\">Succès</button>\n  <button id=\"t-err\" type=\"button\">Erreur avec action</button>\n</div>\n\n<script type=\"module\">\n  import { toast } from \"/pura/lib/toast.js\";\n\n  document.getElementById(\"t-info\").addEventListener(\"click\", () => {\n    toast(\"Vos modifications ont été enregistrées comme brouillon.\", { title: \"Brouillon enregistré\" });\n  });\n  document.getElementById(\"t-ok\").addEventListener(\"click\", () => {\n    toast.success(\"Paiement confirmé avec succès !\", { title: \"Tout est prêt\" });\n  });\n  document.getElementById(\"t-err\").addEventListener(\"click\", () => {\n    toast.error(\"Nous n'avons pas pu téléverser le fichier.\", {\n      title: \"Échec du téléversement\",\n      duration: 8000,\n      action: { label: \"Réessayer\", onClick: () => toast.info(\"Renvoi en cours...\") },\n    });\n  });\n</script>"
  },
  "de": {
   "description": "Toast ist eine native Web Component (null Abhängigkeiten) zum Anzeigen kurzer, nicht blockierender Meldungen. `<pura-toaster>` ist ein fester Container (eine aria-live polite Region), der die Toasts in einer Ecke stapelt, und jeder `<pura-toast>` blendet sich mit Animation ein, pausiert beim Überfahren mit der Maus und verschwindet nach der Dauer von selbst. In der Praxis verwenden Sie die imperative Funktion `toast(message, opts)` (und die Kurzformen `toast.success/error/warning/info`), die den Standard-Toaster automatisch erstellt. Verwenden Sie sie, um Aktionen zu bestätigen, vor Fehlern zu warnen oder schnelles Feedback zu geben, ohne den Ablauf zu unterbrechen.",
   "attributes": [
    {
     "desc": "Ecke, in der <pura-toaster> die Toasts stapelt (ein ungültiger Wert fällt auf den Standard zurück)."
    },
    {
     "desc": "Optionaler fetter Titel für den <pura-toast>."
    },
    {
     "desc": "Akzentfarbe und Symbol für den <pura-toast>."
    },
    {
     "desc": "Zeit bis zum automatischen Schließen; 0 oder negativ hält den Toast angeheftet."
    }
   ],
   "demoHTML": "<pura-toaster position=\"bottom-right\"></pura-toaster>\n\n<div style=\"display:flex; gap:.5rem; flex-wrap:wrap;\">\n  <button id=\"t-info\" type=\"button\">Info anzeigen</button>\n  <button id=\"t-ok\" type=\"button\">Erfolg</button>\n  <button id=\"t-err\" type=\"button\">Fehler mit Aktion</button>\n</div>\n\n<script type=\"module\">\n  import { toast } from \"/pura/lib/toast.js\";\n\n  document.getElementById(\"t-info\").addEventListener(\"click\", () => {\n    toast(\"Ihre Änderungen wurden als Entwurf gespeichert.\", { title: \"Entwurf gespeichert\" });\n  });\n  document.getElementById(\"t-ok\").addEventListener(\"click\", () => {\n    toast.success(\"Zahlung erfolgreich bestätigt!\", { title: \"Alles erledigt\" });\n  });\n  document.getElementById(\"t-err\").addEventListener(\"click\", () => {\n    toast.error(\"Die Datei konnte nicht hochgeladen werden.\", {\n      title: \"Upload fehlgeschlagen\",\n      duration: 8000,\n      action: { label: \"Erneut versuchen\", onClick: () => toast.info(\"Wird erneut gesendet...\") },\n    });\n  });\n</script>"
  },
  "it": {
   "description": "Toast è un web component nativo (zero dipendenze) per mostrare messaggi brevi e non bloccanti. `<pura-toaster>` è un contenitore fisso (una regione aria-live polite) che impila i toast in un angolo, e ogni `<pura-toast>` entra con un'animazione, si mette in pausa al passaggio del mouse e scompare da solo dopo la durata. In pratica si usa la funzione imperativa `toast(message, opts)` (e le scorciatoie `toast.success/error/warning/info`), che crea automaticamente il toaster predefinito. Usalo per confermare azioni, avvisare di errori o dare un feedback rapido senza interrompere il flusso.",
   "attributes": [
    {
     "desc": "Angolo in cui <pura-toaster> impila i toast (un valore non valido ricade sul valore predefinito)."
    },
    {
     "desc": "Titolo opzionale in grassetto per il <pura-toast>."
    },
    {
     "desc": "Colore di accento e icona per il <pura-toast>."
    },
    {
     "desc": "Tempo fino alla chiusura automatica; 0 o un valore negativo mantiene il toast fissato."
    }
   ],
   "demoHTML": "<pura-toaster position=\"bottom-right\"></pura-toaster>\n\n<div style=\"display:flex; gap:.5rem; flex-wrap:wrap;\">\n  <button id=\"t-info\" type=\"button\">Mostra info</button>\n  <button id=\"t-ok\" type=\"button\">Successo</button>\n  <button id=\"t-err\" type=\"button\">Errore con azione</button>\n</div>\n\n<script type=\"module\">\n  import { toast } from \"/pura/lib/toast.js\";\n\n  document.getElementById(\"t-info\").addEventListener(\"click\", () => {\n    toast(\"Le tue modifiche sono state salvate come bozza.\", { title: \"Bozza salvata\" });\n  });\n  document.getElementById(\"t-ok\").addEventListener(\"click\", () => {\n    toast.success(\"Pagamento confermato con successo!\", { title: \"Tutto pronto\" });\n  });\n  document.getElementById(\"t-err\").addEventListener(\"click\", () => {\n    toast.error(\"Non è stato possibile caricare il file.\", {\n      title: \"Caricamento non riuscito\",\n      duration: 8000,\n      action: { label: \"Riprova\", onClick: () => toast.info(\"Invio in corso...\") },\n    });\n  });\n</script>"
  }
 },
 "undo": {
  "pt-BR": {
   "description": "Um componente agent-native que implementa o padrão de \"ação com janela de desfazer\": ao ser acionado, entra no estado pendente, mostra uma snackbar inline (mensagem + botão Desfazer) e confirma a ação automaticamente quando o tempo limite expira. Use-o em fluxos de exclusão ou ações destrutivas em que o efeito real deve ser adiado (\"Excluído. Desfazer?\"). A camada legível por máquina expõe data-state no host (idle | pending | undone | committed) e um registro global window.__puraUndo (um Map indexado por undo-id com remaining, run/undo/commit e .pending()), permitindo que agentes enumerem e resolvam qualquer fluxo de desfazer na página.",
   "attributes": [
    {
     "desc": "Janela de desfazer em ms. Valores <= 0 mantêm a snackbar fixa (sticky), resolvida apenas via undo()/commit()."
    },
    {
     "desc": "Texto da mensagem quando não há conteúdo no slot default."
    },
    {
     "desc": "Texto do botão de desfazer."
    }
   ],
   "demoHTML": "<pura-undo id=\"demo-undo\" timeout=\"5000\" undo-label=\"Desfazer\">\n  Conversa arquivada.\n  <button slot=\"trigger\" type=\"button\">Arquivar conversa</button>\n</pura-undo>\n\n<script type=\"module\">\n  const u = document.getElementById(\"demo-undo\");\n  u.addEventListener(\"action\", () => console.log(\"action started\"));\n  u.addEventListener(\"undo\", () => console.log(\"undone in time\"));\n  u.addEventListener(\"commit\", () => console.log(\"committed, effect applied\"));\n</script>"
  },
  "fr": {
   "description": "Un composant agent-native qui implémente le modèle « action avec fenêtre d'annulation » : lorsqu'il est déclenché, il passe à l'état en attente, affiche une snackbar inline (message + bouton Annuler) et valide l'action automatiquement à l'expiration du délai. Utilisez-le dans les flux de suppression ou les actions destructrices où l'effet réel doit être différé (« Supprimé. Annuler ? »). La couche lisible par machine expose data-state sur l'hôte (idle | pending | undone | committed) et un registre global window.__puraUndo (un Map indexé par undo-id avec remaining, run/undo/commit et .pending()), permettant aux agents d'énumérer et de résoudre n'importe quel flux d'annulation de la page.",
   "attributes": [
    {
     "desc": "Fenêtre d'annulation en ms. Les valeurs <= 0 gardent la snackbar épinglée (sticky), résolue uniquement via undo()/commit()."
    },
    {
     "desc": "Texte du message lorsqu'il n'y a aucun contenu dans le slot par défaut."
    },
    {
     "desc": "Texte du bouton d'annulation."
    }
   ],
   "demoHTML": "<pura-undo id=\"demo-undo\" timeout=\"5000\" undo-label=\"Annuler\">\n  Conversation archivée.\n  <button slot=\"trigger\" type=\"button\">Archiver la conversation</button>\n</pura-undo>\n\n<script type=\"module\">\n  const u = document.getElementById(\"demo-undo\");\n  u.addEventListener(\"action\", () => console.log(\"action started\"));\n  u.addEventListener(\"undo\", () => console.log(\"undone in time\"));\n  u.addEventListener(\"commit\", () => console.log(\"committed, effect applied\"));\n</script>"
  },
  "de": {
   "description": "Eine agent-native Komponente, die das Muster \"Aktion mit Rückgängig-Fenster\" umsetzt: Beim Auslösen wechselt sie in den Zustand ausstehend, zeigt eine Inline-Snackbar (Nachricht + Schaltfläche Rückgängig) und bestätigt die Aktion automatisch, wenn das Zeitlimit abläuft. Verwenden Sie sie in Löschvorgängen oder zerstörerischen Aktionen, bei denen der eigentliche Effekt aufgeschoben werden soll (\"Gelöscht. Rückgängig?\"). Die maschinenlesbare Ebene stellt data-state am Host (idle | pending | undone | committed) und ein globales Register window.__puraUndo bereit (eine Map mit dem Schlüssel undo-id und remaining, run/undo/commit sowie .pending()), sodass Agenten jeden Rückgängig-Vorgang auf der Seite aufzählen und auflösen können.",
   "attributes": [
    {
     "desc": "Rückgängig-Fenster in ms. Werte <= 0 halten die Snackbar angeheftet (sticky), die nur über undo()/commit() aufgelöst wird."
    },
    {
     "desc": "Nachrichtentext, wenn der Standard-Slot keinen Inhalt enthält."
    },
    {
     "desc": "Text der Rückgängig-Schaltfläche."
    }
   ],
   "demoHTML": "<pura-undo id=\"demo-undo\" timeout=\"5000\" undo-label=\"Rückgängig\">\n  Unterhaltung archiviert.\n  <button slot=\"trigger\" type=\"button\">Unterhaltung archivieren</button>\n</pura-undo>\n\n<script type=\"module\">\n  const u = document.getElementById(\"demo-undo\");\n  u.addEventListener(\"action\", () => console.log(\"action started\"));\n  u.addEventListener(\"undo\", () => console.log(\"undone in time\"));\n  u.addEventListener(\"commit\", () => console.log(\"committed, effect applied\"));\n</script>"
  },
  "it": {
   "description": "Un componente agent-native che implementa il modello di \"azione con finestra di annullamento\": quando viene attivato, passa allo stato in attesa, mostra una snackbar inline (messaggio + pulsante Annulla) e conferma l'azione automaticamente alla scadenza del timeout. Usalo nei flussi di eliminazione o nelle azioni distruttive in cui l'effetto reale va posticipato (\"Eliminato. Annullare?\"). Il livello leggibile dalla macchina espone data-state sull'host (idle | pending | undone | committed) e un registro globale window.__puraUndo (una Map indicizzata per undo-id con remaining, run/undo/commit e .pending()), consentendo agli agenti di enumerare e risolvere qualsiasi flusso di annullamento nella pagina.",
   "attributes": [
    {
     "desc": "Finestra di annullamento in ms. Valori <= 0 mantengono la snackbar fissata (sticky), risolta solo tramite undo()/commit()."
    },
    {
     "desc": "Testo del messaggio quando non c'è contenuto nello slot predefinito."
    },
    {
     "desc": "Testo del pulsante di annullamento."
    }
   ],
   "demoHTML": "<pura-undo id=\"demo-undo\" timeout=\"5000\" undo-label=\"Annulla\">\n  Conversazione archiviata.\n  <button slot=\"trigger\" type=\"button\">Archivia conversazione</button>\n</pura-undo>\n\n<script type=\"module\">\n  const u = document.getElementById(\"demo-undo\");\n  u.addEventListener(\"action\", () => console.log(\"action started\"));\n  u.addEventListener(\"undo\", () => console.log(\"undone in time\"));\n  u.addEventListener(\"commit\", () => console.log(\"committed, effect applied\"));\n</script>"
  }
 },
 "carousel": {
  "pt-BR": {
   "description": "Carousel é um web component nativo que organiza os slides passados como filhos em uma trilha horizontal com scroll-snap. Inclui botões de próximo/anterior, indicadores de pontos clicáveis e navegação por teclado (setas esquerda/direita). Use-o para exibir imagens, depoimentos ou cards em um espaço compacto, opcionalmente mostrando mais de um slide por vez com per-view.",
   "attributes": [
    {
     "desc": "Permite passar do último slide para o primeiro e vice-versa."
    },
    {
     "desc": "Oculta a linha de indicadores de pontos."
    },
    {
     "desc": "Oculta os botões de seta de próximo/anterior."
    },
    {
     "desc": "Número de slides visíveis ao mesmo tempo (define a largura de cada slide)."
    },
    {
     "desc": "Rótulo acessível (aria-label) para a região do carrossel."
    }
   ],
   "demoHTML": "<pura-carousel label=\"Destaques\" loop style=\"max-width: 420px\">\n  <div style=\"display:grid;place-items:center;height:200px;background:var(--pura-subtle);border-radius:8px;font-size:1.25rem\">\n    Praia ao amanhecer\n  </div>\n  <div style=\"display:grid;place-items:center;height:200px;background:var(--pura-subtle);border-radius:8px;font-size:1.25rem\">\n    Trilha na montanha\n  </div>\n  <div style=\"display:grid;place-items:center;height:200px;background:var(--pura-subtle);border-radius:8px;font-size:1.25rem\">\n    Cidade à noite\n  </div>\n</pura-carousel>"
  },
  "fr": {
   "description": "Carousel est un web component natif qui dispose les diapositives passées en tant qu'enfants dans une piste horizontale avec scroll-snap. Il comprend des boutons suivant/précédent, des indicateurs à points cliquables et une navigation au clavier (flèches gauche/droite). Utilisez-le pour présenter des images, des témoignages ou des cartes dans un espace compact, en affichant éventuellement plus d'une diapositive à la fois avec per-view.",
   "attributes": [
    {
     "desc": "Permet de passer de la dernière diapositive à la première et inversement."
    },
    {
     "desc": "Masque la rangée d'indicateurs à points."
    },
    {
     "desc": "Masque les boutons fléchés suivant/précédent."
    },
    {
     "desc": "Nombre de diapositives visibles en même temps (définit la largeur de chaque diapositive)."
    },
    {
     "desc": "Libellé accessible (aria-label) pour la région du carrousel."
    }
   ],
   "demoHTML": "<pura-carousel label=\"Sélection\" loop style=\"max-width: 420px\">\n  <div style=\"display:grid;place-items:center;height:200px;background:var(--pura-subtle);border-radius:8px;font-size:1.25rem\">\n    Plage au lever du soleil\n  </div>\n  <div style=\"display:grid;place-items:center;height:200px;background:var(--pura-subtle);border-radius:8px;font-size:1.25rem\">\n    Sentier de montagne\n  </div>\n  <div style=\"display:grid;place-items:center;height:200px;background:var(--pura-subtle);border-radius:8px;font-size:1.25rem\">\n    Ville la nuit\n  </div>\n</pura-carousel>"
  },
  "de": {
   "description": "Carousel ist eine native Web Component, die die als Kinder übergebenen Slides in einer horizontalen Spur mit Scroll-Snap anordnet. Es enthält Vor-/Zurück-Schaltflächen, klickbare Punktindikatoren und Tastaturnavigation (Pfeile links/rechts). Verwenden Sie es, um Bilder, Erfahrungsberichte oder Karten auf kompaktem Raum zu präsentieren, optional mit mehr als einem Slide gleichzeitig über per-view.",
   "attributes": [
    {
     "desc": "Ermöglicht den Übergang vom letzten Slide zum ersten und umgekehrt."
    },
    {
     "desc": "Blendet die Reihe der Punktindikatoren aus."
    },
    {
     "desc": "Blendet die Vor-/Zurück-Pfeilschaltflächen aus."
    },
    {
     "desc": "Anzahl der gleichzeitig sichtbaren Slides (legt die Breite jedes Slides fest)."
    },
    {
     "desc": "Zugängliche Beschriftung (aria-label) für die Karussell-Region."
    }
   ],
   "demoHTML": "<pura-carousel label=\"Highlights\" loop style=\"max-width: 420px\">\n  <div style=\"display:grid;place-items:center;height:200px;background:var(--pura-subtle);border-radius:8px;font-size:1.25rem\">\n    Strand bei Sonnenaufgang\n  </div>\n  <div style=\"display:grid;place-items:center;height:200px;background:var(--pura-subtle);border-radius:8px;font-size:1.25rem\">\n    Bergpfad\n  </div>\n  <div style=\"display:grid;place-items:center;height:200px;background:var(--pura-subtle);border-radius:8px;font-size:1.25rem\">\n    Stadt bei Nacht\n  </div>\n</pura-carousel>"
  },
  "it": {
   "description": "Carousel è un web component nativo che dispone le slide passate come figli in una traccia orizzontale con scroll-snap. Include pulsanti avanti/indietro, indicatori a punti cliccabili e navigazione da tastiera (frecce sinistra/destra). Usalo per presentare immagini, testimonianze o card in uno spazio compatto, mostrando eventualmente più di una slide alla volta con per-view.",
   "attributes": [
    {
     "desc": "Consente di passare dall'ultima slide alla prima e viceversa."
    },
    {
     "desc": "Nasconde la riga di indicatori a punti."
    },
    {
     "desc": "Nasconde i pulsanti freccia avanti/indietro."
    },
    {
     "desc": "Numero di slide visibili contemporaneamente (imposta la larghezza di ciascuna slide)."
    },
    {
     "desc": "Etichetta accessibile (aria-label) per la regione del carosello."
    }
   ],
   "demoHTML": "<pura-carousel label=\"In evidenza\" loop style=\"max-width: 420px\">\n  <div style=\"display:grid;place-items:center;height:200px;background:var(--pura-subtle);border-radius:8px;font-size:1.25rem\">\n    Spiaggia all'alba\n  </div>\n  <div style=\"display:grid;place-items:center;height:200px;background:var(--pura-subtle);border-radius:8px;font-size:1.25rem\">\n    Sentiero di montagna\n  </div>\n  <div style=\"display:grid;place-items:center;height:200px;background:var(--pura-subtle);border-radius:8px;font-size:1.25rem\">\n    Città di notte\n  </div>\n</pura-carousel>"
  }
 },
 "container": {
  "pt-BR": {
   "description": "Container é um wrapper agent-native que usa ResizeObserver para medir a própria largura e expõe o breakpoint atual pelo atributo data-size (xs|sm|md|lg), funcionando como uma container query mesmo onde o recurso CSS @container não está disponível. Use-o quando um bloco de conteúdo precisa reagir ao espaço que de fato ocupa (cards, painéis, colunas) em vez do tamanho da janela. A camada legível por máquina inclui o registro global window.__puraContainers (um Map indexado por id, com size, width, el e um helper query(size)), além de role=\"group\" e os atributos refletidos data-size/data-width, de modo que agentes possam enumerar cada container e seu tamanho atual.",
   "attributes": [
    {
     "desc": "Limiares personalizados de min-width em px como uma lista separada por vírgulas, por exemplo \"sm:480, md:768, lg:1024\". Qualquer valor abaixo do menor vira xs."
    },
    {
     "desc": "Centraliza horizontalmente a caixa interna (margin-inline auto)."
    },
    {
     "desc": "max-width opcional para a caixa interna (qualquer comprimento CSS, por exemplo \"72rem\"); sem ele, o container é fluido (100%)."
    },
    {
     "desc": "Aplica padding inline simétrico que escala com o breakpoint atual."
    },
    {
     "desc": "aria-label exposto na região host."
    }
   ],
   "demoHTML": "<pura-container id=\"demo-container\" center pad max=\"48rem\" label=\"Cartão de produto\" style=\"border:1px solid var(--pura-border, #e5e7eb); border-radius:12px; background:#fff;\">\n  <div style=\"display:flex; gap:16px; flex-wrap:wrap; align-items:center; padding:16px 0;\">\n    <div style=\"flex:1; min-width:180px;\">\n      <h3 style=\"margin:0 0 4px;\">Fones de ouvido sem fio Aurora</h3>\n      <p style=\"margin:0; color:#6b7280;\">Cancelamento de ruído e 30h de bateria.</p>\n    </div>\n    <strong style=\"font-size:1.25rem;\">R$ 499,00</strong>\n  </div>\n  <p id=\"demo-status\" style=\"margin:0; font-size:.85rem; color:#2563eb;\">Medindo o tamanho do contêiner...</p>\n</pura-container>\n<script type=\"module\">\n  import \"/pura/lib/container.js\";\n  const c = document.getElementById(\"demo-container\");\n  const status = document.getElementById(\"demo-status\");\n  c.addEventListener(\"pura-container:resize\", (e) => {\n    status.textContent = `Breakpoint atual: ${e.detail.size} (${e.detail.width}px)`;\n  });\n</script>"
  },
  "fr": {
   "description": "Container est un wrapper agent-native qui utilise ResizeObserver pour mesurer sa propre largeur et expose le breakpoint actuel via l'attribut data-size (xs|sm|md|lg), fonctionnant comme une container query même là où la fonctionnalité CSS @container n'est pas disponible. Utilisez-le lorsqu'un bloc de contenu doit réagir à l'espace qu'il occupe réellement (cartes, panneaux, colonnes) plutôt qu'à la taille de la fenêtre. La couche lisible par machine comprend le registre global window.__puraContainers (un Map indexé par id, avec size, width, el et un helper query(size)), ainsi que role=\"group\" et les attributs reflétés data-size/data-width, afin que les agents puissent énumérer chaque conteneur et sa taille actuelle.",
   "attributes": [
    {
     "desc": "Seuils de min-width personnalisés en px sous forme de liste séparée par des virgules, par exemple \"sm:480, md:768, lg:1024\". Toute valeur inférieure à la plus petite devient xs."
    },
    {
     "desc": "Centre horizontalement la boîte interne (margin-inline auto)."
    },
    {
     "desc": "max-width optionnelle pour la boîte interne (n'importe quelle longueur CSS, par exemple \"72rem\") ; sans elle, le conteneur est fluide (100%)."
    },
    {
     "desc": "Applique un padding inline symétrique qui s'adapte au breakpoint actuel."
    },
    {
     "desc": "aria-label exposé sur la région hôte."
    }
   ],
   "demoHTML": "<pura-container id=\"demo-container\" center pad max=\"48rem\" label=\"Carte produit\" style=\"border:1px solid var(--pura-border, #e5e7eb); border-radius:12px; background:#fff;\">\n  <div style=\"display:flex; gap:16px; flex-wrap:wrap; align-items:center; padding:16px 0;\">\n    <div style=\"flex:1; min-width:180px;\">\n      <h3 style=\"margin:0 0 4px;\">Casque sans fil Aurora</h3>\n      <p style=\"margin:0; color:#6b7280;\">Réduction de bruit et 30 h d'autonomie.</p>\n    </div>\n    <strong style=\"font-size:1.25rem;\">499,00 €</strong>\n  </div>\n  <p id=\"demo-status\" style=\"margin:0; font-size:.85rem; color:#2563eb;\">Mesure de la taille du conteneur...</p>\n</pura-container>\n<script type=\"module\">\n  import \"/pura/lib/container.js\";\n  const c = document.getElementById(\"demo-container\");\n  const status = document.getElementById(\"demo-status\");\n  c.addEventListener(\"pura-container:resize\", (e) => {\n    status.textContent = `Point de rupture actuel : ${e.detail.size} (${e.detail.width}px)`;\n  });\n</script>"
  },
  "de": {
   "description": "Container ist ein agent-nativer Wrapper, der ResizeObserver verwendet, um seine eigene Breite zu messen, und den aktuellen Breakpoint über das Attribut data-size (xs|sm|md|lg) bereitstellt. Er funktioniert wie eine Container Query, selbst dort, wo das CSS-Feature @container nicht verfügbar ist. Verwenden Sie ihn, wenn ein Inhaltsblock auf den tatsächlich belegten Platz reagieren soll (Karten, Panels, Spalten) statt auf die Fenstergröße. Die maschinenlesbare Schicht umfasst die globale Registry window.__puraContainers (eine nach id indizierte Map mit size, width, el und einem query(size)-Helfer) sowie role=\"group\" und die gespiegelten Attribute data-size/data-width, sodass Agenten jeden Container und seine aktuelle Größe aufzählen können.",
   "attributes": [
    {
     "desc": "Benutzerdefinierte min-width-Schwellenwerte in px als kommagetrennte Liste, z. B. \"sm:480, md:768, lg:1024\". Alles unterhalb des kleinsten Werts wird zu xs."
    },
    {
     "desc": "Zentriert die innere Box horizontal (margin-inline auto)."
    },
    {
     "desc": "Optionale max-width für die innere Box (beliebige CSS-Länge, z. B. \"72rem\"); ohne sie ist der Container fluid (100%)."
    },
    {
     "desc": "Wendet symmetrisches Inline-Padding an, das mit dem aktuellen Breakpoint skaliert."
    },
    {
     "desc": "aria-label, das auf der Host-Region bereitgestellt wird."
    }
   ],
   "demoHTML": "<pura-container id=\"demo-container\" center pad max=\"48rem\" label=\"Produktkarte\" style=\"border:1px solid var(--pura-border, #e5e7eb); border-radius:12px; background:#fff;\">\n  <div style=\"display:flex; gap:16px; flex-wrap:wrap; align-items:center; padding:16px 0;\">\n    <div style=\"flex:1; min-width:180px;\">\n      <h3 style=\"margin:0 0 4px;\">Aurora kabellose Kopfhörer</h3>\n      <p style=\"margin:0; color:#6b7280;\">Geräuschunterdrückung und 30 Std. Akkulaufzeit.</p>\n    </div>\n    <strong style=\"font-size:1.25rem;\">499,00 €</strong>\n  </div>\n  <p id=\"demo-status\" style=\"margin:0; font-size:.85rem; color:#2563eb;\">Containergröße wird gemessen...</p>\n</pura-container>\n<script type=\"module\">\n  import \"/pura/lib/container.js\";\n  const c = document.getElementById(\"demo-container\");\n  const status = document.getElementById(\"demo-status\");\n  c.addEventListener(\"pura-container:resize\", (e) => {\n    status.textContent = `Aktueller Breakpoint: ${e.detail.size} (${e.detail.width}px)`;\n  });\n</script>"
  },
  "it": {
   "description": "Container è un wrapper agent-native che usa ResizeObserver per misurare la propria larghezza ed espone il breakpoint corrente tramite l'attributo data-size (xs|sm|md|lg), funzionando come una container query anche dove la funzionalità CSS @container non è disponibile. Usalo quando un blocco di contenuto deve reagire allo spazio che effettivamente occupa (card, pannelli, colonne) anziché alla dimensione della finestra. Il livello leggibile dalle macchine include il registro globale window.__puraContainers (una Map indicizzata per id, con size, width, el e un helper query(size)), oltre a role=\"group\" e agli attributi riflessi data-size/data-width, in modo che gli agenti possano enumerare ogni container e la sua dimensione corrente.",
   "attributes": [
    {
     "desc": "Soglie di min-width personalizzate in px come elenco separato da virgole, ad esempio \"sm:480, md:768, lg:1024\". Qualsiasi valore inferiore al più piccolo diventa xs."
    },
    {
     "desc": "Centra orizzontalmente il box interno (margin-inline auto)."
    },
    {
     "desc": "max-width opzionale per il box interno (qualsiasi lunghezza CSS, ad esempio \"72rem\"); senza di essa il container è fluido (100%)."
    },
    {
     "desc": "Applica un padding inline simmetrico che scala con il breakpoint corrente."
    },
    {
     "desc": "aria-label esposto sulla regione host."
    }
   ],
   "demoHTML": "<pura-container id=\"demo-container\" center pad max=\"48rem\" label=\"Scheda prodotto\" style=\"border:1px solid var(--pura-border, #e5e7eb); border-radius:12px; background:#fff;\">\n  <div style=\"display:flex; gap:16px; flex-wrap:wrap; align-items:center; padding:16px 0;\">\n    <div style=\"flex:1; min-width:180px;\">\n      <h3 style=\"margin:0 0 4px;\">Cuffie wireless Aurora</h3>\n      <p style=\"margin:0; color:#6b7280;\">Cancellazione del rumore e 30h di autonomia.</p>\n    </div>\n    <strong style=\"font-size:1.25rem;\">499,00 €</strong>\n  </div>\n  <p id=\"demo-status\" style=\"margin:0; font-size:.85rem; color:#2563eb;\">Misurazione delle dimensioni del contenitore...</p>\n</pura-container>\n<script type=\"module\">\n  import \"/pura/lib/container.js\";\n  const c = document.getElementById(\"demo-container\");\n  const status = document.getElementById(\"demo-status\");\n  c.addEventListener(\"pura-container:resize\", (e) => {\n    status.textContent = `Breakpoint attuale: ${e.detail.size} (${e.detail.width}px)`;\n  });\n</script>"
  }
 },
 "fab": {
  "pt-BR": {
   "description": "pura-fab é um botão circular e elevado (sombra forte, cor primária) ancorado a um canto da tela, com um slot de ícone e uma variante estendida que revela um rótulo de texto. Use-o para a ação principal de uma tela (criar, adicionar, compor). Ele também expõe uma camada agent-native: atributos data-pura-fab-* espelham o estado em tempo real, e cada instância se registra em window.__puraFabs pelo seu data-pura-id, permitindo que agentes enumerem, leiam o estado e acionem o botão via .click() sem atravessar o Shadow DOM.",
   "attributes": [
    {
     "desc": "Canto onde o botão é fixado: bottom-right, bottom-left, top-right ou top-left."
    },
    {
     "desc": "Mostra o rótulo de texto ao lado do ícone (formato de pílula em vez de círculo)."
    },
    {
     "desc": "Nome acessível para o botão apenas com ícone. Ignorado quando estendido e o slot de rótulo tem texto."
    },
    {
     "desc": "Torna o botão não interativo."
    },
    {
     "desc": "HTML padrão; remove o host do layout."
    }
   ],
   "demoHTML": "<pura-fab id=\"fab\" extended position=\"bottom-right\" label=\"Novo item\">\n  <span slot=\"icon\">\n    <svg viewBox=\"0 0 24 24\" width=\"1em\" height=\"1em\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 5v14M5 12h14\"/></svg>\n  </span>\n  Novo\n</pura-fab>\n<script type=\"module\">\n  import \"/pura/lib/fab.js\";\n  document.getElementById(\"fab\").addEventListener(\"pura-fab-click\", (e) => {\n    alert(\"FAB acionado: \" + e.detail.id);\n  });\n</script>"
  },
  "fr": {
   "description": "pura-fab est un bouton circulaire et surélevé (ombre marquée, couleur primaire) ancré à un coin de l'écran, avec un slot d'icône et une variante étendue qui révèle un libellé de texte. Utilisez-le pour l'action principale d'un écran (créer, ajouter, composer). Il expose également une couche agent-native : les attributs data-pura-fab-* reflètent l'état en temps réel, et chaque instance s'enregistre dans window.__puraFabs via son data-pura-id, permettant aux agents d'énumérer, de lire l'état et de déclencher le bouton via .click() sans franchir le Shadow DOM.",
   "attributes": [
    {
     "desc": "Coin où le bouton est épinglé : bottom-right, bottom-left, top-right ou top-left."
    },
    {
     "desc": "Affiche le libellé de texte à côté de l'icône (forme de pilule au lieu d'un cercle)."
    },
    {
     "desc": "Nom accessible pour le bouton à icône seule. Ignoré lorsqu'il est étendu et que le slot de libellé contient du texte."
    },
    {
     "desc": "Rend le bouton non interactif."
    },
    {
     "desc": "HTML standard ; retire l'hôte de la mise en page."
    }
   ],
   "demoHTML": "<pura-fab id=\"fab\" extended position=\"bottom-right\" label=\"Nouvel élément\">\n  <span slot=\"icon\">\n    <svg viewBox=\"0 0 24 24\" width=\"1em\" height=\"1em\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 5v14M5 12h14\"/></svg>\n  </span>\n  Nouveau\n</pura-fab>\n<script type=\"module\">\n  import \"/pura/lib/fab.js\";\n  document.getElementById(\"fab\").addEventListener(\"pura-fab-click\", (e) => {\n    alert(\"FAB déclenché : \" + e.detail.id);\n  });\n</script>"
  },
  "de": {
   "description": "pura-fab ist eine kreisförmige, erhöhte Schaltfläche (starker Schatten, Primärfarbe), die an einer Bildschirmecke verankert ist, mit einem Icon-Slot und einer erweiterten Variante, die ein Textlabel anzeigt. Verwenden Sie sie für die Hauptaktion eines Bildschirms (erstellen, hinzufügen, verfassen). Sie stellt außerdem eine agent-native Schicht bereit: data-pura-fab-*-Attribute spiegeln den Live-Zustand wider, und jede Instanz registriert sich über ihre data-pura-id in window.__puraFabs, sodass Agenten die Schaltfläche aufzählen, den Zustand lesen und sie per .click() auslösen können, ohne das Shadow DOM zu überqueren.",
   "attributes": [
    {
     "desc": "Ecke, an der die Schaltfläche fixiert ist: bottom-right, bottom-left, top-right oder top-left."
    },
    {
     "desc": "Zeigt das Textlabel neben dem Icon an (Pillenform statt Kreis)."
    },
    {
     "desc": "Barrierefreier Name für die Schaltfläche mit reinem Icon. Wird ignoriert, wenn sie erweitert ist und der Label-Slot Text enthält."
    },
    {
     "desc": "Macht die Schaltfläche nicht interaktiv."
    },
    {
     "desc": "Standard-HTML; entfernt den Host aus dem Layout."
    }
   ],
   "demoHTML": "<pura-fab id=\"fab\" extended position=\"bottom-right\" label=\"Neues Element\">\n  <span slot=\"icon\">\n    <svg viewBox=\"0 0 24 24\" width=\"1em\" height=\"1em\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 5v14M5 12h14\"/></svg>\n  </span>\n  Neu\n</pura-fab>\n<script type=\"module\">\n  import \"/pura/lib/fab.js\";\n  document.getElementById(\"fab\").addEventListener(\"pura-fab-click\", (e) => {\n    alert(\"FAB ausgelöst: \" + e.detail.id);\n  });\n</script>"
  },
  "it": {
   "description": "pura-fab è un pulsante circolare ed elevato (ombra marcata, colore primario) ancorato a un angolo dello schermo, con uno slot per l'icona e una variante estesa che mostra un'etichetta di testo. Usalo per l'azione principale di una schermata (creare, aggiungere, comporre). Espone inoltre un livello agent-native: gli attributi data-pura-fab-* rispecchiano lo stato in tempo reale e ogni istanza si registra in window.__puraFabs tramite il suo data-pura-id, permettendo agli agenti di enumerare, leggere lo stato e attivare il pulsante tramite .click() senza attraversare lo Shadow DOM.",
   "attributes": [
    {
     "desc": "Angolo in cui il pulsante è fissato: bottom-right, bottom-left, top-right o top-left."
    },
    {
     "desc": "Mostra l'etichetta di testo accanto all'icona (forma a pillola anziché cerchio)."
    },
    {
     "desc": "Nome accessibile per il pulsante con sola icona. Ignorato quando è esteso e lo slot dell'etichetta contiene testo."
    },
    {
     "desc": "Rende il pulsante non interattivo."
    },
    {
     "desc": "HTML standard; rimuove l'host dal layout."
    }
   ],
   "demoHTML": "<pura-fab id=\"fab\" extended position=\"bottom-right\" label=\"Nuovo elemento\">\n  <span slot=\"icon\">\n    <svg viewBox=\"0 0 24 24\" width=\"1em\" height=\"1em\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 5v14M5 12h14\"/></svg>\n  </span>\n  Nuovo\n</pura-fab>\n<script type=\"module\">\n  import \"/pura/lib/fab.js\";\n  document.getElementById(\"fab\").addEventListener(\"pura-fab-click\", (e) => {\n    alert(\"FAB attivato: \" + e.detail.id);\n  });\n</script>"
  }
 },
 "image-compare": {
  "pt-BR": {
   "description": "Sobrepõe duas imagens em camadas e usa uma alça vertical arrastável para recortar a camada \"depois\", revelando mais ou menos dela conforme a posição muda. Use-o para comparações visuais lado a lado, como edição de fotos, antes/depois de reformas ou ajustes de design. Cada instância tem uma camada agent-native: espelha o estado em tempo real em atributos data-pura-* e se registra em window.__puraImageCompares pelo seu data-pura-id, permitindo que agentes leiam e controlem a comparação sem tocar no DOM.",
   "attributes": [
    {
     "desc": "Posição da alça de 0 a 100. 0 mostra apenas a imagem 'antes', 100 mostra apenas a 'depois'. Refletido de volta no atributo do host."
    },
    {
     "desc": "Rótulo acessível para o slider, aplicado como aria-label na alça."
    }
   ],
   "demoHTML": "<div style=\"max-width:520px\">\n  <pura-image-compare value=\"50\" label=\"Comparação de antes e depois da reforma\" style=\"border:1px solid var(--pura-border)\">\n    <img slot=\"before\" src=\"https://picsum.photos/id/1018/800/500\" alt=\"Antes da reforma\">\n    <img slot=\"after\" src=\"https://picsum.photos/id/1015/800/500\" alt=\"Depois da reforma\">\n  </pura-image-compare>\n</div>"
  },
  "fr": {
   "description": "Superpose deux images en couches et utilise une poignée verticale déplaçable pour découper la couche \"après\", en révélant plus ou moins selon le changement de position. Utilisez-le pour des comparaisons visuelles côte à côte, comme l'édition de photos, l'avant/après de rénovations ou les ajustements de design. Chaque instance possède une couche agent-native : elle reflète l'état en temps réel dans des attributs data-pura-* et s'enregistre dans window.__puraImageCompares via son data-pura-id, permettant aux agents de lire et de piloter la comparaison sans toucher au DOM.",
   "attributes": [
    {
     "desc": "Position de la poignée de 0 à 100. 0 affiche uniquement l'image 'avant', 100 affiche uniquement l'image 'après'. Reflétée dans l'attribut de l'hôte."
    },
    {
     "desc": "Libellé accessible pour le curseur, appliqué comme aria-label sur la poignée."
    }
   ],
   "demoHTML": "<div style=\"max-width:520px\">\n  <pura-image-compare value=\"50\" label=\"Comparaison avant et après la rénovation\" style=\"border:1px solid var(--pura-border)\">\n    <img slot=\"before\" src=\"https://picsum.photos/id/1018/800/500\" alt=\"Avant la rénovation\">\n    <img slot=\"after\" src=\"https://picsum.photos/id/1015/800/500\" alt=\"Après la rénovation\">\n  </pura-image-compare>\n</div>"
  },
  "de": {
   "description": "Legt zwei Bilder übereinander und verwendet einen ziehbaren vertikalen Griff, um die \"Nachher\"-Ebene zuzuschneiden, sodass je nach Position mehr oder weniger davon sichtbar wird. Verwenden Sie ihn für visuelle Vergleiche nebeneinander, etwa Fotobearbeitung, Vorher/Nachher von Renovierungen oder Design-Anpassungen. Jede Instanz verfügt über eine agent-native Schicht: Sie spiegelt den Live-Zustand in data-pura-*-Attributen wider und registriert sich über ihre data-pura-id in window.__puraImageCompares, sodass Agenten den Vergleich lesen und steuern können, ohne das DOM zu berühren.",
   "attributes": [
    {
     "desc": "Griffposition von 0 bis 100. 0 zeigt nur das 'Vorher'-Bild, 100 zeigt nur das 'Nachher'-Bild. Wird in das Host-Attribut zurückgespiegelt."
    },
    {
     "desc": "Barrierefreies Label für den Schieber, angewendet als aria-label auf dem Griff."
    }
   ],
   "demoHTML": "<div style=\"max-width:520px\">\n  <pura-image-compare value=\"50\" label=\"Vergleich vor und nach der Renovierung\" style=\"border:1px solid var(--pura-border)\">\n    <img slot=\"before\" src=\"https://picsum.photos/id/1018/800/500\" alt=\"Vor der Renovierung\">\n    <img slot=\"after\" src=\"https://picsum.photos/id/1015/800/500\" alt=\"Nach der Renovierung\">\n  </pura-image-compare>\n</div>"
  },
  "it": {
   "description": "Sovrappone due immagini a livelli e usa una maniglia verticale trascinabile per ritagliare il livello \"dopo\", rivelandone una porzione maggiore o minore al variare della posizione. Usalo per confronti visivi affiancati, come editing di foto, prima/dopo di ristrutturazioni o modifiche di design. Ogni istanza ha un livello agent-native: rispecchia lo stato in tempo reale in attributi data-pura-* e si registra in window.__puraImageCompares tramite il suo data-pura-id, permettendo agli agenti di leggere e pilotare il confronto senza toccare il DOM.",
   "attributes": [
    {
     "desc": "Posizione della maniglia da 0 a 100. 0 mostra solo l'immagine 'prima', 100 mostra solo quella 'dopo'. Riflesso nell'attributo dell'host."
    },
    {
     "desc": "Etichetta accessibile per lo slider, applicata come aria-label sulla maniglia."
    }
   ],
   "demoHTML": "<div style=\"max-width:520px\">\n  <pura-image-compare value=\"50\" label=\"Confronto prima e dopo la ristrutturazione\" style=\"border:1px solid var(--pura-border)\">\n    <img slot=\"before\" src=\"https://picsum.photos/id/1018/800/500\" alt=\"Prima della ristrutturazione\">\n    <img slot=\"after\" src=\"https://picsum.photos/id/1015/800/500\" alt=\"Dopo la ristrutturazione\">\n  </pura-image-compare>\n</div>"
  }
 },
 "masonry": {
  "pt-BR": {
   "description": "`<pura-masonry>` é um container que organiza os elementos do slot padrão em colunas verticais (fluxo de cima para baixo, depois quebrando para a próxima coluna), mantendo cada item intacto via break-inside. Use-o para galerias de imagens, cards de alturas variadas ou feeds onde uma grade rígida deixaria espaços vazios. Ele tem uma camada agent-native: cada instância recebe um id estável em `data-pura-masonry` e publica um snapshot legível por máquina em `window.__puraMasonry[id]` com `{ label, columns, count, items }`, permitindo que agentes inspecionem a coleção sem fazer scraping do DOM.",
   "attributes": [
    {
     "desc": "Número fixo de colunas (inteiro >= 1). Quando definido, usa exatamente esse número de colunas em qualquer largura e reflete o valor em data-columns."
    },
    {
     "desc": "Largura mínima de cada coluna (comprimento CSS). Usado no modo responsivo (quando columns é omitido): o navegador encaixa quantas colunas couberem nessa largura."
    },
    {
     "desc": "Espaçamento entre colunas e entre linhas (comprimento CSS)."
    },
    {
     "desc": "Nome acessível para a lista de itens; aplicado como aria-label no host (role=list)."
    }
   ],
   "demoHTML": "<pura-masonry min=\"12rem\" gap=\"1rem\" label=\"Galeria de fotos\">\n  <div style=\"background:#fde68a;border-radius:8px;padding:1rem;height:120px\">Pôr do sol</div>\n  <div style=\"background:#bfdbfe;border-radius:8px;padding:1rem;height:200px\">Montanha nevada</div>\n  <div style=\"background:#bbf7d0;border-radius:8px;padding:1rem;height:90px\">Floresta</div>\n  <div style=\"background:#fbcfe8;border-radius:8px;padding:1rem;height:160px\">Praia ao amanhecer</div>\n  <div style=\"background:#ddd6fe;border-radius:8px;padding:1rem;height:140px\">Cidade à noite</div>\n  <div style=\"background:#fed7aa;border-radius:8px;padding:1rem;height:110px\">Deserto</div>\n</pura-masonry>"
  },
  "fr": {
   "description": "`<pura-masonry>` est un conteneur qui dispose les éléments du slot par défaut en colonnes verticales (flux de haut en bas, puis passage à la colonne suivante), en gardant chaque élément intact via break-inside. Utilisez-le pour des galeries d'images, des cartes de hauteurs variées ou des flux où une grille rigide laisserait des espaces. Il possède une couche agent-native : chaque instance reçoit un id stable dans `data-pura-masonry` et publie un instantané lisible par machine dans `window.__puraMasonry[id]` avec `{ label, columns, count, items }`, permettant aux agents d'inspecter la collection sans scraper le DOM.",
   "attributes": [
    {
     "desc": "Nombre fixe de colonnes (entier >= 1). Lorsqu'il est défini, utilise exactement ce nombre de colonnes à n'importe quelle largeur et reflète la valeur dans data-columns."
    },
    {
     "desc": "Largeur minimale de chaque colonne (longueur CSS). Utilisée en mode responsive (lorsque columns est omis) : le navigateur place autant de colonnes que possible à cette largeur."
    },
    {
     "desc": "Espacement entre les colonnes et entre les lignes (longueur CSS)."
    },
    {
     "desc": "Nom accessible pour la liste d'éléments ; appliqué comme aria-label sur l'hôte (role=list)."
    }
   ],
   "demoHTML": "<pura-masonry min=\"12rem\" gap=\"1rem\" label=\"Galerie de photos\">\n  <div style=\"background:#fde68a;border-radius:8px;padding:1rem;height:120px\">Coucher de soleil</div>\n  <div style=\"background:#bfdbfe;border-radius:8px;padding:1rem;height:200px\">Montagne enneigée</div>\n  <div style=\"background:#bbf7d0;border-radius:8px;padding:1rem;height:90px\">Forêt</div>\n  <div style=\"background:#fbcfe8;border-radius:8px;padding:1rem;height:160px\">Plage à l'aube</div>\n  <div style=\"background:#ddd6fe;border-radius:8px;padding:1rem;height:140px\">Ville la nuit</div>\n  <div style=\"background:#fed7aa;border-radius:8px;padding:1rem;height:110px\">Désert</div>\n</pura-masonry>"
  },
  "de": {
   "description": "`<pura-masonry>` ist ein Container, der die Elemente des Standard-Slots in vertikalen Spalten anordnet (Fluss von oben nach unten, dann Umbruch zur nächsten Spalte) und dabei jedes Element über break-inside intakt hält. Verwenden Sie ihn für Bildgalerien, Karten unterschiedlicher Höhe oder Feeds, bei denen ein starres Raster Lücken hinterlassen würde. Er verfügt über eine agent-native Schicht: Jede Instanz erhält eine stabile id in `data-pura-masonry` und veröffentlicht einen maschinenlesbaren Snapshot in `window.__puraMasonry[id]` mit `{ label, columns, count, items }`, sodass Agenten die Sammlung untersuchen können, ohne das DOM zu scrapen.",
   "attributes": [
    {
     "desc": "Feste Spaltenanzahl (Ganzzahl >= 1). Wenn gesetzt, wird bei jeder Breite genau diese Anzahl an Spalten verwendet und der Wert in data-columns gespiegelt."
    },
    {
     "desc": "Mindestbreite jeder Spalte (CSS-Länge). Wird im responsiven Modus verwendet (wenn columns weggelassen wird): Der Browser platziert so viele Spalten, wie bei dieser Breite passen."
    },
    {
     "desc": "Abstand zwischen Spalten und zwischen Zeilen (CSS-Länge)."
    },
    {
     "desc": "Barrierefreier Name für die Liste der Elemente; angewendet als aria-label auf dem Host (role=list)."
    }
   ],
   "demoHTML": "<pura-masonry min=\"12rem\" gap=\"1rem\" label=\"Fotogalerie\">\n  <div style=\"background:#fde68a;border-radius:8px;padding:1rem;height:120px\">Sonnenuntergang</div>\n  <div style=\"background:#bfdbfe;border-radius:8px;padding:1rem;height:200px\">Verschneiter Berg</div>\n  <div style=\"background:#bbf7d0;border-radius:8px;padding:1rem;height:90px\">Wald</div>\n  <div style=\"background:#fbcfe8;border-radius:8px;padding:1rem;height:160px\">Strand bei Tagesanbruch</div>\n  <div style=\"background:#ddd6fe;border-radius:8px;padding:1rem;height:140px\">Stadt bei Nacht</div>\n  <div style=\"background:#fed7aa;border-radius:8px;padding:1rem;height:110px\">Wüste</div>\n</pura-masonry>"
  },
  "it": {
   "description": "`<pura-masonry>` è un container che dispone gli elementi dello slot predefinito in colonne verticali (flusso dall'alto verso il basso, poi passaggio alla colonna successiva), mantenendo ogni elemento intatto tramite break-inside. Usalo per gallerie di immagini, card di altezze variabili o feed in cui una griglia rigida lascerebbe spazi vuoti. Ha un livello agent-native: ogni istanza riceve un id stabile in `data-pura-masonry` e pubblica uno snapshot leggibile dalle macchine in `window.__puraMasonry[id]` con `{ label, columns, count, items }`, permettendo agli agenti di ispezionare la collezione senza fare scraping del DOM.",
   "attributes": [
    {
     "desc": "Numero fisso di colonne (intero >= 1). Quando impostato, usa esattamente quel numero di colonne a qualsiasi larghezza e riflette il valore in data-columns."
    },
    {
     "desc": "Larghezza minima di ogni colonna (lunghezza CSS). Usata in modalità responsive (quando columns è omesso): il browser inserisce tutte le colonne che entrano a quella larghezza."
    },
    {
     "desc": "Spaziatura tra le colonne e tra le righe (lunghezza CSS)."
    },
    {
     "desc": "Nome accessibile per l'elenco di elementi; applicato come aria-label sull'host (role=list)."
    }
   ],
   "demoHTML": "<pura-masonry min=\"12rem\" gap=\"1rem\" label=\"Galleria fotografica\">\n  <div style=\"background:#fde68a;border-radius:8px;padding:1rem;height:120px\">Tramonto</div>\n  <div style=\"background:#bfdbfe;border-radius:8px;padding:1rem;height:200px\">Montagna innevata</div>\n  <div style=\"background:#bbf7d0;border-radius:8px;padding:1rem;height:90px\">Foresta</div>\n  <div style=\"background:#fbcfe8;border-radius:8px;padding:1rem;height:160px\">Spiaggia all'alba</div>\n  <div style=\"background:#ddd6fe;border-radius:8px;padding:1rem;height:140px\">Città di notte</div>\n  <div style=\"background:#fed7aa;border-radius:8px;padding:1rem;height:110px\">Deserto</div>\n</pura-masonry>"
  }
 },
 "resizable": {
  "pt-BR": {
   "description": "pura-resizable é um web component nativo que divide o espaço em dois painéis (início e fim) separados por um divisor que pode ser arrastado com o ponteiro ou ajustado com as setas do teclado. Use-o sempre que precisar de layouts ajustáveis pelo usuário, como editores lado a lado, listas com um painel de detalhes ou previews divididos. Ele suporta orientação horizontal ou vertical.",
   "attributes": [
    {
     "desc": "Direção da divisão: horizontal (painéis lado a lado) ou vertical (empilhados)."
    },
    {
     "desc": "Porcentagem mínima permitida para cada painel (limitada entre 0 e 45)."
    },
    {
     "desc": "Porcentagem inicial de divisão atribuída ao painel inicial."
    }
   ],
   "demoHTML": "<pura-resizable value=\"40\" min=\"15\" style=\"height: 240px; border: 1px solid var(--pura-border); border-radius: var(--pura-radius);\">\n  <div slot=\"start\" style=\"padding: 1rem;\">\n    <strong>Arquivos</strong>\n    <ul style=\"margin: 0.5rem 0 0; padding-left: 1.25rem;\">\n      <li>index.html</li>\n      <li>style.css</li>\n      <li>app.js</li>\n    </ul>\n  </div>\n  <div slot=\"end\" style=\"padding: 1rem;\">\n    <strong>Editor</strong>\n    <p style=\"margin: 0.5rem 0 0; color: var(--pura-muted);\">\n      Arraste o divisor no centro para redimensionar os painéis.\n    </p>\n  </div>\n</pura-resizable>"
  },
  "fr": {
   "description": "pura-resizable est un composant web natif qui divise l'espace en deux panneaux (début et fin) séparés par un séparateur que l'on peut déplacer avec le pointeur ou ajuster avec les flèches du clavier. Utilisez-le chaque fois que vous avez besoin de mises en page ajustables par l'utilisateur, comme des éditeurs côte à côte, des listes avec un panneau de détail ou des aperçus divisés. Il prend en charge l'orientation horizontale ou verticale.",
   "attributes": [
    {
     "desc": "Sens de la division : horizontal (panneaux côte à côte) ou vertical (empilés)."
    },
    {
     "desc": "Pourcentage minimal autorisé pour chaque panneau (borné entre 0 et 45)."
    },
    {
     "desc": "Pourcentage de division initial attribué au panneau de début."
    }
   ],
   "demoHTML": "<pura-resizable value=\"40\" min=\"15\" style=\"height: 240px; border: 1px solid var(--pura-border); border-radius: var(--pura-radius);\">\n  <div slot=\"start\" style=\"padding: 1rem;\">\n    <strong>Fichiers</strong>\n    <ul style=\"margin: 0.5rem 0 0; padding-left: 1.25rem;\">\n      <li>index.html</li>\n      <li>style.css</li>\n      <li>app.js</li>\n    </ul>\n  </div>\n  <div slot=\"end\" style=\"padding: 1rem;\">\n    <strong>Éditeur</strong>\n    <p style=\"margin: 0.5rem 0 0; color: var(--pura-muted);\">\n      Faites glisser le séparateur au centre pour redimensionner les panneaux.\n    </p>\n  </div>\n</pura-resizable>"
  },
  "de": {
   "description": "pura-resizable ist ein natives Web Component, das den Raum in zwei Panels (Anfang und Ende) aufteilt, getrennt durch einen Trenner, der mit dem Zeiger gezogen oder mit den Pfeiltasten der Tastatur angepasst werden kann. Verwenden Sie es immer dann, wenn Sie vom Benutzer anpassbare Layouts benötigen, etwa Editoren nebeneinander, Listen mit einem Detail-Panel oder geteilte Vorschauen. Es unterstützt horizontale oder vertikale Ausrichtung.",
   "attributes": [
    {
     "desc": "Teilungsrichtung: horizontal (Panels nebeneinander) oder vertical (übereinander gestapelt)."
    },
    {
     "desc": "Mindestprozentsatz, der für jedes Panel zulässig ist (begrenzt zwischen 0 und 45)."
    },
    {
     "desc": "Anfänglicher Teilungsprozentsatz, der dem Anfangs-Panel zugewiesen wird."
    }
   ],
   "demoHTML": "<pura-resizable value=\"40\" min=\"15\" style=\"height: 240px; border: 1px solid var(--pura-border); border-radius: var(--pura-radius);\">\n  <div slot=\"start\" style=\"padding: 1rem;\">\n    <strong>Dateien</strong>\n    <ul style=\"margin: 0.5rem 0 0; padding-left: 1.25rem;\">\n      <li>index.html</li>\n      <li>style.css</li>\n      <li>app.js</li>\n    </ul>\n  </div>\n  <div slot=\"end\" style=\"padding: 1rem;\">\n    <strong>Editor</strong>\n    <p style=\"margin: 0.5rem 0 0; color: var(--pura-muted);\">\n      Ziehen Sie den Trenner in der Mitte, um die Bereiche anzupassen.\n    </p>\n  </div>\n</pura-resizable>"
  },
  "it": {
   "description": "pura-resizable è un web component nativo che divide lo spazio in due pannelli (inizio e fine) separati da un divisore che può essere trascinato con il puntatore o regolato con i tasti freccia della tastiera. Usalo ogni volta che ti servono layout regolabili dall'utente, come editor affiancati, elenchi con un pannello di dettaglio o anteprime divise. Supporta l'orientamento orizzontale o verticale.",
   "attributes": [
    {
     "desc": "Direzione della divisione: horizontal (pannelli affiancati) o vertical (impilati)."
    },
    {
     "desc": "Percentuale minima consentita per ogni pannello (limitata tra 0 e 45)."
    },
    {
     "desc": "Percentuale di divisione iniziale assegnata al pannello iniziale."
    }
   ],
   "demoHTML": "<pura-resizable value=\"40\" min=\"15\" style=\"height: 240px; border: 1px solid var(--pura-border); border-radius: var(--pura-radius);\">\n  <div slot=\"start\" style=\"padding: 1rem;\">\n    <strong>File</strong>\n    <ul style=\"margin: 0.5rem 0 0; padding-left: 1.25rem;\">\n      <li>index.html</li>\n      <li>style.css</li>\n      <li>app.js</li>\n    </ul>\n  </div>\n  <div slot=\"end\" style=\"padding: 1rem;\">\n    <strong>Editor</strong>\n    <p style=\"margin: 0.5rem 0 0; color: var(--pura-muted);\">\n      Trascina il divisore al centro per ridimensionare i pannelli.\n    </p>\n  </div>\n</pura-resizable>"
  }
 },
 "pricing-table": {
  "pt-BR": {
   "description": "`<pura-pricing-table>` é um container que dispõe as colunas `<pura-pricing-tier>` em uma grade que se ajusta automaticamente à largura disponível, e pode destacar um plano com um anel de destaque e um selo \"Popular\". Use-o em páginas de marketing ou de planos/assinaturas para comparar tiers lado a lado de forma acessível (role=\"list\" com itens role=\"listitem\"). É agent-native: cada tabela registra um snapshot vivo e legível por máquina em `window.__puraPricing[id]` com `{ label, tiers: [{ id, name, price, period, featured, features }] }`, permitindo que agentes de IA leiam os planos sem fazer scraping do DOM.",
   "attributes": [
    {
     "desc": "Nome acessível para o grupo de planos (torna-se o aria-label da tabela e o campo label do snapshot). Aplica-se a <pura-pricing-table>."
    },
    {
     "desc": "Largura mínima de cada coluna (qualquer comprimento CSS, por exemplo \"16rem\"); controla o auto-fit da grade. Aplica-se a <pura-pricing-table>."
    },
    {
     "desc": "Nome do plano (por exemplo \"Pro\"). Aplica-se a <pura-pricing-tier>."
    },
    {
     "desc": "Texto do preço (por exemplo \"$29\" ou \"Free\"). Aplica-se a <pura-pricing-tier>."
    },
    {
     "desc": "Sufixo do período de cobrança (por exemplo \"/mo\"). Aplica-se a <pura-pricing-tier>."
    },
    {
     "desc": "Destaca este plano com um anel de destaque e um selo; também define data-featured. Aplica-se a <pura-pricing-tier>."
    },
    {
     "desc": "Texto personalizado para o selo de destaque (só aparece com featured). Aplica-se a <pura-pricing-tier>."
    }
   ],
   "demoHTML": "<pura-pricing-table label=\"Planos Pura\" min=\"16rem\">\n  <pura-pricing-tier name=\"Inicial\" price=\"R$ 0\" period=\"/mês\">\n    <span slot=\"description\">Para começar projetos pessoais.</span>\n    <ul>\n      <li>1 projeto</li>\n      <li>Componentes essenciais</li>\n      <li>Suporte da comunidade</li>\n    </ul>\n    <pura-button slot=\"action\" variant=\"outline\">Começar grátis</pura-button>\n  </pura-pricing-tier>\n\n  <pura-pricing-tier name=\"Pro\" price=\"R$ 149\" period=\"/mês\" featured badge=\"Mais popular\">\n    <span slot=\"description\">Para equipes que precisam de mais.</span>\n    <ul>\n      <li>Projetos ilimitados</li>\n      <li>Todos os componentes</li>\n      <li>Suporte prioritário</li>\n    </ul>\n    <pura-button slot=\"action\" variant=\"primary\">Assinar o Pro</pura-button>\n  </pura-pricing-tier>\n\n  <pura-pricing-tier name=\"Enterprise\" price=\"Sob consulta\">\n    <span slot=\"description\">Para grandes organizações.</span>\n    <ul>\n      <li>SLA dedicado</li>\n      <li>SSO e auditoria</li>\n      <li>Gerente de conta</li>\n    </ul>\n    <pura-button slot=\"action\" variant=\"outline\">Falar com vendas</pura-button>\n  </pura-pricing-tier>\n</pura-pricing-table>"
  },
  "fr": {
   "description": "`<pura-pricing-table>` est un conteneur qui dispose les colonnes `<pura-pricing-tier>` dans une grille qui s'ajuste automatiquement à la largeur disponible, et peut mettre en avant une formule avec un anneau d'accent et un badge \"Popular\". Utilisez-le sur des pages marketing ou de formules/abonnements pour comparer les niveaux côte à côte de manière accessible (role=\"list\" avec des éléments role=\"listitem\"). Il est agent-native : chaque tableau enregistre un instantané vivant et lisible par machine dans `window.__puraPricing[id]` avec `{ label, tiers: [{ id, name, price, period, featured, features }] }`, permettant aux agents IA de lire les formules sans scraper le DOM.",
   "attributes": [
    {
     "desc": "Nom accessible pour le groupe de formules (devient l'aria-label du tableau et le champ label de l'instantané). S'applique à <pura-pricing-table>."
    },
    {
     "desc": "Largeur minimale de chaque colonne (n'importe quelle longueur CSS, par exemple \"16rem\") ; contrôle l'auto-fit de la grille. S'applique à <pura-pricing-table>."
    },
    {
     "desc": "Nom de la formule (par exemple \"Pro\"). S'applique à <pura-pricing-tier>."
    },
    {
     "desc": "Texte du prix (par exemple \"$29\" ou \"Free\"). S'applique à <pura-pricing-tier>."
    },
    {
     "desc": "Suffixe de la période de facturation (par exemple \"/mo\"). S'applique à <pura-pricing-tier>."
    },
    {
     "desc": "Met en avant cette formule avec un anneau d'accent et un badge ; définit aussi data-featured. S'applique à <pura-pricing-tier>."
    },
    {
     "desc": "Texte personnalisé pour le badge de mise en avant (n'apparaît qu'avec featured). S'applique à <pura-pricing-tier>."
    }
   ],
   "demoHTML": "<pura-pricing-table label=\"Forfaits Pura\" min=\"16rem\">\n  <pura-pricing-tier name=\"Démarrage\" price=\"0 €\" period=\"/mois\">\n    <span slot=\"description\">Pour démarrer des projets personnels.</span>\n    <ul>\n      <li>1 projet</li>\n      <li>Composants essentiels</li>\n      <li>Assistance communautaire</li>\n    </ul>\n    <pura-button slot=\"action\" variant=\"outline\">Commencer gratuitement</pura-button>\n  </pura-pricing-tier>\n\n  <pura-pricing-tier name=\"Pro\" price=\"29 €\" period=\"/mois\" featured badge=\"Le plus populaire\">\n    <span slot=\"description\">Pour les équipes qui ont besoin de plus.</span>\n    <ul>\n      <li>Projets illimités</li>\n      <li>Tous les composants</li>\n      <li>Assistance prioritaire</li>\n    </ul>\n    <pura-button slot=\"action\" variant=\"primary\">S'abonner à Pro</pura-button>\n  </pura-pricing-tier>\n\n  <pura-pricing-tier name=\"Enterprise\" price=\"Sur devis\">\n    <span slot=\"description\">Pour les grandes organisations.</span>\n    <ul>\n      <li>SLA dédié</li>\n      <li>SSO et audit</li>\n      <li>Gestionnaire de compte</li>\n    </ul>\n    <pura-button slot=\"action\" variant=\"outline\">Contacter le service commercial</pura-button>\n  </pura-pricing-tier>\n</pura-pricing-table>"
  },
  "de": {
   "description": "`<pura-pricing-table>` ist ein Container, der die Spalten `<pura-pricing-tier>` in einem Raster anordnet, das sich automatisch an die verfügbare Breite anpasst, und einen Plan mit einem Akzentring und einem \"Popular\"-Badge hervorheben kann. Verwenden Sie ihn auf Marketing- oder Plan-/Abonnementseiten, um Tarifstufen barrierefrei nebeneinander zu vergleichen (role=\"list\" mit role=\"listitem\"-Elementen). Er ist agent-native: Jede Tabelle registriert einen lebendigen, maschinenlesbaren Snapshot in `window.__puraPricing[id]` mit `{ label, tiers: [{ id, name, price, period, featured, features }] }`, sodass KI-Agenten die Pläne lesen können, ohne das DOM zu scrapen.",
   "attributes": [
    {
     "desc": "Barrierefreier Name für die Gruppe von Plänen (wird zum aria-label der Tabelle und zum label-Feld des Snapshots). Gilt für <pura-pricing-table>."
    },
    {
     "desc": "Mindestbreite jeder Spalte (beliebige CSS-Länge, z. B. \"16rem\"); steuert das Auto-Fit des Rasters. Gilt für <pura-pricing-table>."
    },
    {
     "desc": "Name des Plans (z. B. \"Pro\"). Gilt für <pura-pricing-tier>."
    },
    {
     "desc": "Preistext (z. B. \"$29\" oder \"Free\"). Gilt für <pura-pricing-tier>."
    },
    {
     "desc": "Suffix des Abrechnungszeitraums (z. B. \"/mo\"). Gilt für <pura-pricing-tier>."
    },
    {
     "desc": "Hebt diesen Plan mit einem Akzentring und einem Badge hervor; setzt außerdem data-featured. Gilt für <pura-pricing-tier>."
    },
    {
     "desc": "Benutzerdefinierter Text für das Hervorhebungs-Badge (erscheint nur mit featured). Gilt für <pura-pricing-tier>."
    }
   ],
   "demoHTML": "<pura-pricing-table label=\"Pura-Tarife\" min=\"16rem\">\n  <pura-pricing-tier name=\"Einsteiger\" price=\"0 €\" period=\"/Monat\">\n    <span slot=\"description\">Zum Starten persönlicher Projekte.</span>\n    <ul>\n      <li>1 Projekt</li>\n      <li>Grundlegende Komponenten</li>\n      <li>Community-Support</li>\n    </ul>\n    <pura-button slot=\"action\" variant=\"outline\">Kostenlos starten</pura-button>\n  </pura-pricing-tier>\n\n  <pura-pricing-tier name=\"Pro\" price=\"29 €\" period=\"/Monat\" featured badge=\"Am beliebtesten\">\n    <span slot=\"description\">Für Teams, die mehr brauchen.</span>\n    <ul>\n      <li>Unbegrenzte Projekte</li>\n      <li>Alle Komponenten</li>\n      <li>Priorisierter Support</li>\n    </ul>\n    <pura-button slot=\"action\" variant=\"primary\">Pro abonnieren</pura-button>\n  </pura-pricing-tier>\n\n  <pura-pricing-tier name=\"Enterprise\" price=\"Auf Anfrage\">\n    <span slot=\"description\">Für große Organisationen.</span>\n    <ul>\n      <li>Dediziertes SLA</li>\n      <li>SSO und Auditing</li>\n      <li>Kundenbetreuer</li>\n    </ul>\n    <pura-button slot=\"action\" variant=\"outline\">Vertrieb kontaktieren</pura-button>\n  </pura-pricing-tier>\n</pura-pricing-table>"
  },
  "it": {
   "description": "`<pura-pricing-table>` è un container che dispone le colonne `<pura-pricing-tier>` in una griglia che si adatta automaticamente alla larghezza disponibile e può evidenziare un piano con un anello di accento e un badge \"Popular\". Usalo su pagine di marketing o di piani/abbonamenti per confrontare i livelli affiancati in modo accessibile (role=\"list\" con elementi role=\"listitem\"). È agent-native: ogni tabella registra uno snapshot vivo e leggibile dalle macchine in `window.__puraPricing[id]` con `{ label, tiers: [{ id, name, price, period, featured, features }] }`, permettendo agli agenti IA di leggere i piani senza fare scraping del DOM.",
   "attributes": [
    {
     "desc": "Nome accessibile per il gruppo di piani (diventa l'aria-label della tabella e il campo label dello snapshot). Si applica a <pura-pricing-table>."
    },
    {
     "desc": "Larghezza minima di ogni colonna (qualsiasi lunghezza CSS, ad esempio \"16rem\"); controlla l'auto-fit della griglia. Si applica a <pura-pricing-table>."
    },
    {
     "desc": "Nome del piano (ad esempio \"Pro\"). Si applica a <pura-pricing-tier>."
    },
    {
     "desc": "Testo del prezzo (ad esempio \"$29\" o \"Free\"). Si applica a <pura-pricing-tier>."
    },
    {
     "desc": "Suffisso del periodo di fatturazione (ad esempio \"/mo\"). Si applica a <pura-pricing-tier>."
    },
    {
     "desc": "Evidenzia questo piano con un anello di accento e un badge; imposta anche data-featured. Si applica a <pura-pricing-tier>."
    },
    {
     "desc": "Testo personalizzato per il badge di evidenziazione (appare solo con featured). Si applica a <pura-pricing-tier>."
    }
   ],
   "demoHTML": "<pura-pricing-table label=\"Piani Pura\" min=\"16rem\">\n  <pura-pricing-tier name=\"Base\" price=\"0 €\" period=\"/mese\">\n    <span slot=\"description\">Per avviare progetti personali.</span>\n    <ul>\n      <li>1 progetto</li>\n      <li>Componenti essenziali</li>\n      <li>Supporto della community</li>\n    </ul>\n    <pura-button slot=\"action\" variant=\"outline\">Inizia gratis</pura-button>\n  </pura-pricing-tier>\n\n  <pura-pricing-tier name=\"Pro\" price=\"29 €\" period=\"/mese\" featured badge=\"Più popolare\">\n    <span slot=\"description\">Per i team che hanno bisogno di più.</span>\n    <ul>\n      <li>Progetti illimitati</li>\n      <li>Tutti i componenti</li>\n      <li>Supporto prioritario</li>\n    </ul>\n    <pura-button slot=\"action\" variant=\"primary\">Abbonati a Pro</pura-button>\n  </pura-pricing-tier>\n\n  <pura-pricing-tier name=\"Enterprise\" price=\"Su richiesta\">\n    <span slot=\"description\">Per le grandi organizzazioni.</span>\n    <ul>\n      <li>SLA dedicato</li>\n      <li>SSO e auditing</li>\n      <li>Account manager</li>\n    </ul>\n    <pura-button slot=\"action\" variant=\"outline\">Contatta le vendite</pura-button>\n  </pura-pricing-tier>\n</pura-pricing-table>"
  }
 },
 "action": {
  "pt-BR": {
   "description": "`<pura-action>` envolve um controle no slot padrão e o expõe como um affordance legível por máquina: espelha os atributos `data-agent-action`/`data-intent` e um `aria-label` no controle no light DOM, e registra a ação em um registro global `window.__puraActions` (um Map indexado por `action-id`) cujas entradas expõem `invoke()`. Use-o para que agentes de IA ou de navegador possam descobrir, entender (via `intent`) e acionar as ações da sua UI programaticamente, sem depender de heurísticas frágeis do DOM. É um wrapper transparente (`display: contents`), então não altera o layout do controle envolvido.",
   "attributes": [
    {
     "desc": "Frase verbal legível por humanos/agentes descrevendo a ação, por exemplo \"save document\". Espelhada como data-intent e usada como aria-label do controle caso ele ainda não tenha um."
    },
    {
     "desc": "Identificador estável usado como chave no registro window.__puraActions e espelhado como data-agent-action no controle. Sem ele, a ação não é descobrível."
    },
    {
     "desc": "Objeto JSON descrevendo os parâmetros da ação. É parseado (JSON inválido vira null) e exposto no detail do evento e na entrada do registro."
    }
   ],
   "demoHTML": "<pura-action id=\"acao-salvar\" intent=\"salvar documento\" action-id=\"save-doc\" params='{\"force\":false}'>\n  <button>Salvar documento</button>\n</pura-action>\n<p id=\"acao-status\">Aguardando ação...</p>\n<button id=\"acao-invoke\">Invocar via agente</button>\n<script type=\"module\">\n  const status = document.getElementById('acao-status');\n  document.getElementById('acao-salvar').addEventListener('invoke', (e) => {\n    status.textContent = 'Ação \"' + e.detail.intent + '\" (' + e.detail.actionId + ') invocada. params=' + JSON.stringify(e.detail.params);\n  });\n  // Simulates an agent discovering and triggering the action through the global registry.\n  document.getElementById('acao-invoke').addEventListener('click', () => {\n    window.__puraActions?.get('save-doc')?.invoke();\n  });\n</script>"
  },
  "fr": {
   "description": "`<pura-action>` enveloppe un contrôle dans le slot par défaut et l'expose comme une affordance lisible par machine : il reflète les attributs `data-agent-action`/`data-intent` et un `aria-label` sur le contrôle dans le light DOM, et enregistre l'action dans un registre global `window.__puraActions` (un Map indexé par `action-id`) dont les entrées exposent `invoke()`. Utilisez-le pour que les agents IA ou de navigateur puissent découvrir, comprendre (via `intent`) et déclencher les actions de votre interface de manière programmatique, sans dépendre d'heuristiques fragiles du DOM. C'est un wrapper transparent (`display: contents`), il ne modifie donc pas la mise en page du contrôle enveloppé.",
   "attributes": [
    {
     "desc": "Phrase verbale lisible par les humains/agents décrivant l'action, par exemple \"save document\". Reflétée comme data-intent et utilisée comme aria-label du contrôle s'il n'en a pas déjà un."
    },
    {
     "desc": "Identifiant stable utilisé comme clé dans le registre window.__puraActions et reflété comme data-agent-action sur le contrôle. Sans lui, l'action n'est pas découvrable."
    },
    {
     "desc": "Objet JSON décrivant les paramètres de l'action. Il est analysé (un JSON invalide devient null) et exposé dans le detail de l'événement et dans l'entrée du registre."
    }
   ],
   "demoHTML": "<pura-action id=\"acao-salvar\" intent=\"enregistrer le document\" action-id=\"save-doc\" params='{\"force\":false}'>\n  <button>Enregistrer le document</button>\n</pura-action>\n<p id=\"acao-status\">En attente d'une action...</p>\n<button id=\"acao-invoke\">Invoquer via l'agent</button>\n<script type=\"module\">\n  const status = document.getElementById('acao-status');\n  document.getElementById('acao-salvar').addEventListener('invoke', (e) => {\n    status.textContent = 'Action \"' + e.detail.intent + '\" (' + e.detail.actionId + ') invoquée. params=' + JSON.stringify(e.detail.params);\n  });\n  // Simulates an agent discovering and triggering the action through the global registry.\n  document.getElementById('acao-invoke').addEventListener('click', () => {\n    window.__puraActions?.get('save-doc')?.invoke();\n  });\n</script>"
  },
  "de": {
   "description": "`<pura-action>` umschließt ein Steuerelement im Standard-Slot und stellt es als maschinenlesbares Affordance bereit: Es spiegelt die Attribute `data-agent-action`/`data-intent` und ein `aria-label` auf das Steuerelement im Light DOM und registriert die Aktion in einer globalen Registry `window.__puraActions` (eine nach `action-id` indizierte Map), deren Einträge `invoke()` bereitstellen. Verwenden Sie es, damit KI- oder Browser-Agenten die Aktionen Ihrer UI programmatisch entdecken, verstehen (über `intent`) und auslösen können, ohne sich auf fragile DOM-Heuristiken zu verlassen. Es ist ein transparenter Wrapper (`display: contents`) und ändert daher das Layout des umschlossenen Steuerelements nicht.",
   "attributes": [
    {
     "desc": "Für Menschen/Agenten lesbare Verbphrase, die die Aktion beschreibt, z. B. \"save document\". Wird als data-intent gespiegelt und als aria-label des Steuerelements verwendet, falls es noch keines hat."
    },
    {
     "desc": "Stabiler Bezeichner, der als Schlüssel in der Registry window.__puraActions verwendet und als data-agent-action auf das Steuerelement gespiegelt wird. Ohne ihn ist die Aktion nicht auffindbar."
    },
    {
     "desc": "JSON-Objekt, das die Parameter der Aktion beschreibt. Es wird geparst (ungültiges JSON wird zu null) und im detail des Events sowie im Registry-Eintrag bereitgestellt."
    }
   ],
   "demoHTML": "<pura-action id=\"acao-salvar\" intent=\"Dokument speichern\" action-id=\"save-doc\" params='{\"force\":false}'>\n  <button>Dokument speichern</button>\n</pura-action>\n<p id=\"acao-status\">Warte auf Aktion...</p>\n<button id=\"acao-invoke\">Über Agenten aufrufen</button>\n<script type=\"module\">\n  const status = document.getElementById('acao-status');\n  document.getElementById('acao-salvar').addEventListener('invoke', (e) => {\n    status.textContent = 'Aktion \"' + e.detail.intent + '\" (' + e.detail.actionId + ') aufgerufen. params=' + JSON.stringify(e.detail.params);\n  });\n  // Simulates an agent discovering and triggering the action through the global registry.\n  document.getElementById('acao-invoke').addEventListener('click', () => {\n    window.__puraActions?.get('save-doc')?.invoke();\n  });\n</script>"
  },
  "it": {
   "description": "`<pura-action>` avvolge un controllo nello slot predefinito e lo espone come un'affordance leggibile dalle macchine: rispecchia gli attributi `data-agent-action`/`data-intent` e un `aria-label` sul controllo nel light DOM e registra l'azione in un registro globale `window.__puraActions` (una Map indicizzata per `action-id`) le cui voci espongono `invoke()`. Usalo affinché gli agenti IA o del browser possano individuare, comprendere (tramite `intent`) e attivare le azioni della tua UI in modo programmatico, senza dipendere da euristiche fragili del DOM. È un wrapper trasparente (`display: contents`), quindi non altera il layout del controllo avvolto.",
   "attributes": [
    {
     "desc": "Frase verbale leggibile da umani/agenti che descrive l'azione, ad esempio \"save document\". Rispecchiata come data-intent e usata come aria-label del controllo se non ne ha già uno."
    },
    {
     "desc": "Identificatore stabile usato come chiave nel registro window.__puraActions e rispecchiato come data-agent-action sul controllo. Senza di esso l'azione non è individuabile."
    },
    {
     "desc": "Oggetto JSON che descrive i parametri dell'azione. Viene analizzato (un JSON non valido diventa null) ed esposto nel detail dell'evento e nella voce del registro."
    }
   ],
   "demoHTML": "<pura-action id=\"acao-salvar\" intent=\"salva documento\" action-id=\"save-doc\" params='{\"force\":false}'>\n  <button>Salva documento</button>\n</pura-action>\n<p id=\"acao-status\">In attesa di un'azione...</p>\n<button id=\"acao-invoke\">Invoca tramite agente</button>\n<script type=\"module\">\n  const status = document.getElementById('acao-status');\n  document.getElementById('acao-salvar').addEventListener('invoke', (e) => {\n    status.textContent = 'Azione \"' + e.detail.intent + '\" (' + e.detail.actionId + ') invocata. params=' + JSON.stringify(e.detail.params);\n  });\n  // Simulates an agent discovering and triggering the action through the global registry.\n  document.getElementById('acao-invoke').addEventListener('click', () => {\n    window.__puraActions?.get('save-doc')?.invoke();\n  });\n</script>"
  }
 },
 "agent-hint": {
  "pt-BR": {
   "description": "Agent Hint (`<pura-agent-hint>`) é um componente agent-native e headless que contém texto oculto aos olhos humanos (a técnica sr-only) mas presente no DOM e na árvore de acessibilidade. Use-o para dar a um leitor de tela ou agente automatizado um contexto extra sobre um controle vizinho, conectando-se via `for` ao `aria-describedby` do alvo. Além do ARIA, ele expõe uma camada legível por máquina: atributos `data-*` estáveis e um registro global `window.__puraAgentHints` (um Map com `query(forId)`) que os agentes podem enumerar para ler cada dica da página.",
   "attributes": [
    {
     "desc": "id do controle que esta dica descreve. Quando definido, conecta o aria-describedby do alvo a um id interno estável para que a dica seja anunciada para aquele controle."
    },
    {
     "desc": "Role de acessibilidade exposto no host."
    },
    {
     "desc": "aria-label opcional para a região da dica."
    },
    {
     "desc": "Peso semântico legível por máquina. Aparece como data-level e aria-roledescription (agent hint / agent tip / agent warning)."
    },
    {
     "desc": "Escape hatch opcional: renderiza a dica de forma visível (para depuração / autoria)."
    }
   ],
   "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:.5rem;max-width:320px\">\n  <label for=\"cupom\">Código do cupom</label>\n  <input id=\"cupom\" type=\"text\" placeholder=\"ex.: PURA10\" />\n  <pura-agent-hint for=\"cupom\" level=\"tip\" visible>\n    Digite o cupom em maiúsculas, sem espaços. Apenas um cupom por pedido.\n  </pura-agent-hint>\n</div>"
  },
  "fr": {
   "description": "Agent Hint (`<pura-agent-hint>`) est un composant agent-native et headless qui contient du texte masqué aux yeux humains (la technique sr-only) mais présent dans le DOM et l'arbre d'accessibilité. Utilisez-le pour donner à un lecteur d'écran ou à un agent automatisé un contexte supplémentaire sur un contrôle voisin, en le connectant via `for` à l'`aria-describedby` de la cible. Au-delà d'ARIA, il expose une couche lisible par machine : des attributs `data-*` stables et un registre global `window.__puraAgentHints` (un Map avec `query(forId)`) que les agents peuvent énumérer pour lire chaque indice de la page.",
   "attributes": [
    {
     "desc": "id du contrôle que cet indice décrit. Lorsqu'il est défini, il relie l'aria-describedby de la cible à un id interne stable afin que l'indice soit annoncé pour ce contrôle."
    },
    {
     "desc": "Rôle d'accessibilité exposé sur l'hôte."
    },
    {
     "desc": "aria-label optionnel pour la région de l'indice."
    },
    {
     "desc": "Poids sémantique lisible par machine. Apparaît comme data-level et aria-roledescription (agent hint / agent tip / agent warning)."
    },
    {
     "desc": "Échappatoire facultative : rend l'indice visible (pour le débogage / la création)."
    }
   ],
   "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:.5rem;max-width:320px\">\n  <label for=\"cupom\">Code promo</label>\n  <input id=\"cupom\" type=\"text\" placeholder=\"ex. : PURA10\" />\n  <pura-agent-hint for=\"cupom\" level=\"tip\" visible>\n    Saisissez le code promo en majuscules, sans espaces. Un seul code par commande.\n  </pura-agent-hint>\n</div>"
  },
  "de": {
   "description": "Agent Hint (`<pura-agent-hint>`) ist eine agent-native, headless Komponente, die Text enthält, der für menschliche Augen verborgen ist (die sr-only-Technik), aber im DOM und im Accessibility-Baum vorhanden ist. Verwenden Sie sie, um einem Screenreader oder automatisierten Agenten zusätzlichen Kontext zu einem benachbarten Steuerelement zu geben, indem Sie sie über `for` mit dem `aria-describedby` des Ziels verbinden. Über ARIA hinaus stellt sie eine maschinenlesbare Schicht bereit: stabile `data-*`-Attribute und eine globale Registry `window.__puraAgentHints` (eine Map mit `query(forId)`), die Agenten aufzählen können, um jeden Hinweis auf der Seite zu lesen.",
   "attributes": [
    {
     "desc": "id des Steuerelements, das dieser Hinweis beschreibt. Wenn gesetzt, verbindet er das aria-describedby des Ziels mit einer stabilen internen id, sodass der Hinweis für dieses Steuerelement angekündigt wird."
    },
    {
     "desc": "Auf dem Host bereitgestellte Accessibility-Rolle."
    },
    {
     "desc": "Optionales aria-label für die Hinweisregion."
    },
    {
     "desc": "Maschinenlesbares semantisches Gewicht. Erscheint als data-level und aria-roledescription (agent hint / agent tip / agent warning)."
    },
    {
     "desc": "Optionale Ausnahmemöglichkeit: rendert den Hinweis sichtbar (zum Debuggen / für die Erstellung)."
    }
   ],
   "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:.5rem;max-width:320px\">\n  <label for=\"cupom\">Gutscheincode</label>\n  <input id=\"cupom\" type=\"text\" placeholder=\"z. B. PURA10\" />\n  <pura-agent-hint for=\"cupom\" level=\"tip\" visible>\n    Geben Sie den Gutschein in Großbuchstaben und ohne Leerzeichen ein. Nur ein Gutschein pro Bestellung.\n  </pura-agent-hint>\n</div>"
  },
  "it": {
   "description": "Agent Hint (`<pura-agent-hint>`) è un componente agent-native e headless che contiene testo nascosto agli occhi umani (la tecnica sr-only) ma presente nel DOM e nell'albero di accessibilità. Usalo per dare a uno screen reader o a un agente automatizzato un contesto aggiuntivo su un controllo vicino, collegandolo tramite `for` all'`aria-describedby` del target. Oltre all'ARIA, espone un livello leggibile dalle macchine: attributi `data-*` stabili e un registro globale `window.__puraAgentHints` (una Map con `query(forId)`) che gli agenti possono enumerare per leggere ogni suggerimento della pagina.",
   "attributes": [
    {
     "desc": "id del controllo che questo suggerimento descrive. Quando impostato, collega l'aria-describedby del target a un id interno stabile in modo che il suggerimento venga annunciato per quel controllo."
    },
    {
     "desc": "Ruolo di accessibilità esposto sull'host."
    },
    {
     "desc": "aria-label opzionale per la regione del suggerimento."
    },
    {
     "desc": "Peso semantico leggibile dalle macchine. Compare come data-level e aria-roledescription (agent hint / agent tip / agent warning)."
    },
    {
     "desc": "Via di fuga opzionale: rende il suggerimento visibile (per il debug / l'authoring)."
    }
   ],
   "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:.5rem;max-width:320px\">\n  <label for=\"cupom\">Codice coupon</label>\n  <input id=\"cupom\" type=\"text\" placeholder=\"es. PURA10\" />\n  <pura-agent-hint for=\"cupom\" level=\"tip\" visible>\n    Inserisci il coupon in maiuscolo, senza spazi. Un solo coupon per ordine.\n  </pura-agent-hint>\n</div>"
  }
 },
 "async": {
  "pt-BR": {
   "description": "`<pura-async>` expressa as fases de carregamento de uma view (loading, error, empty, ready) no markup, mostrando exatamente um de seus slots de acordo com o atributo `state`, em vez de ramificação imperativa. Use-o quando uma região depende de dados assíncronos e você quer alternar entre conteúdo de spinner, erro, vazio e pronto sem JS de exibição. A camada agent-native marca a região com `aria-busy` durante o carregamento, anuncia cada transição em uma live region sr-only dedicada, reflete `data-pura-id`/`data-state` estáveis e registra a instância em `window.__puraAsync`, permitindo que agentes leiam a fase de qualquer região (via `window.__puraAsync.snapshot()`/`state(id)`) sem percorrer o DOM.",
   "attributes": [
    {
     "desc": "Fase atual da região. Uma de: idle | loading | error | empty | ready. Um valor ausente ou desconhecido é normalizado para idle (não renderiza nada). É a única fonte de verdade; setState(s) apenas escreve neste atributo."
    }
   ],
   "demoHTML": "<div style=\"max-width:420px;font-family:system-ui\">\n  <pura-async id=\"conta\" state=\"loading\">\n    <div slot=\"error\">Não foi possível carregar os dados. Tente novamente.</div>\n    <div slot=\"empty\">Nenhuma transação encontrada.</div>\n    <ul>\n      <li>Pagamento recebido: R$ 1.200,00</li>\n      <li>Assinatura mensal: R$ 49,90</li>\n    </ul>\n  </pura-async>\n\n  <div style=\"margin-top:12px;display:flex;gap:8px;flex-wrap:wrap\">\n    <button id=\"btn-loading\">loading</button>\n    <button id=\"btn-ready\">ready</button>\n    <button id=\"btn-empty\">empty</button>\n    <button id=\"btn-error\">error</button>\n  </div>\n</div>\n\n<script type=\"module\">\n  import \"/pura/lib/async.js\";\n  const el = document.getElementById(\"conta\");\n  document.getElementById(\"btn-loading\").onclick = () => el.setState(\"loading\");\n  document.getElementById(\"btn-ready\").onclick = () => el.setState(\"ready\");\n  document.getElementById(\"btn-empty\").onclick = () => el.setState(\"empty\");\n  document.getElementById(\"btn-error\").onclick = () => el.setState(\"error\");\n  el.addEventListener(\"statechange\", (e) =>\n    console.log(\"state:\", e.detail.previous, \"->\", e.detail.state)\n  );\n</script>"
  },
  "fr": {
   "description": "`<pura-async>` exprime les phases de chargement d'une vue (loading, error, empty, ready) dans le balisage, en affichant exactement l'un de ses slots selon l'attribut `state`, au lieu d'un branchement impératif. Utilisez-le lorsqu'une région dépend de données asynchrones et que vous souhaitez basculer entre un contenu de spinner, d'erreur, vide et prêt sans JS d'affichage. La couche agent-native marque la région avec `aria-busy` pendant le chargement, annonce chaque transition dans une live region sr-only dédiée, reflète des `data-pura-id`/`data-state` stables et enregistre l'instance dans `window.__puraAsync`, permettant aux agents de lire la phase de n'importe quelle région (via `window.__puraAsync.snapshot()`/`state(id)`) sans parcourir le DOM.",
   "attributes": [
    {
     "desc": "Phase actuelle de la région. L'une de : idle | loading | error | empty | ready. Une valeur absente ou inconnue est normalisée en idle (n'affiche rien). C'est l'unique source de vérité ; setState(s) ne fait qu'écrire dans cet attribut."
    }
   ],
   "demoHTML": "<div style=\"max-width:420px;font-family:system-ui\">\n  <pura-async id=\"conta\" state=\"loading\">\n    <div slot=\"error\">Impossible de charger les données. Veuillez réessayer.</div>\n    <div slot=\"empty\">Aucune transaction trouvée.</div>\n    <ul>\n      <li>Paiement reçu : 1 200,00 €</li>\n      <li>Abonnement mensuel : 49,90 €</li>\n    </ul>\n  </pura-async>\n\n  <div style=\"margin-top:12px;display:flex;gap:8px;flex-wrap:wrap\">\n    <button id=\"btn-loading\">loading</button>\n    <button id=\"btn-ready\">ready</button>\n    <button id=\"btn-empty\">empty</button>\n    <button id=\"btn-error\">error</button>\n  </div>\n</div>\n\n<script type=\"module\">\n  import \"/pura/lib/async.js\";\n  const el = document.getElementById(\"conta\");\n  document.getElementById(\"btn-loading\").onclick = () => el.setState(\"loading\");\n  document.getElementById(\"btn-ready\").onclick = () => el.setState(\"ready\");\n  document.getElementById(\"btn-empty\").onclick = () => el.setState(\"empty\");\n  document.getElementById(\"btn-error\").onclick = () => el.setState(\"error\");\n  el.addEventListener(\"statechange\", (e) =>\n    console.log(\"state:\", e.detail.previous, \"->\", e.detail.state)\n  );\n</script>"
  },
  "de": {
   "description": "`<pura-async>` drückt die Ladephasen einer Ansicht (loading, error, empty, ready) im Markup aus und zeigt gemäß dem Attribut `state` genau einen seiner Slots an, anstatt imperativer Verzweigung. Verwenden Sie ihn, wenn eine Region von asynchronen Daten abhängt und Sie zwischen Spinner-, Fehler-, Leer- und Bereit-Inhalt ohne Anzeige-JS wechseln möchten. Die agent-native Schicht markiert die Region während des Ladens mit `aria-busy`, kündigt jeden Übergang in einer dedizierten sr-only Live-Region an, spiegelt stabile `data-pura-id`/`data-state` wider und registriert die Instanz in `window.__puraAsync`, sodass Agenten die Phase jeder Region lesen können (über `window.__puraAsync.snapshot()`/`state(id)`), ohne das DOM zu durchlaufen.",
   "attributes": [
    {
     "desc": "Aktuelle Phase der Region. Eine von: idle | loading | error | empty | ready. Ein fehlender oder unbekannter Wert wird auf idle normalisiert (rendert nichts). Sie ist die einzige Quelle der Wahrheit; setState(s) schreibt nur in dieses Attribut."
    }
   ],
   "demoHTML": "<div style=\"max-width:420px;font-family:system-ui\">\n  <pura-async id=\"conta\" state=\"loading\">\n    <div slot=\"error\">Die Daten konnten nicht geladen werden. Bitte versuchen Sie es erneut.</div>\n    <div slot=\"empty\">Keine Transaktionen gefunden.</div>\n    <ul>\n      <li>Zahlung erhalten: 1.200,00 €</li>\n      <li>Monatsabonnement: 49,90 €</li>\n    </ul>\n  </pura-async>\n\n  <div style=\"margin-top:12px;display:flex;gap:8px;flex-wrap:wrap\">\n    <button id=\"btn-loading\">loading</button>\n    <button id=\"btn-ready\">ready</button>\n    <button id=\"btn-empty\">empty</button>\n    <button id=\"btn-error\">error</button>\n  </div>\n</div>\n\n<script type=\"module\">\n  import \"/pura/lib/async.js\";\n  const el = document.getElementById(\"conta\");\n  document.getElementById(\"btn-loading\").onclick = () => el.setState(\"loading\");\n  document.getElementById(\"btn-ready\").onclick = () => el.setState(\"ready\");\n  document.getElementById(\"btn-empty\").onclick = () => el.setState(\"empty\");\n  document.getElementById(\"btn-error\").onclick = () => el.setState(\"error\");\n  el.addEventListener(\"statechange\", (e) =>\n    console.log(\"state:\", e.detail.previous, \"->\", e.detail.state)\n  );\n</script>"
  },
  "it": {
   "description": "`<pura-async>` esprime le fasi di caricamento di una view (loading, error, empty, ready) nel markup, mostrando esattamente uno dei suoi slot in base all'attributo `state`, anziché ricorrere a una diramazione imperativa. Usalo quando una regione dipende da dati asincroni e vuoi passare tra contenuto di spinner, errore, vuoto e pronto senza JS di visualizzazione. Il livello agent-native contrassegna la regione con `aria-busy` durante il caricamento, annuncia ogni transizione in una live region sr-only dedicata, riflette `data-pura-id`/`data-state` stabili e registra l'istanza in `window.__puraAsync`, permettendo agli agenti di leggere la fase di qualsiasi regione (tramite `window.__puraAsync.snapshot()`/`state(id)`) senza attraversare il DOM.",
   "attributes": [
    {
     "desc": "Fase corrente della regione. Una tra: idle | loading | error | empty | ready. Un valore mancante o sconosciuto viene normalizzato a idle (non renderizza nulla). È l'unica fonte di verità; setState(s) scrive soltanto in questo attributo."
    }
   ],
   "demoHTML": "<div style=\"max-width:420px;font-family:system-ui\">\n  <pura-async id=\"conta\" state=\"loading\">\n    <div slot=\"error\">Impossibile caricare i dati. Riprova.</div>\n    <div slot=\"empty\">Nessuna transazione trovata.</div>\n    <ul>\n      <li>Pagamento ricevuto: 1.200,00 €</li>\n      <li>Abbonamento mensile: 49,90 €</li>\n    </ul>\n  </pura-async>\n\n  <div style=\"margin-top:12px;display:flex;gap:8px;flex-wrap:wrap\">\n    <button id=\"btn-loading\">loading</button>\n    <button id=\"btn-ready\">ready</button>\n    <button id=\"btn-empty\">empty</button>\n    <button id=\"btn-error\">error</button>\n  </div>\n</div>\n\n<script type=\"module\">\n  import \"/pura/lib/async.js\";\n  const el = document.getElementById(\"conta\");\n  document.getElementById(\"btn-loading\").onclick = () => el.setState(\"loading\");\n  document.getElementById(\"btn-ready\").onclick = () => el.setState(\"ready\");\n  document.getElementById(\"btn-empty\").onclick = () => el.setState(\"empty\");\n  document.getElementById(\"btn-error\").onclick = () => el.setState(\"error\");\n  el.addEventListener(\"statechange\", (e) =>\n    console.log(\"state:\", e.detail.previous, \"->\", e.detail.state)\n  );\n</script>"
  }
 },
 "command-registry": {
  "pt-BR": {
   "description": "`<pura-command-registry>` é um componente headless (invisível) no estilo WebMCP que coleta os elementos filhos `<pura-command-action>` e os publica em um registro global `window.__puraCommands`, permitindo que um agente de IA ou paleta de comandos enumere (`list()`) e execute (`run(id, args)`) as capacidades da página de forma programática. Cada ação carrega metadados legíveis por máquina (título, descrição, palavras-chave) e também define atributos ARIA/`data-*` para que árvores de acessibilidade e ferramentas possam ler as capacidades sem tocar no JS. Use quando quiser expor as affordances estruturadas da sua interface para automação, agentes ou uma paleta de comandos sem renderizar nada visualmente.",
   "attributes": [
    {
     "desc": "Prefixa os ids das ações no registro global (por exemplo, \"account:save\"), evitando colisões entre registros. Aplicado em <pura-command-registry>."
    },
    {
     "desc": "Em <pura-command-registry>, oculta todas as ações deste registro de list()/get()/run(). Em <pura-command-action>, marca a ação como indisponível (não pode ser invocada)."
    },
    {
     "desc": "Identificador da ação para endereçamento; gerado automaticamente se ausente. Atributo de <pura-command-action>."
    },
    {
     "desc": "Rótulo legível para a ação; também se torna o aria-label. Atributo de <pura-command-action>."
    },
    {
     "desc": "Descrição legível por máquina da ação; também se torna o aria-description. Atributo de <pura-command-action>."
    },
    {
     "desc": "Termos de busca separados por espaços ou vírgulas, usados por paletas/agentes para encontrar a ação. Atributo de <pura-command-action>."
    },
    {
     "desc": "Seletor CSS que precisa corresponder no documento para que a ação fique habilitada; caso contrário, ela aparece como desabilitada. Atributo de <pura-command-action>."
    }
   ],
   "demoHTML": "<div style=\"font-family:system-ui;display:flex;flex-direction:column;gap:12px;max-width:420px\">\n  <p style=\"margin:0;color:#555\">Registro invisível com 2 capacidades. O botão lista e executa as capacidades via <code>window.__puraCommands</code>.</p>\n  <button id=\"run-cmds\" style=\"padding:8px 14px;border:1px solid #ccc;border-radius:8px;cursor:pointer\">Executar comandos do agente</button>\n  <pre id=\"cmd-out\" style=\"background:#f5f5f5;border-radius:8px;padding:12px;margin:0;font-size:13px;white-space:pre-wrap\"></pre>\n\n  <pura-command-registry namespace=\"conta\">\n    <pura-command-action id=\"salvar\" title=\"Salvar perfil\" description=\"Persiste as alterações no perfil do usuário\" keywords=\"salvar armazenar perfil\"></pura-command-action>\n    <pura-command-action id=\"exportar\" title=\"Exportar dados\" description=\"Gera um arquivo com os dados da conta\" keywords=\"exportar baixar csv\"></pura-command-action>\n  </pura-command-registry>\n</div>\n\n<script type=\"module\">\n  import \"/pura/lib/command-registry.js\";\n\n  const reg = document.querySelector(\"pura-command-registry\");\n  reg.querySelector(\"#salvar\").handler = () => \"Perfil salvo com sucesso\";\n  reg.querySelector(\"#exportar\").handler = () => \"Exportação iniciada\";\n\n  document.getElementById(\"run-cmds\").addEventListener(\"click\", () => {\n    const out = document.getElementById(\"cmd-out\");\n    const cmds = window.__puraCommands.list();\n    const lines = cmds.map(c => `- ${c.id}: ${c.title}`);\n    const r1 = window.__puraCommands.run(\"conta:salvar\");\n    const r2 = window.__puraCommands.run(\"conta:exportar\");\n    out.textContent =\n      \"Comandos disponíveis:\\n\" + lines.join(\"\\n\") +\n      \"\\n\\nrun(conta:salvar) -> \" + r1 +\n      \"\\nrun(conta:exportar) -> \" + r2;\n  });\n</script>"
  },
  "fr": {
   "description": "`<pura-command-registry>` est un composant headless (invisible) de style WebMCP qui collecte les éléments enfants `<pura-command-action>` et les publie dans un registre global `window.__puraCommands`, permettant à un agent IA ou à une palette de commandes d'énumérer (`list()`) et d'exécuter (`run(id, args)`) les capacités de la page de manière programmatique. Chaque action porte des métadonnées lisibles par machine (titre, description, mots-clés) et définit également des attributs ARIA/`data-*` afin que les arbres d'accessibilité et les outils puissent lire les capacités sans toucher au JS. Utilisez-le lorsque vous souhaitez exposer les affordances structurées de votre interface à l'automatisation, aux agents ou à une palette de commandes sans rien rendre visuellement.",
   "attributes": [
    {
     "desc": "Préfixe les ids des actions dans le registre global (par exemple, \"account:save\"), évitant les collisions entre registres. Appliqué sur <pura-command-registry>."
    },
    {
     "desc": "Sur <pura-command-registry>, masque toutes les actions de ce registre de list()/get()/run(). Sur <pura-command-action>, marque l'action comme indisponible (ne peut pas être invoquée)."
    },
    {
     "desc": "Identifiant de l'action pour l'adressage ; généré automatiquement s'il est absent. Attribut de <pura-command-action>."
    },
    {
     "desc": "Libellé lisible pour l'action ; devient aussi l'aria-label. Attribut de <pura-command-action>."
    },
    {
     "desc": "Description lisible par machine de l'action ; devient aussi l'aria-description. Attribut de <pura-command-action>."
    },
    {
     "desc": "Termes de recherche séparés par des espaces ou des virgules, utilisés par les palettes/agents pour trouver l'action. Attribut de <pura-command-action>."
    },
    {
     "desc": "Sélecteur CSS qui doit correspondre dans le document pour que l'action soit activée ; sinon elle apparaît comme désactivée. Attribut de <pura-command-action>."
    }
   ],
   "demoHTML": "<div style=\"font-family:system-ui;display:flex;flex-direction:column;gap:12px;max-width:420px\">\n  <p style=\"margin:0;color:#555\">Registre invisible avec 2 capacités. Le bouton les liste et les exécute via <code>window.__puraCommands</code>.</p>\n  <button id=\"run-cmds\" style=\"padding:8px 14px;border:1px solid #ccc;border-radius:8px;cursor:pointer\">Exécuter les commandes de l'agent</button>\n  <pre id=\"cmd-out\" style=\"background:#f5f5f5;border-radius:8px;padding:12px;margin:0;font-size:13px;white-space:pre-wrap\"></pre>\n\n  <pura-command-registry namespace=\"conta\">\n    <pura-command-action id=\"salvar\" title=\"Enregistrer le profil\" description=\"Enregistre les modifications du profil de l'utilisateur\" keywords=\"enregistrer stocker profil\"></pura-command-action>\n    <pura-command-action id=\"exportar\" title=\"Exporter les données\" description=\"Génère un fichier contenant les données du compte\" keywords=\"exporter télécharger csv\"></pura-command-action>\n  </pura-command-registry>\n</div>\n\n<script type=\"module\">\n  import \"/pura/lib/command-registry.js\";\n\n  const reg = document.querySelector(\"pura-command-registry\");\n  reg.querySelector(\"#salvar\").handler = () => \"Profil enregistré avec succès\";\n  reg.querySelector(\"#exportar\").handler = () => \"Exportation démarrée\";\n\n  document.getElementById(\"run-cmds\").addEventListener(\"click\", () => {\n    const out = document.getElementById(\"cmd-out\");\n    const cmds = window.__puraCommands.list();\n    const lines = cmds.map(c => `- ${c.id}: ${c.title}`);\n    const r1 = window.__puraCommands.run(\"conta:salvar\");\n    const r2 = window.__puraCommands.run(\"conta:exportar\");\n    out.textContent =\n      \"Commandes disponibles :\\n\" + lines.join(\"\\n\") +\n      \"\\n\\nrun(conta:salvar) -> \" + r1 +\n      \"\\nrun(conta:exportar) -> \" + r2;\n  });\n</script>"
  },
  "de": {
   "description": "`<pura-command-registry>` ist eine headless (unsichtbare) Komponente im WebMCP-Stil, die untergeordnete `<pura-command-action>`-Elemente sammelt und in einem globalen Registry `window.__puraCommands` veröffentlicht. So kann ein KI-Agent oder eine Befehlspalette die Fähigkeiten der Seite programmatisch aufzählen (`list()`) und ausführen (`run(id, args)`). Jede Aktion trägt maschinenlesbare Metadaten (Titel, Beschreibung, Schlüsselwörter) und setzt außerdem ARIA-/`data-*`-Attribute, damit Accessibility-Bäume und Werkzeuge die Fähigkeiten lesen können, ohne das JS anzufassen. Verwenden Sie es, wenn Sie die strukturierten Affordances Ihrer Oberfläche für Automatisierung, Agenten oder eine Befehlspalette bereitstellen möchten, ohne etwas visuell zu rendern.",
   "attributes": [
    {
     "desc": "Stellt den Aktions-ids im globalen Registry ein Präfix voran (z. B. \"account:save\") und vermeidet so Kollisionen zwischen Registries. Wird auf <pura-command-registry> angewendet."
    },
    {
     "desc": "Auf <pura-command-registry> blendet es alle Aktionen dieses Registrys aus list()/get()/run() aus. Auf <pura-command-action> markiert es die Aktion als nicht verfügbar (kann nicht aufgerufen werden)."
    },
    {
     "desc": "Aktionskennung zur Adressierung; wird automatisch generiert, falls nicht vorhanden. Attribut von <pura-command-action>."
    },
    {
     "desc": "Lesbare Bezeichnung für die Aktion; wird auch zum aria-label. Attribut von <pura-command-action>."
    },
    {
     "desc": "Maschinenlesbare Beschreibung der Aktion; wird auch zum aria-description. Attribut von <pura-command-action>."
    },
    {
     "desc": "Durch Leerzeichen oder Kommata getrennte Suchbegriffe, die von Paletten/Agenten verwendet werden, um die Aktion zu finden. Attribut von <pura-command-action>."
    },
    {
     "desc": "CSS-Selektor, der im Dokument zutreffen muss, damit die Aktion aktiviert ist; andernfalls erscheint sie als deaktiviert. Attribut von <pura-command-action>."
    }
   ],
   "demoHTML": "<div style=\"font-family:system-ui;display:flex;flex-direction:column;gap:12px;max-width:420px\">\n  <p style=\"margin:0;color:#555\">Unsichtbares Registry mit 2 Fähigkeiten. Die Schaltfläche listet und führt sie über <code>window.__puraCommands</code> aus.</p>\n  <button id=\"run-cmds\" style=\"padding:8px 14px;border:1px solid #ccc;border-radius:8px;cursor:pointer\">Agentenbefehle ausführen</button>\n  <pre id=\"cmd-out\" style=\"background:#f5f5f5;border-radius:8px;padding:12px;margin:0;font-size:13px;white-space:pre-wrap\"></pre>\n\n  <pura-command-registry namespace=\"conta\">\n    <pura-command-action id=\"salvar\" title=\"Profil speichern\" description=\"Speichert die Änderungen am Profil des Benutzers\" keywords=\"speichern sichern profil\"></pura-command-action>\n    <pura-command-action id=\"exportar\" title=\"Daten exportieren\" description=\"Erstellt eine Datei mit den Kontodaten\" keywords=\"exportieren herunterladen csv\"></pura-command-action>\n  </pura-command-registry>\n</div>\n\n<script type=\"module\">\n  import \"/pura/lib/command-registry.js\";\n\n  const reg = document.querySelector(\"pura-command-registry\");\n  reg.querySelector(\"#salvar\").handler = () => \"Profil erfolgreich gespeichert\";\n  reg.querySelector(\"#exportar\").handler = () => \"Export gestartet\";\n\n  document.getElementById(\"run-cmds\").addEventListener(\"click\", () => {\n    const out = document.getElementById(\"cmd-out\");\n    const cmds = window.__puraCommands.list();\n    const lines = cmds.map(c => `- ${c.id}: ${c.title}`);\n    const r1 = window.__puraCommands.run(\"conta:salvar\");\n    const r2 = window.__puraCommands.run(\"conta:exportar\");\n    out.textContent =\n      \"Verfügbare Befehle:\\n\" + lines.join(\"\\n\") +\n      \"\\n\\nrun(conta:salvar) -> \" + r1 +\n      \"\\nrun(conta:exportar) -> \" + r2;\n  });\n</script>"
  },
  "it": {
   "description": "`<pura-command-registry>` è un componente headless (invisibile) in stile WebMCP che raccoglie gli elementi figli `<pura-command-action>` e li pubblica in un registro globale `window.__puraCommands`, consentendo a un agente IA o a una palette di comandi di enumerare (`list()`) ed eseguire (`run(id, args)`) le capacità della pagina in modo programmatico. Ogni azione porta metadati leggibili dalla macchina (titolo, descrizione, parole chiave) e imposta anche attributi ARIA/`data-*` affinché alberi di accessibilità e strumenti possano leggere le capacità senza toccare il JS. Usalo quando vuoi esporre le affordance strutturate della tua interfaccia ad automazione, agenti o a una palette di comandi senza renderizzare nulla visivamente.",
   "attributes": [
    {
     "desc": "Antepone un prefisso agli id delle azioni nel registro globale (ad esempio, \"account:save\"), evitando collisioni tra registri. Applicato su <pura-command-registry>."
    },
    {
     "desc": "Su <pura-command-registry>, nasconde tutte le azioni di questo registro da list()/get()/run(). Su <pura-command-action>, contrassegna l'azione come non disponibile (non può essere invocata)."
    },
    {
     "desc": "Identificatore dell'azione per l'indirizzamento; generato automaticamente se assente. Attributo di <pura-command-action>."
    },
    {
     "desc": "Etichetta leggibile per l'azione; diventa anche l'aria-label. Attributo di <pura-command-action>."
    },
    {
     "desc": "Descrizione leggibile dalla macchina dell'azione; diventa anche l'aria-description. Attributo di <pura-command-action>."
    },
    {
     "desc": "Termini di ricerca separati da spazi o virgole, usati da palette/agenti per trovare l'azione. Attributo di <pura-command-action>."
    },
    {
     "desc": "Selettore CSS che deve corrispondere nel documento affinché l'azione sia abilitata; in caso contrario appare come disabilitata. Attributo di <pura-command-action>."
    }
   ],
   "demoHTML": "<div style=\"font-family:system-ui;display:flex;flex-direction:column;gap:12px;max-width:420px\">\n  <p style=\"margin:0;color:#555\">Registro invisibile con 2 funzionalità. Il pulsante le elenca ed esegue tramite <code>window.__puraCommands</code>.</p>\n  <button id=\"run-cmds\" style=\"padding:8px 14px;border:1px solid #ccc;border-radius:8px;cursor:pointer\">Esegui i comandi dell'agente</button>\n  <pre id=\"cmd-out\" style=\"background:#f5f5f5;border-radius:8px;padding:12px;margin:0;font-size:13px;white-space:pre-wrap\"></pre>\n\n  <pura-command-registry namespace=\"conta\">\n    <pura-command-action id=\"salvar\" title=\"Salva profilo\" description=\"Salva le modifiche al profilo dell'utente\" keywords=\"salva memorizza profilo\"></pura-command-action>\n    <pura-command-action id=\"exportar\" title=\"Esporta dati\" description=\"Genera un file con i dati dell'account\" keywords=\"esporta scarica csv\"></pura-command-action>\n  </pura-command-registry>\n</div>\n\n<script type=\"module\">\n  import \"/pura/lib/command-registry.js\";\n\n  const reg = document.querySelector(\"pura-command-registry\");\n  reg.querySelector(\"#salvar\").handler = () => \"Profilo salvato correttamente\";\n  reg.querySelector(\"#exportar\").handler = () => \"Esportazione avviata\";\n\n  document.getElementById(\"run-cmds\").addEventListener(\"click\", () => {\n    const out = document.getElementById(\"cmd-out\");\n    const cmds = window.__puraCommands.list();\n    const lines = cmds.map(c => `- ${c.id}: ${c.title}`);\n    const r1 = window.__puraCommands.run(\"conta:salvar\");\n    const r2 = window.__puraCommands.run(\"conta:exportar\");\n    out.textContent =\n      \"Comandi disponibili:\\n\" + lines.join(\"\\n\") +\n      \"\\n\\nrun(conta:salvar) -> \" + r1 +\n      \"\\nrun(conta:exportar) -> \" + r2;\n  });\n</script>"
  }
 },
 "copy-region": {
  "pt-BR": {
   "description": "Componente agent-native que envolve o conteúdo do slot e revela, ao passar o mouse ou ao focar, um botão de copiar que escreve o texto da região (ou o atributo `value`) na área de transferência, com uma confirmação flutuante e uma região live para leitores de tela. Use quando quiser oferecer cópia rápida de blocos de código, tokens, comandos ou texto. A camada legível por máquina marca o host com `data-copyable`, `data-pura-copy`, `data-pura-copy-source` e role/aria-roledescription, e registra cada região em `window.__puraCopyRegions` (um Map com `id`, `el`, `text()`, `copy()`, `all()`), permitindo que agentes enumerem, leiam e disparem a cópia sem perfurar o Shadow DOM.",
   "attributes": [
    {
     "desc": "Texto literal a copiar. Quando presente, prevalece sobre o texto do slot (útil quando o conteúdo visível difere do payload)."
    },
    {
     "desc": "Rótulo acessível (aria-label) para o botão de copiar."
    },
    {
     "desc": "Duração da confirmação em ms. Valores finitos >= 0 são aceitos; caso contrário, usa 1400."
    },
    {
     "desc": "Torna a região não interativa: o botão sai do fluxo e copy() vira um no-op."
    },
    {
     "desc": "Posição da confirmação flutuante em relação à região. Valores inválidos são removidos."
    }
   ],
   "demoHTML": "<pura-copy-region value=\"npm install pura\" label=\"Copiar comando\" style=\"max-width:32rem\">\n  <pre style=\"margin:0;padding:1rem 1.25rem;background:#0f172a;color:#e2e8f0;border-radius:8px;font-family:ui-monospace,monospace;font-size:.9rem;overflow:auto\"><code>npm install pura</code></pre>\n</pura-copy-region>\n\n<p id=\"status-copy\" role=\"status\" style=\"margin-top:.75rem;font-size:.85rem;color:#475569\"></p>\n\n<script type=\"module\">\n  import \"/pura/lib/copy-region.js\";\n  const status = document.getElementById(\"status-copy\");\n  document.querySelector(\"pura-copy-region\").addEventListener(\"copy\", (e) => {\n    status.textContent = `Copiado: ${e.detail.value}`;\n  });\n</script>"
  },
  "fr": {
   "description": "Composant agent-native qui enveloppe le contenu du slot et révèle, au survol ou au focus, un bouton de copie qui écrit le texte de la région (ou l'attribut `value`) dans le presse-papiers, avec une confirmation flottante et une région live pour les lecteurs d'écran. Utilisez-le lorsque vous souhaitez offrir une copie rapide de blocs de code, de tokens, de commandes ou de texte. La couche lisible par machine marque le host avec `data-copyable`, `data-pura-copy`, `data-pura-copy-source` et role/aria-roledescription, et enregistre chaque région dans `window.__puraCopyRegions` (un Map avec `id`, `el`, `text()`, `copy()`, `all()`), permettant aux agents d'énumérer, de lire et de déclencher la copie sans percer le Shadow DOM.",
   "attributes": [
    {
     "desc": "Texte littéral à copier. Lorsqu'il est présent, il prévaut sur le texte du slot (utile lorsque le contenu visible diffère de la charge utile)."
    },
    {
     "desc": "Libellé accessible (aria-label) pour le bouton de copie."
    },
    {
     "desc": "Durée de la confirmation en ms. Les valeurs finies >= 0 sont acceptées ; sinon il utilise 1400."
    },
    {
     "desc": "Rend la région non interactive : le bouton sort du flux et copy() devient un no-op."
    },
    {
     "desc": "Position de la confirmation flottante par rapport à la région. Les valeurs invalides sont supprimées."
    }
   ],
   "demoHTML": "<pura-copy-region value=\"npm install pura\" label=\"Copier la commande\" style=\"max-width:32rem\">\n  <pre style=\"margin:0;padding:1rem 1.25rem;background:#0f172a;color:#e2e8f0;border-radius:8px;font-family:ui-monospace,monospace;font-size:.9rem;overflow:auto\"><code>npm install pura</code></pre>\n</pura-copy-region>\n\n<p id=\"status-copy\" role=\"status\" style=\"margin-top:.75rem;font-size:.85rem;color:#475569\"></p>\n\n<script type=\"module\">\n  import \"/pura/lib/copy-region.js\";\n  const status = document.getElementById(\"status-copy\");\n  document.querySelector(\"pura-copy-region\").addEventListener(\"copy\", (e) => {\n    status.textContent = `Copié : ${e.detail.value}`;\n  });\n</script>"
  },
  "de": {
   "description": "Agent-native Komponente, die den Slot-Inhalt umschließt und beim Überfahren mit der Maus oder beim Fokussieren eine Kopierschaltfläche einblendet, die den Text des Bereichs (oder das Attribut `value`) in die Zwischenablage schreibt, mit einer schwebenden Bestätigung und einer Live-Region für Screenreader. Verwenden Sie es, wenn Sie schnelles Kopieren von Codeblöcken, Tokens, Befehlen oder Text anbieten möchten. Die maschinenlesbare Schicht markiert den Host mit `data-copyable`, `data-pura-copy`, `data-pura-copy-source` und role/aria-roledescription und registriert jeden Bereich in `window.__puraCopyRegions` (eine Map mit `id`, `el`, `text()`, `copy()`, `all()`), sodass Agenten das Kopieren aufzählen, lesen und auslösen können, ohne das Shadow DOM zu durchdringen.",
   "attributes": [
    {
     "desc": "Wörtlicher Text zum Kopieren. Wenn vorhanden, hat er Vorrang vor dem Slot-Text (nützlich, wenn sich der sichtbare Inhalt von der Nutzlast unterscheidet)."
    },
    {
     "desc": "Barrierefreie Bezeichnung (aria-label) für die Kopierschaltfläche."
    },
    {
     "desc": "Dauer der Bestätigung in ms. Endliche Werte >= 0 werden akzeptiert; andernfalls wird 1400 verwendet."
    },
    {
     "desc": "Macht den Bereich nicht interaktiv: Die Schaltfläche verlässt den Fluss und copy() wird zu einem No-op."
    },
    {
     "desc": "Position der schwebenden Bestätigung relativ zum Bereich. Ungültige Werte werden entfernt."
    }
   ],
   "demoHTML": "<pura-copy-region value=\"npm install pura\" label=\"Befehl kopieren\" style=\"max-width:32rem\">\n  <pre style=\"margin:0;padding:1rem 1.25rem;background:#0f172a;color:#e2e8f0;border-radius:8px;font-family:ui-monospace,monospace;font-size:.9rem;overflow:auto\"><code>npm install pura</code></pre>\n</pura-copy-region>\n\n<p id=\"status-copy\" role=\"status\" style=\"margin-top:.75rem;font-size:.85rem;color:#475569\"></p>\n\n<script type=\"module\">\n  import \"/pura/lib/copy-region.js\";\n  const status = document.getElementById(\"status-copy\");\n  document.querySelector(\"pura-copy-region\").addEventListener(\"copy\", (e) => {\n    status.textContent = `Kopiert: ${e.detail.value}`;\n  });\n</script>"
  },
  "it": {
   "description": "Componente agent-native che avvolge il contenuto dello slot e rivela, al passaggio del mouse o al focus, un pulsante di copia che scrive il testo della regione (o l'attributo `value`) negli appunti, con una conferma fluttuante e una regione live per gli screen reader. Usalo quando vuoi offrire una copia rapida di blocchi di codice, token, comandi o testo. Lo strato leggibile dalla macchina contrassegna l'host con `data-copyable`, `data-pura-copy`, `data-pura-copy-source` e role/aria-roledescription, e registra ogni regione in `window.__puraCopyRegions` (una Map con `id`, `el`, `text()`, `copy()`, `all()`), permettendo agli agenti di enumerare, leggere e attivare la copia senza perforare lo Shadow DOM.",
   "attributes": [
    {
     "desc": "Testo letterale da copiare. Quando presente, prevale sul testo dello slot (utile quando il contenuto visibile differisce dal payload)."
    },
    {
     "desc": "Etichetta accessibile (aria-label) per il pulsante di copia."
    },
    {
     "desc": "Durata della conferma in ms. Sono accettati valori finiti >= 0; in caso contrario usa 1400."
    },
    {
     "desc": "Rende la regione non interattiva: il pulsante esce dal flusso e copy() diventa un no-op."
    },
    {
     "desc": "Posizione della conferma fluttuante rispetto alla regione. I valori non validi vengono rimossi."
    }
   ],
   "demoHTML": "<pura-copy-region value=\"npm install pura\" label=\"Copia comando\" style=\"max-width:32rem\">\n  <pre style=\"margin:0;padding:1rem 1.25rem;background:#0f172a;color:#e2e8f0;border-radius:8px;font-family:ui-monospace,monospace;font-size:.9rem;overflow:auto\"><code>npm install pura</code></pre>\n</pura-copy-region>\n\n<p id=\"status-copy\" role=\"status\" style=\"margin-top:.75rem;font-size:.85rem;color:#475569\"></p>\n\n<script type=\"module\">\n  import \"/pura/lib/copy-region.js\";\n  const status = document.getElementById(\"status-copy\");\n  document.querySelector(\"pura-copy-region\").addEventListener(\"copy\", (e) => {\n    status.textContent = `Copiato: ${e.detail.value}`;\n  });\n</script>"
  }
 },
 "explain": {
  "pt-BR": {
   "description": "pura-explain envolve um conteúdo (slot padrão) e associa a ele uma explicação em texto, revelada pelos humanos por meio de um pequeno botão \"?\" em um popover flutuante. A explicação está sempre presente na árvore de acessibilidade via aria-description, de modo que leitores de tela e agentes a leem sem precisar abrir nada. A camada agent-native expõe data-pura-id, data-pura-explanation e data-pura-open no host e registra cada explicação em window.__puraExplains (data-pura-id -> { id, text, open, element }), permitindo que um agente enumere todas as explicações da página e leia cada uma como uma string sem abrir o popover nem atravessar o shadow DOM. Use ao redor de termos técnicos, jargões ou campos que precisem de contexto.",
   "attributes": [
    {
     "desc": "A explicação em linguagem simples. Opcional se um filho com slot=\"explanation\" for fornecido. O atributo text tem prioridade quando ambos estão presentes."
    },
    {
     "desc": "Posição do popover em relação ao conteúdo. Valores desconhecidos são normalizados para bottom."
    },
    {
     "desc": "Rótulo acessível para o botão acionador \"?\"."
    },
    {
     "desc": "Booleano refletido; presente enquanto o popover está aberto. Pode ser definido para abrir o popover de forma programática."
    }
   ],
   "demoHTML": "<p style=\"max-width:32rem;line-height:1.7\">\n  Sua fatura entra em\n  <pura-explain text=\"O período durante o qual um pagamento está vencido e ainda não foi quitado.\" placement=\"bottom\">inadimplência</pura-explain>\n  30 dias após o vencimento, momento em que passamos a cobrar\n  <pura-explain placement=\"top\">\n    juros\n    <span slot=\"explanation\">Um acréscimo de <strong>2%</strong> sobre o valor original mais 0,033% ao dia.</span>\n  </pura-explain>\n  sobre o saldo em aberto.\n</p>"
  },
  "fr": {
   "description": "pura-explain enveloppe un contenu (slot par défaut) et lui associe une explication textuelle, révélée par les humains via un petit bouton \"?\" dans un popover flottant. L'explication est toujours présente dans l'arbre d'accessibilité via aria-description, de sorte que les lecteurs d'écran et les agents la lisent sans avoir à rien ouvrir. La couche agent-native expose data-pura-id, data-pura-explanation et data-pura-open sur le host et enregistre chaque explication dans window.__puraExplains (data-pura-id -> { id, text, open, element }), permettant à un agent d'énumérer toutes les explications de la page et de lire chacune comme une chaîne sans ouvrir le popover ni traverser le shadow DOM. Utilisez-le autour de termes techniques, de jargon ou de champs qui nécessitent du contexte.",
   "attributes": [
    {
     "desc": "L'explication en langage clair. Facultative si un enfant avec slot=\"explanation\" est fourni. L'attribut text est prioritaire lorsque les deux sont présents."
    },
    {
     "desc": "Position du popover par rapport au contenu. Les valeurs inconnues sont normalisées en bottom."
    },
    {
     "desc": "Libellé accessible pour le bouton déclencheur \"?\"."
    },
    {
     "desc": "Booléen reflété ; présent tant que le popover est ouvert. Peut être défini pour ouvrir le popover de manière programmatique."
    }
   ],
   "demoHTML": "<p style=\"max-width:32rem;line-height:1.7\">\n  Votre facture passe en\n  <pura-explain text=\"La période durant laquelle un paiement est en retard et n'a toujours pas été réglé.\" placement=\"bottom\">défaut de paiement</pura-explain>\n  30 jours après l'échéance, moment auquel nous commençons à facturer des\n  <pura-explain placement=\"top\">\n    intérêts\n    <span slot=\"explanation\">Une majoration de <strong>2 %</strong> sur le montant initial plus 0,033 % par jour.</span>\n  </pura-explain>\n  sur le solde restant dû.\n</p>"
  },
  "de": {
   "description": "pura-explain umschließt einen Inhalt (Standard-Slot) und verknüpft damit eine Texterklärung, die Menschen über eine kleine \"?\"-Schaltfläche in einem schwebenden Popover einblenden. Die Erklärung ist über aria-description stets im Accessibility-Baum vorhanden, sodass Screenreader und Agenten sie lesen, ohne etwas öffnen zu müssen. Die agent-native Schicht stellt data-pura-id, data-pura-explanation und data-pura-open auf dem Host bereit und registriert jede Erklärung in window.__puraExplains (data-pura-id -> { id, text, open, element }), sodass ein Agent jede Erklärung auf der Seite aufzählen und jede als Zeichenkette lesen kann, ohne das Popover zu öffnen oder das Shadow DOM zu überqueren. Verwenden Sie es rund um Fachbegriffe, Jargon oder Felder, die Kontext benötigen.",
   "attributes": [
    {
     "desc": "Die Erklärung in einfacher Sprache. Optional, wenn ein Kind mit slot=\"explanation\" bereitgestellt wird. Das Attribut text hat Vorrang, wenn beide vorhanden sind."
    },
    {
     "desc": "Position des Popovers relativ zum Inhalt. Unbekannte Werte werden auf bottom normalisiert."
    },
    {
     "desc": "Barrierefreie Bezeichnung für die \"?\"-Auslöseschaltfläche."
    },
    {
     "desc": "Reflektierter Boolean; vorhanden, solange das Popover geöffnet ist. Kann gesetzt werden, um das Popover programmatisch zu öffnen."
    }
   ],
   "demoHTML": "<p style=\"max-width:32rem;line-height:1.7\">\n  Ihre Rechnung gerät in\n  <pura-explain text=\"Der Zeitraum, in dem eine Zahlung überfällig ist und noch nicht beglichen wurde.\" placement=\"bottom\">Zahlungsverzug</pura-explain>\n  30 Tage nach Fälligkeit, ab dann berechnen wir\n  <pura-explain placement=\"top\">\n    Zinsen\n    <span slot=\"explanation\">Ein Aufschlag von <strong>2 %</strong> auf den ursprünglichen Betrag plus 0,033 % pro Tag.</span>\n  </pura-explain>\n  auf den offenen Saldo.\n</p>"
  },
  "it": {
   "description": "pura-explain avvolge un contenuto (slot predefinito) e gli associa una spiegazione testuale, rivelata dagli umani tramite un piccolo pulsante \"?\" in un popover fluttuante. La spiegazione è sempre presente nell'albero di accessibilità tramite aria-description, così che screen reader e agenti la leggano senza dover aprire nulla. Lo strato agent-native espone data-pura-id, data-pura-explanation e data-pura-open sull'host e registra ogni spiegazione in window.__puraExplains (data-pura-id -> { id, text, open, element }), consentendo a un agente di enumerare tutte le spiegazioni della pagina e di leggere ciascuna come stringa senza aprire il popover né attraversare lo shadow DOM. Usalo attorno a termini tecnici, gergo o campi che necessitano di contesto.",
   "attributes": [
    {
     "desc": "La spiegazione in linguaggio semplice. Facoltativa se viene fornito un figlio con slot=\"explanation\". L'attributo text ha la priorità quando entrambi sono presenti."
    },
    {
     "desc": "Posizione del popover rispetto al contenuto. I valori sconosciuti vengono normalizzati a bottom."
    },
    {
     "desc": "Etichetta accessibile per il pulsante attivatore \"?\"."
    },
    {
     "desc": "Booleano riflesso; presente mentre il popover è aperto. Può essere impostato per aprire il popover in modo programmatico."
    }
   ],
   "demoHTML": "<p style=\"max-width:32rem;line-height:1.7\">\n  La tua fattura entra in\n  <pura-explain text=\"Il periodo durante il quale un pagamento è scaduto e non è ancora stato saldato.\" placement=\"bottom\">morosità</pura-explain>\n  30 giorni dopo la scadenza, momento in cui iniziamo ad addebitare gli\n  <pura-explain placement=\"top\">\n    interessi\n    <span slot=\"explanation\">Una maggiorazione del <strong>2%</strong> sull'importo originale più lo 0,033% al giorno.</span>\n  </pura-explain>\n  sul saldo residuo.\n</p>"
  }
 },
 "hotkey": {
  "pt-BR": {
   "description": "<pura-hotkey> registra um atalho de teclado global no documento e dispara o evento `trigger` quando a combinação é pressionada, e pode ativar um elemento alvo via seletor CSS sem escrever nenhum script. Use quando precisar de atalhos (mod+k, Ctrl+Shift+P, etc.) que abram diálogos, acionem botões ou comandem qualquer controle de forma declarativa. Por ser agent-native, ele reflete data-* no host (data-pura-hotkey, data-keys, data-combo, data-target), expõe aria-keyshortcuts e se registra em window.__puraHotkeys com .list(), .find(keys) e .trigger(keys), permitindo que agentes enumerem e disparem todos os atalhos da página sem tocar no shadow DOM.",
   "attributes": [
    {
     "desc": "A combinação a vincular, por exemplo \"mod+k\", \"Ctrl Shift P\", \"⌘ /\". `mod` vira ⌘ na Apple e Ctrl nos demais. Vazio/ausente => sem vínculo."
    },
    {
     "desc": "Seletor CSS opcional; ao disparar, a primeira correspondência é ativada (focus + click em botões/links, ou .show()/.open()/.click() se exposto)."
    },
    {
     "desc": "Seletor CSS opcional que precisa existir no documento para que o vínculo esteja ativo (restringe o atalho a um estado)."
    },
    {
     "desc": "Enquanto presente, o vínculo fica inerte."
    },
    {
     "desc": "Por padrão a combinação é ignorada durante a digitação em input/textarea/select/contenteditable. Ative para deixá-la disparar dentro de campos (combinações com modificador, como mod+k, sempre disparam)."
    },
    {
     "desc": "Quando definido, impede a ação padrão do navegador no keydown. Ligado por padrão para combinações que têm um modificador."
    }
   ],
   "demoHTML": "<div style=\"font-family:system-ui;display:flex;flex-direction:column;gap:12px;max-width:420px\">\n  <p>Pressione <kbd>mod+k</kbd> (⌘K no Mac, Ctrl+K nos demais) ou clique no botão para abrir a busca.</p>\n  <button id=\"abrir-busca\">Abrir busca</button>\n  <dialog id=\"busca\" style=\"border:1px solid #ccc;border-radius:8px;padding:16px\">\n    <p>Busca aberta pelo atalho.</p>\n    <form method=\"dialog\"><button>Fechar</button></form>\n  </dialog>\n\n  <pura-hotkey keys=\"mod+k\" target=\"#abrir-busca\"></pura-hotkey>\n</div>\n\n<script type=\"module\">\n  import \"/pura/lib/hotkey.js\";\n  const btn = document.getElementById(\"abrir-busca\");\n  const dlg = document.getElementById(\"busca\");\n  btn.addEventListener(\"click\", () => dlg.showModal());\n</script>"
  },
  "fr": {
   "description": "<pura-hotkey> enregistre un raccourci clavier global sur le document et déclenche l'événement `trigger` lorsque la combinaison est pressée, et il peut activer un élément cible via un sélecteur CSS sans écrire le moindre script. Utilisez-le lorsque vous avez besoin de raccourcis (mod+k, Ctrl+Shift+P, etc.) qui ouvrent des boîtes de dialogue, déclenchent des boutons ou pilotent n'importe quel contrôle de manière déclarative. Étant agent-native, il reflète data-* sur le host (data-pura-hotkey, data-keys, data-combo, data-target), expose aria-keyshortcuts et s'enregistre dans window.__puraHotkeys avec .list(), .find(keys) et .trigger(keys), permettant aux agents d'énumérer et de déclencher tous les raccourcis de la page sans toucher au shadow DOM.",
   "attributes": [
    {
     "desc": "La combinaison à lier, par exemple \"mod+k\", \"Ctrl Shift P\", \"⌘ /\". `mod` devient ⌘ sur Apple et Ctrl ailleurs. Vide/absent => aucune liaison."
    },
    {
     "desc": "Sélecteur CSS facultatif ; au déclenchement, la première correspondance est activée (focus + click sur les boutons/liens, ou .show()/.open()/.click() si exposé)."
    },
    {
     "desc": "Sélecteur CSS facultatif qui doit exister dans le document pour que la liaison soit active (limite le raccourci à un état)."
    },
    {
     "desc": "Tant qu'il est présent, la liaison est inerte."
    },
    {
     "desc": "Par défaut, la combinaison est ignorée pendant la saisie dans input/textarea/select/contenteditable. Activez-le pour la laisser se déclencher à l'intérieur des champs (les combinaisons avec modificateur, comme mod+k, se déclenchent toujours)."
    },
    {
     "desc": "Lorsqu'il est défini, empêche l'action par défaut du navigateur au keydown. Activé par défaut pour les combinaisons qui comportent un modificateur."
    }
   ],
   "demoHTML": "<div style=\"font-family:system-ui;display:flex;flex-direction:column;gap:12px;max-width:420px\">\n  <p>Appuyez sur <kbd>mod+k</kbd> (⌘K sur Mac, Ctrl+K ailleurs) ou cliquez sur le bouton pour ouvrir la recherche.</p>\n  <button id=\"abrir-busca\">Ouvrir la recherche</button>\n  <dialog id=\"busca\" style=\"border:1px solid #ccc;border-radius:8px;padding:16px\">\n    <p>Recherche ouverte par le raccourci.</p>\n    <form method=\"dialog\"><button>Fermer</button></form>\n  </dialog>\n\n  <pura-hotkey keys=\"mod+k\" target=\"#abrir-busca\"></pura-hotkey>\n</div>\n\n<script type=\"module\">\n  import \"/pura/lib/hotkey.js\";\n  const btn = document.getElementById(\"abrir-busca\");\n  const dlg = document.getElementById(\"busca\");\n  btn.addEventListener(\"click\", () => dlg.showModal());\n</script>"
  },
  "de": {
   "description": "<pura-hotkey> registriert ein globales Tastaturkürzel am Dokument und löst das `trigger`-Event aus, wenn die Kombination gedrückt wird, und kann ein Zielelement per CSS-Selektor aktivieren, ohne dass Skript geschrieben werden muss. Verwenden Sie es, wenn Sie Kürzel (mod+k, Ctrl+Shift+P usw.) benötigen, die Dialoge öffnen, Schaltflächen auslösen oder ein beliebiges Steuerelement deklarativ ansteuern. Da es agent-native ist, spiegelt es data-* auf dem Host (data-pura-hotkey, data-keys, data-combo, data-target), stellt aria-keyshortcuts bereit und registriert sich in window.__puraHotkeys mit .list(), .find(keys) und .trigger(keys), sodass Agenten alle Kürzel der Seite aufzählen und auslösen können, ohne das Shadow DOM anzufassen.",
   "attributes": [
    {
     "desc": "Die zu bindende Kombination, z. B. \"mod+k\", \"Ctrl Shift P\", \"⌘ /\". `mod` wird auf Apple zu ⌘ und sonst zu Ctrl. Leer/fehlend => keine Bindung."
    },
    {
     "desc": "Optionaler CSS-Selektor; beim Auslösen wird der erste Treffer aktiviert (focus + click bei Schaltflächen/Links oder .show()/.open()/.click(), falls bereitgestellt)."
    },
    {
     "desc": "Optionaler CSS-Selektor, der im Dokument vorhanden sein muss, damit die Bindung aktiv ist (begrenzt das Kürzel auf einen Zustand)."
    },
    {
     "desc": "Solange vorhanden, ist die Bindung inaktiv."
    },
    {
     "desc": "Standardmäßig wird die Kombination beim Tippen in input/textarea/select/contenteditable ignoriert. Aktivieren Sie es, damit sie auch innerhalb von Feldern auslöst (Modifikator-Kombinationen wie mod+k lösen immer aus)."
    },
    {
     "desc": "Wenn gesetzt, verhindert es die Standardaktion des Browsers beim keydown. Standardmäßig aktiviert für Kombinationen, die einen Modifikator haben."
    }
   ],
   "demoHTML": "<div style=\"font-family:system-ui;display:flex;flex-direction:column;gap:12px;max-width:420px\">\n  <p>Drücken Sie <kbd>mod+k</kbd> (⌘K auf dem Mac, Ctrl+K sonst) oder klicken Sie auf die Schaltfläche, um die Suche zu öffnen.</p>\n  <button id=\"abrir-busca\">Suche öffnen</button>\n  <dialog id=\"busca\" style=\"border:1px solid #ccc;border-radius:8px;padding:16px\">\n    <p>Suche über das Tastenkürzel geöffnet.</p>\n    <form method=\"dialog\"><button>Schließen</button></form>\n  </dialog>\n\n  <pura-hotkey keys=\"mod+k\" target=\"#abrir-busca\"></pura-hotkey>\n</div>\n\n<script type=\"module\">\n  import \"/pura/lib/hotkey.js\";\n  const btn = document.getElementById(\"abrir-busca\");\n  const dlg = document.getElementById(\"busca\");\n  btn.addEventListener(\"click\", () => dlg.showModal());\n</script>"
  },
  "it": {
   "description": "<pura-hotkey> registra una scorciatoia da tastiera globale sul documento e attiva l'evento `trigger` quando la combinazione viene premuta, e può attivare un elemento di destinazione tramite selettore CSS senza scrivere alcuno script. Usalo quando hai bisogno di scorciatoie (mod+k, Ctrl+Shift+P, ecc.) che aprano finestre di dialogo, attivino pulsanti o pilotino qualsiasi controllo in modo dichiarativo. Essendo agent-native, riflette data-* sull'host (data-pura-hotkey, data-keys, data-combo, data-target), espone aria-keyshortcuts e si registra in window.__puraHotkeys con .list(), .find(keys) e .trigger(keys), consentendo agli agenti di enumerare e attivare tutte le scorciatoie della pagina senza toccare lo shadow DOM.",
   "attributes": [
    {
     "desc": "La combinazione da associare, ad esempio \"mod+k\", \"Ctrl Shift P\", \"⌘ /\". `mod` diventa ⌘ su Apple e Ctrl altrove. Vuoto/assente => nessuna associazione."
    },
    {
     "desc": "Selettore CSS facoltativo; all'attivazione, la prima corrispondenza viene attivata (focus + click su pulsanti/link, oppure .show()/.open()/.click() se esposto)."
    },
    {
     "desc": "Selettore CSS facoltativo che deve esistere nel documento affinché l'associazione sia attiva (limita la scorciatoia a uno stato)."
    },
    {
     "desc": "Mentre è presente, l'associazione è inerte."
    },
    {
     "desc": "Per impostazione predefinita la combinazione viene ignorata durante la digitazione in input/textarea/select/contenteditable. Attivalo per lasciarla scattare all'interno dei campi (le combinazioni con modificatore, come mod+k, scattano sempre)."
    },
    {
     "desc": "Quando impostato, impedisce l'azione predefinita del browser al keydown. Attivo per impostazione predefinita per le combinazioni che hanno un modificatore."
    }
   ],
   "demoHTML": "<div style=\"font-family:system-ui;display:flex;flex-direction:column;gap:12px;max-width:420px\">\n  <p>Premi <kbd>mod+k</kbd> (⌘K su Mac, Ctrl+K altrove) o fai clic sul pulsante per aprire la ricerca.</p>\n  <button id=\"abrir-busca\">Apri ricerca</button>\n  <dialog id=\"busca\" style=\"border:1px solid #ccc;border-radius:8px;padding:16px\">\n    <p>Ricerca aperta dalla scorciatoia.</p>\n    <form method=\"dialog\"><button>Chiudi</button></form>\n  </dialog>\n\n  <pura-hotkey keys=\"mod+k\" target=\"#abrir-busca\"></pura-hotkey>\n</div>\n\n<script type=\"module\">\n  import \"/pura/lib/hotkey.js\";\n  const btn = document.getElementById(\"abrir-busca\");\n  const dlg = document.getElementById(\"busca\");\n  btn.addEventListener(\"click\", () => dlg.showModal());\n</script>"
  }
 },
 "idle": {
  "pt-BR": {
   "description": "`<pura-idle>` é um wrapper não visual (display: contents) que monitora eventos de entrada e dispara a transição para idle quando o tempo de inatividade expira, útil para autossalvamento, autobloqueio e avisos do tipo \"você ainda está aí?\". Por ser agent-native, ele expõe uma camada legível por máquina: atributos `data-*` no host light, o role ARIA `status`/`aria-live` e um registro global `window.__puraIdle` (com `.anyActive()` / `.allIdle()`) que permite aos agentes inspecionar a presença humana em toda a página sem tocar no shadow DOM. Use quando precisar reagir à ausência do usuário ou sinalizar presença de forma programática.",
   "attributes": [
    {
     "desc": "Janela de inatividade em ms antes de entrar em idle. Valores não numéricos ou negativos voltam ao padrão."
    },
    {
     "desc": "Lista, separada por espaços, de eventos de entrada a observar. Um atributo vazio mantém os padrões."
    },
    {
     "desc": "Onde escutar: \"document\" | \"window\" | \"self\" (apenas o host, atividade restrita)."
    },
    {
     "desc": "Quando presente, suspende o temporizador (sempre reportado como active, sem transições) até ser removido."
    }
   ],
   "demoHTML": "<div style=\"font-family: system-ui; max-width: 420px;\">\n  <pura-idle id=\"detector\" timeout=\"3000\">\n    <div id=\"painel\" style=\"padding: 16px; border: 1px solid #ddd; border-radius: 8px;\">\n      <p>Estado: <strong id=\"estado\">ativo</strong></p>\n      <p style=\"color:#666; font-size:13px;\">Pare de mexer no mouse e no teclado por 3 segundos para ver o estado mudar para \"ocioso\".</p>\n      <button id=\"ping\" type=\"button\">Estou aqui (reiniciar)</button>\n    </div>\n  </pura-idle>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/idle.js\";\n  const det = document.getElementById(\"detector\");\n  const estado = document.getElementById(\"estado\");\n  const painel = document.getElementById(\"painel\");\n  det.addEventListener(\"pura-idle:change\", (e) => {\n    const ocioso = e.detail.idle;\n    estado.textContent = ocioso ? \"ocioso\" : \"ativo\";\n    painel.style.opacity = ocioso ? \"0.5\" : \"1\";\n  });\n  document.getElementById(\"ping\").addEventListener(\"click\", () => det.reset());\n</script>"
  },
  "fr": {
   "description": "`<pura-idle>` est un wrapper non visuel (display: contents) qui surveille les événements d'entrée et déclenche la transition vers idle lorsque le temps d'inactivité expire, utile pour l'enregistrement automatique, le verrouillage automatique et les invites du type « êtes-vous toujours là ? ». Étant agent-native, il expose une couche lisible par machine : des attributs `data-*` sur le host light, le role ARIA `status`/`aria-live` et un registre global `window.__puraIdle` (avec `.anyActive()` / `.allIdle()`) qui permet aux agents d'inspecter la présence humaine sur toute la page sans toucher au shadow DOM. Utilisez-le lorsque vous devez réagir à l'absence de l'utilisateur ou signaler une présence de manière programmatique.",
   "attributes": [
    {
     "desc": "Fenêtre d'inactivité en ms avant de passer en idle. Les valeurs non numériques ou négatives reviennent à la valeur par défaut."
    },
    {
     "desc": "Liste, séparée par des espaces, des événements d'entrée à observer. Un attribut vide conserve les valeurs par défaut."
    },
    {
     "desc": "Où écouter : \"document\" | \"window\" | \"self\" (le host uniquement, activité limitée)."
    },
    {
     "desc": "Lorsqu'il est présent, suspend le minuteur (toujours rapporté comme active, sans transitions) jusqu'à ce qu'il soit retiré."
    }
   ],
   "demoHTML": "<div style=\"font-family: system-ui; max-width: 420px;\">\n  <pura-idle id=\"detector\" timeout=\"3000\">\n    <div id=\"painel\" style=\"padding: 16px; border: 1px solid #ddd; border-radius: 8px;\">\n      <p>État : <strong id=\"estado\">actif</strong></p>\n      <p style=\"color:#666; font-size:13px;\">Arrêtez de bouger la souris et le clavier pendant 3 secondes pour voir l'état passer à « inactif ».</p>\n      <button id=\"ping\" type=\"button\">Je suis là (réinitialiser)</button>\n    </div>\n  </pura-idle>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/idle.js\";\n  const det = document.getElementById(\"detector\");\n  const estado = document.getElementById(\"estado\");\n  const painel = document.getElementById(\"painel\");\n  det.addEventListener(\"pura-idle:change\", (e) => {\n    const ocioso = e.detail.idle;\n    estado.textContent = ocioso ? \"inactif\" : \"actif\";\n    painel.style.opacity = ocioso ? \"0.5\" : \"1\";\n  });\n  document.getElementById(\"ping\").addEventListener(\"click\", () => det.reset());\n</script>"
  },
  "de": {
   "description": "`<pura-idle>` ist ein nicht-visueller Wrapper (display: contents), der Eingabeereignisse überwacht und den Übergang zu idle auslöst, wenn die Inaktivitätszeit abläuft, nützlich für automatisches Speichern, automatisches Sperren und „Sind Sie noch da?“-Hinweise. Da es agent-native ist, stellt es eine maschinenlesbare Schicht bereit: `data-*`-Attribute auf dem Light-Host, die ARIA-Rolle `status`/`aria-live` und ein globales Registry `window.__puraIdle` (mit `.anyActive()` / `.allIdle()`), das es Agenten ermöglicht, die menschliche Präsenz auf der gesamten Seite zu prüfen, ohne das Shadow DOM anzufassen. Verwenden Sie es, wenn Sie auf die Abwesenheit des Benutzers reagieren oder Präsenz programmatisch signalisieren müssen.",
   "attributes": [
    {
     "desc": "Inaktivitätsfenster in ms, bevor in idle gewechselt wird. Nicht-numerische oder negative Werte fallen auf den Standard zurück."
    },
    {
     "desc": "Durch Leerzeichen getrennte Liste der zu beobachtenden Eingabeereignisse. Ein leeres Attribut behält die Standardwerte bei."
    },
    {
     "desc": "Wo gelauscht wird: \"document\" | \"window\" | \"self\" (nur der Host, eingegrenzte Aktivität)."
    },
    {
     "desc": "Wenn vorhanden, unterbricht es den Timer (immer als active gemeldet, keine Übergänge), bis es entfernt wird."
    }
   ],
   "demoHTML": "<div style=\"font-family: system-ui; max-width: 420px;\">\n  <pura-idle id=\"detector\" timeout=\"3000\">\n    <div id=\"painel\" style=\"padding: 16px; border: 1px solid #ddd; border-radius: 8px;\">\n      <p>Status: <strong id=\"estado\">aktiv</strong></p>\n      <p style=\"color:#666; font-size:13px;\">Bewegen Sie 3 Sekunden lang weder Maus noch Tastatur, um zu sehen, wie der Status auf \"inaktiv\" wechselt.</p>\n      <button id=\"ping\" type=\"button\">Ich bin hier (zurücksetzen)</button>\n    </div>\n  </pura-idle>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/idle.js\";\n  const det = document.getElementById(\"detector\");\n  const estado = document.getElementById(\"estado\");\n  const painel = document.getElementById(\"painel\");\n  det.addEventListener(\"pura-idle:change\", (e) => {\n    const ocioso = e.detail.idle;\n    estado.textContent = ocioso ? \"inaktiv\" : \"aktiv\";\n    painel.style.opacity = ocioso ? \"0.5\" : \"1\";\n  });\n  document.getElementById(\"ping\").addEventListener(\"click\", () => det.reset());\n</script>"
  },
  "it": {
   "description": "`<pura-idle>` è un wrapper non visivo (display: contents) che monitora gli eventi di input e attiva la transizione a idle quando scade il tempo di inattività, utile per il salvataggio automatico, il blocco automatico e gli avvisi del tipo \"sei ancora lì?\". Essendo agent-native, espone uno strato leggibile dalla macchina: attributi `data-*` sull'host light, il role ARIA `status`/`aria-live` e un registro globale `window.__puraIdle` (con `.anyActive()` / `.allIdle()`) che consente agli agenti di ispezionare la presenza umana sull'intera pagina senza toccare lo shadow DOM. Usalo quando devi reagire all'assenza dell'utente o segnalare la presenza in modo programmatico.",
   "attributes": [
    {
     "desc": "Finestra di inattività in ms prima di passare a idle. I valori non numerici o negativi tornano al valore predefinito."
    },
    {
     "desc": "Elenco, separato da spazi, di eventi di input da osservare. Un attributo vuoto mantiene i valori predefiniti."
    },
    {
     "desc": "Dove ascoltare: \"document\" | \"window\" | \"self\" (solo l'host, attività circoscritta)."
    },
    {
     "desc": "Quando presente, sospende il timer (sempre riportato come active, senza transizioni) finché non viene rimosso."
    }
   ],
   "demoHTML": "<div style=\"font-family: system-ui; max-width: 420px;\">\n  <pura-idle id=\"detector\" timeout=\"3000\">\n    <div id=\"painel\" style=\"padding: 16px; border: 1px solid #ddd; border-radius: 8px;\">\n      <p>Stato: <strong id=\"estado\">attivo</strong></p>\n      <p style=\"color:#666; font-size:13px;\">Smetti di muovere mouse e tastiera per 3 secondi per vedere lo stato passare a \"inattivo\".</p>\n      <button id=\"ping\" type=\"button\">Sono qui (reimposta)</button>\n    </div>\n  </pura-idle>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/idle.js\";\n  const det = document.getElementById(\"detector\");\n  const estado = document.getElementById(\"estado\");\n  const painel = document.getElementById(\"painel\");\n  det.addEventListener(\"pura-idle:change\", (e) => {\n    const ocioso = e.detail.idle;\n    estado.textContent = ocioso ? \"inattivo\" : \"attivo\";\n    painel.style.opacity = ocioso ? \"0.5\" : \"1\";\n  });\n  document.getElementById(\"ping\").addEventListener(\"click\", () => det.reset());\n</script>"
  }
 },
 "intent": {
  "pt-BR": {
   "description": "`<pura-intent>` é um componente agent-native, não visual: ele renderiza `display: contents` (seus filhos fluem como se o wrapper não existisse) e não adiciona estilização própria. Seu valor está na camada semântica que reflete no host em light DOM (`role=\"region\"`, `aria-label`, `data-intent` e `data-intent-actions`) e em um registro global `window.__puraIntents`, permitindo que agentes descubram \"para que serve esta área\" e \"o que pode ser feito aqui\" varrendo o DOM. Use para anotar seções da interface com objetivos e ações declarados (via JSON) que IAs e tecnologias assistivas possam enumerar.",
   "attributes": [
    {
     "desc": "Propósito da região, legível por humanos/agentes. Refletido em aria-label e data-intent no host. Vazio remove o aria-label e deixa data-intent vazio."
    },
    {
     "desc": "Array JSON de subações que um agente pode realizar na região, por exemplo: [{\"name\":\"submit\",\"label\":\"Place order\"}]. JSON malformado degrada para [] sem lançar erro."
    }
   ],
   "demoHTML": "<div style=\"font-family:system-ui;max-width:420px\">\n  <pura-intent id=\"regiao-checkout\" goal=\"Concluir o checkout do carrinho\" actions='[{\"name\":\"submit\",\"label\":\"Confirmar pedido\"},{\"name\":\"cancel\",\"label\":\"Cancelar\"}]'>\n    <section style=\"border:1px solid #ddd;border-radius:12px;padding:16px\">\n      <h3 style=\"margin:0 0 8px\">Resumo do pedido</h3>\n      <p style=\"margin:0 0 12px;color:#555\">Total: R$ 149,90</p>\n      <button style=\"padding:8px 16px;border-radius:8px;border:0;background:#111;color:#fff\">Confirmar pedido</button>\n    </section>\n  </pura-intent>\n\n  <button id=\"inspecionar\" style=\"margin-top:12px;padding:8px 14px;border-radius:8px;border:1px solid #ccc;background:#fff;cursor:pointer\">Inspecionar intenções (como um agente faria)</button>\n  <pre id=\"saida\" style=\"margin-top:10px;background:#0d1117;color:#9ece6a;padding:12px;border-radius:8px;font-size:12px;white-space:pre-wrap\"></pre>\n</div>\n\n<script type=\"module\">\n  import \"/pura/lib/intent.js\";\n  const out = document.getElementById(\"saida\");\n  document.getElementById(\"inspecionar\").addEventListener(\"click\", () => {\n    const regioes = document.querySelectorAll('[data-intent]');\n    const dados = [...regioes].map((el) => ({\n      goal: el.getAttribute(\"data-intent\"),\n      role: el.getAttribute(\"role\"),\n      acoes: Number(el.getAttribute(\"data-intent-actions\") || 0),\n    }));\n    out.textContent = JSON.stringify(dados, null, 2);\n  });\n</script>"
  },
  "fr": {
   "description": "`<pura-intent>` est un composant agent-native, non visuel : il rend `display: contents` (ses enfants s'écoulent comme si le wrapper n'existait pas) et n'ajoute aucun style propre. Sa valeur réside dans la couche sémantique qu'il reflète sur le host en light DOM (`role=\"region\"`, `aria-label`, `data-intent` et `data-intent-actions`) et dans un registre global `window.__puraIntents`, permettant aux agents de découvrir « à quoi sert cette zone » et « ce qui peut y être fait » en parcourant le DOM. Utilisez-le pour annoter des sections de l'interface avec des objectifs et des actions déclarés (via JSON) que les IA et les technologies d'assistance peuvent énumérer.",
   "attributes": [
    {
     "desc": "But de la région, lisible par les humains/agents. Reflété dans aria-label et data-intent sur le host. Vide retire l'aria-label et laisse data-intent vide."
    },
    {
     "desc": "Tableau JSON de sous-actions qu'un agent peut effectuer sur la région, par exemple : [{\"name\":\"submit\",\"label\":\"Place order\"}]. Un JSON mal formé dégrade vers [] sans lever d'erreur."
    }
   ],
   "demoHTML": "<div style=\"font-family:system-ui;max-width:420px\">\n  <pura-intent id=\"regiao-checkout\" goal=\"Finaliser la commande du panier\" actions='[{\"name\":\"submit\",\"label\":\"Confirmer la commande\"},{\"name\":\"cancel\",\"label\":\"Annuler\"}]'>\n    <section style=\"border:1px solid #ddd;border-radius:12px;padding:16px\">\n      <h3 style=\"margin:0 0 8px\">Récapitulatif de la commande</h3>\n      <p style=\"margin:0 0 12px;color:#555\">Total : 149,90 €</p>\n      <button style=\"padding:8px 16px;border-radius:8px;border:0;background:#111;color:#fff\">Confirmer la commande</button>\n    </section>\n  </pura-intent>\n\n  <button id=\"inspecionar\" style=\"margin-top:12px;padding:8px 14px;border-radius:8px;border:1px solid #ccc;background:#fff;cursor:pointer\">Inspecter les intentions (comme le ferait un agent)</button>\n  <pre id=\"saida\" style=\"margin-top:10px;background:#0d1117;color:#9ece6a;padding:12px;border-radius:8px;font-size:12px;white-space:pre-wrap\"></pre>\n</div>\n\n<script type=\"module\">\n  import \"/pura/lib/intent.js\";\n  const out = document.getElementById(\"saida\");\n  document.getElementById(\"inspecionar\").addEventListener(\"click\", () => {\n    const regioes = document.querySelectorAll('[data-intent]');\n    const dados = [...regioes].map((el) => ({\n      goal: el.getAttribute(\"data-intent\"),\n      role: el.getAttribute(\"role\"),\n      acoes: Number(el.getAttribute(\"data-intent-actions\") || 0),\n    }));\n    out.textContent = JSON.stringify(dados, null, 2);\n  });\n</script>"
  },
  "de": {
   "description": "`<pura-intent>` ist eine agent-native, nicht-visuelle Komponente: Sie rendert `display: contents` (ihre Kinder fließen, als gäbe es den Wrapper nicht) und fügt kein eigenes Styling hinzu. Ihr Wert liegt in der semantischen Schicht, die sie auf dem Host im Light DOM spiegelt (`role=\"region\"`, `aria-label`, `data-intent` und `data-intent-actions`), und in einem globalen Registry `window.__puraIntents`, das es Agenten ermöglicht, durch Scannen des DOM herauszufinden, „wofür dieser Bereich da ist“ und „was hier getan werden kann“. Verwenden Sie es, um UI-Abschnitte mit deklarierten Zielen und Aktionen (per JSON) zu annotieren, die KIs und assistive Technologien aufzählen können.",
   "attributes": [
    {
     "desc": "Für Menschen/Agenten lesbarer Zweck des Bereichs. Wird in aria-label und data-intent auf dem Host gespiegelt. Leer entfernt das aria-label und lässt data-intent leer."
    },
    {
     "desc": "JSON-Array von Unteraktionen, die ein Agent im Bereich ausführen kann, z. B.: [{\"name\":\"submit\",\"label\":\"Place order\"}]. Fehlerhaftes JSON degradiert zu [], ohne einen Fehler auszulösen."
    }
   ],
   "demoHTML": "<div style=\"font-family:system-ui;max-width:420px\">\n  <pura-intent id=\"regiao-checkout\" goal=\"Den Warenkorb-Checkout abschließen\" actions='[{\"name\":\"submit\",\"label\":\"Bestellung bestätigen\"},{\"name\":\"cancel\",\"label\":\"Abbrechen\"}]'>\n    <section style=\"border:1px solid #ddd;border-radius:12px;padding:16px\">\n      <h3 style=\"margin:0 0 8px\">Bestellübersicht</h3>\n      <p style=\"margin:0 0 12px;color:#555\">Gesamt: 149,90 €</p>\n      <button style=\"padding:8px 16px;border-radius:8px;border:0;background:#111;color:#fff\">Bestellung bestätigen</button>\n    </section>\n  </pura-intent>\n\n  <button id=\"inspecionar\" style=\"margin-top:12px;padding:8px 14px;border-radius:8px;border:1px solid #ccc;background:#fff;cursor:pointer\">Intentionen inspizieren (wie es ein Agent tun würde)</button>\n  <pre id=\"saida\" style=\"margin-top:10px;background:#0d1117;color:#9ece6a;padding:12px;border-radius:8px;font-size:12px;white-space:pre-wrap\"></pre>\n</div>\n\n<script type=\"module\">\n  import \"/pura/lib/intent.js\";\n  const out = document.getElementById(\"saida\");\n  document.getElementById(\"inspecionar\").addEventListener(\"click\", () => {\n    const regioes = document.querySelectorAll('[data-intent]');\n    const dados = [...regioes].map((el) => ({\n      goal: el.getAttribute(\"data-intent\"),\n      role: el.getAttribute(\"role\"),\n      acoes: Number(el.getAttribute(\"data-intent-actions\") || 0),\n    }));\n    out.textContent = JSON.stringify(dados, null, 2);\n  });\n</script>"
  },
  "it": {
   "description": "`<pura-intent>` è un componente agent-native, non visivo: rende `display: contents` (i suoi figli scorrono come se il wrapper non esistesse) e non aggiunge alcuno stile proprio. Il suo valore risiede nello strato semantico che riflette sull'host nel light DOM (`role=\"region\"`, `aria-label`, `data-intent` e `data-intent-actions`) e in un registro globale `window.__puraIntents`, consentendo agli agenti di scoprire \"a cosa serve quest'area\" e \"cosa si può fare qui\" scansionando il DOM. Usalo per annotare sezioni dell'interfaccia con obiettivi e azioni dichiarati (tramite JSON) che IA e tecnologie assistive possano enumerare.",
   "attributes": [
    {
     "desc": "Scopo della regione, leggibile da umani/agenti. Riflesso in aria-label e data-intent sull'host. Vuoto rimuove l'aria-label e lascia data-intent vuoto."
    },
    {
     "desc": "Array JSON di sottoazioni che un agente può eseguire sulla regione, ad esempio: [{\"name\":\"submit\",\"label\":\"Place order\"}]. JSON malformato degrada a [] senza generare errori."
    }
   ],
   "demoHTML": "<div style=\"font-family:system-ui;max-width:420px\">\n  <pura-intent id=\"regiao-checkout\" goal=\"Completare il checkout del carrello\" actions='[{\"name\":\"submit\",\"label\":\"Conferma ordine\"},{\"name\":\"cancel\",\"label\":\"Annulla\"}]'>\n    <section style=\"border:1px solid #ddd;border-radius:12px;padding:16px\">\n      <h3 style=\"margin:0 0 8px\">Riepilogo dell'ordine</h3>\n      <p style=\"margin:0 0 12px;color:#555\">Totale: 149,90 €</p>\n      <button style=\"padding:8px 16px;border-radius:8px;border:0;background:#111;color:#fff\">Conferma ordine</button>\n    </section>\n  </pura-intent>\n\n  <button id=\"inspecionar\" style=\"margin-top:12px;padding:8px 14px;border-radius:8px;border:1px solid #ccc;background:#fff;cursor:pointer\">Ispeziona le intenzioni (come farebbe un agente)</button>\n  <pre id=\"saida\" style=\"margin-top:10px;background:#0d1117;color:#9ece6a;padding:12px;border-radius:8px;font-size:12px;white-space:pre-wrap\"></pre>\n</div>\n\n<script type=\"module\">\n  import \"/pura/lib/intent.js\";\n  const out = document.getElementById(\"saida\");\n  document.getElementById(\"inspecionar\").addEventListener(\"click\", () => {\n    const regioes = document.querySelectorAll('[data-intent]');\n    const dados = [...regioes].map((el) => ({\n      goal: el.getAttribute(\"data-intent\"),\n      role: el.getAttribute(\"role\"),\n      acoes: Number(el.getAttribute(\"data-intent-actions\") || 0),\n    }));\n    out.textContent = JSON.stringify(dados, null, 2);\n  });\n</script>"
  }
 },
 "live-region": {
  "pt-BR": {
   "description": "`pura-live-region` é um anunciador live ARIA gerenciado, oculto por padrão (sr-only), que entrega mensagens de status fora de banda usando a técnica de limpar e reescrever, para que cada chamada seja de fato captada pela tecnologia assistiva. Use para feedback dinâmico (salvando, erros, progresso) sem prender o foco. A camada legível por máquina é a peça central: reflete role=status, aria-live e atributos data-* estáveis no host em light DOM, e mantém um registro global `window.__puraLiveRegions` (com histórico e helpers `query(id)`/`latest()`), permitindo que agentes leiam o anúncio mais recente de cada região sem um leitor de tela.",
   "attributes": [
    {
     "desc": "Nível de polidez do anúncio, refletido em aria-live. Qualquer valor inválido volta para polite."
    },
    {
     "desc": "Escape hatch opcional: renderiza o texto anunciado de forma visível (útil para autoria/depuração). Por padrão a região é sr-only."
    },
    {
     "desc": "aria-label opcional aplicado ao host da região."
    }
   ],
   "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:12px;align-items:flex-start\">\n  <button id=\"btn-salvar\">Salvar alterações</button>\n  <pura-live-region id=\"status\" live=\"polite\" visible label=\"Status do formulário\">Pronto para salvar.</pura-live-region>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/live-region.js\";\n  const regiao = document.getElementById(\"status\");\n  let n = 0;\n  document.getElementById(\"btn-salvar\").addEventListener(\"click\", () => {\n    n++;\n    regiao.announce(`Alterações salvas com sucesso (${n}).`);\n  });\n</script>"
  },
  "fr": {
   "description": "`pura-live-region` est un annonceur live ARIA géré, masqué par défaut (sr-only), qui délivre des messages d'état hors bande en utilisant la technique d'effacement-réécriture, afin que chaque appel soit effectivement capté par la technologie d'assistance. Utilisez-le pour du feedback dynamique (enregistrement, erreurs, progression) sans piéger le focus. La couche lisible par machine en est la pièce maîtresse : elle reflète role=status, aria-live et des attributs data-* stables sur le host en light DOM, et maintient un registre global `window.__puraLiveRegions` (avec historique et helpers `query(id)`/`latest()`), permettant aux agents de lire la dernière annonce de chaque région sans lecteur d'écran.",
   "attributes": [
    {
     "desc": "Niveau de politesse de l'annonce, reflété dans aria-live. Toute valeur invalide revient à polite."
    },
    {
     "desc": "Échappatoire optionnelle : rend le texte annoncé de manière visible (utile pour la création/le débogage). Par défaut la région est sr-only."
    },
    {
     "desc": "aria-label facultatif appliqué au host de la région."
    }
   ],
   "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:12px;align-items:flex-start\">\n  <button id=\"btn-salvar\">Enregistrer les modifications</button>\n  <pura-live-region id=\"status\" live=\"polite\" visible label=\"État du formulaire\">Prêt à enregistrer.</pura-live-region>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/live-region.js\";\n  const regiao = document.getElementById(\"status\");\n  let n = 0;\n  document.getElementById(\"btn-salvar\").addEventListener(\"click\", () => {\n    n++;\n    regiao.announce(`Modifications enregistrées avec succès (${n}).`);\n  });\n</script>"
  },
  "de": {
   "description": "`pura-live-region` ist ein verwalteter ARIA-Live-Ankündiger, standardmäßig verborgen (sr-only), der Out-of-Band-Statusmeldungen mit der Lösch-und-Neuschreib-Technik liefert, sodass jeder Aufruf tatsächlich von der assistiven Technologie erfasst wird. Verwenden Sie ihn für dynamisches Feedback (Speichern, Fehler, Fortschritt), ohne den Fokus zu binden. Die maschinenlesbare Schicht ist das Herzstück: Sie spiegelt role=status, aria-live und stabile data-*-Attribute auf dem Host im Light DOM und führt ein globales Registry `window.__puraLiveRegions` (mit Verlauf und den Helfern `query(id)`/`latest()`), sodass Agenten die jüngste Ankündigung jeder Region ohne Screenreader lesen können.",
   "attributes": [
    {
     "desc": "Höflichkeitsstufe der Ankündigung, gespiegelt in aria-live. Jeder ungültige Wert fällt auf polite zurück."
    },
    {
     "desc": "Optionaler Escape-Hatch: rendert den angekündigten Text sichtbar (nützlich für Authoring/Debugging). Standardmäßig ist die Region sr-only."
    },
    {
     "desc": "Optionales aria-label, das auf den Host der Region angewendet wird."
    }
   ],
   "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:12px;align-items:flex-start\">\n  <button id=\"btn-salvar\">Änderungen speichern</button>\n  <pura-live-region id=\"status\" live=\"polite\" visible label=\"Formularstatus\">Bereit zum Speichern.</pura-live-region>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/live-region.js\";\n  const regiao = document.getElementById(\"status\");\n  let n = 0;\n  document.getElementById(\"btn-salvar\").addEventListener(\"click\", () => {\n    n++;\n    regiao.announce(`Änderungen erfolgreich gespeichert (${n}).`);\n  });\n</script>"
  },
  "it": {
   "description": "`pura-live-region` è un annunciatore live ARIA gestito, nascosto per impostazione predefinita (sr-only), che recapita messaggi di stato fuori banda usando la tecnica di cancella-e-riscrivi, in modo che ogni chiamata venga effettivamente captata dalla tecnologia assistiva. Usalo per feedback dinamico (salvataggio, errori, avanzamento) senza intrappolare il focus. Lo strato leggibile dalla macchina è l'elemento centrale: riflette role=status, aria-live e attributi data-* stabili sull'host nel light DOM, e mantiene un registro globale `window.__puraLiveRegions` (con cronologia e helper `query(id)`/`latest()`), consentendo agli agenti di leggere l'annuncio più recente di ogni regione senza uno screen reader.",
   "attributes": [
    {
     "desc": "Livello di cortesia dell'annuncio, riflesso in aria-live. Qualsiasi valore non valido torna a polite."
    },
    {
     "desc": "Via di fuga opzionale: rende il testo annunciato in modo visibile (utile per authoring/debug). Per impostazione predefinita la regione è sr-only."
    },
    {
     "desc": "aria-label facoltativo applicato all'host della regione."
    }
   ],
   "demoHTML": "<div style=\"display:flex;flex-direction:column;gap:12px;align-items:flex-start\">\n  <button id=\"btn-salvar\">Salva modifiche</button>\n  <pura-live-region id=\"status\" live=\"polite\" visible label=\"Stato del modulo\">Pronto per salvare.</pura-live-region>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/live-region.js\";\n  const regiao = document.getElementById(\"status\");\n  let n = 0;\n  document.getElementById(\"btn-salvar\").addEventListener(\"click\", () => {\n    n++;\n    regiao.announce(`Modifiche salvate con successo (${n}).`);\n  });\n</script>"
  }
 },
 "optimistic": {
  "pt-BR": {
   "description": "pura-optimistic troca imediatamente o conteúdo original pelo resultado otimista quando ativado, emite commit e entra no estado \"pending\"; o chamador confirma o sucesso com confirm()/o evento success ou reverte com rollback()/o evento fail, anunciando a reversão em uma região aria-live. Use quando quiser feedback instantâneo em uma ação que pode falhar (curtir, salvar, enviar) sem congelar a interface. Por ser agent-native, ele reflete o ciclo de vida em atributos data-* estáveis (data-state, data-pending) e mantém um Map global window.__puraOptimistic com query(state) e handles activate/confirm/rollback/reset, permitindo que um agente descubra e comande todas as ações otimistas da página.",
   "attributes": [
    {
     "desc": "Texto do botão acionador embutido, usado quando nenhum acionador é fornecido via slot."
    },
    {
     "desc": "Estado do ciclo de vida: idle | pending | committed | failed. O autor pode definir o estado inicial, mas o componente passa a controlá-lo."
    },
    {
     "desc": "Quando presente, bloqueia a ativação."
    },
    {
     "desc": "Texto anunciado na região aria-live no rollback, quando nenhuma razão explícita é passada para rollback()."
    },
    {
     "desc": "Modo demo/sem backend: na ativação, autoconfirma no próximo frame sem precisar do chamador."
    }
   ],
   "demoHTML": "<pura-optimistic id=\"curtir\" label=\"Curtir\" auto>\n  <span slot=\"optimistic\">❤️ Curtido!</span>\n  <span>🤍 Curtir esta foto</span>\n</pura-optimistic>"
  },
  "fr": {
   "description": "pura-optimistic remplace immédiatement le contenu original par le résultat optimiste lorsqu'il est activé, émet commit et entre dans l'état « pending » ; l'appelant confirme le succès avec confirm()/l'événement success ou revient en arrière avec rollback()/l'événement fail, annonçant le retour en arrière dans une région aria-live. Utilisez-le lorsque vous voulez un feedback instantané sur une action susceptible d'échouer (j'aime, enregistrer, envoyer) sans figer l'interface. Étant agent-native, il reflète le cycle de vie dans des attributs data-* stables (data-state, data-pending) et maintient une Map globale window.__puraOptimistic avec query(state) et des handles activate/confirm/rollback/reset, permettant à un agent de découvrir et de piloter toutes les actions optimistes de la page.",
   "attributes": [
    {
     "desc": "Texte du bouton déclencheur intégré, utilisé lorsqu'aucun déclencheur n'est fourni via slot."
    },
    {
     "desc": "État du cycle de vie : idle | pending | committed | failed. L'auteur peut définir l'état initial, mais le composant le contrôle ensuite."
    },
    {
     "desc": "Lorsqu'il est présent, bloque l'activation."
    },
    {
     "desc": "Texte annoncé dans la région aria-live lors du rollback, lorsqu'aucune raison explicite n'est passée à rollback()."
    },
    {
     "desc": "Mode démo/sans backend : à l'activation, il se confirme automatiquement à la frame suivante sans avoir besoin de l'appelant."
    }
   ],
   "demoHTML": "<pura-optimistic id=\"curtir\" label=\"J'aime\" auto>\n  <span slot=\"optimistic\">❤️ Aimé !</span>\n  <span>🤍 Aimer cette photo</span>\n</pura-optimistic>"
  },
  "de": {
   "description": "pura-optimistic tauscht beim Aktivieren sofort den ursprünglichen Inhalt gegen das optimistische Ergebnis aus, gibt commit aus und tritt in den Zustand „pending“ ein; der Aufrufer bestätigt den Erfolg mit confirm()/dem success-Event oder macht ihn mit rollback()/dem fail-Event rückgängig und kündigt die Rücknahme in einer aria-live-Region an. Verwenden Sie es, wenn Sie sofortiges Feedback bei einer Aktion wünschen, die fehlschlagen kann (liken, speichern, senden), ohne die Oberfläche einzufrieren. Da es agent-native ist, spiegelt es den Lebenszyklus in stabilen data-*-Attributen (data-state, data-pending) und führt eine globale Map window.__puraOptimistic mit query(state) und den Handles activate/confirm/rollback/reset, sodass ein Agent jede optimistische Aktion auf der Seite entdecken und steuern kann.",
   "attributes": [
    {
     "desc": "Text der integrierten Auslöseschaltfläche, verwendet, wenn kein Auslöser per Slot bereitgestellt wird."
    },
    {
     "desc": "Lebenszyklus-Zustand: idle | pending | committed | failed. Der Autor kann den Anfangszustand festlegen, danach steuert ihn jedoch die Komponente."
    },
    {
     "desc": "Wenn vorhanden, blockiert es die Aktivierung."
    },
    {
     "desc": "Text, der beim Rollback in der aria-live-Region angekündigt wird, wenn an rollback() kein expliziter Grund übergeben wird."
    },
    {
     "desc": "Demo-/Kein-Backend-Modus: Bei der Aktivierung bestätigt es sich im nächsten Frame automatisch, ohne den Aufrufer zu benötigen."
    }
   ],
   "demoHTML": "<pura-optimistic id=\"curtir\" label=\"Gefällt mir\" auto>\n  <span slot=\"optimistic\">❤️ Gefällt mir!</span>\n  <span>🤍 Dieses Foto liken</span>\n</pura-optimistic>"
  },
  "it": {
   "description": "pura-optimistic sostituisce immediatamente il contenuto originale con il risultato ottimistico quando attivato, emette commit ed entra nello stato \"pending\"; il chiamante conferma il successo con confirm()/l'evento success oppure annulla con rollback()/l'evento fail, annunciando l'annullamento in una regione aria-live. Usalo quando vuoi un feedback istantaneo su un'azione che potrebbe fallire (mi piace, salvare, inviare) senza congelare l'interfaccia. Essendo agent-native, riflette il ciclo di vita in attributi data-* stabili (data-state, data-pending) e mantiene una Map globale window.__puraOptimistic con query(state) e handle activate/confirm/rollback/reset, consentendo a un agente di scoprire e pilotare tutte le azioni ottimistiche della pagina.",
   "attributes": [
    {
     "desc": "Testo del pulsante attivatore integrato, usato quando nessun attivatore viene fornito tramite slot."
    },
    {
     "desc": "Stato del ciclo di vita: idle | pending | committed | failed. L'autore può impostare lo stato iniziale, ma poi è il componente a controllarlo."
    },
    {
     "desc": "Quando presente, blocca l'attivazione."
    },
    {
     "desc": "Testo annunciato nella regione aria-live al rollback, quando nessun motivo esplicito viene passato a rollback()."
    },
    {
     "desc": "Modalità demo/senza backend: all'attivazione, si autoconferma al frame successivo senza bisogno del chiamante."
    }
   ],
   "demoHTML": "<pura-optimistic id=\"curtir\" label=\"Mi piace\" auto>\n  <span slot=\"optimistic\">❤️ Piaciuto!</span>\n  <span>🤍 Metti mi piace a questa foto</span>\n</pura-optimistic>"
  }
 },
 "portal": {
  "pt-BR": {
   "description": "`pura-portal` é um teletransportador headless (sem aparência própria, `display: contents`) que move fisicamente os nós filhos para um elemento de montagem anexado ao alvo, escapando do recorte (overflow), transform, filter ou do contexto de empilhamento z-index de algum ancestral. Use quando uma sobreposição ou menu precisar ser renderizado fora do recorte do container pai sem perder o vínculo lógico com sua origem. Ele expõe uma camada legível por máquina: atributos data-* estáveis no host (data-portal-id, data-to, data-active), um elemento de montagem marcado com data-pura-portal-mount e data-portal-owner, e um registro global `window.__puraPortals` (um Map com helpers query() e forTarget()), para que agentes possam rastrear o conteúdo teletransportado de volta ao seu dono lógico.",
   "attributes": [
    {
     "desc": "Destino do teletransporte. A palavra-chave \"body\" (padrão) aponta para document.body; qualquer outro valor é tratado como um seletor CSS resolvido via document.querySelector. Se não corresponder a nada, o conteúdo permanece no lugar (degradação graciosa)."
    },
    {
     "desc": "Quando presente, o portal NÃO teletransporta: o conteúdo permanece inline em sua posição original."
    }
   ],
   "demoHTML": "<div style=\"position:relative;overflow:hidden;height:120px;border:1px solid #d4d4d8;border-radius:8px;padding:16px;background:#fafafa\">\n  <p style=\"margin:0 0 8px\">Container com <code>overflow:hidden</code> (corta o conteúdo).</p>\n  <pura-portal id=\"demo-portal\" to=\"body\">\n    <div style=\"position:fixed;bottom:24px;right:24px;padding:12px 16px;background:#18181b;color:#fff;border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,.25)\">\n      Teletransportado para o <strong><body></strong>, escapando do corte.\n    </div>\n  </pura-portal>\n</div>\n<button id=\"demo-toggle\" type=\"button\" style=\"margin-top:12px;padding:8px 14px;border:1px solid #d4d4d8;border-radius:6px;cursor:pointer\">Alternar teletransporte</button>\n<script type=\"module\">\n  const portal = document.getElementById(\"demo-portal\");\n  document.getElementById(\"demo-toggle\").addEventListener(\"click\", () => {\n    portal.toggleAttribute(\"disabled\");\n  });\n  portal.addEventListener(\"pura-portal:mount\", (e) => console.log(\"mount\", e.detail));\n  portal.addEventListener(\"pura-portal:unmount\", (e) => console.log(\"unmount\", e.detail));\n</script>"
  },
  "fr": {
   "description": "`pura-portal` est un téléporteur headless (sans apparence propre, `display: contents`) qui déplace physiquement les nœuds enfants dans un élément de montage ajouté à la cible, échappant au rognage (overflow), à transform, à filter ou au contexte d'empilement z-index d'un ancêtre. Utilisez-le lorsqu'une superposition ou un menu doit être rendu en dehors du rognage du conteneur parent sans perdre le lien logique avec son origine. Il expose une couche lisible par machine : des attributs data-* stables sur le host (data-portal-id, data-to, data-active), un élément de montage marqué de data-pura-portal-mount et data-portal-owner, et un registre global `window.__puraPortals` (un Map avec les helpers query() et forTarget()), afin que les agents puissent remonter du contenu téléporté jusqu'à son propriétaire logique.",
   "attributes": [
    {
     "desc": "Destination de téléportation. Le mot-clé \"body\" (par défaut) pointe vers document.body ; toute autre valeur est traitée comme un sélecteur CSS résolu via document.querySelector. S'il ne correspond à rien, le contenu reste en place (dégradation gracieuse)."
    },
    {
     "desc": "Lorsqu'il est présent, le portail ne téléporte PAS : le contenu reste inline à sa position d'origine."
    }
   ],
   "demoHTML": "<div style=\"position:relative;overflow:hidden;height:120px;border:1px solid #d4d4d8;border-radius:8px;padding:16px;background:#fafafa\">\n  <p style=\"margin:0 0 8px\">Conteneur avec <code>overflow:hidden</code> (rogne le contenu).</p>\n  <pura-portal id=\"demo-portal\" to=\"body\">\n    <div style=\"position:fixed;bottom:24px;right:24px;padding:12px 16px;background:#18181b;color:#fff;border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,.25)\">\n      Téléporté vers le <strong><body></strong>, échappant au rognage.\n    </div>\n  </pura-portal>\n</div>\n<button id=\"demo-toggle\" type=\"button\" style=\"margin-top:12px;padding:8px 14px;border:1px solid #d4d4d8;border-radius:6px;cursor:pointer\">Basculer la téléportation</button>\n<script type=\"module\">\n  const portal = document.getElementById(\"demo-portal\");\n  document.getElementById(\"demo-toggle\").addEventListener(\"click\", () => {\n    portal.toggleAttribute(\"disabled\");\n  });\n  portal.addEventListener(\"pura-portal:mount\", (e) => console.log(\"mount\", e.detail));\n  portal.addEventListener(\"pura-portal:unmount\", (e) => console.log(\"unmount\", e.detail));\n</script>"
  },
  "de": {
   "description": "`pura-portal` ist ein headless Teleporter (ohne eigenes Aussehen, `display: contents`), der die untergeordneten Knoten physisch in ein an das Ziel angehängtes Mount-Element verschiebt und so dem Beschnitt (overflow), transform, filter oder dem z-index-Stapelkontext eines Vorfahren entkommt. Verwenden Sie es, wenn ein Overlay oder Menü außerhalb des Beschnitts des übergeordneten Containers gerendert werden muss, ohne die logische Verbindung zu seinem Ursprung zu verlieren. Es stellt eine maschinenlesbare Schicht bereit: stabile data-*-Attribute auf dem Host (data-portal-id, data-to, data-active), ein mit data-pura-portal-mount und data-portal-owner markiertes Mount-Element und ein globales Registry `window.__puraPortals` (eine Map mit den Helfern query() und forTarget()), sodass Agenten den teleportierten Inhalt zu seinem logischen Eigentümer zurückverfolgen können.",
   "attributes": [
    {
     "desc": "Teleport-Ziel. Das Schlüsselwort \"body\" (Standard) verweist auf document.body; jeder andere Wert wird als CSS-Selektor behandelt, der über document.querySelector aufgelöst wird. Trifft er auf nichts zu, bleibt der Inhalt an Ort und Stelle (Graceful Degradation)."
    },
    {
     "desc": "Wenn vorhanden, teleportiert das Portal NICHT: Der Inhalt bleibt inline an seiner ursprünglichen Position."
    }
   ],
   "demoHTML": "<div style=\"position:relative;overflow:hidden;height:120px;border:1px solid #d4d4d8;border-radius:8px;padding:16px;background:#fafafa\">\n  <p style=\"margin:0 0 8px\">Container mit <code>overflow:hidden</code> (beschneidet den Inhalt).</p>\n  <pura-portal id=\"demo-portal\" to=\"body\">\n    <div style=\"position:fixed;bottom:24px;right:24px;padding:12px 16px;background:#18181b;color:#fff;border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,.25)\">\n      In den <strong><body></strong> teleportiert, dem Beschnitt entkommen.\n    </div>\n  </pura-portal>\n</div>\n<button id=\"demo-toggle\" type=\"button\" style=\"margin-top:12px;padding:8px 14px;border:1px solid #d4d4d8;border-radius:6px;cursor:pointer\">Teleportierung umschalten</button>\n<script type=\"module\">\n  const portal = document.getElementById(\"demo-portal\");\n  document.getElementById(\"demo-toggle\").addEventListener(\"click\", () => {\n    portal.toggleAttribute(\"disabled\");\n  });\n  portal.addEventListener(\"pura-portal:mount\", (e) => console.log(\"mount\", e.detail));\n  portal.addEventListener(\"pura-portal:unmount\", (e) => console.log(\"unmount\", e.detail));\n</script>"
  },
  "it": {
   "description": "`pura-portal` è un teletrasportatore headless (senza aspetto proprio, `display: contents`) che sposta fisicamente i nodi figli in un elemento di montaggio aggiunto alla destinazione, sfuggendo al ritaglio (overflow), a transform, a filter o al contesto di impilamento z-index di qualche antenato. Usalo quando un overlay o un menu deve essere renderizzato fuori dal ritaglio del contenitore genitore senza perdere il legame logico con la sua origine. Espone uno strato leggibile dalla macchina: attributi data-* stabili sull'host (data-portal-id, data-to, data-active), un elemento di montaggio contrassegnato con data-pura-portal-mount e data-portal-owner, e un registro globale `window.__puraPortals` (una Map con gli helper query() e forTarget()), così che gli agenti possano risalire dal contenuto teletrasportato al suo proprietario logico.",
   "attributes": [
    {
     "desc": "Destinazione del teletrasporto. La parola chiave \"body\" (predefinita) punta a document.body; qualsiasi altro valore è trattato come un selettore CSS risolto tramite document.querySelector. Se non corrisponde a nulla, il contenuto rimane al suo posto (degradazione graziosa)."
    },
    {
     "desc": "Quando presente, il portale NON teletrasporta: il contenuto rimane inline nella sua posizione originale."
    }
   ],
   "demoHTML": "<div style=\"position:relative;overflow:hidden;height:120px;border:1px solid #d4d4d8;border-radius:8px;padding:16px;background:#fafafa\">\n  <p style=\"margin:0 0 8px\">Contenitore con <code>overflow:hidden</code> (ritaglia il contenuto).</p>\n  <pura-portal id=\"demo-portal\" to=\"body\">\n    <div style=\"position:fixed;bottom:24px;right:24px;padding:12px 16px;background:#18181b;color:#fff;border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,.25)\">\n      Teletrasportato nel <strong><body></strong>, sfuggendo al ritaglio.\n    </div>\n  </pura-portal>\n</div>\n<button id=\"demo-toggle\" type=\"button\" style=\"margin-top:12px;padding:8px 14px;border:1px solid #d4d4d8;border-radius:6px;cursor:pointer\">Attiva/disattiva teletrasporto</button>\n<script type=\"module\">\n  const portal = document.getElementById(\"demo-portal\");\n  document.getElementById(\"demo-toggle\").addEventListener(\"click\", () => {\n    portal.toggleAttribute(\"disabled\");\n  });\n  portal.addEventListener(\"pura-portal:mount\", (e) => console.log(\"mount\", e.detail));\n  portal.addEventListener(\"pura-portal:unmount\", (e) => console.log(\"unmount\", e.detail));\n</script>"
  }
 },
 "redact": {
  "pt-BR": {
   "description": "Redact é um componente agent-native que desfoca e protege conteúdo sensível no slot (segredos, tokens, salários, PII) até uma revelação explícita por clique, hover ou chamada programática. Enquanto está oculto, a árvore de acessibilidade expõe apenas um rótulo genérico (\"conteúdo oculto\"), de modo que leitores de tela e agentes nunca vazam o valor real antes que um humano o revele. A camada agent-native espelha o estado em atributos data-* estáveis no host (data-pura-redact, data-pura-id, data-state, data-reveal-on) e registra cada instância em window.__puraRedactions, permitindo que agentes auditem e controlem cada redação na página sem atravessar o Shadow DOM (o valor nunca é espelhado nesses atributos).",
   "attributes": [
    {
     "desc": "Interação que revela o conteúdo. \"none\" o torna puramente programático (revela via .reveal())."
    },
    {
     "desc": "Booleano refletido; presente enquanto o valor está visível. Defina-o no markup para começar já revelado."
    },
    {
     "desc": "Rótulo acessível anunciado enquanto o conteúdo está oculto."
    },
    {
     "desc": "Intensidade do desfoque que obscurece o conteúdo enquanto está oculto."
    },
    {
     "desc": "Quando presente, a mesma interação que revela também oculta novamente (o clique alterna)."
    },
    {
     "desc": "Não interativo; permanece oculto e não pode ser revelado pelo usuário."
    }
   ],
   "demoHTML": "<p style=\"font-family: system-ui; line-height: 2;\">\n  Sua chave de API:\n  <pura-redact id=\"apikey\" reveal-on=\"click\" toggle blur=\"md\">sk-live-9f2c7b41ad8e4f00</pura-redact>\n  <br>\n  Salário (passe o mouse sobre ele):\n  <pura-redact reveal-on=\"hover\" blur=\"lg\">R$ 14.250,00</pura-redact>\n</p>\n<p id=\"status\" style=\"font-family: system-ui; color: #16a34a; font-size: 14px;\"></p>\n<script type=\"module\">\n  const status = document.getElementById(\"status\");\n  document.getElementById(\"apikey\").addEventListener(\"reveal\", (e) => {\n    status.textContent = \"Chave revelada: \" + e.detail.value;\n  });\n  document.getElementById(\"apikey\").addEventListener(\"hide\", () => {\n    status.textContent = \"Chave oculta novamente.\";\n  });\n</script>"
  },
  "fr": {
   "description": "Redact est un composant agent-native qui floute et protège le contenu sensible du slot (secrets, jetons, salaires, données personnelles) jusqu'à une révélation explicite par clic, survol ou appel programmatique. Tant qu'il est masqué, l'arbre d'accessibilité n'expose qu'un libellé générique (\"contenu masqué\"), de sorte que les lecteurs d'écran et les agents ne divulguent jamais la valeur réelle avant qu'un humain ne la révèle. La couche agent-native reflète l'état dans des attributs data-* stables sur l'hôte (data-pura-redact, data-pura-id, data-state, data-reveal-on) et enregistre chaque instance dans window.__puraRedactions, permettant aux agents d'auditer et de contrôler chaque masquage de la page sans traverser le Shadow DOM (la valeur n'est jamais reflétée dans ces attributs).",
   "attributes": [
    {
     "desc": "Interaction qui révèle le contenu. \"none\" le rend purement programmatique (révélation via .reveal())."
    },
    {
     "desc": "Booléen reflété ; présent tant que la valeur est visible. Définissez-le dans le markup pour démarrer déjà révélé."
    },
    {
     "desc": "Libellé accessible annoncé tant que le contenu est masqué."
    },
    {
     "desc": "Intensité du flou qui obscurcit le contenu tant qu'il est masqué."
    },
    {
     "desc": "Lorsqu'il est présent, la même interaction qui révèle masque aussi à nouveau (le clic bascule)."
    },
    {
     "desc": "Non interactif ; reste masqué et ne peut pas être révélé par l'utilisateur."
    }
   ],
   "demoHTML": "<p style=\"font-family: system-ui; line-height: 2;\">\n  Votre clé d'API :\n  <pura-redact id=\"apikey\" reveal-on=\"click\" toggle blur=\"md\">sk-live-9f2c7b41ad8e4f00</pura-redact>\n  <br>\n  Salaire (survolez-le) :\n  <pura-redact reveal-on=\"hover\" blur=\"lg\">14 250,00 €</pura-redact>\n</p>\n<p id=\"status\" style=\"font-family: system-ui; color: #16a34a; font-size: 14px;\"></p>\n<script type=\"module\">\n  const status = document.getElementById(\"status\");\n  document.getElementById(\"apikey\").addEventListener(\"reveal\", (e) => {\n    status.textContent = \"Clé révélée : \" + e.detail.value;\n  });\n  document.getElementById(\"apikey\").addEventListener(\"hide\", () => {\n    status.textContent = \"Clé de nouveau masquée.\";\n  });\n</script>"
  },
  "de": {
   "description": "Redact ist eine agent-native Komponente, die sensible Inhalte im Slot (Geheimnisse, Tokens, Gehälter, personenbezogene Daten) unscharf macht und schützt, bis sie durch Klick, Hover oder programmatischen Aufruf ausdrücklich aufgedeckt werden. Solange der Inhalt verborgen ist, gibt der Accessibility-Baum nur eine generische Beschriftung preis (\"verborgener Inhalt\"), sodass Screenreader und Agenten den echten Wert niemals preisgeben, bevor ein Mensch ihn aufdeckt. Die agent-native Schicht spiegelt den Zustand in stabilen data-*-Attributen am Host (data-pura-redact, data-pura-id, data-state, data-reveal-on) und registriert jede Instanz in window.__puraRedactions, sodass Agenten jede Schwärzung auf der Seite prüfen und steuern können, ohne das Shadow DOM zu durchqueren (der Wert wird niemals in diesen Attributen gespiegelt).",
   "attributes": [
    {
     "desc": "Interaktion, die den Inhalt aufdeckt. \"none\" macht ihn rein programmatisch (Aufdecken über .reveal())."
    },
    {
     "desc": "Gespiegelter Boolean; vorhanden, solange der Wert sichtbar ist. Im Markup setzen, um bereits aufgedeckt zu starten."
    },
    {
     "desc": "Barrierefreie Beschriftung, die angesagt wird, solange der Inhalt verborgen ist."
    },
    {
     "desc": "Intensität der Unschärfe, die den Inhalt verdeckt, solange er verborgen ist."
    },
    {
     "desc": "Wenn vorhanden, verbirgt dieselbe Interaktion, die aufdeckt, den Inhalt auch wieder (der Klick schaltet um)."
    },
    {
     "desc": "Nicht interaktiv; bleibt verborgen und kann vom Benutzer nicht aufgedeckt werden."
    }
   ],
   "demoHTML": "<p style=\"font-family: system-ui; line-height: 2;\">\n  Ihr API-Schlüssel:\n  <pura-redact id=\"apikey\" reveal-on=\"click\" toggle blur=\"md\">sk-live-9f2c7b41ad8e4f00</pura-redact>\n  <br>\n  Gehalt (fahren Sie mit der Maus darüber):\n  <pura-redact reveal-on=\"hover\" blur=\"lg\">14.250,00 €</pura-redact>\n</p>\n<p id=\"status\" style=\"font-family: system-ui; color: #16a34a; font-size: 14px;\"></p>\n<script type=\"module\">\n  const status = document.getElementById(\"status\");\n  document.getElementById(\"apikey\").addEventListener(\"reveal\", (e) => {\n    status.textContent = \"Schlüssel angezeigt: \" + e.detail.value;\n  });\n  document.getElementById(\"apikey\").addEventListener(\"hide\", () => {\n    status.textContent = \"Schlüssel wieder verborgen.\";\n  });\n</script>"
  },
  "it": {
   "description": "Redact è un componente agent-native che sfoca e protegge i contenuti sensibili nello slot (segreti, token, stipendi, dati personali) fino a una rivelazione esplicita tramite clic, hover o chiamata programmatica. Mentre è nascosto, l'albero di accessibilità espone solo un'etichetta generica (\"contenuto nascosto\"), così che screen reader e agenti non rivelino mai il valore reale prima che un umano lo riveli. Lo strato agent-native rispecchia lo stato in attributi data-* stabili sull'host (data-pura-redact, data-pura-id, data-state, data-reveal-on) e registra ogni istanza in window.__puraRedactions, consentendo agli agenti di controllare e gestire ogni oscuramento nella pagina senza attraversare lo Shadow DOM (il valore non viene mai rispecchiato in quegli attributi).",
   "attributes": [
    {
     "desc": "Interazione che rivela il contenuto. \"none\" lo rende puramente programmatico (rivelazione tramite .reveal())."
    },
    {
     "desc": "Booleano riflesso; presente mentre il valore è visibile. Impostalo nel markup per partire già rivelato."
    },
    {
     "desc": "Etichetta accessibile annunciata mentre il contenuto è nascosto."
    },
    {
     "desc": "Intensità della sfocatura che oscura il contenuto mentre è nascosto."
    },
    {
     "desc": "Quando presente, la stessa interazione che rivela nasconde di nuovo (il clic alterna)."
    },
    {
     "desc": "Non interattivo; resta nascosto e non può essere rivelato dall'utente."
    }
   ],
   "demoHTML": "<p style=\"font-family: system-ui; line-height: 2;\">\n  La tua chiave API:\n  <pura-redact id=\"apikey\" reveal-on=\"click\" toggle blur=\"md\">sk-live-9f2c7b41ad8e4f00</pura-redact>\n  <br>\n  Stipendio (passaci sopra il mouse):\n  <pura-redact reveal-on=\"hover\" blur=\"lg\">14.250,00 €</pura-redact>\n</p>\n<p id=\"status\" style=\"font-family: system-ui; color: #16a34a; font-size: 14px;\"></p>\n<script type=\"module\">\n  const status = document.getElementById(\"status\");\n  document.getElementById(\"apikey\").addEventListener(\"reveal\", (e) => {\n    status.textContent = \"Chiave rivelata: \" + e.detail.value;\n  });\n  document.getElementById(\"apikey\").addEventListener(\"hide\", () => {\n    status.textContent = \"Chiave nascosta di nuovo.\";\n  });\n</script>"
  }
 },
 "diff": {
  "pt-BR": {
   "description": "`pura-diff` calcula um diff inline (LCS, zero dependências) entre um texto `before` e um texto `after`, renderizando os segmentos removidos em vermelho riscado, os adicionados em verde sublinhado e o restante como texto simples. Use-o para comparar versões de um texto, revisar edições de IA ou destacar mudanças sem dependências externas. A camada agent-native expõe cada segmento com `data-op` e `data-text`, reflete as contagens em `data-added`/`data-removed`/`data-equal` no host, emite um evento `diff` estruturado e registra cada instância em `window.__puraDiffs`, para que agentes possam ler o resultado sem fazer scraping do DOM.",
   "attributes": [
    {
     "desc": "Texto original. Pode ser sobrescrito por slot[name=\"before\"]."
    },
    {
     "desc": "Novo texto. Pode ser sobrescrito por slot[name=\"after\"]."
    },
    {
     "desc": "Granularidade do diff: por palavras (padrão) ou por caracteres."
    },
    {
     "desc": "Rótulo acessível (aria-label) para a região do diff."
    },
    {
     "desc": "Quando presente, exibe o componente como bloco em vez de inline."
    }
   ],
   "demoHTML": "<pura-diff\n  block\n  before=\"O cachorro marrom pulou o muro baixo.\"\n  after=\"O gato preto pulou o muro alto.\"\n  label=\"Diferença entre as duas frases\"\n></pura-diff>"
  },
  "fr": {
   "description": "`pura-diff` calcule une comparaison en ligne (LCS, zéro dépendance) entre un texte `before` et un texte `after`, en affichant les segments supprimés en rouge barré, les ajouts en vert souligné et le reste en texte simple. Utilisez-le pour comparer des versions d'un texte, relire des modifications d'IA ou mettre en évidence des changements sans dépendances externes. La couche agent-native expose chaque segment avec `data-op` et `data-text`, reflète les décomptes dans `data-added`/`data-removed`/`data-equal` sur l'hôte, émet un événement `diff` structuré et enregistre chaque instance dans `window.__puraDiffs`, afin que les agents puissent lire le résultat sans parcourir le DOM.",
   "attributes": [
    {
     "desc": "Texte original. Peut être remplacé par slot[name=\"before\"]."
    },
    {
     "desc": "Nouveau texte. Peut être remplacé par slot[name=\"after\"]."
    },
    {
     "desc": "Granularité de la comparaison : par mots (par défaut) ou par caractères."
    },
    {
     "desc": "Libellé accessible (aria-label) pour la région de comparaison."
    },
    {
     "desc": "Lorsqu'il est présent, affiche le composant en bloc plutôt qu'en ligne."
    }
   ],
   "demoHTML": "<pura-diff\n  block\n  before=\"Le chien brun a sauté par-dessus le mur bas.\"\n  after=\"Le chat noir a sauté par-dessus le mur haut.\"\n  label=\"Différence entre les deux phrases\"\n></pura-diff>"
  },
  "de": {
   "description": "`pura-diff` berechnet einen Inline-Diff (LCS, ohne Abhängigkeiten) zwischen einem `before`-Text und einem `after`-Text und stellt entfernte Segmente durchgestrichen in Rot, hinzugefügte unterstrichen in Grün und den Rest als einfachen Text dar. Verwende es, um Versionen eines Textes zu vergleichen, KI-Bearbeitungen zu überprüfen oder Änderungen ohne externe Abhängigkeiten hervorzuheben. Die agent-native Schicht legt jedes Segment mit `data-op` und `data-text` offen, spiegelt die Zählungen in `data-added`/`data-removed`/`data-equal` am Host, löst ein strukturiertes `diff`-Event aus und registriert jede Instanz in `window.__puraDiffs`, sodass Agenten das Ergebnis lesen können, ohne das DOM zu durchsuchen.",
   "attributes": [
    {
     "desc": "Originaltext. Kann durch slot[name=\"before\"] überschrieben werden."
    },
    {
     "desc": "Neuer Text. Kann durch slot[name=\"after\"] überschrieben werden."
    },
    {
     "desc": "Granularität des Diffs: nach Wörtern (Standard) oder nach Zeichen."
    },
    {
     "desc": "Barrierefreie Beschriftung (aria-label) für den Diff-Bereich."
    },
    {
     "desc": "Wenn vorhanden, wird die Komponente als Block statt inline angezeigt."
    }
   ],
   "demoHTML": "<pura-diff\n  block\n  before=\"Der braune Hund sprang über die niedrige Mauer.\"\n  after=\"Die schwarze Katze sprang über die hohe Mauer.\"\n  label=\"Unterschied zwischen den beiden Sätzen\"\n></pura-diff>"
  },
  "it": {
   "description": "`pura-diff` calcola un diff inline (LCS, zero dipendenze) tra un testo `before` e un testo `after`, mostrando i segmenti rimossi in rosso barrato, quelli aggiunti in verde sottolineato e il resto come testo semplice. Usalo per confrontare versioni di un testo, rivedere modifiche dell'IA o evidenziare cambiamenti senza dipendenze esterne. Lo strato agent-native espone ogni segmento con `data-op` e `data-text`, riflette i conteggi in `data-added`/`data-removed`/`data-equal` sull'host, emette un evento `diff` strutturato e registra ogni istanza in `window.__puraDiffs`, così che gli agenti possano leggere il risultato senza fare scraping del DOM.",
   "attributes": [
    {
     "desc": "Testo originale. Può essere sovrascritto da slot[name=\"before\"]."
    },
    {
     "desc": "Nuovo testo. Può essere sovrascritto da slot[name=\"after\"]."
    },
    {
     "desc": "Granularità del diff: per parole (predefinito) o per caratteri."
    },
    {
     "desc": "Etichetta accessibile (aria-label) per la regione del diff."
    },
    {
     "desc": "Quando presente, mostra il componente come blocco anziché inline."
    }
   ],
   "demoHTML": "<pura-diff\n  block\n  before=\"Il cane marrone ha saltato il muro basso.\"\n  after=\"Il gatto nero ha saltato il muro alto.\"\n  label=\"Differenza tra le due frasi\"\n></pura-diff>"
  }
 },
 "mediaquery": {
  "pt-BR": {
   "description": "`<pura-mediaquery>` avalia uma media query CSS e projeta o slot `match` quando ela corresponde, ou o conteúdo `default` (ou o slot padrão sem nome) quando não corresponde, atualizando em tempo real conforme a viewport muda. Use-o para trocar markup de forma declarativa sem JavaScript de breakpoint. Por ser agent-native, expõe estado legível por máquina (`data-pura`, `data-query`, `data-matches` no host e um registro global `window.__puraMediaQueries`), permitindo que agentes leiam o estado responsivo da página sem medir a viewport.",
   "attributes": [
    {
     "desc": "A media query CSS a avaliar, por exemplo \"(max-width: 640px)\". Ausente ou inválida nunca corresponde, então o conteúdo padrão é exibido. Observada: troca em tempo real quando alterada."
    }
   ],
   "demoHTML": "<div style=\"border:1px solid #ddd;border-radius:8px;padding:16px;font-family:system-ui\">\n  <p style=\"margin:0 0 8px;color:#666\">Redimensione a janela para ver o conteúdo trocar:</p>\n  <pura-mediaquery query=\"(max-width: 640px)\">\n    <strong slot=\"match\" style=\"color:#e11\">Layout mobile (tela &le; 640px)</strong>\n    <strong slot=\"default\" style=\"color:#16a34a\">Layout desktop (tela > 640px)</strong>\n  </pura-mediaquery>\n  <p id=\"estado\" style=\"margin:12px 0 0;color:#999;font-size:13px\"></p>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/mediaquery.js\";\n  const mq = document.querySelector(\"pura-mediaquery\");\n  const estado = document.getElementById(\"estado\");\n  mq.addEventListener(\"pura-mediaquery:change\", (e) => {\n    estado.textContent = `query: ${e.detail.query} | matches: ${e.detail.matches}`;\n  });\n</script>"
  },
  "fr": {
   "description": "`<pura-mediaquery>` évalue une media query CSS et projette le slot `match` lorsqu'elle correspond, ou le contenu `default` (ou le slot par défaut sans nom) lorsqu'elle ne correspond pas, en se mettant à jour en direct à mesure que la fenêtre d'affichage change. Utilisez-le pour permuter le markup de façon déclarative sans JavaScript de point de rupture. Étant agent-native, il expose un état lisible par machine (`data-pura`, `data-query`, `data-matches` sur l'hôte et un registre global `window.__puraMediaQueries`), permettant aux agents de lire l'état responsive de la page sans mesurer la fenêtre d'affichage.",
   "attributes": [
    {
     "desc": "La media query CSS à évaluer, par exemple \"(max-width: 640px)\". Absente ou invalide, elle ne correspond jamais, donc le contenu par défaut est affiché. Observée : elle permute en direct lorsqu'elle change."
    }
   ],
   "demoHTML": "<div style=\"border:1px solid #ddd;border-radius:8px;padding:16px;font-family:system-ui\">\n  <p style=\"margin:0 0 8px;color:#666\">Redimensionnez la fenêtre pour voir le contenu changer :</p>\n  <pura-mediaquery query=\"(max-width: 640px)\">\n    <strong slot=\"match\" style=\"color:#e11\">Mise en page mobile (écran &le; 640px)</strong>\n    <strong slot=\"default\" style=\"color:#16a34a\">Mise en page bureau (écran > 640px)</strong>\n  </pura-mediaquery>\n  <p id=\"estado\" style=\"margin:12px 0 0;color:#999;font-size:13px\"></p>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/mediaquery.js\";\n  const mq = document.querySelector(\"pura-mediaquery\");\n  const estado = document.getElementById(\"estado\");\n  mq.addEventListener(\"pura-mediaquery:change\", (e) => {\n    estado.textContent = `query: ${e.detail.query} | matches: ${e.detail.matches}`;\n  });\n</script>"
  },
  "de": {
   "description": "`<pura-mediaquery>` wertet eine CSS-Media-Query aus und projiziert den `match`-Slot, wenn sie zutrifft, oder den `default`-Inhalt (bzw. den unbenannten Standard-Slot), wenn sie nicht zutrifft, und aktualisiert sich live, während sich der Viewport ändert. Verwende es, um Markup deklarativ auszutauschen, ohne Breakpoint-JavaScript. Da es agent-native ist, legt es maschinenlesbaren Zustand offen (`data-pura`, `data-query`, `data-matches` am Host sowie ein globales Register `window.__puraMediaQueries`), sodass Agenten den responsiven Zustand der Seite lesen können, ohne den Viewport zu messen.",
   "attributes": [
    {
     "desc": "Die auszuwertende CSS-Media-Query, zum Beispiel \"(max-width: 640px)\". Fehlt sie oder ist ungültig, trifft sie nie zu, sodass der Standardinhalt angezeigt wird. Beobachtet: Sie wechselt live, wenn sie geändert wird."
    }
   ],
   "demoHTML": "<div style=\"border:1px solid #ddd;border-radius:8px;padding:16px;font-family:system-ui\">\n  <p style=\"margin:0 0 8px;color:#666\">Ändern Sie die Fenstergröße, um den Inhalt wechseln zu sehen:</p>\n  <pura-mediaquery query=\"(max-width: 640px)\">\n    <strong slot=\"match\" style=\"color:#e11\">Mobiles Layout (Bildschirm &le; 640px)</strong>\n    <strong slot=\"default\" style=\"color:#16a34a\">Desktop-Layout (Bildschirm > 640px)</strong>\n  </pura-mediaquery>\n  <p id=\"estado\" style=\"margin:12px 0 0;color:#999;font-size:13px\"></p>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/mediaquery.js\";\n  const mq = document.querySelector(\"pura-mediaquery\");\n  const estado = document.getElementById(\"estado\");\n  mq.addEventListener(\"pura-mediaquery:change\", (e) => {\n    estado.textContent = `query: ${e.detail.query} | matches: ${e.detail.matches}`;\n  });\n</script>"
  },
  "it": {
   "description": "`<pura-mediaquery>` valuta una media query CSS e proietta lo slot `match` quando corrisponde, oppure il contenuto `default` (o lo slot predefinito senza nome) quando non corrisponde, aggiornandosi in tempo reale al variare della viewport. Usalo per scambiare il markup in modo dichiarativo senza JavaScript per i breakpoint. Essendo agent-native, espone uno stato leggibile dalle macchine (`data-pura`, `data-query`, `data-matches` sull'host e un registro globale `window.__puraMediaQueries`), consentendo agli agenti di leggere lo stato responsivo della pagina senza misurare la viewport.",
   "attributes": [
    {
     "desc": "La media query CSS da valutare, ad esempio \"(max-width: 640px)\". Assente o non valida non corrisponde mai, quindi viene mostrato il contenuto predefinito. Osservata: cambia in tempo reale quando viene modificata."
    }
   ],
   "demoHTML": "<div style=\"border:1px solid #ddd;border-radius:8px;padding:16px;font-family:system-ui\">\n  <p style=\"margin:0 0 8px;color:#666\">Ridimensiona la finestra per vedere il contenuto cambiare:</p>\n  <pura-mediaquery query=\"(max-width: 640px)\">\n    <strong slot=\"match\" style=\"color:#e11\">Layout mobile (schermo &le; 640px)</strong>\n    <strong slot=\"default\" style=\"color:#16a34a\">Layout desktop (schermo > 640px)</strong>\n  </pura-mediaquery>\n  <p id=\"estado\" style=\"margin:12px 0 0;color:#999;font-size:13px\"></p>\n</div>\n<script type=\"module\">\n  import \"/pura/lib/mediaquery.js\";\n  const mq = document.querySelector(\"pura-mediaquery\");\n  const estado = document.getElementById(\"estado\");\n  mq.addEventListener(\"pura-mediaquery:change\", (e) => {\n    estado.textContent = `query: ${e.detail.query} | matches: ${e.detail.matches}`;\n  });\n</script>"
  }
 },
 "reveal": {
  "pt-BR": {
   "description": "`<pura-reveal>` envolve qualquer conteúdo e o anima (fade, slide-up ou zoom) na primeira vez que ele entra na viewport, usando IntersectionObserver. A entrada é puramente visual (opacity + transform): o conteúdo sempre permanece na árvore de acessibilidade e nunca fica realmente oculto, e sob movimento reduzido ele aparece imediatamente, sem atraso. Tem uma camada agent-native: cada instância se registra em `window.__puraReveals` por `data-pura-id` e espelha a configuração e o estado em tempo real em atributos `data-pura-reveal-*`, permitindo que um agente enumere, leia e acione cada reveal sem percorrer o DOM.",
   "attributes": [
    {
     "desc": "Estilo de animação de entrada. Valores inválidos recuam para fade."
    },
    {
     "desc": "Milissegundos a esperar antes de animar quando entra na viewport. Aplicado como transition-delay e ignorado sob movimento reduzido."
    },
    {
     "desc": "Quando presente, revela uma vez e para de observar. Quando ausente, oculta novamente ao sair e revela de novo ao reentrar."
    },
    {
     "desc": "Limiar 0..1 do IntersectionObserver que define quanto do elemento deve estar visível para revelar."
    },
    {
     "desc": "Estado refletido somente leitura: presente enquanto o conteúdo está visível."
    }
   ],
   "demoHTML": "<div style=\"height: 120px; display: grid; place-items: center; color: var(--pura-muted, #888); font: 14px system-ui;\">\n  Role para baixo para revelar o conteúdo\n</div>\n\n<pura-reveal animation=\"slide-up\" delay=\"100\" threshold=\"0.3\">\n  <article style=\"padding: var(--pura-space-5, 1.5rem); border: 1px solid var(--pura-border, #ddd); border-radius: 12px; font: 16px/1.5 system-ui;\">\n    <h3 style=\"margin-top: 0;\">Conteúdo revelado</h3>\n    <p>Este bloco desliza para cima e aparece suavemente assim que entra na tela.</p>\n  </article>\n</pura-reveal>\n\n<pura-reveal animation=\"zoom\" once>\n  <article style=\"margin-top: var(--pura-space-4, 1rem); padding: var(--pura-space-5, 1.5rem); border: 1px solid var(--pura-border, #ddd); border-radius: 12px; font: 16px/1.5 system-ui;\">\n    <h3 style=\"margin-top: 0;\">Revela apenas uma vez</h3>\n    <p>Com <code>once</code>, ele anima na primeira entrada e para de observar.</p>\n  </article>\n</pura-reveal>"
  },
  "fr": {
   "description": "`<pura-reveal>` enveloppe n'importe quel contenu et l'anime (fondu, glissement vers le haut ou zoom) la première fois qu'il entre dans la fenêtre d'affichage, à l'aide d'IntersectionObserver. L'apparition est purement visuelle (opacity + transform) : le contenu reste toujours dans l'arbre d'accessibilité et n'est jamais réellement masqué, et en mode mouvement réduit il apparaît immédiatement, sans délai. Il dispose d'une couche agent-native : chaque instance s'enregistre dans `window.__puraReveals` par `data-pura-id` et reflète la configuration et l'état en direct dans des attributs `data-pura-reveal-*`, permettant à un agent d'énumérer, de lire et de déclencher chaque apparition sans parcourir le DOM.",
   "attributes": [
    {
     "desc": "Style d'animation d'apparition. Les valeurs invalides reviennent au fondu."
    },
    {
     "desc": "Millisecondes à attendre avant l'animation lorsqu'il entre dans la fenêtre d'affichage. Appliqué comme transition-delay et ignoré en mode mouvement réduit."
    },
    {
     "desc": "Lorsqu'il est présent, révèle une fois et cesse d'observer. Lorsqu'il est absent, masque à nouveau à la sortie et révèle de nouveau au retour."
    },
    {
     "desc": "Seuil 0..1 d'IntersectionObserver qui définit quelle proportion de l'élément doit être visible pour révéler."
    },
    {
     "desc": "État reflété en lecture seule : présent tant que le contenu est visible."
    }
   ],
   "demoHTML": "<div style=\"height: 120px; display: grid; place-items: center; color: var(--pura-muted, #888); font: 14px system-ui;\">\n  Faites défiler vers le bas pour révéler le contenu\n</div>\n\n<pura-reveal animation=\"slide-up\" delay=\"100\" threshold=\"0.3\">\n  <article style=\"padding: var(--pura-space-5, 1.5rem); border: 1px solid var(--pura-border, #ddd); border-radius: 12px; font: 16px/1.5 system-ui;\">\n    <h3 style=\"margin-top: 0;\">Contenu révélé</h3>\n    <p>Ce bloc glisse vers le haut et apparaît en fondu dès qu'il entre à l'écran.</p>\n  </article>\n</pura-reveal>\n\n<pura-reveal animation=\"zoom\" once>\n  <article style=\"margin-top: var(--pura-space-4, 1rem); padding: var(--pura-space-5, 1.5rem); border: 1px solid var(--pura-border, #ddd); border-radius: 12px; font: 16px/1.5 system-ui;\">\n    <h3 style=\"margin-top: 0;\">Ne se révèle qu'une seule fois</h3>\n    <p>Avec <code>once</code>, il s'anime à la première entrée puis cesse d'observer.</p>\n  </article>\n</pura-reveal>"
  },
  "de": {
   "description": "`<pura-reveal>` umschließt beliebige Inhalte und animiert sie (Einblenden, Hochschieben oder Zoom) beim ersten Eintritt in den Viewport mithilfe des IntersectionObserver. Der Auftritt ist rein visuell (opacity + transform): Der Inhalt bleibt stets im Accessibility-Baum und wird nie wirklich verborgen, und bei reduzierter Bewegung erscheint er sofort ohne Verzögerung. Es besitzt eine agent-native Schicht: Jede Instanz registriert sich in `window.__puraReveals` über `data-pura-id` und spiegelt Konfiguration und Live-Zustand in `data-pura-reveal-*`-Attributen, sodass ein Agent jedes Reveal aufzählen, auslesen und auslösen kann, ohne das DOM zu durchlaufen.",
   "attributes": [
    {
     "desc": "Stil der Einblendanimation. Ungültige Werte fallen auf Einblenden zurück."
    },
    {
     "desc": "Millisekunden, die vor dem Animieren beim Eintritt in den Viewport gewartet wird. Wird als transition-delay angewendet und bei reduzierter Bewegung ignoriert."
    },
    {
     "desc": "Wenn vorhanden, wird einmal eingeblendet und die Beobachtung gestoppt. Wenn nicht vorhanden, wird beim Verlassen wieder ausgeblendet und beim erneuten Eintritt wieder eingeblendet."
    },
    {
     "desc": "IntersectionObserver-Schwellenwert 0..1, der festlegt, wie viel des Elements sichtbar sein muss, um es einzublenden."
    },
    {
     "desc": "Schreibgeschützter, gespiegelter Zustand: vorhanden, solange der Inhalt sichtbar ist."
    }
   ],
   "demoHTML": "<div style=\"height: 120px; display: grid; place-items: center; color: var(--pura-muted, #888); font: 14px system-ui;\">\n  Nach unten scrollen, um den Inhalt einzublenden\n</div>\n\n<pura-reveal animation=\"slide-up\" delay=\"100\" threshold=\"0.3\">\n  <article style=\"padding: var(--pura-space-5, 1.5rem); border: 1px solid var(--pura-border, #ddd); border-radius: 12px; font: 16px/1.5 system-ui;\">\n    <h3 style=\"margin-top: 0;\">Eingeblendeter Inhalt</h3>\n    <p>Dieser Block gleitet nach oben und wird sanft eingeblendet, sobald er auf dem Bildschirm erscheint.</p>\n  </article>\n</pura-reveal>\n\n<pura-reveal animation=\"zoom\" once>\n  <article style=\"margin-top: var(--pura-space-4, 1rem); padding: var(--pura-space-5, 1.5rem); border: 1px solid var(--pura-border, #ddd); border-radius: 12px; font: 16px/1.5 system-ui;\">\n    <h3 style=\"margin-top: 0;\">Wird nur einmal eingeblendet</h3>\n    <p>Mit <code>once</code> wird er beim ersten Erscheinen animiert und hört dann auf zu beobachten.</p>\n  </article>\n</pura-reveal>"
  },
  "it": {
   "description": "`<pura-reveal>` avvolge qualsiasi contenuto e lo anima (dissolvenza, scorrimento verso l'alto o zoom) la prima volta che entra nella viewport, usando IntersectionObserver. L'ingresso è puramente visivo (opacity + transform): il contenuto rimane sempre nell'albero di accessibilità e non viene mai realmente nascosto, e con il movimento ridotto compare immediatamente, senza ritardo. Dispone di uno strato agent-native: ogni istanza si registra in `window.__puraReveals` tramite `data-pura-id` e rispecchia la configurazione e lo stato in tempo reale negli attributi `data-pura-reveal-*`, consentendo a un agente di enumerare, leggere e attivare ogni reveal senza percorrere il DOM.",
   "attributes": [
    {
     "desc": "Stile dell'animazione di ingresso. I valori non validi ricadono sulla dissolvenza."
    },
    {
     "desc": "Millisecondi da attendere prima di animare quando entra nella viewport. Applicato come transition-delay e ignorato con il movimento ridotto."
    },
    {
     "desc": "Quando presente, rivela una volta e smette di osservare. Quando assente, nasconde di nuovo all'uscita e rivela nuovamente al rientro."
    },
    {
     "desc": "Soglia 0..1 di IntersectionObserver che definisce quanta parte dell'elemento deve essere visibile per rivelarlo."
    },
    {
     "desc": "Stato riflesso di sola lettura: presente mentre il contenuto è visibile."
    }
   ],
   "demoHTML": "<div style=\"height: 120px; display: grid; place-items: center; color: var(--pura-muted, #888); font: 14px system-ui;\">\n  Scorri verso il basso per rivelare il contenuto\n</div>\n\n<pura-reveal animation=\"slide-up\" delay=\"100\" threshold=\"0.3\">\n  <article style=\"padding: var(--pura-space-5, 1.5rem); border: 1px solid var(--pura-border, #ddd); border-radius: 12px; font: 16px/1.5 system-ui;\">\n    <h3 style=\"margin-top: 0;\">Contenuto rivelato</h3>\n    <p>Questo blocco scorre verso l'alto e compare in dissolvenza non appena entra nello schermo.</p>\n  </article>\n</pura-reveal>\n\n<pura-reveal animation=\"zoom\" once>\n  <article style=\"margin-top: var(--pura-space-4, 1rem); padding: var(--pura-space-5, 1.5rem); border: 1px solid var(--pura-border, #ddd); border-radius: 12px; font: 16px/1.5 system-ui;\">\n    <h3 style=\"margin-top: 0;\">Si rivela una sola volta</h3>\n    <p>Con <code>once</code>, si anima alla prima entrata e smette di osservare.</p>\n  </article>\n</pura-reveal>"
  }
 },
 "truncate": {
  "pt-BR": {
   "description": "`<pura-truncate>` corta visualmente o texto em um número fixo de linhas usando line-clamp, exibindo um botão de expandir apenas quando o conteúdo realmente transborda. Use-o quando precisar condensar descrições, comentários ou bios longos mantendo a opção de ver tudo. O texto completo sempre permanece no DOM e na árvore de acessibilidade (apenas o corte é visual), de modo que leitores de tela e agentes leem todo o conteúdo; ele também expõe uma camada agent-native com atributos data-* estáveis e um registro global window.__puraTruncate indexado por id.",
   "attributes": [
    {
     "desc": "Número de linhas visíveis quando recolhido (mínimo 1)."
    },
    {
     "desc": "Presente = começa expandido; refletido como estado."
    },
    {
     "desc": "Rótulo do botão de expandir."
    },
    {
     "desc": "Rótulo do botão de recolher."
    }
   ],
   "demoHTML": "<pura-truncate lines=\"2\" more-label=\"ler mais\" less-label=\"ler menos\" style=\"max-width: 380px; display: block;\">\n  As Blue Ridge Mountains são uma das cadeias montanhosas mais proeminentes do leste dos Estados Unidos, estendendo-se pela Virgínia, Carolina do Norte e Geórgia. Suas trilhas, cachoeiras e clima ameno atraem visitantes o ano todo, especialmente nos meses de inverno, quando as temperaturas caem perto de zero nas elevações mais altas.\n</pura-truncate>"
  },
  "fr": {
   "description": "`<pura-truncate>` tronque visuellement le texte à un nombre fixe de lignes à l'aide de line-clamp, n'affichant un bouton de développement que lorsque le contenu déborde réellement. Utilisez-le lorsque vous devez condenser de longues descriptions, commentaires ou biographies tout en gardant la possibilité de tout voir. Le texte complet reste toujours dans le DOM et l'arbre d'accessibilité (seule la troncature est visuelle), de sorte que les lecteurs d'écran et les agents lisent l'intégralité du contenu ; il expose également une couche agent-native avec des attributs data-* stables et un registre global window.__puraTruncate indexé par id.",
   "attributes": [
    {
     "desc": "Nombre de lignes visibles lorsqu'il est réduit (minimum 1)."
    },
    {
     "desc": "Présent = démarre développé ; reflété comme état."
    },
    {
     "desc": "Libellé du bouton de développement."
    },
    {
     "desc": "Libellé du bouton de réduction."
    }
   ],
   "demoHTML": "<pura-truncate lines=\"2\" more-label=\"lire plus\" less-label=\"lire moins\" style=\"max-width: 380px; display: block;\">\n  Les Blue Ridge Mountains sont l'une des chaînes les plus importantes de l'est des États-Unis, s'étendant à travers la Virginie, la Caroline du Nord et la Géorgie. Leurs sentiers, leurs cascades et leur climat doux attirent des visiteurs toute l'année, surtout pendant les mois d'hiver, lorsque les températures avoisinent le point de congélation en haute altitude.\n</pura-truncate>"
  },
  "de": {
   "description": "`<pura-truncate>` beschneidet Text visuell mit line-clamp auf eine feste Anzahl von Zeilen und zeigt eine Aufklapp-Schaltfläche nur an, wenn der Inhalt tatsächlich überläuft. Verwende es, wenn du lange Beschreibungen, Kommentare oder Biografien verdichten und dennoch die Möglichkeit behalten möchtest, alles anzuzeigen. Der vollständige Text bleibt stets im DOM und im Accessibility-Baum (nur die Beschneidung ist visuell), sodass Screenreader und Agenten den gesamten Inhalt lesen; es legt außerdem eine agent-native Schicht mit stabilen data-*-Attributen und ein globales, nach id indexiertes Register window.__puraTruncate offen.",
   "attributes": [
    {
     "desc": "Anzahl der sichtbaren Zeilen im eingeklappten Zustand (mindestens 1)."
    },
    {
     "desc": "Vorhanden = startet aufgeklappt; als Zustand gespiegelt."
    },
    {
     "desc": "Beschriftung der Aufklapp-Schaltfläche."
    },
    {
     "desc": "Beschriftung der Einklapp-Schaltfläche."
    }
   ],
   "demoHTML": "<pura-truncate lines=\"2\" more-label=\"mehr lesen\" less-label=\"weniger lesen\" style=\"max-width: 380px; display: block;\">\n  Die Blue Ridge Mountains sind eine der markantesten Gebirgsketten im Osten der Vereinigten Staaten und erstrecken sich über Virginia, North Carolina und Georgia. Ihre Wanderwege, Wasserfälle und das milde Klima ziehen das ganze Jahr über Besucher an, besonders in den Wintermonaten, wenn die Temperaturen in den höheren Lagen nahe an den Gefrierpunkt sinken.\n</pura-truncate>"
  },
  "it": {
   "description": "`<pura-truncate>` ritaglia visivamente il testo a un numero fisso di righe usando line-clamp, mostrando un pulsante di espansione solo quando il contenuto trabocca davvero. Usalo quando devi condensare descrizioni, commenti o biografie lunghe mantenendo la possibilità di vedere tutto. Il testo completo rimane sempre nel DOM e nell'albero di accessibilità (solo il ritaglio è visivo), così che screen reader e agenti leggano l'intero contenuto; espone inoltre uno strato agent-native con attributi data-* stabili e un registro globale window.__puraTruncate indicizzato per id.",
   "attributes": [
    {
     "desc": "Numero di righe visibili quando è compresso (minimo 1)."
    },
    {
     "desc": "Presente = parte espanso; riflesso come stato."
    },
    {
     "desc": "Etichetta del pulsante di espansione."
    },
    {
     "desc": "Etichetta del pulsante di compressione."
    }
   ],
   "demoHTML": "<pura-truncate lines=\"2\" more-label=\"leggi di più\" less-label=\"leggi di meno\" style=\"max-width: 380px; display: block;\">\n  Le Blue Ridge Mountains sono una delle catene montuose più importanti degli Stati Uniti orientali e si estendono attraverso Virginia, Carolina del Nord e Georgia. I loro sentieri, le cascate e il clima mite attirano visitatori tutto l'anno, soprattutto nei mesi invernali, quando le temperature scendono vicino allo zero alle quote più elevate.\n</pura-truncate>"
  }
 },
 "box": {
  "pt-BR": {
   "description": "Box é um primitivo de div estilizada que transforma atributos comuns de layout e visuais em CSS apoiado por tokens --pura-*. O espaçamento aceita uma escala de 0 a 6 ou qualquer comprimento CSS bruto, enquanto background, color, border, radius e shadow mapeiam para o tema. Use-o como bloco de construção para cards, painéis e contêineres arbitrários sem escrever CSS personalizado.",
   "attributes": [
    {
     "desc": "Padding em todos os lados. Escala 0-6 (--pura-space-N) ou qualquer comprimento CSS."
    },
    {
     "desc": "Padding horizontal (sobrescreve p no eixo x). Escala 0-6 ou qualquer comprimento CSS."
    },
    {
     "desc": "Padding vertical (sobrescreve p no eixo y). Escala 0-6 ou qualquer comprimento CSS."
    },
    {
     "desc": "Margem em todos os lados. Escala 0-6, qualquer comprimento CSS ou 'auto'."
    },
    {
     "desc": "Margem horizontal (sobrescreve m no eixo x). Escala 0-6, qualquer comprimento CSS ou 'auto'."
    },
    {
     "desc": "Margem vertical (sobrescreve m no eixo y). Escala 0-6, qualquer comprimento CSS ou 'auto'."
    },
    {
     "desc": "Cor de fundo: bg | subtle | primary | transparent. O valor primary também define uma cor de primeiro plano legível."
    },
    {
     "desc": "Cor do texto: fg | muted | primary. Prevalece sobre a cor implícita definida por bg."
    },
    {
     "desc": "Booleano para uma borda de 1px, ou 'strong' para uma borda de 1px mais forte."
    },
    {
     "desc": "Raio dos cantos: sm | md | lg | full."
    },
    {
     "desc": "Sombra da caixa: sm | md | lg | none."
    },
    {
     "desc": "Largura: qualquer comprimento CSS ou 'full' (100%)."
    },
    {
     "desc": "Altura: qualquer comprimento CSS ou 'full' (100%)."
    },
    {
     "desc": "Qualquer valor de display CSS (block | flex | inline-flex | grid | inline | none ...)."
    }
   ],
   "demoHTML": "<pura-box p=\"4\" bg=\"subtle\" radius=\"md\" border>\n  Esta é uma caixa simples com preenchimento, fundo suave e uma borda.\n</pura-box>\n\n<pura-box p=\"5\" bg=\"primary\" radius=\"lg\" shadow=\"md\" my=\"3\">\n  Um cartão primário com cantos bem arredondados e uma sombra média.\n</pura-box>\n\n<pura-box p=\"4\" border=\"strong\" radius=\"sm\" color=\"muted\" w=\"320px\">\n  Uma caixa de largura fixa com borda forte e texto esmaecido.\n</pura-box>\n\n<pura-box px=\"6\" py=\"3\" bg=\"bg\" shadow=\"sm\" mx=\"auto\" w=\"full\">\n  Um banner de largura total centralizado com margens horizontais automáticas.\n</pura-box>"
  },
  "fr": {
   "description": "Box est une primitive de div stylisée qui transforme les attributs courants de mise en page et visuels en CSS adossé à des tokens --pura-*. L'espacement accepte une échelle de 0 à 6 ou n'importe quelle longueur CSS brute, tandis que background, color, border, radius et shadow correspondent au thème. Utilisez-le comme bloc de construction pour des cartes, des panneaux et des conteneurs arbitraires sans écrire de CSS personnalisé.",
   "attributes": [
    {
     "desc": "Padding sur tous les côtés. Échelle 0-6 (--pura-space-N) ou n'importe quelle longueur CSS."
    },
    {
     "desc": "Padding horizontal (remplace p sur l'axe x). Échelle 0-6 ou n'importe quelle longueur CSS."
    },
    {
     "desc": "Padding vertical (remplace p sur l'axe y). Échelle 0-6 ou n'importe quelle longueur CSS."
    },
    {
     "desc": "Marge sur tous les côtés. Échelle 0-6, n'importe quelle longueur CSS ou 'auto'."
    },
    {
     "desc": "Marge horizontale (remplace m sur l'axe x). Échelle 0-6, n'importe quelle longueur CSS ou 'auto'."
    },
    {
     "desc": "Marge verticale (remplace m sur l'axe y). Échelle 0-6, n'importe quelle longueur CSS ou 'auto'."
    },
    {
     "desc": "Couleur de fond : bg | subtle | primary | transparent. La valeur primary définit aussi une couleur de premier plan lisible."
    },
    {
     "desc": "Couleur du texte : fg | muted | primary. L'emporte sur la couleur implicite définie par bg."
    },
    {
     "desc": "Booléen pour une bordure de 1px, ou 'strong' pour une bordure de 1px plus marquée."
    },
    {
     "desc": "Rayon des coins : sm | md | lg | full."
    },
    {
     "desc": "Ombre de la boîte : sm | md | lg | none."
    },
    {
     "desc": "Largeur : n'importe quelle longueur CSS ou 'full' (100%)."
    },
    {
     "desc": "Hauteur : n'importe quelle longueur CSS ou 'full' (100%)."
    },
    {
     "desc": "N'importe quelle valeur de display CSS (block | flex | inline-flex | grid | inline | none ...)."
    }
   ],
   "demoHTML": "<pura-box p=\"4\" bg=\"subtle\" radius=\"md\" border>\n  Ceci est une simple boîte avec un espacement, un fond discret et une bordure.\n</pura-box>\n\n<pura-box p=\"5\" bg=\"primary\" radius=\"lg\" shadow=\"md\" my=\"3\">\n  Une carte principale avec de grands coins arrondis et une ombre moyenne.\n</pura-box>\n\n<pura-box p=\"4\" border=\"strong\" radius=\"sm\" color=\"muted\" w=\"320px\">\n  Une boîte de largeur fixe avec une bordure prononcée et un texte atténué.\n</pura-box>\n\n<pura-box px=\"6\" py=\"3\" bg=\"bg\" shadow=\"sm\" mx=\"auto\" w=\"full\">\n  Une bannière pleine largeur centrée avec des marges horizontales automatiques.\n</pura-box>"
  },
  "de": {
   "description": "Box ist ein gestyltes div-Primitiv, das gängige Layout- und visuelle Attribute in CSS umwandelt, das von --pura-*-Tokens gestützt wird. Abstände akzeptieren eine Skala von 0 bis 6 oder jede rohe CSS-Länge, während background, color, border, radius und shadow auf das Theme abgebildet werden. Verwende es als Baustein für Karten, Panels und beliebige Container, ohne eigenes CSS zu schreiben.",
   "attributes": [
    {
     "desc": "Padding auf allen Seiten. Skala 0-6 (--pura-space-N) oder beliebige CSS-Länge."
    },
    {
     "desc": "Horizontales Padding (überschreibt p auf der x-Achse). Skala 0-6 oder beliebige CSS-Länge."
    },
    {
     "desc": "Vertikales Padding (überschreibt p auf der y-Achse). Skala 0-6 oder beliebige CSS-Länge."
    },
    {
     "desc": "Margin auf allen Seiten. Skala 0-6, beliebige CSS-Länge oder 'auto'."
    },
    {
     "desc": "Horizontaler Margin (überschreibt m auf der x-Achse). Skala 0-6, beliebige CSS-Länge oder 'auto'."
    },
    {
     "desc": "Vertikaler Margin (überschreibt m auf der y-Achse). Skala 0-6, beliebige CSS-Länge oder 'auto'."
    },
    {
     "desc": "Hintergrundfarbe: bg | subtle | primary | transparent. Der Wert primary setzt außerdem eine lesbare Vordergrundfarbe."
    },
    {
     "desc": "Textfarbe: fg | muted | primary. Hat Vorrang vor der durch bg implizit gesetzten Farbe."
    },
    {
     "desc": "Boolean für einen 1px-Rahmen oder 'strong' für einen stärkeren 1px-Rahmen."
    },
    {
     "desc": "Eckenradius: sm | md | lg | full."
    },
    {
     "desc": "Box-Schatten: sm | md | lg | none."
    },
    {
     "desc": "Breite: beliebige CSS-Länge oder 'full' (100%)."
    },
    {
     "desc": "Höhe: beliebige CSS-Länge oder 'full' (100%)."
    },
    {
     "desc": "Beliebiger CSS-display-Wert (block | flex | inline-flex | grid | inline | none ...)."
    }
   ],
   "demoHTML": "<pura-box p=\"4\" bg=\"subtle\" radius=\"md\" border>\n  Dies ist eine einfache Box mit Innenabstand, dezentem Hintergrund und einem Rahmen.\n</pura-box>\n\n<pura-box p=\"5\" bg=\"primary\" radius=\"lg\" shadow=\"md\" my=\"3\">\n  Eine Primärkarte mit großen abgerundeten Ecken und einem mittleren Schatten.\n</pura-box>\n\n<pura-box p=\"4\" border=\"strong\" radius=\"sm\" color=\"muted\" w=\"320px\">\n  Eine Box mit fester Breite, kräftigem Rahmen und gedämpftem Text.\n</pura-box>\n\n<pura-box px=\"6\" py=\"3\" bg=\"bg\" shadow=\"sm\" mx=\"auto\" w=\"full\">\n  Ein zentriertes Banner über die volle Breite mit automatischen horizontalen Rändern.\n</pura-box>"
  },
  "it": {
   "description": "Box è una primitiva div con stile che trasforma i comuni attributi di layout e visivi in CSS basato sui token --pura-*. La spaziatura accetta una scala da 0 a 6 o qualsiasi lunghezza CSS grezza, mentre background, color, border, radius e shadow vengono mappati sul tema. Usalo come elemento costitutivo per card, pannelli e contenitori arbitrari senza scrivere CSS personalizzato.",
   "attributes": [
    {
     "desc": "Padding su tutti i lati. Scala 0-6 (--pura-space-N) o qualsiasi lunghezza CSS."
    },
    {
     "desc": "Padding orizzontale (sovrascrive p sull'asse x). Scala 0-6 o qualsiasi lunghezza CSS."
    },
    {
     "desc": "Padding verticale (sovrascrive p sull'asse y). Scala 0-6 o qualsiasi lunghezza CSS."
    },
    {
     "desc": "Margine su tutti i lati. Scala 0-6, qualsiasi lunghezza CSS o 'auto'."
    },
    {
     "desc": "Margine orizzontale (sovrascrive m sull'asse x). Scala 0-6, qualsiasi lunghezza CSS o 'auto'."
    },
    {
     "desc": "Margine verticale (sovrascrive m sull'asse y). Scala 0-6, qualsiasi lunghezza CSS o 'auto'."
    },
    {
     "desc": "Colore di sfondo: bg | subtle | primary | transparent. Il valore primary imposta anche un colore di primo piano leggibile."
    },
    {
     "desc": "Colore del testo: fg | muted | primary. Prevale sul colore implicito impostato da bg."
    },
    {
     "desc": "Booleano per un bordo di 1px, oppure 'strong' per un bordo di 1px più marcato."
    },
    {
     "desc": "Raggio degli angoli: sm | md | lg | full."
    },
    {
     "desc": "Ombra del riquadro: sm | md | lg | none."
    },
    {
     "desc": "Larghezza: qualsiasi lunghezza CSS o 'full' (100%)."
    },
    {
     "desc": "Altezza: qualsiasi lunghezza CSS o 'full' (100%)."
    },
    {
     "desc": "Qualsiasi valore CSS di display (block | flex | inline-flex | grid | inline | none ...)."
    }
   ],
   "demoHTML": "<pura-box p=\"4\" bg=\"subtle\" radius=\"md\" border>\n  Questa è una semplice scatola con spaziatura, sfondo tenue e un bordo.\n</pura-box>\n\n<pura-box p=\"5\" bg=\"primary\" radius=\"lg\" shadow=\"md\" my=\"3\">\n  Una scheda primaria con angoli molto arrotondati e un'ombra media.\n</pura-box>\n\n<pura-box p=\"4\" border=\"strong\" radius=\"sm\" color=\"muted\" w=\"320px\">\n  Una scatola a larghezza fissa con bordo marcato e testo attenuato.\n</pura-box>\n\n<pura-box px=\"6\" py=\"3\" bg=\"bg\" shadow=\"sm\" mx=\"auto\" w=\"full\">\n  Un banner a larghezza piena centrato con margini orizzontali automatici.\n</pura-box>"
  }
 },
 "flex": {
  "pt-BR": {
   "description": "O primitivo pura-flex envolve seus filhos do slot em um contêiner flex, expondo direção, gap, alinhamento, justificação, quebra de linha e exibição inline como atributos simples. O atributo gap aceita a escala de espaço de 1 a 6 (mapeada para design tokens) ou qualquer comprimento CSS bruto. É um bloco de construção apenas de layout, sem comportamento interativo.",
   "attributes": [
    {
     "desc": "Direção do eixo principal do contêiner flex (flex-direction)."
    },
    {
     "desc": "Espaçamento entre os filhos. Use a escala de espaço de 1 a 6 (resolve para um design token) ou qualquer comprimento CSS como \"2rem\" ou \"12px\"."
    },
    {
     "desc": "Alinhamento dos filhos no eixo cruzado (align-items)."
    },
    {
     "desc": "Distribuição dos filhos no eixo principal (justify-content)."
    },
    {
     "desc": "Quando presente, permite que os filhos quebrem em várias linhas (flex-wrap)."
    },
    {
     "desc": "Quando presente, renderiza o contêiner como inline-flex em vez de flex."
    }
   ],
   "demoHTML": "<script type=\"module\" src=\"/pura/lib/flex.js\"></script>\n\n<!-- Row with centered items and a gap -->\n<pura-flex align=\"center\" gap=\"3\">\n  <button>Salvar</button>\n  <button>Cancelar</button>\n  <span>Editado pela última vez há 2 minutos</span>\n</pura-flex>\n\n<!-- Column layout -->\n<pura-flex direction=\"col\" gap=\"2\">\n  <h3>Conta</h3>\n  <p>Gerencie seu perfil e suas preferências.</p>\n  <a href=\"/settings\">Abrir configurações</a>\n</pura-flex>\n\n<!-- Space the items apart across the row -->\n<pura-flex justify=\"between\" align=\"center\" gap=\"2rem\">\n  <strong>Painel</strong>\n  <button>Novo relatório</button>\n</pura-flex>\n\n<!-- Wrapping tag list -->\n<pura-flex wrap gap=\"2\">\n  <span>Design</span>\n  <span>Engenharia</span>\n  <span>Marketing</span>\n  <span>Operações</span>\n</pura-flex>"
  },
  "fr": {
   "description": "La primitive pura-flex enveloppe ses enfants du slot dans un conteneur flex, exposant la direction, l'espacement (gap), l'alignement, la justification, le retour à la ligne et l'affichage inline sous forme d'attributs simples. L'attribut gap accepte l'échelle d'espacement de 1 à 6 (associée à des design tokens) ou n'importe quelle longueur CSS brute. C'est un bloc de construction de mise en page uniquement, sans comportement interactif.",
   "attributes": [
    {
     "desc": "Direction de l'axe principal du conteneur flex (flex-direction)."
    },
    {
     "desc": "Espacement entre les enfants. Utilisez l'échelle d'espacement de 1 à 6 (résolue en design token) ou n'importe quelle longueur CSS comme \"2rem\" ou \"12px\"."
    },
    {
     "desc": "Alignement des enfants sur l'axe transversal (align-items)."
    },
    {
     "desc": "Répartition des enfants sur l'axe principal (justify-content)."
    },
    {
     "desc": "Lorsqu'il est présent, permet aux enfants de passer sur plusieurs lignes (flex-wrap)."
    },
    {
     "desc": "Lorsqu'il est présent, affiche le conteneur en inline-flex au lieu de flex."
    }
   ],
   "demoHTML": "<script type=\"module\" src=\"/pura/lib/flex.js\"></script>\n\n<!-- Row with centered items and a gap -->\n<pura-flex align=\"center\" gap=\"3\">\n  <button>Enregistrer</button>\n  <button>Annuler</button>\n  <span>Dernière modification il y a 2 minutes</span>\n</pura-flex>\n\n<!-- Column layout -->\n<pura-flex direction=\"col\" gap=\"2\">\n  <h3>Compte</h3>\n  <p>Gérez votre profil et vos préférences.</p>\n  <a href=\"/settings\">Ouvrir les paramètres</a>\n</pura-flex>\n\n<!-- Space the items apart across the row -->\n<pura-flex justify=\"between\" align=\"center\" gap=\"2rem\">\n  <strong>Tableau de bord</strong>\n  <button>Nouveau rapport</button>\n</pura-flex>\n\n<!-- Wrapping tag list -->\n<pura-flex wrap gap=\"2\">\n  <span>Design</span>\n  <span>Ingénierie</span>\n  <span>Marketing</span>\n  <span>Opérations</span>\n</pura-flex>"
  },
  "de": {
   "description": "Das pura-flex-Primitiv umschließt seine über den Slot eingefügten Kinder in einem Flex-Container und legt Richtung, Abstand, Ausrichtung, Verteilung, Umbruch und Inline-Anzeige als einfache Attribute offen. Das gap-Attribut akzeptiert die Abstandsskala von 1 bis 6 (auf Design-Tokens abgebildet) oder jede rohe CSS-Länge. Es ist ein reiner Layout-Baustein ohne interaktives Verhalten.",
   "attributes": [
    {
     "desc": "Richtung der Hauptachse des Flex-Containers (flex-direction)."
    },
    {
     "desc": "Abstand zwischen den Kindern. Verwende die Abstandsskala von 1 bis 6 (wird zu einem Design-Token aufgelöst) oder jede CSS-Länge wie \"2rem\" oder \"12px\"."
    },
    {
     "desc": "Ausrichtung der Kinder entlang der Querachse (align-items)."
    },
    {
     "desc": "Verteilung der Kinder entlang der Hauptachse (justify-content)."
    },
    {
     "desc": "Wenn vorhanden, dürfen die Kinder auf mehrere Zeilen umbrechen (flex-wrap)."
    },
    {
     "desc": "Wenn vorhanden, wird der Container als inline-flex statt flex gerendert."
    }
   ],
   "demoHTML": "<script type=\"module\" src=\"/pura/lib/flex.js\"></script>\n\n<!-- Row with centered items and a gap -->\n<pura-flex align=\"center\" gap=\"3\">\n  <button>Speichern</button>\n  <button>Abbrechen</button>\n  <span>Zuletzt bearbeitet vor 2 Minuten</span>\n</pura-flex>\n\n<!-- Column layout -->\n<pura-flex direction=\"col\" gap=\"2\">\n  <h3>Konto</h3>\n  <p>Verwalten Sie Ihr Profil und Ihre Einstellungen.</p>\n  <a href=\"/settings\">Einstellungen öffnen</a>\n</pura-flex>\n\n<!-- Space the items apart across the row -->\n<pura-flex justify=\"between\" align=\"center\" gap=\"2rem\">\n  <strong>Dashboard</strong>\n  <button>Neuer Bericht</button>\n</pura-flex>\n\n<!-- Wrapping tag list -->\n<pura-flex wrap gap=\"2\">\n  <span>Design</span>\n  <span>Entwicklung</span>\n  <span>Marketing</span>\n  <span>Betrieb</span>\n</pura-flex>"
  },
  "it": {
   "description": "La primitiva pura-flex avvolge i propri figli dello slot in un contenitore flex, esponendo direzione, gap, allineamento, giustificazione, ritorno a capo e visualizzazione inline come semplici attributi. L'attributo gap accetta la scala di spaziatura da 1 a 6 (mappata sui design token) o qualsiasi lunghezza CSS grezza. È un elemento costitutivo solo di layout, senza comportamento interattivo.",
   "attributes": [
    {
     "desc": "Direzione dell'asse principale del contenitore flex (flex-direction)."
    },
    {
     "desc": "Spaziatura tra i figli. Usa la scala di spaziatura da 1 a 6 (si risolve in un design token) o qualsiasi lunghezza CSS come \"2rem\" o \"12px\"."
    },
    {
     "desc": "Allineamento dei figli sull'asse trasversale (align-items)."
    },
    {
     "desc": "Distribuzione dei figli sull'asse principale (justify-content)."
    },
    {
     "desc": "Quando presente, consente ai figli di andare a capo su più righe (flex-wrap)."
    },
    {
     "desc": "Quando presente, esegue il rendering del contenitore come inline-flex anziché flex."
    }
   ],
   "demoHTML": "<script type=\"module\" src=\"/pura/lib/flex.js\"></script>\n\n<!-- Row with centered items and a gap -->\n<pura-flex align=\"center\" gap=\"3\">\n  <button>Salva</button>\n  <button>Annulla</button>\n  <span>Ultima modifica 2 minuti fa</span>\n</pura-flex>\n\n<!-- Column layout -->\n<pura-flex direction=\"col\" gap=\"2\">\n  <h3>Account</h3>\n  <p>Gestisci il tuo profilo e le tue preferenze.</p>\n  <a href=\"/settings\">Apri le impostazioni</a>\n</pura-flex>\n\n<!-- Space the items apart across the row -->\n<pura-flex justify=\"between\" align=\"center\" gap=\"2rem\">\n  <strong>Dashboard</strong>\n  <button>Nuovo report</button>\n</pura-flex>\n\n<!-- Wrapping tag list -->\n<pura-flex wrap gap=\"2\">\n  <span>Design</span>\n  <span>Ingegneria</span>\n  <span>Marketing</span>\n  <span>Operazioni</span>\n</pura-flex>"
  }
 },
 "grid": {
  "pt-BR": {
   "description": "`<pura-grid>` é um web component nativo que envolve um contêiner CSS grid, expondo controles de layout por meio de atributos simples. Um inteiro puro em `cols` ou `rows` expande para `repeat(n, 1fr)`, enquanto qualquer outro valor é repassado como uma lista de tracks bruta, e `gap` aceita a escala de espaço do tema (1-6) ou qualquer comprimento CSS. Quando `cols` é omitido, ele recorre a um layout responsivo `auto-fit` controlado por `min`, com um valor padrão razoável de track mínima de 16rem.",
   "attributes": [
    {
     "desc": "Tracks de coluna: um inteiro puro vira repeat(n, 1fr), ou passe uma lista de tracks bruta como \"1fr 2fr\" ou \"200px 1fr\". Quando omitido, recorre a um layout auto-fit responsivo."
    },
    {
     "desc": "Tracks de linha: um inteiro puro vira repeat(n, 1fr), ou passe uma lista de tracks bruta."
    },
    {
     "desc": "Gap entre os itens: um valor da escala de espaço (1-6) mapeia para var(--pura-space-N), ou qualquer comprimento CSS como \"2rem\"."
    },
    {
     "desc": "Valor de align-items (start, center, end, stretch, baseline...)."
    },
    {
     "desc": "Valor de justify-items (start, center, end, stretch...)."
    },
    {
     "desc": "Valor de grid-auto-flow (row, column, dense, \"row dense\"...)."
    },
    {
     "desc": "Tamanho mínimo da track para o fallback responsivo auto-fit, aplicado apenas quando cols não está definido."
    }
   ],
   "demoHTML": "<div style=\"display:flex; flex-direction:column; gap:1.5rem\">\n  <pura-grid cols=\"3\" gap=\"3\">\n    <div style=\"background:#eef;padding:1rem;border-radius:8px\">Um</div>\n    <div style=\"background:#eef;padding:1rem;border-radius:8px\">Dois</div>\n    <div style=\"background:#eef;padding:1rem;border-radius:8px\">Três</div>\n  </pura-grid>\n\n  <pura-grid cols=\"1fr 2fr\" gap=\"4\">\n    <div style=\"background:#efe;padding:1rem;border-radius:8px\">Barra lateral</div>\n    <div style=\"background:#efe;padding:1rem;border-radius:8px\">Área de conteúdo principal</div>\n  </pura-grid>\n\n  <pura-grid min=\"12rem\" gap=\"2\">\n    <div style=\"background:#fee;padding:1rem;border-radius:8px\">Auto-fit A</div>\n    <div style=\"background:#fee;padding:1rem;border-radius:8px\">Auto-fit B</div>\n    <div style=\"background:#fee;padding:1rem;border-radius:8px\">Auto-fit C</div>\n    <div style=\"background:#fee;padding:1rem;border-radius:8px\">Auto-fit D</div>\n  </pura-grid>\n</div>\n<script type=\"module\" src=\"/pura/lib/grid.js\"></script>"
  },
  "fr": {
   "description": "`<pura-grid>` est un web component natif qui enveloppe un conteneur CSS grid, exposant les contrôles de mise en page via des attributs simples. Un entier seul sur `cols` ou `rows` se développe en `repeat(n, 1fr)`, tandis que toute autre valeur est transmise telle quelle comme liste de pistes brute, et `gap` accepte l'échelle d'espacement du thème (1-6) ou n'importe quelle longueur CSS. Lorsque `cols` est omis, il revient à une mise en page responsive `auto-fit` pilotée par `min`, avec une piste minimale par défaut raisonnable de 16rem.",
   "attributes": [
    {
     "desc": "Pistes de colonne : un entier seul devient repeat(n, 1fr), ou passez une liste de pistes brute comme \"1fr 2fr\" ou \"200px 1fr\". Lorsqu'il est omis, revient à une mise en page auto-fit responsive."
    },
    {
     "desc": "Pistes de ligne : un entier seul devient repeat(n, 1fr), ou passez une liste de pistes brute."
    },
    {
     "desc": "Espacement entre les éléments : une valeur de l'échelle d'espacement (1-6) correspond à var(--pura-space-N), ou n'importe quelle longueur CSS comme \"2rem\"."
    },
    {
     "desc": "Valeur d'align-items (start, center, end, stretch, baseline...)."
    },
    {
     "desc": "Valeur de justify-items (start, center, end, stretch...)."
    },
    {
     "desc": "Valeur de grid-auto-flow (row, column, dense, \"row dense\"...)."
    },
    {
     "desc": "Taille minimale de piste pour le repli responsive auto-fit, appliquée uniquement lorsque cols n'est pas défini."
    }
   ],
   "demoHTML": "<div style=\"display:flex; flex-direction:column; gap:1.5rem\">\n  <pura-grid cols=\"3\" gap=\"3\">\n    <div style=\"background:#eef;padding:1rem;border-radius:8px\">Un</div>\n    <div style=\"background:#eef;padding:1rem;border-radius:8px\">Deux</div>\n    <div style=\"background:#eef;padding:1rem;border-radius:8px\">Trois</div>\n  </pura-grid>\n\n  <pura-grid cols=\"1fr 2fr\" gap=\"4\">\n    <div style=\"background:#efe;padding:1rem;border-radius:8px\">Barre latérale</div>\n    <div style=\"background:#efe;padding:1rem;border-radius:8px\">Zone de contenu principale</div>\n  </pura-grid>\n\n  <pura-grid min=\"12rem\" gap=\"2\">\n    <div style=\"background:#fee;padding:1rem;border-radius:8px\">Auto-fit A</div>\n    <div style=\"background:#fee;padding:1rem;border-radius:8px\">Auto-fit B</div>\n    <div style=\"background:#fee;padding:1rem;border-radius:8px\">Auto-fit C</div>\n    <div style=\"background:#fee;padding:1rem;border-radius:8px\">Auto-fit D</div>\n  </pura-grid>\n</div>\n<script type=\"module\" src=\"/pura/lib/grid.js\"></script>"
  },
  "de": {
   "description": "`<pura-grid>` ist ein natives Web Component, das einen CSS-Grid-Container umschließt und Layout-Steuerungen über einfache Attribute offenlegt. Eine bloße Ganzzahl bei `cols` oder `rows` wird zu `repeat(n, 1fr)` erweitert, während jeder andere Wert als rohe Track-Liste durchgereicht wird, und `gap` akzeptiert die Abstandsskala des Themes (1-6) oder jede CSS-Länge. Wird `cols` weggelassen, fällt es auf ein responsives `auto-fit`-Layout zurück, das von `min` gesteuert wird, mit einer sinnvollen Mindest-Track von standardmäßig 16rem.",
   "attributes": [
    {
     "desc": "Spalten-Tracks: eine bloße Ganzzahl wird zu repeat(n, 1fr), oder übergib eine rohe Track-Liste wie \"1fr 2fr\" oder \"200px 1fr\". Wird sie weggelassen, fällt es auf ein responsives auto-fit-Layout zurück."
    },
    {
     "desc": "Zeilen-Tracks: eine bloße Ganzzahl wird zu repeat(n, 1fr), oder übergib eine rohe Track-Liste."
    },
    {
     "desc": "Abstand zwischen den Elementen: ein Wert der Abstandsskala (1-6) wird auf var(--pura-space-N) abgebildet, oder jede CSS-Länge wie \"2rem\"."
    },
    {
     "desc": "align-items-Wert (start, center, end, stretch, baseline...)."
    },
    {
     "desc": "justify-items-Wert (start, center, end, stretch...)."
    },
    {
     "desc": "grid-auto-flow-Wert (row, column, dense, \"row dense\"...)."
    },
    {
     "desc": "Mindestgröße der Track für den responsiven auto-fit-Fallback, nur angewendet, wenn cols nicht gesetzt ist."
    }
   ],
   "demoHTML": "<div style=\"display:flex; flex-direction:column; gap:1.5rem\">\n  <pura-grid cols=\"3\" gap=\"3\">\n    <div style=\"background:#eef;padding:1rem;border-radius:8px\">Eins</div>\n    <div style=\"background:#eef;padding:1rem;border-radius:8px\">Zwei</div>\n    <div style=\"background:#eef;padding:1rem;border-radius:8px\">Drei</div>\n  </pura-grid>\n\n  <pura-grid cols=\"1fr 2fr\" gap=\"4\">\n    <div style=\"background:#efe;padding:1rem;border-radius:8px\">Seitenleiste</div>\n    <div style=\"background:#efe;padding:1rem;border-radius:8px\">Hauptinhaltsbereich</div>\n  </pura-grid>\n\n  <pura-grid min=\"12rem\" gap=\"2\">\n    <div style=\"background:#fee;padding:1rem;border-radius:8px\">Auto-fit A</div>\n    <div style=\"background:#fee;padding:1rem;border-radius:8px\">Auto-fit B</div>\n    <div style=\"background:#fee;padding:1rem;border-radius:8px\">Auto-fit C</div>\n    <div style=\"background:#fee;padding:1rem;border-radius:8px\">Auto-fit D</div>\n  </pura-grid>\n</div>\n<script type=\"module\" src=\"/pura/lib/grid.js\"></script>"
  },
  "it": {
   "description": "`<pura-grid>` è un web component nativo che avvolge un contenitore CSS grid, esponendo i controlli di layout tramite semplici attributi. Un intero puro su `cols` o `rows` si espande in `repeat(n, 1fr)`, mentre qualsiasi altro valore viene passato così com'è come elenco di track grezzo, e `gap` accetta la scala di spaziatura del tema (1-6) o qualsiasi lunghezza CSS. Quando `cols` viene omesso, ricade su un layout responsivo `auto-fit` guidato da `min`, con un sensato valore predefinito di track minima di 16rem.",
   "attributes": [
    {
     "desc": "Track di colonna: un intero puro diventa repeat(n, 1fr), oppure passa un elenco di track grezzo come \"1fr 2fr\" o \"200px 1fr\". Quando omesso, ricade su un layout auto-fit responsivo."
    },
    {
     "desc": "Track di riga: un intero puro diventa repeat(n, 1fr), oppure passa un elenco di track grezzo."
    },
    {
     "desc": "Spazio tra gli elementi: un valore della scala di spaziatura (1-6) mappa su var(--pura-space-N), oppure qualsiasi lunghezza CSS come \"2rem\"."
    },
    {
     "desc": "Valore di align-items (start, center, end, stretch, baseline...)."
    },
    {
     "desc": "Valore di justify-items (start, center, end, stretch...)."
    },
    {
     "desc": "Valore di grid-auto-flow (row, column, dense, \"row dense\"...)."
    },
    {
     "desc": "Dimensione minima della track per il fallback responsivo auto-fit, applicata solo quando cols non è impostato."
    }
   ],
   "demoHTML": "<div style=\"display:flex; flex-direction:column; gap:1.5rem\">\n  <pura-grid cols=\"3\" gap=\"3\">\n    <div style=\"background:#eef;padding:1rem;border-radius:8px\">Uno</div>\n    <div style=\"background:#eef;padding:1rem;border-radius:8px\">Due</div>\n    <div style=\"background:#eef;padding:1rem;border-radius:8px\">Tre</div>\n  </pura-grid>\n\n  <pura-grid cols=\"1fr 2fr\" gap=\"4\">\n    <div style=\"background:#efe;padding:1rem;border-radius:8px\">Barra laterale</div>\n    <div style=\"background:#efe;padding:1rem;border-radius:8px\">Area del contenuto principale</div>\n  </pura-grid>\n\n  <pura-grid min=\"12rem\" gap=\"2\">\n    <div style=\"background:#fee;padding:1rem;border-radius:8px\">Auto-fit A</div>\n    <div style=\"background:#fee;padding:1rem;border-radius:8px\">Auto-fit B</div>\n    <div style=\"background:#fee;padding:1rem;border-radius:8px\">Auto-fit C</div>\n    <div style=\"background:#fee;padding:1rem;border-radius:8px\">Auto-fit D</div>\n  </pura-grid>\n</div>\n<script type=\"module\" src=\"/pura/lib/grid.js\"></script>"
  }
 },
 "stack": {
  "pt-BR": {
   "description": "Stack dispõe seus filhos do slot em uma única coluna vertical com espaçamento uniforme controlado por um gap da escala de espaço. Você pode alinhar e justificar os filhos e, opcionalmente, desenhar linhas divisórias finas entre eles. É o primitivo ideal para formulários, listas e qualquer fluxo de cima para baixo.",
   "attributes": [
    {
     "desc": "Escala de espaço 0-6 que define o gap entre os filhos; mapeia para --pura-space-N (0 significa sem gap)."
    },
    {
     "desc": "Alinhamento dos filhos no eixo cruzado: start, center, end ou stretch."
    },
    {
     "desc": "Distribuição dos filhos no eixo principal: start, center, end, between ou around."
    },
    {
     "desc": "Quando presente, desenha uma borda de 1px entre os filhos, usando o valor do gap como padding ao redor de cada divisória."
    }
   ],
   "demoHTML": "<script type=\"module\" src=\"/pura/lib/stack.js\"></script>\n\n<!-- Default stack: gap 4 -->\n<pura-stack>\n  <h3>Configurações da conta</h3>\n  <p>Atualize seu perfil e suas preferências de notificação.</p>\n  <button>Salvar alterações</button>\n</pura-stack>\n\n<!-- Tighter gap, centered children -->\n<pura-stack gap=\"2\" align=\"center\">\n  <strong>Plano: Pro</strong>\n  <span>Renova em 1 de junho</span>\n  <button>Gerenciar assinatura</button>\n</pura-stack>\n\n<!-- Divided list of items -->\n<pura-stack gap=\"3\" divide>\n  <div>Caixa de entrada</div>\n  <div>Com estrela</div>\n  <div>Arquivados</div>\n</pura-stack>"
  },
  "fr": {
   "description": "Stack dispose ses enfants du slot dans une seule colonne verticale avec un espacement régulier contrôlé par un gap de l'échelle d'espacement. Vous pouvez aligner et justifier les enfants et, en option, tracer de fines lignes de séparation entre eux. C'est la primitive de référence pour les formulaires, les listes et tout flux de haut en bas.",
   "attributes": [
    {
     "desc": "Échelle d'espacement 0-6 qui définit l'écart entre les enfants ; correspond à --pura-space-N (0 signifie aucun écart)."
    },
    {
     "desc": "Alignement des enfants sur l'axe transversal : start, center, end ou stretch."
    },
    {
     "desc": "Répartition des enfants sur l'axe principal : start, center, end, between ou around."
    },
    {
     "desc": "Lorsqu'il est présent, trace une bordure de 1px entre les enfants, en utilisant la valeur du gap comme marge intérieure autour de chaque séparateur."
    }
   ],
   "demoHTML": "<script type=\"module\" src=\"/pura/lib/stack.js\"></script>\n\n<!-- Default stack: gap 4 -->\n<pura-stack>\n  <h3>Paramètres du compte</h3>\n  <p>Mettez à jour votre profil et vos préférences de notification.</p>\n  <button>Enregistrer les modifications</button>\n</pura-stack>\n\n<!-- Tighter gap, centered children -->\n<pura-stack gap=\"2\" align=\"center\">\n  <strong>Forfait : Pro</strong>\n  <span>Renouvellement le 1er juin</span>\n  <button>Gérer l'abonnement</button>\n</pura-stack>\n\n<!-- Divided list of items -->\n<pura-stack gap=\"3\" divide>\n  <div>Boîte de réception</div>\n  <div>Suivis</div>\n  <div>Archivés</div>\n</pura-stack>"
  },
  "de": {
   "description": "Stack ordnet seine über den Slot eingefügten Kinder in einer einzelnen vertikalen Spalte mit gleichmäßigem Abstand an, der durch einen Gap aus der Abstandsskala gesteuert wird. Du kannst die Kinder ausrichten und verteilen und optional dünne Trennlinien zwischen ihnen zeichnen. Es ist das bevorzugte Primitiv für Formulare, Listen und jeden Ablauf von oben nach unten.",
   "attributes": [
    {
     "desc": "Abstandsskala 0-6, die den Abstand zwischen den Kindern festlegt; wird auf --pura-space-N abgebildet (0 bedeutet kein Abstand)."
    },
    {
     "desc": "Ausrichtung der Kinder entlang der Querachse: start, center, end oder stretch."
    },
    {
     "desc": "Verteilung der Kinder entlang der Hauptachse: start, center, end, between oder around."
    },
    {
     "desc": "Wenn vorhanden, wird ein 1px-Rahmen zwischen den Kindern gezeichnet, wobei der Gap-Wert als Padding um jede Trennlinie verwendet wird."
    }
   ],
   "demoHTML": "<script type=\"module\" src=\"/pura/lib/stack.js\"></script>\n\n<!-- Default stack: gap 4 -->\n<pura-stack>\n  <h3>Kontoeinstellungen</h3>\n  <p>Aktualisieren Sie Ihr Profil und Ihre Benachrichtigungseinstellungen.</p>\n  <button>Änderungen speichern</button>\n</pura-stack>\n\n<!-- Tighter gap, centered children -->\n<pura-stack gap=\"2\" align=\"center\">\n  <strong>Tarif: Pro</strong>\n  <span>Verlängerung am 1. Juni</span>\n  <button>Abonnement verwalten</button>\n</pura-stack>\n\n<!-- Divided list of items -->\n<pura-stack gap=\"3\" divide>\n  <div>Posteingang</div>\n  <div>Markiert</div>\n  <div>Archiviert</div>\n</pura-stack>"
  },
  "it": {
   "description": "Stack dispone i suoi figli dello slot in un'unica colonna verticale con spaziatura uniforme controllata da un gap della scala di spaziatura. Puoi allineare e giustificare i figli e, facoltativamente, tracciare sottili linee divisorie tra di essi. È la primitiva di riferimento per moduli, elenchi e qualsiasi flusso dall'alto verso il basso.",
   "attributes": [
    {
     "desc": "Scala di spaziatura 0-6 che imposta il gap tra i figli; mappa su --pura-space-N (0 significa nessun gap)."
    },
    {
     "desc": "Allineamento dei figli sull'asse trasversale: start, center, end o stretch."
    },
    {
     "desc": "Distribuzione dei figli sull'asse principale: start, center, end, between o around."
    },
    {
     "desc": "Quando presente, traccia un bordo di 1px tra i figli, usando il valore del gap come padding attorno a ciascuna linea divisoria."
    }
   ],
   "demoHTML": "<script type=\"module\" src=\"/pura/lib/stack.js\"></script>\n\n<!-- Default stack: gap 4 -->\n<pura-stack>\n  <h3>Impostazioni dell'account</h3>\n  <p>Aggiorna il tuo profilo e le preferenze di notifica.</p>\n  <button>Salva le modifiche</button>\n</pura-stack>\n\n<!-- Tighter gap, centered children -->\n<pura-stack gap=\"2\" align=\"center\">\n  <strong>Piano: Pro</strong>\n  <span>Si rinnova il 1° giugno</span>\n  <button>Gestisci l'abbonamento</button>\n</pura-stack>\n\n<!-- Divided list of items -->\n<pura-stack gap=\"3\" divide>\n  <div>Posta in arrivo</div>\n  <div>Speciali</div>\n  <div>Archiviati</div>\n</pura-stack>"
  }
 },
 "center": {
  "pt-BR": {
   "description": "Uma primitiva de layout que posiciona seu conteúdo exatamente no centro de si mesma. Use o atributo axis para restringir a centralização a uma única direção e min-h para dar a ele uma altura mínima em seções hero ou blocos que ocupam toda a viewport. A tematização flui pelos tokens padrão var(--pura-*).",
   "attributes": [
    {
     "desc": "Em qual eixo centralizar. \"both\" centraliza em ambas as direções, \"x\" centraliza horizontalmente mantendo o conteúdo alinhado ao topo, e \"y\" centraliza verticalmente mantendo o conteúdo alinhado à esquerda."
    },
    {
     "desc": "Altura mínima da área de centralização como qualquer comprimento CSS (por exemplo, 100vh, 320px). Útil para seções hero e seções que ocupam toda a viewport."
    }
   ],
   "demoHTML": "<script type=\"module\" src=\"/pura/lib/center.js\"></script>\n\n<!-- Center on both axes inside a tall hero -->\n<pura-center min-h=\"240px\" style=\"background: #f4f4f5; border-radius: 8px;\">\n  <div style=\"text-align: center;\">\n    <h2>Bem-vindo a bordo</h2>\n    <p>Tudo fica perfeitamente no centro.</p>\n  </div>\n</pura-center>\n\n<!-- Horizontal centering only: content stays at the top -->\n<pura-center axis=\"x\" min-h=\"160px\" style=\"background: #eef2ff; border-radius: 8px;\">\n  <button>Centralizado horizontalmente</button>\n</pura-center>\n\n<!-- Vertical centering only: content stays on the left -->\n<pura-center axis=\"y\" min-h=\"160px\" style=\"background: #ecfdf5; border-radius: 8px;\">\n  <span>Centralizado verticalmente</span>\n</pura-center>"
  },
  "fr": {
   "description": "Une primitive de mise en page qui place son contenu exactement au centre d'elle-même. Utilisez l'attribut axis pour limiter le centrage à une seule direction, et min-h pour lui attribuer une hauteur minimale pour les sections hero ou les blocs occupant toute la fenêtre. La thématisation s'effectue via les tokens standard var(--pura-*).",
   "attributes": [
    {
     "desc": "Sur quel axe centrer. \"both\" centre dans les deux directions, \"x\" centre horizontalement tout en gardant le contenu aligné en haut, et \"y\" centre verticalement tout en gardant le contenu aligné à gauche."
    },
    {
     "desc": "Hauteur minimale de la zone de centrage, exprimée par n'importe quelle longueur CSS (par exemple 100vh, 320px). Utile pour les sections hero et les sections occupant toute la fenêtre."
    }
   ],
   "demoHTML": "<script type=\"module\" src=\"/pura/lib/center.js\"></script>\n\n<!-- Center on both axes inside a tall hero -->\n<pura-center min-h=\"240px\" style=\"background: #f4f4f5; border-radius: 8px;\">\n  <div style=\"text-align: center;\">\n    <h2>Bienvenue à bord</h2>\n    <p>Tout se place parfaitement au centre.</p>\n  </div>\n</pura-center>\n\n<!-- Horizontal centering only: content stays at the top -->\n<pura-center axis=\"x\" min-h=\"160px\" style=\"background: #eef2ff; border-radius: 8px;\">\n  <button>Centré horizontalement</button>\n</pura-center>\n\n<!-- Vertical centering only: content stays on the left -->\n<pura-center axis=\"y\" min-h=\"160px\" style=\"background: #ecfdf5; border-radius: 8px;\">\n  <span>Centré verticalement</span>\n</pura-center>"
  },
  "de": {
   "description": "Ein Layout-Primitive, das seinen Inhalt genau in seiner Mitte platziert. Verwenden Sie das axis-Attribut, um die Zentrierung auf eine einzelne Richtung zu beschränken, und min-h, um ihm eine Mindesthöhe für Hero-Bereiche oder bildschirmfüllende Blöcke zu geben. Das Theming erfolgt über die standardmäßigen var(--pura-*)-Tokens.",
   "attributes": [
    {
     "desc": "Auf welcher Achse zentriert werden soll. \"both\" zentriert in beide Richtungen, \"x\" zentriert horizontal und hält den Inhalt oben ausgerichtet, und \"y\" zentriert vertikal und hält den Inhalt links ausgerichtet."
    },
    {
     "desc": "Mindesthöhe des Zentrierungsbereichs als beliebige CSS-Länge (z. B. 100vh, 320px). Nützlich für Hero-Bereiche und bildschirmfüllende Abschnitte."
    }
   ],
   "demoHTML": "<script type=\"module\" src=\"/pura/lib/center.js\"></script>\n\n<!-- Center on both axes inside a tall hero -->\n<pura-center min-h=\"240px\" style=\"background: #f4f4f5; border-radius: 8px;\">\n  <div style=\"text-align: center;\">\n    <h2>Willkommen an Bord</h2>\n    <p>Alles sitzt perfekt in der Mitte.</p>\n  </div>\n</pura-center>\n\n<!-- Horizontal centering only: content stays at the top -->\n<pura-center axis=\"x\" min-h=\"160px\" style=\"background: #eef2ff; border-radius: 8px;\">\n  <button>Horizontal zentriert</button>\n</pura-center>\n\n<!-- Vertical centering only: content stays on the left -->\n<pura-center axis=\"y\" min-h=\"160px\" style=\"background: #ecfdf5; border-radius: 8px;\">\n  <span>Vertikal zentriert</span>\n</pura-center>"
  },
  "it": {
   "description": "Una primitiva di layout che colloca il suo contenuto esattamente al centro di sé stessa. Usa l'attributo axis per limitare la centratura a una singola direzione e min-h per assegnarle un'altezza minima per sezioni hero o blocchi a tutta viewport. La tematizzazione avviene tramite i token standard var(--pura-*).",
   "attributes": [
    {
     "desc": "Su quale asse centrare. \"both\" centra in entrambe le direzioni, \"x\" centra orizzontalmente mantenendo il contenuto allineato in alto, e \"y\" centra verticalmente mantenendo il contenuto allineato a sinistra."
    },
    {
     "desc": "Altezza minima dell'area di centratura espressa con qualsiasi lunghezza CSS (ad esempio 100vh, 320px). Utile per sezioni hero e sezioni a tutta viewport."
    }
   ],
   "demoHTML": "<script type=\"module\" src=\"/pura/lib/center.js\"></script>\n\n<!-- Center on both axes inside a tall hero -->\n<pura-center min-h=\"240px\" style=\"background: #f4f4f5; border-radius: 8px;\">\n  <div style=\"text-align: center;\">\n    <h2>Benvenuto a bordo</h2>\n    <p>Tutto si posiziona perfettamente al centro.</p>\n  </div>\n</pura-center>\n\n<!-- Horizontal centering only: content stays at the top -->\n<pura-center axis=\"x\" min-h=\"160px\" style=\"background: #eef2ff; border-radius: 8px;\">\n  <button>Centrato orizzontalmente</button>\n</pura-center>\n\n<!-- Vertical centering only: content stays on the left -->\n<pura-center axis=\"y\" min-h=\"160px\" style=\"background: #ecfdf5; border-radius: 8px;\">\n  <span>Centrato verticalmente</span>\n</pura-center>"
  }
 },
 "spacer": {
  "pt-BR": {
   "description": "O Spacer renderiza uma caixa vazia usada para criar espaçamentos em um layout. Com um atributo size, ele produz um espaçamento fixo a partir da escala de espaçamento (passos de 1 a 6) ou qualquer comprimento CSS, funcionando tanto no fluxo de bloco normal quanto ao longo do eixo principal de um contêiner flex. Sem size, ele cresce para preencher o espaço disponível, afastando os irmãos flex.",
   "attributes": [
    {
     "desc": "Passo da escala de espaçamento (1-6, mapeado para var(--pura-space-N)) ou qualquer comprimento CSS bruto (por exemplo, 2rem, 24px). Quando omitido, o spacer cresce para preencher o espaço disponível (flex: 1) e fica inerte no fluxo de bloco normal."
    }
   ],
   "demoHTML": "<script type=\"module\" src=\"/pura/lib/spacer.js\"></script>\n\n<!-- Fixed vertical gaps in normal block flow -->\n<p>Primeiro parágrafo acima do espaço.</p>\n<pura-spacer size=\"4\"></pura-spacer>\n<p>Segundo parágrafo, empurrado para baixo por um espaço da escala.</p>\n<pura-spacer size=\"2rem\"></pura-spacer>\n<p>Terceiro parágrafo, empurrado para baixo por um espaço personalizado de 2rem.</p>\n\n<!-- Flexible spacer pushing siblings to opposite ends of a row -->\n<div style=\"display: flex; align-items: center; padding: 12px; border: 1px solid #ccc;\">\n  <strong>Marca</strong>\n  <pura-spacer></pura-spacer>\n  <button>Entrar</button>\n</div>"
  },
  "fr": {
   "description": "Spacer rend une boîte vide utilisée pour créer des espaces dans une mise en page. Avec un attribut size, il produit un espace fixe issu de l'échelle d'espacement (étapes 1 à 6) ou n'importe quelle longueur CSS, fonctionnant aussi bien dans le flux de bloc normal que le long de l'axe principal d'un conteneur flex. Sans size, il s'étire pour remplir l'espace disponible, écartant les éléments flex voisins.",
   "attributes": [
    {
     "desc": "Étape de l'échelle d'espacement (1-6, mappée sur var(--pura-space-N)) ou n'importe quelle longueur CSS brute (par exemple 2rem, 24px). Lorsqu'il est omis, le spacer s'étire pour remplir l'espace disponible (flex: 1) et reste inerte dans le flux de bloc normal."
    }
   ],
   "demoHTML": "<script type=\"module\" src=\"/pura/lib/spacer.js\"></script>\n\n<!-- Fixed vertical gaps in normal block flow -->\n<p>Premier paragraphe au-dessus de l'espace.</p>\n<pura-spacer size=\"4\"></pura-spacer>\n<p>Deuxième paragraphe, repoussé vers le bas par un espace de l'échelle.</p>\n<pura-spacer size=\"2rem\"></pura-spacer>\n<p>Troisième paragraphe, repoussé vers le bas par un espace personnalisé de 2rem.</p>\n\n<!-- Flexible spacer pushing siblings to opposite ends of a row -->\n<div style=\"display: flex; align-items: center; padding: 12px; border: 1px solid #ccc;\">\n  <strong>Marque</strong>\n  <pura-spacer></pura-spacer>\n  <button>Se connecter</button>\n</div>"
  },
  "de": {
   "description": "Spacer rendert eine leere Box, die zum Erzeugen von Abständen in einem Layout dient. Mit einem size-Attribut erzeugt es einen festen Abstand aus der Abstandsskala (Stufen 1 bis 6) oder einer beliebigen CSS-Länge und funktioniert sowohl im normalen Blockfluss als auch entlang der Hauptachse eines Flex-Containers. Ohne size wächst es, um den verfügbaren Platz zu füllen, und drückt Flex-Geschwister auseinander.",
   "attributes": [
    {
     "desc": "Stufe der Abstandsskala (1-6, zugeordnet zu var(--pura-space-N)) oder eine beliebige reine CSS-Länge (z. B. 2rem, 24px). Wird sie weggelassen, wächst der Spacer, um den verfügbaren Platz zu füllen (flex: 1), und bleibt im normalen Blockfluss inaktiv."
    }
   ],
   "demoHTML": "<script type=\"module\" src=\"/pura/lib/spacer.js\"></script>\n\n<!-- Fixed vertical gaps in normal block flow -->\n<p>Erster Absatz oberhalb des Abstands.</p>\n<pura-spacer size=\"4\"></pura-spacer>\n<p>Zweiter Absatz, nach unten geschoben durch einen Abstand aus der Skala.</p>\n<pura-spacer size=\"2rem\"></pura-spacer>\n<p>Dritter Absatz, nach unten geschoben durch einen benutzerdefinierten Abstand von 2rem.</p>\n\n<!-- Flexible spacer pushing siblings to opposite ends of a row -->\n<div style=\"display: flex; align-items: center; padding: 12px; border: 1px solid #ccc;\">\n  <strong>Marke</strong>\n  <pura-spacer></pura-spacer>\n  <button>Anmelden</button>\n</div>"
  },
  "it": {
   "description": "Spacer esegue il rendering di un riquadro vuoto usato per creare spazi in un layout. Con un attributo size produce uno spazio fisso dalla scala di spaziatura (passi da 1 a 6) o da qualsiasi lunghezza CSS, funzionando sia nel normale flusso di blocco sia lungo l'asse principale di un contenitore flex. Senza size si espande per riempire lo spazio disponibile, allontanando gli elementi flex adiacenti.",
   "attributes": [
    {
     "desc": "Passo della scala di spaziatura (1-6, mappato su var(--pura-space-N)) o qualsiasi lunghezza CSS grezza (ad esempio 2rem, 24px). Se omesso, lo spacer si espande per riempire lo spazio disponibile (flex: 1) e resta inerte nel normale flusso di blocco."
    }
   ],
   "demoHTML": "<script type=\"module\" src=\"/pura/lib/spacer.js\"></script>\n\n<!-- Fixed vertical gaps in normal block flow -->\n<p>Primo paragrafo sopra lo spazio.</p>\n<pura-spacer size=\"4\"></pura-spacer>\n<p>Secondo paragrafo, spinto verso il basso da uno spazio della scala.</p>\n<pura-spacer size=\"2rem\"></pura-spacer>\n<p>Terzo paragrafo, spinto verso il basso da uno spazio personalizzato di 2rem.</p>\n\n<!-- Flexible spacer pushing siblings to opposite ends of a row -->\n<div style=\"display: flex; align-items: center; padding: 12px; border: 1px solid #ccc;\">\n  <strong>Brand</strong>\n  <pura-spacer></pura-spacer>\n  <button>Accedi</button>\n</div>"
  }
 },
 "section": {
  "pt-BR": {
   "description": "<pura-section> renderiza um <section> semântico com padding vertical da escala de espaçamento, mantendo o espaçamento entre as regiões da página consistente. Adicione o atributo container para centralizar seu conteúdo dentro de uma largura máxima confortável para leitura e defina bg para preencher a seção com um token de design ou qualquer cor CSS. É uma primitiva de layout destinada a envolver os principais blocos de uma página.",
   "attributes": [
    {
     "desc": "Padding vertical na escala de espaçamento (1 a 6). Mapeia para o token --pura-space-{n}, recorrendo a --pura-space-6."
    },
    {
     "desc": "Quando presente, centraliza o conteúdo dentro de uma largura máxima legível (65rem) usando margens inline automáticas."
    },
    {
     "desc": "Preenchimento de fundo. Um nome de token simples (por exemplo, \"subtle\") resolve para sua variável --pura-*; qualquer outro valor (por exemplo, uma cor hexadecimal) é usado literalmente como valor CSS."
    }
   ],
   "demoHTML": "<pura-section container>\n  <h2>Bem-vindo ao Pura</h2>\n  <p>Uma seção primitiva com espaçamento vertical padrão e uma largura centralizada e legível.</p>\n</pura-section>\n\n<pura-section bg=\"subtle\" py=\"4\" container>\n  <h2>Fundo com tom suave</h2>\n  <p>Esta seção usa o token de design \"subtle\" como fundo e um espaçamento mais compacto.</p>\n</pura-section>\n\n<pura-section bg=\"#0f172a\" py=\"6\">\n  <p style=\"color: #fff;\">Uma seção que ocupa toda a largura com fundo de cor personalizada e espaçamento generoso.</p>\n</pura-section>"
  },
  "fr": {
   "description": "<pura-section> rend un <section> sémantique avec un padding vertical issu de l'échelle d'espacement, ce qui maintient l'espacement entre les régions de la page cohérent. Ajoutez l'attribut container pour centrer son contenu dans une largeur maximale confortable à lire, et définissez bg pour remplir la section avec un token de design ou n'importe quelle couleur CSS. C'est une primitive de mise en page destinée à envelopper les principaux blocs d'une page.",
   "attributes": [
    {
     "desc": "Padding vertical sur l'échelle d'espacement (1 à 6). Mappé sur le token --pura-space-{n}, avec repli sur --pura-space-6."
    },
    {
     "desc": "Lorsqu'il est présent, centre le contenu dans une largeur maximale lisible (65rem) à l'aide de marges inline automatiques."
    },
    {
     "desc": "Remplissage d'arrière-plan. Un simple nom de token (par exemple \"subtle\") se résout en sa variable --pura-*; toute autre valeur (par exemple une couleur hexadécimale) est utilisée telle quelle comme valeur CSS."
    }
   ],
   "demoHTML": "<pura-section container>\n  <h2>Bienvenue sur Pura</h2>\n  <p>Une section primitive avec un espacement vertical par défaut et une largeur centrée et lisible.</p>\n</pura-section>\n\n<pura-section bg=\"subtle\" py=\"4\" container>\n  <h2>Arrière-plan teinté</h2>\n  <p>Cette section utilise le jeton de design \"subtle\" comme arrière-plan et un espacement plus resserré.</p>\n</pura-section>\n\n<pura-section bg=\"#0f172a\" py=\"6\">\n  <p style=\"color: #fff;\">Une section pleine largeur avec un arrière-plan de couleur personnalisée et un espacement généreux.</p>\n</pura-section>"
  },
  "de": {
   "description": "<pura-section> rendert ein semantisches <section> mit vertikalem Padding aus der Abstandsskala und sorgt so für konsistente Abstände zwischen den Seitenbereichen. Fügen Sie das container-Attribut hinzu, um seinen Inhalt innerhalb einer angenehm lesbaren maximalen Breite zu zentrieren, und setzen Sie bg, um den Abschnitt mit einem Design-Token oder einer beliebigen CSS-Farbe zu füllen. Es ist ein Layout-Primitive, das die wesentlichen Blöcke einer Seite umschließen soll.",
   "attributes": [
    {
     "desc": "Vertikales Padding auf der Abstandsskala (1 bis 6). Wird dem Token --pura-space-{n} zugeordnet, mit Rückgriff auf --pura-space-6."
    },
    {
     "desc": "Wenn vorhanden, zentriert es den Inhalt innerhalb einer lesbaren maximalen Breite (65rem) mithilfe automatischer Inline-Ränder."
    },
    {
     "desc": "Hintergrundfüllung. Ein bloßer Token-Name (z. B. \"subtle\") wird zu seiner --pura-*-Variable aufgelöst; jeder andere Wert (z. B. eine Hex-Farbe) wird wörtlich als CSS-Wert verwendet."
    }
   ],
   "demoHTML": "<pura-section container>\n  <h2>Willkommen bei Pura</h2>\n  <p>Ein primitiver Abschnitt mit standardmäßigem vertikalem Abstand und einer zentrierten, gut lesbaren Breite.</p>\n</pura-section>\n\n<pura-section bg=\"subtle\" py=\"4\" container>\n  <h2>Getönter Hintergrund</h2>\n  <p>Dieser Abschnitt nutzt das Design-Token \"subtle\" als Hintergrund und einen engeren Abstand.</p>\n</pura-section>\n\n<pura-section bg=\"#0f172a\" py=\"6\">\n  <p style=\"color: #fff;\">Ein Abschnitt über die volle Breite mit einem benutzerdefinierten Farbhintergrund und großzügigem Abstand.</p>\n</pura-section>"
  },
  "it": {
   "description": "<pura-section> esegue il rendering di un <section> semantico con padding verticale dalla scala di spaziatura, mantenendo coerente la spaziatura tra le regioni della pagina. Aggiungi l'attributo container per centrare il suo contenuto entro una larghezza massima comoda da leggere e imposta bg per riempire la sezione con un token di design o qualsiasi colore CSS. È una primitiva di layout pensata per avvolgere i blocchi principali di una pagina.",
   "attributes": [
    {
     "desc": "Padding verticale sulla scala di spaziatura (da 1 a 6). Mappato sul token --pura-space-{n}, con ripiego su --pura-space-6."
    },
    {
     "desc": "Quando presente, centra il contenuto entro una larghezza massima leggibile (65rem) usando margini inline automatici."
    },
    {
     "desc": "Riempimento di sfondo. Un semplice nome di token (ad esempio \"subtle\") si risolve nella sua variabile --pura-*; qualsiasi altro valore (ad esempio un colore esadecimale) viene usato letteralmente come valore CSS."
    }
   ],
   "demoHTML": "<pura-section container>\n  <h2>Benvenuto in Pura</h2>\n  <p>Una sezione primitiva con spaziatura verticale predefinita e una larghezza centrata e leggibile.</p>\n</pura-section>\n\n<pura-section bg=\"subtle\" py=\"4\" container>\n  <h2>Sfondo tenue</h2>\n  <p>Questa sezione usa il token di design \"subtle\" come sfondo e una spaziatura più compatta.</p>\n</pura-section>\n\n<pura-section bg=\"#0f172a\" py=\"6\">\n  <p style=\"color: #fff;\">Una sezione a tutta larghezza con uno sfondo di colore personalizzato e spaziatura generosa.</p>\n</pura-section>"
  }
 },
 "text": {
  "pt-BR": {
   "description": "<pura-text> renderiza um parágrafo por padrão, um span quando inline, ou qualquer um entre p/span/div por meio do atributo as. Ele expõe escalas de tamanho, peso, cor, alinhamento e entrelinha mapeadas para tokens de design, além de uma opção de truncamento em uma única linha. Tematize-o pelos tokens var(--pura-*) e mire em seu elemento renderizado com a parte CSS \"text\".",
   "attributes": [
    {
     "desc": "Escala de tamanho de fonte, mapeada para os tokens --pura-text-*."
    },
    {
     "desc": "Peso da fonte (400 / 500 / 600 / 700)."
    },
    {
     "desc": "Cor do texto, mapeada para o token de tema correspondente."
    },
    {
     "desc": "Alinhamento horizontal do texto."
    },
    {
     "desc": "Altura de linha (1.25 / 1.5 / 1.75)."
    },
    {
     "desc": "Limita o texto a uma única linha com reticências."
    },
    {
     "desc": "Renderiza um <span> e é exibido inline em vez de um <p> de bloco."
    },
    {
     "desc": "Substituição explícita da tag do elemento renderizado."
    }
   ],
   "demoHTML": "<script type=\"module\" src=\"/pura/lib/text.js\"></script>\n\n<pura-text size=\"xl\" weight=\"bold\">Bem-vindo ao Pura</pura-text>\n<pura-text color=\"muted\">Um pequeno conjunto de componentes primitivos para construir interfaces.</pura-text>\n<pura-text size=\"lg\" weight=\"semibold\" color=\"primary\" align=\"center\">Título centralizado e em destaque</pura-text>\n<pura-text leading=\"relaxed\">\n  Este parágrafo usa entrelinha relaxada para que passagens mais longas de texto\n  permaneçam confortáveis de ler em várias linhas.\n</pura-text>\n<pura-text color=\"danger\" weight=\"medium\">Algo deu errado. Tente novamente.</pura-text>\n<pura-text>\n  Status:\n  <pura-text inline color=\"success\" weight=\"semibold\">Online</pura-text>\n</pura-text>\n<pura-text truncate style=\"max-width: 240px\">\n  Esta é uma linha de texto muito longa que será truncada com reticências quando transbordar.\n</pura-text>"
  },
  "fr": {
   "description": "<pura-text> rend un paragraphe par défaut, un span lorsqu'il est en ligne, ou n'importe lequel parmi p/span/div via l'attribut as. Il expose des échelles de taille, de graisse, de couleur, d'alignement et d'interligne mappées sur des tokens de design, ainsi qu'une option de troncature sur une seule ligne. Thématisez-le via les tokens var(--pura-*) et ciblez son élément rendu avec la partie CSS \"text\".",
   "attributes": [
    {
     "desc": "Échelle de taille de police, mappée sur les tokens --pura-text-*."
    },
    {
     "desc": "Graisse de la police (400 / 500 / 600 / 700)."
    },
    {
     "desc": "Couleur du texte, mappée sur le token de thème correspondant."
    },
    {
     "desc": "Alignement horizontal du texte."
    },
    {
     "desc": "Hauteur de ligne (1.25 / 1.5 / 1.75)."
    },
    {
     "desc": "Limite le texte à une seule ligne avec des points de suspension."
    },
    {
     "desc": "Rend un <span> et s'affiche en ligne au lieu d'un <p> de bloc."
    },
    {
     "desc": "Remplacement explicite de la balise de l'élément rendu."
    }
   ],
   "demoHTML": "<script type=\"module\" src=\"/pura/lib/text.js\"></script>\n\n<pura-text size=\"xl\" weight=\"bold\">Bienvenue sur Pura</pura-text>\n<pura-text color=\"muted\">Un petit ensemble de composants primitifs pour construire des interfaces.</pura-text>\n<pura-text size=\"lg\" weight=\"semibold\" color=\"primary\" align=\"center\">Titre centré et mis en avant</pura-text>\n<pura-text leading=\"relaxed\">\n  Ce paragraphe utilise un interligne aéré afin que les passages de texte plus longs\n  restent confortables à lire sur plusieurs lignes.\n</pura-text>\n<pura-text color=\"danger\" weight=\"medium\">Une erreur s'est produite. Veuillez réessayer.</pura-text>\n<pura-text>\n  Statut :\n  <pura-text inline color=\"success\" weight=\"semibold\">En ligne</pura-text>\n</pura-text>\n<pura-text truncate style=\"max-width: 240px\">\n  Ceci est une très longue ligne de texte qui sera tronquée par des points de suspension en cas de débordement.\n</pura-text>"
  },
  "de": {
   "description": "<pura-text> rendert standardmäßig einen Absatz, ein span bei Inline-Verwendung oder eines von p/span/div über das as-Attribut. Es stellt Skalen für Größe, Gewicht, Farbe, Ausrichtung und Zeilenhöhe bereit, die auf Design-Tokens abgebildet sind, sowie eine Option zum einzeiligen Abschneiden. Gestalten Sie es über die var(--pura-*)-Tokens und sprechen Sie sein gerendertes Element über den CSS-Part \"text\" an.",
   "attributes": [
    {
     "desc": "Schriftgrößenskala, abgebildet auf die --pura-text-*-Tokens."
    },
    {
     "desc": "Schriftgewicht (400 / 500 / 600 / 700)."
    },
    {
     "desc": "Textfarbe, abgebildet auf das entsprechende Theme-Token."
    },
    {
     "desc": "Horizontale Textausrichtung."
    },
    {
     "desc": "Zeilenhöhe (1.25 / 1.5 / 1.75)."
    },
    {
     "desc": "Beschränkt den Text auf eine einzelne Zeile mit Auslassungspunkten."
    },
    {
     "desc": "Rendert ein <span> und wird inline statt als Block-<p> angezeigt."
    },
    {
     "desc": "Explizite Überschreibung des Tags für das gerenderte Element."
    }
   ],
   "demoHTML": "<script type=\"module\" src=\"/pura/lib/text.js\"></script>\n\n<pura-text size=\"xl\" weight=\"bold\">Willkommen bei Pura</pura-text>\n<pura-text color=\"muted\">Ein kleiner Satz primitiver Komponenten zum Erstellen von Oberflächen.</pura-text>\n<pura-text size=\"lg\" weight=\"semibold\" color=\"primary\" align=\"center\">Zentrierte, hervorgehobene Überschrift</pura-text>\n<pura-text leading=\"relaxed\">\n  Dieser Absatz verwendet einen entspannten Zeilenabstand, damit längere Textpassagen\n  über mehrere Zeilen hinweg angenehm lesbar bleiben.\n</pura-text>\n<pura-text color=\"danger\" weight=\"medium\">Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.</pura-text>\n<pura-text>\n  Status:\n  <pura-text inline color=\"success\" weight=\"semibold\">Online</pura-text>\n</pura-text>\n<pura-text truncate style=\"max-width: 240px\">\n  Dies ist eine sehr lange Textzeile, die bei Überlauf mit Auslassungspunkten gekürzt wird.\n</pura-text>"
  },
  "it": {
   "description": "<pura-text> esegue il rendering di un paragrafo per impostazione predefinita, di uno span quando inline, o di uno qualsiasi tra p/span/div tramite l'attributo as. Espone scale di dimensione, peso, colore, allineamento e interlinea mappate su token di design, oltre a un'opzione di troncamento su singola riga. Tematizzalo tramite i token var(--pura-*) e individua il suo elemento renderizzato con la parte CSS \"text\".",
   "attributes": [
    {
     "desc": "Scala della dimensione del carattere, mappata sui token --pura-text-*."
    },
    {
     "desc": "Peso del carattere (400 / 500 / 600 / 700)."
    },
    {
     "desc": "Colore del testo, mappato sul token di tema corrispondente."
    },
    {
     "desc": "Allineamento orizzontale del testo."
    },
    {
     "desc": "Altezza di riga (1.25 / 1.5 / 1.75)."
    },
    {
     "desc": "Limita il testo a una singola riga con i puntini di sospensione."
    },
    {
     "desc": "Esegue il rendering di uno <span> e viene visualizzato inline anziché come <p> di blocco."
    },
    {
     "desc": "Sostituzione esplicita del tag per l'elemento renderizzato."
    }
   ],
   "demoHTML": "<script type=\"module\" src=\"/pura/lib/text.js\"></script>\n\n<pura-text size=\"xl\" weight=\"bold\">Benvenuto in Pura</pura-text>\n<pura-text color=\"muted\">Un piccolo insieme di componenti primitivi per costruire interfacce.</pura-text>\n<pura-text size=\"lg\" weight=\"semibold\" color=\"primary\" align=\"center\">Titolo centrato ed evidenziato</pura-text>\n<pura-text leading=\"relaxed\">\n  Questo paragrafo usa un'interlinea rilassata affinché i passaggi di testo più lunghi\n  restino comodi da leggere su più righe.\n</pura-text>\n<pura-text color=\"danger\" weight=\"medium\">Qualcosa è andato storto. Riprova.</pura-text>\n<pura-text>\n  Stato:\n  <pura-text inline color=\"success\" weight=\"semibold\">Online</pura-text>\n</pura-text>\n<pura-text truncate style=\"max-width: 240px\">\n  Questa è una riga di testo molto lunga che verrà troncata con i puntini di sospensione in caso di overflow.\n</pura-text>"
  }
 },
 "heading": {
  "pt-BR": {
   "description": "pura-heading renderiza um elemento de título real (h1 a h6) em seu shadow root com base no atributo level, de modo que a estrutura do documento permaneça semanticamente correta. Tamanho visual, peso, cor, alinhamento e espaçamento entre letras são controlados separadamente por meio de tokens, permitindo desacoplar a aparência de um título de onde ele se posiciona na hierarquia. Todos os tamanhos e cores remetem aos tokens de design Pura, de modo que os títulos permanecem consistentes entre os temas.",
   "attributes": [
    {
     "desc": "Nível semântico do título. Renderiza a tag h1-h6 correspondente e define o tamanho visual padrão quando nenhum size é informado."
    },
    {
     "desc": "Substitui o tamanho visual independentemente do nível semântico."
    },
    {
     "desc": "Peso da fonte do texto do título."
    },
    {
     "desc": "Cor do texto, mapeada para um token de cor Pura."
    },
    {
     "desc": "Alinhamento horizontal do texto."
    },
    {
     "desc": "Espaçamento entre letras do texto do título."
    }
   ],
   "demoHTML": "<script type=\"module\" src=\"/pura/lib/heading.js\"></script>\n\n<pura-heading level=\"1\">Bem-vindo ao Pura</pura-heading>\n<pura-heading level=\"2\" color=\"muted\">Um kit de componentes pequeno e orientado por tokens</pura-heading>\n\n<pura-heading level=\"2\" size=\"3xl\" color=\"primary\">Grande e marcante</pura-heading>\n<pura-heading level=\"3\" weight=\"500\" tracking=\"wide\">Mais leve, com espaçamento amplo</pura-heading>\n<pura-heading level=\"2\" align=\"center\" color=\"accent\">Título de destaque centralizado</pura-heading>\n<pura-heading level=\"4\" size=\"sm\" color=\"danger\">Rótulo compacto de perigo</pura-heading>"
  },
  "fr": {
   "description": "pura-heading rend un véritable élément de titre (h1 à h6) dans son shadow root en fonction de l'attribut level, de sorte que la structure du document reste sémantiquement correcte. La taille visuelle, la graisse, la couleur, l'alignement et l'interlettrage sont contrôlés séparément via des tokens, ce qui permet de découpler l'apparence d'un titre de sa place dans la hiérarchie. Toutes les tailles et couleurs renvoient aux tokens de design Pura, afin que les titres restent cohérents d'un thème à l'autre.",
   "attributes": [
    {
     "desc": "Niveau sémantique du titre. Rend la balise h1-h6 correspondante et définit la taille visuelle par défaut lorsque aucun size n'est fourni."
    },
    {
     "desc": "Remplace la taille visuelle indépendamment du niveau sémantique."
    },
    {
     "desc": "Graisse de la police du texte du titre."
    },
    {
     "desc": "Couleur du texte, mappée sur un token de couleur Pura."
    },
    {
     "desc": "Alignement horizontal du texte."
    },
    {
     "desc": "Interlettrage du texte du titre."
    }
   ],
   "demoHTML": "<script type=\"module\" src=\"/pura/lib/heading.js\"></script>\n\n<pura-heading level=\"1\">Bienvenue sur Pura</pura-heading>\n<pura-heading level=\"2\" color=\"muted\">Un petit kit de composants piloté par des jetons</pura-heading>\n\n<pura-heading level=\"2\" size=\"3xl\" color=\"primary\">Grand et audacieux</pura-heading>\n<pura-heading level=\"3\" weight=\"500\" tracking=\"wide\">Plus léger, avec un espacement large</pura-heading>\n<pura-heading level=\"2\" align=\"center\" color=\"accent\">Titre d'accentuation centré</pura-heading>\n<pura-heading level=\"4\" size=\"sm\" color=\"danger\">Étiquette de danger compacte</pura-heading>"
  },
  "de": {
   "description": "pura-heading rendert ein echtes Überschriftenelement (h1 bis h6) in seinem Shadow Root basierend auf dem level-Attribut, sodass die Dokumentgliederung semantisch korrekt bleibt. Visuelle Größe, Gewicht, Farbe, Ausrichtung und Buchstabenabstand werden separat über Tokens gesteuert, wodurch Sie das Aussehen einer Überschrift von ihrer Position in der Hierarchie entkoppeln können. Alle Größen und Farben führen auf Pura-Design-Tokens zurück, sodass Überschriften über alle Themes hinweg konsistent bleiben.",
   "attributes": [
    {
     "desc": "Semantische Überschriftenebene. Rendert das passende h1-h6-Tag und legt die standardmäßige visuelle Größe fest, wenn kein size angegeben ist."
    },
    {
     "desc": "Überschreibt die visuelle Größe unabhängig von der semantischen Ebene."
    },
    {
     "desc": "Schriftgewicht des Überschriftentextes."
    },
    {
     "desc": "Textfarbe, abgebildet auf ein Pura-Farb-Token."
    },
    {
     "desc": "Horizontale Textausrichtung."
    },
    {
     "desc": "Buchstabenabstand des Überschriftentextes."
    }
   ],
   "demoHTML": "<script type=\"module\" src=\"/pura/lib/heading.js\"></script>\n\n<pura-heading level=\"1\">Willkommen bei Pura</pura-heading>\n<pura-heading level=\"2\" color=\"muted\">Ein kleines, token-gesteuertes Komponenten-Kit</pura-heading>\n\n<pura-heading level=\"2\" size=\"3xl\" color=\"primary\">Groß und kräftig</pura-heading>\n<pura-heading level=\"3\" weight=\"500\" tracking=\"wide\">Leichter, mit weiterem Zeichenabstand</pura-heading>\n<pura-heading level=\"2\" align=\"center\" color=\"accent\">Zentrierte Akzent-Überschrift</pura-heading>\n<pura-heading level=\"4\" size=\"sm\" color=\"danger\">Kompaktes Gefahren-Label</pura-heading>"
  },
  "it": {
   "description": "pura-heading esegue il rendering di un vero elemento di intestazione (da h1 a h6) nel suo shadow root in base all'attributo level, in modo che la struttura del documento rimanga semanticamente corretta. Dimensione visiva, peso, colore, allineamento e spaziatura tra le lettere sono controllati separatamente tramite token, consentendo di disaccoppiare l'aspetto di un'intestazione dalla sua posizione nella gerarchia. Tutte le dimensioni e i colori si riconducono ai token di design Pura, così le intestazioni restano coerenti tra i temi.",
   "attributes": [
    {
     "desc": "Livello semantico dell'intestazione. Esegue il rendering del tag h1-h6 corrispondente e imposta la dimensione visiva predefinita quando non viene fornito alcun size."
    },
    {
     "desc": "Sovrascrive la dimensione visiva indipendentemente dal livello semantico."
    },
    {
     "desc": "Peso del carattere del testo dell'intestazione."
    },
    {
     "desc": "Colore del testo, mappato su un token di colore Pura."
    },
    {
     "desc": "Allineamento orizzontale del testo."
    },
    {
     "desc": "Spaziatura tra le lettere del testo dell'intestazione."
    }
   ],
   "demoHTML": "<script type=\"module\" src=\"/pura/lib/heading.js\"></script>\n\n<pura-heading level=\"1\">Benvenuto in Pura</pura-heading>\n<pura-heading level=\"2\" color=\"muted\">Un piccolo kit di componenti guidato dai token</pura-heading>\n\n<pura-heading level=\"2\" size=\"3xl\" color=\"primary\">Grande e deciso</pura-heading>\n<pura-heading level=\"3\" weight=\"500\" tracking=\"wide\">Più leggero, con spaziatura ampia</pura-heading>\n<pura-heading level=\"2\" align=\"center\" color=\"accent\">Titolo d'accento centrato</pura-heading>\n<pura-heading level=\"4\" size=\"sm\" color=\"danger\">Etichetta di pericolo compatta</pura-heading>"
  }
 },
 "link": {
  "pt-BR": {
   "description": "O Pura Link é uma âncora de bloco de construção que encaminha href e target para um link nativo interno, ao mesmo tempo em que trata a apresentação por meio de atributos. Ele suporta quatro variantes visuais (incluindo um link no estilo de botão) e um conjunto de cores de tema, e pode marcar um link como externo para adicionar atributos rel seguros, um target _blank e um glifo de seta ao final.",
   "attributes": [
    {
     "desc": "URL de destino, encaminhada para o elemento <a> interno."
    },
    {
     "desc": "Destino do link, como _blank, encaminhado para o <a> interno. Quando external está definido e nenhum target é informado, _blank é usado como fallback."
    },
    {
     "desc": "Tratamento visual do link. underline-on-hover exibe o sublinhado apenas ao passar o mouse, underline o mantém visível até o hover, subtle remove o sublinhado, e button renderiza um controle com borda no estilo de botão."
    },
    {
     "desc": "Cor de primeiro plano extraída dos tokens de tema."
    },
    {
     "desc": "Marca o link como externo. Adiciona rel=\"noopener noreferrer\", recorre a target=_blank e acrescenta um glifo de seta ao final."
    }
   ],
   "demoHTML": "<script type=\"module\" src=\"/pura/lib/link.js\"></script>\n\n<p>Leia nossa <pura-link href=\"/docs\">documentação</pura-link> para começar.</p>\n\n<p>\n  <pura-link href=\"/pricing\" variant=\"underline\">Sempre sublinhado</pura-link> ·\n  <pura-link href=\"/about\" variant=\"subtle\" color=\"muted\">Link discreto e suave</pura-link> ·\n  <pura-link href=\"/changelog\" color=\"accent\">Cor de destaque</pura-link>\n</p>\n\n<p>\n  <pura-link href=\"https://example.com\" external>Visite o site do nosso parceiro</pura-link>\n</p>\n\n<p>\n  <pura-link href=\"/signup\" variant=\"button\">Criar uma conta</pura-link>\n</p>"
  },
  "fr": {
   "description": "Pura Link est une ancre de type brique de construction qui transmet href et target à un lien natif interne tout en gérant la présentation via des attributs. Il prend en charge quatre variantes visuelles (y compris un lien de style bouton) et un ensemble de couleurs de thème, et peut marquer un lien comme externe pour ajouter des attributs rel sûrs, une cible _blank et un glyphe de flèche en fin de ligne.",
   "attributes": [
    {
     "desc": "URL de destination, transmise à l'élément <a> interne."
    },
    {
     "desc": "Cible du lien telle que _blank, transmise au <a> interne. Lorsque external est défini et qu'aucune cible n'est fournie, _blank est utilisé comme valeur de repli."
    },
    {
     "desc": "Traitement visuel du lien. underline-on-hover affiche le soulignement uniquement au survol, underline le garde visible jusqu'au survol, subtle supprime le soulignement, et button rend un contrôle bordé de style bouton."
    },
    {
     "desc": "Couleur de premier plan issue des tokens de thème."
    },
    {
     "desc": "Marque le lien comme externe. Ajoute rel=\"noopener noreferrer\", se replie sur target=_blank et ajoute un glyphe de flèche en fin de ligne."
    }
   ],
   "demoHTML": "<script type=\"module\" src=\"/pura/lib/link.js\"></script>\n\n<p>Lisez notre <pura-link href=\"/docs\">documentation</pura-link> pour commencer.</p>\n\n<p>\n  <pura-link href=\"/pricing\" variant=\"underline\">Toujours souligné</pura-link> ·\n  <pura-link href=\"/about\" variant=\"subtle\" color=\"muted\">Lien discret et atténué</pura-link> ·\n  <pura-link href=\"/changelog\" color=\"accent\">Couleur d'accentuation</pura-link>\n</p>\n\n<p>\n  <pura-link href=\"https://example.com\" external>Visitez le site de notre partenaire</pura-link>\n</p>\n\n<p>\n  <pura-link href=\"/signup\" variant=\"button\">Créer un compte</pura-link>\n</p>"
  },
  "de": {
   "description": "Pura Link ist ein Baustein-Anker, der href und target an einen inneren nativen Link weiterleitet und gleichzeitig die Darstellung über Attribute steuert. Er unterstützt vier visuelle Varianten (einschließlich eines Links im Button-Stil) sowie eine Reihe von Theme-Farben und kann einen Link als extern markieren, um sichere rel-Attribute, ein _blank-Target und ein abschließendes Pfeil-Glyph hinzuzufügen.",
   "attributes": [
    {
     "desc": "Ziel-URL, weitergeleitet an das innere <a>-Element."
    },
    {
     "desc": "Link-Target wie _blank, weitergeleitet an das innere <a>. Wenn external gesetzt ist und kein Target angegeben wird, wird _blank als Fallback verwendet."
    },
    {
     "desc": "Visuelle Gestaltung des Links. underline-on-hover zeigt die Unterstreichung nur beim Hover, underline hält sie bis zum Hover sichtbar, subtle entfernt die Unterstreichung, und button rendert ein umrandetes, schaltflächenähnliches Steuerelement."
    },
    {
     "desc": "Vordergrundfarbe aus den Theme-Tokens."
    },
    {
     "desc": "Markiert den Link als extern. Fügt rel=\"noopener noreferrer\" hinzu, greift auf target=_blank zurück und hängt ein abschließendes Pfeil-Glyph an."
    }
   ],
   "demoHTML": "<script type=\"module\" src=\"/pura/lib/link.js\"></script>\n\n<p>Lesen Sie unsere <pura-link href=\"/docs\">Dokumentation</pura-link>, um loszulegen.</p>\n\n<p>\n  <pura-link href=\"/pricing\" variant=\"underline\">Immer unterstrichen</pura-link> ·\n  <pura-link href=\"/about\" variant=\"subtle\" color=\"muted\">Dezenter, gedämpfter Link</pura-link> ·\n  <pura-link href=\"/changelog\" color=\"accent\">Akzentfarbe</pura-link>\n</p>\n\n<p>\n  <pura-link href=\"https://example.com\" external>Besuchen Sie die Website unseres Partners</pura-link>\n</p>\n\n<p>\n  <pura-link href=\"/signup\" variant=\"button\">Konto erstellen</pura-link>\n</p>"
  },
  "it": {
   "description": "Pura Link è un'ancora di base che inoltra href e target a un link nativo interno, gestendo al contempo la presentazione tramite attributi. Supporta quattro varianti visive (incluso un link in stile pulsante) e un insieme di colori di tema, e può contrassegnare un link come esterno per aggiungere attributi rel sicuri, un target _blank e un glifo a freccia finale.",
   "attributes": [
    {
     "desc": "URL di destinazione, inoltrato all'elemento <a> interno."
    },
    {
     "desc": "Target del link come _blank, inoltrato al <a> interno. Quando external è impostato e non viene fornito alcun target, _blank viene usato come ripiego."
    },
    {
     "desc": "Trattamento visivo del link. underline-on-hover mostra la sottolineatura solo al passaggio del mouse, underline la mantiene visibile fino al passaggio del mouse, subtle rimuove la sottolineatura, e button esegue il rendering di un controllo bordato in stile pulsante."
    },
    {
     "desc": "Colore di primo piano tratto dai token di tema."
    },
    {
     "desc": "Contrassegna il link come esterno. Aggiunge rel=\"noopener noreferrer\", ripiega su target=_blank e aggiunge un glifo a freccia finale."
    }
   ],
   "demoHTML": "<script type=\"module\" src=\"/pura/lib/link.js\"></script>\n\n<p>Leggi la nostra <pura-link href=\"/docs\">documentazione</pura-link> per iniziare.</p>\n\n<p>\n  <pura-link href=\"/pricing\" variant=\"underline\">Sempre sottolineato</pura-link> ·\n  <pura-link href=\"/about\" variant=\"subtle\" color=\"muted\">Link discreto e attenuato</pura-link> ·\n  <pura-link href=\"/changelog\" color=\"accent\">Colore d'accento</pura-link>\n</p>\n\n<p>\n  <pura-link href=\"https://example.com\" external>Visita il sito del nostro partner</pura-link>\n</p>\n\n<p>\n  <pura-link href=\"/signup\" variant=\"button\">Crea un account</pura-link>\n</p>"
  }
 },
 "image": {
  "pt-BR": {
   "description": "A primitiva pura-image renderiza um img dentro de um frame de proporção, com carregamento preguiçoso e decodificação assíncrona habilitados por padrão. Ela é totalmente orientada por atributos: defina a origem, a proporção, o object-fit, o raio dos cantos e dimensões explícitas por meio de atributos. Ela degrada graciosamente quando nenhum src é fornecido, exibindo o fundo sutil do frame.",
   "attributes": [
    {
     "desc": "URL da imagem. Quando omitida, o frame é renderizado vazio com um fundo sutil."
    },
    {
     "desc": "Texto alternativo para a imagem. O padrão é uma string vazia."
    },
    {
     "desc": "Proporção do frame, por exemplo \"16/9\", \"1/1\", \"4/3\"."
    },
    {
     "desc": "Comportamento de object-fit da imagem dentro do frame."
    },
    {
     "desc": "Arredondamento de cantos aplicado ao frame, mapeado para os tokens --pura-radius."
    },
    {
     "desc": "Largura explícita. Um número simples é convertido para px; qualquer outro comprimento CSS é repassado como está."
    },
    {
     "desc": "Altura explícita. Um número simples é convertido para px; qualquer outro comprimento CSS é repassado como está."
    }
   ],
   "demoHTML": "<script type=\"module\" src=\"/pura/lib/image.js\"></script>\n\n<!-- Basic image with a 16/9 ratio -->\n<pura-image\n  src=\"https://images.unsplash.com/photo-1506744038136-46273834b3fb\"\n  alt=\"Um lago enevoado cercado por montanhas\"\n  ratio=\"16/9\"\n  w=\"320\"\n></pura-image>\n\n<!-- Square avatar with full rounding -->\n<pura-image\n  src=\"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde\"\n  alt=\"Foto de perfil\"\n  ratio=\"1/1\"\n  radius=\"full\"\n  w=\"96\"\n></pura-image>\n\n<!-- Contain fit with rounded corners -->\n<pura-image\n  src=\"https://images.unsplash.com/photo-1465101046530-73398c7f28ca\"\n  alt=\"Logotipo sobre um fundo claro\"\n  ratio=\"4/3\"\n  fit=\"contain\"\n  radius=\"lg\"\n  w=\"240\"\n></pura-image>\n\n<!-- Empty placeholder (no src) -->\n<pura-image ratio=\"1/1\" w=\"120\" radius=\"md\"></pura-image>"
  },
  "fr": {
   "description": "La primitive pura-image rend un img à l'intérieur d'un cadre au ratio d'aspect, avec le chargement différé et le décodage asynchrone activés par défaut. Elle est entièrement pilotée par des attributs : définissez la source, le ratio d'aspect, l'object-fit, le rayon des coins et des dimensions explicites via des attributs. Elle se dégrade gracieusement lorsqu'aucun src n'est fourni, en affichant l'arrière-plan discret du cadre.",
   "attributes": [
    {
     "desc": "URL de l'image. Lorsqu'elle est omise, le cadre est rendu vide avec un arrière-plan discret."
    },
    {
     "desc": "Texte alternatif de l'image. Par défaut, une chaîne vide."
    },
    {
     "desc": "Ratio d'aspect du cadre, par exemple \"16/9\", \"1/1\", \"4/3\"."
    },
    {
     "desc": "Comportement d'object-fit de l'image à l'intérieur du cadre."
    },
    {
     "desc": "Arrondi des coins appliqué au cadre, mappé sur les tokens --pura-radius."
    },
    {
     "desc": "Largeur explicite. Un simple nombre est converti en px ; toute autre longueur CSS est transmise telle quelle."
    },
    {
     "desc": "Hauteur explicite. Un simple nombre est converti en px ; toute autre longueur CSS est transmise telle quelle."
    }
   ],
   "demoHTML": "<script type=\"module\" src=\"/pura/lib/image.js\"></script>\n\n<!-- Basic image with a 16/9 ratio -->\n<pura-image\n  src=\"https://images.unsplash.com/photo-1506744038136-46273834b3fb\"\n  alt=\"Un lac brumeux entouré de montagnes\"\n  ratio=\"16/9\"\n  w=\"320\"\n></pura-image>\n\n<!-- Square avatar with full rounding -->\n<pura-image\n  src=\"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde\"\n  alt=\"Photo de profil\"\n  ratio=\"1/1\"\n  radius=\"full\"\n  w=\"96\"\n></pura-image>\n\n<!-- Contain fit with rounded corners -->\n<pura-image\n  src=\"https://images.unsplash.com/photo-1465101046530-73398c7f28ca\"\n  alt=\"Logo sur un fond clair\"\n  ratio=\"4/3\"\n  fit=\"contain\"\n  radius=\"lg\"\n  w=\"240\"\n></pura-image>\n\n<!-- Empty placeholder (no src) -->\n<pura-image ratio=\"1/1\" w=\"120\" radius=\"md\"></pura-image>"
  },
  "de": {
   "description": "Das pura-image-Primitive rendert ein img innerhalb eines Aspect-Ratio-Rahmens, wobei verzögertes Laden und asynchrones Dekodieren standardmäßig aktiviert sind. Es ist vollständig attributgesteuert: Legen Sie Quelle, Seitenverhältnis, object-fit, Eckenradius und explizite Abmessungen über Attribute fest. Es degradiert elegant, wenn kein src angegeben ist, und zeigt den dezenten Hintergrund des Rahmens an.",
   "attributes": [
    {
     "desc": "Bild-URL. Wird sie weggelassen, wird der Rahmen leer mit einem dezenten Hintergrund gerendert."
    },
    {
     "desc": "Alternativtext für das Bild. Standardmäßig eine leere Zeichenfolge."
    },
    {
     "desc": "Seitenverhältnis des Rahmens, z. B. \"16/9\", \"1/1\", \"4/3\"."
    },
    {
     "desc": "object-fit-Verhalten des Bildes innerhalb des Rahmens."
    },
    {
     "desc": "Auf den Rahmen angewendete Eckenabrundung, abgebildet auf die --pura-radius-Tokens."
    },
    {
     "desc": "Explizite Breite. Eine bloße Zahl wird in px umgewandelt; jede andere CSS-Länge wird unverändert durchgereicht."
    },
    {
     "desc": "Explizite Höhe. Eine bloße Zahl wird in px umgewandelt; jede andere CSS-Länge wird unverändert durchgereicht."
    }
   ],
   "demoHTML": "<script type=\"module\" src=\"/pura/lib/image.js\"></script>\n\n<!-- Basic image with a 16/9 ratio -->\n<pura-image\n  src=\"https://images.unsplash.com/photo-1506744038136-46273834b3fb\"\n  alt=\"Ein nebliger See, umgeben von Bergen\"\n  ratio=\"16/9\"\n  w=\"320\"\n></pura-image>\n\n<!-- Square avatar with full rounding -->\n<pura-image\n  src=\"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde\"\n  alt=\"Profilfoto\"\n  ratio=\"1/1\"\n  radius=\"full\"\n  w=\"96\"\n></pura-image>\n\n<!-- Contain fit with rounded corners -->\n<pura-image\n  src=\"https://images.unsplash.com/photo-1465101046530-73398c7f28ca\"\n  alt=\"Logo auf hellem Hintergrund\"\n  ratio=\"4/3\"\n  fit=\"contain\"\n  radius=\"lg\"\n  w=\"240\"\n></pura-image>\n\n<!-- Empty placeholder (no src) -->\n<pura-image ratio=\"1/1\" w=\"120\" radius=\"md\"></pura-image>"
  },
  "it": {
   "description": "La primitiva pura-image esegue il rendering di un img all'interno di un riquadro con rapporto d'aspetto, con caricamento lazy e decodifica asincrona abilitati per impostazione predefinita. È interamente guidata da attributi: imposta la sorgente, il rapporto d'aspetto, l'object-fit, il raggio degli angoli e dimensioni esplicite tramite attributi. Degrada in modo elegante quando non viene fornito alcun src, mostrando lo sfondo discreto del riquadro.",
   "attributes": [
    {
     "desc": "URL dell'immagine. Quando omesso, il riquadro viene renderizzato vuoto con uno sfondo discreto."
    },
    {
     "desc": "Testo alternativo per l'immagine. Il valore predefinito è una stringa vuota."
    },
    {
     "desc": "Rapporto d'aspetto del riquadro, ad esempio \"16/9\", \"1/1\", \"4/3\"."
    },
    {
     "desc": "Comportamento object-fit dell'immagine all'interno del riquadro."
    },
    {
     "desc": "Arrotondamento degli angoli applicato al riquadro, mappato sui token --pura-radius."
    },
    {
     "desc": "Larghezza esplicita. Un numero semplice viene convertito in px; qualsiasi altra lunghezza CSS viene passata così com'è."
    },
    {
     "desc": "Altezza esplicita. Un numero semplice viene convertito in px; qualsiasi altra lunghezza CSS viene passata così com'è."
    }
   ],
   "demoHTML": "<script type=\"module\" src=\"/pura/lib/image.js\"></script>\n\n<!-- Basic image with a 16/9 ratio -->\n<pura-image\n  src=\"https://images.unsplash.com/photo-1506744038136-46273834b3fb\"\n  alt=\"Un lago nebbioso circondato da montagne\"\n  ratio=\"16/9\"\n  w=\"320\"\n></pura-image>\n\n<!-- Square avatar with full rounding -->\n<pura-image\n  src=\"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde\"\n  alt=\"Foto del profilo\"\n  ratio=\"1/1\"\n  radius=\"full\"\n  w=\"96\"\n></pura-image>\n\n<!-- Contain fit with rounded corners -->\n<pura-image\n  src=\"https://images.unsplash.com/photo-1465101046530-73398c7f28ca\"\n  alt=\"Logo su uno sfondo chiaro\"\n  ratio=\"4/3\"\n  fit=\"contain\"\n  radius=\"lg\"\n  w=\"240\"\n></pura-image>\n\n<!-- Empty placeholder (no src) -->\n<pura-image ratio=\"1/1\" w=\"120\" radius=\"md\"></pura-image>"
  }
 },
 "code": {
  "pt-BR": {
   "description": "A primitiva pura-code renderiza um único elemento de código inline, estilizado como um chip sutil por padrão, com fundo, borda e fonte monoespaçada. Use o atributo variant para alternar para um estilo monoespaçado simples e sem decoração de chip. A tematização é totalmente conduzida pelos tokens var(--pura-*), e o elemento interno é exposto por meio da parte code para estilização personalizada.",
   "attributes": [
    {
     "desc": "Estilo visual. \"subtle\" (padrão) renderiza um chip com fundo, borda e padding; \"plain\" renderiza texto monoespaçado simples sem decoração de chip."
    }
   ],
   "demoHTML": "<script type=\"module\" src=\"/pura/lib/code.js\"></script>\n\n<p>Execute <pura-code>npm install pura</pura-code> para adicionar a biblioteca ao seu projeto.</p>\n\n<p>Defina o token <pura-code>--pura-accent</pura-code> para recolorir todos os componentes de uma vez.</p>\n\n<p>Pressione <pura-code variant=\"plain\">Ctrl + S</pura-code> para salvar sem o estilo de chip.</p>\n\n<p>A exportação padrão é <pura-code>PuraElement</pura-code>, um invólucro leve em torno de <pura-code variant=\"plain\">HTMLElement</pura-code>.</p>"
  },
  "fr": {
   "description": "La primitive pura-code rend un unique élément de code en ligne, stylisé par défaut comme une puce discrète avec un arrière-plan, une bordure et une police à chasse fixe. Utilisez l'attribut variant pour passer à un style monospace nu, sans décoration de puce. La thématisation est entièrement pilotée par les tokens var(--pura-*), et l'élément interne est exposé via la partie code pour un style personnalisé.",
   "attributes": [
    {
     "desc": "Style visuel. \"subtle\" (par défaut) rend une puce avec arrière-plan, bordure et padding ; \"plain\" rend du texte à chasse fixe nu, sans décoration de puce."
    }
   ],
   "demoHTML": "<script type=\"module\" src=\"/pura/lib/code.js\"></script>\n\n<p>Exécutez <pura-code>npm install pura</pura-code> pour ajouter la bibliothèque à votre projet.</p>\n\n<p>Définissez le jeton <pura-code>--pura-accent</pura-code> pour recolorer tous les composants en une seule fois.</p>\n\n<p>Appuyez sur <pura-code variant=\"plain\">Ctrl + S</pura-code> pour enregistrer sans le style de puce.</p>\n\n<p>L'export par défaut est <pura-code>PuraElement</pura-code>, un léger wrapper autour de <pura-code variant=\"plain\">HTMLElement</pura-code>.</p>"
  },
  "de": {
   "description": "Das pura-code-Primitive rendert ein einzelnes Inline-Code-Element, das standardmäßig als dezenter Chip mit Hintergrund, Rahmen und Monospace-Schrift gestaltet ist. Verwenden Sie das variant-Attribut, um zu einem schlichten, nackten Monospace-Stil ohne Chip-Dekoration zu wechseln. Das Theming wird vollständig über die var(--pura-*)-Tokens gesteuert, und das innere Element wird über den code-Part für individuelles Styling zugänglich gemacht.",
   "attributes": [
    {
     "desc": "Visueller Stil. \"subtle\" (Standard) rendert einen Chip mit Hintergrund, Rahmen und Padding; \"plain\" rendert nackten Monospace-Text ohne Chip-Dekoration."
    }
   ],
   "demoHTML": "<script type=\"module\" src=\"/pura/lib/code.js\"></script>\n\n<p>Führen Sie <pura-code>npm install pura</pura-code> aus, um die Bibliothek zu Ihrem Projekt hinzuzufügen.</p>\n\n<p>Setzen Sie das Token <pura-code>--pura-accent</pura-code>, um alle Komponenten auf einmal umzufärben.</p>\n\n<p>Drücken Sie <pura-code variant=\"plain\">Strg + S</pura-code>, um ohne das Chip-Styling zu speichern.</p>\n\n<p>Der Standard-Export ist <pura-code>PuraElement</pura-code>, ein schlanker Wrapper um <pura-code variant=\"plain\">HTMLElement</pura-code>.</p>"
  },
  "it": {
   "description": "La primitiva pura-code esegue il rendering di un singolo elemento di codice inline, stilizzato per impostazione predefinita come un chip discreto con sfondo, bordo e carattere monospazio. Usa l'attributo variant per passare a uno stile monospazio essenziale, senza decorazione a chip. La tematizzazione è interamente guidata dai token var(--pura-*) e l'elemento interno è esposto tramite la parte code per uno stile personalizzato.",
   "attributes": [
    {
     "desc": "Stile visivo. \"subtle\" (predefinito) esegue il rendering di un chip con sfondo, bordo e padding; \"plain\" esegue il rendering di testo monospazio essenziale, senza decorazione a chip."
    }
   ],
   "demoHTML": "<script type=\"module\" src=\"/pura/lib/code.js\"></script>\n\n<p>Esegui <pura-code>npm install pura</pura-code> per aggiungere la libreria al tuo progetto.</p>\n\n<p>Imposta il token <pura-code>--pura-accent</pura-code> per ricolorare tutti i componenti in una volta sola.</p>\n\n<p>Premi <pura-code variant=\"plain\">Ctrl + S</pura-code> per salvare senza lo stile a chip.</p>\n\n<p>L'esportazione predefinita è <pura-code>PuraElement</pura-code>, un sottile wrapper attorno a <pura-code variant=\"plain\">HTMLElement</pura-code>.</p>"
  }
 },
 "blockquote": {
  "pt-BR": {
   "description": "Renderiza um blockquote estilizado com uma borda de destaque à esquerda, texto em itálico e tom suave, e uma citação opcional. A cor de destaque segue a variante escolhida, e a citação pode ser fornecida pelo atributo cite ou, para uma marcação mais rica, pelo slot author.",
   "attributes": [
    {
     "desc": "Cor de destaque para a borda e a citação. Uma entre: default, accent, primary, success, warning, danger, info."
    },
    {
     "desc": "Texto da citação renderizado como uma linha <cite>. Fica oculto quando o conteúdo é fornecido pelo slot author."
    }
   ],
   "demoHTML": "<script type=\"module\" src=\"/pura/lib/blockquote.js\"></script>\n\n<pura-blockquote cite=\"Ada Lovelace\">\n  A Máquina Analítica tece padrões algébricos assim como o tear de Jacquard tece flores e folhas.\n</pura-blockquote>\n\n<pura-blockquote variant=\"primary\" cite=\"Grace Hopper\">\n  A frase mais perigosa do idioma é: sempre fizemos assim.\n</pura-blockquote>\n\n<pura-blockquote variant=\"success\">\n  A simplicidade é o máximo da sofisticação.\n  <span slot=\"author\">Leonardo da Vinci, <em>Cadernos</em></span>\n</pura-blockquote>"
  },
  "fr": {
   "description": "Rend un blockquote stylisé avec une bordure d'accent à gauche, un texte en italique et en gris atténué, ainsi qu'une mention de source optionnelle. La couleur d'accent suit la variante choisie, et la mention de source peut être fournie soit via l'attribut cite, soit, pour un balisage plus riche, via le slot author.",
   "attributes": [
    {
     "desc": "Couleur d'accent pour la bordure et la mention de source. L'une parmi : default, accent, primary, success, warning, danger, info."
    },
    {
     "desc": "Texte de la mention de source rendu sous forme de ligne <cite>. Masqué lorsque le contenu est fourni via le slot author."
    }
   ],
   "demoHTML": "<script type=\"module\" src=\"/pura/lib/blockquote.js\"></script>\n\n<pura-blockquote cite=\"Ada Lovelace\">\n  La Machine Analytique tisse des motifs algébriques tout comme le métier Jacquard tisse des fleurs et des feuilles.\n</pura-blockquote>\n\n<pura-blockquote variant=\"primary\" cite=\"Grace Hopper\">\n  La phrase la plus dangereuse de la langue est : nous avons toujours fait comme ça.\n</pura-blockquote>\n\n<pura-blockquote variant=\"success\">\n  La simplicité est la sophistication suprême.\n  <span slot=\"author\">Leonardo da Vinci, <em>Carnets</em></span>\n</pura-blockquote>"
  },
  "de": {
   "description": "Rendert ein gestaltetes Blockquote mit einem linken Akzentrahmen, kursivem, gedämpftem Text und einer optionalen Quellenangabe. Die Akzentfarbe richtet sich nach der gewählten Variante, und die Quellenangabe kann entweder über das cite-Attribut oder, für reichhaltigeres Markup, über den author-Slot bereitgestellt werden.",
   "attributes": [
    {
     "desc": "Akzentfarbe für den Rahmen und die Quellenangabe. Eine von: default, accent, primary, success, warning, danger, info."
    },
    {
     "desc": "Text der Quellenangabe, gerendert als <cite>-Zeile. Wird ausgeblendet, wenn der Inhalt über den author-Slot bereitgestellt wird."
    }
   ],
   "demoHTML": "<script type=\"module\" src=\"/pura/lib/blockquote.js\"></script>\n\n<pura-blockquote cite=\"Ada Lovelace\">\n  Die Analytische Maschine webt algebraische Muster, so wie der Jacquard-Webstuhl Blumen und Blätter webt.\n</pura-blockquote>\n\n<pura-blockquote variant=\"primary\" cite=\"Grace Hopper\">\n  Der gefährlichste Satz der Sprache lautet: Das haben wir schon immer so gemacht.\n</pura-blockquote>\n\n<pura-blockquote variant=\"success\">\n  Einfachheit ist die höchste Form der Raffinesse.\n  <span slot=\"author\">Leonardo da Vinci, <em>Notizbücher</em></span>\n</pura-blockquote>"
  },
  "it": {
   "description": "Esegue il rendering di un blockquote stilizzato con un bordo d'accento a sinistra, testo in corsivo e attenuato, e una citazione opzionale. Il colore d'accento segue la variante scelta, e la citazione può essere fornita tramite l'attributo cite oppure, per un markup più ricco, tramite lo slot author.",
   "attributes": [
    {
     "desc": "Colore d'accento per il bordo e la citazione. Uno tra: default, accent, primary, success, warning, danger, info."
    },
    {
     "desc": "Testo della citazione renderizzato come riga <cite>. Nascosto quando il contenuto viene fornito tramite lo slot author."
    }
   ],
   "demoHTML": "<script type=\"module\" src=\"/pura/lib/blockquote.js\"></script>\n\n<pura-blockquote cite=\"Ada Lovelace\">\n  La Macchina Analitica intreccia schemi algebrici proprio come il telaio Jacquard intreccia fiori e foglie.\n</pura-blockquote>\n\n<pura-blockquote variant=\"primary\" cite=\"Grace Hopper\">\n  La frase più pericolosa della lingua è: abbiamo sempre fatto così.\n</pura-blockquote>\n\n<pura-blockquote variant=\"success\">\n  La semplicità è la suprema sofisticazione.\n  <span slot=\"author\">Leonardo da Vinci, <em>Quaderni</em></span>\n</pura-blockquote>"
  }
 }
};
