import React from "react";
import Login from "./Login";
import Main from "./Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Main" element={<Main />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
