const { ezra } = require('../fredi/ezra');
const conf = require('../set');

ezra({ nomCom: 'setwelcome', aliases: ['.setwelcome'], categorie: 'VIPER-Admin', reaction: '👋' }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms } = commandeOptions;
    if (!arg || !arg[0]) return repondre('Usage: setwelcome on|off (use inside group)');
    if (!ms.key.remoteJid || !ms.key.remoteJid.endsWith('@g.us')) return repondre('This command must be used inside a group.');
    const meta = await zk.groupMetadata(ms.key.remoteJid);
    const author = ms.key.participant || ms.key.remoteJid;
    const ownerJid = (conf.NUMERO_OWNER || '').replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    const me = (zk.user && zk.user.id) ? zk.user.id : null;

    // check admin
    const member = meta.participants.find(p => p.id === author) || {};
    const isAdmin = member.admin || member.isAdmin || false;
    if (author !== ownerJid && !isAdmin) return repondre('Only group admins or the bot owner can change this.');

    const val = (arg[0].toLowerCase() === 'on') ? 'on' : 'off';
    try {
        const { attribuerUnevaleur } = require('../lib/welcome');
        await attribuerUnevaleur(meta.id, 'welcome', val);
        repondre(`Welcome messages: ${val}`);
    } catch (e) {
        console.error('setwelcome error', e);
        repondre('Failed to update welcome setting: ' + e.message);
    }
});

ezra({ nomCom: 'setgoodbye', aliases: ['.setgoodbye'], categorie: 'VIPER-Admin', reaction: '🕊️' }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms } = commandeOptions;
    if (!arg || !arg[0]) return repondre('Usage: setgoodbye on|off (use inside group)');
    if (!ms.key.remoteJid || !ms.key.remoteJid.endsWith('@g.us')) return repondre('This command must be used inside a group.');
    const meta = await zk.groupMetadata(ms.key.remoteJid);
    const author = ms.key.participant || ms.key.remoteJid;
    const ownerJid = (conf.NUMERO_OWNER || '').replace(/[^0-9]/g, '') + '@s.whatsapp.net';

    const member = meta.participants.find(p => p.id === author) || {};
    const isAdmin = member.admin || member.isAdmin || false;
    if (author !== ownerJid && !isAdmin) return repondre('Only group admins or the bot owner can change this.');

    const val = (arg[0].toLowerCase() === 'on') ? 'on' : 'off';
    try {
        const { attribuerUnevaleur } = require('../lib/welcome');
        await attribuerUnevaleur(meta.id, 'goodbye', val);
        repondre(`Goodbye messages: ${val}`);
    } catch (e) {
        console.error('setgoodbye error', e);
        repondre('Failed to update goodbye setting: ' + e.message);
    }
});

module.exports = { ezra };
