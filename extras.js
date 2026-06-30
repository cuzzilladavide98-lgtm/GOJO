/* =====================================================================
   L'Allenamento Aureo - Extra: backup (export/import JSON+CSV) + promemoria
   Tutto in locale. La notifica e "all'apertura" (best-effort): la vera push
   schedulata in background richiederebbe un server (fuori scope tutto-locale).
   Usa window.AU (app.js).
   ===================================================================== */
(function () {
  "use strict";
  var AU = window.AU;
  function download(name, type, content) {
    try {
      var blob = new Blob([content], { type: type });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url; a.download = name; document.body.appendChild(a); a.click();
      setTimeout(function () { try { URL.revokeObjectURL(url); a.remove(); } catch (e) {} }, 1500);
    } catch (e) { alert("Esportazione non riuscita: " + e.message); }
  }
  function stamp() { var d = new Date(); function p(n) { return ("0" + n).slice(-2); } return d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) + "-" + p(d.getHours()) + p(d.getMinutes()); }

  function exportJSON() {
    var data = { app: "L'Allenamento Aureo", schema: 1, exportedAt: new Date().toISOString(), prefs: AU.PREF, history: AU.loadHistory() };
    download("aureo-backup-" + stamp() + ".json", "application/json", JSON.stringify(data, null, 2));
  }
  function cell(v) { v = (v == null ? "" : String(v)); return '"' + v.replace(/"/g, '""') + '"'; }
  function exportCSV() {
    var rows = [["data", "ora", "sessione", "tipo", "stato", "durata_s", "volume_kg", "es_n", "esercizio", "valore", "unita", "saltato", "rpe", "serie"]];
    AU.loadHistory().forEach(function (s) {
      (s.items || []).forEach(function (it) {
        rows.push([new Date(s.date).toLocaleDateString(), new Date(s.date).toLocaleTimeString(), s.title, (s.kind || "guidato"), s.status,
          (s.durationSec || ""), (s.volume || ""), it.n, it.nome, (it.skipped ? "" : it.value), it.unit, (it.skipped ? "si" : "no"), (it.rpe || ""),
          (it.sets ? it.sets.map(function (x) { return x.w + "x" + x.r; }).join(" ") : "")]);
      });
    });
    download("aureo-storico-" + stamp() + ".csv", "text/csv", rows.map(function (r) { return r.map(cell).join(","); }).join("\r\n"));
  }
  function importJSON(file) {
    var rd = new FileReader();
    rd.onload = function () {
      try {
        var d = JSON.parse(rd.result);
        var hist = Array.isArray(d) ? d : (d.history || []);
        if (!Array.isArray(hist)) { alert("File non valido."); return; }
        if (!confirm("Importare " + hist.length + " sessioni? Sostituisce lo storico attuale.")) return;
        AU.saveHistory(hist);
        if (d.prefs && typeof d.prefs === "object") { Object.assign(AU.PREF, d.prefs); AU.savePref(); if (AU.applyTheme) AU.applyTheme(); }
        AU.renderHome(); AU.renderHistory();
        alert("Importazione completata: " + hist.length + " sessioni.");
      } catch (e) { alert("Importazione non riuscita: " + e.message); }
    };
    rd.readAsText(file);
  }

  function daysSince(iso) { if (!iso) return 999; return Math.floor((Date.now() - new Date(iso).getTime()) / 86400000); }
  function lastDate() { var h = AU.loadHistory(); return h.length ? h[0].date : null; }
  function requestReminder(cb) {
    if (!("Notification" in window)) { alert("Le notifiche non sono supportate qui. Su iPhone funzionano se installi la PWA (Aggiungi a Home)."); cb && cb(false); return; }
    try { Notification.requestPermission().then(function (p) { cb && cb(p === "granted"); }); }
    catch (e) { cb && cb(false); }
  }
  function checkReminder() {
    try {
      if (!AU.PREF.reminder) return;
      if (!("Notification" in window) || Notification.permission !== "granted") return;
      var d = daysSince(lastDate());
      var today = new Date().toDateString();
      if (d >= (AU.PREF.reminderDays || 2) && localStorage.getItem("aureo_lastnudge") !== today) {
        localStorage.setItem("aureo_lastnudge", today);
        new Notification("L'Allenamento Aureo", { body: "Non ti alleni da " + d + " giorni. Riattiva il dominio." });
      }
    } catch (e) {}
  }

  window.EX = { exportJSON: exportJSON, exportCSV: exportCSV, importJSON: importJSON, requestReminder: requestReminder, daysSince: daysSince, lastDate: lastDate };
  setTimeout(checkReminder, 1500);
})();
