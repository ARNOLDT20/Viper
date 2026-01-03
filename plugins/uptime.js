"use strict";
const { ezra } = require("../fredi/ezra");

ezra({ nomCom: "uptime", categorie: "General-VIPER", reaction: "⏱️", nomFichier: __filename }, async (dest, zk, opts) => {
    const { repondre } = opts;
    try {
        const up = process.uptime();
        const hours = Math.floor(up / 3600);
        const minutes = Math.floor((up % 3600) / 60);
        const seconds = Math.floor(up % 60);
        repondre(`Uptime: ${hours}h ${minutes}m ${seconds}s`);
    } catch (e) { console.error('uptime error', e); repondre('❌ Uptime failed'); }
});
