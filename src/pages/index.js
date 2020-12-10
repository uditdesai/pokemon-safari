import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import { CaptureContext } from "../contexts/captureContext";

import GrassPatch from "../images/tallGrass.png";

const Title = styled.h3`
  font-family: Arial, Helvetica, sans-serif;
  color: black;
  font-size: 22px;
  font-weight: 400;
  margin: 0;
`;

const CapturedPokemonContainer = styled.div`
  width: 400px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 20px;
  margin: 30px 0 0 0;
`;

const CapturedPokemonTitle = styled.h6`
  font-family: Arial, Helvetica, sans-serif;
  color: black;
  font-size: 18px;
  margin: 0 0 20px 0;
  font-weight: 400;
`;

const CapturedPokemonName = styled(Link)`
  font-family: Arial, Helvetica, sans-serif;
  color: black;
  font-size: 16px;
  margin: 0 0 10px 0;
  text-transform: capitalize;

  &:last-child {
    margin: 0;
  }
`;

const PokemonGrid = styled.div`
  width: 600px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 50px 0 0 0;
  position: relative;
`;

const PokemonName = styled(Link)`
  font-family: Arial, Helvetica, sans-serif;
  color: black;
  font-size: 24px;
  width: 100%;
  height: 150px;
  display: grid;
  place-items: center;
  text-decoration: none;
  text-transform: capitalize;
`;

const Patch = styled.img`
  width: 50px;
  position: absolute;
  z-index: 2;
  top: ${(props) => `${props.top}%`};
  left: ${(props) => `${props.left}%`};
`;

const wildPokemon = [
  "charizard",
  "venusaur",
  "blastoise",
  "blaziken",
  "sceptile",
  "swampert",
];

// markup
const IndexPage = () => {
  const { capturedPokemon } = useContext(CaptureContext);
  return (
    <>
      <Title>Catch as many wild Pokemon as you can!</Title>
      {capturedPokemon.length != 0 ? (
        <CapturedPokemonContainer>
          <CapturedPokemonTitle>Captured Pokemon</CapturedPokemonTitle>
          {capturedPokemon.map((name) => {
            return (
              <CapturedPokemonName key={`captured-${name}`} to={`/${name}`}>
                {name}
              </CapturedPokemonName>
            );
          })}
        </CapturedPokemonContainer>
      ) : (
        <></>
      )}
      <PokemonGrid>
        <Patch src={GrassPatch} top={30} left={50} />
        <Patch src={GrassPatch} top={50} left={70} />
        <Patch src={GrassPatch} top={10} left={20} />
        <Patch src={GrassPatch} top={70} left={60} />
        <Patch src={GrassPatch} top={40} left={80} />
        <Patch src={GrassPatch} top={15} left={45} />
        <Patch src={GrassPatch} top={20} left={80} />
        <Patch src={GrassPatch} top={50} left={20} />
        <Patch src={GrassPatch} top={15} left={15} />
        <Patch src={GrassPatch} top={70} left={10} />
        <Patch src={GrassPatch} top={32} left={90} />
        {wildPokemon.map((pokemon) => {
          return (
            <PokemonName key={`pokemon-${pokemon}`} to={`/${pokemon}`}>
              {pokemon}
            </PokemonName>
          );
        })}
      </PokemonGrid>
    </>
  );
};

export default IndexPage;
