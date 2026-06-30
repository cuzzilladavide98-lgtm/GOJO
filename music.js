/* =====================================================================
   L'Allenamento Aureo - Musica (player a carte, schermata unica)
   Stile lettore (Spotify/YT Music): now-playing fisso + sottomenu a
   portata di tocco (Player / Le tue playlist / Aggiungi). Il player
   incorporato resta in vita mentre cambi sottomenu e mentre ti alleni.
   ===================================================================== */
(function () {
  "use strict";
  var AU = window.AU;
  var byId = AU.byId, esc = AU.esc;
  var YT = '<svg viewBox="0 0 24 24"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3-5.2 3z"/></svg>';
  var mtab = "player";

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

  function nowHTML() {
    var m = load();
    if (m.id) {
      return '<div class="music-embed"><iframe src="' + src(m) + '" title="Player musica" frameborder="0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>' +
        '<div class="mu-now-row"><div><div class="mu-now-k">In riproduzione</div><div class="mu-now-t">' + (m.kind === "list" ? "Playlist" : "Brano") + ' nel player</div></div>' +
        '<button class="mu-mini" data-music="clear">Cambia</button></div>';
    }
    return '<div class="mu-empty"><div class="mu-empty-ic">' + AU.IC.music + '</div>' +
      '<p>Nessun brano nel player. Aggiungi una playlist o un brano: resta in riproduzione dentro l\'app anche durante l\'allenamento.</p>' +
      '<button class="btn" data-mu-tab="add">Aggiungi musica</button></div>';
  }
  function playerHTML() {
    return '<div class="mu-now">' + nowHTML() + '</div>' +
      '<a class="mu-launch" href="https://music.youtube.com/" target="_blank" rel="noopener">' + YT +
      '<span>Apri YouTube Music</span><i>Premium: senza pubblicita e in background</i></a>';
  }
  function playlistHTML() {
    var m = load(); m.links = m.links || [];
    if (!m.links.length) return '<div class="mu-empty"><div class="mu-empty-ic">' + AU.IC.music + '</div>' +
      '<p>Nessuna scorciatoia salvata. Aggiungi i tuoi mix preferiti per averli a un tocco.</p>' +
      '<button class="btn" data-mu-tab="add">Aggiungi link</button></div>';
    return '<div class="mu-grid">' + m.links.map(function (l, i) {
      return '<div class="mu-card"><a class="mu-card-open" href="' + esc(l.url) + '" target="_blank" rel="noopener">' +
        '<span class="mu-card-ic">' + AU.IC.music + '</span><span class="mu-card-t">' + esc(l.label) + '</span></a>' +
        '<button class="mu-card-x" data-del="' + i + '" aria-label="Elimina">' + AU.IC.close + '</button></div>';
    }).join("") + '</div>';
  }
  function addHTML() {
    return '<div class="card-box"><div class="mu-lab">Carica nel player</div>' +
      '<input class="mp-input" id="mpUrl" placeholder="Incolla link playlist o brano" inputmode="url">' +
      '<button class="btn" data-music="set">Carica</button></div>' +
      '<div class="card-box"><div class="mu-lab">Salva una scorciatoia</div>' +
      '<input class="mp-input" id="qlLabel" placeholder="Nome (es. Workout mix)">' +
      '<input class="mp-input" id="qlUrl" placeholder="Link YouTube Music" inputmode="url">' +
      '<button class="btn secondary" data-music="add">Aggiungi ai preferiti</button></div>';
  }
  function subHTML() {
    var tabs = [["player", "Player"], ["playlist", "Le tue playlist"], ["add", "Aggiungi"]];
    return '<div class="mu-sub">' + tabs.map(function (t) {
      return '<button class="mu-tab' + (mtab === t[0] ? " on" : "") + '" data-mu-tab="' + t[0] + '">' + t[1] + '</button>';
    }).join("") + '</div>';
  }
  function cls(t) { return mtab === t ? "" : " class=\"hidden\""; }

  window.renderMusicView = function () {
    if (AU.applyTheme) AU.applyTheme("purple");
    var h = '<div class="mu-head"><div class="mu-head-ic">' + (AU.EYE || YT) + '</div>' +
      '<div><div class="mu-head-t">La tua musica</div><div class="mu-head-s">Tutto in una schermata, a portata di tocco.</div></div></div>';
    h += subHTML();
    h += '<div id="mu-player"' + cls("player") + '>' + playerHTML() + '</div>';
    h += '<div id="mu-playlist"' + cls("playlist") + '>' + playlistHTML() + '</div>';
    h += '<div id="mu-add"' + cls("add") + '>' + addHTML() + '</div>';
    byId("view-music").innerHTML = h;
  };

  function switchTab(t) {
    mtab = t;
    ["player", "playlist", "add"].forEach(function (x) { var el = byId("mu-" + x); if (el) el.classList.toggle("hidden", x !== t); });
    var pills = byId("view-music").querySelectorAll(".mu-tab");
    for (var i = 0; i < pills.length; i++) pills[i].classList.toggle("on", pills[i].dataset.muTab === t);
  }

  byId("view-music").addEventListener("click", function (e) {
    var tb = e.target.closest("[data-mu-tab]");
    if (tb) { switchTab(tb.dataset.muTab); return; }
    var d = e.target.closest("[data-music],[data-del]"); if (!d) return;
    var m = load(); m.links = m.links || []; var act = d.dataset.music;
    if (act === "set") {
      var p = parseYT(byId("mpUrl").value);
      if (p) { m.id = p.id; m.kind = p.kind; save(m); byId("mu-player").innerHTML = playerHTML(); switchTab("player"); }
      else alert("Link non riconosciuto. Incolla un URL con playlist (?list=...) o un brano YouTube/YouTube Music.");
    } else if (act === "clear") {
      delete m.id; delete m.kind; save(m); byId("mu-player").innerHTML = playerHTML();
    } else if (act === "add") {
      var u = byId("qlUrl").value.trim();
      if (!u) { alert("Inserisci un link."); return; }
      var lab = byId("qlLabel").value.trim() || "Playlist";
      m.links.push({ label: lab, url: u }); save(m); byId("mu-playlist").innerHTML = playlistHTML(); switchTab("playlist");
    } else if (d.dataset.del != null) {
      m.links.splice(+d.dataset.del, 1); save(m); byId("mu-playlist").innerHTML = playlistHTML();
    }
  });
})();
