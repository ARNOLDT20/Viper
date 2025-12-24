require('dotenv').config();
const { Pool } = require('pg');
const s = require('../set');

const dbUrl = s.DATABASE_URL ? s.DATABASE_URL : 'postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9';
const proConfig = {
  connectionString: dbUrl,
  ssl: { rejectUnauthorized: false }
};

const pool = new Pool(proConfig);

async function createTable() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS antimention (
        jid text PRIMARY KEY,
        etat text DEFAULT 'off'
      );
    `);
    console.log("Table 'antimention' ensured.");
  } catch (e) { console.error('createTable antimention err', e); } finally { client.release(); }
}
createTable();

async function setAntimention(jid, etat) {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT jid FROM antimention WHERE jid=$1', [jid]);
    if (res.rows.length) {
      await client.query('UPDATE antimention SET etat=$1 WHERE jid=$2', [etat, jid]);
    } else {
      await client.query('INSERT INTO antimention (jid, etat) VALUES ($1, $2)', [jid, etat]);
    }
    return true;
  } catch (e) { console.error('setAntimention err', e); return false; } finally { client.release(); }
}

async function getAntimention(jid) {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT etat FROM antimention WHERE jid=$1', [jid]);
    if (res.rows.length) return res.rows[0].etat === 'on';
    return false;
  } catch (e) { console.error('getAntimention err', e); return false; } finally { client.release(); }
}

module.exports = { setAntimention, getAntimention };
