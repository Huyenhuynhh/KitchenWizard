import React from "react";
import styled from "styled-components";
import logo from "./assets/logo.png"; // adjust the path according to your project structure

const LogoWrapper = styled.div`
  position: absolute;
  width: 50px;
  height: 58px;
  left: 28px;
  top: 4px;
  background: url(${logo});
  background-size: cover; // ensure the logo fills the div
`;

const Logo = () => <LogoWrapper />;

export default Logo;
