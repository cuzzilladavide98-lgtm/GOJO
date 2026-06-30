/* =====================================================================
   Motore di rendering delle illustrazioni istruttive (SVG)
   Disegna figure-manichino da liste di "ossa" [x1,y1,x2,y2,larghezza]
   con linee di riferimento, frecce, archi e muscoli evidenziati.
   ===================================================================== */

let __illuSeq = 0;

function __bone(b, color, opacity) {
  if (!b || b[4] === undefined || b[4] <= 0) return "";
  const o = opacity === undefined ? 1 : opacity;
  return `<line x1="${b[0]}" y1="${b[1]}" x2="${b[2]}" y2="${b[3]}" stroke="${color}" stroke-width="${b[4]}" stroke-linecap="round" opacity="${o}"/>`;
}
function __head(h, color, opacity) {
  if (!h) return "";
  const o = opacity === undefined ? 1 : opacity;
  return `<circle cx="${h[0]}" cy="${h[1]}" r="${h[2]}" fill="${color}" opacity="${o}"/>`;
}
function __rrect(r, fill, stroke) {
  if (!r) return "";
  const x = Math.min(r[0], r[2]), y = Math.min(r[1], r[3]);
  const w = Math.abs(r[2] - r[0]), h = Math.abs(r[3] - r[1]);
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="1.5"` : ""}/>`;
}

function renderIllu(illu, flat) {
  const uid = "i" + (++__illuSeq);
  const parts = illu.vb.split(" ").map(Number);
  const W = parts[2], H = parts[3];

  const BODY = `url(#bg_${uid})`;
  const GHOST = "var(--fig-mid,#e6c879)";
  const REFA = "#57d6c6";    // teal — linea che resta pulita
  const REFB = "#8fb8ff";    // azzurro — livellamenti / pavimento
  const ARROW = "var(--fig-arrow,#f4c542)";   // oro — movimento
  const HIC = "#ff8a5a";     // muscoli evidenziati
  const WRONG = "#ff5d5d";   // errore da evitare
  const PROP = "#4a4a55";    // attrezzi (panca, barra, peso...)

  let s = `<svg viewBox="${illu.vb}" xmlns="http://www.w3.org/2000/svg" class="illu-svg" preserveAspectRatio="xMidYMid meet">`;

  s += `<defs>
    <linearGradient id="bg_${uid}" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0" stop-color="var(--fig-hi,#f8d885)"/>
      <stop offset="0.55" stop-color="var(--fig-mid,#e6ac4c)"/>
      <stop offset="1" stop-color="var(--fig-lo,#b9802c)"/>
    </linearGradient>
    <marker id="ah_${uid}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="${ARROW}"/>
    </marker>
    ${flat ? "" : `<filter id="gl_${uid}" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="3.2"/></filter>`}
  </defs>`;

  // sfondo arrotondato
  s += `<rect x="0" y="0" width="${W}" height="${H}" rx="14" fill="#16161c"/>`;

  // --- attrezzi / ambiente ---
  if (illu.floor !== undefined) {
    s += `<rect x="0" y="${illu.floor}" width="${W}" height="${H - illu.floor}" fill="#202028"/>`;
    s += `<line x1="0" y1="${illu.floor}" x2="${W}" y2="${illu.floor}" stroke="#3a3a46" stroke-width="2"/>`;
  }
  if (illu.wall !== undefined) {
    s += `<rect x="0" y="0" width="${illu.wall}" height="${H}" fill="#202028"/>`;
    s += `<line x1="${illu.wall}" y1="0" x2="${illu.wall}" y2="${H}" stroke="#3a3a46" stroke-width="2"/>`;
  }
  if (illu.bar) s += `<line x1="${illu.bar[0]}" y1="${illu.bar[1]}" x2="${illu.bar[2]}" y2="${illu.bar[3]}" stroke="${PROP}" stroke-width="6" stroke-linecap="round"/>`;
  s += __rrect(illu.bench, PROP);
  s += __rrect(illu.anchor, PROP);

  // --- linee di riferimento (dietro la figura) ---
  (illu.refs || []).forEach(r => {
    const style = r[4];
    let col = REFA, dash = "5 5", wdt = 1.8, cap = "butt";
    if (style === "level" || style === "floorline") { col = REFB; dash = "6 5"; }
    if (style === "track") { dash = "none"; wdt = 1.5; }
    if (style === "press") { col = REFA; dash = "none"; wdt = 3; cap = "round"; }
    if (style === "floorline") { wdt = 2; }
    s += `<line x1="${r[0]}" y1="${r[1]}" x2="${r[2]}" y2="${r[3]}" stroke="${col}" stroke-width="${wdt}" stroke-dasharray="${dash}" stroke-linecap="${cap}" opacity="0.92"/>`;
    if (style === "plumb" || style === "bodyline") {
      s += `<circle cx="${r[0]}" cy="${r[1]}" r="2.4" fill="${col}"/><circle cx="${r[2]}" cy="${r[3]}" r="2.4" fill="${col}"/>`;
    }
  });

  // --- figura "errata" (es. schiena a banana) ---
  (illu.wrong || []).forEach(b => { s += __bone(b, WRONG, 0.4); });
  s += __head(illu.wrongHead, WRONG, 0.4);

  // --- figura fantasma (altro fotogramma) ---
  const GOP = (illu.ghostOp !== undefined) ? illu.ghostOp : 0.32;
  (illu.ghost || []).forEach(b => { s += __bone(b, GHOST, GOP); });
  s += __head(illu.ghostHead, GHOST, GOP);

  // --- corpo principale ---
  (illu.body || []).forEach(b => { s += __bone(b, BODY, 1); });
  // giunture: nodi articolari che saldano le ossa (resa anatomica continua)
  const __deg = {}, __rad = {}, __pt = {};
  (illu.body || []).forEach(b => {
    if (!b || b[4] === undefined || b[4] <= 0) return;
    [[b[0], b[1]], [b[2], b[3]]].forEach(p => {
      const k = p[0] + "_" + p[1];
      __deg[k] = (__deg[k] || 0) + 1;
      __rad[k] = Math.max(__rad[k] || 0, b[4] / 2);
      __pt[k] = p;
    });
  });
  Object.keys(__deg).forEach(k => {
    if (__deg[k] >= 2) s += `<circle cx="${__pt[k][0]}" cy="${__pt[k][1]}" r="${(__rad[k]).toFixed(1)}" fill="${BODY}"/>`;
  });
  if (illu.heads) illu.heads.forEach(h => { s += __head(h, BODY, 1); });
  s += __head(illu.head, BODY, 1);

  // --- pesi / zaini sopra le mani ---
  s += __rrect(illu.weight, "#33333d", "#5a5a66");

  // --- muscoli evidenziati (sopra il corpo) ---
  (illu.hi || []).forEach(b => {
    s += `<line x1="${b[0]}" y1="${b[1]}" x2="${b[2]}" y2="${b[3]}" stroke="${HIC}" stroke-width="${b[4]}" stroke-linecap="round" opacity="${flat ? "0.3" : "0.42"}"${flat ? "" : ` filter="url(#gl_${uid})"`}/>`;
  });

  // --- frecce e archi di movimento ---
  (illu.arrows || []).concat(illu.arcs || []).forEach(a => {
    if (a[0] === "arc") {
      s += `<path d="M ${a[1]} ${a[2]} Q ${a[5]} ${a[6]} ${a[3]} ${a[4]}" fill="none" stroke="${ARROW}" stroke-width="3.4" marker-end="url(#ah_${uid})"/>`;
    } else {
      s += `<line x1="${a[1]}" y1="${a[2]}" x2="${a[3]}" y2="${a[4]}" stroke="${ARROW}" stroke-width="3.4" marker-end="url(#ah_${uid})"/>`;
    }
  });

  // --- etichette (sequenze) ---
  (illu.labels || []).forEach(l => {
    s += `<text x="${l[0]}" y="${l[1]}" fill="#9a9aa6" font-size="9" font-family="-apple-system,system-ui,sans-serif" text-anchor="middle">${l[2]}</text>`;
  });

  s += `</svg>`;
  return s;
}

if (typeof module !== "undefined") { module.exports = { renderIllu }; }
