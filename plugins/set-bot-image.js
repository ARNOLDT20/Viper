const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { cmd } = require('../command');

cmd({
    pattern: 'setbotimg',
    alias: ['setbotimage','setbotpic','setbot'],
    desc: 'Set bot profile picture (reply to image or provide image URL).',
    category: 'owner',
    react: '🖼️',
    filename: __filename
},
async (conn, mek, m, { from, isOwner, quoted, args, reply }) => {
    if (!isOwner) return reply('❌ You are not the owner!');

    try {
        let buffer;

        // If replying to an image message
        if (quoted && quoted.message && quoted.message.imageMessage) {
            const stream = await downloadContentFromMessage(quoted.message.imageMessage, 'image');
            buffer = Buffer.from([]);
            for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

        // If provided a direct image URL as argument
        } else if (args && args[0] && /^https?:\/\//i.test(args[0])) {
            const res = await axios.get(args[0], { responseType: 'arraybuffer' });
            buffer = Buffer.from(res.data);

        } else {
            return reply('❌ Please reply to an image or provide a valid image URL.');
        }

        const mediaPath = path.join(__dirname, `${Date.now()}.jpg`);
        fs.writeFileSync(mediaPath, buffer);

        await conn.updateProfilePicture(conn.user.jid, { url: `file://${mediaPath}` });
        reply('✅ Bot profile picture updated successfully!');

        // Optional: remove the temporary file after a short delay
        setTimeout(() => {
            try { fs.unlinkSync(mediaPath); } catch (e) { /* ignore */ }
        }, 60 * 1000);

    } catch (error) {
        console.error('Error in setbotimg:', error);
        reply(`❌ Error updating profile picture: ${error.message}`);
    }
});
