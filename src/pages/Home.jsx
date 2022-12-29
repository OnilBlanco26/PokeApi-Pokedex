import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTrainerGlobal } from "../store/slices/trainer.slice";
import "../components/Pokedex/styles/home.css";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setTrainerGlobal(e.target.name.value.trim()));
    e.target.name.value = "";
    navigate("/pokedex");
  };

  return (
    <div className="home__container">
      <img className="home__img" src="/Home/pokedexTitle.png" alt="" />
      <div className="home__container--info">
        <img className="home__img--oak" src="/Home/profOak.png" alt="" />
        <div className="home__wrapper">
          <ul className="dynamic-txts">
            <li>
              <span>Welcome to the world of Pokemon!......</span>
            </li>
            <li>
              <span>My name is Professor Oak!.....</span>
            </li>
            <li>
              <span>I will guide you in your first steps.....</span>
            </li>
            <li>
              <span>Give me your name to start.......</span>
            </li>
            <li>
              <span></span>
            </li>
          </ul>
        </div>
          <form className="home__form" onSubmit={handleSubmit} action="">
            <input className="home__input" id="name" type="text" placeholder="Your name here..."/>
            <button className="home__btn" type="submit">
              Start
            </button>
          </form>
        <div className="static-txt">Professor Oak</div>
      </div>
      <div className="pokeball__container">
        <img className="image__pokeball" src="/Home/pokeball.gif" alt="" />
        <img className="image__pokeball" src="/Home/pokeball.gif" alt="" />
        <img className="image__pokeball" src="/Home/pokeball.gif" alt="" />
      </div>
      <div className="pokemon__container">
        <img className="image__pokemon" src="/Home/charmander.gif" alt="" />
        <img className="image__pokemon" src="/Home/bulbasur.gif" alt="" />
        <img className="image__pokemon" src="/Home/squirtle.gif" alt="" />
      </div>
    </div>
  );
};

export default Home;

// Welcome to the world of Pokemon! My name is Professor Oak! Give me your name to start
