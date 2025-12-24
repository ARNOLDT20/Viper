const { ezra } = require('../fredi/ezra');
const fs = require('fs');
const path = require('path');
const conf = require('../set');

const ENV_PATH = path.join(__dirname, '..', 'set.env');

function readEnv() {
    const res = {};
    if (!fs.existsSync(ENV_PATH)) return res;
    const raw = fs.readFileSync(ENV_PATH, 'utf8').split(/\r?\n/);
    for (const line of raw) {
        if (!line || line.trim().startsWith('#')) continue;
        const idx = line.indexOf('=');
        if (idx === -1) continue;
        const k = line.slice(0, idx).trim();
        const v = line.slice(idx + 1).trim();
        res[k] = v;
    }
    return res;
}

function writeEnv(updates) {
    const cur = readEnv();
    const merged = Object.assign({}, cur, updates);
    const lines = Object.keys(merged).map(k => `${k}=${merged[k]}`);
    fs.writeFileSync(ENV_PATH, lines.join('\n'), 'utf8');
}

function ensureOwner(authorJid) {
    const ownerJid = (conf.NUMERO_OWNER || '').replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    return (authorJid === ownerJid);
}

ezra({ nomCom: 'autotyping', aliases: ['.autotyping'], categorie: 'VIPER-Admin', reaction: '⌨️' }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms } = commandeOptions;
    const author = ms.key.participant || ms.key.remoteJid;
    if (!ensureOwner(author)) return repondre('Only the bot owner can change this setting.');
    const val = (arg && arg[0]) ? arg[0].toLowerCase() : null;
    if (!val || !['on', 'off', 'yes', 'no', '1', '0'].includes(val)) return repondre('Usage: autotyping on|off');
    const enabled = (val === 'on' || val === 'yes' || val === '1') ? 'yes' : 'no';
    // persist
    try {
        writeEnv({ AUTO_TYPING: enabled });
        // update runtime conf and process.env
        process.env.AUTO_TYPING = enabled;
        conf.AUTO_TYPING = enabled;
        repondre(`Auto-typing set to: ${enabled}`);
    } catch (e) {
        repondre('Failed to save setting: ' + e.message);
    }
});

ezra({ nomCom: 'autorecording', aliases: ['.autorecording'], categorie: 'VIPER-Admin', reaction: '🎙️' }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms } = commandeOptions;
    const author = ms.key.participant || ms.key.remoteJid;
    if (!ensureOwner(author)) return repondre('Only the bot owner can change this setting.');
    const val = (arg && arg[0]) ? arg[0].toLowerCase() : null;
    if (!val || !['on', 'off', 'yes', 'no', '1', '0'].includes(val)) return repondre('Usage: autorecording on|off');
    const enabled = (val === 'on' || val === 'yes' || val === '1') ? 'yes' : 'no';
    try {
        writeEnv({ AUTO_RECORDING: enabled });
        process.env.AUTO_RECORDING = enabled;
        conf.AUTO_RECORDING = enabled;
        repondre(`Auto-recording set to: ${enabled}`);
    } catch (e) {
        repondre('Failed to save setting: ' + e.message);
    }
});

// presence command to set ETAT directly: available|typing|recording|unavailable or numbers 1|2|3|0
ezra({ nomCom: 'presence', aliases: ['.presence'], categorie: 'VIPER-Admin', reaction: '🔔' }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms } = commandeOptions;
    const author = ms.key.participant || ms.key.remoteJid;
    if (!ensureOwner(author)) return repondre('Only the bot owner can change presence.');
    if (!arg || !arg[0]) return repondre('Usage: presence <available|typing|recording|unavailable|1|2|3|0>');
    const v = arg[0].toLowerCase();
    let etat = null;
    if (v === 'available' || v === 'online' || v === '1') etat = '1';
    else if (v === 'typing' || v === 'composing' || v === '2') etat = '2';
    else if (v === 'recording' || v === '3') etat = '3';
    else if (v === 'unavailable' || v === 'off' || v === '0') etat = '0';
    if (etat === null) return repondre('Unknown presence value.');
    try {
        writeEnv({ PRESENCE: etat });
        process.env.PRESENCE = etat;
        conf.ETAT = etat;
        // apply immediately by sending presence update
        const jid = ms.key.remoteJid;
        if (etat === '1') await zk.sendPresenceUpdate('available', jid);
        else if (etat === '2') await zk.sendPresenceUpdate('composing', jid);
        else if (etat === '3') await zk.sendPresenceUpdate('recording', jid);
        else await zk.sendPresenceUpdate('unavailable', jid);
        repondre(`Presence set to ${etat}`);
    } catch (e) {
        repondre('Failed to change presence: ' + e.message);
    }
});

module.exports = { ezra };
