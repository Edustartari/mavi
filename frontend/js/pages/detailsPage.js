import React, { useState, useEffect } from 'react';
import '/css/App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CircularProgress from '@mui/material/CircularProgress';
import { useStore } from '../store/main';
import axios from 'axios';
import { Link, redirect  } from "react-router-dom";

export default function DetailsPage() {

  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    const currentPageUrl = window.location.href;
    const slug = currentPageUrl.substring(currentPageUrl.lastIndexOf('/') + 1);
    const fetchData = async () => {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${slug}`);
      setPokemon(response.data);
    };
    if(slug) {
      setTimeout(() => {
          fetchData();
      }, 1000);
    }
  },[])

  return (
    <div className='app-main-background'>
      <h1>Details Page</h1>
      {!pokemon?.name &&
        <CircularProgress />
      }
      {pokemon?.name &&
        <div>
          <img src={pokemon.sprites?.front_default} alt={pokemon.name} />
          <div>Name: {pokemon.name}</div>
          <div>Height: {pokemon.height}</div>
          <div>Weight: {pokemon.weight}</div>
          <div>Base Experience: {pokemon.base_experience}</div>
          <div>Types: {pokemon.types?.map(t => t.type.name).join(', ')}</div>
          <div>Abilities: {pokemon.abilities?.map(a => a.ability.name).join(', ')}</div>
        </div>
      }
    </div>
  );
}
