import { config } from "../config.js"
import moment from "moment-timezone"

export default async function handleIncomingMessage(sock, message) {
  try {
    const msg = message.message
    const from = message.key.remoteJid
    if (!msg) return

    // Récupération du texte selon le type de message
    let text = ""
    if (msg.conversation) text = msg.conversation
    else if (msg.extendedTextMessage?.text) text = msg.extendedTextMessage.text

    // Vérifier le préfixe
    if (!text.startsWith(config.prefix)) return

    // Extraire la commande
    const command = text.slice(config.prefix.length).trim().toLowerCase()
    
    // 🔹 COMMANDES DE BASE
    switch (command) {
      case "menu":
        await sock.sendMessage(from, { text: getMenu() })
        break

      case "alive":
        await sock.sendMessage(from, { text: `🤖 ${config.botName} fonctionne parfaitement !\nMode: ${config.mode}\nVersion: ${config.version}` })
        break

      case "ping":
        await sock.sendMessage(from, { text: `🏓 Pong ! ${new Date().toLocaleTimeString()}` })
        break

      case "owner":
        await sock.sendMessage(from, { text: `👤 Propriétaire : ${config.ownerName}\nNuméro : ${config.ownerNumber.join(", ")}` })
        break

      case "dev":
        await sock.sendMessage(from, { text: `💻 Développeur : ${config.developer}` })
        break

      default:
        await sock.sendMessage(from, { text: `❌ Commande inconnue. Tape ${config.prefix}menu pour voir toutes les commandes.` })
    }

  } catch (err) {
    console.error("Erreur handler :", err)
  }
}

// 🔹 FONCTION MENU
function getMenu() {
  const uptime = moment.duration(process.uptime(), "seconds").format("hh:mm:ss")
  return `
╭──${config.botName}─────🥷
│ ʙᴏᴛ : ${config.botName}
│ ᴛᴇᴍᴘꜱ ᴅᴇ ꜰᴏɴᴄᴛɪᴏɴɴᴇᴍᴇɴᴛ : ${uptime}
│ ᴍᴏᴅᴇ : ${config.mode}
│ ᴘʀᴇғɪxᴇ : ${config.prefix}
│ ᴘʀᴏᴘʀɪÉᴛᴀɪʀᴇ : ${config.ownerName}
│ ᴅÉᴠᴇʟᴏᴘᴘᴇᴜʀ : ${config.developer}
│ ᴠᴇʀꜱɪᴏɴ : ${config.version}
╰──────────────🥷

🥷─────────────────🥷
『 𝗜𝗕-𝗛𝗘𝗫-𝗠𝗘𝗡𝗨 』
│ ⬡ ${config.prefix}menu → afficher le menu
│ ⬡ ${config.prefix}alive → état du bot
│ ⬡ ${config.prefix}dev → développeur
│ ⬡ ${config.prefix}ping → vitesse du bot
│ ⬡ ${config.prefix}owner → propriétaire
╰──────────────────🥷
`
}
