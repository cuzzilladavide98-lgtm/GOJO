# Audit & ottimizzazione - L'Allenamento Aureo (iPhone 13 mini)

Data: giugno 2026. Target: iPhone 13 mini (375x812pt, DPR 3, iOS Safari 15+), uso come PWA installata.

## 1. Ottimizzazioni applicate (iOS / iPhone 13 mini)
- **Niente zoom automatico al focus**: tutti gli `input` a 16px (iOS Safari ingrandisce i campi < 16px).
- **touch-action: manipulation** su pulsanti/card/controlli: rimuove il ritardo del tap e il doppio-tap-zoom.
- **user-select / -webkit-touch-callout: none** sugli elementi di interfaccia (niente selezione testo o menu al long-press sui bottoni); il contenuto resta selezionabile.
- **-webkit-overflow-scrolling: touch** sulle aree scrollabili (momentum iOS).
- **Safe area**: `viewport-fit=cover` + `env(safe-area-inset-*)` su appbar, nav, allenamento e overlay (notch e home indicator gestiti).
- **prefers-reduced-motion**: media query globale che azzera animazioni/transizioni; l'intro Dominio gia la rispettava.
- **Accessibilita**: `aria-label` su tutti i bottoni a sola icona (chiudi, precedente, play/pausa, avanti, +/-, musica, indietro).
- **Fallback `100dvh`** per overlay a tutta altezza.
- **Standalone iOS**: meta `apple-mobile-web-app-capable`, status bar translucida, `apple-touch-icon`, `apple-mobile-web-app-title`.

## 2. Audit automatico (49 PASS / 0 WARN / 0 FAIL)
- **Manifest**: JSON valido, tutti i campi richiesti, `display: standalone`, 4 icone esistenti.
- **Service worker**: 14 asset elencati e tutti presenti; versione cache `aureo-v9`; richieste cross-origin (player YouTube) escluse dalla cache.
- **index.html**: tutti gli script e i link (css, manifest, icone) esistono; viewport corretto.
- **JS**: 7 file, sintassi valida (acorn, ES2020).
- **CSS**: graffe bilanciate (311); tutte le 34 variabili usate sono definite.
- **Icone**: 180/192/512/512-maskable, dimensioni esatte, RGBA.
- **Contrasto (WCAG AA)**:
  - testo su sfondo: on-surface 14.6:1, variant 10.1:1, testo piccolo (muted2) 4.63:1, error 10.2:1 - tutti >= 4.5.
  - colore tema come titolo su sfondo (grande): Aureo 12.9:1, Lapse 8.7:1, Reverse 7.4:1, Hollow 8.7:1.
  - testo dei pulsanti (on-primary su primary), per tema: 9.2 / 6.9 / 6.3 / 7.4 : 1.
- **Peso**: codice ~118 KB, icone ~390 KB. Tutto locale, nessuna dipendenza esterna (font di sistema), quindi **avvio rapido e offline totale**.

## 3. Stress test (jsdom; i tempi reali su device sono molto inferiori)
- **10 sessioni complete consecutive**: ok, storico corretto (cap automatico a 200 sessioni), ogni sessione 17 esercizi.
- **300 voci di storico renderizzate**: ~0.4s in jsdom, nessun problema (su device: istantaneo).
- **Stepper ripetizioni +300**: valore corretto, nessuna perdita di precisione.
- **30 cambi tema + 40 cambi tab**: nessun crash, stato coerente.
- **Apertura di tutte le 17 schede**: ok, navigazione indietro coerente.
- Nessuna eccezione; timer (rAF) sempre annullati a pausa/cambio fase/uscita; overlay (intro, onboarding) rimossi correttamente.

## 4. Note e limiti noti
- **Vibrazione**: iOS Safari non espone `navigator.vibrate`; il toggle resta innocuo (no-op) su iPhone.
- **Player musica incorporato**: usa l'embed YouTube standard (music.youtube.com non e iframe-abile) e si ferma a schermo bloccato; per ascolto Premium in background usare il pulsante "Apri YouTube Music".
- **Storico**: cap automatico a 200 sessioni salvate (evita crescita illimitata di localStorage). Anche con centinaia di voci il rendering resta rapido.
- **Audit eseguito staticamente + via DOM headless (jsdom)**: per la resa pixel-perfect finale vale sempre una prova reale su iPhone 13 mini installando la PWA.
