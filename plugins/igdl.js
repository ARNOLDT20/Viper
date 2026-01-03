"use strict";
const { ezra } = require("../fredi/ezra");
const fbdown = require('@xaviabot/fb-downloader');
const axios = require('axios');
const conf = require('../set');

ezra({ nomCom: "igdl", aliases: ["instagram", "ig"], categorie: "Media", reaction: "📥", nomFichier: __filename }, async (dest, zk, opts) => {
    const { repondre, arg } = opts;
    if (!arg || !arg[0]) return repondre('Usage: igdl <instagram url>');
    const url = arg[0];
    try {
        // If INSTAGRAM_API_URL is configured, prefer it
        if (conf.INSTAGRAM_API_URL && conf.INSTAGRAM_API_URL.length > 0) {
            const api = `${conf.INSTAGRAM_API_URL}?url=${encodeURIComponent(url)}`;
            const r = await axios.get(api, { timeout: 20000 });
            if (!r.data || !r.data.url) return repondre('No downloadable media found from API');
            await zk.sendMessage(dest, { video: { url: r.data.url }, caption: 'Instagram download' });
            return;
        }

        const r = await fbdown.download(url);
        if (!r || (!r.video && !r.image)) return repondre('No downloadable media found');
        const mediaUrl = (r.video && (r.video.sd || r.video.hd || r.video.url)) || (r.image && r.image.url);
        if (!mediaUrl) return repondre('No downloadable media URL');
        const sendObj = r.video ? { video: { url: mediaUrl }, caption: 'Instagram download' } : { image: { url: mediaUrl }, caption: 'Instagram download' };
        await zk.sendMessage(dest, sendObj);
    } catch (e) {
        console.error('igdl error', e);
        repondre('❌ Instagram download failed.');
    }
});
