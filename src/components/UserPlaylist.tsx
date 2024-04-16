import React, { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { Track } from "../types/types";
import { AudioContextik } from "../context/AudioContext";

interface TrackProps {
  track: Track;
}

const UserPlaylist: FC<TrackProps> = ({ track: track }) => {
  const { isPlaying, setIsPlaying, isPause, setIsPause, currentSong, setCurrentSong } =
    useContext(AudioContextik);

  const playNewTrack = () => {
    setCurrentSong(track);
    setIsPlaying(true);
  }

  return (
      <div className="hover:bg-[#1a1a1a] w-[208px] h-[264px] rounded-md cursor-pointer" onClick={playNewTrack}>
        <img
          src={track.Track_Cover}
          className="rounded-md h-[184px] w-[184px] mx-auto mt-3"
        ></img>
        <div className="ml-3">
          <p className="mt-2 text-white font-normal text-[16px]">{track.Track_Name}</p>
          <p className="text-[#8d8d8d] text-sm font-normal mt-1">
            <Link to="/user_card_profile">
              <span className="inline hover:underline">2024 🞄 Сингл</span>
            </Link>
          </p>
        </div>
      </div>
  );
}

export default UserPlaylist;
