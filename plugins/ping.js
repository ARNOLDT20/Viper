const { ezra } = require('../fredi/ezra');

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

ezra({ nomCom: 'ping2', aliases: ['.ping2'], categorie: 'VIPER-User', reaction: '🏓' }, async (dest, zk, commandeOptions) => {
    const { repondre, ms } = commandeOptions;
    try {
        const start = Date.now();
        await zk.sendMessage(dest, { text: '🏓 Pinging...' }, { quoted: ms });
        const latency = Date.now() - start;
        repondre(`🏓 Pong!
Latency: ${latency} ms
Uptime: ${formatUptime(process.uptime())}`);
    } catch (e) {
        repondre(`Ping failed: ${e.message}`);
    }
});

module.exports = { ezra };
