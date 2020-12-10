import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { CaptureContext } from "../contexts/captureContext";

const Message = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  color: black;
  font-size: 18px;
  font-weight: 400;
`;

const PokemonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  border: 1px solid black;
  padding: 30px;
  margin: 30px 0 0 0;
`;

const PokemonImg = styled.img`
  width: 100px;
  margin: 0 0 20px 0;
`;

const PokemonTitle = styled.h2`
  font-family: Arial, Helvetica, sans-serif;
  color: black;
  font-size: 24px;
  font-weight: 400;
  margin: 0 0 30px 0;
  text-transform: capitalize;
`;

const PokemonData = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  color: black;
  font-size: 16px;
  font-weight: 400;
  margin: 0 0 10px 0;
`;

const PokemonDataWrapper = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
`;

const PokemonButton = styled.button`
  border: none;
  font-family: Arial, Helvetica, sans-serif;
  color: black;
  font-size: 18px;
  width: 150px;
  height: fit-content;
  padding: 10px;
  cursor: pointer;
  margin: 30px 0 0 0;
  background-color: ${(props) => (props.captured ? "orange" : "lightgreen")};
`;

// markup
const PokemonPage = ({ pokemonName }) => {
  const {
    capturedPokemon,
    addCapturedPokemon,
    removeCapturedPokemon,
  } = useContext(CaptureContext);
  const [pokemonData, setPokemonData] = useState({});
  const [loading, setLoading] = useState(true);

  const handleErrors = (res) => {
    if (!res.ok) {
      console.log(res.statusText);
    }
    return res;
  };

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then(handleErrors)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let fetchedData = {
          name: data.name,
          id: data.id,
          height: data.height,
          weight: data.weight,
        };

        if (data.sprites.front_default) {
          fetchedData.image = data.sprites.front_default;
        }

        setLoading(false);
        setPokemonData((prev) => fetchedData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {loading === true ? (
        <Message>Loading...</Message>
      ) : (
        <PokemonWrapper>
          {pokemonData.image ? <PokemonImg src={pokemonData.image} /> : <></>}
          <PokemonTitle>{pokemonData.name}</PokemonTitle>
          <PokemonDataWrapper>
            <PokemonData>ID: {pokemonData.id}</PokemonData>
            <PokemonData>Weight: {pokemonData.weight} hg</PokemonData>
            <PokemonData>Height: {pokemonData.height} dm</PokemonData>
          </PokemonDataWrapper>
          {capturedPokemon.includes(pokemonName) ? (
            <PokemonButton
              captured={true}
              onClick={() => {
                removeCapturedPokemon(pokemonName);
              }}
            >
              Let go
            </PokemonButton>
          ) : (
            <PokemonButton
              captured={false}
              onClick={() => {
                addCapturedPokemon(pokemonName);
              }}
            >
              Capture
            </PokemonButton>
          )}
        </PokemonWrapper>
      )}
    </>
  );
};

export default PokemonPage;
