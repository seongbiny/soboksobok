import React from "react";
import { Route, Routes } from "react-router-dom";
import WelfareDetail from "./pages/WelfareDetail";
import NavBar from "./components/Navbar.js";
import Main from "./pages/Main.jsx";
import Search from "./pages/Search";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
      <Routes>
        <Route path="/welfare" element={<WelfareDetail />} />
      </Routes>
      <Routes>
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
