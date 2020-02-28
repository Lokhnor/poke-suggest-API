const { query } = require("../db/index.js");

async function getPokemon() {
  const pokemon = await query("SELECT * FROM pokemon");
  console.log(pokemon);
  return pokemon.rows;
}

async function getPokemonById(id) {
  const pokemon = await query(`SELECT * FROM pokemon WHERE id = $1`, [id]);
  return pokemon.rows[0];
}

async function getPokemonByName(input) {
  const pokemon = await query(
    `SELECT * FROM pokemon WHERE name ILIKE '%' || $1 || '%'`,
    [input]
  );
  return pokemon.rows[0];
}

async function getPokemonBySearch(input) {
  const pokemon = await query(
    `SELECT * FROM pokemon WHERE name ILIKE '%' || $1 || '%'`,
    [input]
  );
  const returnedPokemon = pokemon.rows;

  function compare(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }
  return returnedPokemon.sort(compare);
}

async function savePokemon(pokemon) {
  const {
    id,
    pkdx_id,
    name,
    description,
    img_url,
    types,
    evolutions
  } = pokemon;
  const pokemonArray = await query(
    `INSERT INTO pokemon (id, pkdx_id, name, description, img_url, types, evolutions) VALUES ($1,$2,$3,$4,$5,$6,$7)`,
    [id, pkdx_id, name, description, img_url, types, evolutions]
  );
  console.log("result", pokemonArray);
  return pokemonArray;
}

// async function savePokemon(pokemon) {
//   const { pkdx_id, name, description, img_url, types, evolutions } = pokemon;
//   const pokemonArray = await query(
//     `INSERT INTO pokemon (pkdx_id, name, description, img_url, types, evolutions) VALUES ($1,$2,$3,$4,$5,$6)`,
//     [pkdx_id, name, description, img_url, types, evolutions]
//   );
//   console.log("result", pokemonArray);
//   return pokemonArray;
// }

async function replacePokemon(body, id) {
  const { pkdx_id, name, description, img_url, types, evolutions } = body;
  const res = await query(
    `UPDATE pokemon SET pkdx_id = $1, name = $2, description = $3, img_url = $4, types = $5, evolutions = $6, WHERE id = $7`,
    [pkdx_id, name, description, img_url, types, evolutions]
  );
  return res;
}

async function patchPokemon(body, id) {
  const { pkdx_id, name, description, img_url, types, evolutions } = body;
  const res = await query(
    `UPDATE pokemon SET pkdx_id = COALESCE($1, pkdx_id), name = COALESCE($2, name), description = COALESCE($2, description), img_url = COALESCE($2, img_url), types = COALESCE($2, types), evolutions = COALESCE($2, evolutions), WHERE id = $7`,
    [pkdx_id, name, description, img_url, types, evolutions, id]
  );
  return res.rows[0];
}

module.exports = {
  getPokemon,
  getPokemonById,
  getPokemonByName,
  getPokemonBySearch,
  savePokemon,
  patchPokemon
};
