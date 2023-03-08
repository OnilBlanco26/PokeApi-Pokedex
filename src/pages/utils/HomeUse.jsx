import React from "react";

const HomeUse = () => {
  return (
    <div>
      <div className="pokeball__container">
        <h3 className="pokeball-text">Click To Open</h3>
        <img
          onClick={clickToActive}
          className="pokeball"
          src="../Home/pokeball.png"
          alt=""
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
        </div>
      </div>
      <div className="pokedex__container">
        {/* <img className="pokedex" src="../Home/pokedex.png" alt="" /> */}
      </div>
    </div>
  );
};

export default HomeUse;
