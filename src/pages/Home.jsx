import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTrainerGlobal } from "../store/slices/trainer.slice";
import "../components/Pokedex/styles/home.css";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setTrainerGlobal(e.target.name.value.trim()));
    e.target.name.value = "";
    navigate("/pokedex");
  };

  useEffect(() => {
    const number = Math.floor(Math.random() * 1200);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${number}`)
      .then((res) => {
        setPokemon(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const clickToActive = () => {
    const pokeball = document.querySelector(".pokeball");
    const pokeballContainer = document.querySelector(".pokeball__container");
    const pokeballOpen = document.querySelector(".pokeball-open");
    const random = document.querySelector(".pokemon-random");
    const audio = new Audio("../Home/openPokeballSound.mp3");
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
        <img onClick={clickToActive} className="pokeball" src="../Home/pokeball.png" alt="Pokeball" />
      </div>
      <div className="pokeball-open__container">
        <img className="pokeball-open" src="../Home/pokeball-open.png" alt="" />
        {/* <div className="pokemon-random">
          <div className="pokeQuiz__container">
            <img
              className="pokemon-logo"
              src="../Home/Pokemon-logo.png"
              alt=""
            />
            <img
              className="pokemon-img"
              src={pokemon?.sprites.other["official-artwork"].front_default}
              alt=""
            />
            <div className="pokemon-interrogacion">
              <img
                className="pokemon-interrogacion--img"
                src="../Home/interrogacion.png"
                alt=""
              />
            </div>
            <div className="pokeQuiz-input__container">
              <input
                className="pokeQuiz-input"
                type="text"
                placeholder="Ingresar Nombre"
              />
              <div className="pokeQuiz-buttons">
                <button className="pokeQuiz-button">Adivinar</button>
                <button className="pokeQuiz-button">Saltar</button>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Home;
