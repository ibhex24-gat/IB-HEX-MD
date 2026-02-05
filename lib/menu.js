import moment from "moment-timezone"
import { config } from "../config.js"

export default async (sock, m) => {
  const uptime = process.uptime()
  const h = Math.floor(uptime / 3600)
  const min = Math.floor((uptime % 3600) / 60)
  const sec = Math.floor(uptime % 60)

  const menu = `
╭──𝗜𝗕-𝗛𝗘𝗫-𝗠𝗗─────🥷
│ ʙᴏᴛ : ${config.botName}
│ ᴛᴇᴍᴘꜱ ᴅᴇ ꜰᴏɴᴄᴛɪᴏɴɴᴇᴍᴇɴᴛ : ${h}h ${min}m ${sec}s
│ ᴍᴏᴅᴇ : ${config.mode}
│ ᴘʀᴇғɪxᴇ : ${config.prefix}
│ ᴘʀᴏᴘʀɪÉᴛᴀɪʀᴇ : ${config.ownerName}
│ ᴅÉᴠᴇʟᴏᴘᴘᴇᴜʀ : ${config.developer}
│ ᴠᴇʀꜱɪᴏɴ : ${config.version}
╰──────────────🥷

⚡ IB-SACKO-HEX ⚡
`

  await sock.sendMessage(m.key.remoteJid, { text: menu })
}
