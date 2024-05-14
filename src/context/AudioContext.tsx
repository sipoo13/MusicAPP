import React, { createContext, useState, ReactNode, SetStateAction, Dispatch } from "react";
import { Track } from "../types/types";

export interface AudioContextProps {
  isPause: boolean;
  setIsPause: Dispatch<SetStateAction<boolean>>;
  isLiked: boolean;
  setIsLiked: Dispatch<SetStateAction<boolean>>;
  favoriteId: number;
  setFavoriteId: Dispatch<SetStateAction<number>>;
  trackList: Track[];
  setTrackList: Dispatch<SetStateAction<Track[]>>;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  currentSong: Track | undefined;
  setCurrentSong: Dispatch<SetStateAction<Track | undefined>>;
}

const defaultState: AudioContextProps = {
  isPlaying: false,
  isPause: false,
  isLiked: false,
  favoriteId: -1,
  trackList: [],
  currentSong: undefined,
  setIsPause: () => {},
  setIsLiked: () => {},
  setFavoriteId: () => {},
  setTrackList: () => {},
  setIsPlaying: () => {},
  setCurrentSong: () => {},
};

export const TrackContext = createContext(defaultState);

interface AudioContextProviderProps {
  children: ReactNode;
}

export const AudioContextProvider: React.FC<AudioContextProviderProps> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [trackList, setTrackList] = useState<Track[]>([]);
  const [favoriteId, setFavoriteId] = useState(-1);
  const [currentSong, setCurrentSong] = useState<Track | undefined>();

  return (
    <TrackContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        isLiked,
        setIsLiked,
        favoriteId,
        setFavoriteId,
        trackList,
        setTrackList,
        isPause,
        setIsPause,
        currentSong,
        setCurrentSong,
      }}
    >
      {children}
    </TrackContext.Provider>
  );
};
