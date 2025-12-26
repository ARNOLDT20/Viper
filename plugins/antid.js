const { ezra } = require("../fredi/ezra");
const fs = require('fs-extra');
const path = require('path');

// store per-chat anti-delete toggle in data/anti_delete.json
const DATA_FILE = path.join(__dirname, '..', 'data', 'anti_delete.json');
async function readData() {
  try {
    if (!fs.existsSync(DATA_FILE)) return {};
    return JSON.parse(await fs.readFile(DATA_FILE, 'utf8') || '{}');
  } catch (e) { return {}; }
}
async function writeData(obj) {
  try { await fs.ensureDir(path.dirname(DATA_FILE)); await fs.writeFile(DATA_FILE, JSON.stringify(obj, null, 2)); } catch (e) { }
}

ezra({
  nomCom: "anti-delete",
  categorie: "VIPER-Moderation",
  reaction: "😏"
}, async (origineMessage, zk, commandeOptions) => {
  const { arg, repondre, superUser, verifAdmin, auteurMessage, ms, idBot } = commandeOptions;

  // only owner/sudo or group admin can toggle for the chat
  if (!(superUser || (verifAdmin && origineMessage.endsWith('@g.us')))) {
    return repondre('You do not have permission to change anti-delete settings.');
  }

  const data = await readData();
  const chat = origineMessage;

  // handle on/off
  if (arg && arg[0]) {
    const action = arg[0].toString().toLowerCase();
    if (action === 'on') {
      data[chat] = true;
      await writeData(data);
      return repondre('Anti-delete enabled for this chat.');
    } else if (action === 'off') {
      if (data[chat]) delete data[chat];
      await writeData(data);
      return repondre('Anti-delete disabled for this chat.');
    } else {
      return repondre('Usage: anti-delete <on|off>');
    }
  }

  // if no arg, show current state
  const enabled = !!data[chat];
  return repondre(`Anti-delete is currently ${enabled ? 'ENABLED' : 'DISABLED'} for this chat.`);
});

// Work for Blocklist contacts 
ezra({
  nomCom: "blocklist",
  aliases: ["listblock", "blacklist"],
  reaction: '🍂',
  categorie: "VIPER-Search"
}, async (dest, zk, commandeOptions) => {
  const { repondre } = commandeOptions;

  try {
    // Fetch the blocklist of contacts
    let blocklist = await zk.fetchBlocklist();

    // If the blocklist has users, proceed
    if (blocklist.length > 0) {
      // Start the message for blocked contacts
      let jackhuh = `*Blocked Contacts*\n`;

      await repondre(`You have blocked ${blocklist.length} contact(s), fetching and sending their details!`);

      // Map through the blocklist to fetch each blocked user's details
      const promises = blocklist.map(async (blockedUser) => {
        // Extract the phone number from the JID (remove '@s.whatsapp.net')
        const phoneNumber = blockedUser.split('@')[0];

        // Add the blocked user's phone number to the message
        jackhuh += `🤷  +${phoneNumber}\n`;  // List the phone number
      });

      // Wait for all the promises to complete
      await Promise.all(promises);

      // Send the final formatted message with the blocked contacts
      await repondre(jackhuh);
    } else {
      // If no blocked users, reply with a message
      await repondre("There are no blocked contacts.");
    }
  } catch (e) {
    // Catch any error and inform the user
    await repondre("An error occurred while accessing blocked users.\n\n" + e);
  }
});
