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

ezra({
  nomCom: "config",
  categorie: "VIPER-Owner",
  reaction: "🔧",
  nomFichier: __filename
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg, prefixe, superUser } = commandeOptions;
  if (!superUser) return repondre('Only the bot owner can use this command.');

  // arg may be an array or a string depending on framework parsing
  const args = Array.isArray(arg) ? arg : (arg ? String(arg).split(/\s+/) : []);
  const sub = (args[0] || '').toLowerCase();

  if (!sub || sub === 'help') {
    return repondre(`Usage:\n${prefixe}config setprefix <prefix>\n${prefixe}config mode <public|private>\n${prefixe}config set <KEY> <VALUE>\n${prefixe}config get [KEY]`);
  }

  try {
    if (sub === 'setprefix') {
      const val = args[1];
      if (!val) return repondre('Provide a prefix, e.g. setprefix +');
      setEnvVar('PREFIX', val);
      process.env.PREFIX = val;
      // reload set.js
      try { delete require.cache[require.resolve('../set.js')]; } catch (e) {}
      require('../set.js');
      return repondre(`Prefix updated to \`${val}\`. Some parts may require a bot restart to take full effect.`);
    }

    if (sub === 'mode') {
      const val = (args[1] || '').toLowerCase();
      if (!['public', 'private'].includes(val)) return repondre('Mode must be `public` or `private`.');
      const envVal = (val === 'public') ? 'yes' : 'no';
      setEnvVar('PUBLIC_MODE', envVal);
      process.env.PUBLIC_MODE = envVal;
      try { delete require.cache[require.resolve('../set.js')]; } catch (e) {}
      require('../set.js');
      return repondre(`Mode updated to *${val}*. Restart may be required for all handlers to pick this up.`);
    }

    if (sub === 'set') {
      const key = (args[1] || '').toUpperCase();
      const value = args.slice(2).join(' ');
      if (!key || !value) return repondre('Usage: set <KEY> <VALUE>');
      // write to env file so persistence survives restarts
      setEnvVar(key, value);
      process.env[key] = value;
      try { delete require.cache[require.resolve('../set.js')]; } catch (e) {}
      require('../set.js');
      return repondre(`Saved ${key}=${value} to \`set.env\`. Restart may be needed.`);
    }

    if (sub === 'get') {
      const key = args[1] ? args[1].toUpperCase() : null;
      // re-require set.js to show latest values
      try { delete require.cache[require.resolve('../set.js')]; } catch (e) {}
      const s = require('../set.js');
      if (key) {
        const v = s[key] || process.env[key];
        return repondre(`${key} = ${v === undefined ? 'undefined' : v}`);
      }
      const lines = [];
      lines.push(`Bot: ${s.BOT || s.CAPTION || 'Viper MD'}`);
      lines.push(`Owner: ${s.OWNER_NAME || 'T20_starboy'} (${s.NUMERO_OWNER || 'unknown'})`);
      lines.push(`Prefix: \`${s.PREFIXE}\``);
      lines.push(`Mode: ${s.MODE === 'yes' ? 'Public' : 'Private'}`);
      lines.push(`Auto follow channel: ${s.AUTO_FOLLOW_CHANNEL}`);
      lines.push(`Auto join: ${s.AUTO_JOIN_ENABLED}`);
      lines.push(`Warn limit: ${s.WARN_COUNT}`);
      return repondre(lines.join('\n'));
    }

    return repondre('Unknown subcommand. Use `help`.');
  } catch (e) {
    console.error('config plugin error', e);
    repondre('An error occurred while updating configuration.');
  }
});

module.exports = { ezra };
