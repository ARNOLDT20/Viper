const { ezra } = require('../fredi/ezra');
const fs = require('fs');
const path = require('path');
const conf = require('../set');

const ENV_PATH = path.join(__dirname, '..', 'set.env');

function readEnv() {
  const res = {};
  if (!fs.existsSync(ENV_PATH)) return res;
  const raw = fs.readFileSync(ENV_PATH, 'utf8').split(/\r?\n/);
  for (const line of raw) {
    if (!line || line.trim().startsWith('#')) continue;
    const idx = line.indexOf('=');
    if (idx === -1) continue;
    const k = line.slice(0, idx).trim();
    const v = line.slice(idx + 1).trim();
    res[k] = v;
  }
  return res;
}

function writeEnv(updates) {
  const cur = readEnv();
  const merged = Object.assign({}, cur, updates);
  const lines = Object.keys(merged).map(k => `${k}=${merged[k]}`);
  fs.writeFileSync(ENV_PATH, lines.join('\n'), 'utf8');
}

function ensureOwner(authorJid) {
  const ownerJid = (conf.NUMERO_OWNER || '').replace(/[^0-9]/g, '') + '@s.whatsapp.net';
  return (authorJid === ownerJid);
}

ezra({ nomCom: 'mode', aliases: ['.mode'], categorie: 'VIPER-Admin', reaction: '🔁' }, async (dest, zk, commandeOptions) => {
  const { arg, repondre, ms } = commandeOptions;
  const author = ms.key.participant || ms.key.remoteJid;
  if (!ensureOwner(author)) return repondre('Only the bot owner can change the mode.');
  if (!arg || !arg[0]) return repondre('Usage: mode public|private');
  const v = arg[0].toLowerCase();
  let val = null;
  if (v === 'public') val = 'yes';
  else if (v === 'private') val = 'no';
  else return repondre('Unknown mode. Use `public` or `private`.');

  try {
    writeEnv({ PUBLIC_MODE: val });
    process.env.PUBLIC_MODE = val;
    conf.MODE = val;
    repondre(`Mode set to ${v} (${val})`);
  } catch (e) {
    repondre('Failed to save mode: ' + e.message);
  }
});

module.exports = { ezra };
