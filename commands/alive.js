export default async (sock, m) => {
  await sock.sendMessage(m.key.remoteJid, {
    text: "🤖 IB-HEX-MD est actif et fonctionne correctement ✅"
  })
}
