"use strict";
const { ezra } = require("../fredi/ezra");
const ytdl = require('ytdl-core');
const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
const conf = require('../set');

ezra({ nomCom: "ytmp3", categorie: "Media", reaction: "🎵", nomFichier: __filename }, async (dest, zk, opts) => {
    const { repondre, arg } = opts;
    if (!arg || arg.length === 0) return repondre('Usage: ytmp3 <YouTube URL or id>');
    const url = arg[0];
    try {
        // If a fallback downloader API is configured, try it first
        if (conf.YT_DLP_FALLBACK_URL && conf.YT_DLP_FALLBACK_URL.length > 0) {
            try {
                const api = `${conf.YT_DLP_FALLBACK_URL}?url=${encodeURIComponent(url)}&format=mp3`;
                const r = await axios.get(api, { timeout: 60000 });
                const media = r.data?.url || r.data?.download || r.data?.result?.url;
                if (media) {
                    await zk.sendMessage(dest, { audio: { url: media }, mimetype: 'audio/mpeg' });
                    return;
                }
            } catch (err) {
                console.warn('ytmp3 fallback API failed, continuing to ytdl', err && err.message);
            }
        }

        const info = await ytdl.getInfo(url);
        const title = info.videoDetails.title.replace(/[^a-z0-9\s\-_.]/gi, '');
        const tmpDir = path.join(__dirname, '..', 'tmp');
        await fs.ensureDir(tmpDir);
        const outPath = path.join(tmpDir, `${title}-${Date.now()}.mp3`);
        const stream = ytdl(url, { filter: 'audioonly', quality: 'highestaudio' });
        const ffmpeg = require('fluent-ffmpeg');
        await new Promise((resolve, reject) => {
            ffmpeg(stream).audioBitrate(128).save(outPath).on('end', resolve).on('error', reject);
        });
        await zk.sendMessage(dest, { audio: { url: outPath }, mimetype: 'audio/mpeg', ptt: false });
        await fs.remove(outPath);
    } catch (e) {
        console.error('ytmp3 error', e);
        repondre('❌ ytmp3 failed.');
    }
});
