import React, { useState, useEffect } from "react";
import styled from "styled-components";
import image from "../components/assets/searchbutton2.png";
import logo from "../components/assets/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import backButtonImage from "../components/assets/back-button.png";
import RecipeCardComponent from "../components/RecipeCard";

const SearchPage = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background: white;
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

const Navigation = styled.div`
  display: flex;
  gap: 20px;
`;

const NavItem = styled.div`
  color: white;
  font-size: 25px;
  font-family: "Poppins";
  font-weight: 300;
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
  height: 100%;
  background: white;
`;

const Slogan = styled.h1`
  color: black;
  font-size: 40px;
  position: relative;
  text-align: center;
  font-weight: 600;
  font-family: "Josefin Slab";
  margin-bottom: 580px;
  margin-left: 40px;
  wordwrap: "break-word";
`;

const SearchContainer = styled.div`
  position: relative;
  bottom: 80vh;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 1254px; // Adjust this as needed
  display: flex;
  flex-direction: column;
  align-items: center;
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

const SearchInput = styled.input`
  width: 100%;
  max-width: 700px;
  height: 55px;
  background: white;
  border: 0.5px solid black;
  padding: 0 10px;
  box-sizing: border-box;
  font-size: 20px;
  font-family: "Poppins";
  font-style: italic;
  font-weight: 250;
  color: rgba(0, 0, 0, 0.33);
`;

const SearchButton = styled.img`
  content: url(${image});
  width: 110px;
  height: 110px;
  position: relative;
  margin-top: -82px;
  margin-left: 800px;
`;

const Results = () => {
  const navigate = useNavigate();
  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState([]); //initialize recipe with an empty array

   useEffect(() => {
     const storedRecipes = JSON.parse(localStorage.getItem("recipeData"));
     if (storedRecipes) {
       setRecipes(storedRecipes);
     }
     const storedIngredient = localStorage.getItem("ingredient");
     if (storedIngredient) {
       setIngredient(storedIngredient);
       fetchRecipes(storedIngredient);
     }
   }, []);

  const fetchRecipes = async (ingredient) => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient}&number=20&apiKey=72997388098246b19ba31673ac715fb9`
      );
      setRecipes(response.data);
      localStorage.setItem("recipeData", JSON.stringify(response.data.results));
    } catch (error) {
      console.error("Something went wrong!", error);
    }
  };

  const handleInputChange = (event) => {
    setIngredient(event.target.value);
  };

  const handleNewSearch = () => {
    fetchRecipes(ingredient);
    navigate("/results");
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
          <NavItem
            style={{
              left: 360,
              top: 14,
              position: "absolute",
              color: "white",
              fontSize: 25,
              fontFamily: "Poppins",
              fontWeight: "300",
              wordWrap: "break-word",
            }}
          >
            Profile
          </NavItem>
          <NavItem
            style={{
              left: 478,
              top: 13,
              position: "absolute",
              color: "white",
              fontSize: 25,
              fontFamily: "Poppins",
              fontWeight: "300",
              wordWrap: "break-word",
            }}
          >
            Saved
          </NavItem>
          <LogoutButton onClick={handleLogoutClick}>Logout</LogoutButton>
          <BackButton onClick={(backButtonImage) => navigate(-1)} />
        </Navigation>
      </Header>
      <SloganContainer>
        <Slogan>Unlock Flavorful Creations from Your Pantry!</Slogan>
      </SloganContainer>
      <SearchContainer>
        <SearchInput
          onChange={handleInputChange}
          placeholder="Enter your available ingredient(s) here..."
          style={{
            left: 10,
            top: 0,
            position: "relative",
            color: "rgba(0, 0, 0, 0.33)",
            fontSize: 20,
            fontFamily: "Poppins",
            fontStyle: "italic",
            fontWeight: "250",
            wordWrap: "break-word",
          }}
        />
        <SearchButton onClick={handleNewSearch} />
        <ResultsContainer>
          {recipes &&
            recipes.map((recipe) => (
              <RecipeCardContainer key={recipe.id}>
                <RecipeCardComponent recipe={recipe} />
              </RecipeCardContainer>
            ))}
        </ResultsContainer>
      </SearchContainer>
    </SearchPage>
  );
};

export default Results;
