/* =====================================================================
   L'Allenamento Aureo - Musica
   Collegamento a YouTube Music + player incorporato (YouTube IFrame) +
   link rapidi salvabili. Usa window.AU (app.js).
   Nota: music.youtube.com non e incorporabile in iframe; il player usa
   l'embed YouTube standard. Per l'esperienza Premium usare "Apri YouTube Music".
   ===================================================================== */
(function () {
  "use strict";
  var AU = window.AU;
  var byId = AU.byId, esc = AU.esc;
  var YT = '<svg viewBox="0 0 24 24"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3-5.2 3z"/></svg>';

  function load() { try { return JSON.parse(localStorage.getItem("aureo_music") || "{}"); } catch (e) { return {}; } }
  function save(m) { try { localStorage.setItem("aureo_music", JSON.stringify(m)); } catch (e) {} }

  function parseYT(u) {
    u = (u || "").trim(); if (!u) return null; var m;
    if ((m = u.match(/[?&]list=([^&]+)/))) return { kind: "list", id: m[1] };
    if ((m = u.match(/[?&]v=([^&]+)/))) return { kind: "video", id: m[1] };
    if ((m = u.match(/youtu\.be\/([^?&\/]+)/))) return { kind: "video", id: m[1] };
    if ((m = u.match(/embed\/([^?&\/]+)/))) return { kind: "video", id: m[1] };
    return null;
  }
  function src(m) {
    return m.kind === "list"
      ? ("https://www.youtube.com/embed/videoseries?list=" + encodeURIComponent(m.id) + "&playsinline=1&rel=0")
      : ("https://www.youtube.com/embed/" + encodeURIComponent(m.id) + "?playsinline=1&rel=0");
  }

  window.renderMusicView = function () {
    var m = load(); m.links = m.links || []; var h = "";
    h += '<div class="music-hero"><div class="mh-ic">' + YT + '</div>' +
      '<div><div class="mh-t">YouTube Music</div>' +
      '<div class="mh-s">Apri la tua musica per allenarti. Con Premium: senza pubblicita e in background.</div></div></div>';
    h += '<a class="yt-launch" href="https://music.youtube.com/" target="_blank" rel="noopener">' + YT + ' Apri YouTube Music</a>';

    h += '<div class="section-title">Player nell\'app</div>';
    if (m.id) {
      h += '<div class="music-embed"><iframe src="' + src(m) + '" title="Player musica" frameborder="0" ' +
        'allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>';
      h += '<button class="btn secondary" data-music="clear">Cambia playlist / brano</button>';
    } else {
      h += '<div class="card-box"><p class="mp-hint">Incolla il link di una playlist o di un brano (da YouTube Music o YouTube) per riprodurlo dentro l\'app: resta aperto durante l\'allenamento e il timer continua.</p>' +
        '<input class="mp-input" id="mpUrl" placeholder="https://music.youtube.com/playlist?list=..." inputmode="url">' +
        '<button class="btn" data-music="set">Carica nel player</button></div>';
    }

    h += '<div class="section-title">Link rapidi</div>';
    m.links.forEach(function (l, i) {
      h += '<div class="ql-row"><a class="ql-open" href="' + esc(l.url) + '" target="_blank" rel="noopener">' +
        AU.IC.music + '<span>' + esc(l.label) + '</span></a>' +
        '<button class="ql-del" data-del="' + i + '" aria-label="Elimina">' + AU.IC.close + '</button></div>';
    });
    h += '<div class="card-box"><input class="mp-input" id="qlLabel" placeholder="Nome (es. Workout mix)">' +
      '<input class="mp-input" id="qlUrl" placeholder="Link YouTube Music" inputmode="url">' +
      '<button class="btn secondary" data-music="add">Aggiungi link rapido</button></div>';

    h += '<div class="footer-note">Avvia la musica nel player qui sopra (resta dentro l\'app) oppure tocca "Apri YouTube Music". Il player incorporato usa YouTube e potrebbe non riflettere l\'abbonamento Premium; per l\'ascolto senza pubblicita usa l\'app YouTube Music.</div>';
    byId("view-music").innerHTML = h;
  };

  byId("view-music").addEventListener("click", function (e) {
    var d = e.target.closest("[data-music],[data-del]"); if (!d) return;
    var m = load(); m.links = m.links || [];
    var act = d.dataset.music;
    if (act === "set") {
      var p = parseYT(byId("mpUrl").value);
      if (p) { m.id = p.id; m.kind = p.kind; save(m); window.renderMusicView(); }
      else alert("Link non riconosciuto. Incolla un URL con una playlist (?list=...) o un brano YouTube/YouTube Music.");
    } else if (act === "clear") {
      delete m.id; delete m.kind; save(m); window.renderMusicView();
    } else if (act === "add") {
      var u = byId("qlUrl").value.trim();
      if (!u) { alert("Inserisci un link."); return; }
      var lab = byId("qlLabel").value.trim() || "Playlist";
      m.links.push({ label: lab, url: u }); save(m); window.renderMusicView();
    } else if (d.dataset.del != null) {
      m.links.splice(+d.dataset.del, 1); save(m); window.renderMusicView();
    }
  });
})();
