// 🔐 FIX OBLIGATOIRE POUR BAILEYS (WebCrypto)
import { webcrypto } from "node:crypto"

if (!globalThis.crypto) {
  globalThis.crypto = webcrypto
}

// 🚀 IMPORTS DU BOT
import { connectBot } from "./lib/connection.js"
import { handler } from "./lib/handler.js"

// 🔗 CONNEXION WHATSAPP
const sock = await connectBot()

// 📩 ÉCOUTE DES MESSAGES
sock.ev.on("messages.upsert", async ({ messages }) => {
  const m = messages[0]
  if (!m.message) return

  try {
    await handler(sock, m)
  } catch (err) {
    console.error("Erreur handler :", err)
  }
})

console.log("🤖 IB-HEX-MD est lancé avec succès")
