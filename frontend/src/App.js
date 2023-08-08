import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Nav_bar";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import SearchPage from "./pages/Search";
import Results from "./pages/Results";
import { GlobalProvider } from "./contexts/GlobalContext"; 
import { UserProvider } from "./contexts/UserContext";
import SavedRecipes from "./pages/SavedRecipes";
import TestSavedRecipes from "./pages/TestSavedRecipes";


function App() {
  return (
    <UserProvider>
      <GlobalProvider>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/results" element={<Results />} />
              <Route path="/savedrecipes" element={<SavedRecipes />} />
              <Route path="/testSavedRecipes" element={<TestSavedRecipes />} />
            </Routes>
          </div>
        </Router>
      </GlobalProvider>
    </UserProvider>
  );
}

export default App;
