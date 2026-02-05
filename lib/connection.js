import makeWASocket, { useSingleFileAuthState } from "@whiskeysockets/baileys"
import P from "pino"
import config from "../config.js" // <- ton numéro ici

export default async function connectToWhatsapp(handler) {
  const { state, saveCreds } = await useSingleFileAuthState("auth_info.json")

  const sock = makeWASocket({
    auth: state,
    logger: P({ level: "silent" }),
    browser: ["IB-HEX-MD", "Chrome", "1.0"]
  })

  sock.ev.on("creds.update", saveCreds)

  sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {
    if (connection === "close") {
      console.log("⚠️ Déconnecté :", lastDisconnect?.error?.output?.statusCode)
      connectToWhatsapp(handler)
    }
    if (connection === "open") console.log("✅ WhatsApp connecté avec succès")
  })

  // passer les messages au handler
  sock.ev.on("messages.upsert", async ({ messages }) => {
    const m = messages[0]
    if (!m.message) return
    await handler(sock, m)
  })

  return sock
}
