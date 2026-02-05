// lib/handler.js
import { config } from "../config.js";
import connectToWhatsapp from "./connection.js";

export function startBot() {
  console.log("Mon numéro WhatsApp :", config.Number);
  connectToWhatsapp();
}
