import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Nav_bar";
import backButtonImage from "../components/assets/back-button.png";
import image from "../components/assets/background1.png";
import { UserContext } from "../contexts/UserContext";

const Button = styled.button`
  height: 56px;
  width: 130px;
  margin-left: 180px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 50px;
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
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #ffffffb2;
`;

const BackButton = styled.img`
  content: url(${backButtonImage});
  position: absolute;
  left: 3%;
  top: 10%;
  width: 35px;
  height: auto;
`;

const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.7);
  padding: 50px;
  border-radius: 4px;
  width: 80%;
  max-width: 600px;
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
  background-position: 100%;
  background-size: cover;
  height: 100vh;
  width: 100vw;
  position: relative;
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = useState(null);
  const { setUserId } = useContext(UserContext);


const handleLogin = async (event) => {
  event.preventDefault();
  const response = await fetch("http://127.0.0.1:8000/api/users/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });

  const data = await response.json();
  console.log(data);

  if (response.ok) {
    setUserId(data.userId);
    localStorage.setItem('userId', data.userId);
    localStorage.setItem('authToken', data.access);
    localStorage.setItem('refreshToken', data.refresh);
    navigate("/search");
  } else {
    setError(data);
  }
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
            <Input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Label>Password</Label>
            <Input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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
            {error && <p>{error}</p>}
            <Button type="submit">Login</Button>
          </form>
        </FormContainer>
      </LoginPageContainer>
    </LoginPageBackground>
  );
};

export default LoginPage;
