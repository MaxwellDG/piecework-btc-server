const { Pool } = require('pg');
require('dotenv').config({
  override: true,
})

const pool = new Pool({
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME
});

(async () => {
  const client = await pool.connect();
  try{
    const user = await client.query('SELECT current_user');
    console.log("Current postgres user: ", user.rows[0]['current_user']);
  } catch (e) {
    console.log("error connecting to db: ", process.env.DB_NAME);
  } finally {
    client.release();
  }
})();

