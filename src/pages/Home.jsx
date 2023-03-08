import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTrainerGlobal } from "../store/slices/trainer.slice";
import "../components/Pokedex/styles/home.css";
import BattleVideo from "../components/BattleVideo";
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
        <div className="container-watchTV">
          <img className="watchTV" src="../Home/watchTV.png" alt="" />
          <h2 className="watchTV-title">WATCH NOW</h2>
        </div>
        <div className="live__container">
          <div className="live1">
            <div className="text-container">
              <div className="circle"></div>
              <h3 className="text-live">LIVE</h3>
            </div>
            <img className="live1-img" src="../Home/Leon.gif" alt="" />
          </div>
          <div className="live2">
            <img className="live2-img" src="../Home/Profesora.gif" alt="" />
          </div>
          <div className="imgsPoke">
            <img
              id="pokeball"
              onClick={clickToActive}
              className="live-pokeball"
              src="../Home/pokeball.png"
              alt=""
            />
            <img
              className="poke-screen"
              src="../Home/pokeball-open.png"
              alt=""
            />

            <div className="pokemon-random">
              <img
                src={pokemon?.sprites.other["official-artwork"].front_default}
                alt=""
              />
            </div>
            <div className="form__container">
              <form className="home__form" onSubmit={handleSubmit} action="">
                <input
                  className="home__input"
                  id="name"
                  type="text"
                  placeholder="Your name here..."
                />
                <button className="home__btn" type="submit">
                  Start
                </button>
              </form>
            </div>
          </div>

          <div className="live3">
            <BattleVideo />
            <h3 className="battle-title">POKEMON BATTLE</h3>
          </div>
          <div className="live4">
            <img className="pokedex-img" src="../Home/pokedex.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

// Welcome to the world of Pokemon! My name is Professor Oak! Give me your name to start
