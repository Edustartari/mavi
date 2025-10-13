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
import ListPage from './pages/listPage';
import ListPageV2 from './pages/listPageV2';
import ListPageV3 from './pages/listPageV3';
import DetailsPage from './pages/detailsPage';

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
        <Link to="/list-page">
          <MenuItem>List Page</MenuItem>
        </Link>
        <Link to="/list-page-v2">
          <MenuItem>List Page V2</MenuItem>
        </Link>
        <Link to="/list-page-v3">
          <MenuItem>List Page V3</MenuItem>
        </Link>
      </MenuList>
      <Routes>
          <Route path="/new-page/:slug" element={<NewPage />} />
          <Route path="/list-page" element={<ListPage />} />
          <Route path="/list-page-v2" element={<ListPageV2 />} />
          <Route path="/list-page-v3" element={<ListPageV3 />} />
          <Route path="/details-page/:slug" element={<DetailsPage />} />
          <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}
