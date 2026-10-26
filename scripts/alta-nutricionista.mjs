/* Da acceso al panel a una nutricionista. Lo corre .github/workflows/alta-nutricionista.yml a mano.
   La cuenta (correo y contraseña) se crea antes en Firebase Console › Authentication › Agregar usuario,
   así la contraseña nunca pasa por GitHub. Este script solo crea su perfil en nutricionistas/{uid}
   y un código corto (codigosNutri/{codigo}) para que sus pacientes la elijan desde la app. */
import admin from "firebase-admin";

const credencial = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || "{}");
const correo = (process.env.CORREO || "").trim().toLowerCase();
const nombre = (process.env.NOMBRE || "").trim();
if (!credencial.project_id) { console.error("Falta el secreto FIREBASE_SERVICE_ACCOUNT."); process.exit(1); }
if (!correo) { console.error("Falta el correo."); process.exit(1); }
admin.initializeApp({ credential: admin.credential.cert(credencial) });
const db = admin.firestore();

let usuario;
try {
  usuario = await admin.auth().getUserByEmail(correo);
} catch {
  console.error("No existe una cuenta con ese correo. Créala primero en Firebase Console › Authentication › Agregar usuario.");
  process.exit(1);
}

const ref = db.collection("nutricionistas").doc(usuario.uid);
const actual = (await ref.get()).data() || {};
let codigo = actual.codigo;
if (!codigo) {
  // Código corto y único, p. ej. NUT-4821.
  do { codigo = "NUT-" + String(Math.floor(1000 + Math.random() * 9000)); }
  while ((await db.collection("codigosNutri").doc(codigo).get()).exists);
  await db.collection("codigosNutri").doc(codigo).set({ uid: usuario.uid });
}
await ref.set({ nombre: nombre || actual.nombre || "Lic. Nutricionista", codigo, creadoEn: actual.creadoEn || Date.now() }, { merge: true });
console.log(`Listo: la cuenta ya puede entrar al panel. Código para sus pacientes: ${codigo}`);
