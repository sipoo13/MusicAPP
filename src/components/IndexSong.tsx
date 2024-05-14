import { FC, useContext, useEffect, useState } from "react";
import { Favorite, PlayArrow } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { Track } from "../types/types";
import { TrackContext } from "../context/AudioContext";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

interface TrackProps {
  track: Track;
}

const IndexSong: FC<TrackProps> = ({ track: track }) => {
  const {
    setIsPlaying,
    setIsLiked,
    favoriteId,
    setFavoriteId,
    currentSong,
    setCurrentSong,
  } = useContext(TrackContext);

  const { authUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isFavoriteVisible, setIsFavoriteVisible] = useState(false);
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    console.log(track);
    if (track.ID_Favorite_Track !== null) {
      setFavoriteId(track.ID_Favorite_Track);
      setIsLike(true);
    }
    if(track.ID_Track == currentSong?.ID_Track) {
      if(isLike) {
        setIsLiked(true);
        setFavoriteId(track.ID_Favorite_Track);
      }
      else if(!isLike) {
        setIsLiked(false);
        setFavoriteId(-1);
      }
    }
  }, []);

  const maxLength = 25;
  let truncatedName = track.Track_Name;

  if (track.Track_Name.length > maxLength) {
    truncatedName = track.Track_Name.substring(0, maxLength) + "...";
  }

  const handleLike = async () => {
    if(authUser === undefined) {
      return;
    }
    const favouriteData = {
      track_id: track.ID_Track,
      user_id: authUser?.id_user,
    };
    await axios
      .post(`http://localhost:3666/favorite_tracks`, favouriteData)
      .then((result) => {
        console.log(result);
        if (result.status == 200) {
          setFavoriteId(result.data.result);
          setIsLiked(true);
          setIsLike(true);
        }
      });
  };

  const handleUnlike = async () => {
    await axios
      .delete(
        `http://localhost:3666/favorite_tracks/${favoriteId}`
      )
      .then((response) => {
        if (response.status == 200) {
          setIsLiked(false);
          setIsLike(false);
        }
      });
  };

  const playNewTrack = () => {
    if (isLike) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
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
            <button 
            className="text-[#8d8d8d] text-sm font-normal hover:underline"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/profile/${track.User_ID}`);
            }}>{track.Alias}</button>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        {authUser === undefined ? null : isLike ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleUnlike();
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
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLike();
            }}
          >
            <Favorite
              className="icon"
              sx={{
                color: "#b2b2b2",
                marginRight: "25px",
                visibility: isFavoriteVisible ? "visible" : "hidden",
              }}
            ></Favorite>
          </button>
        )}
        <p className="text-[#8d8d8d] text-sm select-none mr-4">
          {track.Track_Duration}
        </p>
      </div>
    </div>
  );
};

export default IndexSong;
