const express = require("express");
const router = express.Router();
const {
  getPokemon,
  getPokemonById,
  getPokemonByName,
  getPokemonBySearch,
  savePokemon,
  deletePokemonById,
  editPokemonByName
} = require("../models/pokemon");

const { patchPokemon } = require("../models/pokemon");

router.get("/pokemon", async (req, res) => {
  const { name, id, search } = req.query;
  if (name) {
    const namedPokemon = await getPokemonByName(name);
    res.json(namedPokemon);
    return;
  } else if (id) {
    const idPokemon = await getPokemonById(id);
    res.json(idPokemon);
    return;
  } else if (search) {
    const searchPokemon = await getPokemonBySearch(search);
    res.json(searchPokemon);
  }

  const pokemon = await getPokemon();
  //res.json is express inbuilt function to send an object in json form (ie stringify it)
  res.json(pokemon);
});

router.get("/pokemon/:id", async (req, res) => {
  const { id } = req.params;
  const pokemonId = await getPokemonById(id);
  res.json(pokemonId);
});

router.post("/pokemon", async (req, res) => {
  const { body } = req;
  await savePokemon(body);
  res.json(body);
});

router.delete("/pokemon/:id", async (req, res) => {
  const { id } = req.params;
  const name = await deletePokemonById(id);
  res.send(`You have deleted pokemon ${name}`);
});

router.put("/pokemon/:id", async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  const result = await replacePokemon(body, id);
  res.send(`You have replaced ${result} to ${updateName}`);
});

router.patch("/pokemon/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  await patchPokemon(body, id);
  res.send({
    sucess: true,
    message: `pokemon with id ${id} has been patched`
  });
});

module.exports = router;
