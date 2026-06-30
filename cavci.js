/* =====================================================================
   L'Allenamento Aureo - Sistema CAVCI (Rotazione Intelligente)
   Upper -> Lower -> Sled -> Corsa -> Cyclette -> Kettlebell -> Recupero
   (+ Protocollo 0 Reset). Esercizi reali (Hevy) con figure SVG nuove.
   ===================================================================== */
(function () {
  "use strict";
  function J(a, b, w) { return [a[0], a[1], b[0], b[1], w]; }
  function P(o) {
    var t = o.torsoW || 22, ua = 12, fa = 10, th = 14, sh = 11;
    function bonesFrom(j) {
      var b = [];
      if (j.neck && j.hip) b.push(J(j.neck, j.hip, t));
      if (j.armL) { b.push(J(j.armL[0], j.armL[1], ua)); b.push(J(j.armL[1], j.armL[2], fa)); }
      if (j.armR) { b.push(J(j.armR[0], j.armR[1], ua)); b.push(J(j.armR[1], j.armR[2], fa)); }
      if (j.legL) { b.push(J(j.legL[0], j.legL[1], th)); b.push(J(j.legL[1], j.legL[2], sh)); }
      if (j.legR) { b.push(J(j.legR[0], j.legR[1], th)); b.push(J(j.legR[1], j.legR[2], sh)); }
      return b;
    }
    var body = bonesFrom(o);
    if (o.extra) body = body.concat(o.extra);
    var il = { vb: o.vb || "0 0 200 200", body: body };
    if (o.head) il.head = o.head;
    ["floor", "wall", "bar", "bench", "anchor", "weight", "refs", "arrows", "arcs", "hi",
     "ghost", "ghostHead", "ghostOp", "wrong", "wrongHead", "heads", "labels", "note"].forEach(function (k) {
      if (o[k] !== undefined) il[k] = o[k];
    });
    if (il.ghost === undefined) {
      var gj = o.start || (o.swap ? { neck: o.neck, hip: o.hip, head: o.head, armL: o.armR, armR: o.armL, legL: o.legR, legR: o.legL } : null);
      if (gj) { il.ghost = bonesFrom(gj); if (gj.head) il.ghostHead = gj.head; if (il.ghostOp === undefined) il.ghostOp = o.swap ? 0.18 : 0.42; }
    } else if (il.ghostOp === undefined) { il.ghostOp = 0.42; }
    return il;
  }
  window.CAVCI_P = P;
  var EX = {
    dip: {
      nome: "Dip (zavorrato)", categoria: "Forza Upper", tipo: "dynamic", work: 35, rest: 150,
      presc: "3-5 x 4-8 - RPE 7-8 (1-2 reps in riserva)",
      muscoli: "Petto basso, tricipiti, deltoide anteriore, depressione scapolare",
      ritmo: "Discesa 2-3s, risalita controllata", respiro: "Inspira giu, espira su", tensione: "Spalle basse, petto avanti",
      fasi: [["Setup", "Spalle basse ma non bloccate, petto leggermente avanti, gomiti stabili."],
             ["Discesa", "Scendi controllato finche le spalle sono poco sotto i gomiti, niente dolore anteriore."],
             ["Spinta", "Spingi sui palmi risalendo senza scrollare le spalle."]],
      errori: [["Spalle che salgono alle orecchie", "Tieni le scapole depresse, collo lungo."],
               ["Discesa con dolore anteriore", "Limita il ROM dove la spalla resta sana."]],
      illu: P({ head: [100, 38, 11], neck: [100, 52], hip: [100, 112], torsoW: 22,
        armL: [[86, 56], [82, 86], [88, 116]], armR: [[114, 56], [118, 86], [112, 116]],
        legL: [[100, 112], [114, 138], [106, 152]], legR: [[100, 112], [86, 138], [94, 152]],
        bar: [56, 116, 92, 116], refs: [[108, 116, 144, 116, "press"]],
        hi: [[86, 56, 82, 86, 16], [114, 56, 118, 86, 16], [90, 60, 110, 60, 13]],
        arrows: [["a", 152, 126, 152, 100]],
        ghost: [[100,44,100,104,22],[86,48,87,82,12],[87,82,88,114,10],[114,48,113,82,12],[113,82,112,114,10],[100,104,112,128,14],[112,128,104,142,11],[100,104,88,128,14],[88,128,96,142,11]], ghostHead: [100,30,11], note: "Dip zavorrato: spinta di petto e tricipiti, scapole basse." })
    },
    chinup: {
      nome: "Trazione / Chin-Up (zavorrato)", categoria: "Forza Upper", tipo: "dynamic", work: 35, rest: 150,
      presc: "3-5 x 4-8 - RPE 7-8 (1-2 reps in riserva)",
      muscoli: "Dorsali, bicipiti, presa, controllo scapolare, apertura overhead",
      ritmo: "Salita decisa, discesa 2-3s", respiro: "Espira in salita", tensione: "Dead hang gestito, niente slanci",
      fasi: [["Dead hang", "Partenza appeso, scapole attive, niente slancio."],
             ["Tirata", "Gomiti verso le tasche, porta il petto alla sbarra."],
             ["Discesa", "Controlla la negativa fino alle braccia distese."]],
      errori: [["Slanci e kipping", "Parti fermo, movimento pulito dalla schiena."],
               ["Mezze ripetizioni", "Distendi in basso e arriva con il mento alla sbarra."]],
      illu: P({ head: [100, 44, 10], neck: [100, 56], hip: [100, 116], torsoW: 21,
        armL: [[90, 60], [89, 44], [88, 30]], armR: [[110, 60], [111, 44], [112, 30]],
        legL: [[100, 116], [96, 150], [98, 176]], legR: [[100, 116], [104, 150], [102, 176]],
        bar: [40, 28, 160, 28],
        hi: [[90, 62, 86, 98, 15], [110, 62, 114, 98, 15], [90, 60, 89, 46, 12], [110, 60, 111, 46, 12]],
        arrows: [["a", 150, 56, 150, 32]],
        ghost: [[100,48,100,104,21],[90,52,86,40,12],[86,40,90,30,10],[110,52,114,40,12],[114,40,110,30,10],[100,104,96,138,14],[96,138,98,162,11],[100,104,104,138,14],[104,138,102,162,11]], ghostHead: [100,36,10], note: "Trazione da dead hang: dorsali e bicipiti, gomiti verso le tasche." })
    },
    facepull: {
      nome: "Face Pull / Extra-rotazioni", categoria: "Forza Upper", tipo: "dynamic", work: 35, rest: 75, opt: true,
      presc: "2-3 x 12-20 (facoltativo, salute spalle)",
      muscoli: "Deltoide posteriore, cuffia dei rotatori, trapezio medio",
      ritmo: "Lento e controllato", respiro: "Espira tirando", tensione: "Gomiti alti, scapole indietro",
      fasi: [["Setup", "Cavo o elastico ad altezza viso, braccia tese."],
             ["Tirata", "Gomiti indietro e in alto, mani ai lati del viso, extra-ruota le spalle."]],
      errori: [["Troppo carico", "E' assicurazione, non forza: leggero e pulito."],
               ["Spalle in avanti", "Apri il petto, scapole indietro."]],
      illu: P({ head: [100, 40, 11], neck: [100, 54], hip: [100, 120], torsoW: 22,
        armL: [[86, 58], [66, 56], [80, 44]], armR: [[114, 58], [134, 56], [120, 44]],
        legL: [[100, 120], [96, 152], [96, 184]], legR: [[100, 120], [104, 152], [104, 184]],
        floor: 184, refs: [[64, 50, 136, 50, "track"]],
        hi: [[86, 58, 66, 56, 14], [114, 58, 134, 56, 14]],
        arrows: [["a", 70, 64, 80, 48], ["a", 130, 64, 120, 48]],
        start: { head: [100,40,11], neck: [100,54], hip: [100,120], armL: [[86,58],[72,60],[58,62]], armR: [[114,58],[128,60],[142,62]], legL: [[100,120],[96,152],[96,184]], legR: [[100,120],[104,152],[104,184]] }, note: "Face pull: deltoide posteriore e cuffia, gomiti alti." })
    },
    rdl: {
      nome: "Stacco Rumeno (RDL)", categoria: "Forza Lower", tipo: "dynamic", work: 35, rest: 165,
      presc: "3-4 x 5-8 - RPE 7-8 - recupero 2-3 min",
      muscoli: "Femorali, glutei, catena posteriore, erettori (stabilizzatori)",
      ritmo: "Discesa 2-3s, risalita decisa", respiro: "Bracing prima di scendere", tensione: "Schiena neutra, bilanciere vicino",
      fasi: [["Hinge", "Anche indietro, peso vicino al corpo, tibie quasi verticali."],
             ["Discesa", "Scendi finche senti i femorali; fermati prima che la schiena perda neutralita."],
             ["Risalita", "Spingi il bacino avanti, stringi i glutei in cima."]],
      errori: [["Schiena a banana", "Riduci il ROM: ferma dove la colonna resta neutra."],
               ["Senti solo la lombare", "Hai perso l'hinge: anche piu indietro, carico piu basso."]],
      illu: P({ head: [62, 70, 10], neck: [72, 78], hip: [150, 104], torsoW: 21,
        armL: [[84, 82], [92, 116], [98, 150]], armR: [[88, 76], [96, 112], [102, 150]],
        legL: [[150, 104], [150, 150], [146, 184]], legR: [[150, 104], [156, 150], [160, 184]],
        bar: [86, 150, 116, 150], weight: [82, 144, 92, 158], floor: 184,
        refs: [[58, 66, 158, 110, "bodyline"]],
        hi: [[150, 104, 150, 150, 17], [150, 104, 156, 150, 17], [78, 80, 150, 104, 14]],
        arcs: [["arc", 150, 104, 120, 86, 168, 92]],
        ghost: [[150,44,150,110,21],[140,48,142,92,12],[142,92,146,150,10],[160,48,158,92,12],[158,92,154,150,10],[150,110,150,150,14],[150,150,148,184,11],[150,110,156,150,14],[156,150,160,184,11]], ghostHead: [150,30,10], note: "Hip hinge: il movimento parte dall'anca, schiena neutra, bilanciere vicino." })
    },
    splitsquat: {
      nome: "ATG Split Squat", categoria: "Forza Lower", tipo: "dynamic", work: 40, rest: 105,
      presc: "3-4 x 6-12 per lato - RPE 6-8 - recupero 60-120s",
      muscoli: "Quadricipite in allungamento, gluteo, anca, caviglia, controllo unilaterale",
      ritmo: "Controllo, non rimbalzo", respiro: "Espira in risalita", tensione: "Busto alto, tallone giu",
      fasi: [["Affondo", "Ginocchio avanti oltre la punta, tallone anteriore possibilmente a terra."],
             ["Profondita", "Scendi finche la coscia posteriore si apre, busto alto."],
             ["Risalita", "Spingi dal piede avanti con controllo, niente molleggio."]],
      errori: [["Carico prima della profondita", "Prima ROM e controllo, poi peso."],
               ["Busto che crolla avanti", "Torace alto, supporto esterno se serve."]],
      illu: P({ head: [100, 36, 11], neck: [100, 50], hip: [100, 110], torsoW: 22,
        armL: [[88, 54], [86, 86], [86, 116]], armR: [[112, 54], [114, 86], [114, 116]],
        legL: [[100, 110], [134, 150], [142, 184]], legR: [[100, 110], [78, 162], [64, 184]],
        weight: [80, 114, 92, 126], floor: 184, refs: [[100, 30, 100, 110, "plumb"]],
        hi: [[100, 110, 134, 150, 17], [78, 162, 64, 184, 13]],
        ghost: [[100,40,100,96,22],[88,44,86,76,12],[86,76,86,106,10],[112,44,114,76,12],[114,76,114,106,10],[100,96,128,140,14],[128,140,140,184,11],[100,96,84,150,14],[84,150,64,184,11]], ghostHead: [100,26,11], arrows: [["a",150,110,150,150]], note: "Split squat profondo: ginocchio avanti, busto alto, controllo unilaterale." })
    },
    revnordic: {
      nome: "Reverse Nordic", categoria: "Forza Lower", tipo: "dynamic", work: 30, rest: 90, opt: true,
      presc: "2-3 x 5-10 (facoltativo, solo se ginocchia pronte)",
      muscoli: "Quadricipiti in allungamento, controllo del ginocchio",
      ritmo: "Lentissimo, ROM piccolo all'inizio", respiro: "Controlla la discesa", tensione: "Bacino in linea",
      fasi: [["Inginocchiato", "In ginocchio, corpo dritto dalle ginocchia alla testa."],
             ["Discesa", "Inclinati indietro controllando con i quadricipiti, ROM piccolo."]],
      errori: [["Spezzi all'anca", "Anca e busto in linea: lavora il quad, non la lombare."],
               ["ROM ampio subito", "Aumenta profondita molto lentamente."]],
      illu: P({ head: [128, 64, 10], neck: [124, 74], hip: [104, 132], torsoW: 21,
        armL: [[114, 80], [108, 104], [104, 126]], armR: [[118, 78], [112, 102], [108, 124]],
        legL: [[104, 132], [100, 158], [120, 168]], legR: [[104, 132], [104, 158], [124, 168]],
        floor: 168, refs: [[134, 60, 104, 132, "bodyline"]],
        hi: [[104, 132, 100, 158, 16]],
        start: { head: [104,58,10], neck: [104,72], hip: [104,132], armL: [[98,76],[96,104],[96,126]], armR: [[110,76],[112,104],[112,126]], legL: [[104,132],[100,158],[120,168]], legR: [[104,132],[104,158],[124,168]] }, note: "Reverse nordic: anca e busto in linea, discesa dai quadricipiti." })
    },
    sledpush: {
      nome: "Sled Push (25 m)", categoria: "Sled - Locomozione", tipo: "carry", work: 40, rest: 90,
      presc: "6-10 giri (25 m push) - RPE 6-8 - recupero 60-120s",
      muscoli: "Quadricipiti, glutei, polpacci, produzione di forza in locomozione",
      ritmo: "Pressione continua, passi corti", respiro: "Respiro ritmico", tensione: "Busto solido",
      fasi: [["Setup", "Mani sui montanti, busto solido, leggermente proiettato avanti."],
             ["Spinta", "Passi corti e potenti, pressione continua, niente sprint caotico."]],
      errori: [["Caricare troppo", "Pesante ma fluido: se diventa una rissa, perde valore."],
               ["Crollo lombare", "Tronco compatto, spingi con le gambe."]],
      illu: P({ head: [70, 62, 10], neck: [78, 70], hip: [120, 108], torsoW: 21,
        armL: [[86, 74], [62, 84], [42, 92]], armR: [[90, 70], [66, 80], [44, 88]],
        legL: [[120, 108], [128, 150], [134, 184]], legR: [[120, 108], [156, 150], [176, 178]],
        floor: 184, bench: [16, 150, 42, 178], extra: [[42, 92, 42, 178, 6]],
        hi: [[120, 108, 128, 150, 17], [120, 108, 156, 150, 17]],
        arrows: [["a", 150, 120, 184, 120]],
        swap: true, note: "Sled push: busto solido, passi corti, pressione continua." })
    },
    sleddrag: {
      nome: "Backward Sled Drag (25 m)", categoria: "Sled - Locomozione", tipo: "carry", work: 40, rest: 90,
      presc: "25 m indietro con catena al bacino = 1 giro col push",
      muscoli: "Ginocchio, quadricipite, VMO, tendine rotuleo, controllo del passo indietro",
      ritmo: "Passi corti, catena tesa", respiro: "Respiro ritmico", tensione: "Busto alto, ginocchia controllate",
      fasi: [["Setup", "Catena al bacino, busto alto, leggermente seduto indietro."],
             ["Indietro", "Passi corti, catena tesa, ginocchia controllate, niente strappi."]],
      errori: [["Strappi con la schiena", "Lascia lavorare le gambe, busto alto."],
               ["Passi troppo lunghi", "Accorcia il passo per controllare ginocchio e tendine."]],
      illu: P({ head: [108, 44, 11], neck: [106, 56], hip: [100, 112], torsoW: 22,
        armL: [[94, 60], [88, 90], [86, 116]], armR: [[118, 60], [112, 90], [110, 116]],
        legL: [[100, 112], [88, 150], [78, 184]], legR: [[100, 112], [116, 150], [128, 178]],
        floor: 184, bench: [158, 150, 184, 178], extra: [[100, 116, 158, 164, 5]],
        hi: [[100, 112, 88, 150, 16], [88, 150, 78, 184, 13]],
        arrows: [["a", 60, 120, 30, 120]],
        swap: true, note: "Backward drag con catena al bacino: ginocchio e VMO, busto alto." })
    },
    corsa: {
      nome: "Corsa Zona 2", categoria: "Condizionamento", tipo: "hold", work: 1500, rest: 0,
      presc: "Camminata 5' + corsa facile 20-35' + camminata 5'",
      muscoli: "Base aerobica, piedi, caviglie, tendini, resistenza mentale",
      ritmo: "Ritmo conversazione", respiro: "Se non parli, rallenta", tensione: "Passo morbido",
      fasi: [["Riscaldamento", "5 minuti di camminata."],
             ["Corsa facile", "20-35 minuti a ritmo conversazione: costruisci motore, non gara."],
             ["Defaticamento", "5 minuti di camminata."]],
      errori: [["Corsa come test", "Costruisce motore, non misura il cronometro."],
               ["Aumentare troppo in fretta", "Prima il tempo, poi piccoli allunghi."]],
      illu: P({ head: [112, 40, 10], neck: [108, 50], hip: [100, 108], torsoW: 21,
        armL: [[96, 56], [76, 64], [64, 56]], armR: [[116, 56], [134, 70], [146, 84]],
        legL: [[100, 108], [124, 138], [136, 150]], legR: [[100, 108], [80, 150], [62, 176]],
        floor: 184, hi: [[100, 108, 124, 138, 16]],
        arrows: [["a", 150, 110, 180, 110]],
        swap: true, note: "Corsa facile in Zona 2: ritmo conversazione, passo morbido." })
    },
    camminata: {
      nome: "Camminata", categoria: "Aerobico base", tipo: "hold", work: 600, rest: 0,
      presc: "Riscaldamento/defaticamento o 20-40' nel Recupero",
      muscoli: "Circolazione, recupero attivo, piedi e caviglie",
      ritmo: "Sciolto e rilassato", respiro: "Naso, calmo", tensione: "Postura alta",
      fasi: [["Cammina", "Passo naturale e sciolto, postura alta, respiro calmo."]],
      errori: [["Troppo forte", "E' recupero attivo: resta facile."],
               ["Postura crollata", "Testa alta, spalle rilassate."]],
      illu: P({ head: [100, 40, 11], neck: [100, 52], hip: [100, 110], torsoW: 22,
        armL: [[88, 56], [82, 84], [86, 112]], armR: [[112, 56], [118, 84], [114, 112]],
        legL: [[100, 110], [90, 150], [82, 184]], legR: [[100, 110], [112, 150], [122, 184]],
        floor: 184, arrows: [["a", 150, 120, 174, 120]],
        swap: true, note: "Camminata: recupero attivo, postura alta, passo sciolto." })
    },
    cyclette: {
      nome: "Cyclette Zona 2", categoria: "Cardio basso impatto", tipo: "hold", work: 1800, rest: 0,
      presc: "5' risc. + 25-45' facile/medio (RPE 4-6) + 5' defat.",
      muscoli: "Motore aerobico senza impatto, recupero dalle gambe",
      ritmo: "Pedalata fluida", respiro: "Piu forte ma lucido", tensione: "Non deve diventare HIIT",
      fasi: [["Riscaldamento", "5 minuti facili."],
             ["Zona facile/media", "25-45 minuti a RPE 4-6: respiri di piu ma resti lucido."],
             ["Defaticamento", "5 minuti leggeri."]],
      errori: [["HIIT di nascosto", "Il valore e il recupero attivo: intensita gestibile."],
               ["Postura schiacciata", "Busto comodo, niente carico sulla schiena."]],
      illu: P({ head: [78, 56, 10], neck: [84, 66], hip: [104, 118], torsoW: 21,
        armL: [[92, 72], [70, 80], [52, 84]], armR: [[96, 70], [74, 78], [54, 82]],
        legL: [[104, 118], [124, 138], [112, 162]], legR: [[104, 118], [108, 150], [112, 162]],
        floor: 184, bench: [92, 116, 112, 126], extra: [[52, 84, 52, 150, 5], [112, 162, 112, 184, 6]],
        hi: [[104, 118, 124, 138, 16]],
        arcs: [["arc", 96, 150, 128, 150, 112, 168]],
        swap: true, note: "Cyclette a basso impatto: pedalata fluida, recupero attivo." })
    },
    sideplank: {
      nome: "Plank Laterale", categoria: "Core / stabilita", tipo: "hold", work: 30, rest: 45,
      presc: "Core a fine cyclette: 2-3 x 20-40s per lato",
      muscoli: "Obliqui, quadrato dei lombi, stabilita del bacino",
      ritmo: "Tenuta ferma", respiro: "Lento e regolare", tensione: "Corpo in linea, bacino alto",
      fasi: [["Tenuta", "Su avambraccio, corpo in linea, bacino alto, respiro regolare."]],
      errori: [["Bacino che scende", "Spingi il fianco in alto, linea unica."],
               ["Trattenere il respiro", "Respira lento e continuo."]],
      illu: P({ vb: "0 0 200 160", head: [52, 70, 10], neck: [64, 76], hip: [128, 104], torsoW: 20,
        armL: [[70, 82], [62, 110], [60, 128]], legL: [[128, 104], [156, 120], [176, 128]],
        floor: 130, refs: [[44, 70, 176, 124, "bodyline"]],
        hi: [[64, 80, 128, 104, 14]],
        arrows: [["a",150,118,150,92]], note: "Plank laterale: corpo in linea, bacino alto, respiro regolare." })
    },
    kbswing: {
      nome: "Kettlebell Swing (Russian)", categoria: "Kettlebell", tipo: "dynamic", work: 35, rest: 75,
      presc: "4-5 x 10-15 - swing russo (fino a petto/spalle, non overhead)",
      muscoli: "Glutei, femorali, catena posteriore, core, potenza d'anca",
      ritmo: "Esplosivo all'anca, fluido", respiro: "Espira nello snap d'anca", tensione: "Hip hinge, non squat",
      fasi: [["Hike", "Bell tra le gambe, hinge d'anca, schiena neutra."],
             ["Snap", "Estendi anca e glutei con forza: la bell sale per slancio, fino al petto."],
             ["Ritorno", "Lascia tornare la bell tra le gambe ricaricando l'anca."]],
      errori: [["Squat invece di hinge", "Il movimento e d'anca: anche indietro, non piegare le ginocchia."],
               ["Swing che sporca la schiena", "Regredisci al Kettlebell Deadlift: meglio pulito che avanzato male."]],
      illu: P({ head: [80, 52, 10], neck: [86, 62], hip: [122, 108], torsoW: 21,
        armL: [[98, 66], [124, 76], [150, 84]], armR: [[102, 64], [128, 74], [152, 82]],
        legL: [[122, 108], [118, 150], [110, 184]], legR: [[122, 108], [134, 150], [142, 184]],
        weight: [148, 76, 164, 92], floor: 184, refs: [[74, 56, 122, 108, "bodyline"]],
        hi: [[122, 108, 118, 150, 17], [78, 60, 122, 108, 14]],
        arcs: [["arc", 150, 150, 152, 84, 182, 120]],
        start: { head: [70,72,10], neck: [80,82], hip: [126,108], armL: [[92,86],[110,120],[120,150]], armR: [[96,84],[114,118],[124,150]], legL: [[126,108],[120,150],[112,184]], legR: [[126,108],[136,150],[144,184]] }, note: "Swing russo: hip hinge esplosivo, bell fino al petto, schiena neutra." })
    },
    goblet: {
      nome: "Goblet Squat", categoria: "Kettlebell", tipo: "dynamic", work: 35, rest: 90,
      presc: "3 x 8-10 - bell al petto, profondo e controllato",
      muscoli: "Quadricipiti, glutei, core, mobilita anca/caviglia",
      ritmo: "Discesa controllata, risalita decisa", respiro: "Inspira giu, espira su", tensione: "Busto alto, talloni a terra",
      fasi: [["Setup", "Bell tenuta al petto con due mani, gomiti dentro."],
             ["Discesa", "Scendi tra le gambe, busto alto, ginocchia in linea coi piedi."],
             ["Risalita", "Spingi dai talloni mantenendo il torace su."]],
      errori: [["Busto che crolla", "Tieni il petto alto, gomiti sotto la bell."],
               ["Talloni che si alzano", "Lavora la mobilita di caviglia, scendi quanto controlli."]],
      illu: P({ head: [100, 40, 11], neck: [100, 54], hip: [100, 128], torsoW: 22,
        armL: [[88, 58], [84, 80], [96, 96]], armR: [[112, 58], [116, 80], [104, 96]],
        legL: [[100, 128], [76, 150], [72, 184]], legR: [[100, 128], [124, 150], [128, 184]],
        weight: [92, 84, 108, 104], floor: 184, refs: [[100, 34, 100, 128, "plumb"]],
        hi: [[100, 128, 76, 150, 16], [100, 128, 124, 150, 16]],
        ghost: [[100,44,100,112,22],[88,48,86,72,12],[86,72,98,88,10],[112,48,114,72,12],[114,72,102,88,10],[100,112,98,150,14],[98,150,96,184,11],[100,112,102,150,14],[102,150,104,184,11]], ghostHead: [100,30,11], arrows: [["a",152,118,152,152]], note: "Goblet squat: bell al petto, busto alto, profondita controllata." })
    },
    row: {
      nome: "One Arm Row", categoria: "Kettlebell", tipo: "dynamic", work: 35, rest: 75,
      presc: "3 x 8-12 per lato - schiena neutra, tira al fianco",
      muscoli: "Dorsali, romboidi, bicipiti, core anti-rotazione",
      ritmo: "Tirata decisa, discesa controllata", respiro: "Espira tirando", tensione: "Schiena neutra, niente torsioni",
      fasi: [["Setup", "Una mano e un ginocchio in appoggio, schiena piatta e neutra."],
             ["Tirata", "Porta il gomito al fianco, scapola che si ritrae; controlla la discesa."]],
      errori: [["Torcere il busto", "Anti-rotazione: il tronco resta fermo, tira solo il braccio."],
               ["Schiena curva", "Mantieni la colonna neutra per tutto il set."]],
      illu: P({ head: [58, 86, 9], neck: [70, 90], hip: [150, 96], torsoW: 20,
        armL: [[80, 94], [84, 120], [88, 142]], armR: [[120, 92], [124, 110], [126, 128]],
        legL: [[150, 96], [150, 140], [150, 176]], legR: [[150, 96], [160, 140], [162, 176]],
        weight: [120, 124, 132, 140], bench: [40, 142, 96, 152], floor: 184,
        refs: [[60, 90, 150, 96, "bodyline"]], hi: [[70, 92, 150, 96, 14]],
        arrows: [["a", 126, 128, 126, 104]],
        start: { head: [58,86,9], neck: [70,90], hip: [150,96], armL: [[80,94],[84,120],[88,142]], armR: [[120,92],[122,116],[124,140]], legL: [[150,96],[150,140],[150,176]], legR: [[150,96],[160,140],[162,176]] }, note: "One arm row: schiena neutra, gomito al fianco, niente torsione." })
    },
    carry: {
      nome: "Suitcase / Farmer Carry", categoria: "Kettlebell", tipo: "carry", work: 45, rest: 75,
      presc: "3 x 30-60s per lato - busto alto, passo controllato",
      muscoli: "Presa, core anti-laterale, trapezi, postura sotto carico",
      ritmo: "Passo costante", respiro: "Regolare", tensione: "Spalle indietro, niente inclinazioni",
      fasi: [["Pick", "Solleva con hinge, schiena neutra, peso ai lati."],
             ["Carry", "Cammina alto e composto, niente inclinazioni laterali, presa salda."]],
      errori: [["Inclinarsi sul lato del peso", "Anti-laterale: resta dritto, core attivo."],
               ["Spalle in avanti", "Petto su, scapole indietro per tutto il tragitto."]],
      illu: P({ head: [100, 38, 11], neck: [100, 52], hip: [100, 112], torsoW: 22,
        armL: [[88, 56], [86, 86], [86, 118]], armR: [[112, 56], [114, 86], [114, 118]],
        legL: [[100, 112], [96, 150], [92, 184]], legR: [[100, 112], [104, 150], [108, 184]],
        weight: [80, 118, 92, 140], floor: 184, refs: [[100, 30, 100, 184, "plumb"]],
        hi: [[86, 56, 86, 118, 13], [100, 60, 100, 110, 12]],
        arrows: [["a", 150, 122, 172, 122]],
        swap: true, note: "Carry: busto alto, anti-inclinazione, presa salda." })
    },
    tgu: {
      nome: "Turkish Get-Up", categoria: "Kettlebell", tipo: "dynamic", work: 40, rest: 90, opt: true,
      presc: "1-3 per lato (facoltativo) - controllo totale, occhi al peso",
      muscoli: "Spalla (stabilita), core, coordinazione, mobilita globale",
      ritmo: "Lentissimo, una posizione alla volta", respiro: "Regolare", tensione: "Braccio overhead sempre bloccato",
      fasi: [["Salita", "Dal suolo allo stand mantenendo il braccio verticale e gli occhi sul peso."],
             ["Discesa", "Torna a terra invertendo le tappe con lo stesso controllo."]],
      errori: [["Andare di fretta", "E' coordinazione: ogni posizione deve essere stabile."],
               ["Perdere il braccio verticale", "Spalla impacchettata, peso sempre sopra il polso."]],
      illu: P({ head: [96, 70, 10], neck: [98, 80], hip: [110, 120], torsoW: 21,
        armL: [[92, 84], [78, 104], [70, 122]], armR: [[104, 84], [110, 56], [114, 32]],
        legL: [[110, 120], [140, 142], [150, 176]], legR: [[110, 120], [96, 158], [80, 176]],
        weight: [108, 22, 122, 36], floor: 176, refs: [[114, 32, 114, 84, "press"]],
        hi: [[104, 84, 114, 32, 13]],
        start: { head: [78,118,10], neck: [86,124], hip: [112,150], armR: [[100,126],[108,96],[114,66]], armL: [[80,130],[66,148],[56,162]], legL: [[112,150],[138,158],[150,176]], legR: [[112,150],[96,166],[80,176]] }, note: "Get-up: braccio overhead bloccato, occhi al peso, controllo totale." })
    },
    mobility: {
      nome: "Mobility Flow", categoria: "Recupero", tipo: "hold", work: 360, rest: 0,
      presc: "5-10 min - apertura toracica, anche, caviglie",
      muscoli: "Disponibilita articolare, anca, colonna toracica, caviglia",
      ritmo: "Fluido e lento", respiro: "Profondo", tensione: "Nessun forzare",
      fasi: [["Affondo + apertura", "Affondo basso e rotazione del torace verso il ginocchio avanti."],
             ["Flusso", "Scorri tra le posizioni senza rimbalzi, cercando ROM disponibile."]],
      errori: [["Forzare i finali di ROM", "Mobilita = controllo, non strappi."],
               ["Trattenere il respiro", "Respira profondo accompagnando l'allungo."]],
      illu: P({ head: [70, 60, 10], neck: [78, 70], hip: [120, 112], torsoW: 21,
        armL: [[88, 76], [82, 110], [78, 140]], armR: [[96, 72], [110, 50], [120, 32]],
        legL: [[120, 112], [120, 150], [126, 176]], legR: [[120, 112], [150, 150], [176, 170]],
        floor: 176, arcs: [["arc", 96, 72, 120, 32, 132, 46]],
        hi: [[96, 72, 120, 32, 13]],
        swap: true, note: "Mobility: affondo con apertura toracica, flusso senza forzare." })
    },
    childpose: {
      nome: "Child Pose + Respiro", categoria: "Recupero", tipo: "hold", work: 150, rest: 0,
      presc: "2-3 min - respiro lento, parasimpatico",
      muscoli: "Decompressione colonna, respirazione, calma del sistema nervoso",
      ritmo: "Immobile e morbido", respiro: "Espiro lungo, 4-7-8", tensione: "Rilascio totale",
      fasi: [["Posizione", "Ginocchia a terra, glutei verso i talloni, braccia avanti, fronte giu."],
             ["Respiro", "Espiri lunghi e lenti, lascia allungare la schiena ad ogni respiro."]],
      errori: [["Tensione nelle spalle", "Lascia pesare le braccia, collo morbido."],
               ["Respiro corto", "Allunga l'espiro: e li il recupero."]],
      illu: P({ vb: "0 0 200 150", head: [60, 96, 10], neck: [72, 96], hip: [120, 100], torsoW: 20,
        armL: [[80, 98], [55, 104], [34, 108]], armR: [[80, 100], [55, 106], [34, 110]],
        legL: [[120, 100], [140, 112], [150, 116]], legR: [[120, 100], [138, 114], [148, 118]],
        floor: 120, hi: [[72, 96, 120, 100, 13]],
        note: "Child pose: decompressione e respiro lento, recupero parasimpatico." })
    },
    deadhang: {
      nome: "Dead Hang", categoria: "Recupero", tipo: "hold", work: 30, rest: 30, opt: true,
      presc: "2 x 20-40s (facoltativo) - decompressione e presa",
      muscoli: "Decompressione colonna, presa, spalle",
      ritmo: "Appeso e rilassato", respiro: "Calmo", tensione: "Spalle attive ma rilassate",
      fasi: [["Appeso", "Mani alla sbarra, corpo lungo, lascia decomprimere la colonna."]],
      errori: [["Spalle completamente molli", "Tieni una leggera attivazione scapolare."],
               ["Trattenere il fiato", "Respira calmo durante la tenuta."]],
      illu: P({ head: [100, 46, 10], neck: [100, 58], hip: [100, 118], torsoW: 21,
        armL: [[92, 62], [91, 46], [90, 30]], armR: [[108, 62], [109, 46], [110, 30]],
        legL: [[100, 118], [98, 150], [98, 182]], legR: [[100, 118], [102, 150], [102, 182]],
        bar: [40, 28, 160, 28], hi: [[92, 62, 91, 30, 12], [108, 62, 109, 30, 12]],
        arrows: [["a",132,150,132,182]], note: "Dead hang: corpo lungo, decompressione, presa rilassata." })
    },
    breath90: {
      nome: "90/90 Breathing", categoria: "Reset posturale", tipo: "hold", work: 120, rest: 0,
      presc: "Protocollo 0 - 2-3 min, espiri lunghi",
      muscoli: "Diaframma, core profondo, allineamento costato-bacino",
      ritmo: "Immobile", respiro: "Espiro lungo, costato giu", tensione: "Lombare a terra",
      fasi: [["Posizione", "Schiena a terra, gambe a 90/90 su un rialzo."],
             ["Respiro", "Inspira nel costato basso, espira lungo abbassando le coste."]],
      errori: [["Inarcare la lombare", "Mantieni la zona lombare a contatto col suolo."],
               ["Respiro alto di petto", "Porta l'aria in basso, espiro completo."]],
      illu: P({ vb: "0 0 200 150", head: [40, 96, 10], neck: [54, 96], hip: [120, 96], torsoW: 20,
        armL: [[64, 100], [80, 108], [96, 110]], armR: [[64, 92], [80, 86], [96, 84]],
        legL: [[120, 96], [120, 70], [150, 70]], legR: [[120, 96], [126, 70], [156, 70]],
        floor: 116, bench: [144, 64, 178, 112],
        hi: [[80, 96, 120, 96, 13]],
        arrows: [["a",96,76,96,94]], note: "90/90 breathing: lombare a terra, espiro lungo, costato giu." })
    },
    deadbug: {
      nome: "Dead Bug", categoria: "Reset posturale", tipo: "dynamic", work: 30, rest: 30,
      presc: "Protocollo 0 - 20 ripetizioni controllate",
      muscoli: "Core profondo, anti-estensione, coordinazione crociata",
      ritmo: "Lento e controllato", respiro: "Espira estendendo", tensione: "Lombare a terra sempre",
      fasi: [["Setup", "Supino, braccia verso il soffitto, anche e ginocchia a 90."],
             ["Estensione", "Estendi braccio e gamba opposti mantenendo la lombare a terra."]],
      errori: [["Lombare che si stacca", "Riduci l'escursione: il core deve restare in controllo."],
               ["Movimento veloce", "Lento e preciso, alterna i lati."]],
      illu: P({ vb: "0 0 200 150", head: [44, 98, 10], neck: [58, 98], hip: [120, 98], torsoW: 20,
        armL: [[70, 102], [74, 120], [78, 134]], armR: [[70, 94], [92, 86], [112, 80]],
        legL: [[120, 98], [150, 98], [176, 96]], legR: [[120, 98], [120, 72], [142, 70]],
        floor: 116, hi: [[58, 98, 120, 98, 13]],
        swap: true, note: "Dead bug: lombare a terra, arto opposto, controllo crociato." })
    },
    glutebridge: {
      nome: "Ponte Glutei", categoria: "Reset posturale", tipo: "dynamic", work: 30, rest: 30,
      presc: "Protocollo 0 - 10 ripetizioni, squeeze in alto",
      muscoli: "Glutei, catena posteriore, controllo del bacino",
      ritmo: "Salita decisa, pausa in alto", respiro: "Espira salendo", tensione: "Spingi dai talloni",
      fasi: [["Setup", "Supino, ginocchia piegate, piedi a terra vicino ai glutei."],
             ["Ponte", "Spingi dai talloni, alza il bacino, stringi i glutei in alto."]],
      errori: [["Inarcare la schiena", "Alza coi glutei, non con la lombare."],
               ["Spingere sulle punte", "Carica i talloni per attivare i glutei."]],
      illu: P({ vb: "0 0 200 150", head: [40, 108, 10], neck: [54, 106], hip: [108, 84], torsoW: 20,
        armL: [[68, 108], [88, 112], [108, 114]], armR: [[68, 104], [88, 110], [108, 112]],
        legL: [[108, 84], [138, 96], [146, 116]], legR: [[108, 84], [134, 100], [142, 116]],
        floor: 118, refs: [[40, 108, 108, 84, "bodyline"]],
        hi: [[54, 106, 108, 84, 15]],
        arrows: [["a", 108, 100, 108, 80]],
        ghost: [[54,110,108,110,20],[68,110,88,112,12],[88,112,108,112,10],[108,110,140,110,14],[140,110,148,116,11],[108,110,136,112,14],[136,112,144,116,11]], ghostHead: [40,110,10], note: "Ponte glutei: spingi dai talloni, squeeze in alto, lombare protetta." })
    },
    hipflexor: {
      nome: "Hip Flexor Stretch", categoria: "Reset posturale", tipo: "hold", work: 30, rest: 0,
      presc: "Protocollo 0 - 30s per lato, bacino in retroversione",
      muscoli: "Ileopsoas, retto femorale, apertura dell'anca",
      ritmo: "Tenuta morbida", respiro: "Profondo", tensione: "Retroversione, gluteo attivo",
      fasi: [["Half-kneeling", "Un ginocchio a terra, piede avanti piantato, busto alto."],
             ["Allungo", "Porta il bacino in retroversione e avanti, sentendo l'anca posteriore aprirsi."]],
      errori: [["Inarcare la lombare", "Retroversione del bacino e gluteo attivo: niente iperlordosi."],
               ["Busto in avanti", "Resta alto e verticale per isolare il flessore."]],
      illu: P({ head: [100, 40, 11], neck: [100, 54], hip: [100, 116], torsoW: 22,
        armL: [[88, 60], [80, 90], [86, 116]], armR: [[112, 60], [116, 40], [120, 24]],
        legL: [[100, 116], [128, 150], [136, 184]], legR: [[100, 116], [80, 160], [62, 184]],
        floor: 184, refs: [[100, 30, 100, 116, "plumb"]],
        hi: [[100, 116, 80, 160, 14]],
        arrows: [["a",92,120,108,128]], note: "Flessori: half-kneeling, bacino in retroversione, busto alto." })
    },
    slbalance: {
      nome: "Single Leg Balance", categoria: "Reset posturale", tipo: "hold", work: 30, rest: 0,
      presc: "Protocollo 0 - 30s per lato, sguardo fisso",
      muscoli: "Propriocezione, caviglia, stabilizzatori dell'anca",
      ritmo: "Immobile e controllato", respiro: "Calmo", tensione: "Piede saldo, anca livellata",
      fasi: [["Equilibrio", "In piedi su una gamba, altro ginocchio su, braccia per bilanciare."],
             ["Tenuta", "Sguardo fisso su un punto, piede radicato, bacino livellato."]],
      errori: [["Anca che cade", "Tieni il bacino livellato, gluteo medio attivo."],
               ["Sguardo che vaga", "Fissa un punto per stabilizzare l'equilibrio."]],
      illu: P({ head: [100, 38, 11], neck: [100, 52], hip: [100, 112], torsoW: 22,
        armL: [[88, 56], [64, 60], [48, 70]], armR: [[112, 56], [136, 60], [152, 70]],
        legL: [[100, 112], [100, 150], [100, 184]], legR: [[100, 112], [122, 130], [140, 140]],
        floor: 184, refs: [[100, 30, 100, 184, "plumb"]],
        hi: [[100, 112, 100, 150, 15]],
        note: "Equilibrio su una gamba: sguardo fisso, piede saldo, anca livellata." })
    },
    tibialis: {
      nome: "Tibialis Raise", categoria: "Reset posturale", tipo: "dynamic", work: 30, rest: 30,
      presc: "Protocollo 0 - 16 ripetizioni, punte su",
      muscoli: "Tibiale anteriore, controllo della caviglia, salute del ginocchio",
      ritmo: "Controllato, pausa in alto", respiro: "Regolare", tensione: "Punte verso lo stinco",
      fasi: [["Setup", "In piedi, schiena eventualmente al muro, talloni a terra."],
             ["Raise", "Solleva le punte verso lo stinco, pausa, scendi controllato."]],
      errori: [["Slanci col corpo", "Muovi solo le caviglie, resto fermo."],
               ["ROM minimo", "Cerca la massima dorsiflessione che controlli."]],
      illu: P({ head: [100, 40, 11], neck: [100, 54], hip: [100, 114], torsoW: 22,
        armL: [[88, 58], [86, 88], [86, 118]], armR: [[112, 58], [114, 88], [114, 118]],
        legL: [[100, 114], [96, 150], [84, 166]], legR: [[100, 114], [104, 150], [116, 166]],
        floor: 184, hi: [[96, 150, 84, 166, 12], [104, 150, 116, 166, 12]],
        arrows: [["a", 100, 178, 100, 162]],
        start: { head: [100,40,11], neck: [100,54], hip: [100,114], armL: [[88,58],[86,88],[86,118]], armR: [[112,58],[114,88],[114,118]], legL: [[100,114],[96,150],[90,182]], legR: [[100,114],[104,150],[110,182]] }, note: "Tibialis raise: punte su verso lo stinco, controllo della caviglia." })
    }
  };

  var EXBW = {
    pushup: { nome: "Piegamenti (Push-Up)", categoria: "Upper - Corpo libero", tipo: "dynamic", work: 35, rest: 90,
      presc: "3-5 x 6-15 - progressione: inclinato -> piano -> declinato (RPE 7-8)",
      muscoli: "Petto, tricipiti, deltoide anteriore, core anti-estensione",
      ritmo: "Discesa 2-3s, spinta controllata", respiro: "Inspira giu, espira su", tensione: "Corpo in linea, scapole controllate",
      fasi: [["Setup", "Mani sotto le spalle, corpo in linea testa-bacino-talloni, core attivo."],
             ["Discesa", "Scendi col petto verso terra, gomiti a ~45 gradi, niente bacino che cede."]],
      errori: [["Bacino che crolla", "Stringi glutei e addome: una linea sola."],
               ["Gomiti larghissimi", "Tienili a circa 45 gradi per proteggere le spalle."]],
      illu: P({ head: [44, 96, 10], neck: [58, 98], hip: [128, 118], torsoW: 20,
        armL: [[70, 102], [70, 138], [70, 160]], armR: [[74, 100], [74, 136], [74, 158]],
        legL: [[128, 118], [158, 140], [182, 158]], legR: [[128, 118], [162, 142], [186, 160]],
        floor: 168, refs: [[40, 94, 184, 160, "bodyline"]],
        hi: [[58, 98, 70, 138, 14], [58, 98, 128, 118, 12]], arrows: [["a", 150, 150, 150, 126]],
        start: { head: [40,108,10], neck: [56,108], hip: [126,124], armL: [[70,110],[66,126],[70,150]], armR: [[74,108],[70,124],[74,148]], legL: [[126,124],[156,144],[182,160]], legR: [[126,124],[160,146],[186,162]] }, note: "Push-up: corpo in linea, scapole controllate, gomiti a 45 gradi." }) },
    bwrow: { nome: "Rematore a Corpo Libero", categoria: "Upper - Corpo libero", tipo: "dynamic", work: 35, rest: 90,
      presc: "3-4 x 8-12 - sotto un tavolo robusto o una sbarra bassa",
      muscoli: "Dorsali, romboidi, bicipiti, presa, controllo scapolare",
      ritmo: "Tirata decisa, discesa controllata", respiro: "Espira tirando", tensione: "Corpo teso, niente bacino molle",
      fasi: [["Setup", "Appeso sotto la sbarra bassa, corpo teso, talloni a terra."],
             ["Tirata", "Porta il petto verso la sbarra, gomiti indietro, scapole che si stringono."]],
      errori: [["Bacino che si abbassa", "Tieni glutei e addome attivi: corpo rigido."],
               ["Mezze ripetizioni", "Distendi in basso e tocca quasi la sbarra."]],
      illu: P({ head: [78, 84, 9], neck: [86, 88], hip: [120, 110], torsoW: 20,
        armL: [[92, 90], [94, 64], [96, 42]], armR: [[96, 92], [98, 66], [100, 42]],
        legL: [[120, 110], [144, 130], [166, 150]], legR: [[120, 110], [148, 132], [170, 150]],
        bar: [56, 40, 140, 40], floor: 156, refs: [[80, 86, 166, 150, "bodyline"]],
        hi: [[86, 88, 96, 42, 13]], arrows: [["a", 104, 88, 104, 58]],
        start: { head: [78,84,9], neck: [86,92], hip: [120,116], armL: [[92,94],[94,68],[96,44]], armR: [[96,96],[98,70],[100,44]], legL: [[120,116],[144,134],[166,152]], legR: [[120,116],[148,136],[170,152]] }, note: "Rematore a corpo libero: petto alla sbarra, corpo teso, scapole indietro." }) },
    pikepush: { nome: "Pike Push-Up", categoria: "Upper - Corpo libero", tipo: "dynamic", work: 30, rest: 90, opt: true,
      presc: "2-3 x 5-10 (facoltativo) - spinta verticale sulle spalle",
      muscoli: "Deltoidi, tricipiti, trapezio, stabilita scapolare",
      ritmo: "Lento e controllato", respiro: "Inspira giu, espira su", tensione: "Bacino alto, testa tra le mani",
      fasi: [["Setup", "A V rovesciata, bacino alto, mani a terra, sguardo verso i piedi."],
             ["Spinta", "Piega i gomiti portando la testa verso terra tra le mani, poi spingi su."]],
      errori: [["Bacino che si abbassa", "Mantieni la V: il lavoro deve restare sulle spalle."],
               ["Collo schiacciato", "Controlla la discesa, niente impatti con la testa."]],
      illu: P({ head: [64, 122, 9], neck: [70, 116], hip: [100, 68], torsoW: 20,
        armL: [[70, 118], [64, 138], [58, 158]], armR: [[74, 116], [68, 136], [62, 156]],
        legL: [[100, 68], [124, 116], [148, 160]], legR: [[100, 68], [128, 118], [152, 162]],
        floor: 168, hi: [[70, 116, 64, 138, 13]], arrows: [["a", 66, 110, 66, 138]],
        start: { head: [64,116,9], neck: [70,112], hip: [100,64], armL: [[70,114],[64,134],[58,158]], armR: [[74,112],[68,132],[62,156]], legL: [[100,64],[124,114],[148,160]], legR: [[100,64],[128,116],[152,162]] }, note: "Pike push-up: V rovesciata, spinta verticale sulle spalle." }) },
    bwsquat: { nome: "Squat a Corpo Libero", categoria: "Lower - Corpo libero", tipo: "dynamic", work: 35, rest: 75,
      presc: "3-4 x 10-20 - full ROM, talloni a terra",
      muscoli: "Quadricipiti, glutei, mobilita anca/caviglia, core",
      ritmo: "Discesa controllata, risalita decisa", respiro: "Inspira giu, espira su", tensione: "Busto su, ginocchia in linea",
      fasi: [["Discesa", "Scendi tra le gambe a piena escursione, busto alto, talloni a terra."],
             ["Risalita", "Spingi dai talloni mantenendo le ginocchia in linea coi piedi."]],
      errori: [["Talloni che si alzano", "Lavora la mobilita di caviglia, scendi quanto controlli."],
               ["Ginocchia che collassano dentro", "Spingi le ginocchia verso l'esterno."]],
      illu: P({ head: [100, 42, 11], neck: [100, 56], hip: [100, 128], torsoW: 22,
        armL: [[88, 60], [96, 72], [120, 76]], armR: [[112, 60], [108, 72], [120, 74]],
        legL: [[100, 128], [76, 150], [72, 184]], legR: [[100, 128], [124, 150], [128, 184]],
        floor: 184, refs: [[100, 34, 100, 128, "plumb"]],
        hi: [[100, 128, 76, 150, 16], [100, 128, 124, 150, 16]],
        ghost: [[100,44,100,112,22],[88,48,96,62,12],[96,62,118,66,10],[112,48,108,62,12],[108,62,118,64,10],[100,112,98,150,14],[98,150,96,184,11],[100,112,102,150,14],[102,150,104,184,11]], ghostHead: [100,30,11], arrows: [["a",152,118,152,152]], note: "Squat a corpo libero: profondo, talloni a terra, busto alto." }) },
    bwlunge: { nome: "Affondo Indietro", categoria: "Lower - Corpo libero", tipo: "dynamic", work: 35, rest: 75,
      presc: "3 x 8-12 per lato - controllo e profondita",
      muscoli: "Quadricipiti, glutei, controllo unilaterale, equilibrio",
      ritmo: "Controllo, niente rimbalzo", respiro: "Espira in risalita", tensione: "Busto alto, ginocchio stabile",
      fasi: [["Affondo", "Porta una gamba indietro, scendi col ginocchio verso terra, busto alto."],
             ["Risalita", "Spingi dal piede avanti tornando in piedi con controllo."]],
      errori: [["Ginocchio avanti instabile", "Ginocchio in linea col piede, niente cedimenti."],
               ["Busto in avanti", "Resta verticale, core attivo."]],
      illu: P({ head: [100, 38, 11], neck: [100, 52], hip: [100, 110], torsoW: 22,
        armL: [[88, 56], [82, 84], [92, 108]], armR: [[112, 56], [118, 84], [108, 108]],
        legL: [[100, 110], [130, 150], [138, 184]], legR: [[100, 110], [80, 160], [66, 184]],
        floor: 184, refs: [[100, 30, 100, 110, "plumb"]],
        hi: [[100, 110, 130, 150, 16]],
        arrows: [["a",150,108,150,150]], start: { head: [100,38,11], neck: [100,52], hip: [100,98], armL: [[88,56],[82,80],[92,100]], armR: [[112,56],[118,80],[108,100]], legL: [[100,98],[100,140],[100,184]], legR: [[100,98],[100,140],[100,184]] }, note: "Affondo indietro: ginocchio avanti stabile, busto alto, controllo." }) },
    slrdl: { nome: "Stacco a Una Gamba", categoria: "Lower - Corpo libero", tipo: "dynamic", work: 35, rest: 75,
      presc: "3 x 8-10 per lato - hinge ed equilibrio (T)",
      muscoli: "Femorali, glutei, stabilizzatori anca/caviglia, equilibrio",
      ritmo: "Lento e controllato", respiro: "Espira in risalita", tensione: "Bacino quadrato, schiena neutra",
      fasi: [["Hinge", "In equilibrio su una gamba, porta il busto avanti e la gamba libera indietro."],
             ["Risalita", "Risali stringendo il gluteo, mantenendo il bacino quadrato."]],
      errori: [["Bacino che ruota", "Tieni i fianchi paralleli al suolo (bacino quadrato)."],
               ["Schiena curva", "Mantieni la colonna neutra, hinge dall'anca."]],
      illu: P({ head: [60, 80, 10], neck: [70, 86], hip: [120, 96], torsoW: 20,
        armL: [[78, 90], [74, 114], [70, 136]], armR: [[82, 88], [78, 112], [74, 134]],
        legL: [[120, 96], [122, 140], [124, 176]], legR: [[120, 96], [150, 90], [178, 84]],
        floor: 176, refs: [[56, 78, 178, 84, "bodyline"]],
        hi: [[120, 96, 122, 140, 15]],
        start: { head: [120,40,10], neck: [120,52], hip: [120,108], armL: [[110,56],[108,84],[106,110]], armR: [[130,56],[132,84],[134,110]], legL: [[120,108],[122,148],[124,184]], legR: [[120,108],[118,148],[116,184]] }, note: "Stacco a una gamba: T di equilibrio, bacino quadrato, schiena neutra." }) },
    bearcrawl: { nome: "Bear Crawl", categoria: "Sled BW - Locomozione", tipo: "carry", work: 40, rest: 75,
      presc: "Avanti e indietro - 4-8 tratti, ginocchia basse",
      muscoli: "Spalle, core, quadricipiti, coordinazione crociata",
      ritmo: "Passo lento e controllato", respiro: "Regolare", tensione: "Schiena piatta, ginocchia basse",
      fasi: [["Setup", "Quadrupedia su mani e piedi, ginocchia 2-3 cm da terra, schiena piatta."],
             ["Cammino", "Avanza mano e piede opposti, bacino stabile, niente oscillazioni."]],
      errori: [["Bacino che oscilla", "Muoviti lento, core attivo: la schiena resta piatta."],
               ["Ginocchia troppo alte", "Tienile basse e vicine al suolo."]],
      illu: P({ head: [52, 96, 9], neck: [64, 98], hip: [128, 98], torsoW: 20,
        armL: [[78, 100], [78, 128], [78, 150]], armR: [[82, 98], [82, 126], [82, 148]],
        legL: [[128, 98], [140, 126], [150, 150]], legR: [[128, 98], [150, 124], [160, 148]],
        floor: 152, refs: [[48, 94, 132, 98, "bodyline"]], arrows: [["a", 150, 110, 182, 110]],
        swap: true, note: "Bear crawl: schiena piatta, ginocchia basse, passo crociato controllato." }) },
    crabwalk: { nome: "Crab Walk", categoria: "Sled BW - Locomozione", tipo: "carry", work: 40, rest: 75,
      presc: "Avanti e indietro - 4-8 tratti, bacino su",
      muscoli: "Tricipiti, glutei, spalle posteriori, core",
      ritmo: "Passo controllato", respiro: "Regolare", tensione: "Bacino sollevato, spalle stabili",
      fasi: [["Setup", "Seduto, mani dietro e piedi avanti, solleva il bacino (tavolo rovescio)."],
             ["Cammino", "Avanza con mani e piedi mantenendo il bacino alto."]],
      errori: [["Bacino che scende", "Spingi i fianchi in alto per tutto il tragitto."],
               ["Spalle sovraccariche", "Mani ben piantate, gomiti morbidi."]],
      illu: P({ head: [60, 96, 9], neck: [72, 98], hip: [128, 90], torsoW: 20,
        armL: [[80, 98], [74, 120], [70, 142]], armR: [[84, 100], [78, 122], [74, 144]],
        legL: [[128, 90], [150, 110], [158, 142]], legR: [[128, 90], [154, 112], [162, 144]],
        floor: 146, hi: [[80, 98, 74, 120, 13]], arrows: [["a", 58, 118, 32, 118]],
        swap: true, note: "Crab walk: bacino alto, spinta di tricipiti e glutei." }) },
    mtnclimber: { nome: "Mountain Climber", categoria: "Corsa BW - Cardio", tipo: "hold", work: 40, rest: 30,
      presc: "Cardio a terra: 3-5 x 30-45s, ritmo gestibile",
      muscoli: "Core, flessori dell'anca, spalle, motore cardio",
      ritmo: "Ritmo costante, non caotico", respiro: "Regolare", tensione: "Plank stabile, bacino basso",
      fasi: [["Plank", "Posizione di plank alto, mani sotto le spalle, corpo in linea."],
             ["Ginocchia", "Porta alternato un ginocchio al petto, bacino stabile, ritmo costante."]],
      errori: [["Bacino che sale", "Tieni il plank: niente sedere all'aria."],
               ["Ritmo caotico", "Controlla il passo, e cardio non gara."]],
      illu: P({ head: [44, 98, 10], neck: [58, 100], hip: [128, 116], torsoW: 20,
        armL: [[70, 104], [70, 138], [70, 160]], armR: [[74, 102], [74, 136], [74, 158]],
        legL: [[128, 116], [158, 138], [182, 158]], legR: [[128, 116], [110, 138], [98, 150]],
        floor: 168, hi: [[58, 100, 128, 116, 13]], arrows: [["a", 112, 150, 104, 132]],
        swap: true, note: "Mountain climber: plank stabile, ginocchia che entrano, ritmo costante." }) },
    highknees: { nome: "Marcia / Ginocchia Alte", categoria: "Corsa BW - Cardio", tipo: "hold", work: 60, rest: 30,
      presc: "Cardio a basso impatto: 3-5 x 45-60s, sul posto",
      muscoli: "Flessori anca, polpacci, core, motore cardio dolce",
      ritmo: "Costante, atterraggio morbido", respiro: "Ritmico", tensione: "Core attivo, busto alto",
      fasi: [["Marcia", "Sul posto, alza un ginocchio per volta all'altezza dell'anca."],
             ["Ritmo", "Braccia che accompagnano, atterraggio morbido, basso impatto."]],
      errori: [["Atterraggio pesante", "Appoggia morbido sull'avampiede, basso impatto."],
               ["Busto che crolla", "Resta alto e composto, core attivo."]],
      illu: P({ head: [100, 38, 11], neck: [100, 52], hip: [100, 110], torsoW: 22,
        armL: [[88, 56], [78, 72], [72, 86]], armR: [[112, 56], [118, 84], [114, 110]],
        legL: [[100, 110], [100, 150], [100, 184]], legR: [[100, 110], [120, 124], [134, 136]],
        floor: 184, hi: [[100, 110, 120, 124, 14]], arrows: [["a", 134, 150, 134, 130]],
        swap: true, note: "Marcia a ginocchia alte: basso impatto, core attivo, atterraggio morbido." }) },
    supinecycle: { nome: "Pedalata a Terra", categoria: "Cyclette BW - Recupero", tipo: "hold", work: 120, rest: 0,
      presc: "Cardio dolce supino: 2-4 min, lombare a terra",
      muscoli: "Core, flessori anca, circolazione, basso impatto",
      ritmo: "Pedalata fluida e lenta", respiro: "Calmo", tensione: "Lombare a terra, niente strappi",
      fasi: [["Setup", "Supino, mani dietro la testa, gambe sollevate."],
             ["Pedalata", "Simula la pedalata in aria, lenta e fluida, lombare incollata a terra."]],
      errori: [["Lombare che si stacca", "Rallenta e tieni la zona lombare a terra."],
               ["Tirare il collo", "Le mani sostengono, non tirano la testa."]],
      illu: P({ vb: "0 0 200 150", head: [44, 100, 10], neck: [58, 100], hip: [120, 98], torsoW: 20,
        armL: [[64, 96], [56, 84], [46, 88]], armR: [[64, 104], [56, 92], [46, 96]],
        legL: [[120, 98], [150, 80], [170, 90]], legR: [[120, 98], [140, 112], [166, 118]],
        floor: 122, arcs: [["arc", 150, 80, 166, 118, 176, 100]], hi: [[58, 100, 120, 98, 13]],
        swap: true, note: "Pedalata a terra: basso impatto, lombare a terra, ritmo lento." }) },
    hollowhold: { nome: "Hollow Body Hold", categoria: "Kettlebell BW - Core", tipo: "hold", work: 30, rest: 45,
      presc: "3-4 x 20-40s - banana tesa, lombare a terra",
      muscoli: "Core profondo, anti-estensione, controllo del corpo",
      ritmo: "Tenuta ferma", respiro: "Lento e regolare", tensione: "Lombare a terra, corpo a banana",
      fasi: [["Setup", "Supino, braccia oltre la testa e gambe tese sollevate."],
             ["Tenuta", "Schiaccia la lombare a terra formando una banana tesa, respiro regolare."]],
      errori: [["Lombare che si inarca", "Abbassa le gambe finche la lombare resta a terra."],
               ["Trattenere il fiato", "Respira lento durante la tenuta."]],
      illu: P({ vb: "0 0 200 150", head: [58, 96, 10], neck: [70, 94], hip: [120, 98], torsoW: 20,
        armL: [[78, 92], [58, 86], [40, 82]], armR: [[78, 96], [58, 90], [40, 86]],
        legL: [[120, 98], [150, 90], [176, 84]], legR: [[120, 98], [150, 94], [176, 88]],
        floor: 116, refs: [[40, 82, 176, 84, "bodyline"]], hi: [[70, 94, 120, 98, 16]],
        arrows: [["a",96,84,96,102]], note: "Hollow hold: lombare a terra, banana tesa, core di ferro." }) },
    birddog: { nome: "Bird Dog", categoria: "Kettlebell BW - Core", tipo: "dynamic", work: 35, rest: 30,
      presc: "3 x 8-10 per lato - arto opposto, bacino fermo",
      muscoli: "Core anti-rotazione, glutei, erettori, coordinazione",
      ritmo: "Lento e controllato", respiro: "Espira estendendo", tensione: "Schiena neutra, bacino quadrato",
      fasi: [["Quadrupedia", "Mani sotto le spalle, ginocchia sotto le anche, schiena neutra."],
             ["Estensione", "Estendi braccio e gamba opposti senza ruotare il bacino, poi alterna."]],
      errori: [["Bacino che ruota", "Anti-rotazione: i fianchi restano fermi e paralleli."],
               ["Schiena inarcata", "Mantieni la colonna lunga e neutra."]],
      illu: P({ head: [58, 92, 9], neck: [70, 94], hip: [126, 98], torsoW: 20,
        armL: [[80, 98], [80, 124], [80, 144]], armR: [[76, 92], [54, 84], [34, 78]],
        legL: [[126, 98], [140, 124], [150, 144]], legR: [[126, 98], [152, 92], [178, 86]],
        floor: 148, refs: [[34, 78, 178, 86, "bodyline"]], hi: [[70, 94, 126, 98, 13]],
        swap: true, note: "Bird dog: schiena neutra, arto opposto, niente rotazioni del bacino." }) },
    bwgetup: { nome: "Get-Up a Corpo Libero", categoria: "Kettlebell BW - Coord.", tipo: "dynamic", work: 40, rest: 60,
      presc: "2-4 per lato - alzati e scendi controllato",
      muscoli: "Coordinazione globale, core, spalle, mobilita",
      ritmo: "Lento, una tappa per volta", respiro: "Regolare", tensione: "Controllo totale, niente fretta",
      fasi: [["Salita", "Dal suolo allo stand passando per le tappe (gomito, mano, ginocchio)."],
             ["Discesa", "Torna a terra invertendo le tappe con lo stesso controllo."]],
      errori: [["Andare di fretta", "E' coordinazione: ogni posizione deve essere stabile."],
               ["Saltare le tappe", "Passa per ogni posizione, lento e pulito."]],
      illu: P({ head: [96, 72, 10], neck: [98, 82], hip: [110, 120], torsoW: 21,
        armL: [[92, 84], [78, 104], [70, 122]], armR: [[104, 84], [110, 58], [114, 36]],
        legL: [[110, 120], [140, 142], [150, 176]], legR: [[110, 120], [96, 158], [80, 176]],
        floor: 176, refs: [[114, 36, 114, 84, "press"]], hi: [[104, 84, 114, 36, 12]],
        start: { head: [78,118,10], neck: [86,124], hip: [112,150], armR: [[100,126],[108,96],[114,66]], armL: [[80,130],[66,148],[56,162]], legL: [[112,150],[138,158],[150,176]], legR: [[112,150],[96,166],[80,176]] }, note: "Get-up a corpo libero: tappe controllate, coordinazione e core." }) }
  };
  for (var __k in EXBW) EX[__k] = EXBW[__k];

  /* ===================== ROTAZIONE + UI ===================== */
  var AU = window.AU;
  var esc = AU ? AU.esc : function (x) { return x; };
  var BLOCKS = [
    { n: 1, key: "upper", nome: "Forza Upper", sub: "Spinta + Trazione", kind: "struttura", theme: "purple", mode: "forza", ex: ["dip", "chinup", "facepull"] },
    { n: 2, key: "lower", nome: "Forza Lower", sub: "Hinge + Ginocchio", kind: "struttura", theme: "purple", mode: "forza", ex: ["rdl", "splitsquat", "revnordic"] },
    { n: 3, key: "sled", nome: "Sled Motore", sub: "Locomozione caricata", kind: "struttura", theme: "purple", mode: "forza", ex: ["sledpush", "sleddrag"] },
    { n: 4, key: "corsa", nome: "Corsa Zona 2", sub: "Condizionamento", kind: "jolly", theme: "purple", ex: ["camminata", "corsa"] },
    { n: 5, key: "cyclette", nome: "Cyclette", sub: "Cardio basso impatto", kind: "jolly", theme: "purple", ex: ["cyclette", "sideplank"] },
    { n: 6, key: "kettlebell", nome: "Kettlebell", sub: "Coordinazione balistica", kind: "jolly", theme: "purple", mode: "forza", ex: ["kbswing", "goblet", "row", "carry", "tgu"] },
    { n: 7, key: "recupero", nome: "Recupero", sub: "Rigenerazione", kind: "jolly", theme: "purple", ex: ["camminata", "mobility", "childpose", "deadhang"] }
  ];
  var BLOCKS_BW = [
    { n: 1, key: "upper", nome: "Upper a Corpo Libero", sub: "Spinta + Trazione (floor)", kind: "struttura", theme: "purple", mode: "forza", ex: ["pushup", "bwrow", "pikepush"] },
    { n: 2, key: "lower", nome: "Lower a Corpo Libero", sub: "Squat + Hinge unilaterale", kind: "struttura", theme: "purple", mode: "forza", ex: ["bwsquat", "bwlunge", "slrdl"] },
    { n: 3, key: "sled", nome: "Locomozione a Terra", sub: "Bear & Crab crawl", kind: "struttura", theme: "purple", ex: ["bearcrawl", "crabwalk"] },
    { n: 4, key: "corsa", nome: "Cardio a Terra", sub: "Basso impatto", kind: "jolly", theme: "purple", ex: ["mtnclimber", "highknees"] },
    { n: 5, key: "cyclette", nome: "Recupero Attivo", sub: "Cardio dolce a terra", kind: "jolly", theme: "purple", ex: ["supinecycle", "sideplank"] },
    { n: 6, key: "kettlebell", nome: "Controllo & Core", sub: "Coordinazione a corpo libero", kind: "jolly", theme: "purple", mode: "forza", ex: ["hollowhold", "birddog", "bwgetup"] },
    { n: 7, key: "recupero", nome: "Recupero", sub: "Rigenerazione", kind: "jolly", theme: "purple", ex: ["camminata", "mobility", "childpose", "breath90"] }
  ];
  var RESET = { n: 0, key: "reset", nome: "Protocollo 0 - Reset", sub: "Postura / Equilibrio", theme: "purple", ex: ["breath90", "deadbug", "glutebridge", "hipflexor", "slbalance", "tibialis"] };

  function getTrack() { try { return localStorage.getItem("aureo_cavci_track") || "standard"; } catch (e) { return "standard"; } }
  function setTrack(t) { try { localStorage.setItem("aureo_cavci_track", t); } catch (e) {} }
  function curBlocks() { return getTrack() === "corpo" ? BLOCKS_BW : BLOCKS; }
  var curBlk = null;
  function loadCustom() { try { return JSON.parse(localStorage.getItem("aureo_cavci_custom") || "{}"); } catch (e) { return {}; } }
  function saveCustom(o) { try { localStorage.setItem("aureo_cavci_custom", JSON.stringify(o)); } catch (e) {} }
  function ckey(b) { return getTrack() + "|" + b.key; }
  function isCustom(b) { return !!loadCustom()[ckey(b)]; }
  function exIdsFor(b) { var c = loadCustom()[ckey(b)]; return (c && c.ex && c.ex.length) ? c.ex.filter(function (id) { return EX[id]; }) : b.ex; }
  function targetFor(b, id) { var c = loadCustom()[ckey(b)]; if (c && c.targets && c.targets[id] != null) return c.targets[id]; return (EX[id] && EX[id].presc) || ""; }
  function setCustom(b, fn) { var o = loadCustom(), k = ckey(b); if (!o[k]) o[k] = { ex: b.ex.slice(), targets: {} }; if (!o[k].ex) o[k].ex = b.ex.slice(); if (!o[k].targets) o[k].targets = {}; fn(o[k]); saveCustom(o); }
  function resetCustom(b) { var o = loadCustom(); delete o[ckey(b)]; saveCustom(o); }
  function blockByN(n) { var bs = curBlocks(); return bs[((n - 1) % 7 + 7) % 7]; }
  function blockByKey(k) { if (k === "reset") return RESET; return curBlocks().filter(function (b) { return b.key === k; })[0]; }
  function blockOf(id) { var all = BLOCKS.concat(BLOCKS_BW); for (var i = 0; i < all.length; i++) if (all[i].ex.indexOf(id) >= 0) return all[i]; if (RESET.ex.indexOf(id) >= 0) return RESET; return null; }
  function lastCavci() { if (!AU) return null; var h = AU.loadHistory(); for (var i = 0; i < h.length; i++) if (h[i].cavci) return { block: h[i].cavci, date: h[i].date }; return null; }
  function nextN() { var l = lastCavci(); return l ? (l.block % 7) + 1 : 1; }
  function daysSince() { var l = lastCavci(); if (!l) return -1; return Math.floor((Date.now() - new Date(l.date).getTime()) / 86400000); }
  function listOf(b) { return exIdsFor(b).map(function (id, i) { var e = EX[id]; var o = { id: id, n: i + 1 }; for (var k in e) o[k] = e[k]; o.presc = targetFor(b, id); return o; }); }

  function start(b) {
    if (!b || !AU) return;
    AU.applyTheme(b.theme);
    window.CAVCI._pending = (b.key === "reset") ? null : b.n;
    var l = listOf(b);
    var mode = b.mode || AU.PREF.mode;
    if (mode === "forza" && window.startTracker) window.startTracker(l, b.nome);
    else if (window.startWorkout) window.startWorkout(l, b.nome);
  }

  function openBlock(b) {
    if (!b || !AU || !AU.openSummary) return;
    curBlk = b;
    var mode = b.mode || AU.PREF.mode;
    AU.openSummary({
      theme: b.theme, bar: "Rotazione CAVCI",
      badge: b.key === "reset" ? "Protocollo 0" : ("Tappa " + b.n + " / 7"),
      title: b.nome, sub: b.sub,
      rows: exIdsFor(b).map(function (id) { var e = EX[id]; return { name: e.nome, meta: targetFor(b, id), opt: e.opt, attr: 'data-cavci-ex="' + id + '"' }; }),
      startLabel: "Avvia " + (mode === "forza" ? "(Forza)" : "(Guidato)"),
      note: mode === "forza" ? "Diario Forza: carico, ripetizioni e RPE." : "Guidato: timer e illustrazioni.",
      extra: '<button class="btn secondary" data-edit-open="1">Modifica routine</button>',
      start: function () { start(b); }
    });
  }

  function renderEditor() {
    var b = curBlk; if (!b || !AU) return;
    var ids = exIdsFor(b);
    var rows = ids.map(function (id) {
      var e = EX[id];
      return '<div class="ed-row"><div class="ed-top"><button class="ed-rn" data-cavci-ex="' + id + '">' + esc(e.nome) + '</button>' +
        '<div class="ed-ctrl">' +
        '<button class="ed-b" data-edit-up="' + id + '" aria-label="Su">&#8593;</button>' +
        '<button class="ed-b" data-edit-dn="' + id + '" aria-label="Giu">&#8595;</button>' +
        '<button class="ed-b rm" data-edit-rm="' + id + '" aria-label="Rimuovi">&#10005;</button></div></div>' +
        '<input class="ed-tgt" data-edit-target="' + id + '" value="' + esc(targetFor(b, id)) + '" placeholder="serie x reps - RPE"></div>';
    }).join("");
    var h = '<div class="bk"><div class="bk-hero"><div class="bk-badge">Modifica</div><h2>' + esc(b.nome) + '</h2><p>Aggiungi, togli, riordina o cambia i target. Si salva da solo.</p></div>' +
      '<div class="bk-list ed-list">' + rows + '</div>' +
      '<button class="btn secondary" data-edit-add="1">+ Aggiungi esercizio</button>' +
      (isCustom(b) ? '<button class="btn secondary danger-soft" data-edit-reset="1">Ripristina predefinito</button>' : '') +
      '<button class="btn" data-edit-done="1">Fatto</button></div>';
    AU.byId("view-block").innerHTML = h;
    AU.byId("barTitle").textContent = "Modifica"; AU.byId("barSub").textContent = b.nome;
    AU.show("block");
  }
  function renderPicker() {
    var b = curBlk; if (!b || !AU) return;
    var have = exIdsFor(b);
    var pool = Object.keys(EX).filter(function (id) { return have.indexOf(id) < 0; });
    var rows = pool.map(function (id) { var e = EX[id]; return '<button class="bk-row" data-edit-pick="' + id + '"><span class="bk-rn">' + esc(e.nome) + '</span><span class="bk-rm">' + esc(e.categoria) + '</span></button>'; }).join("");
    var h = '<div class="bk"><div class="bk-hero"><div class="bk-badge">Aggiungi</div><h2>Scegli un esercizio</h2><p>Tocca per aggiungerlo a ' + esc(b.nome) + '.</p></div>' +
      '<div class="bk-list">' + rows + '</div><button class="btn secondary" data-edit-back="1">Annulla</button></div>';
    AU.byId("view-block").innerHTML = h; AU.show("block");
  }

  function openEx(id) {
    var e = EX[id]; if (!e || !AU) return;
    var logs = AU.exerciseLogs(id);
    var h = '<div class="detail">';
    h += '<div class="detail-illu">' + renderIllu(e.illu) + '<div class="cap">' + esc(e.illu.note || "") + '</div></div>';
    h += '<h2>' + esc(e.nome) + '</h2>';
    h += '<div class="meta-row"><span class="chip"><b>' + esc(e.categoria) + '</b></span><span class="chip">' + esc(e.presc) + '</span></div>';
    h += '<div class="muscoli"><b style="color:var(--gold)">Muscoli:</b> ' + esc(e.muscoli) + '</div>';
    if (logs.length) {
      h += '<div class="section-title">I tuoi progressi</div><div class="card-box">' + renderProgressChart(logs) + '</div>';
      var nums = logs.filter(function (l) { return !l.skipped && typeof l.value === "number"; }).map(function (l) { return l.value; });
      if (nums.length) h += '<div class="pr-line">Record personale: <b>' + Math.max.apply(null, nums) + ' ' + esc(logs[0].unit || "") + '</b></div>';
    }
    h += '<div class="rrt"><div class="item"><div class="k">Ritmo</div><div class="v">' + esc(e.ritmo) + '</div></div>' +
      '<div class="item"><div class="k">Respiro</div><div class="v">' + esc(e.respiro) + '</div></div>' +
      '<div class="item"><div class="k">Tensione</div><div class="v">' + esc(e.tensione) + '</div></div></div>';
    var fasiH = ""; e.fasi.forEach(function (f) { fasiH += '<div class="phase"><div class="ph-dot"></div><div><div class="ph-label">' + esc(f[0]) + '</div><div class="ph-text">' + esc(f[1]) + '</div></div></div>'; });
    var errH = ""; e.errori.forEach(function (er) { errH += '<div class="err"><div class="bad">' + esc(er[0]) + '</div><div class="fix">' + esc(er[1]) + '</div></div>'; });
    h += '<button class="acc-h" data-acc="detphases"><div class="acc-tx"><div class="acc-t">Analisi del movimento</div><div class="acc-s">Fasi, una per una</div></div><span class="acc-cx">&rsaquo;</span></button><div class="acc-b hidden" id="acc-detphases">' + fasiH + '</div>';
    h += '<button class="acc-h" data-acc="deterr"><div class="acc-tx"><div class="acc-t">Errori da evitare</div><div class="acc-s">...e come correggerli</div></div><span class="acc-cx">&rsaquo;</span></button><div class="acc-b hidden" id="acc-deterr">' + errH + '</div>';
    var b = blockOf(id);
    h += '<button class="btn" data-cavci-start="' + (b ? b.key : "reset") + '">' + (AU.IC.play || "") + ' Avvia ' + esc(b ? b.nome : "Reset") + '</button></div>';
    AU.byId("view-detail").innerHTML = h;
    AU.applyTheme(b ? b.theme : "purple");
    AU.show("detail");
  }

  function renderHomeSection() {
    var tr = getTrack();
    var nb = blockByN(nextN()), l = lastCavci(), ds = daysSince();
    var nEx = exIdsFor(nb).length;
    var hint;
    if (ds >= 14) hint = '<div class="cv-hint warn">Pausa lunga (' + ds + 'g): parti con Recupero o Reset, poi riprendi al 60-70%.</div>';
    else if (ds >= 7) hint = '<div class="cv-hint">Stop di ' + ds + 'g: riparti con volume ridotto (2 serie, RPE 6-7, niente test).</div>';
    else if (l) hint = '<div class="cv-hint">Ultimo: ' + esc(blockByN(l.block).nome) + (ds >= 0 ? ' &middot; ' + (ds === 0 ? 'oggi' : ds + 'g fa') : '') + '. Non ricominciare: continua.</div>';
    else hint = '<div class="cv-hint">Inizia la rotazione dal primo blocco. Non e un calendario: e una sequenza.</div>';
    var strip = curBlocks().map(function (b) { return '<button class="cv-step' + (b.n === nb.n ? ' on' : '') + '" data-cavci-open="' + b.key + '"><span class="cv-sn">' + b.n + '</span><span class="cv-snm">' + esc(b.nome.replace('Forza ', '').replace(' a Corpo Libero', '')) + '</span></button>'; }).join("");
    var toggle = '<div class="cv-track"><button class="cv-tb' + (tr !== "corpo" ? " on" : "") + '" data-cavci-track="standard">Attrezzi</button><button class="cv-tb' + (tr === "corpo" ? " on" : "") + '" data-cavci-track="corpo">Corpo libero</button></div>';
    return '<div class="section-title">Rotazione CAVCI</div>' + toggle +
      '<div class="cv-next" data-th="' + nb.theme + '"><div class="cv-eye">' + (AU.EYE || "") + '</div>' +
      '<div class="cv-next-top"><span class="cv-badge">Prossima tappa' + (tr === "corpo" ? ' &middot; Corpo libero' : '') + '</span><span class="cv-n">' + nb.n + '/7</span></div>' +
      '<h3>' + esc(nb.nome) + '</h3><p>' + esc(nb.sub) + ' &middot; ' + nEx + ' esercizi</p>' +
      '<div class="cv-actions"><button class="btn" data-cavci-start="' + nb.key + '">' + (AU.IC.play || "") + ' Avvia</button><button class="btn secondary cv-open" data-cavci-open="' + nb.key + '">Apri</button></div>' +
      hint + '</div>' +
      '<div class="cv-strip">' + strip + '</div>' +
      '<button class="btn secondary cv-reset" data-cavci-reset>Protocollo 0 - Reset posturale</button>';
  }

  if (AU) {
    AU.byId("view-home").addEventListener("click", function (e) {
      var st = e.target.closest("[data-cavci-start]"), rs = e.target.closest("[data-cavci-reset]"), ex = e.target.closest("[data-cavci-ex]"), tk = e.target.closest("[data-cavci-track]"), op = e.target.closest("[data-cavci-open]");
      if (tk) { setTrack(tk.dataset.cavciTrack); if (AU.renderHome) AU.renderHome(); }
      else if (op) openBlock(blockByKey(op.dataset.cavciOpen));
      else if (st) start(blockByKey(st.dataset.cavciStart));
      else if (rs) start(RESET);
      else if (ex) openEx(ex.dataset.cavciEx);
    });
    AU.byId("view-detail").addEventListener("click", function (e) {
      var st = e.target.closest("[data-cavci-start]"); if (st) start(blockByKey(st.dataset.cavciStart));
    });
    AU.byId("view-block").addEventListener("click", function (e) {
      var b = curBlk, t;
      if ((t = e.target.closest("[data-edit-open]"))) { if (b) openEditor(b); return; }
      if ((t = e.target.closest("[data-edit-add]"))) { renderPicker(); return; }
      if ((t = e.target.closest("[data-edit-back]"))) { renderEditor(); return; }
      if ((t = e.target.closest("[data-edit-done]"))) { if (b) openBlock(b); return; }
      if (!b) return;
      if ((t = e.target.closest("[data-edit-pick]"))) { setCustom(b, function (c) { if (c.ex.indexOf(t.dataset.editPick) < 0) c.ex.push(t.dataset.editPick); }); renderEditor(); return; }
      if ((t = e.target.closest("[data-edit-rm]"))) { setCustom(b, function (c) { var i = c.ex.indexOf(t.dataset.editRm); if (i >= 0 && c.ex.length > 1) c.ex.splice(i, 1); }); renderEditor(); return; }
      if ((t = e.target.closest("[data-edit-up]"))) { setCustom(b, function (c) { var i = c.ex.indexOf(t.dataset.editUp); if (i > 0) { var x = c.ex.splice(i, 1)[0]; c.ex.splice(i - 1, 0, x); } }); renderEditor(); return; }
      if ((t = e.target.closest("[data-edit-dn]"))) { setCustom(b, function (c) { var i = c.ex.indexOf(t.dataset.editDn); if (i >= 0 && i < c.ex.length - 1) { var x = c.ex.splice(i, 1)[0]; c.ex.splice(i + 1, 0, x); } }); renderEditor(); return; }
      if ((t = e.target.closest("[data-edit-reset]"))) { resetCustom(b); renderEditor(); return; }
    });
    AU.byId("view-block").addEventListener("change", function (e) {
      var b = curBlk; if (!b) return;
      var t = e.target.closest("[data-edit-target]");
      if (t) { var id = t.dataset.editTarget, val = t.value; setCustom(b, function (c) { c.targets[id] = val; }); }
    });
  }
  function openEditor(b) { curBlk = b; renderEditor(); }

  window.CAVCI = { EX: EX, BLOCKS: BLOCKS, RESET: RESET, renderHomeSection: renderHomeSection, start: start, openEx: openEx, openBlock: openBlock, nextN: nextN, _pending: null };
  if (AU && AU.renderHome) AU.renderHome();
})();
