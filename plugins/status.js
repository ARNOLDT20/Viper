const { ezra } = require('../fredi/ezra');
const conf = require('../set');

// Post to your WhatsApp status (owner-only)
ezra({ nomCom: 'status', aliases: ['.status'], categorie: 'VIPER-Admin', reaction: '📸' }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, msgRepondu, superUser } = commandeOptions;
    if (!superUser) return repondre('Only owner can post status.');

    try {
        if (msgRepondu) {
            // repost replied media to status
            const mtype = Object.keys(msgRepondu)[0];
            const tmp = await zk.downloadAndSaveMediaMessage(msgRepondu[mtype]);
            const payload = {};
            if (mtype === 'imageMessage') payload.image = { url: tmp };
            else if (mtype === 'videoMessage') payload.video = { url: tmp };
            else if (mtype === 'audioMessage') payload.audio = { url: tmp };
            else if (mtype === 'documentMessage') payload.document = { url: tmp };
            else return repondre('Unsupported media for status.');

            await zk.sendMessage('status@broadcast', payload);
            try { require('fs').unlinkSync(tmp); } catch (e) { }
            repondre('Status posted.');
            return;
        }

        if (!arg || !arg.length) return repondre('Usage: status <text> (or reply to media)');
        await zk.sendMessage('status@broadcast', { text: arg.join(' ') });
        repondre('Status text posted.');
    } catch (e) {
        console.error('status post error', e);
        repondre('Failed to post status: ' + e.message);
    }
});

// Post a message to all groups (owner-only) — 'group status'
ezra({ nomCom: 'gstatus', aliases: ['.gstatus'], categorie: 'VIPER-Admin', reaction: '📣' }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, superUser, msgRepondu } = commandeOptions;
    if (!superUser) return repondre('Only owner.');
    if ((!arg || !arg.length) && !msgRepondu) return repondre('Usage: gstatus <message> or reply with media');

    try {
        // collect groups from groupMetadata caches
        const groups = Object.keys(zk.chats || {}).filter(k => k.endsWith('@g.us'));
        if (!groups.length) return repondre('No groups found.');

        let sent = 0;
        for (const g of groups) {
            try {
                if (msgRepondu) {
                    const mtype = Object.keys(msgRepondu)[0];
                    const tmp = await zk.downloadAndSaveMediaMessage(msgRepondu[mtype]);
                    const payload = {};
                    if (mtype === 'imageMessage') payload.image = { url: tmp };
                    else if (mtype === 'videoMessage') payload.video = { url: tmp };
                    else payload.text = 'Unsupported media';
                    await zk.sendMessage(g, payload);
                    try { require('fs').unlinkSync(tmp); } catch (e) { }
                } else {
                    await zk.sendMessage(g, { text: arg.join(' ') });
                }
                sent++;
                await new Promise(r => setTimeout(r, 200));
            } catch (e) { console.error('gstatus send to', g, e?.message || e); }
        }
        repondre(`Group status posted to ${sent}/${groups.length} groups`);
    } catch (e) {
        console.error('gstatus error', e);
        repondre('Failed to post group status: ' + e.message);
    }
});

module.exports = { ezra };
