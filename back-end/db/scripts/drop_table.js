const { query } = require("../index.js");

async function dropTable() {
  try {
    const res = await query(`DROP TABLE pokemon`);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

dropTable();
