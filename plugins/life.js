const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const config = require('../config');

cmd({
    pattern: "popkidstatus",
    alias: ["status", "live"],
    desc: "Check uptime and system status",
    category: "main",
    react: "🔮",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
    try {
        await conn.sendMessage(from, { react: { text: '🔮', key: mek.key } });
        
        const totalCmds = commands.length;
        const uptime = () => {
            let sec = process.uptime();
            let h = Math.floor(sec / 3600);
            let m = Math.floor((sec % 3600) / 60);
            let s = Math.floor(sec % 60);
            return `${h}h ${m}m ${s}s`;
        };

        const startTime = Date.now();
        const responseTime = Date.now() - mek.messageTimestamp * 1000;

        const captionText = `
*┏────〘 ᴘᴏᴘᴋɪᴅ 〙───⊷*
*┃* ʙᴏᴛ ᴜᴘᴛɪᴍᴇ: ${uptime()}
*┃* ᴀᴄᴛɪᴠᴇ ᴜsᴇʀs: ${Object.keys(conn.chats).length}
*┃* ʏᴏᴜʀ ɴᴜᴍʙᴇʀ: ${sender.split('@')[0]}
*┃* ᴠᴇʀsɪᴏɴ: ${config.version || '1.0.0'}
*┃* ᴍᴇᴍᴏʀʏ ᴜsᴀɢᴇ: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB
*┗──────────────⊷

> *▫️ᴘᴏᴘᴋɪᴅ ᴍɪɴɪ ᴍᴀɪɴ*
> sᴛᴀᴛᴜs: ONLINE ✅
> ʀᴇsᴘᴏɴᴅ ᴛɪᴍᴇ: ${responseTime}ms`;

        const aliveMessage = {
            image: { url: "https://files.catbox.moe/kiy0hl.jpg" },
            caption: `> ᴀᴍ ᴀʟɪᴠᴇ ɴ ᴋɪᴄᴋɪɴɢ 🥳\n\n${captionText}`,
            buttons: [
                {
                    buttonId: `${config.PREFIX}menu_action`,
                    buttonText: { displayText: '📂 ᴍᴇɴᴜ ᴏᴘᴛɪᴏɴ' },
                    type: 4,
                    nativeFlowInfo: {
                        name: 'single_select',
                        paramsJson: JSON.stringify({
                            title: 'ᴄʟɪᴄᴋ ʜᴇʀᴇ ❏',
                            sections: [
                                {
                                    title: `ᴘᴏᴘᴋɪᴅ ᴍɪɴɪ ʙᴏᴛ`,
                                    highlight_label: 'Quick Actions',
                                    rows: [
                                        { title: '📋 ғᴜʟʟ ᴍᴇɴᴜ', description: 'ᴠɪᴇᴡ ᴀʟʟ ᴀᴠᴀɪʟᴀʙʟᴇ ᴄᴍᴅs', id: `${config.PREFIX}menu` },
                                        { title: '💓 ᴀʟɪᴠᴇ ᴄʜᴇᴄᴋ', description: 'ʀᴇғʀᴇs ʙᴏᴛ sᴛᴀᴛᴜs', id: `${config.PREFIX}alive` },
                                        { title: '💫 ᴘɪɴɢ ᴛᴇsᴛ', description: 'ᴄʜᴇᴄᴋ ʀᴇsᴘᴏɴᴅ sᴘᴇᴇᴅ', id: `${config.PREFIX}ping` }
                                    ]
                                },
                                {
                                    title: "ϙᴜɪᴄᴋ ᴄᴍᴅs",
                                    highlight_label: 'Popular',
                                    rows: [
                                        { title: '🤖 ᴀɪ ᴄʜᴀᴛ', description: 'Start AI conversation', id: `${config.PREFIX}ai Hello!` },
                                        { title: '🎵 ᴍᴜsɪᴄ sᴇᴀʀᴄʜ', description: 'Download your favorite songs', id: `${config.PREFIX}song` },
                                        { title: '📰 ʟᴀᴛᴇsᴛ ɴᴇᴡs', description: 'Get current news updates', id: `${config.PREFIX}news` }
                                    ]
                                }
                            ]
                        })
                    }
                },
                { buttonId: `${config.PREFIX}bot_info`, buttonText: { displayText: 'ℹ️ ʙᴏᴛ ɪɴғᴏ' }, type: 1 },
                { buttonId: `${config.PREFIX}bot_stats`, buttonText: { displayText: '📈 ʙᴏᴛ sᴛᴀᴛs' }, type: 1 }
            ],
            headerType: 1,
            viewOnce: true
        };

        await conn.sendMessage(from, aliveMessage, { quoted: mek });

    } catch (error) {
        console.error('Alive command error:', error);
        
        const uptime = () => {
            let sec = process.uptime();
            let h = Math.floor(sec / 3600);
            let m = Math.floor((sec % 3600) / 60);
            let s = Math.floor(sec % 60);
            return `${h}h ${m}m ${s}s`;
        };

        await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/kiy0hl.jpg" },
            caption: `*🤖 ᴘᴏᴘᴋɪᴅ ᴍɪɴɪ ᴀʟɪᴠᴇ*\n\n` +
                    `*┏────〘 ᴘᴏᴘᴋɪᴅ 〙───⊷*\n` +
                    `*┃* ᴜᴘᴛɪᴍᴇ: ${uptime()}\n` +
                    `*┃* sᴛᴀᴛᴜs: ᴏɴʟɪɴᴇ\n` +
                    `*┃* ɴᴜᴍʙᴇʀ: ${sender.split('@')[0]}\n` +
                    `*┗──────────────⊷*\n\n` +
                    `Type *${config.PREFIX}menu* for commands`
        }, { quoted: mek });
    }
});
