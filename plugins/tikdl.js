"use strict";
const { ezra } = require("../fredi/ezra");
const axios = require('axios');
const conf = require('../set');

ezra({ nomCom: "tikdl", aliases: ["tiktokdl", "tiktok"], categorie: "Media", reaction: "🎵", nomFichier: __filename }, async (dest, zk, opts) => {
    const { repondre, arg } = opts;
    if (!arg || !arg[0]) return repondre('Usage: tikdl <tiktok url>');
    const url = arg[0];
    try {
        // Build list of APIs to try: user-configured first, then defaults
        const candidates = [];
        if (conf.TIKTOK_API_URL && conf.TIKTOK_API_URL.length > 0) candidates.push(conf.TIKTOK_API_URL + '?url=');
        if (conf.DEFAULT_TIKTOK_APIS && conf.DEFAULT_TIKTOK_APIS.length > 0) {
            conf.DEFAULT_TIKTOK_APIS.split(',').forEach(u => { if (u && u.trim()) candidates.push(u.trim()); });
        }

        let found = null;
        for (const base of candidates) {
            const api = base.includes('?') ? `${base}${encodeURIComponent(url)}` : `${base}?url=${encodeURIComponent(url)}`;
            try {
                const r = await axios.get(api, { timeout: 20000 });
                const videoUrl = r.data?.video || r.data?.videoUrl || r.data?.download || r.data?.result?.video || r.data?.url || r.data?.downloadUrl || r.data?.result?.download;
                if (videoUrl) { found = videoUrl; break; }
            } catch (err) {
                // try next
            }
        }

        if (!found) return repondre('No downloadable video found from free APIs. Configure a reliable downloader API.');
        await zk.sendMessage(dest, { video: { url: found }, caption: 'TikTok download' });
    } catch (e) {
        console.error('tikdl error', e);
        repondre('❌ TikTok download failed (no API configured or API error).');
    }
});
