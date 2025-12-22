"use strict";
const { ezra } = require("../fredi/ezra");
const conf = require("../set");

ezra({ nomCom: "getpp", categorie: "VIPER-Tools", reaction: "🖼️", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
    const { repondre, msgRepondu, arg, ms, auteurMessage } = commandeOptions;
    try {
        let target;

        // If user replied to a message, get that participant
        if (msgRepondu && msgRepondu.participant) {
            target = msgRepondu.participant;
        }

        // If mention present in the message
        if (!target && ms?.message) {
            const mentioned = ms.message?.extendedTextMessage?.contextInfo?.mentionedJid;
            if (mentioned && mentioned.length) target = mentioned[0];
        }

        // If arg provided, try to parse a number or jid
        if (!target && arg && arg[0]) {
            const maybe = arg[0].replace(/[^0-9]/g, '');
            if (maybe.length >= 7) target = maybe + '@s.whatsapp.net';
            else if (arg[0].includes('@')) target = arg[0];
        }

        // default to the sender if nothing else
        if (!target) target = auteurMessage || (ms?.key?.participant) || dest;

        let pp;
        try {
            pp = await zk.profilePictureUrl(target, 'image');
        } catch (e) {
            pp = conf.URL || 'https://files.catbox.moe/1q3yrw.jpg';
        }

        await zk.sendMessage(dest, { image: { url: pp }, caption: `Profile picture for ${target.split('@')[0]}` });
    } catch (e) {
        console.error('getpp error', e);
        try { await repondre('⚠️ Could not fetch profile picture.'); } catch (_) {}
    }
});
