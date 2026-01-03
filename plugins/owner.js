"use strict";
const { ezra } = require("../fredi/ezra");

ezra({ nomCom: "owner", categorie: "General-VIPER", reaction: "👑", nomFichier: __filename }, async (dest, zk, opts) => {
    const { repondre } = opts;
    try {
        repondre(`Owner: ${process.env.BOT_OWNER || 'unknown'}\nContact: ${process.env.NUMERO_OWNER || 'not set'}`);
    } catch (e) { console.error('owner error', e); repondre('❌ Owner info failed'); }
});
const { ezra } = require('../fredi/ezra');
const conf = require('../set');

ezra({ nomCom: 'owner', aliases: ['.owner'], categorie: 'VIPER-User', reaction: '👑' }, async (dest, zk, commandeOptions) => {
    const { repondre, ms } = commandeOptions;

    const ownerNumber = '255627417402';
    const ownerJid = ownerNumber + '@s.whatsapp.net';
    const waLink = `https://wa.me/${ownerNumber}`;

    const stylish = [];
    stylish.push('╔══════════════════════╗');
    stylish.push('║      ☢️ VIPER MD ☢️      ║');
    stylish.push('╠══════════════════════╣');
    stylish.push('║   👑 OWNER PROFILE   ║');
    stylish.push('╠══════════════════════╣');
    stylish.push(`║ Name : T20_STARBOY         ║`);
    stylish.push(`║ Phone: +${ownerNumber}       ║`);
    stylish.push('╠══════════════════════╣');
    stylish.push('║ Contact Owner:           ║');
    stylish.push(`║ ${waLink} ║`);
    stylish.push('╠══════════════════════╣');
    stylish.push('║ Need support? Send a DM  ║');
    stylish.push('╚══════════════════════╝');

    // build message ensuring lines aren't too long for WhatsApp bubble
    const message = stylish.join('\n');

    // send a contact card (vCard) as well for quick save
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:T20_STARBOY\nTEL;type=CELL;type=VOICE;waid=${ownerNumber}:+${ownerNumber}\nEND:VCARD`;

    try {
        await zk.sendMessage(dest, { contacts: { displayName: 'T20_STARBOY', contacts: [{ vcard }] } }, { quoted: ms });
    } catch (e) {
        // fallback to plain reply if sending contact fails
    }

    repondre(message);
});
