"use strict";
const { ezra } = require("../fredi/ezra");
const { Configuration, OpenAIApi } = require('openai');

ezra({ nomCom: "chatgpt", categorie: "AI", reaction: "🤖", nomFichier: __filename }, async (dest, zk, opts) => {
    const { repondre, arg } = opts;
    const key = process.env.OPENAI_API_KEY;
    if (!key) return repondre('OpenAI API key not configured. Set OPENAI_API_KEY.');
    if (!arg || arg.length === 0) return repondre('Usage: chatgpt <your prompt>');

    try {
        const cfg = new Configuration({ apiKey: key });
        const client = new OpenAIApi(cfg);
        const prompt = arg.join(' ');
        const res = await client.createChatCompletion({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 800
        });

        const text = res.data.choices && res.data.choices[0] && res.data.choices[0].message?.content;
        if (text) repondre(text);
        else repondre('No response from AI.');
    } catch (e) {
        console.error('ai error', e);
        repondre('❌ AI request failed.');
    }
});
