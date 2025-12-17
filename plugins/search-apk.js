const { cmd } = require("../command");
const axios = require("axios");

cmd({
    pattern: "playstore",
    react: '📲',
    alias: ["ps", "app"],
    desc: "Search for an app on the Play Store",
    category: "search",
    filename: __filename
},
async (conn, mek, m, { from, q, sender, reply }) => {
    try {
        if (!q) return reply("❌ Please provide an app name to search.");

        // React: Processing ⏳
        await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

        const apiUrl = `https://apis.davidcyriltech.my.id/search/playstore?q=${encodeURIComponent(q)}`;
        const response = await axios.get(apiUrl);

        if (!response.data.success || !response.data.result) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return reply("❌ No results found for the given app name.");
        }

        const app = response.data.result;

        const infoMessage = `
📲 *PLAY STORE SEARCH*
╭──────────────◆
│• 📌 Name: ${app.title}
│• 📖 Summary: ${app.summary}
│• 📥 Installs: ${app.installs}
│• ⭐ Rating: ${app.score}
│• 💲 Price: ${app.price}
│• 📦 Size: ${app.size || 'Not available'}
│• 📱 Android: ${app.androidVersion}
│• 👨‍💻 Developer: ${app.developer}
│• 📅 Released: ${app.released}
│• 🔄 Updated: ${app.updated}
│• 🔗 Link: ${app.url}
╰─────────────────
> popkid`.trim();

        if (app.icon) {
            await conn.sendMessage(
                from,
                {
                    image: { url: app.icon },
                    caption: infoMessage
                },
                { quoted: mek }
            );
        } else {
            await reply(infoMessage);
        }

        // React: Success ✅
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (error) {
        console.error("Play Store Error:", error);
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
        reply("❌ Error searching for the app. Please try again.");
    }
});
