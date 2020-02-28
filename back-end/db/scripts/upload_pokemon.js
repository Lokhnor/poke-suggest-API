const { query } = require("../index.js");
const fs = require("fs");
const { promisify } = require("util");
//nb fs and util are a core modules of node, so we don't have to install them;

const readFile = promisify(fs.readFile);

async function uploadPoke() {
  try {
    const data = await readFile("back-enddbpokedex.json");
    const pokemon = JSON.parse(data);

    for (let i = 0; i < pokemon.length; i++) {
      //   console.log(pokemon[i]);
      const {
        pkdx_id,
        name,
        description,
        img_url,
        types,
        evolutions
      } = pokemon[i];
      const res = await query(
        `INSERT INTO pokemon(
      pkdx_id, 
      name, 
      description, 
      img_url, 
      types, 
      evolutions
      )
      VALUES ($1,$2,$3,$4,$5,$6)
  `,
        [pkdx_id, name, description, img_url, types, evolutions]
      );

      console.log(res);
    }
  } catch (err) {
    console.log(err);
  }
}

uploadPoke();
