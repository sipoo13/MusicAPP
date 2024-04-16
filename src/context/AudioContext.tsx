import React, { createContext, useRef, useState, ReactNode } from "react";
import { Track } from "../types/types";

export interface AudioContextProps {
  isPause: boolean;
  setIsPause: React.Dispatch<React.SetStateAction<boolean>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  currentSong: Track | undefined;
  setCurrentSong: React.Dispatch<React.SetStateAction<Track | undefined>>;
}

const defaultState = {
  isPlaying: false,
  isPause: false,
  currentSong: undefined,
} as AudioContextProps;

export const AudioContextik = createContext(defaultState);

interface AudioContextProviderProps {
  children: ReactNode;
}

export const AudioContextProvider: React.FC<AudioContextProviderProps> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [currentSong, setCurrentSong] = useState<Track | undefined>();

  return (
    <AudioContextik.Provider
      value={{
        isPlaying,
        setIsPlaying,
        isPause,
        setIsPause,
        currentSong,
        setCurrentSong,
      }}
    >
      {children}
    </AudioContextik.Provider>
  );
};
