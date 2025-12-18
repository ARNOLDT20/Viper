const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "ai",
    alias: ["bot", "dj", "gpt", "gpt4", "bing"],
    desc: "Chat with an AI model",
    category: "ai",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide a message for the AI.\nExample: `.ai Hello`");

        const apiUrl = `https://lance-frank-asta.onrender.com/api/gpt?q=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.message) {
            await react("❌");
            return reply("AI failed to respond. Please try again later.");
        }

        await reply(`${data.message}`);
        await react("✅");
    } catch (e) {
        console.error("Error in AI command:", e);
        await react("❌");
        reply("An error occurred while communicating with the AI.");
    }
});

cmd({
    pattern: "openai",
    alias: ["chatgpt", "gpt3", "open-gpt"],
    desc: "Chat with OpenAI",
    category: "ai",
    react: "🧠",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide a message for OpenAI.\nExample: `.openai Hello`");

        const apiUrl = `https://vapis.my.id/api/openai?q=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.result) {
            await react("❌");
            return reply("OpenAI failed to respond. Please try again later.");
        }

        await reply(`🧠 *OpenAI Response:*\n\n${data.result}`);
        await react("✅");
    } catch (e) {
        console.error("Error in OpenAI command:", e);
        await react("❌");
        reply("An error occurred while communicating with OpenAI.");
    }
});

cmd({
    pattern: "deepseek",
    alias: ["deep", "seekai"],
    desc: "Chat with DeepSeek AI",
    category: "ai",
    react: "🧠",
    filename: __filename
},

// Claude command - uses a configurable proxy endpoint that takes `q` as query param and returns text
cmd({
    pattern: "claude",
    alias: ["haiku", "claude4"],
    desc: "Chat with Claude Haiku (via proxy)",
    category: "ai",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const text = (m.text || "").trim();
        const q = text.startsWith('.') ? text.split(' ').slice(1).join(' ') : text;
        if (!q) return reply("Please provide a message for Claude. Example: `.claude Tell me a haiku about night`");
        const config = require('../config');
        if (config.CLAUDE_ENABLED !== 'true') return reply('Claude is currently disabled. Enable it by setting CLAUDE_ENABLED=true in your environment.');
        if (!config.CLAUDE_API_URL) return reply('Claude API URL is not configured. Set `CLAUDE_API_URL` environment variable to a proxy endpoint that accepts `q` and returns text.');

        const axios = require('axios');
        // Build request URL — allow endpoint already containing query string
        const sep = config.CLAUDE_API_URL.includes('?') ? '&' : '?';
        const url = `${config.CLAUDE_API_URL}${sep}q=${encodeURIComponent(q)}`;
        const res = await axios.get(url, { timeout: 20000 });
        const body = res.data && (typeof res.data === 'string' ? res.data : (res.data.result || res.data.output || JSON.stringify(res.data)));
        if (!body) return reply('Claude proxy returned an empty response.');
        // Shorten very long responses — send first 4000 chars to avoid exceeding WhatsApp limits
        const out = body.toString();
        const replyText = out.length > 3800 ? out.slice(0, 3800) + '\n\n...(truncated)' : out;
        await reply(`🧠 *Claude Haiku Response:*
\n${replyText}`);
    } catch (e) {
        console.error('Claude command error:', e);
        reply('An error occurred while communicating with Claude proxy.');
    }
});
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide a message for DeepSeek AI.\nExample: `.deepseek Hello`");

        const apiUrl = `https://api.ryzendesu.vip/api/ai/deepseek?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.answer) {
            await react("❌");
            return reply("DeepSeek AI failed to respond. Please try again later.");
        }

        await reply(`🧠 *DeepSeek AI Response:*\n\n${data.answer}`);
        await react("✅");
    } catch (e) {
        console.error("Error in DeepSeek AI command:", e);
        await react("❌");
        reply("An error occurred while communicating with DeepSeek AI.");
    }
});


