import { FC, useContext, useState } from "react";
import { Favorite, PlayArrow } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Track } from "../types/types";
import { TrackContext } from "../context/AudioContext";

interface TrackProps {
  track: Track;
  onUnlikeTrack: (id: number) => void;
}

const Song: FC<TrackProps> = ({ track: track, onUnlikeTrack }) => {
  const {
    setIsPlaying,
    setCurrentSong,
  } = useContext(TrackContext);

  const [isFavoriteVisible, setIsFavoriteVisible] = useState(false);

  const maxLength = 25;
  let truncatedName = track.Track_Name;

  if (track.Track_Name.length > maxLength) {
    truncatedName = track.Track_Name.substring(0, maxLength) + "...";
  }

  const handleLike = async () => {
    onUnlikeTrack(track.ID_Favorite_Track);
  };

  const playNewTrack = () => {
    setCurrentSong(track);
    setIsPlaying(true);
  };

  return (
    <div
      className="h-[56px] hover:bg-[#2a2a2a] flex items-center justify-between"
      onMouseEnter={() => setIsFavoriteVisible(true)}
      onMouseLeave={() => setIsFavoriteVisible(false)}
      onClick={playNewTrack}
    >
      <div className="flex items-center">
        <div className="ml-2 mr-1">
          <PlayArrow sx={{ color: "#8d8d8d" }} />
        </div>
        <img
          src={track.Track_Cover}
          className="ml-2 rounded-sm h-[42px] w-[42px]"
        ></img>
        <div className="ml-4 flex items-center">
          <div>
            <p className="text-sm text-white select-none">{truncatedName}</p>
            <p className="text-[#8d8d8d] text-sm font-normal">
              <Link to={`/profile/${track.User_ID}`}>
                <span className="inline hover:underline hover:cursor-pointer">
                  {track.Alias}
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleLike();
          }}
        >
          <Favorite
            className="icon"
            sx={{
              color: "#e11d48",
              marginRight: "25px",
              visibility: isFavoriteVisible ? "visible" : "hidden",
            }}
          ></Favorite>
        </button>
        <p className="text-[#8d8d8d] text-sm select-none mr-4">
          {track.Track_Duration}
        </p>
      </div>
    </div>
  );
};

export default Song;
