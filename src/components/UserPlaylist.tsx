import React, { FC, useContext } from "react";
import { Track } from "../types/types";
import { TrackContext } from "../context/AudioContext";
import { Trash2 } from "lucide-react";

interface TrackProps {
  track: Track;
  isMyMusic: boolean;
  onDeleteTrack: (id: number) => void;
}

const UserPlaylist: FC<TrackProps> = ({
  track: track,
  onDeleteTrack,
  isMyMusic,
}) => {
  const { setIsPlaying, setCurrentSong } = useContext(TrackContext);

  const maxLength = 20;
  let truncatedName = track.Track_Name;

  if (track.Track_Name.length > maxLength) {
    truncatedName = track.Track_Name.substring(0, maxLength - 2) + "...";
  }

  const playNewTrack = () => {
    setCurrentSong(track);
    setIsPlaying(true);
  };

  const handleDeleteTrack = async () => {
    onDeleteTrack(track.ID_Track);
  };

  return (
    <div
      className="hover:bg-[#1a1a1a] w-[208px] h-[275px] rounded-md cursor-pointer relative"
      onClick={playNewTrack}
    >
      <img
        src={track.Track_Cover}
        className="rounded-md h-[184px] w-[184px] mx-auto mt-3"
      ></img>
      <div className="ml-3">
        <p className="mt-2 text-white font-normal text-[16px]">
          {truncatedName}
        </p>
        <p className="text-[#8d8d8d] text-sm font-normal mt-1">
          2024 🞄 {track.Genre_Name}
        </p>
      </div>
      <div className="absolute bottom-2 right-2 flex">
        {isMyMusic ? (
          <button
            className="bg-white hover:bg-[#e2e2e2] rounded-sm py-1 px-1"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteTrack();
            }}
          >
            <Trash2 color="black"></Trash2>
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default UserPlaylist;
