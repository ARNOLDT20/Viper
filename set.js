const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = {
    session: process.env.SESSION_ID || 'ezra',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB: process.env.GITHUB || 'https://github.com/ARNOLDT20/Viper',
    OWNER_NAME: process.env.OWNER_NAME || "T20_starboy",
    NUMERO_OWNER: process.env.NUMERO_OWNER || "255627417402",
    DEV: process.env.DEV || "T20_starboy",

    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "no",
    AUTO_STICKER: process.env.AUTO_STICKER || "no",
    AUTO_SAVE_CONTACTS: process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/82aewo.png",
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'no',
    CHAT_BOT: process.env.CHAT_BOT || "no",
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no',
    GCF: process.env.GROUP_HANDLE || 'no',
    AUTO_REPLY: process.env.GREET_MESSAGE || "no",
    AUTO_STICKER: process.env.AUTO_STICKER || "no",
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'Your Status Seen By VIPER MD',
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    ANTI_BUG: process.env.ANTI_BUG || "no",
    ANTI_MENTION_GROUP: process.env.ANTI_MENTION_GROUP || "on",
    ANTI_TAG: process.env.ANTI_TAG || "on",
    ANTI_BAD: process.env.ANTI_BAD || "on",
    ANTI_SHARE_GROUP: process.env.ANTI_SHARE_GROUP || "on",
    ANTI_LINK_GROUP: process.env.ANTI_LINK_GROUP || "on",
    AUTO_BIO: process.env.AUTO_BIO || 'yes',
    ANTI_CALL_TEXT: process.env.ANTI_CALL_TEXT || '',
    GURL: process.env.GURL || "https://whatsapp.com/channel/0029Vb6H6jF9hXEzZFlD6F3d",
    WEBSITE: process.env.GURL || "https://fredi-ai-site.vercel.app",
    CAPTION: process.env.CAPTION || "VIPER MD",
    BOT: process.env.BOT_NAME || 'VIPER MD',
    MODE: process.env.PUBLIC_MODE || "no",
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY || null,
    // Third-party API keys (defaults kept for backwards compatibility)
    POLYGON_API_KEY: process.env.POLYGON_API_KEY || 'Y4iTYoJANwppB8I3Bm4QVWdV5oXlvc45',
    OMDB_API_KEY: process.env.OMDB_API_KEY || '742b2d09',
    CRICAPI_KEY: process.env.CRICAPI_KEY || 'f68d1cb5-a9c9-47c5-8fcd-fbfe52bace78',
    GIFTED_API_KEY: process.env.GIFTED_API_KEY || 'gifted',
    CALIPH_API_KEY: process.env.CALIPH_API_KEY || 'caliphkey',
    WARN_COUNT: process.env.WARN_COUNT || '5',
    ETAT: process.env.PRESENCE || '1',
    DP: process.env.STARTING_BOT_MESSAGE || "yes",
    LUCKY_ADM: process.env.ANTI_DELETE_MESSAGES || 'no',
    ANTI_DELETE_GROUP: process.env.ANTI_DELETE_GROUP || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes',
    AUTO_REPLY: process.env.AUTO_REPLY || "no",
    AUDIO_REPLY: process.env.AUDIO_REPLY || 'yes',
    VOICE_CHATBOT_INBOX: process.env.VOICE_CHATBOT_INBOX || "no",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",

};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
})
