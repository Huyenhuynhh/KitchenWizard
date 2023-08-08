import styled from "styled-components";

const Button = styled.button`
  color: red;
  font-family: "Georama";
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
  line-height: 36px;
  text-align: center;
  height: 100vh;
  width: 100vw;
  left: 45%;
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

  position: absolute;
  width: 210px;
  height: 56px;
  left: 652px;
  top: 463px;

  background: #000000;
  border-radius: 3px;

  &:hover {
    color: #000000;
    background: #a19f9f;
    left: 652px;
    top: 463px;
  }
`;

export default Button;


