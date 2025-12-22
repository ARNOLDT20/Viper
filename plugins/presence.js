const { ezra } = require("../fredi/ezra");
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', 'set.env');

function readEnvFile() {
  if (!fs.existsSync(envPath)) return {};
  const content = fs.readFileSync(envPath, 'utf8');
  const lines = content.split(/\r?\n/).filter(Boolean);
  const obj = {};
  for (const l of lines) {
    const idx = l.indexOf('=');
    if (idx === -1) continue;
    const k = l.slice(0, idx).trim();
    const v = l.slice(idx + 1).trim();
    obj[k] = v;
  }
  return obj;
}

function writeEnvFile(obj) {
  const lines = Object.keys(obj).map(k => `${k}=${obj[k]}`);
  fs.writeFileSync(envPath, lines.join('\n'), 'utf8');
}

function setEnvVar(key, value) {
  const env = readEnvFile();
  env[key] = value;
  writeEnvFile(env);
}

const presenceMap = {
  '0': 'unavailable',
  '1': 'available',
  '2': 'composing',
  '3': 'recording'
};

ezra({
  nomCom: 'presence',
  aliases: ['pres','setpresence'],
  categorie: 'VIPER-Owner',
  reaction: '🟢',
  nomFichier: __filename
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg, prefixe, superUser } = commandeOptions;
  if (!superUser) return repondre('Only the bot owner can use this command.');

  const args = Array.isArray(arg) ? arg : (arg ? String(arg).split(/\s+/) : []);
  const sub = (args[0] || '').toLowerCase();

  if (!sub || sub === 'help') {
    return repondre(`Usage:\n${prefixe}presence get\n${prefixe}presence <0|1|2|3>\n\n0=unavailable,1=available,2=composing,3=recording`);
  }

  try {
    if (sub === 'get') {
      try { delete require.cache[require.resolve('../set.js')]; } catch (e) {}
      const s = require('../set.js');
      const value = Number(s.ETAT || s.PRESENCE || process.env.PRESENCE || 1);
      return repondre(`PRESENCE=${value} (${presenceMap[String(value)] || 'unknown'})`);
    }

    if (['0','1','2','3'].includes(sub)) {
      setEnvVar('PRESENCE', sub);
      process.env.PRESENCE = sub;
      // reload set.js so runtime conf picks it up where possible
      try { delete require.cache[require.resolve('../set.js')]; } catch (e) {}
      require('../set.js');
      return repondre(`PRESENCE set to ${sub} (${presenceMap[sub]}) — some parts may require a bot restart to take full effect.`);
    }

    return repondre('Unknown argument. Use `get` or 0/1/2/3.');
  } catch (e) {
    console.error('presence command error', e);
    repondre('An error occurred while setting PRESENCE.');
  }
});

module.exports = { ezra };
