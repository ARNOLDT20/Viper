const { ezra } = require("../fredi/ezra");
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'antilink.json');
if (!fs.existsSync(configPath)) fs.writeFileSync(configPath, JSON.stringify({}, null, 2));

function readConfig() {
    try { return JSON.parse(fs.readFileSync(configPath, 'utf8') || '{}'); } catch (e) { return {}; }
}
function writeConfig(cfg) { fs.writeFileSync(configPath, JSON.stringify(cfg, null, 2)); }

// Command to toggle antilink in group
ezra({ nomCom: 'antilink', categorie: 'VIPER-Group', reaction: '🚫' }, async (dest, zk, opts) => {
    const { repondre, arg, verifAdmin, verifGroupe } = opts;
    if (!verifGroupe) return repondre('This command is only allowed in groups.');
    if (!verifAdmin) return repondre('Only group admins can toggle antilink.');

    const action = (arg && arg[0]) ? arg[0].toString().toLowerCase() : '';
    if (!['on', 'off'].includes(action)) return repondre('Usage: antilink on | off');

    const cfg = readConfig();
    cfg[dest] = (action === 'on');
    writeConfig(cfg);
    repondre(`Anti-link is now ${action === 'on' ? 'enabled' : 'disabled'} for this group.`);
});

// Listener: delete messages containing links when enabled
// Uses a permissive link regex and skips admins/owners/bot
const linkRegex = /https?:\/\/|www\.|chat\.whatsapp\.com\//i;

// Register event once using a small guard to avoid duplicate listeners
let _antilinkRegistered = false;
ezra({ nomCom: 'antilink-listener', categorie: 'VIPER-Group' }, async (_, zk) => {
    if (_antilinkRegistered) return; _antilinkRegistered = true;

    zk.ev.on('messages.upsert', async (m) => {
        try {
            if (!m || m.type !== 'notify') return;
            const msg = (m.messages && m.messages[0]);
            if (!msg) return;
            const remote = msg.key && msg.key.remoteJid;
            if (!remote || !remote.endsWith('@g.us')) return; // only groups
            if (msg.key && msg.key.fromMe) return; // ignore bot messages

            const cfg = readConfig();
            if (!cfg[remote]) return; // antilink not enabled for this group

            // extract text from multiple message shapes
            const content = msg.message || {};
            let text = '';
            if (content.conversation) text = content.conversation;
            else if (content.extendedTextMessage && content.extendedTextMessage.text) text = content.extendedTextMessage.text;
            else if (content.imageMessage && content.imageMessage.caption) text = content.imageMessage.caption;
            else if (content.videoMessage && content.videoMessage.caption) text = content.videoMessage.caption;
            else if (content.documentMessage && content.documentMessage.caption) text = content.documentMessage.caption;

            if (!text || !linkRegex.test(text)) return;

            // fetch group metadata to determine if sender is admin/owner
            let metadata = {};
            try { metadata = await zk.groupMetadata(remote); } catch (e) { metadata = {}; }

            const participant = msg.key && msg.key.participant;
            // if no participant info, fallback do nothing
            if (!participant) return;

            // Check if participant is admin/owner
            let isAdmin = false;
            try {
                if (metadata && metadata.participants) {
                    const p = metadata.participants.find(o => o.id === participant);
                    if (p && (p.admin === 'admin' || p.admin === 'superadmin' || p.isAdmin || p.isSuperAdmin)) isAdmin = true;
                }
            } catch (e) { isAdmin = false; }

            if (isAdmin) return; // don't delete admins' links

            // build delete key and send delete
            const delKey = {
                remoteJid: remote,
                id: msg.key.id,
                fromMe: msg.key.fromMe || false,
                participant: participant
            };

            try {
                await zk.sendMessage(remote, { delete: delKey });
                // optional: warn the user
                const number = participant.split('@')[0];
                await zk.sendMessage(remote, { text: `@${number} Posting links is not allowed here.`, mentions: [participant] });
            } catch (e) {
                // ignore errors
                console.error('AntiLink delete error', e);
            }

        } catch (e) { console.error('AntiLink listener error', e); }
    });
});

module.exports = {};
