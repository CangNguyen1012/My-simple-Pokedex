// pokedex/HomePage.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
        );
        const data = await response.json();
        const pokemonList = data.results.map((pokemon, index) => ({
          name: pokemon.name,
          id: index + 1,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            index + 1
          }.png`,
        }));
        setPokemons(pokemonList);
        setFilteredPokemons(pokemonList);
        localStorage.setItem("pokemons", JSON.stringify(pokemonList)); // Cache data
      } catch (error) {
        console.error("Error fetching Pokemon: ", error);
      }
    };

    const cachedPokemons = localStorage.getItem("pokemons");
    if (cachedPokemons) {
      const parsed = JSON.parse(cachedPokemons);
      setPokemons(parsed);
      setFilteredPokemons(parsed);
    } else {
      fetchPokemons();
    }
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(value)
    );
    setFilteredPokemons(filtered);
  };

  return (
    <div className="app">
      <h1>PokeDex: Pokemon Dex</h1>
      <input
        type="text"
        placeholder="Search Pokemon by name..."
        value={search}
        onChange={handleSearch}
        className="search-bar"
      />
      <div className="pokemon-grid">
        {filteredPokemons.map((pokemon) => (
          <Link
            to={`/pokemon/${pokemon.name}`}
            key={pokemon.id}
            className="pokemon-card"
          >
            <img src={pokemon.image} alt={pokemon.name} />
            <h3>{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</h3>
            <p>#{pokemon.id}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
