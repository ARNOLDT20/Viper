"use strict";
const { ezra } = require("../fredi/ezra");
const fs = require('fs');
const path = require('path');

ezra({ nomCom: "goodbye", categorie: "VIPER-Group", reaction: "👋", nomFichier: __filename }, async (dest, zk, opts) => {
    const { repondre, verifGroupe, nomAuteurMessage } = opts;
    if (!verifGroupe) return repondre('This command is for groups only');

    try {
        const pp = path.join(__dirname, '..', 'media', 'goodbye.jpg');
        const text = `Goodbye ${nomAuteurMessage} — we will miss you!`;
        if (fs.existsSync(pp)) {
            await zk.sendMessage(dest, { image: { url: pp }, caption: text });
        } else {
            await zk.sendMessage(dest, { text });
        }
    } catch (e) { console.error('goodbye error', e); repondre('❌ Goodbye failed'); }
});
