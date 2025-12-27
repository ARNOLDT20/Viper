const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '..', 'data', 'auto_react_chats.json');

function ensureFile() {
    try {
        const dir = path.dirname(FILE);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, JSON.stringify({ enabled: [] }, null, 2));
    } catch (e) { /* ignore */ }
}

function read() {
    ensureFile();
    try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); } catch (e) { return { enabled: [] }; }
}

function write(obj) {
    ensureFile();
    fs.writeFileSync(FILE, JSON.stringify(obj, null, 2));
}

function enable(chatJid) {
    if (!chatJid) return false;
    const data = read();
    const list = data.enabled || [];
    if (!list.includes(chatJid)) {
        list.push(chatJid);
        data.enabled = list;
        write(data);
    }
    return true;
}

function disable(chatJid) {
    if (!chatJid) return false;
    const data = read();
    data.enabled = (data.enabled || []).filter(x => x !== chatJid);
    write(data);
    return true;
}

function isEnabled(chatJid) {
    if (!chatJid) return false;
    const data = read();
    return (data.enabled || []).includes(chatJid);
}

function list() { return read().enabled || []; }

module.exports = { enable, disable, isEnabled, list };
