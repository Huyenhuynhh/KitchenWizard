import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import image from "../components/assets/searchbutton.png";
import logo from "../components/assets/logo.png";
import axios from "axios";

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
    cursor: pointer;
  }
`;

const SloganContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #090808;
`;

const Slogan = styled.h1`
  color: #ffffff;
  font-size: 80px;
  text-align: center;
  font-weight: 600;
  font-family: "Josefin Slab";
  margin-bottom: 380px;
  wordwrap: "break-word";
`;

const Ellipse1 = styled.img`
  width: 250px;
  height: 250px;
  position: absolute;
  bottom: 20vh;
  left: calc(25% - 155px);
  background: linear-gradient(0deg, #d9d9d9 0%, #d9d9d9 100%);
  border-radius: 9999px;
`;

const Ellipse2 = styled.img`
  width: 250px;
  height: 250px;
  position: absolute;
  bottom: 20vh;
  left: calc(52% - 125px);
  background: linear-gradient(0deg, #d9d9d9 0%, #d9d9d9 100%);
  border-radius: 9999px;
`;

const Ellipse3 = styled.img`
  width: 250px;
  height: 250px;
  position: absolute;
  bottom: 20vh;
  left: calc(75% - 55px);
  background: linear-gradient(0deg, #d9d9d9 0%, #d9d9d9 100%);
  border-radius: 9999px;
`;

const SearchContainer = styled.div`
  position: relative;
  top: -60vh;
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
  width: 45px;
  height: 50px;
  position: relative;
  margin-top: -40px;
  left: 54%;
  cursor: pointer;
`;
  
const Search = () => {
  const [ingredient, setIngredient] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setIngredient(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient}&number=20&apiKey=72997388098246b19ba31673ac715fb9`
      );
      localStorage.setItem("recipeData", JSON.stringify(response.data));
      localStorage.setItem("ingredient", ingredient);
      navigate("/results");
    } catch (error) {
      console.error("Something went wrong!");
    }
  };

  const handleSavedClick = async (event) => {
    navigate("/testSavedRecipes");
  }

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
          <NavItem onClick={handleSavedClick} style={{ left: 478, top: 13 }}>Saved</NavItem>
          <LogoutButton onClick={handleLogoutClick}>Logout</LogoutButton>
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
        <SearchButton onClick={handleSearch} />
      </SearchContainer>
      <Ellipse1 src="https://images.unsplash.com/photo-1565895405227-31cffbe0cf86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" />
      <Ellipse2 src="https://images.unsplash.com/photo-1564759224907-65b945ff0e84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80https://images.unsplash.com/photo-1524859880053-f595797051c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=8" />
      <Ellipse3 src="https://images.unsplash.com/photo-1461009463816-4edea93afd6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" />
    </SearchPage>
  );
};

export default Search;
