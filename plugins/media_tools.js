const { ezra } = require('../fredi/ezra');
const fs = require('fs');
const { exec } = require('child_process');
const { Sticker, StickerTypes } = require('wa-sticker-formatter');

function alea(ext = '') { return `${Math.floor(Math.random() * 100000)}${ext}`; }

// image -> sticker
ezra({ nomCom: 'img2st', aliases: ['.img2sticker'], categorie: 'VIPER-Conversion', reaction: '🔁' }, async (dest, zk, commandeOptions) => {
    const { msgRepondu, repondre, nomAuteurMessage } = commandeOptions;
    try {
        if (!msgRepondu || !msgRepondu.imageMessage) return repondre('Reply to an image.');
        const imgPath = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage);
        const buffer = fs.readFileSync(imgPath);
        const sticker = new Sticker(buffer, { pack: 'VIPER MD', author: nomAuteurMessage, type: StickerTypes.FULL, quality: 100 });
        const buf = await sticker.toBuffer();
        await zk.sendMessage(dest, { sticker: buf });
        try { fs.unlinkSync(imgPath); } catch (e) { }
    } catch (e) { console.error('img2st error', e); repondre('Failed to create sticker: ' + e.message); }
});

// sticker -> image (png)
ezra({ nomCom: 'st2img', aliases: ['.st2img'], categorie: 'VIPER-Conversion', reaction: '🔁' }, async (dest, zk, commandeOptions) => {
    const { msgRepondu, repondre } = commandeOptions;
    try {
        if (!msgRepondu || !msgRepondu.stickerMessage) return repondre('Reply to a sticker.');
        const st = await zk.downloadAndSaveMediaMessage(msgRepondu.stickerMessage);
        const out = alea('.png');
        exec(`ffmpeg -i ${st} -f image2 ${out}`, async (err) => {
            try { fs.unlinkSync(st); } catch (e) { }
            if (err) return repondre('Conversion failed');
            const img = fs.readFileSync(out);
            await zk.sendMessage(dest, { image: img });
            try { fs.unlinkSync(out); } catch (e) { }
        });
    } catch (e) { console.error('st2img error', e); repondre('Failed: ' + e.message); }
});

// small video -> animated sticker
ezra({ nomCom: 'vid2st', aliases: ['.vid2sticker'], categorie: 'VIPER-Conversion', reaction: '🎞️' }, async (dest, zk, commandeOptions) => {
    const { msgRepondu, repondre, nomAuteurMessage } = commandeOptions;
    try {
        if (!msgRepondu || !msgRepondu.videoMessage) return repondre('Reply to a small video (<=10s).');
        const vid = await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage);
        const out = alea('.webp');
        const cmd = `ffmpeg -y -i ${vid} -vcodec libwebp -filter:v "scale=512:512:force_original_aspect_ratio=decrease,fps=15,format=rgba,pad=512:512:-1:-1:color=0x00000000" -loop 0 -ss 0 -t 10 -preset default -an -vsync 0 ${out}`;
        exec(cmd, async (err) => {
            try { fs.unlinkSync(vid); } catch (e) { }
            if (err) { console.error('ffmpeg vid2st err', err); return repondre('Failed to convert video to sticker'); }
            const buf = fs.readFileSync(out);
            await zk.sendMessage(dest, { sticker: buf });
            try { fs.unlinkSync(out); } catch (e) { }
        });
    } catch (e) { console.error('vid2st error', e); repondre('Failed: ' + e.message); }
});

// sticker -> mp4
ezra({ nomCom: 'st2vid', aliases: ['.st2vid'], categorie: 'VIPER-Conversion', reaction: '🎬' }, async (dest, zk, commandeOptions) => {
    const { msgRepondu, repondre } = commandeOptions;
    try {
        if (!msgRepondu || !msgRepondu.stickerMessage) return repondre('Reply to a sticker.');
        const st = await zk.downloadAndSaveMediaMessage(msgRepondu.stickerMessage);
        const out = alea('.mp4');
        const cmd = `ffmpeg -y -i ${st} -movflags faststart -pix_fmt yuv420p -vf scale=512:512 ${out}`;
        exec(cmd, async (err) => {
            try { fs.unlinkSync(st); } catch (e) { }
            if (err) { console.error('ffmpeg st2vid err', err); return repondre('Failed to convert sticker to video'); }
            await zk.sendMessage(dest, { video: { url: out } });
            try { fs.unlinkSync(out); } catch (e) { }
        });
    } catch (e) { console.error('st2vid error', e); repondre('Failed: ' + e.message); }
});

module.exports = { ezra };
