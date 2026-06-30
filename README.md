# L'Allenamento Aureo - PWA

App web installabile (PWA) per eseguire il *Manuale Tecnico degli Esercizi*, ottimizzata per **iPhone 13 mini**. Interfaccia in **Material Design 3** (tema scuro, accento ambra "Aureo"): navigation bar, card, switch, pulsanti pill, icone SVG, ripple. 17 esercizi illustrati, allenamento guidato con timer, libreria, storico, grafici e musica. Funziona **offline** dopo l'installazione.

## Cosa contiene
- **Allenamento guidato**: sessione completa o per blocco (1 Riscaldamento, 2 Potenza & Skill, 3 Forza, 4 Condizionamento), con timer a cerchio, recuperi automatici, suono e vibrazione ai cambi.
- **Registrazione ripetizioni**: durante ogni esercizio uno stepper (-/+) per segnare ripetizioni svolte (o secondi/passi per tenute e trasporti); modificabile anche nel recupero.
- **Salta esercizio**: se non riesci a eseguirne uno, lo salti e viene registrato come "saltato".
- **Storico per giorno**: ogni sessione salvata sul telefono e raggruppata per giorno (Oggi, Ieri, data), con dettaglio svolti/saltati e valori; statistiche totali.
- **Grafico dei progressi**: nella scheda di ogni esercizio, l'andamento delle ripetizioni nelle ultime sessioni.
- **Musica**: tab dedicata con collegamento per aprire **YouTube Music** (sfrutta il tuo Premium), un **player incorporato** (incolli una playlist/brano e lo ascolti dentro l'app mentre ti alleni) e **link rapidi** salvabili. C'e anche un pulsante YouTube Music nella schermata di allenamento.
- **Libreria**: le 17 schede tecniche con fasi del movimento, ritmo/respiro/tensione ed errori da evitare con correzione.
- **Illustrazioni**: ogni esercizio ha una figura istruttiva (vettoriale SVG) con linea di riferimento, frecce di movimento e muscoli evidenziati.

I dati (ripetizioni, storico, musica, impostazioni) restano sul tuo dispositivo (localStorage).

## File
```
index.html            pagina principale
app.css               stile Material Design 3 (tema scuro Aureo)
data.js               i 17 esercizi + dati delle illustrazioni
figures.js            motore che disegna le illustrazioni SVG
chart.js              grafico dei progressi (SVG) + ripple Material
app.js                core UI (navigazione, home, libreria, scheda, storico)
workout.js            motore allenamento (timer, ripetizioni, salto, salvataggio)
music.js              tab Musica: link YouTube Music + player incorporato
sw.js                 service worker (uso offline)
manifest.webmanifest  metadati PWA
icons/                icone app (180/192/512)
```

## Provarla sul computer
Serve un piccolo server locale (il service worker non parte da file://):
```
cd "PWA Gojo Training"
python3 -m http.server 8080
```
Apri http://localhost:8080 nel browser.

## Installarla sull'iPhone 13 mini
1. Metti la cartella online su un indirizzo **HTTPS** (es. GitHub Pages, Netlify). La PWA richiede HTTPS per installazione e offline.
2. Apri l'indirizzo in **Safari** sull'iPhone.
3. Tocca **Condividi** e poi **Aggiungi a Home**.
4. Avvia "Aureo" dalla schermata Home: parte a tutto schermo.

## Note sulla musica
- "Apri YouTube Music" apre l'app/sito ufficiale: con il tuo abbonamento Premium hai ascolto senza pubblicita e in background.
- Il player incorporato usa l'embed YouTube standard (music.youtube.com non e incorporabile in un iframe): riproduce gli stessi contenuti restando dentro l'app, ma potrebbe non riflettere il Premium. Per allenarti con lo schermo bloccato, avvia la musica nell'app YouTube Music e poi torna su Aureo.

> Avvertenza dal manuale: scala il range di movimento alle tue capacita, dai priorita alla tecnica sul carico e interrompi in caso di dolore articolare.

## Tema & animazioni
Base scura con oro "Aureo" come colore primario, piu accenti ispirati a **Jujutsu Kaisen / Gojo** (energia maledetta): blu (Lapse) e viola (Hollow Purple) per le "cariche" e i momenti speciali, rosso (Reversal) per l'urgenza.
- Transizioni di fase con dissolvenza/scala di timer, nome e illustrazione.
- Conto alla rovescia 3-2-1: anello pulsante rosso, numero che "batte" e bip a ogni secondo.
- Barra di avanzamento allenamento come "carica" di energia (gradiente blu->viola), aura "dominio" dietro il timer, logo con bagliore.
- Schermata finale in stile "Espansione del Dominio" (burst viola/blu).

## Icona & identita Gojo
- **Icona app** ridisegnata: l'**Occhio di Gojo (Six Eyes)** con iride blu luminosa, nebulosa di energia maledetta (blu/viola), volute di energia e bordo oro "Aureo" (icons/icon-512.png e derivati, piu versione maskable).
- Il **logo in alto** nell'app e l'occhio di Gojo (cerchio scuro, bordo oro, alone blu).
- La **Home** ha un motivo "Dominio - Limitless" (overline gradiente blu->viola, occhio in filigrana, anelli concentrici).
- Service worker portato a `aureo-v6` per aggiornare le icone in cache.

## Extra Gojo
- **Intro "Espansione del Dominio"** a ogni avvio di allenamento: anelli di energia che si espandono + occhio + scritta (~1.3s, si salta col tap, disattivabile nelle impostazioni; rispetta "riduci movimento").
- **Temi energia** selezionabili nelle impostazioni: Aureo (oro), **Lapse: Blue (蒼)**, **Reverse: Red (赫)**, **Hollow Purple (虚式茈)** - cambiano l'accento dell'intera app. La scelta resta salvata.
- **Citazioni di Gojo** che ruotano nella Home.

## Ancora Gojo (ultima spinta)
- **Default Lapse: Blue**: all'avvio l'app parte con l'energia blu di Gojo (l'Aureo resta come opzione nei temi).
- **Illustrazioni tinte dal tema**: le figure degli esercizi assumono il colore dell'energia scelta (blu/rosso/viola/oro).
- **Suono "Dominio"**: all'intro parte una breve sigla sintetizzata (sweep + shimmer + impatto), legata al toggle del suono.
- **Onboarding al primo avvio**: 3 schermate di benvenuto con scelta immediata del tema; non ricompare alle aperture successive.

## Doppia anima: Guidato (NTC) + Forza (Strong) - filosofia Strava
Dalla Home, selettore **Guidato | Forza** (la scelta resta salvata):
- **Guidato (alla Nike Training Club)**: premi Play e segui il flusso. Layout ancorato, timer esegui/recupero automatici, illustrazione chiara, conto alla rovescia. Zero attrito: in questa modalita NON si inseriscono dati iper-analitici durante la sessione (solo, volendo, le ripetizioni con un tap).
- **Forza (alla Strong)**: diario snello, quasi un foglio di calcolo. Una card per esercizio con righe-serie (Kg x Reps a stepper), check per completare la serie e **timer di recupero** in basso (-15/+15/salta). Nessun avanzamento automatico: il ritmo lo detti tu. "+ Serie" per aggiungere set.
- **Filosofia Strava** (cosa NON facciamo): niente GPS/mappe/tracciamento outdoor. Il focus resta sui dati della sessione indoor - esercizi, tempo, costanza, progressione - gia presenti in Storico e nei grafici.

Struttura dati sessione estesa per gestire entrambe: ogni sessione ha `kind` ("guidato"/"forza"); gli esercizi della modalita Forza salvano l'array `sets` [{kg, reps}] piu un valore di sintesi (carico max o ripetizioni totali) cosi Storico e grafici restano compatibili tra le due modalita.

## Direzione artistica "Six Eyes" (Satoru Gojo)
Identita visiva fusa nel Material Design 3, pensata per i display OLED dell'iPhone:
- **Palette Infinity & Six Eyes**: sfondo **Void nero assoluto** (#000000), accento **ciano elettrico** (#00E5FF) per timer attivi/progressi/elementi vivi, **bianco ottico** (#FFFFFF) per il testo critico, grigi-ghiaccio geometrici per card e separatori. Contrasto testo **WCAG AAA** (bianco 21:1, ciano 13.7:1, bottoni 12:1).
- **Geometria a raggi X**: niente sfocature superflue; card con bordo hairline ice, griglie pulite e leggibilita tagliente.
- **Icone a tratto singolo** minimali e geometriche, in target di tocco spaziosi (>=56px).
- **Fluidita spazio-tempo**: transizioni con curva MD3 *emphasized* piu rapida (~220ms) per una reattivita "divina"; comparsa viste con micro-traslazione.
- **Micro-interazioni atomiche**: bagliore ciano controllato (un solo elemento, GPU-light) su pulsante Play, anello del timer attivo e serie completata - come l'attivazione dell'energia, senza appesantire.
- Il **tema "Six Eyes" (ciano) e ora il default**; restano selezionabili Lapse (blu), Hollow (viola), Reverse (rosso), Aureo (oro). L'occhio di Gojo (logo e icona app) chiude il cerchio: l'app fa "percepire" il flusso di tempo, menu e movimento.

## Dati, metriche e progressione (v13)
- **Backup / Export / Import** (Impostazioni > Dati e backup): `Backup JSON` (storico + preferenze), `Esporta CSV` (apribile in Excel), `Importa backup` (ripristina da file JSON). I dati restano in locale: esporta ogni tanto perche iOS puo cancellare i dati di una PWA non usata da ~7 giorni.
- **Metriche di sessione**: ogni sessione registra la **durata**; in modalita Forza anche il **volume** (kg x reps). Visibili nel dettaglio dello storico e nella schermata finale.
- **Record & progressione**: nella scheda esercizio compare il **record personale**; in modalita Forza ogni esercizio e **precompilato con i valori dell'ultima volta** (parti da li e progredisci) ed e disponibile un **RPE** opzionale (sforzo 0-10) per serie/esercizio, salvato nello storico.
- **Promemoria (onesto, senza server)**: toggle "Promemoria all'apertura" — se non ti alleni da qualche giorno, all'apertura dell'app ricevi una notifica (richiede PWA installata su iPhone) e in Home compare un avviso. La vera notifica push schedulata in background richiederebbe un server, quindi resta fuori dalla logica tutto-locale.
- Nuovo file `extras.js`; service worker a `aureo-v13`.

## Stress test iPhone 13 mini (v14)
Emulazione del device (375x812, DPR3) e caccia alle "seccature", eliminate o sfruttate:
- **Scorrimento piu fluido**: le illustrazioni nei thumbnail (Libreria e card Forza) ora sono in versione "flat", senza sfocature SVG (0 filtri blur su 17 figure, prima 17). Nelle schede di dettaglio e in allenamento restano in qualita piena. Meno carico GPU = liste piu scattanti sull'OLED del mini.
- **Niente perdita dati**: se apri l'app in Safari (non installata), in Home compare un invito ad "Aggiungere a Home" - cosi iOS conserva meglio i dati e parti a schermo intero. (La seccatura della cancellazione dati di iOS diventa una spinta all'installazione; il backup resta la rete di sicurezza.)
- **Inserimento carico piu veloce in Forza**: ora puoi **toccare il numero di Kg o Reps per digitarlo** (es. 60 in un colpo), oltre ai pulsanti +/- ingranditi. Niente piu decine di tap per i carichi alti.
- **Splash/installazione in tema**: colori del manifest portati al **Void nero** (#000000) coerenti con la palette Six Eyes; orientamento bloccato in verticale per non rompere il layout del timer.
- **Limiti noti (onesti)**: lo zoom a pizzico e disattivato per tenere il layout stabile; le notifiche push in background reali richiedono un server (il promemoria resta "all'apertura"); aprire YouTube Music mette in pausa il timer su iOS (per restare nel flusso, usa il player interno che continua mentre cambi scheda).

Service worker a `aureo-v14`.

## Massima resa sul display del 13 mini (v15)
Estetica e ingegneria spinte sulla tecnologia del telefono:
- **Colore wide-gamut P3**: dove il display lo supporta (il 13 mini si), l'accento ciano Six Eyes usa il gamut P3 (`color(display-p3 ...)`), piu elettrico di quanto l'sRGB possa mostrare. Fallback automatico all'sRGB altrove.
- **Nero OLED assoluto** (#000000): sfondo Void che spegne i pixel = contrasto infinito e consumo ridotto. Anche manifest/splash in Void.
- **HDR/EDR**: nei momenti chiave (Play, anello attivo, serie completata) i bagliori salgono di luminanza sui pannelli ad alta gamma dinamica.
- **Compositing GPU**: gli elementi animati (anello timer, aloni, Play) sono promossi a layer propri e animati solo con transform/opacity: nessun ridisegno, scorrevolezza massima.
- **content-visibility** sulle liste lunghe (Libreria, Storico): il rendering fuori schermo viene saltato.
- **Alone "energia maledetta"** che respira lentamente nella Home (puro transform, leggerissimo).

## Tema automatico (adattivo, non "a sentimento")
Il tema ora e **Automatico** di default: l'accento dell'app cambia da solo in base al **blocco/menu** che stai usando, non a una scelta manuale d'umore.
- **Home e Allenamento completo**: Six Eyes (ciano) - l'identita resta sempre li.
- **Blocco 1 Riscaldamento**: Lapse (blu) - attivazione calma.
- **Blocco 2 Potenza & Skill**: Six Eyes (ciano) - precisione/skill.
- **Blocco 3 Forza**: Reverse (rosso) - massimo sforzo.
- **Blocco 4 Condizionamento**: Hollow (viola) - sforzo prolungato.
- Aprendo la scheda di un esercizio, l'accento prende il colore del suo blocco; tornando in Home torna Six Eyes.

Resta possibile fissare un tema manuale (Six Eyes/Lapse/Hollow/Reverse/Aureo) dalle impostazioni: in quel caso l'accento non cambia piu da solo. Service worker a `aureo-v15`.

## Sistema CAVCI - Rotazione Intelligente (v16)
Integrato il tuo metodo reale (manuale CAVCI + routine Hevy). CAVCI e ora l'allenamento principale in Home; i 17 del Manuale Tecnico restano consultabili sotto.

**La sequenza (spina dorsale + jolly):**
Upper -> Lower -> Sled -> Corsa -> Cyclette -> Kettlebell -> Recupero -> ripeti. Piu il **Protocollo 0 - Reset posturale**, sempre disponibile (ingresso, salvataggio o scarico).

**Rotazione intelligente (il cuore):** l'app non e un calendario. Ricorda l'ultimo blocco completato e propone la **prossima tappa**. Se salti giorni non ricominci:
- 1-3 giorni: riparti dalla prossima scheda.
- 7-13 giorni: avviso "volume ridotto" (2 serie, RPE 6-7, niente test).
- 14+ giorni: avviso "parti da Recupero/Reset, poi riprendi al 60-70%".

**Esercizi con figure nuove:** ogni esercizio CAVCI (Dip, Trazione, RDL, ATG Split Squat, Sled push/drag, Corsa, Cyclette, KB Swing russo, Goblet, One Arm Row, Carry, Turkish Get-Up, Mobility, Child Pose, Dead Hang, 90/90 Breathing, Dead Bug, Ponte Glutei, Hip Flexor, Single Leg Balance, Tibialis...) ha una figura SVG illustrata nuova, con prescrizioni dal manuale (serie/reps/RPE), tecnica, errori e correzioni.

**Storico reale importato:** al primo avvio l'app carica le tue **96 sessioni Hevy** (ago 2025 - giu 2026). Cosi grafici, record personali e il prefill "ultima volta" partono dai tuoi numeri veri (es. RDL 90 kg, Split Squat 50 kg, Dip +22 kg). Avvii in modalita Forza e parti gia dai carichi giusti.

**Temi automatici per blocco:** Upper ciano (Six Eyes), Lower blu, Sled rosso, Corsa ciano, Cyclette/Recupero/Reset viola, Kettlebell rosso. L'accento cambia da solo in base al blocco.

Nuovi file: `cavci.js` (routine + figure + motore rotazione), `seed.js` (import storico), `cavci_seed.json` (i tuoi dati). Service worker a `aureo-v16`.

> Nota dal manuale: priorita alla colonna (hip hinge controllato), stimolo alto/recupero alto, e il sistema CAVCI come "sistema operativo personale" - coerente con i principi ACSM di individualizzazione e aderenza, non un protocollo clinico.
