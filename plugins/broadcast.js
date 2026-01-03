"use strict";
const { ezra } = require("../fredi/ezra");
const conf = require('../set');

ezra({ nomCom: "broadcast", categorie: "Owner", reaction: "📣", nomFichier: __filename }, async (dest, zk, opts) => {
    const { repondre, arg, superUser } = opts;
    if (!superUser) return repondre('Owner only');
    if (!arg || arg.length === 0) return repondre('Usage: broadcast <message>');
    const text = arg.join(' ');
    try {
        // simple: send to owner number in set.json if present
        const target = conf.BROADCAST_LIST ? conf.BROADCAST_LIST.split(',') : [];
        for (const t of target) {
            await zk.sendMessage(t.trim() + '@s.whatsapp.net', { text }, {});
        }
        repondre('Broadcast sent');
    } catch (e) { console.error('broadcast error', e); repondre('❌ Broadcast failed'); }
});
