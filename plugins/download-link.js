const { ezra } = require('../fredi/ezra');
const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
const { repondre } = require('../fredi/context');

const extFromMime = (mime) => {
  if (!mime) return '.bin';
  if (mime.includes('jpeg')) return '.jpg';
  if (mime.includes('png')) return '.png';
  if (mime.includes('gif')) return '.gif';
  if (mime.includes('webp')) return '.webp';
  if (mime.includes('mp4')) return '.mp4';
  if (mime.includes('mpeg') || mime.includes('mp3')) return '.mp3';
  if (mime.includes('ogg')) return '.ogg';
  if (mime.includes('pdf')) return '.pdf';
  if (mime.includes('zip')) return '.zip';
  if (mime.includes('octet-stream')) return '.bin';
  return '.' + mime.split('/').pop();
};

ezra({
  nomCom: 'download',
  aliases: ['dl', 'get'],
  categorie: 'VIPER-Utils',
  reaction: '📥'
}, async (dest, zk, commandOptions) => {
  const { arg, ms, repondre } = commandOptions;

  try {
    // extract URL from args or quoted message text
    let url = (arg && arg[0]) ? arg[0] : null;
    if (!url && ms?.message) {
      const conv = ms.message.conversation || (ms.message.extendedTextMessage && ms.message.extendedTextMessage.text) || '';
      url = conv.split('\n').find(l => l.match(/https?:\/\//)) || null;
    }

    if (!url) return repondre('Please provide a direct media link, e.g. `download https://...` or reply with a message that contains the URL.');

    // basic validation
    if (!url.startsWith('http')) return repondre('Invalid URL. Make sure it starts with http/https.');

    await repondre('🔎 Fetching link info, please wait...');

    // HEAD request to find content-type & length
    let headers = {};
    try {
      const head = await axios.head(url, { timeout: 10000 });
      headers = head.headers || {};
    } catch (e) {
      // some servers don't allow HEAD; we'll continue and try GET
      headers = {};
    }

    const contentType = (headers['content-type'] || '').toLowerCase();
    const contentLength = parseInt(headers['content-length'] || '0', 10) || 0;

    const tmpDir = path.join(__dirname, '..', 'tmp');
    fs.ensureDirSync(tmpDir);
    const ext = extFromMime(contentType);
    const tmpName = `dl_${Date.now()}${ext}`;
    const tmpPath = path.join(tmpDir, tmpName);

    // stream download
    const writer = fs.createWriteStream(tmpPath);
    const response = await axios.get(url, { responseType: 'stream', timeout: 0 });
    const mime = (response.headers['content-type'] || contentType || 'application/octet-stream');

    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

    const stat = fs.statSync(tmpPath);
    // if file is big, send as document
    const sizeMB = stat.size / 1024 / 1024;

    const caption = `📥 Downloaded from: ${url}\n• Size: ${sizeMB.toFixed(2)} MB\n• Type: ${mime}`;

    // Decide how to send based on mime
    const lower = mime.toLowerCase();
    if (lower.startsWith('image/')) {
      const buffer = fs.readFileSync(tmpPath);
      await zk.sendMessage(dest, { image: buffer, caption }, { quoted: ms });
    } else if (lower.startsWith('video/')) {
      const buffer = fs.readFileSync(tmpPath);
      await zk.sendMessage(dest, { video: buffer, caption }, { quoted: ms });
    } else if (lower.startsWith('audio/')) {
      const buffer = fs.readFileSync(tmpPath);
      await zk.sendMessage(dest, { audio: buffer, mimetype: mime, caption }, { quoted: ms });
    } else {
      // send as document
      const fileName = path.basename(url).split('?')[0] || tmpName;
      const buffer = fs.readFileSync(tmpPath);
      await zk.sendMessage(dest, { document: buffer, mimetype: mime, fileName, caption }, { quoted: ms });
    }

    // cleanup
    try { fs.unlinkSync(tmpPath); } catch (e) { }

  } catch (err) {
    console.error('download-link error', err);
    try { repondre('Failed to download the provided link. The server may block requests or the link is not a direct media file.'); } catch (e) {}
  }
});
