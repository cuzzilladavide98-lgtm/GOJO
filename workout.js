/* =====================================================================
   L'Allenamento Aureo - MOTORE UNICO DI SESSIONE (guidata, in tempo reale)
   Dopo i target: parte l'allenamento vero. Forza = serie per serie con
   Kg/reps + conferma + TIMER di recupero automatico; Cardio/tenute =
   countdown. Orologio sessione live. Fine -> riepilogo + salvataggio.
   ===================================================================== */
(function () {
  "use strict";
  var AU = window.AU;
  var byId = AU.byId, esc = AU.esc, fmt = AU.fmt, PREF = AU.PREF, IC = AU.IC;
  var WO = { steps: [], idx: 0, remaining: 0, running: false, raf: null, last: 0, title: "", saved: false, savedId: 0, startedAt: 0, logs: {}, order: [], clock: null };
  var RING = 2 * Math.PI * 88;
  var cur = { w: 0, r: 0 };

  function domainIntro(cb) {
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!PREF.domainIntro || reduce) { cb(); return; }
    var ov = document.createElement("div");
    ov.className = "domain-intro";
    ov.innerHTML = '<div class="di-rings"><span></span><span></span><span></span></div>' +
      '<div class="di-eye">' + (AU.EYE || "") + '</div><div class="di-text">Espansione del Dominio</div>';
    document.body.appendChild(ov); domainSound();
    var done = false;
    function finish() { if (done) return; done = true; ov.classList.add("out"); setTimeout(function () { if (ov.parentNode) ov.parentNode.removeChild(ov); }, 280); cb(); }
    ov.addEventListener("click", finish); setTimeout(finish, 1300);
  }

  function lastSet(id) { var h = AU.loadHistory ? AU.loadHistory() : []; for (var i = 0; i < h.length; i++) { var it = (h[i].items || []).filter(function (x) { return x.id === id && x.sets && x.sets.length; })[0]; if (it) return it.sets[it.sets.length - 1]; } return null; }
  function elog(e) {
    if (!WO.logs[e.id]) { WO.logs[e.id] = { id: e.id, n: e.n, nome: e.nome, categoria: e.categoria, tipo: e.tipo, unit: (e.tipo === "hold" ? "sec" : e.tipo === "carry" ? "passi" : "rip."), sets: [], value: 0, reached: false, skipped: false, strength: e.tipo === "dynamic" }; WO.order.push(e.id); }
    return WO.logs[e.id];
  }

  function buildSteps(list) {
    var steps = [{ mode: "prep", ex: list[0], sec: 6, exIdx: 0, exTotal: list.length }];
    list.forEach(function (e, i) {
      var lg = elog(e);
      if (e.tipo === "dynamic") {
        var nSets = (e.target && e.target.sets) ? Math.max(1, +e.target.sets) : 3;
        lg.plan = nSets;
        for (var sset = 1; sset <= nSets; sset++) {
          steps.push({ mode: "set", ex: e, log: lg, setN: sset, exIdx: i, exTotal: list.length });
          if (sset < nSets) steps.push({ mode: "rest", ex: e, sec: (e.rest || 90), label: "Serie " + (sset + 1) + " di " + nSets, exIdx: i, exTotal: list.length });
        }
      } else {
        var dur = (e.tipo === "hold" && e.target && e.target.reps) ? +e.target.reps : (e.work || 40);
        lg.plan = 1;
        steps.push({ mode: "work", ex: e, log: lg, sec: dur, exIdx: i, exTotal: list.length });
      }
      if (i < list.length - 1) steps.push({ mode: "rest", ex: list[i + 1], sec: (e.rest || 60), label: "Prossimo esercizio", next: true, exIdx: i + 1, exTotal: list.length });
    });
    return steps;
  }

  function startWorkout(list, title) {
    if (!list || !list.length) return;
    WO.logs = {}; WO.order = []; WO.steps = buildSteps(list); WO.idx = 0; WO.title = title; WO.running = true; WO.saved = false; WO.startedAt = Date.now();
    initAudio();
    byId("view-workout").classList.remove("hidden");
    byId("appbar").classList.add("hidden");
    byId("tabbar").classList.add("hidden");
    startClock();
    domainIntro(function () { loadStep(true); });
  }
  window.startWorkout = startWorkout;
  window.startTracker = startWorkout;

  function startClock() { stopClock(); WO.clock = setInterval(function () { var el = byId("woClock"); if (el) el.textContent = fmt(Math.round((Date.now() - WO.startedAt) / 1000)); }, 1000); }
  function stopClock() { if (WO.clock) clearInterval(WO.clock); WO.clock = null; }
  function stopLoop() { if (WO.raf) { cancelAnimationFrame(WO.raf); WO.raf = null; } }

  function persist(status) {
    if (WO.saved) return;
    var s = collect(status);
    if (s) { AU.addSession(s); WO.saved = true; WO.savedId = s.id; AU.renderHome(); }
  }
  function setFeel(feel) {
    if (!WO.savedId) return;
    var h = AU.loadHistory();
    for (var i = 0; i < h.length; i++) { if (h[i].id === WO.savedId) { h[i].feel = feel; break; } }
    AU.saveHistory(h);
    beep(720, 0.1); vibrate([30]);
    var wrap = byId("woFeel"); if (!wrap) return;
    var bs = wrap.querySelectorAll(".feel-chip");
    for (var j = 0; j < bs.length; j++) bs[j].classList.toggle("on", bs[j].dataset.feel === feel);
    var msg = byId("woFeelMsg"); if (msg) msg.textContent = "Segnato. Lo ritrovi nello storico.";
  }
  function collect(status) {
    var items = [], volume = 0, anyStrength = false;
    WO.order.forEach(function (id) {
      var lg = WO.logs[id];
      if (lg.skipped && !lg.sets.length) { items.push({ id: lg.id, n: lg.n, nome: lg.nome, unit: lg.unit, value: null, skipped: true }); return; }
      if (lg.strength) {
        if (!lg.sets.length) return;
        anyStrength = true;
        var anyW = lg.sets.some(function (s) { return s.w > 0; });
        var val = anyW ? Math.max.apply(null, lg.sets.map(function (s) { return s.w; })) : lg.sets.reduce(function (a, s) { return a + (s.r || 0); }, 0);
        lg.sets.forEach(function (s) { volume += (s.w || 0) * (s.r || 0); });
        items.push({ id: lg.id, n: lg.n, nome: lg.nome, unit: anyW ? "kg" : "rip.", value: val, sets: lg.sets.map(function (s) { return { w: s.w, r: s.r }; }) });
      } else {
        if (!lg.reached) return;
        items.push({ id: lg.id, n: lg.n, nome: lg.nome, unit: lg.unit, value: lg.value });
      }
    });
    if (!items.length) return null;
    return { id: Date.now(), date: new Date().toISOString(), title: WO.title, kind: anyStrength ? "forza" : "guidato", status: status, durationSec: Math.round((Date.now() - WO.startedAt) / 1000), volume: Math.round(volume), items: items };
  }

  function endWorkout() { WO.running = false; stopLoop(); stopClock(); persist("interrotta"); closeWorkout(); }
  function closeWorkout() {
    byId("view-workout").classList.add("hidden");
    byId("appbar").classList.remove("hidden");
    byId("tabbar").classList.remove("hidden");
    if (AU.applyTheme) AU.applyTheme();
    if (AU.show) AU.show("home");
  }

  function renderShell() {
    byId("view-workout").innerHTML =
      '<div class="wo-top"><button class="close" id="woClose" aria-label="Termina">' + IC.close + '</button>' +
        '<div class="wo-progress" id="woProg"></div><div class="wo-clock" id="woClock">0</div></div>' +
      '<div class="wo-bar"><div id="woBarFill"></div></div>' +
      '<div class="wo-stage">' +
        '<div class="wo-modewrap"><span class="wo-mode" id="woMode"></span></div>' +
        '<div class="wo-illu" id="woIllu"></div>' +
        '<div class="wo-name" id="woName"></div>' +
        '<div class="wo-sub" id="woSub"></div>' +
        '<div class="timer-wrap hidden" id="woTimerWrap"><svg viewBox="0 0 200 200"><circle class="ring-bg" cx="100" cy="100" r="88"></circle><circle class="ring-fg" id="woRing" cx="100" cy="100" r="88" stroke-dasharray="' + RING + '"></circle></svg><div class="timer-num"><div class="t" id="woTime">0</div><div class="lab" id="woLab"></div></div></div>' +
        '<div class="setlog hidden" id="woSetlog">' +
          '<div class="sl-target" id="woTarget"></div>' +
          '<div class="sl-grid">' +
            '<div class="sl-cell"><div class="sl-k">Kg</div><div class="set-step"><button class="ss-btn" data-sl="w_-1" aria-label="Meno">&minus;</button><button class="ss-num" id="woW" data-slnum="w">0</button><button class="ss-btn" data-sl="w_1" aria-label="Piu">+</button></div></div>' +
            '<div class="sl-cell"><div class="sl-k">Reps</div><div class="set-step"><button class="ss-btn" data-sl="r_-1" aria-label="Meno">&minus;</button><button class="ss-num" id="woR" data-slnum="r">0</button><button class="ss-btn" data-sl="r_1" aria-label="Piu">+</button></div></div>' +
          '</div>' +
        '</div>' +
        '<div class="wo-cue" id="woCue"></div>' +
      '</div>' +
      '<div class="wo-foot">' +
        '<button class="btn wo-done hidden" id="woDone">' + IC.check + ' Serie fatta</button>' +
        '<div class="wo-actions">' +
          '<button class="wo-chip" id="woSkip"><span class="wc-k">Salta</span><span class="wc-v">esercizio</span></button>' +
          '<button class="wo-chip" id="woTec"><span class="wc-k">Tecnica</span><span class="wc-v">come si fa</span></button>' +
          '<button class="wo-chip" id="woRestNow"><span class="wc-k">Recupero</span><span class="wc-v">avvia</span></button>' +
        '</div>' +
        '<div class="wo-controls">' +
          '<button class="ctrl" id="woPrev" aria-label="Indietro">' + IC.prev + '</button>' +
          '<button class="ctrl play hidden" id="woPlay" aria-label="Play/Pausa">' + IC.pause + '</button>' +
          '<button class="ctrl" id="woNextBtn" aria-label="Avanti">' + IC.next + '</button></div>' +
      '</div>' +
      '<div class="wo-sheet" id="woSheet"></div>';
    byId("woClose").onclick = endWorkout;
    byId("woPlay").onclick = togglePlay;
    byId("woNextBtn").onclick = function () { gotoStep(WO.idx + 1); };
    byId("woPrev").onclick = function () { gotoStep(WO.idx <= 0 ? 0 : WO.idx - 1); };
    byId("woSkip").onclick = skipExercise;
    byId("woDone").onclick = completeSet;
    byId("woTec").onclick = openTec;
    byId("woRestNow").onclick = function () { startRestNow(); };
    byId("woSheet").addEventListener("click", sheetClick);
    byId("view-workout").addEventListener("click", slClick);
  }

  function slClick(e) {
    if (byId("view-workout").getAttribute("data-mode") !== "set") return;
    var b = e.target.closest("[data-sl]");
    if (b) { var p = b.dataset.sl.split("_"); var d = +p[1]; if (p[0] === "w") cur.w = Math.max(0, Math.round((cur.w + d * 2.5) * 10) / 10); else cur.r = Math.max(0, cur.r + d); refreshSl(); return; }
    var n = e.target.closest("[data-slnum]");
    if (n) { var kind = n.dataset.slnum; if (AU.numpad) AU.numpad({ label: kind === "w" ? "Carico (kg)" : "Ripetizioni", value: kind === "w" ? cur.w : cur.r, decimals: kind === "w", onDone: function (nv) { if (kind === "w") cur.w = nv; else cur.r = nv; refreshSl(); } }); return; }
  }
  function refreshSl() { var w = byId("woW"), r = byId("woR"); if (w) w.textContent = (cur.w || cur.w === 0 ? cur.w : "0"); if (r) r.textContent = cur.r; }

  function completeSet() {
    var st = WO.steps[WO.idx]; if (!st || st.mode !== "set") return;
    st.log.sets.push({ w: cur.w || 0, r: cur.r || 0 }); st.log.reached = true;
    beep(840, 0.12); vibrate([30]);
    gotoStep(WO.idx + 1);
  }
  function startRestNow() {
    var st = WO.steps[WO.idx]; if (!st || st.mode !== "set") return;
    // se sei su una serie, registra e vai (il prossimo step e' un recupero o serie)
    completeSet();
  }

  function pop(el) { if (!el) return; el.classList.remove("anim"); void el.offsetWidth; el.classList.add("anim"); }
  function short(t) { t = t || ""; return t.length > 34 ? t.slice(0, 33) + "…" : t; }

  function loadStep(rebuild) {
    if (rebuild) renderShell();
    if (WO.idx >= WO.steps.length) { showFinish(); return; }
    var st = WO.steps[WO.idx];
    byId("view-workout").setAttribute("data-mode", st.mode);
    byId("woMode").className = "wo-mode " + st.mode;
    byId("woMode").textContent = st.mode === "rest" ? "Recupero" : st.mode === "prep" ? "Preparati" : "Esegui";
    byId("woIllu").innerHTML = renderIllu(st.ex.illu);
    byId("woName").textContent = st.ex.nome;
    byId("woProg").textContent = "Esercizio " + (st.exIdx + 1) + "/" + st.exTotal;
    byId("woBarFill").style.width = (WO.idx / WO.steps.length * 100).toFixed(1) + "%";

    var timer = byId("woTimerWrap"), setlog = byId("woSetlog"), done = byId("woDone"), play = byId("woPlay"), rn = byId("woRestNow"), skip = byId("woSkip");
    if (st.mode === "set") {
      stopLoop(); WO.running = false;
      timer.classList.add("hidden"); setlog.classList.remove("hidden"); done.classList.remove("hidden"); play.classList.add("hidden"); rn.style.display = "none"; skip.style.display = "";
      byId("woSub").textContent = "Serie " + st.setN + " di " + st.log.plan;
      var tgt = st.ex.target || {}; var ls = lastSet(st.ex.id);
      var tk = (tgt.kg != null && tgt.kg !== "") ? tgt.kg + " kg" : "";
      var tr = (tgt.reps != null && tgt.reps !== "") ? tgt.reps + " reps" : (AU.defaultVal(st.ex) + " reps");
      byId("woTarget").innerHTML = 'Obiettivo: <b>' + (tk ? tk + " x " : "") + tr + '</b>' + (ls ? ' <span class="sl-last">ultima: ' + (ls.w ? ls.w + " kg x " : "") + ls.r + '</span>' : '');
      var prev = st.log.sets[st.log.sets.length - 1];
      if (prev) { cur.w = prev.w; cur.r = prev.r; }
      else { cur.w = (tgt.kg != null && tgt.kg !== "") ? +tgt.kg : (ls ? ls.w : 0); cur.r = (tgt.reps != null && tgt.reps !== "") ? +tgt.reps : (ls ? ls.r : (AU.defaultVal(st.ex) || 10)); }
      refreshSl();
      byId("woCue").textContent = (st.ex.target && st.ex.target.note) ? st.ex.target.note : "";
    } else if (st.mode === "rest") {
      timer.classList.remove("hidden"); setlog.classList.add("hidden"); done.classList.add("hidden"); play.classList.remove("hidden"); rn.style.display = "none"; skip.style.display = "none";
      byId("woTimerWrap").className = "timer-wrap rest";
      byId("woSub").textContent = st.label || "Recupero";
      byId("woLab").textContent = "recupero";
      byId("woCue").textContent = "Poi: " + esc(st.ex.nome);
      startCountdown(st);
    } else if (st.mode === "work") {
      timer.classList.remove("hidden"); setlog.classList.add("hidden"); done.classList.add("hidden"); play.classList.remove("hidden"); rn.style.display = "none"; skip.style.display = "";
      byId("woTimerWrap").className = "timer-wrap";
      byId("woSub").textContent = esc(st.ex.categoria);
      byId("woLab").textContent = st.ex.tipo === "hold" ? "tieni" : st.ex.tipo === "carry" ? "cammina" : "secondi";
      byId("woCue").textContent = (st.ex.target && st.ex.target.note) ? st.ex.target.note : ("Ritmo: " + short(st.ex.ritmo));
      st.log.reached = true; st.log.value = st.sec;
      startCountdown(st);
    } else {
      timer.classList.remove("hidden"); setlog.classList.add("hidden"); done.classList.add("hidden"); play.classList.remove("hidden"); rn.style.display = "none"; skip.style.display = "none";
      byId("woTimerWrap").className = "timer-wrap";
      byId("woSub").textContent = "Tra poco si parte";
      byId("woLab").textContent = "via tra";
      byId("woCue").textContent = "Mettiti in posizione";
      startCountdown(st);
    }
    pop(byId("woName")); pop(byId("woIllu"));
    closeSheet();
  }

  function startCountdown(st) {
    WO.remaining = st.sec; WO.last = performance.now(); WO.running = true;
    updateTimer(st); byId("woPlay").innerHTML = IC.pause; loop();
  }
  function updateTimer(st) {
    byId("woTime").textContent = WO.remaining <= 0 ? "0" : fmt(Math.ceil(WO.remaining));
    var frac = st.sec > 0 ? Math.max(0, Math.min(1, WO.remaining / st.sec)) : 0;
    byId("woRing").style.strokeDashoffset = (RING * (1 - frac)).toFixed(1);
  }
  function loop() {
    stopLoop();
    var step = function (now) {
      if (!WO.running) return;
      var dt = (now - WO.last) / 1000; WO.last = now;
      var st = WO.steps[WO.idx]; var prev = WO.remaining; WO.remaining -= dt;
      var cs = Math.ceil(WO.remaining);
      if (cs !== Math.ceil(prev) && WO.remaining > 0 && cs <= 3) {
        beep(660, 0.08); vibrate([25]);
        var tw = byId("woTimerWrap"); if (tw) tw.classList.add("countdown");
        var tn = byId("woTime"); if (tn) { tn.classList.remove("tick"); void tn.offsetWidth; tn.classList.add("tick"); }
      }
      if (WO.remaining <= 0) { beep(st.mode === "rest" ? 880 : 760, 0.18); vibrate(st.mode === "rest" ? [120] : [80]); gotoStep(WO.idx + 1); return; }
      updateTimer(st); WO.raf = requestAnimationFrame(step);
    };
    WO.last = performance.now(); WO.raf = requestAnimationFrame(step);
  }
  function gotoStep(i) { stopLoop(); WO.idx = i; if (WO.idx >= WO.steps.length) { showFinish(); return; } loadStep(false); }
  function togglePlay() {
    WO.running = !WO.running; byId("woPlay").innerHTML = WO.running ? IC.pause : IC.play;
    if (WO.running) { WO.last = performance.now(); loop(); } else stopLoop();
  }
  function skipExercise() {
    var st = WO.steps[WO.idx]; if (!st) return; stopLoop();
    var curId = st.ex.id; if (st.log) { st.log.skipped = true; }
    vibrate([40]);
    var j = WO.idx + 1;
    while (j < WO.steps.length && WO.steps[j].ex && WO.steps[j].ex.id === curId) j++;
    if (j >= WO.steps.length) { showFinish(); return; }
    gotoStep(j);
  }

  function openTec() {
    var st = WO.steps[WO.idx]; if (!st) return; var ex = st.ex;
    var h = '<div class="ws-head"><div><div class="ws-title">' + esc(ex.nome) + '</div><div class="ws-sub">' + esc(ex.categoria) + '</div></div><button class="ws-x" data-ws="close" aria-label="Chiudi">' + IC.close + '</button></div>';
    h += '<div class="rrt"><div class="item"><div class="k">Ritmo</div><div class="v">' + esc(ex.ritmo || "-") + '</div></div>' +
      '<div class="item"><div class="k">Respiro</div><div class="v">' + esc(ex.respiro || "-") + '</div></div>' +
      '<div class="item"><div class="k">Tensione</div><div class="v">' + esc(ex.tensione || "-") + '</div></div></div>';
    if (ex.fasi && ex.fasi.length) { h += '<div class="section-title">Movimento</div>'; ex.fasi.forEach(function (f) { h += '<div class="phase"><div class="ph-dot"></div><div><div class="ph-label">' + esc(f[0]) + '</div><div class="ph-text">' + esc(f[1]) + '</div></div></div>'; }); }
    if (ex.errori && ex.errori.length) { var er = ex.errori[0]; h += '<div class="err"><div class="bad">' + esc(er[0]) + '</div><div class="fix">' + esc(er[1]) + '</div></div>'; }
    openSheet(h);
  }
  function openSheet(html) { var sh = byId("woSheet"); if (!sh) return; sh.innerHTML = '<div class="ws-card">' + html + '</div>'; sh.classList.add("open"); }
  function closeSheet() { var sh = byId("woSheet"); if (sh) { sh.classList.remove("open"); sh.innerHTML = ""; } }
  function sheetClick(e) { if (e.target === byId("woSheet")) { closeSheet(); return; } var c = e.target.closest("[data-ws]"); if (c) { closeSheet(); } }

  function showFinish() {
    WO.running = false; stopLoop(); stopClock(); persist("completata");
    beep(880, 0.25); vibrate([100, 50, 100, 50, 200]);
    var items = []; WO.order.forEach(function (id) { items.push(WO.logs[id]); });
    var done = items.filter(function (l) { return l.reached && !l.skipped; });
    var sk = items.filter(function (l) { return l.skipped; });
    var dur = Math.max(1, Math.round((Date.now() - WO.startedAt) / 60000));
    var vol = 0; items.forEach(function (l) { (l.sets || []).forEach(function (s) { vol += (s.w || 0) * (s.r || 0); }); });
    var h = '<div class="wo-top"><button class="close" id="woClose2">' + IC.close + '</button><div></div><div style="width:40px"></div></div>';
    h += '<div class="wo-finish"><div class="domain-burst"></div><div class="big">' + IC.trophy + '</div><div class="dx-over">Sessione completata</div><h2>Salvata!</h2>' +
      '<p>' + esc(WO.title) + ' &middot; ' + done.length + '/' + items.length + ' &middot; ' + dur + ' min' + (vol ? ' &middot; ' + Math.round(vol) + ' kg' : '') + '</p></div>';
    h += '<div class="wo-feel" id="woFeel"><div class="feel-q">Com\'&egrave; andata?</div><div class="feel-row">' +
      '<button class="feel-chip" data-feel="facile"><span class="fc-t">Facile</span><span class="fc-s">avevo di piu\'</span></button>' +
      '<button class="feel-chip" data-feel="giusto"><span class="fc-t">Giusto</span><span class="fc-s">al punto</span></button>' +
      '<button class="feel-chip" data-feel="dura"><span class="fc-t">Dura</span><span class="fc-s">al limite</span></button>' +
      '</div><div class="feel-msg" id="woFeelMsg"></div></div>';
    h += '<div class="finish-list">';
    items.forEach(function (l) {
      var v = l.skipped ? '<span style="color:var(--muted)">saltato</span>' : (l.sets && l.sets.length ? (l.sets.length + (l.sets.length === 1 ? ' serie' : ' serie') + (l.sets.some(function (s) { return s.w > 0; }) ? ' &middot; ' + Math.max.apply(null, l.sets.map(function (s) { return s.w; })) + ' kg' : '')) : (l.reached ? (l.value + ' ' + l.unit) : '-'));
      h += '<div class="log-row"><span>' + l.n + '. ' + esc(l.nome) + '</span><b>' + v + '</b></div>';
    });
    h += '</div><div style="padding:0 4px"><button class="btn" id="woHist">Vedi lo storico</button><button class="btn secondary" id="woHome">Torna alla home</button></div>';
    byId("view-workout").innerHTML = h;
    byId("woClose2").onclick = closeWorkout;
    byId("woHome").onclick = closeWorkout;
    byId("woHist").onclick = function () { closeWorkout(); AU.renderHistory(); AU.show("history"); };
    var fw = byId("woFeel"); if (fw) fw.addEventListener("click", function (e) { var c = e.target.closest("[data-feel]"); if (c) setFeel(c.dataset.feel); });
  }

  // ---- audio / haptics ----
  var actx = null;
  function initAudio() { try { if (navigator.audioSession) navigator.audioSession.type = "ambient"; } catch (e) {} if (!PREF.sound) return; try { if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)(); if (actx.state === "suspended") actx.resume(); } catch (e) {} }
  function beep(freq, dur) {
    if (!PREF.sound || !actx) return;
    try { var o = actx.createOscillator(), g = actx.createGain(); o.frequency.value = freq; o.type = "sine"; o.connect(g); g.connect(actx.destination); g.gain.setValueAtTime(0.001, actx.currentTime); g.gain.exponentialRampToValueAtTime(0.25, actx.currentTime + 0.01); g.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + dur); o.start(); o.stop(actx.currentTime + dur + 0.02); } catch (e) {}
  }
  function vibrate(p) { if (PREF.vibrate && navigator.vibrate) try { navigator.vibrate(p); } catch (e) {} }
  function domainSound() {
    if (!PREF.sound || !actx) return;
    try {
      var t = actx.currentTime;
      var o = actx.createOscillator(), g = actx.createGain(), f = actx.createBiquadFilter();
      o.type = "sawtooth"; o.frequency.setValueAtTime(70, t); o.frequency.exponentialRampToValueAtTime(300, t + 0.7);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.15, t + 0.1); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.95);
      o.connect(f); f.connect(g); g.connect(actx.destination); o.start(t); o.stop(t + 1.0);
      [521, 523.5, 784].forEach(function (fr) { var oo = actx.createOscillator(), gg = actx.createGain(); oo.type = "sine"; oo.frequency.value = fr; gg.gain.setValueAtTime(0.0001, t + 0.25); gg.gain.exponentialRampToValueAtTime(0.045, t + 0.5); gg.gain.exponentialRampToValueAtTime(0.0001, t + 1.3); oo.connect(gg); gg.connect(actx.destination); oo.start(t + 0.25); oo.stop(t + 1.35); });
      var io = actx.createOscillator(), ig = actx.createGain(); io.type = "sine"; io.frequency.setValueAtTime(170, t + 0.62); io.frequency.exponentialRampToValueAtTime(54, t + 0.95); ig.gain.setValueAtTime(0.0001, t + 0.6); ig.gain.exponentialRampToValueAtTime(0.22, t + 0.66); ig.gain.exponentialRampToValueAtTime(0.0001, t + 1.1); io.connect(ig); ig.connect(actx.destination); io.start(t + 0.6); io.stop(t + 1.15);
    } catch (e) {}
  }

  document.addEventListener("visibilitychange", function () {
    if (document.hidden && WO.running && byId("view-workout").getAttribute("data-mode") !== "set") { WO.running = false; var p = byId("woPlay"); if (p) p.innerHTML = IC.play; stopLoop(); }
  });
})();
