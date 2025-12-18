const config = require('../config')
const axios = require('axios');
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const fs = require('fs');
var imgmsg = "*Give me a anime name !*"
var descgs = "It gives details of given anime name."
var cants = "I cant find this anime."

//====================================================================================
cmd({
    pattern: "garl",
    alias: ["imgloli"],
    react: '😎',
    desc: "Download anime loli images.",
    category: "anime",
    use: '.loli',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let res = await axios.get('https://api.lolicon.app/setu/v2?num=1&r18=0&tag=lolicon')
let wm = `😎 Random Garl image

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʜᴜɴᴛᴇʀ xᴍᴅ`
await conn.sendMessage(from, { image: { url: res.data.data[0].urls.original }, caption: wm}, { quoted: mek })
} catch (e) {
reply(cants)
     await conn.sendMessage(from,{image :{ url: `https://files.catbox.moe/gv53bk.png` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ Viper MD' },{quoted:mek});
     await conn.sendMessage(from,{image :{ url: `https://files.catbox.moe/gv53bk.png` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ Viper MD' },{quoted:mek});
     await conn.sendMessage(from,{image :{ url: `https://files.catbox.moe/gv53bk.png` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ Viper MD' },{quoted:mek});
     await conn.sendMessage(from,{image :{ url: `https://files.catbox.moe/gv53bk.png` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ Viper MD' },{quoted:mek});
     await conn.sendMessage(from,{image :{ url: `https://files.catbox.moe/gv53bk.png` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ Viper MD' },{quoted:mek});
console.log(e)
}
})

//=====================================================================
cmd({
    pattern: "waifu",
    alias: ["imgwaifu"],
    react: '💫',
    desc: "Download anime waifu images.",
    category: "anime",
    use: '.waifu',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let res = await axios.get('https://api.waifu.pics/sfw/waifu')
let wm = `🩵 Random Waifu image

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʜᴜɴᴛᴇʀ xᴍᴅ`
await conn.sendMessage(from, { image: { url: res.data.url }, caption: wm}, { quoted: mek })
} catch (e) {
reply(cants)
console.log(e)
}
})

//================================================================
cmd({
    pattern: "neko",
    alias: ["imgneko"],
    react: '💫',
    desc: "Download anime neko images.",
    category: "anime",
    use: '.neko',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let res = await axios.get('https://api.waifu.pics/sfw/neko')
let wm = `🩷 Random neko image

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʀɪss ᴀɪ`
await conn.sendMessage(from, { image: { url: res.data.url  }, caption: wm}, { quoted: mek })
} catch (e) {
reply(cants)
console.log(e)
}
})
  
//=====================================================================
cmd({
    pattern: "megumin",
    alias: ["imgmegumin"],
    react: '💕',
    desc: "Download anime megumin images.",
    category: "anime",
    use: '.megumin',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let res = await axios.get('https://api.waifu.pics/sfw/megumin')
let wm = `❤️‍🔥Random megumin image

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʜᴜɴᴛᴇʀ xᴍᴅ`
await conn.sendMessage(from, { image: { url: res.data.url }, caption: wm}, { quoted: mek })
} catch (e) {
reply(cants)
console.log(e)
}
})

//================================================================
cmd({
    pattern: "maid",
    alias: ["imgmaid"],
    react: '💫',
    desc: "Download anime maid images.",
    category: "anime",
    use: '.maid',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let res = await axios.get('https://api.waifu.im/search/?included_tags=maid')
let wm = `😎 Random maid image

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʀɪss ᴀɪ`
await conn.sendMessage(from, { image: { url: res.data.images[0].url  }, caption: wm}, { quoted: mek })
} catch (e) {
reply(cants)
console.log(e)
}
})

//=====================================================================
cmd({
    pattern: "awoo",
    alias: ["imgawoo"],
    react: '😎',
    desc: "Download anime awoo images.",
    category: "anime",
    use: '.awoo',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let res = await axios.get('https://api.waifu.pics/sfw/awoo')
let wm = `😎 Random awoo image

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʜᴜɴᴛᴇʀ xᴍᴅ`
await conn.sendMessage(from, { image: { url: res.data.url }, caption: wm}, { quoted: mek })
} catch (e) {
reply(cants)
console.log(e)
}
})
// Anmiex
cmd({
    pattern: "animegirl",
    desc: "Fetch a random anime girl image.",
    category: "fun",
    react: "🧚🏻",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.url }, caption: '*ANIME GIRL IMAGE* 🥳\n\n\n *> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʀɪss ᴀɪ`*' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`*Error Fetching Anime Girl image*: ${e.message}`);
    }
});

cmd({
    pattern: "animegirl1",
    desc: "Fetch a random anime girl image.",
    category: "fun",
    react: "🧚🏻",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.url }, caption: 'ANIME GIRL IMAGE 👾\n\n\n > © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʀɪss ᴀɪ' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`*Error Fetching Anime Girl image*: ${e.message}`);
    }
});

cmd({
    pattern: "animegirl2",
    desc: "Fetch a random anime girl image.",
    category: "fun",
    react: "🧚🏻",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.url }, caption: 'ANIME GIRL IMAGE 👾\n\n\n > © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʀɪss ᴀɪ' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`*Error Fetching Anime Girl image*: ${e.message}`);
    }
});

cmd({
    pattern: "animegirl3",
    desc: "Fetch a random anime girl image.",
    category: "fun",
    react: "🧚🏻",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.url }, caption: 'ANIME GIRL IMAGE 👾\n\n\n > © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʀɪss ᴀɪ' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`*Error Fetching Anime Girl image*: ${e.message}`);
    }
});

cmd({
    pattern: "animegirl4",
    desc: "Fetch a random anime girl image.",
    category: "fun",
    react: "🧚🏻",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.url }, caption: 'ANIME GIRL IMAGE 👾\n\n\n > © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʀɪss ᴀɪ' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`*Error Fetching Anime Girl image*: ${e.message}`);
    }
});

cmd({
    pattern: "animegirl5",
    desc: "Fetch a random anime girl image.",
    category: "fun",
    react: "🧚🏻",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.url }, caption: 'ANIME GIRL IMAGE 👾\n\n\n > © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʀɪss ᴀɪ' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`*Error Fetching Anime Girl image*: ${e.message}`);
    }
});


//==========anime=====

cmd({
    pattern: "anime",
    desc: "anime the bot",
    category: "main",
    react: "⛱️",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let dec = `> VIPER MD ANIME IMGS*`
await conn.sendMessage(from,{image:{url: `https://files.catbox.moe/gv53bk.png`},caption:dec},{quoted:mek});
await conn.sendMessage(from,{image:{url: `https://files.catbox.moe/gv53bk.png`},caption:dec},{quoted:mek});
await conn.sendMessage(from,{image:{url: `https://files.catbox.moe/gv53bk.png`},caption:dec},{quoted:mek});
await conn.sendMessage(from,{image:{url: `https://files.catbox.moe/gv53bk.png`},caption:dec},{quoted:mek});
await conn.sendMessage(from,{image:{url: `https://files.catbox.moe/gv53bk.png`},caption:dec},{quoted:mek});
await conn.sendMessage(from,{image:{url: `https://files.catbox.moe/gv53bk.png`},caption:dec},{quoted:mek});
await conn.sendMessage(from,{image:{url: `https://files.catbox.moe/gv53bk.png`},caption:dec},{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
});


cmd({
    pattern: "anime1",
    desc: "Animal image.",
    react: "🧚‍♀️",
    category: "other",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

await conn.sendMessage(from,{image :{ url: `https://files.catbox.moe/gv53bk.png` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʀɪss ᴀɪ' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://files.catbox.moe/gv53bk.png` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʀɪss ᴀɪX' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://files.catbox.moe/gv53bk.png` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʀɪss ᴀɪ' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://files.catbox.moe/gv53bk.png` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʀɪss ᴀɪ' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://files.catbox.moe/gv53bk.png` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʀɪss ᴀɪ' },{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
    pattern: "anime2",
    desc: "Animal image.",
    react: "🧚‍♀️",
    category: "other",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

await conn.sendMessage(from,{image :{ url: `https://files.catbox.moe/gv53bk.png` },caption: '> © ᴘᴏᴡᴡᴇʀᴇᴅ ʙʏ ᴄʀɪss ᴀɪ' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://files.catbox.moe/gv53bk.png` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʀɪss ᴀɪ' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://files.catbox.moe/gv53bk.png` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʀɪss ᴀɪ' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://files.catbox.moe/gv53bk.png` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʀɪss ᴀɪ' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://files.catbox.moe/gv53bk.png` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʀɪss ᴀɪ' },{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
})


cmd({
    pattern: "anime3",
    desc: "Animal image.",
    react: "🧚‍♀️",
    category: "other",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

await conn.sendMessage(from,{image :{ url: `https://files.catbox.moe/gv53bk.png` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʀɪss ᴀɪ' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://files.catbox.moe/gv53bk.png` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʀɪss ᴀɪ' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://files.catbox.moe/gv53bk.png` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʀɪss ᴀɪ' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://files.catbox.moe/gv53bk.png` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʀɪss ᴀɪ' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://files.catbox.moe/gv53bk.png` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʀɪss ᴀɪ' },{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
})


cmd({
    pattern: "anime4",
    desc: "Animal image.",
    react: "🧚‍♀️",
    category: "other",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

await conn.sendMessage(from,{image :{ url: `https://files.catbox.moe/gv53bk.png` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʀɪss ᴀɪ' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://files.catbox.moe/gv53bk.png` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʀɪss ᴀɪ' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://files.catbox.moe/gv53bk.png` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʀɪss ᴀɪ' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://files.catbox.moe/gv53bk.png` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʀɪss ᴀɪ' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://files.catbox.moe/gv53bk.png` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʀɪss ᴀɪ' },{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
})


cmd({
    pattern: "anime5",
    desc: "Animal image.",
    react: "🧚‍♀️",
    category: "other",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

await conn.sendMessage(from,{image :{ url: `https://files.catbox.moe/gv53bk.png` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʀɪss ᴀɪ' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://files.catbox.moe/gv53bk.png` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʀɪss ᴀɪ' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://files.catbox.moe/gv53bk.png` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʀɪss ᴀɪ' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://files.catbox.moe/gv53bk.png` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʀɪss ᴀɪ' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://files.catbox.moe/gv53bk.png` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʀɪss ᴀɪ' },{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
    pattern: "dog",
    desc: "Fetch a random dog image.",
    category: "fun",
    react: "🐶",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://dog.ceo/api/breeds/image/random`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.message }, caption: '> *© Powered By ʜᴜɴᴛᴇʀ xᴍᴅ> ' }, { quoted: mek });
    } catch (e) {
        console.log(e); // ❯❯ Powered by CRISS-AI 👑
        reply(`єяяσя ƒєт¢нιηg ∂σg ιмαgє: ${e.message}`);
    }
});
