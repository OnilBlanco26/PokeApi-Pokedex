import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTrainerGlobal } from "../store/slices/trainer.slice";
import "../components/Pokedex/styles/home.css";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pokemonNames, setPokemonNames] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState("");

  const [pokemon, setPokemon] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setTrainerGlobal(e.target.name.value.trim()));
    e.target.name.value = "";
    navigate("/pokedex");
  };

  const handleItemClick = (name) => {
    console.log("Hola funciono");
    setSelectedPokemon(name);
  };

  useEffect(() => {
    const numbers = [
      Math.floor(Math.random() * 1200),
      Math.floor(Math.random() * 1200),
      Math.floor(Math.random() * 1200),
    ];
    axios
      .all([
        axios.get(`https://pokeapi.co/api/v2/pokemon/${numbers[0]}`),
        axios.get(`https://pokeapi.co/api/v2/pokemon/${numbers[1]}`),
        axios.get(`https://pokeapi.co/api/v2/pokemon/${numbers[2]}`),
      ])
      .then(
        axios.spread((res1, res2, res3) => {
          setPokemon(res1.data);
          const realPokemon = res1.data;
          const fakePokemon1 = res2.data;
          const fakePokemon2 = res3.data;
          const pokemonNames = [
            realPokemon.name,
            fakePokemon1.name,
            fakePokemon2.name,
          ];
          // Shuffle the array of names
          pokemonNames.sort(() => Math.random() - 0.5);
          setPokemonNames(pokemonNames);
        })
      )
      .catch((err) => console.log(err));
  }, []);

  const clickToActive = () => {
    const pokeball = document.querySelector(".pokeball");
    const pokeballContainer = document.querySelector(".pokeball__container");
    const pokeballOpen = document.querySelector(".pokeball-open");
    const random = document.querySelector(".pokemon-random");
    const audio = new Audio("../Home/openPokeballSound.mp3");
    const pokedex = document.querySelector(".pokedex");
    const listpoke = document.querySelector(".pokedex__container");
    const lista = document.querySelector(".pokedex-list");
    audio.loop = false;
    audio.volume = 0.2;

    console.log("me ejecute");
    pokeball.classList.add("pokeball-hidden");
    setTimeout(() => {
      pokeballContainer.classList.add("pokeball__container-hidden");
    }, 1000);
    setTimeout(() => {
      pokeballOpen.classList.add("pokeball-open-visible");
      audio.play();
    }, 3000);
    setTimeout(() => {
      random.classList.add("random-visible");
    }, 4000);
    setTimeout(() => {
      pokeballOpen.classList.remove("pokeball-open-visible");
      pokedex.classList.add("pokedex-visible");
      listpoke.classList.add("pokedex-visible");
    }, 6000);
    setTimeout(() => {
      lista.classList.add("pokedex-visible");
    }, 6000);

    audio.addEventListener(
      "ended",
      () => {
        audio.pause();
        audio.currentTime = 0;
      },
      false
    );

    console.log(pokemon);
  };

  return (
    <div className="home__container">
      <img className="poke-title" src="../Home/pokedexTitle.png" alt="" />
      <div className="pokeball__container">
        <h3 className="pokeball-text">Click To Open</h3>
        <img
          onClick={clickToActive}
          className="pokeball"
          src="../Home/pokeball.png"
          alt="Pokeball"
        />
      </div>
      <div className="pokeball-open__container">
        <img className="pokeball-open" src="../Home/pokeball-open.png" alt="" />
        <div className="pokemon-random">
          <div className="pokeQuiz__container">
            <img
              className="pokemon-logo"
              src="../Home/Pokemon-logo.png"
              alt=""
            />
            <div className="container__pokemon-img">

            <img
              className="pokemon-img"
              src={pokemon?.sprites.other["official-artwork"].front_default}
              alt=""
            />
            </div>
            <div className="pokemon-interrogacion">
              <img
                className="pokemon-interrogacion--img"
                src="../Home/interrogacion.png"
                alt=""
              />
            </div>
            <div className="pokeQuiz-input__container">
              <h3
                className={`textPista poke-card__section--name color-${pokemon?.types[0].type.name}`}
              >
                <span className="span-quiz">Pista:</span>{" "}
                <span
                  className={`spanType border-${pokemon?.types[0].type.name}`}
                >
                  {pokemon?.types[0].type.name}
                </span>
              </h3>
              <ul className="pokedex-list">
          {pokemonNames?.map((name) => (
            <li
              className={`list-item color-${pokemon?.types[0].type.name} ${
                name === selectedPokemon ? "selected" : ""
              }`}
              key={name}
              onClick={() => handleItemClick(name)}
            >
              {name}
            </li>
          ))}
        </ul>
              <div className="pokeQuiz-buttons">
                <button className="pokeQuiz-button">Adivinar</button>
                <button className="pokeQuiz-button">Saltar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="pokedex__container">
        <img className="pokedex" src="../Home/pokedex.png" alt="" />
      
    
      </div> */}
      
    </div>
  );
};

export default Home;
