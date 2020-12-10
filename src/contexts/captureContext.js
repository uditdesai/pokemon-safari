import React, { createContext, useState } from "react";

const useLocalStorage = (key, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (err) {
      console.log(err);
      return defaultValue;
    }
  });

  const setValue = (value) => {
    try {
      const newValue = value instanceof Function ? value(storedValue) : value;
      setStoredValue(newValue);
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (err) {
      console.log(err);
    }
  };

  return [storedValue, setValue];
};

export const CaptureContext = createContext();

export function CaptureProvider(props) {
  const [capturedPokemon, setCapturedPokemon] = useLocalStorage(
    "capturedPokemon",
    []
  );

  const addCapturedPokemon = (pokemon) => {
    if (!capturedPokemon.includes(pokemon)) {
      setCapturedPokemon((prev) => [...prev, pokemon]);
    }
  };

  const removeCapturedPokemon = (pokemon) => {
    let capturedIndex = capturedPokemon.findIndex(
      (element) => element === pokemon
    );
    if (capturedIndex != -1) {
      setCapturedPokemon((prev) => [
        ...prev.slice(0, capturedIndex),
        ...prev.slice(capturedIndex + 1),
      ]);
    }
  };

  return (
    <CaptureContext.Provider
      value={{ capturedPokemon, addCapturedPokemon, removeCapturedPokemon }}
    >
      {props.children}
    </CaptureContext.Provider>
  );
}
