/* =====================================================================
   L'Allenamento Aureo — logica dell'app (PWA)
   ===================================================================== */
(function () {
  "use strict";

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var byId = function (id) { return document.getElementById(id); };

  // ---- preferenze persistenti ----
  var PREF = { sound: true, vibrate: true };
  try {
    var saved = localStorage.getItem("aureo_pref");
    if (saved) PREF = Object.assign(PREF, JSON.parse(saved));
  } catch (e) {}
  function savePref() { try { localStorage.setItem("aureo_pref", JSON.stringify(PREF)); } catch (e) {} }

  function exByN(n) { return EXERCISES.filter(function (e) { return e.blocco === n; }).sort(function (a, b) { return a.n - b.n; }); }
  function allEx() { return EXERCISES.slice().sort(function (a, b) { return a.n - b.n; }); }
  function fmt(s) { var m = Math.floor(s / 60), r = s % 60; return (m > 0 ? m + ":" + (r < 10 ? "0" : "") + r : String(r)); }
  function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  // =====================================================================
  // NAVIGAZIONE
  // =====================================================================
  var current = "home";
  function show(view, opts) {
    ["home", "library", "detail"].forEach(function (v) {
      byId("view-" + v).classList.toggle("hidden", v !== view);
    });
    current = view;
    var back = byId("backBtn");
    if (view === "detail") {
      back.classList.remove("hidden");
      byId("logo").classList.add("hidden");
    } else {
      back.classList.add("hidden");
      byId("logo").classList.remove("hidden");
    }
    byId("tabbar").querySelectorAll("button").forEach(function (b) {
      b.classList.toggle("active", b.dataset.tab === view);
    });
    if (view === "home") { byId("barTitle").textContent = "L'Allenamento Aureo"; byId("barSub").textContent = "Manuale Tecnico"; }
    if (view === "library") { byId("barTitle").textContent = "Libreria esercizi"; byId("barSub").textContent = "17 schede tecniche"; }
    window.scrollTo(0, 0);
  }

  byId("tabbar").addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    if (b.dataset.tab === "library") renderLibrary();
    show(b.dataset.tab);
  });
  byId("backBtn").addEventListener("click", function () {
    show(lastListView === "library" ? "library" : "home");
  });
  var lastListView = "home";

  // =====================================================================
  // HOME
  // =====================================================================
  function renderHome() {
    var h = "";
    h += '<div class="hero"><div class="glow"></div>' +
      '<h2>Pronto ad allenarti?</h2>' +
      '<p>17 esercizi · 4 blocchi · tecnica illustrata passo-passo. Avvia una sessione guidata con timer o esplora la libreria.</p>' +
      '<button class="btn" data-act="start-all">▶︎ Allenamento completo</button>' +
      '<button class="btn secondary" data-act="go-library">📖 Sfoglia la libreria</button>' +
      '</div>';

    h += '<div class="section-title">Sessioni per blocco</div>';
    BLOCCHI.forEach(function (b) {
      var list = exByN(b.n);
      var mins = Math.round(list.reduce(function (s, e) { return s + e.work + e.rest; }, 0) / 60);
      h += '<button class="block-card" data-block="' + b.n + '">' +
        '<div class="block-num">' + b.n + '</div>' +
        '<div><div class="b-name">' + esc(b.nome.replace(/^Blocco \d+ · /, "")) + '</div>' +
        '<div class="b-desc">' + esc(b.desc) + '</div>' +
        '<div class="b-meta">' + list.length + ' esercizi · ~' + mins + ' min</div></div>' +
        '<div class="chev">›</div></button>';
    });

    h += '<div class="section-title">Impostazioni</div>';
    h += '<div class="card-box">' +
      '<div class="toggle-row"><div>🔔 Suono ai cambi</div><div class="sw ' + (PREF.sound ? "on" : "") + '" data-toggle="sound"></div></div>' +
      '<div class="toggle-row"><div>📳 Vibrazione</div><div class="sw ' + (PREF.vibrate ? "on" : "") + '" data-toggle="vibrate"></div></div>' +
      '</div>';
    h += '<div class="footer-note">Tratto dal "Manuale Tecnico degli Esercizi — L\'Allenamento Aureo".<br>Scala il range alle tue capacità, priorità alla tecnica, fermati in caso di dolore.</div>';

    byId("view-home").innerHTML = h;
  }

  byId("view-home").addEventListener("click", function (e) {
    var act = e.target.closest("[data-act]");
    var blk = e.target.closest("[data-block]");
    var tg = e.target.closest("[data-toggle]");
    if (act) {
      if (act.dataset.act === "start-all") startWorkout(allEx(), "Allenamento completo");
      if (act.dataset.act === "go-library") { renderLibrary(); show("library"); }
    } else if (blk) {
      var n = +blk.dataset.block;
      startWorkout(exByN(n), BLOCCHI[n - 1].nome);
    } else if (tg) {
      var k = tg.dataset.toggle;
      PREF[k] = !PREF[k]; savePref();
      tg.classList.toggle("on", PREF[k]);
    }
  });

  // =====================================================================
  // LIBRARY
  // =====================================================================
  function renderLibrary() {
    var h = "";
    BLOCCHI.forEach(function (b) {
      var list = exByN(b.n);
      if (!list.length) return;
      h += '<div class="section-title">' + esc(b.nome) + '</div>';
      list.forEach(function (e) {
        h += '<button class="ex-row" data-ex="' + e.id + '">' +
          '<div class="ex-thumb">' + renderIllu(e.illu) + '</div>' +
          '<div style="flex:1;min-width:0">' +
          '<div class="e-num">Esercizio ' + e.n + '</div>' +
          '<div class="e-name">' + esc(e.nome) + '</div>' +
          '<div class="e-cat">' + esc(e.categoria) + '</div>' +
          '<span class="badge ' + e.priorita + '">' + e.priorita + '</span>' +
          '</div><div class="chev">›</div></button>';
      });
    });
    byId("view-library").innerHTML = h;
  }

  byId("view-library").addEventListener("click", function (e) {
    var row = e.target.closest("[data-ex]");
    if (row) { lastListView = "library"; openDetail(row.dataset.ex); }
  });

  // =====================================================================
  // DETAIL
  // =====================================================================
  function openDetail(id) {
    var e = EXERCISES.filter(function (x) { return x.id === id; })[0];
    if (!e) return;
    var h = '<div class="detail">';
    h += '<div class="detail-illu">' + renderIllu(e.illu) +
      '<div class="cap">' + esc(e.illu.note || "") + '</div></div>';
    h += '<h2>' + esc(e.nome) + '</h2>';
    h += '<div class="meta-row">' +
      '<span class="badge ' + e.priorita + '">' + e.priorita + '</span>' +
      '<span class="chip"><b>Blocco ' + e.blocco + '</b></span>' +
      '<span class="chip">' + esc(e.categoria) + '</span></div>';
    h += '<div class="muscoli"><b style="color:var(--gold)">Muscoli:</b> ' + esc(e.muscoli) + '</div>';

    h += '<div class="section-title">Analisi del movimento</div>';
    e.fasi.forEach(function (f) {
      h += '<div class="phase"><div class="ph-dot"></div><div>' +
        '<div class="ph-label">' + esc(f[0]) + '</div>' +
        '<div class="ph-text">' + esc(f[1]) + '</div></div></div>';
    });

    h += '<div class="rrt">' +
      '<div class="item"><div class="k">Ritmo</div><div class="v">' + esc(e.ritmo) + '</div></div>' +
      '<div class="item"><div class="k">Respiro</div><div class="v">' + esc(e.respiro) + '</div></div>' +
      '<div class="item"><div class="k">Tensione</div><div class="v">' + esc(e.tensione) + '</div></div>' +
      '</div>';

    h += '<div class="section-title">Errori da evitare → correzione</div>';
    e.errori.forEach(function (er) {
      h += '<div class="err"><div class="bad">' + esc(er[0]) + '</div><div class="fix">' + esc(er[1]) + '</div></div>';
    });

    h += '<button class="btn" data-start-one="' + e.id + '">▶︎ Avvia questo esercizio</button>';
    h += '</div>';
    byId("view-detail").innerHTML = h;
    show("detail");
  }

  byId("view-detail").addEventListener("click", function (e) {
    var s = e.target.closest("[data-start-one]");
    if (s) {
      var ex = EXERCISES.filter(function (x) { return x.id === s.dataset.startOne; })[0];
      startWorkout([ex], ex.nome);
    }
  });

  // =====================================================================
  // WORKOUT ENGINE
  // =====================================================================
  var WO = { steps: [], idx: 0, remaining: 0, running: false, raf: null, last: 0, title: "" };
  var RING = 2 * Math.PI * 88; // r=88

  function buildSteps(list) {
    var steps = [{ mode: "prep", ex: list[0], sec: 8 }];
    list.forEach(function (e, i) {
      steps.push({ mode: "work", ex: e, sec: e.work });
      if (i < list.length - 1) steps.push({ mode: "rest", ex: list[i + 1], sec: e.rest, from: e });
    });
    return steps;
  }

  function startWorkout(list, title) {
    if (!list || !list.length) return;
    WO.steps = buildSteps(list);
    WO.idx = 0; WO.title = title; WO.running = true;
    initAudio();
    byId("view-workout").classList.remove("hidden");
    byId("appbar").classList.add("hidden");
    byId("tabbar").classList.add("hidden");
    loadStep(true);
  }

  function endWorkout() {
    WO.running = false;
    if (WO.raf) cancelAnimationFrame(WO.raf);
    byId("view-workout").classList.add("hidden");
    byId("appbar").classList.remove("hidden");
    byId("tabbar").classList.remove("hidden");
  }

  function workSteps() { return WO.steps.filter(function (s) { return s.mode === "work"; }); }

  function renderWorkoutShell() {
    byId("view-workout").innerHTML =
      '<div class="wo-top">' +
        '<button class="close" id="woClose">✕</button>' +
        '<div class="wo-progress" id="woProg"></div>' +
        '<div style="width:40px"></div>' +
      '</div>' +
      '<div class="wo-bar"><div id="woBarFill"></div></div>' +
      '<div class="wo-mode" id="woMode"></div>' +
      '<div class="wo-illu" id="woIllu"></div>' +
      '<div class="wo-name" id="woName"></div>' +
      '<div class="wo-cat" id="woCat"></div>' +
      '<div class="timer-wrap" id="woTimerWrap">' +
        '<svg viewBox="0 0 200 200"><circle class="ring-bg" cx="100" cy="100" r="88"/>' +
        '<circle class="ring-fg" id="woRing" cx="100" cy="100" r="88" stroke-dasharray="' + RING + '" stroke-dashoffset="0"/></svg>' +
        '<div class="timer-num"><div class="t" id="woTime">0</div><div class="lab" id="woLab"></div></div>' +
      '</div>' +
      '<div class="wo-cue" id="woCue"></div>' +
      '<div class="wo-hint" id="woHint"></div>' +
      '<div class="wo-next" id="woNext"></div>' +
      '<div class="wo-controls">' +
        '<button class="ctrl" id="woPrev">⏮</button>' +
        '<button class="ctrl play" id="woPlay">⏸</button>' +
        '<button class="ctrl" id="woNextBtn">⏭</button>' +
      '</div>';

    byId("woClose").onclick = endWorkout;
    byId("woPlay").onclick = togglePlay;
    byId("woNextBtn").onclick = function () { gotoStep(WO.idx + 1); };
    byId("woPrev").onclick = function () { gotoStep(WO.idx <= 0 ? 0 : WO.idx - 1); };
  }

  function loadStep(rebuildShell) {
    if (rebuildShell) renderWorkoutShell();
    if (WO.idx >= WO.steps.length) { showFinish(); return; }
    var st = WO.steps[WO.idx];
    WO.remaining = st.sec;
    WO.last = performance.now();

    var wsteps = workSteps();
    var wIndex = wsteps.indexOf(st);
    var doneWork = WO.steps.slice(0, WO.idx).filter(function (s) { return s.mode === "work"; }).length;

    byId("woMode").className = "wo-mode " + st.mode;
    byId("woMode").textContent = st.mode === "work" ? "Esegui" : st.mode === "rest" ? "Recupero" : "Preparati";
    byId("woProg").textContent = WO.title + " · " + Math.min(doneWork + (st.mode === "work" ? 1 : 0), wsteps.length) + "/" + wsteps.length;
    byId("woTimerWrap").className = "timer-wrap" + (st.mode === "rest" ? " rest" : "");

    byId("woIllu").innerHTML = renderIllu(st.ex.illu);
    byId("woName").textContent = st.ex.nome;
    byId("woCat").textContent = st.ex.categoria;

    if (st.mode === "work") {
      byId("woCue").textContent = st.ex.illu.note || "";
      byId("woHint").innerHTML =
        '<span>Ritmo: <b>' + esc(shortRitmo(st.ex.ritmo)) + '</b></span>' +
        '<span>Respiro: <b>' + esc(shortRitmo(st.ex.respiro)) + '</b></span>';
      byId("woLab").textContent = st.ex.tipo === "hold" ? "tieni" : st.ex.tipo === "carry" ? "cammina" : "secondi";
    } else if (st.mode === "rest") {
      byId("woCue").textContent = "Prossimo: " + st.ex.nome;
      byId("woHint").innerHTML = '<span>Prepara la posizione iniziale</span>';
      byId("woLab").textContent = "recupero";
    } else {
      byId("woCue").textContent = "Si parte con: " + st.ex.nome;
      byId("woHint").innerHTML = '<span>Mettiti in posizione</span>';
      byId("woLab").textContent = "via tra";
    }

    var nx = WO.steps[WO.idx + 1];
    byId("woNext").innerHTML = nx ?
      ("Poi: <b>" + esc(nx.mode === "work" ? nx.ex.nome : nx.mode === "rest" ? "recupero" : nx.ex.nome) + "</b>") :
      "Ultimo esercizio 💪";

    updateTimerUI(st);
    if (WO.running) { byId("woPlay").textContent = "⏸"; loop(); }
    else byId("woPlay").textContent = "▶︎";
  }

  function shortRitmo(t) { return t.length > 34 ? t.slice(0, 33) + "…" : t; }

  function updateTimerUI(st) {
    byId("woTime").textContent = WO.remaining <= 0 ? "0" : fmt(Math.ceil(WO.remaining));
    var frac = st.sec > 0 ? (WO.remaining / st.sec) : 0;
    frac = Math.max(0, Math.min(1, frac));
    byId("woRing").style.strokeDashoffset = (RING * (1 - frac)).toFixed(1);
    var totalWork = workSteps().length;
    var doneFrac = totalWork ? (WO.steps.slice(0, WO.idx + 1).filter(function (s) { return s.mode === "work"; }).length / totalWork) : 0;
    byId("woBarFill").style.width = (doneFrac * 100) + "%";
  }

  function loop() {
    if (WO.raf) cancelAnimationFrame(WO.raf);
    var step = function (now) {
      if (!WO.running) return;
      var dt = (now - WO.last) / 1000;
      WO.last = now;
      var st = WO.steps[WO.idx];
      var prev = WO.remaining;
      WO.remaining -= dt;
      // countdown beeps
      if (Math.ceil(prev) !== Math.ceil(WO.remaining) && WO.remaining > 0 && WO.remaining <= 3) beep(660, 0.07);
      if (WO.remaining <= 0) {
        beep(st.mode === "work" ? 880 : 520, 0.18);
        vibrate(st.mode === "work" ? [120, 60, 120] : [80]);
        gotoStep(WO.idx + 1);
        return;
      }
      updateTimerUI(st);
      WO.raf = requestAnimationFrame(step);
    };
    WO.last = performance.now();
    WO.raf = requestAnimationFrame(step);
  }

  function gotoStep(i) {
    if (WO.raf) cancelAnimationFrame(WO.raf);
    WO.idx = i;
    if (WO.idx >= WO.steps.length) { showFinish(); return; }
    loadStep(false);
  }

  function togglePlay() {
    WO.running = !WO.running;
    byId("woPlay").textContent = WO.running ? "⏸" : "▶︎";
    if (WO.running) { WO.last = performance.now(); loop(); }
    else if (WO.raf) cancelAnimationFrame(WO.raf);
  }

  function showFinish() {
    WO.running = false;
    if (WO.raf) cancelAnimationFrame(WO.raf);
    beep(880, 0.25); vibrate([100, 50, 100, 50, 200]);
    var n = workSteps().length;
    byId("view-workout").innerHTML =
      '<div class="wo-top"><button class="close" id="woClose2">✕</button><div></div><div style="width:40px"></div></div>' +
      '<div class="wo-finish"><div class="big">🏆</div>' +
      '<h2>Sessione completata!</h2>' +
      '<p>' + esc(WO.title) + '</p>' +
      '<p>' + n + ' eserciz' + (n === 1 ? "io" : "i") + ' portati a termine. Ottimo lavoro.</p>' +
      '<button class="btn" id="woAgain">↻ Ripeti la sessione</button>' +
      '<button class="btn secondary" id="woHome">Torna alla home</button></div>';
    byId("woClose2").onclick = endWorkout;
    byId("woHome").onclick = endWorkout;
    byId("woAgain").onclick = function () { WO.idx = 0; WO.running = true; loadStep(true); };
  }

  // ---- audio / haptics ----
  var actx = null;
  function initAudio() {
    if (!PREF.sound) return;
    try {
      if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)();
      if (actx.state === "suspended") actx.resume();
    } catch (e) {}
  }
  function beep(freq, dur) {
    if (!PREF.sound || !actx) return;
    try {
      var o = actx.createOscillator(), g = actx.createGain();
      o.frequency.value = freq; o.type = "sine";
      o.connect(g); g.connect(actx.destination);
      g.gain.setValueAtTime(0.001, actx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.25, actx.currentTime + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + dur);
      o.start(); o.stop(actx.currentTime + dur + 0.02);
    } catch (e) {}
  }
  function vibrate(p) { if (PREF.vibrate && navigator.vibrate) try { navigator.vibrate(p); } catch (e) {} }

  // =====================================================================
  document.addEventListener("visibilitychange", function () {
    if (document.hidden && WO.running) { WO.running = false; byId("woPlay") && (byId("woPlay").textContent = "▶︎"); if (WO.raf) cancelAnimationFrame(WO.raf); }
  });

  renderHome();
  show("home");
})();
