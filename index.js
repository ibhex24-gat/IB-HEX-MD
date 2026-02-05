import connectToWhatsapp from './lib/connection.js'
import handleIncomingMessage from './lib/handler.js'

(async () => {
  await connectToWhatsapp(handleIncomingMessage)
  console.log('🤖 IB-HEX-MD est connecté avec succès !')
})()
