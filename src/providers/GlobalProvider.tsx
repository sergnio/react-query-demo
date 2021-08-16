import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import Character from "../models/character";

interface CharactersProviderProps {
  children: ReactNode;
}

interface CharactersContextState {
  characters: Character[];
  setCharacters: Dispatch<SetStateAction<Character[]>>;
}

export const CharactersContext = createContext<
  CharactersContextState | undefined
>(undefined);

export const CharactersProvider = ({ children }: CharactersProviderProps) => {
  const DEFAULT_CHARACTERS: Character[] = [];
  const [characters, setCharacters] = useState<Character[]>(DEFAULT_CHARACTERS);

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
