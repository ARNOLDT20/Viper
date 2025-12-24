const { ezra } = require('../fredi/ezra');
const conf = require('../set');

ezra({ nomCom: 'antimention', aliases: ['.antimention'], categorie: 'VIPER-Admin', reaction: '🔕' }, async (dest, zk, commandeOptions) => {
  const { arg, repondre, ms } = commandeOptions;
  if (!ms.key.remoteJid || !ms.key.remoteJid.endsWith('@g.us')) return repondre('Use this command inside a group.');
  const meta = await zk.groupMetadata(ms.key.remoteJid);
  const author = ms.key.participant || ms.key.remoteJid;
  const ownerJid = (conf.NUMERO_OWNER || '').replace(/[^0-9]/g,'') + '@s.whatsapp.net';
  const member = meta.participants.find(p => p.id === author) || {};
  const isAdmin = member.admin || member.isAdmin || false;
  if (author !== ownerJid && !isAdmin) return repondre('Only group admins or the owner can change this.');
  if (!arg || !arg[0]) return repondre('Usage: antimention on|off');
  const v = arg[0].toLowerCase();
  const val = (v === 'on' || v === 'yes' || v === '1') ? 'on' : 'off';

  try {
    const { setAntimention } = require('../lib/antimention');
    await setAntimention(meta.id, val);
    repondre(`antimention set to ${val} for this group`);
  } catch (e) {
    console.error('antimention plugin error', e);
    repondre('Failed to update setting');
  }
});

module.exports = { ezra };
