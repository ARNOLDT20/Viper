const conf = require('../set');

// Send presence update then message. presenceType is determined by live config `PRESENCE` (ETAT).
async function sendWithPresence(zk, jid, message, opts = {}, preferRecording = false) {
  try {
    // read live presence
    let s = {};
    try { delete require.cache[require.resolve('../set')]; } catch (e) {}
    s = require('../set');
    const etat = Number(s.ETAT || s.PRESENCE || process.env.PRESENCE || 0);

    // decide presence action
    let action = null;
    if (preferRecording) action = 'recording';
    else if (etat === 2) action = 'composing';
    else if (etat === 3) action = 'recording';
    else if (etat === 1) action = 'available';

    if (action === 'composing' || action === 'recording') {
      try { await zk.sendPresenceUpdate(action, jid); } catch (e) { }
      // pause to simulate typing/recording time
      const delayMs = action === 'composing' ? (500 + Math.floor(Math.random() * 1200)) : (1000 + Math.floor(Math.random() * 1800));
      await new Promise(r => setTimeout(r, delayMs));
      // send the message
      const res = await zk.sendMessage(jid, message, opts);
      // revert presence to available
      try { await zk.sendPresenceUpdate('available', jid); } catch (e) { }
      return res;
    }

    // default: just send
    return await zk.sendMessage(jid, message, opts);
  } catch (e) {
    console.error('presence-helper send error', e);
    // fallback to direct send
    try { return await zk.sendMessage(jid, message, opts); } catch (err) { console.error('direct send fallback failed', err); }
  }
}

module.exports = { sendWithPresence };
