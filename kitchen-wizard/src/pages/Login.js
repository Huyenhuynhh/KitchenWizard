import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Nav_bar";
import backButtonImage from "../components/assets/back-button.png";
import image from "../components/assets/background1.png";

const Button = styled.button`
  height: 56px;
  width: 170px;
  left: 671px;
  top: 702px;
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10 px 50 px;
  gap: 10 px;
  background: #000;
  color: #fff;
  border-radius: 3px;
  border: none;
  cursor: pointer;
  font-family: "Georama", sans-serif;
  font-size: 30px;
  transition: background 0.3s ease;

  &:hover {
    background: #a19f9f;
    color: #000000;
  }
`;

const LoginPageContainer = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  height: 982px;
  width: 1512px;
  background-color: #ffffffb2;
`;

const BackButton = styled.img`
  content: url(${backButtonImage});
  position: absolute;
  left: 3%;
  top: 8%;
  width: 35px;
  height: auto
`;

const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.7);
  padding: 50px;
  border-radius: 4px;
  width: 517px;
  max-width: 60%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  width: 100%;
  height: 43px;
  border-radius: 2px;
  border: 1px solid #ddd;
  padding: 5px 10px;
  box-sizing: border-box;
  border: none;
`;

const Label = styled.label`
  font-family: "Josefin Slab";
  font-weight: 500;
  font-size: 25px;
  color: #000000;
`;


const LoginPageBackground = styled.div`
  background-image: url(${image});
  background-position: center;
  background-repeat: no-repeat;
  background-position: 70%;
  background-size: cover;
  height: 982px;
  width: 1512px;
  position: relative;
`;

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
  };
  const handleRegisterClick = () => {
        navigate("/register");
  };

 
  return (
    <LoginPageBackground>
      <LoginPageContainer>
        <Navbar />
        <BackButton onClick={(backButtonImage) => navigate(-1)} />
        <FormContainer>
          <form onSubmit={handleLogin}>
            <h2
              style={{
                fontFamily: "Georama",
                fontWeight: 400,
                fontSize: "40px",
                color: "#000000",
              }}
            >
              Log In
            </h2>
            <Label>Username</Label>
            <Input type="text" />
            <Label>Password</Label>
            <Input type="password" />
            <a
              href="/register"
              style={{
                fontFamily: "Poppins",
                fontWeight: 400,
                fontSize: "15px",
                textDecoration: "underline",
                color: "#000000",
              }}
            >
              Register
            </a>
            <Button onClick={handleRegisterClick}>Register</Button>
            <Button type="submit">Login</Button>
          </form>
        </FormContainer>
      </LoginPageContainer>
    </LoginPageBackground>
  );
};

export default LoginPage;
