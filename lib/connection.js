import makeWASocket, {
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  DisconnectReason
} from "@whiskeysockets/baileys"
import P from "pino"
import readline from "readline"

export async function connectBot() {
  const { state, saveCreds } = await useMultiFileAuthState("session")
  const { version } = await fetchLatestBaileysVersion()

  const sock = makeWASocket({
    version,
    logger: P({ level: "silent" }),
    auth: state,
    printQRInTerminal: false
  })

  // 🔐 PAIR CODE (SI PAS ENCORE CONNECTÉ)
  if (!sock.authState.creds.registered) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    rl.question("📱 Entre ton numéro WhatsApp (ex: 224XXXXXXXXX) : ", async (number) => {
      const code = await sock.requestPairingCode(number.trim())
      console.log("🔑 PAIR CODE :", code)
      rl.close()
    })
  }

  sock.ev.on("creds.update", saveCreds)

  return sock
}
