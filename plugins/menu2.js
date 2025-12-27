const { ezra } = require('../fredi/ezra');
const menuState = require('../lib/menu2State');
const conf = require('../set');

ezra({ nomCom: 'menu2', aliases: ['menu'], categorie: 'VIPER-Menu', reaction: '📜' }, async (dest, zk, commandeOptions) => {
    const { repondre, ms } = commandeOptions;

    const title = 'VIPER • Main Menu';
    const description = 'Choose a category by replying the number or tapping a button.';
    const thumbnail = conf.URL || 'https://files.catbox.moe/82aewo.png';

    // build sections
    const sections = [
        {
            title: 'Fun & Games',
            rows: [
                { title: '1. Fun', rowId: '.menu 1', description: 'Stylish fun commands' },
                { title: '2. Games', rowId: '.menu 2', description: 'Play games' }
            ]
        },
        {
            title: 'Downloads',
            rows: [
                { title: '3. Media', rowId: '.menu 3', description: 'Downloaders & converters' },
                { title: '4. URLs', rowId: '.menu 4', description: 'URL tools' }
            ]
        },
        {
            title: 'AI & Tools',
            rows: [
                { title: '5. AI', rowId: '.menu 5', description: 'GPT / Image generation' },
                { title: '6. Utilities', rowId: '.menu 6', description: 'Misc tools' }
            ]
        }
    ];

    try {
        // send thumbnail as externalAdReply in a template message
        await zk.sendMessage(dest, {
            text: `*${title}*\n${description}`,
            footer: 'VIPER MD',
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

        // also send a section list to support older clients
        await zk.sendMessage(dest, {
            title,
            text: description,
            buttonText: 'Open Menu',
            footer: 'VIPER MD',
            sections
        }, { quoted: ms });

        // set pending state so a user can reply with a number
        await menuState.setPending(dest);
    } catch (e) {
        repondre('Failed to send menu: ' + e?.message || e);
    }

});
