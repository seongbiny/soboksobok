import React from 'react';
import NavBar from './components/Navbar.js';
import Main from './pages/Main.jsx';

import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
