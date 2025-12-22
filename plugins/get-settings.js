"use strict";
const { ezra } = require("../fredi/ezra");
const s = require("../set");

ezra({
    nomCom: "getsettings",
    categorie: "VIPER-Menu",
    reaction: "⚙️",
    nomFichier: __filename
}, async (dest, zk, commandeOptions) => {
    const { repondre } = commandeOptions;
    try {
        const settings = `⚙️ Bot Settings

• Bot name: ${s.BOT || s.CAPTION || 'Viper MD'}
• Owner: ${s.OWNER_NAME || 'T20_starboy'}
• Owner number: ${s.NUMERO_OWNER || 'unknown'}
• Prefix: ${s.PREFIXE}
• Mode (public): ${s.MODE}
• Default image URL: ${s.URL}
• Website / Channel: ${s.GURL}
• GitHub: ${s.GITHUB}
• Auto follow channel: ${s.AUTO_FOLLOW_CHANNEL}
• Auto join enabled: ${s.AUTO_JOIN_ENABLED}
• Auto join group link: ${s.AUTO_JOIN_GROUP_LINK}
• Auto react: ${s.AUTO_REACT}
• Auto sticker: ${s.AUTO_STICKER}
• Auto save contacts: ${s.AUTO_SAVE_CONTACTS}
• Auto bio updates: ${s.AUTO_BIO}
• Auto reply / greet: ${s.AUTO_REPLY || s.AUTO_REPLY}
• Timezone: ${s.TIMEZONE}
• Database URL: ${s.DATABASE ? 'configured' : 'not set'}
`;

        await zk.sendMessage(dest, { text: settings });
    } catch (e) {
        console.error("get-settings error:", e);
        try { await repondre("⚠️ Error fetching settings."); } catch (_) {}
    }
});
