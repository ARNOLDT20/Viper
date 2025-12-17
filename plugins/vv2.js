const { cmd } = require("../command");

// Function to detect emojis dynamically
function containsEmoji(text) {
  return /([\u231A-\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD-\u25FE\u2600-\u26FF\u2700-\u27BF\u2B50\u2B55\u2934\u2935\u3030\u303D\u3297\u3299\uD83C\uD000-\uDFFF\uD83D\uD000-\uDFFF\uD83E\uD000-\uDFFF]+)/.test(text);
}

cmd({
  pattern: "vv2",
  alias: ["wah", "ohh", "oho", "🙂", "😂", "❤️", "💋", "🥵", "🌚", "😒", "nice", "ok"],
  desc: "Owner Only - retrieve quoted message back to user",
  category: "owner",
  filename: __filename
}, async (client, message, match, { from, isCreator }) => {
  try {
    // If message text is not a known alias but is an emoji, treat it as valid trigger
    const input = (match && match.input) || message.text || "";
    if (!containsEmoji(input) && !["vv2", "wah", "ohh", "oho", "🙂", "😂", "❤️", "💋", "🥵", "🌚", "😒", "nice", "ok"].includes(input)) {
      return; // Skip if it's not one of the triggers or an emoji
    }

    if (!isCreator) {
      return; // No response for non-owner
    }

    if (!match.quoted) {
      return await client.sendMessage(from, {
        text: "*🍁 Please reply to a view once message!*"
      }, { quoted: message });
    }

    const buffer = await match.quoted.download();
    const mtype = match.quoted.mtype;
    const options = { quoted: message };

    let messageContent = {};
    switch (mtype) {
      case "imageMessage":
        messageContent = {
          image: buffer,
          caption: match.quoted.text || '',
          mimetype: match.quoted.mimetype || "image/jpeg"
        };
        break;
      case "videoMessage":
        messageContent = {
          video: buffer,
          caption: match.quoted.text || '',
          mimetype: match.quoted.mimetype || "video/mp4"
        };
        break;
      case "audioMessage":
        messageContent = {
          audio: buffer,
          mimetype: "audio/mp4",
          ptt: match.quoted.ptt || false
        };
        break;
      default:
        return await client.sendMessage(from, {
          text: "❌ Only image, video, and audio messages are supported"
        }, { quoted: message });
    }

    // Forward to user's DM
    await client.sendMessage(message.sender, messageContent, options);
  } catch (error) {
    console.error("vv2 Error:", error);
    await client.sendMessage(from, {
      text: "❌ Error fetching vv message:\n" + error.message
    }, { quoted: message });
  }
});
