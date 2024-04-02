import React from "react";
import Playlist from "../components/Playlist";
import { Search } from "lucide-react";
import Song from "../components/Song";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="max-w-7xl m-auto">
      <form className="mt-5">
        <div className="relative flex items-center">
          <Search
            className="w-5 h-5 absolute ml-3 pointer-events-none"
            color="#bdbdbd"
          />
          <input
            type="text"
            name="search"
            placeholder="Что хочешь послушать?"
            autoComplete="off"
            aria-label="Что хочешь послушать?"
            className="rounded-3xl hover:bg-[#2a2a2a] py-3 pl-10 pr-3 bg-[#242424] text-white placeholder-[#727475] w-[400px] border-none hover:ring-1 hover:ring-[#343434] focus:ring-2 focus:ring-white"
          ></input>
        </div>
      </form>
      <div className="mt-5">
      <div className="flex justify-between items-center">
          <p className="text-white text-2xl font-semibold select-none">
            Популярные альбомы
          </p>
          <Link to="/"><p className="font-semibold text-[#b3b3b3] text-sm select-none hover:underline">Показать все</p></Link>
        </div>
        <div className="mt-3 grid grid-cols-6">
          <Playlist />
          <Playlist />
          <Playlist />
          <Playlist />
          <Playlist />
          <Playlist />
          <Playlist />
          <Playlist />
          <Playlist />
          <Playlist />
        </div>
      </div>
      <div className="mt-5">
        <div className="flex justify-between">
          <p className="text-white text-2xl font-semibold select-none">
            Популярные треки
          </p>
          <Link to="/"><p className="font-semibold text-[#b3b3b3] text-sm select-none hover:underline">Показать все</p></Link>
        </div>
        <div className="mt-3 mb-48">
          <Song />
          <Song />
          <Song />
          <Song />
        </div>
      </div>
    </div>
  );
}
