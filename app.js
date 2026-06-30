/* =====================================================================
   L'Allenamento Aureo - core UI (navigazione, home, libreria, scheda, storico)
   Il motore di allenamento e in workout.js (usa window.AU + window.startWorkout)
   ===================================================================== */
(function () {
  "use strict";

  var byId = function (id) { return document.getElementById(id); };
  var IC = {
    play: '<svg viewBox="0 0 24 24"><path d="M8 5 19 12 8 19 Z"/></svg>',
    pause: '<svg viewBox="0 0 24 24"><path d="M9 5v14M15 5v14"/></svg>',
    prev: '<svg viewBox="0 0 24 24"><path d="M7 5v14M19 6 10 12 19 18 Z"/></svg>',
    next: '<svg viewBox="0 0 24 24"><path d="M17 5v14M5 6 14 12 5 18 Z"/></svg>',
    skip: '<svg viewBox="0 0 24 24"><path d="M5 6 12 12 5 18 ZM13 6 20 12 13 18 Z"/></svg>',
    close: '<svg viewBox="0 0 24 24"><path d="M6 6 18 18M18 6 6 18"/></svg>',
    trophy: '<svg viewBox="0 0 24 24"><path d="M7 4h10v5a5 5 0 0 1-10 0zM7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3M9 20h6M12 14v6"/></svg>',
    calendar: '<svg viewBox="0 0 24 24"><path d="M5 6h14v13H5zM5 10h14M9 4v3M15 4v3"/></svg>',
    music: '<svg viewBox="0 0 24 24"><path d="M9 17V5l10-2v12"/><circle cx="6.5" cy="17" r="2.6"/><circle cx="16.5" cy="15" r="2.6"/></svg>',
    check: '<svg viewBox="0 0 24 24"><path d="M5 12 10 17 20 6"/></svg>'
  };

  var EYE = '<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="heI" cx="42%" cy="38%" r="62%"><stop offset="0" stop-color="#EAF4FF"/><stop offset="34%" stop-color="#93CBFF"/><stop offset="70%" stop-color="#3D8BFF"/><stop offset="100%" stop-color="#1E57B4"/></radialGradient></defs><path d="M4 24C13 11 35 11 44 24C35 37 13 37 4 24Z" fill="#0a0a12"/><circle cx="24" cy="24" r="11.5" fill="url(#heI)"/><circle cx="24" cy="24" r="4.8" fill="#0a0c18"/><circle cx="20.5" cy="20.5" r="2.2" fill="#fff"/><path d="M4 24C13 11 35 11 44 24C35 37 13 37 4 24Z" fill="none" stroke="#BBD8FF" stroke-width="1.8"/></svg>';

  var PREF = { sound: true, vibrate: true, theme: "auto", domainIntro: true, onboarded: false, mode: "guided", reminder: false, reminderDays: 2 };
  try {
    var saved = localStorage.getItem("aureo_pref");
    if (saved) PREF = Object.assign(PREF, JSON.parse(saved));
  } catch (e) {}
  function savePref() { try { localStorage.setItem("aureo_pref", JSON.stringify(PREF)); } catch (e) {} }
  var THEME_BY_BLOCK = { 1: "blue", 2: "cyan", 3: "red", 4: "purple" };
  function resolveTheme(ctx) { if (PREF.theme && PREF.theme !== "auto") return PREF.theme; if (typeof ctx === "string") return ctx; return (ctx && THEME_BY_BLOCK[ctx]) || "cyan"; }
  function applyTheme(ctx) { document.documentElement.setAttribute("data-theme", resolveTheme(ctx)); }
  var THEMES = [{ id: "auto", name: "Automatico", c: "#00E5FF" }, { id: "cyan", name: "Six Eyes", c: "#00E5FF" }, { id: "blue", name: "Lapse", c: "#6FB6FF" }, { id: "purple", name: "Hollow", c: "#C4A0FF" }, { id: "red", name: "Reverse", c: "#FF7A7A" }, { id: "gold", name: "Aureo", c: "#FBD27B" }];
  var GOJO_QUOTES = ["\"Nah, I'd win.\" - Gojo", "Sono semplicemente il piu forte.", "\"Throughout Heaven and Earth, I alone am the honored one.\"", "Fin dove arriva il tuo limite? Oltre.", "Va tutto bene: sono io il piu forte.", "Nessun limite. Solo tecnica."];
  var qi = Math.floor(Math.random() * 6);
  var SLIDES = [
    { over: "Benvenuto", h: "L'Allenamento Aureo", p: "17 esercizi illustrati dal manuale tecnico, spiegati fase per fase." },
    { over: "Allenati", h: "Guidato, a tempo", p: "Timer, recuperi automatici, registra le ripetizioni e salva lo storico con i grafici." },
    { over: "La tua energia", h: "Scegli il dominio", p: "Tema, musica e intro: rendi l'app davvero tua. Pronto?", themes: true }
  ];
  function showOnboarding() {
    var i = 0;
    var ov = document.createElement("div"); ov.className = "onb"; document.body.appendChild(ov);
    function close() { PREF.onboarded = true; savePref(); ov.classList.add("out"); setTimeout(function () { if (ov.parentNode) ov.parentNode.removeChild(ov); }, 280); }
    function render() {
      var s = SLIDES[i];
      var dots = SLIDES.map(function (_, j) { return '<i class="' + (j === i ? "on" : "") + '"></i>'; }).join("");
      var themes = s.themes ? ('<div class="onb-themes">' + THEMES.map(function (t) { return '<button data-otheme="' + t.id + '" class="' + (PREF.theme === t.id ? "on" : "") + '" style="background:' + t.c + '" aria-label="' + t.name + '"></button>'; }).join("") + '</div>') : "";
      ov.innerHTML = '<button class="onb-skip" data-onb="skip">Salta</button>' +
        '<div class="onb-eye">' + EYE + '</div>' +
        '<div class="onb-body"><div class="onb-over">' + esc(s.over) + '</div><h2>' + esc(s.h) + '</h2><p>' + esc(s.p) + '</p>' + themes + '</div>' +
        '<div class="onb-dots">' + dots + '</div>' +
        '<button class="btn" data-onb="next">' + (i < SLIDES.length - 1 ? "Avanti" : "Inizia") + '</button>';
    }
    ov.addEventListener("click", function (e) {
      var b = e.target.closest("[data-onb],[data-otheme]"); if (!b) return;
      if (b.dataset.otheme) { PREF.theme = b.dataset.otheme; savePref(); applyTheme(); render(); return; }
      if (b.dataset.onb === "skip") { close(); return; }
      if (b.dataset.onb === "next") { if (i < SLIDES.length - 1) { i++; render(); } else { close(); renderHome(); } }
    });
    render();
  }

  function loadHistory() {
    try { return JSON.parse(localStorage.getItem("aureo_history") || "[]"); } catch (e) { return []; }
  }
  function saveHistory(arr) { try { localStorage.setItem("aureo_history", JSON.stringify(arr.slice(0, 200))); } catch (e) {} }
  function addSession(sess) { if (window.CAVCI && window.CAVCI._pending != null) { sess.cavci = window.CAVCI._pending; window.CAVCI._pending = null; } var h = loadHistory(); h.unshift(sess); saveHistory(h); }
  function clearHistory() { try { localStorage.removeItem("aureo_history"); } catch (e) {} }
  function exerciseLogs(id) {
    var out = [];
    loadHistory().forEach(function (s) {
      (s.items || []).forEach(function (it) { if (it.id === id) out.push({ date: s.date, value: it.value, unit: it.unit, skipped: it.skipped }); });
    });
    return out;
  }

  function exByN(n) { return EXERCISES.filter(function (e) { return e.blocco === n; }).sort(function (a, b) { return a.n - b.n; }); }
  function allEx() { return EXERCISES.slice().sort(function (a, b) { return a.n - b.n; }); }
  function fmt(s) { var m = Math.floor(s / 60), r = s % 60; return (m > 0 ? m + ":" + (r < 10 ? "0" : "") + r : String(r)); }
  function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  var MESI = ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"];
  var GIORNI = ["domenica", "lunedi", "martedi", "mercoledi", "giovedi", "venerdi", "sabato"];
  function dayKey(d) { return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); }
  function dayLabel(iso) {
    var d = new Date(iso), now = new Date();
    var k = dayKey(d), tk = dayKey(now);
    var y = new Date(now); y.setDate(now.getDate() - 1);
    if (k === tk) return "Oggi";
    if (k === dayKey(y)) return "Ieri";
    return GIORNI[d.getDay()].charAt(0).toUpperCase() + GIORNI[d.getDay()].slice(1) + " " + d.getDate() + " " + MESI[d.getMonth()] + " " + d.getFullYear();
  }
  function timeLabel(iso) { var d = new Date(iso); return ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2); }
  function unitFor(e) { return e.tipo === "hold" ? "sec" : e.tipo === "carry" ? "passi" : "rip."; }
  function defaultVal(e) { return e.tipo === "hold" ? e.work : e.tipo === "carry" ? 40 : (e.tipo === "dynamic" ? 12 : 10); }

  var lastListView = "home";
  function show(view) {
    ["home", "library", "detail", "history", "music"].forEach(function (v) {
      byId("view-" + v).classList.toggle("hidden", v !== view);
    });
    byId("backBtn").classList.toggle("hidden", view !== "detail");
    byId("logo").classList.toggle("hidden", view === "detail");
    byId("tabbar").querySelectorAll("button").forEach(function (b) {
      b.classList.toggle("active", b.dataset.tab === view);
    });
    var titles = {
      home: ["L'Allenamento Aureo", "Manuale Tecnico"],
      library: ["Libreria esercizi", "17 schede tecniche"],
      history: ["Storico", "I tuoi allenamenti"],
      music: ["Musica", "Allenati con la tua musica"]
    };
    if (titles[view]) { byId("barTitle").textContent = titles[view][0]; byId("barSub").textContent = titles[view][1]; }
    if (view !== "detail") applyTheme();
    window.scrollTo(0, 0);
  }

  function startSession(list, title, ctx) { applyTheme(ctx); if (PREF.mode === "forza" && window.startTracker) window.startTracker(list, title); else window.startWorkout(list, title); }

  byId("tabbar").addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    if (b.dataset.tab === "library") renderLibrary();
    if (b.dataset.tab === "history") renderHistory();
    if (b.dataset.tab === "music" && window.renderMusicView) window.renderMusicView();
    show(b.dataset.tab);
  });
  byId("backBtn").addEventListener("click", function () { show(lastListView); });

  function renderHome() {
    applyTheme();
    var hist = loadHistory();
    var h = "";
    h += '<div class="hero"><div class="glow"></div><div class="hero-eye">' + EYE + '</div>' +
      '<div class="hero-over">Dominio &middot; Limitless</div>' +
      '<h2>Pronto ad allenarti?</h2>' +
      '<p>17 esercizi, 4 blocchi, tecnica illustrata. Avvia una sessione guidata con timer, registra le ripetizioni e tieni lo storico.</p>' +
      '<div class="gojo-quote" id="gojoQuote">' + esc(GOJO_QUOTES[qi % GOJO_QUOTES.length]) + '</div>' +
      '<button class="btn" data-act="start-all">' + IC.play + ' Allenamento completo</button>' +
      '<button class="btn secondary" data-act="go-library">Sfoglia la libreria</button>' +
      '</div>';

    var standalone = (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) || window.navigator.standalone;
    if (!standalone && localStorage.getItem("aureo_a2hs") !== "1") h += '<div class="a2hs"><span class="nx">Aggiungi a Home: dati al sicuro e schermo intero.</span><button class="a2hs-x" data-act="a2hs-dismiss" aria-label="Chiudi">' + IC.close + '</button></div>';
    var dsl = hist.length ? Math.floor((Date.now() - new Date(hist[0].date).getTime()) / 86400000) : -1;
    if (dsl >= 3) h += '<div class="nudge"><span class="nx">Non ti alleni da <span class="nd">' + dsl + ' giorni</span>. Riattiva il dominio.</span></div>';
    if (hist.length) {
      var last = hist[0];
      var done = last.items.filter(function (i) { return !i.skipped; }).length;
      var sk = last.items.filter(function (i) { return i.skipped; }).length;
      h += '<div class="section-title">Ultimo allenamento</div>';
      h += '<button class="block-card" data-act="go-history"><div class="block-num">&#10003;</div>' +
        '<div><div class="b-name">' + esc(last.title) + '</div>' +
        '<div class="b-desc">' + dayLabel(last.date) + ' - ' + timeLabel(last.date) + '</div>' +
        '<div class="b-meta">' + done + ' svolti' + (sk ? ' - ' + sk + ' saltati' : '') + '</div></div>' +
        '<div class="chev">&rsaquo;</div></button>';
    }

    if (window.CAVCI) h += window.CAVCI.renderHomeSection();
    h += '<div class="section-title">Come vuoi allenarti?</div>';
    h += '<div class="seg">' +
      '<button class="seg-b' + (PREF.mode !== "forza" ? " on" : "") + '" data-segmode="guided">Guidato</button>' +
      '<button class="seg-b' + (PREF.mode === "forza" ? " on" : "") + '" data-segmode="forza">Forza</button></div>';
    h += '<div class="seg-cap">' + (PREF.mode === "forza" ? "Diario forza: registra serie, ripetizioni e carico con recupero. Tu detti il ritmo." : "Flusso guidato: premi Play, segui timer e illustrazioni. Zero attrito.") + '</div>';
    h += '<div class="section-title">Manuale Tecnico (17 esercizi)</div>';
    BLOCCHI.forEach(function (b) {
      var list = exByN(b.n);
      var mins = Math.round(list.reduce(function (s, e) { return s + e.work + e.rest; }, 0) / 60);
      h += '<button class="block-card" data-block="' + b.n + '">' +
        '<div class="block-num">' + b.n + '</div>' +
        '<div><div class="b-name">' + esc(b.nome.replace(/^Blocco \d+ . /, "")) + '</div>' +
        '<div class="b-desc">' + esc(b.desc) + '</div>' +
        '<div class="b-meta">' + list.length + ' esercizi - ~' + mins + ' min</div></div>' +
        '<div class="chev">&rsaquo;</div></button>';
    });

    h += '<div class="section-title">Impostazioni</div>';
    h += '<div class="card-box">' +
      '<div class="toggle-row"><div>Suono ai cambi</div><div class="sw ' + (PREF.sound ? "on" : "") + '" data-toggle="sound"></div></div>' +
      '<div class="toggle-row"><div>Vibrazione</div><div class="sw ' + (PREF.vibrate ? "on" : "") + '" data-toggle="vibrate"></div></div>' +
      '<div class="toggle-row"><div>Intro &laquo;Espansione del Dominio&raquo;</div><div class="sw ' + (PREF.domainIntro ? "on" : "") + '" data-toggle="domainIntro"></div></div>' +
      '<div class="toggle-row"><div>Promemoria all\'apertura</div><div class="sw ' + (PREF.reminder ? "on" : "") + '" data-toggle="reminder"></div></div>' +
      '</div>';
    h += '<div class="section-title">Tema energia</div><div class="theme-row">' + THEMES.map(function (t) { return '<button class="theme-sw' + (PREF.theme === t.id ? " on" : "") + '" data-theme="' + t.id + '"><span style="background:' + t.c + '"></span>' + t.name + '</button>'; }).join("") + '</div>';
    h += '<div class="seg-cap">' + (PREF.theme === "auto" ? "Automatico: l'accento segue il blocco che alleni - Riscaldamento blu, Potenza ciano (Six Eyes), Forza rosso, Condizionamento viola. Home e sessione completa restano Six Eyes." : "Tema fisso. Scegli Automatico per far cambiare l'accento in base al blocco.") + '</div>';
    h += '<div class="section-title">Dati e backup</div>';
    h += '<div class="card-box"><div class="data-row">' +
      '<button class="btn mini secondary" data-act="export-json">Backup JSON</button>' +
      '<button class="btn mini secondary" data-act="export-csv">Esporta CSV</button></div>' +
      '<button class="btn mini secondary" data-act="import" style="margin-top:8px">Importa backup</button>' +
      '<input type="file" id="importFile" accept="application/json,.json" style="display:none">' +
      '<div class="seg-cap">I dati restano sul dispositivo: esporta ogni tanto per non perderli (iOS puo cancellare i dati locali dopo ~7 giorni di inutilizzo).</div></div>';
    h += '<div class="footer-note">Tratto dal "Manuale Tecnico degli Esercizi - L\'Allenamento Aureo".<br>Scala il range alle tue capacita, priorita alla tecnica, fermati in caso di dolore.</div>';

    byId("view-home").innerHTML = h;
  }

  byId("view-home").addEventListener("click", function (e) {
    var act = e.target.closest("[data-act]");
    var blk = e.target.closest("[data-block]");
    var tg = e.target.closest("[data-toggle]");
    var th = e.target.closest(".theme-sw");
    var sg = e.target.closest("[data-segmode]");
    if (act) {
      if (act.dataset.act === "start-all") startSession(allEx(), "Allenamento completo");
      if (act.dataset.act === "go-library") { renderLibrary(); show("library"); }
      if (act.dataset.act === "go-history") { renderHistory(); show("history"); }
      if (act.dataset.act === "export-json" && window.EX) window.EX.exportJSON();
      if (act.dataset.act === "export-csv" && window.EX) window.EX.exportCSV();
      if (act.dataset.act === "import") { var fi = byId("importFile"); if (fi) fi.click(); }
      if (act.dataset.act === "a2hs-dismiss") { try { localStorage.setItem("aureo_a2hs", "1"); } catch (e) {} renderHome(); }
    } else if (blk) {
      startSession(exByN(+blk.dataset.block), BLOCCHI[+blk.dataset.block - 1].nome, +blk.dataset.block);
    } else if (tg) {
      var k = tg.dataset.toggle; PREF[k] = !PREF[k]; savePref(); tg.classList.toggle("on", PREF[k]);
      if (k === "reminder" && PREF[k] && window.EX) window.EX.requestReminder(function (ok) { if (!ok) { PREF.reminder = false; savePref(); renderHome(); } });
    } else if (th) {
      PREF.theme = th.dataset.theme; savePref(); applyTheme(); renderHome();
    } else if (sg) {
      PREF.mode = sg.dataset.segmode; savePref(); renderHome();
    }
  });
  byId("view-home").addEventListener("change", function (e) { var f = e.target.closest("#importFile"); if (f && f.files && f.files[0] && window.EX) window.EX.importJSON(f.files[0]); });

  function renderLibrary() {
    var h = "";
    BLOCCHI.forEach(function (b) {
      var list = exByN(b.n); if (!list.length) return;
      h += '<div class="section-title">' + esc(b.nome) + '</div>';
      list.forEach(function (e) {
        h += '<button class="ex-row" data-ex="' + e.id + '">' +
          '<div class="ex-thumb">' + renderIllu(e.illu, true) + '</div>' +
          '<div style="flex:1;min-width:0">' +
          '<div class="e-num">Esercizio ' + e.n + '</div>' +
          '<div class="e-name">' + esc(e.nome) + '</div>' +
          '<div class="e-cat">' + esc(e.categoria) + '</div>' +
          '<span class="badge ' + e.priorita + '">' + e.priorita + '</span>' +
          '</div><div class="chev">&rsaquo;</div></button>';
      });
    });
    byId("view-library").innerHTML = h;
  }
  byId("view-library").addEventListener("click", function (e) {
    var row = e.target.closest("[data-ex]");
    if (row) { lastListView = "library"; openDetail(row.dataset.ex); }
  });

  function openDetail(id) {
    var e = EXERCISES.filter(function (x) { return x.id === id; })[0]; if (!e) return;
    applyTheme(e.blocco);
    var h = '<div class="detail">';
    h += '<div class="detail-illu">' + renderIllu(e.illu) + '<div class="cap">' + esc(e.illu.note || "") + '</div></div>';
    h += '<h2>' + esc(e.nome) + '</h2>';
    h += '<div class="meta-row">' +
      '<span class="badge ' + e.priorita + '">' + e.priorita + '</span>' +
      '<span class="chip"><b>Blocco ' + e.blocco + '</b></span>' +
      '<span class="chip">' + esc(e.categoria) + '</span></div>';
    h += '<div class="muscoli"><b style="color:var(--gold)">Muscoli:</b> ' + esc(e.muscoli) + '</div>';

    var logs = exerciseLogs(e.id);
    if (logs.length) {
      h += '<div class="section-title">I tuoi progressi</div>';
      h += '<div class="card-box">' + renderProgressChart(logs) + '</div>';
      var nums = logs.filter(function (l) { return !l.skipped && typeof l.value === "number"; }).map(function (l) { return l.value; });
      if (nums.length) h += '<div class="pr-line">Record personale: <b>' + Math.max.apply(null, nums) + ' ' + esc(logs[0].unit || "") + '</b></div>';
      h += '<div class="card-box">';
      logs.slice(0, 6).forEach(function (l) {
        h += '<div class="log-row"><span>' + dayLabel(l.date) + ' - ' + timeLabel(l.date) + '</span>' +
          '<b>' + (l.skipped ? '<span style="color:var(--muted)">saltato</span>' : (l.value + ' ' + l.unit)) + '</b></div>';
      });
      h += '</div>';
    }

    h += '<div class="section-title">Analisi del movimento</div>';
    e.fasi.forEach(function (f) {
      h += '<div class="phase"><div class="ph-dot"></div><div>' +
        '<div class="ph-label">' + esc(f[0]) + '</div><div class="ph-text">' + esc(f[1]) + '</div></div></div>';
    });
    h += '<div class="rrt">' +
      '<div class="item"><div class="k">Ritmo</div><div class="v">' + esc(e.ritmo) + '</div></div>' +
      '<div class="item"><div class="k">Respiro</div><div class="v">' + esc(e.respiro) + '</div></div>' +
      '<div class="item"><div class="k">Tensione</div><div class="v">' + esc(e.tensione) + '</div></div></div>';
    h += '<div class="section-title">Errori da evitare &rarr; correzione</div>';
    e.errori.forEach(function (er) {
      h += '<div class="err"><div class="bad">' + esc(er[0]) + '</div><div class="fix">' + esc(er[1]) + '</div></div>';
    });
    h += '<button class="btn" data-start-one="' + e.id + '">' + IC.play + ' Avvia questo esercizio</button></div>';
    byId("view-detail").innerHTML = h;
    show("detail");
  }
  byId("view-detail").addEventListener("click", function (e) {
    var s = e.target.closest("[data-start-one]");
    if (s) { var ex = EXERCISES.filter(function (x) { return x.id === s.dataset.startOne; })[0]; startSession([ex], ex.nome, ex.blocco); }
  });

  function renderHistory() {
    var hist = loadHistory();
    var h = "";
    if (!hist.length) {
      h += '<div class="empty"><div class="big">' + IC.calendar + '</div><h3>Ancora nessun allenamento</h3>' +
        '<p>Avvia una sessione: al termine la troverai qui, giorno per giorno, con le ripetizioni registrate.</p>' +
        '<button class="btn" data-act="hist-start">' + IC.play + ' Inizia ora</button></div>';
      byId("view-history").innerHTML = h; return;
    }
    var totSess = hist.length;
    var totEx = hist.reduce(function (s, x) { return s + x.items.filter(function (i) { return !i.skipped; }).length; }, 0);
    h += '<div class="stat-row">' +
      '<div class="stat"><div class="num">' + totSess + '</div><div class="lab">sessioni</div></div>' +
      '<div class="stat"><div class="num">' + totEx + '</div><div class="lab">esercizi svolti</div></div></div>';

    var groups = [], map = {};
    hist.forEach(function (s) { var k = dayLabel(s.date); if (!map[k]) { map[k] = []; groups.push(k); } map[k].push(s); });
    groups.forEach(function (k) {
      h += '<div class="section-title">' + esc(k) + '</div>';
      map[k].forEach(function (s) {
        var done = s.items.filter(function (i) { return !i.skipped; }).length;
        var sk = s.items.filter(function (i) { return i.skipped; }).length;
        h += '<div class="hist-card">' +
          '<button class="hist-head" data-toggle-sess="' + s.id + '">' +
          '<div style="flex:1"><div class="b-name">' + esc(s.title) + '</div>' +
          '<div class="b-desc">' + (s.kind === "forza" ? "Forza" : "Guidato") + ' &middot; ' + timeLabel(s.date) + ' - ' + done + ' svolti' + (sk ? ' - ' + sk + ' saltati' : '') + '</div></div>' +
          '<span class="badge ' + (s.status === "interrotta" ? "media" : "bassa") + '">' + esc(s.status) + '</span>' +
          '<div class="chev">&rsaquo;</div></button>';
        h += '<div class="hist-body hidden" id="sb_' + s.id + '">';
        if (s.durationSec || s.volume) { h += '<div class="hist-meta">' + (s.durationSec ? '<span>Durata ' + Math.max(1, Math.round(s.durationSec / 60)) + ' min</span>' : '') + (s.volume ? '<span>Volume ' + Math.round(s.volume) + ' kg</span>' : '') + '</div>'; }
        s.items.forEach(function (it) {
          h += '<div class="log-row"><span>' + it.n + '. ' + esc(it.nome) + '</span>' +
            '<b>' + (it.skipped ? '<span style="color:var(--muted)">saltato</span>' : (it.value + ' ' + it.unit + (it.sets ? ' &middot; ' + it.sets.length + ' serie' : '') + (it.rpe ? ' &middot; RPE ' + it.rpe : ''))) + '</b></div>';
        });
        h += '</div></div>';
      });
    });
    h += '<button class="btn secondary" data-act="clear-hist" style="margin-top:18px">Cancella tutto lo storico</button>';
    byId("view-history").innerHTML = h;
  }

  byId("view-history").addEventListener("click", function (e) {
    var t = e.target.closest("[data-toggle-sess]");
    var act = e.target.closest("[data-act]");
    if (t) { var b = byId("sb_" + t.dataset.toggleSess); if (b) b.classList.toggle("hidden"); }
    else if (act) {
      if (act.dataset.act === "hist-start") startSession(allEx(), "Allenamento completo");
      if (act.dataset.act === "clear-hist") {
        if (confirm("Cancellare tutto lo storico degli allenamenti?")) { clearHistory(); renderHistory(); renderHome(); }
      }
    }
  });

  window.AU = {
    byId: byId, esc: esc, fmt: fmt, PREF: PREF, IC: IC,
    addSession: addSession, renderHome: renderHome, renderHistory: renderHistory, show: show,
    unitFor: unitFor, defaultVal: defaultVal, EYE: EYE, exerciseLogs: exerciseLogs,
    loadHistory: loadHistory, saveHistory: saveHistory, savePref: savePref, applyTheme: applyTheme
  };

  applyTheme();
  renderHome();
  show("home");
  if (!PREF.onboarded) showOnboarding();
  setInterval(function () { var q = byId("gojoQuote"); if (!q) return; qi = (qi + 1) % GOJO_QUOTES.length; q.classList.add("fade"); setTimeout(function () { q.textContent = GOJO_QUOTES[qi]; q.classList.remove("fade"); }, 380); }, 7000);
})();
