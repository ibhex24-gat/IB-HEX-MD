import express from "express"
import { connectBot } from "./lib/connection.js"

const app = express()
let latestQR = null

// Page Web qui affiche le QR
app.get("/", (req, res) => {
  if (!latestQR) return res.send("<h2>QR non disponible</h2>")
  res.send(`
    <h2>Scanne le QR avec WhatsApp</h2>
    <img src="data:image/png;base64,${latestQR}" />
  `)
})

app.listen(3000, () => console.log("🌐 Serveur Web démarré sur : http://localhost:3000"))

// Démarrage du bot
const sock = await connectBot((qrBase64) => {
  latestQR = qrBase64 // met à jour le QR pour la page Web
})
