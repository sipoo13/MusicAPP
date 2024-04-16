import {
  Pause,
  PauseCircle,
  Play,
  PlayCircle,
  Repeat,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react";
import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/FooterPlayStyle.css";
import ProgressBar from "./ProgressBar";
import { Slider, styled } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import { AuthContext } from "../context/AuthContext";
import { AudioContextik } from "../context/AudioContext";
import axios from "axios";

interface FooterPlayProps {
  audioElemRef: React.RefObject<HTMLAudioElement>;
}

const FooterPlay: FC<FooterPlayProps> = ({ audioElemRef }) => {
  const id = localStorage.getItem("userId");
  const [songProgress, setSongProgress] = useState(0);
  const { isPlaying, setIsPlaying, currentSong, setCurrentSong } = useContext(AudioContextik);
  const [isLike, setisLike] = useState(false);

  const handleLikeClick = async () => {
    if (isLike) 
      {
        setisLike(false);
      }
    if (!isLike) 
      {
        const favouriteData = {
          track_id: currentSong?.ID_Track,
          user_id: id
        }
        await axios
          .post(`http://localhost:3666/favourite_tracks`, favouriteData).then((result) => {
            if(result.status == 200) {
              setisLike(true);
            }
          })
      }
  };

  const handlePlayClick = () => {
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
      const currentTime = (value as number) * (audioElemRef.current.duration || 0) / 100;
      audioElemRef.current.currentTime = currentTime;
      // audioElemRef.current?.play();
    }
  };

  useEffect(() => {
    const updateProgress = () => {
      const currentTime = audioElemRef.current?.currentTime || 0;
      const duration = audioElemRef.current?.duration || 0;
      const progress = (currentTime / duration) * 100;
      setSongProgress(progress);
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
          <img
            src={currentSong?.Track_Cover}
            className="w-[52px] h-[52px] rounded"
          />
          <div className="ml-4 my-auto">
            <p className="text-white font-semibold text-sm cursor-pointer hover:underline select-none">
              {currentSong?.Track_Name}
            </p>
            <Link
              to="/"
              className="text-gray-400 font-semibold text-[12px] hover:underline select-none"
            >
              {currentSong?.Alias}
            </Link>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", marginLeft: 24 }}
          >
            {isLike ? (
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
            {/* 2:34 */}
          </p>
          <Slider value={songProgress} onChange={handleSliderChange} aria-label="song-progress" sx={{ width: 825 }} />
          <p className="text-gray-400 font-semibold text-[12px] ml-1 select-none">
            {/* 3:32 */}
          </p>
        </div>
        <div className="flex space-x-4 items-center justify-end">
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
