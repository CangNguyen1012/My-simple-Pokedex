import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pokedex/HomePage";
import PokemonDetail from "./pokedex/PokemonDetail";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pokemon/:name" element={<PokemonDetail />} />
    </Routes>
  );
};

export default App;
