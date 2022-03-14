import React from "react";
import { Route, Routes } from "react-router-dom";
import WelfareDetail from "./pages/WelfareDetail";
import NavBar from "./components/Navbar.js";
import Main from "./pages/Main.jsx";
import Auth from "./pages/OAuth.jsx";
import Qna from "./pages/Qna.jsx";
import QnaCreate from "./pages/QnaCreate.jsx";
import WelfareSearch from "./pages/WelfareSearch";
import WelfareRecommend from "./pages/WelfareRecommend";
import CustomFilter from './pages/CustomFilter';

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
        <Route path="/search" element={<WelfareSearch />} />
      </Routes>
      <Routes>
        <Route path="/QnaCreate" element={<QnaCreate />} />
      </Routes>
            <Routes>
        <Route path="/filter" element={<CustomFilter />} />
      </Routes>
      <Routes>
        <Route path="/recommend" element={<WelfareRecommend />} />
      </Routes>
    </div>
  );
}

export default App;
