import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import logo from "../components/assets/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import backButtonImage from "../components/assets/back-button.png";
import RecipeCardComponent from "../components/RecipeCard";
import { UserContext } from "../contexts/UserContext";

const SearchPage = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background: white;
`;

const Header = styled.div`
  width: 100%;
  height: 80px;
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

const Logo = styled.img`
  margin-top: 18px;
  width: 50px;
  height: 58px;
`;

const Title = styled.div`
  margin-top: 20px;
  color: white;
  font-size: 30px;
  font-family: "Caesar Dressing";
  font-weight: 400;
  width: 90%;
`;

const Navigation = styled.div`
  display: flex;
  gap: 20px;
`;

const NavItem = styled.div`
  margin-top: 15px;
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
  margin-top: 15px;
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

const ResultsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: -15px;
  width: 100%;
`;

const RecipeCardContainer = styled.div`
  flex: 0 0 calc(33.33% - 20px);
  margin: 10px;
`;

const SavedRecipes = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]); //initialize recipe with an empty array
  const { userId } = useContext(UserContext); //get userId  

  useEffect (() => {
    fetchSavedRecipes();
  }, []);

  const fetchSavedRecipes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/users/${userId}/update_saved_recipes/`
      );
      setRecipes(response.data.saved_recipes);
    } catch (error) {
      console.error("Something went wrong!", error);
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
      <ResultsContainer>
        {recipes &&
          recipes.map((recipe) => (
            <RecipeCardContainer key={recipe.id}>
              <RecipeCardComponent recipe={recipe} />
            </RecipeCardContainer>
          ))}
      </ResultsContainer>
    </SearchPage>
  );
};

export default SavedRecipes;
