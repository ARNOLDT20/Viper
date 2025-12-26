const { ezra } = require('../fredi/ezra');
const { exec } = require('child_process');

ezra({ nomCom: 'update', categorie: 'VIPER-Admin', reaction: '🔁' }, async (dest, zk, commandeOptions) => {
    const { repondre, superUser } = commandeOptions;
    if (!superUser) return repondre('Command reserved for bot owner.');

    repondre('Starting update: pulling latest changes and installing dependencies...');

    exec('git pull --no-edit', { cwd: process.cwd() }, (err, stdout, stderr) => {
        if (err) {
            repondre('Git pull failed: ' + (err.message || err));
            return;
        }
        repondre('Git pull completed. Installing dependencies...');

        exec('npm install --production', { cwd: process.cwd() }, (err2, so2, se2) => {
            if (err2) {
                repondre('npm install failed: ' + (err2.message || err2));
                return;
            }
            repondre('Dependencies installed. Restarting bot...');
            // Delay shortly to allow the message to send, then exit so process manager restarts
            setTimeout(() => {
                process.exit(0);
            }, 1500);
        });
    });
});
