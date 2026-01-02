"use strict";
const { ezra } = require("../fredi/ezra");
const path = require("path");
const fs = require("fs-extra");

ezra({
    nomCom: "menu2",
    categorie: "VIPER-Menu",
    reaction: "🧭",
    nomFichier: __filename
}, async (dest, zk, opts) => {
    const { repondre, prefixe, nomAuteurMessage } = opts;
    const { cm } = require("../fredi/ezra");
    const menuState = require('../lib/menu2State');

    // build category map
    const categories = [];
    const map = {};
    cm.forEach((c) => {
        const raw = (c.categorie || "Uncategorized").toString();
        const cat = raw.replace(/fredi/gi, "VIPER");
        if (!map[cat]) {
            map[cat] = [];
            categories.push(cat);
        }
        map[cat].push(c.nomCom);
    });

    const arg = (opts.arg && opts.arg.length > 0) ? opts.arg : null;

    // 📂 CATEGORY COMMAND VIEW
    if (arg && arg[0]) {
        const idx = parseInt(arg[0].toString());
        if (isNaN(idx) || idx < 1 || idx > categories.length) {
            return repondre(`❌ *Invalid category number*\nUse between *1 - ${categories.length}*`);
        }

        const catName = categories[idx - 1];
        const cmds = map[catName] || [];
        let out = [];

        out.push("╔════════════════════════════╗");
        out.push("║        ☢️ VIPER MD ☢️        ║");
        out.push("╠════════════════════════════╣");
        out.push(`║ 📁 Category : ${catName}`);
        out.push(`║ 👤 User     : ${nomAuteurMessage}`);
        out.push(`║ ⚙️ Commands : ${cmds.length}`);
        out.push("╠════════════════════════════╣");

        if (cmds.length === 0) {
            out.push("║ ⚠️ No commands found");
        } else {
            cmds.forEach((cmd, i) => {
                out.push(`║ 🔹 ${i + 1}. ${prefixe}${cmd}`);
            });
        }

        out.push("╠════════════════════════════╣");
        out.push("║ ⚡ Powered by VIPER MD");
        out.push("╚════════════════════════════╝");

        return repondre(out.join("\n"));
    }

    // 📜 MAIN MENU (THUMBNAIL ONLY)
    try {
        const header = [];
        header.push("╔════════════════════════════╗");
        header.push("║        ☢️ VIPER MENU ☢️        ║");
        header.push("╠════════════════════════════╣");
        header.push(`║ 👋 Hello : ${nomAuteurMessage}`);
        header.push("║ 🚀 Welcome to VIPER MD");
        header.push("╠════════════════════════════╣");
        header.push("║ 📌 Reply with a number");
        header.push("║ 📂 to open a category");
        header.push("╚════════════════════════════╝");

        // send text with thumbnail only
        await zk.sendMessage(dest, {
            text: header.join("\n"),
            contextInfo: {
                externalAdReply: {
                    title: "☢️ VIPER MD — COMMAND MENU",
                    body: "Reply with category number to explore",
                    thumbnailUrl: "https://files.catbox.moe/82aewo.png",
                    sourceUrl: "https://github.com/ARNOLDT20/Viper"
                }
            }
        });

        const sections = [{
            title: "🧭 VIPER COMMAND CATEGORIES",
            rows: categories.map((c, i) => ({
                title: `📁 ${i + 1}. ${c}`,
                rowId: `${prefixe}menu2 ${i + 1}`,
                description: `⚙️ ${(map[c] || []).length} Commands`
            }))
        }];

        const list = {
            text: "✨ *WELCOME TO VIPER MD* ✨\n\nSelect a category below:",
            footer: "☢️ VIPER MD | T20_STARBOY",
            title: "🧭 VIPER MAIN MENU",
            buttonText: "📂 OPEN CATEGORIES",
            sections
        };

        await menuState.setPending(dest);
        await zk.sendMessage(dest, list);
    } catch (e) {
        console.error("menu2 send error", e);
        repondre("❌ Menu error. Try again later.");
    }
});
