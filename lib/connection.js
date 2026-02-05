import makeWASocket, {
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  DisconnectReason
} from "@whiskeysockets/baileys"
import P from "pino"

// 🔗 Fonction de connexion WhatsApp
export async function connectBot() {
  // 📁 Gestion de la session
  const { state, saveCreds } = await useMultiFileAuthState("session")

  // 🔎 Récupérer la dernière version WhatsApp
  const { version } = await fetchLatestBaileysVersion()

  // ⚡ Création du socket WhatsApp
  const sock = makeWASocket({
    version,
    logger: P({ level: "silent" }),
    auth: state,
    printQRInTerminal: true, // 🔑 Affiche QR dans terminal / console Render
    browser: ["IB-HEX-MD", "Chrome", "1.0"] // Identité du bot
  })

  // 🔄 Sauvegarde automatique des credentials
  sock.ev.on("creds.update", saveCreds)

  // 📩 Détection de déconnexion
  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update
    if (connection === "close") {
      const reason = lastDisconnect?.error?.output?.statusCode
      console.log("⚠️ Déconnexion :", reason)
      // 🔁 Reconnexion automatique
      connectBot().catch((err) => console.log("Erreur reconnexion :", err))
    } else if (connection === "open") {
      console.log("✅ WhatsApp connecté avec succès")
    }
  })

  return sock
}
