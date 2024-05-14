import {
  PauseCircle,
  PlayCircle,
  SkipBack,
  SkipForward,
  Volume1,
} from "lucide-react";
import React, { FC, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/FooterPlayStyle.css";
import { Slider, styled } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import { AuthContext } from "../context/AuthContext";
import { TrackContext } from "../context/AudioContext";
import axios from "axios";

interface FooterPlayProps {
  audioElemRef: React.RefObject<HTMLAudioElement>;
}

const FooterPlay: FC<FooterPlayProps> = ({ audioElemRef }) => {
  const {
    authUser,
  } = useContext(AuthContext);
  const id = authUser?.id_user;
  const [songProgress, setSongProgress] = useState(0);
  const {
    isPlaying,
    setIsPlaying,
    isLiked,
    setIsLiked,
    favoriteId,
    setFavoriteId,
    currentSong,
    setCurrentSong,
    trackList,
    setTrackList
  } = useContext(TrackContext);
  const [timeTrack, setTimeTrack] = useState("0:00");

  const handleLikeClick = async () => {
    if (currentSong == undefined) {
      return;
    }
    if (authUser === undefined) {
      return;
    }
    if (isLiked) {
      await axios
        .delete(`http://localhost:3666/favorite_tracks/${favoriteId}`)
        .then((response) => {
          if (response.status == 200) {
            setIsLiked(false);
          }
        });
    }
    if (!isLiked) {
      const favouriteData = {
        track_id: currentSong?.ID_Track,
        user_id: id,
      };
      await axios
        .post(`http://localhost:3666/favorite_tracks`, favouriteData)
        .then((result) => {
          if (result.status == 200) {
            setFavoriteId(result.data.result);
            setIsLiked(true);
          }
        });
    }
  };

  const handlePlayClick = () => {
    if (currentSong == undefined) {
      return;
    }
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      audioElemRef.current?.play();
    } else {
      audioElemRef.current?.pause();
    }
  };

  const handlePauseClick = () => {
    setIsPlaying(!isPlaying);
    audioElemRef.current?.pause();
  };

  const handleSliderChange = (event: Event, value: number | number[]) => {
    if (audioElemRef.current) {
      const currentTime =
        ((value as number) * (audioElemRef.current.duration || 0)) / 100;
      audioElemRef.current.currentTime = currentTime;
    }
  };

  const handleVolumeChange = (event: Event, value: number | number[]) => {
    if (audioElemRef.current) {
      const volume = (value as number) / 100;
      audioElemRef.current.volume = volume;
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const formattedTime = `${minutes.toString().padStart(1, '0')}:${seconds.toString().padStart(2, '0')}`;
    return formattedTime;
  };

  useEffect(() => {
    const updateProgress = () => {
      const currentTime = audioElemRef.current?.currentTime || 0;
      const duration = audioElemRef.current?.duration || 0;
      const progress = (currentTime / duration) * 100;
      setSongProgress(progress);
      const formattedTime = formatTime(currentTime);
      setTimeTrack(formattedTime);
    };

    audioElemRef.current?.addEventListener("timeupdate", updateProgress);

    return () => {
      audioElemRef.current?.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  return (
    <footer className="bg-black py-3 fixed bottom-0 w-full">
      <div className="max-w-[1800px] m-auto grid grid-cols-4">
        <div className="flex">
          {currentSong?.Track_Cover ? (
            <img
              src={currentSong.Track_Cover}
              className="w-[52px] h-[52px] rounded"
            />
          ) : (
            <img
              src="https://milieupaint.com/cdn/shop/products/Milieu-paint-wall-in-010-Polar-Grey.jpg?v=1681140611"
              className="w-[52px] h-[52px] rounded"
            />
          )}
          <div className="ml-4 my-auto">
            <p className="text-white font-semibold text-sm select-none mb-0">
              {currentSong?.Track_Name}
              <br />
              <Link
                to={`/profile/${currentSong?.User_ID}`}
                className="text-gray-400 font-semibold text-[12px] hover:underline select-none"
              >
                {currentSong?.Alias}
              </Link>
            </p>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", marginLeft: 24 }}
          >
            {authUser === undefined ? null : isLiked ? (
              <button onClick={handleLikeClick}>
                <Favorite className="icon" sx={{ color: "#e11d48" }}></Favorite>
              </button>
            ) : (
              <button onClick={handleLikeClick}>
                <Favorite className="icon" sx={{ color: "#b2b2b2" }}></Favorite>
              </button>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center col-span-2">
          <p className="text-gray-400 font-semibold text-[12px] mr-1 select-none">
            {timeTrack}
          </p>
          <Slider
            value={songProgress}
            onChange={handleSliderChange}
            aria-label="song-progress"
            sx={{ width: 825, color: "white" }}
          />
          {currentSong ? (
            <p className="text-gray-400 font-semibold text-[12px] ml-1 select-none">
              {currentSong?.Track_Duration}
            </p>
          ) : (
            <p className="text-gray-400 font-semibold text-[12px] ml-1 select-none">
              0:00
            </p>
          )}
        </div>
        <div className="flex space-x-4 items-center justify-end">
          <div className="mr-12 space-x-3 flex justify-between items-center">
            <Volume1 color="#ffff" />
            <Slider
              defaultValue={50}
              onChange={handleVolumeChange}
              sx={{ width: 100, color: "white" }}
            />
          </div>
          {isPlaying ? (
            <button onClick={handlePauseClick}>
              <PauseCircle size="32" color="#ffff" />
            </button>
          ) : (
            <button onClick={handlePlayClick}>
              <PlayCircle size="32" color="#ffff" />
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};

export default FooterPlay;
