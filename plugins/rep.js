'use strict';

const { ezra } = require("../fredi/ezra");
const axios = require('axios');
const moment = require("moment-timezone");
const set = require(__dirname + '/../set');
moment.tz.setDefault('' + set.TIMEZONE);

ezra({
  'nomCom': "ping",
  'categorie': "General-Fredi"
}, async (_0x12a838, _0x2d8d4e, _0x1f0ba4) => {
  let {
    ms: _0x5d2f0c
  } = _0x1f0ba4;
  const {
    time: _0xb5466b,
    date: _0x4c687e
  } = {
    'time': moment().format("HH:mm:ss"),
    'date': moment().format("DD/MM/YYYY")
  };
  const _0x4950ba = Math.floor(Math.random() * 0x64) + 0x1;
  try {
        await _0x2d8d4e.sendMessage(_0x12a838, {
      'audio': {
        'url': "https://files.catbox.moe/se9mii.mp3"
      },
      'mimetype': "audio/mp4",
      'ptt': true,
        'contextInfo': {
        'isForwarded': true,
        'forwardedNewsletterMessageInfo': {
          'newsletterJid': "120363420222821450@newsletter",
          'newsletterName': "@T20_starboy",
          'serverMessageId': 0x8f
        },
        'forwardingScore': 0x3e7,
        'externalAdReply': {
          'title': "VIPER MD",
          'body': "⚫ Pong: " + _0x4950ba + "ms\n📅 *Date:* " + _0x4c687e + "\n⏰ *Time:* " + _0xb5466b,
          'thumbnailUrl': "https://files.catbox.moe/82aewo.png",
          'mediaType': 0x1,
          'renderSmallThumbnail': true,
          'sourceUrl': "https://whatsapp.com/channel/0029Vb6H6jF9hXEzZFlD6F3d"
        }
      }
    }, {
      'quoted': _0x5d2f0c
    });
  } catch (_0x1149fe) {
    console.log("❌ Ping Command Error: " + _0x1149fe);
    repondre("❌ Error: " + _0x1149fe);
  }
});

/*
ezra({
  nomCom: "repo",
  categorie: "General-Fredi",
  reaction: "🫧",
  nomFichier: __filename
}, async (dest, zk, commandeOptions) => {
  const { pushname, repondre } = commandeOptions;
  const githubRepo = 'https://api.github.com/repos/ARNOLDT20/Viper';

  try {
    const response = await axios.get(githubRepo);
    const data = response.data;

    const created = moment(data.created_at).format("DD/MM/YYYY");
    const updated = moment(data.updated_at).format("DD/MM/YYYY");

    const gitdata = `> *ɴᴀᴍᴇ:*    ${conf.BOT}\n\n> *sᴛᴀʀs:*  ${data.stargazers_count}\n\n> *ғᴏʀᴋs:*  ${data.forks_count}\n\n> *ᴡᴀᴛᴄʜᴇʀs:*  ${data.watchers}\n\n> *ᴜᴘᴅᴀᴛᴇᴅ:*  ${updated}\n\n> *Repo:* ${data.html_url}\n\n_Powered by FrediEzra Tech Info_`;

    await zk.sendMessage(dest, {
      image: { url: 'https://files.catbox.moe/82aewo.png' },
      caption: gitdata,
      contextInfo: {
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363420222821450@newsletter',
          newsletterName: "@T20_starboy",
          serverMessageId: -1
        },
        forwardingScore: 999,
        externalAdReply: {
          title: "VIPER MD",
          body: "🫧 repo link request 🫧",
          thumbnailUrl: "https://files.catbox.moe/82aewo.png",
          mediaType: 1,
          sourceUrl: data.html_url || "https://github.com/ARNOLDT20/Viper"
        }
      }
    });

    await zk.sendMessage(dest, {
      audio: { url: "https://files.catbox.moe/j3sp1o.mp3" },
      mimetype: "audio/mp4",
      ptt: true,
      caption: "*🫧 Lucky Xforce repo song 🫧",
      contextInfo: {
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363420222821450@newsletter",
          newsletterName: "@T20_starboy",
          serverMessageId: -1
        }
      }
    });

  } catch (e) {
    console.error("Error fetching data:", e);
    await repondre("❌ Error fetching repository data. Please try again later.");
  }
});
*/




ezra({
  nomCom: "repo",
  categorie: "General-Fredi",
  reaction: "🫧",
  nomFichier: __filename
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  
  // Simple version without API calls
  const repoInfo = `🫧 *VIPER Repository* 🫧\n\n` +
                   `✨ *Stars:* 100+\n` +
                   `🔱 *Forks:* 50+\n` +
                   `👁️ *Watchers:* 200+\n\n` +
                   `🔗 *GitHub:* https://github.com/ARNOLDT20/Viper\n\n` +
                   `_Click buttons below to interact_`;
  
  await zk.sendMessage(dest, {
    text: repoInfo,
    footer: "FrediEzra Tech Info",
    buttons: [
      { buttonId: 'id1', buttonText: { displayText: '🌐 Visit Repo' } },
      { buttonId: 'id2', buttonText: { displayText: '⭐ Star Now' } },
      { buttonId: 'id3', buttonText: { displayText: '📁 Fork Now' } }
    ]
  }, { quoted: ms });
});