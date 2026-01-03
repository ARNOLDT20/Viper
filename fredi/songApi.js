const axios = require('axios');
const conf = require('../set');

async function fetchVideoData(url) {
    try {
        const res = await axios.get(`https://api.giftedtech.web.id/api/download/dlmp3`, {
            params: {
                apikey: conf.GIFTED_API_KEY || 'gifted',
                url: url
            }
        });

        return res.data.result;
    } catch (err) {
        console.error("Gifted API Error:", err.message);
        return null;
    }
}

module.exports = { fetchVideoData };
