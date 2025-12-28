const { ezra } = require('../fredi/ezra');
const menuState = require('../lib/menu2State');
const conf = require('../set');

ezra({ nomCom: 'menu2', aliases: ['menu'], categorie: 'VIPER-Menu', reaction: '📜' }, async (dest, zk, commandeOptions) => {
    const { repondre, ms } = commandeOptions;

    const title = '🛡️ VIPER • MAIN MENU';
    const description = '✨ Choose a category by replying with a number or tapping a button below.';
    const thumbnail = conf.URL || 'https://files.catbox.moe/82aewo.png';

    // build sections
    const sections = [
        {
            title: '🎮 Fun & Games',
            rows: [
                { title: '① Fun', rowId: '.menu 1', description: 'Stylish & entertaining commands' },
                { title: '② Games', rowId: '.menu 2', description: 'Play exciting mini-games' }
            ]
        },
        {
            title: '⬇️ Downloads',
            rows: [
                { title: '③ Media', rowId: '.menu 3', description: 'Download videos & audio' },
                { title: '④ URLs', rowId: '.menu 4', description: 'Smart URL tools & helpers' }
            ]
        },
        {
            title: '🤖 AI & Tools',
            rows: [
                { title: '⑤ AI', rowId: '.menu 5', description: 'GPT & image generation' },
                { title: '⑥ Utilities', rowId: '.menu 6', description: 'Useful system tools' }
            ]
        }
    ];

    try {
        // build a human-readable caption listing sections and rows
        let caption = `╭─❖  *${title}*  ❖─╮\n`;
        caption += `${description}\n`;
        caption += `╰───────────────╯\n\n`;

        for (const s of sections) {
            caption += `✦ *${s.title}*\n`;
            for (const r of s.rows) {
                caption += `  ▸ ${r.title}\n    ↳ ${r.description}\n    ↳ _Send:_ ${r.rowId}\n`;
            }
            caption += `\n`;
        }

        caption += `━━━━━━━━━━━━━━━━━━━\n`;
        caption += `📝 _Reply with a number or tap a button below._\n`;
        caption += `⚡ Powered by *VIPER MD*`;

        await zk.sendMessage(dest, {
            image: { url: thumbnail },
            caption,
            footer: '🐍 VIPER MD • Smart WhatsApp Bot',
            templateButtons: [
                { quickReplyButton: { displayText: '🔍 Search', id: 'menu_search' } },
                { quickReplyButton: { displayText: '📥 My Downloads', id: 'menu_downloads' } },
                { quickReplyButton: { displayText: '⚙️ Settings', id: 'menu_settings' } }
            ],
            contextInfo: {
                externalAdReply: {
                    title,
                    body: description,
                    thumbnailUrl: thumbnail,
                    sourceUrl: conf.GURL || ''
                }
            }
        }, { quoted: ms });

        // set pending state so a user can reply with a number
        await menuState.setPending(dest);
    } catch (e) {
        repondre('❌ Failed to send menu:\n' + (e?.message || e));
    }

});
