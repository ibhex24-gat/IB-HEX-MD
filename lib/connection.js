import makeWASocket, {
  useMultiFileAuthState,
  fetchLatestBaileysVersion
} from "@whiskeysockets/baileys"
import P from "pino"
import qrcode from "qrcode" // pour convertir QR en image Base64

/**
 * connectBot(qrCallback)
 * qrCallback : fonction qui reçoit le QR en Base64 pour la page Web
 */
export async function connectBot(qrCallback) {
  // 🔐 Gestion de session
  const { state, saveCreds } = await useMultiFileAuthState("session")

  // 🔎 Dernière version WhatsApp
  const { version } = await fetchLatestBaileysVersion()

  // ⚡ Création du socket WhatsApp
  const sock = makeWASocket({
    version,
    logger: P({ level: "silent" }),
    auth: state,
    browser: ["IB-HEX-MD", "Chrome", "1.0"]
  })

  // 🔄 Sauvegarde automatique des credentials
  sock.ev.on("creds.update", saveCreds)

  // 📡 Gestion des updates de connexion
  sock.ev.on("connection.update", async (update) => {
    const { qr, connection, lastDisconnect } = update

    // 🔑 QR code généré
    if (qr && qrCallback) {
      // Convertir QR ASCII en image Base64
      try {
        const qrBase64 = await qrcode.toDataURL(qr)
        qrCallback(qrBase64) // envoie à la page web
      } catch (err) {
        console.log("Erreur génération QR :", err)
      }
    }

    // ✅ Connecté
    if (connection === "open") {
      console.log("✅ WhatsApp connecté avec succès")
    }

    // 🔄 Déconnexion → reconnexion automatique
    if (connection === "close") {
      const reason = lastDisconnect?.error?.output?.statusCode
      console.log("⚠️ Déconnecté :", reason)
      connectBot(qrCallback).catch((err) => console.log("Erreur reconnexion :", err))
    }
  })

  return sock
}
