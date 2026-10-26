/* Respaldo de Firestore a un repositorio privado de GitHub.
   Lo corre .github/workflows/respaldo-firestore.yml cada noche.
   Exporta cada colección a JSON dentro de respaldo/AAAA-MM-DD/ y el workflow lo sube.
   Variables: FIREBASE_SERVICE_ACCOUNT (JSON de la cuenta de servicio), DESTINO (carpeta). */
import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import admin from "firebase-admin";

const credencial = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || "{}");
if (!credencial.project_id) {
  console.error("Falta el secreto FIREBASE_SERVICE_ACCOUNT con la cuenta de servicio de Firebase.");
  process.exit(1);
}
admin.initializeApp({ credential: admin.credential.cert(credencial) });
const db = admin.firestore();

const hoy = new Date().toISOString().slice(0, 10);
const destino = join(process.env.DESTINO || "respaldo", hoy);
await mkdir(destino, { recursive: true });

/* Subcolecciones que cuelgan de cada paciente. `registros` tiene un nivel más
   (registros/{fecha}/items), por eso se recorre aparte. */
const SUBCOLECCIONES = ["menuHoy", "menuEdiciones", "dispositivos", "evaluaciones", "notasConsulta"];

const datos = (snap) => snap.docs.map((d) => ({ id: d.id, ...d.data() }));

async function respaldar() {
  const salida = { generado: new Date().toISOString(), proyecto: credencial.project_id, pacientes: {}, citas: [], notificaciones: [], usuarios: [], nutricionistas: [] };

  salida.usuarios = datos(await db.collection("usuarios").get());
  salida.nutricionistas = datos(await db.collection("nutricionistas").get());
  salida.citas = datos(await db.collection("citas").get());
  salida.notificaciones = datos(await db.collection("notificaciones").get());

  const pacientes = await db.collection("pacientes").get();
  for (const doc of pacientes.docs) {
    const p = { ...doc.data(), registros: {} };
    for (const sub of SUBCOLECCIONES) {
      const s = datos(await doc.ref.collection(sub).get());
      if (s.length) p[sub] = s;
    }
    const dias = await doc.ref.collection("registros").get();
    for (const dia of dias.docs) {
      p.registros[dia.id] = datos(await dia.ref.collection("items").get());
    }
    salida.pacientes[doc.id] = p;
  }

  await writeFile(join(destino, "firestore.json"), JSON.stringify(salida, null, 1));
  const resumen = {
    fecha: hoy,
    pacientes: Object.keys(salida.pacientes).length,
    citas: salida.citas.length,
    notificaciones: salida.notificaciones.length,
    dias_de_registro: Object.values(salida.pacientes).reduce((n, p) => n + Object.keys(p.registros).length, 0),
  };
  await writeFile(join(destino, "resumen.json"), JSON.stringify(resumen, null, 1));
  console.log("Respaldo listo:", JSON.stringify(resumen));
}

await respaldar();
