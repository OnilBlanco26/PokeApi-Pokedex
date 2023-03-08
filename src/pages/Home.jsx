import { useEffect, useState } from "react";
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
    const pokeball = document.getElementById("pokeball");
    const pokeScreen = document.querySelector(".poke-screen");
    const form = document.querySelector(".form__container");
    const live3 = document.querySelector(".live3");
    const live4 = document.querySelector(".live4");
    const random = document.querySelector(".pokemon-random");

    pokeball.classList.add("poke-hidden");
    setInterval(() => {
      pokeScreen.classList.add("poke-visible");
    }, 1000);
    // setInterval(() => {
    //   form.classList.add("form-visible");
    // }, 4000);
    setInterval(() => {
      live4.classList.add("pokedex-visible");
    }, 10000);
    setInterval(() => {
      live3.classList.add("poke-hidden");
    }, 4000);
    setInterval(() => {
      random.classList.add("random-visible");
    }
    , 4000);
    console.log(pokemon)
  };

  return (
    <div className="home__container">
      <div className="home__container--info">
        <div className="live__container">
          <img className="poke-title" src="../Home/pokedexTitle.png" alt="" />
          <div className="pokeball__container">
            <h3 className="pokeball-text">Click To Open</h3>
            <img className="pokeball" src="../Home/pokeball.png" alt="" />
          </div>
          <div className="pokeball-open__container">
            <img className="pokeball-open" src="../Home/pokeball-open.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

// Welcome to the world of Pokemon! My name is Professor Oak! Give me your name to start
