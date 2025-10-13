import React, { useState, useEffect } from 'react';
import '/css/App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useStore } from '../store/main';
import axios from 'axios';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Snackbar } from '@mui/material';

/*
  ListPageV3
  - Fetch data using API (create a custom Hook)
  - Create logic with Infinite Scroll / Lazy Loading – Continuously load more Pokémon as the user scrolls.
  - Save info inside zustand store and display at home page
  - Create a responsive layout for mobile and desktop
  - Create a search bar that will try to find by name or id (Use debounce)
*/

// https://pokeapi.co/api/v2/pokemon?offset=0&limit=100

const useFetchPokemons = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const updateValue = useStore((state) => state.updateValue);

  const fetchMore = async (page = 0) => {
    setLoading(true);
    // Set a delay to simulate loading
    await new Promise(resolve => setTimeout(resolve, 1000));
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${page}&limit=20`);
      const newPokemons = response.data.results;
      setPokemons(prev => [...prev, ...newPokemons]);      
      updateValue('pokemonsList', [...pokemons, ...newPokemons]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMore(0);
  }, []);

  return { pokemons, loading, error, fetchMore };
}

export default function ListPageV3() {
  const [page, setPage] = useState(0);
  const [searchId, setSearchId] = useState('');
  const [specificPokemon, setSpecificPokemon] = useState({});
  const [loadingSpecificPokemon, setLoadingSpecificPokemon] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { pokemons, loading, error, fetchMore } = useFetchPokemons();
  const debounceTimeout = React.useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (loading) return;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const docHeight = document.documentElement.scrollHeight;
      if (scrollTop + windowHeight >= docHeight) { // If you want to trigger before bottom, put a value like: "docHeight - 20"
        setPage(prevPage => {
          const nextPage = prevPage + 20;
          fetchMore(nextPage);
          return nextPage;
        });
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, fetchMore]);

  const findSpecificPokemon = async (id) => {
    setSpecificPokemon({});
    if (!id) {
      return;
    }
    setLoadingSpecificPokemon(true);
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const found = response.data;
      if (found) {
        setSpecificPokemon(found);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setSpecificPokemon({});
        setSnackbarMessage('Pokemon not found');
        setSnackbarOpen(true);
      }
    } finally {
      setLoadingSpecificPokemon(false);
    }
  };

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    if (!searchId) {
      setSpecificPokemon({});
      setLoadingSpecificPokemon(false);
      return;
    }
    debounceTimeout.current = setTimeout(() => {
      findSpecificPokemon(searchId);
    }, 2000);
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [searchId]);

  return (
    <div className='app-main-background'>
      <h1>List Page V3</h1>
      <div>Search a specific Pokemon by ID:</div>
  <input placeholder='Pokemon ID:' value={searchId} onChange={(e) => setSearchId(e.target.value)} />
      {loadingSpecificPokemon && <CircularProgress />}
      {specificPokemon?.name &&
        <div>
          <Link key={specificPokemon.name} to={`/details-page/${specificPokemon.name}`}>
            <Box component="section" sx={{ p: 2, border: '1px solid grey', marginBottom: '10px' }}>
              {specificPokemon.name}
              <img src={specificPokemon.sprites?.front_default} alt={specificPokemon.name} />
            </Box>
          </Link>
        </div>
      }
      <hr />
      {error && <div>Error: {error.message}</div>}
      {pokemons.length > 0 &&
        <div>
          {pokemons.map(pokemon => (
            <Link key={pokemon.name} to={`/details-page/${pokemon.name}`}>
              <Box component="section" sx={{ p: 2, border: '1px solid grey', marginBottom: '10px' }}>
                {pokemon.name}
              </Box>
            </Link>
          ))}
        </div>
      }
      {loading && <CircularProgress />}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </div>
  );
}
