"use strict";
const { ezra } = require("../fredi/ezra");
const os = require("os");
const fs = require("fs");
const path = require("path");
const s = require("../set");
const { sendWithPresence } = require('../lib/presence-helper');

function formatDuration(seconds) {
  seconds = Number(seconds);
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const sRem = Math.floor(seconds % 60);
  const parts = [];
  if (d) parts.push(d + (d === 1 ? " day" : " days"));
  if (h) parts.push(h + (h === 1 ? " hr" : " hrs"));
  if (m) parts.push(m + (m === 1 ? " min" : " mins"));
  if (sRem || parts.length === 0) parts.push(sRem + (sRem === 1 ? " sec" : " secs"));
  return parts.join(", ");
}

ezra({
  nomCom: "alive",
  aliases: ["ping", "iamalive"],
  categorie: "VIPER-Menu",
  reaction: "💚",
  nomFichier: __filename
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  try {
    // Refresh config to reflect runtime changes
    try { delete require.cache[require.resolve('../set')] } catch (e) {}
    const cfg = require('../set');

    const nodeUptime = process.uptime();
    const systemUptime = os.uptime();
    const mem = process.memoryUsage();
    const memMB = (mem.rss / 1024 / 1024).toFixed(2);
    const cpu = os.cpus()[0]?.model || 'CPU';
    let pluginCount = 0;
    try { pluginCount = fs.readdirSync(path.join(__dirname)).filter(f=>f.endsWith('.js')).length } catch(e){}

    const title = `💚 ${cfg.BOT || 'VIPER MD'} — Alive`;

    const body = `╭━─━─━─━─━─━─━╮\n`+
                 `✨ *${cfg.BOT || 'VIPER MD'} is online!* ✨\n`+
                 `╰━─━─━─━─━─━─━╯\n\n`+
                 `• Bot: *${cfg.BOT || 'VIPER MD'}*\n`+
                 `• Owner: *${cfg.OWNER_NAME || 'T20_starboy'}*\n`+
                 `• Uptime: *${formatDuration(nodeUptime)}*\n`+
                 `• System: *${formatDuration(systemUptime)}*\n`+
                 `• Memory: *${memMB} MB*\n`+
                 `• Plugins: *${pluginCount}*\n\n`+
                 `Want to play? Use the menu with *${cfg.PREFIXE || '*'}menu*\n`+
                 `Stay awesome — ${cfg.OWNER_NAME || 'T20_starboy'}`;

    const imgUrl = cfg.URL || 'https://files.catbox.moe/82aewo.png';

    const message = {
      image: { url: imgUrl },
      caption: body,
      contextInfo: {
        externalAdReply: {
          title: title,
          body: 'Status & quick info',
          thumbnailUrl: imgUrl,
          sourceUrl: cfg.GURL || ''
        }
      }
    };

    // send with presence helper to simulate typing
    try {
      await sendWithPresence(zk, dest, message, { quoted: ms });
    } catch (e) {
      // fallback
      await zk.sendMessage(dest, message, { quoted: ms });
    }

  } catch (e) {
    console.error('alive command error', e);
    try { await repondre('⚠️ Something went wrong while preparing alive info.'); } catch(_){}
  }
});
