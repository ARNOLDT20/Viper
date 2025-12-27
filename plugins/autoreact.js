const { ezra } = require('../fredi/ezra');
const { enable, disable, isEnabled, list } = require('../lib/autoReactStore');

ezra({ nomCom: 'autoreact', aliases: ['react'], categorie: 'VIPER-Group', reaction: '🤖' }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, verifGroupe, verifAdmin, superUser } = commandeOptions;
    const chat = ms.key.remoteJid;
    const action = arg && arg[0] ? String(arg[0]).toLowerCase() : '';

    // If in group, only admins or owner can toggle
    if (verifGroupe && !verifAdmin && !superUser) return repondre('Only group admins can toggle autoreact here.');

    if (!action || (action !== 'on' && action !== 'off' && action !== 'status')) {
        return repondre('Usage: autoreact on|off|status');
    }

    if (action === 'status') {
        const enabled = isEnabled(chat);
        return repondre(`Auto-react for this chat is ${enabled ? 'ENABLED' : 'DISABLED'}.`);
    }

    if (action === 'on') {
        enable(chat);
        return repondre('Auto-react ENABLED for this chat.');
    }

    if (action === 'off') {
        disable(chat);
        return repondre('Auto-react DISABLED for this chat.');
    }
});

module.exports = { ezra };
