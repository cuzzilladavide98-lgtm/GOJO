/* =====================================================================
   L'Allenamento Aureo - core UI (navigazione, home, libreria, scheda, storico)
   Il motore di allenamento e in workout.js (usa window.AU + window.startWorkout)
   ===================================================================== */
(function () {
  "use strict";

  var byId = function (id) { return document.getElementById(id); };

  var PREF = { sound: true, vibrate: true };
  try {
    var saved = localStorage.getItem("aureo_pref");
    if (saved) PREF = Object.assign(PREF, JSON.parse(saved));
  } catch (e) {}
  function savePref() { try { localStorage.setItem("aureo_pref", JSON.stringify(PREF)); } catch (e) {} }

  function loadHistory() {
    try { return JSON.parse(localStorage.getItem("aureo_history") || "[]"); } catch (e) { return []; }
  }
  function saveHistory(arr) { try { localStorage.setItem("aureo_history", JSON.stringify(arr.slice(0, 200))); } catch (e) {} }
  function addSession(sess) { var h = loadHistory(); h.unshift(sess); saveHistory(h); }
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
    ["home", "library", "detail", "history"].forEach(function (v) {
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
      history: ["Storico", "I tuoi allenamenti"]
    };
    if (titles[view]) { byId("barTitle").textContent = titles[view][0]; byId("barSub").textContent = titles[view][1]; }
    window.scrollTo(0, 0);
  }

  byId("tabbar").addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    if (b.dataset.tab === "library") renderLibrary();
    if (b.dataset.tab === "history") renderHistory();
    show(b.dataset.tab);
  });
  byId("backBtn").addEventListener("click", function () { show(lastListView); });

  function renderHome() {
    var hist = loadHistory();
    var h = "";
    h += '<div class="hero"><div class="glow"></div>' +
      '<h2>Pronto ad allenarti?</h2>' +
      '<p>17 esercizi, 4 blocchi, tecnica illustrata. Avvia una sessione guidata con timer, registra le ripetizioni e tieni lo storico.</p>' +
      '<button class="btn" data-act="start-all">&#9654; Allenamento completo</button>' +
      '<button class="btn secondary" data-act="go-library">Sfoglia la libreria</button>' +
      '</div>';

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

    h += '<div class="section-title">Sessioni per blocco</div>';
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
      '</div>';
    h += '<div class="footer-note">Tratto dal "Manuale Tecnico degli Esercizi - L\'Allenamento Aureo".<br>Scala il range alle tue capacita, priorita alla tecnica, fermati in caso di dolore.</div>';

    byId("view-home").innerHTML = h;
  }

  byId("view-home").addEventListener("click", function (e) {
    var act = e.target.closest("[data-act]");
    var blk = e.target.closest("[data-block]");
    var tg = e.target.closest("[data-toggle]");
    if (act) {
      if (act.dataset.act === "start-all") window.startWorkout(allEx(), "Allenamento completo");
      if (act.dataset.act === "go-library") { renderLibrary(); show("library"); }
      if (act.dataset.act === "go-history") { renderHistory(); show("history"); }
    } else if (blk) {
      window.startWorkout(exByN(+blk.dataset.block), BLOCCHI[+blk.dataset.block - 1].nome);
    } else if (tg) {
      var k = tg.dataset.toggle; PREF[k] = !PREF[k]; savePref(); tg.classList.toggle("on", PREF[k]);
    }
  });

  function renderLibrary() {
    var h = "";
    BLOCCHI.forEach(function (b) {
      var list = exByN(b.n); if (!list.length) return;
      h += '<div class="section-title">' + esc(b.nome) + '</div>';
      list.forEach(function (e) {
        h += '<button class="ex-row" data-ex="' + e.id + '">' +
          '<div class="ex-thumb">' + renderIllu(e.illu) + '</div>' +
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
    h += '<button class="btn" data-start-one="' + e.id + '">&#9654; Avvia questo esercizio</button></div>';
    byId("view-detail").innerHTML = h;
    show("detail");
  }
  byId("view-detail").addEventListener("click", function (e) {
    var s = e.target.closest("[data-start-one]");
    if (s) { var ex = EXERCISES.filter(function (x) { return x.id === s.dataset.startOne; })[0]; window.startWorkout([ex], ex.nome); }
  });

  function renderHistory() {
    var hist = loadHistory();
    var h = "";
    if (!hist.length) {
      h += '<div class="empty"><div class="big">&#128197;</div><h3>Ancora nessun allenamento</h3>' +
        '<p>Avvia una sessione: al termine la troverai qui, giorno per giorno, con le ripetizioni registrate.</p>' +
        '<button class="btn" data-act="hist-start">&#9654; Inizia ora</button></div>';
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
          '<div class="b-desc">' + timeLabel(s.date) + ' - ' + done + ' svolti' + (sk ? ' - ' + sk + ' saltati' : '') + '</div></div>' +
          '<span class="badge ' + (s.status === "interrotta" ? "media" : "bassa") + '">' + esc(s.status) + '</span>' +
          '<div class="chev">&rsaquo;</div></button>';
        h += '<div class="hist-body hidden" id="sb_' + s.id + '">';
        s.items.forEach(function (it) {
          h += '<div class="log-row"><span>' + it.n + '. ' + esc(it.nome) + '</span>' +
            '<b>' + (it.skipped ? '<span style="color:var(--muted)">saltato</span>' : (it.value + ' ' + it.unit)) + '</b></div>';
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
      if (act.dataset.act === "hist-start") window.startWorkout(allEx(), "Allenamento completo");
      if (act.dataset.act === "clear-hist") {
        if (confirm("Cancellare tutto lo storico degli allenamenti?")) { clearHistory(); renderHistory(); renderHome(); }
      }
    }
  });

  window.AU = {
    byId: byId, esc: esc, fmt: fmt, PREF: PREF,
    addSession: addSession, renderHome: renderHome, renderHistory: renderHistory, show: show,
    unitFor: unitFor, defaultVal: defaultVal
  };

  renderHome();
  show("home");
})();
