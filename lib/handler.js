// handler.js
const config = require("../config.js"); // ✅ utilise le CommonJS

console.log("Mon numéro WhatsApp :", config.Number);

// Exemple : utiliser ton numéro pour quelque chose
// par exemple, initialiser ton bot avec le numéro
// bot.init(config.Number);
