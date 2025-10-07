import React, { useState, useEffect } from 'react';
import '/css/App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CircularProgress from '@mui/material/CircularProgress';
import { useStore } from './store/main';

export default function App() {
  const updateValue = useStore((state) => state.updateValue);
  const currentState = useStore((state) => state.initialState);

  return (
    <div className='app-main-background'>
      Test
    </div>
  );
}
