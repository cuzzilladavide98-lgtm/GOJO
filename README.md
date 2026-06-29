# L'Allenamento Aureo — PWA

App web installabile (PWA) per eseguire il *Manuale Tecnico degli Esercizi*, ottimizzata per **iPhone 13 mini**. Interfaccia in **Material Design 3** (tema scuro, accento ambra "Aureo"): navigation bar, card, switch, pulsanti pill, ripple ed effetti di stato. 17 esercizi illustrati, allenamento guidato con timer e libreria. Funziona **offline** dopo l'installazione.

## Cosa contiene
- **Grafico dei progressi**: nella scheda di ogni esercizio, un grafico a linea mostra l'andamento delle ripetizioni (o secondi/passi) nelle ultime sessioni registrate.
- **Allenamento guidato**: sessione completa o per singolo blocco (1 Riscaldamento, 2 Potenza & Skill, 3 Forza, 4 Condizionamento), con timer a cerchio, recuperi automatici, suono e vibrazione ai cambi.
- **Registrazione ripetizioni**: durante ogni esercizio uno stepper (− / +) per segnare le ripetizioni svolte (o secondi/passi per tenute e trasporti); modificabile anche nel recupero.
- **Salta esercizio**: se non riesci a eseguirne uno, lo salti e viene registrato come "saltato".
- **Storico per giorno**: ogni sessione viene salvata sul telefono e raggruppata per giorno (Oggi, Ieri, data), con dettaglio svolti/saltati e valori registrati; statistiche totali. Nella scheda di ogni esercizio compaiono i tuoi ultimi valori ("I tuoi progressi").
- **Libreria**: le 17 schede tecniche con fasi del movimento, ritmo/respiro/tensione ed errori da evitare → correzione.
- **Illustrazioni**: ogni esercizio ha una figura istruttiva (vettoriale SVG) con linea di riferimento, frecce di movimento e muscoli evidenziati. Niente prompt: le immagini sono già disegnate nell'app.

I dati (ripetizioni, storico, impostazioni) restano sul tuo dispositivo (localStorage del browser/PWA).

## File
```
index.html            pagina principale
app.css               stile Material Design 3 (tema scuro Aureo)
data.js               i 17 esercizi + dati delle illustrazioni
figures.js            motore che disegna le illustrazioni SVG
chart.js              grafico dei progressi (SVG) + ripple Material
app.js                core UI (navigazione, home, libreria, scheda, storico)
workout.js            motore allenamento (timer, ripetizioni, salto, salvataggio)
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
