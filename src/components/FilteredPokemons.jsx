import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Autosuggest from 'react-autosuggest';
import { useNavigate } from 'react-router-dom';

const FilteredPokemons = ({setPokemonInput}) => {
    const[data, setData]= useState([]);
    const[locations, setLocations]= useState([]);
    const[value, setValue]= useState("");

    const navigate = useNavigate();
    
    
    const onSuggestionsFetchRequested=({value})=>{
      setLocations(filtrarLocations(value));
    }
    
    const filtrarLocations=(value)=>{
      const inputValue=value.trim().toLowerCase();
    const inputLength=inputValue.length;
    
      var filtrado=data.filter((locat)=>{
        var textoCompleto=locat.name;
    
        if(textoCompleto.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(inputValue)){
          return locat;
        }
      });
    
      return inputLength===0 ? [] : filtrado;
    }
    
    const onSuggestionsClearRequested = () =>{
      setLocations([]);
      setValue('');
    }
    
    const getSuggestionValue=(suggestion)=>{
      return `${suggestion.name}`;
    }
    
    const renderSuggestion=(suggestion)=>(
      <>
      
      <div className='sugerencia' onClick={()=>selectLocations(suggestion.id)}>
        
        <ul className='suge__list'>
          <li className='suge__list-item'>{`${suggestion.name}`}</li>
         
        </ul>
      </div>
      {}
      </>
    
    );
    
    
    
    const selectLocations=(id)=>{
        setLocationInput(id);
        onSuggestionsClearRequested()
      }
    
    const onChange=(e, {newValue})=>{
      setValue(newValue);
    
    }
    
    const inputProps={
    id: 'inputSearch',
    className: 'inputSug',
    placeholder:"Search Pokemon...",
    value,
    onChange
    };
  
    const eventEnter=(e)=>{
    
      let locat = data.filter(p => p.name == e.target.value.trim());
      let locatA
      if(e.key == 'Enter') {
        
      
        locatA = locat[0].name; 
        console.log(`seC: ${locatA}`)
        setPokemonInput(locatA)
        navigate(`/pokedex/${locatA}`);
        
      } 
      // selectLocations(locatA)
    }
    


    // const handleClick = (e) => {
    //     var personajeActual = data.filter(p => p.name == e.target.value.trim());
    
      
    //   let personaje = personajeActual[0].id;
    //   setLocationInput(personaje)
    // }
    
    const obtenerData=()=>{
        const URL = `https://pokeapi.co/api/v2/pokemon?limit=2000`;
     
        axios.get(URL).then(response=>{
        
          setLocations(response.data.results);
          setData(response.data.results);
          console.log(response.data.results)
        })
      }
      
      useEffect(()=>{
      obtenerData();
      }, []);
    
    
    
    
      return (
        <>
        <Autosuggest 
          suggestions={locations}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          onSuggestionSelected={eventEnter}
 
         
         />
         
         </>
      )
}

export default FilteredPokemons