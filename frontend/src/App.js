import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelfareDetail from './pages/WelfareDetail';
import NavBar from './components/Navbar.js';
import Main from './pages/Main.jsx';
import Auth from './pages/OAuth.jsx';

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
      <Routes>
        <Route path="/oauth/kakao/callback" element={<Auth />} />
      </Routes>
      <Routes>
        <Route path="/welfare" element={<WelfareDetail />} />
      </Routes>
    </div>
  );
}

export default App;
