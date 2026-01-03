"use strict";
const { ezra } = require("../fredi/ezra");
const ytdl = require('ytdl-core');
const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
const conf = require('../set');

ezra({ nomCom: "ytmp4", categorie: "Media", reaction: "🎬", nomFichier: __filename }, async (dest, zk, opts) => {
    const { repondre, arg } = opts;
    if (!arg || arg.length === 0) return repondre('Usage: ytmp4 <YouTube URL or id>');
    const url = arg[0];
    try {
        // try configured fallback API first
        if (conf.YT_DLP_FALLBACK_URL && conf.YT_DLP_FALLBACK_URL.length > 0) {
            try {
                const api = `${conf.YT_DLP_FALLBACK_URL}?url=${encodeURIComponent(url)}&format=mp4`;
                const r = await axios.get(api, { timeout: 60000 });
                const media = r.data?.url || r.data?.download || r.data?.result?.url;
                if (media) {
                    await zk.sendMessage(dest, { video: { url: media }, caption: 'YouTube video' });
                    return;
                }
            } catch (err) {
                console.warn('ytmp4 fallback API failed, continuing to ytdl', err && err.message);
            }
        }

        const info = await ytdl.getInfo(url);
        const title = info.videoDetails.title.replace(/[^a-z0-9\s\-_.]/gi, '');
        const tmpDir = path.join(__dirname, '..', 'tmp');
        await fs.ensureDir(tmpDir);
        const outPath = path.join(tmpDir, `${title}-${Date.now()}.mp4`);
        const stream = ytdl(url, { quality: 'highestvideo' });
        await new Promise((resolve, reject) => {
            const write = fs.createWriteStream(outPath);
            stream.pipe(write);
            write.on('finish', resolve);
            write.on('error', reject);
            stream.on('error', reject);
        });
        await zk.sendMessage(dest, { video: { url: outPath }, caption: title });
        await fs.remove(outPath);
    } catch (e) {
        console.error('ytmp4 error', e);
        repondre('❌ ytmp4 failed.');
    }
});
