import React from "react";
import { Link } from "react-router-dom";

export default function Playlist() {
  return (
    <Link to="/playlist">
      <div className="hover:bg-[#1a1a1a] w-[208px] h-[264px] rounded-md cursor-pointer">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/7/70/Graduation_%28album%29.jpg"
          className="rounded-md h-[184px] w-[184px] mx-auto mt-3"
        ></img>
        <div className="ml-3">
          <p className="mt-2 text-white font-normal text-[16px]">Graduation</p>
          <p className="text-[#8d8d8d] text-sm font-normal mt-1">
            <Link to="/user_card_profile">
              <span className="inline hover:underline">Kanye West</span>
            </Link>
          </p>
        </div>
      </div>
    </Link>
  );
}
