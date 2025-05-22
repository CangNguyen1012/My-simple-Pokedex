// pokedex/PokemonDetail.js
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./PokemonDetail.css";

const PokemonDetail = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        const data = await response.json();
        setPokemon(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokemon details: ", error);
        setLoading(false);
      }
    };
    fetchPokemonDetails();
  }, [name]);

  if (loading) return <p>Loading...</p>;
  if (!pokemon) return <p>Pokemon not found.</p>;

  const {
    id,
    name: pokemonName,
    height,
    weight,
    base_experience,
    abilities,
    types,
    stats,
    moves,
    held_items,
    sprites,
  } = pokemon;

  const allSprites = Object.entries(sprites)
    .filter(([_, value]) => typeof value === "string" && value)
    .map(([key, url]) => ({ label: key.replace(/_/g, " "), url }));

  return (
    <div className="pokemon-detail">
      <Link to="/" className="back-link">
        ⬅ Back to Home
      </Link>
      <h1>
        {pokemonName[0].toUpperCase() + pokemonName.slice(1)} (#{id})
      </h1>
      <img
        src={sprites.front_default}
        alt={pokemonName}
        className="main-sprite"
      />
      <p>
        <strong>Height: </strong> {height / 10} m
      </p>
      <p>
        <strong>Weight:</strong> {weight / 10} kg
      </p>
      <p>
        <strong>Base Expreience:</strong> {base_experience}
      </p>
      <h3>Types</h3>
      <ul>
        {types.map(({ type }, i) => (
          <li key={i}>{type.name}</li>
        ))}
      </ul>
      <h3>Abilities</h3>
      <ul>
        {abilities.map(({ ability }, i) => (
          <li key={i}>{ability.name}</li>
        ))}
      </ul>
      <h3>Base Stats</h3>
      <ul>
        {stats.map(({ stat, base_stat }, i) => (
          <li key={i}>
            {stat.name}: {base_stat}
          </li>
        ))}
      </ul>
      <h3>Sprites</h3>
      <div className="sprites-grid">
        {allSprites.map(({ label, url }, i) => (
          <div key={i} className="sprite-item">
            <img src={url} alt={label} />
            <small>{label}</small>
          </div>
        ))}
      </div>
      <h3>Moves</h3>
      <ul className="moves-list">
        {moves.slice(0, 10).map(({ move }, i) => (
          <li key={i}>{move.name}</li>
        ))}
      </ul>
      {moves.length > 10 && <p>And {moves.length - 10} more moves...</p>}

      {held_items.length > 0 && (
        <>
          <h3>Held Items</h3>
          <ul>
            {held_items.map(({ item }, i) => (
              <li key={i}>{item.name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default PokemonDetail;
