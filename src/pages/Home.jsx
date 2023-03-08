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
    const pokeball = document.querySelector(".pokeball");
    const pokeballContainer = document.querySelector(".pokeball__container");
    const pokeballOpen = document.querySelector(".pokeball-open");
    // const random = document.querySelector(".pokemon-random");

    console.log('me ejecute')
    pokeball.classList.add("pokeball-hidden");
    setInterval(() => {
      pokeballContainer.classList.add("pokeball__container-hidden");
    }, 1000);
    setInterval(() => {
      pokeballOpen.classList.add("pokeball-open-visible");
    }, 3000);
    // setInterval(() => {
    //   pokeScreen.classList.add("poke-visible");
    // }, 1000);
    // setInterval(() => {
    //   form.classList.add("form-visible");
    // }, 4000);
  //   setInterval(() => {
  //     live4.classList.add("pokedex-visible");
  //   }, 10000);
  //   setInterval(() => {
  //     live3.classList.add("poke-hidden");
  //   }, 4000);
  //   setInterval(() => {
  //     random.classList.add("random-visible");
  //   }
  //   , 4000);
    console.log(pokemon)
   };

  return (
    <div className="home__container">
      <div className="home__container--info">
        <div className="live__container">
          <img className="poke-title" src="../Home/pokedexTitle.png" alt="" />
          <div className="pokeball__container">
            <h3 className="pokeball-text">Click To Open</h3>
            <img onClick={clickToActive} className="pokeball" src="../Home/pokeball.png" alt="" />
          </div>
          <div className="pokeball-open__container">
            <img className="pokeball-open" src="../Home/pokeball-open.png" alt="" />
            <div className="pokemon-random">
              <img src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

