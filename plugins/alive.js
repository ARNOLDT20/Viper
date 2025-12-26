const { ezra } = require('../fredi/ezra');
const os = require('os');

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

ezra({ nomCom: 'alive', aliases: ['.alive'], categorie: 'VIPER-User', reaction: '💡' }, async (dest, zk, commandeOptions) => {
    const { repondre } = commandeOptions;

    const uptime = formatUptime(process.uptime());
    const mem = process.memoryUsage();
    const heap = (mem.heapUsed / 1024 / 1024).toFixed(2);
    const rss = (mem.rss / 1024 / 1024).toFixed(2);
    const cpus = os.cpus().length;
    const platform = `${os.type()} ${os.arch()}`;
    const nodev = process.version;

    const lines = [];
    lines.push('╔════════════════════════╗');
    lines.push('║      ☢️ VIPER MD ☢️      ║');
    lines.push('╠════════════════════════╣');
    lines.push('║        • STATUS •       ║');
    lines.push('╠════════════════════════╣');
    lines.push(`║ Uptime : ${uptime.padEnd(14)} ║`);
    lines.push(`║ Memory : ${heap}MB heap ║`);
    lines.push(`║ RSS    : ${rss}MB      ║`);
    lines.push(`║ CPU    : ${cpus} cores   ║`);
    lines.push(`║ OS     : ${platform} ║`);
    lines.push(`║ Node   : ${nodev}        ║`);
    lines.push('╠════════════════════════╣');
    lines.push('║   I am alive and ready  ║');
    lines.push('╚════════════════════════╝');

    repondre(lines.join('\n'));
});

ezra({ nomCom: 'uptime', aliases: ['.uptime'], categorie: 'VIPER-User', reaction: '⏱️' }, async (dest, zk, commandeOptions) => {
    const { repondre } = commandeOptions;
    const uptime = formatUptime(process.uptime());
    repondre(`⏱️ Bot uptime: ${uptime}`);
});

module.exports = { ezra };
