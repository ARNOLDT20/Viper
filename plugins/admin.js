const { ezra } = require('../fredi/ezra');
const conf = require('../set');
const fs = require('fs');

function ensureOwner(jid) {
    const ownerJid = (conf.NUMERO_OWNER || '').replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    return jid === ownerJid;
}

ezra({ nomCom: 'restart', aliases: ['.restart', '.update'], categorie: 'VIPER-Admin', reaction: '🔁' }, async (dest, zk, commandeOptions) => {
    const { repondre, ms } = commandeOptions;
    const author = ms.key.participant || ms.key.remoteJid;
    if (!ensureOwner(author)) return repondre('Only owner can restart the bot.');
    try {
        repondre('Restarting...');
        await new Promise(r => setTimeout(r, 500));
        process.exit(0);
    } catch (e) {
        repondre('Failed to restart: ' + e.message);
    }
});

ezra({ nomCom: 'shutdown', aliases: ['.shutdown'], categorie: 'VIPER-Admin', reaction: '⏹️' }, async (dest, zk, commandeOptions) => {
    const { repondre, ms } = commandeOptions;
    const author = ms.key.participant || ms.key.remoteJid;
    if (!ensureOwner(author)) return repondre('Only owner can shutdown the bot.');
    try {
        repondre('Shutting down...');
        await new Promise(r => setTimeout(r, 500));
        process.exit(0);
    } catch (e) {
        repondre('Failed to shutdown: ' + e.message);
    }
});

// Broadcast to all chats (owner only)
ezra({ nomCom: 'broadcastall', aliases: ['.broadcastall', 'broadcast'], categorie: 'VIPER-Admin', reaction: '📣' }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms } = commandeOptions;
    const author = ms.key.participant || ms.key.remoteJid;
    if (!ensureOwner(author)) return repondre('Only owner can broadcast.');
    if (!arg || !arg.length) return repondre('Usage: broadcastall <message>');
    const text = arg.join(' ');
    try {
        const chats = Object.keys(zk.chats || {});
        let sent = 0;
        for (const chat of chats) {
            try {
                await zk.sendMessage(chat, { text: `📢 ${conf.BOT || 'VIPER MD'} Broadcast:\n\n${text}` });
                sent++;
                await new Promise(r => setTimeout(r, 200));
            } catch (e) { console.error('broadcastall fail', chat, e?.message || e); }
        }
        repondre(`Broadcast sent to ${sent}/${chats.length} chats`);
    } catch (e) {
        repondre('Broadcast failed: ' + e.message);
    }
});

// setpp: change bot profile picture (owner only)
ezra({ nomCom: 'setpp', aliases: ['.setpp'], categorie: 'VIPER-Admin', reaction: '🖼️' }, async (dest, zk, commandeOptions) => {
    const { msgRepondu, repondre, ms } = commandeOptions;
    const author = ms.key.participant || ms.key.remoteJid;
    if (!ensureOwner(author)) return repondre('Only owner can change profile picture.');
    try {
        if (!msgRepondu || !msgRepondu.imageMessage) return repondre('Reply to an image to set as profile picture.');
        const imgPath = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage);
        const buffer = fs.readFileSync(imgPath);
        await zk.updateProfilePicture(zk.user.id.split(':')[0] + '@s.whatsapp.net', { url: imgPath });
        try { fs.unlinkSync(imgPath); } catch (e) { }
        repondre('Profile picture updated.');
    } catch (e) { console.error('setpp error', e); repondre('Failed to set profile picture: ' + e.message); }
});

// setname: change bot display name
ezra({ nomCom: 'setname', aliases: ['.setname'], categorie: 'VIPER-Admin', reaction: '✏️' }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms } = commandeOptions;
    const author = ms.key.participant || ms.key.remoteJid;
    if (!ensureOwner(author)) return repondre('Only owner can change name.');
    if (!arg || !arg.length) return repondre('Usage: setname <New Name>');
    const newName = arg.join(' ');
    try {
        await zk.groupUpdateSubject(zk.user.id.split(':')[0] + '@s.whatsapp.net', newName).catch(() => { });
        // best-effort: update business/profile name via updateProfileName if available
        if (zk.updateProfileName) {
            await zk.updateProfileName(newName);
        }
        repondre('Name updated to: ' + newName);
    } catch (e) { console.error('setname error', e); repondre('Failed to set name: ' + e.message); }
});

module.exports = { ezra };
