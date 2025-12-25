const fs = require('fs-extra');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'menu2_pending.json');

async function _read() {
    try {
        if (!fs.existsSync(DATA_FILE)) return {};
        const raw = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(raw || '{}');
    } catch (e) { return {}; }
}

async function _write(obj) {
    try {
        await fs.ensureDir(path.dirname(DATA_FILE));
        await fs.writeFile(DATA_FILE, JSON.stringify(obj, null, 2), 'utf8');
    } catch (e) { }
}

async function setPending(jid, ttlMs = 120000) {
    const data = await _read();
    const expires = Date.now() + ttlMs;
    data[jid] = { expires };
    await _write(data);
}

async function clearPending(jid) {
    const data = await _read();
    if (data[jid]) delete data[jid];
    await _write(data);
}

async function getPending(jid) {
    const data = await _read();
    const rec = data[jid];
    if (!rec) return false;
    if (Date.now() > rec.expires) {
        await clearPending(jid);
        return false;
    }
    return true;
}

module.exports = { setPending, getPending, clearPending };
