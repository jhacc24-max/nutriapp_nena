/* Publica firestore.rules en el proyecto de Firebase. Lo corre .github/workflows/reglas-firestore.yml
   cada vez que cambian las reglas en main (o a mano). Usa la misma cuenta de servicio del respaldo. */
import { readFile } from "node:fs/promises";
import admin from "firebase-admin";

const credencial = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || "{}");
if (!credencial.project_id) {
  console.error("Falta el secreto FIREBASE_SERVICE_ACCOUNT.");
  process.exit(1);
}
admin.initializeApp({ credential: admin.credential.cert(credencial) });

const fuente = await readFile("firestore.rules", "utf8");
const ruleset = await admin.securityRules().releaseFirestoreRulesetFromSource(fuente);
// Para la pestaña Sistema del panel (la lee solo el administrador).
await admin.firestore().collection("sistema").doc("estado").set({ reglas: { en: Date.now() } }, { merge: true });
console.log("Reglas publicadas:", ruleset.name, "·", ruleset.createTime);
