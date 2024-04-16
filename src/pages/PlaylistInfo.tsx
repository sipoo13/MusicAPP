import React from "react";
import Song from "../components/Song";
import PlaylistSong from "../components/PlaylistSong";

export default function PlaylistInfo() {
  return (
    <div className="max-w-6xl m-auto">
      <div className="relative mt-5">
        <img
          src="https://htmlcolorcodes.com/assets/images/colors/black-color-solid-background-1920x1080.png"
          className="w-full h-[316px] rounded-t-lg"
        ></img>
        <div className="absolute top-[18%] left-[2%] flex items-end">
          <img
            src="http://localhost:3666/user_images/image_1712177922163-931012064.png"
            className="w-[234px] h-[234px] rounded-md"
          ></img>
          <div className="ml-6">
            <p className="text-white select-none">Альбом</p>
            <p className="text-white text-8xl font-bold select-none mt-1">
              Graduation
            </p>
            <p className="text-white select-none mt-10">
              <span className="inline hover:underline cursor-pointer font-semibold">
                Kanye West
              </span>
              <span className="inline"> 🞄 2007</span>
              <span className="inline"> 🞄 14 треков, 54 мин. 29 сек.</span>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 mb-40">
        <PlaylistSong />
        <PlaylistSong />
        <PlaylistSong />
        <PlaylistSong />
        <PlaylistSong />
        <PlaylistSong />
        <PlaylistSong />
        <PlaylistSong />
        <PlaylistSong />
      </div>
    </div>
  );
}
