/* Avisos de NutriApp. Lo corre .github/workflows/avisos.yml cada hora.
   - Citas: según `recordatorio.frec` de cada cita — 'diaria' (un aviso por día a su hora, hasta
     el día de la cita) u 'horas' (uno por cada valor de `antes`, en horas antes de la cita).
   - Comidas: según `pacientes/{codigo}.recordatorios.comidas` (lo pone el paciente en Opciones).
   Cada aviso se guarda en `notificaciones` (para verlo dentro del panel y de la app) y, si hay
   token de FCM en `pacientes/{codigo}/dispositivos`, se manda también como push.
   WhatsApp y Telegram quedan anotados en el documento: necesitan un proveedor contratado. */
import admin from "firebase-admin";

const credencial = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || "{}");
if (!credencial.project_id) {
  console.error("Falta el secreto FIREBASE_SERVICE_ACCOUNT.");
  process.exit(1);
}
admin.initializeApp({ credential: admin.credential.cert(credencial) });
const db = admin.firestore();

/* Hora de Lima (UTC-5, sin horario de verano). */
const ahoraLima = new Date(Date.now() - 5 * 3600 * 1000);
const hoy = ahoraLima.toISOString().slice(0, 10);
const horaAhora = ahoraLima.toISOString().slice(11, 13) + ":00";
const minutosDelDia = (hhmm) => Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3, 5));
const enEstaHora = (hhmm) => hhmm && hhmm.slice(0, 2) === horaAhora.slice(0, 2);

/* Evita avisos repetidos: el id del documento lleva la clave del aviso. */
async function enviar({ clave, destinoUid, pacienteId, tipo, titulo, cuerpo, canal, citaId, tokens }) {
  const ref = db.collection("notificaciones").doc(clave);
  if ((await ref.get()).exists) return false;
  await ref.set({ destinoUid, pacienteId: pacienteId || null, tipo, canal, titulo, cuerpo, citaId: citaId || null, enviadaEn: Date.now(), leida: false });
  if (tokens && tokens.length) {
    try {
      await admin.messaging().sendEachForMulticast({ tokens, notification: { title: titulo, body: cuerpo } });
    } catch (e) {
      console.error("Push no enviado:", e.message);
    }
  }
  console.log("Aviso:", clave, "·", titulo);
  return true;
}

async function tokensDe(pacienteId) {
  const snap = await db.collection("pacientes").doc(pacienteId).collection("dispositivos").get();
  return snap.docs.map((d) => d.data().token).filter(Boolean);
}

async function avisosDeCitas() {
  const citas = await db.collection("citas").where("fecha", ">=", hoy).get();
  for (const doc of citas.docs) {
    const c = doc.data();
    if (c.hecha) continue;
    const r = c.recordatorio || {};
    const canales = r.canal && r.canal.length ? r.canal : ["in_app"];
    const nombre = (await db.collection("pacientes").doc(c.pacienteId).get()).data()?.perfil?.nombre || c.pacienteId;
    const base = { destinoUid: c.nutricionistaUid, pacienteId: c.pacienteId, tipo: "cita", citaId: doc.id, canal: canales[0] };

    if (r.frec === "horas") {
      // Faltan X horas para la cita: se avisa en la hora que coincide con cada valor de `antes`.
      if (c.fecha !== hoy) continue;
      const faltan = Math.round((minutosDelDia(c.hora) - minutosDelDia(horaAhora)) / 60);
      for (const antes of r.antes || [24, 1]) {
        if (antes !== faltan) continue;
        await enviar({ ...base, clave: `cita_${doc.id}_${hoy}_h${antes}`, titulo: `Cita con ${nombre} en ${antes} h`, cuerpo: `${c.tipo} · ${c.hora}` });
      }
    } else {
      // Diaria: un aviso por día a la hora indicada, hasta el día de la cita.
      if (!enEstaHora(r.hora || "08:00")) continue;
      if (c.fecha < hoy) continue;
      const dias = Math.round((Date.parse(c.fecha) - Date.parse(hoy)) / 86400000);
      const cuando = dias === 0 ? `hoy a las ${c.hora}` : dias === 1 ? `mañana a las ${c.hora}` : `en ${dias} días`;
      await enviar({ ...base, clave: `cita_${doc.id}_${hoy}_d`, titulo: `Cita con ${nombre} ${cuando}`, cuerpo: `${c.tipo} · ${c.fecha} ${c.hora}` });
    }
  }
}

async function avisosDeComidas() {
  const pacientes = await db.collection("pacientes").get();
  for (const doc of pacientes.docs) {
    const p = doc.data();
    if (p.estado === "pausado" || p.estado === "baja") continue;
    const rec = p.recordatorios;
    if (!rec || rec.activos === false) continue;
    const tokens = await tokensDe(doc.id);
    if (!tokens.length) continue;
    for (const [comida, hora] of Object.entries(rec.comidas || {})) {
      if (!enEstaHora(hora)) continue;
      const miembros = await db.collection("usuarios").where("pacienteId", "==", doc.id).get();
      for (const u of miembros.docs) {
        await enviar({
          clave: `comida_${doc.id}_${u.id}_${hoy}_${comida}`,
          destinoUid: u.id, pacienteId: doc.id, tipo: "recordatorio_comida", canal: "push", tokens,
          titulo: `Hora de anotar el ${comida}`,
          cuerpo: "Registra lo que comiste para que tu nutricionista lo vea.",
        });
      }
    }
  }
}

await avisosDeCitas();
await avisosDeComidas();
console.log("Listo:", hoy, horaAhora, "(Lima)");
