import React from "react";
import { Link } from "react-router-dom";

export default function PopularSong() {
  return (
    <div className="h-[56px] hover:bg-[#2a2a2a] flex items-center justify-between">
      <div className="flex">
        <div>
          <p className="text-[#8d8d8d] ml-4 mr-2">1</p>
        </div>
        <img
          src="https://images.genius.com/f3296b08b282943a42f8700e8ccb85f3.1000x1000x1.png"
          className="ml-2 rounded-sm h-[42px] w-[42px]"
        ></img>
        <div className="ml-4 flex items-center">
          <div>
            <p className="text-sm text-white">CARNIVAL</p>
            <p className="text-[#8d8d8d] text-sm font-normal">
              <Link to="/user_card_profile">
                <span className="inline hover:underline hover:cursor-pointer">
                  Kanye West
                </span>
              </Link>
              ,&nbsp;
              <span className="inline hover:underline hover:cursor-pointer">
                Ty Dolla $ign
              </span>
            </p>
          </div>
        </div>
      </div>
      <div>
        <p className="text-[#8d8d8d] text-sm hover:underline hover:cursor-pointer">
          VULTURES 1
        </p>
      </div>
      <div>
        <p className="text-[#8d8d8d] text-sm mr-4">4:55</p>
      </div>
    </div>
  );
}
