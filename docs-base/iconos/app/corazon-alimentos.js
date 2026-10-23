/* Ícono "Corazón de alimentos" de NutriApp: un corazón que se llena de alimentos y una N en relieve.
   CorazonN.svg(variante, { anim, id }) → SVG 512 × 512. Variantes: "mosaico", "lluvia", "anillos". */
(function (g) {
  const N = g.NutriIconos;
  const S = 11.6, CX = 256, CY = 238;
  /* Contorno del corazón (curva clásica) */
  const pt = (t, f = 1, cy = CY) => [CX + 16 * Math.pow(Math.sin(t), 3) * S * f, cy - (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * S * f];
  const contorno = Array.from({ length: 160 }, (_, i) => pt((i / 160) * Math.PI * 2));
  const D = "M" + contorno.map((p) => p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" L") + " Z";
  function dentro(x, y) { let c = false; for (let i = 0, j = contorno.length - 1; i < contorno.length; j = i++) { const [xi, yi] = contorno[i], [xj, yj] = contorno[j]; if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c; } return c; }
  function aleatorio(semilla) { let s = semilla; return () => (s = (s * 16807) % 2147483647) / 2147483647; }
  const COMIDA = ["palta", "manzana", "brocoli", "naranja", "zanahoria", "frutos_rojos", "huevo", "platano", "tomate", "kiwi", "uvas", "pescado", "sandia", "pera", "pimiento", "higo", "pina", "almendras", "mango", "pollo", "durazno", "aguaymanto", "nueces", "coliflor", "mandarina", "salmon"];
  const cache = {};
  function comida(k, x, y, s, rot) {
    const raw = cache[k] || (cache[k] = N.svg(k, 64).replace(/<svg[^>]*>/, "").replace(/<\/svg>$/, ""));
    return `<svg x="${(x - s / 2).toFixed(1)}" y="${(y - s / 2).toFixed(1)}" width="${s}" height="${s}" viewBox="0 0 64 64" overflow="visible"><g transform="rotate(${rot.toFixed(0)} 32 34)">${raw}</g></svg>`;
  }
  /* Ubicaciones de los alimentos según la variante. Cada una: [x, y, tamaño, giro, orden] */
  function ubicar(v) {
    const r = aleatorio(v === "mosaico" ? 7 : v === "lluvia" ? 11 : 23), out = [];
    if (v === "mosaico") {
      const paso = 50;
      for (let fila = 0, y = 92; y < 470; y += paso * .87, fila++) for (let x = 30 + (fila % 2) * paso / 2; x < 490; x += paso)
        if (dentro(x, y) || dentro(x, y + 16) || dentro(x - 16, y) || dentro(x + 16, y)) out.push([x, y, 58, (r() - .5) * 24]);
      out.sort((a, b) => b[1] - a[1]);
    } else if (v === "lluvia") {
      for (let i = 0; i < 9000 && out.length < 90; i++) {
        const s = 48 + r() * 38, x = 30 + r() * 452, y = 80 + r() * 390;
        if (!dentro(x, y)) continue;
        if (out.some(([a, b, t]) => Math.hypot(a - x, b - y) < (t + s) * .3)) continue;
        out.push([x, y, s, (r() - .5) * 70]);
      }
      out.sort((a, b) => b[1] - a[1] + (r() - .5) * 40);
    } else {
      const anillos = [[1, 64, 30], [.78, 58, 22], [.56, 52, 15], [.34, 48, 8], [.13, 50, 2]];
      anillos.forEach(([f, s, n]) => { for (let i = 0; i < n; i++) { const t = (i / n) * Math.PI * 2 + .12; const [x, y] = pt(t, f * .9, CY + 22 * (1 - f)); out.push([x, y + 6, s, (r() - .5) * 30]); } });
    }
    return out.map((p, i) => [...p, i]);
  }
  const UB = {}; ["mosaico", "lluvia", "anillos"].forEach((v) => UB[v] = ubicar(v));

  function svg(v, opt = {}) {
    const id = opt.id || v, anim = !!opt.anim, ub = UB[v];
    const total = ub.length, durArmar = v === "anillos" ? 2600 : 2400, t0 = v === "anillos" ? 700 : 150;
    const items = ub.map(([x, y, s, rot, i]) => {
      const k = COMIDA[(i * 7 + (v === "lluvia" ? 3 : v === "anillos" ? 5 : 0)) % COMIDA.length];
      const d = t0 + (i / total) * durArmar;
      return `<g class="f" style="--d:${d.toFixed(0)}ms;--x:${x.toFixed(0)}px;--y:${y.toFixed(0)}px;--caida:${(-(y + 90)).toFixed(0)}px;transform-origin:${x.toFixed(0)}px ${y.toFixed(0)}px">${comida(k, x, y, s, rot)}</g>`;
    }).join("");
    const tN = t0 + durArmar + 150;
    return `<svg class="cn cn-${v} ${anim ? "anima" : ""}" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" style="--tN:${tN}ms;--tL:${tN + 700}ms">
      <defs>
        <linearGradient id="${id}-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0B4F4A"/><stop offset="1" stop-color="#14897D"/></linearGradient>
        <radialGradient id="${id}-base" cx=".5" cy=".42" r=".7"><stop offset="0" stop-color="#FFF8EC"/><stop offset="1" stop-color="#F4E3C6"/></radialGradient>
        <clipPath id="${id}-clip"><path d="${D}"/></clipPath>
        <linearGradient id="${id}-n" x1="0" y1="0" x2="0" y2="1" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#BFEDE3"/></linearGradient>
        <filter id="${id}-som" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="9"/></filter>
        <filter id="${id}-rel" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur in="SourceAlpha" stdDeviation="5" result="b"/>
          <feSpecularLighting in="b" surfaceScale="7" specularConstant="1" specularExponent="18" lighting-color="#ffffff" result="s"><feDistantLight azimuth="225" elevation="48"/></feSpecularLighting>
          <feComposite in="s" in2="SourceAlpha" operator="in" result="s2"/><feComposite in="SourceGraphic" in2="s2" operator="arithmetic" k1="0" k2="1" k3=".55" k4="0"/></filter>
        <linearGradient id="${id}-brillo" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
        <clipPath id="${id}-nclip"><path d="M208 328 V218 L304 328 V218" fill="none" stroke="#000" stroke-width="47" stroke-linecap="round" stroke-linejoin="round"/></clipPath>
      </defs>
      <rect width="512" height="512" fill="url(#${id}-bg)"/>
      <g class="latido">
        <path class="sombra-c" d="${D}" fill="#000" opacity=".28" transform="translate(0 14)" filter="url(#${id}-som)"/>
        <path class="base-c" d="${D}" fill="url(#${id}-base)"/>
        <g clip-path="url(#${id}-clip)">${items}</g>
        <path class="borde" d="${D}" fill="none" stroke="#FFFFFF" stroke-width="10" stroke-linejoin="round" pathLength="1"/>
        <g class="letra">
          <path d="M208 328 V218 L304 328 V218" transform="translate(5 12)" fill="none" stroke="#032F2C" stroke-opacity=".55" stroke-width="58" stroke-linecap="round" stroke-linejoin="round" filter="url(#${id}-som)"/>
          <path d="M208 328 V218 L304 328 V218" fill="none" stroke="#0B4F4A" stroke-width="60" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M208 328 V218 L304 328 V218" fill="none" stroke="url(#${id}-n)" stroke-width="47" stroke-linecap="round" stroke-linejoin="round" filter="url(#${id}-rel)"/>
          <g clip-path="url(#${id}-nclip)"><rect class="destello" x="-120" y="150" width="90" height="240" fill="url(#${id}-brillo)" transform="skewX(-18)"/></g>
        </g>
      </g>
    </svg>`;
  }
  g.CorazonN = { svg, contorno: D, cantidad: (v) => UB[v].length };
})(typeof window !== "undefined" ? window : globalThis);
