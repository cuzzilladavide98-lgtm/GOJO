/* =====================================================================
   L'Allenamento Aureo - motore di allenamento guidato
   Timer, registrazione ripetizioni, salto esercizio, salvataggio storico.
   Usa window.AU (definito in app.js) e renderIllu (figures.js).
   ===================================================================== */
(function () {
  "use strict";
  var AU = window.AU;
  var byId = AU.byId, esc = AU.esc, fmt = AU.fmt, PREF = AU.PREF;
  var IC = AU.IC;

  var WO = { steps: [], idx: 0, remaining: 0, running: false, raf: null, last: 0, title: "", curWork: null, saved: false };
  var RING = 2 * Math.PI * 88;

  function domainIntro(cb) {
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!PREF.domainIntro || reduce) { cb(); return; }
    var ov = document.createElement("div");
    ov.className = "domain-intro";
    ov.innerHTML = '<div class="di-rings"><span></span><span></span><span></span></div>' +
      '<div class="di-eye">' + (AU.EYE || "") + '</div>' +
      '<div class="di-text">Espansione del Dominio</div>';
    document.body.appendChild(ov);
    domainSound();
    var done = false;
    function finish() { if (done) return; done = true; ov.classList.add("out"); setTimeout(function () { if (ov.parentNode) ov.parentNode.removeChild(ov); }, 280); cb(); }
    ov.addEventListener("click", finish);
    setTimeout(finish, 1350);
  }

  function buildSteps(list) {
    var steps = [{ mode: "prep", ex: list[0], sec: 8 }];
    list.forEach(function (e, i) {
      var ws = { mode: "work", ex: e, sec: e.work, rec: { unit: AU.unitFor(e), value: AU.defaultVal(e), reached: false, skipped: false } };
      steps.push(ws);
      if (i < list.length - 1) steps.push({ mode: "rest", ex: list[i + 1], sec: e.rest, from: ws });
    });
    return steps;
  }

  function startWorkout(list, title) {
    if (!list || !list.length) return;
    WO.steps = buildSteps(list);
    WO.idx = 0; WO.title = title; WO.running = true; WO.saved = false;
    initAudio();
    byId("view-workout").classList.remove("hidden");
    byId("appbar").classList.add("hidden");
    byId("tabbar").classList.add("hidden");
    domainIntro(function () { loadStep(true); });
  }
  window.startWorkout = startWorkout;

  function workSteps() { return WO.steps.filter(function (s) { return s.mode === "work"; }); }

  function collectSession(status) {
    var items = workSteps().filter(function (w) { return w.rec.reached; }).map(function (w) {
      return { id: w.ex.id, n: w.ex.n, nome: w.ex.nome, unit: w.rec.unit, value: w.rec.skipped ? null : w.rec.value, skipped: w.rec.skipped };
    });
    if (!items.length) return null;
    return { id: Date.now(), date: new Date().toISOString(), title: WO.title, status: status, items: items };
  }
  function persist(status) {
    if (WO.saved) return;
    var s = collectSession(status);
    if (s) { AU.addSession(s); WO.saved = true; AU.renderHome(); }
  }

  function endWorkout() {
    WO.running = false;
    if (WO.raf) cancelAnimationFrame(WO.raf);
    persist("interrotta");
    closeWorkout();
  }
  function closeWorkout() {
    byId("view-workout").classList.add("hidden");
    byId("appbar").classList.remove("hidden");
    byId("tabbar").classList.remove("hidden");
  }

  function renderWorkoutShell() {
    var ring = '<svg viewBox="0 0 200 200"><circle class="ring-bg" cx="100" cy="100" r="88"></circle>' +
      '<circle class="ring-fg" id="woRing" cx="100" cy="100" r="88" stroke-dasharray="' + RING + '"></circle></svg>';
    byId("view-workout").innerHTML =
      '<div class="wo-top">' +
        '<button class="close" id="woClose" aria-label="Termina allenamento">' + IC.close + '</button>' +
        '<div class="wo-progress" id="woProg"></div>' +
        '<a class="wo-music" href="https://music.youtube.com/" target="_blank" rel="noopener" aria-label="YouTube Music">' + IC.music + '</a></div>' +
      '<div class="wo-bar"><div id="woBarFill"></div></div>' +
      '<div class="wo-modewrap"><span class="wo-mode" id="woMode"></span></div>' +
      '<div class="wo-illu" id="woIllu"></div>' +
      '<div class="wo-name" id="woName"></div>' +
      '<div class="wo-cat" id="woCat"></div>' +
      '<div class="timer-wrap" id="woTimerWrap">' + ring +
        '<div class="timer-num"><div class="t" id="woTime">0</div><div class="lab" id="woLab"></div></div></div>' +
      '<div class="logger hidden" id="woLogger">' +
        '<div class="lg-label" id="woLgLabel">Registra</div>' +
        '<div class="lg-stepper"><button class="lg-btn" id="woMinus" aria-label="Diminuisci">&minus;</button>' +
        '<div class="lg-val"><span id="woVal">0</span> <small id="woUnit"></small></div>' +
        '<button class="lg-btn" id="woPlus" aria-label="Aumenta">+</button></div></div>' +
      '<div class="wo-cue" id="woCue"></div>' +
      '<div class="wo-hint" id="woHint"></div>' +
      '<button class="skip-link" id="woSkip">Salta esercizio</button>' +
      '<div class="wo-next" id="woNext"></div>' +
      '<div class="wo-controls">' +
        '<button class="ctrl" id="woPrev" aria-label="Esercizio precedente">' + IC.prev + '</button>' +
        '<button class="ctrl play" id="woPlay" aria-label="Avvia o metti in pausa">' + IC.pause + '</button>' +
        '<button class="ctrl" id="woNextBtn" aria-label="Avanti">' + IC.next + '</button></div>';

    byId("woClose").onclick = endWorkout;
    byId("woPlay").onclick = togglePlay;
    byId("woNextBtn").onclick = function () { gotoStep(WO.idx + 1); };
    byId("woPrev").onclick = function () { gotoStep(WO.idx <= 0 ? 0 : WO.idx - 1); };
    byId("woSkip").onclick = skipExercise;
    byId("woMinus").onclick = function () { stepVal(-1); };
    byId("woPlus").onclick = function () { stepVal(1); };
  }

  function stepVal(d) {
    if (!WO.curWork) return;
    WO.curWork.rec.value = Math.max(0, (WO.curWork.rec.value || 0) + d);
    WO.curWork.rec.skipped = false;
    byId("woVal").textContent = WO.curWork.rec.value;
  }

  function pop(el) { if (!el) return; el.classList.remove("anim"); void el.offsetWidth; el.classList.add("anim"); }

  function loadStep(rebuildShell) {
    if (rebuildShell) renderWorkoutShell();
    if (WO.idx >= WO.steps.length) { showFinish(); return; }
    var st = WO.steps[WO.idx];
    WO.remaining = st.sec; WO.last = performance.now();
    byId("view-workout").setAttribute("data-mode", st.mode);

    if (st.mode === "work") { WO.curWork = st; st.rec.reached = true; }
    else if (st.mode === "rest") { WO.curWork = st.from; }
    else WO.curWork = null;

    var wsteps = workSteps();
    var doneWork = WO.steps.slice(0, WO.idx).filter(function (s) { return s.mode === "work"; }).length;

    byId("woMode").className = "wo-mode " + st.mode;
    byId("woMode").textContent = st.mode === "work" ? "Esegui" : st.mode === "rest" ? "Recupero" : "Preparati";
    byId("woProg").textContent = WO.title + " - " + Math.min(doneWork + (st.mode === "work" ? 1 : 0), wsteps.length) + "/" + wsteps.length;
    byId("woTimerWrap").className = "timer-wrap" + (st.mode === "rest" ? " rest" : "");
    byId("woIllu").innerHTML = renderIllu(st.ex.illu);
    byId("woName").textContent = st.ex.nome;
    byId("woCat").textContent = st.ex.categoria;

    if (st.mode === "work") {
      byId("woCue").textContent = "";
      byId("woHint").innerHTML = '<span>Ritmo: <b>' + esc(short(st.ex.ritmo)) + '</b></span><span>Respiro: <b>' + esc(short(st.ex.respiro)) + '</b></span>';
      byId("woLab").textContent = st.ex.tipo === "hold" ? "tieni" : st.ex.tipo === "carry" ? "cammina" : "secondi";
    } else if (st.mode === "rest") {
      byId("woCue").textContent = "Prossimo: " + st.ex.nome;
      byId("woHint").innerHTML = '<span>Controlla le ripetizioni svolte, poi preparati</span>';
      byId("woLab").textContent = "recupero";
    } else {
      byId("woCue").textContent = "Mettiti in posizione";
      byId("woHint").innerHTML = "";
      byId("woLab").textContent = "secondi";
    }

    var lg = byId("woLogger");
    if (WO.curWork) {
      lg.classList.remove("hidden");
      byId("woLgLabel").textContent = st.mode === "rest" ? ("Quante ne hai fatte? (" + WO.curWork.ex.nome + ")") : "Registra le tue ripetizioni";
      byId("woVal").textContent = WO.curWork.rec.value;
      byId("woUnit").textContent = WO.curWork.rec.unit;
    } else lg.classList.add("hidden");

    byId("woSkip").style.display = (st.mode === "prep") ? "none" : "block";

    var nx = WO.steps[WO.idx + 1];
    byId("woNext").innerHTML = (st.mode === "prep") ? "" : (nx ? ("Poi: <b>" + esc(nx.mode === "rest" ? "recupero" : nx.ex.nome) + "</b>") : "Ultimo esercizio");

    pop(byId("woTimerWrap")); pop(byId("woName")); pop(byId("woIllu"));
    updateTimerUI(st);
    if (WO.running) { byId("woPlay").innerHTML = IC.pause; loop(); } else byId("woPlay").innerHTML = IC.play;
  }

  function short(t) { return t.length > 30 ? t.slice(0, 29) + "…" : t; }

  function updateTimerUI(st) {
    byId("woTime").textContent = WO.remaining <= 0 ? "0" : fmt(Math.ceil(WO.remaining));
    var frac = st.sec > 0 ? Math.max(0, Math.min(1, WO.remaining / st.sec)) : 0;
    byId("woRing").style.strokeDashoffset = (RING * (1 - frac)).toFixed(1);
    var tot = workSteps().length;
    var df = tot ? (WO.steps.slice(0, WO.idx + 1).filter(function (s) { return s.mode === "work"; }).length / tot) : 0;
    byId("woBarFill").style.width = (df * 100) + "%";
  }

  function loop() {
    if (WO.raf) cancelAnimationFrame(WO.raf);
    var step = function (now) {
      if (!WO.running) return;
      var dt = (now - WO.last) / 1000; WO.last = now;
      var st = WO.steps[WO.idx]; var prev = WO.remaining;
      WO.remaining -= dt;
      var cs = Math.ceil(WO.remaining);
      if (cs !== Math.ceil(prev) && WO.remaining > 0 && cs <= 3) {
        beep(660, 0.08); vibrate([25]);
        var tw = byId("woTimerWrap"); if (tw) tw.classList.add("countdown");
        var tn = byId("woTime"); if (tn) { tn.classList.remove("tick"); void tn.offsetWidth; tn.classList.add("tick"); }
      }
      if (WO.remaining <= 0) {
        beep(st.mode === "work" ? 880 : 520, 0.18);
        vibrate(st.mode === "work" ? [120, 60, 120] : [80]);
        gotoStep(WO.idx + 1); return;
      }
      updateTimerUI(st);
      WO.raf = requestAnimationFrame(step);
    };
    WO.last = performance.now(); WO.raf = requestAnimationFrame(step);
  }

  function gotoStep(i) {
    if (WO.raf) cancelAnimationFrame(WO.raf);
    WO.idx = i;
    if (WO.idx >= WO.steps.length) { showFinish(); return; }
    loadStep(false);
  }

  function skipExercise() {
    if (WO.raf) cancelAnimationFrame(WO.raf);
    var i = WO.idx;
    while (i < WO.steps.length && WO.steps[i].mode !== "work") i++;
    if (i >= WO.steps.length) { showFinish(); return; }
    WO.steps[i].rec.skipped = true; WO.steps[i].rec.reached = true;
    vibrate([40]);
    var j = i + 1;
    while (j < WO.steps.length && WO.steps[j].mode !== "work") j++;
    if (j >= WO.steps.length) showFinish(); else gotoStep(j);
  }

  function togglePlay() {
    WO.running = !WO.running;
    byId("woPlay").innerHTML = WO.running ? IC.pause : IC.play;
    if (WO.running) { WO.last = performance.now(); loop(); } else if (WO.raf) cancelAnimationFrame(WO.raf);
  }

  function showFinish() {
    WO.running = false;
    if (WO.raf) cancelAnimationFrame(WO.raf);
    persist("completata");
    beep(880, 0.25); vibrate([100, 50, 100, 50, 200]);
    var works = workSteps();
    var done = works.filter(function (w) { return w.rec.reached && !w.rec.skipped; });
    var sk = works.filter(function (w) { return w.rec.skipped; });
    var h = '<div class="wo-top"><button class="close" id="woClose2" aria-label="Chiudi">' + IC.close + '</button><div></div><div style="width:40px"></div></div>';
    h += '<div class="wo-finish"><div class="domain-burst"></div><div class="big">' + IC.trophy + '</div><div class="dx-over">Espansione del Dominio</div><h2>Sessione completata!</h2>' +
      '<p>' + esc(WO.title) + ' - ' + done.length + ' svolti' + (sk.length ? ' - ' + sk.length + ' saltati' : '') + '</p></div>';
    h += '<div class="finish-list">';
    works.filter(function (w) { return w.rec.reached; }).forEach(function (w) {
      h += '<div class="log-row"><span>' + w.ex.n + '. ' + esc(w.ex.nome) + '</span>' +
        '<b>' + (w.rec.skipped ? '<span style="color:var(--muted)">saltato</span>' : (w.rec.value + ' ' + w.rec.unit)) + '</b></div>';
    });
    h += '</div>';
    h += '<div style="padding:0 4px"><button class="btn" id="woAgain">Ripeti la sessione</button>' +
      '<button class="btn secondary" id="woHist">Vedi lo storico</button>' +
      '<button class="btn secondary" id="woHome">Torna alla home</button></div>';
    byId("view-workout").innerHTML = h;
    byId("woClose2").onclick = closeWorkout;
    byId("woHome").onclick = closeWorkout;
    byId("woHist").onclick = function () { closeWorkout(); AU.renderHistory(); AU.show("history"); };
    byId("woAgain").onclick = function () {
      WO.steps = buildSteps(works.map(function (w) { return w.ex; }));
      WO.idx = 0; WO.running = true; WO.saved = false; loadStep(true);
    };
  }

  // ---- audio / haptics ----
  var actx = null;
  function initAudio() { if (!PREF.sound) return; try { if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)(); if (actx.state === "suspended") actx.resume(); } catch (e) {} }
  function beep(freq, dur) {
    if (!PREF.sound || !actx) return;
    try {
      var o = actx.createOscillator(), g = actx.createGain();
      o.frequency.value = freq; o.type = "sine"; o.connect(g); g.connect(actx.destination);
      g.gain.setValueAtTime(0.001, actx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.25, actx.currentTime + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + dur);
      o.start(); o.stop(actx.currentTime + dur + 0.02);
    } catch (e) {}
  }
  function vibrate(p) { if (PREF.vibrate && navigator.vibrate) try { navigator.vibrate(p); } catch (e) {} }
  function domainSound() {
    if (!PREF.sound || !actx) return;
    try {
      var t = actx.currentTime;
      var o = actx.createOscillator(), g = actx.createGain(), f = actx.createBiquadFilter();
      o.type = "sawtooth"; o.frequency.setValueAtTime(70, t); o.frequency.exponentialRampToValueAtTime(300, t + 0.7);
      f.type = "lowpass"; f.frequency.setValueAtTime(400, t); f.frequency.exponentialRampToValueAtTime(1800, t + 0.7);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.15, t + 0.1); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.95);
      o.connect(f); f.connect(g); g.connect(actx.destination); o.start(t); o.stop(t + 1.0);
      [521, 523.5, 784].forEach(function (fr) {
        var oo = actx.createOscillator(), gg = actx.createGain();
        oo.type = "sine"; oo.frequency.value = fr;
        gg.gain.setValueAtTime(0.0001, t + 0.25); gg.gain.exponentialRampToValueAtTime(0.045, t + 0.5); gg.gain.exponentialRampToValueAtTime(0.0001, t + 1.3);
        oo.connect(gg); gg.connect(actx.destination); oo.start(t + 0.25); oo.stop(t + 1.35);
      });
      var io = actx.createOscillator(), ig = actx.createGain();
      io.type = "sine"; io.frequency.setValueAtTime(170, t + 0.62); io.frequency.exponentialRampToValueAtTime(54, t + 0.95);
      ig.gain.setValueAtTime(0.0001, t + 0.6); ig.gain.exponentialRampToValueAtTime(0.22, t + 0.66); ig.gain.exponentialRampToValueAtTime(0.0001, t + 1.1);
      io.connect(ig); ig.connect(actx.destination); io.start(t + 0.6); io.stop(t + 1.15);
    } catch (e) {}
  }

  document.addEventListener("visibilitychange", function () {
    if (document.hidden && WO.running) { WO.running = false; var p = byId("woPlay"); if (p) p.innerHTML = IC.play; if (WO.raf) cancelAnimationFrame(WO.raf); }
  });
})();
