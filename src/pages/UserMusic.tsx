import React from "react";
import Playlist from "../components/Playlist";
import Song from "../components/Song";

export default function UserMusic() {
  return (
    <div className="h-full">
      <div className="max-w-6xl m-auto">
        <div>
          <h3 className="text-white my-3 text-3xl font-semibold">
            Мои плейлисты
          </h3>
        </div>
        <div className="grid grid-cols-5">
          <Playlist />
          <Playlist />
          <Playlist />
          <Playlist />
          <Playlist />
        </div>
        <div className="mb-48">
          <h3 className="text-white my-3 text-3xl font-semibold">Мои песни</h3>
          <div>
            <Song />
            <Song />
            <Song />
            <Song />
            <Song />
            <Song />
            <Song />
            <Song />
            <Song />
            <Song />
            <Song />
            <Song />
            <Song />
            <Song />
            <Song />
          </div>
        </div>
      </div>
    </div>
  );
}
