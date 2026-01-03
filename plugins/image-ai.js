"use strict";
const { ezra } = require("../fredi/ezra");
const { Configuration, OpenAIApi } = require('openai');
const fs = require('fs-extra');
const path = require('path');

ezra({ nomCom: "image-ai", categorie: "AI", reaction: "🖼️", nomFichier: __filename }, async (dest, zk, opts) => {
    const { repondre, arg } = opts;
    const key = process.env.OPENAI_API_KEY;
    if (!key) return repondre('OpenAI API key not configured. Set OPENAI_API_KEY.');
    if (!arg || arg.length === 0) return repondre('Usage: image-ai <prompt>');

    try {
        const cfg = new Configuration({ apiKey: key });
        const client = new OpenAIApi(cfg);
        const prompt = arg.join(' ');
        const r = await client.createImage({ prompt, size: '1024x1024', n: 1 });
        const url = r.data.data[0].url;
        // download the image
        const tmpDir = path.join(__dirname, '..', 'tmp');
        await fs.ensureDir(tmpDir);
        const outPath = path.join(tmpDir, `img-${Date.now()}.png`);
        const axios = require('axios');
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        await fs.writeFile(outPath, response.data);
        await zk.sendMessage(dest, { image: { url: outPath }, caption: `Image for: ${prompt}` });
        await fs.remove(outPath);
    } catch (e) {
        console.error('image-ai error', e);
        repondre('❌ Image generation failed.');
    }
});
