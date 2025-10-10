import React, { useState, useEffect } from 'react';
import '/css/App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CircularProgress from '@mui/material/CircularProgress';
import { useStore } from '../store/main';
import axios from 'axios';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ListPage() {

  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
      console.log(response.data);
      setPokemons(response.data.results);
      setFilteredPokemons(response.data.results);
    };
    fetchData();
  },[])

  const findPokemon = (term) => {
    setSearchTerm(term);
    const filteredByName = pokemons.filter(p => p.name.toLowerCase().includes(term.toLowerCase()));
    const filteredById = pokemons.filter(p => p.url.split('/').filter(Boolean).pop() === term);
    const result = filteredByName.length > 0 ? filteredByName : filteredById;
    setFilteredPokemons(result);
    setPage(0);
  }

  return (
    <div className='app-main-background'>
      <h1>List Page</h1>
      <input type='text' placeholder='SEARCH' value={searchTerm} onChange={e => findPokemon(e.target.value)} />
      <div style={{ margin: '20px 0' }}>
        <Button variant="contained" disabled={page === 0} onClick={() => setPage(v => v - 5)}>PREVIOUS</Button>
        <Button variant="contained" disabled={page + 5 >= filteredPokemons.length} onClick={() => setPage(v => v + 5)}>NEXT</Button>
      </div>
      <div>
        {filteredPokemons.slice(page, page + 5).map(pokemon => {
          return (
            <Link key={pokemon.name} to={`/details-page/${pokemon.name}`}>
              <Box component="section" sx={{ p: 2, border: '1px solid grey', marginBottom: '10px' }}>
                {pokemon.name}
              </Box>
            </Link>
          )
        })}
      </div>
    </div>
  );
}
