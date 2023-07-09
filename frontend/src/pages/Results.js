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
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
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
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/findByIngredients?query=${ingredient}&apiKey=72997388098246b19ba31673ac715fb9`
        );
        setRecipes(response.data.results);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    };
    fetchRecipes();
  }, [ingredient]); // fetch new data whenever input change

  const handleInputChange = (event) => {
    setIngredient(event.target.value);
  };

  const handleNewSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient}&number=2&apiKey=72997388098246b19ba31673ac715fb9`
      );
      setRecipes(response.data.results);
      console.log("Received result", response.data);
    } catch (error) {
      console.error("Somehting went wrong!");
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {recipes ? (
            recipes.map((recipe) => (
              <RecipeCardComponent key={recipe.id} recipe={recipe} />
            ))
          ) : (
            <div role="status">
              <svg
                aria-hidden="true"
                class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          )}
        </div>
      </SearchContainer>
    </SearchPage>
  );
};

export default Results;
