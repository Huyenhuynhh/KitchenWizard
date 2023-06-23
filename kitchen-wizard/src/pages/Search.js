import React from "react";
import styled from "styled-components";
import Navbar from "../components/Nav_bar";
import image from "../components/assets/searchbutton.png";
import { useNavigate } from "react-router-dom";

const SearchPageContainer = styled.div`
  width: 1512px;
  height: 982px;
  position: relative;
  background: white;
`;

const ProfileButton = styled.div`
  position: relative;
  width: 250px;
  top: 14px;
  left: 370px;
  color: white;
  font-size: 25px;
  font-family: "Poppins";
  font-weight: 300;
`;

const SavedButton = styled.div`
  position: absolute;
  width: 250px;
  top: 14px;
  left: 478px;
  color: white;
  font-size: 25px;
  font-family: "Poppins";
  font-weight: 300;
`;

const LogoutButton = styled.div`
  padding: 10px 20px;
  position: absolute;
  top: 7px;
  left: 1384px;
  background: black;
  border-radius: 3px;
  border: 0.5px white solid;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  transition: background 0.3s ease;

  &:hover {
    background: #a19f9f;
    color: #000000;
  }
`;

const LogoutText = styled.div`
  color: white;
  font-size: 20px;
  font-family: "Georama";
  font-weight: 400;
  text-align: center;
`;

const Ellipse = styled.img`
  width: 250px;
  height: 250px;
  position: absolute;
  top: 608px;
  background: linear-gradient(0deg, #d9d9d9 0%, #d9d9d9 100%);
  border-radius: 9999px;
`;

const Ellipse1 = styled(Ellipse)`
  left: 253px;
`;

const Ellipse2 = styled(Ellipse)`
  left: 654px;
`;

const Ellipse3 = styled(Ellipse)`
  left: 1055px;
`;

const SearchBarContainer = styled.div`
  width: 916.75px;
  height: 110px;
  position: relative;
`;

const SearchBar = styled.div`
  width: 53.875rem;
  height: 3.4375rem;
  flex-shrink: 0;
  position: relative;
  top: 455px;
  left: 300.8px;
  background: white;
  border: 0.5px black solid;
`;

const SearchInput = styled.input`
  border: none;
  width: 350px;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.33);
  font-family: "Poppins";
  font-style: italic;
  font-weight: 250;
  &:focus {
    outline: none;
  }
`;

const SearchPrompt = styled.div`
  position: relative;
  top: 350px;
  left: 450px;
  color: black;
  font-size: 30px;
  font-family: "Josefin Slab";
  font-weight: 600;
  font-style: bold;
`;

const SearchPlaceholder = styled.div`
  position: absolute;
  top: 468px;
  left: 320px;
  color: rgba(0, 0, 0, 0.33);
  font-size: 20px;
  font-family: "Poppins";
  font-style: italic;
  font-weight: 250;
`;

const SearchButton = styled.img`
  content: url(${image});
  width: 40.33px;
  height: auto;
  position: relative;
  top: 363px;
  left: 1170px;
`;

const SearchPage = () => {
   const navigate = useNavigate();

   const handleLogoutClick = () => {
    navigate("/");
   }

   return (
    <SearchPageContainer>
        <Navbar />
        <ProfileButton>Profile</ProfileButton>
        <SavedButton>Saved</SavedButton>
        <LogoutButton onClick={handleLogoutClick}>
        <LogoutText>Log out</LogoutText>
        </LogoutButton>
        <Ellipse1 src="https://images.unsplash.com/photo-1565895405227-31cffbe0cf86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" />
        <Ellipse2 src="https://images.unsplash.com/photo-1564759224907-65b945ff0e84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80https://images.unsplash.com/photo-1524859880053-f595797051c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=8" />
        <Ellipse3 src="https://images.unsplash.com/photo-1461009463816-4edea93afd6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" />
        <SearchBarContainer>
        <SearchBar />
        <SearchPrompt>Unlock Flavorful Creations from Your Pantry!</SearchPrompt>
        <SearchPlaceholder>
            <SearchInput placeholder="Enter your available ingredient(s) here..." />
        </SearchPlaceholder>
        <SearchButton />
        </SearchBarContainer>
    </SearchPageContainer>
    );
   };

export default SearchPage;
