import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import Characters from "../models/characters";

interface CharactersProviderProps {
  children: ReactNode;
}

interface CharactersContextState {
  characters: Characters[];
  setCharacters: Dispatch<SetStateAction<Characters[]>>;
}

export const CharactersContext = createContext<
  CharactersContextState | undefined
>(undefined);

export const CharactersProvider = ({ children }: CharactersProviderProps) => {
  const DEFAULT_CHARACTERS: Characters[] = [];
  const [characters, setCharacters] =
    useState<Characters[]>(DEFAULT_CHARACTERS);

  return (
    <CharactersContext.Provider
      value={{
        characters,
        setCharacters,
      }}
    >
      {children}
    </CharactersContext.Provider>
  );
};

export function useCharactersState() {
  const context = useContext(CharactersContext);
  if (context === undefined) {
    throw new Error(
      "useCharactersState must be used within the CharactersProvider"
    );
  }

  return context;
}
