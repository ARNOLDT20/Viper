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
    // load registered commands
    const { cm } = require("../fredi/ezra");

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

    // If a numeric argument provided, show commands for that category
    if (arg && arg[0]) {
        const idx = parseInt(arg[0].toString());
        if (isNaN(idx) || idx < 1 || idx > categories.length) {
            return repondre(`Please enter a valid category number between 1 and ${categories.length}.`);
        }
        const catName = categories[idx - 1];
        const cmds = map[catName] || [];
        let out = [];
        out.push('╔════════════════════════╗');
        out.push(`║  ☢️  VIPER - ${catName}  ║`);
        out.push('╠════════════════════════╣');
        out.push(`║ Requested by: ${nomAuteurMessage}`);
        out.push('╠════════════════════════╣');
        if (cmds.length === 0) {
            out.push('║ No commands found in this category');
        } else {
            for (let i = 0; i < cmds.length; i++) {
                out.push(`║ ${i + 1}. ${prefixe}${cmds[i]}`);
            }
        }
        out.push('╚════════════════════════╝');
        return repondre(out.join('\n'));
    }

    // otherwise show list of categories as a WhatsApp List message
    try {
        const sections = [{
            title: "VIPER Categories",
            rows: categories.map((c, i) => ({
                title: `${i + 1}. ${c}`,
                rowId: `${prefixe}menu2 ${i + 1}`,
                description: `${(map[c] || []).length} command(s)`
            }))
        }];

        const list = {
            text: "Select a category to view its commands:",
            footer: "VIPER MD — Menu",
            title: "☢️ VIPER CATEGORIES ☢️",
            buttonText: "Choose category",
            sections
        };

        await zk.sendMessage(dest, list);
    } catch (e) {
        console.error('menu2 send error', e);
        repondre("❌ Could not send menu. Try again later.");
    }
});
