import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Nav_bar";
import backButtonImage from "../components/assets/back-button.png";
import image from "../components/assets/background1.png";

const RegisterButton = styled.button`
  height: 56px;
  width: 170px;
  margin-left: 115px;
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

const RegisterPageContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  border: none
`;

const FormContainer = styled.div`
  display: flex;
  position: center;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 600px;
  height: 600px;
  background: rgba(255, 255, 255, 0.7);
  padding: 30px;
`;

const LabelInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin-bottom: 20px;
  border: none;
`;

const Label = styled.label`
  font-family: "Josefin Slab";
  font-weight: 500;
  font-size: 25px;
  color: #000000;
`;

const Input = styled.input`
  width: 415px;
  height: 43px;
  background: #ffffff;
  border: none;
  border: 1px solid #ddd;
`;

const BackButton = styled.img`
  content: url(${backButtonImage});
  position: absolute;
  left: 3%;
  top: 8%;
  width: 35px;
  height: auto;
`;

const RegisterPageBackground = styled.div`
  background-image: url(${image});
  background-position: center;
  background-repeat: no-repeat;
  background-position: 70%;
  background-size: cover;
  height: 100vh;
  width: 100vw;
  position: relative;
`;

const RegisterPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleRegisterClick = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword){
      setError("Passwords don't match");
      return;
    }

    const response = await fetch("http://localhost:8000/accounts/accounts/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
    });

    const data = await response.json();

    if (data.response) {
      // successfully registered
      navigate("/login");
    } else {
      setError(data.error);
    }
  };

  return (
    <RegisterPageBackground>
      <RegisterPageContainer>
        <Navbar />
        <BackButton onClick={(backButtonImage) => navigate(-1)} />
        <FormContainer>
          <form onSubmit={handleRegisterClick}>
            <h2
              style={{
                fontFamily: "Georama",
                fontWeight: 400,
                fontSize: "40px",
                color: "#000000",
              }}
            >
              Register
            </h2>
            <LabelInputWrapper>
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </LabelInputWrapper>

            <LabelInputWrapper>
              <Label>Username</Label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </LabelInputWrapper>

            <LabelInputWrapper>
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </LabelInputWrapper>

            <LabelInputWrapper>
              <Label>Confirm password</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </LabelInputWrapper>

            {error && <p>{error}</p>}

            <RegisterButton type="submit">Register</RegisterButton>
          </form>
        </FormContainer>
      </RegisterPageContainer>
    </RegisterPageBackground>
  );
};

export default RegisterPage;
