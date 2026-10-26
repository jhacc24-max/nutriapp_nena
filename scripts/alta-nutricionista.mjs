/* Da acceso al panel. Lo corre .github/workflows/alta-nutricionista.yml a mano.
   La cuenta (correo y contraseña) se crea antes en Firebase Console › Authentication › Agregar usuario,
   así la contraseña nunca pasa por GitHub.
   - ROL=nutricionista: crea su perfil en nutricionistas/{uid} y un código corto
     (codigosNutri/{codigo}) para que sus pacientes la elijan desde la app.
   - ROL=admin: crea admins/{uid}; desde el panel podrá invitar nutricionistas y ver a todos. */
import admin from "firebase-admin";

const credencial = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || "{}");
const correo = (process.env.CORREO || "").trim().toLowerCase();
const nombre = (process.env.NOMBRE || "").trim();
const rol = (process.env.ROL || "nutricionista").trim();
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

if (rol === "admin") {
  await db.collection("admins").doc(usuario.uid).set({ correo, creadoEn: Date.now() }, { merge: true });
  console.log("Listo: la cuenta ya es administradora del panel.");
  process.exit(0);
}

const ref = db.collection("nutricionistas").doc(usuario.uid);
const actual = (await ref.get()).data() || {};
let codigo = actual.codigo;
if (!codigo) {
  // Código corto y único, p. ej. NUT-4821.
  do { codigo = "NUT-" + String(Math.floor(1000 + Math.random() * 9000)); }
  while ((await db.collection("codigosNutri").doc(codigo).get()).exists);
  await db.collection("codigosNutri").doc(codigo).set({ uid: usuario.uid, correo });
}
await ref.set({ nombre: nombre || actual.nombre || "Lic. Nutricionista", codigo, correo, creadoEn: actual.creadoEn || Date.now() }, { merge: true });
console.log(`Listo: la cuenta ya puede entrar al panel. Código para sus pacientes: ${codigo}`);
