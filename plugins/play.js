"use strict";
const { ezra } = require("../fredi/ezra");
const ytdl = require('ytdl-core');
const yts = require('yt-search');
const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
const conf = require('../set');

ezra({ nomCom: "play", categorie: "Media", reaction: "🔎", nomFichier: __filename }, async (dest, zk, opts) => {
    const { repondre, arg } = opts;
    if (!arg || arg.length === 0) return repondre('Usage: play <search terms>');
    const query = arg.join(' ');
    try {
        const r = await yts(query);
        const first = r && r.videos && r.videos[0];
        if (!first) return repondre('No results found');
        const url = first.url;

        // if fallback API available, try to obtain direct mp3
        if (conf.YT_DLP_FALLBACK_URL && conf.YT_DLP_FALLBACK_URL.length > 0) {
            try {
                const api = `${conf.YT_DLP_FALLBACK_URL}?url=${encodeURIComponent(url)}&format=mp3`;
                const resp = await axios.get(api, { timeout: 60000 });
                const media = resp.data?.url || resp.data?.download || resp.data?.result?.url;
                if (media) {
                    await zk.sendMessage(dest, { audio: { url: media }, mimetype: 'audio/mpeg' });
                    return;
                }
            } catch (err) {
                console.warn('play fallback API failed, continuing to ytdl', err && err.message);
            }
        }

        // download audio and send using ytdl + ffmpeg
        const tmpDir = path.join(__dirname, '..', 'tmp');
        await fs.ensureDir(tmpDir);
        const outPath = path.join(tmpDir, `${first.title.replace(/[^a-z0-9\s\-_.]/gi, '')}-${Date.now()}.mp3`);
        const stream = ytdl(url, { filter: 'audioonly', quality: 'highestaudio' });
        const ffmpeg = require('fluent-ffmpeg');
        await new Promise((resolve, reject) => {
            ffmpeg(stream).audioBitrate(128).save(outPath).on('end', resolve).on('error', reject);
        });
        await zk.sendMessage(dest, { audio: { url: outPath }, mimetype: 'audio/mpeg' });
        await fs.remove(outPath);
    } catch (e) {
        console.error('play error', e);
        repondre('❌ Play failed.');
    }
});
