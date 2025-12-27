const fs = require('fs-extra');
const path = require('path');

const DB = path.join(__dirname, '..', 'data', 'menu2_pending.json');

function load() {
    try {
        if (!fs.existsSync(DB)) return {};
        return JSON.parse(fs.readFileSync(DB, 'utf8') || '{}');
    } catch (e) { return {}; }
}

function save(obj) {
    try { fs.mkdirSync(path.dirname(DB), { recursive: true }); fs.writeFileSync(DB, JSON.stringify(obj, null, 2)); } catch (e) { }
}

module.exports = {
    async setPending(chatJid, ttl = 120) {
        const data = load();
        data[chatJid] = { ts: Date.now(), ttl };
        save(data);
    },
    async getPending(chatJid) {
        const data = load();
        const entry = data[chatJid];
        if (!entry) return false;
        if (Date.now() - entry.ts > (entry.ttl || 120) * 1000) {
            delete data[chatJid]; save(data); return false;
        }
        return true;
    },
    async clearPending(chatJid) {
        const data = load();
        if (data[chatJid]) { delete data[chatJid]; save(data); }
    }
};
