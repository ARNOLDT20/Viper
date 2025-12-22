const { ezra } = require("../fredi/ezra");
const fs = require('fs');
const path = require('path');
const conf = require('../set');

ezra({
  nomCom: 'owner',
  aliases: ['myowner'],
  categorie: 'VIPER-Menu',
  reaction: '👑',
  nomFichier: __filename
}, async (dest, zk, commandeOptions) => {
  const { repondre } = commandeOptions;
  try {
    const owners = (conf.NUMERO_OWNER || '').split(',').map(s => s.trim()).filter(Boolean);
    const primary = owners[0] || '255627417402';
    // Send the textual message
    await repondre(`My owner is STARBOY`);

    // Create a simple vCard and send it so the user can add the contact easily
    const phoneNumber = primary.replace(/[^0-9]/g, '');
    const displayName = conf.OWNER_NAME || 'STARBOY';
    const vCard = `BEGIN:VCARD\nVERSION:3.0\nFN:${displayName}\nTEL;type=CELL;type=VOICE;waid=${phoneNumber}:+${phoneNumber}\nEND:VCARD\n`;
    const tmpPath = path.join(__dirname, '..', `${displayName}_${phoneNumber}.vcf`);
    fs.writeFileSync(tmpPath, vCard, 'utf8');

    await zk.sendMessage(dest, {
      document: { url: tmpPath },
      mimetype: 'text/vcard',
      fileName: `${displayName}.vcf`,
      caption: `Contact: ${displayName} (+${phoneNumber})`
    });

    // cleanup
    try { fs.unlinkSync(tmpPath); } catch (e) { }
  } catch (e) {
    console.error('owner command error', e);
    try { await repondre('Could not send owner contact.'); } catch (_) {}
  }
});

module.exports = { ezra };
