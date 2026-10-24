---
documento: App Flow — Flujo de la aplicación
version_base: 1.0
app: "{{NOMBRE_APP}}"
ultima_actualizacion: "{{AAAA-MM-DD}}"
---

# 03 · App Flow — El recorrido del usuario

> **Para qué sirve:** es el plano de la app. Dice qué pantallas existen, cómo se llega a cada una y qué pasa al tocar cada botón.
> **Conexión con Motion:** cada flecha de este documento es una transición; su tipo se define en la columna "Transición" usando los nombres de `07-MOTION.md`.

> ### ⚠️ Regla general (todas las apps, actuales y futuras)
> 1. **Aquí figuran TODAS las pantallas** que tendrá la app, incluidas las de estado (vacío, error, sin conexión) y las hojas o modales importantes. Si una pantalla no está en el inventario (§2), no se construye.
> 2. **Ninguna pantalla se programa sin tener antes su imagen (mockup) aprobada.** Primero se diseña, se revisa en imagen y se aprueba; recién después se escribe código.
> 3. Cada mockup se hace con la paleta elegida en `08-PALETAS-DE-COLOR.md`, en **modo claro y oscuro**, y con el patrón (A, B o C) indicado en el inventario.
> 4. Si al programar aparece una pantalla nueva, se agrega primero al inventario y a la galería (§3) con su mockup, y luego se construye.

---

## 1. Mapa general

```mermaid
flowchart LR
  A[Splash] --> B{¿Sesión iniciada?}
  B -- No --> C[Bienvenida] --> D[Registro / Login] --> E[Verificación]
  B -- Sí --> F[Inicio]
  E --> F
  F --> G[{{Pantalla principal 1}}]
  F --> H[{{Pantalla principal 2}}]
  F --> I[Perfil / Ajustes]
```

## 2. Inventario de pantallas

Patrón de pantalla (ver `04-UIUX` §5): **A** tarjetas cerradas tonales · **B** capas superpuestas · **C** hero de imagen + hoja · **D** imagen fundida · **E** tareas y agenda por color · **F1–F7** pantalla de ingreso (elegir una variante) · **G1–G4** flujo guiado (onboarding, registro por pasos o elegir un elemento) · **H1–H8** pedidos, pago y entrega (inicio de tienda, escáner, análisis, detalle, carrito, pago, pedido realizado, seguimiento).

Estado del mockup: ⬜ sin diseñar · 🎨 diseñado, en revisión · ✅ aprobado (ya se puede programar) · 🔁 cambió, volver a revisar

| ID | Pantalla | Ruta | Objetivo | Patrón | Requisitos (PRD) | Acceso | Mockup | Estado |
|---|---|---|---|---|---|---|---|---|
| P-01 | Splash | `/` | Cargar sesión | — | — | Público | `pantallas/P-01-splash.png` | ⬜ |
| P-02 | Bienvenida | `/bienvenida` | Explicar valor en 3 pasos | D | — | Público | `pantallas/P-02-bienvenida.png` | ⬜ |
| P-03 | Ingreso / Registro | `/auth` | Entrar | {{F1–F7}} | RF-xx | Público | `pantallas/P-03-auth.png` | ⬜ |
| P-04 | Inicio | `/inicio` | {{}} | A | {{}} | Privado | `pantallas/P-04-inicio.png` | ⬜ |
| P-05 | {{Listado / catálogo}} | | | B | | | `pantallas/P-05-….png` | ⬜ |
| P-06 | {{Detalle}} | | | C | | | `pantallas/P-06-….png` | ⬜ |
| P-07 | Perfil / Ajustes | `/perfil` | Datos y preferencias | A | | Privado | `pantallas/P-07-perfil.png` | ⬜ |
| E-01 | Estado vacío | — | Invitar a la primera acción | — | | — | `pantallas/E-01-vacio.png` | ⬜ |
| E-02 | Estado de error | — | Explicar y reintentar | — | | — | `pantallas/E-02-error.png` | ⬜ |
| E-03 | Sin conexión | — | Avisar y reintentar | — | | — | `pantallas/E-03-offline.png` | ⬜ |
| H-01 | {{Hoja "Nuevo"}} | — | Acciones rápidas | — | | | `pantallas/H-01-nuevo.png` | ⬜ |

**Base común:** todas las apps tienen Splash, Auth, Inicio, Perfil/Ajustes, estado vacío, estado de error y estado sin conexión. Prefijos: **P** pantalla · **E** estado · **H** hoja o modal.

## 2b. Tabla de tipos y colores (si la app tiene tareas, agenda, pedidos o estados)

Cada tipo usa un color de `08-PALETAS` §5, siempre el mismo en lista, calendario, filtros y estadísticas. Máximo 8 tipos.

| Tipo | Color (`--cat-…`) | Ícono | Ejemplo |
|---|---|---|---|
| {{Ej.: Venta}} | `verde` | {{carrito}} | {{Venta de 3 pares}} |
| {{Ej.: Reposición}} | `cafe` | {{caja}} | {{Pedir Runner Pro T-41}} |
| {{Ej.: Cliente}} | `ambar` | {{personas}} | {{Llamar a tienda Trujillo}} |
| {{Ej.: Envío}} | `cian` | {{camión}} | {{Despacho a Lima}} |
| {{Ej.: Urgente}} | `rojo` | {{alerta}} | {{Stock agotado}} |

## 3. Galería de pantallas (mockups)

Todas las imágenes viven en `docs-base/pantallas/`, dentro de cada proyecto.

**Cómo se nombran:** `{{ID}}-{{nombre}}.png` para modo claro y `{{ID}}-{{nombre}}-oscuro.png` para modo oscuro. Ejemplo: `P-04-inicio.png` y `P-04-inicio-oscuro.png`.

**Qué debe mostrar cada mockup:**
- Tamaño de celular (390 × 844 px) con datos realistas de la app, nunca "lorem ipsum".
- La paleta elegida (`08-PALETAS`) y el patrón asignado (`04-UIUX` §5).
- La barra de navegación con la pestaña activa correcta.
- Si la pantalla tiene un movimiento importante, una nota con su nombre (por ejemplo, "al tocar la tarjeta → `shared-element`").

**Cómo se hacen:** se le pide a Claude: *"Diseña los mockups de todas las pantallas del inventario de `03-APPFLOW.md` con la paleta {{id}}, en claro y oscuro"*. Se revisan, se piden cambios, y al aprobarlos se marca ✅ en el inventario.

**Vista rápida** (reemplazar por las imágenes reales):

| P-04 Inicio | P-05 {{Listado}} | P-06 {{Detalle}} |
|---|---|---|
| ![P-04](pantallas/P-04-inicio.png) | ![P-05](pantallas/P-05-listado.png) | ![P-06](pantallas/P-06-detalle.png) |

## 4. Navegación principal

- **Patrón base:** una sola barra flotante centrada con 3–4 destinos y el botón "+" dentro, como último elemento (regla en `04-UIUX` §5, "Reglas comunes"). Nombres de una palabra, máximo 7 letras.
- Destinos de la barra: {{Inicio · … · Perfil}}
- Navegación secundaria: pantallas de detalle apiladas (push) y hojas inferiores (bottom sheets) para acciones rápidas.

## 5. Interacciones por pantalla

Repetir este bloque por cada pantalla.

### P-04 · Inicio

| Elemento | Acción del usuario | Resultado | Transición (07-MOTION) |
|---|---|---|---|
| Tarjeta de producto | Toca | Abre detalle P-05 | `shared-element` |
| Botón "+" | Toca | Abre hoja "Nuevo" | `sheet-up` |
| Lista | Desliza abajo | Recarga datos | `pull-refresh` |
| Elemento de lista | Desliza a la izquierda | Muestra "Eliminar" | `swipe-reveal` |
| Pestaña de la barra | Toca | Cambia de sección; solo la activa muestra su nombre | `tab-crossfade` + `indicator-slide` + `label-slide` |
| Casilla de tarea | Toca | Marca como hecha y la manda al final | `task-check` + `task-complete-sink` |
| FAB "+" (lista o agenda) | Toca | Abre "Nueva actividad" a pantalla completa | `fab-fill-reveal` |

**Estados:** cargando (`skeleton-shimmer`) · vacío (ilustración + CTA) · error (mensaje + reintentar) · sin conexión (banner).

## 6. Flujos críticos (paso a paso)

### Flujo 1: {{Ej.: Registrar un producto}}
1. Usuario toca "+" en Inicio.
2. Se abre hoja con "Escanear QR" / "Manual".
3. …
4. Confirmación con animación `success-check` y toast.

## 7. Notificaciones y entradas externas

| Evento | Canal | Abre la pantalla |
|---|---|---|
| {{Stock bajo}} | WhatsApp | {{P-05 con enlace profundo}} |

## 8. Cambios respecto a la base

- App de una sola página (`index.html`) con 5 pestañas en este orden (desde 2026-10-23): **Perfil, Menú, Registro, Panel, Opciones**; más Historial y Reportes como pantallas aparte.
- **Rediseño de color (2026-10-22):** las 5 pestañas siguen el Patrón B (cabecera oscura + hoja redondeada) y el Panel usa tarjeta héroe del Patrón A. Capturas en `pantallas/P-00-tabs-rediseno*.png` y `pantallas/P-04-panel*.png`: estado 🎨 en revisión. Se hicieron después del código, no antes; falta que el usuario las apruebe (✅).
- **Ingreso (P-03):** modelo **F2 · Ola líquida** (elegido por el usuario el 2026-10-22), con `wave-flood` simplificado y el botón `btn-liquid-fill`. Capturas `pantallas/P-03-auth*.png` (🎨 en revisión).
- **Cuenta e instalación:** tarjeta "Cuenta y aplicación" al inicio de Opciones (cerrar sesión con confirmación, instalar app). Captura `pantallas/P-07-opciones-cuenta*.png`.
- Pendiente de inventariar y diseñar: Historial, Reportes y los estados vacío / error / sin conexión.
- Nombre de pestaña "Registro" tiene 8 letras (la base pide máximo 7); se mantiene por decisión previa del proyecto.
- **H-02 · Escribe lo que comiste (2026-10-23, 🎨 en revisión):** registrar comidas escribiendo en texto libre; la IA propone alimentos de la base con gramos exactos o estimados y la persona confirma. Tres modelos para elegir, en claro y oscuro, con la maqueta interactiva en `flujos/escribir-comida.html`:
  - **A · Tarjeta en el registro** (`pantallas/H-02A-escribir-tarjeta*.png`): pestaña "Escribir" junto a "Buscar" (`indicator-slide`, `pill-to-card`), botón `btn-loading` → `skeleton-shimmer` → filas con `nutriSube` e `icon-pop`, ajuste − / +, `count-up` y `btn-success-morph`; las filas viajan a la lista (`shared-element`).
  - **B · Conversación** (`pantallas/H-02B-escribir-chat*.png`): `push-slide` a un chat; enviar con `icon-fly`, burbuja con resorte, indicador "escribiendo…", respuesta con `text-blur-reveal` y alimentos en `cluster-pop`; pregunta por lo que no está en la base.
  - **C · Plato que se arma** (`pantallas/H-02C-escribir-plato*.png`): `depth-sheet` sobre el registro; las palabras reconocidas se resaltan mientras se escribe, cada alimento cae en el plato, aro de meta con `chart-draw` y `count-up`, momento con `text-morph`; gramos con barra deslizante.
  - Reglas comunes: nada entra al registro sin confirmar; lo que no está en la base se marca en ámbar ("elegir parecido" u omitir); el momento (desayuno, almuerzo…) se detecta del texto y se puede cambiar.
- **Decisión 2026-10-23 · Hoja "¿Qué comiste?"** (reemplaza el flujo de registro): una sola hoja (`depth-sheet`) con el momento arriba (píldora con `text-morph`) y el selector **Buscar | Escribir** (`indicator-slide` + `tab-crossfade`). Las dos formas llenan el mismo plato y se registran con un botón. Maqueta: `flujos/que-comiste.html`.
  - **Escribir — elegido por el usuario:** modelo C (texto resaltado en vivo + plato con aro de meta) con los gramos en **− / + y escribibles** (sin barra deslizante; pasos de 5 g hasta 100 g y de 10 g desde ahí). Captura `pantallas/H-02-que-comiste-escribir*.png`.
  - **Buscar — 3 modelos en revisión (🎨):** conservan "pesar con recipiente" (neto = bruto − tara) y "restar carne".
    1. Lista que se despliega: fila con "+" que se abre en acordeón con gramos y recipiente; categorías con íconos. `pantallas/H-03-1-buscar-lista*.png`.
    2. Cuadrícula de íconos: frecuentes en mosaico; ficha con porciones rápidas, − / + grande, macros y recipiente. `pantallas/H-03-2-buscar-cuadricula*.png`.
    3. Balanza: pantalla de pesaje con número grande, teclado y tara descontada al instante. `pantallas/H-03-3-buscar-balanza*.png`.
- **Decisión 2026-10-23 · Buscar = cuadrícula de íconos (modelo 2)**, con estos cambios pedidos por el usuario:
  - **4 íconos por fila** (íconos de 34 px, nombre en hasta 2 líneas) para ver más opciones.
  - **Frecuentes según el momento:** al cambiar Desayuno / Almuerzo / Cena / Colación (selector de vidrio, `glass-picker` + `text-morph`), la cuadrícula muestra lo que más se registra en ese momento, ordenado por veces en los últimos 30 días ("12 veces"), con `cluster-pop`. Se calcula con `registros/{fecha}/items` (cada ítem ya guarda su momento); para no leer 30 días cada vez, se mantiene un contador por momento que se actualiza al agregar o borrar.
  - **Números con un solo estilo:** kcal, proteína, carbohidratos, grasa y gramos usan la misma letra (Inter 700, cifras tabulares); macros con 1 decimal y "g".
  - **Recipiente en pantalla aparte:** al activar "Lo pesé con un recipiente" se abre "¿En qué lo pesaste?" con todos los recipientes y su tara (`push-slide`); al elegir vuelve a la ficha con el neto calculado y el recipiente como botón para cambiarlo. Incluye "Editar mis recipientes" (va a Opciones).
  - Capturas: `pantallas/H-03-buscar-frecuentes*.png`, `H-03-buscar-ficha*.png`, `H-03-buscar-recipientes*.png`. Los modelos 1 (lista) y 3 (balanza) quedan descartados.
- **"¿En qué lo pesaste?"** ahora muestra **4 recipientes por fila** (nombres en hasta 2 líneas), para que entren todos.
- **P-05 · Menú de hoy — versión final (2026-10-23, elegida por el usuario):** fusión de lo propuesto. Maqueta `flujos/menu-de-hoy.html`.
  - **Avance del día (arriba):** anillo con el % de la meta y los 4 íconos de nutrientes (calorías, proteína, carbohidratos, grasa) con valor, barra y %. **Color y animación por estado**, iguales en el anillo, el % y cada barra: 0 % neutro · menos de 85 % **naranja** "Vas en camino" (el anillo respira) · 85–105 % **verde** "Por llegar / Meta cumplida" (brilla y suelta un estallido al entrar) · más de 105 % **rojo** "Te pasaste X %" (segunda vuelta con lo que sobra y sacudida; el ícono del nutriente pasado también se sacude). Los números suben con `count-up` y los íconos laten al confirmar una comida. Capturas `pantallas/P-05-menu*.png` y `P-05-menu-colores*.png`.
  - **Elige tus comidas:** Desayuno, Almuerzo, Cena, Colación (tarjetas con meta, ✓, íconos y barra de la comida).
  - **Ventana de cada comida = "Arma por partes"** (`push-slide`), `pantallas/P-05-menu-ventana*.png`: arriba "Tus variantes · un toque" (de su registro). Al tocar una variante, sus alimentos **suben** (animación FLIP) al recuadro "Tu desayuno" y **debajo aparecen sus pesos** (− / +, escribibles, con ✕ para quitar); el resto de alimentos **baja** a "¿Algo más? Toca para sumar" (atenuado). Lo que se toca abajo sube y se agrega con su peso. Resumen con anillo de la meta de esa comida (mismos colores).
  - **Confirmar** cierra la ventana, marca la comida y llena el avance. Con las 4 comidas aparece "¡Menú completado!" (confeti + `tada`), `pantallas/P-05-menu-completado*.png`.
  - **Pasar al registro:** los íconos viajan a la pestaña Registro (que rebota), aparece "✓ Pasado a tu registro de hoy" y **el menú queda vacío**. `pantallas/P-05-menu-pasado*.png`.

- **Implementado en la app (2026-10-23, ✅ aprobado por el usuario):**
  - Orden de pestañas: Perfil · Menú · Registro · Panel · Opciones.
  - Marca: ícono corazón "Mosaico" sin borde blanco con la N en relieve (`corazon-nutri.js`, `icons/*.png`); nombre "NutriApp" con letras que saltan en la pantalla de carga (P-01), el inicio de sesión y la cabecera. Se mantienen las animaciones que ya tenía la app.
  - Registro: botón "¿Qué comiste?" que abre la hoja Buscar | Escribir (H-02 modelo C + H-03 modelo 2, 4 por fila, recipientes en pantalla aparte). Si el plato ya tiene alimentos elegidos a mano, el texto escrito no cambia la comida elegida.
  - Menú: P-05 versión final (avance con colores por estado, 4 comidas, ventana con variantes, confirmar y pasar al registro, que vacía el menú). Se guarda en el teléfono y en Firestore `pacientes/{id}/menuHoy/{fecha}`.
  - Capturas de la app funcionando: `pantallas/APP-2026-10-23-*.png`.

- **Menú de hoy · ajuste pedido por el usuario (2026-10-23, ✅):** cada comida (desayuno, almuerzo, cena y colación) muestra su propio avance de calorías, proteína, carbohidratos y grasa con los mismos colores por estado: en la tarjeta (4 barras con %) y dentro de la ventana (4 indicadores con su meta, que se llenan al agregar alimentos). La ventana tiene buscador para sumar cualquier alimento de la base (ej. Ensure Advance). Capturas `pantallas/APP-2026-10-23-menu-v2-*.png`.
- **Menú de hoy · segundo ajuste (2026-10-23, ✅ pedido por el usuario):** el avance es siempre **del día completo** (lo ya registrado hoy + el menú). Dentro de cada comida los 4 indicadores muestran "Tu día" contra las metas diarias, y se indica cuánto suma esa comida; el color ya no se calcula sobre la fracción de la comida. Las tarjetas de las 4 comidas muestran **la lista de alimentos con sus gramos** (lo registrado en gris, hasta 5 y "+N más") y el % del día, en vez de barras. Nuevo alimento: Arveja verde partida (seca, cruda) y la cocida pasa a llamarse "Arveja verde partida cocida"; el buscador encuentra por palabras.
- **P-04 · Panel didáctico (2026-10-23, 🎨 implementado, falta aprobación del usuario):**
  - "Así te fue ayer": anillo con metas cumplidas (ej. 3/6), las cumplidas como fichas ✓ y un cuadro por cada nutriente que faltó o se pasó, con barra + banderita de meta, frase simple ("Comiste 21 g de los 60 g que necesitas: como un tercio. Te faltaron 39 g."), columnitas "¿Dónde faltó?" por comida y alimentos para compensar.
  - Hoy: calorías en el anillo grande de arriba; debajo, un cuadro por proteína, carbohidratos, grasas, fibra y sodio con sus sugerencias dentro (cada nutriente aparece una sola vez; se quitaron "Macronutrientes" y "Cumplimiento de metas de hoy" repetidos). "Ver de dónde vino" muestra qué alimentos aportaron.
  - Sugerencias personalizadas: primero alimentos que la persona come seguido (★ lo sueles comer).
  - Cumplimiento de la meta: semana con círculos por día (calorías y proteína) y mes como calendario de cuadritos, con promedio y racha.
  - Capturas: `pantallas/APP-2026-10-23-panel-*.png`.
- **Alimentos:** solo queda "Arveja partida cocida" (se quitó la versión seca).
- **Barra superior con avatar (2026-10-23, 🎨 implementado, pedido por el usuario; referencia `referencias/menu-avatar-video.png`):**
  - Se quitaron el logo, el nombre y los botones Reportes / Historial de la cabecera, y las bandas de título de cada pestaña (Perfil nutricional, Menú de hoy, Registro de alimentos, Panel del día, Opciones): el contenido sube.
  - Nueva barra: a la izquierda el nombre corto de la pestaña y la fecha; a la derecha la racha 🔥 (días seguidos registrando) y el avatar de quien inició sesión (foto de Google o iniciales).
  - Al tocar el avatar se abre un menú: nombre y correo, **Perfil nutricional** (ya no es pestaña) y **Reportes**, que se despliega en Reportes e Historial.
  - Barra inferior: Menú · Registro · Panel · Opciones. La app abre en Menú.
  - Captura `pantallas/APP-2026-10-23-barra-avatar.png`.
