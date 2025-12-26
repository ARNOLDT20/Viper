const { ezra } = require('../fredi/ezra');
const os = require('os');
const conf = require('../set');

function formatUptime(s) {
    s = Number(s);
    const d = Math.floor(s / (3600 * 24));
    const h = Math.floor((s % (3600 * 24)) / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = Math.floor(s % 60);
    const parts = [];
    if (d) parts.push(`${d}d`);
    if (h) parts.push(`${h}h`);
    if (m) parts.push(`${m}m`);
    parts.push(`${sec}s`);
    return parts.join(' ');
}

ezra({ nomCom: 'botinfo', aliases: ['.botinfo'], categorie: 'VIPER-User', reaction: '🤖' }, async (dest, zk, commandeOptions) => {
    const { repondre } = commandeOptions;
    try {
        const uptime = formatUptime(process.uptime());
        const mem = (process.memoryUsage().rss / 1024 / 1024).toFixed(2);
        const cores = os.cpus().length;
        const platform = `${os.type()} ${os.arch()}`;
        const nodev = process.version;

        const lines = [];
        lines.push('╔════════════════════════╗');
        lines.push(`║   ☢️ ${conf.BOT || 'VIPER MD'} ☢️   ║`);
        lines.push('╠════════════════════════╣');
        lines.push(`║ Owner : ${conf.OWNER_NAME || conf.NUMERO_OWNER} ║`);
        lines.push(`║ Prefix: ${conf.PREFIXE || '.'}               ║`);
        lines.push(`║ Uptime: ${uptime}               ║`);
        lines.push(`║ Memory: ${mem} MB             ║`);
        lines.push(`║ Cores : ${cores}                 ║`);
        lines.push(`║ Node  : ${nodev}             ║`);
        lines.push('╚════════════════════════╝');

        repondre(lines.join('\n'));
    } catch (e) {
        repondre(`Failed to fetch bot info: ${e.message}`);
    }
});

module.exports = { ezra };
