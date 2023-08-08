import styled from "styled-components";

const Button = styled.button`
  color: #ffffff;
  font-family: "Georama";
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
  line-height: 36px;
  text-align: center;
  height: 100vh;
  width: 100vw;
  left: %;
  top: 45%;
  border-radius: 3px;
  padding: 10px 70px 10px 70px;
  background: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 70px;
  gap: 10px;
  border: none;

  position: relative;
  width: 150px;
  height: 60px;
  left: %;
  top: 70%;

  background: #000000;
  border-radius: 3px;

  &:hover {
    color: #000000;
    background: #a19f9f;
    left: 37%;
    top: 70%;
  }
`;

export default Button;


