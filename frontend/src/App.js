import React from "react";
import { Route, Routes } from "react-router-dom";
import WelfareDetail from "./pages/WelfareDetail";
import NavBar from "./components/Navbar.js";
import Footer from "./components/Footer.js";
import Main from "./pages/Main.jsx";
import Auth from "./pages/OAuth.jsx";
import Qna from "./pages/Qna.jsx";
import QnaCreate from "./pages/QnaCreate.jsx";
import QnaDetail from "./pages/QnaDetail.jsx";
import WelfareSearch from "./pages/WelfareSearch";
import WelfareRecommend from "./pages/WelfareRecommend";
import CustomFilter from "./pages/CustomFilter";
import Profile from './pages/Profile';
import './CSS/app.css';

function App() {
  return (
    <div id='wrapper'>
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
        <Route path="/search" element={<WelfareSearch />} />
      </Routes>
      <Routes>
        <Route path="/QnaCreate" element={<QnaCreate />} />
      </Routes>
      <Routes>
        <Route path="/QnaDetail" element={<QnaDetail />} />
      </Routes>
      <Routes>
        <Route path="/filter" element={<CustomFilter />} />
      </Routes>
      <Routes>
        <Route path="/recommend" element={<WelfareRecommend />} />
      </Routes>
      <Routes>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
