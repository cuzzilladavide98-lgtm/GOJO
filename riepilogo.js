/* =====================================================================
   L'Allenamento Aureo - RIEPILOGO (dashboard stile Apple Fitness)
   Carte a colpo d'occhio con i TUOI dati: anello settimana, volume,
   ultima sessione, costanza, record. No-scroll. Nessun dato esterno.
   ===================================================================== */
(function () {
  "use strict";
  var AU = window.AU; if (!AU) return;
  var byId = AU.byId, esc = AU.esc, IC = AU.IC;
  var FEEL = { facile: "Facile", giusto: "Giusto", dura: "Dura" };
  function hist() { return AU.loadHistory ? AU.loadHistory() : []; }
  function sod(t) { var d = new Date(t); d.setHours(0, 0, 0, 0); return d.getTime(); }
  function track() { try { return localStorage.getItem("aureo_cavci_track") || "standard"; } catch (e) { return "standard"; } }
  function blocks() { var C = window.CAVCI; return track() === "corpo" ? C.BLOCKS_BW : C.BLOCKS; }
  function nextBlock() { var C = window.CAVCI; if (!C) return null; var n = C.nextN ? C.nextN() : 1; var bs = blocks(); return bs[((n - 1) % 7 + 7) % 7]; }
  function week() {
    var h = hist(), today = sod(Date.now()), days = [];
    for (var i = 6; i >= 0; i--) days.push({ t: today - i * 86400000, count: 0, vol: 0 });
    h.forEach(function (s) {
      var sd = sod(new Date(s.date).getTime());
      var idx = Math.round((sd - (today - 6 * 86400000)) / 86400000);
      if (idx >= 0 && idx < 7) { days[idx].count++; days[idx].vol += (s.volume || 0); }
    });
    return days;
  }
  function streak() {
    var h = hist(); if (!h.length) return 0;
    var set = {}; h.forEach(function (s) { set[sod(new Date(s.date).getTime())] = 1; });
    var day = sod(Date.now());
    if (!set[day]) { day -= 86400000; if (!set[day]) return 0; }
    var n = 0; while (set[day]) { n++; day -= 86400000; } return n;
  }
  function bestLift() {
    var best = 0, name = "";
    hist().forEach(function (s) { (s.items || []).forEach(function (it) { if (it.sets && it.sets.length) it.sets.forEach(function (st) { if ((st.w || 0) > best) { best = st.w; name = it.nome; } }); }); });
    return best ? { kg: best, name: name } : null;
  }
  function fmtDur(sec) { return Math.max(1, Math.round((sec || 0) / 60)) + " min"; }
  function ago(iso) { var d = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000); return d <= 0 ? "oggi" : d === 1 ? "ieri" : d + " giorni fa"; }
  function ring(frac, txt, sub) {
    var R = 52, C = 2 * Math.PI * R, off = C * (1 - Math.max(0, Math.min(1, frac)));
    return '<svg class="rp-ring" viewBox="0 0 140 140">' +
      '<circle cx="70" cy="70" r="' + R + '" fill="none" stroke="var(--md-sc-high)" stroke-width="13"/>' +
      '<circle cx="70" cy="70" r="' + R + '" fill="none" stroke="var(--md-primary)" stroke-width="13" stroke-linecap="round" stroke-dasharray="' + C.toFixed(1) + '" stroke-dashoffset="' + off.toFixed(1) + '" transform="rotate(-90 70 70)"/>' +
      '<text x="70" y="67" text-anchor="middle" class="rp-ring-n">' + esc(txt) + '</text>' +
      '<text x="70" y="90" text-anchor="middle" class="rp-ring-s">' + esc(sub) + '</text></svg>';
  }
  function bars(days) {
    var max = Math.max(1, Math.max.apply(null, days.map(function (d) { return d.vol; })));
    return '<div class="rp-bars">' + days.map(function (d) {
      var hp = d.vol > 0 ? Math.max(10, Math.round(d.vol / max * 100)) : (d.count > 0 ? 8 : 4);
      return '<span class="rp-bar' + (d.t === sod(Date.now()) ? ' now' : '') + '"><i style="height:' + hp + '%"></i></span>';
    }).join("") + '</div>';
  }
  window.renderRiepilogo = function () {
    if (AU.applyTheme) AU.applyTheme();
    var days = week();
    var wk = days.reduce(function (a, d) { return a + d.count; }, 0);
    var wvol = days.reduce(function (a, d) { return a + d.vol; }, 0);
    var goal = 4, st = streak(), h = hist(), tot = h.length, last = h[0];
    var nb = nextBlock(), bl = bestLift();
    var volTxt = wvol >= 1000 ? (Math.round(wvol / 100) / 10 + "k") : Math.round(wvol);
    var out = '<div class="rp">';
    out += '<div class="rp-hero">' + ring(wk / goal, wk + "/" + goal, "settimana") +
      '<div class="rp-hero-tx"><div class="rp-k">Questa settimana</div>' +
      '<div class="rp-hero-h">' + (wk >= goal ? "Obiettivo raggiunto" : (wk + " session" + (wk === 1 ? "e" : "i"))) + '</div>' +
      '<div class="rp-hero-s">' + (st > 0 ? (st + " giorn" + (st === 1 ? "o" : "i") + " di costanza") : "Riparti oggi") + '</div>' +
      (nb ? '<button class="rp-go" data-rp="start">' + IC.play + '<span>Tappa ' + nb.n + '/7 &middot; ' + esc(nb.nome) + '</span></button>' : '') +
      '</div></div>';
    out += '<div class="rp-grid">';
    out += '<div class="rp-card"><div class="rp-c-top"><span class="rp-c-t">Volume 7 giorni</span></div>' +
      '<div class="rp-c-big">' + volTxt + ' <span>kg</span></div>' + bars(days) + '</div>';
    out += '<button class="rp-card tap" data-rp="history"><div class="rp-c-top"><span class="rp-c-t">Ultima sessione</span><span class="rp-chev">&rsaquo;</span></div>' +
      (last ? ('<div class="rp-last-t">' + esc(last.title) + '</div><div class="rp-last-s">' + fmtDur(last.durationSec) + ' &middot; ' + ago(last.date) + '</div>' +
        (last.feel && FEEL[last.feel] ? '<div class="rp-feel feel-' + last.feel + '">' + FEEL[last.feel] + '</div>' : '')) : '<div class="rp-empty2">Nessuna ancora</div>') + '</button>';
    out += '<div class="rp-card"><div class="rp-c-top"><span class="rp-c-t">Costanza</span></div>' +
      '<div class="rp-c-big">' + st + ' <span>gg</span></div><div class="rp-c-sub">' + tot + ' sessioni totali</div></div>';
    out += '<button class="rp-card tap" data-rp="history"><div class="rp-c-top"><span class="rp-c-t">Record carico</span><span class="rp-chev">&rsaquo;</span></div>' +
      (bl ? ('<div class="rp-c-big">' + bl.kg + ' <span>kg</span></div><div class="rp-c-sub">' + esc(bl.name) + '</div>') : '<div class="rp-empty2">Registra un carico</div>') + '</button>';
    out += '</div></div>';
    byId("view-riepilogo").innerHTML = out;
  };
  var v = byId("view-riepilogo");
  if (v) v.addEventListener("click", function (e) {
    var b = e.target.closest("[data-rp]"); if (!b) return;
    if (b.dataset.rp === "history") { if (AU.renderHistory) AU.renderHistory(); AU.show("history"); }
    else if (b.dataset.rp === "start") { var nb = nextBlock(); if (nb && window.CAVCI && window.CAVCI.openBlock) window.CAVCI.openBlock(nb); }
  });
  window.renderRiepilogo();
  if (AU.show) AU.show("riepilogo");
})();
