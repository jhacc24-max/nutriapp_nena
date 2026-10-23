/* Tres propuestas de ícono para NutriApp (SVG 512 × 512, a sangre: el sistema aplica la máscara). */
window.LOGOS = {
  mano: {
    nombre: "Mano que cuida",
    fondo: ["#0B5D57", "#16A394"],
    svg: (id = "m") => `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="${id}f" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0B5D57"/><stop offset="1" stop-color="#19A897"/></linearGradient>
      <radialGradient id="${id}c" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#FFB4A2"/><stop offset="1" stop-color="#FF6F61"/></radialGradient>
      <linearGradient id="${id}h" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#7BD389"/><stop offset="1" stop-color="#C6F07A"/></linearGradient></defs>
      <rect width="512" height="512" fill="url(#${id}f)"/>
      <circle cx="256" cy="268" r="178" fill="#fff" opacity=".07"/>
      <path class="trazo" d="M150 380 C138 318 134 250 150 200 C156 182 166 170 176 166 L322 352" fill="none" stroke="#fff" stroke-width="48" stroke-linecap="round" stroke-linejoin="round"/>
      <path class="trazo dedos" d="M322 352 C348 330 364 296 366 262" fill="none" stroke="#fff" stroke-width="48" stroke-linecap="round"/>
      <g class="dedos-g" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="19">
        <path d="M346 262 C344 236 342 214 336 196"/><path d="M366 262 C368 230 370 206 368 182"/><path d="M384 268 C390 244 394 222 396 204"/></g>
      <g class="joya"><g transform="translate(296 248) scale(.76) translate(-284 -250)"><path d="M276 296 C236 268 226 228 252 214 C266 207 278 213 284 225 C290 213 302 207 316 214 C342 228 332 268 292 296 L284 302 Z" fill="url(#${id}c)"/>
      <path d="M286 214 C288 188 304 172 330 170 C330 196 312 212 286 214Z" fill="url(#${id}h)"/><path d="M288 212 C300 198 312 188 326 178" stroke="#3E8E5A" stroke-width="3" fill="none" stroke-linecap="round"/></g></g>
    </svg>`,
    idea: "Tu propuesta. La N forma una mano abierta: el pulgar es el trazo izquierdo, la palma es la diagonal y el trazo derecho termina en tres dedos. En la palma descansa un corazón con una hoja: cuidar la salud a través de la comida.",
    fuerte: "Es el más humano y cercano; transmite acompañamiento, ideal para una app que usa una nutricionista con sus pacientes.",
    anim: "La N se dibuja de punta a punta y luego el corazón cae en la mano y late.",
  },
  hoja: {
    nombre: "Hoja latido",
    fondo: ["#0A3F3B", "#0F7A70"],
    svg: (id = "h") => `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="${id}f" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#083C38"/><stop offset="1" stop-color="#11857A"/></linearGradient>
      <linearGradient id="${id}a" x1="1" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#4CC38A"/><stop offset="1" stop-color="#B8EF6B"/></linearGradient>
      <linearGradient id="${id}b" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#27B5A8"/><stop offset="1" stop-color="#8EF0DA"/></linearGradient></defs>
      <rect width="512" height="512" fill="url(#${id}f)"/>
      <g class="hoja-i"><path d="M252 404 C160 352 104 278 118 206 C130 146 196 126 246 168 C252 174 254 182 256 190 Z" fill="url(#${id}a)"/>
      <path d="M248 396 C210 330 190 262 196 200" stroke="#2F8F5E" stroke-width="5" fill="none" stroke-linecap="round" opacity=".55"/></g>
      <g class="hoja-d"><path d="M260 404 C352 352 408 278 394 206 C382 146 316 126 266 168 C260 174 258 182 256 190 Z" fill="url(#${id}b)"/>
      <path d="M264 396 C302 330 322 262 316 200" stroke="#13867B" stroke-width="5" fill="none" stroke-linecap="round" opacity=".55"/></g>
      <path class="pulso" d="M88 280 H192 L218 236 L250 332 L280 210 L306 280 H424" fill="none" stroke="#fff" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    idea: "Dos hojas forman un corazón y una línea de latido lo cruza. Hoja = alimentación natural, corazón = bienestar, latido = salud, en una sola figura.",
    fuerte: "Se reconoce de inmediato como app de salud y nutrición, y la silueta de corazón se lee bien aun en el tamaño más pequeño.",
    anim: "Las hojas crecen desde la base, se juntan en corazón y el latido recorre la figura de izquierda a derecha.",
  },
  cubiertos: {
    nombre: "N de cubiertos",
    fondo: ["#F4FBF8", "#D9F2EA"],
    svg: (id = "c") => `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="${id}f" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F7FCFA"/><stop offset="1" stop-color="#CDEFE4"/></linearGradient>
      <linearGradient id="${id}l" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9BE15D"/><stop offset="1" stop-color="#1FA67A"/></linearGradient>
      <linearGradient id="${id}m" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E6E66"/><stop offset="1" stop-color="#074A45"/></linearGradient></defs>
      <rect width="512" height="512" fill="url(#${id}f)"/>
      <g class="tenedor" fill="url(#${id}m)"><rect x="146" y="214" width="40" height="178" rx="20"/>
        <path d="M128 120 a12 12 0 0 1 24 0 v58 h8 v-58 a12 12 0 0 1 24 0 v58 h8 v-58 a12 12 0 0 1 24 0 v78 c0 26 -20 40 -44 40 c-24 0 -44 -14 -44 -40 Z"/></g>
      <g class="cuchara" fill="url(#${id}m)"><rect x="326" y="214" width="40" height="178" rx="20"/><ellipse cx="346" cy="162" rx="46" ry="64"/></g>
      <g class="hoja-c"><path d="M178 196 C244 196 330 270 340 372 C268 372 186 300 178 196 Z" fill="url(#${id}l)"/>
      <path d="M190 210 C240 252 290 310 330 362" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".75"/></g>
    </svg>`,
    idea: "La N se arma con un tenedor, una hoja y una cuchara: comer bien con ingredientes frescos. Fondo claro para destacar entre los íconos oscuros del celular.",
    fuerte: "Es el más ligado a la comida y el más distinto entre apps de salud, que casi siempre usan corazones o pulsos.",
    anim: "El tenedor y la cuchara entran desde los costados y la hoja crece en diagonal uniéndolos en la N.",
  },
};
