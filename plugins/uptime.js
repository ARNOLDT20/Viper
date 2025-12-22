"use strict";
const { ezra } = require("../fredi/ezra");
const os = require("os");
const s = require("../set");

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
    nomCom: "uptime",
    categorie: "VIPER-Menu",
    reaction: "⏱️",
    nomFichier: __filename
}, async (dest, zk, commandeOptions) => {
    const { repondre } = commandeOptions;
    try {
        const nodeUptime = process.uptime();
        const systemUptime = os.uptime();
        const mem = process.memoryUsage();
        const memMB = (mem.rss / 1024 / 1024).toFixed(2);
        const memPercent = Math.round((mem.rss / os.totalmem()) * 100);
        const cpu = os.cpus()[0]?.model || 'CPU';

        const title = `⏱️ ${s.BOT || 'Viper MD'} — Uptime`;
        const caption = `*${s.BOT || 'Viper MD'}* is online ✅\n\n` +
            `• *Bot uptime:* ${formatDuration(nodeUptime)}\n` +
            `• *System uptime:* ${formatDuration(systemUptime)}\n` +
            `• *Platform:* ${os.platform()} ${os.arch()}\n` +
            `• *CPU:* ${cpu} (${os.cpus().length} cores)\n` +
            `• *Memory:* ${memMB} MB (${memPercent}% used)\n\n` +
            `— Stay safe, ${s.OWNER_NAME || 'T20_starboy'}`;

        await zk.sendMessage(dest, {
            image: { url: s.URL || 'https://files.catbox.moe/82aewo.png' },
            caption,
            contextInfo: {
                externalAdReply: {
                    title: title,
                    body: `Uptime & status`,
                    thumbnailUrl: s.URL || 'https://files.catbox.moe/82aewo.png',
                    mediaType: 1,
                    sourceUrl: s.GURL || 'https://whatsapp.com/channel/0029Vb6H6jF9hXEzZFlD6F3d'
                }
            }
        });
    } catch (e) {
        console.error("uptime error:", e);
        try { await repondre("⚠️ Error retrieving uptime."); } catch (_) {}
    }
});
