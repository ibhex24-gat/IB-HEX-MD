import express from "express"
import { connectBot } from "./lib/connection.js"

const app = express()
let latestQR = null

// Page web qui affiche le QR code
app.get("/", (req, res) => {
  if (!latestQR) return res.send("<h2>QR non disponible</h2>")

  res.send(`
    <h2>📱 Scanne le QR avec WhatsApp officielle</h2>
    <img src="${latestQR}" alt="QR Code WhatsApp" />
    <p>🔄 Rafraîchis la page si le QR expire</p>
  `)
})

// Lancer le serveur web
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`🌐 Serveur Web démarré sur : http://localhost:${PORT}`))

// Démarrer le bot et récupérer le QR
const sock = await connectBot((qrBase64) => {
  latestQR = qrBase64
  console.log("🔑 QR mis à jour, ouvre la page web pour scanner")
})
