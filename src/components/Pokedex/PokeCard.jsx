import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/pokeCard.css'

const PokeCard = ({url}) => {

    const [pokemon, setPokemon] = useState()

    useEffect(() => {
        axios.get(url)
        .then(res => {
            setPokemon(res.data)
        })
        .catch(err => console.log(err))
    }, [])

   const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/pokedex/${pokemon?.id}`)
    }

    console.log(pokemon)

  return (
    <article className={`poke-card border-${pokemon?.types[0].type.name}`} onClick={handleClick}>
        <header className={`poke-card__header bg-${pokemon?.types[0].type.name}`}>
            <img className='poke-card__img' src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
        </header>
        <section className='poke-card__section'>
            <h3 className={`poke-card__section--name color-${pokemon?.types[0].type.name}`}>{pokemon?.name}</h3>
            <ul className='poke-card__section--list'>
                {
                    pokemon?.types.map((type, index) => (
                        <li className='poke-card__section--item' key={index}>{type.type.name}</li>

                    ))
                }
            </ul>
        </section>
        <footer className='poke-card__footer'>
            <ul className='poke-card__footer--list'>
              {
                pokemon?.stats.map((stat, index) => (
                    <li className='poke-card__footer--item' key={index}>
                        <span className='poke-card__footer--span span1'>{stat.stat.name}</span>
                        <span className={`poke-card__footer--span span2 color-${pokemon?.types[0].type.name}`}>{stat.base_stat}</span>
                    </li>
                ))
              }
            </ul>
        </footer>
    </article>
  )
}

export default PokeCard