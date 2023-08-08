import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import SavedRecipeCardComponent from "../components/SavedRecipeCard";
import backButtonImage from "../components/assets/back-button.png";
import logo from "../components/assets/logo.png";

const SearchPage = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background: white;
`;

const Logo = styled.img`
  width: 50px;
  height: 58px;
`;

const Title = styled.div`
  color: white;
  font-size: 30px;
  font-family: "Caesar Dressing";
  font-weight: 400;
  width: 90%;
`;

const Header = styled.div`
  width: 100%;
  height: 66px;
  position: absolute;
  top: 0;
  border-bottom: 2px solid white;
  background: #090808;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
`;

const Navigation = styled.div`
  display: flex;
  gap: 20px;
`;

const NavItem = styled.div`
  position: absolute;
  color: white;
  font-size: 25px;
  font-family: "Poppins";
  font-weight: 300;
  word-wrap: break-word;
  transition: all 0.3s ease;

  &:hover {
    color: #ffd700;
    cursor: pointer;
    transform: scale(1.1);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  }
`;

const BackButton = styled.img`
  content: url(${backButtonImage});
  position: absolute;
  left: 3%;
  top: 110%;
  width: 35px;
  height: auto;
`;

const LogoutButton = styled.div`
  display: inline-flex;
  padding: 10px 15px;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.1875rem;
  border: 1px solid #fff;
  background: #000;
  color: white;
  font-size: 20px;
  font-family: "Georama";
  font-weight: 400;
  text-align: center;
  transition: background 0.3s ease;

  &:hover {
    background: #a19f9f;
    color: #000000;
  }
`;

const SloganContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 20%;
  background: white;
`;

const Slogan = styled.h1`
  color: black;
  font-size: 40px;
  position: relative;
  text-align: center;
  font-weight: 600;
  font-family: "Josefin Slab";
  margin-top: 100px;
  margin-left: 40px;
  wordwrap: "break-word";
`;


const ResultsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: -15px;
  width: 100%;
  background: white;
`;

const RecipeCardContainer = styled.div`
  flex: 0 0 calc(33.33% - 20px);
  margin: 10px;
`;

const TestSavedRecipes = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const { userId } = useContext(UserContext);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.get(
        `http://localhost:8000/api/users/${userId}/get_saved_recipes/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);
      setRecipes(response.data);
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
    }
  };

  const handleLogoutClick = async (event) => {
    // remove user data from local storage
    localStorage.removeItem("userData");

    window.location.href = "/";

    console.log("User logged out");
  };

  return (
    <SearchPage>
      <Header>
        <Logo img src={logo} alt="Logo" />
        <Title>Kitchen Wizard</Title>
        <Navigation>
          <NavItem style={{ left: 360, top: 14 }}>Profile</NavItem>
          <LogoutButton onClick={handleLogoutClick}>Logout</LogoutButton>
          <BackButton onClick={(backButtonImage) => navigate(-1)} />
        </Navigation>
      </Header>
      <SloganContainer>
        <Slogan>Unlock Flavorful Creations from Your Pantry!</Slogan>
      </SloganContainer>
      <ResultsContainer>
        {recipes &&
          recipes.map((recipe) => (
            <RecipeCardContainer key={recipe.id}>
              <SavedRecipeCardComponent recipe={recipe} />
            </RecipeCardContainer>
          ))}
      </ResultsContainer>
    </SearchPage>
  );
};

export default TestSavedRecipes;

