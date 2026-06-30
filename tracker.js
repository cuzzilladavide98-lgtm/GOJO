/* =====================================================================
   L'Allenamento Aureo - Modalita FORZA (diario "alla Strong")
   Diario snello: serie x ripetizioni x carico, check serie con timer di
   recupero. L'utente detta il ritmo (nessun avanzamento automatico).
   Usa window.AU (app.js) e renderIllu (figures.js).
   ===================================================================== */
(function () {
  "use strict";
  var AU = window.AU;
  var byId = AU.byId, esc = AU.esc, fmt = AU.fmt, PREF = AU.PREF, IC = AU.IC;
  var TR = { items: [], title: "", restRem: 0, restTot: 0, timer: null, saved: false };

  function lastItem(id) { var h = AU.loadHistory ? AU.loadHistory() : []; for (var i = 0; i < h.length; i++) { var it = (h[i].items || []).filter(function (x) { return x.id === id && x.sets && x.sets.length; })[0]; if (it) return it; } return null; }
  function newSet(ex) {
    var li = lastItem(ex.id);
    if (li) { var s = li.sets[li.sets.length - 1]; return { w: s.w || 0, r: s.r || (AU.defaultVal(ex) || 10), done: false }; }
    return { w: 0, r: AU.defaultVal(ex) || 10, done: false };
  }
  function buildItems(list) { return list.map(function (ex) { return { ex: ex, sets: [newSet(ex)], rpe: 0 }; }); }

  function startTracker(list, title) {
    if (!list || !list.length) return;
    TR.items = buildItems(list); TR.title = title; TR.saved = false; TR.startedAt = Date.now();
    initAudio();
    byId("view-workout").classList.remove("hidden");
    byId("appbar").classList.add("hidden");
    byId("tabbar").classList.add("hidden");
    byId("view-workout").setAttribute("data-mode", "tracker");
    render();
  }
  window.startTracker = startTracker;

  function lastHint(id) {
    var logs = AU.exerciseLogs ? AU.exerciseLogs(id) : [];
    var l = logs.filter(function (x) { return !x.skipped; })[0];
    return l ? ("Ultima: " + l.value + " " + l.unit) : "";
  }

  function stepper(kind, i, j, val) {
    var shown = kind === "w" ? (val ? val : "") : (val || val === 0 ? val : "");
    return '<div class="set-step">' +
      '<button class="ss-btn" data-step="' + kind + "_" + i + "_" + j + '_-1" aria-label="Meno">&minus;</button>' +
      '<input class="ss-in" type="text" inputmode="' + (kind === "w" ? "decimal" : "numeric") + '" data-in="' + kind + "_" + i + "_" + j + '" value="' + shown + '" placeholder="' + (kind === "w" ? "kg" : "rep") + '" aria-label="' + (kind === "w" ? "Carico in kg" : "Ripetizioni") + '">' +
      '<button class="ss-btn" data-step="' + kind + "_" + i + "_" + j + '_1" aria-label="Piu">+</button></div>';
  }
  function flushInputs() {
    var ins = byId("view-workout").querySelectorAll("[data-in]");
    for (var k = 0; k < ins.length; k++) {
      var inp = ins[k], p = inp.dataset.in.split("_");
      var item = TR.items[+p[1]]; if (!item) continue; var set = item.sets[+p[2]]; if (!set) continue;
      var nv = parseFloat(String(inp.value).replace(",", ".")); if (isNaN(nv) || nv < 0) nv = 0;
      if (p[0] === "w") set.w = Math.round(nv * 10) / 10; else set.r = Math.round(nv);
    }
  }

  function render() {
    var h = '<div class="wo-top">' +
      '<button class="close" id="trkClose" aria-label="Termina e salva">' + IC.close + '</button>' +
      '<div class="wo-progress">' + esc(TR.title) + ' &middot; Forza</div>' +
      '<div style="width:40px"></div></div>';
    h += '<div class="trk" id="trkList">';
    TR.items.forEach(function (it, i) {
      var doneSets = it.sets.filter(function (s) { return s.done; }).length;
      h += '<div class="trk-card">' +
        '<div class="trk-head"><div class="trk-thumb">' + renderIllu(it.ex.illu, true) + '</div>' +
        '<div class="trk-h-txt"><div class="trk-name">' + it.ex.n + ". " + esc(it.ex.nome) + '</div>' +
        '<div class="trk-cat">' + esc(it.ex.categoria) + '</div>' +
        '<div class="trk-last">' + esc(lastHint(it.ex.id)) + '</div></div>' +
        '<div class="trk-count">' + doneSets + "/" + it.sets.length + '</div></div>' +
        '<div class="set-row set-head"><span>Serie</span><span>Kg</span><span>Reps</span><span></span></div>';
      it.sets.forEach(function (s, j) {
        h += '<div class="set-row' + (s.done ? " done" : "") + '">' +
          '<span class="set-n">' + (j + 1) + '</span>' +
          stepper("w", i, j, s.w) + stepper("r", i, j, s.r) +
          '<button class="set-done" data-done="' + i + "_" + j + '" aria-label="Serie completata">' + IC.check + '</button></div>';
      });
      h += '<button class="add-set" data-add="' + i + '">+ Serie</button>' +
        '<div class="rpe-row"><span class="rpe-lab">RPE (sforzo)</span><div class="rpe-step">' +
        '<button class="ss-btn" data-rpe="' + i + '_-1" aria-label="Meno">&minus;</button>' +
        '<span class="rpe-val">' + (it.rpe ? it.rpe : "-") + '</span>' +
        '<button class="ss-btn" data-rpe="' + i + '_1" aria-label="Piu">+</button></div></div></div>';
    });
    h += '<button class="btn" id="trkFinish">Termina e salva</button><div style="height:96px"></div></div>';
    h += '<div class="rest-bar hidden" id="restBar"><div class="rb-fill" id="rbFill"></div>' +
      '<div class="rb-row"><button class="rb-btn" data-rest="-15">-15</button>' +
      '<div class="rb-mid"><span class="rb-lab">Recupero</span><span class="rb-time" id="rbTime">0:00</span></div>' +
      '<button class="rb-btn" data-rest="+15">+15</button>' +
      '<button class="rb-btn rb-skip" data-rest="skip">Salta</button></div></div>';
    byId("view-workout").innerHTML = h;
    byId("trkClose").onclick = closeSave;
    byId("trkFinish").onclick = function () { finish(); };
    if (TR.timer) { byId("restBar").classList.remove("hidden"); updateRest(); }
  }

  byId("view-workout").addEventListener("click", function (e) {
    if (byId("view-workout").getAttribute("data-mode") !== "tracker") return;
    var st = e.target.closest("[data-step]"), dn = e.target.closest("[data-done]"),
      ad = e.target.closest("[data-add]"), rb = e.target.closest("[data-rest]"), rp = e.target.closest("[data-rpe]");
    if (e.target.closest("[data-in]")) return;
    flushInputs();
    if (st) {
      var p = st.dataset.step.split("_"); var s = TR.items[+p[1]].sets[+p[2]]; var d = +p[3];
      if (p[0] === "w") s.w = Math.max(0, Math.round((s.w + d * 2.5) * 10) / 10);
      else s.r = Math.max(0, s.r + d);
      render();
    } else if (dn) {
      var q = dn.dataset.done.split("_"); var set = TR.items[+q[0]].sets[+q[1]];
      set.done = !set.done;
      if (set.done) startRest(TR.items[+q[0]].ex.rest || 60); 
      render();
    } else if (ad) {
      var it = TR.items[+ad.dataset.add]; var pv = it.sets[it.sets.length - 1];
      it.sets.push({ w: pv ? pv.w : 0, r: pv ? pv.r : 10, done: false });
      render();
    } else if (rp) {
      var pr = rp.dataset.rpe.split("_"); var iR = +pr[0]; var dR = +pr[1]; TR.items[iR].rpe = Math.max(0, Math.min(10, (TR.items[iR].rpe || 0) + dR)); render();
    } else if (rb) {
      var a = rb.dataset.rest;
      if (a === "skip") stopRest();
      else { TR.restRem = Math.max(0, TR.restRem + (a === "+15" ? 15 : -15)); updateRest(); }
    }
  });

  byId("view-workout").addEventListener("change", function (e) {
    if (byId("view-workout").getAttribute("data-mode") !== "tracker") return;
    if (e.target.closest("[data-in]")) flushInputs();
  });

  function startRest(sec) { TR.restRem = sec; TR.restTot = sec; if (TR.timer) clearInterval(TR.timer); TR.timer = setInterval(tick, 250); var b = byId("restBar"); if (b) b.classList.remove("hidden"); updateRest(); }
  function stopRest() { if (TR.timer) clearInterval(TR.timer); TR.timer = null; var b = byId("restBar"); if (b) b.classList.add("hidden"); }
  function tick() { TR.restRem -= 0.25; if (TR.restRem <= 0) { beep(760, 0.16); vibrate([120]); stopRest(); return; } updateRest(); }
  function updateRest() { var t = byId("rbTime"); if (t) t.textContent = fmt(Math.ceil(TR.restRem)); var f = byId("rbFill"); if (f) f.style.width = (TR.restTot ? Math.max(0, TR.restRem) / TR.restTot * 100 : 0) + "%"; }

  function summarize(it) {
    var sets = it.sets.filter(function (s) { return s.done || s.r > 0; });
    var anyW = sets.some(function (s) { return s.w > 0; });
    if (anyW) return { unit: "kg", value: Math.max.apply(null, sets.map(function (s) { return s.w; })), sets: sets };
    return { unit: "rip.", value: sets.reduce(function (a, s) { return a + (s.r || 0); }, 0), sets: sets };
  }
  function collect(status) {
    var items = [], volume = 0;
    TR.items.forEach(function (it) {
      var sm = summarize(it); if (!sm.sets.length) return;
      var vol = sm.sets.reduce(function (a, s) { return a + (s.w || 0) * (s.r || 0); }, 0);
      volume += vol;
      items.push({ id: it.ex.id, n: it.ex.n, nome: it.ex.nome, unit: sm.unit, value: sm.value, rpe: it.rpe || 0,
        sets: sm.sets.map(function (s) { return { w: s.w, r: s.r }; }) });
    });
    if (!items.length) return null;
    return { id: Date.now(), date: new Date().toISOString(), title: TR.title, kind: "forza", status: status,
      durationSec: Math.round((Date.now() - (TR.startedAt || Date.now())) / 1000), volume: Math.round(volume), items: items };
  }
  function persist(status) { if (TR.saved) return; var s = collect(status); if (s) { AU.addSession(s); TR.saved = true; AU.renderHome(); } }

  function finish() { stopRest(); persist("completata"); showDone(); }
  function closeSave() { stopRest(); persist("interrotta"); close(); }
  function close() {
    byId("view-workout").classList.add("hidden");
    byId("view-workout").removeAttribute("data-mode");
    byId("appbar").classList.remove("hidden");
    byId("tabbar").classList.remove("hidden");
    if (AU.applyTheme) AU.applyTheme();
    if (AU.show) AU.show("home");
  }
  function showDone() {
    var n = TR.items.reduce(function (a, it) { return a + it.sets.filter(function (s) { return s.done; }).length; }, 0);
    var dur = Math.max(1, Math.round((Date.now() - (TR.startedAt || Date.now())) / 60000));
    var vol = TR.items.reduce(function (a, it) { return a + it.sets.filter(function (s) { return s.done || s.r > 0; }).reduce(function (b, s) { return b + (s.w || 0) * (s.r || 0); }, 0); }, 0);
    byId("view-workout").innerHTML = '<div class="wo-top"><button class="close" id="trkClose2" aria-label="Chiudi">' + IC.close + '</button><div></div><div style="width:48px"></div></div>' +
      '<div class="wo-finish"><div class="domain-burst"></div><div class="big">' + IC.trophy + '</div><div class="dx-over">Sessione Forza</div><h2>Salvata!</h2><p>' + esc(TR.title) + ' &middot; ' + n + ' serie &middot; ' + dur + ' min' + (vol ? ' &middot; ' + Math.round(vol) + ' kg' : '') + '</p></div>' +
      '<div style="padding:0 16px"><button class="btn" id="trkHist">Vedi lo storico</button><button class="btn secondary" id="trkHome">Torna alla home</button></div>';
    byId("trkClose2").onclick = close;
    byId("trkHome").onclick = close;
    byId("trkHist").onclick = function () { close(); AU.renderHistory(); AU.show("history"); };
  }

  var actx = null;
  function initAudio() { try { if (navigator.audioSession) navigator.audioSession.type = "ambient"; } catch (e) {} if (!PREF.sound) return; try { if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)(); if (actx.state === "suspended") actx.resume(); } catch (e) {} }
  function beep(freq, dur) { if (!PREF.sound || !actx) return; try { var o = actx.createOscillator(), g = actx.createGain(); o.frequency.value = freq; o.type = "sine"; o.connect(g); g.connect(actx.destination); g.gain.setValueAtTime(0.001, actx.currentTime); g.gain.exponentialRampToValueAtTime(0.22, actx.currentTime + 0.01); g.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + dur); o.start(); o.stop(actx.currentTime + dur + 0.02); } catch (e) {} }
  function vibrate(p) { if (PREF.vibrate && navigator.vibrate) try { navigator.vibrate(p); } catch (e) {} }
})();
