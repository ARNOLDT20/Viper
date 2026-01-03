const { ezra } = require("../fredi/ezra");
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'autotyping.json');
if (!fs.existsSync(configPath)) fs.writeFileSync(configPath, JSON.stringify({}, null, 2));

function readConfig() {
    try { return JSON.parse(fs.readFileSync(configPath, 'utf8') || '{}'); } catch (e) { return {}; }
}
function writeConfig(cfg) { fs.writeFileSync(configPath, JSON.stringify(cfg, null, 2)); }

// Command: autotyping on|off
ezra({ nomCom: 'autotyping', categorie: 'VIPER-Group', reaction: '⏱️' }, async (dest, zk, opts) => {
    const { repondre, arg, verifAdmin, verifGroupe } = opts;
    if (!verifGroupe) return repondre('This command is only allowed in groups.');
    if (!verifAdmin) return repondre('Only group admins can toggle autotyping.');

    const action = (arg && arg[0]) ? arg[0].toString().toLowerCase() : '';
    if (!['on', 'off'].includes(action)) return repondre('Usage: autotyping on | off');

    const cfg = readConfig();
    cfg[dest] = (action === 'on');
    writeConfig(cfg);
    repondre(`Autotyping is now ${action === 'on' ? 'enabled' : 'disabled'} for this group.`);
});

module.exports = {};
