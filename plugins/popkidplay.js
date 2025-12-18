const axios = require("axios");
const { cmd } = require("../command");
const { ytsearch } = require("@dark-yasiya/yt-dl.js");

cmd({
  pattern: "play",
  alias: ["ytplay", "song", "yta"],
  react: "🎵",
  desc: "Download YouTube audio using GiftedTech API",
  category: "download",
  use: ".popkidplay <song name or YouTube URL>",
  filename: __filename
}, async (conn, mek, m, { from, reply, q }) => {
  try {
    const input = q?.trim() || "Fave Mr Man"; // default song if none provided
    await conn.sendMessage(from, { react: { text: "🔍", key: mek.key } });
    await reply(`🎧 Searching for: *${input}*`);

    // 🔍 Search YouTube
    const search = await ytsearch(input);
    const vid = search?.results?.[0];
    if (!vid || !vid.url) return reply("❌ No results found!");

    const title = vid.title.replace(/[^\w\s.-]/gi, "").slice(0, 50);
    const videoUrl = vid.url;

    await conn.sendMessage(from, {
      image: { url: vid.thumbnail },
      caption: `
🎶 *Now Playing...*

📝 *Title:* ${vid.title}
⏱️ *Duration:* ${vid.timestamp || "Unknown"}
👁️ *Views:* ${vid.views || "Unknown"}
👤 *Author:* ${vid.author?.name || "Unknown"}

> 🎧 *Converting to MP3...*
`.trim()
    }, { quoted: mek });

    // 🎧 Use only your GiftedTech API
    const api = `https://ytapi.giftedtech.co.ke/api/ytdla.php?url=${encodeURIComponent(videoUrl)}&stream=true`;

    const res = await axios.get(api, {
      responseType: "arraybuffer",
      timeout: 60000
    });

    if (!res.data) return reply("⚠️ Failed to fetch audio data.");

    await conn.sendMessage(from, {
      audio: Buffer.from(res.data),
      mimetype: "audio/mpeg",
      fileName: `${title}.mp3`,
      ptt: false
    }, { quoted: mek });

    await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });

  } catch (err) {
    console.error("❌ Error in popkidplay:", err);
    await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });
    reply("⚠️ Something went wrong while downloading audio!");
  }
});
