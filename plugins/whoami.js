const { ezra } = require('../fredi/ezra');

ezra({ nomCom: 'whoami', aliases: ['.whoami'], categorie: 'VIPER-User', reaction: '🆔' }, async (dest, zk, commandeOptions) => {
    const { repondre, ms } = commandeOptions;
    try {
        const sender = (ms.key && (ms.key.participant || ms.key.remoteJid)) || 'unknown';
        const num = sender.split('@')[0] || 'unknown';
        const chat = ms.key.remoteJid || dest;
        repondre(`🆔 Your ID: ${sender}\n📱 Number: +${num}\n💬 Chat: ${chat}`);
    } catch (e) {
        repondre(`Unable to fetch sender info: ${e.message}`);
    }
});

module.exports = { ezra };
