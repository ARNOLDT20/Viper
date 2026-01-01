"use strict";
const { ezra } = require("../fredi/ezra");
const moment = require("moment-timezone");
const os = require("os");
const s = require("../set");

const readMore = String.fromCharCode(8206).repeat(4001);

// Fancy uppercase
const toFancyUppercaseFont = (text) => {
    const fonts = {
        A: '𝐀', B: '𝐁', C: '𝐂', D: '𝐃', E: '𝐄', F: '𝐅', G: '𝐆', H: '𝐇', I: '𝐈', J: '𝐉', K: '𝐊', L: '𝐋', M: '𝐌',
        N: '𝐍', O: '𝐎', P: '𝐏', Q: '𝐐', R: '𝐑', S: '𝐒', T: '𝐓', U: '𝐔', V: '𝐕', W: '𝐖', X: '𝐗', Y: '𝐘', Z: '𝐙'
    };
    return text.split('').map(c => fonts[c] || c).join('');
};

// Fancy lowercase
const toFancyLowercaseFont = (text) => {
    const fonts = {
        a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ғ', g: 'ɢ', h: 'ʜ', i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ',
        n: 'ɴ', o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ', s: 's', t: 'ᴛ', u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ'
    };
    return text.split('').map(c => fonts[c] || c).join('');
};

ezra({
    nomCom: "menu",
    categorie: "VIPER-Menu",
    reaction: "☢️",
    nomFichier: __filename
}, async (dest, zk, commandeOptions) => {

    const { repondre, prefixe, nomAuteurMessage } = commandeOptions;
    const { cm } = require("../fredi/ezra");
    let coms = {};
    let mode = (s.MODE).toLowerCase() === "yes" ? "public" : "private";

    cm.map((com) => {
        if (!coms[com.categorie]) coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault("Africa/Dar_Es_Salam");
    const hour = moment().hour();

    let greeting = "ɢᴏᴏᴅ ᴍᴏʀɴɪɴɢ ☀️";
    if (hour >= 12 && hour < 18) greeting = "ɢᴏᴏᴅ ᴀғᴛᴇʀɴᴏᴏɴ 🌤️";
    else if (hour >= 18 && hour < 22) greeting = "ɢᴏᴏᴅ ᴇᴠᴇɴɪɴɢ 🌙";
    else if (hour >= 22 || hour < 5) greeting = "ɢᴏᴏᴅ ɴɪɢʜᴛ 🌌";

    const time = moment().format("HH:mm:ss");
    const date = moment().format("DD/MM/YYYY");

    // 🌟 HEADER (ROYAL GLASS)
    const infoMsg = `
╔══════════════════════════════╗
║     ☢️ 𝐕 𝐈 𝐏 𝐄 𝐑  𝐌 𝐃 ☢️     ║
╠══════════════════════════════╣
║ 👤 User     : ${nomAuteurMessage}
║ 🔑 Prefix   : ${s.PREFIXE}
║ ⚙️ Mode     : ${mode}
║ 🧩 Plugins  : ${cm.length}
║ 💻 Platform : ${os.platform()}
║ 👑 Owner    : T20_starboy
║ 🕒 Time     : ${time}
║ 📆 Date     : ${date}
╚══════════════════════════════╝
`;

    let menuMsg = `
✨ ${greeting} ✨
✦──────────────────────────✦
${readMore}
`;

    // 👑 ROYAL CATEGORY STYLE
    for (const cat in coms) {
        menuMsg += `
╔═══════〔 ☢️ ${toFancyUppercaseFont(cat)} 〕═══════╗
`;
        for (const cmd of coms[cat]) {
            menuMsg += `║ ✪ ${toFancyLowercaseFont(prefixe + cmd)}\n`;
        }
        menuMsg += `╚══════════════════════════════════════╝\n`;
    }

    // 🌟 FOOTER
    menuMsg += `
✦──────────────────────────✦
✨ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴛ20 ᴄʟᴀsɪᴄ ᴛᴇᴄʜ
☢️ 𝐕𝐈𝐏𝐄𝐑 𝐌𝐃 — 2025
✦──────────────────────────✦
`;

    try {
        await zk.sendMessage(dest, {
            image: { url: "https://files.catbox.moe/82aewo.png" },
            caption: infoMsg + menuMsg,
            contextInfo: {
                isForwarded: true,
                forwardingScore: 999,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363420222821450@newsletter",
                    newsletterName: "@T20_starboy",
                    serverMessageId: -1
                },
                externalAdReply: {
                    title: "☢️ VIPER MD ☢️",
                    body: "👑 Royal Command Menu",
                    thumbnailUrl: "https://files.catbox.moe/82aewo.png",
                    sourceUrl: "https://whatsapp.com/channel/0029Vb6H6jF9hXEzZFlD6F3d",
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });
    } catch (error) {
        console.error("Menu error:", error);
        repondre("❌ Menu error: " + error);
    }
});
