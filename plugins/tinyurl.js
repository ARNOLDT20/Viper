"use strict";
const { ezra } = require("../fredi/ezra");
const axios = require("axios");
const s = require("../set");

ezra({ nomCom: "tinyurl", categorie: "VIPER-Tools", reaction: "🔗", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
    const { repondre, arg } = commandeOptions;
    try {
        if (!arg || !arg[0]) {
            return repondre("Usage: tinyurl <long-url>");
        }

        const longUrl = arg.join(" ");
        const api = `http://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`;
        const res = await axios.get(api, { timeout: 10000 });
        const shortUrl = res.data;

        await zk.sendMessage(dest, { text: `🔗 TinyURL created:\n${shortUrl}` });
    } catch (e) {
        console.error("tinyurl error:", e?.message || e);
        try { await repondre("⚠️ Failed to shorten the URL."); } catch (_) {}
    }
});
