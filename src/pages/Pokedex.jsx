import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FilteredPokemons from "../components/FilteredPokemons";
import Pagination from "../components/Pokedex/Pagination";
import PokeCard from "../components/Pokedex/PokeCard";
import "../components/Pokedex/styles/pokedex.css";



const Pokedex = () => {
  const { trainer } = useSelector((state) => state);

  const [pokemonInput, setPokemonInput] = useState();
  const [pokemons, setPokemons] = useState();
  const [type, setType] = useState();
  const [filter, setFilter] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    //axios
    if (filter !== "All") {
      axios
        .get(filter)
        .then((res) => {
          setPokemons(res.data.pokemon.map((e) => e.pokemon));
        })
        .catch((err) => console.log(err));
    } else {
      //Hacer la peticion a la api de todos los pokemones
      const URL = `https://pokeapi.co/api/v2/pokemon?limit=2000`;
      axios
        .get(URL)
        .then((res) => {
          setPokemons(res.data.results);
        })
        .catch((err) => console.log(err));
    }
  }, [filter]);

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/type`;
    axios
      .get(URL)
      .then((res) => {
        setType(res.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {

    if (pokemonInput) {
      const URL = `https://pokeapi.co/api/v2/pokemon/${pokemonInput}`;
      axios
        .get(URL)
        .then((res) => {
          setPokemons([res.data]);
        })
        .catch((err) => console.log(err));
    }
  }, [pokemonInput])

  const handleSubmit = () => {
    if(pokemonInput) {
      const input = document
      .getElementById("inputSearch")
      .value.trim()
      .toLowerCase();
    navigate(`/pokedex/${input}`);
    console.log(input)
    }
  };

  const handleChange = (e) => {
    setFilter(e.target.value);
    setPage(1);
  };

  //Logica de la paginacion
  const [page, setPage] = useState(1);
  const [pokePerPage, setPokePerPage] = useState(12);

  const initialPoke = (page - 1) * pokePerPage;
  const finalPoke = page * pokePerPage;
  const maxPage = pokemons && Math.ceil(pokemons.length / pokePerPage);

  return (
    <div className="header-container">
      <div className="header-back">
        <div className="header-back--red"></div>
        <div className="header-back--black"></div>
        <img className="header-back--img" src="../Home/pokedexTitle.png" alt="" />
      </div>
      <h2 className="header-title">
        {" "}
        <span className="header-title--span">Welcome {`${trainer}`}</span>, here
        you can find your favorite pokemon
      </h2>
      <div className="headerSearch-container">
        <form className="header-form" onSubmit={handleSubmit}>
      
        <FilteredPokemons     
          setPokemonInput = {setPokemonInput}
          />
          {/* <button className="form__btn">Search</button> */}
        </form>
        <select className="pokedex-select" onChange={handleChange} name="" id="">
          <option className="pokedex-option" value="All">All Pokemons</option>
          {type?.map((type) => (
            <option key={type.url} value={type.url}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
      <div className="pokedex">
        {pokemons?.slice(initialPoke, finalPoke).map((pokemon) => (
          <PokeCard key={pokemon.url} url={pokemon.url} />
        ))}
      </div>
      <Pagination page={page} maxPage={maxPage} setPage={setPage} />
    </div>
  );
};

export default Pokedex;
