import React, { FC } from "react";
import { Pause, PlayArrow } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Track } from "../types/types";

interface TrackProps {
  track: Track;
}

const Song: FC<TrackProps> = ({ track: track }) => {
  return (
    <div className="h-[56px] hover:bg-[#2a2a2a] flex items-center justify-between">
      <div className="flex items-center">
        <div className="ml-2 mr-1">
          <PlayArrow sx={{color: "#8d8d8d"}}/>
        </div>
        <img
          src={track.Track_Cover}
          className="ml-2 rounded-sm h-[42px] w-[42px]"
        ></img>
        <div className="ml-4 flex items-center">
          <div>
            <p className="text-sm text-white select-none">{track.Track_Name}</p>
            <p className="text-[#8d8d8d] text-sm font-normal">
              <Link to="/user_card_profile">
                <span className="inline hover:underline hover:cursor-pointer">
                  {track.Alias}
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Song;
