import * as React from "react";
import styled from "styled-components";

const Title = styled.h3`
  font-family: Arial, Helvetica, sans-serif;
  color: black;
  font-size: 24px;
  font-weight: 400;
`;

// markup
const NotFoundPage = () => {
  return <Title>404 Error: Page not found</Title>;
};

export default NotFoundPage;
