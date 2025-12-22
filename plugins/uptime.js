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

        const msg = `⏱️ Uptime Report

• Bot (Node) uptime: ${formatDuration(nodeUptime)}
• System uptime: ${formatDuration(systemUptime)}
• Platform: ${os.platform()} ${os.arch()}
• CPU cores: ${os.cpus().length}
• Memory: ${(mem.rss / 1024 / 1024).toFixed(2)} MB (RSS)
`;

        await zk.sendMessage(dest, { text: msg });
    } catch (e) {
        console.error("uptime error:", e);
        try { await repondre("⚠️ Error retrieving uptime."); } catch (_) {}
    }
});
