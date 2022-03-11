import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelfareDetail from './pages/WelfareDetail';
import NavBar from './components/Navbar.js';
import Main from './pages/Main.jsx';
import Auth from './pages/OAuth.jsx';
import Qna from './pages/Qna.jsx';
import QnaCreate from './pages/QnaCreate.jsx';
import Search from "./pages/Search";



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
      <Routes>
        <Route path="/Qna" element={<Qna />} />
      </Routes>
      <Routes>
        <Route path="/search" element={<Search />} />
      </Routes>
      <Routes>
        <Route path="/QnaCreate" element={<QnaCreate/>} />
      </Routes>
    </div>
  );
}

export default App;
