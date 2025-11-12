import React, { useState, useEffect } from 'react';
import '/css/App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CircularProgress from '@mui/material/CircularProgress';
import {
    Routes,
    Route,
    Link
} from "react-router-dom";
import Home from './pages/home';
import NewPage from './pages/newPage';

import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

export default function App() {
  return (
    <>
      <MenuList>
        <Link to="/">
          <MenuItem>Home</MenuItem>
        </Link>
        <Link to="/new-page/1">
          <MenuItem>New Page</MenuItem>
        </Link>
      </MenuList>
      <Routes>
          <Route path="/new-page/:slug" element={<NewPage />} />
          <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}
