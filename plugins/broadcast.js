const { ezra } = require('../fredi/ezra');
const fs = require('fs');
const path = require('path');
const conf = require('../set');

const LIST_PATH = path.join(__dirname, '..', 'data', 'broadcast_list.json');

function ensureList() {
    if (!fs.existsSync(path.dirname(LIST_PATH))) fs.mkdirSync(path.dirname(LIST_PATH), { recursive: true });
    if (!fs.existsSync(LIST_PATH)) {
        const def = { contacts: [(conf.NUMERO_OWNER || '255627417402') + '@s.whatsapp.net'] };
        fs.writeFileSync(LIST_PATH, JSON.stringify(def, null, 2), 'utf8');
        return def;
    }
    try { return JSON.parse(fs.readFileSync(LIST_PATH, 'utf8')); } catch (e) { return { contacts: [] }; }
}

ezra({ nomCom: 'broadcast', aliases: ['.broadcast'], categorie: 'VIPER-Admin', reaction: '📣' }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, superUser, nomAuteurMessage } = commandeOptions;
    if (!superUser) return repondre('Only owner can use broadcast.');
    if (!arg || !arg.length) return repondre('Usage: broadcast <message>');

    const list = ensureList();
    const message = `📢 *${conf.BOT || 'VIPER MD'} Broadcast*\n\n${arg.join(' ')}\n\n— ${nomAuteurMessage}`;

    repondre(`Sending broadcast to ${list.contacts.length} contacts...`);
    let sent = 0;
    for (const to of list.contacts) {
        try {
            await zk.sendMessage(to, { text: message, contextInfo: { externalAdReply: { title: conf.BOT || 'VIPER MD', body: 'Broadcast', thumbnailUrl: conf.URL || '' } } });
            sent++;
            await new Promise(r => setTimeout(r, 250));
        } catch (e) {
            console.error('Broadcast send failed to', to, e?.message || e);
        }
    }

    repondre(`Broadcast completed — sent to ${sent}/${list.contacts.length}`);
});

// helper to add/remove contacts via commands
ezra({ nomCom: 'badd', aliases: ['.badd'], categorie: 'VIPER-Admin', reaction: '➕' }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, superUser } = commandeOptions;
    if (!superUser) return repondre('Only owner');
    if (!arg || !arg[0]) return repondre('Usage: badd <number-without-@s.whatsapp.net>');
    const num = arg[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    const list = ensureList();
    if (!list.contacts.includes(num)) { list.contacts.push(num); fs.writeFileSync(LIST_PATH, JSON.stringify(list, null, 2)); repondre('Added ' + num); }
    else repondre('Already in list');
});

ezra({ nomCom: 'bremove', aliases: ['.bremove'], categorie: 'VIPER-Admin', reaction: '➖' }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, superUser } = commandeOptions;
    if (!superUser) return repondre('Only owner');
    if (!arg || !arg[0]) return repondre('Usage: bremove <number-without-@s.whatsapp.net>');
    const num = arg[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    const list = ensureList();
    const idx = list.contacts.indexOf(num);
    if (idx === -1) return repondre('Not found');
    list.contacts.splice(idx, 1); fs.writeFileSync(LIST_PATH, JSON.stringify(list, null, 2)); repondre('Removed ' + num);
});

ezra({ nomCom: 'blist', aliases: ['.blist'], categorie: 'VIPER-Admin', reaction: '📋' }, async (dest, zk, commandeOptions) => {
    const { repondre, superUser } = commandeOptions;
    if (!superUser) return repondre('Only owner');
    const list = ensureList();
    repondre('Broadcast list:\n' + list.contacts.join('\n'));
});

module.exports = { ezra };
