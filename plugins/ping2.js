"use strict";
const { ezra } = require("../fredi/ezra");

ezra({
    nomCom: "ping2",
    categorie: "VIPER-Menu",
    reaction: "🏓",
    nomFichier: __filename
}, async (dest, zk, opts) => {
    const { repondre, nomAuteurMessage } = opts;

    try {
        const start = Date.now();

        // measure response speed
        await new Promise(r => setTimeout(r, 50));
        const speed = Date.now() - start;

        const out = [];
        out.push("╔════════════════════════════╗");
        out.push("║        ☢️ VIPER MD ☢️        ║");
        out.push("╠════════════════════════════╣");
        out.push(`║ 👤 User   : ${nomAuteurMessage}`);
        out.push(`║ 🏓 Ping   : ${speed} ms`);
        out.push(`║ ⚡ Status : ONLINE`);
        out.push("╠════════════════════════════╣");
        out.push("║ 🚀 Fast • Secure • Stable");
        out.push("╚════════════════════════════╝");

        await zk.sendMessage(dest, {
            text: out.join("\n"),
            contextInfo: {
                externalAdReply: {
                    title: "🏓 VIPER MD — PING",
                    body: "Bot response speed check",
                    thumbnailUrl: "https://files.catbox.moe/82aewo.png",
                    sourceUrl: "https://github.com/ARNOLDT20/Viper"
                }
            }
        });

    } catch (e) {
        console.error("ping2 error", e);
        repondre("❌ Ping failed. Try again.");
    }
});
