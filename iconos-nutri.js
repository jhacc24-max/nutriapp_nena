/* =====================================================================
   NutriApp · Set de íconos propios (multicolor, estilo "emoji plano con volumen")
   - Dibujados a mano en SVG (viewBox 0 0 64 64), sin dependencias.
   - Uso:  NutriIconos.svg("palta", 40)            -> string <svg>
           NutriIconos.alimento(alimentoDeLaBase, 40) -> ícono del alimento
   - Grupos: alimentos · nutricion · limitar · vitaminas · minerales · otros
   ===================================================================== */
(function (global) {
  "use strict";

  /* ---------- utilidades de color ---------- */
  function hex2rgb(h) { h = h.replace("#", ""); return [0, 2, 4].map((i) => parseInt(h.substr(i, 2), 16)); }
  function rgb2hex(r) { return "#" + r.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join(""); }
  function mix(a, b, t) { const A = hex2rgb(a), B = hex2rgb(b); return rgb2hex(A.map((v, i) => v + (B[i] - v) * t)); }
  const claro = (c, t) => mix(c, "#ffffff", t);
  const oscuro = (c, t) => mix(c, "#000000", t);
  function luz(c) { const [r, g, b] = hex2rgb(c).map((v) => v / 255); return 0.2126 * r + 0.7152 * g + 0.0722 * b; }

  /* ---------- contexto por ícono (ids únicos de degradados) ---------- */
  function ctx(p) {
    return {
      u: (n) => `url(#${p}${n})`,
      L: (n, a, b, x2 = 0, y2 = 1, x1 = 0, y1 = 0) =>
        `<linearGradient id="${p}${n}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`,
      R: (n, a, b, cx = 0.35, cy = 0.3, r = 0.8) =>
        `<radialGradient id="${p}${n}" cx="${cx}" cy="${cy}" r="${r}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></radialGradient>`,
    };
  }
  const SOMBRA = (rx = 17, cy = 57.5) => `<ellipse cx="32" cy="${cy}" rx="${rx}" ry="2.6" fill="#000" opacity=".2"/>`;
  const BRILLO = (cx, cy, rx, ry, rot = -30, op = 0.45) =>
    `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" transform="rotate(${rot} ${cx} ${cy})" fill="#fff" opacity="${op}"/>`;
  const TXT = (x, y, s, t, fill, stroke, peso = 800) =>
    `<text x="${x}" y="${y}" font-family="'Nunito','Varela Round',system-ui,-apple-system,'Segoe UI',sans-serif" font-size="${s}" font-weight="${peso}" text-anchor="middle" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="${(s / 9).toFixed(2)}" paint-order="stroke" stroke-linejoin="round"` : ""}>${t}</text>`;

  const D = {}; // dibujos: clave -> (c) => {d:defs, b:body, s?:sombra}

  /* =========================== PROTEÍNAS =========================== */
  D.pollo = (c) => ({
    d: c.R("m", "#F6C27A", "#B8642C", .38, .32, .75) + c.L("h", "#FFFDF7", "#E3D6C1"),
    b: `<path d="M37 37 L49 48" stroke="${c.u("h")}" stroke-width="6" stroke-linecap="round"/>
        <circle cx="49" cy="51.5" r="3.6" fill="${c.u("h")}"/><circle cx="52.5" cy="47.5" r="3.6" fill="${c.u("h")}"/>
        <path d="M12 29 C9 16 22 7 33 11 C44 15 47 29 40 37 C34 44 16 43 12 29Z" fill="${c.u("m")}"/>
        <path d="M17 23 C20 19 25 18 28 19" stroke="#fff" stroke-opacity=".5" stroke-width="3" fill="none" stroke-linecap="round"/>
        <circle cx="31" cy="30" r="1.3" fill="#8C4A1E" opacity=".45"/><circle cx="24" cy="33" r="1.1" fill="#8C4A1E" opacity=".45"/><circle cx="36" cy="24" r="1" fill="#8C4A1E" opacity=".45"/>`,
  });
  D.pavo = (c) => ({
    d: c.L("p", "#F4F7FA", "#C9D3DC") + c.R("m", "#F2B66B", "#A9561F", .4, .3, .8) + c.L("g", "#FFFFFF", "#E2E2E2"),
    b: `<ellipse cx="32" cy="48" rx="25" ry="7" fill="${c.u("p")}"/><ellipse cx="32" cy="46.5" rx="20" ry="4.5" fill="#fff" opacity=".6"/>
        <path d="M12 40 C10 26 20 18 32 18 C44 18 54 26 52 40 C50 47 14 47 12 40Z" fill="${c.u("m")}"/>
        <path d="M16 30 C17 24 21 22 25 21" stroke="#fff" stroke-opacity=".45" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M20 33 C24 30 30 31 33 34" stroke="#8C4A1E" stroke-opacity=".35" stroke-width="1.5" fill="none"/>
        <path d="M44 25 L50 15" stroke="#FFF6EA" stroke-width="4" stroke-linecap="round"/><path d="M20 25 L14 15" stroke="#FFF6EA" stroke-width="4" stroke-linecap="round"/>
        <path d="M47 12 l3 -3 l2 3 l3 -1 l-1 4 l-6 2z" fill="${c.u("g")}"/><path d="M17 12 l-3 -3 l-2 3 l-3 -1 l1 4 l6 2z" fill="${c.u("g")}"/>`,
    s: 0,
  });
  D.huevo = (c) => ({
    d: c.R("c", "#FFF8EE", "#E6CDAE", .35, .3, .8) + c.R("w", "#FFFFFF", "#E8E4DC", .4, .35, .8) + c.R("y", "#FFD25A", "#F08C14", .4, .35, .7),
    b: `<ellipse cx="25" cy="30" rx="13" ry="17" fill="${c.u("c")}"/>${BRILLO(20, 22, 3.5, 6, 20, .6)}
        <ellipse cx="38" cy="45" rx="16" ry="10.5" fill="${c.u("w")}"/>
        <ellipse cx="38" cy="45" rx="16" ry="10.5" fill="none" stroke="#D9CFC2" stroke-width="1"/>
        <circle cx="38" cy="44.5" r="6.5" fill="${c.u("y")}"/>${BRILLO(36, 42, 2, 1.3, -20, .7)}`,
  });
  D.clara = (c) => ({
    d: c.L("v", "#EAF4FA", "#B9D3E3") + c.R("w", "#FFFFFF", "#E9EEF2", .4, .35, .8),
    b: `<path d="M10 30 H54 C54 46 45 55 32 55 C19 55 10 46 10 30Z" fill="${c.u("v")}" opacity=".9"/>
        <ellipse cx="32" cy="30" rx="22" ry="5.5" fill="#DCEAF3"/>
        <path d="M14 31 C18 26 26 27 32 25 C39 23 46 27 50 31 C44 34 20 35 14 31Z" fill="${c.u("w")}"/>
        ${BRILLO(17, 40, 2, 6, 15, .55)}
        <path d="M40 10 C46 10 50 15 49 21 L43 19 L40 22 L37 18 L32 20 C32 14 35 10 40 10Z" fill="#F6E6CF" stroke="#E2C9A6" stroke-width=".8"/>`,
  });
  function pez(c, cuerpo, lomo, panza, rayas, aleta) {
    return {
      d: c.L("b", lomo, panza, 0, 1) + c.L("t", cuerpo, oscuro(cuerpo, .25), 1, 0),
      b: `<path d="M44 33 L58 22 C56 28 56 38 58 44 Z" fill="${c.u("t")}"/>
          <path d="M8 34 C15 21 36 18 48 33 C36 47 15 46 8 34Z" fill="${c.u("b")}"/>
          <path d="M24 22 C28 16 36 17 38 23" fill="${aleta}"/>
          ${rayas}
          <path d="M20 26 C20 32 20 38 19 42" stroke="${oscuro(cuerpo, .2)}" stroke-opacity=".35" stroke-width="1.4" fill="none"/>
          <circle cx="15" cy="31" r="2.6" fill="#fff"/><circle cx="15.4" cy="31" r="1.4" fill="#1d2433"/>
          ${BRILLO(30, 27, 7, 2, -8, .4)}`,
    };
  }
  D.pescado = (c) => pez(c, "#4B7BB5", "#2E5A8C", "#DCE7F1",
    `<path d="M26 27 L40 29 M27 30.5 L42 32.5" stroke="#1D3A5E" stroke-width="1.6" stroke-linecap="round" opacity=".55"/>`, "#2E5A8C");
  D.tilapia = (c) => pez(c, "#9AA7B3", "#6F7E8C", "#F2E4DE",
    `<path d="M27 25 L26 41 M32 25 L31 42 M37 27 L36 40" stroke="#58636E" stroke-width="1.3" opacity=".4"/>`, "#C77B7B");
  D.salmon = (c) => ({
    d: c.L("f", "#FFA477", "#EE6A3C", 1, 1) + c.L("p", "#D7DBE0", "#9EA6AF"),
    b: `<path d="M9 40 C9 30 22 23 38 23 C50 23 56 28 56 34 C56 43 44 48 30 48 C18 48 9 47 9 40Z" fill="${c.u("p")}" transform="translate(0 4)"/>
        <path d="M9 37 C9 27 22 20 38 20 C50 20 56 25 56 31 C56 40 44 45 30 45 C18 45 9 44 9 37Z" fill="${c.u("f")}"/>
        <path d="M20 24 C17 31 18 38 22 43 M29 21 C26 29 27 37 31 44 M38 20 C35 28 36 36 40 43 M47 22 C44 28 45 34 48 40" stroke="#FFE3D3" stroke-width="2" fill="none" stroke-linecap="round" opacity=".85"/>
        ${BRILLO(26, 26, 7, 2, -10, .35)}`,
  });
  function cubo(c, front, top, side, x = 12, y = 22, s = 32, dz = 10, extra = "") {
    return `<path d="M${x} ${y} L${x + dz} ${y - dz} L${x + s + dz} ${y - dz} L${x + s} ${y}Z" fill="${top}" stroke-linejoin="round"/>
            <path d="M${x + s} ${y} L${x + s + dz} ${y - dz} L${x + s + dz} ${y + s - dz} L${x + s} ${y + s}Z" fill="${side}"/>
            <rect x="${x}" y="${y}" width="${s}" height="${s}" fill="${front}"/>${extra}`;
  }
  D.tofu = (c) => ({
    d: c.L("f", "#FFFDF4", "#EDE3C9") + c.L("s", "#E3D6B4", "#CDBE97"),
    b: cubo(c, c.u("f"), "#FFFFFA", c.u("s"), 14, 28, 28, 9,
      `<circle cx="22" cy="38" r="1" fill="#D8C9A5"/><circle cx="33" cy="45" r="1.2" fill="#D8C9A5"/><circle cx="27" cy="50" r=".9" fill="#D8C9A5"/><circle cx="37" cy="34" r=".8" fill="#D8C9A5"/>
       <rect x="16" y="30" width="4" height="12" rx="2" fill="#fff" opacity=".7"/>`),
  });
  D.carne = (c) => ({
    d: c.R("m", "#F06C6C", "#A8242E", .4, .35, .8),
    b: `<path d="M10 34 C8 22 20 13 33 14 C47 15 57 24 55 35 C53 46 40 51 27 49 C16 47 11 42 10 34Z" fill="#F5E2D6"/>
        <path d="M13 33 C12 23 22 17 33 18 C45 19 52 26 51 35 C50 43 39 47 28 45 C19 44 14 40 13 33Z" fill="${c.u("m")}"/>
        <path d="M20 27 C25 30 28 28 33 31 M30 38 C35 36 38 39 44 36 M22 37 C24 40 27 40 29 42" stroke="#FFD9D4" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".8"/>
        <circle cx="41" cy="26" r="4.5" fill="#FBF3EA" stroke="#E2CDBA"/><circle cx="41" cy="26" r="1.8" fill="#E8D2BE"/>
        ${BRILLO(22, 22, 5, 2, -20, .35)}`,
  });

  /* =========================== TAZONES (menestras, arroz, quinua) =========================== */
  const GRANOS = [[16,32],[20,28.5],[24,26],[29,24.5],[34,24],[39,25],[43,27],[47,29.5],[50,32.5],[19,33.5],[24,31],[29,29],[34,28.5],[39,30],[44,32.5],[27,33.5],[33,33],[38,34],[23,28],[45,28.5],[31,26.5],[36,26.5],[13,33.5],[48,33.5]];
  function tazon(c, opt) {
    const { masa1, masa2, grano, granoR = [1.9, 1.5], tazon1 = "#F1F5F9", tazon2 = "#BCC8D4", borde = "#E2E8F0", rot = true, extra = "", n = GRANOS.length } = opt;
    const granos = GRANOS.slice(0, n).map(([x, y], i) =>
      `<ellipse cx="${x}" cy="${y}" rx="${granoR[0]}" ry="${granoR[1]}" ${rot ? `transform="rotate(${(i * 47) % 180} ${x} ${y})"` : ""} fill="${Array.isArray(grano) ? grano[i % grano.length] : grano}"/>`).join("");
    return {
      d: c.L("t", tazon1, tazon2) + c.R("m", masa1, masa2, .45, .3, .8),
      b: `<path d="M10 33 C14 20 50 20 54 33Z" fill="${c.u("m")}"/>${granos}
          <path d="M7 33 H57 C57 46 46 55 32 55 C18 55 7 46 7 33Z" fill="${c.u("t")}"/>
          <ellipse cx="32" cy="33" rx="25" ry="2" fill="${borde}"/>
          ${BRILLO(14, 40, 2, 5.5, 25, .5)}${extra}`,
    };
  }
  const BARRO = { tazon1: "#E6A47A", tazon2: "#A4532C", borde: "#F0BE9C" };
  D.lentejas = (c) => tazon(c, { masa1: "#B98A5A", masa2: "#7A5233", grano: ["#9C6B3F", "#C79762", "#86582F"], granoR: [2, 1.4], ...BARRO });
  D.garbanzos = (c) => tazon(c, { masa1: "#F3D9A4", masa2: "#C99A55", grano: ["#EBC985", "#DDB46A", "#F4DCA6"], granoR: [2.5, 2.3], n: 18, ...BARRO });
  D.tarwi = (c) => tazon(c, { masa1: "#FBF0C9", masa2: "#D9C27D", grano: ["#F5E6A8", "#EAD48A", "#FFF4C8"], granoR: [2.4, 1.9], n: 20, ...BARRO });
  D.arveja = (c) => tazon(c, { masa1: "#B8D86A", masa2: "#6F9A2F", grano: ["#A6CC52", "#8DB93D", "#C3E07A"], granoR: [2.2, 1.6], ...BARRO });
  D.frijol = (c) => tazon(c, { masa1: "#B9504A", masa2: "#6E2422", grano: ["#9C3A35", "#C2605A", "#7E2A27"], granoR: [2.6, 1.6], ...BARRO });
  D.arroz = (c) => tazon(c, { masa1: "#FFFFFF", masa2: "#E3E6EA", grano: ["#FFFFFF", "#EEF0F2"], granoR: [2.2, .9] });
  D.arroz_integral = (c) => tazon(c, { masa1: "#E8D3AE", masa2: "#B8956A", grano: ["#D8BC8E", "#C8A475", "#EAD5B0"], granoR: [2.2, .9] });
  D.quinua = (c) => tazon(c, { masa1: "#FAEFD6", masa2: "#D8C3A0", grano: ["#F0DFC0", "#E2CCA6", "#FFF6E3", "#C9A27A"], granoR: [1.1, 1.1], rot: false,
    extra: `<path d="M44 22 C47 15 53 13 57 14 C56 19 51 23 44 22Z" fill="#6FBF4A"/><path d="M44 22 C48 19 51 17 55 15" stroke="#3E8A2B" stroke-width=".9" fill="none"/>` });
  D.ensalada = (c) => ({
    d: c.L("t", "#F1F5F9", "#BCC8D4") + c.R("l", "#9EE06A", "#3E9A33", .4, .3, .8) + c.R("r", "#FF7A6B", "#D6322B", .4, .35, .7),
    b: `<path d="M9 33 C9 22 16 18 21 22 C22 14 31 13 34 19 C38 13 48 15 47 23 C53 21 57 27 55 33Z" fill="${c.u("l")}"/>
        <path d="M15 31 C18 26 22 25 25 29 M30 28 C33 23 38 23 41 28" stroke="#2F7D2A" stroke-width="1.2" fill="none" opacity=".6"/>
        <circle cx="25" cy="27" r="5" fill="${c.u("r")}"/><circle cx="25" cy="27" r="2.6" fill="#FFB3A8" opacity=".7"/>
        <circle cx="41" cy="25" r="4.5" fill="${c.u("r")}"/><circle cx="41" cy="25" r="2.2" fill="#FFB3A8" opacity=".7"/>
        <path d="M33 30 C35 26 38 27 37 31Z" fill="#F7F1E3"/>
        <path d="M7 33 H57 C57 46 46 55 32 55 C18 55 7 46 7 33Z" fill="${c.u("t")}"/>
        <ellipse cx="32" cy="33" rx="25" ry="2" fill="#E2E8F0"/>${BRILLO(14, 40, 2, 5.5, 25, .5)}`,
  });

  /* =========================== CARBOHIDRATOS =========================== */
  D.avena = (c) => {
    const espiga = (rot) => {
      let g = `<path d="M32 56 Q32 34 32 14" stroke="#C99A3C" stroke-width="1.6" fill="none"/>`;
      for (let i = 0; i < 5; i++) {
        const y = 18 + i * 7;
        g += `<ellipse cx="28.5" cy="${y}" rx="3" ry="5" transform="rotate(-28 28.5 ${y})" fill="${c.u("g")}"/>`;
        g += `<ellipse cx="35.5" cy="${y + 3}" rx="3" ry="5" transform="rotate(28 35.5 ${y + 3})" fill="${c.u("g")}"/>`;
      }
      g += `<ellipse cx="32" cy="12" rx="2.6" ry="4.5" fill="${c.u("g")}"/>`;
      return `<g transform="rotate(${rot} 32 56)">${g}</g>`;
    };
    return { d: c.L("g", "#FBD97A", "#D8962E", 1, 1), b: espiga(-22) + espiga(22) + espiga(0) + `<path d="M27 50 C30 48 34 48 37 50 L36 53 C33 52 31 52 28 53Z" fill="#C1652F"/>` };
  };
  D.papa = (c) => ({
    d: c.R("p", "#E9C38C", "#A9733F", .38, .3, .8),
    b: `<path d="M9 36 C8 25 18 17 32 18 C46 19 56 26 55 37 C54 47 44 51 31 50 C18 49 10 46 9 36Z" fill="${c.u("p")}"/>
        ${BRILLO(21, 26, 6, 2.5, -15, .4)}
        <circle cx="22" cy="38" r="1.3" fill="#7C5028" opacity=".7"/><circle cx="38" cy="30" r="1.2" fill="#7C5028" opacity=".7"/><circle cx="44" cy="41" r="1.4" fill="#7C5028" opacity=".7"/><circle cx="31" cy="44" r="1" fill="#7C5028" opacity=".6"/>`,
  });
  D.camote = (c) => ({
    d: c.L("p", "#C85A7A", "#7E2747", 1, 1) + c.R("in", "#FFB15C", "#F07F1E", .5, .5, .6),
    b: `<path d="M7 40 C10 30 24 22 38 22 C48 22 56 26 57 31 C58 38 48 44 36 47 C24 50 9 50 7 40Z" fill="${c.u("p")}"/>
        <ellipse cx="54" cy="31.5" rx="3.6" ry="5.5" transform="rotate(15 54 31.5)" fill="${c.u("in")}"/>
        <path d="M18 35 C24 31 30 30 34 31 M24 42 C30 40 36 39 42 38" stroke="#5E1A33" stroke-width="1" fill="none" opacity=".4"/>
        ${BRILLO(26, 28, 7, 2, -12, .35)}`,
  });
  D.pan = (c) => ({
    d: c.R("p", "#F1B566", "#A85E21", .4, .25, .85),
    b: `<path d="M8 46 C6 30 18 18 32 18 C46 18 58 30 56 46 C55 51 9 51 8 46Z" fill="${c.u("p")}"/>
        <path d="M18 34 C21 29 25 27 28 27 M28 38 C31 31 35 28 39 28 M38 40 C41 35 44 33 47 33" stroke="#FCE2B7" stroke-width="2.6" fill="none" stroke-linecap="round"/>
        ${BRILLO(20, 25, 6, 2, -25, .3)}`,
  });
  D.pan_integral = (c) => ({
    d: c.L("c", "#B87334", "#7A4419") + c.L("m", "#E9C08A", "#C99863"),
    b: `<path d="M12 54 V27 C8 25 8 14 18 13 C24 9 40 9 46 13 C56 14 56 25 52 27 V54Z" fill="${c.u("c")}"/>
        <path d="M16 51 V26 C13 24 13 17 20 17 C25 13 39 13 44 17 C51 17 51 24 48 26 V51Z" fill="${c.u("m")}"/>
        ${[[22,27],[30,23],[38,28],[25,36],[34,34],[41,41],[22,45],[31,44],[28,30],[37,47]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="1.4" ry=".8" fill="#8A5A2B" opacity=".55"/>`).join("")}`,
  });
  D.arracacha = (c) => ({
    d: c.L("r", "#FFEFA6", "#E7BE45", 1, 1),
    b: `<path d="M14 20 C20 16 28 22 34 34 C38 42 44 50 50 54 C42 54 30 48 22 40 C14 32 10 24 14 20Z" fill="${c.u("r")}"/>
        <path d="M30 14 C36 13 40 20 42 30 C43 38 44 46 47 52 C41 49 35 41 32 32 C29 24 26 16 30 14Z" fill="${c.u("r")}" opacity=".92"/>
        <path d="M19 26 L23 24 M25 33 L29 30 M33 42 L36 39 M34 24 L38 23 M36 33 L40 32" stroke="#B88E22" stroke-width="1.1" stroke-linecap="round" opacity=".6"/>
        <path d="M13 21 C10 15 12 10 15 8 M15 21 C16 14 20 11 23 11" stroke="#7DBA4E" stroke-width="2" fill="none" stroke-linecap="round"/>`,
  });
  D.yuca = (c) => ({
    d: c.L("r", "#A0683C", "#6A4022", 0, 1),
    b: `<path d="M10 38 C14 30 28 24 42 22 C50 21 56 24 56 28 C56 33 48 36 38 39 C26 42 14 46 10 38Z" fill="${c.u("r")}"/>
        <path d="M18 34 L20 38 M28 30 L30 35 M38 27 L40 32" stroke="#4E2E17" stroke-width="1" opacity=".5"/>
        <ellipse cx="54" cy="26" rx="4" ry="5.5" transform="rotate(-10 54 26)" fill="#FFF8E8" stroke="#E7D8B8"/>
        <circle cx="54" cy="26" r="1.2" fill="#E7D8B8"/>${BRILLO(30, 28, 8, 1.8, -12, .3)}`,
  });
  D.olluco = (c) => {
    const o = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c.u("o")}"/>${BRILLO(x - r * .35, y - r * .4, r * .35, r * .2, -30, .5)}
      <circle cx="${x + r * .3}" cy="${y + r * .1}" r="${r * .18}" fill="#E0457A" opacity=".75"/><circle cx="${x - r * .3}" cy="${y + r * .4}" r="${r * .13}" fill="#E0457A" opacity=".75"/>`;
    return { d: c.R("o", "#FFF07A", "#E5B917", .38, .32, .8), b: o(22, 42, 11) + o(42, 43, 10) + o(32, 26, 10) };
  };
  D.miel = (c) => ({
    d: c.L("v", "#FFC93A", "#D9790A", 1, 1) + c.L("t", "#9C6A3A", "#6E4520"),
    b: `<rect x="14" y="20" width="36" height="35" rx="9" fill="${c.u("v")}"/>
        <rect x="12" y="13" width="40" height="9" rx="3" fill="${c.u("t")}"/>
        <path d="M16 22 C16 27 19 27 19 31 C19 34 22 34 22 30 V22Z" fill="#FFD966"/>
        <rect x="21" y="32" width="22" height="14" rx="3" fill="#FFF5DD"/>
        <path d="M27 39 l3-4 h4 l3 4 l-3 4 h-4z" fill="none" stroke="#E2A32A" stroke-width="1.4"/>
        ${BRILLO(18, 42, 1.8, 7, 0, .5)}`,
  });

  /* =========================== VEGETALES =========================== */
  D.brocoli = (c) => ({
    d: c.R("f", "#7CCB52", "#2F7A2C", .4, .3, .8) + c.L("t", "#BFE3A0", "#7FB85F"),
    b: `<path d="M27 54 L28 38 L21 32 L25 30 L31 35 L32 28 L34 28 L35 35 L41 30 L44 32 L37 38 L38 54Z" fill="${c.u("t")}"/>
        <circle cx="20" cy="27" r="9" fill="${c.u("f")}"/><circle cx="44" cy="27" r="9" fill="${c.u("f")}"/>
        <circle cx="32" cy="19" r="11" fill="${c.u("f")}"/><circle cx="26" cy="32" r="7" fill="${c.u("f")}"/><circle cx="39" cy="32" r="7" fill="${c.u("f")}"/>
        ${[[28,14],[35,16],[18,24],[45,23],[30,22]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.6" fill="#B6E890" opacity=".7"/>`).join("")}`,
  });
  D.zanahoria = (c) => ({
    d: c.L("z", "#FFAA45", "#E2650F", 1, 0),
    b: `<path d="M30 20 C38 16 46 20 44 28 L18 54 C15 56 13 54 14 51Z" fill="${c.u("z")}" />
        <path d="M27 31 L31 32 M23 38 L27 39 M20 45 L23 46 M33 25 L36 27" stroke="#B9500A" stroke-width="1.3" stroke-linecap="round" opacity=".6"/>
        <path d="M40 21 C42 12 47 8 50 8 C49 13 46 18 42 22Z" fill="#4CAF3E"/><path d="M42 22 C48 17 54 17 57 19 C53 22 48 24 43 24Z" fill="#62C04F"/><path d="M41 21 C40 14 38 10 35 9 C34 14 36 19 40 23Z" fill="#3E9A33"/>
        ${BRILLO(30, 26, 1.6, 5, 45, .4)}`,
  });
  D.tomate = (c) => ({
    d: c.R("t", "#FF8A73", "#C8261F", .38, .32, .8),
    b: `<path d="M32 18 C47 18 56 27 55 38 C54 49 44 55 32 55 C20 55 10 49 9 38 C8 27 17 18 32 18Z" fill="${c.u("t")}"/>
        <path d="M32 20 L27 15 L31 18 L32 12 L33 18 L37 15 L33 20 L41 19 L34 22 L32 25 L30 22 L23 19Z" fill="#43A33A"/>
        ${BRILLO(21, 28, 5, 3, -35, .45)}`,
  });
  D.zapallo = (c) => ({
    d: c.R("z", "#FFB347", "#D7650F", .45, .35, .8),
    b: `<ellipse cx="20" cy="38" rx="12" ry="15" fill="${c.u("z")}"/><ellipse cx="44" cy="38" rx="12" ry="15" fill="${c.u("z")}"/>
        <ellipse cx="32" cy="38" rx="11" ry="16" fill="${c.u("z")}"/>
        <path d="M21 25 C17 32 17 44 21 51 M43 25 C47 32 47 44 43 51" stroke="#B9500A" stroke-width="1" fill="none" opacity=".45"/>
        <path d="M30 23 C30 18 32 13 36 11 L38 13 C35 16 34 19 34 23Z" fill="#6B8E3A"/>
        <path d="M34 15 C39 10 45 11 47 14 C43 17 38 17 34 15Z" fill="#7CBF4E"/>${BRILLO(27, 30, 2, 5, 10, .4)}`,
  });
  D.pimiento = (c) => ({
    d: c.R("p", "#FF6B5B", "#B3161B", .38, .32, .8),
    b: `<path d="M18 24 C10 26 9 40 14 48 C18 54 26 55 32 52 C38 55 46 54 50 48 C55 40 54 26 46 24 C41 21 36 22 32 24 C28 22 23 21 18 24Z" fill="${c.u("p")}"/>
        <path d="M32 26 C30 34 30 44 32 52" stroke="#8E1014" stroke-width="1.4" fill="none" opacity=".5"/>
        <path d="M26 24 C27 20 37 20 38 24 C36 26 28 26 26 24Z" fill="#3E8E35"/>
        <path d="M32 22 C32 17 34 13 38 11" stroke="#4A9B3F" stroke-width="3.2" fill="none" stroke-linecap="round"/>
        ${BRILLO(20, 34, 2.4, 6, 10, .45)}`,
  });
  D.coliflor = (c) => ({
    d: c.R("c", "#FFFFFF", "#E5DFCC", .4, .3, .8) + c.L("h", "#8ED16A", "#3E8F3A"),
    b: `<path d="M6 36 C10 50 22 56 32 56 C42 56 54 50 58 36 C52 42 44 44 32 44 C20 44 12 42 6 36Z" fill="${c.u("h")}"/>
        <path d="M10 30 C6 38 14 46 22 46 L18 34Z M54 30 C58 38 50 46 42 46 L46 34Z" fill="${c.u("h")}"/>
        ${[[20,34,7],[44,34,7],[32,36,8],[25,25,8],[39,25,8],[32,18,8]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${c.u("c")}"/>`).join("")}
        ${[[24,22],[34,15],[40,22],[30,32],[42,32],[20,31]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.5" fill="#E8E0C4"/>`).join("")}`,
  });

  /* =========================== FRUTAS =========================== */
  const HOJA = (x, y, rot = -30, col = "#52B043") =>
    `<path d="M0 0 C4 -6 12 -7 16 -4 C12 1 5 2 0 0Z" fill="${col}" transform="translate(${x} ${y}) rotate(${rot})"/>`;
  D.manzana = (c) => ({
    d: c.R("m", "#FF7A70", "#C1121F", .38, .32, .8),
    b: `<path d="M32 23 C24 15 9 18 10 34 C11 48 21 56 27 55 C30 54 31 53 32 53 C33 53 34 54 37 55 C43 56 53 48 54 34 C55 18 40 15 32 23Z" fill="${c.u("m")}"/>
        <path d="M32 24 C32 18 33 14 35 11" stroke="#6B4423" stroke-width="2.2" fill="none" stroke-linecap="round"/>
        ${HOJA(34, 16, -25)}${BRILLO(19, 29, 3, 6, 25, .45)}`,
  });
  D.platano = (c) => ({
    d: c.L("b", "#FFE45C", "#F2B705", 1, 1),
    b: `<path d="M12 18 C12 38 24 50 44 50 C50 50 55 48 57 45 C55 43 52 43 48 43 C32 43 20 34 17 17 C16 14 12 14 12 18Z" fill="${c.u("b")}"/>
        <path d="M15 22 C17 34 26 43 40 46" stroke="#C99200" stroke-width="1.2" fill="none" opacity=".5"/>
        <path d="M11 17 L13 11 L17 12 L16 17Z" fill="#5C4126"/><circle cx="57" cy="45" r="1.6" fill="#4B3420"/>
        ${BRILLO(20, 30, 1.5, 6, -30, .45)}`,
  });
  D.naranja = (c) => ({
    d: c.R("o", "#FFB347", "#E86A0C", .38, .32, .8) + c.R("in", "#FFD07A", "#FF9A2E", .5, .5, .6),
    b: `<circle cx="24" cy="30" r="15" fill="${c.u("o")}"/>${HOJA(24, 15, -40)}${BRILLO(18, 24, 3, 2, -30, .4)}
        <circle cx="40" cy="42" r="14" fill="#F5F0E1"/><circle cx="40" cy="42" r="12" fill="${c.u("in")}"/>
        ${Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return `<path d="M40 42 L${(40 + 11 * Math.cos(a)).toFixed(1)} ${(42 + 11 * Math.sin(a)).toFixed(1)}" stroke="#FFF2D6" stroke-width="1.3"/>`; }).join("")}
        <circle cx="40" cy="42" r="2" fill="#FFF2D6"/>`,
  });
  D.mandarina = (c) => ({
    d: c.R("o", "#FFA94D", "#E25E0A", .4, .32, .8),
    b: `<ellipse cx="32" cy="38" rx="21" ry="17" fill="${c.u("o")}"/>
        ${[[22,32],[30,28],[40,31],[25,41],[36,40],[44,40],[31,47]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r=".8" fill="#C44E05" opacity=".5"/>`).join("")}
        <circle cx="32" cy="22" r="2" fill="#5C8C2E"/>${HOJA(33, 21, -20, "#4CAF50")}${BRILLO(21, 30, 4, 2.5, -30, .4)}`,
  });
  D.frutos_rojos = (c) => ({
    d: c.R("f", "#FF6B6B", "#C3122A", .38, .32, .8) + c.R("a", "#7C8CE0", "#2D3A8C", .38, .32, .8),
    b: `<path d="M26 20 C16 18 10 26 12 34 C14 44 22 52 26 54 C30 52 38 44 40 34 C42 26 36 18 26 20Z" fill="${c.u("f")}"/>
        ${[[20,28],[27,26],[33,29],[18,36],[25,34],[32,37],[22,43],[28,44]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx=".8" ry="1.2" fill="#FFE07A"/>`).join("")}
        <path d="M26 21 L18 16 L24 18 L26 12 L28 18 L34 16Z" fill="#3FA34D"/>
        <circle cx="45" cy="45" r="8" fill="${c.u("a")}"/><circle cx="50" cy="35" r="6" fill="${c.u("a")}"/>
        <path d="M43 42 l2 2 l2-2 M48 32.5 l2 1.5 l2 -1.5" stroke="#1D2766" stroke-width="1.1" fill="none"/>
        ${BRILLO(19, 26, 2, 3.5, 25, .45)}`,
  });
  D.kiwi = (c) => ({
    d: c.R("k", "#A8D85A", "#4F9A2A", .5, .5, .55),
    b: `<ellipse cx="32" cy="36" rx="22" ry="20" fill="#8B5E34"/>
        <ellipse cx="32" cy="36" rx="19.5" ry="17.5" fill="${c.u("k")}"/>
        <ellipse cx="32" cy="36" rx="6.5" ry="5.5" fill="#F4F2D8"/>
        ${Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; return `<ellipse cx="${(32 + 9 * Math.cos(a)).toFixed(1)}" cy="${(36 + 8 * Math.sin(a)).toFixed(1)}" rx=".9" ry="1.6" transform="rotate(${i * 30 + 90} ${(32 + 9 * Math.cos(a)).toFixed(1)} ${(36 + 8 * Math.sin(a)).toFixed(1)})" fill="#1E1A14"/>`; }).join("")}
        ${BRILLO(20, 28, 3, 1.6, -35, .35)}`,
  });
  D.higo = (c) => ({
    d: c.R("h", "#A77BC9", "#4A2462", .38, .3, .85) + c.R("in", "#FF8FA3", "#C8304F", .5, .55, .6),
    b: `<path d="M24 12 C26 12 27 15 27 18 C33 22 37 30 36 38 C35 46 29 50 22 50 C14 50 9 45 9 38 C9 30 15 22 21 18 C21 15 22 12 24 12Z" fill="${c.u("h")}"/>
        <path d="M24 13 C24 9 25 7 27 6" stroke="#6E8F3A" stroke-width="2.4" fill="none" stroke-linecap="round"/>
        <path d="M17 26 C14 32 14 40 17 46 M29 25 C32 31 32 40 29 46" stroke="#3A1A4D" stroke-width="1" fill="none" opacity=".4"/>
        ${BRILLO(16, 30, 2, 5.5, 20, .4)}
        <path d="M42 22 C44 22 45 24 45 26 C50 29 54 35 54 42 C54 50 48 55 42 55 C36 55 30 50 30 42 C30 35 34 29 39 26 C39 24 40 22 42 22Z" fill="#7A4A8F"/>
        <path d="M42 25.5 C43 25.5 43.5 27 43.5 28 C48 31 51.5 36 51.5 42 C51.5 48.5 47 52.5 42 52.5 C37 52.5 32.5 48.5 32.5 42 C32.5 36 36 31 40.5 28 C40.5 27 41 25.5 42 25.5Z" fill="#F7EBD6"/>
        <path d="M42 29 C46 32 49 37 49 42 C49 47.5 46 50.5 42 50.5 C38 50.5 35 47.5 35 42 C35 37 38 32 42 29Z" fill="${c.u("in")}"/>
        ${[[39,37],[44,36],[41,41],[46,42],[38,45],[43,46],[40,49],[45,49],[42,33]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx=".8" ry="1.3" fill="#FFE3A8"/>`).join("")}`,
  });
  D.mango = (c) => ({
    d: c.L("m", "#FFD23F", "#F25C2A", 1, 1, 0, 0),
    b: `<path d="M18 22 C30 14 48 18 53 30 C58 42 50 54 38 55 C28 56 22 50 18 42 C14 34 10 27 18 22Z" fill="${c.u("m")}"/>
        <path d="M20 21 C20 16 22 13 25 11" stroke="#5C4126" stroke-width="2" fill="none" stroke-linecap="round"/>${HOJA(23, 13, -10, "#3FA34D")}
        ${BRILLO(27, 28, 6, 3, -25, .4)}`,
  });
  D.durazno = (c) => ({
    d: c.R("d", "#FFD39A", "#F0705A", .35, .3, .85),
    b: `<path d="M32 22 C20 16 9 26 10 38 C11 50 22 56 32 55 C42 56 53 50 54 38 C55 26 44 16 32 22Z" fill="${c.u("d")}"/>
        <path d="M32 23 C27 32 27 44 31 54" stroke="#D9564A" stroke-width="1.4" fill="none" opacity=".45"/>
        ${HOJA(33, 21, -35, "#4CAF50")}${BRILLO(20, 32, 3, 5, 20, .45)}`,
  });
  D.chirimoya = (c) => ({
    d: c.R("c", "#B9E07D", "#4E8C2E", .38, .3, .85),
    b: `<path d="M32 20 C20 14 9 24 11 36 C13 48 24 55 32 56 C40 55 51 48 53 36 C55 24 44 14 32 20Z" fill="${c.u("c")}"/>
        ${[[22,28],[32,26],[42,28],[17,37],[27,35],[37,35],[47,37],[22,45],[32,44],[42,45],[27,52],[37,52]].map(([x,y])=>`<path d="M${x-4} ${y} C${x-3} ${y-4} ${x+3} ${y-4} ${x+4} ${y}" stroke="#3D7024" stroke-width="1.2" fill="none" opacity=".7"/>`).join("")}
        <path d="M31 21 C31 16 33 13 35 12" stroke="#5C4126" stroke-width="2" fill="none" stroke-linecap="round"/>${BRILLO(20, 30, 3, 5, 25, .35)}`,
  });
  D.aguaymanto = (c) => ({
    d: c.R("a", "#FFC94D", "#F07D0A", .38, .32, .8) + c.L("h", "#EBD9A8", "#C2A266"),
    b: `<path d="M32 36 C22 20 12 18 8 22 C10 34 20 44 32 46Z" fill="${c.u("h")}"/><path d="M32 36 C42 20 52 18 56 22 C54 34 44 44 32 46Z" fill="${c.u("h")}"/>
        <path d="M32 36 C26 16 30 8 32 6 C34 8 38 16 32 36Z" fill="${c.u("h")}" opacity=".9"/>
        <path d="M12 23 C18 28 24 34 30 38 M52 23 C46 28 40 34 34 38" stroke="#A88A50" stroke-width=".9" fill="none" opacity=".6"/>
        <circle cx="32" cy="44" r="11" fill="${c.u("a")}"/>${BRILLO(28, 40, 3, 2, -30, .55)}`,
  });
  D.pera = (c) => ({
    d: c.R("p", "#E5EE7A", "#8DB52D", .38, .35, .85),
    b: `<path d="M32 15 C26 15 25 22 25 27 C25 31 14 36 14 45 C14 52 22 56 32 56 C42 56 50 52 50 45 C50 36 39 31 39 27 C39 22 38 15 32 15Z" fill="${c.u("p")}"/>
        <path d="M32 16 C32 11 34 8 36 7" stroke="#6B4423" stroke-width="2" fill="none" stroke-linecap="round"/>${HOJA(34, 11, -20, "#4CAF50")}
        ${BRILLO(22, 42, 2.5, 5, 15, .45)}`,
  });
  D.pina = (c) => ({
    d: c.R("p", "#FFD54F", "#D98B0B", .4, .35, .8) + c.L("h", "#7CCB52", "#2E7D32"),
    b: `<path d="M32 22 C26 14 24 8 26 4 C29 9 31 13 32 18 C33 13 35 9 38 4 C40 8 38 14 32 22Z M32 22 C24 18 18 18 15 14 C22 13 28 15 32 20 C36 15 42 13 49 14 C46 18 40 18 32 22Z" fill="${c.u("h")}"/>
        <ellipse cx="32" cy="39" rx="15" ry="17" fill="${c.u("p")}"/>
        <path d="M19 30 L37 52 M23 24 L45 50 M30 22 L47 42 M45 30 L27 52 M41 24 L19 50 M34 22 L17 42" stroke="#B36B08" stroke-width="1.1" opacity=".55"/>
        ${BRILLO(25, 32, 2.5, 6, 20, .35)}`,
  });
  D.uvas = (c) => ({
    d: c.R("u", "#B07CE0", "#5B2A8C", .38, .32, .8),
    b: `<path d="M32 16 C32 11 34 8 37 7" stroke="#6B4423" stroke-width="2" fill="none" stroke-linecap="round"/>${HOJA(35, 10, -15, "#5BB04A")}
        ${[[24,22],[34,21],[44,23],[19,31],[29,30],[39,30],[49,32],[24,39],[34,39],[44,40],[29,47],[39,47],[34,54]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5.6" fill="${c.u("u")}"/><circle cx="${x-1.8}" cy="${y-2}" r="1.3" fill="#fff" opacity=".5"/>`).join("")}`,
    s: 1,
  });
  D.sandia = (c) => ({
    d: c.L("r", "#FF6B6B", "#E5303A"),
    b: `<path d="M6 24 A26 26 0 0 0 58 24Z" fill="#2E8B3E"/><path d="M9 24 A23 23 0 0 0 55 24Z" fill="#CDEDB8"/>
        <path d="M11 24 A21 21 0 0 0 53 24Z" fill="${c.u("r")}"/>
        ${[[22,30],[32,32],[42,30],[27,38],[37,38],[32,44]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="1.1" ry="1.8" fill="#2B1B14"/>`).join("")}
        <path d="M14 26 C18 26 22 26 26 25" stroke="#fff" stroke-width="2" opacity=".35" stroke-linecap="round"/>`,
  });
  D.melon = (c) => ({
    d: c.R("m", "#FFC78A", "#F08A3C", .5, .4, .7),
    b: `<path d="M6 30 A26 22 0 0 0 58 30Z" fill="#B7C978"/><path d="M8 30 A24 20 0 0 0 56 30Z" fill="#E9F2C6"/>
        <path d="M11 30 A21 17 0 0 0 53 30Z" fill="${c.u("m")}"/>
        <path d="M20 30 C22 38 42 38 44 30Z" fill="#FBE4C2"/>
        ${[[24,32],[29,34],[34,34],[39,32],[27,31],[37,31]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="1.4" ry=".8" fill="#FFF7E6"/>`).join("")}
        <ellipse cx="32" cy="30" rx="26" ry="2" fill="#F7E4BE"/>`,
  });

  /* =========================== GRASAS =========================== */
  D.palta = (c) => ({
    d: c.R("i", "#F2F7A8", "#A9CF4F", .5, .55, .65) + c.R("s", "#C08A55", "#6E4321", .38, .32, .8),
    b: `<path d="M32 8 C22 8 19 20 16 30 C12 42 18 56 32 56 C46 56 52 42 48 30 C45 20 42 8 32 8Z" fill="#2F5D1E"/>
        <path d="M32 11 C24 11 22 21 19 31 C16 42 21 53 32 53 C43 53 48 42 45 31 C42 21 40 11 32 11Z" fill="${c.u("i")}"/>
        <circle cx="32" cy="38" r="9" fill="${c.u("s")}"/>${BRILLO(29, 35, 2.4, 1.6, -30, .5)}`,
  });
  D.aceite = (c) => ({
    d: c.L("v", "#D8E37A", "#7F9A1E", 1, 0) + c.L("t", "#5B6B2E", "#2F3A14"),
    b: `<path d="M27 8 H37 V20 C37 23 45 26 45 33 V52 C45 54 43 56 41 56 H23 C21 56 19 54 19 52 V33 C19 26 27 23 27 20Z" fill="${c.u("v")}"/>
        <rect x="26" y="4" width="12" height="7" rx="2" fill="${c.u("t")}"/>
        <rect x="21" y="35" width="22" height="13" rx="2" fill="#FFF9E8"/>
        <ellipse cx="29" cy="41.5" rx="3" ry="2" fill="#4D6B1F"/><ellipse cx="35" cy="41.5" rx="3" ry="2" fill="#6E8F2A"/>
        ${BRILLO(23, 29, 1.6, 4.5, 15, .5)}`,
  });
  D.aceitunas = (c) => ({
    d: c.R("o", "#5C5470", "#15121C", .38, .32, .8),
    b: `<ellipse cx="24" cy="38" rx="11" ry="14" transform="rotate(-20 24 38)" fill="${c.u("o")}"/>
        <ellipse cx="42" cy="40" rx="11" ry="14" transform="rotate(15 42 40)" fill="${c.u("o")}"/>
        <ellipse cx="25" cy="27" rx="1.8" ry="1.2" fill="#000" opacity=".6"/>
        ${BRILLO(19, 33, 2, 4.5, 15, .45)}${BRILLO(38, 34, 2, 4.5, -15, .45)}
        <path d="M30 22 C34 12 44 10 50 12 C46 18 38 22 30 22Z" fill="#7DAA3E"/><path d="M30 22 C36 18 42 15 48 13" stroke="#4E7A1F" stroke-width=".9" fill="none"/>`,
  });
  const almendra = (c, x, y, rot) => `<g transform="rotate(${rot} ${x} ${y})"><path d="M${x} ${y - 11} C${x + 8} ${y - 6} ${x + 8} ${y + 6} ${x} ${y + 11} C${x - 8} ${y + 6} ${x - 8} ${y - 6} ${x} ${y - 11}Z" fill="${c.u("a")}"/>
      <path d="M${x - 3} ${y - 5} C${x - 2} ${y} ${x - 2} ${y + 4} ${x - 1} ${y + 7} M${x + 2} ${y - 6} C${x + 3} ${y - 1} ${x + 3} ${y + 3} ${x + 2} ${y + 6}" stroke="#7A4519" stroke-width=".9" fill="none" opacity=".55"/></g>`;
  D.almendras = (c) => ({ d: c.R("a", "#E4A86A", "#9A5A26", .38, .3, .8), b: almendra(c, 21, 38, -30) + almendra(c, 43, 38, 30) + almendra(c, 32, 30, 0) });
  function semillas(c, col1, col2, rx, ry, pos, raya) {
    return {
      d: c.R("s", col1, col2, .38, .3, .8),
      b: pos.map(([x, y, r]) => `<g transform="rotate(${r} ${x} ${y})"><ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${c.u("s")}"/>${raya ? `<path d="M${x} ${y - ry + 1} V${y + ry - 1}" stroke="${raya}" stroke-width="${rx * .45}"/>` : ""}</g>`).join(""),
    };
  }
  const PS = [[20,36,-30],[32,30,10],[44,36,40],[26,46,-60],[40,47,70],[33,41,0]];
  D.semilla_calabaza = (c) => semillas(c, "#A8D46F", "#4E8A2A", 5.5, 9, PS);
  D.semilla_girasol = (c) => {
    const r = semillas(c, "#8A8392", "#34303A", 5.2, 9, PS);
    r.b = r.b.replace(/fill="url\(#ni-semilla_girasol-s\)"/g, `fill="${c.u("s")}" stroke="#A9A2B0" stroke-width=".8"`);
    r.b += PS.map(([x, y, a]) => `<g transform="rotate(${a} ${x} ${y})"><path d="M${x - 2.2} ${y - 6} V${y + 6} M${x + 2.2} ${y - 6} V${y + 6}" stroke="#EDE7DA" stroke-width="1.1" stroke-linecap="round"/></g>`).join("");
    return r;
  };
  D.ajonjoli = (c) => semillas(c, "#FFF6DD", "#D9BE86", 2, 3.6,
    [[16,40,-20],[22,34,20],[28,40,-40],[34,33,10],[40,40,30],[46,34,-10],[20,47,50],[27,48,0],[34,46,-30],[41,48,20],[48,44,60],[31,26,0],[24,27,-50],[38,27,40],[44,28,0]]);
  D.nueces = (c) => ({
    d: c.R("n", "#D9A066", "#8B5523", .38, .3, .85),
    b: `<circle cx="32" cy="35" r="19" fill="${c.u("n")}"/>
        <path d="M32 16 C29 25 35 30 32 35 C29 40 35 46 32 54" stroke="#6E3F17" stroke-width="2" fill="none"/>
        <path d="M18 28 C22 30 24 28 26 31 M17 40 C22 38 24 42 27 41 M38 26 C41 29 44 27 47 30 M38 41 C42 39 44 43 48 41" stroke="#7A4A1E" stroke-width="1.4" fill="none" opacity=".6" stroke-linecap="round"/>
        ${BRILLO(23, 25, 4, 2.5, -35, .4)}`,
  });

  /* =========================== LÁCTEOS Y BEBIDAS =========================== */
  D.yogur = (c) => ({
    d: c.L("v", "#FFFFFF", "#DCE3EA", 1, 0) + c.L("e", "#9CC9F5", "#4C8FD6"),
    b: `<path d="M14 24 H50 L46 54 C46 56 44 57 42 57 H22 C20 57 18 56 18 54Z" fill="${c.u("v")}"/>
        <path d="M15.3 34 H48.7 L47.4 44 H16.6Z" fill="${c.u("e")}"/>
        <path d="M12 22 C12 16 52 16 52 22 C52 26 12 26 12 22Z" fill="#F5F0E3"/>
        <path d="M16 21 C20 18 28 19 32 21 C36 18 44 18 48 21" fill="#FFFFFF"/>
        <path d="M38 20 L48 6" stroke="#B9C3CD" stroke-width="3" stroke-linecap="round"/><ellipse cx="49" cy="5" rx="3" ry="2.2" transform="rotate(-55 49 5)" fill="#CDD5DD"/>
        ${BRILLO(20, 46, 1.4, 4, 5, .6)}`,
    s: 0,
  });
  D.leche = (c) => ({
    d: c.L("v", "#E9F2FA", "#B9CEDF", 1, 0) + c.L("l", "#FFFFFF", "#EEF2F6"),
    b: `<path d="M17 10 H47 L43 54 C43 56 41 57 39 57 H25 C23 57 21 56 21 54Z" fill="${c.u("v")}" opacity=".75"/>
        <path d="M18.4 22 C26 19 38 25 45.6 22 L43 54 C43 56 41 57 39 57 H25 C23 57 21 56 21 54Z" fill="${c.u("l")}"/>
        <ellipse cx="32" cy="10" rx="15" ry="2" fill="#DCE8F2"/>${BRILLO(22, 38, 1.4, 10, 3, .7)}`,
  });
  D.cottage = (c) => ({
    d: c.L("v", "#EAF4FF", "#A7C4E0", 1, 0) + c.R("q", "#FFFFFF", "#ECE8DB", .4, .4, .7),
    b: `<path d="M10 30 H54 L50 54 C50 56 48 57 46 57 H18 C16 57 14 56 14 54Z" fill="${c.u("v")}"/>
        <rect x="16" y="38" width="32" height="9" rx="2" fill="#5B9BD5"/>
        <ellipse cx="32" cy="30" rx="22" ry="4" fill="#D5E4F1"/>
        ${[[18,28,4.5],[26,25,5],[35,24,5],[44,27,4.5],[22,30,3.5],[31,29,4],[40,30,3.5]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${c.u("q")}"/>`).join("")}`,
  });
  D.batido = (c) => ({
    d: c.L("v", "#F1F4F8", "#AFBACB", 1, 0) + c.L("l", "#B67B53", "#7A4528") + c.L("t", "#3E4A5C", "#1E2633"),
    b: `<path d="M18 18 H46 L43 54 C43 56 41 57 39 57 H25 C23 57 21 56 21 54Z" fill="${c.u("v")}" opacity=".85"/>
        <path d="M19.5 30 H44.5 L43 54 C43 56 41 57 39 57 H25 C23 57 21 56 21 54Z" fill="${c.u("l")}"/>
        <rect x="16" y="11" width="32" height="9" rx="3" fill="${c.u("t")}"/><rect x="27" y="5" width="10" height="7" rx="2" fill="${c.u("t")}"/>
        <path d="M24 36 H40 M24 42 H38 M24 48 H36" stroke="#fff" stroke-width="1" opacity=".35"/>
        ${BRILLO(23, 26, 1.3, 4, 3, .6)}`,
  });
  D.suplemento = (c) => ({
    d: c.L("v", "#FFFFFF", "#D9DEE5", 1, 0) + c.L("t", "#E9B949", "#B07D18"),
    b: `<rect x="17" y="18" width="30" height="38" rx="7" fill="${c.u("v")}"/>
        <rect x="21" y="9" width="22" height="11" rx="3" fill="${c.u("t")}"/>
        <path d="M21 13 H43 M21 16 H43" stroke="#8A5F0E" stroke-width=".8" opacity=".5"/>
        <rect x="17" y="30" width="30" height="16" fill="#E6B84A" opacity=".9"/>
        <path d="M27 38 h10 M32 33 v10" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
        ${BRILLO(21, 40, 1.4, 8, 0, .5)}`,
  });

  /* =========================== NUTRICIÓN / A LIMITAR =========================== */
  D.calorias = (c) => ({
    d: c.L("r", "#FFE45C", "#FF8A00", 1, 1),
    b: `<path d="M37 5 L14 36 H30 L26 59 L50 26 H34Z" fill="${c.u("r")}" stroke="#E07000" stroke-width="1.2" stroke-linejoin="round"/>
        <path d="M34 11 L20 32" stroke="#fff" stroke-width="2.2" opacity=".55" stroke-linecap="round"/>`,
    s: 0,
  });
  D.balanza = (c) => ({
    d: c.L("b", "#F4F6F9", "#B8C2CE", 1, 1) + c.L("v", "#2B3442", "#121821"),
    b: `<rect x="7" y="16" width="50" height="38" rx="11" fill="${c.u("b")}"/>
        <rect x="9.5" y="18.5" width="45" height="33" rx="9" fill="none" stroke="#fff" stroke-opacity=".6"/>
        <rect x="21" y="22" width="22" height="10" rx="3" fill="${c.u("v")}"/>
        ${TXT(32, 30.2, 7.5, "72.4", "#7CF2C5", null, 700)}
        <rect x="15" y="40" width="12" height="8" rx="3" fill="#D3DAE3"/><rect x="37" y="40" width="12" height="8" rx="3" fill="#D3DAE3"/>`,
  });
  D.fotos = (c) => ({
    d: c.L("cielo", "#7CC6FF", "#BEE6FF") + c.L("m", "#5DBB63", "#2E8B3E"),
    b: `<rect x="7" y="12" width="50" height="42" rx="7" fill="#F6F7F9"/>
        <rect x="11" y="16" width="42" height="34" rx="4" fill="${c.u("cielo")}"/>
        <circle cx="42" cy="25" r="4.5" fill="#FFD447"/>
        <path d="M11 50 L24 32 L33 43 L39 36 L53 50Z" fill="${c.u("m")}"/>
        <rect x="7" y="12" width="50" height="42" rx="7" fill="none" stroke="#D0D6DE" stroke-width="1"/>`,
  });
  D.carbs_netos = (c) => {
    const p = D.papa(c);
    return { d: p.d, b: p.b + `<circle cx="49" cy="17" r="9" fill="#2FB36B"/>` + TXT(49, 21, 11, "N", "#fff") };
  };
  function gota(c, a, b, letra) {
    return {
      d: c.R("g", a, b, .4, .35, .8),
      b: `<path d="M32 6 C32 6 14 28 14 39 C14 49 22 56 32 56 C42 56 50 49 50 39 C50 28 32 6 32 6Z" fill="${c.u("g")}"/>
          ${BRILLO(23, 37, 3, 7, 20, .5)}${letra ? TXT(34, 47, 15, letra, "#fff", oscuro(b, .2)) : ""}`,
    };
  }
  D.grasa_saturada = (c) => gota(c, "#FFE680", "#E0A100", "S");
  D.grasa_trans = (c) => gota(c, "#FFC07A", "#D9541E", "T");
  D.agua = (c) => gota(c, "#9FE0FF", "#1E88E5");
  const terron = (x, y, s) => `<path d="M${x} ${y} l${s * .45} -${s * .35} h${s} l-${s * .45} ${s * .35}z" fill="#FFFFFF"/>
      <path d="M${x + s} ${y} l${s * .45} -${s * .35} v${s} l-${s * .45} ${s * .35}z" fill="#C9D3DD"/>
      <rect x="${x}" y="${y}" width="${s}" height="${s}" fill="#EEF2F6"/>
      ${[[.3,.3],[.7,.5],[.4,.75],[.75,.2]].map(([a,b])=>`<circle cx="${x + s * a}" cy="${y + s * b}" r=".8" fill="#D2DAE3"/>`).join("")}`;
  D.azucares = () => ({ b: terron(10, 33, 20) + terron(30, 35, 18) + terron(20, 18, 17) });
  D.azucares_anadidos = () => ({ b: terron(10, 33, 20) + terron(30, 35, 18) + terron(20, 18, 17) + `<circle cx="49" cy="17" r="9" fill="#F0567A"/>` + TXT(49, 21.5, 14, "+", "#fff") });
  D.sal = (c) => ({
    d: c.L("v", "#F4F8FB", "#BCCBD8", 1, 0) + c.L("t", "#D7DEE6", "#8E9BAA"),
    b: `<path d="M20 26 C20 20 44 20 44 26 L46 52 C46 55 44 57 41 57 H23 C20 57 18 55 18 52Z" fill="${c.u("v")}"/>
        <path d="M21 14 C21 8 43 8 43 14 V26 H21Z" fill="${c.u("t")}"/>
        <circle cx="27" cy="13" r="1.3" fill="#5E6A78"/><circle cx="32" cy="11.5" r="1.3" fill="#5E6A78"/><circle cx="37" cy="13" r="1.3" fill="#5E6A78"/><circle cx="32" cy="16" r="1.3" fill="#5E6A78"/>
        <path d="M19.6 36 H44.4 L45.6 52 C45.6 55 43.6 57 41 57 H23 C20.4 57 18.4 55 18.4 52Z" fill="#fff"/>
        ${[[25,44],[30,48],[36,45],[40,50],[28,53],[34,52]].map(([x,y])=>`<rect x="${x}" y="${y}" width="1.6" height="1.6" fill="#D0D9E2" transform="rotate(30 ${x} ${y})"/>`).join("")}
        ${BRILLO(22, 32, 1.3, 5, 3, .6)}`,
  });

  /* =========================== OTROS =========================== */
  D.calidad = (c) => ({
    d: c.R("o", "#FFE77A", "#E0A100", .38, .3, .8),
    b: `<path d="M22 6 L30 26 L24 28 Z" fill="#E5484D"/><path d="M42 6 L34 26 L40 28 Z" fill="#3E63DD"/>
        <path d="M18 6 H28 L33 24 H27Z" fill="#E5484D"/><path d="M46 6 H36 L31 24 H37Z" fill="#3E63DD"/>
        <circle cx="32" cy="39" r="16" fill="${c.u("o")}"/><circle cx="32" cy="39" r="12" fill="none" stroke="#C98A00" stroke-width="1.3"/>
        <path d="M32 30 L34.6 35.6 L40.6 36.2 L36 40.2 L37.4 46 L32 43 L26.6 46 L28 40.2 L23.4 36.2 L29.4 35.6Z" fill="#FFF7D1"/>`,
  });
  D.alcohol = (c) => ({
    d: c.L("b", "#4E8A4A", "#1D3D20", 1, 0),
    b: `<path d="M27 4 H37 V20 C37 24 44 26 44 34 V54 C44 56 42 57 40 57 H24 C22 57 20 56 20 54 V34 C20 26 27 24 27 20Z" fill="${c.u("b")}"/>
        <rect x="26.5" y="3" width="11" height="8" rx="1.5" fill="#8E1B2F"/>
        <rect x="22" y="36" width="20" height="14" rx="2" fill="#F5E9D3"/>
        <path d="M27 43 C29 39 35 39 37 43" stroke="#8E1B2F" stroke-width="2" fill="none"/>
        ${BRILLO(24, 30, 1.4, 5, 12, .45)}`,
  });
  D.pasos = (c) => ({
    d: c.L("z", "#FF7A59", "#E5484D", 1, 0),
    b: `<path d="M6 44 C6 36 12 34 16 34 C20 34 22 30 24 26 L30 22 C33 28 38 30 44 31 C52 33 58 37 58 44Z" fill="${c.u("z")}"/>
        <path d="M6 44 H58 V49 C58 51 56 52 54 52 H10 C8 52 6 51 6 49Z" fill="#F4F6F9"/>
        <path d="M6 47 H58" stroke="#D0D6DE" stroke-width="1"/>
        <path d="M28 27 L33 30 M26 31 L31 34 M24 35 L29 38" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M40 34 C44 34 48 37 50 41" stroke="#fff" stroke-width="2" fill="none" opacity=".6" stroke-linecap="round"/>`,
  });
  D.sueno = (c) => ({
    d: c.R("l", "#FFF1A8", "#F2B705", .3, .3, .9),
    b: `<path d="M40 8 C26 10 16 22 17 36 C18 50 31 59 45 56 C50 55 54 52 56 48 C44 52 32 44 30 32 C28 22 33 13 40 8Z" fill="${c.u("l")}"/>
        <path d="M47 14 l1.5 3.6 l3.8 .4 l-2.9 2.5 l.9 3.7 l-3.3 -2 l-3.3 2 l.9 -3.7 l-2.9 -2.5 l3.8 -.4Z" fill="#FFD447"/>
        <circle cx="54" cy="30" r="1.6" fill="#FFD447"/><circle cx="12" cy="18" r="1.3" fill="#FFD447"/>
        ${BRILLO(24, 30, 2.5, 7, 15, .45)}`,
  });

  /* =========================== VITAMINAS (ositos de goma) =========================== */
  const VIT = {
    a: ["A", "#F76808"], b1: ["B1", "#E93D82"], b2: ["B2", "#8E4EC6"], b3: ["B3", "#3E63DD"], b5: ["B5", "#0091FF"],
    b6: ["B6", "#05A2C2"], b12: ["B12", "#E5484D"], c: ["C", "#FFB224"], d: ["D", "#F5D90A"], e: ["E", "#99D52A"],
    k: ["K", "#30A46C"], folato: ["B9", "#12A594"],
  };
  function osito(c, etiqueta, col) {
    const cl = claro(col, .45), os = oscuro(col, .28), txt = luz(col) > .6 ? oscuro(col, .62) : "#FFFFFF";
    const st = luz(col) > .6 ? claro(col, .55) : oscuro(col, .35);
    const fs = etiqueta.length >= 3 ? 10.5 : 13;
    return {
      d: `<radialGradient id="${c.u("o").slice(5,-1)}" cx=".38" cy=".3" r=".9"><stop offset="0" stop-color="${claro(col, .6)}"/><stop offset=".55" stop-color="${claro(col, .12)}"/><stop offset="1" stop-color="${oscuro(col, .12)}"/></radialGradient>`,
      b: `<g opacity=".97">
          <circle cx="20.5" cy="11" r="5.2" fill="${c.u("o")}"/><circle cx="43.5" cy="11" r="5.2" fill="${c.u("o")}"/>
          <ellipse cx="17" cy="35" rx="5" ry="7.5" transform="rotate(35 17 35)" fill="${c.u("o")}"/>
          <ellipse cx="47" cy="35" rx="5" ry="7.5" transform="rotate(-35 47 35)" fill="${c.u("o")}"/>
          <ellipse cx="22.5" cy="52" rx="7.5" ry="5.6" fill="${c.u("o")}"/><ellipse cx="41.5" cy="52" rx="7.5" ry="5.6" fill="${c.u("o")}"/>
          <ellipse cx="32" cy="40" rx="14.5" ry="14" fill="${c.u("o")}"/>
          <ellipse cx="32" cy="18.5" rx="12.5" ry="10.5" fill="${c.u("o")}"/></g>
          <ellipse cx="32" cy="22" rx="4.4" ry="3.2" fill="${cl}" opacity=".85"/>
          <ellipse cx="32" cy="20.8" rx="1.6" ry="1.1" fill="${oscuro(col, .55)}"/>
          <circle cx="27" cy="16.5" r="1.4" fill="${oscuro(col, .6)}"/><circle cx="37" cy="16.5" r="1.4" fill="${oscuro(col, .6)}"/>
          <ellipse cx="32" cy="41.5" rx="9.5" ry="9" fill="#fff" opacity=".22"/>
          ${BRILLO(25, 13, 3, 1.6, -35, .6)}${BRILLO(22, 34, 1.8, 4, 25, .4)}
          ${TXT(32, 41.5 + fs * .36, fs, etiqueta, txt, st, 900)}`,
    };
  }
  Object.keys(VIT).forEach((k) => { D["vit_" + k] = (c) => osito(c, VIT[k][0], VIT[k][1]); });

  /* =========================== MINERALES (cubos con símbolo) =========================== */
  const MIN = {
    calcio: ["Ca", 20, "#DCE6F0"], hierro: ["Fe", 26, "#C8553D"], magnesio: ["Mg", 12, "#8CC9A0"], fosforo: ["P", 15, "#F0703A"],
    potasio: ["K", 19, "#B58BE0"], zinc: ["Zn", 30, "#8FA9C2"], selenio: ["Se", 34, "#B86A6A"], cobre: ["Cu", 29, "#D27D46"],
    manganeso: ["Mn", 25, "#D07DB0"], sodio: ["Na", 11, "#7EC4F5"],
  };
  function mineral(c, sim, z, col) {
    const claroTxt = luz(col) > .55;
    const t = claroTxt ? oscuro(col, .65) : "#FFFFFF";
    const st = claroTxt ? claro(col, .6) : oscuro(col, .35);
    return {
      d: c.L("f", claro(col, .35), col, 1, 1) + c.L("s", oscuro(col, .08), oscuro(col, .3), 1, 0),
      b: cubo(c, c.u("f"), claro(col, .6), c.u("s"), 11, 22, 32, 11,
        `<rect x="11" y="22" width="32" height="32" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.2"/>
         <path d="M14 25 H24" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".55"/>
         ${TXT(15.5, 31, 6, z, t, null, 700).replace('text-anchor="middle"', 'text-anchor="start"').replace('x="15.5"', 'x="14"')}
         ${TXT(27, 45.5, sim.length > 1 ? 15 : 17, sim, t, st, 900)}`),
      s: 1,
    };
  }
  Object.keys(MIN).forEach((k) => { D["min_" + k] = (c) => mineral(c, MIN[k][0], MIN[k][1], MIN[k][2]); });

  /* =========================== API =========================== */
  function svg(clave, size = 40, attrs = "") {
    const fn = D[clave] || D.plato;
    const c = ctx("ni-" + clave + "-");
    const r = fn(c);
    const sombra = r.s === 0 ? "" : SOMBRA(r.s === 1 ? 15 : 17);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}" role="img" aria-label="${(NOMBRES[clave] || clave).replace(/"/g, "")}" ${attrs}><defs>${r.d || ""}</defs>${sombra}${r.b}</svg>`;
  }

  D.plato = (c) => ({
    d: c.R("p", "#FFFFFF", "#D3DBE4", .45, .4, .7),
    b: `<ellipse cx="32" cy="40" rx="26" ry="13" fill="${c.u("p")}"/><ellipse cx="32" cy="39" rx="17" ry="8" fill="none" stroke="#C7D0DA"/>
        <path d="M22 37 C22 30 42 30 42 37Z" fill="#7CCB52"/><circle cx="36" cy="34" r="3.5" fill="#FF7A6B"/><path d="M24 35 C27 32 30 33 31 36Z" fill="#F2B66B"/>`,
  });

  /* Alimentos de la base de NutriApp (id -> clave) */
  const POR_ID = {
    f01: "pollo", f03: "huevo", f37: "clara", f31: "pavo", f32: "pescado", f33: "tilapia", f34: "salmon", f05: "tofu",
    f06: "lentejas", f07: "garbanzos", f35: "tarwi", f38: "arveja", f66: "arveja", f39: "frijol",
    f08: "avena", f09: "arroz_integral", f10: "arroz", f11: "papa", f12: "camote", f13: "pan", f48: "pan_integral", f14: "quinua", f36: "arracacha",
    f15: "brocoli", f17: "zanahoria", f18: "ensalada", f19: "tomate", f49: "zapallo", f50: "pimiento", f51: "coliflor", f52: "olluco",
    f20: "manzana", f21: "platano", f22: "naranja", f23: "frutos_rojos", f40: "kiwi", f41: "mango", f42: "durazno", f43: "mandarina",
    f44: "chirimoya", f53: "aguaymanto", f54: "pera", f55: "pina", f56: "uvas", f57: "sandia", f58: "melon", f65: "higo", f59: "yuca", f60: "miel",
    f24: "palta", f25: "aceite", f61: "aceitunas", f26: "almendras", f45: "semilla_calabaza", f46: "ajonjoli", f47: "semilla_girasol", f62: "nueces",
    f27: "yogur", f28: "leche", f29: "cottage", f30: "batido", f63: "suplemento", f64: "suplemento",
  };
  /* Para alimentos nuevos o personalizados: por palabra clave del nombre, y si no, por categoría */
  const POR_PALABRA = [
    [/pollo|gallina/, "pollo"], [/pavo/, "pavo"], [/clara/, "clara"], [/huevo/, "huevo"], [/salm[oó]n/, "salmon"], [/tilapia/, "tilapia"],
    [/pescado|bonito|at[uú]n|caballa|jurel|merluza|trucha|perico/, "pescado"], [/res|carne|bistec|lomo|cerdo|chancho|cordero|h[ií]gado/, "carne"], [/tofu/, "tofu"],
    [/lenteja/, "lentejas"], [/garbanzo/, "garbanzos"], [/tarwi|chocho/, "tarwi"], [/arveja|alverja|guisante/, "arveja"], [/frijol|fr[eé]jol|poroto|haba/, "frijol"],
    [/avena|salvado|trigo|cebada/, "avena"], [/arroz integral/, "arroz_integral"], [/arroz/, "arroz"], [/camote|batata/, "camote"], [/papa|patata/, "papa"],
    [/pan integral/, "pan_integral"], [/pan|tostada|galleta/, "pan"], [/quinoa|quinua|kiwicha|amaranto/, "quinua"], [/arracacha|racacha/, "arracacha"], [/yuca|mandioca/, "yuca"], [/olluco|oca/, "olluco"],
    [/br[oó]coli/, "brocoli"], [/zanahoria/, "zanahoria"], [/ensalada|lechuga|espinaca|acelga/, "ensalada"], [/tomate/, "tomate"], [/zapallo|calabaza(?! ?tost)/, "zapallo"],
    [/pimiento|aj[ií]/, "pimiento"], [/coliflor/, "coliflor"],
    [/manzana/, "manzana"], [/pl[aá]tano|banana/, "platano"], [/mandarina/, "mandarina"], [/naranja|lim[oó]n|toronja/, "naranja"], [/fresa|frutilla|ar[aá]ndano|frambuesa|mora/, "frutos_rojos"],
    [/kiwi/, "kiwi"], [/mango/, "mango"], [/higo|breva/, "higo"], [/durazno|melocot[oó]n/, "durazno"], [/chirimoya|guan[aá]bana/, "chirimoya"], [/aguaymanto/, "aguaymanto"], [/pera/, "pera"],
    [/pi[ñn]a/, "pina"], [/uva|pasas/, "uvas"], [/sand[ií]a/, "sandia"], [/mel[oó]n|papaya/, "melon"], [/miel|azúcar|azucar/, "miel"],
    [/palta|aguacate/, "palta"], [/aceituna|oliva negra/, "aceitunas"], [/aceite/, "aceite"], [/almendra|man[ií]|cacahuate/, "almendras"],
    [/semilla de calabaza|pepita/, "semilla_calabaza"], [/ajonjol[ií]|s[eé]samo/, "ajonjoli"], [/girasol|ch[ií]a|linaza/, "semilla_girasol"], [/nuez|nueces|pecana/, "nueces"],
    [/yogur|yogurt/, "yogur"], [/leche/, "leche"], [/queso|cottage|reques[oó]n/, "cottage"], [/batido|whey|prote[ií]na en polvo/, "batido"], [/ensure|suplemento|m[oó]dulo/, "suplemento"],
  ];
  const POR_CATEGORIA = { proteina: "pollo", menestra: "lentejas", carbohidrato: "papa", quinua: "quinua", vegetal: "brocoli", fruta: "manzana", grasa: "palta", lacteo: "yogur" };
  function claveDeAlimento(a) {
    if (!a) return "plato";
    if (a.icono && D[a.icono]) return a.icono;
    if (a.id && POR_ID[a.id]) return POR_ID[a.id];
    const n = (a.nombre || "").toLowerCase();
    for (const [re, k] of POR_PALABRA) if (re.test(n)) return k;
    return POR_CATEGORIA[a.categoria] || "plato";
  }

  const NOMBRES = {
    pollo: "Pollo", pavo: "Pavo", huevo: "Huevo", clara: "Clara de huevo", pescado: "Pescado / bonito", tilapia: "Tilapia", salmon: "Salmón", tofu: "Tofu", carne: "Carne",
    lentejas: "Lentejas", garbanzos: "Garbanzos", tarwi: "Tarwi", arveja: "Arveja partida", frijol: "Frijol",
    avena: "Avena", arroz_integral: "Arroz integral", arroz: "Arroz blanco", papa: "Papa", camote: "Camote", pan: "Pan de masa madre", pan_integral: "Pan integral",
    quinua: "Quinua", arracacha: "Arracacha", yuca: "Yuca", olluco: "Olluco", miel: "Miel",
    brocoli: "Brócoli", zanahoria: "Zanahoria", ensalada: "Ensalada", tomate: "Tomate", zapallo: "Zapallo", pimiento: "Pimiento", coliflor: "Coliflor",
    manzana: "Manzana", platano: "Plátano", naranja: "Naranja", mandarina: "Mandarina", frutos_rojos: "Frutos rojos", kiwi: "Kiwi", mango: "Mango",
    durazno: "Durazno", chirimoya: "Chirimoya", aguaymanto: "Aguaymanto", pera: "Pera", pina: "Piña", uvas: "Uvas", sandia: "Sandía", higo: "Higo", melon: "Melón",
    palta: "Palta", aceite: "Aceite de oliva", aceitunas: "Aceitunas", almendras: "Almendras", semilla_calabaza: "Semilla de calabaza",
    ajonjoli: "Ajonjolí", semilla_girasol: "Semilla de girasol", nueces: "Nueces",
    yogur: "Yogur griego", leche: "Leche", cottage: "Queso cottage", batido: "Batido de proteína", suplemento: "Suplemento nutricional", plato: "Alimento",
    calorias: "Calorías", balanza: "Peso balanza", fotos: "Fotos", carbohidratos: "Carbohidratos", proteina: "Proteína", grasas: "Grasas", fibra: "Fibra",
    carbs_netos: "Carbs netos", grasa_saturada: "Grasa saturada", grasa_trans: "Grasa trans", azucares: "Azúcares", azucares_anadidos: "Azúcares añadidos",
    sal: "Sal", sodio: "Sodio", agua: "Agua", calidad: "Calidad de alimentos", alcohol: "Alcohol", pasos: "Pasos", sueno: "Sueño",
    vit_a: "Vitamina A", vit_b1: "Vitamina B1", vit_b2: "Vitamina B2", vit_b3: "Vitamina B3", vit_b5: "Vitamina B5", vit_b6: "Vitamina B6",
    vit_b12: "Vitamina B12", vit_c: "Vitamina C", vit_d: "Vitamina D", vit_e: "Vitamina E", vit_k: "Vitamina K", vit_folato: "Folato",
    min_calcio: "Calcio", min_hierro: "Hierro", min_magnesio: "Magnesio", min_fosforo: "Fósforo", min_potasio: "Potasio", min_zinc: "Zinc",
    min_selenio: "Selenio", min_cobre: "Cobre", min_manganeso: "Manganeso", min_sodio: "Sodio",
  };
  /* Alias de nutrientes que reutilizan dibujos (como en la referencia) */
  D.carbohidratos = D.papa; D.proteina = D.carne; D.grasas = D.palta; D.fibra = D.avena; D.sodio = D.min_sodio;

  const GRUPOS = {
    alimentos: Object.values(POR_ID).filter((v, i, a) => a.indexOf(v) === i).concat(["carne", "plato"]),
    nutricion: ["calorias", "balanza", "fotos", "carbohidratos", "proteina", "grasas", "fibra", "carbs_netos"],
    limitar: ["grasa_saturada", "grasa_trans", "azucares", "azucares_anadidos", "sal", "sodio"],
    vitaminas: Object.keys(VIT).map((k) => "vit_" + k),
    minerales: ["min_calcio", "min_hierro", "min_magnesio", "min_fosforo", "min_potasio", "min_zinc", "min_selenio", "min_cobre", "min_manganeso"],
    otros: ["agua", "calidad", "alcohol", "pasos", "sueno"],
  };

  global.NutriIconos = {
    svg,
    alimento: (a, size = 40, attrs = "") => svg(claveDeAlimento(a), size, attrs),
    claveDeAlimento,
    nombre: (k) => NOMBRES[k] || k,
    grupos: GRUPOS,
    porId: POR_ID,
    claves: Object.keys(D),
  };
})(typeof window !== "undefined" ? window : globalThis);
