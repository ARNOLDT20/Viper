const { cmd } = require('../command');

cmd({
    pattern: "x",
    alias: ["delete", "remove"],
    react: "🗑️",
    desc: "Delete quoted message and command message (Owner only)",
    category: "owner",
    use: '.del (reply to a message)',
    filename: __filename
}, async (conn, mek, m, { from, reply, quoted, isOwner }) => {
    try {
        if (!isOwner) return reply("❌ This is an owner-only command");
        if (!quoted) return reply("❌ Please reply to the message you want to delete");

        let successCount = 0;

        // Method 1: Try direct deletion first
        try {
            // Delete command message (always from bot)
            await conn.sendMessage(from, {
                delete: {
                    id: mek.key.id,
                    remoteJid: from,
                    fromMe: true
                }
            });
            successCount++;
        } catch (e) {
            console.log('Command delete failed:', e.message);
        }

        // Try to delete quoted message if it's from bot
        if (quoted.key.fromMe) {
            try {
                await conn.sendMessage(from, {
                    delete: {
                        id: quoted.key.id,
                        remoteJid: from,
                        fromMe: true
                    }
                });
                successCount++;
            } catch (e) {
                console.log('Quoted delete failed:', e.message);
            }
        } else {
            // If quoted message is not from bot, use clear message method
            try {
                await conn.sendMessage(from, {
                    text: "🚫 *Message cleared by admin*",
                    edit: quoted.key
                });
                successCount++;
            } catch (editError) {
                console.log('Edit method failed:', editError.message);
            }
        }

        // Send temporary feedback
        if (successCount > 0) {
            const feedback = await reply(`🗑️ Cleared ${successCount} message(s)`);
            setTimeout(async () => {
                try {
                    await conn.sendMessage(from, {
                        delete: {
                            id: feedback.key.id,
                            remoteJid: from,
                            fromMe: true
                        }
                    });
                } catch (e) {
                    // Ignore
                }
            }, 1500);
        } else {
            await reply("❌ No messages could be cleared");
        }

    } catch (error) {
        console.error('Delete command error:', error);
        reply("❌ Failed to process delete command");
    }
});
