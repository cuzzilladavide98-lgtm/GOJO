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

## v17 - CAVCI al centro (Hollow Purple), Corpo Libero e Player a carte
**1. CAVCI piu centrale e in Hollow Purple.** La Rotazione CAVCI e ora la prima cosa in Home (sopra tutto), con l'occhio in filigrana e l'accento sempre **Hollow Purple** (viola), la tecnica piu forte di Gojo. Anche la Home e il player seguono il viola. I 17 del Manuale Tecnico restano piu in basso, consultabili.

**2. Traccia "Corpo Libero" (floor-friendly).** L'altra faccia della medaglia: un toggle **Attrezzi / Corpo libero** nella card CAVCI. La versione a corpo libero e una rotazione 7 giorni scientificamente sostitutiva, pensata per ogni eta e per il pavimento (controllo del corpo):
- Upper: Push-up, Rematore a corpo libero, Pike push-up.
- Lower: Squat full ROM, Affondo indietro, Stacco a una gamba.
- Locomozione: Bear Crawl, Crab Walk.
- Cardio a terra: Mountain Climber, Marcia a ginocchia alte (basso impatto).
- Recupero attivo: Pedalata a terra, Plank laterale.
- Controllo & Core: Hollow Body Hold, Bird Dog, Get-Up a corpo libero.
- Recupero: camminata, mobility, child pose, 90/90 breathing.
La rotazione (prossima tappa, salti giorni) e condivisa: cambi solo gli esercizi. 14 figure SVG nuove dedicate.

**3. Player musica ridisegnato (smart, a carte).** Schermata unica stile lettore (Spotify/YT Music): in alto la barra con tre sottomenu a portata di tocco - **Player**, **Le tue playlist**, **Aggiungi**. Il player incorporato resta in vita mentre cambi sottomenu e mentre ti alleni (non riparte). Le scorciatoie sono carte in griglia, c'e il pulsante grande "Apri YouTube Music" (Premium) e l'aggiunta brano/preferiti su carte dedicate. Accento Hollow Purple.

Service worker a `aureo-v17`. 40 esercizi totali tra i due binari CAVCI; verifica jsdom: figure tutte ok, toggle traccia, tema viola, player persistente, 0 errori.

## v18 - Player di allenamento "alla lettore" (alleggerito)
Ripensata la schermata dell'allenamento guidato come un lettore musicale: **una sola pagina, senza scorrere**, con l'essenziale sempre in vista e i dettagli in **sottomenu apribili al tocco**.
- In vista restano solo: fase, illustrazione (come copertina), nome esercizio, timer e i comandi prev/play/next (come i tasti di un player).
- Tolti dalla schermata principale il logger sempre aperto e le righe ritmo/respiro che la appesantivano.
- Tre "chip" sotto al timer aprono dei pannelli a scomparsa (bottom sheet): **Reps** (stepper grande per registrare), **Tecnica** (ritmo, respiro, tensione, movimento, errore), **Salta**.
- Il pannello si apre dal basso e si chiude toccando fuori o "Fatto". Niente piu schermata affollata durante la sessione.
Service worker a `aureo-v18`. (La tab Musica resta il player a carte introdotto in v17.)

## v19 - Anatomia e comprensione del movimento (illustrazioni)
Le figure sono state rese piu chiare sia come anatomia sia come lettura del movimento.
- **Corpo continuo e articolato**: il renderer ora "salda" le ossa con nodi alle articolazioni (spalle, gomiti, anche, ginocchia). Le figure non sembrano piu stecchini staccati ma corpi muscolati e coerenti. Vale per TUTTE le illustrazioni (CAVCI, corpo libero e i 17 del manuale).
- **Doppio fotogramma (inizio -> fine)**: sui movimenti composti compare il fotogramma "fantasma" della posizione di partenza dietro a quella finale, con freccia direzionale. Cosi il movimento si capisce a colpo d'occhio: lo stacco rumeno mostra in piedi -> hinge; squat e goblet in piedi -> giu; dip e trazione la spinta/tirata; affondo la discesa.
- **Frecce piu marcate** e fantasma piu visibile per direzione e ampiezza del ROM.
Service worker a `aureo-v19`.

## v20 - Movimento su TUTTI gli esercizi
Esteso il doppio fotogramma / cue di movimento a ogni esercizio CAVCI (40 in totale), non solo ai principali:
- **Dinamici su/giu o spinta/tirata**: fotogramma "fantasma" della posizione di partenza dietro a quella finale (es. push-up alto->basso, pike, reverse nordic, kettlebell swing, one arm row, get-up, single-leg RDL, tibialis).
- **Locomozione e movimenti alternati**: fantasma della falcata/arto opposto (corsa, camminata, sled, carry, bear/crab crawl, mountain climber, marcia, pedalata, dead bug, bird dog) per rendere il ciclo del passo o l'alternanza.
- **Tenute isometriche**: piccola freccia che indica l'azione/intenzione (plank laterale = bacino su, dead hang = decompressione, 90/90 e hollow = lombare a terra, flessori = retroversione). Sono tenute, quindi niente fotogramma ma una direzione chiara.
Il builder ora supporta `swap` (falcata opposta automatica) e `start` (posa di partenza). Service worker a `aureo-v20`.

## v21 - Figure piu pulite + stabilita/compatibilita
- **Intensita del fantasma calibrata**: piu marcato sui movimenti composti (squat, stacco, dip, trazione, affondo: contrasto inizio->fine evidente) e piu tenue sulla locomozione (corsa, camminata, sled, crawl: la falcata opposta resta una traccia leggera, niente affollamento). Il builder espone `ghostOp` per regolare caso per caso.
- **Stress test iPhone 13 mini (jsdom)**: 11 fasi tutte superate, 0 errori - navigazione intensiva, rendering di tutte le figure, player guidato completo coi sottomenu, diario Forza, musica, backup e temi. Dettagli e check di compatibilita iOS 26 in AUDIT.md.
Service worker a `aureo-v21`.

## v22 - FIX: inserimento peso/reps e carichi precedenti
Risolto il problema per cui non si riusciva a inserire peso e ripetizioni (e quindi non si vedevano i precedenti):
- **Causa 1**: i blocchi di forza CAVCI si aprivano in modalita Guidata, che non ha i campi peso/precedenti. Ora **Upper, Lower, Sled e Kettlebell** (sia con attrezzi sia a corpo libero) si aprono automaticamente nel **diario Forza**; Corsa, Cyclette, Recupero e Reset restano guidati.
- **Causa 2**: per digitare i valori usavo `prompt()`, che iOS blocca nelle PWA installate. Ora Kg e Reps sono **campi numerici digitabili** (tastiera nativa, niente zoom), affiancati dai pulsanti -/+ per le micro-regolazioni.
- I **carichi precedenti** vengono precompilati dai tuoi dati reali (es. RDL parte da 90 kg) e sotto ogni esercizio resta l'indicazione "Ultima: ...".
Verifica: il blocco Lower apre il diario, RDL precompilato a 90 kg, valore digitato salvato correttamente; stress test 11/11 PASS, 0 errori. Service worker a `aureo-v22`.

## v23 - Layout arioso e a strati (meno confusione)
La Home ora mostra poche cose, ben leggibili, e approfondisce al tocco:
- In vista resta solo l'essenziale: la **Rotazione CAVCI** (Prossima tappa + selettore Attrezzi/Corpo libero + striscia + Reset) e una riga compatta con l'ultimo allenamento.
- Tutto il resto - **Manuale Tecnico**, **Impostazioni**, **Tema energia**, **Dati e backup** - e raccolto in **sezioni a scomparsa**: una riga pulita che si apre con un tocco (chevron che ruota) e si richiude. Niente piu muro di contenuti.
- Nelle schede esercizio, **Analisi del movimento** ed **Errori da evitare** sono anch'essi a fisarmonica: la scheda si apre compatta (illustrazione, record, ritmo/respiro/tensione) e approfondisci al tocco.
- Piu spazio e respiro: margini e padding aumentati.
Le sezioni aperte restano aperte tra un aggiornamento e l'altro della Home. Verifica jsdom + stress test: tutto PASS, 0 errori. Service worker a `aureo-v23`.

## v24-25 - Anteprima del "menu successivo" + via la sezione Musica + audio non invadente
- **Pagina riassuntiva prima di agire (no-scroll)**: toccando una tappa nella striscia CAVCI (un giorno diverso) o un blocco del Manuale non parte piu subito l'allenamento: si apre una **pagina di anteprima elegante** del blocco - titolo, tappa N/7, lista esercizi con prescrizioni (tocca un esercizio per approfondire) e un grande **Avvia**. La "Prossima tappa" di oggi resta avviabile al volo. Dopo la sessione si torna sempre alla Home.
- **Sezione YouTube Music rimossa**: tab e player tolti (era superflua).
- **Musica di sottofondo rispettata**: l'audio dell'app ora usa la categoria **"ambient"** (Web Audio Session): i suoni dei cambi/countdown si **mixano** con la musica del tuo lettore esterno **senza fermarla**. Service worker a `aureo-v25`.

## v26 - Direzione estetica JJK / Gojo Focus + Libreria/Storico
- **Tipografia display**: titoli, numeri (timer, contatori), badge e nomi usano ora **Space Grotesk** (font geometrico/tecnico, vibe "Six Eyes"), con fallback di sistema se offline. Scala dei font piu generosa e arieggiata; section-title in maiuscoletto spaziato.
- **Accenti "energia maledetta"**: badge e overline con testo a **gradiente viola->azzurro->ciano**; occhio di Gojo che pulsa lentamente nelle card CAVCI e anteprime.
- **Transizioni**: card e righe entrano "a cascata" (rise-in scaglionato), feedback di pressione (leggera scala) su card, righe e bottoni, curve MD3 emphasized.
- **Libreria a strati**: ora mostra i 4 blocchi; toccando un blocco si apre la pagina di anteprima (esercizi + Avvia) e da li si entra nel dettaglio. Niente piu muro di 17 voci.
- **Storico** piu arioso (spaziatura, font display sui titoli), sessioni espandibili al tocco come prima.
Service worker a `aureo-v26`. (Font e gradient-text si vedono al meglio sul telefono; offline c'e il fallback di sistema.)

## v27 - Elimina la singola sessione
Nello Storico, espandendo una sessione, c'e ora il pulsante **Elimina sessione** (utile per quelle avviate per sbaglio). La conferma e a **doppio tocco** (il pulsante diventa "Tocca ancora per eliminare") invece della finestrella `confirm()`, che iOS blocca nelle PWA installate - stessa logica applicata anche a "Cancella tutto lo storico". Service worker a `aureo-v27`.

## v28-29 - CAVCI consultabile/modificabile + modello "a orologio" (no-scroll)
- **CAVCI ora si consulta e si modifica** (non solo eseguibile): da Home tocca **Apri** (o una tappa nella striscia) per vedere gli esercizi del blocco con i target; tocca un esercizio per la scheda completa (illustrazione, tecnica, progressi). Con **Modifica routine** puoi **aggiungere, togliere, riordinare** gli esercizi e **cambiare i target** (campi digitabili); tutto si salva da solo. "Ripristina predefinito" riporta il blocco com'era. Vale per entrambe le tracce (Attrezzi/Corpo libero).
- **Modello "a orologio" - niente scroll di pagina**: lo shell e fisso (la pagina non rimbalza ne scrolla). La **Home e un quadrante**: solo la Rotazione CAVCI (prossima tappa + Avvia/Apri + striscia + Reset). Tolti dalla Home gli accordion, l'ultimo allenamento e il footer.
- **Profilo (4a scheda)**: modalita, preferenze, tema e backup hanno ora una loro scheda dedicata, raggiungibile dalla tab "Profilo". La Home resta pulita.
- **Libreria**: 4 blocchi + "Allenamento completo" in cima.
Service worker a `aureo-v29`.

## v30 - Piu semplice e comodo (no laboriosita)
- **Peso e ripetizioni col tastierino**: niente piu scrittura in campini. Ogni valore ha **stepper grandi -/+** (Kg a 2,5, reps a 1) e, toccando il numero, si apre un **tastierino numerico grande in stile iOS** (la prima cifra sovrascrive). Comodo durante l'allenamento, senza tastiera di sistema.
- **Prima pagina essenziale**: una sola card - "Prossima tappa", nome del blocco, e un grande **Inizia**. Sotto, un piccolo "Vedi esercizi e modifica", la striscia per saltare a un altro blocco e, in fondo, il selettore Attrezzi/Corpo libero e il Reset. Tolto tutto il superfluo.
- **Editor senza scrittura**: in "Modifica routine" aggiungi/togli/riordina con i tasti; i target restano in chiaro (non si digitano), il carico vero lo metti nel diario col tastierino.
Service worker a `aureo-v30`.

## v31 - Modifica vera (Kg/Reps/Note) + back corretto + spazi sfruttati
Dopo gli screenshot reali, sistemati i quattro problemi:
- **Indietro dall'editor**: il tasto back ora riporta all'anteprima del blocco (dove c'e Avvia), non piu di colpo alla Home.
- **Si imposta tutto, pre-allenamento**: in "Modifica routine" ogni esercizio ha le tessere **Kg** e **Reps** (tocchi -> tastierino grande) e un campo **Nota**. I target e le note compaiono nell'anteprima e **precompilano il diario** (es. RDL parte da 60 kg x 8) con la nota visibile durante l'allenamento. Niente piu "cambia i target" che non si poteva fare.
- **Niente piu scheda di sola lettura per sbaglio**: nell'editor il nome non apre piu il dettaglio; la consultazione e dall'anteprima (tocchi l'esercizio). E il titolo in alto e quello giusto (nome esercizio, non "Modifica").
- **Spazi sfruttati, niente bandoni**: i pulsanti d'azione (Avvia/Modifica, Fatto/Aggiungi) sono spinti in basso a riempire lo spazio e restare comodi al pollice; la Home tiene il footer in fondo. Il tastierino numerico e ora condiviso (diario + editor).
Service worker a `aureo-v31`.
