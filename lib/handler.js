import fs from "fs"
import { config } from "../config.js"

export async function handler(sock, m) {
  const body = m.message?.conversation || m.message?.extendedTextMessage?.text || ""
  if (!body.startsWith(config.prefix)) return

  const args = body.slice(config.prefix.length).trim().split(/ +/)
  const command = args.shift().toLowerCase()

  const cmdFile = `./commands/${command}.js`
  if (fs.existsSync(cmdFile)) {
    const cmd = await import(`../commands/${command}.js`)
    cmd.default(sock, m, args)
  }
}
