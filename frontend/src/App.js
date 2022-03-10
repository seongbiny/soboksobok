import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelfareDetail from "./pages/WelfareDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/welfare" element={<WelfareDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
