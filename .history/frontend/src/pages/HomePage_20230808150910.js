import React from "react";
import styled from "styled-components";
import Navbar from "../components/Nav_bar";
import Button from "../components/Button";
import image from "../components/assets/homepage.png";
import { useNavigate } from "react-router-dom"; 

const HomePageTitle = styled.h1`
  position: absolute;
  width: 100vw;
  height: 100vh;
  left: 47%;
  top: 79px;
  font-family: "Jost";
  font-style: normal;
  font-weight: 300;
  font-size: 30px;
  line-height: 43px;
  color: #000000;
`;

const HomePageBody = styled.p`
  position: absolute;
  width: 788px;
  height: 125px;
  left: 30%;
  top: 55%;
  font-family: "Josefin Slab";
  font-style: normal;
  font-weight: 650;
  font-size: 25px;
  line-height: 25px;
  text-align: center;
  color: #000000;
`;

const HomePageBackground = styled.div`
  background-image: url(${image});
  background-position: 65%;
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
  position: relative;
`;

const HomePage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };
  return (
    <HomePageBackground>
      <Navbar />
      <HomePageTitle>Home Page</HomePageTitle>
      <HomePageBody>
        Find recipes based on your available ingredients, simplify meal
        planning, and unleash your kitchen adventures. Explore endless culinary
        possibilities, save favorites, and enjoy the joy of cooking with what
        you have. Elevate your meals with Kitchen Wizard!
      </HomePageBody>
      <Button onClick={handleLoginClick}>Login</Button>
    </HomePageBackground>
  );
};

export default HomePage;
