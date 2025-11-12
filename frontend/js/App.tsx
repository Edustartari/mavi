import React from 'react';
import '/css/App.css';
import {
    Routes,
    Route,
    Link
} from "react-router-dom";
import Home from './pages/home';
import NewPage from './pages/newPage';

import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

const App: React.FC = () => {
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

export default App;
