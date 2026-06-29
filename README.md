# L'Allenamento Aureo — PWA

App web installabile (PWA) per eseguire il *Manuale Tecnico degli Esercizi*, ottimizzata per **iPhone 13 mini**. Tema scuro "Aureo", 17 esercizi illustrati, allenamento guidato con timer e libreria di consultazione. Funziona **offline** dopo l'installazione.

## Cosa contiene
- **Allenamento guidato**: sessione completa o per singolo blocco (1 Riscaldamento, 2 Potenza & Skill, 3 Forza, 4 Condizionamento), con timer a cerchio, recuperi automatici, suono e vibrazione ai cambi.
- **Libreria**: le 17 schede tecniche con fasi del movimento, ritmo/respiro/tensione ed errori da evitare → correzione.
- **Illustrazioni**: ogni esercizio ha una figura istruttiva (vettoriale SVG) con linea di riferimento, frecce di movimento e muscoli evidenziati. Niente prompt: le immagini sono già disegnate nell'app.

## File
```
index.html            pagina principale
app.css               stile (tema scuro Aureo)
data.js               i 17 esercizi + dati delle illustrazioni
figures.js            motore che disegna le illustrazioni SVG
app.js                logica app (navigazione + timer)
sw.js                 service worker (uso offline)
manifest.webmanifest  metadati PWA
icons/                icone app (180/192/512)
```

## Provarla sul computer
Serve un piccolo server locale (il service worker non parte da `file://`):
```
cd "PWA Gojo Training"
python3 -m http.server 8080
```
Apri `http://localhost:8080` nel browser.

## Installarla sull'iPhone 13 mini
1. Metti la cartella online su un indirizzo **HTTPS** (es. GitHub Pages, Netlify, o un server con certificato). La PWA richiede HTTPS per installazione e offline.
2. Apri l'indirizzo in **Safari** sull'iPhone.
3. Tocca **Condividi** → **Aggiungi a Home**.
4. Avvia "Aureo" dalla schermata Home: parte a tutto schermo, senza barre del browser.

> Avvertenza dal manuale: scala il range di movimento alle tue capacità, dai priorità alla tecnica sul carico e interrompi in caso di dolore articolare.
