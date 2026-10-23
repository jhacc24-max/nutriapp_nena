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

- App de una sola página (`index.html`) con 5 pestañas: Perfil, Registro, Panel, Menú, Opciones; más Historial y Reportes como pantallas aparte.
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
- **P-05 · Menú (rediseño, 2026-10-23, 🎨 en revisión):** el menú deja de ser una combinación al azar y se arma con comidas reales de los últimos 30 días del registro. Requisitos del usuario: (1) usar sus días anteriores como base, (2) si el día no llega a la meta, sugerir qué agregar y cuánto aporta, (3) mostrar el porcentaje de la meta que cubre el menú del día. Maqueta: `flujos/menu-del-dia.html`. Tres opciones:
  - **A · Mezcla de tus comidas** (`pantallas/P-05A-menu-mezcla*.png`): anillo con el % del día + barras por nutriente; cada comida pendiente sale de un día real ("Como el lunes 19") y se cambia con ‹ ›; tarjeta ámbar "Te faltan…" con 3 frecuentes para agregar.
  - **B · Línea del día** (`pantallas/P-05B-menu-linea*.png`): línea de tiempo con lo registrado en firme y lo sugerido en punteado; barra "Comido 43 % / con lo planificado 82 %"; botones "Lo comí" y "Otra de mis comidas"; opciones deslizables para completar.
  - **C · Semana con anillos** (`pantallas/P-05C-menu-semana*.png`): anillo de cumplimiento en cada día de la semana y por nutriente; plantillas con los días más cumplidos para completar el día; lista "Para llegar al 100 %".
  - En las tres se mantiene "Pasar al registro"; "¿Qué preparo con…?" sigue en la pestaña.
