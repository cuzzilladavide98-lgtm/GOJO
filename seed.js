/* Import automatico dello storico reale (Hevy) al primo avvio.
   Carica cavci_seed.json in localStorage se lo storico e vuoto. */
(function () {
  "use strict";
  var AU = window.AU; if (!AU) return;
  try {
    if (localStorage.getItem("aureo_seeded") === "1") return;
    var h = AU.loadHistory();
    if (h && h.length) { localStorage.setItem("aureo_seeded", "1"); return; }
    fetch("cavci_seed.json").then(function (r) { return r.json(); }).then(function (arr) {
      if (Array.isArray(arr) && arr.length) AU.saveHistory(arr);
      localStorage.setItem("aureo_seeded", "1");
      if (AU.renderHome) AU.renderHome();
    }).catch(function () {});
  } catch (e) {}
})();
