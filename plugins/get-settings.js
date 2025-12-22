"use strict";
const { ezra } = require("../fredi/ezra");
const s = require("../set");

function yesNo(v) { return (String(v || '').toLowerCase() === 'yes' || String(v || '').toLowerCase() === 'oui' || String(v || '').toLowerCase() === 'on') ? '✅' : '❌'; }

ezra({
    nomCom: "getsettings",
    categorie: "VIPER-Menu",
    reaction: "⚙️",
    nomFichier: __filename
}, async (dest, zk, commandeOptions) => {
    const { repondre } = commandeOptions;
    try {
        const lines = [];
        lines.push(`*⚙️ Current Bot Settings*`);
        lines.push('');
        lines.push(`*Bot:* ${s.BOT || s.CAPTION || 'Viper MD'}`);
        lines.push(`*Owner:* ${s.OWNER_NAME || 'T20_starboy'} (${s.NUMERO_OWNER || 'unknown'})`);
        lines.push(`*Prefix:* \\`${s.PREFIXE}\\``);
        lines.push(`*Mode:* ${s.MODE === 'yes' ? 'Public' : 'Private'}`);
        lines.push('');
        lines.push(`*Auto features*`);
        lines.push(`• Auto follow channel: ${yesNo(s.AUTO_FOLLOW_CHANNEL)}  `);
        lines.push(`• Auto join group: ${yesNo(s.AUTO_JOIN_ENABLED)}  `);
        lines.push(`• Auto react: ${yesNo(s.AUTO_REACT)}  • Auto sticker: ${yesNo(s.AUTO_STICKER)}`);
        lines.push(`• Auto save contacts: ${yesNo(s.AUTO_SAVE_CONTACTS)}  • Auto bio: ${yesNo(s.AUTO_BIO)}`);
        lines.push('');
        lines.push(`*Platform / Links*`);
        lines.push(`• Channel: ${s.GURL || 'n/a'}`);
        lines.push(`• GitHub: ${s.GITHUB || 'n/a'}`);
        lines.push('');
        lines.push(`*Limits / Misc*`);
        lines.push(`• Warn limit: ${s.WARN_COUNT || '5'}`);
        lines.push(`• Timezone: ${s.TIMEZONE || 'Africa/Nairobi'}`);

        const caption = lines.join('\n');

        await zk.sendMessage(dest, {
            image: { url: s.URL || 'https://files.catbox.moe/82aewo.png' },
            caption,
            contextInfo: {
                externalAdReply: {
                    title: `${s.BOT || 'Viper MD'} Settings`,
                    body: `Owner: ${s.OWNER_NAME || 'T20_starboy'}`,
                    thumbnailUrl: s.URL || 'https://files.catbox.moe/82aewo.png',
                    sourceUrl: s.GITHUB || 'https://github.com/ARNOLDT20/Viper',
                    mediaType: 1
                }
            }
        });
    } catch (e) {
        console.error("get-settings error:", e);
        try { await repondre("⚠️ Error fetching settings."); } catch (_) {}
    }
});
