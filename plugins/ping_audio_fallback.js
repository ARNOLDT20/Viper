"use strict";
const { ezra } = require("../fredi/ezra");
const fs = require('fs');
const path = require('path');

ezra({ nomCom: "pingaudio", categorie: "General-VIPER", reaction: "🎵", nomFichier: __filename }, async (dest, zk, opts) => {
    const { repondre } = opts;
    try {
        const audioPath = path.join(__dirname, '..', 'media', 'ping.mp3');
        const url = fs.existsSync(audioPath) ? audioPath : 'https://files.catbox.moe/lu3f94.mp3';
        await zk.sendMessage(dest, { audio: { url }, mimetype: fs.existsSync(audioPath) ? 'audio/mp3' : 'audio/mp4', ptt: true });
    } catch (e) { console.error('pingaudio error', e); repondre('❌ Ping audio failed'); }
});
