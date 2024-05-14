import React, { useContext, useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import {
  get_tracks_with_favorite,
  get_users,
} from "../api/requests";
import { Track, User } from "../types/types";
import axios from "axios";
import IndexSong from "../components/IndexSong";
import { AuthContext } from "../context/AuthContext";

export default function Index() {
  const [users, setUsers] = useState<User[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const { authUser } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    get_users().then((res) => {
      setUsers(res?.data);
    });
    if (authUser == undefined) {
      get_tracks_with_favorite(0).then((res) => {
        setTracks(res?.data);
      });
    } else {
      get_tracks_with_favorite(authUser.id_user).then((res) => {
        setTracks(res?.data);
      });
    }
  }, []);

  const handleUnlikeTrack = async (id: number) => {
    await axios
      .delete(`http://localhost:3666/favourite_tracks/${id}`)
      .then((response) => {
        if (response.status == 200) {
        }
      });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.Alias.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTracks = tracks.filter((track) =>
    track.Track_Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            placeholder="Кого хотите послушать?"
            autoComplete="off"
            aria-label="Кого хотите послушать?"
            className="rounded-3xl hover:bg-[#2a2a2a] py-3 pl-10 pr-3 bg-[#242424] text-white placeholder-[#727475] w-[400px] border-none hover:ring-1 hover:ring-[#343434] focus:ring-2 focus:ring-white"
            value={searchQuery}
            onChange={handleSearch}
          ></input>
        </div>
      </form>
      <div className="mt-5">
        <p className="text-white text-3xl select-none">Треки</p>
        <div className="mt-6 mb-5 grid grid-cols-3">
          {tracks.length > 0 ? (
            filteredTracks.map((track) => (
              <IndexSong key={track.ID_Track} track={track} />
            ))
          ) : (
            <p className="text-white">Загрузка треков...</p>
          )}
        </div>
      </div>
      <div className="mt-5">
        <p className="text-white text-3xl select-none">Исполнители</p>
        <div className="mt-6 mb-48">
          {users.length > 0 ? (
            filteredUsers.map((user) => (
              <Link to={`/profile/${user.ID_User}`} key={user.ID_User}>
                <div className="hover:bg-[#1a1a1a] h-[170px] flex items-center">
                  <img
                    src={user.Avatar}
                    className="w-[145px] h-[145px] rounded-full ml-4 my-auto"
                  ></img>
                  <div className="ml-4">
                    <p className="text-[#727475] font-semibold">Исполнитель</p>
                    <p className="text-white text-3xl font-semibold select-none">
                      {user.Alias}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-white">Загрузка исполнителей...</p>
          )}
        </div>
      </div>
    </div>
  );
}
