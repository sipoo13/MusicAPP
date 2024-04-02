import React from "react";
import { Link } from "react-router-dom";

export default function PlaylistSong() {
    return (
        <div className="h-[56px] hover:bg-[#2a2a2a] flex items-center justify-between">
          <div className="flex items-center">
            <div>
              <p className="text-[#8d8d8d] ml-5 mr-3 select-none">1</p>
            </div>
            <div className="ml-4 flex items-center">
              <div>
                <p className="text-sm text-white select-none">Good Morning</p>
                <p className="text-[#8d8d8d] text-sm font-normal">
                  <Link to="/user_card_profile"><span className="inline hover:underline hover:cursor-pointer">Kanye West</span></Link>
                </p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-[#8d8d8d] text-sm hover:underline hover:cursor-pointer">Graduation</p>
          </div>
          <div>
            <p className="text-[#8d8d8d] text-sm mr-4 select-none">4:55</p>
          </div>
        </div>
      );
}