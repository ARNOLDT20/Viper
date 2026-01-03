const fs = require('fs-extra');
const path = require('path');

const DB = path.join(__dirname, 'menu2State.json');

async function _read() {
    try {
        if (!await fs.pathExists(DB)) return [];
        const raw = await fs.readFile(DB, 'utf8');
        return JSON.parse(raw || '[]');
    } catch (e) { return []; }
}

async function _write(data) {
    await fs.ensureFile(DB);
    await fs.writeFile(DB, JSON.stringify(data, null, 2), 'utf8');
}

async function setPending(jid) {
    const list = await _read();
    if (!list.includes(jid)) {
        list.push(jid);
        await _write(list);
    }
}

async function clearPending(jid) {
    const list = await _read();
    const out = list.filter(x => x !== jid);
    await _write(out);
}

async function isPending(jid) {
    const list = await _read();
    return list.includes(jid);
}

module.exports = { setPending, clearPending, isPending };
