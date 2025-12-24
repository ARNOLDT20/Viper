const { ezra } = require('../fredi/ezra');
const fs = require('fs');
const path = require('path');

ezra({ nomCom: 'save', aliases: ['.save'], categorie: 'VIPER-Utility', reaction: '💾' }, async (dest, zk, commandeOptions) => {
    const { msgRepondu, repondre, ms } = commandeOptions;

    if (!msgRepondu) return repondre('Reply to the status (forwarded or media message) you want to save.');

    // detect media type
    const mediaTypes = ['imageMessage', 'videoMessage', 'audioMessage', 'stickerMessage', 'documentMessage', 'videoMessage'];
    const mediaType = mediaTypes.find(t => msgRepondu[t]);
    if (!mediaType) return repondre('Replied message has no savable media. Forward the status or reply to it and try again.');

    try {
        const tmpPath = await zk.downloadAndSaveMediaMessage(msgRepondu[mediaType]);
        const ext = path.extname(tmpPath) || (mediaType === 'stickerMessage' ? '.webp' : '');
        const savesDir = path.join(__dirname, '..', 'data', 'status_saves');
        if (!fs.existsSync(savesDir)) fs.mkdirSync(savesDir, { recursive: true });
        const fileName = `status_${Date.now()}${ext}`;
        const destPath = path.join(savesDir, fileName);
        fs.renameSync(tmpPath, destPath);

        // send confirmation and the saved file back
        let payload = {};
        if (mediaType === 'imageMessage') payload.image = fs.readFileSync(destPath);
        else if (mediaType === 'videoMessage') payload.video = { url: destPath };
        else if (mediaType === 'audioMessage') payload.audio = { url: destPath };
        else if (mediaType === 'stickerMessage') payload.document = { url: destPath };
        else payload.document = { url: destPath };

        await zk.sendMessage(ms.key.remoteJid, { text: `Saved status to data/status_saves/${fileName}` }, { quoted: ms });
        // try to send the file as a preview when possible
        try { await zk.sendMessage(ms.key.remoteJid, payload, { quoted: ms }); } catch (e) { /* ignore send errors */ }

    } catch (e) {
        console.error('save status error', e);
        repondre('Failed to save status: ' + (e.message || e));
    }
});

module.exports = { ezra };
