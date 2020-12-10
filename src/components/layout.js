import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Link } from "gatsby";

import Pokeball from "../images/pokeball.png";

import { CaptureProvider } from "../contexts/captureContext";

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
  }
`;

const Container = styled.main`
  width: 100%;
  box-sizing: border-box;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const PokeballImg = styled.img`
  width: 30px;
  margin: 0 0 20px 0;
`;

const Header = styled(Link)`
  font-family: Arial, Helvetica, sans-serif;
  color: black;
  font-size: 48px;
  margin: 0 20px 20px 20px;
  text-decoration: none;
`;

const Layout = ({ children }) => {
  return (
    <CaptureProvider>
      <GlobalStyle theme="purple" />
      <Container>
        <HeaderWrapper>
          <PokeballImg src={Pokeball} />
          <Header to="/">Pokemon Safari</Header>
          <PokeballImg src={Pokeball} />
        </HeaderWrapper>

        {children}
      </Container>
    </CaptureProvider>
  );
};

export default Layout;
