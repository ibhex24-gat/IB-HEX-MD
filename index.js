import { connectBot } from "./lib/connection.js"
import { handler } from "./lib/handler.js"

const sock = await connectBot()

sock.ev.on("messages.upsert", async ({ messages }) => {
  const m = messages[0]
  if (!m.message) return
  await handler(sock, m)
})
