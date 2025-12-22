"use strict";
const { ezra } = require("../fredi/ezra");
const moment = require("moment-timezone");
const os = require("os");
// Note: require `set` at runtime inside the handler so changes persist without restart
// no persistent auto-follow/join state shown in menu

const readMore = String.fromCharCode(8206).repeat(4001);

// Function to convert text to fancy uppercase font
const toFancyUppercaseFont = (text) => {
    const fonts = {
        'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅', 'G': '𝐆', 'H': '𝐇', 'I': '𝐈', 'J': '𝐉', 'K': '𝐊', 'L': '𝐋', 'M': '𝐌',
        'N': '𝐍', 'O': '𝐎', 'P': '𝐏', 'Q': '𝐐', 'R': '𝐑', 'S': '𝐒', 'T': '𝐓', 'U': '𝐔', 'V': '𝐕', 'W': '𝐖', 'X': '𝐗', 'Y': '𝐘', 'Z': '𝐙'
    };
    return text.split('').map(char => fonts[char] || char).join('');
};

// Function to convert text to fancy lowercase font
const toFancyLowercaseFont = (text) => {
    const fonts = {
        'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ғ', 'g': 'ɢ', 'h': 'ʜ', 'i': 'ɪ', 'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ', 'm': 'ᴍ',
        'n': 'ɴ', 'o': 'ᴏ', 'p': 'ᴘ', 'q': 'ǫ', 'r': 'ʀ', 's': 's', 't': 'ᴛ', 'u': 'ᴜ', 'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x', 'y': 'ʏ', 'z': 'ᴢ'
    };
    return text.split('').map(char => fonts[char] || char).join('');
};

ezra({ 
    nomCom: "menu", 
    categorie: "VIPER-Menu", 
    reaction: "☢️", 
    nomFichier: __filename 
}, async (dest, zk, commandeOptions) => {
    const { repondre, prefixe, nomAuteurMessage } = commandeOptions;
    // live config
    const s = require('../set');
    const { cm } = require("../fredi/ezra");
    let coms = {};
    let mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }

    cm.map(async (com) => {
        if (!coms[com.categorie]) coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault("Africa/Dar_Es_Salam");
    const hour = moment().hour();
    let greeting = "ɢᴏᴏᴅ ᴍᴏʀɴɪɴɢ";
    if (hour >= 12 && hour < 18) greeting = "ɢᴏᴏᴅ ᴀғᴛᴇʀɴᴏᴏɴ!";
    else if (hour >= 18) greeting = "ɢᴏᴏᴅ ᴇᴠᴇɴɪɴɢ!";
    else if (hour >= 22 || hour < 5) greeting = "ɢᴏᴏᴅ ɴɪɢʜᴛ";

    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');
    const img = 'https://files.catbox.moe/82aewo.png';
    const imgs = 'https://files.catbox.moe/82aewo.png';

    const header = `╔════════════════════════════╗\n` +
                   `║  ✨  *VIPER MD* — Main Menu  ✨  ║\n` +
                   `╚════════════════════════════╝\n`;

    const infoMsg = `*${s.BOT || 'VIPER MD'}* — *Main Menu*\n\n` +
        `👑 Owner: *${s.OWNER_NAME || 'T20_STARBOY'}*\n` +
        `🔰 Prefix: *${s.PREFIXE}*   •   Mode: *${mode}*\n` +
        `📅 Date: *${date}*   •   ⏰ Time: *${temps}*\n` +
        `💠 Platform: *${os.platform()}*   •   ⚙️ Plugins: *${cm.length}*\n\n`;

    let menuMsg = `*${greeting}* 👋\n\n`;

    // nice icons for categories
    const categoryIcons = {
        'VIPER-Menu': '☢️',
        'VIPER FUN': '🎮',
        'VIPER-Admin': '🔒',
        'VIPER-Tools': '🛠️',
        'VIPER-Media': '🖼️'
    };

    for (const cat of Object.keys(coms).sort()) {
        const displayCat = cat.replace(/Fredi/ig, 'VIPER');
        const icon = categoryIcons[displayCat] || '•';
        menuMsg += `*${icon} ${toFancyUppercaseFont(displayCat)}*\n`;
        const cmds = coms[cat].slice().sort();
        let line = '';
        for (const cmd of cmds) {
            line += `\`${s.PREFIXE}${cmd}\` `;
            if (line.length > 60) { menuMsg += line + '\n'; line = ''; }
        }
        if (line) menuMsg += line + '\n';
        menuMsg += '\n';
    }

    menuMsg += `———\n` +
               `📌 *Tips:* Type *${s.PREFIXE}getsettings* to see bot config.\n` +
               `🔔 *Made by:* T20_STARBOY — 2025\n`;

    try {
        // Build externalAdReply only when an image (thumbnail) is available to avoid empty thumbnail fields
        const externalAd = {
            title: `${s.BOT || 'VIPER MD'} — Commands`,
            body: `Owner: ${s.OWNER_NAME || 'T20_STARBOY'}`,
            sourceUrl: s.GURL || 'https://whatsapp.com/channel/0029Vb6H6jF9hXEzZFlD6F3d',
            mediaType: 1,
            renderLargerThumbnail: true
        };
        if (s.URL) externalAd.thumbnailUrl = s.URL;

        // send with presence helper to simulate typing before menu appears
        try {
            const ph = require('../lib/presence-helper');
            await ph.sendWithPresence(zk, dest, {
                image: { url: s.URL || 'https://files.catbox.moe/82aewo.png' },
                caption: header + '\n' + infoMsg + menuMsg,
                contextInfo: { externalAdReply: externalAd }
            }, { quoted: null });
        } catch (e) {
            // fallback
            await zk.sendMessage(dest, {
                image: { url: s.URL || 'https://files.catbox.moe/82aewo.png' },
                caption: header + '\n' + infoMsg + menuMsg,
                contextInfo: { externalAdReply: externalAd }
            });
        }
      } catch (error) {
        console.error("Menu error: ", error);
        repondre("🥵🥵 Menu error: " + error);
    }
});
