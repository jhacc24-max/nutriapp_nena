---
documento: Backend Schema — Estructura de datos
version_base: 1.0
app: "NutriApp"
ultima_actualizacion: "2026-10-26"
---

# 05 · Backend Schema — Cómo se organizan los datos

> **Para qué sirve:** define tablas, relaciones, autenticación y permisos. Evita que la IA invente tablas distintas en cada sesión.
> **Regla:** cualquier tabla o columna nueva se agrega **primero aquí** y luego como migración en `/supabase/migrations`.

---

## 1. Diagrama de entidades

```mermaid
erDiagram
  PROFILES ||--o{ {{ENTIDAD_PRINCIPAL}} : "posee"
  {{ENTIDAD_PRINCIPAL}} ||--o{ {{ENTIDAD_DETALLE}} : "tiene"
  PROFILES ||--o{ NOTIFICATIONS : "recibe"
```

## 2. Tablas base (comunes a todas las apps)

### `profiles`
| Columna | Tipo | Reglas | Descripción |
|---|---|---|---|
| id | uuid | PK, = `auth.users.id` | |
| full_name | text | | |
| phone | text | único, formato E.164 (+51…) | Para WhatsApp |
| role | text | `owner` · `staff` · `admin` | |
| created_at | timestamptz | default `now()` | |

### `notifications`
| Columna | Tipo | Reglas | Descripción |
|---|---|---|---|
| id | uuid | PK | |
| user_id | uuid | FK → profiles | |
| channel | text | `whatsapp` · `telegram` · `in_app` | |
| payload | jsonb | | |
| status | text | `pending` · `sent` · `failed` | |
| created_at | timestamptz | | |

### `activity_types` (si la app tiene tareas, agenda o estados — ver `03-APPFLOW` §2b)
| Columna | Tipo | Reglas | Descripción |
|---|---|---|---|
| id | uuid | PK | |
| owner_id | uuid | FK → profiles | Cada negocio puede tener sus tipos |
| name | text | NOT NULL | "Venta", "Reposición"… |
| color | text | uno de: violeta, azul, verde, ambar, rojo, cian, rosa, cafe | Se pinta con `--cat-{color}-*` |
| icon | text | | Nombre del ícono |
| sort | int | | Orden en filtros |

Las tablas de tareas o eventos llevan `type_id uuid → activity_types`, más `starts_at` / `ends_at` (timestamptz), `done boolean` y una tabla puente `event_participants (event_id, profile_id)` para los avatares.

### `audit_log` (opcional)
Registro de quién cambió qué y cuándo.

## 3. Tablas propias de esta app

### `{{tabla}}`
| Columna | Tipo | Reglas | Descripción |
|---|---|---|---|
| id | uuid | PK, default `gen_random_uuid()` | |
| owner_id | uuid | FK → profiles, NOT NULL | Dueño del registro |
| {{}} | | | |
| created_at | timestamptz | default `now()` | |
| updated_at | timestamptz | trigger | |

## 4. Relaciones

| Desde | Hacia | Tipo | Al borrar |
|---|---|---|---|
| {{tabla}}.owner_id | profiles.id | muchos a uno | cascade |

## 5. Autenticación

- **Método base:** teléfono con código (OTP) o correo + enlace mágico. {{elegir}}
- Al registrarse se crea la fila en `profiles` (trigger).
- Roles definidos en `profiles.role`.

## 6. Permisos (RLS)

| Tabla | Leer | Crear | Editar | Borrar |
|---|---|---|---|---|
| profiles | el propio | sistema | el propio | — |
| {{tabla}} | `owner_id = auth.uid()` | autenticado | dueño | dueño |

```sql
alter table {{tabla}} enable row level security;
create policy "dueño lee" on {{tabla}} for select using (owner_id = auth.uid());
```

## 7. Archivos (Storage)

| Bucket | Contenido | Público | Tamaño máx. |
|---|---|---|---|
| {{avatars}} | fotos de perfil | sí | 2 MB |

**Color de imagen (base común):** toda tabla que guarde una imagen grande (portada, producto, colección) tiene además la columna `image_color text` con el color dominante en hex (por ejemplo, `#EE9A55`). Se calcula al subir la imagen y lo usa el Patrón D (`04-UIUX` §5) para fundir la imagen con el fondo.

## 8. Funciones del servidor / webhooks

| Función | Disparador | Qué hace |
|---|---|---|
| `whatsapp-webhook` | mensaje entrante | {{}} |
| `notify` | inserción en `notifications` | envía por el canal indicado |

## 9. Tiempo real

Tablas con suscripción en vivo (para animar cambios en pantalla, ver `07-MOTION` › `live-update-flash`): {{}}

## 10. Cambios respecto a la base

**Esta app no usa Supabase ni SQL: usa Firebase (Auth + Cloud Firestore).** Las tablas de arriba son el molde del kit; lo que sigue es el modelo real. Las reglas de acceso están en `firestore.rules` (equivalen a las RLS de §6) y se prueban con el emulador de Firestore.

### 10.1 Colecciones

| Colección | Documento | Contenido |
|---|---|---|
| `usuarios/{uid}` | una por cuenta | `pacienteId` — el espacio al que está vinculada |
| `nutricionistas/{uid}` | una por nutricionista | `nombre`, `codigo`, `correo`, `ultimoIngreso`, `avisos`. Lo crea el workflow de alta o la propia invitada al aceptar su invitación (con correo verificado); nadie más puede darse el rol |
| `admins/{uid}` | una por administrador | `correo`, `creadoEn`. Solo lo crea el workflow de alta con rol `admin` |
| `invitaciones/{correo}` | correo en minúsculas | `nombre`, `codigo`, `creadoEn`. La crea el administrador; la invitada la borra al aceptarla |
| `codigosNutri/{codigo}` | p. ej. `NUT-4821` | `uid` de la nutricionista (vacío mientras la invitación está pendiente) y `correo`, para que el paciente la elija desde la app |
| `sistema/estado` | uno | `respaldo {en, pacientes, dias}`, `avisos {en, enviados}`, `reglas {en}`. Lo escriben los workflows; lo lee solo el administrador |
| `pacientes/{codigo}` | el espacio compartido | `perfil`, `prescripcion`, `suplementos`, `medicamentos`, `recipientes`, `catalogoCustom`, `pesos`, `tema`, `creadoPor`, y los campos nuevos de abajo |
| `pacientes/{codigo}/registros/{fecha}/items/{itemId}` | un alimento | `alimento`, `gramos`, `momento`, `tara`, `fecha`, `agregadoEn` |
| `pacientes/{codigo}/menuHoy/{fecha}`, `menuEdiciones/{dia}` | | menú sugerido y sus ajustes |
| `pacientes/{codigo}/dispositivos/{uid}` | un celular | `token` de FCM, `plataforma`, `actualizadoEn` — para mandar los recordatorios |
| `pacientes/{codigo}/evaluaciones/{evalId}` | una consulta | `fecha`, `criterios[] {clave, puntaje 1-5}`, `comentario`, `nutricionistaUid` |
| `pacientes/{codigo}/notasConsulta/{notaId}` | nota privada | `texto`, `fecha`, `nutricionistaUid` |
| `citas/{citaId}` | una cita | ver 10.3 |
| `notificaciones/{notifId}` | un aviso enviado | ver 10.4 |

### 10.2 Estado del paciente (nuevo)

En `pacientes/{codigo}`, solo lo escribe la nutricionista:

| Campo | Tipo | Valores | Descripción |
|---|---|---|---|
| `nutricionistaUid` | string | uid | Quién lo sigue. Lo elige el paciente con el código de la nutricionista |
| `estado` | string | `activo`, `pausado`, `baja` | Un espacio nuevo nace activo (sin el campo) |
| `estadoMotivo` | string | | Por qué se pausó o se dio de baja |
| `estadoDesde` | number | epoch ms | Cuándo cambió |
| `estadoHasta` | string | `AAAA-MM-DD` | Solo en `pausado`: hasta cuándo |

`pausado` oculta al paciente del tablero y corta sus recordatorios; `baja` termina el seguimiento y guarda el historial, y se puede reactivar.

### 10.3 `citas`

| Campo | Tipo | Descripción |
|---|---|---|
| `pacienteId` | string | Código del espacio |
| `nutricionistaUid` | string | Dueña de la cita |
| `fecha` | string | `AAAA-MM-DD` |
| `hora` | string | `HH:MM` (hora de Lima) |
| `duracionMin` | number | |
| `tipo` | string | `control`, `primera`, `teleconsulta`, `examenes` |
| `hecha` | boolean | Atendida |
| `recordatorio` | map | `{ frec: 'diaria' \| 'horas', hora: 'HH:MM', antes: [24, 1], canal: ['in_app','whatsapp','telegram'] }` |
| `creadaEn` | number | epoch ms |

`frec: 'diaria'` manda un aviso por día a la hora indicada hasta el día de la cita; `frec: 'horas'` manda uno por cada valor de `antes` (horas antes de la cita). `canal` usa los mismos valores que `notifications.channel` de §2.

### 10.4 `notificaciones`

Las escribe **solo el servidor** (el job de GitHub Actions con cuenta de servicio, que no pasa por las reglas). El destinatario solo puede marcarlas como leídas.

| Campo | Tipo | Descripción |
|---|---|---|
| `destinoUid` | string | A quién va |
| `pacienteId` | string | Espacio relacionado (si aplica) |
| `tipo` | string | `cita`, `recordatorio_comida`, `hallazgo` |
| `canal` | string | `in_app`, `whatsapp`, `telegram`, `push` |
| `titulo`, `cuerpo` | string | |
| `citaId` | string | Si nace de una cita |
| `enviadaEn` | number | epoch ms |
| `leida` | boolean | |

### 10.5 Recordatorios de comidas del paciente

En `pacientes/{codigo}.recordatorios` (lo edita el propio paciente en Opciones):

```json
{ "activos": true,
  "comidas": { "desayuno": "08:00", "almuerzo": "13:00", "cena": "19:30", "colacion": null } }
```

El celular los muestra solo (notificación local programada por la app) y, si hay token en `dispositivos`, el job del servidor los manda también por push, para que lleguen con la app cerrada.

### 10.6 Dónde se guarda y dónde se respalda

- **Se guarda** en Cloud Firestore (proyecto `nutriapp-c0bc8`), más una copia en el propio celular (`localStorage`) para que la app funcione sin conexión.
- **Se respalda** cada noche en un **repositorio privado de GitHub**, distinto del de la app: el workflow `.github/workflows/respaldo-firestore.yml` exporta las colecciones a JSON y las sube con fecha. Así la copia vive fuera de Firebase.
- El paciente además puede descargar su propio respaldo en un archivo desde Opciones › Respaldo de datos.

### 10.6b Costo: todo dentro de planes gratuitos

| Pieza | Plan | Límite gratis | Uso estimado |
|---|---|---|---|
| Firestore | Spark (gratis) | 50 000 lecturas y 20 000 escrituras al día | El job de avisos lee los pacientes una vez por hora |
| Push (FCM) | gratis | sin límite práctico | |
| GitHub Actions | gratis | 2 000 min/mes en repos privados (ilimitado en públicos) | ~750 min/mes (avisos cada hora + respaldo diario) |
| Repo de respaldo | GitHub privado, gratis | 1 GB recomendado por repo | |
| WhatsApp | **no se usa** | Meta cobra cada aviso automático (mensaje de plantilla) | |
| Telegram | gratis | | Opcional: falta vincular el chat de cada paciente con el bot |

### 10.7 Funciones del servidor (§8 de esta base)

| Función | Disparador | Qué hace |
|---|---|---|
| `respaldo-firestore` | cron diario (GitHub Actions) | Exporta Firestore al repo privado de respaldo |
| `avisos` | cron cada hora (GitHub Actions) | Lee `citas` y `recordatorios`, crea los documentos de `notificaciones` y manda el push por FCM |
