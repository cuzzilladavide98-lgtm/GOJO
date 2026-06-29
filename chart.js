/* =====================================================================
   Grafico dei progressi (SVG, Material Design) + ripple Material
   renderProgressChart(logs): logs in ordine recente->vecchio (come exerciseLogs)
   ===================================================================== */
function renderProgressChart(logs) {
  // tieni solo i valori numerici (non saltati), in ordine cronologico
  var pts = logs.filter(function (l) { return !l.skipped && l.value != null; })
    .slice().reverse()
    .slice(-12)
    .map(function (l) { return { v: +l.value, d: new Date(l.date) }; });

  if (pts.length < 2) {
    return '<div class="chart-empty">Servono almeno 2 sessioni registrate per vedere l\'andamento.</div>';
  }

  var W = 320, H = 170, padL = 30, padR = 14, padT = 16, padB = 26;
  var iw = W - padL - padR, ih = H - padT - padB;
  var vals = pts.map(function (p) { return p.v; });
  var mn = Math.min.apply(null, vals), mx = Math.max.apply(null, vals);
  if (mn === mx) { mn = Math.max(0, mn - 1); mx = mx + 1; }
  var range = mx - mn;
  var x = function (i) { return padL + (pts.length === 1 ? iw / 2 : iw * i / (pts.length - 1)); };
  var y = function (v) { return padT + ih - ih * (v - mn) / range; };

  function dd(d) { return ("0" + d.getDate()).slice(-2) + "/" + ("0" + (d.getMonth() + 1)).slice(-2); }

  var line = "", area = "M " + x(0) + " " + (padT + ih);
  pts.forEach(function (p, i) {
    line += (i ? " L " : "M ") + x(i).toFixed(1) + " " + y(p.v).toFixed(1);
    area += " L " + x(i).toFixed(1) + " " + y(p.v).toFixed(1);
  });
  area += " L " + x(pts.length - 1) + " " + (padT + ih) + " Z";

  var s = '<svg class="chart-svg" viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">';
  s += '<defs><linearGradient id="cArea" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="var(--md-primary,#FBD27B)" stop-opacity="0.30"/>' +
    '<stop offset="1" stop-color="var(--md-primary,#FBD27B)" stop-opacity="0"/></linearGradient></defs>';

  // griglia orizzontale min/medio/max
  [mn, (mn + mx) / 2, mx].forEach(function (gv) {
    var gy = y(gv).toFixed(1);
    s += '<line x1="' + padL + '" y1="' + gy + '" x2="' + (W - padR) + '" y2="' + gy + '" stroke="var(--md-outline-variant,#4C4736)" stroke-width="1" stroke-dasharray="2 4"/>';
    s += '<text x="' + (padL - 6) + '" y="' + (+gy + 3) + '" text-anchor="end" font-size="9" fill="var(--md-on-surface-variant,#CFC6B0)">' + Math.round(gv) + '</text>';
  });

  // area + linea
  s += '<path d="' + area + '" fill="url(#cArea)"/>';
  s += '<path d="' + line + '" fill="none" stroke="var(--md-primary,#FBD27B)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>';

  // punti
  pts.forEach(function (p, i) {
    s += '<circle cx="' + x(i).toFixed(1) + '" cy="' + y(p.v).toFixed(1) + '" r="3.2" fill="var(--md-surface,#15130C)" stroke="var(--md-primary,#FBD27B)" stroke-width="2"/>';
  });

  // valore ultimo punto
  var last = pts[pts.length - 1];
  s += '<text x="' + x(pts.length - 1) + '" y="' + (y(last.v) - 8) + '" text-anchor="end" font-size="11" font-weight="700" fill="var(--md-primary,#FBD27B)">' + last.v + '</text>';

  // etichette date (prima e ultima)
  s += '<text x="' + x(0) + '" y="' + (H - 8) + '" text-anchor="start" font-size="9" fill="var(--md-on-surface-variant,#CFC6B0)">' + dd(pts[0].d) + '</text>';
  s += '<text x="' + x(pts.length - 1) + '" y="' + (H - 8) + '" text-anchor="end" font-size="9" fill="var(--md-on-surface-variant,#CFC6B0)">' + dd(last.d) + '</text>';

  s += '</svg>';
  return s;
}

/* ---- Material ripple (state layer) ---- */
(function () {
  var SEL = ".btn,.block-card,.ex-row,.hist-head,.tabbar button,.ctrl,.lg-btn,.chip,.skip-link,.md-ripple";
  document.addEventListener("pointerdown", function (e) {
    var t = e.target.closest(SEL);
    if (!t) return;
    var r = t.getBoundingClientRect();
    var size = Math.max(r.width, r.height) * 1.1;
    var sp = document.createElement("span");
    sp.className = "ripple";
    sp.style.width = sp.style.height = size + "px";
    sp.style.left = (e.clientX - r.left - size / 2) + "px";
    sp.style.top = (e.clientY - r.top - size / 2) + "px";
    var cs = window.getComputedStyle(t);
    if (cs.position === "static") t.style.position = "relative";
    if (cs.overflow !== "hidden") t.style.overflow = "hidden";
    t.appendChild(sp);
    setTimeout(function () { sp.parentNode && sp.parentNode.removeChild(sp); }, 560);
  }, { passive: true });
})();
