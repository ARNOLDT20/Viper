"use strict";
const { ezra } = require("../fredi/ezra");
const axios = require("axios");
const conf = require("../set");

ezra({ nomCom: "update", categorie: "VIPER-Menu", reaction: "🔁", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
    const { repondre, superUser } = commandeOptions;
    if (!superUser) return repondre("Only bot owner or sudo may use this command.");

    try {
        repondre("Starting update/restart sequence...");

        // If Heroku variables are provided, attempt Heroku dyno restart via API
        if (conf.HEROKU_API_KEY && conf.HEROKU_APP_NAME) {
            const herokuUrl = `https://api.heroku.com/apps/${conf.HEROKU_APP_NAME}/dynos`;
            try {
                await axios.delete(herokuUrl, {
                    headers: {
                        Authorization: `Bearer ${conf.HEROKU_API_KEY}`,
                        Accept: "application/vnd.heroku+json; version=3",
                    },
                    timeout: 15000,
                });
                return repondre("Heroku dynos restarted (API request sent). The app should come back shortly.");
            } catch (err) {
                console.error("Heroku restart failed:", err.message || err);
                repondre("Heroku restart failed; will attempt graceful local restart.");
            }
        }

        // Fallback: exit process to let process manager restart (PM2, systemd, etc.)
        repondre("Exiting process to allow supervisor to restart the bot...");
        setTimeout(() => process.exit(0), 1500);
    } catch (e) {
        console.error("update command error", e);
        try { repondre("Error while attempting update/restart: " + e); } catch (_) {}
    }
});
