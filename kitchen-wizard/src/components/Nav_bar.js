import React from "react";
import styled from "styled-components";
import Logo from "./Logo";

const Navbar = styled.div`
  position: absolute;
  width: 1512px;
  height: 66px;
  left: 0px;
  top: 0px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  background: #090808;
`;

const AppName = styled.h1`
  position: absolute;
  width: 193px;
  height: 36px;
  left: 96px;
  top: 15px;
  font-family: "Caesar Dressing";
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
  line-height: 36px;
  color: #ffffff;
`;

const Nav_bar = () => {
  return (
    <Navbar>
      <Logo />
      <AppName>Kitchen Wizard</AppName>
    </Navbar>
  );
};

export default Nav_bar;
