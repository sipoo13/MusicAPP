import React, { useEffect, useState } from "react";
import Song from "../components/Song";
import { useParams } from "react-router-dom";
import { get_favorite_tracks } from "../api/requests";
import { Track } from "../types/types";
import axios from "axios";
import { Search } from "lucide-react";

export default function UserMusic() {
  const { id } = useParams();
  const [userSingles, setUserSingles] = useState<Track[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchFavoriteTracks();
  }, []);

  const fetchFavoriteTracks = async () => {
    get_favorite_tracks(id).then((res) => {
      setUserSingles(res?.data);
    });
  };

  const handleUnlikeTrack = async (id: number) => {
    await axios
      .delete(`http://localhost:3666/favorite_tracks/${id}`)
      .then((response) => {
        if (response.status == 200) {
          fetchFavoriteTracks();
        }
      });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredTracks = userSingles.filter((track) =>
    track.Track_Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full">
      <div className="max-w-6xl m-auto">
        <div className="mb-48">
          <h3 className="text-white my-3 text-3xl font-semibold select-none">
            Моя медиатека
          </h3>
          <div className="my-4">
            <div className="relative flex items-center">
              <Search
                className="w-5 h-5 absolute ml-3 pointer-events-none"
                color="#bdbdbd"
              />
              <input
                type="text"
                name="search"
                placeholder="Что хотите послушать?"
                autoComplete="off"
                aria-label="Что хотите послушать?"
                className="rounded-3xl hover:bg-[#2a2a2a] py-3 pl-10 pr-3 bg-[#242424] text-white placeholder-[#727475] w-[400px] border-none hover:ring-1 hover:ring-[#343434] focus:ring-2 focus:ring-white"
                value={searchQuery}
                onChange={handleSearch}
              ></input>
            </div>
          </div>
          <div>
            {userSingles.length > 0 ? (
              filteredTracks.map((track) => {
                return (
                  <Song
                    key={track.ID_Track}
                    track={track}
                    onUnlikeTrack={handleUnlikeTrack}
                  />
                );
              })
            ) : (
              <p className="text-center text-white font-semibold text-xl my-4 select-none">
                Вы не добавили ни одного трека к себе
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
