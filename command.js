var commands = [];
const config = require('./config');

function cmd(info, func) {
    var data = info;
    // ensure defaults
    if (!data.dontAddCommandList) data.dontAddCommandList = false;
    if (!info.desc) info.desc = '';
    if (!data.fromMe) data.fromMe = false;
    if (!info.category) data.category = 'misc';
    if (!info.filename) data.filename = "Not Provided";

    // wrap original handler to send a branded header (image + caption) before running it
    const original = func;
    data.function = async function(conn, mek, m, extra) {
        try {
            const chat = (extra && extra.from) || (m && m.key && m.key.remoteJid) || (m && m.chat) || null;
            if (chat) {
                const imgUrl = config.MENU_IMAGE_URL || config.ALIVE_IMG;
                const title = `*${config.BOT_NAME}*`;
                const desc = data.desc ? `\n${data.desc}` : '';
                const caption = `${title}${desc}`;
                await conn.sendMessage(chat, { image: { url: imgUrl }, caption }, { quoted: mek }).catch(() => null);
            }
        } catch (e) {
            console.log('command header send error', e);
        }
        return await original(conn, mek, m, extra);
    };

    commands.push(data);
    return data;
}
module.exports = {
    cmd,
    AddCommand:cmd,
    Function:cmd,
    Module:cmd,
    commands,
};

