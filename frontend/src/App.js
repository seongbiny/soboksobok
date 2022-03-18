import React from "react";
import { Routes, Route } from 'react-router-dom';
import Qna from './pages/Qna.jsx';

function App() {
  return (
  <div className="App">

    
    
    <Routes>
      <Route path="/Qna" element={<Qna/>} />
    </Routes>
    
    </div>



  );
}

export default App;
