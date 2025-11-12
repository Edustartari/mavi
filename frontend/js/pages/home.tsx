import React from 'react';
import '/css/App.css';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useStore } from '../store/main';
import axios from 'axios';
import { Link } from "react-router-dom";

export default function Home(): JSX.Element {
  const updateValue = useStore((state: any) => state.updateValue);
  const currentState = useStore((state: any) => state.initialState);

  const fetchData = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    console.log(response.data);
    updateValue('key1', response.data.title);
  };

  return (
    <div className='app-main-background' onClick={() => updateValue('key1', 'value2')}>
      Test {currentState.key1}
      <Button variant="contained" onClick={fetchData}>Fetch Data</Button>
    </div>
  );
}
