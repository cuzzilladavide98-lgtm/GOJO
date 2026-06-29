/* =====================================================================
   L'ALLENAMENTO AUREO — Dati dei 17 esercizi
   Estratti dal "Manuale Tecnico degli Esercizi" (Giugno 2026)
   Ogni esercizio: priorità, blocco, fasi del movimento, ritmo/respiro,
   errori da evitare + correzioni, e una illustrazione SVG istruttiva.
   Le coordinate "illu" descrivono figure-manichino in vista laterale/frontale
   con linee di riferimento, frecce e muscoli evidenziati.
   ===================================================================== */

const EXERCISES = [];

/* 1 — JUMPING JACK */
EXERCISES.push({
  n: 1, id: "jumping-jack", nome: "Jumping jack",
  priorita: "bassa", blocco: 1, categoria: "Riscaldamento / coordinazione",
  tipo: "dynamic", work: 40, rest: 20,
  muscoli: "Deltoidi, polpacci, abduttori/adduttori d'anca",
  fasi: [
    ["Posizione iniziale", "In piedi, piedi uniti, braccia lungo i fianchi, colonna neutra, peso a metà piede."],
    ["Apertura", "Salto leggero: gambe oltre la larghezza delle spalle mentre le braccia salgono lateralmente sopra la testa."],
    ["Punto critico", "Massima apertura: spalle in flessione/abduzione completa. Evita collasso dell'arco plantare e valgo di ginocchio."],
    ["Chiusura", "Salto per riportare piedi uniti e braccia ai fianchi, ritmico. Atterra morbido sull'avampiede, ginocchia morbide."]
  ],
  ritmo: "1–2 cicli/secondo, fluido", respiro: "Continua, mai in apnea", tensione: "Bassa-moderata (attivazione)",
  errori: [
    ["Atterraggio rigido a gambe tese", "Ammortizza con caviglia e ginocchio, ricevi sull'avampiede."],
    ["Spalle che si alzano alle orecchie", "Alza le braccia tenendo le scapole stabili e il collo lungo."],
    ["Ginocchia che cedono all'interno", "Spingi le ginocchia verso le punte e attiva i glutei."]
  ],
  illu: {
    vb: "0 0 200 200", floor: 184,
    ghost: [[100,46,100,108,22],[88,50,84,80,12],[84,80,82,110,10],[112,50,116,80,12],[116,80,118,110,10],[94,108,94,150,14],[94,150,94,182,11],[106,108,106,150,14],[106,150,106,182,11]],
    ghostHead: [100,30,11],
    body: [[100,46,100,108,22],[88,50,70,32,12],[70,32,58,16,10],[112,50,130,32,12],[130,32,142,16,10],[92,108,74,150,14],[74,150,60,182,11],[108,108,126,150,14],[126,150,140,182,11]],
    head: [100,30,11],
    refs: [[100,12,100,184,"plumb"]],
    arcs: [["arc",82,108,60,20,40,60],["arc",118,108,140,20,140,60]],
    arrows: [],
    hi: [[88,48,72,30,18],[112,48,128,30,18],[74,150,60,182,16],[126,150,140,182,16]],
    note: "Due frame sovrapposti: chiuso (ombra) e aperto. La colonna resta a piombo."
  }
});

/* 2 — COSSACK SQUAT */
EXERCISES.push({
  n: 2, id: "cossack-squat", nome: "Cossack squat",
  priorita: "media", blocco: 1, categoria: "Squat laterale / mobilità d'anca",
  tipo: "reps", work: 40, rest: 30,
  muscoli: "Quadricipiti e gluteo (gamba flessa), adduttori (gamba estesa)",
  fasi: [
    ["Posizione iniziale", "Piedi molto più larghi delle spalle, punte leggermente extraruotate, busto eretto, mani giunte davanti al petto."],
    ["Eccentrica", "Trasferisci il peso su una gamba flettendo anca e ginocchio; la gamba opposta resta tesa, tallone a terra, punta sollevata (dorsiflessione)."],
    ["Punto critico", "Massima profondità: tallone della gamba flessa a terra, tibia che avanza, anca in flessione ed extrarotazione."],
    ["Concentrica", "Spingi con il tallone per risalire, o trasla fluido verso il lato opposto. Busto sempre alto."]
  ],
  ritmo: "Discesa 2–3 s, controllo costante", respiro: "Inspira giù, espira su", tensione: "Media, focus su controllo e mobilità",
  errori: [
    ["Tallone della gamba flessa che si solleva", "Lavora la mobilità di caviglia, 'siediti indietro', riduci la profondità."],
    ["Schiena che si arrotonda", "Mantieni il petto alto e una leggera anteroversione del bacino."],
    ["Ginocchio che collassa all'interno", "Spingi il ginocchio verso la punta del piede e attiva il gluteo medio."]
  ],
  illu: {
    vb: "0 0 200 200", floor: 184,
    body: [[100,150,101,104,22],[101,108,120,116,12],[120,116,134,120,10],
           [92,150,72,162,14],[72,162,76,182,11],[76,182,64,184,9],
           [108,150,140,170,14],[140,170,170,180,11],[170,180,170,170,9]],
    head: [104,90,11],
    refs: [[95,98,82,184,"plumb"],[72,160,64,186,"track"]],
    arcs: [],
    arrows: [["arrow",118,150,150,150]],
    hi: [[92,150,72,162,18],[140,170,160,176,16]],
    note: "Fondo del movimento: tallone della gamba flessa a terra, gamba opposta tesa con punta in su."
  }
});

/* 3 — PLANK -> PUSH-UP */
EXERCISES.push({
  n: 3, id: "plank-pushup", nome: "Plank → Push-up",
  priorita: "alta", blocco: 1, categoria: "Spinta orizzontale",
  tipo: "reps", work: 40, rest: 45,
  muscoli: "Gran pettorale, tricipite, deltoide anteriore",
  fasi: [
    ["Posizione iniziale", "Plank alto sulle mani, mani sotto le spalle, corpo in linea testa-bacino-talloni, scapole protratte, glutei e quadricipiti attivi."],
    ["Eccentrica", "Fletti i gomiti tenendoli a ~45° dal tronco e abbassa il corpo come un blocco unico finché il petto è poco sopra il suolo."],
    ["Punto critico", "Petto al punto più basso, gomiti dietro le mani: massima richiesta per pettorale e tricipite."],
    ["Concentrica", "Spingi il pavimento lontano estendendo i gomiti, linea del corpo invariata. Lockout con scapole protratte."]
  ],
  ritmo: "2-1-1 (circa 2 s di discesa)", respiro: "Inspira in discesa, espira spingendo", tensione: "Alta, corpo rigido per tutto il movimento",
  errori: [
    ["Bacino che cede verso il pavimento", "Contrai glutei e addome, immagina una plancia rigida testa-talloni."],
    ["Gomiti larghi a 90°", "Portali a ~45°, orienta le mani leggermente verso l'esterno."],
    ["Range parziale", "Scendi col petto fino a sfiorare il suolo mantenendo la linea."]
  ],
  illu: {
    vb: "0 0 220 190", floor: 176,
    ghost: [[58,128,108,140,22],[108,140,158,128,22],[48,140,58,128,11],[44,150,48,140,9],[158,128,160,150,12],[160,150,162,176,10]],
    ghostHead: [170,122,10],
    body: [[54,150,104,150,22],[104,150,150,142,22],[44,162,54,150,11],[40,172,44,162,9],[150,142,150,160,12],[150,160,160,176,10]],
    head: [162,138,10],
    refs: [[40,172,168,138,"bodyline"]],
    arrows: [["arrow",120,118,120,142],["arrow",136,142,136,118]],
    hi: [[150,142,150,160,16],[108,142,150,138,26]],
    note: "Sopra (ombra) lockout, sotto petto a terra. Una sola retta orecchio-spalla-anca-caviglia."
  }
});

/* 4 — LEG SWING */
EXERCISES.push({
  n: 4, id: "leg-swing", nome: "Leg swing",
  priorita: "bassa", blocco: 1, categoria: "Mobilità dinamica d'anca",
  tipo: "dynamic", work: 30, rest: 15,
  muscoli: "Flessori ed estensori d'anca (dinamici)",
  fasi: [
    ["Posizione iniziale", "In piedi su una gamba, eventuale appoggio leggero con una mano, busto verticale, core attivo."],
    ["Oscillazione", "Oscilla la gamba libera dall'anca, ampiezza progressiva, senza compensare con il busto."],
    ["Punto critico", "Massima ampiezza: bacino fermo, evita l'iperlordosi nello slancio indietro."],
    ["Chiusura", "Rallenta e torna in piedi in controllo. Variante: oscillazioni medio-laterali."]
  ],
  ritmo: "10–12 oscillazioni per direzione", respiro: "Libera", tensione: "Bassa, gamba d'appoggio salda",
  errori: [
    ["Busto che oscilla con la gamba", "Fissa lo sterno e muovi solo dall'anca."],
    ["Iperlordosi nello slancio indietro", "Limita l'estensione, bacino in leggera retroversione."],
    ["Gamba d'appoggio rigida e bloccata", "Tieni un micro-piega al ginocchio per stabilità."]
  ],
  illu: {
    vb: "0 0 200 200", floor: 184,
    ghost: [[100,108,116,148,14],[116,148,128,182,11]],
    body: [[100,46,100,108,22],[100,52,86,84,12],[86,84,78,112,10],
           [100,108,86,148,14],[86,148,74,176,11],[74,176,62,172,9],
           [100,108,108,148,14],[108,148,118,150,11]],
    head: [100,30,11],
    refs: [[100,16,100,184,"plumb"]],
    arcs: [["arc",118,150,74,176,96,200]],
    arrows: [],
    hi: [[100,108,90,140,16]],
    note: "La verticale del bacino non oscilla: si muove solo il femore."
  }
});

/* 5 — JUMP SQUAT */
EXERCISES.push({
  n: 5, id: "jump-squat", nome: "Jump squat",
  priorita: "media", blocco: 2, categoria: "Potenza / triplice estensione",
  tipo: "reps", work: 30, rest: 60,
  muscoli: "Glutei, quadricipiti, femorali, polpacci",
  fasi: [
    ["Caricamento (eccentrica)", "Contro-movimento rapido: fletti anca, ginocchio e caviglia in un quarto/mezzo squat, busto inclinato, braccia indietro."],
    ["Punto critico", "Transizione bassa: inverti rapidamente (ciclo allungamento-accorciamento) per massimizzare la forza."],
    ["Concentrica / volo", "Triplice estensione esplosiva di anca, ginocchio e caviglia; braccia che slanciano in alto; decollo."],
    ["Atterraggio", "Ricevi sull'avampiede e ammortizza flettendo anca, ginocchio e caviglia; ginocchia allineate alle punte."]
  ],
  ritmo: "Contro-movimento breve e veloce, esplosivo", respiro: "Inspira prima, breve apnea nell'esplosione", tensione: "Massimale e breve",
  errori: [
    ["Atterraggio rumoroso e rigido", "Atterra 'come un ninja': ammortizza e ricevi sull'avampiede."],
    ["Valgo di ginocchio in spinta o atterraggio", "Guida le ginocchia verso le punte e attiva i glutei."],
    ["Profondità eccessiva che rallenta il rimbalzo", "Usa un contro-movimento breve e veloce, non uno squat completo."]
  ],
  illu: {
    vb: "0 0 200 200", floor: 184,
    ghost: [[100,150,100,118,22],[100,122,82,128,12],[82,128,70,118,10],[94,150,80,158,14],[80,158,84,176,11],[108,150,118,158,14],[118,158,120,176,11]],
    ghostHead: [104,104,11],
    body: [[100,86,100,42,22],[100,48,118,26,12],[118,26,128,10,10],[100,48,116,30,12],
           [96,86,94,124,14],[94,124,96,150,11],[96,150,108,150,9],
           [104,86,108,124,14],[108,124,108,150,11]],
    head: [100,26,11],
    refs: [],
    arrows: [["arrow",140,140,140,70]],
    hi: [[96,86,95,124,16],[104,86,108,124,16]],
    note: "Caricamento (ombra) poi estensione completa in volo. Ginocchio sopra la punta in ogni frame."
  }
});

/* 6 — WALL HANDSTAND */
EXERCISES.push({
  n: 6, id: "wall-handstand", nome: "Wall handstand",
  priorita: "alta", blocco: 2, categoria: "Skill / spinta verticale isometrica",
  tipo: "hold", work: 30, rest: 60,
  muscoli: "Deltoidi, trapezio, tricipiti (isometrici)",
  fasi: [
    ["Posizione iniziale", "Mani a terra a ~larghezza spalle, dita aperte e attive; piedi verso il muro o kick-up controllato."],
    ["Salita", "Porta i piedi sul muro camminando indietro con le mani o con un calcio a salire controllato fino alla verticale."],
    ["Tenuta (punto critico)", "Allineamento polsi-spalle-bacino-caviglie a piombo; spalle elevate, costato chiuso, bacino in retroversione, glutei e addome attivi."],
    ["Discesa", "Cammina giù con le mani o riporta una gamba alla volta, in controllo."]
  ],
  ritmo: "Tenute 20–40 s", respiro: "Corta e costante, mai apnea lunga", tensione: "Alta, corpo come 'una linea'",
  errori: [
    ["Schiena inarcata a banana", "Retroverti il bacino, chiudi il costato, attiva addome e glutei."],
    ["Spalle affondate verso le orecchie", "Spingi il pavimento ed eleva le scapole."],
    ["Cadute per polsi deboli", "Rinforza polsi e avambracci, distribuisci il peso fino ai polpastrelli."]
  ],
  illu: {
    vb: "0 0 200 200", floor: 182,
    wrong: [[110,128,124,86,10],[124,86,116,54,9],[116,54,110,30,8]],
    body: [[110,180,110,128,12],[110,128,110,84,22],
           [110,84,113,54,14],[113,54,119,30,11],[119,30,126,26,9]],
    head: [110,162,10],
    refs: [[110,22,110,182,"plumb"],[130,24,130,182,"track"]],
    arrows: [["arrow",95,178,95,142]],
    hi: [[110,124,110,150,18]],
    note: "Corpo capovolto: una sola verticale polso-spalla-bacino-caviglia. In rosso l'errore 'a banana'; la freccia indica la spinta sul pavimento."
  }
});

/* 7 — PIKE PUSH-UP */
EXERCISES.push({
  n: 7, id: "pike-pushup", nome: "Pike push-up",
  priorita: "alta", blocco: 3, categoria: "Spinta verticale",
  tipo: "reps", work: 35, rest: 60,
  muscoli: "Deltoide anteriore e laterale, tricipite, trapezio superiore",
  fasi: [
    ["Posizione iniziale", "V rovesciata (pike): mani e piedi a terra, anche alte, gambe e braccia quasi tese, busto vicino alla verticale."],
    ["Eccentrica", "Fletti i gomiti abbassando la testa in avanti verso un punto davanti alle mani (traiettoria a triangolo), gomiti a ~45°."],
    ["Punto critico", "Testa vicino al suolo davanti alle mani: massimo carico su deltoidi e tricipiti."],
    ["Concentrica", "Spingi tornando alla posizione a V, estendendo i gomiti. Anche alte, scapole che ruotano verso l'alto."]
  ],
  ritmo: "2-1-1", respiro: "Inspira in discesa, espira in spinta", tensione: "Alta sulle spalle",
  errori: [
    ["Anche che calano (push-up inclinato)", "Mantieni le anche alte e avvicina i piedi alle mani per verticalizzare."],
    ["Testa che scende dietro o sopra le mani", "Punta a un bersaglio davanti alle mani, traiettoria a triangolo."],
    ["Gomiti che si allargano a 90°", "Tienili a ~45° dal tronco."]
  ],
  illu: {
    vb: "0 0 220 190", floor: 176,
    ghost: [[62,176,82,118,12],[82,118,112,96,22],[112,96,138,134,14],[138,134,152,176,11]],
    ghostHead: [76,118,10],
    body: [[62,176,84,140,12],[84,140,112,100,22],[112,100,138,135,14],[138,135,152,176,11],[84,140,70,154,12]],
    head: [66,150,10],
    refs: [[62,176,66,150,"track"],[66,150,112,100,"track"]],
    arrows: [["arrow",92,120,72,148],["arrow",104,118,104,96]],
    hi: [[84,140,112,108,24]],
    note: "Triangolo mani-testa: la testa scende davanti alle mani, anche alte, busto quasi verticale."
  }
});

/* 8 — ARCHER PUSH-UP */
EXERCISES.push({
  n: 8, id: "archer-pushup", nome: "Archer push-up",
  priorita: "alta", blocco: 3, categoria: "Spinta orizzontale unilaterale",
  tipo: "reps", work: 40, rest: 60,
  muscoli: "Gran pettorale e tricipite del lato lavorante, deltoide anteriore",
  fasi: [
    ["Posizione iniziale", "Push-up con mani molto più larghe delle spalle, corpo rigido, scapole protratte."],
    ["Eccentrica", "Piega un gomito spostando peso e petto verso quella mano; l'altro braccio resta teso e scivola lateralmente, palmo a terra."],
    ["Punto critico", "Petto vicino alla mano lavorante, braccio opposto completamente esteso: forte richiesta unilaterale e di anti-rotazione."],
    ["Concentrica / alternanza", "Spingi con il braccio flesso per tornare al centro. Ripeti dal lato opposto con anche 'quadrate'."]
  ],
  ritmo: "3-1-1 controllato", respiro: "Inspira in discesa, espira in spinta", tensione: "Alta, forte anti-rotazione",
  errori: [
    ["Bacino che ruota verso il braccio teso", "Tieni le anche quadrate e contrai il gluteo del lato opposto."],
    ["Braccio esteso che aiuta a spingere", "Mantienilo passivo e teso: il peso deve stare sul braccio che lavora."],
    ["Petto che non scende vicino alla mano", "Aumenta il range e controlla l'eccentrica."]
  ],
  illu: {
    vb: "0 0 200 200", floor: 178,
    body: [[100,118,100,82,22],[92,84,76,52,14],[108,84,124,52,14],
           [78,118,58,142,14],[58,142,40,154,12],
           [122,118,158,150,14],
           [100,118,84,118,0]],
    head: [100,134,10],
    refs: [[40,118,160,118,"level"]],
    arrows: [["arrow",118,128,78,140]],
    hi: [[78,118,58,142,18],[58,142,40,154,16],[100,100,100,118,20]],
    note: "Vista frontale: peso sul braccio flesso, l'altro teso lateralmente. Le anche restano livellate (linea orizzontale)."
  }
});

/* 9 — INVERTED ROW */
EXERCISES.push({
  n: 9, id: "inverted-row", nome: "Inverted row (sotto al tavolo)",
  priorita: "alta", blocco: 3, categoria: "Trazione orizzontale",
  tipo: "reps", work: 40, rest: 60,
  muscoli: "Gran dorsale, romboidi, trapezio medio, bicipite",
  fasi: [
    ["Posizione iniziale", "Supino sotto una barra o un tavolo robusto, presa poco più larga delle spalle, corpo teso dai talloni alle spalle, braccia estese."],
    ["Concentrica (tirata)", "Inizia retraendo le scapole, poi tira i gomiti verso il fianco portando lo sterno alla barra."],
    ["Punto critico", "Petto vicino alla barra, massima retrazione scapolare: picco per dorso e bicipiti."],
    ["Eccentrica", "Abbassa in controllo fino all'estensione completa delle braccia e alla protrazione scapolare. Corpo sempre rigido."]
  ],
  ritmo: "1-1-2 (eccentrica controllata)", respiro: "Espira tirando, inspira scendendo", tensione: "Alta, corpo a plancia",
  errori: [
    ["Bacino che si abbassa", "Contrai glutei e addome: il corpo deve restare un'asse rigida."],
    ["Tirare solo con le braccia", "Inizia dalla retrazione scapolare, poi conduci con i gomiti."],
    ["Mezzo range (petto lontano dalla barra)", "Tira finché lo sterno tocca e controlla la discesa."]
  ],
  illu: {
    vb: "0 0 220 190", floor: 178,
    bar: [120,64,180,64],
    ghost: [[150,72,150,128,12]],
    body: [[52,150,110,134,22],[110,134,150,128,22],[52,150,46,150,9],
           [150,128,150,100,12],[150,100,152,72,10]],
    head: [162,124,10],
    refs: [[48,150,160,126,"bodyline"]],
    arrows: [["arrow",150,118,150,82],["arc",126,130,150,108,130,118]],
    hi: [[110,130,150,124,24]],
    note: "Corpo rigido caviglia-anca-spalla. La scapola si retrae per prima, poi il gomito tira lo sterno alla barra."
  }
});

/* 10 — PISTOL SQUAT */
EXERCISES.push({
  n: 10, id: "pistol-squat", nome: "Pistol squat",
  priorita: "alta", blocco: 3, categoria: "Squat monopodalico",
  tipo: "reps", work: 40, rest: 60,
  muscoli: "Quadricipite e grande gluteo della gamba d'appoggio",
  fasi: [
    ["Posizione iniziale", "In piedi su una gamba, l'altra tesa in avanti e sollevata, braccia avanti come contrappeso, colonna neutra."],
    ["Eccentrica", "Fletti anca, ginocchio e caviglia della gamba d'appoggio scendendo lento; il busto si inclina avanti per tenere il baricentro sul piede."],
    ["Punto critico", "Massima profondità (gluteo vicino al tallone): caviglia in forte dorsiflessione, ginocchio oltre la punta ma in traccia, tallone a terra."],
    ["Concentrica", "Spingi con tallone e medio-piede risalendo, estendendo anca e ginocchio senza valgo."]
  ],
  ritmo: "3 s di eccentrica, breve pausa, risalita controllata", respiro: "Inspira giù, espira su", tensione: "Alta, forte componente di equilibrio",
  errori: [
    ["Tallone che si solleva", "Migliora la dorsiflessione; in apprendimento usa un piccolo rialzo sotto il tallone."],
    ["Ginocchio che collassa all'interno", "Guida il ginocchio verso il 2°-3° dito e attiva il gluteo medio."],
    ["Arrotondamento lombare in basso (butt wink)", "Ferma il range dove la schiena resta neutra e rinforza il controllo."]
  ],
  illu: {
    vb: "0 0 200 200", floor: 184,
    body: [[92,150,74,110,22],[74,112,108,120,12],[108,120,124,124,10],
           [96,150,120,152,14],[120,152,98,176,11],[98,176,88,184,9],
           [94,150,122,142,14],[122,142,152,138,11],[152,138,152,130,9]],
    head: [68,96,11],
    refs: [[86,92,92,184,"plumb"],[120,152,90,186,"track"]],
    arrows: [["arrow",60,150,60,110]],
    hi: [[92,150,76,112,18],[96,150,120,152,16]],
    note: "Fondo: tallone a terra (dorsiflessione), ginocchio sopra la punta, busto inclinato ma colonna neutra. Gamba libera tesa avanti."
  }
});

/* 11 — NORDIC CURL */
EXERCISES.push({
  n: 11, id: "nordic-curl", nome: "Nordic curl",
  priorita: "alta", blocco: 3, categoria: "Hinge eccentrico / femorali",
  tipo: "reps", work: 35, rest: 75,
  muscoli: "Femorali (bicipite femorale, semitendinoso, semimembranoso)",
  fasi: [
    ["Posizione iniziale", "In ginocchio su superficie morbida, caviglie bloccate, corpo eretto in linea ginocchia-anca-spalle, anca estesa."],
    ["Eccentrica", "Abbassa il busto in avanti il più lento possibile resistendo con i femorali, corpo come un segmento unico rigido (l'anca NON si flette)."],
    ["Punto critico", "Zona a ~30-45° dal suolo, dove la leva è massima e i femorali cedono: qui evita di 'rompere' all'anca."],
    ["Concentrica", "Quando non riesci più a frenare, ammortizza con le mani a terra e aiutati con le braccia a risalire."]
  ],
  ritmo: "Eccentrica 3–5 s, massimo controllo", respiro: "Controlla/espira in discesa", tensione: "Massimale in eccentrica",
  errori: [
    ["Flettere l'anca per scendere (sedere indietro)", "Mantieni glutei contratti e anca estesa: corpo in linea retta."],
    ["Caduta rapida non controllata", "Rallenta, riduci il range iniziale, usa una banda elastica come assistenza."],
    ["Iperestensione lombare", "Chiudi il costato e tieni una leggera retroversione del bacino."]
  ],
  illu: {
    vb: "0 0 220 190", floor: 176,
    anchor: [168,160,186,176],
    ghost: [[150,160,150,118,14],[150,118,150,72,22],[150,72,150,52,9]],
    ghostHead: [150,46,10],
    body: [[150,160,128,148,14],[150,160,176,168,11],
           [128,148,86,120,22],[86,120,70,108,9],
           [128,148,118,160,12],[118,160,108,170,10]],
    head: [64,102,10],
    refs: [[150,160,150,52,"bodyline"],[150,160,80,116,"bodyline"]],
    arcs: [["arc",150,72,80,116,110,60]],
    hi: [[150,160,128,148,18],[128,148,150,118,18]],
    note: "Segmento unico ginocchia-anca-spalle che resta dritto in ogni frame (verticale → ~45°). L'anca NON si flette."
  }
});

/* 12 — DRAGON FLAG */
EXERCISES.push({
  n: 12, id: "dragon-flag", nome: "Dragon flag",
  priorita: "alta", blocco: 3, categoria: "Core anti-estensione",
  tipo: "reps", work: 30, rest: 75,
  muscoli: "Retto dell'addome e obliqui (anti-estensione)",
  fasi: [
    ["Posizione iniziale", "Supino su una panca, mani che afferrano un appoggio dietro la testa; corpo sollevato in appoggio solo sulle scapole."],
    ["Eccentrica", "Abbassa lentamente il corpo, un unico segmento rigido dalle spalle ai piedi, verso il suolo senza toccare, resistendo con l'addome."],
    ["Punto critico", "Corpo quasi parallelo al suolo, leva massima: rischio di inarcare la zona lombare."],
    ["Concentrica", "Risali riportando il corpo verso la verticale, sempre rigido. Le scapole restano l'unico punto d'appoggio."]
  ],
  ritmo: "Eccentrica 3–4 s", respiro: "Espira in risalita, controllo costante", tensione: "Massimale del core",
  errori: [
    ["Zona lombare che si inarca", "Chiudi il costato, premi la regione lombare 'verso dentro', riduci il range."],
    ["Piegare le anche per facilitare", "Mantieni il corpo come un'asse unica; regredisci a ginocchia piegate se serve."],
    ["Discesa a scatti", "Controlla l'eccentrica e rallenta."]
  ],
  illu: {
    vb: "0 0 220 190", floor: 176,
    bench: [120,120,186,134],
    ghost: [[140,118,138,78,22],[138,78,136,50,14],[136,50,135,28,11]],
    ghostHead: [148,118,9],
    body: [[140,118,96,116,22],[96,116,68,114,14],[68,114,48,112,11],
           [140,118,156,112,10]],
    head: [150,118,9],
    refs: [[48,112,140,118,"bodyline"]],
    arcs: [["arc",138,60,96,116,110,90]],
    hi: [[140,118,98,116,22]],
    note: "Appoggio solo sulle scapole. Corpo come asse unica spalle-anca-caviglia (verticale → quasi parallelo). Niente inarco lombare."
  }
});

/* 13 — SIDE PLANK / COPENHAGEN */
EXERCISES.push({
  n: 13, id: "side-plank", nome: "Side plank / Copenhagen",
  priorita: "media", blocco: 3, categoria: "Core anti-rotazione / adduttori",
  tipo: "hold", work: 30, rest: 30,
  muscoli: "Obliqui e quadrato dei lombi (side plank); adduttori (Copenhagen)",
  fasi: [
    ["Posizione iniziale", "Su un fianco, gomito sotto la spalla, avambraccio a terra, corpo in linea, piedi sovrapposti o sfalsati."],
    ["Tenuta", "Solleva l'anca finché il corpo è una linea retta caviglie-anca-spalla; anca alta, glutei attivi."],
    ["Variante Copenhagen", "Gamba superiore appoggiata con la parte interna su una panca, gamba inferiore sospesa; solleva il bacino spingendo con gli adduttori."],
    ["Punto critico", "Mantenere l'anca alta senza ruotare il tronco né lasciar cadere il bacino."]
  ],
  ritmo: "Tenute 20–40 s o ripetizioni lente", respiro: "Regolare", tensione: "Alta, isometrica",
  errori: [
    ["Anca che cala", "Solleva il bacino, contrai glutei e obliqui, tieni l'anca alta."],
    ["Rotazione del tronco", "Impila spalle e anche, sguardo avanti, core attivo."],
    ["Spalla d'appoggio che affonda", "Spingi il pavimento e attiva il gran dentato."]
  ],
  illu: {
    vb: "0 0 220 190", floor: 178,
    body: [[60,140,112,150,22],[112,150,150,156,14],[150,156,170,160,11],[170,160,180,158,9],
           [60,140,60,176,12],[60,176,40,178,9],[60,140,62,116,12]],
    head: [52,126,10],
    refs: [[40,178,170,160,"bodyline"],[60,138,60,178,"plumb"]],
    arrows: [["arrow",96,170,96,150]],
    hi: [[80,143,120,151,20]],
    note: "Gomito esattamente sotto la spalla. Linea retta caviglia-anca-spalla, anca alta, niente rotazione del tronco."
  }
});

/* 14 — HOLLOW HOLD */
EXERCISES.push({
  n: 14, id: "hollow-hold", nome: "Hollow hold",
  priorita: "media", blocco: 3, categoria: "Core anti-estensione",
  tipo: "hold", work: 30, rest: 30,
  muscoli: "Retto dell'addome, trasverso, flessori d'anca",
  fasi: [
    ["Posizione iniziale", "Supino, braccia oltre la testa, gambe tese; premi la zona lombare contro il pavimento (retroversione del bacino)."],
    ["Tenuta", "Solleva insieme spalle (scapole appena staccate) e gambe, mantenendo la lombare SEMPRE a contatto col suolo; corpo a 'banana' poco profonda."],
    ["Punto critico", "Gambe basse e braccia distese aumentano la leva: se la lombare si stacca, la posizione è persa."],
    ["Regola la leva", "Piega le ginocchia o avvicina le braccia per ridurre la leva; estendi tutto per aumentarla."]
  ],
  ritmo: "Tenuta 15–30 s", respiro: "Corta e costante, addome attivo", tensione: "Alta, isometrica",
  errori: [
    ["Spazio sotto la zona lombare", "Premi la schiena a terra e riduci la leva (gambe più alte o ginocchia piegate)."],
    ["Tensione sul collo", "Sguardo verso l'alto, solleva dallo sterno e non dal mento."],
    ["Apnea", "Respira in modo corto e costante mantenendo l'addome attivo."]
  ],
  illu: {
    vb: "0 0 220 180", floor: 150,
    body: [[150,138,108,146,22],[108,146,150,138,0],
           [150,138,168,128,12],[168,128,184,120,10],
           [110,146,76,134,14],[76,134,48,126,11]],
    head: [162,134,10],
    refs: [[20,150,200,150,"floorline"],[96,146,120,146,"press"]],
    arrows: [["arrow",172,118,172,104],["arrow",54,118,54,104],["arrow",108,156,108,148]],
    hi: [[148,140,108,146,22]],
    note: "Zona lombare premuta a terra (linea), spalle e gambe sollevate di pochi gradi: 'banana' poco profonda."
  }
});

/* 15 — BURPEE */
EXERCISES.push({
  n: 15, id: "burpee", nome: "Burpee",
  priorita: "media", blocco: 4, categoria: "Full-body / condizionamento",
  tipo: "reps", work: 40, rest: 45,
  muscoli: "Full-body: quadricipiti e glutei, pettorali e tricipiti, core",
  fasi: [
    ["Fase 1 — Squat down", "Dalla stazione eretta, fletti anca e ginocchio e appoggia le mani a terra davanti ai piedi."],
    ["Fase 2 — Kick-back in plank", "Spingi o salta i piedi indietro fino a un plank rigido (corpo in linea, niente bacino cadente)."],
    ["Fase 3 — Push-up (opzionale)", "Un piegamento completo mantenendo la linea del corpo."],
    ["Fase 4 — Tuck e jump", "Riporta i piedi sotto le anche e salta in verticale con triplice estensione e braccia in alto. Atterra ammortizzato."]
  ],
  ritmo: "Condizionante e continuo, plank rigido e atterraggio controllato", respiro: "Espira nello sforzo, ritmo costante", tensione: "Media, variabile per fase",
  errori: [
    ["Bacino che crolla nel passaggio a plank", "Atterra in plank rigido con glutei e addome attivi."],
    ["Schiena arrotondata nel raccogliere i piedi", "Fletti dalle anche tenendo il petto alto."],
    ["Atterraggio rigido del salto", "Ricevi sull'avampiede e ammortizza."]
  ],
  illu: {
    vb: "0 0 400 150", floor: 130, seq: true,
    body: [
      [40,86,40,64,16],[40,68,30,80,9],[40,90,30,108,12],[30,108,36,128,9],[40,90,52,108,12],[52,108,46,128,9],[34,80,28,92,8],
      [120,108,168,108,16],[112,118,120,108,9],[110,128,112,118,7],[168,108,170,118,9],[170,118,172,128,8],
      [240,104,288,104,16],[232,116,240,104,9],[230,128,232,116,7],[288,104,292,114,9],[292,114,294,128,8],
      [350,60,350,40,16],[350,46,338,30,9],[350,46,362,30,9],[346,84,340,108,12],[340,108,344,126,9],[354,84,360,108,12],[360,108,356,126,9],[350,64,350,86,14]
    ],
    heads: [[40,54,9],[105,108,8],[226,104,8],[350,28,9]],
    refs: [[110,128,172,108,"bodyline"],[230,128,294,104,"bodyline"]],
    arrows: [["arrow",66,100,98,108],["arrow",190,108,222,108],["arrow",310,100,334,80]],
    labels: [[40,142,"1 · squat"],[140,142,"2 · plank"],[260,142,"3 · push-up"],[350,142,"4 · jump"]],
    note: "Sequenza squat → plank → push-up → salto. Nel plank, retta caviglia-anca-spalla; nel salto estensione completa."
  }
});

/* 16 — LOADED CARRY (SUITCASE) */
EXERCISES.push({
  n: 16, id: "loaded-carry", nome: "Loaded carry (suitcase)",
  priorita: "media", blocco: 4, categoria: "Trasporto / anti-flessione laterale",
  tipo: "carry", work: 45, rest: 45,
  muscoli: "Trapezio, core (quadrato dei lombi, obliqui), avambracci (presa)",
  fasi: [
    ["Posizione iniziale", "In piedi, un peso (max 10 kg) in una mano (suitcase) o stretto al petto (bear-hug); colonna neutra, spalle basse e indietro."],
    ["Marcia", "Cammina con passi corti e controllati mantenendo il busto perfettamente verticale; nel suitcase resisti all'inclinazione laterale verso il peso."],
    ["Punto critico", "Ogni passo sfida la stabilità di bacino e core: non lasciare che la spalla del lato carico si abbassi."],
    ["Chiusura", "Alterna la mano per bilanciare il lavoro. Deponi il peso con un hip hinge corretto."]
  ],
  ritmo: "Percorsi di 30–50 passi o a tempo", respiro: "Regolare", tensione: "Alta e costante su core e presa",
  errori: [
    ["Inclinazione laterale verso il peso", "Mantieni le spalle livellate, contrai il core del lato opposto, 'cammina alto'."],
    ["Spalla che si arrotonda in avanti", "Spalla bassa e indietro, scapola attiva."],
    ["Presa che cede", "Stringi forte con l'avambraccio attivo; riduci il peso se la tecnica cala."]
  ],
  illu: {
    vb: "0 0 200 200", floor: 184,
    weight: [74,112,94,130],
    body: [[100,46,100,108,22],[88,50,86,80,12],[86,80,84,110,10],[112,50,114,80,12],[114,80,116,110,10],
           [92,108,90,150,14],[90,150,89,182,11],[108,108,110,150,14],[110,150,111,182,11]],
    head: [100,30,11],
    refs: [[100,16,100,184,"plumb"],[82,50,118,50,"level"],[86,108,114,108,"level"]],
    arrows: [["arc",84,118,118,118,100,96]],
    hi: [[112,52,116,90,16],[114,90,116,118,16]],
    note: "Spalle e bacino orizzontali e paralleli, colonna verticale: il busto NON si inclina verso il peso."
  }
});

/* 17 — REMATORE CON ZAINO */
EXERCISES.push({
  n: 17, id: "rematore-zaino", nome: "Rematore con zaino",
  priorita: "alta", blocco: 3, categoria: "Trazione orizzontale (hip hinge)",
  tipo: "reps", work: 40, rest: 60,
  muscoli: "Gran dorsale, romboidi, trapezio medio/inferiore, bicipite",
  fasi: [
    ["Posizione iniziale", "In piedi, zaino (max 10 kg) afferrato per bretelle o maniglia; esegui un hip hinge (anca indietro, schiena neutra, tibie quasi verticali) fino a busto ~45° o più."],
    ["Concentrica (tirata)", "Inizia retraendo le scapole, poi tira i gomiti verso l'alto/indietro lungo i fianchi portando lo zaino verso l'addome."],
    ["Punto critico", "Massima retrazione scapolare; il gomito non supera troppo la linea del corpo."],
    ["Eccentrica", "Abbassa lo zaino in controllo fino all'estensione completa, scapole che si 'aprono'. Schiena neutra per tutta la serie."]
  ],
  ritmo: "1-1-2 (eccentrica controllata)", respiro: "Espira tirando, inspira scendendo", tensione: "Alta, schiena isometrica",
  errori: [
    ["Schiena arrotondata", "Imposta l'hinge con schiena neutra e core attivo prima di tirare; riduci il carico."],
    ["Busto che si solleva per dare slancio", "Mantieni fisso l'angolo del busto, niente kipping."],
    ["Tirare solo con le braccia", "Inizia dalla retrazione scapolare e conduci con il gomito."]
  ],
  illu: {
    vb: "0 0 200 200", floor: 184,
    ghost: [[74,98,82,140,12],[82,140,86,162,10]],
    weight: [86,150,104,172],
    body: [[108,128,74,96,22],[100,176,100,150,11],[100,150,108,128,14],
           [74,98,80,124,12],[80,124,94,122,10],
           [64,84,74,96,9]],
    head: [62,82,11],
    refs: [[64,84,112,124,"bodyline"],[100,150,100,182,"plumb"]],
    arrows: [["arc",84,150,94,122,72,134]],
    hi: [[108,128,76,100,22]],
    note: "Hip hinge: schiena neutra (linea bacino-colonna-testa) che NON cambia angolo, tibie verticali. Scapola e gomito conducono la tirata."
  }
});

/* Etichette priorità e blocchi per la UI */
const PRIORITA_LABEL = { alta: "Priorità alta", media: "Priorità media", bassa: "Priorità bassa" };
const BLOCCHI = [
  { n: 1, nome: "Blocco 1 · Riscaldamento", desc: "Attivazione, mobilità e coordinazione" },
  { n: 2, nome: "Blocco 2 · Potenza & Skill", desc: "Esplosività e controllo isometrico" },
  { n: 3, nome: "Blocco 3 · Forza", desc: "Spinte, trazioni, gambe e core" },
  { n: 4, nome: "Blocco 4 · Condizionamento", desc: "Full-body e trasporti" }
];

if (typeof module !== "undefined") { module.exports = { EXERCISES, BLOCCHI, PRIORITA_LABEL }; }


