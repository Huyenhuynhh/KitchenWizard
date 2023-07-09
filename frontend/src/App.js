import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Nav_bar"; 
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import SearchPage from "./pages/Search"; 
import Results from "./pages/Results";


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
