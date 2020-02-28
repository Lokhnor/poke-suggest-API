const { query } = require("../index.js");

async function createTable() {
  try {
    const res = await query(`CREATE TABLE IF NOT EXISTS pokemon (
    id SERIAL PRIMARY KEY,
    pkdx_id INT,
    name TEXT,
    description TEXT,
    img_url TEXT,
    types TEXT[],
    evolutions TEXT[]
    )
    `);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

createTable();
