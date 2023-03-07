import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../components/Pokedex/styles/pokedexInfo.css";
import Stats from "../components/StatBar";



const PokedexInfo = () => {
  const { id } = useParams();

  const [pokemon, setPokemon] = useState();

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
    axios
      .get(URL)
      .then((res) => {
        setPokemon(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="pokeInfo__container">
      <div className="header-back">
        <div className="header-back--red"></div>
        <div className="header-back--black"></div>
        <img
          className="header-back--img"
          src="../Home/pokedexTitle.png"
          alt=""
        />
      </div>
      <div className="pokeInfo__stats">
        <div
          className={`pokeInfo__stats--color bg-${pokemon?.types[0].type.name}`}
        >
          <img
            className="pokeInfo__img"
            src={pokemon?.sprites.other["official-artwork"].front_default}
            alt=""
          />
          <img
            className="pokeInfo__img"
            src={pokemon?.sprites.other["official-artwork"].front_shiny}
            alt=""
          />
          <img
            className="pokeInfo__img"
            src={pokemon?.sprites.versions['generation-v']['black-white'].animated.front_default}
            alt=""
          />
          <img
            className="pokeInfo__img"
            src={pokemon?.sprites.back_shiny}
            alt=""
          />
        </div>
        <div className="pokemonInfo__container">
          <h3
            className={`pokemon__number color-${pokemon?.types[0].type.name}`}
          >
            {" "}
            #{pokemon?.id}{" "}
          </h3>
          <div className="pokemonName__container">
            <div className="poke__line"></div>
            <h2
              className={`pokemon__name color-${pokemon?.types[0].type.name}`}
            >
              {" "}
              {pokemon?.name}{" "}
            </h2>
            <div className="poke__line"></div>
          </div>
          <div className="pokemonWH__container">
            <h3 className="pokemonWH">
              Weight<span className="pokemonWH__span">{pokemon?.weight}</span>
            </h3>
            <h3 className="pokemonWH">
              Height<span className="pokemonWH__span">{pokemon?.height}</span>
            </h3>
          </div>
          <div className="pokemonTypes__container">
            <div className="pokemonT__container">
              <h3 className="pokemonT__title">Type</h3>
              <ul className="pokemonT__list">
                {pokemon?.types.map((type, index) => (
                  <li
                    className={`pokemonT__item bg-${pokemon?.types[index].type.name}`}
                    key={index}
                  >
                    {type.type.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pokemonH__container">
              <h3 className="pokemonH__title">Abilities</h3>
              <ul className="pokemonH__list">
                {pokemon?.abilities.map((ability, index) => (
                  <li className="pokemonH__item" key={index}>
                    {ability.ability.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pokeStatsInfo__container">
            <div className="pokeStatsHeader">
              <h3 className="pokeStatsHeader__title">Stats</h3>
              <div className="pokeStatsHeader__line"></div>
              <img
                className="pokeStatsHeader__img"
                src="../Home/pokeball.png"
                alt=""
              />
            </div>
            {/* stats */}
           <Stats stats={pokemon?.stats} />
          </div>
        </div>
      </div>

      <div className="pokeMovements__container">
        <div className="pokeMovements__header">
          <h3 className="pokeMovements__title">Movements</h3>
          <div className="pokeMovements__line"></div>
          <img
            className="pokeMovements__img"
            src="../Home/pokeball.png"
            alt=""
          />
          </div>
          <div className="pokeMovements__list">
            {pokemon?.moves.map((move, index) => (
              <div className={`pokeMovements__item bg-${pokemon?.types[0].type.name}`} key={index}>
                {move.move.name}
                </div>
            ))}
            </div>
      </div>
    </div>
  );
};

export default PokedexInfo;
