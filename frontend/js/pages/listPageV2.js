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

/*
  - Fetch data using API
  - Create logic to include search bar for the current data list (that was already fetched)
  - Create logic with pagination, so each time user clicks next or previous, I will fetch new data
  - Include button to sort by name
*/

const PaginationBox = (props) => {
  return (
    <div>
      <Button onClick={props.onClickPrevious} disabled={props.disablePrevious}>PREVIOUS</Button>
      <Button onClick={props.onClickNext} disabled={props.disableNext}>NEXT</Button>
    </div>
  )
}

export default function ListPageV2() {

  const [originalList, setOriginalList] = useState([]);
  const [currentList, setCurrentList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [next, setNext] = useState(true);
  const [sortType, setSortType] = useState('id');


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${page}&limit=50`);
      console.log(response.data);
      setCurrentList(response.data.results);
      setOriginalList(response.data.results);
      setNext(response.data.next !== null);
      setLoading(false);
      setSortType('id');
    }
    fetchData();
  },[page])

  const findPokemon = (term) => {
    setSearchTerm(term);
    const filteredByName = originalList.filter(p => p.name.toLowerCase().includes(term.toLowerCase()));
    const filteredById = originalList.filter(p => p.url.split('/').filter(Boolean).pop() === term);
    const result = filteredByName.length > 0 ? filteredByName : filteredById;
    setCurrentList(result);
  }

  const handleSort = (type) => {
    setSortType(type);
    let sortedList = [...currentList];
    if(type === 'ascending') {
      sortedList.sort((a, b) => a.name.localeCompare(b.name));
    } else if(type === 'descending') {
      sortedList.sort((a, b) => b.name.localeCompare(a.name));
    } else if(type === 'id') {
      sortedList.sort((a, b) => {
        const aId = parseInt(a.url.split('/').filter(Boolean).pop());
        const bId = parseInt(b.url.split('/').filter(Boolean).pop());
        return aId - bId;
      });
    }
    setCurrentList(sortedList);
  }

  return (
    <div className='app-main-background'>
        <h1>List Page V2</h1>
        <input placeholder='SEARCH' value={searchTerm} onChange={(e) => findPokemon(e.target.value)} />
        {loading && <CircularProgress />}
        {!loading && currentList.length === 0 && 
        <>
          <div>No pokemons found</div>
          <PaginationBox 
            onClickPrevious={() => {setPage(page - 50), setSearchTerm('')}} 
            onClickNext={() => {setPage(page + 50), setSearchTerm('')}} 
            disablePrevious={page === 0} 
            disableNext={!next}
          />
        </>
        }
        {!loading && currentList.length > 0 &&
          <div>
            <PaginationBox 
              onClickPrevious={() => {setPage(page - 50), setSearchTerm('')}} 
              onClickNext={() => {setPage(page + 50), setSearchTerm('')}} 
              disablePrevious={page === 0} 
              disableNext={!next}
            />
            <div style={{display: 'flex', alignItems: 'center', gap: '10px', margin: '10px 0'}}>
              <div>Sort by:</div>
              <Select
                value={sortType}
                onChange={(e) => handleSort(e.target.value)}
              >
                <MenuItem value='id'>By ID</MenuItem>
                <MenuItem value='ascending'>Ascending</MenuItem>
                <MenuItem value='descending'>Descending</MenuItem>
              </Select>
            </div>
            {currentList.map(pokemon => {
              return (
                <Link key={pokemon.name} to={`/details-page/${pokemon.name}`}>
                  <Box component="section" sx={{ p: 2, border: '1px solid grey', marginBottom: '10px' }}>
                    {pokemon.name}
                  </Box>
                </Link>
              )
            })}
          </div>
        }
    </div>
  );
}
